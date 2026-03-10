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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status !== "paid") {
      return NextResponse.json({ received: true });
    }

    const email =
      session.customer_email || session.customer_details?.email || null;

    const playbookSlug: string =
      session.metadata?.playbook_slug ?? "spain-dnv";

    if (email) {
      // Upsert user info
      const { data: purchaser, error: purchaserError } = await supabase
        .from("playbook_purchasers")
        .upsert(
          { email: email.toLowerCase(), name: session.customer_details?.name ?? null },
          { onConflict: "email" }
        )
        .select("id")
        .single();

      if (purchaserError || !purchaser) {
        console.error("Supabase purchaser upsert error:", purchaserError);
      }

      // Upsert purchase record
      if (purchaser) {
        const { data: playbookData } = await supabase
          .from("playbooks")
          .select("id")
          .eq("slug", playbookSlug)
          .single();

        if (playbookData) {
          const { error: purchaseError } = await supabase
            .from("playbook_purchases")
            .upsert(
              {
                purchaser_id: purchaser.id,
                playbook_id: playbookData.id,
                stripe_session_id: session.id,
                stripe_customer_id: (session.customer as string) || null,
              },
              { onConflict: "purchaser_id,playbook_id" }
            );

          if (purchaseError) {
            console.error("Supabase purchase upsert error:", purchaseError);
          }
        }
      }

      // Send welcome email via Resend
      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        try {
          const siteUrl =
            process.env.NEXT_PUBLIC_SITE_URL || "https://happyvoyager.com";
          await resend.emails.send({
            from: "Happy Voyager <onboarding@resend.dev>",
            to: email,
            subject: "Welcome to Playbook Pro ~ Your access is ready 🎉",
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #f9f5f2; border-radius: 16px;">
                <h2 style="color: #3a3a3a; margin-bottom: 4px; font-size: 24px;">You&apos;re in! 🎉</h2>
                <p style="color: #6b6b6b; font-size: 15px; margin-top: 0;">Payment confirmed ~ your Playbook Pro access is live.</p>
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
    }
  }

  return NextResponse.json({ received: true });
}
