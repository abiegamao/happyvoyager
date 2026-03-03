"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  FileText,
  Check,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Clock,
  Shield,
  Star,
  Globe,
  Sparkles,
  MessageSquare,
  CalendarCheck,
  MapPin,
  Users,
  BadgeCheck,
  Briefcase,
  Laptop,
  TrendingUp,
  Home,
  Heart,
  Zap,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Building2,
} from "lucide-react";

// ─── What's Included ──────────────────────────────────────────────────────────

const included = [
  {
    icon: CheckCircle2,
    title: "Eligibility Assessment",
    desc: "We review your income, work contracts, and employment setup before you spend a single euro. No surprises.",
    color: "#e3a99c",
    bg: "#f2d6c9",
  },
  {
    icon: FileText,
    title: "Cover Letter & Motivation Statement",
    desc: "A tailored letter explaining your remote work setup, income stability, and ties to Spain. Consulates read this closely.",
    color: "#bbcccd",
    bg: "#e0eaeb",
  },
  {
    icon: BadgeCheck,
    title: "Full Document Checklist",
    desc: "A personalised list of exactly what you need ~ apostilles, PSA docs, NBI clearance, income proof, health insurance, and more.",
    color: "#8fa38d",
    bg: "#d4e0d3",
  },
  {
    icon: Building2,
    title: "Application Form Completion",
    desc: "The national visa form (Modelo Nacional) is dense. We fill it out correctly and review it with you before submission.",
    color: "#e3a99c",
    bg: "#f2d6c9",
  },
  {
    icon: DollarSign,
    title: "Income Documentation Strategy",
    desc: "We guide you on how to present PayPal, Wise, bank transfers, or payslips so they meet the €2,894/month minimum threshold.",
    color: "#7a8f90",
    bg: "#e0eaeb",
  },
  {
    icon: Globe,
    title: "Client Contract Review",
    desc: "Freelancers need contracts with non-Spanish clients. We tell you exactly what the consulate needs to see in those contracts.",
    color: "#bbcccd",
    bg: "#e0eaeb",
  },
  {
    icon: CalendarCheck,
    title: "Appointment Booking Support",
    desc: "Walk-through for booking at the Spanish Consulate in the Philippines. We track slots and help you move fast.",
    color: "#8fa38d",
    bg: "#d4e0d3",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Support ~ End to End",
    desc: "From intake call to visa stamp. You'll have a real person on WhatsApp who's done this themselves, not a support ticket.",
    color: "#e3a99c",
    bg: "#f2d6c9",
  },
];

// ─── Who It's For ─────────────────────────────────────────────────────────────

const profiles = [
  {
    icon: Laptop,
    label: "Remote Employee",
    desc: "Working full-time for a company outside Spain (US, UK, AU, SG, etc.)",
    color: "#e3a99c",
    bg: "#f2d6c9",
  },
  {
    icon: Briefcase,
    label: "Freelancer / VA",
    desc: "Virtual assistants, designers, developers, marketers with overseas clients",
    color: "#8fa38d",
    bg: "#d4e0d3",
  },
  {
    icon: TrendingUp,
    label: "Content Creator",
    desc: "YouTubers, influencers, writers earning through overseas platforms",
    color: "#7a8f90",
    bg: "#e0eaeb",
  },
  {
    icon: Building2,
    label: "Online Business Owner",
    desc: "E-commerce, SaaS, agency owners whose clients/revenue are outside Spain",
    color: "#bbcccd",
    bg: "#e0eaeb",
  },
];

// ─── Requirements Breakdown ───────────────────────────────────────────────────

const requirements = [
  {
    icon: DollarSign,
    title: "Minimum Income: €2,894/month",
    desc: "200% of Spain's minimum wage. Roughly PHP 196,000/month. You need to prove this consistently for 3–6 months.",
    color: "#e3a99c",
  },
  {
    icon: Briefcase,
    title: "Remote Work Contract or Client Proof",
    desc: "Employment contract with a foreign company, OR freelance contracts showing clients are based outside Spain.",
    color: "#8fa38d",
  },
  {
    icon: Shield,
    title: "Health Insurance Covering Spain",
    desc: "Must cover the entire duration of your stay. Cigna, AXA, SafetyWing, or equivalent international plans are accepted.",
    color: "#7a8f90",
  },
  {
    icon: BadgeCheck,
    title: "Clean Criminal Record",
    desc: "NBI Clearance with Apostille from the DFA. If you've lived abroad for 5+ years, you may need additional clearances.",
    color: "#bbcccd",
  },
  {
    icon: Home,
    title: "Proof of Accommodation in Spain",
    desc: "Rental contract, property deed, or a confirmed long-term stay arrangement showing where you'll live.",
    color: "#e3a99c",
  },
  {
    icon: FileText,
    title: "Authenticated Documents (Apostille)",
    desc: "PSA-issued documents need apostille from the DFA. Non-Spanish documents must be translated by a sworn translator.",
    color: "#8fa38d",
  },
];

// ─── Process Steps ─────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Book a Strategy Call",
    description:
      "We start with a 30-minute strategy call to assess your eligibility and map out your full document timeline. The call fee is credited toward your package.",
    color: "#e3a99c",
  },
  {
    number: "02",
    icon: FileText,
    title: "We Build Your Package",
    description:
      "Cover letter, document checklist, application forms, and income presentation strategy ~ all tailored to your exact profile.",
    color: "#bbcccd",
  },
  {
    number: "03",
    icon: BadgeCheck,
    title: "Document Review & Apostille Guide",
    description:
      "We review every document you've gathered. We flag issues before the consulate does. DFA apostille process guided step by step.",
    color: "#f2d6c9",
  },
  {
    number: "04",
    icon: MapPin,
    title: "Application Submission",
    description:
      "Once in Spain, we guide you through getting your NIE and Digital Certificate ~ then we submit everything to UGE on your behalf. You must be in Spain for this step.",
    color: "#8fa38d",
  },
  {
    number: "05",
    icon: Sparkles,
    title: "Approval & Next Steps",
    description:
      "Visa approved ~ well done. Now the real work begins. We guide you through post-approval steps so you're settled from day one.",
    color: "#e3a99c",
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Can I apply from the Philippines?",
    a: "Yes. Philippine passport holders apply at the Spanish Consulate General in Manila (or Cebu for Visayas/Mindanao applicants). You do not need to be in Spain to apply. We guide you through the entire process remotely.",
  },
  {
    q: "What's the minimum income requirement?",
    a: "€2,894/month gross ~ roughly PHP 196,000/month at current rates. This is 200% of Spain's minimum wage (SMI). You need to show consistent income for at least 3 months, ideally 6. Freelancers can combine multiple client incomes to meet this threshold.",
  },
  {
    q: "I'm a virtual assistant / freelancer. Do I qualify?",
    a: "Yes, if your clients are based outside Spain and you earn consistently above the income threshold. You'll need freelance contracts (even informal ones converted to proper agreements), bank statements showing regular transfers, and possibly a DTI or business registration. We'll assess your specific setup on the strategy call.",
  },
  {
    q: "What is the Beckham Law tax benefit?",
    a: "The Beckham Law (Ley Beckham) allows employed DNV holders ~ those working for a foreign company as an employee ~ to pay a flat 24% tax rate on Spanish-sourced income for the first 6 years, instead of the progressive scale (up to 47%). Autónomos (self-employed/freelancers) do not qualify for this regime. However, if your clients are all outside Spain, your foreign-sourced income is generally not subject to Spanish income tax. Tax rules are complex ~ we always recommend consulting a Spanish tax advisor (gestor) for your specific setup.",
  },
  {
    q: "How long does the visa take to process?",
    a: "The Spanish Consulate in Manila typically takes 30–90 days to process from the date of your appointment. We recommend starting 4–6 months before your target move date to account for document gathering, apostille queues, and appointment availability.",
  },
  {
    q: "Can my family come with me?",
    a: "Yes ~ family reunification is possible. Your spouse and dependent children can apply as family members of the main visa holder. They'll need their own supporting documents (proof of relationship, passports, health insurance). We can guide family applications as an add-on.",
  },
  {
    q: "What if I don't meet the income requirement yet?",
    a: "Honesty first: if you don't currently meet the income threshold, applying isn't the right move. We'll tell you that upfront on the strategy call and suggest what to work toward before reapplying. Some clients use the 6–12 months to build their income and then apply. We'd rather give you a realistic timeline than take your money on a weak application.",
  },
  {
    q: "Is this the same as the non-lucrative visa or student visa?",
    a: "No. The Digital Nomad Visa (Startup Act / Ley de Startups) is specifically for people who work remotely for foreign companies or clients. It's different from the Non-Lucrative Visa (which requires passive income, no work allowed) and the Student Visa. The DNV is the right path if you earn money through remote work.",
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function DigitalNomadVisaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#f9f5f2] overflow-hidden">
      <Header />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section id="hero" className="relative px-6 pt-36 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f2d6c9]/25 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#bbcccd]/20 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-[#6b6b6b] mb-8">
            <Link href="/" className="hover:text-[#e3a99c] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#3a3a3a] font-medium">Spain Digital Nomad Visa</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#e7ddd3] mb-8 shadow-sm">
            <Laptop className="w-4 h-4 text-[#e3a99c]" />
            <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
              Spain Digital Nomad Visa
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold text-[#3a3a3a] leading-tight mb-6">
            Live in Spain.{" "}
            <br />
            <span className="font-script text-[#e3a99c] text-6xl md:text-7xl lg:text-8xl relative inline-block transform -rotate-2">
              Keep your remote job.
            </span>
          </h1>

          <p className="font-[family-name:var(--font-body)] text-lg md:text-xl text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed mb-6">
            Spain&apos;s Digital Nomad Visa lets you legally live and work remotely from Europe. I did it myself with a Philippine passport ~ and now I help other Filipinos do the same.
          </p>

          {/* Filipino-specific note */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e3a99c]/10 border border-[#e3a99c]/30 mb-10">
            <span className="text-sm text-[#e3a99c] font-semibold">Guided by a Filipino already living in Spain 🇵🇭→🇪🇸</span>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#6b6b6b] mb-12">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#8fa38d]" />
              <span>Eligibility check included</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[#e7ddd3] hidden sm:block" />
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#e3a99c]" />
              <span>WhatsApp support end to end</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[#e7ddd3] hidden sm:block" />
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#e3a99c] fill-[#e3a99c]" />
              <span>Based in Spain, knows the process</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://calendly.com/abie-gamao/spain-dnv"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-10 py-5 rounded-full bg-[#3a3a3a] text-white font-bold text-lg hover:bg-[#e3a99c] transition-all duration-300 shadow-xl transform hover:-translate-y-1"
            >
              Book a Strategy Call
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              href="#whats-included"
              className="flex items-center gap-2 px-8 py-5 rounded-full border border-[#e7ddd3] text-[#3a3a3a] font-semibold hover:bg-white hover:shadow-md transition-all duration-300"
            >
              See What&apos;s Included
            </Link>
          </div>

          <p className="mt-5 text-xs text-[#aaaaaa]">30-minute strategy call ~ fee credited toward your package.</p>
        </div>
      </section>

      {/* ── What Is the DNV ──────────────────────────────────────────────── */}
      <section id="overview" className="bg-white border-y border-[#e7ddd3] py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                color: "#e3a99c",
                bg: "#f2d6c9",
                title: "Live legally in Spain",
                desc: "The Digital Nomad Visa (Ley de Startups) gives you the legal right to reside in Spain while working remotely for foreign employers or clients.",
              },
              {
                icon: TrendingUp,
                color: "#8fa38d",
                bg: "#d4e0d3",
                title: "Tax advantages (if employed)",
                desc: "Employed DNV holders can apply for the Beckham Law's 24% flat tax rate for 6 years. Autónomos (self-employed) don't qualify ~ but foreign income is generally exempt from Spanish tax.",
              },
              {
                icon: Zap,
                color: "#7a8f90",
                bg: "#e0eaeb",
                title: "Gateway to Schengen",
                desc: "Spanish residency lets you travel freely across all 26 Schengen countries ~ no more tourist visa queues for every trip.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex gap-4 p-6 rounded-2xl bg-[#f9f5f2] border border-[#e7ddd3]">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: item.bg }}
                  >
                    <Icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] font-bold text-[#3a3a3a] mb-1">{item.title}</h3>
                    <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Who It's For ─────────────────────────────────────────────────── */}
      <section id="who-is-it-for" className="section-padding bg-[#f9f5f2]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#e7ddd3] mb-6">
              <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">Who It&apos;s For</span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-4">
              You earn online.{" "}
              <span className="font-script text-[#e3a99c] text-5xl md:text-6xl relative inline-block transform -rotate-2">
                You belong here.
              </span>
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] max-w-xl mx-auto">
              The DNV is for anyone earning consistent remote income from clients or employers outside Spain. Your job title doesn&apos;t matter. Your income source does.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {profiles.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white border border-[#e7ddd3] hover:border-[#e3a99c]/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: p.bg }}>
                    <Icon className="w-7 h-7" style={{ color: p.color }} />
                  </div>
                  <div>
                    <p className="font-bold text-[#3a3a3a] mb-1">{p.label}</p>
                    <p className="text-xs text-[#6b6b6b] leading-snug">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* DNV vs Tourist Visa comparison strip */}
          <div className="mt-14 p-8 rounded-3xl bg-white border border-[#e7ddd3]">
            <p className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase text-center mb-8">DNV vs Tourist Visa</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="font-[family-name:var(--font-heading)] font-bold text-[#3a3a3a] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#f2d6c9] flex items-center justify-center text-xs">✗</span>
                  Tourist Visa (90 days)
                </p>
                {[
                  "90 days max, then you must leave",
                  "Can't legally work from Spain",
                  "No path to residency",
                  "No tax benefits",
                  "Repeat visa applications every year",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#f5f5f5] border border-[#e0e0e0] flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] text-[#aaaaaa]">✗</span>
                    </div>
                    <span className="text-sm text-[#6b6b6b]">{item}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <p className="font-[family-name:var(--font-heading)] font-bold text-[#3a3a3a] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#d4e0d3] flex items-center justify-center text-xs">✓</span>
                  Digital Nomad Visa
                </p>
                {[
                  "1-year visa, renewable up to 5 years",
                  "Legal right to work remotely in Spain",
                  "Path to permanent residency & EU citizenship",
                  "Tax advantages for employed workers (Beckham Law)",
                  "Travel freely across 26 Schengen countries",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#d4e0d3] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#8fa38d]" />
                    </div>
                    <span className="text-sm text-[#3a3a3a] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Requirements ─────────────────────────────────────────────── */}
      <section id="requirements" className="relative overflow-hidden bg-white section-padding">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#e7ddd3] to-transparent" />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/30 border border-[#f2d6c9] mb-6">
              <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">Requirements</span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-4">
              Do you{" "}
              <span className="font-script text-[#e3a99c] text-5xl md:text-6xl relative inline-block transform -rotate-2">
                qualify?
              </span>
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] max-w-xl mx-auto">
              These are the core requirements. If you&apos;re unsure whether your situation fits, that&apos;s exactly what the strategy call is for.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requirements.map((req, i) => {
              const Icon = req.icon;
              return (
                <div
                  key={i}
                  className="flex gap-4 p-6 rounded-2xl bg-[#f9f5f2] border border-[#e7ddd3] hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: req.color + "22" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: req.color }} />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-sm font-bold text-[#3a3a3a] mb-1">{req.title}</h3>
                    <p className="font-[family-name:var(--font-body)] text-xs text-[#6b6b6b] leading-relaxed">{req.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Income calculator note */}
          <div className="mt-8 p-6 rounded-2xl bg-[#e3a99c]/8 border border-[#e3a99c]/20 flex flex-col md:flex-row items-start md:items-center gap-4">
            <AlertCircle className="w-5 h-5 text-[#e3a99c] flex-shrink-0 mt-0.5" />
            <p className="font-[family-name:var(--font-body)] text-sm text-[#3a3a3a] leading-relaxed">
              <strong>Income threshold in context:</strong> €2,894/month = ~PHP 196,000/month = ~$3,350 USD/month. Many Filipino remote workers in tech, design, and marketing already earn above this. If you&apos;re close, we&apos;ll help you document it properly.
            </p>
          </div>
        </div>
      </section>

      {/* ── What's Included ──────────────────────────────────────────────── */}
      <section id="whats-included" className="section-padding bg-[#f9f5f2] relative overflow-hidden">
        <div className="absolute top-[20%] right-[5%] w-72 h-72 bg-[#f2d6c9]/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/30 border border-[#f2d6c9] mb-6">
              <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">What&apos;s Included</span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-4">
              Everything you need{" "}
              <span className="font-script text-[#e3a99c] text-5xl md:text-6xl relative inline-block transform -rotate-2">in one place</span>
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] max-w-xl mx-auto">
              Immigration lawyers in Spain charge €1,500–€3,000 for this. We keep it lean, personal, and priced for real people.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {included.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-[#e7ddd3] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: item.bg }}
                  >
                    <Icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-[#3a3a3a] mb-2">{item.title}</h3>
                  <p className="font-[family-name:var(--font-body)] text-xs text-[#6b6b6b] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="relative overflow-hidden bg-white section-padding">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#e7ddd3] to-transparent" />
        <div className="absolute bottom-[10%] left-[5%] w-72 h-72 bg-[#bbcccd]/15 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#bbcccd]/20 border border-[#bbcccd] mb-6">
              <span className="text-xs font-bold tracking-widest text-[#7a8f90] uppercase">How It Works</span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-4">
              From Davao to{" "}
              <span className="font-script text-[#e3a99c] text-5xl md:text-6xl relative inline-block transform -rotate-2">Madrid 🇪🇸</span>
              , step by step.
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] max-w-xl mx-auto">
              We work through this with you ~ not just a document dump. Every step has a human being on the other end.
            </p>
          </div>

          <div className="relative">
            <div className="grid md:grid-cols-5 gap-6">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="relative group text-center">
                    <div className="p-6 rounded-[2rem] bg-[#f9f5f2] hover:bg-white border border-transparent hover:border-[#e7ddd3] transition-all duration-300 hover:shadow-xl group-hover:-translate-y-2">
                      <div
                        className="inline-flex w-12 h-12 rounded-2xl items-center justify-center mb-4"
                        style={{ backgroundColor: step.color + "22" }}
                      >
                        <Icon className="w-6 h-6" style={{ color: step.color }} />
                      </div>
                      <span
                        className="block font-[family-name:var(--font-heading)] text-3xl font-bold mb-2"
                        style={{ color: step.color + "55" }}
                      >
                        {step.number}
                      </span>
                      <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-[#3a3a3a] mb-2">{step.title}</h3>
                      <p className="font-[family-name:var(--font-body)] text-xs text-[#6b6b6b] leading-relaxed">{step.description}</p>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="hidden md:flex absolute top-10 -right-3 w-6 h-6 items-center justify-center z-10">
                        <ChevronRight className="w-4 h-4 text-[#e7ddd3]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline note */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 p-8 rounded-3xl bg-[#f9f5f2] border border-[#e7ddd3]">
            <div className="text-center md:text-left">
              <p className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase mb-1">Realistic Timeline</p>
              <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#3a3a3a]">4–6 months start to finish</p>
              <p className="text-sm text-[#6b6b6b]">From our first call to visa stamp in passport</p>
            </div>
            <div className="h-px md:h-16 w-full md:w-px bg-[#e7ddd3]" />
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-[#6b6b6b]">
              {["Document gathering: 4–6 weeks", "Apostille (DFA): 2–4 weeks", "Consulate appointment: 2–4 weeks wait", "Processing time: 30–90 days"].map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#e3a99c]" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Us ───────────────────────────────────────────────────────── */}
      <section id="why-us" className="relative overflow-hidden bg-[#f9f5f2] section-padding">
        <div className="absolute top-[20%] right-[5%] w-72 h-72 bg-[#f2d6c9]/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/30 border border-[#f2d6c9] mb-6">
                <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">Why Choose Us</span>
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-6 leading-tight">
                I didn&apos;t just research this.{" "}
                <span className="font-script text-[#e3a99c] text-5xl md:text-6xl relative inline-block transform -rotate-2">
                  I lived it.
                </span>
              </h2>
              <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed mb-10 max-w-lg">
                I&apos;m a Filipino who obtained Spain&apos;s Digital Nomad Visa and now lives in Spain full-time. I know where Philippine applicants get stuck, what documents consulates actually scrutinise, and how to navigate the whole process without a lawyer charging you €2,000+.
              </p>

              <div className="grid gap-6">
                {[
                  {
                    icon: Globe,
                    color: "#e3a99c",
                    title: "I know PSA docs, NBI apostilles, and BIR ITR",
                    desc: "No need to explain what CENOMAR is or how DFA apostille works. We speak the same document language.",
                  },
                  {
                    icon: Heart,
                    color: "#8fa38d",
                    title: "Honest about eligibility ~ before you pay",
                    desc: "If you don&apos;t qualify, we tell you upfront on the strategy call. We&apos;d rather help you build toward it than take your money on a weak application.",
                  },
                  {
                    icon: MessageSquare,
                    color: "#bbcccd",
                    title: "WhatsApp, not a ticket system",
                    desc: "You message a real person who&apos;s done this. Not a chatbot, not a support portal, not an email chain that takes 5 days.",
                  },
                  {
                    icon: TrendingUp,
                    color: "#7a8f90",
                    title: "Fraction of immigration lawyer costs",
                    desc: "Lawyers in Spain charge €1,500–€3,000. We charge a fraction of that. The process is the same. The outcome is the same.",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex gap-5 group p-4 rounded-2xl hover:bg-white transition-colors duration-300">
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm bg-white transition-all duration-300 group-hover:scale-110"
                        style={{ border: `1.5px solid ${item.color}33` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: item.color }} />
                      </div>
                      <div>
                        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a] mb-1">{item.title}</h3>
                        <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stat cards */}
            <div className="relative flex flex-col gap-6">
              {[
                { value: "2yr", label: "Path to Spanish citizenship for Filipinos & Latin Americans ~ faster than most nationalities", color: "#e3a99c", bg: "#f2d6c9" },
                { value: "24%", label: "Flat tax rate under Beckham Law ~ for employed DNV holders only. Autónomos have different tax rules.", color: "#8fa38d", bg: "#d4e0d3" },
                { value: "26+", label: "Schengen countries you can travel to freely as a Spanish resident", color: "#7a8f90", bg: "#e0eaeb" },
                { value: "🇵🇭", label: "Built for Filipinos, by a Filipino who made it to Spain", color: "#e3a99c", bg: "#f2d6c9" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-6 p-6 rounded-2xl bg-white border border-[#e7ddd3] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: stat.bg }}
                  >
                    <span className="font-[family-name:var(--font-heading)] text-xl font-bold" style={{ color: stat.color }}>
                      {stat.value}
                    </span>
                  </div>
                  <p className="font-[family-name:var(--font-body)] text-[#3a3a3a] font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-white section-padding">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#e7ddd3] to-transparent" />
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#e7ddd3] mb-6">
              <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">FAQ</span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-4">
              Questions we always get
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#6b6b6b]">
              Still unsure?{" "}
              <Link href="/contact" className="text-[#e3a99c] font-semibold hover:underline">
                Reach out ~ we&apos;ll answer honestly.
              </Link>
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl bg-[#f9f5f2] border border-[#e7ddd3] overflow-hidden hover:shadow-md transition-shadow">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 p-6 text-left cursor-pointer"
                >
                  <span className="font-[family-name:var(--font-heading)] text-base font-bold text-[#3a3a3a] leading-snug">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#e3a99c] flex-shrink-0 mt-0.5 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <div className="w-full h-px bg-[#e7ddd3] mb-4" />
                    <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed text-sm">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="section-padding bg-[#3a3a3a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e3a99c]/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#bbcccd]/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8">
            <span className="text-sm">🇵🇭→🇪🇸</span>
            <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
              Built for Filipinos
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Spain isn&apos;t just a destination.{" "}
            <span className="font-script text-[#e3a99c] text-5xl md:text-6xl lg:text-7xl block mt-2 transform -rotate-1">
              It can be home.
            </span>
          </h2>

          <p className="font-[family-name:var(--font-body)] text-[#e7ddd3] text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Book a strategy call to find out if you qualify and map out your full path. The call fee is credited toward your package ~ so you&apos;re not paying twice.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://calendly.com/abie-gamao/spain-dnv"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-10 py-5 rounded-full bg-[#e3a99c] text-white font-bold text-lg hover:bg-white hover:text-[#3a3a3a] transition-all duration-300 shadow-xl shadow-[#e3a99c]/20 transform hover:-translate-y-1"
            >
              Book a Strategy Call
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-5 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Ask a Question First
            </Link>
          </div>

          <p className="mt-6 text-sm text-[#e7ddd3]/60">
            Call fee credited toward your package · Honest eligibility assessment
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
