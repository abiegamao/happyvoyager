import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  FileText,
  Clock,
  DollarSign,
  MapPin,
  Zap,
  Calendar,
  Shield,
  Briefcase,
  CreditCard,
  UserCheck,
  BookOpen,
} from "lucide-react";

const sections = [
  { id: "is-this-you", label: "Is This Visa For You?" },
  { id: "two-routes", label: "The Two Routes" },
  { id: "documents", label: "Document Checklist" },
  { id: "step-by-step", label: "Step-by-Step Process" },
  { id: "fees", label: "Fees & Costs" },
  { id: "after-approval", label: "After Approval" },
  { id: "beckham-law", label: "Beckham Law" },
  { id: "mistakes", label: "Mistakes to Avoid" },
];

const snapshots = [
  {
    icon: MapPin,
    color: "#e3a99c",
    bg: "#f2d6c9",
    label: "Best Route",
    value: "UGE in Spain",
    note: "3-year permit from day one, no consulate queue",
  },
  {
    icon: Clock,
    color: "#8fa38d",
    bg: "#d4e0d3",
    label: "Processing Time",
    value: "20 work days",
    note: "By law. TIE card takes 2-3 months total",
  },
  {
    icon: DollarSign,
    color: "#7a8f90",
    bg: "#e0eaeb",
    label: "Application Fee",
    value: "€73.26",
    note: "Per applicant via UGE. Total costs ~€300-700",
  },
  {
    icon: Shield,
    color: "#bbcccd",
    bg: "#e8f0f1",
    label: "Income (Solo)",
    value: "€34,728/yr",
    note: "~€2,894/mo. Pegged to Spanish minimum wage",
  },
];

const documents = [
  {
    category: "Everyone needs these",
    color: "#8fa38d",
    bg: "#d4e0d3",
    items: [
      { text: "Valid passport (12+ months remaining)", note: "This is non-negotiable" },
      { text: "Passport-size photo", note: "White background, recent, matte finish" },
      { text: "Criminal record certificate", note: "Apostilled + sworn Spanish translation. From every country you've lived in the last 2-5 years" },
      { text: "Private health insurance", note: "Must cover Spain, no co-payments, valid 1+ year, automatic renewal. Not travel insurance." },
      { text: "Proof of qualifications", note: "Degree + apostille, OR 3+ years of professional experience in your field" },
    ],
  },
  {
    category: "If you're employed (working for a company)",
    color: "#7a8f90",
    bg: "#e0eaeb",
    items: [
      { text: "Employment contract", note: "Sworn Spanish translation. Must be permanent OR at least 1 year duration, signed 3+ months ago" },
      { text: "Employer authorization letter", note: "Letter confirming you can work remotely from Spain. Standard translation." },
      { text: "Bank statements + payslips", note: "Last 3 months. Showing consistent income meeting the threshold" },
      { text: "Company registration proof", note: "Apostilled + sworn translation. Company must be 1+ year old and actively trading" },
    ],
  },
  {
    category: "If you're self-employed / freelance",
    color: "#e3a99c",
    bg: "#f2d6c9",
    items: [
      { text: "Client contracts or letters", note: "Proving active, ongoing remote work" },
      { text: "Invoices from last 3+ months", note: "Showing consistent income from foreign clients" },
      { text: "Bank statements", note: "Matching your invoice income. 3 months minimum" },
      { text: "Proof of business registration", note: "In your home country or wherever you're legally operating" },
    ],
  },
];

const steps = [
  {
    number: "01",
    title: "Check your eligibility honestly",
    body: "Income, remote work type, nationality, qualifications. Use my free assessment to get a real answer based on your exact situation before you touch a single document.",
    cta: { label: "Take the free assessment", href: "/assessment" },
  },
  {
    number: "02",
    title: "Get your Schengen visa (if needed)",
    body: "If you don't have visa-free access to Spain, a Schengen visa is your fastest entry point. Apply through your home country's Spanish embassy. Once in Spain on a tourist or Schengen entry, you can apply via UGE directly, which gives you a 3-year permit instead of 1.",
    cta: null,
  },
  {
    number: "03",
    title: "Build your document file before you land",
    body: "Don't wait until you're in Spain to start chasing paperwork. The criminal background check alone can take weeks, and apostilles take time. I started building my file 2 months before I applied. Everything that needs a sworn translation: budget time and money for that.",
    cta: null,
  },
  {
    number: "04",
    title: "Enroll in Social Security before you apply",
    body: "This changed in 2026. UGE now expects you to be enrolled in Social Security at the time of application, not after approval. For self-employed: RETA registration. For employees: your employer needs a Certificate of Coverage confirming Spain is covered. Don't skip this step.",
    cta: null,
  },
  {
    number: "05",
    title: "Submit your UGE application online",
    body: "Go to the IMSERSO/UGE portal (sede.administracionespublicas.gob.es). You'll upload your documents digitally. This is where most people panic because the portal is in Spanish and not intuitive. Take it slow. Double-check every field. Once submitted, UGE has 20 working days to respond.",
    cta: null,
  },
  {
    number: "06",
    title: "Wait for the favorable silence (or the approval letter)",
    body: "Here's something they don't tell you: if 20 working days pass and you hear nothing, that's legally considered an approval. It's called 'favorable administrative silence.' You can proceed to the TIE step. Most people get an explicit approval email though.",
    cta: null,
  },
  {
    number: "07",
    title: "Book your TIE fingerprint appointment",
    body: "TIE (Tarjeta de Identidad de Extranjero) is your physical residence card. You book this through the Policía Nacional portal using the Cita Previa system. Appointments can be hard to get depending on your city. Book immediately after approval. The card takes 30-45 days to arrive after fingerprints.",
    cta: null,
  },
  {
    number: "08",
    title: "Get your NIF/NIE",
    body: "Your Número de Identificación Fiscal is your Spanish tax ID. You'll need this for basically everything in Spain: opening a bank account, signing a lease, filing taxes. You can request it at the same time as your TIE appointment or separately at the Agencia Tributaria.",
    cta: null,
  },
];

export default function HowToApplyDNVPage() {
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
            <Link href="/blog" className="hover:text-[#e3a99c] transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-[#3a3a3a]">How to Apply for the Spain DNV</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#d4e0d3]/40 border border-[#d4e0d3]">
              <span className="text-xs font-bold tracking-widest text-[#8fa38d] uppercase">🇪🇸 Spain DNV</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f2d6c9]/40 border border-[#f2d6c9]">
              <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">Updated March 2026</span>
            </div>
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-[#3a3a3a] leading-tight mb-6">
            How I Applied for the Spain<br />
            Digital Nomad Visa,{" "}
            <span className="font-script text-[#e3a99c] text-5xl md:text-6xl lg:text-7xl relative inline-block transform -rotate-1 mt-1">
              step by step
            </span>
          </h1>

          {/* Personal hook */}
          <div className="bg-[#f9f5f2] border border-[#e7ddd3] rounded-2xl p-6 mb-6">
            <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed text-lg">
              I submitted my Spain Digital Nomad Visa application with <strong className="text-[#3a3a3a]">10 Schengen days left</strong> on my entry. No lawyer. No agency. Just months of research, a well-organized document file, and the knowledge that UGE rewards preparation over perfection.
            </p>
            <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed mt-3">
              This is everything I know, updated for 2026, written the way I wish someone had written it for me.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-[#aaaaaa]">
            <Calendar className="w-4 h-4" />
            <span>Written by Abie · Last updated March 2026 · Based on UGE Valencia conference, February 2026</span>
          </div>
        </div>
      </section>

      {/* ── QUICK SNAPSHOT ── */}
      <section className="py-10 px-6 bg-[#f9f5f2] border-b border-[#e7ddd3]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-[#aaaaaa] uppercase mb-5">Quick snapshot</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {snapshots.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#e7ddd3] p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: s.bg }}>
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#aaaaaa] mb-1">{s.label}</p>
                <p className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#3a3a3a] mb-1">{s.value}</p>
                <p className="text-xs text-[#6b6b6b] leading-snug">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl border border-[#e7ddd3] p-6 mb-12">
          <p className="text-xs font-bold tracking-widest text-[#aaaaaa] uppercase mb-4">In this guide</p>
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

        <div className="space-y-20">

          {/* 1. Is This Visa For You */}
          <section id="is-this-you" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#d4e0d3] flex items-center justify-center flex-shrink-0">
                <UserCheck className="w-4 h-4 text-[#8fa38d]" />
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-[#3a3a3a]">
                Is This Visa For You?
              </h2>
            </div>
            <div className="pl-12 space-y-5">
              <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed">
                The Spain Digital Nomad Visa is for non-EU citizens who work remotely for companies or clients based <strong className="text-[#3a3a3a]">outside Spain</strong>. If your income comes from a Spanish employer or Spanish clients exclusively, this isn&apos;t the visa for you.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Good fit */}
                <div className="bg-[#f0f4f0] border border-[#d4e0d3] rounded-2xl p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#8fa38d] mb-4">You&apos;re a strong candidate if</p>
                  <div className="space-y-3">
                    {[
                      "You work remotely for a foreign company (employed)",
                      "You freelance for clients based outside Spain",
                      "Your work is fully digital, knowledge-based",
                      "You earn €34,728/yr+ (solo) consistently",
                      "You have a degree OR 3+ years professional experience",
                      "You&apos;re not an EU/EEA citizen",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[#6b6b6b]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Not a good fit */}
                <div className="bg-[#fdf1ee] border border-[#f2d6c9] rounded-2xl p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#e3a99c] mb-4">You may not qualify if</p>
                  <div className="space-y-3">
                    {[
                      "Your work requires physical presence or on-site visits",
                      "You work in production, logistics, or warehouse operations",
                      "Your only client is a Spanish company",
                      "You own a business with employees based in Spain",
                      "You&apos;re currently on a Non-Lucrative Visa (pathway closed in 2026)",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-[#e3a99c] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[#6b6b6b]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Income Table */}
              <div className="bg-white rounded-2xl border border-[#e7ddd3] p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#aaaaaa] mb-4">Income requirements (2026)</p>
                <div className="space-y-3">
                  {[
                    { label: "Solo applicant", amount: "€34,728/yr", sub: "~€2,894/mo" },
                    { label: "Spouse or first dependent", amount: "+€13,024/yr", sub: "75% of SMI on top" },
                    { label: "Each additional child", amount: "+€4,341/yr", sub: "25% of SMI per child" },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-[#e7ddd3] last:border-0">
                      <span className="text-sm text-[#6b6b6b]">{row.label}</span>
                      <div className="text-right">
                        <span className="font-[family-name:var(--font-heading)] font-bold text-[#3a3a3a]">{row.amount}</span>
                        <span className="text-xs text-[#aaaaaa] ml-2">{row.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-2 mt-4 pt-4 border-t border-[#e7ddd3]">
                  <Info className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-[#6b6b6b]">Income is pegged to Spain&apos;s minimum wage (SMI), which adjusts annually. The 2026 figure reflects the 3.1% SMI increase approved February 2026. Minor shortfalls can be acceptable if you have savings to demonstrate means of subsistence.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Two Routes */}
          <section id="two-routes" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#f2d6c9] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-[#e3a99c]" />
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-[#3a3a3a]">
                The Two Routes
              </h2>
            </div>
            <div className="pl-12 space-y-5">
              <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed">
                There are two ways to get this visa. I&apos;ll tell you upfront which one I recommend, and why the other one isn&apos;t worth your time if you can avoid it.
              </p>

              <div className="grid md:grid-cols-2 gap-5">
                {/* Route 1 - Consulate */}
                <div className="bg-white rounded-2xl border border-[#e7ddd3] p-6 relative">
                  <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-[#f9f5f2] border border-[#e7ddd3] text-[10px] font-bold text-[#aaaaaa] uppercase tracking-widest">Slower</div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#aaaaaa] mb-3">Route A</p>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a] mb-3">Spanish Consulate (from abroad)</h3>
                  <div className="space-y-2 mb-4">
                    {[
                      "Apply from your home country",
                      "1-year visa granted (not 3-year permit)",
                      "Must attend in-person consulate appointment",
                      "Processing varies by country (weeks to months)",
                      "Then convert to residence permit once in Spain",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#e7ddd3] flex-shrink-0 mt-2" />
                        <span className="text-sm text-[#6b6b6b]">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-[#aaaaaa] italic">Use this if you don&apos;t have visa-free access to Spain and can&apos;t get a Schengen visa first.</p>
                </div>

                {/* Route 2 - UGE */}
                <div className="bg-[#3a3a3a] rounded-2xl p-6 relative">
                  <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-[#e3a99c]/20 border border-[#e3a99c]/30 text-[10px] font-bold text-[#e3a99c] uppercase tracking-widest">Recommended</div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#e3a99c]/70 mb-3">Route B</p>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-white mb-3">UGE in Spain (the system I used)</h3>
                  <div className="space-y-2 mb-4">
                    {[
                      "Apply while legally in Spain (tourist, Schengen, any valid entry)",
                      "3-year residence permit from day one",
                      "Managed almost entirely online",
                      "20 working days processing by law",
                      "No consulate queue. No leaving Spain to wait.",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#e3a99c] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-white/70">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-white/40 italic">This is the route I took. With 10 Schengen days left. It worked.</p>
                </div>
              </div>

              <div className="bg-[#f0f4f0] border border-[#d4e0d3] rounded-2xl p-4">
                <div className="flex gap-3">
                  <Zap className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#3a3a3a] mb-1">The fastest path to get started</p>
                    <p className="text-sm text-[#6b6b6b]">If you&apos;re outside Spain and want to use Route B, get a Schengen visa first. It gets you into Spain legally so you can apply at UGE directly, bypassing the consulate process entirely and landing your 3-year permit from day one.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Documents */}
          <section id="documents" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#e0eaeb] flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-[#7a8f90]" />
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-[#3a3a3a]">
                The Complete Document Checklist
              </h2>
            </div>
            <div className="pl-12 space-y-5">
              <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed">
                This is the part that trips people up. Not because the documents are hard to get, but because <strong className="text-[#3a3a3a]">some of them take weeks</strong> and need to be apostilled + translated. Start here before anything else.
              </p>

              <div className="bg-[#fdf1ee] border border-[#f2d6c9] rounded-2xl p-4 mb-2">
                <div className="flex gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#e3a99c] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#6b6b6b]">
                    <strong className="text-[#3a3a3a]">Translation rule:</strong> Documents issued outside Spain must be officially translated into Spanish by a sworn translator. Foreign documents from Hague Convention countries need an Apostille stamp, not consulate legalization.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {documents.map((group, gi) => (
                  <div key={gi} className="bg-white rounded-2xl border border-[#e7ddd3] overflow-hidden">
                    <div className="px-5 py-3 border-b border-[#e7ddd3]" style={{ backgroundColor: group.bg + "60" }}>
                      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: group.color }}>{group.category}</p>
                    </div>
                    <div className="divide-y divide-[#f9f5f2]">
                      {group.items.map((item, ii) => (
                        <div key={ii} className="flex items-start gap-3 px-5 py-4">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: group.color }} />
                          <div>
                            <p className="text-sm font-semibold text-[#3a3a3a]">{item.text}</p>
                            <p className="text-xs text-[#aaaaaa] mt-0.5">{item.note}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#f0f4f0] border border-[#d4e0d3] rounded-2xl p-4">
                <div className="flex gap-2">
                  <Info className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#6b6b6b]">
                    <strong className="text-[#3a3a3a]">Self-employed note:</strong> You can work for a Spanish client, as long as it doesn&apos;t exceed 20% of your total professional activity. UGE does not require client authorization letters from freelancers, and client changes during your permit period don&apos;t need to be reported.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Step by Step */}
          <section id="step-by-step" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#f2d6c9] flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-4 h-4 text-[#e3a99c]" />
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-[#3a3a3a]">
                Step-by-Step: The System I Used
              </h2>
            </div>
            <div className="pl-12 space-y-4">
              <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed">
                I&apos;m not going to give you the generic &quot;gather documents, submit application, wait&quot; version. Here&apos;s the actual sequence with the things I wish I had known.
              </p>

              <div className="space-y-4">
                {steps.map((step, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-[#e7ddd3] p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <span className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#e3a99c]/30">{step.number}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a] mb-2">{step.title}</h3>
                        <p className="text-sm text-[#6b6b6b] leading-relaxed">{step.body}</p>
                        {step.cta && (
                          <Link
                            href={step.cta.href}
                            className="inline-flex items-center gap-2 mt-3 text-sm font-bold text-[#e3a99c] hover:gap-3 transition-all"
                          >
                            {step.cta.label}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. Fees */}
          <section id="fees" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#e8f0f1] flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-4 h-4 text-[#bbcccd]" />
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-[#3a3a3a]">
                Fees & What It Actually Costs
              </h2>
            </div>
            <div className="pl-12 space-y-5">
              <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed">
                The visa fee itself is the cheapest part. It&apos;s the document prep costs that catch people off guard.
              </p>

              <div className="bg-white rounded-2xl border border-[#e7ddd3] overflow-hidden">
                <div className="divide-y divide-[#f9f5f2]">
                  {[
                    { item: "UGE application fee (Tasa 790-038)", cost: "€73.26", note: "Per applicant. Paid online during submission." },
                    { item: "TIE residence card (first card)", cost: "€16.08", note: "Physical card, paid at the police station" },
                    { item: "Sworn translations (per document)", cost: "€50–€150", note: "Budget €400-600 for a full file" },
                    { item: "Apostille stamps", cost: "€20–€50 each", note: "Depends on your country. Some are free, some charge per document." },
                    { item: "Criminal record certificate", cost: "€3–€30", note: "Depends on your country. Online or in person." },
                    { item: "Private health insurance (annual)", cost: "€500–€1,200", note: "Varies by provider and age. Must be Spain-specific, no co-payments." },
                  ].map((row, i) => (
                    <div key={i} className="flex items-start justify-between gap-4 px-5 py-4">
                      <div>
                        <p className="text-sm font-semibold text-[#3a3a3a]">{row.item}</p>
                        <p className="text-xs text-[#aaaaaa] mt-0.5">{row.note}</p>
                      </div>
                      <span className="font-[family-name:var(--font-heading)] font-bold text-[#3a3a3a] flex-shrink-0">{row.cost}</span>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-4 bg-[#f9f5f2] border-t border-[#e7ddd3] flex justify-between items-center">
                  <span className="text-sm font-bold text-[#3a3a3a]">Realistic total (solo applicant, DIY)</span>
                  <span className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#e3a99c]">€700–€1,500</span>
                </div>
              </div>

              <div className="bg-[#f0f4f0] border border-[#d4e0d3] rounded-2xl p-4">
                <div className="flex gap-2">
                  <Info className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#6b6b6b]">
                    For comparison: a lawyer or immigration agency typically charges <strong className="text-[#3a3a3a]">€1,500–€3,500 on top of all of the above</strong>. That&apos;s why I built a system instead.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 6. After Approval */}
          <section id="after-approval" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#d4e0d3] flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-[#8fa38d]" />
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-[#3a3a3a]">
                After Approval: What Happens Next
              </h2>
            </div>
            <div className="pl-12 space-y-5">
              <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed">
                Getting approved is step one. The weeks after approval are where most people lose momentum. Here&apos;s the order of operations.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: Clock,
                    color: "#e3a99c",
                    bg: "#f2d6c9",
                    title: "Immediately: Book your TIE appointment",
                    body: "TIE appointments (Policía Nacional, Cita Previa) fill up fast in major cities. Book within 24 hours of receiving your UGE approval. Don&apos;t wait. The card takes 30-45 days to arrive after your fingerprint appointment, and you&apos;ll need it to open a bank account.",
                  },
                  {
                    icon: Shield,
                    color: "#8fa38d",
                    bg: "#d4e0d3",
                    title: "Week 1: Register with Social Security",
                    body: "This is now a hard requirement, not optional. Employed? Your employer needs to enroll you through the relevant treaty. Self-employed? Register with RETA (Autónomos). This should ideally happen before or right after UGE approval, not months later.",
                  },
                  {
                    icon: BookOpen,
                    color: "#7a8f90",
                    bg: "#e0eaeb",
                    title: "Month 1: Get your NIF (Número de Identificación Fiscal)",
                    body: "This is your Spanish tax ID. You need it for almost everything: bank account, lease agreement, utilities, tax filing. You can get it at the Agencia Tributaria (tax office) with your passport and residence proof.",
                  },
                  {
                    icon: Calendar,
                    color: "#bbcccd",
                    bg: "#e8f0f1",
                    title: "Month 2-3: Your TIE card arrives",
                    body: "Pick it up at the police station. This card is your proof of residence in Spain. Once you have it, you can open a Spanish bank account, sign leases formally, and access services as a legal resident.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-white rounded-2xl border border-[#e7ddd3] p-5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: item.bg }}>
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#3a3a3a] mb-1">{item.title}</p>
                      <p className="text-sm text-[#6b6b6b] leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Renewal note */}
              <div className="bg-[#f9f5f2] border border-[#e7ddd3] rounded-2xl p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#aaaaaa] mb-3">About renewals (good news)</p>
                <div className="space-y-2">
                  {[
                    "Your 3-year permit can be renewed for 2 more years, then again, up to 5 years total",
                    "After 5 years, you may be eligible for long-term EU residency",
                    "After 10 years: Spanish citizenship path opens (2 years for Filipinos and Latin Americans)",
                    "No minimum stay requirement for permit renewal, only for citizenship",
                    "Renewals require: latest tax return, Social Security compliance, income proof. No full document resubmission.",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#6b6b6b]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 7. Beckham Law */}
          <section id="beckham-law" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#f2d6c9] flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-4 h-4 text-[#e3a99c]" />
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-[#3a3a3a]">
                Beckham Law: The Tax Benefit Worth Knowing About
              </h2>
            </div>
            <div className="pl-12 space-y-4">
              <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed">
                Spain offers a special expat tax regime called the Beckham Law (Régimen Especial de Trabajadores Desplazados). If you qualify, instead of paying Spain&apos;s progressive income tax rate (up to 47%), you pay a flat <strong className="text-[#3a3a3a]">24% on Spanish-sourced income up to €600,000</strong>.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: "Flat tax rate", value: "24%", note: "vs. up to 47% standard rate" },
                  { label: "Duration", value: "6 years", note: "Year of arrival + 5 additional years" },
                  { label: "Income cap", value: "€600K", note: "Above this, standard rates apply" },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-[#e7ddd3] p-5 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#aaaaaa] mb-1">{item.label}</p>
                    <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#3a3a3a]">{item.value}</p>
                    <p className="text-xs text-[#6b6b6b] mt-1">{item.note}</p>
                  </div>
                ))}
              </div>
              <div className="bg-[#fdf1ee] border border-[#f2d6c9] rounded-2xl p-4">
                <div className="flex gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#e3a99c] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#6b6b6b]">
                    <strong className="text-[#3a3a3a]">Important:</strong> You must apply for the Beckham Law within 6 months of registering with Social Security. Miss the window, and you&apos;re on the standard tax rate. This is a conversation to have with a Spanish tax advisor, not something to DIY.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 8. Mistakes to Avoid */}
          <section id="mistakes" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#fdf1ee] flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-4 h-4 text-[#e3a99c]" />
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-[#3a3a3a]">
                Mistakes That Get Applications Rejected
              </h2>
            </div>
            <div className="pl-12 space-y-3">
              {[
                {
                  title: "Waiting on Social Security enrollment",
                  body: "In 2026, UGE expects Social Security to be set up before or at the time of application. If you apply and then wait months to enroll, you risk permit extinction at renewal.",
                },
                {
                  title: "Health insurance with co-payments or exclusions",
                  body: "Travel insurance doesn&apos;t count. Standard international health policies often have co-pays, which disqualify them. Read the policy carefully. Spain-authorized, no co-pay, 1+ year, automatic renewal.",
                },
                {
                  title: "Wrong contract format",
                  body: "Your employment contract must be at least 3 months old and either permanent or have at least 1 year remaining. A brand new 6-month contract submitted on day one won&apos;t pass. Freelancers need prior documentation of 3+ months of activity.",
                },
                {
                  title: "Untranslated or missing apostilles",
                  body: "Every foreign document needs a sworn Spanish translation AND an apostille (or consulate legalization if your country isn&apos;t a Hague Convention member). One missing apostille can delay everything.",
                },
                {
                  title: "Assuming the Non-Lucrative path still works",
                  body: "As of 2026, switching from a Non-Lucrative Visa to a DNV is officially closed. If you&apos;re on a Non-Lucrative and want to switch, you&apos;re looking at a new application from scratch.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-white rounded-2xl border border-[#e7ddd3] p-5 hover:border-[#f2d6c9] transition-colors">
                  <XCircle className="w-5 h-5 text-[#e3a99c] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-[#3a3a3a] mb-1">{item.title}</p>
                    <p className="text-sm text-[#6b6b6b] leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* DNV Updates Link */}
          <section className="bg-white rounded-2xl border border-[#e7ddd3] p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#f2d6c9] flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-[#e3a99c]" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#aaaaaa] mb-1">February 2026 Update</p>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a] mb-2">
                  The rules shifted in 2026. Read the breakdown.
                </h3>
                <p className="text-sm text-[#6b6b6b] leading-relaxed mb-4">
                  UGE held a conference in Valencia in February 2026 clarifying how they evaluate applications and renewals. Social Security enforcement, income thresholds, employment vs. self-employed differences, and more.
                </p>
                <Link
                  href="/dnv-updates-2026"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#e3a99c] hover:gap-3 transition-all group"
                >
                  Spain DNV: What UGE Actually Expects in 2026
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="bg-[#3a3a3a] rounded-3xl p-8 md:p-10">
            <p className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase mb-4">You&apos;re closer than you think</p>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              I did this with 10 Schengen days left.<br />No lawyer. No agency.
            </h2>
            <p className="font-[family-name:var(--font-body)] text-white/70 leading-relaxed mb-8">
              If I can build a system that works on a deadline, you can use that same system from a standing start. The visa process rewards preparation, not perfection. Start now, even if you don&apos;t have every answer yet.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#e3a99c] text-[#3a3a3a] font-bold hover:bg-white transition-all duration-300 text-sm group"
              >
                Check If You Qualify (Free)
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/digital-nomad-visa"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-2 border-white/20 text-white font-bold hover:border-white hover:bg-white/10 transition-all duration-300 text-sm"
              >
                Full DNV Overview
              </Link>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  );
}
