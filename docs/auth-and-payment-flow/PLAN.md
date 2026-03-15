# Auth + Stripe Subscription Architecture Plan

**Summary**
- Implement a login‑gated trial and subscription checkout for Playbook Pro (monthly and yearly), while keeping existing one‑time purchases intact.
- Extend the Supabase schema to track subscription plans and lifecycle state cleanly.
- Consolidate Stripe webhook handling and tighten access verification to use Supabase Auth.

**Implementation Changes**
- Data model updates in Supabase.
- `playbook_purchasers`: add `user_id uuid` (FK to `auth.users`, unique), keep `email text unique`, `name text`, `created_at`, `updated_at`.
- `playbook_plans` (new): `id uuid`, `playbook_id uuid`, `interval text` (`monthly` or `yearly`), `stripe_price_id text unique`, `trial_days int`, `is_active boolean`, `created_at`.
- `playbook_purchases`: add `purchase_type text` (`one_time` or `subscription`), `plan_id uuid` (FK to `playbook_plans`, nullable for one‑time), `subscription_status text`, `trial_ends_at timestamptz`, `current_period_end timestamptz`, `access_expires_at timestamptz`, `stripe_subscription_id text unique`, `stripe_customer_id text`, `stripe_price_id text`, `stripe_session_id text`, `created_at`.
- Add constraint on `playbook_purchases` to keep one row per `(purchaser_id, playbook_id, purchase_type)`.
- RLS: keep service‑role write access; add optional user‑read policy scoped by `user_id` if we want direct client reads later.

- Checkout and auth flow.
- Update Pricing CTA for Playbook Pro to route to `/playbook?intent=trial&slug=spain-dnv&interval=monthly|yearly`.
- Ensure `/playbook` reads `intent` and `interval` and, if the user is not logged in, shows PortalLogin first.
- After login/signup, call Stripe checkout with `mode=subscription`, the chosen `interval`, and a 14‑day trial.
- Keep Guided Navigator and VIP Concierge as `mode=payment` (one‑time).

- API changes and Stripe integration.
- `POST /api/stripe/checkout` accepts `{ slug, interval }`; uses Supabase Auth server‑side to require login and fetch user email and id.
- Map `interval` to `stripe_price_id` via `playbook_plans` table (preferred) or env vars.
- Create Stripe Checkout Session with `mode=subscription`, `subscription_data.trial_period_days=14`, and metadata `playbook_slug` and `plan_interval`.
- Add `client_reference_id` with Supabase `user.id` to make webhook linking robust.
- Consolidate to a single webhook route (use `app/api/stripe/webhook/route.ts`) and remove or disable the older `app/api/stripe-webhook/route.ts` endpoint to avoid double processing.
- Webhook handlers to update `playbook_purchases`:
- `customer.subscription.created` and `customer.subscription.updated` to upsert subscription rows and set `trial_ends_at`, `current_period_end`, `subscription_status`.
- `invoice.payment_succeeded` to ensure `subscription_status=active`.
- `customer.subscription.deleted` to set `subscription_status=canceled` and `access_expires_at=current_period_end` (access until period end).
- `checkout.session.completed` for one‑time purchases only.

- Access verification.
- Change `/api/stripe/verify` to use Supabase Auth server‑side instead of accepting arbitrary `email` in the body.
- Return purchases for the authenticated user and use `subscription_status` plus `access_expires_at` for access checks.

- Customer self‑service.
- Add `POST /api/stripe/portal` to create a Stripe Billing Portal session for the authenticated user, and link to it from the dashboard or email.

**Public API/Interface Changes**
- `POST /api/stripe/checkout` body becomes `{ slug: string, interval?: "monthly" | "yearly" }`.
- `POST /api/stripe/verify` no longer accepts raw email; it relies on Supabase Auth.
- New `POST /api/stripe/portal` returns `{ url: string }`.

**Test Plan**
- Click Playbook Pro monthly trial CTA while logged out, log in, confirm Stripe checkout opens in subscription mode with trial.
- Repeat with yearly plan and confirm correct Stripe price.
- Complete trial signup and verify `playbook_purchases` has `subscription_status=trialing` and `trial_ends_at`.
- Cancel subscription in Stripe Portal and verify `subscription_status=canceled` with `access_expires_at` set to period end; access remains until that date.
- Let an invoice succeed after trial and verify `subscription_status=active`.
- Complete a one‑time purchase and confirm it is still recorded as `purchase_type=one_time` with permanent access.

**Assumptions**
- Subscription scope is single‑playbook (Spain DNV only), not library‑wide.
- Trial requires a payment method up front and access continues until period end after cancellation.
- Plan document will be written to `docs/auth-and-payment-flow/plan.md` when implementation is allowed.
