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

    // Handle subscription checkout (trial or paid)
    const isSubscription = session.mode === "subscription";

    if (!isSubscription && session.payment_status !== "paid") {
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
    const { data: purchaser } = await supabase
      .from("playbook_purchasers")
      .upsert(
        { email: email.toLowerCase(), name: session.customer_details?.name ?? null },
        { onConflict: "email" }
      )
      .select("id")
      .single();

    if (purchaser) {
      const { data: playbookData } = await supabase
        .from("playbooks")
        .select("id")
        .eq("slug", playbookSlug)
        .single();

      if (playbookData) {
        // For subscriptions, get the subscription ID and status
        let subscriptionStatus: string | null = null;
        let stripeSubscriptionId: string | null = null;

        if (isSubscription && session.subscription) {
          stripeSubscriptionId = session.subscription as string;
          const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);
          subscriptionStatus = subscription.status === "trialing" ? "trialing" : "active";
        }

        await supabase
          .from("playbook_purchases")
          .upsert(
            {
              purchaser_id: purchaser.id,
              playbook_id: playbookData.id,
              stripe_session_id: session.id,
              stripe_customer_id: (session.customer as string) || null,
              ...(isSubscription
                ? {
                    subscription_status: subscriptionStatus,
                    stripe_subscription_id: stripeSubscriptionId,
                  }
                : {}),
            },
            { onConflict: "purchaser_id,playbook_id" }
          );
      }
    }

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
