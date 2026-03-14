import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface AssessmentPDFData {
  firstName: string;
  verdict: string;
  status: string;
  summary: string;
  applicationPath: string;
  workTrack: string;
  timingNote: string;
  nextSteps: string[];
  answers: Record<number, string>;
}

const answerLabels: Record<string, Record<string, string>> = {
  "1": {
    employee: "Remote employee (foreign company contract)",
    freelancer: "Freelancer / self-employed (overseas clients)",
    business_owner: "Business owner",
    planning: "Still planning / exploring",
  },
  "2": {
    ph: "Philippine passport",
    other_asian: "Other Asian passport",
    latam: "Latin American passport",
    other_non_eu: "Other non-EU passport",
    eu_citizen: "EU / EEA citizen",
  },
  "3": {
    under_2000: "Under €2,000/mo",
    borderline: "€2,000 ~ €2,894/mo",
    meets: "€2,894 ~ €5,000/mo",
    above: "Over €5,000/mo",
  },
  "4": {
    in_spain: "Already in Spain",
    planning_move: "Planning to move to Spain",
    schengen_tourist: "In Schengen on tourist entry",
    outside_europe: "Outside Europe",
  },
  "5": {
    under_3mo: "Less than 3 months remote",
    "3_to_12mo": "3 months ~ 1 year remote",
    over_1yr: "Over 1 year remote",
  },
  "6": {
    yes: "Yes, already covered",
    can_get: "Not yet, but can get one",
    not_sure: "Not sure what qualifies",
  },
};

const questionLabels: Record<string, string> = {
  "1": "Work Setup",
  "2": "Nationality",
  "3": "Monthly Income",
  "4": "Current Location",
  "5": "Remote Work Duration",
  "6": "Health Insurance",
};

export function generateAssessmentPDF(data: AssessmentPDFData): Blob {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // ── Header ──
  doc.setFillColor(58, 58, 58);
  doc.rect(0, 0, pageWidth, 36, "F");

  doc.setTextColor(227, 169, 156);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("HAPPY VOYAGER", 20, 16);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text("DNV Eligibility Assessment", 20, 27);

  // ── Verdict ──
  let y = 48;
  const statusColors: Record<string, [number, number, number]> = {
    strong: [212, 224, 211],
    likely: [254, 243, 205],
    review: [253, 232, 230],
  };
  const statusTextColors: Record<string, [number, number, number]> = {
    strong: [143, 163, 141],
    likely: [122, 92, 26],
    review: [192, 98, 90],
  };

  const bgColor = statusColors[data.status] || [212, 224, 211];
  const textColor = statusTextColors[data.status] || [143, 163, 141];

  doc.setFillColor(...bgColor);
  doc.roundedRect(20, y, pageWidth - 40, 30, 4, 4, "F");

  doc.setTextColor(...textColor);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("YOUR ELIGIBILITY VERDICT", 28, y + 10);

  doc.setFontSize(13);
  doc.text(data.verdict, 28, y + 22);

  y += 38;

  // ── Summary ──
  doc.setTextColor(107, 107, 107);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const summaryLines = doc.splitTextToSize(data.summary, pageWidth - 40);
  doc.text(summaryLines, 20, y);
  y += summaryLines.length * 5 + 8;

  // ── Your Profile ──
  doc.setTextColor(58, 58, 58);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("YOUR PROFILE", 20, y);
  y += 6;

  const profileRows = Object.entries(data.answers)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([qNum, aId]) => {
      const qLabel = questionLabels[qNum] ?? `Q${qNum}`;
      const aLabel = answerLabels[qNum]?.[aId] ?? aId;
      return [qLabel, aLabel];
    });

  autoTable(doc, {
    startY: y,
    head: [],
    body: profileRows,
    theme: "plain",
    styles: { fontSize: 9, cellPadding: 3, textColor: [58, 58, 58] },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 55, textColor: [107, 107, 107] },
    },
    margin: { left: 20, right: 20 },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  y = (doc as any).lastAutoTable.finalY + 10;

  // ── Application Path ──
  if (data.applicationPath) {
    doc.setTextColor(58, 58, 58);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("APPLICATION PATH", 20, y);
    y += 6;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(107, 107, 107);
    const pathLines = doc.splitTextToSize(data.applicationPath, pageWidth - 40);
    doc.text(pathLines, 20, y);
    y += pathLines.length * 5 + 4;

    const timingLines = doc.splitTextToSize(data.timingNote, pageWidth - 40);
    doc.text(timingLines, 20, y);
    y += timingLines.length * 5 + 8;
  }

  // ── Work Track ──
  if (data.workTrack) {
    doc.setTextColor(58, 58, 58);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("EMPLOYMENT TRACK", 20, y);
    y += 6;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(107, 107, 107);
    const trackLines = doc.splitTextToSize(data.workTrack, pageWidth - 40);
    doc.text(trackLines, 20, y);
    y += trackLines.length * 5 + 8;
  }

  // ── Next Steps ──
  if (data.nextSteps.length > 0) {
    doc.setTextColor(58, 58, 58);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("YOUR NEXT STEPS", 20, y);
    y += 8;

    data.nextSteps.forEach((step, i) => {
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(227, 169, 156);
      doc.text(`${i + 1}.`, 22, y);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(107, 107, 107);
      const stepLines = doc.splitTextToSize(step, pageWidth - 50);
      doc.text(stepLines, 30, y);
      y += stepLines.length * 5 + 3;
    });
  }

  // ── Footer ──
  const footerY = doc.internal.pageSize.getHeight() - 16;
  doc.setFillColor(58, 58, 58);
  doc.rect(0, footerY - 4, pageWidth, 20, "F");
  doc.setTextColor(227, 169, 156);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("happyvoyager.com", 20, footerY + 4);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Get Spain's Digital Nomad Visa ~ Without Paying a Lawyer",
    pageWidth - 20,
    footerY + 4,
    { align: "right" }
  );

  return doc.output("blob");
}
