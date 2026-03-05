import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShareButton from "@/components/ShareButton";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Globe,
  Shield,
  Clock,
  DollarSign,
  AlertTriangle,
  FileText,
  Users,
  Heart,
  Home,
  TrendingUp,
  BookOpen,
  Plane,
  BadgeCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Spain Non-Lucrative Visa (NLV): The Complete Guide for Passive Income Earners | Happy Voyager",
  description:
    "Everything you need to know about Spain's Non-Lucrative Visa ~ financial requirements, application steps, tax implications, and who it's really for.",
};

const sections = [
  { id: "who-is-this-for", label: "Is This You?" },
  { id: "what-is-nlv", label: "What Is the NLV?" },
  { id: "requirements", label: "Financial Requirements" },
  { id: "can-and-cant", label: "Can & Can't Do" },
  { id: "application", label: "Application Steps" },
  { id: "taxes", label: "Tax Implications" },
  { id: "documents", label: "Documents" },
  { id: "residency-path", label: "Residency & Citizenship" },
  { id: "nlv-vs-dnv", label: "NLV vs DNV" },
];

const profiles = [
  {
    emoji: "🌴",
    title: "The Early Retiree",
    body: "Retired in your 50s or 60s with a pension, investment portfolio, or real estate income. You want warm weather, low cost of living, and a real life ~ not just a vacation.",
    bg: "#f2d6c9",
    accent: "#e3a99c",
  },
  {
    emoji: "📈",
    title: "The Passive Investor",
    body: "Dividends, rental income, or a business you no longer actively run. Your money works so you don't have to. Spain is where you want to spend that freedom.",
    bg: "#e0eaeb",
    accent: "#7a8f90",
  },
  {
    emoji: "🏡",
    title: "The Family Mover",
    body: "Relocating the whole family. The kids are grown. The mortgage is paid. You want EU access, quality healthcare, and a place that actually feels like home.",
    bg: "#d4e0d3",
    accent: "#8fa38d",
  },
  {
    emoji: "💼",
    title: "The Sold-The-Business Type",
    body: "You built it, sold it, and walked away with enough. No more 80-hour weeks. Spain on a NLV is how you cash in your chips and live on your terms.",
    bg: "#f2d6c9",
    accent: "#e3a99c",
  },
];

const canDo = [
  { text: "Live in Spain long-term (1 year, renewable)", icon: Home },
  { text: "Bring your spouse and dependents on the same application", icon: Users },
  { text: "Enroll in school or university", icon: BookOpen },
  { text: "Hold passive investments (stocks, bonds, real estate)", icon: TrendingUp },
  { text: "Travel freely across all 26 Schengen countries", icon: Globe },
  { text: "Access public healthcare after becoming a tax resident", icon: Heart },
  { text: "Apply for permanent residency after 5 years", icon: BadgeCheck },
];

const cantDo = [
  "Work for any Spanish employer",
  "Freelance or consult for clients in Spain",
  "Run an active Spanish business",
  "Provide remote services to foreign clients (gray area ~ technically not permitted)",
  "Claim Beckham Law tax benefits (only available to workers)",
];

const steps = [
  {
    num: "01",
    title: "Gather your documents",
    body: "Health insurance, criminal record, medical certificate, bank statements. Give yourself 6–8 weeks ~ apostilles take time.",
    color: "#e3a99c",
    bg: "#f2d6c9",
    emoji: "📋",
  },
  {
    num: "02",
    title: "Apply at the Spanish Consulate",
    body: "Submit in person at the consulate in your home country or country of legal residence. Book the appointment well in advance ~ slots fill up fast.",
    color: "#7a8f90",
    bg: "#e0eaeb",
    emoji: "🏛️",
  },
  {
    num: "03",
    title: "Wait for approval (~1 month)",
    body: "The consulate has up to 30 days to decide. No news is sometimes good news ~ they will contact you. Approved? Passport gets stamped.",
    color: "#8fa38d",
    bg: "#d4e0d3",
    emoji: "⏳",
  },
  {
    num: "04",
    title: "Enter Spain within 3 months",
    body: "Your visa has a 90-day activation window from issuance. You must enter Spain and establish yourself within that window or you start over.",
    color: "#e3a99c",
    bg: "#f2d6c9",
    emoji: "✈️",
  },
  {
    num: "05",
    title: "Register (Empadronamiento)",
    body: "Within your first few weeks, register at your local town hall with proof of address. This is your official municipal registration and critical for everything that follows.",
    color: "#7a8f90",
    bg: "#e0eaeb",
    emoji: "📍",
  },
  {
    num: "06",
    title: "Apply for your TIE within 30 days",
    body: "Your foreigner identity card (Tarjeta de Identidad de Extranjero). Book the appointment, submit biometrics, pay the fee. This is your official residency card.",
    color: "#8fa38d",
    bg: "#d4e0d3",
    emoji: "🪪",
  },
];

const taxBrackets = [
  { range: "Up to €12,450", rate: "19%", note: "Entry bracket" },
  { range: "€12,450 – €20,200", rate: "24%", note: "" },
  { range: "€20,200 – €35,200", rate: "30%", note: "" },
  { range: "€35,200 – €60,000", rate: "37%", note: "" },
  { range: "€60,000 – €300,000", rate: "45%", note: "Most passive income earners" },
  { range: "Above €300,000", rate: "47%", note: "Top bracket" },
];

const docs = [
  {
    cat: "Identity",
    items: [
      "Valid passport (minimum 1 year validity beyond your planned stay)",
      "Recent passport-size photograph",
      "Completed NLV application form (EX-01)",
    ],
  },
  {
    cat: "Health",
    items: [
      "Spanish private health insurance ~ full coverage, no co-pays or deductibles, valid for 1 year",
      "Medical certificate confirming no contagious diseases (issued within 3 months)",
    ],
  },
  {
    cat: "Financial Proof",
    items: [
      "Bank statements (last 3–6 months) showing €28,800+ for primary applicant",
      "Additional €7,200 per dependent",
      "Proof of passive income source: pension letter, investment account statements, rental income, dividends",
    ],
  },
  {
    cat: "Background Check",
    items: [
      "Criminal background check from your home country ~ apostilled AND sworn Spanish translation",
      "Criminal record from any country you've lived in for the last 5 years",
    ],
  },
  {
    cat: "Application",
    items: [
      "NLV application form (EX-01) completed in Spanish",
      "Consulate fee payment receipt (~€80 varies by country)",
    ],
  },
];

export default function NonLucrativeVisaPage() {
  return (
    <main className="min-h-screen bg-[#f9f5f2] text-[#3a3a3a]">
      <Header />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="pt-36 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8fa38d]/10 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#e3a99c]/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#e0eaeb] text-[#7a8f90] uppercase tracking-widest">
              Spain Visas
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#f2d6c9] text-[#e3a99c] uppercase tracking-widest">
              Complete Guide
            </span>
            <span className="text-xs text-[#aaaaaa]">Updated 2026</span>
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-[#3a3a3a] leading-tight mb-6">
            Spain Non-Lucrative Visa:{" "}
            <span className="font-script text-[#8fa38d] text-5xl md:text-6xl lg:text-7xl relative inline-block transform -rotate-1">
              Live Well
            </span>
            {" "}Without Working
          </h1>

          <p className="text-xl text-[#6b6b6b] leading-relaxed max-w-2xl mb-8">
            You've built the income. Here's how to plant it in Europe ~ legally, comfortably, and on your own terms. The NLV is Spain's welcome mat for people who've already done the hard work.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[#aaaaaa]">
            <div className="flex items-center gap-2">
              <img src="/assets/avatar.png" alt="Abie Maxey" className="w-8 h-8 rounded-full object-cover" />
              <span className="font-medium text-[#3a3a3a]">Abie Maxey</span>
            </div>
            <span>·</span>
            <span>12 min read</span>
            <span>·</span>
            <ShareButton title="Spain Non-Lucrative Visa (NLV): The Complete Guide for Passive Income Earners" />
          </div>
        </div>
      </section>

      {/* ── TABLE OF CONTENTS ──────────────────────────────────────────────── */}
      <section className="px-6 pb-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-[#e7ddd3] rounded-2xl p-6">
            <p className="text-xs font-bold tracking-widest text-[#aaaaaa] uppercase mb-4">In This Guide</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex items-center gap-2 text-sm text-[#6b6b6b] hover:text-[#e3a99c] transition-colors py-1"
                >
                  <span className="w-1 h-1 rounded-full bg-[#e3a99c] flex-shrink-0" />
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── IS THIS YOU? ───────────────────────────────────────────────────── */}
      <section id="who-is-this-for" className="px-6 py-14 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/30 border border-[#f2d6c9] mb-6">
            <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">Who It's For</span>
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3a3a3a] mb-4">
            Is this the right visa for you?
          </h2>
          <p className="text-[#6b6b6b] mb-10 max-w-xl">
            The Non-Lucrative Visa isn't for everyone ~ it's designed for a specific kind of person. See if you recognize yourself.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {profiles.map((p, i) => (
              <div
                key={i}
                className="flex gap-4 p-6 rounded-2xl border border-[#e7ddd3] bg-[#f9f5f2] hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <span
                  className="text-2xl w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: p.bg }}
                >
                  {p.emoji}
                </span>
                <div>
                  <h3 className="font-bold text-[#3a3a3a] mb-1">{p.title}</h3>
                  <p className="text-sm text-[#6b6b6b] leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IS THE NLV ────────────────────────────────────────────────── */}
      <section id="what-is-nlv" className="px-6 py-14">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e0eaeb]/60 border border-[#e0eaeb] mb-6">
            <span className="text-xs font-bold tracking-widest text-[#7a8f90] uppercase">The Basics</span>
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3a3a3a] mb-6">
            What is the Non-Lucrative Visa?
          </h2>
          <div className="prose-like space-y-4 text-[#6b6b6b] leading-relaxed">
            <p>
              Spain's Non-Lucrative Visa (Visado de Residencia No Lucrativa) is a long-stay residence permit for non-EU nationals who can support themselves financially without needing to work in Spain. Think of it as Spain saying: <em>"We'd love to have you ~ just don't take a local's job."</em>
            </p>
            <p>
              It's the classic expat retirement visa. One year initially, renewable in 2-year increments, and after 5 years of continuous legal residence, you can apply for permanent residency. If you're from the Philippines, Latin America, or a handful of other countries, Spanish citizenship could be yours after just 2 years.
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              { icon: Clock, label: "Initial duration", value: "1 year", sub: "Renewable 2 yrs at a time", color: "#e3a99c", bg: "#f2d6c9" },
              { icon: Globe, label: "Schengen access", value: "26 countries", sub: "Live and travel freely", color: "#7a8f90", bg: "#e0eaeb" },
              { icon: Users, label: "Family included", value: "Yes", sub: "Spouse + dependents on same application", color: "#8fa38d", bg: "#d4e0d3" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="p-5 rounded-2xl bg-white border border-[#e7ddd3] text-center">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: stat.bg }}
                  >
                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <p className="text-xs text-[#aaaaaa] uppercase tracking-wide mb-1">{stat.label}</p>
                  <p className="text-xl font-bold text-[#3a3a3a]">{stat.value}</p>
                  <p className="text-xs text-[#aaaaaa] mt-1">{stat.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINANCIAL REQUIREMENTS ─────────────────────────────────────────── */}
      <section id="requirements" className="px-6 py-14 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/30 border border-[#f2d6c9] mb-6">
            <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">The Numbers</span>
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3a3a3a] mb-4">
            Financial Requirements
          </h2>
          <p className="text-[#6b6b6b] mb-10">
            The Spanish government requires you to demonstrate sufficient financial means to support yourself ~ and any dependents ~ for the entire duration of your stay. Here's exactly what that looks like.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#e3a99c] to-[#d69586] text-white">
              <DollarSign className="w-8 h-8 mb-3 opacity-80" />
              <p className="text-sm opacity-80 mb-1">Primary applicant (annual)</p>
              <p className="text-4xl font-bold mb-1">€28,800</p>
              <p className="text-sm opacity-70">= 400% of Spain's IPREM index</p>
              <p className="text-sm opacity-70 mt-1">~€2,400 / month</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#f9f5f2] border border-[#e7ddd3]">
              <Users className="w-8 h-8 mb-3 text-[#8fa38d]" />
              <p className="text-sm text-[#aaaaaa] mb-1">Per additional dependent</p>
              <p className="text-4xl font-bold text-[#3a3a3a] mb-1">+€7,200</p>
              <p className="text-sm text-[#aaaaaa]">= 100% of IPREM per person</p>
              <p className="text-sm text-[#aaaaaa] mt-1">~€600 / month per dependent</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#f2d6c9]/20 border border-[#f2d6c9] flex gap-4">
            <AlertTriangle className="w-5 h-5 text-[#e3a99c] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#3a3a3a] text-sm mb-1">Important: Show the full year, not just monthly income</p>
              <p className="text-sm text-[#6b6b6b]">
                Consulates want to see that you have the money in the bank ~ not just that you earn it. 3–6 months of bank statements showing the full annual requirement is the standard. Passive income documentation (pension letters, brokerage statements, rental contracts) strengthens the case significantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAN & CAN'T DO ─────────────────────────────────────────────────── */}
      <section id="can-and-cant" className="px-6 py-14">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4e0d3]/60 border border-[#d4e0d3] mb-6">
            <span className="text-xs font-bold tracking-widest text-[#8fa38d] uppercase">Know the Rules</span>
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3a3a3a] mb-10">
            What you can ~ and can't ~ do
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-bold text-[#3a3a3a] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#d4e0d3] flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-[#8fa38d]" />
                </span>
                You CAN
              </p>
              <div className="space-y-3">
                {canDo.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#e7ddd3]">
                      <Icon className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#3a3a3a]">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="font-bold text-[#3a3a3a] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#f2d6c9] flex items-center justify-center">
                  <XCircle className="w-4 h-4 text-[#e3a99c]" />
                </span>
                You CANNOT
              </p>
              <div className="space-y-3">
                {cantDo.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#e7ddd3]">
                    <XCircle className="w-4 h-4 text-[#e3a99c] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#6b6b6b]">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 rounded-xl bg-[#fff8f0] border border-[#f2d6c9]">
                <p className="text-xs text-[#6b6b6b]">
                  <span className="font-bold text-[#e3a99c]">⚠️ Remote work gray area:</span> Technically the NLV prohibits any income-generating activity. If you work remotely for foreign clients, you're in legally ambiguous territory. For peace of mind and full legal clarity,{" "}
                  <Link href="/digital-nomad-visa" className="font-bold text-[#e3a99c] hover:underline">
                    the Digital Nomad Visa
                  </Link>{" "}
                  is the right route.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── APPLICATION STEPS ──────────────────────────────────────────────── */}
      <section id="application" className="px-6 py-14 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e0eaeb]/60 border border-[#e0eaeb] mb-6">
            <span className="text-xs font-bold tracking-widest text-[#7a8f90] uppercase">Step by Step</span>
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3a3a3a] mb-4">
            How to Apply
          </h2>
          <p className="text-[#6b6b6b] mb-10">
            Unlike the DNV which can be applied from inside Spain, the NLV must be applied from abroad ~ at the Spanish consulate in your home country or country of legal residence.
          </p>

          <div className="space-y-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex gap-5 p-6 rounded-2xl bg-[#f9f5f2] border border-[#e7ddd3] hover:bg-white hover:shadow-sm transition-all duration-200"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: step.bg }}
                >
                  {step.emoji}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold tracking-widest" style={{ color: step.color }}>
                      STEP {step.num}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#3a3a3a] mb-1">{step.title}</h3>
                  <p className="text-sm text-[#6b6b6b] leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TAX IMPLICATIONS ───────────────────────────────────────────────── */}
      <section id="taxes" className="px-6 py-14">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fff3e0]/80 border border-[#f2d6c9] mb-6">
            <AlertTriangle className="w-3.5 h-3.5 text-[#e3a99c]" />
            <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">Read This Carefully</span>
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3a3a3a] mb-4">
            Tax Implications
          </h2>
          <p className="text-[#6b6b6b] mb-6 leading-relaxed">
            This is the part most NLV articles gloss over ~ and it matters enormously. Once you spend 183+ days in Spain in a calendar year, you become a <strong>Spanish tax resident</strong>. That means:
          </p>

          <div className="space-y-3 mb-8">
            {[
              "Your worldwide income is subject to Spanish tax ~ pension, dividends, rental income, everything",
              "You must file a Spanish tax return (Declaración de la Renta) annually",
              "Capital gains from investments abroad are taxable in Spain",
              "You cannot use the Beckham Law flat-rate tax ~ that's only for workers and DNV holders",
              "Double taxation treaties (Spain has 90+) may offset some of this if you're from a treaty country",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#e7ddd3]">
                <AlertTriangle className="w-4 h-4 text-[#e3a99c] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[#3a3a3a]">{item}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#e7ddd3]">
            <div className="bg-[#3a3a3a] px-6 py-4">
              <p className="text-xs font-bold tracking-widest text-white/60 uppercase">Spanish Income Tax Brackets (2024)</p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f9f5f2] border-b border-[#e7ddd3]">
                  <th className="text-left p-4 text-xs font-bold text-[#aaaaaa] uppercase tracking-wide">Income Range</th>
                  <th className="text-right p-4 text-xs font-bold text-[#aaaaaa] uppercase tracking-wide">Rate</th>
                  <th className="text-right p-4 text-xs font-bold text-[#aaaaaa] uppercase tracking-wide hidden md:table-cell">Note</th>
                </tr>
              </thead>
              <tbody>
                {taxBrackets.map((row, i) => (
                  <tr key={i} className={`border-b border-[#f0ebe6] ${i % 2 === 0 ? "bg-white" : "bg-[#f9f5f2]/40"}`}>
                    <td className="p-4 text-[#3a3a3a]">{row.range}</td>
                    <td className="p-4 text-right font-bold text-[#e3a99c]">{row.rate}</td>
                    <td className="p-4 text-right text-xs text-[#aaaaaa] hidden md:table-cell">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-5 rounded-2xl bg-[#d4e0d3]/30 border border-[#d4e0d3]">
            <p className="text-sm text-[#3a3a3a]">
              <span className="font-bold text-[#8fa38d]">💡 Our recommendation:</span> Before applying, consult a cross-border tax advisor who knows both your home country and Spanish tax law. The savings from planning ahead can be significant.{" "}
              <Link
                href="https://calendly.com/abie-gamao/spain-dnv"
                className="font-bold text-[#8fa38d] hover:underline"
              >
                Book a call with us
              </Link>{" "}
              ~ we can point you in the right direction.
            </p>
          </div>
        </div>
      </section>

      {/* ── DOCUMENTS ──────────────────────────────────────────────────────── */}
      <section id="documents" className="px-6 py-14 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/30 border border-[#f2d6c9] mb-6">
            <FileText className="w-3.5 h-3.5 text-[#e3a99c]" />
            <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">Document Checklist</span>
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3a3a3a] mb-4">
            What You'll Need to Gather
          </h2>
          <p className="text-[#6b6b6b] mb-10">
            Start collecting these at least 8 weeks before your planned application date. Apostilles and translations take longer than you expect.
          </p>

          <div className="space-y-5">
            {docs.map((cat, i) => (
              <div key={i} className="rounded-2xl border border-[#e7ddd3] overflow-hidden">
                <div className="px-5 py-3 bg-[#f9f5f2] border-b border-[#e7ddd3]">
                  <p className="text-xs font-bold tracking-widest text-[#aaaaaa] uppercase">{cat.cat}</p>
                </div>
                <div className="divide-y divide-[#f0ebe6]">
                  {cat.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-3 px-5 py-3 bg-white">
                      <CheckCircle2 className="w-4 h-4 text-[#e3a99c] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#3a3a3a]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESIDENCY & CITIZENSHIP ────────────────────────────────────────── */}
      <section id="residency-path" className="px-6 py-14">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4e0d3]/60 border border-[#d4e0d3] mb-6">
            <span className="text-xs font-bold tracking-widest text-[#8fa38d] uppercase">The Long Game</span>
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3a3a3a] mb-4">
            Path to Residency & Citizenship
          </h2>
          <p className="text-[#6b6b6b] mb-10">
            The NLV isn't just a visa ~ it's the start of a permanent European life if you want it to be.
          </p>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#e7ddd3] hidden md:block" />
            <div className="space-y-6">
              {[
                {
                  year: "Year 1",
                  title: "NLV Approved ~ you're in",
                  body: "1-year residence, valid Schengen travel, family included. Annual renewal after year one.",
                  color: "#e3a99c",
                  bg: "#f2d6c9",
                  emoji: "🎉",
                },
                {
                  year: "Years 2–4",
                  title: "2-year renewals",
                  body: "Each renewal is 2 years. Keep your empadronamiento current, don't leave Spain for more than 6 consecutive months per year.",
                  color: "#7a8f90",
                  bg: "#e0eaeb",
                  emoji: "🔄",
                },
                {
                  year: "Year 5",
                  title: "Permanent Residency",
                  body: "Apply for Long-Term EU Residence (Residencia de Larga Duración). No more annual renewals. Valid indefinitely.",
                  color: "#8fa38d",
                  bg: "#d4e0d3",
                  emoji: "🪪",
                },
                {
                  year: "Year 2 or 10",
                  title: "Spanish Citizenship",
                  body: "10 years for most nationalities. 2 years for Philippines, all Latin American countries, Portugal, Equatorial Guinea, and Andorra. EU passport. No more Schengen countdown.",
                  color: "#e3a99c",
                  bg: "#f2d6c9",
                  emoji: "🇪🇸",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 md:pl-12 relative">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 md:absolute md:left-0 md:top-0"
                    style={{ backgroundColor: item.bg }}
                  >
                    {item.emoji}
                  </div>
                  <div className="flex-1 p-5 rounded-2xl bg-white border border-[#e7ddd3]">
                    <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: item.color }}>
                      {item.year}
                    </p>
                    <h3 className="font-bold text-[#3a3a3a] mb-1">{item.title}</h3>
                    <p className="text-sm text-[#6b6b6b] leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NLV VS DNV ─────────────────────────────────────────────────────── */}
      <section id="nlv-vs-dnv" className="px-6 py-14 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/30 border border-[#f2d6c9] mb-6">
            <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">Which Is Right for You?</span>
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3a3a3a] mb-4">
            NLV vs Digital Nomad Visa
          </h2>
          <p className="text-[#6b6b6b] mb-10">
            Both paths lead to Spanish residency. The difference is whether you still work ~ and how.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-2xl border-2 border-[#e0eaeb] bg-[#f9f5f2]">
              <div className="text-2xl mb-3">🏡</div>
              <h3 className="font-bold text-lg text-[#3a3a3a] mb-3">Non-Lucrative Visa</h3>
              <div className="space-y-2 text-sm text-[#6b6b6b]">
                <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" /><span>You live off passive income ~ no work needed</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" /><span>€28,800+/year in demonstrable financial means</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" /><span>No requirement to maintain a foreign employer</span></div>
                <div className="flex items-start gap-2"><XCircle className="w-4 h-4 text-[#e3a99c] flex-shrink-0 mt-0.5" /><span>Cannot work remotely or generate income in Spain</span></div>
                <div className="flex items-start gap-2"><XCircle className="w-4 h-4 text-[#e3a99c] flex-shrink-0 mt-0.5" /><span>No Beckham Law ~ worldwide income taxed at full Spanish rates</span></div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border-2 border-[#e3a99c]/40 bg-[#f2d6c9]/10">
              <div className="text-2xl mb-3">💻</div>
              <h3 className="font-bold text-lg text-[#3a3a3a] mb-3">Digital Nomad Visa</h3>
              <div className="space-y-2 text-sm text-[#6b6b6b]">
                <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#e3a99c] flex-shrink-0 mt-0.5" /><span>Legal right to work remotely for foreign companies</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#e3a99c] flex-shrink-0 mt-0.5" /><span>Lower income threshold (~€2,849/month)</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#e3a99c] flex-shrink-0 mt-0.5" /><span>Beckham Law eligible ~ potential 24% flat tax rate</span></div>
                <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#e3a99c] flex-shrink-0 mt-0.5" /><span>Same residency and citizenship path</span></div>
                <div className="flex items-start gap-2"><XCircle className="w-4 h-4 text-[#aaaaaa] flex-shrink-0 mt-0.5" /><span>Must maintain active employment or freelance clients</span></div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#f2d6c9]/30 to-[#e0eaeb]/30 border border-[#e7ddd3] flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <p className="font-bold text-[#3a3a3a] mb-1">Still working remotely?</p>
              <p className="text-sm text-[#6b6b6b]">
                If you have active remote income alongside passive income, the DNV gives you full legal clarity, lower tax burden via Beckham Law, and the same residency path. It might be the smarter play.
              </p>
            </div>
            <Link
              href="/digital-nomad-visa"
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#e3a99c] text-white text-sm font-bold hover:bg-[#d38b7b] transition-colors"
            >
              Explore the DNV
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BOOK A CALL CTA ────────────────────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a] rounded-3xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e3a99c]/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#8fa38d]/10 rounded-full blur-[60px] pointer-events-none" />
            <div className="relative z-10">
              <p className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase mb-4">Ready to Move?</p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-white mb-4">
                Not sure which visa fits your situation?
              </h2>
              <p className="text-white/60 mb-8 max-w-lg mx-auto">
                NLV, DNV, or something else entirely ~ let's figure it out together. One 45-minute call and you'll know exactly what you need to do next.
              </p>
              <Link
                href="https://calendly.com/abie-gamao/spain-dnv"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#e3a99c] text-white font-bold text-lg hover:bg-[#d38b7b] hover:shadow-xl hover:shadow-[#e3a99c]/30 transition-all duration-300 group"
              >
                <span>Book a Strategy Call</span>
                <Plane className="w-5 h-5 group-hover:-rotate-45 transition-transform duration-300" />
              </Link>
              <p className="text-white/40 text-xs mt-4">Paid consultation ~ book your session now.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
