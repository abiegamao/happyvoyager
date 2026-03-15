# Auth + Payment Flow Improvement Plan

## Context

Happy Voyager sells a Spain Digital Nomad Visa playbook product with 3 tiers:
- **Playbook Pro** — subscription (monthly EUR 9, yearly EUR 89) with 14-day free trial
- **Guided Navigator** — one-time EUR 199
- **VIP Concierge** — one-time EUR 599

The codebase (Next.js + Supabase + Stripe) has a **schema-code mismatch**: the webhook already writes `subscription_status`, `stripe_subscription_id`, `access_expires_at` — but these columns don't exist in the DB. The checkout API only creates `mode: "payment"` sessions (no subscription support). The verify endpoint accepts raw email instead of using Supabase Auth. There's no Stripe Billing Portal endpoint. An old duplicate webhook route exists.

**Goal:** Align the database with the code, add subscription checkout support, tighten auth, add billing self-service, and rename tables for future extensibility (`playbook_purchasers` → `customers`, `playbook_purchases` → `purchases`).

**Decisions:**
- All 3 tiers go through direct Stripe checkout (including VIP Concierge)
- Guided Navigator and VIP Concierge are independent products — they do NOT auto-grant Playbook Pro access
- Price mapping uses env vars (not a DB table) — sufficient for 4 price IDs

---

## Phase 1: Database Migrations

### Migration 1 — Rename tables + add `user_id`

Rename `playbook_purchasers` → `customers` and `playbook_purchases` → `purchases` to support future non-playbook products. Add `user_id` to link to `auth.users`.

```sql
-- Rename tables
ALTER TABLE playbook_purchasers RENAME TO customers;
ALTER TABLE playbook_purchases RENAME TO purchases;

-- Add user_id to customers
ALTER TABLE customers
  ADD COLUMN user_id uuid UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL;

-- Backfill existing email matches
UPDATE customers c
SET user_id = au.id
FROM auth.users au
WHERE LOWER(c.email) = LOWER(au.email);

CREATE INDEX idx_customers_user_id ON customers(user_id) WHERE user_id IS NOT NULL;

-- Update FK constraint names to match new table names
ALTER TABLE purchases RENAME CONSTRAINT playbook_purchases_purchaser_id_fkey TO purchases_customer_id_fkey;
ALTER TABLE purchases RENAME COLUMN purchaser_id TO customer_id;
ALTER TABLE playbook_lesson_progress RENAME CONSTRAINT playbook_lesson_progress_purchaser_id_fkey TO lesson_progress_customer_id_fkey;
ALTER TABLE playbook_lesson_progress RENAME COLUMN purchaser_id TO customer_id;
```

**Note:** PostgreSQL `ALTER TABLE ... RENAME` automatically updates all FKs, indexes, and sequences that reference the table. Views/policies using the old name need manual update.

### Migration 2 — Add subscription columns to `purchases`

```sql
ALTER TABLE purchases
  ADD COLUMN purchase_type text NOT NULL DEFAULT 'one_time'
    CHECK (purchase_type IN ('one_time', 'subscription')),
  ADD COLUMN subscription_status text
    CHECK (subscription_status IS NULL OR subscription_status IN ('trialing', 'active', 'past_due', 'canceled', 'unpaid')),
  ADD COLUMN stripe_subscription_id text UNIQUE,
  ADD COLUMN stripe_price_id text,
  ADD COLUMN trial_ends_at timestamptz,
  ADD COLUMN current_period_end timestamptz,
  ADD COLUMN access_expires_at timestamptz;

-- Change unique constraint to allow both one-time + subscription per user per playbook
ALTER TABLE purchases
  DROP CONSTRAINT IF EXISTS playbook_purchases_purchaser_id_playbook_id_key;

ALTER TABLE purchases
  ADD CONSTRAINT uq_purchases_per_type UNIQUE (customer_id, playbook_id, purchase_type);
```

Existing 4 rows auto-backfill as `purchase_type = 'one_time'`, `subscription_status = NULL` (permanent access). Zero disruption.

### Migration 3 — Auto-link trigger + update RLS policies

```sql
-- Auto-link user_id when a new auth user signs up
CREATE OR REPLACE FUNCTION link_customer_user_id()
RETURNS trigger AS $$
BEGIN
  UPDATE customers
  SET user_id = NEW.id
  WHERE LOWER(email) = LOWER(NEW.email) AND user_id IS NULL;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_link_customer_on_user_create
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION link_customer_user_id();

-- Drop old RLS policies that reference old table names
DROP POLICY IF EXISTS "Allow email lookup" ON customers;
DROP POLICY IF EXISTS "Allow purchase lookup" ON purchases;

-- Recreate RLS policies for renamed tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow email lookup" ON customers
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow purchase lookup" ON purchases
  FOR SELECT TO anon, authenticated USING (true);

-- RLS: let authenticated users read/write their own lesson progress
CREATE POLICY "Users can read own progress" ON playbook_lesson_progress
  FOR SELECT TO authenticated
  USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert own progress" ON playbook_lesson_progress
  FOR INSERT TO authenticated
  WITH CHECK (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete own progress" ON playbook_lesson_progress
  FOR DELETE TO authenticated
  USING (customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid()));
```

---

## Phase 2: Stripe Setup

### 2a. Create Recurring Price Objects

In Stripe Dashboard > Products:

1. Find or create the "Playbook Pro" product
2. Add **two recurring prices**:
   - **Monthly:** EUR 9.00, Billing period: Monthly
   - **Yearly:** EUR 89.00, Billing period: Yearly
3. Copy the `price_xxx` IDs for each

### 2b. Configure Customer Portal

Stripe Dashboard > Settings > Billing > Customer portal:
- Enable "Cancel subscription"
- Enable "Update payment method"
- Set return URL to `https://happyvoyager.com/playbook`

### 2c. Verify Webhook Endpoint

Stripe Dashboard > Developers > Webhooks:
- Ensure only ONE endpoint points to `/api/stripe/webhook`
- Required events: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `customer.subscription.trial_will_end`
- Remove any endpoint pointing to the old `/api/stripe-webhook` route

### 2d. Add Environment Variables

```
STRIPE_PRICE_SPAIN_DNV_MONTHLY=price_xxx   # from step 2a
STRIPE_PRICE_SPAIN_DNV_YEARLY=price_yyy    # from step 2a
```

---

## Phase 3: API Changes

### 3a. Update checkout — `app/api/stripe/checkout/route.ts`

- Accept `{ slug, interval?: "monthly" | "yearly" }` in request body
- Expand price map: `"spain-dnv:monthly"`, `"spain-dnv:yearly"`, `"guided-navigator"`, `"vip-concierge"`
- If `interval` provided: `mode: "subscription"` with `subscription_data.trial_period_days: 14`, `payment_method_collection: "always"`
- If no `interval`: `mode: "payment"` (one-time, as now)
- Add `client_reference_id: user.id` for webhook linking
- Add metadata: `playbook_slug`, `plan_interval`, `purchase_type`

### 3b. Update webhook — `app/api/stripe/webhook/route.ts`

- Rename all table references: `playbook_purchasers` → `customers`, `playbook_purchases` → `purchases`, `purchaser_id` → `customer_id`
- Update `upsertPurchase` to include `purchase_type`, `trial_ends_at`, `current_period_end`, `stripe_price_id`
- Change `onConflict` to `"customer_id,playbook_id,purchase_type"`
- Link `user_id` from `client_reference_id` when available
- Add `customer.subscription.updated` handler (catches plan changes, trial-to-active, payment failures)
- In `checkout.session.completed`: also handle subscription sessions (set `purchase_type: "subscription"`)

### 3c. Delete old webhook — `app/api/stripe-webhook/route.ts`

Remove entirely. Duplicate of the new webhook route.

### 3d. Update verify — `app/api/stripe/verify/route.ts`

- Rename table references: `playbook_purchasers` → `customers`, `playbook_purchases` → `purchases`, `purchaser_id` → `customer_id`
- Use Supabase Auth (`createSupabaseServer` + `getUser()`) instead of raw email
- Keep email fallback temporarily for backward compatibility (log warning)
- Return expanded fields: `purchaseType`, `trialEndsAt`, `currentPeriodEnd`

### 3e. Update verify-session — `app/api/stripe/verify-session/route.ts`

- Rename table references: `playbook_purchasers` → `customers`, `playbook_purchases` → `purchases`, `purchaser_id` → `customer_id`
- Change `onConflict` to `"customer_id,playbook_id,purchase_type"`
- Include `purchase_type` in upsert (derive from `session.mode`)
- Link `user_id` from `session.client_reference_id`

### 3f. New portal endpoint — `app/api/stripe/portal/route.ts` (new file)

- `POST /api/stripe/portal` — requires Supabase Auth
- Look up `stripe_customer_id` from `customers` → `purchases` tables
- Create Stripe Billing Portal session, return `{ url }`

### 3g. Update progress API — `app/api/playbook/progress/route.ts`

- Rename table references: `playbook_purchasers` → `customers`, `purchaser_id` → `customer_id`

---

## Phase 4: Frontend Changes

### 4a. `components/PricingSection.tsx` — line 272

Pass `interval` for subscription plans:
```tsx
href={`/playbook?intent=purchase&slug=${plan.slug}${isSubscription ? `&interval=${billingPeriod}` : ''}`}
```

### 4b. `app/playbook/page.tsx`

- Read `interval` from search params
- Pass to PortalLogin: `purchaseIntent={{ slug, interval }}`

### 4c. `components/playbook/PortalLogin.tsx`

- Expand `purchaseIntent` type: `{ slug: string; interval?: string | null }`
- Pass `interval` to `redirectToCheckout` → include in fetch body
- Update banner text for subscription vs one-time context

### 4d. `components/playbook/Dashboard.tsx`

- Add "Manage Subscription" button that calls `POST /api/stripe/portal` and redirects
- Show subscription details: trial end date, renewal date, or "Lifetime Access" for one-time
- Add "Canceling" status label for `canceled` subscriptions

### 4e. `lib/playbook-session.ts`

Rename `purchaserId` → `customerId` in `PlaybookSession`. Expand `PlaybookPurchase` interface:
```typescript
export interface PlaybookSession {
  email: string;
  name: string;
  customerId: string;             // renamed from purchaserId
  purchases: PlaybookPurchase[];
}

export interface PlaybookPurchase {
  playbookSlug: string;
  subscriptionStatus: string | null;
  accessExpiresAt: string | null;
  isActive: boolean;
  purchaseType: string;           // "one_time" | "subscription"
  trialEndsAt: string | null;
  currentPeriodEnd: string | null;
}
```

**All references to `purchaserId` in PortalLogin.tsx, Dashboard.tsx, and other components must be updated to `customerId`.**

---

## Implementation Order

1. Stripe dashboard setup (prices + portal + verify webhook endpoint)
2. Add env vars
3. Apply migrations 1-3
4. Update webhook + delete old webhook (unblocks subscription writes)
5. Update checkout API (enables subscription sessions)
6. Update verify + verify-session APIs
7. Create portal API
8. Update PricingSection + playbook page + PortalLogin (frontend flow)
9. Update Dashboard (billing self-service)
10. Update playbook-session types

---

## Verification

1. **Logged-out trial flow:** Click "Start Free Trial" on Playbook Pro monthly → redirected to `/playbook?intent=purchase&slug=spain-dnv&interval=monthly` → shown login/signup form → sign up → redirected to Stripe Checkout in subscription mode with 14-day trial → complete → webhook fires `customer.subscription.created` → `purchases` row has `purchase_type=subscription`, `subscription_status=trialing`, `trial_ends_at` set → redirected back to portal → Dashboard shows playbook with "Free Trial" badge
2. **Yearly variant:** Same flow with `interval=yearly` → correct yearly price shown in Stripe
3. **One-time purchase:** Click "Get the Guided Navigator" or "Apply for VIP Service" → same login-first flow → Stripe Checkout in payment mode → webhook fires `checkout.session.completed` → `purchase_type=one_time`, `subscription_status=NULL` → permanent access
4. **Manage subscription:** From Dashboard, click "Manage Subscription" → redirected to Stripe Billing Portal → can cancel/update payment method
5. **Cancellation:** Cancel in portal → webhook fires `customer.subscription.deleted` → `subscription_status=canceled`, `access_expires_at` set → access continues until period end
6. **Existing users:** All 4 existing one-time purchases still work (permanent access, no disruption). Table renames are transparent — data preserved.
7. **RLS:** Verify `playbook_lesson_progress` is readable by authenticated users for their own data only
8. **Table renames:** Verify all API routes reference `customers` and `purchases` (not old names). Run `SELECT * FROM customers` and `SELECT * FROM purchases` via Supabase MCP to confirm data integrity post-migration.
