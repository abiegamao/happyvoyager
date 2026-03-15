import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // --- One-time payment completed (Guided Navigator, VIP Concierge) ---
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Subscriptions are handled by customer.subscription.created
    if (session.mode === "subscription") {
      // Still link user_id if available
      if (session.client_reference_id && session.customer_email) {
        await linkUserId(supabase, session.customer_email.toLowerCase(), session.client_reference_id);
      }
      return NextResponse.json({ received: true });
    }

    if (session.payment_status !== "paid") {
      return NextResponse.json({ received: true });
    }

    const email =
      session.customer_email || session.customer_details?.email || null;
    const playbookSlug: string =
      session.metadata?.playbook_slug ?? "spain-dnv";

    if (email) {
      await upsertPurchase(supabase, {
        email: email.toLowerCase(),
        name: session.customer_details?.name ?? null,
        userId: session.client_reference_id ?? null,
        playbookSlug,
        purchaseType: "one_time",
        stripeSessionId: session.id,
        stripeCustomerId: (session.customer as string) || null,
        subscriptionStatus: null,
        stripeSubscriptionId: null,
        stripePriceId: null,
        trialEndsAt: null,
        currentPeriodEnd: null,
      });

      // Bundled Playbook Pro access for higher-tier purchases
      if (playbookSlug === "guided-navigator") {
        const trialExpiry = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
        await upsertPurchase(supabase, {
          email: email.toLowerCase(),
          name: session.customer_details?.name ?? null,
          userId: session.client_reference_id ?? null,
          playbookSlug: "spain-dnv",
          purchaseType: "one_time",
          stripeSessionId: null,
          stripeCustomerId: (session.customer as string) || null,
          subscriptionStatus: "trialing",
          stripeSubscriptionId: null,
          stripePriceId: null,
          trialEndsAt: trialExpiry,
          currentPeriodEnd: null,
          accessExpiresAt: trialExpiry,
        });
      }

      if (playbookSlug === "vip-concierge") {
        await upsertPurchase(supabase, {
          email: email.toLowerCase(),
          name: session.customer_details?.name ?? null,
          userId: session.client_reference_id ?? null,
          playbookSlug: "spain-dnv",
          purchaseType: "one_time",
          stripeSessionId: null,
          stripeCustomerId: (session.customer as string) || null,
          subscriptionStatus: null,
          stripeSubscriptionId: null,
          stripePriceId: null,
          trialEndsAt: null,
          currentPeriodEnd: null,
        });
      }

      await sendWelcomeEmail(email, playbookSlug);
    }
  }

  // --- Subscription created (trial starts or immediate subscription) ---
  if (event.type === "customer.subscription.created") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subscription = event.data.object as any;
    const stripeCustomerId = subscription.customer as string;
    const customer = await stripe.customers.retrieve(stripeCustomerId);

    if (customer.deleted) {
      return NextResponse.json({ received: true });
    }

    const email = customer.email;
    const name = customer.name;
    const playbookSlug =
      subscription.metadata?.playbook_slug ?? "spain-dnv";

    if (email) {
      await upsertPurchase(supabase, {
        email: email.toLowerCase(),
        name: name ?? null,
        userId: null,
        playbookSlug,
        purchaseType: "subscription",
        stripeSessionId: null,
        stripeCustomerId,
        subscriptionStatus: subscription.status === "trialing" ? "trialing" : "active",
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items?.data?.[0]?.price?.id ?? null,
        trialEndsAt: subscription.trial_end
          ? new Date(subscription.trial_end * 1000).toISOString()
          : null,
        currentPeriodEnd: subscription.current_period_end
          ? new Date(subscription.current_period_end * 1000).toISOString()
          : null,
      });

      await sendWelcomeEmail(email, playbookSlug);
    }
  }

  // --- Subscription updated (plan change, trial-to-active, payment failure) ---
  if (event.type === "customer.subscription.updated") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subscription = event.data.object as any;

    await supabase
      .from("purchases")
      .update({
        subscription_status: subscription.status,
        current_period_end: subscription.current_period_end
          ? new Date(subscription.current_period_end * 1000).toISOString()
          : null,
        trial_ends_at: subscription.trial_end
          ? new Date(subscription.trial_end * 1000).toISOString()
          : null,
        stripe_price_id: subscription.items?.data?.[0]?.price?.id ?? null,
      })
      .eq("stripe_subscription_id", subscription.id);
  }

  // --- Recurring invoice paid (subscription renewal) ---
  if (event.type === "invoice.payment_succeeded") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const invoice = event.data.object as any;
    const subscriptionId = invoice.subscription as string | null;

    if (subscriptionId && invoice.billing_reason !== "subscription_create") {
      await supabase
        .from("purchases")
        .update({
          subscription_status: "active",
          access_expires_at: null,
        })
        .eq("stripe_subscription_id", subscriptionId);
    }
  }

  // --- Subscription canceled or expired ---
  if (event.type === "customer.subscription.deleted") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subscription = event.data.object as any;

    const periodEnd = new Date(subscription.current_period_end * 1000).toISOString();

    await supabase
      .from("purchases")
      .update({
        subscription_status: "canceled",
        access_expires_at: periodEnd,
        current_period_end: periodEnd,
      })
      .eq("stripe_subscription_id", subscription.id);
  }

  // --- Trial ending soon (3 days before) ---
  if (event.type === "customer.subscription.trial_will_end") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subscription = event.data.object as any;
    const stripeCustomerId = subscription.customer as string;
    const customer = await stripe.customers.retrieve(stripeCustomerId);

    if (!customer.deleted && customer.email && process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      try {
        const siteUrl =
          process.env.NEXT_PUBLIC_SITE_URL || "https://happyvoyager.com";
        await resend.emails.send({
          from: "Happy Voyager <onboarding@resend.dev>",
          to: customer.email,
          subject: "Your free trial ends in 3 days",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #f9f5f2; border-radius: 16px;">
              <h2 style="color: #3a3a3a; margin-bottom: 4px; font-size: 24px;">Your trial is ending soon</h2>
              <p style="color: #6b6b6b; font-size: 15px; margin-top: 0;">Your 14-day free trial of Playbook Pro ends in 3 days. After that, your subscription will begin automatically.</p>
              <hr style="border: none; border-top: 1px solid #e7ddd3; margin: 24px 0;" />
              <p style="color: #3a3a3a; font-size: 15px;">Want to keep learning? No action needed ~ your access continues seamlessly.</p>
              <p>
                <a href="${siteUrl}/playbook/spain-dnv"
                   style="display: inline-block; padding: 14px 28px; background: #3a3a3a; color: white; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 14px;">
                  Continue Learning &rarr;
                </a>
              </p>
              <hr style="border: none; border-top: 1px solid #e7ddd3; margin: 24px 0;" />
              <p style="color: #aaaaaa; font-size: 12px;">
                If you'd like to cancel, you can manage your subscription from your <a href="https://billing.stripe.com/p/login/3cI6oB9OKdBh6mdgcl73G00" style="color: #e3a99c; text-decoration: underline;">Stripe billing portal</a>.<br />
                Questions? Reply to this email or contact hello@abiemaxey.com
              </p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Resend trial reminder email error:", emailErr);
      }
    }
  }

  return NextResponse.json({ received: true });
}

// --- Helper: link user_id to customer record ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function linkUserId(supabase: ReturnType<typeof createClient<any>>, email: string, userId: string) {
  await supabase
    .from("customers")
    .update({ user_id: userId })
    .eq("email", email)
    .is("user_id", null);
}

// --- Helper: upsert customer + purchase record ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function upsertPurchase(
  supabase: ReturnType<typeof createClient<any>>,
  data: {
    email: string;
    name: string | null;
    userId: string | null;
    playbookSlug: string;
    purchaseType: "one_time" | "subscription";
    stripeSessionId: string | null;
    stripeCustomerId: string | null;
    subscriptionStatus: string | null;
    stripeSubscriptionId: string | null;
    stripePriceId: string | null;
    trialEndsAt: string | null;
    currentPeriodEnd: string | null;
    accessExpiresAt?: string | null;
  }
) {
  const customerData: Record<string, unknown> = { email: data.email, name: data.name };
  if (data.userId) {
    customerData.user_id = data.userId;
  }

  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .upsert(customerData, { onConflict: "email" })
    .select("id")
    .single();

  if (customerError || !customer) {
    console.error("Supabase customer upsert error:", customerError);
    return;
  }

  // If userId was provided but not in the upsert (existing row), link it
  if (data.userId) {
    await linkUserId(supabase, data.email, data.userId);
  }

  const { data: playbookData } = await supabase
    .from("playbooks")
    .select("id")
    .eq("slug", data.playbookSlug)
    .single();

  if (playbookData) {
    const purchaseData: Record<string, unknown> = {
      customer_id: customer.id,
      playbook_id: playbookData.id,
      purchase_type: data.purchaseType,
      stripe_customer_id: data.stripeCustomerId,
      subscription_status: data.subscriptionStatus,
      stripe_subscription_id: data.stripeSubscriptionId,
      stripe_price_id: data.stripePriceId,
      trial_ends_at: data.trialEndsAt,
      current_period_end: data.currentPeriodEnd,
    };

    if (data.accessExpiresAt !== undefined) {
      purchaseData.access_expires_at = data.accessExpiresAt;
    }

    // Only set stripe_session_id for one-time purchases (subscriptions may not have it)
    if (data.stripeSessionId) {
      purchaseData.stripe_session_id = data.stripeSessionId;
    }

    const { error: purchaseError } = await supabase
      .from("purchases")
      .upsert(purchaseData, { onConflict: "customer_id,playbook_id,purchase_type" });

    if (purchaseError) {
      console.error("Supabase purchase upsert error:", purchaseError);
    }
  }
}

// --- Helper: send welcome email ---
async function sendWelcomeEmail(email: string, playbookSlug: string) {
  if (!process.env.RESEND_API_KEY) return;

  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://happyvoyager.com";
    await resend.emails.send({
      from: "Happy Voyager <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to Playbook Pro ~ Your access is ready",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #f9f5f2; border-radius: 16px;">
          <h2 style="color: #3a3a3a; margin-bottom: 4px; font-size: 24px;">You're in!</h2>
          <p style="color: #6b6b6b; font-size: 15px; margin-top: 0;">Your Playbook Pro access is live.</p>
          <hr style="border: none; border-top: 1px solid #e7ddd3; margin: 24px 0;" />
          <p style="color: #3a3a3a; font-size: 15px;">Click below to access all your lessons:</p>
          <p>
            <a href="${siteUrl}/playbook/${playbookSlug}"
               style="display: inline-block; padding: 14px 28px; background: #3a3a3a; color: white; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 14px;">
              Open Playbook Pro &rarr;
            </a>
          </p>
          <hr style="border: none; border-top: 1px solid #e7ddd3; margin: 24px 0;" />
          <p style="color: #aaaaaa; font-size: 12px;">
            Keep this email ~ use <strong>${email}</strong> to restore access on any device.<br />
            Questions? Reply to this email or contact hello@abiemaxey.com
          </p>
        </div>
      `,
    });
  } catch (emailErr) {
    console.error("Resend welcome email error:", emailErr);
  }
}
