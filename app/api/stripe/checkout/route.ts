import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseServer } from "@/lib/supabase-server";

// Price ID map
// Subscriptions keyed as "slug:interval", one-time keyed as "slug"
const PRICE_IDS: Record<string, string | undefined> = {
  "spain-dnv:monthly": process.env.STRIPE_PRICE_SPAIN_DNV_MONTHLY,
  "spain-dnv:yearly": process.env.STRIPE_PRICE_SPAIN_DNV_YEARLY,
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

    const authEmail = user.email;
    const { slug, interval } = await request.json();
    const playbookSlug: string = slug ?? "spain-dnv";

    // Determine if this is a subscription (has interval) or one-time
    const isSubscription = !!interval && (interval === "monthly" || interval === "yearly");

    // Look up the correct price ID
    const priceKey = isSubscription ? `${playbookSlug}:${interval}` : playbookSlug;
    const priceId = PRICE_IDS[priceKey];

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

    const metadata: Record<string, string> = {
      playbook_slug: playbookSlug,
      purchase_type: isSubscription ? "subscription" : "one_time",
    };
    if (isSubscription) {
      metadata.plan_interval = interval;
    }

    // Build session config based on mode
    if (isSubscription) {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer_email: authEmail,
        client_reference_id: user.id,
        line_items: [{ price: priceId, quantity: 1 }],
        subscription_data: {
          trial_period_days: 14,
          metadata,
        },
        payment_method_collection: "always",
        success_url: `${origin}/playbook?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/playbook`,
        metadata,
      });

      return NextResponse.json({ url: session.url });
    } else {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: authEmail,
        client_reference_id: user.id,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${origin}/playbook?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/playbook`,
        metadata,
      });

      return NextResponse.json({ url: session.url });
    }
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
