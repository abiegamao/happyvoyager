import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, source, tags, customFields } = body;

    if (!email || !source) {
      return NextResponse.json(
        { error: "Email and source are required" },
        { status: 400 }
      );
    }

    // Push to GHL if configured
    if (process.env.GHL_BASE_URL && process.env.GHL_TOKEN) {
      try {
        const contactData = {
          firstName: firstName || undefined,
          email,
          locationId: "mgansJI1GJC6BZLdnkVj",
          source: `Happy Voyager ~ ${source}`,
          tags: tags || [source, "Happy Voyager"],
        };

        const ghlRes = await fetch(`${process.env.GHL_BASE_URL}contacts/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Version: "2021-07-28",
            Authorization: `Bearer ${process.env.GHL_TOKEN}`,
          },
          body: JSON.stringify(contactData),
        });

        // Add a note with custom fields if contact was created
        if (ghlRes.ok && customFields) {
          const ghlData = await ghlRes.json();
          const contactId = ghlData?.contact?.id;

          if (contactId) {
            const noteLines = Object.entries(
              customFields as Record<string, string>
            )
              .map(([key, value]) => `${key}: ${value}`)
              .join("\n");

            await fetch(
              `${process.env.GHL_BASE_URL}contacts/${contactId}/notes`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Version: "2021-07-28",
                  Authorization: `Bearer ${process.env.GHL_TOKEN}`,
                },
                body: JSON.stringify({
                  userId: contactId,
                  body: `${source} Results\n\n${noteLines}`,
                }),
              }
            );
          }
        }
      } catch (ghlError) {
        console.error("GHL capture error:", ghlError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
