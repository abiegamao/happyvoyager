import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

    const playbookSlug: string = slug ?? "spain-dnv";

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
      return NextResponse.json({ hasAccess: false });
    }

    // Determine access based on subscription status
    const { subscription_status, access_expires_at } = access;

    let hasAccess = false;

    if (!subscription_status) {
      // One-time purchase ~ permanent access
      hasAccess = true;
    } else if (subscription_status === "active" || subscription_status === "trialing") {
      // Active subscription or in trial
      hasAccess = true;
    } else if (subscription_status === "canceled" && access_expires_at) {
      // Canceled but still within paid period
      hasAccess = new Date(access_expires_at) > new Date();
    }

    return NextResponse.json({
      hasAccess,
      name: purchaser.name ?? null,
    });
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json({ hasAccess: false });
  }
}
