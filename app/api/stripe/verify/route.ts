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
      .select("id")
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
      .select("id, playbooks!inner(slug)")
      .eq("purchaser_id", purchaser.id)
      .eq("playbooks.slug", playbookSlug)
      .maybeSingle();

    if (accessError) {
      console.error("Supabase access error:", accessError);
      return NextResponse.json({ hasAccess: false });
    }

    return NextResponse.json({ hasAccess: !!access });
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json({ hasAccess: false });
  }
}
