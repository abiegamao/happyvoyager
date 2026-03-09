import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );
  try {
    const sessionId = request.nextUrl.searchParams.get("session_id");
    const slugParam = request.nextUrl.searchParams.get("slug");

    if (!sessionId) {
      return NextResponse.json({ hasAccess: false });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ hasAccess: false });
    }

    const email =
      session.customer_email ||
      session.customer_details?.email ||
      null;

    // Prefer slug from URL param, fall back to Stripe metadata, then default
    const playbookSlug: string =
      slugParam ??
      session.metadata?.playbook_slug ??
      "spain-dnv";

    if (!email) {
      return NextResponse.json({ hasAccess: false });
    }

    // Backup upsert in case webhook hasn't fired yet
    await supabase
      .from("playbook_access")
      .upsert(
        {
          email: email.toLowerCase(),
          playbook_slug: playbookSlug,
          stripe_session_id: session.id,
          stripe_customer_id: (session.customer as string) || null,
        },
        { onConflict: "email,playbook_slug" }
      );

    return NextResponse.json({
      hasAccess: true,
      email: email.toLowerCase(),
      slug: playbookSlug,
    });
  } catch (error) {
    console.error("Verify session error:", error);
    return NextResponse.json({ hasAccess: false });
  }
}
