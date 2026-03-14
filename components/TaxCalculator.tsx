"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Calculator,
  Briefcase,
  Laptop,
  Info,
  TrendingDown,
  TrendingUp,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Mail,
  Download,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import BookCallButton from "@/components/BookCallButton";

// ─── Types ───────────────────────────────────────
type WorkerType = "autonomo" | "employed";
type IncomeMode = "monthly" | "annual";

interface TaxBreakdown {
  grossIncome: number;
  irpfAmount: number;
  irpfEffectiveRate: number;
  autonomoFee: number;
  socialSecurity: number;
  totalDeductions: number;
  netTakeHome: number;
  monthlyNet: number;
}

// ─── Tax Constants (2025~2026) ───────────────────
const IRPF_BRACKETS = [
  { floor: 0, ceiling: 12_450, rate: 0.19 },
  { floor: 12_450, ceiling: 20_200, rate: 0.24 },
  { floor: 20_200, ceiling: 35_200, rate: 0.30 },
  { floor: 35_200, ceiling: 60_000, rate: 0.37 },
  { floor: 60_000, ceiling: 300_000, rate: 0.45 },
  { floor: 300_000, ceiling: Infinity, rate: 0.47 },
];

const AUTONOMO_BRACKETS = [
  { maxNet: 670, fee: 230 },
  { maxNet: 900, fee: 260 },
  { maxNet: 1_166, fee: 275 },
  { maxNet: 1_300, fee: 291 },
  { maxNet: 1_500, fee: 294 },
  { maxNet: 1_700, fee: 294 },
  { maxNet: 1_850, fee: 310 },
  { maxNet: 2_030, fee: 315 },
  { maxNet: 2_330, fee: 320 },
  { maxNet: 2_760, fee: 330 },
  { maxNet: 3_190, fee: 350 },
  { maxNet: 3_620, fee: 370 },
  { maxNet: 4_050, fee: 390 },
  { maxNet: 6_000, fee: 530 },
  { maxNet: Infinity, fee: 590 },
];

const TARIFA_PLANA = 80;
const TARIFA_PLANA_MAX_ANNUAL = 16_576;
const BECKHAM_RATE = 0.24;
const BECKHAM_CAP = 600_000;
const EMPLOYEE_SS_RATE = 0.0635;

// ─── Calculator Logic ────────────────────────────
function calculateIRPF(taxableIncome: number): number {
  let tax = 0;
  for (const bracket of IRPF_BRACKETS) {
    if (taxableIncome <= bracket.floor) break;
    const taxable = Math.min(taxableIncome, bracket.ceiling) - bracket.floor;
    tax += taxable * bracket.rate;
  }
  return tax;
}

function calculateBeckhamTax(income: number): number {
  if (income <= BECKHAM_CAP) return income * BECKHAM_RATE;
  return BECKHAM_CAP * BECKHAM_RATE + (income - BECKHAM_CAP) * 0.47;
}

function getAutonomoFee(monthlyNet: number, isFirstTwoYears: boolean): number {
  if (isFirstTwoYears && monthlyNet * 12 < TARIFA_PLANA_MAX_ANNUAL) return TARIFA_PLANA;
  for (const bracket of AUTONOMO_BRACKETS) {
    if (monthlyNet <= bracket.maxNet) return bracket.fee;
  }
  return 590;
}

function calculateTax(
  annualIncome: number,
  workerType: WorkerType,
  isFirstTwoYears: boolean,
  useBeckhamLaw: boolean
): TaxBreakdown {
  const gross = annualIncome;

  let irpfAmount: number;
  let autonomoFee = 0;
  let socialSecurity = 0;

  if (workerType === "employed" && useBeckhamLaw) {
    irpfAmount = calculateBeckhamTax(gross);
    // Beckham Law ~ no standard SS deduction modeled (employer handles it)
  } else if (workerType === "employed") {
    irpfAmount = calculateIRPF(gross);
    socialSecurity = gross * EMPLOYEE_SS_RATE;
  } else {
    // Autónomo: apply 7% flat deduction for expenses
    const deductible = gross * 0.93;
    irpfAmount = calculateIRPF(deductible);
    const monthlyNet = deductible / 12;
    autonomoFee = getAutonomoFee(monthlyNet, isFirstTwoYears) * 12;
  }

  const totalDeductions = irpfAmount + autonomoFee + socialSecurity;
  const netTakeHome = gross - totalDeductions;
  const irpfEffectiveRate = gross > 0 ? (irpfAmount / gross) * 100 : 0;

  return {
    grossIncome: gross,
    irpfAmount,
    irpfEffectiveRate,
    autonomoFee,
    socialSecurity,
    totalDeductions,
    netTakeHome,
    monthlyNet: netTakeHome / 12,
  };
}

// ─── Formatting ──────────────────────────────────
function formatEUR(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

// ─── Component ───────────────────────────────────
export default function TaxCalculator() {
  const [incomeInput, setIncomeInput] = useState("");
  const [incomeMode, setIncomeMode] = useState<IncomeMode>("annual");
  const [workerType, setWorkerType] = useState<WorkerType>("autonomo");
  const [isFirstTwoYears, setIsFirstTwoYears] = useState(true);
  const [useBeckhamLaw, setUseBeckhamLaw] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showBeckhamInfo, setShowBeckhamInfo] = useState(false);

  const annualIncome = useMemo(() => {
    const raw = parseFloat(incomeInput.replace(/,/g, "")) || 0;
    return incomeMode === "monthly" ? raw * 12 : raw;
  }, [incomeInput, incomeMode]);

  const result = useMemo(() => {
    if (!hasCalculated || annualIncome <= 0) return null;
    return calculateTax(annualIncome, workerType, isFirstTwoYears, useBeckhamLaw);
  }, [hasCalculated, annualIncome, workerType, isFirstTwoYears, useBeckhamLaw]);

  // Year 1 vs Year 3+ comparison for autónomos
  const comparison = useMemo(() => {
    if (!result || workerType !== "autonomo") return null;
    const year1 = calculateTax(annualIncome, "autonomo", true, false);
    const year3 = calculateTax(annualIncome, "autonomo", false, false);
    return { year1, year3, savings: year3.autonomoFee - year1.autonomoFee };
  }, [result, annualIncome, workerType]);

  // Beckham comparison for employed
  const beckhamComparison = useMemo(() => {
    if (!result || workerType !== "employed") return null;
    const withBeckham = calculateTax(annualIncome, "employed", false, true);
    const without = calculateTax(annualIncome, "employed", false, false);
    return { withBeckham, without, savings: withBeckham.netTakeHome - without.netTakeHome };
  }, [result, annualIncome, workerType]);

  // Save results state
  const [saveEmail, setSaveEmail] = useState("");
  const [saveFirstName, setSaveFirstName] = useState("");
  const [saveSending, setSaveSending] = useState(false);
  const [saveSent, setSaveSent] = useState(false);
  const [saveError, setSaveError] = useState("");

  const handleSaveEmail = useCallback(async () => {
    if (!saveEmail.trim() || !/^\S+@\S+\.\S+$/.test(saveEmail)) {
      setSaveError("Please enter a valid email");
      return;
    }
    if (!result) return;

    setSaveSending(true);
    setSaveError("");
    try {
      await fetch("/api/ghl/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: saveEmail.trim(),
          firstName: saveFirstName.trim() || undefined,
          source: "Tax Calculator",
          tags: ["Tax Calculator", "Happy Voyager", "Free Tool"],
          customFields: {
            "Gross Income": formatEUR(result.grossIncome) + "/year",
            "Worker Type": workerType === "autonomo" ? "Freelancer / Autónomo" : "Employed",
            "IRPF Tax": `${formatEUR(result.irpfAmount)} (${result.irpfEffectiveRate.toFixed(1)}% eff.)`,
            "Net Take-Home": `${formatEUR(result.netTakeHome)}/year (${formatEUR(result.monthlyNet)}/mo)`,
            ...(workerType === "autonomo" ? { "Autónomo Fee": `${formatEUR(result.autonomoFee)}/mo` } : {}),
            ...(useBeckhamLaw ? { "Beckham Law": "Yes" } : {}),
          },
        }),
      });
      setSaveSent(true);
    } catch {
      setSaveError("Something went wrong. Try again.");
    }
    setSaveSending(false);
  }, [saveEmail, saveFirstName, result, workerType, useBeckhamLaw]);

  const handleDownloadPDF = useCallback(async () => {
    if (!result) return;
    const { generateTaxPDF } = await import("@/lib/generate-tax-pdf");

    const brackets = IRPF_BRACKETS.map((b) => {
      const taxable = Math.min(Math.max(annualIncome - b.floor, 0), b.ceiling - b.floor);
      return {
        range: b.ceiling === Infinity ? `€${b.floor.toLocaleString()}+` : `€${b.floor.toLocaleString()} ~ €${b.ceiling.toLocaleString()}`,
        rate: `${(b.rate * 100).toFixed(0)}%`,
        amount: taxable * b.rate,
      };
    });

    const blob = generateTaxPDF({
      grossIncome: annualIncome,
      workerType,
      irpfAmount: result.irpfAmount,
      irpfEffectiveRate: result.irpfEffectiveRate,
      autonomoFee: result.autonomoFee,
      socialSecurity: result.socialSecurity,
      netTakeHome: result.netTakeHome,
      monthlyNet: result.monthlyNet,
      isFirstTwoYears,
      useBeckhamLaw,
      beckhamTax: beckhamComparison?.withBeckham.irpfAmount,
      standardTax: beckhamComparison?.without.irpfAmount,
      irpfBrackets: brackets,
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "spain-tax-breakdown.pdf";
    a.click();
    URL.revokeObjectURL(url);
  }, [result, annualIncome, workerType, isFirstTwoYears, useBeckhamLaw, beckhamComparison]);

  const handleCalculate = () => {
    if (annualIncome > 0) setHasCalculated(true);
  };

  return (
    <div className="relative">
      {/* Hero */}
      <section className="section-padding bg-[#f9f5f2] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4e0d3]/20 rounded-full blur-[80px]" />
        <div className="max-w-2xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4e0d3]/30 border border-[#8fa38d]/30 mb-6">
            <Calculator className="w-4 h-4 text-[#8fa38d]" />
            <span className="text-xs font-bold tracking-widest text-[#8fa38d] uppercase">
              Free Tool
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-[#3a3a3a] mb-6 leading-tight">
            Spain Tax &{" "}
            <span className="font-script text-[#e3a99c] text-5xl md:text-6xl lg:text-7xl relative inline-block transform -rotate-2">
              Autónomo
            </span>{" "}
            Calculator
          </h1>

          <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] leading-relaxed max-w-xl mx-auto">
            Enter your income and see exactly how much you keep after Spanish taxes and social security. Freelancer or employed ~ we got you.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="px-4 sm:px-6 -mt-4 pb-20 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Input Card */}
          <div className="bg-white rounded-3xl border border-[#e7ddd3] p-6 md:p-10 shadow-sm mb-6">
            {/* Income Input */}
            <div className="mb-8">
              <label className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a] mb-3 block">
                💰 Your gross income
              </label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6b6b] font-semibold text-lg">€</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={incomeInput}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9.,]/g, "");
                      setIncomeInput(val);
                      setHasCalculated(false);
                    }}
                    placeholder={incomeMode === "monthly" ? "3,500" : "42,000"}
                    className="w-full bg-[#f9f5f2] border border-[#e7ddd3] rounded-2xl pl-10 pr-4 py-4 text-xl font-bold text-[#3a3a3a] placeholder-[#ccc] focus:outline-none focus:border-[#e3a99c] focus:ring-2 focus:ring-[#e3a99c]/20 transition-all"
                  />
                </div>
                <div className="flex bg-[#f9f5f2] border border-[#e7ddd3] rounded-2xl overflow-hidden">
                  <button
                    onClick={() => { setIncomeMode("monthly"); setHasCalculated(false); }}
                    className={`px-4 py-4 text-sm font-semibold transition-all ${
                      incomeMode === "monthly"
                        ? "bg-[#3a3a3a] text-white"
                        : "text-[#6b6b6b] hover:text-[#3a3a3a]"
                    }`}
                  >
                    /mo
                  </button>
                  <button
                    onClick={() => { setIncomeMode("annual"); setHasCalculated(false); }}
                    className={`px-4 py-4 text-sm font-semibold transition-all ${
                      incomeMode === "annual"
                        ? "bg-[#3a3a3a] text-white"
                        : "text-[#6b6b6b] hover:text-[#3a3a3a]"
                    }`}
                  >
                    /yr
                  </button>
                </div>
              </div>
            </div>

            {/* Worker Type */}
            <div className="mb-8">
              <label className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a] mb-3 block">
                🧑‍💻 How do you work?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setWorkerType("autonomo"); setUseBeckhamLaw(false); setHasCalculated(false); }}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                    workerType === "autonomo"
                      ? "border-[#e3a99c] bg-[#f2d6c9]/20"
                      : "border-[#e7ddd3] hover:border-[#bbcccd]"
                  }`}
                >
                  <Briefcase className={`w-5 h-5 ${workerType === "autonomo" ? "text-[#e3a99c]" : "text-[#6b6b6b]"}`} />
                  <div className="text-left">
                    <p className={`text-sm font-bold ${workerType === "autonomo" ? "text-[#3a3a3a]" : "text-[#6b6b6b]"}`}>
                      Freelancer
                    </p>
                    <p className="text-xs text-[#aaa]">Autónomo</p>
                  </div>
                </button>
                <button
                  onClick={() => { setWorkerType("employed"); setIsFirstTwoYears(false); setHasCalculated(false); }}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                    workerType === "employed"
                      ? "border-[#e3a99c] bg-[#f2d6c9]/20"
                      : "border-[#e7ddd3] hover:border-[#bbcccd]"
                  }`}
                >
                  <Laptop className={`w-5 h-5 ${workerType === "employed" ? "text-[#e3a99c]" : "text-[#6b6b6b]"}`} />
                  <div className="text-left">
                    <p className={`text-sm font-bold ${workerType === "employed" ? "text-[#3a3a3a]" : "text-[#6b6b6b]"}`}>
                      Employed
                    </p>
                    <p className="text-xs text-[#aaa]">Remote worker</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Conditional Options */}
            {workerType === "autonomo" && (
              <div className="mb-8 p-4 rounded-2xl bg-[#d4e0d3]/20 border border-[#8fa38d]/20">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFirstTwoYears}
                    onChange={(e) => { setIsFirstTwoYears(e.target.checked); setHasCalculated(false); }}
                    className="w-5 h-5 rounded accent-[#8fa38d]"
                  />
                  <div>
                    <span className="text-sm font-bold text-[#3a3a3a]">First 2 years in Spain?</span>
                    <p className="text-xs text-[#6b6b6b]">You may qualify for tarifa plana ~ only €80/month</p>
                  </div>
                </label>
              </div>
            )}

            {workerType === "employed" && (
              <div className="mb-8 p-4 rounded-2xl bg-[#f2d6c9]/20 border border-[#e3a99c]/20">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useBeckhamLaw}
                    onChange={(e) => { setUseBeckhamLaw(e.target.checked); setHasCalculated(false); }}
                    className="w-5 h-5 rounded accent-[#e3a99c]"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-bold text-[#3a3a3a]">Eligible for Beckham Law?</span>
                    <p className="text-xs text-[#6b6b6b]">Flat 24% tax rate for up to 6 years</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); setShowBeckhamInfo(!showBeckhamInfo); }}
                    className="text-[#e3a99c] hover:text-[#d69586] transition-colors"
                  >
                    {showBeckhamInfo ? <ChevronUp className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                  </button>
                </label>
                {showBeckhamInfo && (
                  <div className="mt-3 p-3 bg-white rounded-xl text-xs text-[#6b6b6b] leading-relaxed">
                    The Beckham Law applies to employees who moved to Spain, work for a Spanish-registered employer, and were not tax residents in Spain for the prior 5 years. Self-employed/autónomos do not qualify. The flat 24% rate applies up to €600,000/year.
                  </div>
                )}
              </div>
            )}

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              disabled={!incomeInput || annualIncome <= 0}
              className="w-full py-4 rounded-2xl bg-[#3a3a3a] text-white font-bold text-lg hover:bg-[#e3a99c] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Calculate My Take-Home Pay
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Summary Card */}
              <div className="bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a] rounded-3xl p-6 md:p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-60 h-60 bg-[#e3a99c]/10 rounded-full blur-[60px] pointer-events-none" />
                <div className="relative z-10">
                  <p className="text-sm text-[#e7ddd3] mb-1">Your estimated monthly take-home</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl font-bold">
                      {formatEUR(result.monthlyNet)}
                    </span>
                    <span className="text-[#e7ddd3] text-lg">/mo</span>
                  </div>
                  <p className="text-[#e7ddd3] text-sm mb-6">
                    {formatEUR(result.netTakeHome)} per year
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-sm">
                      <TrendingDown className="w-3.5 h-3.5 text-[#e3a99c]" />
                      {result.irpfEffectiveRate.toFixed(1)}% effective tax rate
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-sm">
                      <TrendingUp className="w-3.5 h-3.5 text-[#8fa38d]" />
                      {((result.netTakeHome / result.grossIncome) * 100).toFixed(0)}% take-home ratio
                    </span>
                  </div>
                </div>
              </div>

              {/* Breakdown Card */}
              <div className="bg-white rounded-3xl border border-[#e7ddd3] p-6 md:p-8">
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a] mb-6">
                  📊 Full Breakdown
                </h3>

                {/* Visual Bar */}
                <div className="h-4 rounded-full overflow-hidden flex mb-6">
                  <div
                    className="bg-[#8fa38d] transition-all duration-700"
                    style={{ width: `${(result.netTakeHome / result.grossIncome) * 100}%` }}
                    title="Take-home"
                  />
                  <div
                    className="bg-[#e3a99c] transition-all duration-700"
                    style={{ width: `${(result.irpfAmount / result.grossIncome) * 100}%` }}
                    title="Income tax"
                  />
                  {result.autonomoFee > 0 && (
                    <div
                      className="bg-[#bbcccd] transition-all duration-700"
                      style={{ width: `${(result.autonomoFee / result.grossIncome) * 100}%` }}
                      title="Autónomo fees"
                    />
                  )}
                  {result.socialSecurity > 0 && (
                    <div
                      className="bg-[#bbcccd] transition-all duration-700"
                      style={{ width: `${(result.socialSecurity / result.grossIncome) * 100}%` }}
                      title="Social security"
                    />
                  )}
                </div>
                <div className="flex flex-wrap gap-4 mb-6 text-xs text-[#6b6b6b]">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#8fa38d]" />Take-home</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#e3a99c]" />Income tax</span>
                  {(result.autonomoFee > 0 || result.socialSecurity > 0) && (
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#bbcccd]" />{workerType === "autonomo" ? "Autónomo SS" : "Social security"}</span>
                  )}
                </div>

                {/* Line Items */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[#6b6b6b]">Gross Income</span>
                    <span className="font-bold text-[#3a3a3a]">{formatEUR(result.grossIncome)}</span>
                  </div>
                  <div className="border-t border-[#e7ddd3]" />
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[#6b6b6b]">
                      {workerType === "employed" && useBeckhamLaw
                        ? "Beckham Law Tax (24%)"
                        : `IRPF Income Tax (${result.irpfEffectiveRate.toFixed(1)}% eff.)`}
                    </span>
                    <span className="font-bold text-[#e3a99c]">-{formatEUR(result.irpfAmount)}</span>
                  </div>
                  {result.autonomoFee > 0 && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-[#6b6b6b]">
                        Autónomo SS ({formatEUR(result.autonomoFee / 12)}/mo)
                      </span>
                      <span className="font-bold text-[#bbcccd]">-{formatEUR(result.autonomoFee)}</span>
                    </div>
                  )}
                  {result.socialSecurity > 0 && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-[#6b6b6b]">Employee Social Security (6.35%)</span>
                      <span className="font-bold text-[#bbcccd]">-{formatEUR(result.socialSecurity)}</span>
                    </div>
                  )}
                  <div className="border-t-2 border-[#3a3a3a]" />
                  <div className="flex justify-between items-center py-2">
                    <span className="font-bold text-[#3a3a3a] text-lg">Net Take-Home</span>
                    <div className="text-right">
                      <span className="font-bold text-[#8fa38d] text-lg">{formatEUR(result.netTakeHome)}</span>
                      <p className="text-xs text-[#6b6b6b]">{formatEUR(result.monthlyNet)}/mo</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Year 1 vs Year 3+ Comparison (autónomos only) */}
              {comparison && comparison.savings > 0 && (
                <div className="bg-white rounded-3xl border border-[#e7ddd3] p-6 md:p-8">
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a] mb-2">
                    🎉 Tarifa Plana Savings
                  </h3>
                  <p className="text-sm text-[#6b6b6b] mb-6">
                    New autónomos in Spain pay just €80/month for the first 2 years instead of the full rate.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-[#d4e0d3]/20 border border-[#8fa38d]/20 text-center">
                      <p className="text-xs font-bold tracking-widest text-[#8fa38d] uppercase mb-2">Year 1~2</p>
                      <p className="font-bold text-2xl text-[#3a3a3a] mb-1">{formatEUR(comparison.year1.autonomoFee / 12)}<span className="text-sm font-normal text-[#6b6b6b]">/mo</span></p>
                      <p className="text-xs text-[#6b6b6b]">Tarifa Plana</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#f9f5f2] border border-[#e7ddd3] text-center">
                      <p className="text-xs font-bold tracking-widest text-[#6b6b6b] uppercase mb-2">Year 3+</p>
                      <p className="font-bold text-2xl text-[#3a3a3a] mb-1">{formatEUR(comparison.year3.autonomoFee / 12)}<span className="text-sm font-normal text-[#6b6b6b]">/mo</span></p>
                      <p className="text-xs text-[#6b6b6b]">Full rate</p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-[#8fa38d]/10 border border-[#8fa38d]/20 text-center">
                    <span className="text-sm font-bold text-[#8fa38d]">
                      You save {formatEUR(comparison.savings)}/year with tarifa plana ✨
                    </span>
                  </div>
                </div>
              )}

              {/* Beckham Comparison (employed only) */}
              {beckhamComparison && workerType === "employed" && (
                <div className="bg-white rounded-3xl border border-[#e7ddd3] p-6 md:p-8">
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a] mb-2">
                    ⚖️ Beckham Law vs Standard Tax
                  </h3>
                  <p className="text-sm text-[#6b6b6b] mb-6">
                    See how much you could save with Spain&apos;s flat-rate expat tax regime.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-4 rounded-2xl text-center ${useBeckhamLaw ? "bg-[#f2d6c9]/20 border border-[#e3a99c]/20" : "bg-[#f9f5f2] border border-[#e7ddd3]"}`}>
                      <p className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase mb-2">Beckham Law</p>
                      <p className="font-bold text-2xl text-[#3a3a3a] mb-1">{formatEUR(beckhamComparison.withBeckham.monthlyNet)}<span className="text-sm font-normal text-[#6b6b6b]">/mo</span></p>
                      <p className="text-xs text-[#6b6b6b]">24% flat rate</p>
                    </div>
                    <div className={`p-4 rounded-2xl text-center ${!useBeckhamLaw ? "bg-[#f2d6c9]/20 border border-[#e3a99c]/20" : "bg-[#f9f5f2] border border-[#e7ddd3]"}`}>
                      <p className="text-xs font-bold tracking-widest text-[#6b6b6b] uppercase mb-2">Standard IRPF</p>
                      <p className="font-bold text-2xl text-[#3a3a3a] mb-1">{formatEUR(beckhamComparison.without.monthlyNet)}<span className="text-sm font-normal text-[#6b6b6b]">/mo</span></p>
                      <p className="text-xs text-[#6b6b6b]">Progressive rates</p>
                    </div>
                  </div>

                  {beckhamComparison.savings > 0 && (
                    <div className="mt-4 p-3 rounded-xl bg-[#e3a99c]/10 border border-[#e3a99c]/20 text-center">
                      <span className="text-sm font-bold text-[#e3a99c]">
                        Beckham Law saves you {formatEUR(beckhamComparison.savings)}/year ✨
                      </span>
                    </div>
                  )}
                  {beckhamComparison.savings < 0 && (
                    <div className="mt-4 p-3 rounded-xl bg-[#f9f5f2] border border-[#e7ddd3] text-center">
                      <span className="text-sm text-[#6b6b6b]">
                        At this income level, standard IRPF is actually cheaper by {formatEUR(Math.abs(beckhamComparison.savings))}/year
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* IRPF Bracket Breakdown */}
              <div className="bg-white rounded-3xl border border-[#e7ddd3] p-6 md:p-8">
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a] mb-4">
                  📋 IRPF Tax Brackets (2025~2026)
                </h3>
                <div className="space-y-2">
                  {IRPF_BRACKETS.map((bracket, i) => {
                    const taxable = Math.min(Math.max(annualIncome - bracket.floor, 0), bracket.ceiling - bracket.floor);
                    const tax = taxable * bracket.rate;
                    const isActive = annualIncome > bracket.floor;

                    return (
                      <div
                        key={i}
                        className={`flex items-center justify-between text-sm py-2 px-3 rounded-xl transition-colors ${
                          isActive ? "bg-[#f9f5f2]" : "opacity-40"
                        }`}
                      >
                        <span className="text-[#6b6b6b]">
                          {bracket.ceiling === Infinity
                            ? `€${bracket.floor.toLocaleString()}+`
                            : `€${bracket.floor.toLocaleString()} ~ €${bracket.ceiling.toLocaleString()}`}
                        </span>
                        <span className="text-[#6b6b6b]">{(bracket.rate * 100).toFixed(0)}%</span>
                        <span className={`font-bold ${isActive ? "text-[#e3a99c]" : "text-[#ccc]"}`}>
                          {formatEUR(tax)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-[#aaa] text-center px-4 leading-relaxed">
                This calculator provides estimates based on 2025~2026 Spanish tax rates. Actual obligations may vary based on your region, deductions, and personal situation. Always consult a Spanish tax advisor (gestor) for personalised guidance.
              </p>

              {/* Save Results */}
              <div className="bg-white rounded-3xl border border-[#e7ddd3] p-6 md:p-8">
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a] mb-1">
                  📩 Save Your Results
                </h3>
                <p className="text-sm text-[#6b6b6b] mb-5">
                  Download a PDF or get your breakdown sent to your email.
                </p>

                {saveSent ? (
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#d4e0d3]/40 border border-[#8fa38d]/30">
                    <CheckCircle2 className="w-5 h-5 text-[#8fa38d] flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-[#3a3a3a]">Sent! Check your inbox.</p>
                      <p className="text-xs text-[#6b6b6b]">We&apos;ve emailed your tax breakdown to {saveEmail}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={saveFirstName}
                        onChange={(e) => { setSaveFirstName(e.target.value); setSaveError(""); }}
                        placeholder="First name"
                        className="bg-[#f9f5f2] border border-[#e7ddd3] rounded-2xl px-4 py-3 text-sm text-[#3a3a3a] placeholder:text-[#ccc] focus:outline-none focus:border-[#e3a99c] transition-all"
                      />
                      <input
                        type="email"
                        value={saveEmail}
                        onChange={(e) => { setSaveEmail(e.target.value); setSaveError(""); }}
                        placeholder="Email address"
                        className="bg-[#f9f5f2] border border-[#e7ddd3] rounded-2xl px-4 py-3 text-sm text-[#3a3a3a] placeholder:text-[#ccc] focus:outline-none focus:border-[#e3a99c] transition-all"
                      />
                    </div>
                    {saveError && (
                      <p className="text-xs text-red-500">{saveError}</p>
                    )}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleSaveEmail}
                        disabled={saveSending}
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#3a3a3a] text-white font-bold text-sm hover:bg-[#e3a99c] transition-all disabled:opacity-60"
                      >
                        {saveSending ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                        ) : (
                          <><Mail className="w-4 h-4" /> Email My Breakdown</>
                        )}
                      </button>
                      <button
                        onClick={handleDownloadPDF}
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full border-2 border-[#e7ddd3] text-[#3a3a3a] font-bold text-sm hover:border-[#3a3a3a] transition-all"
                      >
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Block */}
              <div className="bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a] rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-60 h-60 bg-[#e3a99c]/10 rounded-full blur-[60px] pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold mb-3">
                    Ready to make the move?
                  </h3>
                  <p className="text-[#e7ddd3] mb-8 max-w-md mx-auto">
                    The Playbook walks you through every step ~ from eligibility to your first tax return in Spain.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href="/#pricing"
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#3a3a3a] font-bold hover:bg-[#e3a99c] hover:text-white transition-all duration-300"
                    >
                      See the Packages
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <BookCallButton
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 text-white font-bold hover:bg-white/10 transition-all duration-300"
                    >
                      Book a Free Call
                    </BookCallButton>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
