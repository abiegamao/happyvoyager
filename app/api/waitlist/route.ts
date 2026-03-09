import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, playbookSlug, playbookTitle } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Notify Abie via email
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "Happy Voyager <onboarding@resend.dev>",
          to: "hello@abiemaxey.com",
          subject: `New waitlist signup ~ ${playbookTitle || playbookSlug}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f5f2; border-radius: 12px;">
              <h2 style="color: #3a3a3a; margin-bottom: 4px;">New Waitlist Signup</h2>
              <p style="color: #6b6b6b; font-size: 14px; margin-top: 0;">via Happy Voyager · Playbook Waitlist</p>
              <hr style="border: none; border-top: 1px solid #e7ddd3; margin: 20px 0;" />
              <table style="width: 100%; font-size: 15px; color: #3a3a3a;">
                <tr>
                  <td style="padding: 6px 0; color: #6b6b6b; width: 120px;">Name</td>
                  <td style="padding: 6px 0; font-weight: 600;">${name || "~"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6b6b6b;">Email</td>
                  <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #e3a99c;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6b6b6b;">Playbook</td>
                  <td style="padding: 6px 0; font-weight: 600;">${playbookTitle || playbookSlug}</td>
                </tr>
              </table>
              <p style="color: #aaaaaa; font-size: 12px; margin-top: 24px; text-align: center;">Reply directly to ${email} to respond.</p>
            </div>
          `,
          replyTo: email,
        });
      } catch (emailError) {
        console.error("Resend email error:", emailError);
      }
    }

    // Also push to GHL if configured
    if (process.env.GHL_BASE_URL && process.env.GHL_TOKEN) {
      const nameParts = name ? name.trim().split(" ") : [];
      const contactData = {
        firstName: nameParts[0] || undefined,
        lastName: nameParts.slice(1).join(" ") || undefined,
        name: name || undefined,
        email,
        locationId: "mgansJI1GJC6BZLdnkVj",
        source: "Happy Voyager Website",
        tags: [`Waitlist ~ ${playbookTitle || playbookSlug}`],
      };

      try {
        await fetch(`${process.env.GHL_BASE_URL}contacts/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Version: "2021-07-28",
            Authorization: `Bearer ${process.env.GHL_TOKEN}`,
          },
          body: JSON.stringify(contactData),
        });
      } catch (ghlError) {
        console.error("GHL error:", ghlError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
