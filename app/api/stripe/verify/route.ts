import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );
  try {
    const { email, slug } = await request.json();

    if (!email) {
      return NextResponse.json({ hasAccess: false });
    }

    // ── Find purchaser ──
    const { data: purchaser, error: purchaserError } = await supabase
      .from("playbook_purchasers")
      .select("id, name")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();

    if (purchaserError) {
      console.error("Supabase verify error:", purchaserError);
      return NextResponse.json({ hasAccess: false });
    }

    if (!purchaser) {
      return NextResponse.json({ hasAccess: false });
    }

    // ── Portal mode (no slug) ~ return ALL purchases ──
    if (!slug) {
      const { data: allPurchases, error: allError } = await supabase
        .from("playbook_purchases")
        .select("subscription_status, access_expires_at, playbooks!inner(slug)")
        .eq("purchaser_id", purchaser.id);

      if (allError) {
        console.error("Supabase all-purchases error:", allError);
        return NextResponse.json({ hasAccess: false });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const purchases = (allPurchases || []).map((p: any) => ({
        playbookSlug: p.playbooks?.slug ?? p.playbooks?.[0]?.slug ?? "",
        subscriptionStatus: p.subscription_status,
        accessExpiresAt: p.access_expires_at,
        isActive: isAccessActive(p.subscription_status, p.access_expires_at),
      }));

      return NextResponse.json({
        hasAccess: purchases.some((p: { isActive: boolean }) => p.isActive),
        name: purchaser.name ?? null,
        purchaserId: purchaser.id,
        purchases,
      });
    }

    // ── Legacy mode (slug provided) ~ single playbook check ──
    const playbookSlug: string = slug;

    const { data: access, error: accessError } = await supabase
      .from("playbook_purchases")
      .select("id, subscription_status, access_expires_at, playbooks!inner(slug)")
      .eq("purchaser_id", purchaser.id)
      .eq("playbooks.slug", playbookSlug)
      .maybeSingle();

    if (accessError) {
      console.error("Supabase access error:", accessError);
      return NextResponse.json({ hasAccess: false });
    }

    if (!access) {
      return NextResponse.json({ hasAccess: false, name: purchaser.name ?? null });
    }

    return NextResponse.json({
      hasAccess: isAccessActive(access.subscription_status, access.access_expires_at),
      name: purchaser.name ?? null,
    });
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json({ hasAccess: false });
  }
}
