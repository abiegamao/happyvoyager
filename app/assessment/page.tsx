"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Briefcase,
  Globe,
  TrendingUp,
  MapPin,
  Clock,
  Shield,
  CalendarCheck,
  BookOpen,
  Sparkles,
  RefreshCw,
  Loader2,
  Lock,
} from "lucide-react";
import BookCallButton from "@/components/BookCallButton";

// ─── Types ────────────────────────────────────────────────────────────────────

type Answers = Record<number, string>;

interface Option {
  id: string;
  emoji: string;
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
    subtitle: "This determines your application track and the documents you'll need to prepare.",
    options: [
      { id: "employee", emoji: "💼", label: "Remote employee", description: "I work for a foreign company under a contract" },
      { id: "freelancer", emoji: "💻", label: "Freelancer / self-employed", description: "I work independently with multiple overseas clients" },
      { id: "business_owner", emoji: "🏢", label: "Business owner", description: "I own or co-own a company outside Spain" },
      { id: "planning", emoji: "🔭", label: "Still planning", description: "I'm exploring options for the future" },
    ],
  },
  {
    id: 2,
    icon: Globe,
    tag: "Nationality",
    title: "What passport do you hold?",
    subtitle: "Your nationality affects which consulate you use and the citizenship timeline.",
    options: [
      { id: "ph", emoji: "🇵🇭", label: "Philippine passport", description: "2-year path to Spanish citizenship" },
      { id: "other_asian", emoji: "🌏", label: "Other Asian passport", description: "Indonesia, India, Vietnam, Thailand, etc." },
      { id: "latam", emoji: "🌎", label: "Latin American passport", description: "Colombia, Mexico, Brazil, Argentina, etc." },
      { id: "other_non_eu", emoji: "🌍", label: "Other non-EU passport", description: "Africa, Middle East, North America, etc." },
      { id: "eu_citizen", emoji: "🇪🇺", label: "EU / EEA citizen", description: "I already have freedom of movement in Europe" },
    ],
  },
  {
    id: 3,
    icon: TrendingUp,
    tag: "Income",
    title: "What's your average monthly income from foreign sources?",
    subtitle: "UGE requires €2,894/mo (~€34,728/yr) for a solo applicant as of 2026.",
    options: [
      { id: "under_2000", emoji: "📉", label: "Under €2,000/mo", description: "Below the current minimum threshold" },
      { id: "borderline", emoji: "📊", label: "€2,000 – €2,894/mo", description: "Close to threshold, assessed case-by-case" },
      { id: "meets", emoji: "✅", label: "€2,894 – €5,000/mo", description: "Meets or exceeds the minimum requirement" },
      { id: "above", emoji: "🚀", label: "Over €5,000/mo", description: "Well above the minimum, strong position" },
    ],
  },
  {
    id: 4,
    icon: MapPin,
    tag: "Location",
    title: "Where are you right now?",
    subtitle: "This helps us figure out the right timing for your move and UGE application in Spain.",
    options: [
      { id: "in_spain", emoji: "🇪🇸", label: "Already in Spain", description: "Perfect, you can apply directly via UGE" },
      { id: "planning_move", emoji: "✈️", label: "Planning to move to Spain soon", description: "We'll map the best timing for your entry and application" },
      { id: "schengen_tourist", emoji: "🛂", label: "In Schengen on a tourist entry", description: "Timing is key, let's figure out your window" },
      { id: "outside_europe", emoji: "🌍", label: "Outside Europe for now", description: "We'll plan your move to Spain and application timeline together" },
    ],
  },
  {
    id: 5,
    icon: Clock,
    tag: "Track Record",
    title: "How long have you been working remotely?",
    subtitle: "UGE wants to see a consistent and documented remote work history.",
    options: [
      { id: "under_3mo", emoji: "🌱", label: "Less than 3 months", description: "Limited track record, needs careful framing" },
      { id: "3_to_12mo", emoji: "📆", label: "3 months – 1 year", description: "Solid foundation to build your application on" },
      { id: "over_1yr", emoji: "⭐", label: "Over 1 year", description: "Strong, well-documented remote work history" },
    ],
  },
  {
    id: 6,
    icon: Shield,
    tag: "Insurance",
    title: "Do you have private international health insurance?",
    subtitle: "A valid policy with Spanish coverage is a non-negotiable requirement.",
    options: [
      { id: "yes", emoji: "✅", label: "Yes, I'm covered", description: "I have an international or Spanish private policy" },
      { id: "can_get", emoji: "🔄", label: "Not yet, but I can get one", description: "This is easy to sort before submitting" },
      { id: "not_sure", emoji: "❓", label: "Not sure what I need", description: "I need guidance on what qualifies" },
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
  border: string;
  applicationPath: string;
  workTrack: string;
  timingNote: string;
  nextSteps: string[];
  primaryCTA: "playbook" | "call";
}

function calculateResult(answers: Answers): Result {
  const workSetup = answers[1];
  const nationality = answers[2];
  const income = answers[3];
  const location = answers[4];
  const duration = answers[5];
  const insurance = answers[6];

  // EU citizen special case
  if (nationality === "eu_citizen") {
    return {
      status: "eu",
      verdict: "You already have freedom of movement",
      summary: "As an EU/EEA citizen, you don't need the Digital Nomad Visa. You can register directly in Spain as an EU resident through the EU Registration Certificate (Certificado de Registro de Ciudadano de la Unión). It's a simpler process.",
      color: "#8fa38d",
      bg: "#d4e0d3",
      border: "#8fa38d",
      applicationPath: "EU Registration Certificate, apply at your local Oficina de Extranjería in Spain.",
      workTrack: "No work authorization needed. You can work freely across the EU.",
      timingNote: "Processing is typically faster than the DNV, usually within a few weeks.",
      nextSteps: ["Arrive in Spain with your EU passport", "Register at your local Oficina de Extranjería", "Get your EU Citizen Registration Certificate (green card)", "Register for a NIE number"],
      primaryCTA: "call",
    };
  }

  // Still planning
  if (workSetup === "planning") {
    return {
      status: "planning",
      verdict: "Not quite ready yet, but let's plan ahead",
      summary: "You don't have an active remote income setup yet, but the DNV is absolutely achievable with the right groundwork. Book a strategy call to map out exactly what you need to qualify, income targets, contracts, documentation strategy.",
      color: "#bbcccd",
      bg: "#e0eaeb",
      border: "#bbcccd",
      applicationPath: "To be determined once you have an active remote income setup.",
      workTrack: "Start by establishing a remote income source, either via employment or freelance clients outside Spain.",
      timingNote: "Most people can be DNV-ready within 3–6 months of active planning.",
      nextSteps: ["Set an income target of €2,894/mo from foreign sources", "Establish a clear remote work setup (employed or freelance)", "Build 3+ months of documented income history", "Book a call to map your personal qualification timeline"],
      primaryCTA: "call",
    };
  }

  // Score calculation
  let score = 0;

  if (income === "above") score += 3;
  else if (income === "meets") score += 2;
  else if (income === "borderline") score += 1;
  else score -= 2; // under_2000

  if (duration === "over_1yr") score += 2;
  else if (duration === "3_to_12mo") score += 1;

  if (workSetup === "employee" || workSetup === "freelancer") score += 1;

  if (insurance === "yes") score += 1;

  // Status
  let status: Result["status"];
  if (income === "under_2000") {
    status = "review";
  } else if (score >= 5) {
    status = "strong";
  } else if (score >= 3) {
    status = "likely";
  } else {
    status = "review";
  }

  // Application path
  let applicationPath = "";
  let timingNote = "";
  if (location === "in_spain") {
    applicationPath = "UGE (Unidad de Grandes Empresas), apply online or in-person directly in Spain. This is the path I recommend and the one I used myself.";
    timingNote = "UGE processing typically takes 20 business days. You're in the best position to move quickly.";
  } else if (location === "planning_move") {
    applicationPath = "Plan your entry into Spain and apply via UGE once you arrive. We'll map the right timing around your current situation.";
    timingNote = "A strategy call will help us work out the exact entry window and preparation checklist before you fly.";
  } else if (location === "schengen_tourist") {
    applicationPath = "You can enter Spain on your current Schengen days and apply via UGE, but timing is everything. Your remaining days and entry date matter.";
    timingNote = "Book a strategy call so we can map this out carefully before you commit to a flight.";
  } else {
    applicationPath = "The goal is to get you into Spain so you can apply via UGE directly. We'll figure out the right timing and entry strategy for your situation.";
    timingNote = "A strategy call will give us a clear picture of your timeline and what to prepare before you arrive.";
  }

  // Work track
  let workTrack = "";
  if (workSetup === "employee") {
    workTrack = "Employment track, you'll need a remote work contract, employer authorization letter, and proof of at least 3 months with the company (existing DNV holders are exempt from this).";
  } else if (workSetup === "freelancer") {
    workTrack = "Autónomo (self-employed) track, RETA registration in Spain, plus 3+ months of invoices proving consistent foreign client income.";
  } else if (workSetup === "business_owner") {
    workTrack = "Business owner applications require careful review. UGE will assess permanent establishment risk and tax implications. A strategy call is essential.";
  }

  // Next steps
  const nextSteps: string[] = [];
  if (income === "borderline") nextSteps.push("Strengthen your income documentation, bank statements, contracts, invoices");
  if (duration === "under_3mo") nextSteps.push("Build 3+ months of documented remote work history before applying");
  if (insurance !== "yes") nextSteps.push("Get international/Spanish health insurance before submitting");
  if (workSetup === "freelancer") nextSteps.push("Prepare 3+ months of invoices from overseas clients");
  if (workSetup === "employee") nextSteps.push("Obtain an employer authorization letter confirming remote work");
  if (nationality === "ph") nextSteps.push("Check PSA document requirements and apostille timelines");
  nextSteps.push("Prepare your cover letter addressing all eligibility criteria");
  nextSteps.push("Start building your document checklist now");

  const verdicts = {
    strong: "You're a strong candidate, let's get you moving",
    likely: "You likely qualify, a few things to tighten up",
    review: income === "under_2000"
      ? "Your income is below the current threshold"
      : "Your profile needs review before applying",
  };

  const summaries = {
    strong: `Your profile is well-positioned for the Spain DNV. Your income meets the threshold, your remote work is established, and your setup aligns with what UGE looks for. With the right documentation strategy, you have a strong application.`,
    likely: `You likely meet the core requirements, but there are a couple of things to sharpen before submitting. The good news: most of these are fixable. Below is your personalised path.`,
    review: income === "under_2000"
      ? `Your current income is below the €2,894/mo minimum UGE requires. The threshold isn't flexible, but with the right plan, you can get there. Book a call to map out a realistic timeline.`
      : `There are some gaps in your profile that need attention before you apply. Submitting with a weak file risks rejection and wastes time. Let's build a stronger case first.`,
  };

  const colors = {
    strong: { color: "#8fa38d", bg: "#d4e0d3", border: "#8fa38d" },
    likely: { color: "#b8943a", bg: "#fef3cd", border: "#d4a847" },
    review: { color: "#c0625a", bg: "#fde8e6", border: "#e3a99c" },
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
    primaryCTA: status === "strong" ? "playbook" : "call",
  };
}

// ─── Icons map ────────────────────────────────────────────────────────────────

const stepIcons = [Briefcase, Globe, TrendingUp, MapPin, Clock, Shield];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AssessmentPage() {
  const [step, setStep] = useState(0); // 0 = intro, 1-6 = questions, 7 = capture, 8 = result
  const [answers, setAnswers] = useState<Answers>({});
  const [selected, setSelected] = useState<string | null>(null);

  // Capture form state
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [captureError, setCaptureError] = useState("");
  const [captureLoading, setCaptureLoading] = useState(false);
  const [captureSubmitted, setCaptureSubmitted] = useState(false);

  const totalSteps = questions.length;
  const currentQuestion = questions[step - 1];
  const isIntro = step === 0;
  const isCapture = step === totalSteps + 1;
  const isResult = step === totalSteps + 2;

  const handleSelect = (optionId: string) => {
    setSelected(optionId);
  };

  const handleNext = () => {
    if (selected) {
      setAnswers((prev) => ({ ...prev, [step]: selected }));
      setSelected(null);
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (isCapture) {
      setSelected(answers[totalSteps] || null);
      setStep(totalSteps);
    } else {
      setSelected(answers[step - 1] || null);
      setStep((s) => s - 1);
    }
  };

  const handleCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setCaptureError("");

    if (!firstName.trim()) { setCaptureError("Please enter your first name"); return; }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) { setCaptureError("Please enter a valid email address"); return; }

    setCaptureLoading(true);
    try {
      await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: firstName.trim(), email: email.trim(), answers }),
      });
    } catch (_) {
      // Non-blocking, still show results even if API fails
    }
    setCaptureLoading(false);
    setCaptureSubmitted(true);
    setStep((s) => s + 1);
  };

  const handleSkipCapture = () => {
    setStep((s) => s + 1);
  };

  const handleRestart = () => {
    setAnswers({});
    setSelected(null);
    setFirstName("");
    setEmail("");
    setCaptureError("");
    setCaptureSubmitted(false);
    setStep(0);
  };

  const result = isResult ? calculateResult(answers) : null;

  const StatusIcon = result
    ? result.status === "strong"
      ? CheckCircle2
      : result.status === "likely"
        ? AlertTriangle
        : result.status === "eu" || result.status === "planning"
          ? Sparkles
          : XCircle
    : null;

  return (
    <main className="min-h-screen bg-[#f9f5f2] text-[#3a3a3a]">
      <Header />

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">

          {/* ── INTRO ── */}
          {isIntro && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/40 border border-[#f2d6c9] mb-6">
                <span className="w-2 h-2 rounded-full bg-[#e3a99c] animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">Free · Takes 2 minutes</span>
              </div>

              <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-4 leading-tight">
                Do you qualify for the{" "}
                <span className="font-script text-[#e3a99c] text-5xl md:text-6xl relative inline-block transform -rotate-1">
                  Spain DNV?
                </span>
              </h1>
              <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] mb-10 max-w-lg mx-auto leading-relaxed">
                Answer 6 questions about your work setup, income, and situation. Get a personalised eligibility verdict and your best application path.
              </p>

              {/* What you'll get */}
              <div className="bg-white rounded-3xl border border-[#e7ddd3] p-6 mb-8 text-left">
                <p className="text-xs font-bold tracking-widest text-[#aaaaaa] uppercase mb-5">What you'll get</p>
                <div className="space-y-4">
                  {[
                    { icon: CheckCircle2, color: "#8fa38d", text: "Eligibility verdict based on your income, work setup, and background" },
                    { icon: MapPin, color: "#7a8f90", text: "Entry timing strategy and your UGE application path in Spain" },
                    { icon: Briefcase, color: "#e3a99c", text: "Your employment track, employed vs. autónomo, and what documents you'll need" },
                    { icon: CalendarCheck, color: "#bbcccd", text: "Personalised next steps to start or strengthen your application" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: item.color + "20" }}>
                        <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                      </div>
                      <p className="text-sm text-[#6b6b6b] leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#3a3a3a] text-white font-bold hover:bg-[#e3a99c] hover:text-[#3a3a3a] transition-all duration-300 text-base group w-full sm:w-auto"
              >
                Start the Assessment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="mt-4 text-xs text-[#aaaaaa]">Free · Takes ~2 minutes · Email required to see your result</p>
            </div>
          )}

          {/* ── QUESTIONS ── */}
          {!isIntro && !isCapture && !isResult && currentQuestion && (
            <div>
              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {stepIcons.map((Icon, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                          backgroundColor: i + 1 < step ? "#8fa38d20" : i + 1 === step ? "#e3a99c" : "#f2f2f2",
                          color: i + 1 < step ? "#8fa38d" : i + 1 === step ? "white" : "#cccccc",
                        }}
                      >
                        {i + 1 < step ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Icon className="w-3.5 h-3.5" />
                        )}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#aaaaaa]">
                    {step} / {totalSteps}
                  </span>
                </div>
                <div className="h-1.5 bg-[#e7ddd3] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#e3a99c] rounded-full transition-all duration-500"
                    style={{ width: `${(step / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question card */}
              <div className="bg-white rounded-3xl border border-[#e7ddd3] p-6 md:p-8 mb-5 shadow-sm">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2d6c9]/40 border border-[#f2d6c9] mb-5">
                  <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">{currentQuestion.tag}</span>
                </div>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#3a3a3a] mb-2 leading-tight">
                  {currentQuestion.title}
                </h2>
                <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] mb-6 leading-relaxed">
                  {currentQuestion.subtitle}
                </p>

                {/* Options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => {
                    const isChosen = selected === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSelect(option.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 group ${isChosen
                          ? "border-[#e3a99c] bg-[#f2d6c9]/20"
                          : "border-[#e7ddd3] bg-white hover:border-[#e3a99c]/50 hover:bg-[#f9f5f2]"
                          }`}
                      >
                        <span className="text-2xl flex-shrink-0 w-10 text-center">{option.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold text-sm ${isChosen ? "text-[#3a3a3a]" : "text-[#3a3a3a]"}`}>
                            {option.label}
                          </p>
                          <p className="text-xs text-[#6b6b6b] mt-0.5">{option.description}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${isChosen ? "border-[#e3a99c] bg-[#e3a99c]" : "border-[#e7ddd3]"
                          }`}>
                          {isChosen && <div className="w-2 h-2 rounded-full bg-white" />}
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
                    className="flex items-center gap-2 px-5 py-3.5 rounded-full border-2 border-[#e7ddd3] text-[#6b6b6b] font-bold hover:border-[#3a3a3a] hover:text-[#3a3a3a] transition-all text-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={!selected}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm transition-all duration-200 ${selected
                    ? "bg-[#3a3a3a] text-white hover:bg-[#e3a99c] hover:text-[#3a3a3a]"
                    : "bg-[#e7ddd3] text-[#aaaaaa] cursor-not-allowed"
                    }`}
                >
                  {step === totalSteps ? "Almost there →" : "Next Question"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ── CAPTURE ── */}
          {isCapture && (
            <div>
              {/* Progress, show as complete */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {stepIcons.map((Icon, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#8fa38d20", color: "#8fa38d" }}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#8fa38d]">Done ✓</span>
                </div>
                <div className="h-1.5 bg-[#e7ddd3] rounded-full overflow-hidden">
                  <div className="h-full bg-[#8fa38d] rounded-full w-full transition-all duration-500" />
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#e7ddd3] p-6 md:p-8 shadow-sm">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2d6c9]/40 border border-[#f2d6c9] mb-5">
                  <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">Almost there</span>
                </div>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#3a3a3a] mb-2 leading-tight">
                  Where should I send your result?
                </h2>
                <p className="text-sm text-[#6b6b6b] mb-6 leading-relaxed">
                  Enter your name and email to see your personalised eligibility verdict and application path. No spam, just your result.
                </p>

                <form onSubmit={handleCapture} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#3a3a3a] mb-1.5">First name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => { setFirstName(e.target.value); setCaptureError(""); }}
                      placeholder="e.g. Maria"
                      className="w-full bg-[#f9f5f2] border border-[#e7ddd3] rounded-2xl px-5 py-3.5 text-[#3a3a3a] placeholder:text-[#cccccc] focus:outline-none focus:border-[#e3a99c] transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#3a3a3a] mb-1.5">Email address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setCaptureError(""); }}
                      placeholder="e.g. maria@email.com"
                      className="w-full bg-[#f9f5f2] border border-[#e7ddd3] rounded-2xl px-5 py-3.5 text-[#3a3a3a] placeholder:text-[#cccccc] focus:outline-none focus:border-[#e3a99c] transition-all text-sm"
                    />
                  </div>

                  {captureError && (
                    <p className="text-sm text-red-500 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {captureError}
                    </p>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <Lock className="w-3 h-3 text-[#aaaaaa]" />
                    <span className="text-xs text-[#aaaaaa]">Your info is private and never shared.</span>
                  </div>

                  <div className="flex flex-col gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={captureLoading}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#3a3a3a] text-white font-bold hover:bg-[#e3a99c] hover:text-[#3a3a3a] transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {captureLoading ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                      ) : (
                        <><CheckCircle2 className="w-4 h-4" /> See My Result<ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              <button
                onClick={handleBack}
                className="mt-4 flex items-center gap-2 text-sm text-[#aaaaaa] hover:text-[#3a3a3a] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to last question
              </button>
            </div>
          )}

          {/* ── RESULT ── */}
          {isResult && result && StatusIcon && (
            <div>
              {/* Verdict card */}
              <div
                className="rounded-3xl p-7 md:p-9 mb-6 border"
                style={{ backgroundColor: result.bg, borderColor: result.border }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: result.color + "30" }}
                  >
                    <StatusIcon className="w-6 h-6" style={{ color: result.color }} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-bold tracking-widest uppercase mb-1"
                      style={{ color: result.color }}
                    >
                      Your eligibility verdict
                    </p>
                    <h2
                      className="font-[family-name:var(--font-heading)] text-2xl font-bold leading-tight mb-3"
                      style={{ color: result.status === "likely" ? "#7a5c1a" : result.color }}
                    >
                      {result.verdict}
                    </h2>
                    <p className="text-sm leading-relaxed" style={{ color: result.status === "likely" ? "#7a5c1a" : result.color, opacity: 0.85 }}>
                      {result.summary}
                    </p>
                  </div>
                </div>
              </div>

              {/* Details */}
              {result.status !== "eu" && result.status !== "planning" && (
                <div className="space-y-4 mb-6">
                  {/* Application Path */}
                  <div className="bg-white rounded-2xl border border-[#e7ddd3] p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#e0eaeb] flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-[#7a8f90]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold tracking-widest text-[#aaaaaa] uppercase mb-1.5">Your application path</p>
                        <p className="text-sm text-[#3a3a3a] font-semibold mb-1">{result.applicationPath}</p>
                        <p className="text-xs text-[#6b6b6b]">{result.timingNote}</p>
                      </div>
                    </div>
                  </div>

                  {/* Work Track */}
                  <div className="bg-white rounded-2xl border border-[#e7ddd3] p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#f2d6c9] flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-4 h-4 text-[#e3a99c]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold tracking-widest text-[#aaaaaa] uppercase mb-1.5">Your employment track</p>
                        <p className="text-sm text-[#6b6b6b] leading-relaxed">{result.workTrack}</p>
                      </div>
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="bg-white rounded-2xl border border-[#e7ddd3] p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#d4e0d3] flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-[#8fa38d]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold tracking-widest text-[#aaaaaa] uppercase mb-3">Your personalised next steps</p>
                        <div className="space-y-2">
                          {result.nextSteps.map((step, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <div className="w-5 h-5 rounded-full bg-[#f2d6c9] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-[10px] font-bold text-[#e3a99c]">{i + 1}</span>
                              </div>
                              <p className="text-sm text-[#6b6b6b]">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* EU / Planning extra guidance */}
              {(result.status === "eu" || result.status === "planning") && (
                <div className="bg-white rounded-2xl border border-[#e7ddd3] p-5 mb-6">
                  <p className="text-xs font-bold tracking-widest text-[#aaaaaa] uppercase mb-3">Next steps</p>
                  <div className="space-y-2">
                    {result.nextSteps.map((s, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-[#f2d6c9] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold text-[#e3a99c]">{i + 1}</span>
                        </div>
                        <p className="text-sm text-[#6b6b6b]">{s}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="bg-[#3a3a3a] rounded-3xl p-6 md:p-8">
                <p className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase mb-3">
                  {result.primaryCTA === "playbook" ? "Ready to move forward?" : "Let's talk through your situation"}
                </p>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-white mb-2 leading-tight">
                  {result.primaryCTA === "playbook"
                    ? "Get the full step-by-step system"
                    : "Book a 1-on-1 strategy call with Abie"}
                </h3>
                <p className="text-sm text-white/60 mb-6 leading-relaxed">
                  {result.primaryCTA === "playbook"
                    ? "The Spain DNV Playbook has everything you need, document templates, a step-by-step process, and the exact system used to get approved."
                    : "We'll go through your profile in detail, identify what's missing, and map your exact path to a successful application."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  {result.primaryCTA === "playbook" ? (
                    <>
                      <Link
                        href="/#pricing"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#e3a99c] text-[#3a3a3a] font-bold hover:bg-white transition-all text-sm group"
                      >
                        <BookOpen className="w-4 h-4" />
                        See the Packages
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                      <BookCallButton
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-2 border-white/20 text-white font-bold hover:border-white hover:bg-white/10 transition-all text-sm"
                        url="https://calendly.com/abie-gamao/spain-dnv"
                        title="Book a Strategy Call"
                      >
                        <CalendarCheck className="w-4 h-4" />
                        Book a Strategy Call
                      </BookCallButton>
                    </>
                  ) : (
                    <>
                      <BookCallButton
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#e3a99c] text-[#3a3a3a] font-bold hover:bg-white transition-all text-sm group"
                        url="https://calendly.com/abie-gamao/spain-dnv"
                        title="Book a Strategy Call"
                      >
                        <CalendarCheck className="w-4 h-4" />
                        Book a Strategy Call
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </BookCallButton>
                      <Link
                        href="/digital-nomad-visa"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-2 border-white/20 text-white font-bold hover:border-white hover:bg-white/10 transition-all text-sm"
                      >
                        Read the Full DNV Guide
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Restart */}
              <button
                onClick={handleRestart}
                className="mt-6 flex items-center gap-2 text-sm text-[#aaaaaa] hover:text-[#3a3a3a] transition-colors mx-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Start over
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
