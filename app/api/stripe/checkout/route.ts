import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Price ID map ~ add a new entry per playbook
const PRICE_IDS: Record<string, string | undefined> = {
  "spain-dnv": process.env.STRIPE_PRICE_SPAIN_DNV ?? process.env.STRIPE_PLAYBOOK_PRICE_ID,
  "spain-nlv": process.env.STRIPE_PRICE_SPAIN_NLV,
};

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  try {
    const { email, slug } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const playbookSlug: string = slug ?? "spain-dnv";
    const priceId =
      PRICE_IDS[playbookSlug] ??
      process.env.STRIPE_PLAYBOOK_PRICE_ID;

    if (!priceId) {
      return NextResponse.json(
        { error: "No price configured for this playbook" },
        { status: 400 }
      );
    }

    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://happyvoyager.com";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/playbook/${playbookSlug}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/playbook/${playbookSlug}`,
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
