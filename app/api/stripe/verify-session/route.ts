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

    const isSubscription = session.mode === "subscription";

    if (!isSubscription && session.payment_status !== "paid") {
      return NextResponse.json({ hasAccess: false });
    }

    const email =
      session.customer_email ||
      session.customer_details?.email ||
      null;

    const playbookSlug: string =
      slugParam ??
      session.metadata?.playbook_slug ??
      "spain-dnv";

    if (!email) {
      return NextResponse.json({ hasAccess: false });
    }

    // Backup upsert in case webhook hasn't fired yet
    const customerData: Record<string, unknown> = {
      email: email.toLowerCase(),
      name: session.customer_details?.name ?? null,
    };
    if (session.client_reference_id) {
      customerData.user_id = session.client_reference_id;
    }

    const { data: customer } = await supabase
      .from("customers")
      .upsert(customerData, { onConflict: "email" })
      .select("id")
      .single();

    if (customer) {
      const { data: playbookData } = await supabase
        .from("playbooks")
        .select("id")
        .eq("slug", playbookSlug)
        .single();

      if (playbookData) {
        const purchaseType = isSubscription ? "subscription" : "one_time";

        // For subscriptions, get the subscription details
        let subscriptionStatus: string | null = null;
        let stripeSubscriptionId: string | null = null;
        let trialEndsAt: string | null = null;
        let currentPeriodEnd: string | null = null;
        let stripePriceId: string | null = null;

        if (isSubscription && session.subscription) {
          stripeSubscriptionId = session.subscription as string;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId) as any;
          subscriptionStatus = subscription.status === "trialing" ? "trialing" : "active";
          trialEndsAt = subscription.trial_end
            ? new Date(subscription.trial_end * 1000).toISOString()
            : null;
          currentPeriodEnd = subscription.current_period_end
            ? new Date(subscription.current_period_end * 1000).toISOString()
            : null;
          stripePriceId = subscription.items?.data?.[0]?.price?.id ?? null;
        }

        await supabase
          .from("purchases")
          .upsert(
            {
              customer_id: customer.id,
              playbook_id: playbookData.id,
              purchase_type: purchaseType,
              stripe_session_id: session.id,
              stripe_customer_id: (session.customer as string) || null,
              subscription_status: subscriptionStatus,
              stripe_subscription_id: stripeSubscriptionId,
              stripe_price_id: stripePriceId,
              trial_ends_at: trialEndsAt,
              current_period_end: currentPeriodEnd,
            },
            { onConflict: "customer_id,playbook_id,purchase_type" }
          );
      }
    }

    return NextResponse.json({
      hasAccess: true,
      email: email.toLowerCase(),
      name: session.customer_details?.name ?? null,
      slug: playbookSlug,
    });
  } catch (error) {
    console.error("Verify session error:", error);
    return NextResponse.json({ hasAccess: false });
  }
}
