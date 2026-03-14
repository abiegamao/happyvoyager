import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface TaxPDFData {
  grossIncome: number;
  workerType: "autonomo" | "employed";
  irpfAmount: number;
  irpfEffectiveRate: number;
  autonomoFee: number;
  socialSecurity: number;
  netTakeHome: number;
  monthlyNet: number;
  isFirstTwoYears: boolean;
  useBeckhamLaw: boolean;
  beckhamTax?: number;
  standardTax?: number;
  irpfBrackets: { range: string; rate: string; amount: number }[];
}

const EUR = (n: number) =>
  new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

export function generateTaxPDF(data: TaxPDFData): Blob {
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
  doc.text("Spain Tax & Autónomo Calculator", 20, 27);

  // ── Summary ──
  let y = 48;
  doc.setTextColor(58, 58, 58);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("YOUR TAX SUMMARY", 20, y);

  y += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(107, 107, 107);

  const summaryRows = [
    ["Gross Annual Income", EUR(data.grossIncome)],
    [
      "Worker Type",
      data.workerType === "autonomo"
        ? "Freelancer / Autónomo"
        : "Employed (Remote Worker)",
    ],
    ["IRPF Income Tax", `${EUR(data.irpfAmount)} (${data.irpfEffectiveRate.toFixed(1)}% eff.)`],
  ];

  if (data.workerType === "autonomo") {
    summaryRows.push([
      "Autónomo Social Security",
      `${EUR(data.autonomoFee * 12)}/yr (${EUR(data.autonomoFee)}/mo)`,
    ]);
    if (data.isFirstTwoYears) {
      summaryRows.push(["Tarifa Plana", "Yes ~ €80/month for first 2 years"]);
    }
  } else {
    summaryRows.push([
      "Employee Social Security (6.35%)",
      EUR(data.socialSecurity),
    ]);
    if (data.useBeckhamLaw) {
      summaryRows.push(["Beckham Law", "Yes ~ 24% flat rate applied"]);
    }
  }

  autoTable(doc, {
    startY: y,
    head: [],
    body: summaryRows,
    theme: "plain",
    styles: { fontSize: 10, cellPadding: 4, textColor: [58, 58, 58] },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 80, textColor: [107, 107, 107] },
      1: { fontStyle: "bold", halign: "right" },
    },
    margin: { left: 20, right: 20 },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  y = (doc as any).lastAutoTable.finalY + 6;

  // ── Net Take-Home highlight ──
  doc.setFillColor(212, 224, 211);
  doc.roundedRect(20, y, pageWidth - 40, 22, 4, 4, "F");
  doc.setTextColor(58, 58, 58);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Net Annual Take-Home", 28, y + 10);
  doc.text(EUR(data.netTakeHome), pageWidth - 28, y + 10, { align: "right" });
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(107, 107, 107);
  doc.text(`(${EUR(data.monthlyNet)}/month)`, pageWidth - 28, y + 18, {
    align: "right",
  });

  y += 32;

  // ── IRPF Bracket Breakdown ──
  doc.setTextColor(58, 58, 58);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("IRPF TAX BRACKETS (2025~2026)", 20, y);
  y += 6;

  autoTable(doc, {
    startY: y,
    head: [["Bracket", "Rate", "Tax"]],
    body: data.irpfBrackets.map((b) => [b.range, b.rate, EUR(b.amount)]),
    theme: "striped",
    headStyles: {
      fillColor: [58, 58, 58],
      textColor: [255, 255, 255],
      fontSize: 9,
    },
    styles: { fontSize: 9, cellPadding: 3 },
    columnStyles: { 2: { halign: "right" } },
    margin: { left: 20, right: 20 },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  y = (doc as any).lastAutoTable.finalY + 10;

  // ── Beckham Law comparison ──
  if (
    data.workerType === "employed" &&
    data.beckhamTax !== undefined &&
    data.standardTax !== undefined
  ) {
    doc.setTextColor(58, 58, 58);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("BECKHAM LAW COMPARISON", 20, y);
    y += 6;

    autoTable(doc, {
      startY: y,
      head: [["", "Standard IRPF", "Beckham Law (24%)", "Savings"]],
      body: [
        [
          "Annual Tax",
          EUR(data.standardTax),
          EUR(data.beckhamTax),
          EUR(data.standardTax - data.beckhamTax),
        ],
      ],
      theme: "striped",
      headStyles: {
        fillColor: [58, 58, 58],
        textColor: [255, 255, 255],
        fontSize: 9,
      },
      styles: { fontSize: 9, cellPadding: 3 },
      margin: { left: 20, right: 20 },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    y = (doc as any).lastAutoTable.finalY + 10;
  }

  // ── Tarifa Plana comparison ──
  if (data.workerType === "autonomo" && data.isFirstTwoYears) {
    doc.setTextColor(58, 58, 58);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("TARIFA PLANA SAVINGS", 20, y);
    y += 6;

    autoTable(doc, {
      startY: y,
      head: [["", "Year 1~2 (Tarifa Plana)", "Year 3+", "Annual Savings"]],
      body: [
        [
          "Monthly SS",
          "€80/mo",
          `${EUR(data.autonomoFee)}/mo`,
          EUR((data.autonomoFee - 80) * 12),
        ],
      ],
      theme: "striped",
      headStyles: {
        fillColor: [58, 58, 58],
        textColor: [255, 255, 255],
        fontSize: 9,
      },
      styles: { fontSize: 9, cellPadding: 3 },
      margin: { left: 20, right: 20 },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    y = (doc as any).lastAutoTable.finalY + 10;
  }

  // ── Disclaimer ──
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(170, 170, 170);
  doc.text(
    "This calculator provides estimates based on 2025~2026 Spanish tax rates. Actual obligations may vary. Always consult a Spanish tax advisor (gestor).",
    20,
    y,
    { maxWidth: pageWidth - 40 }
  );

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
