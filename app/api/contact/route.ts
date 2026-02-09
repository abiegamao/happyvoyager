import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, tags } = body;

    // Construct name if first or last name is present
    let name = undefined;
    if (firstName || lastName) {
      name = `${firstName || ""} ${lastName || ""}`.trim();
    }

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

      // Check if it's a duplicate contact error
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

      return NextResponse.json(
        { error: "Failed to create contact", details: responseData },
        { status: ghlResponse.status },
      );
    }

    return NextResponse.json({ success: true, data: responseData });
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
