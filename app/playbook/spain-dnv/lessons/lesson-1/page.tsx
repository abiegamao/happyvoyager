"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Briefcase,
  Globe,
  TrendingUp,
  MapPin,
  Clock,
  Shield,
  ChevronRight,
  RefreshCw,
  Sparkles,
  Lock,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Answers = Record<number, string>;

interface Option {
  id: string;
  label: string;
  description: string;
}

interface Question {
  id: number;
  icon: React.ElementType;
  tag: string;
  title: string;
  subtitle: string;
  options: Option[];
}

// ─── Questions ────────────────────────────────────────────────────────────────

const questions: Question[] = [
  {
    id: 1,
    icon: Briefcase,
    tag: "Work Setup",
    title: "How do you currently earn your income?",
    subtitle:
      "This determines your application track and the documents you'll need.",
    options: [
      {
        id: "employee",
        label: "Remote employee",
        description: "I work for a foreign company under a contract",
      },
      {
        id: "freelancer",
        label: "Freelancer / self-employed",
        description: "I work independently with overseas clients",
      },
      {
        id: "business_owner",
        label: "Business owner",
        description: "I own or co-own a company outside Spain",
      },
      {
        id: "planning",
        label: "Still planning",
        description: "I'm exploring options for the future",
      },
    ],
  },
  {
    id: 2,
    icon: Globe,
    tag: "Nationality",
    title: "What passport do you hold?",
    subtitle:
      "Your nationality affects which consulate you use and the citizenship timeline.",
    options: [
      {
        id: "ph",
        label: "Philippine passport",
        description: "2-year path to Spanish citizenship",
      },
      {
        id: "other_asian",
        label: "Other Asian passport",
        description: "Indonesia, India, Vietnam, Thailand, etc.",
      },
      {
        id: "latam",
        label: "Latin American passport",
        description: "Colombia, Mexico, Brazil, Argentina, etc.",
      },
      {
        id: "other_non_eu",
        label: "Other non-EU passport",
        description: "Africa, Middle East, North America, etc.",
      },
      {
        id: "eu_citizen",
        label: "EU / EEA citizen",
        description: "I already have freedom of movement in Europe",
      },
    ],
  },
  {
    id: 3,
    icon: TrendingUp,
    tag: "Income",
    title: "What's your average monthly income from foreign sources?",
    subtitle:
      "UGE requires EUR 2,894/mo (~EUR 34,728/yr) for a solo applicant as of 2026.",
    options: [
      {
        id: "under_2000",
        label: "Under EUR 2,000/mo",
        description: "Below the current minimum threshold",
      },
      {
        id: "borderline",
        label: "EUR 2,000 ~ EUR 2,894/mo",
        description: "Close to threshold, assessed case-by-case",
      },
      {
        id: "meets",
        label: "EUR 2,894 ~ EUR 5,000/mo",
        description: "Meets or exceeds the minimum requirement",
      },
      {
        id: "above",
        label: "Over EUR 5,000/mo",
        description: "Well above the minimum, strong position",
      },
    ],
  },
  {
    id: 4,
    icon: MapPin,
    tag: "Location",
    title: "Where are you right now?",
    subtitle:
      "Your location determines whether you apply via UGE in Spain or a consulate abroad.",
    options: [
      {
        id: "in_spain",
        label: "Already in Spain",
        description: "Apply directly via UGE, no consulate needed",
      },
      {
        id: "outside_spain",
        label: "Outside Spain & Schengen",
        description: "Apply at the Spanish consulate in your country",
      },
      {
        id: "schengen_tourist",
        label: "In Schengen on tourist entry",
        description: "Timing is critical, let's map this out",
      },
      {
        id: "schengen_visa",
        label: "In another EU country with a visa",
        description: "Apply via consulate in your residence country",
      },
    ],
  },
  {
    id: 5,
    icon: Clock,
    tag: "Track Record",
    title: "How long have you been working remotely?",
    subtitle:
      "UGE wants to see a consistent and documented remote work history.",
    options: [
      {
        id: "under_3mo",
        label: "Less than 3 months",
        description: "Limited track record, needs careful framing",
      },
      {
        id: "3_to_12mo",
        label: "3 months ~ 1 year",
        description: "Solid foundation to build your application on",
      },
      {
        id: "over_1yr",
        label: "Over 1 year",
        description: "Strong, well-documented remote work history",
      },
    ],
  },
  {
    id: 6,
    icon: Shield,
    tag: "Insurance",
    title: "Do you have private international health insurance?",
    subtitle:
      "A valid policy with Spanish coverage is a non-negotiable requirement.",
    options: [
      {
        id: "yes",
        label: "Yes, I'm covered",
        description: "International or Spanish private policy",
      },
      {
        id: "can_get",
        label: "Not yet, but I can get one",
        description: "Easy to sort before submitting",
      },
      {
        id: "not_sure",
        label: "Not sure what I need",
        description: "I need guidance on what qualifies",
      },
    ],
  },
];

// ─── Result Logic ─────────────────────────────────────────────────────────────

interface Result {
  status: "strong" | "likely" | "review" | "eu" | "planning";
  verdict: string;
  summary: string;
  color: string;
  bg: string;
  applicationPath: string;
  workTrack: string;
  timingNote: string;
  nextSteps: string[];
}

function calculateResult(answers: Answers): Result {
  const workSetup = answers[1];
  const nationality = answers[2];
  const income = answers[3];
  const location = answers[4];
  const duration = answers[5];

  if (nationality === "eu_citizen") {
    return {
      status: "eu",
      verdict: "You already have freedom of movement",
      summary:
        "As an EU/EEA citizen, you don't need the Digital Nomad Visa. You can register directly in Spain as an EU resident through the EU Registration Certificate.",
      color: "#8fa38d",
      bg: "#d4e0d3",
      applicationPath:
        "EU Registration Certificate, apply at your local Oficina de Extranjeria.",
      workTrack:
        "No work authorization needed. You can work freely across the EU.",
      timingNote:
        "Processing is typically faster than the DNV, usually within a few weeks.",
      nextSteps: [
        "Arrive in Spain with your EU passport",
        "Register at your local Oficina de Extranjeria",
        "Get your EU Citizen Registration Certificate",
        "Register for a NIE number",
      ],
    };
  }

  if (workSetup === "planning") {
    return {
      status: "planning",
      verdict: "Not quite ready yet, but let's plan ahead",
      summary:
        "You don't have an active remote income setup yet, but the DNV is achievable with the right groundwork. Map out what you need to qualify ~ income targets, contracts, documentation strategy.",
      color: "#7a8f90",
      bg: "#e0eaeb",
      applicationPath:
        "To be determined once you have an active remote income setup.",
      workTrack:
        "Start by establishing a remote income source, either via employment or freelance clients outside Spain.",
      timingNote:
        "Most people can be DNV-ready within 3-6 months of active planning.",
      nextSteps: [
        "Set an income target of EUR 2,894/mo from foreign sources",
        "Establish a clear remote work setup (employed or freelance)",
        "Build 3+ months of documented income history",
        "Book a consultation to map your personal timeline",
      ],
    };
  }

  let score = 0;
  if (income === "above") score += 3;
  else if (income === "meets") score += 2;
  else if (income === "borderline") score += 1;
  else score -= 2;

  if (duration === "over_1yr") score += 2;
  else if (duration === "3_to_12mo") score += 1;

  if (workSetup === "employee" || workSetup === "freelancer") score += 1;
  if (answers[6] === "yes") score += 1;

  let status: Result["status"];
  if (income === "under_2000") status = "review";
  else if (score >= 5) status = "strong";
  else if (score >= 3) status = "likely";
  else status = "review";

  let applicationPath = "";
  let timingNote = "";
  if (location === "in_spain") {
    applicationPath =
      "UGE (Unidad de Grandes Empresas), apply online or in-person directly in Spain.";
    timingNote =
      "UGE processing typically takes 20 business days. Fastest route available.";
  } else if (location === "outside_spain") {
    applicationPath =
      "Spanish consulate in your home country. Submit and collect your visa there before entering Spain.";
    timingNote =
      "Allow 4-12 weeks depending on your consulate. Book your appointment early.";
  } else if (location === "schengen_tourist") {
    applicationPath =
      "Enter Spain and apply via UGE, but your Schengen entry timing is critical.";
    timingNote =
      "A strategy call is strongly recommended to avoid overstay risks.";
  } else {
    applicationPath =
      "Apply at the Spanish consulate in your current country of residence.";
    timingNote =
      "Verify consulate jurisdiction for your specific location before booking.";
  }

  let workTrack = "";
  if (workSetup === "employee") {
    workTrack =
      "Employment track ~ remote work contract, employer authorization letter, and proof of at least 3 months with the company.";
  } else if (workSetup === "freelancer") {
    workTrack =
      "Autonomo (self-employed) track ~ RETA registration in Spain, plus 3+ months of invoices proving consistent foreign client income.";
  } else if (workSetup === "business_owner") {
    workTrack =
      "Business owner applications require careful review. UGE will assess permanent establishment risk and tax implications.";
  }

  const nextSteps: string[] = [];
  if (income === "borderline")
    nextSteps.push(
      "Strengthen your income documentation ~ bank statements, contracts, invoices",
    );
  if (duration === "under_3mo")
    nextSteps.push(
      "Build 3+ months of documented remote work history before applying",
    );
  if (answers[6] !== "yes")
    nextSteps.push(
      "Get international/Spanish health insurance before submitting",
    );
  if (workSetup === "freelancer")
    nextSteps.push("Prepare 3+ months of invoices from overseas clients");
  if (workSetup === "employee")
    nextSteps.push(
      "Obtain an employer authorization letter confirming remote work",
    );
  if (nationality === "ph")
    nextSteps.push("Check PSA document requirements and apostille timelines");
  nextSteps.push(
    "Prepare your cover letter addressing all eligibility criteria",
  );
  nextSteps.push("Start building your document checklist now");

  const verdicts = {
    strong: "You're a strong candidate",
    likely: "You likely qualify ~ a few things to tighten up",
    review:
      income === "under_2000"
        ? "Your income is below the current threshold"
        : "Your profile needs review before applying",
  };

  const summaries = {
    strong:
      "Your profile is well-positioned for the Spain DNV. Your income meets the threshold, your remote work is established, and your setup aligns with what UGE looks for.",
    likely:
      "You likely meet the core requirements, but there are a couple of things to sharpen before submitting. Most of these are fixable.",
    review:
      income === "under_2000"
        ? "Your current income is below the EUR 2,894/mo minimum UGE requires. The threshold isn't flexible, but with the right plan, you can get there."
        : "There are some gaps in your profile that need attention before you apply. Submitting with a weak file risks rejection.",
  };

  const colors = {
    strong: { color: "#8fa38d", bg: "#d4e0d3" },
    likely: { color: "#b8943a", bg: "#fef3cd" },
    review: { color: "#c0625a", bg: "#fde8e6" },
  };

  return {
    status,
    verdict: verdicts[status as "strong" | "likely" | "review"],
    summary: summaries[status as "strong" | "likely" | "review"],
    ...colors[status as "strong" | "likely" | "review"],
    applicationPath,
    workTrack,
    timingNote,
    nextSteps,
  };
}

// ─── Step icons ───────────────────────────────────────────────────────────────

const stepIcons = [Briefcase, Globe, TrendingUp, MapPin, Clock, Shield];

// ─── Phase constants ──────────────────────────────────────────────────────────

const phase = {
  phase: "Phase 0",
  title: "Qualify",
  accent: "#8fa38d",
  bg: "#d4e0d3",
};

// ─── Page Component ───────────────────────────────────────────────────────────

export default function Lesson1Page() {
  const [step, setStep] = useState(0); // 0 = intro, 1-6 = questions, 7 = result
  const [answers, setAnswers] = useState<Answers>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<
    Record<string, boolean>
  >({});

  const totalSteps = questions.length;
  const currentQuestion = questions[step - 1];
  const isIntro = step === 0;
  const isResult = step === totalSteps + 1;

  useEffect(() => {
    const saved = localStorage.getItem("playbook_lesson_progress");
    if (saved) {
      try {
        setCompletedLessons(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse lesson progress", e);
      }
    }
  }, []);

  const toggleComplete = () => {
    const updated = {
      ...completedLessons,
      l01: !completedLessons["l01"],
    };
    setCompletedLessons(updated);
    localStorage.setItem("playbook_lesson_progress", JSON.stringify(updated));
  };

  const handleSelect = (optionId: string) => setSelected(optionId);

  const handleNext = () => {
    if (selected) {
      setAnswers((prev) => ({ ...prev, [step]: selected }));
      setSelected(null);
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setSelected(answers[step - 1] || null);
    setStep((s) => s - 1);
  };

  const handleRestart = () => {
    setAnswers({});
    setSelected(null);
    setStep(0);
  };

  const result = isResult ? calculateResult(answers) : null;
  const isDone = completedLessons["l01"] || false;

  const StatusIcon = result
    ? result.status === "strong"
      ? CheckCircle
      : result.status === "likely"
        ? AlertTriangle
        : result.status === "eu" || result.status === "planning"
          ? Sparkles
          : XCircle
    : null;

  return (
    <div className="flex w-full h-full bg-white text-[#37352f] font-sans">
      <div className="flex-1 px-[calc(min(64px,5vw))] lg:px-12 py-6">
        <div className="max-w-[840px] pl-0 lg:pl-10 mx-auto w-full pb-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[13px] text-[#787774] mb-8 flex-wrap">
            <Link
              href="/playbook/spain-dnv/home"
              className="hover:text-[#37352f] transition-colors"
            >
              Playbook
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span>
              {phase.phase}: {phase.title}
            </span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#37352f] font-medium">Lesson 01</span>
          </nav>

          {/* Lesson Header */}
          <div className="mb-10 border-b border-[#EAE9E9] pb-8">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span
                className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                style={{ color: phase.accent, backgroundColor: phase.bg }}
              >
                {phase.phase}
              </span>
              <span
                className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: phase.bg, color: phase.accent }}
              >
                Interactive Tool
              </span>
              <span className="text-[12px] text-[#787774] flex items-center gap-1">
                <Clock className="w-3 h-3" />2 min
              </span>
              <span className="text-[11px] font-semibold text-[#2383e2] bg-[#e8f0fe] px-2 py-0.5 rounded-full">
                Free
              </span>
            </div>

            <h1 className="text-[36px] leading-[1.15] font-bold text-[#37352f] tracking-tight mb-4">
              Is the DNV Right for You?
            </h1>

            <p className="text-[17px] leading-[1.7] text-[#787774]">
              Answer 6 quick questions about your work setup, income, and
              situation. Get a personalised eligibility verdict and your best
              application path.
            </p>
          </div>

          {/* ── INTRO ── */}
          {isIntro && (
            <div className="mb-10">
              <div className="rounded-xl border border-[#EAE9E9] p-6 mb-6">
                <h3 className="text-[16px] font-semibold text-[#37352f] mb-4">
                  What you&apos;ll get
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      icon: CheckCircle,
                      text: "Eligibility verdict based on your income, work setup, and background",
                    },
                    {
                      icon: MapPin,
                      text: "Best application path ~ UGE in Spain vs. consulate abroad",
                    },
                    {
                      icon: Briefcase,
                      text: "Your employment track and which documents you'll need",
                    },
                    {
                      icon: Clock,
                      text: "Personalised next steps to start or strengthen your application",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          backgroundColor: phase.bg,
                          color: phase.accent,
                        }}
                      >
                        <item.icon className="w-3 h-3" />
                      </div>
                      <span className="text-[14px] text-[#37352f] leading-relaxed">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#37352f] text-white text-[14px] font-semibold hover:bg-[#2f2f2f] transition-colors"
              >
                Start the Assessment
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="mt-3 text-[12px] text-[#787774]">
                Free ~ Takes about 2 minutes
              </p>
            </div>
          )}

          {/* ── QUESTIONS ── */}
          {!isIntro && !isResult && currentQuestion && (
            <div className="mb-10">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {stepIcons.map((Icon, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
                        style={{
                          backgroundColor:
                            i + 1 < step
                              ? phase.bg
                              : i + 1 === step
                                ? "#37352f"
                                : "#f7f7f5",
                          color:
                            i + 1 < step
                              ? phase.accent
                              : i + 1 === step
                                ? "white"
                                : "#c4c4c2",
                        }}
                      >
                        {i + 1 < step ? (
                          <CheckCircle className="w-3.5 h-3.5" />
                        ) : (
                          <Icon className="w-3.5 h-3.5" />
                        )}
                      </div>
                    ))}
                  </div>
                  <span className="text-[12px] font-medium text-[#787774]">
                    {step} / {totalSteps}
                  </span>
                </div>
                <div className="h-1.5 bg-[#EAE9E9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#37352f] rounded-full transition-all duration-500"
                    style={{ width: `${(step / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="rounded-xl border border-[#EAE9E9] p-6 mb-5">
                <span
                  className="inline-block text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-4"
                  style={{ color: phase.accent, backgroundColor: phase.bg }}
                >
                  {currentQuestion.tag}
                </span>
                <h2 className="text-[22px] font-bold text-[#37352f] mb-2 leading-tight">
                  {currentQuestion.title}
                </h2>
                <p className="text-[14px] text-[#787774] mb-6 leading-relaxed">
                  {currentQuestion.subtitle}
                </p>

                <div className="space-y-2.5">
                  {currentQuestion.options.map((option) => {
                    const isChosen = selected === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSelect(option.id)}
                        className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 text-left transition-all ${
                          isChosen
                            ? "border-[#37352f] bg-[#f7f7f5]"
                            : "border-[#EAE9E9] hover:border-[#c4c4c2] hover:bg-[#fafafa]"
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-semibold text-[#37352f]">
                            {option.label}
                          </p>
                          <p className="text-[12px] text-[#787774] mt-0.5">
                            {option.description}
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                            isChosen
                              ? "border-[#37352f] bg-[#37352f]"
                              : "border-[#c4c4c2]"
                          }`}
                        >
                          {isChosen && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-3">
                {step > 1 && (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-5 py-3 rounded-lg border border-[#EAE9E9] text-[#787774] text-[14px] font-semibold hover:bg-[#f7f7f5] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={!selected}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-[14px] font-semibold transition-all ${
                    selected
                      ? "bg-[#37352f] text-white hover:bg-[#2f2f2f]"
                      : "bg-[#EAE9E9] text-[#c4c4c2] cursor-not-allowed"
                  }`}
                >
                  {step === totalSteps ? "See My Result" : "Next Question"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ── RESULT ── */}
          {isResult && result && StatusIcon && (
            <div className="mb-10">
              {/* Verdict */}
              <div
                className="rounded-xl p-6 mb-6 border"
                style={{
                  backgroundColor: result.bg,
                  borderColor: result.color + "40",
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: result.color + "25" }}
                  >
                    <StatusIcon
                      className="w-5 h-5"
                      style={{ color: result.color }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-[11px] font-bold uppercase tracking-wider mb-1"
                      style={{ color: result.color }}
                    >
                      Your eligibility verdict
                    </p>
                    <h2
                      className="text-[22px] font-bold leading-tight mb-3"
                      style={{ color: result.color }}
                    >
                      {result.verdict}
                    </h2>
                    <p
                      className="text-[14px] leading-relaxed"
                      style={{ color: result.color, opacity: 0.85 }}
                    >
                      {result.summary}
                    </p>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4 mb-6">
                {/* Application Path */}
                <div className="rounded-lg border border-[#EAE9E9] p-5">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: phase.bg,
                        color: phase.accent,
                      }}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#787774] mb-1.5">
                        Your application path
                      </p>
                      <p className="text-[14px] text-[#37352f] font-semibold mb-1">
                        {result.applicationPath}
                      </p>
                      <p className="text-[12px] text-[#787774]">
                        {result.timingNote}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Work Track */}
                {result.workTrack && (
                  <div className="rounded-lg border border-[#EAE9E9] p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#f2d6c9] flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-3.5 h-3.5 text-[#e3a99c]" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-[#787774] mb-1.5">
                          Your employment track
                        </p>
                        <p className="text-[14px] text-[#787774] leading-relaxed">
                          {result.workTrack}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Next Steps */}
                <div className="rounded-lg border border-[#EAE9E9] p-5">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: phase.bg,
                        color: phase.accent,
                      }}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#787774] mb-3">
                        Your personalised next steps
                      </p>
                      <div className="space-y-2">
                        {result.nextSteps.map((s, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                backgroundColor: phase.bg,
                                color: phase.accent,
                              }}
                            >
                              <span className="text-[10px] font-bold">
                                {i + 1}
                              </span>
                            </div>
                            <p className="text-[14px] text-[#787774]">{s}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-xl bg-[#37352f] p-6 mb-6">
                <h3 className="text-[18px] font-bold text-white mb-2">
                  {result.status === "strong"
                    ? "Ready to move forward?"
                    : "Let's map your path"}
                </h3>
                <p className="text-[14px] text-white/60 mb-5 leading-relaxed">
                  {result.status === "strong"
                    ? "Continue through the playbook to get everything from your first document to citizenship."
                    : "Book a consultation to go through your profile in detail and build your application strategy."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/playbook/spain-dnv/lessons/lesson-2"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white text-[#37352f] text-[14px] font-semibold hover:bg-[#f7f7f5] transition-colors"
                  >
                    Next Lesson
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/booking"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-white/20 text-white text-[14px] font-semibold hover:bg-white/10 transition-colors"
                  >
                    Book a Consultation
                  </Link>
                </div>
              </div>

              {/* Retake */}
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 text-[13px] text-[#787774] hover:text-[#37352f] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retake assessment
              </button>
            </div>
          )}

          {/* Mark Complete */}
          <div className="mb-12">
            <button
              onClick={toggleComplete}
              className={`flex items-center gap-3 px-5 py-3 rounded-lg border text-[14px] font-semibold transition-colors ${
                isDone
                  ? "bg-[#37352f] text-white border-[#37352f]"
                  : "bg-white text-[#37352f] border-[#EAE9E9] hover:bg-[#f7f7f5]"
              }`}
            >
              {isDone ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Completed
                </>
              ) : (
                <>
                  <div className="w-4 h-4 rounded border border-[#c4c4c2]" />
                  Mark as complete
                </>
              )}
            </button>
          </div>

          {/* Prev / Next */}
          <div className="border-t border-[#EAE9E9] pt-8 flex flex-col sm:flex-row gap-4">
            <div className="flex-1" />
            <Link
              href="/playbook/spain-dnv/lessons/lesson-2"
              className="flex-1 flex items-center justify-end gap-3 p-5 rounded-xl border border-[#EAE9E9] hover:bg-[#f7f7f5] transition-colors group text-right"
            >
              <div className="min-w-0">
                <div className="text-[11px] text-[#787774] font-medium mb-0.5">
                  Next
                </div>
                <div className="text-[14px] font-semibold text-[#37352f] truncate">
                  02. Understanding Spain&apos;s Visa Landscape
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#787774] group-hover:text-[#37352f] transition-colors flex-shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
