import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Label maps ───────────────────────────────────────────────────────────────

const answerLabels: Record<string, Record<string, string>> = {
  "1": {
    employee: "💼 Remote employee (foreign company contract)",
    freelancer: "💻 Freelancer / self-employed (overseas clients)",
    business_owner: "🏢 Business owner",
    planning: "🔭 Still planning / exploring",
  },
  "2": {
    ph: "🇵🇭 Philippine passport",
    other_asian: "🌏 Other Asian passport",
    latam: "🌎 Latin American passport",
    other_non_eu: "🌍 Other non-EU passport",
    eu_citizen: "🇪🇺 EU / EEA citizen",
  },
  "3": {
    under_2000: "📉 Under €2,000/mo (below threshold)",
    borderline: "📊 €2,000 – €2,894/mo (borderline)",
    meets: "✅ €2,894 – €5,000/mo (meets requirement)",
    above: "🚀 Over €5,000/mo (well above threshold)",
  },
  "4": {
    in_spain: "🇪🇸 Already in Spain → UGE route",
    planning_move: "✈️ Planning to move to Spain soon",
    schengen_tourist: "🛂 In Schengen on tourist entry",
    outside_europe: "🌍 Outside Europe for now",
  },
  "5": {
    under_3mo: "🌱 Less than 3 months remote",
    "3_to_12mo": "📆 3 months – 1 year remote",
    over_1yr: "⭐ Over 1 year remote",
  },
  "6": {
    yes: "✅ Yes, already covered",
    can_get: "🔄 Not yet, but can get one",
    not_sure: "❓ Not sure what qualifies",
  },
};

const questionLabels: Record<string, string> = {
  "1": "Work Setup",
  "2": "Nationality / Passport",
  "3": "Monthly Income",
  "4": "Current Location",
  "5": "Remote Work Duration",
  "6": "Health Insurance",
};

function getVerdict(answers: Record<string, string>): string {
  const { 1: work, 2: nationality, 3: income } = answers as Record<number, string>;

  if (nationality === "eu_citizen") return "🇪🇺 EU Citizen ~ doesn't need DNV";
  if (work === "planning") return "🔭 Still planning ~ not yet ready";
  if (income === "under_2000") return "🔴 Income below threshold ~ needs to build up";

  let score = 0;
  if (income === "above") score += 3;
  else if (income === "meets") score += 2;
  else if (income === "borderline") score += 1;

  if (answers[5] === "over_1yr") score += 2;
  else if (answers[5] === "3_to_12mo") score += 1;

  if (work === "employee" || work === "freelancer") score += 1;
  if (answers[6] === "yes") score += 1;

  if (score >= 5) return "🟢 Strong Candidate ~ well-positioned to apply";
  if (score >= 3) return "🟡 Likely Qualifies ~ a few things to tighten up";
  return "🔴 Needs Review ~ gaps to address before applying";
}

// ─── POST Handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, answers } = body;

    const name = `${firstName || ""} ${lastName || ""}`.trim() || email;
    const verdict = getVerdict(answers);

    // Build answer rows for email
    const answerRows = Object.entries(answers as Record<string, string>)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([qNum, aId]) => {
        const qLabel = questionLabels[qNum] ?? `Q${qNum}`;
        const aLabel = answerLabels[qNum]?.[aId] ?? aId;
        return `
          <tr>
            <td style="padding: 8px 12px; color: #6b6b6b; font-size: 13px; white-space: nowrap; vertical-align: top;">${qLabel}</td>
            <td style="padding: 8px 12px; color: #3a3a3a; font-size: 13px; font-weight: 600;">${aLabel}</td>
          </tr>`;
      })
      .join("");

    // ── Resend email to Abie ──────────────────────────────────────────────────
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "Happy Voyager <onboarding@resend.dev>",
          to: "hello@abiemaxey.com",
          subject: `🎯 New DNV Assessment ~ ${name} (${verdict.split("~")[0].trim()})`,
          html: `
            <div style="font-family: sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; background: #f9f5f2; border-radius: 12px;">
              <h2 style="color: #3a3a3a; margin-bottom: 4px;">New DNV Assessment Completed</h2>
              <p style="color: #6b6b6b; font-size: 14px; margin-top: 0;">via Happy Voyager · /assessment</p>

              <hr style="border: none; border-top: 1px solid #e7ddd3; margin: 20px 0;" />

              <!-- Contact info -->
              <table style="width: 100%; font-size: 15px; color: #3a3a3a; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 6px 0; color: #6b6b6b; width: 120px;">Name</td>
                  <td style="padding: 6px 0; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6b6b6b;">Email</td>
                  <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #e3a99c;">${email}</a></td>
                </tr>
              </table>

              <!-- Verdict -->
              <div style="background: #3a3a3a; border-radius: 10px; padding: 16px 20px; margin-bottom: 24px;">
                <p style="color: #e3a99c; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 6px;">Eligibility Verdict</p>
                <p style="color: #ffffff; font-size: 18px; font-weight: 700; margin: 0;">${verdict}</p>
              </div>

              <!-- Assessment answers -->
              <p style="color: #aaaaaa; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Assessment Answers</p>
              <table style="width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #e7ddd3;">
                ${answerRows}
              </table>

              <hr style="border: none; border-top: 1px solid #e7ddd3; margin: 24px 0;" />
              <p style="color: #aaaaaa; font-size: 12px; text-align: center; margin: 0;">
                Reply to <a href="mailto:${email}" style="color: #e3a99c;">${email}</a> to follow up.
              </p>
            </div>
          `,
          replyTo: email,
        });
      } catch (emailError) {
        console.error("Resend error:", emailError);
      }
    }

    // ── GHL contact ───────────────────────────────────────────────────────────
    if (process.env.GHL_BASE_URL && process.env.GHL_TOKEN) {
      const nameParts = name.split(" ");
      const contactData = {
        firstName: nameParts[0] || firstName || undefined,
        lastName: nameParts.slice(1).join(" ") || lastName || undefined,
        email,
        locationId: "mgansJI1GJC6BZLdnkVj",
        source: "Happy Voyager ~ DNV Assessment",
        tags: ["DNV Assessment", "Happy Voyager"],
      };

      try {
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

        // Add a note with assessment answers if contact was created
        if (ghlRes.ok) {
          const ghlData = await ghlRes.json();
          const contactId = ghlData?.contact?.id;

          if (contactId) {
            const noteLines = Object.entries(answers as Record<string, string>)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([qNum, aId]) => {
                const qLabel = questionLabels[qNum] ?? `Q${qNum}`;
                const aLabel = answerLabels[qNum]?.[aId] ?? aId;
                return `${qLabel}: ${aLabel}`;
              })
              .join("\n");

            await fetch(`${process.env.GHL_BASE_URL}contacts/${contactId}/notes`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Version: "2021-07-28",
                Authorization: `Bearer ${process.env.GHL_TOKEN}`,
              },
              body: JSON.stringify({
                userId: contactId,
                body: `DNV Assessment Results\n\nVerdict: ${verdict}\n\n${noteLines}`,
              }),
            });
          }
        }
      } catch (ghlError) {
        console.error("GHL error:", ghlError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Assessment API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
