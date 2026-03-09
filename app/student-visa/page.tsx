import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShareButton from "@/components/ShareButton";
import Link from "next/link";
import BookCallButton from "@/components/BookCallButton";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Globe,
  Clock,
  BookOpen,
  AlertTriangle,
  Briefcase,
  GraduationCap,
  Heart,
  Users,
  Plane,
  FileText,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Spain Student Visa: The Complete Guide (2026) | Happy Voyager",
  description:
    "Everything you need to know about getting a Spain student visa ~ eligibility, financial requirements, work rights, documents, and what happens after you graduate.",
};

export default function StudentVisaPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f9f5f2] font-sans text-[#3a3a3a]">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="pt-32 pb-16 px-6 lg:px-8 max-w-3xl mx-auto">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#6b6b6b] bg-[#e0eaeb] px-3 py-1.5 rounded-full">
              SPAIN VISAS
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#6b6b6b] bg-[#e7ddd3] px-3 py-1.5 rounded-full">
              COMPLETE GUIDE
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#e3a99c] bg-[#f2d6c9] px-3 py-1.5 rounded-full">
              Updated 2026
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-6 leading-tight">
            Spain Student Visa:{" "}
            <span className="text-[#e3a99c]">Study, Explore,</span>{" "}
            Stay Legally
          </h1>
          <p className="text-[#6b6b6b] text-lg leading-relaxed mb-8">
            Whether you're coming for a language immersion, a full university degree, or a master's program ~ Spain's student visa gives you legal residency, Schengen access, and in some cases the right to work while you study.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <img
                src="/assets/avatar.png"
                alt="Abie Maxey"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-[#6b6b6b]">
              <span className="font-semibold text-[#3a3a3a]">Abie Maxey</span>
              <span>·</span>
              <span>10 min read</span>
              <span>·</span>
              <ShareButton title="Spain Student Visa: The Complete Guide (2026)" />
            </div>
          </div>
        </section>

        {/* ── TOC ──────────────────────────────────────────────────── */}
        <div className="px-6 lg:px-8 max-w-3xl mx-auto mb-12">
          <div className="bg-white border border-[#e7ddd3] rounded-2xl p-6">
            <p className="text-[10px] font-bold tracking-widest text-[#aaaaaa] uppercase mb-4">
              IN THIS GUIDE
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: "Who Is This For?", href: "#who" },
                { label: "Visa Types", href: "#types" },
                { label: "Financial Requirements", href: "#finances" },
                { label: "Work Rights", href: "#work" },
                { label: "Valid Programs", href: "#programs" },
                { label: "Application Steps", href: "#apply" },
                { label: "After You Graduate", href: "#after" },
                { label: "The Big Warning", href: "#warning" },
                { label: "Which Visa Is Right?", href: "#compare" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-sm text-[#6b6b6b] hover:text-[#e3a99c] transition-colors py-0.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#e3a99c] flex-shrink-0 group-hover:scale-150 transition-transform" />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 lg:px-8 max-w-3xl mx-auto space-y-20 pb-24">

          {/* ── Who Is This For ───────────────────────────────────── */}
          <section id="who">
            <p className="text-[10px] font-bold tracking-widest text-[#aaaaaa] uppercase mb-3">
              WHO IT'S FOR
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#3a3a3a] mb-3">
              Is the student visa right for you?
            </h2>
            <p className="text-[#6b6b6b] mb-8">
              Spain's student visa covers a wide range of people ~ from 3-month language students to multi-year PhD candidates. Here are the most common profiles.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  emoji: "🗣️",
                  title: "The Language Learner",
                  body: "Doing an intensive Spanish course at an Instituto Cervantes-accredited school. 3 months to 1 year. You want to actually speak the language, not just travel.",
                },
                {
                  emoji: "🎓",
                  title: "The University Student",
                  body: "Enrolled in a Spanish university for a bachelor's, master's, or PhD. You get automatic work rights (30hrs/week) and Schengen-wide travel during your studies.",
                },
                {
                  emoji: "💼",
                  title: "The Career Changer",
                  body: "Taking a vocational training (FP) program or professional course to pivot into a new field. Spain's FP system is world-class and increasingly taught in English.",
                },
                {
                  emoji: "👨‍👩‍👧",
                  title: "The Family + Student",
                  body: "Higher education students can bring their spouse and minor children. A great option for families who want the Spain experience while one partner studies.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="bg-white border border-[#e7ddd3] rounded-2xl p-5"
                >
                  <div className="text-2xl mb-3">{card.emoji}</div>
                  <h3 className="font-bold text-[#3a3a3a] mb-2">{card.title}</h3>
                  <p className="text-sm text-[#6b6b6b] leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Visa Types ───────────────────────────────────────── */}
          <section id="types">
            <p className="text-[10px] font-bold tracking-widest text-[#aaaaaa] uppercase mb-3">
              VISA TYPES
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#3a3a3a] mb-3">
              Short-term vs Long-term
            </h2>
            <p className="text-[#6b6b6b] mb-8">
              There are two main types depending on how long your program is. Most serious students will need the long-term option.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#f9f5f2] border border-[#e7ddd3] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-[#e0eaeb] flex items-center justify-center">
                    <Clock className="w-4 h-4 text-[#7a8f90]" />
                  </div>
                  <h3 className="font-bold text-[#3a3a3a]">Short-term Visa</h3>
                </div>
                <ul className="space-y-2 text-sm text-[#6b6b6b]">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" /><span>Up to 90 days in any 180-day window</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" /><span>Ideal for short intensive courses</span></li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /><span>Non-renewable (only in exceptional cases)</span></li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /><span>No TIE card issued</span></li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /><span>No work rights</span></li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#e3a99c]/10 to-[#f2d6c9]/20 border border-[#e3a99c]/30 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-[#f2d6c9] flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-[#e3a99c]" />
                  </div>
                  <h3 className="font-bold text-[#3a3a3a]">Long-term Visa</h3>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#e3a99c] bg-[#f2d6c9] px-2 py-0.5 rounded-full">Most Common</span>
                </div>
                <ul className="space-y-2 text-sm text-[#6b6b6b]">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" /><span>For programs over 90 days</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" /><span>Valid for 1 year initially, renewable</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" /><span>TIE card issued for 6+ month programs</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" /><span>30hrs/week work rights (higher ed)</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" /><span>Full Schengen zone access</span></li>
                </ul>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { label: "INITIAL DURATION", value: "1 year", sub: "Renewable per course length" },
                { label: "SCHENGEN ACCESS", value: "26 countries", sub: "Travel freely while studying" },
                { label: "APPLY BEFORE", value: "2 months", sub: "Before course start date" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white border border-[#e7ddd3] rounded-xl p-4 text-center">
                  <p className="text-[9px] font-bold tracking-widest text-[#aaaaaa] uppercase mb-1">{stat.label}</p>
                  <p className="text-xl font-bold text-[#3a3a3a] mb-0.5">{stat.value}</p>
                  <p className="text-[11px] text-[#6b6b6b]">{stat.sub}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Financial Requirements ───────────────────────────── */}
          <section id="finances">
            <p className="text-[10px] font-bold tracking-widest text-[#aaaaaa] uppercase mb-3">
              THE NUMBERS
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#3a3a3a] mb-3">
              Financial Requirements
            </h2>
            <p className="text-[#6b6b6b] mb-8">
              You must show Spain you can support yourself for your entire course duration ~ without needing to rely on the Spanish state. The minimum is based on IPREM (Spain's public income reference index).
            </p>

            <div className="space-y-3">
              {[
                { who: "Just you", monthly: "€600 / month", annual: "€7,200 / year", bg: "#f2d6c9", accent: "#e3a99c" },
                { who: "You + 1 dependent", monthly: "€1,050 / month", annual: "€12,600 / year", bg: "#e0eaeb", accent: "#7a8f90" },
                { who: "You + 2 dependents", monthly: "€1,350 / month", annual: "€16,200 / year", bg: "#d4e0d3", accent: "#8fa38d" },
              ].map((row) => (
                <div
                  key={row.who}
                  className="flex items-center justify-between bg-white border border-[#e7ddd3] rounded-xl px-5 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-8 rounded-full flex-shrink-0"
                      style={{ backgroundColor: row.accent }}
                    />
                    <span className="font-semibold text-[#3a3a3a] text-sm">{row.who}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#3a3a3a]">{row.monthly}</p>
                    <p className="text-xs text-[#6b6b6b]">{row.annual}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 bg-[#f9f5f2] border border-[#e7ddd3] rounded-xl p-4 flex gap-3">
              <AlertTriangle className="w-4 h-4 text-[#e3a99c] flex-shrink-0 mt-0.5" />
              <div className="text-sm text-[#6b6b6b] leading-relaxed">
                <span className="font-semibold text-[#3a3a3a]">Pro tip:</span> Your bank account can be foreign or Spanish ~ what matters is that it clearly shows current, available funds. Print recent statements showing the full required balance for your program length.
              </div>
            </div>
          </section>

          {/* ── Work Rights ─────────────────────────────────────── */}
          <section id="work">
            <p className="text-[10px] font-bold tracking-widest text-[#aaaaaa] uppercase mb-3">
              WORK RIGHTS
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#3a3a3a] mb-3">
              Can you work while studying?
            </h2>
            <p className="text-[#6b6b6b] mb-8">
              It depends on your program level. Higher education students got a major upgrade in 2022.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#d4e0d3] to-[#d4e0d3]/50 border border-[#8fa38d]/30 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-[#8fa38d]/20 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-[#8fa38d]" />
                  </div>
                  <h3 className="font-bold text-[#3a3a3a]">Higher Education</h3>
                </div>
                <div className="text-3xl font-bold text-[#3a3a3a] mb-1">30 hrs<span className="text-base font-normal text-[#6b6b6b]">/week</span></div>
                <p className="text-xs text-[#6b6b6b] mb-4">Automatic ~ no extra paperwork since Aug 2022</p>
                <ul className="space-y-1.5 text-sm text-[#6b6b6b]">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#8fa38d] flex-shrink-0" /> University degrees</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#8fa38d] flex-shrink-0" /> Master's programs</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#8fa38d] flex-shrink-0" /> PhD / Doctorate</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#8fa38d] flex-shrink-0" /> Higher vocational training (FP Superior)</li>
                </ul>
              </div>

              <div className="bg-[#f9f5f2] border border-[#e7ddd3] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-[#e7ddd3] flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-[#6b6b6b]" />
                  </div>
                  <h3 className="font-bold text-[#3a3a3a]">Other Programs</h3>
                </div>
                <div className="text-3xl font-bold text-[#aaaaaa] mb-1">No work<span className="text-base font-normal text-[#aaaaaa]"> rights</span></div>
                <p className="text-xs text-[#6b6b6b] mb-4">Unless you get separate authorization</p>
                <ul className="space-y-1.5 text-sm text-[#6b6b6b]">
                  <li className="flex items-center gap-2"><XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" /> Language courses</li>
                  <li className="flex items-center gap-2"><XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" /> Short professional certifications</li>
                  <li className="flex items-center gap-2"><XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" /> Non-accredited programs</li>
                  <li className="flex items-center gap-2"><XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" /> Art / sports programs below higher ed level</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#e0eaeb]/40 border border-[#7a8f90]/30 rounded-xl p-4 flex gap-3">
              <Globe className="w-4 h-4 text-[#7a8f90] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#6b6b6b] leading-relaxed">
                <span className="font-semibold text-[#3a3a3a]">Already working remotely?</span>{" "}
                If you have an active remote job or freelance clients outside Spain, you may be a better fit for the{" "}
                <Link href="/digital-nomad-visa" className="text-[#e3a99c] font-semibold hover:underline">
                  Digital Nomad Visa
                </Link>{" "}
                ~ which explicitly covers remote work while living in Spain.
              </p>
            </div>
          </section>

          {/* ── Valid Programs ───────────────────────────────────── */}
          <section id="programs">
            <p className="text-[10px] font-bold tracking-widest text-[#aaaaaa] uppercase mb-3">
              ELIGIBLE PROGRAMS
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#3a3a3a] mb-3">
              What counts as a valid program?
            </h2>
            <p className="text-[#6b6b6b] mb-6">
              Not every course qualifies. Spain is strict about program recognition ~ your school must meet specific requirements.
            </p>

            <div className="bg-white border border-[#e7ddd3] rounded-2xl overflow-hidden mb-4">
              <div className="px-5 py-3 bg-[#f9f5f2] border-b border-[#e7ddd3]">
                <p className="text-xs font-bold text-[#3a3a3a] uppercase tracking-widest">Accepted Program Types</p>
              </div>
              <div className="divide-y divide-[#f0ebe6]">
                {[
                  { icon: "🗣️", type: "Spanish Language Courses", note: "Must be at an Instituto Cervantes-accredited school" },
                  { icon: "📚", type: "Vocational Training (FP)", note: "Government-authorized centers only" },
                  { icon: "🎓", type: "University Degrees (Bachelor's)", note: "Ministry-recognized universities" },
                  { icon: "🔬", type: "Master's Programs", note: "Official title or recognized private masters" },
                  { icon: "🏛️", type: "PhD / Doctorate", note: "Counts toward academic residency pathways" },
                  { icon: "🎨", type: "Higher Arts & Sports Education", note: "Ministry of Culture or Sports recognized institutions" },
                ].map((row) => (
                  <div key={row.type} className="flex items-start gap-3 px-5 py-3">
                    <span className="text-base flex-shrink-0">{row.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-[#3a3a3a]">{row.type}</p>
                      <p className="text-xs text-[#6b6b6b] mt-0.5">{row.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#e7ddd3] rounded-xl p-5">
              <p className="text-xs font-bold text-[#3a3a3a] mb-3">Your school must meet ALL of these:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Authorized by the Ministry or regional government",
                  "Full-time (hybrid OK if 50%+ in-person)",
                  "Issues an official certificate or degree",
                  "Language schools must be Instituto Cervantes-accredited",
                ].map((req) => (
                  <div key={req} className="flex items-start gap-2 text-sm text-[#6b6b6b]">
                    <CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Application Steps ────────────────────────────────── */}
          <section id="apply">
            <p className="text-[10px] font-bold tracking-widest text-[#aaaaaa] uppercase mb-3">
              HOW TO APPLY
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#3a3a3a] mb-3">
              Application Steps & Documents
            </h2>
            <p className="text-[#6b6b6b] mb-8">
              Apply at the Spanish consulate in your home country, ideally 2 months before your program starts. If you're already in Spain on a tourist visa, you can apply in-country for higher education programs only ~ but you must still have at least 2 months left on your current visa.
            </p>

            <div className="space-y-3 mb-8">
              {[
                {
                  step: "01",
                  title: "Get accepted to a recognized program",
                  body: "Secure your enrollment letter from a government-authorized school. This is the foundation of your entire application.",
                  icon: <BookOpen className="w-4 h-4" />,
                },
                {
                  step: "02",
                  title: "Gather your documents",
                  body: "See the full list below. For programs over 6 months, you'll also need a criminal background check (apostilled + translated) and a medical certificate.",
                  icon: <FileText className="w-4 h-4" />,
                },
                {
                  step: "03",
                  title: "Book your consulate appointment",
                  body: "Submit at the Spanish consulate in your country of residence. You can send a representative with a notarized authorization letter if you can't go in person.",
                  icon: <Clock className="w-4 h-4" />,
                },
                {
                  step: "04",
                  title: "Wait for processing",
                  body: "Processing times vary widely by consulate ~ budget 4 to 8 weeks. Some consulates are faster. Check your local consulate's current wait times.",
                  icon: <Globe className="w-4 h-4" />,
                },
                {
                  step: "05",
                  title: "Arrive in Spain & register",
                  body: "Register your address (empadronamiento) within 30 days. If your program is 6+ months, you'll collect your TIE (foreigner ID card) at a police appointment.",
                  icon: <Plane className="w-4 h-4" />,
                },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 bg-white border border-[#e7ddd3] rounded-2xl p-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#f2d6c9] flex items-center justify-center text-[#e3a99c]">
                    {s.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold tracking-widest text-[#aaaaaa] uppercase">{s.step}</span>
                      <h3 className="font-bold text-[#3a3a3a] text-sm">{s.title}</h3>
                    </div>
                    <p className="text-sm text-[#6b6b6b] leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Documents checklist */}
            <div className="bg-white border border-[#e7ddd3] rounded-2xl overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-[#e3a99c]/10 to-[#f2d6c9]/10 border-b border-[#e7ddd3]">
                <p className="font-bold text-[#3a3a3a]">Documents Required</p>
              </div>
              <div className="divide-y divide-[#f0ebe6]">
                {[
                  { doc: "Valid passport", note: "Full copy of all pages", required: "always" },
                  { doc: "Acceptance letter", note: "From your recognized school or university", required: "always" },
                  { doc: "Proof of funds", note: "Bank statements showing €600/month per program length", required: "always" },
                  { doc: "Private health insurance", note: "Full coverage in Spain, no co-pays or deductibles", required: "always" },
                  { doc: "Criminal background check", note: "Apostilled + sworn translation (valid 6 months)", required: "6+ months" },
                  { doc: "Medical certificate", note: "Apostilled + sworn translation (valid 3 months)", required: "6+ months" },
                  { doc: "Proof of accommodation", note: "Rental contract or acceptance letter showing address in Spain", required: "recommended" },
                ].map((row) => (
                  <div key={row.doc} className="flex items-start justify-between gap-4 px-5 py-3">
                    <div>
                      <p className="text-sm font-semibold text-[#3a3a3a]">{row.doc}</p>
                      <p className="text-xs text-[#6b6b6b] mt-0.5">{row.note}</p>
                    </div>
                    <span className={`flex-shrink-0 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${row.required === "always"
                      ? "bg-[#f2d6c9] text-[#e3a99c]"
                      : row.required === "6+ months"
                        ? "bg-[#e0eaeb] text-[#7a8f90]"
                        : "bg-[#f0ebe6] text-[#aaaaaa]"
                      }`}>
                      {row.required === "always" ? "Required" : row.required === "6+ months" ? "6+ months" : "Recommended"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── After You Graduate ───────────────────────────────── */}
          <section id="after">
            <p className="text-[10px] font-bold tracking-widest text-[#aaaaaa] uppercase mb-3">
              POST-STUDY OPTIONS
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#3a3a3a] mb-3">
              What happens after you graduate?
            </h2>
            <p className="text-[#6b6b6b] mb-8">
              Graduating doesn't mean you have to leave. Spain offers four post-study pathways ~ some of which can lead to long-term residency (though not through student visa years alone ~ see the warning below).
            </p>

            <div className="space-y-3">
              {[
                {
                  number: "1",
                  title: "Internship Residency",
                  body: "Convert your student visa to an internship permit tied to a formal internship contract. Good for recent grads who've secured a traineeship.",
                  bg: "#f2d6c9",
                  accent: "#e3a99c",
                },
                {
                  number: "2",
                  title: "Work Permit Modification",
                  body: "If you have a job offer (30+ hrs/week) or a solid self-employment business plan, you can modify your status to a work authorization without leaving Spain.",
                  bg: "#e0eaeb",
                  accent: "#7a8f90",
                },
                {
                  number: "3",
                  title: "Highly Qualified Worker Permit",
                  body: "After 1 year as a student, if you land a role paying €40,000+/year or in a management position, you qualify for the Highly Qualified Worker permit.",
                  bg: "#d4e0d3",
                  accent: "#8fa38d",
                },
                {
                  number: "4",
                  title: "Job Search Residency (2 years)",
                  body: "If your university appears on the Spanish government's official recognition list, you can apply for a 2-year job search extension to find work without leaving.",
                  bg: "#f9f5f2",
                  accent: "#aaaaaa",
                },
              ].map((path) => (
                <div key={path.title} className="flex gap-4 bg-white border border-[#e7ddd3] rounded-2xl p-5">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
                    style={{ backgroundColor: path.bg, color: path.accent }}
                  >
                    {path.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3a3a3a] mb-1">{path.title}</h3>
                    <p className="text-sm text-[#6b6b6b] leading-relaxed">{path.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── The Big Warning ──────────────────────────────────── */}
          <section id="warning">
            <div className="bg-[#3a3a3a] rounded-2xl p-8 text-white">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#e3a99c]/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-[#e3a99c]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-1">The Big Warning: Student Years Don't Count</h2>
                  <p className="text-white/60 text-sm">This catches a lot of people off guard.</p>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed mb-4">
                Time spent on a student visa in Spain does <strong className="text-white">not</strong> count toward the 5 years of continuous legal residence required for permanent residency ~ and it does not count toward the 2 or 10 years required for Spanish citizenship.
              </p>
              <p className="text-white/80 leading-relaxed mb-6">
                This is fundamentally different from the{" "}
                <Link href="/digital-nomad-visa" className="text-[#e3a99c] font-semibold hover:underline">
                  Digital Nomad Visa
                </Link>{" "}
                and{" "}
                <Link href="/non-lucrative-visa" className="text-[#e3a99c] font-semibold hover:underline">
                  Non-Lucrative Visa
                </Link>
                , where residency years do count.{" "}
                If your long-term goal is Spanish citizenship or permanent residency, you need to transition to a different visa type after your studies.
              </p>
              <div className="bg-white/10 rounded-xl p-4 text-sm text-white/70 leading-relaxed">
                <span className="text-white font-semibold">Plan your transition early.</span>{" "}
                If you complete a 4-year degree, the clock on your permanent residency only starts once you transition to a work or non-study residency permit after graduation.
              </div>
            </div>
          </section>

          {/* ── Which Visa Is Right? ─────────────────────────────── */}
          <section id="compare">
            <p className="text-[10px] font-bold tracking-widest text-[#aaaaaa] uppercase mb-3">
              VISA COMPARISON
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#3a3a3a] mb-3">
              Student vs DNV vs NLV
            </h2>
            <p className="text-[#6b6b6b] mb-6">
              Not sure which visa is right for you? Here's the honest breakdown.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-[#e7ddd3]">
              <table className="w-full bg-white text-sm">
                <thead>
                  <tr className="border-b border-[#e7ddd3]">
                    <th className="text-left px-4 py-3 text-[10px] font-bold tracking-widest text-[#aaaaaa] uppercase">Category</th>
                    <th className="px-4 py-3 text-[10px] font-bold tracking-widest text-[#7a8f90] uppercase">Student</th>
                    <th className="px-4 py-3 text-[10px] font-bold tracking-widest text-[#e3a99c] uppercase bg-[#f2d6c9]/20">DNV</th>
                    <th className="px-4 py-3 text-[10px] font-bold tracking-widest text-[#6b6b6b] uppercase">NLV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0ebe6]">
                  {[
                    { label: "Work in Spain", student: "30 hrs (higher ed)", dnv: "Yes ~ remotely", nlv: "No" },
                    { label: "Work for Spanish employer", student: "No", dnv: "20% local rule", nlv: "No" },
                    { label: "Counts toward residency", student: "No ✗", dnv: "Yes ✓", nlv: "Yes ✓" },
                    { label: "Min. income required", student: "€600/mo", dnv: "€2,849/mo", nlv: "€2,400/mo" },
                    { label: "Brings family", student: "Higher ed only", dnv: "Yes", nlv: "Yes" },
                    { label: "Citizenship timeline", student: "Doesn't count", dnv: "2~10 yrs†", nlv: "2~10 yrs†" },
                  ].map((row) => (
                    <tr key={row.label}>
                      <td className="px-4 py-3 font-medium text-[#3a3a3a]">{row.label}</td>
                      <td className="px-4 py-3 text-center text-[#6b6b6b]">{row.student}</td>
                      <td className="px-4 py-3 text-center text-[#e3a99c] font-semibold bg-[#f2d6c9]/10">{row.dnv}</td>
                      <td className="px-4 py-3 text-center text-[#6b6b6b]">{row.nlv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-[#aaaaaa] mt-2 px-1">† 2-year citizenship path for Philippines, Latin America, and select countries. See full details on the{" "}
              <Link href="/digital-nomad-visa" className="text-[#e3a99c] hover:underline">DNV page</Link>.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#f2d6c9]/30 border border-[#e3a99c]/30 rounded-xl p-4">
                <p className="text-xs font-bold text-[#e3a99c] mb-2">You're a DNV fit if...</p>
                <p className="text-sm text-[#6b6b6b]">You already work remotely for clients or an employer outside Spain. You want to count time toward residency. You need full work authorization.</p>
                <Link href="/digital-nomad-visa" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#e3a99c] hover:underline">
                  Learn about the DNV <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="bg-[#f9f5f2] border border-[#e7ddd3] rounded-xl p-4">
                <p className="text-xs font-bold text-[#3a3a3a] mb-2">You're an NLV fit if...</p>
                <p className="text-sm text-[#6b6b6b]">You have passive income (pension, investments, rental) and don't need to work. You want a quiet life in Spain without studying.</p>
                <Link href="/non-lucrative-visa" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#3a3a3a] hover:underline">
                  Learn about the NLV <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </section>

          {/* ── CTA ─────────────────────────────────────────────── */}
          <section className="bg-[#3a3a3a] rounded-3xl p-10 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#e3a99c]/20 flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-6 h-6 text-[#e3a99c]" />
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-white mb-3">
              Not sure which visa fits your situation?
            </h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto text-sm leading-relaxed">
              Book a strategy call. We'll look at your income, goals, and timeline ~ and tell you which visa gives you the best path to staying in Spain long-term.
            </p>
            <BookCallButton
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#e3a99c] text-white font-bold text-lg hover:bg-[#d38b7b] hover:shadow-xl hover:shadow-[#e3a99c]/30 transition-all duration-300 group"
              url="https://calendly.com/abie-gamao/spain-dnv"
              title="Book a Strategy Call"
            >
              <span>Book a Strategy Call</span>
              <Plane className="w-5 h-5 group-hover:-rotate-45 transition-transform duration-300" />
            </BookCallButton>
            <p className="text-white/40 text-xs mt-4">Paid consultation ~ book your session now.</p>
          </section>

        </div>

        <Footer />
      </main>
    </>
  );
}
