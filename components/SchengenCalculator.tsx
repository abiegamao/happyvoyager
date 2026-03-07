"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plane,
  Info,
  RotateCcw,
  Download,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Trip {
  id: string;
  entry: string;
  exit: string;
  country: string;
}

// ─── Schengen countries + minimum daily proof of funds (EUR) ─────────────────
const SCHENGEN_COUNTRIES = [
  { flag: "🇦🇹", name: "Austria",        budget: 55 },
  { flag: "🇧🇪", name: "Belgium",        budget: 60 },
  { flag: "🇭🇷", name: "Croatia",        budget: 50 },
  { flag: "🇨🇿", name: "Czech Republic", budget: 45 },
  { flag: "🇩🇰", name: "Denmark",        budget: 70 },
  { flag: "🇪🇪", name: "Estonia",        budget: 55 },
  { flag: "🇫🇮", name: "Finland",        budget: 65 },
  { flag: "🇫🇷", name: "France",         budget: 65 },
  { flag: "🇩🇪", name: "Germany",        budget: 45 },
  { flag: "🇬🇷", name: "Greece",         budget: 50 },
  { flag: "🇭🇺", name: "Hungary",        budget: 40 },
  { flag: "🇮🇸", name: "Iceland",        budget: 70 },
  { flag: "🇮🇹", name: "Italy",          budget: 50 },
  { flag: "🇱🇻", name: "Latvia",         budget: 40 },
  { flag: "🇱🇮", name: "Liechtenstein",  budget: 60 },
  { flag: "🇱🇹", name: "Lithuania",      budget: 40 },
  { flag: "🇱🇺", name: "Luxembourg",     budget: 65 },
  { flag: "🇲🇹", name: "Malta",          budget: 60 },
  { flag: "🇳🇱", name: "Netherlands",    budget: 60 },
  { flag: "🇳🇴", name: "Norway",         budget: 80 },
  { flag: "🇵🇱", name: "Poland",         budget: 45 },
  { flag: "🇵🇹", name: "Portugal",       budget: 40 },
  { flag: "🇸🇰", name: "Slovakia",       budget: 40 },
  { flag: "🇸🇮", name: "Slovenia",       budget: 55 },
  { flag: "🇪🇸", name: "Spain",          budget: 71 },
  { flag: "🇸🇪", name: "Sweden",         budget: 65 },
  { flag: "🇨🇭", name: "Switzerland",    budget: 80 },
] as const;

// ─── Pure date utilities ──────────────────────────────────────────────────────
function toUTC(s: string): Date {
  return new Date(s + "T00:00:00Z");
}

function toISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setUTCDate(r.getUTCDate() + n);
  return r;
}

function fmtDate(s: string): string {
  return toUTC(s).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function tripDuration(t: Trip): number {
  if (!t.entry || !t.exit) return 0;
  const diff = toUTC(t.exit).getTime() - toUTC(t.entry).getTime();
  return diff < 0 ? 0 : Math.round(diff / 86400000) + 1;
}

// ─── Schengen 90/180 calculation logic ───────────────────────────────────────

/** Build a Set of all ISO date strings that are Schengen days */
function buildSchengenSet(trips: Trip[]): Set<string> {
  const days = new Set<string>();
  for (const t of trips) {
    if (!t.entry || !t.exit) continue;
    const entry = toUTC(t.entry);
    const exit = toUTC(t.exit);
    if (exit < entry) continue;
    const cur = new Date(entry);
    while (cur <= exit) {
      days.add(toISO(cur));
      cur.setUTCDate(cur.getUTCDate() + 1);
    }
  }
  return days;
}

/** Count Schengen days in the 180-day rolling window ending on `ref` (inclusive) */
function daysUsedOn(set: Set<string>, ref: Date): number {
  let n = 0;
  const cur = addDays(ref, -179); // window start = ref - 179 days (180 total)
  while (cur <= ref) {
    if (set.has(toISO(cur))) n++;
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return n;
}

/**
 * Maximum continuous days you can stay if entering on `entry`,
 * given the existing Schengen days in `set`.
 * Returns 0 if you cannot enter at all.
 */
function calcMaxStay(set: Set<string>, entry: Date): number {
  const sim = new Set(set);
  let stay = 0;
  const cur = new Date(entry);
  while (stay < 90) {
    const iso = toISO(cur);
    sim.add(iso);
    if (daysUsedOn(sim, cur) > 90) {
      sim.delete(iso);
      break;
    }
    stay++;
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return stay;
}

/** Find the earliest date after `after` when you can re-enter Schengen */
function nextSafeEntry(set: Set<string>, after: Date): string | null {
  const cur = addDays(after, 1);
  const limit = addDays(after, 185);
  while (cur < limit) {
    if (calcMaxStay(set, cur) > 0) return toISO(cur);
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return null;
}

// ─── PDF export ───────────────────────────────────────────────────────────────
interface BudgetItem {
  flag: string;
  country: string;
  days: number;
  dailyBudget: number;
  total: number;
  entry: string;
  exit: string;
}

async function exportPDF(params: {
  trips: Trip[];
  budgetBreakdown: BudgetItem[];
  totalBudget: number;
  daysUsed: number;
  daysLeft: number;
  earliestEntry: Date | null;
  latestExit: Date | null;
  generatedOn: string;
}) {
  const { jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;

  const { trips, budgetBreakdown, totalBudget, daysUsed, daysLeft,
          earliestEntry, latestExit, generatedOn } = params;

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const margin = 18;
  let y = 0;

  // ── Palette ──────────────────────────────────────────────────────────────────
  const charcoal:  [number,number,number] = [58,  58,  58 ];
  const rose:      [number,number,number] = [227, 169, 156];
  const sage:      [number,number,number] = [143, 163, 141];
  const cream:     [number,number,number] = [249, 245, 242];
  const beige:     [number,number,number] = [231, 221, 211];
  const white:     [number,number,number] = [255, 255, 255];
  const muted:     [number,number,number] = [130, 130, 130];

  // ── Header banner ─────────────────────────────────────────────────────────
  doc.setFillColor(...charcoal);
  doc.rect(0, 0, W, 38, "F");

  // EU stars row (decorative dots)
  doc.setFillColor(...rose);
  const stars = ["★","★","★","★","★","★","★","★","★","★","★","★"];
  stars.forEach((_, idx) => {
    const angle = (idx / 12) * 2 * Math.PI - Math.PI / 2;
    const cx = margin + 8, cy = 19, r = 6;
    const sx = cx + r * Math.cos(angle);
    const sy = cy + r * Math.sin(angle);
    doc.circle(sx, sy, 0.7, "F");
  });

  doc.setTextColor(...white);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("SCHENGEN TRAVEL RECORD", margin + 20, 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(200, 200, 200);
  doc.text("Official-format declaration of Schengen Area travel history & proof-of-funds calculation", margin + 20, 22);
  doc.text(`Generated: ${generatedOn}  •  happyvoyager.com`, margin + 20, 28);

  // Reference window
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...rose);
  doc.text("TRAVEL WINDOW", margin + 20, 34);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(200, 200, 200);
  const windowLabel = earliestEntry && latestExit
    ? `${fmtDate(toISO(earliestEntry))}  →  ${fmtDate(toISO(latestExit))}`
    : "No trips entered";
  doc.text(windowLabel, margin + 20 + 27, 34);

  y = 46;

  // ── Section helper ────────────────────────────────────────────────────────
  const sectionTitle = (title: string) => {
    doc.setFillColor(...beige);
    doc.roundedRect(margin, y, W - margin * 2, 7, 1.5, 1.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...charcoal);
    doc.text(title.toUpperCase(), margin + 3, y + 4.8);
    y += 11;
  };

  // ── 90/180 Status ─────────────────────────────────────────────────────────
  sectionTitle("90 / 180-Day Compliance Summary");

  const statusText = daysLeft === 0 ? "LIMIT REACHED" : daysLeft <= 15 ? "LOW ~ CAUTION" : "COMPLIANT";
  const statusColor: [number,number,number] = daysLeft === 0
    ? [220, 60, 60]
    : daysLeft <= 15
    ? [200, 140, 30]
    : [80, 140, 100];

  // Compliance box
  const boxH = 32;
  doc.setFillColor(...cream);
  doc.roundedRect(margin, y, W - margin * 2, boxH, 2, 2, "F");

  const col1 = margin + 10, col2 = margin + 68, col3 = margin + 122;
  // Three rows: label at top, big number in middle, sub-label at bottom
  const labelY = y + 7;
  const numY   = y + 19;
  const subY   = y + 27;

  // Days Used
  doc.setFont("helvetica", "bold"); doc.setFontSize(7); doc.setTextColor(...muted);
  doc.text("DAYS USED (in window)", col1, labelY);
  doc.setFont("helvetica", "bold"); doc.setFontSize(22); doc.setTextColor(...charcoal);
  doc.text(String(daysUsed), col1, numY);
  doc.setFont("helvetica", "normal"); doc.setFontSize(7); doc.setTextColor(...muted);
  doc.text("out of 90 allowed", col1, subY);

  // Days Remaining
  doc.setFont("helvetica", "bold"); doc.setFontSize(7); doc.setTextColor(...muted);
  doc.text("DAYS REMAINING", col2, labelY);
  doc.setFont("helvetica", "bold"); doc.setFontSize(22);
  doc.setTextColor(daysLeft > 0 ? sage[0] : 220, daysLeft > 0 ? sage[1] : 60, daysLeft > 0 ? sage[2] : 60);
  doc.text(String(daysLeft), col2, numY);
  doc.setFont("helvetica", "normal"); doc.setFontSize(7); doc.setTextColor(...muted);
  doc.text("days available", col2, subY);

  // Status badge
  doc.setFont("helvetica", "bold"); doc.setFontSize(7); doc.setTextColor(...muted);
  doc.text("STATUS", col3, labelY);
  doc.setFillColor(...statusColor);
  doc.roundedRect(col3, numY - 7, 46, 10, 2.5, 2.5, "F");
  doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.setTextColor(...white);
  doc.text(statusText, col3 + 4, numY - 0.5);

  y += boxH + 6;

  // ── Trip Table ────────────────────────────────────────────────────────────
  sectionTitle("Schengen Trip History");

  const tripRows = trips
    .filter((t) => t.entry && t.exit)
    .map((t, idx) => {
      const dur = tripDuration(t);
      const country = SCHENGEN_COUNTRIES.find((c) => c.name === t.country);
      return [
        String(idx + 1),
        t.country ? `${t.country}` : "~",
        fmtDate(t.entry),
        fmtDate(t.exit),
        `${dur} day${dur !== 1 ? "s" : ""}`,
      ];
    });

  if (tripRows.length === 0) {
    doc.setFont("helvetica", "italic"); doc.setFontSize(9);
    doc.setTextColor(...muted);
    doc.text("No trips entered.", margin + 3, y + 4);
    y += 12;
  } else {
    autoTable(doc, {
      startY: y,
      head: [["#", "Country", "Entry Date", "Exit Date", "Duration"]],
      body: tripRows,
      margin: { left: margin, right: margin },
      styles: { font: "helvetica", fontSize: 8.5, cellPadding: 3.5, textColor: charcoal },
      headStyles: {
        fillColor: charcoal, textColor: white, fontStyle: "bold",
        fontSize: 7.5, cellPadding: 3,
      },
      alternateRowStyles: { fillColor: cream },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 48 },
        2: { cellWidth: 38 },
        3: { cellWidth: 38 },
        4: { cellWidth: 28, halign: "center" },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      didParseCell: (data: any) => {
        if (data.section === "head") {
          data.cell.styles.fillColor = charcoal;
        }
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    y = (doc as any).lastAutoTable.finalY + 8;
  }

  // ── Budget Table ──────────────────────────────────────────────────────────
  if (budgetBreakdown.length > 0) {
    sectionTitle("Required Proof of Funds by Country");

    const budgetRows = budgetBreakdown.map((item) => [
      item.country,
      fmtDate(item.entry),
      fmtDate(item.exit),
      String(item.days),
      `€${item.dailyBudget}/day`,
      `€${item.total.toLocaleString()}`,
    ]);

    autoTable(doc, {
      startY: y,
      head: [["Country", "Entry", "Exit", "Days", "Daily Min.", "Required"]],
      body: budgetRows,
      foot: [["", "", "", "", "TOTAL REQUIRED", `€${totalBudget.toLocaleString()}`]],
      margin: { left: margin, right: margin },
      styles: { font: "helvetica", fontSize: 8.5, cellPadding: 3.5, textColor: charcoal },
      headStyles: { fillColor: charcoal, textColor: white, fontStyle: "bold", fontSize: 7.5, cellPadding: 3 },
      footStyles: {
        fillColor: [58, 58, 58], textColor: white, fontStyle: "bold", fontSize: 9,
      },
      alternateRowStyles: { fillColor: cream },
      columnStyles: {
        0: { cellWidth: 42 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 16, halign: "center" },
        4: { cellWidth: 28, halign: "right" },
        5: { cellWidth: 28, halign: "right", fontStyle: "bold" },
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    y = (doc as any).lastAutoTable.finalY + 8;
  }

  // ── Total callout box ─────────────────────────────────────────────────────
  if (budgetBreakdown.length > 0) {
    const boxH = 18;
    doc.setFillColor(...sage);
    doc.roundedRect(margin, y, W - margin * 2, boxH, 2.5, 2.5, "F");

    doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(...white);
    doc.text("TOTAL MINIMUM PROOF OF FUNDS", margin + 5, y + 6.5);
    doc.setFontSize(7); doc.setFont("helvetica", "normal");
    doc.setTextColor(220, 240, 220);
    doc.text("Applicant must demonstrate access to at least this amount at time of border crossing", margin + 5, y + 12);

    doc.setFont("helvetica", "bold"); doc.setFontSize(16); doc.setTextColor(...white);
    const totalStr = `€${totalBudget.toLocaleString()}`;
    const totalW = doc.getTextWidth(totalStr);
    doc.text(totalStr, W - margin - totalW, y + 11);

    y += boxH + 10;
  }

  // ── Declaration box ───────────────────────────────────────────────────────
  sectionTitle("Applicant Declaration");

  doc.setFillColor(...cream);
  doc.roundedRect(margin, y, W - margin * 2, 36, 2, 2, "F");
  doc.setDrawColor(...beige);
  doc.roundedRect(margin, y, W - margin * 2, 36, 2, 2, "S");

  doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(...charcoal);
  const decl = "I declare that the travel history and dates listed above are accurate and complete to the best of my knowledge. This document was generated to support my Schengen visa application and/or border crossing. I understand that providing false information may result in refusal of entry or visa.";
  const lines = doc.splitTextToSize(decl, W - margin * 2 - 8);
  doc.text(lines, margin + 4, y + 7);

  // Signature lines
  const sigY = y + 24;
  doc.setDrawColor(...charcoal);
  doc.line(margin + 4, sigY, margin + 60, sigY);
  doc.line(margin + 80, sigY, margin + 136, sigY);

  doc.setFont("helvetica", "normal"); doc.setFontSize(7); doc.setTextColor(...muted);
  doc.text("Applicant Signature", margin + 4, sigY + 4);
  doc.text("Date", margin + 80, sigY + 4);

  y += 44;

  // ── Footer ────────────────────────────────────────────────────────────────
  const footerY = doc.internal.pageSize.getHeight() - 10;
  doc.setDrawColor(...beige);
  doc.line(margin, footerY - 5, W - margin, footerY - 5);
  doc.setFont("helvetica", "italic"); doc.setFontSize(6.5); doc.setTextColor(...muted);
  doc.text(
    "Generated by Happy Voyager (happyvoyager.com) ~ For informational purposes only. Always verify with official immigration sources.",
    margin, footerY - 1,
  );
  doc.text(`Page 1  •  ${generatedOn}`, W - margin - 28, footerY - 1);

  doc.save(`schengen-travel-record-${toISO(new Date())}.pdf`);
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SchengenCalculator() {
  const todayISO = useMemo(() => toISO(new Date()), []);
  const todayDate = useMemo(() => toUTC(todayISO), [todayISO]);

  const [trips, setTrips] = useState<Trip[]>([
    { id: "1", entry: "", exit: "", country: "" },
  ]);

  // ── Core computed values ────────────────────────────────────────────────────
  const schengenSet = useMemo(() => buildSchengenSet(trips), [trips]);

  // Valid trips only (both dates present, exit >= entry)
  const validTrips = useMemo(
    () => trips.filter((t) => t.entry && t.exit && toUTC(t.exit) >= toUTC(t.entry)),
    [trips]
  );

  // Dynamic date bounds derived from entered trips
  const earliestEntryDate = useMemo<Date | null>(() => {
    if (validTrips.length === 0) return null;
    return validTrips.reduce<Date>((min, t) => {
      const d = toUTC(t.entry);
      return d < min ? d : min;
    }, toUTC(validTrips[0].entry));
  }, [validTrips]);

  const latestExitDate = useMemo<Date | null>(() => {
    if (validTrips.length === 0) return null;
    return validTrips.reduce<Date>((max, t) => {
      const d = toUTC(t.exit);
      return d > max ? d : max;
    }, toUTC(validTrips[0].exit));
  }, [validTrips]);

  // Anchor date for 90/180 calculation = latest exit (falls back to today)
  const refDate = useMemo(
    () => latestExitDate ?? todayDate,
    [latestExitDate, todayDate]
  );

  // 180-day window label boundaries (always a 180-day span ending at refDate)
  const windowStart = useMemo(() => addDays(refDate, -179), [refDate]);

  // Timeline span: always 180 days from earliest entry (falls back to today-anchored window)
  const timelineStart = useMemo(
    () => earliestEntryDate ?? windowStart,
    [earliestEntryDate, windowStart]
  );
  const timelineEnd = useMemo(
    () => addDays(timelineStart, 179),
    [timelineStart]
  );

  const daysUsedNow = useMemo(
    () => daysUsedOn(schengenSet, refDate),
    [schengenSet, refDate]
  );

  const daysLeft = Math.max(0, 90 - daysUsedNow);

  const safeNextDate = useMemo(() => {
    if (daysLeft > 0) return null;
    return nextSafeEntry(schengenSet, refDate);
  }, [schengenSet, daysLeft, refDate]);

  type Status = "clear" | "safe" | "warning" | "danger";
  const status: Status =
    daysUsedNow === 0
      ? "clear"
      : daysLeft === 0
      ? "danger"
      : daysLeft <= 15
      ? "warning"
      : "safe";

  // ── Timeline ─────────────────────────────────────────────────────────────────
  // Spans from earliest entry → latest exit (dynamic), or today-anchored 180d window
  const timelineData = useMemo(() => {
    const data: { date: string; isSchengen: boolean; isToday: boolean }[] = [];
    const cur = new Date(timelineStart);
    while (cur <= timelineEnd) {
      const iso = toISO(cur);
      data.push({
        date: iso,
        isSchengen: schengenSet.has(iso),
        isToday: iso === todayISO,
      });
      cur.setUTCDate(cur.getUTCDate() + 1);
    }
    return data;
  }, [schengenSet, timelineStart, timelineEnd, todayISO]);

  // Chunk into rows of 30 for the grid
  const timelineRows = useMemo(() => {
    const rows: (typeof timelineData)[] = [];
    for (let i = 0; i < timelineData.length; i += 30) {
      rows.push(timelineData.slice(i, i + 30));
    }
    return rows;
  }, [timelineData]);

  // ── Budget breakdown ─────────────────────────────────────────────────────────
  const budgetBreakdown = useMemo(() => {
    return validTrips
      .filter((t) => t.country)
      .map((t) => {
        const days = tripDuration(t);
        const countryData = SCHENGEN_COUNTRIES.find((c) => c.name === t.country);
        const dailyBudget = countryData?.budget ?? 0;
        return {
          flag: countryData?.flag ?? "🏳️",
          country: t.country,
          entry: t.entry,
          exit: t.exit,
          days,
          dailyBudget,
          total: days * dailyBudget,
        };
      })
      .filter((item) => item.days > 0);
  }, [validTrips]);

  const totalBudget = useMemo(
    () => budgetBreakdown.reduce((sum, item) => sum + item.total, 0),
    [budgetBreakdown]
  );

  // ── Trip management ─────────────────────────────────────────────────────────
  const addTrip = () =>
    setTrips((p) => [...p, { id: Date.now().toString(), entry: "", exit: "", country: "" }]);

  const removeTrip = (id: string) =>
    setTrips((p) => p.filter((t) => t.id !== id));

  const updateTrip = (id: string, f: "entry" | "exit" | "country", v: string) =>
    setTrips((p) => p.map((t) => (t.id === id ? { ...t, [f]: v } : t)));

  const reset = () => {
    setTrips([{ id: "1", entry: "", exit: "", country: "" }]);
  };

  // ── Status style helpers ────────────────────────────────────────────────────
  const statusStyles: Record<Status, { card: string; num: string; icon: string }> = {
    clear: {
      card: "bg-white border-[#e7ddd3]",
      num: "text-[#3a3a3a]/30",
      icon: "text-[#bbcccd]",
    },
    safe: {
      card: "bg-[#d4e0d3]/40 border-[#8fa38d]/30",
      num: "text-[#8fa38d]",
      icon: "text-[#8fa38d]",
    },
    warning: {
      card: "bg-amber-50 border-amber-200",
      num: "text-amber-600",
      icon: "text-amber-400",
    },
    danger: {
      card: "bg-red-50 border-red-200",
      num: "text-red-500",
      icon: "text-red-400",
    },
  };
  const ss = statusStyles[status];

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-12 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-[#e7ddd3] rounded-full px-4 py-2 text-sm font-semibold text-[#3a3a3a] mb-6">
            <span>🇪🇺</span>
            <span>Schengen Trip Tracker</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-4 leading-tight">
            Days, Budget & Compliance
            <br className="hidden sm:block" /> ~ All Calculated
          </h1>
          <p className="text-lg text-[#3a3a3a]/60 max-w-2xl mx-auto leading-relaxed">
            Add your Schengen trips by country ~ see your 90/180-day status
            and instantly calculate the minimum funds you need to show at the
            border.
          </p>
        </div>
      </section>

      {/* ── Main ─────────────────────────────────────────────────────────────── */}
      <main className="pb-24 px-6">
        <div className="container mx-auto max-w-4xl space-y-6">

          {/* ── Trip Input ────────────────────────────────────────────────────── */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#e7ddd3]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#3a3a3a] flex items-center gap-2">
                <Plane className="w-5 h-5 text-[#e3a99c]" />
                Your Schengen Trips
              </h2>
              <div className="flex items-center gap-3">
                {validTrips.length > 0 && (
                  <button
                    onClick={() =>
                      exportPDF({
                        trips,
                        budgetBreakdown,
                        totalBudget,
                        daysUsed: daysUsedNow,
                        daysLeft,
                        earliestEntry: earliestEntryDate,
                        latestExit: latestExitDate,
                        generatedOn: new Date().toLocaleDateString("en-US", {
                          month: "long", day: "numeric", year: "numeric",
                        }),
                      })
                    }
                    className="flex items-center gap-1.5 text-xs font-semibold text-white bg-[#3a3a3a] hover:bg-[#e3a99c] rounded-xl px-3 py-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    Export PDF
                  </button>
                )}
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#3a3a3a]/30 hover:text-[#3a3a3a]/60 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>
            </div>

            <div className="space-y-5">
              {trips.map((trip, i) => {
                const dur = tripDuration(trip);
                const hasError =
                  trip.entry &&
                  trip.exit &&
                  toUTC(trip.exit) < toUTC(trip.entry);

                return (
                  <div
                    key={trip.id}
                    className="flex flex-col sm:flex-row gap-3 items-start sm:items-end"
                  >
                    {/* Trip indicator ~ flag or number */}
                    <span className="hidden sm:flex w-8 shrink-0 items-end justify-center pb-3">
                      {trip.country
                        ? <span className="text-xl leading-none">{SCHENGEN_COUNTRIES.find((c) => c.name === trip.country)?.flag}</span>
                        : <span className="text-sm font-bold text-[#3a3a3a]/25">{i + 1}</span>
                      }
                    </span>

                    {/* Date + country inputs */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        {i === 0 && (
                          <label className="block text-[10px] font-bold tracking-widest uppercase text-[#3a3a3a]/40 mb-1.5">
                            Entry Date
                          </label>
                        )}
                        <input
                          type="date"
                          value={trip.entry}
                          onChange={(e) =>
                            updateTrip(trip.id, "entry", e.target.value)
                          }
                          className="w-full rounded-xl border border-[#e7ddd3] px-4 py-2.5 text-sm text-[#3a3a3a] bg-[#f9f5f2] focus:outline-none focus:ring-2 focus:ring-[#e3a99c]/40 focus:border-[#e3a99c] transition-all"
                        />
                      </div>
                      <div>
                        {i === 0 && (
                          <label className="block text-[10px] font-bold tracking-widest uppercase text-[#3a3a3a]/40 mb-1.5">
                            Exit Date
                          </label>
                        )}
                        <input
                          type="date"
                          value={trip.exit}
                          onChange={(e) =>
                            updateTrip(trip.id, "exit", e.target.value)
                          }
                          className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#3a3a3a] bg-[#f9f5f2] focus:outline-none focus:ring-2 focus:ring-[#e3a99c]/40 focus:border-[#e3a99c] transition-all ${
                            hasError ? "border-red-300" : "border-[#e7ddd3]"
                          }`}
                        />
                        {hasError && (
                          <p className="text-[10px] text-red-400 mt-1">
                            Exit must be after entry.
                          </p>
                        )}
                      </div>
                      <div>
                        {i === 0 && (
                          <label className="block text-[10px] font-bold tracking-widest uppercase text-[#3a3a3a]/40 mb-1.5">
                            Country
                          </label>
                        )}
                        <select
                          value={trip.country}
                          onChange={(e) =>
                            updateTrip(trip.id, "country", e.target.value)
                          }
                          className="w-full rounded-xl border border-[#e7ddd3] px-3 py-2.5 text-sm text-[#3a3a3a] bg-[#f9f5f2] focus:outline-none focus:ring-2 focus:ring-[#e3a99c]/40 focus:border-[#e3a99c] transition-all cursor-pointer"
                        >
                          <option value="">Select country</option>
                          {SCHENGEN_COUNTRIES.map((c) => (
                            <option key={c.name} value={c.name}>
                              {c.flag} {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Duration badge + remove */}
                    <div className="flex items-center gap-2 pb-0 sm:pb-0.5">
                      {dur > 0 && !hasError ? (
                        <span className="text-xs font-bold text-[#e3a99c] bg-[#f2d6c9]/60 rounded-full px-3 py-1.5 whitespace-nowrap">
                          {dur}d
                        </span>
                      ) : (
                        <span className="w-14" />
                      )}
                      {trips.length > 1 && (
                        <button
                          onClick={() => removeTrip(trip.id)}
                          className="p-2 rounded-xl text-[#3a3a3a]/20 hover:text-red-400 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={addTrip}
              className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#e3a99c] hover:text-[#3a3a3a] transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add another trip
            </button>
          </div>

          {/* ── Status Dashboard ──────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Days Used */}
            <div className="bg-white rounded-3xl p-6 border border-[#e7ddd3] shadow-sm">
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#3a3a3a]/40 mb-3">
                Days Used
              </p>
              <div className="text-5xl font-bold text-[#3a3a3a] tabular-nums mb-1">
                {daysUsedNow}
              </div>
              <p className="text-xs text-[#3a3a3a]/40 mb-4">
                out of 90 in this window
              </p>
              <div className="h-1.5 bg-[#e7ddd3] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    daysUsedNow >= 90
                      ? "bg-red-400"
                      : daysUsedNow >= 75
                      ? "bg-amber-400"
                      : "bg-[#8fa38d]"
                  }`}
                  style={{
                    width: `${Math.min(100, (daysUsedNow / 90) * 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Days Remaining */}
            <div
              className={`rounded-3xl p-6 border shadow-sm ${ss.card}`}
            >
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#3a3a3a]/40 mb-3">
                Days Remaining
              </p>
              <div
                className={`text-5xl font-bold tabular-nums mb-1 ${ss.num}`}
              >
                {daysLeft}
              </div>
              <p className="text-xs text-[#3a3a3a]/40">
                {daysLeft === 0 && safeNextDate
                  ? `Next entry: ${fmtDate(safeNextDate)}`
                  : "days left in window"}
              </p>
            </div>

            {/* Status */}
            <div
              className={`rounded-3xl p-6 border shadow-sm flex flex-col ${ss.card}`}
            >
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#3a3a3a]/40 mb-3">
                Status
              </p>
              {status === "clear" && (
                <>
                  <CheckCircle2 className={`w-9 h-9 mb-2 ${ss.icon}`} />
                  <p className={`font-bold text-lg ${ss.num}`}>No trips yet</p>
                  <p className="text-xs text-[#3a3a3a]/40 mt-1">
                    Add your dates above
                  </p>
                </>
              )}
              {status === "safe" && (
                <>
                  <CheckCircle2 className={`w-9 h-9 mb-2 ${ss.icon}`} />
                  <p className={`font-bold text-lg ${ss.num}`}>All good 🎉</p>
                  <p className="text-xs text-[#3a3a3a]/40 mt-1">
                    {daysLeft} days available
                  </p>
                </>
              )}
              {status === "warning" && (
                <>
                  <AlertTriangle className={`w-9 h-9 mb-2 ${ss.icon}`} />
                  <p className={`font-bold text-lg ${ss.num}`}>Running low</p>
                  <p className="text-xs text-[#3a3a3a]/40 mt-1">
                    Only {daysLeft} days left
                  </p>
                </>
              )}
              {status === "danger" && (
                <>
                  <XCircle className={`w-9 h-9 mb-2 ${ss.icon}`} />
                  <p className={`font-bold text-lg ${ss.num}`}>Limit reached</p>
                  <p className="text-xs text-[#3a3a3a]/40 mt-1">
                    {safeNextDate
                      ? `Next entry: ${fmtDate(safeNextDate)}`
                      : "No days available"}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* ── 180-Day Timeline ──────────────────────────────────────────────── */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#e7ddd3]">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xl font-bold text-[#3a3a3a]">
                180-Day Window
              </h2>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#3a3a3a]/40">
                  <span className="w-3 h-3 rounded-sm bg-[#e3a99c] inline-block flex-shrink-0" />
                  In Schengen
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#3a3a3a]/40">
                  <span className="w-3 h-3 rounded-sm bg-[#e7ddd3] inline-block flex-shrink-0" />
                  Outside
                </span>
              </div>
            </div>

            <p className="text-xs text-[#3a3a3a]/30 mb-6">
              {fmtDate(toISO(timelineStart))} ~ {fmtDate(toISO(timelineEnd))}
            </p>

            {/* Day grid: rows of 30 with month labels */}
            <div className="space-y-1.5">
              {timelineRows.map((row, ri) => {
                const month = toUTC(row[0].date).toLocaleDateString("en-US", {
                  month: "short",
                  timeZone: "UTC",
                });
                return (
                  <div key={ri} className="flex items-center gap-2">
                    <span className="text-[10px] text-[#3a3a3a]/30 w-7 shrink-0 text-right font-semibold">
                      {month}
                    </span>
                    <div
                      className="flex-1 grid gap-0.5"
                      style={{
                        gridTemplateColumns: `repeat(${row.length}, 1fr)`,
                      }}
                    >
                      {row.map((day) => (
                        <div
                          key={day.date}
                          title={`${day.date}${day.isSchengen ? " · In Schengen" : ""}`}
                          className={`aspect-square rounded-[2px] cursor-default transition-opacity duration-150 hover:opacity-60 ${
                            day.isToday
                              ? `ring-[1.5px] ring-[#3a3a3a]/50 ring-offset-[1px] ${
                                  day.isSchengen
                                    ? "bg-[#e3a99c]"
                                    : "bg-[#e7ddd3]"
                                }`
                              : day.isSchengen
                              ? "bg-[#e3a99c]"
                              : "bg-[#e7ddd3]/60"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-[10px] text-[#3a3a3a]/30 mt-4 leading-relaxed">
              Hover any block to see the date. The outlined block is today.
              Orange = Schengen days used.
            </p>
          </div>

          {/* ── Budget Breakdown ──────────────────────────────────────────────── */}
          {budgetBreakdown.length > 0 && (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#e7ddd3]">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#3a3a3a] flex items-center gap-2">
                    💰 Required Travel Funds
                  </h2>
                  <p className="text-sm text-[#3a3a3a]/50 mt-1">
                    Minimum proof of funds per country ~ what to show at the border
                  </p>
                </div>
                <div className="sm:text-right shrink-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#3a3a3a]/40 mb-1">
                    Total You Need
                  </p>
                  <p className="text-4xl font-bold text-[#3a3a3a] tabular-nums leading-none">
                    €{totalBudget.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-[#3a3a3a]/30 mt-1">
                    across {budgetBreakdown.length} trip{budgetBreakdown.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Per-trip rows */}
              <div className="space-y-2">
                {budgetBreakdown.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-[#f9f5f2] rounded-2xl px-4 py-3"
                  >
                    <span className="text-2xl shrink-0">{item.flag}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#3a3a3a] truncate">
                        {item.country}
                      </p>
                      <p className="text-xs text-[#3a3a3a]/40">
                        {item.days} day{item.days !== 1 ? "s" : ""} × €{item.dailyBudget}/day
                      </p>
                    </div>
                    <p className="text-sm font-bold text-[#3a3a3a] tabular-nums shrink-0">
                      €{item.total.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Total footer */}
              <div className="mt-5 pt-5 border-t border-[#e7ddd3] flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#3a3a3a]/40">
                    Grand Total
                  </p>
                  <p className="text-xs text-[#3a3a3a]/30 mt-0.5">
                    Not what you&apos;ll spend ~ what you need to prove you have
                  </p>
                </div>
                <p className="text-3xl font-bold text-[#8fa38d] tabular-nums">
                  €{totalBudget.toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {/* ── How it works ──────────────────────────────────────────────────── */}
          <div className="bg-[#f2d6c9]/30 rounded-3xl p-6 md:p-8 border border-[#e3a99c]/20">
            <div className="flex gap-4">
              <Info className="w-5 h-5 text-[#e3a99c] shrink-0 mt-0.5" />
              <div className="space-y-3 text-sm text-[#3a3a3a]/70">
                <p className="font-bold text-[#3a3a3a] text-base">
                  How the 90/180 Rule Works
                </p>
                <p>
                  You can spend a maximum of{" "}
                  <strong>90 days in any 180-day rolling window</strong> in the
                  Schengen Area. The window is constantly moving, not tied to a
                  calendar year.
                </p>
                <p>
                  On any given day, count back 180 days. If 90 or more of those
                  days were spent in Schengen, you must leave (or stay out).
                  Both your entry day <em>and</em> exit day count as Schengen
                  days.
                </p>

                <div className="grid grid-cols-3 gap-3 pt-1">
                  <div className="bg-white/70 rounded-2xl p-4 text-center">
                    <p className="text-2xl font-bold text-[#e3a99c] mb-1">
                      90
                    </p>
                    <p className="text-[11px] text-[#3a3a3a]/50">
                      max days allowed
                    </p>
                  </div>
                  <div className="bg-white/70 rounded-2xl p-4 text-center">
                    <p className="text-2xl font-bold text-[#e3a99c] mb-1">
                      180
                    </p>
                    <p className="text-[11px] text-[#3a3a3a]/50">
                      day rolling window
                    </p>
                  </div>
                  <div className="bg-white/70 rounded-2xl p-4 text-center">
                    <p className="text-2xl font-bold text-[#e3a99c] mb-1">
                      Both
                    </p>
                    <p className="text-[11px] text-[#3a3a3a]/50">
                      entry & exit count
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-[#3a3a3a]/40 pt-1 border-t border-[#e3a99c]/20">
                  For informational purposes only. Always verify with official
                  immigration sources. Rules may vary by nationality and
                  bilateral agreements.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
