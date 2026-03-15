import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseServer } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    // Require Supabase Auth
    const supabase = await createSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    // Find customer
    const { data: customer } = await supabaseAdmin
      .from("customers")
      .select("id")
      .eq("email", user.email.toLowerCase())
      .single();

    if (!customer) {
      return NextResponse.json({ error: "No account found" }, { status: 404 });
    }

    // Find a purchase with a stripe_customer_id
    const { data: purchase } = await supabaseAdmin
      .from("purchases")
      .select("stripe_customer_id")
      .eq("customer_id", customer.id)
      .not("stripe_customer_id", "is", null)
      .limit(1)
      .single();

    if (!purchase?.stripe_customer_id) {
      return NextResponse.json({ error: "No billing account found" }, { status: 404 });
    }

    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://happyvoyager.com";

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: purchase.stripe_customer_id,
      return_url: `${origin}/playbook`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error("Stripe portal error:", error);
    return NextResponse.json(
      { error: "Failed to create portal session" },
      { status: 500 }
    );
  }
}
