import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import BookCallButton from "@/components/BookCallButton";
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  Users,
  FileText,
  Briefcase,
  RefreshCw,
  GraduationCap,
  MapPin,
  Zap,
  Calendar,
  Shield,
  TrendingUp,
  BadgeCheck,
} from "lucide-react";
import ShareButton from "@/components/ShareButton";

const sections = [
  { id: "eligibility", label: "Core Eligibility" },
  { id: "social-security", label: "Social Security" },
  { id: "income", label: "Income Requirements" },
  { id: "employees-vs-self", label: "Employees vs Self-Employed" },
  { id: "renewals", label: "Renewals" },
  { id: "family", label: "Family Members" },
  { id: "students", label: "Students & Transitions" },
  { id: "qualifications", label: "Qualifications" },
  { id: "presence", label: "Physical Presence" },
  { id: "system", label: "System Upgrades" },
];

const highlights = [
  {
    icon: AlertTriangle,
    color: "#e3a99c",
    bg: "#f2d6c9",
    label: "Non-Lucrative → DNV",
    value: "Closed",
    note: "This pathway no longer accepts new applications",
  },
  {
    icon: Shield,
    color: "#8fa38d",
    bg: "#d4e0d3",
    label: "Social Security",
    value: "Mandatory",
    note: "40% of non-compliant cases face permit extinction",
  },
  {
    icon: TrendingUp,
    color: "#7a8f90",
    bg: "#e0eaeb",
    label: "Income (solo)",
    value: "€34K/yr",
    note: "€40K total for families ~ assessed case by case",
  },
  {
    icon: MapPin,
    color: "#bbcccd",
    bg: "#e8f0f1",
    label: "Minimum Stay",
    value: "None",
    note: "No enforceable 183-day rule for residency renewal",
  },
];

export default function DNVUpdates2026Page() {
  return (
    <main className="min-h-screen bg-[#f9f5f2] text-[#3a3a3a]">
      <Header />

      {/* ── HERO ── */}
      <section className="pt-32 pb-12 px-6 bg-white border-b border-[#e7ddd3]">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#aaaaaa] mb-6">
            <Link href="/" className="hover:text-[#e3a99c] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/digital-nomad-visa" className="hover:text-[#e3a99c] transition-colors">Spain DNV</Link>
            <span>/</span>
            <span className="text-[#3a3a3a]">2026 UGE Criteria Update</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f2d6c9]/40 border border-[#f2d6c9]">
              <span className="w-2 h-2 rounded-full bg-[#e3a99c] animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">February 2026 Update</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#d4e0d3]/40 border border-[#d4e0d3]">
              <span className="text-xs font-bold tracking-widest text-[#8fa38d] uppercase">🇪🇸 Spain DNV</span>
            </div>
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-[#3a3a3a] leading-tight mb-6">
            Spain DNV: What UGE<br />
            <span className="font-script text-[#e3a99c] text-5xl md:text-6xl lg:text-7xl relative inline-block transform -rotate-1 mt-1">
              actually expects
            </span>{" "}
            in 2026
          </h1>

          <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] leading-relaxed max-w-2xl mb-6">
            In February 2026, the UGE (Unidad de Grandes Empresas) held a conference in Valencia clarifying exactly how they evaluate Digital Nomad Visa applications and renewals. Here&apos;s every key criteria change, in plain English.
          </p>

          <div className="flex items-center gap-3 text-sm text-[#aaaaaa]">
            <Calendar className="w-4 h-4" />
            <span>Based on UGE Valencia conference, 12 February 2026</span>
          </div>
        </div>
      </section>

      {/* ── KEY HIGHLIGHTS ── */}
      <section className="py-10 px-6 bg-[#f9f5f2] border-b border-[#e7ddd3]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-[#aaaaaa] uppercase mb-5">Quick snapshot</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {highlights.map((h, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#e7ddd3] p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: h.bg }}>
                  <h.icon className="w-4 h-4" style={{ color: h.color }} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#aaaaaa] mb-1">{h.label}</p>
                <p className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#3a3a3a] mb-1">{h.value}</p>
                <p className="text-xs text-[#6b6b6b] leading-snug">{h.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl border border-[#e7ddd3] p-6 mb-12">
          <p className="text-xs font-bold tracking-widest text-[#aaaaaa] uppercase mb-4">In this article</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-2 text-sm text-[#6b6b6b] hover:text-[#e3a99c] transition-colors group py-1"
              >
                <ArrowRight className="w-3 h-3 text-[#e3a99c] group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-16">

          {/* 1. Core Eligibility */}
          <section id="eligibility" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#f2d6c9] flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-4 h-4 text-[#e3a99c]" />
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-[#3a3a3a]">
                Core Eligibility & Remote Work
              </h2>
            </div>
            <div className="pl-12 space-y-4">
              <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed">
                UGE is increasingly scrutinising whether a role is <strong className="text-[#3a3a3a]">genuinely remote and knowledge-based</strong>. Roles that require physical presence or on-site work will face refusal. Your job description, contract, and employer letter need to clearly reflect that your work can be done entirely from Spain.
              </p>
              <div className="bg-[#fdf1ee] border border-[#f2d6c9] rounded-2xl p-5">
                <p className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase mb-3">Applications may be refused if your role involves:</p>
                <div className="space-y-2">
                  {[
                    "Physical presence or on-site supervision",
                    "Production, warehouse, or inventory handling",
                    "Regular in-person client or staff visits",
                    "Business ownership with employees in Spain",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-[#e3a99c] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#6b6b6b]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#f0f4f0] border border-[#d4e0d3] rounded-2xl p-4">
                <div className="flex gap-2">
                  <Info className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#6b6b6b]">
                    <strong className="text-[#3a3a3a]">Business owners:</strong> If you manage a company and control shifts to Spain, UGE may flag permanent establishment and tax consequences. Get this reviewed before applying.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Social Security */}
          <section id="social-security" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#d4e0d3] flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-[#8fa38d]" />
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-[#3a3a3a]">
                Social Security Compliance
              </h2>
            </div>
            <div className="pl-12 space-y-4">
              <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed">
                This is the biggest enforcement shift. UGE is now <strong className="text-[#3a3a3a]">actively monitoring Social Security registration</strong> and treating it as a compliance requirement ~ not a formality you can sort out later.
              </p>
              <div className="bg-[#fdf1ee] border-l-4 border-[#e3a99c] rounded-r-2xl p-5">
                <p className="font-bold text-[#3a3a3a] mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#e3a99c]" />
                  What this means in practice
                </p>
                <div className="space-y-2">
                  {[
                    "Registration must happen before UGE notifies you of approval ~ not after",
                    "Delays of 6–12 months without registration are being flagged",
                    "~40% of non-compliant cases face permit extinction",
                    "Renewals now review Social Security status, tax filings, and ongoing activity",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#e3a99c] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#6b6b6b]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] italic">
                The DNV was never designed as a &quot;fix compliance later&quot; permit. UGE is now enforcing that clearly.
              </p>
            </div>
          </section>

          {/* 3. Income */}
          <section id="income" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#e0eaeb] flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-[#7a8f90]" />
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-[#3a3a3a]">
                Income Requirements
              </h2>
            </div>
            <div className="pl-12 space-y-4">
              <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed">
                UGE now uses practical annual benchmarks rather than the monthly SMI formula. Assessments remain case-by-case, and minor shortfalls can be acceptable if you can demonstrate consistent means of subsistence.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-[#e7ddd3] p-5">
                  <p className="text-xs font-bold tracking-widest text-[#aaaaaa] uppercase mb-2">Solo applicant</p>
                  <p className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#3a3a3a]">€34,728</p>
                  <p className="text-sm text-[#6b6b6b] mt-1">per year (~€2,894/mo)</p>
                </div>
                <div className="bg-white rounded-2xl border border-[#e7ddd3] p-5">
                  <p className="text-xs font-bold tracking-widest text-[#aaaaaa] uppercase mb-2">Family (2+ members)</p>
                  <p className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#3a3a3a]">€40,000</p>
                  <p className="text-sm text-[#6b6b6b] mt-1">combined annual total</p>
                </div>
              </div>
              <div className="bg-[#f0f4f0] border border-[#d4e0d3] rounded-2xl p-4">
                <div className="flex gap-2">
                  <Info className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-[#6b6b6b] space-y-1">
                    <p>Savings may be considered alongside income.</p>
                    <p>At renewal: Spanish bank statements preferred, but foreign accounts accepted with proper documentation.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Employees vs Self-Employed */}
          <section id="employees-vs-self" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#e8f0f1] flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-[#bbcccd]" />
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-[#3a3a3a]">
                Employees vs. Self-Employed
              </h2>
            </div>
            <div className="pl-12 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Employees */}
                <div className="bg-white rounded-2xl border border-[#e7ddd3] p-5">
                  <p className="text-xs font-bold tracking-widest text-[#7a8f90] uppercase mb-4">Employed (autorizados)</p>
                  <div className="space-y-3">
                    {[
                      { ok: false, text: "Job changes require new authorization" },
                      { ok: true, text: "No mandatory 3-month employer tenure for existing DNV holders" },
                      { ok: true, text: "UK and US Certificates of Coverage accepted" },
                      { ok: true, text: "Certificates must explicitly cover Spain telework" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        {item.ok
                          ? <CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                          : <AlertTriangle className="w-4 h-4 text-[#e3a99c] flex-shrink-0 mt-0.5" />}
                        <span className="text-sm text-[#6b6b6b]">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Self-Employed */}
                <div className="bg-white rounded-2xl border border-[#e7ddd3] p-5">
                  <p className="text-xs font-bold tracking-widest text-[#7a8f90] uppercase mb-4">Self-Employed (autónomos)</p>
                  <div className="space-y-3">
                    {[
                      { ok: true, text: "RETA registration mandatory" },
                      { ok: true, text: "Client changes require no notification" },
                      { ok: false, text: "Must show 3+ months prior self-employment documentation" },
                      { ok: true, text: "Client authorization letters not required" },
                      { ok: true, text: "Renewals: one month of invoices only, no full contract resubmission" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        {item.ok
                          ? <CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                          : <Info className="w-4 h-4 text-[#7a8f90] flex-shrink-0 mt-0.5" />}
                        <span className="text-sm text-[#6b6b6b]">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Renewals */}
          <section id="renewals" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#f2d6c9] flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-4 h-4 text-[#e3a99c]" />
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-[#3a3a3a]">
                Renewal Documentation
              </h2>
            </div>
            <div className="pl-12 space-y-4">
              <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed">
                UGE has streamlined renewal requirements. You won&apos;t need to resubmit everything from scratch ~ focus is on compliance and ongoing activity.
              </p>
              <div className="bg-white rounded-2xl border border-[#e7ddd3] p-5">
                <p className="text-xs font-bold tracking-widest text-[#aaaaaa] uppercase mb-4">What renewals require</p>
                <div className="space-y-3">
                  {[
                    "Most recent annual tax return",
                    "Social Security compliance proof",
                    "Sufficient income verification",
                    "Only passport biographic data page (not full passport copy)",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#6b6b6b]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-[#6b6b6b]">
                Foreign company registry certificates are <strong className="text-[#3a3a3a]">not required</strong> at renewal if your circumstances haven&apos;t changed.
              </p>
            </div>
          </section>

          {/* 6. Family */}
          <section id="family" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#d4e0d3] flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-[#8fa38d]" />
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-[#3a3a3a]">
                Family Members & Dependents
              </h2>
            </div>
            <div className="pl-12 space-y-4">
              <div className="grid md:grid-cols-1 gap-4">
                {[
                  { icon: CheckCircle2, color: "#8fa38d", text: "Once relationships are proven, they don't need to be re-proven at renewal. Updated declarations are enough." },
                  { icon: CheckCircle2, color: "#8fa38d", text: "Spouses can apply as separate DNV applicants and combine income ~ as long as both register for Social Security and tax, and at least one meets minimum thresholds." },
                  { icon: AlertTriangle, color: "#e3a99c", text: "UGE has acknowledged that some consulates are refusing family visa processing, creating appointment bottlenecks. This is a known operational issue." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white rounded-2xl border border-[#e7ddd3] p-4">
                    <item.icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: item.color }} />
                    <p className="text-sm text-[#6b6b6b] leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. Students */}
          <section id="students" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#e0eaeb] flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-4 h-4 text-[#7a8f90]" />
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-[#3a3a3a]">
                Students & Status Transitions
              </h2>
            </div>
            <div className="pl-12 space-y-4">
              <div className="bg-[#fdf1ee] border border-[#f2d6c9] rounded-2xl p-5">
                <p className="font-bold text-[#3a3a3a] flex items-center gap-2 mb-3">
                  <XCircle className="w-4 h-4 text-[#e3a99c]" />
                  Non-Lucrative → Digital Nomad Visa: Closed
                </p>
                <p className="text-sm text-[#6b6b6b]">
                  This pathway is no longer available for new applications. Existing approvals remain valid, but new applicants switching from Non-Lucrative to DNV will be rejected.
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-[#e7ddd3] p-5">
                <p className="text-xs font-bold tracking-widest text-[#aaaaaa] uppercase mb-3">If you&apos;re on a student visa, you must:</p>
                <div className="space-y-2">
                  {[
                    "First change to a work-permitting status",
                    "Register with Social Security",
                    "Apply for the DNV after the required activity period",
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#f2d6c9] flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-[#e3a99c]">{i + 1}</span>
                      </div>
                      <span className="text-sm text-[#6b6b6b]">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 8. Qualifications */}
          <section id="qualifications" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#e8f0f1] flex items-center justify-center flex-shrink-0">
                <BadgeCheck className="w-4 h-4 text-[#bbcccd]" />
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-[#3a3a3a]">
                Education & Professional Qualifications
              </h2>
            </div>
            <div className="pl-12 space-y-4">
              <div className="flex items-start gap-3 bg-[#f0f4f0] border border-[#d4e0d3] rounded-2xl p-5">
                <CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#3a3a3a] mb-1">Degree homologation is not required</p>
                  <p className="text-sm text-[#6b6b6b]">Unless you&apos;re practising a regulated profession in Spain (medicine, law, architecture, etc.). What matters is your actual function, not the title of your degree. Apostilled credentials generally suffice.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 9. Physical Presence */}
          <section id="presence" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#f2d6c9] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-[#e3a99c]" />
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-[#3a3a3a]">
                Physical Presence Requirements
              </h2>
            </div>
            <div className="pl-12 space-y-4">
              <div className="flex items-start gap-3 bg-[#f0f4f0] border border-[#d4e0d3] rounded-2xl p-5">
                <CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#3a3a3a] mb-1">No enforceable minimum stay for residency renewal</p>
                  <p className="text-sm text-[#6b6b6b]">Based on case law, the 183-day annual stay requirement is not enforceable for DNV residency renewal. You can travel freely without risking your permit.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[#fdf1ee] border border-[#f2d6c9] rounded-2xl p-4">
                <AlertTriangle className="w-4 h-4 text-[#e3a99c] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#6b6b6b]">
                  <strong className="text-[#3a3a3a]">Important:</strong> This does not apply to Spanish citizenship. The 183-day rule still applies if you&apos;re working toward naturalization.
                </p>
              </div>
            </div>
          </section>

          {/* 10. System Upgrades */}
          <section id="system" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#d4e0d3] flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4 text-[#8fa38d]" />
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-[#3a3a3a]">
                System Upgrades Coming April 2026
              </h2>
            </div>
            <div className="pl-12 space-y-4">
              <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed">
                UGE has announced technical improvements planned for April 2026 that should reduce processing friction:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: CheckCircle2, text: "UGE access to Entry/Exit System (EES) for border crossing data" },
                  { icon: CheckCircle2, text: "Automatic passport data reading ~ fewer manual errors" },
                  { icon: CheckCircle2, text: "Reduced fingerprint appointment errors" },
                  { icon: CheckCircle2, text: "Improved family-member application linkage" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 bg-white rounded-2xl border border-[#e7ddd3] p-4">
                    <item.icon className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#6b6b6b]">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Key Takeaway */}
          <section className="bg-[#3a3a3a] rounded-3xl p-8 md:p-10">
            <p className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase mb-4">Bottom line</p>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              UGE is tightening compliance ~ not generosity
            </h2>
            <p className="font-[family-name:var(--font-body)] text-white/70 leading-relaxed mb-6">
              The 2026 criteria signal a clear shift: UGE expects timely Social Security registration, genuinely remote work, and consistent financial and legal compliance from day one. But where they&apos;ve loosened up ~ income thresholds, renewal documents, physical presence ~ they&apos;re applying common sense. The bar isn&apos;t impossible. It just requires a well-prepared application.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/digital-nomad-visa"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#e3a99c] text-[#3a3a3a] font-bold hover:bg-white transition-all duration-300 text-sm group"
              >
                Full DNV Guide
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <BookCallButton
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-2 border-white/20 text-white font-bold hover:border-white hover:bg-white/10 transition-all duration-300 text-sm"
                url="https://calendly.com/abie-gamao/spain-dnv"
                title="Book a Strategy Call"
              >
                Book a Strategy Call
              </BookCallButton>
            </div>
          </section>

        </div>
      </div>

      {/* ── SHARE STRIP ── */}
      <div className="border-t border-[#e7ddd3] py-5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <p className="text-sm text-[#aaaaaa]">Found this useful? Share it with someone planning their move.</p>
          <ShareButton title="Spain DNV Updates 2026 ~ What changed and what it means for you" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
