import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
        return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        const email = session.customer_details?.email || session.customer_email;
        const name = session.customer_details?.name || null;
        const sessionId = session.id;

        if (!email) {
            console.warn("No email found in checkout session:", sessionId);
            return NextResponse.json({ received: true });
        }

        // Upsert user info
        const { data: purchaser, error: purchaserError } = await supabaseAdmin
            .from("playbook_purchasers")
            .upsert(
                { email, name },
                { onConflict: "email" }
            )
            .select("id")
            .single();

        if (purchaserError || !purchaser) {
            console.error("Supabase purchaser upsert error:", purchaserError);
            return NextResponse.json({ error: "DB error" }, { status: 500 });
        }

        // Upsert purchase record (defaults to spain-dnv)
        const { data: playbookData } = await supabaseAdmin
            .from("playbooks")
            .select("id")
            .eq("slug", "spain-dnv")
            .single();

        if (playbookData) {
            const { error: purchaseError } = await supabaseAdmin
                .from("playbook_purchases")
                .upsert(
                    {
                        purchaser_id: purchaser.id,
                        playbook_id: playbookData.id,
                        stripe_session_id: sessionId,
                    },
                    { onConflict: "purchaser_id,playbook_id" }
                );

            if (purchaseError) {
                console.error("Supabase purchase upsert error:", purchaseError);
                return NextResponse.json({ error: "DB error" }, { status: 500 });
            }
        }

        console.log(`✅ Playbook access granted to: ${email}`);

        // Send confirmation and access instructions email via Resend
        if (process.env.RESEND_API_KEY) {
            try {
                await resend.emails.send({
                    from: "Happy Voyager <onboarding@resend.dev>",
                    to: email,
                    subject: "Your Playbook Pro Access!",
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f5f2; border-radius: 12px;">
                          <h2 style="color: #3a3a3a; margin-bottom: 20px;">Your Playbook Pro is Ready!</h2>
                          <p style="color: #3a3a3a; font-size: 15px; line-height: 1.6;">Thank you for your purchase! We are thrilled to share the Playbook Pro with you.</p>
                          <p style="color: #3a3a3a; font-size: 15px; line-height: 1.6;">To access your playbook, please follow these steps:</p>
                          <ol style="color: #3a3a3a; font-size: 15px; line-height: 1.6; padding-left: 20px;">
                            <li style="margin-bottom: 12px;">Go to the playbook access page: <br/>
                              <br/>
                              <a href="https://happy-test-five.vercel.app/playbook" style="display:inline-block; padding: 10px 18px; color: #fff; background-color: #3a3a3a; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">Access Playbook</a>
                            </li>
                            <li style="margin-bottom: 12px;">Enter the exact email address you used for this purchase: <br/>
                              <strong style="color: #3a3a3a; display: inline-block; margin-top: 8px; padding: 8px 12px; background: #fff; border: 1px solid #e7ddd3; border-radius: 6px;">${email}</strong>
                            </li>
                          </ol>
                          <br/>
                          <p style="color: #6b6b6b; font-size: 14px; line-height: 1.6;">Enjoy your journey!<br/>The Happy Voyager Team</p>
                        </div>
                    `,
                });
                console.log(`📩 Access email sent to: ${email}`);
            } catch (emailError) {
                console.error("Resend email error:", emailError);
            }
        }
    }

    return NextResponse.json({ received: true });
}
