import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseServer } from "@/lib/supabase-server";

// Price ID map ~ add a new entry per playbook/package
const PRICE_IDS: Record<string, string | undefined> = {
  "spain-dnv": process.env.STRIPE_PRICE_SPAIN_DNV ?? process.env.STRIPE_PLAYBOOK_PRICE_ID,
  "spain-nlv": process.env.STRIPE_PRICE_SPAIN_NLV,
  "guided-navigator": process.env.STRIPE_PRICE_GUIDED_NAVIGATOR,
  "vip-concierge": process.env.STRIPE_PRICE_VIP_CONCIERGE,
};

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  try {
    // Verify Supabase auth ~ require login before checkout
    const supabase = await createSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to make a purchase" },
        { status: 401 }
      );
    }

    // Use the authenticated email (ignore any email in body)
    const authEmail = user.email;

    const { slug } = await request.json();
    const playbookSlug: string = slug ?? "spain-dnv";
    const priceId =
      PRICE_IDS[playbookSlug] ??
      process.env.STRIPE_PLAYBOOK_PRICE_ID;

    if (!priceId) {
      return NextResponse.json(
        { error: "No price configured for this package" },
        { status: 400 }
      );
    }

    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://happyvoyager.com";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: authEmail,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/playbook?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/playbook`,
      metadata: {
        playbook_slug: playbookSlug,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
