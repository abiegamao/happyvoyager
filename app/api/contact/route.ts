import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, message, tags } = body;

    // Construct name if first or last name is present
    let name = undefined;
    if (firstName || lastName) {
      name = `${firstName || ""} ${lastName || ""}`.trim();
    }

    // Send email notification first (non-blocking on GHL)
    if (message && process.env.RESEND_API_KEY) {
      const tag = tags?.[0] ?? "Contact Form";
      try {
        await resend.emails.send({
          from: "Happy Voyager <onboarding@resend.dev>",
          to: "hello@abiemaxey.com",
          subject: `New inquiry from ${name || email} ~ ${tag}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f5f2; border-radius: 12px;">
              <h2 style="color: #3a3a3a; margin-bottom: 4px;">New Contact Form Inquiry</h2>
              <p style="color: #6b6b6b; font-size: 14px; margin-top: 0;">via Happy Voyager · ${tag}</p>
              <hr style="border: none; border-top: 1px solid #e7ddd3; margin: 20px 0;" />
              <table style="width: 100%; font-size: 15px; color: #3a3a3a;">
                <tr>
                  <td style="padding: 6px 0; color: #6b6b6b; width: 100px;">Name</td>
                  <td style="padding: 6px 0; font-weight: 600;">${name || "—"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6b6b6b;">Email</td>
                  <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #e3a99c;">${email}</a></td>
                </tr>
              </table>
              <hr style="border: none; border-top: 1px solid #e7ddd3; margin: 20px 0;" />
              <p style="color: #6b6b6b; font-size: 13px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
              <p style="color: #3a3a3a; font-size: 15px; line-height: 1.6; white-space: pre-wrap; background: #fff; padding: 16px; border-radius: 8px; border: 1px solid #e7ddd3;">${message}</p>
              <p style="color: #aaaaaa; font-size: 12px; margin-top: 24px; text-align: center;">Reply directly to ${email} to respond.</p>
            </div>
          `,
          replyTo: email,
        });
      } catch (emailError) {
        console.error("Resend email error:", emailError);
      }
    }

    // Send to GHL (skip if env vars not set, e.g. local dev)
    if (process.env.GHL_BASE_URL && process.env.GHL_TOKEN) {
      const contactData = {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        name,
        email,
        locationId: "mgansJI1GJC6BZLdnkVj",
        companyName: company || undefined,
        source: "Happy Voyager Website",
        tags: tags || ["Contact Form"],
      };

      const ghlResponse = await fetch(`${process.env.GHL_BASE_URL}contacts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Version: "2021-07-28",
          Authorization: `Bearer ${process.env.GHL_TOKEN}`,
        },
        body: JSON.stringify(contactData),
      });

      const responseData = await ghlResponse.json();

      if (!ghlResponse.ok) {
        console.error("GHL API Error:", responseData);

        if (
          responseData.statusCode === 400 &&
          responseData.message?.includes("duplicated contacts")
        ) {
          return NextResponse.json(
            {
              error: "duplicate",
              message:
                "You've already submitted your information. We'll be in touch soon!",
              contactId: responseData.meta?.contactId,
            },
            { status: 400 },
          );
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in contact route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
