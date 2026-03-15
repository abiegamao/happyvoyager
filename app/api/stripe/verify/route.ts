import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseServer } from "@/lib/supabase-server";

/** Check if a purchase row grants active access */
function isAccessActive(
  subscriptionStatus: string | null,
  accessExpiresAt: string | null
): boolean {
  // One-time purchase (no subscription) ~ permanent access
  if (!subscriptionStatus) return true;

  // Active or trialing subscription
  if (subscriptionStatus === "active" || subscriptionStatus === "trialing")
    return true;

  // Canceled but still within grace period
  if (
    subscriptionStatus === "canceled" &&
    accessExpiresAt &&
    new Date(accessExpiresAt) > new Date()
  )
    return true;

  return false;
}

export async function POST(request: NextRequest) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );

  try {
    const body = await request.json();
    const { slug } = body;

    // Prefer Supabase Auth, fall back to email in body
    let email: string | null = null;

    try {
      const supabase = await createSupabaseServer();
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        email = user.email;
      }
    } catch {
      // Auth not available, fall through to email fallback
    }

    if (!email && body.email) {
      console.warn("verify: using email fallback instead of auth — this path will be removed");
      email = body.email;
    }

    if (!email) {
      return NextResponse.json({ hasAccess: false });
    }

    // ── Find customer ──
    const { data: customer, error: customerError } = await supabaseAdmin
      .from("customers")
      .select("id, name")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();

    if (customerError) {
      console.error("Supabase verify error:", customerError);
      return NextResponse.json({ hasAccess: false });
    }

    if (!customer) {
      return NextResponse.json({ hasAccess: false });
    }

    // ── Portal mode (no slug) ~ return ALL purchases ──
    if (!slug) {
      const { data: allPurchases, error: allError } = await supabaseAdmin
        .from("purchases")
        .select("purchase_type, subscription_status, access_expires_at, trial_ends_at, current_period_end, playbooks!inner(slug)")
        .eq("customer_id", customer.id);

      if (allError) {
        console.error("Supabase all-purchases error:", allError);
        return NextResponse.json({ hasAccess: false });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const purchases = (allPurchases || []).map((p: any) => ({
        playbookSlug: p.playbooks?.slug ?? p.playbooks?.[0]?.slug ?? "",
        purchaseType: p.purchase_type,
        subscriptionStatus: p.subscription_status,
        accessExpiresAt: p.access_expires_at,
        trialEndsAt: p.trial_ends_at,
        currentPeriodEnd: p.current_period_end,
        isActive: isAccessActive(p.subscription_status, p.access_expires_at),
      }));

      return NextResponse.json({
        hasAccess: purchases.some((p: { isActive: boolean }) => p.isActive),
        name: customer.name ?? null,
        customerId: customer.id,
        purchases,
      });
    }

    // ── Legacy mode (slug provided) ~ single playbook check ──
    const playbookSlug: string = slug;

    const { data: accessRows, error: accessError } = await supabaseAdmin
      .from("purchases")
      .select("id, purchase_type, subscription_status, access_expires_at, playbooks!inner(slug)")
      .eq("customer_id", customer.id)
      .eq("playbooks.slug", playbookSlug);

    if (accessError) {
      console.error("Supabase access error:", accessError);
      return NextResponse.json({ hasAccess: false });
    }

    if (!accessRows || accessRows.length === 0) {
      return NextResponse.json({ hasAccess: false, name: customer.name ?? null });
    }

    // If ANY purchase row grants access, user has access
    const hasAccess = accessRows.some((row: { subscription_status: string | null; access_expires_at: string | null }) =>
      isAccessActive(row.subscription_status, row.access_expires_at)
    );

    return NextResponse.json({
      hasAccess,
      name: customer.name ?? null,
    });
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json({ hasAccess: false });
  }
}
