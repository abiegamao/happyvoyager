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

    const { data, error } = await supabase
      .from("playbook_access")
      .select("email")
      .eq("email", email.toLowerCase().trim())
      .eq("playbook_slug", playbookSlug)
      .maybeSingle();

    if (error) {
      console.error("Supabase verify error:", error);
      return NextResponse.json({ hasAccess: false });
    }

    return NextResponse.json({ hasAccess: !!data });
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json({ hasAccess: false });
  }
}
