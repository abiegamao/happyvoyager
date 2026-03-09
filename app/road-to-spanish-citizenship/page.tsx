import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import CitizenshipCountdown from "@/components/CitizenshipCountdown";
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Globe,
  Star,
  Zap,
  FileText,
  Clock,
  Heart,
  Trophy,
} from "lucide-react";

const sections = [
  { id: "plot-twist", label: "The Plot Twist" },
  { id: "what-it-means", label: "What Citizenship Means" },
  { id: "two-exams", label: "The Two Exams" },
  { id: "a2-challenge", label: "My A2 Challenge" },
  { id: "requirements", label: "Full Requirements" },
  { id: "documents", label: "Document Checklist" },
  { id: "roadmap", label: "My Roadmap" },
];

const examFacts = [
  {
    exam: "DELE A2",
    full: "Diploma de Español como Lengua Extranjera",
    by: "Instituto Cervantes",
    cost: "~€108–€220",
    format: "Reading, writing, listening, speaking",
    pass: "Score of B or above in each skill",
    results: ",90 days after exam",
    emoji: "🗣️",
    color: "#e3a99c",
    bg: "#f2d6c9",
    note: "Unless your native language is Spanish , then you're exempt. (Tagalog doesn't count, unfortunately.)",
  },
  {
    exam: "CCSE",
    full: "Conocimientos Constitucionales y Socioculturales de España",
    by: "Instituto Cervantes",
    cost: "€85",
    format: "25 questions , multiple choice + true/false",
    pass: "Minimum 15 correct (60%)",
    results: "Same day usually",
    emoji: "📚",
    color: "#7a8f90",
    bg: "#e0eaeb",
    note: "Spanish history, geography, government, and culture. You'll know more about Spain than most Spaniards.",
  },
];

const citizenshipPerks = [
  { emoji: "🌍", title: "EU passport", body: "Live, work, and move freely across all 27 EU member states. No visa. No expiry. No asking permission." },
  { emoji: "🚫", title: "No more Schengen stress", body: "The 90-in-180 rule? Gone. The countdown clock in my head? Silenced. Forever." },
  { emoji: "🇵🇭", title: "Keep your Philippine passport", body: "Filipinos don't have to renounce. One of the rare countries with this agreement. I get to be both." },
  { emoji: "🏥", title: "Full public services access", body: "Healthcare, education, social security , as a citizen, not a visitor, not a guest." },
  { emoji: "🗳️", title: "The right to vote", body: "After years of navigating systems I had no say in , I'll finally have a voice in the country I call home." },
  { emoji: "♾️", title: "No more renewals", body: "No 3-year DNV renewal. No 5-year long-term residency renewal. Just , done. A permanent status." },
];

const requirements = [
  {
    icon: Clock,
    color: "#8fa38d",
    bg: "#d4e0d3",
    title: "2 years of legal residency",
    body: "For Filipinos specifically. The standard is 10 years... we get 2. That's the deal. DNV counts from day one of legal residence.",
    tag: "🇵🇭 Filipino advantage",
  },
  {
    icon: BookOpen,
    color: "#e3a99c",
    bg: "#f2d6c9",
    title: "DELE A2 (language) + CCSE (civics)",
    body: "Two exams administered by Instituto Cervantes. Both required for Filipinos. Results take ,90 days so register early.",
    tag: "Both exams required",
  },
  {
    icon: CheckCircle2,
    color: "#7a8f90",
    bg: "#e0eaeb",
    title: "Clean criminal record",
    body: "No convictions in Spain, the Philippines, or any country you've lived in for the last 5 years. NBI clearance apostilled + translated.",
    tag: "Both countries",
  },
  {
    icon: Globe,
    color: "#bbcccd",
    bg: "#e7f0f1",
    title: "Proof of continuous residency",
    body: "You cannot be outside Spain for more than 3 consecutive months during your 2-year window. Historical empadronamiento required.",
    tag: "No long gaps",
  },
  {
    icon: Star,
    color: "#e3a99c",
    bg: "#f2d6c9",
    title: "Swear loyalty to Spain",
    body: "After approval you have 180 days to take the oath before the Civil Registry, a notary, or a Spanish consulate. Miss it , you lose it.",
    tag: "180-day window",
  },
];

const docs = [
  { cat: "Identity", items: ["Valid Philippine passport", "Spanish residence card (TIE)", "2 recent passport photos"] },
  { cat: "Residency proof", items: ["Historical empadronamiento (from your municipality)", "All residence permits / renewal records", "Proof of continuous residence (no 3+ month gaps)"] },
  { cat: "Criminal records", items: ["NBI clearance ~apostilled + sworn Spanish translation", "Spanish criminal record certificate (Certificado de Antecedentes Penales)", "Criminal records from any country lived in last 5 years"] },
  { cat: "Civil documents", items: ["Birth certificate ~apostilled + sworn Spanish translation", "If married: marriage certificate (apostilled + translated)"] },
  { cat: "Exam certificates", items: ["DELE A2 certificate (or higher)", "CCSE certificate"] },
  { cat: "Financial", items: ["Proof of income / tax returns (Spain)", "Application fee receipt , paid at bank or online"] },
];

const a2plan = [
  { month: "Mar–Apr 2026", task: "Start structured lessons , italki + language exchange", done: false, emoji: "📱" },
  { month: "May–Jun 2026", task: "Work through DELE A2 prep book (Preparación al DELE A2)", done: false, emoji: "📖" },
  { month: "Jul 2026", task: "Register for DELE A2 exam (results take 90 days!)", done: false, emoji: "✍️" },
  { month: "Aug–Sep 2026", task: "Intensive speaking practice , think in Spanish, journal in Spanish", done: false, emoji: "🗣️" },
  { month: "Oct 2026", task: "Exam month , give it everything", done: false, emoji: "🎯" },
  { month: "Dec 2026", task: "Results in + certificate in hand , goal complete", done: false, emoji: "🏆" },
];

export default function RoadToSpanishCitizenshipPage() {
  return (
    <main className="min-h-screen bg-[#f9f5f2] text-[#3a3a3a]">
      <Header />

      {/* ── HERO ── */}
      <section className="pt-36 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8fa38d]/10 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#e3a99c]/10 rounded-full blur-[80px]" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4e0d3]/50 border border-[#8fa38d]/30 mb-6">
            <Trophy className="w-3.5 h-3.5 text-[#8fa38d]" />
            <span className="text-xs font-bold tracking-widest text-[#8fa38d] uppercase">The Endgame</span>
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
            My Road to<br />
            <span className="font-script text-[#8fa38d] text-6xl md:text-7xl lg:text-8xl relative inline-block transform -rotate-1">
              Spanish Citizenship
            </span>
          </h1>

          <p className="font-[family-name:var(--font-body)] text-xl text-[#6b6b6b] leading-relaxed max-w-2xl mb-4">
            I didn&apos;t move to Spain to visit. I moved to stay. And eventually... to belong.
            This is my public commitment to finishing what I started: EU citizenship, Philippine passport intact,
            no lawyer, no nonsense.
          </p>
          <p className="font-[family-name:var(--font-body)] text-base text-[#aaaaaa] max-w-2xl mb-10">
            DNV approved Jan 8, 2026 · Updated as I go · Accountability is the whole point.
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-10 text-sm text-[#aaaaaa]">
            {["🇵🇭 Filipino", "🇪🇸 Based in Spain", "📅 DNV approved 2026", "🏆 Citizenship target: 2028"].map(t => (
              <span key={t} className="px-4 py-1.5 bg-white border border-[#e7ddd3] rounded-full font-medium text-[#3a3a3a] text-xs">{t}</span>
            ))}
          </div>

          {/* TOC */}
          <div className="flex flex-wrap gap-2">
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`}
                className="px-3 py-1.5 rounded-full bg-white border border-[#e7ddd3] text-xs font-medium text-[#6b6b6b] hover:border-[#8fa38d] hover:text-[#8fa38d] transition-all">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── COUNTDOWNS ── */}
      <section className="bg-white border-y border-[#e7ddd3] py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#3a3a3a] mb-2">
              The clocks are running. 🕐
            </h2>
            <p className="text-sm text-[#aaaaaa]">Both of these are live. Watching me. No pressure.</p>
          </div>
          <CitizenshipCountdown />
        </div>
      </section>

      {/* ── MAIN CONTENT LAYOUT ── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[1fr_300px] gap-14">
          <div className="space-y-20 min-w-0">

            {/* ── THE PLOT TWIST ── */}
            <section id="plot-twist">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/40 border border-[#f2d6c9] mb-5">
                <Zap className="w-3.5 h-3.5 text-[#e3a99c]" />
                <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">The Plot Twist</span>
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3a3a3a] mb-6 leading-tight">
                Everyone said 10 years.<br />
                <span className="text-[#8fa38d]">It&apos;s actually 2. 🤯</span>
              </h2>

              <div className="prose-custom space-y-5 text-[#6b6b6b] leading-relaxed text-[17px]">
                <p>
                  When I first started researching Spanish citizenship, every article led with the same headline:
                  <strong className="text-[#3a3a3a]"> 10 years of residency.</strong> Ten. I&apos;d do the math in my head,
                  feel vaguely defeated, and close the tab. Classic.
                </p>
                <p>
                  Then I found the footnote that changed everything. Spain has a bilateral agreement with a
                  handful of countries , Ibero-American nations, Portugal, Andorra, Equatorial Guinea, and
                  yes, <strong className="text-[#3a3a3a]">the Philippines</strong> , that reduces the residency requirement to
                  <strong className="text-[#3a3a3a]"> just 2 years.</strong>
                </p>
                <p>
                  Two years. Not ten. The same Spain, the same passport, the same citizenship. Just with
                  an eight-year head start because of where I was born.
                </p>
                <p>
                  That footnote rewrote my entire timeline. I stopped thinking about citizenship as a
                  distant dream and started treating it as a two-year project with a deadline.
                </p>
              </div>

              {/* Callout */}
              <div className="mt-8 bg-[#d4e0d3]/40 border border-[#8fa38d]/30 rounded-3xl p-6 flex gap-4 items-start">
                <span className="text-3xl flex-shrink-0">🇵🇭</span>
                <div>
                  <p className="font-bold text-[#3a3a3a] mb-1">Filipino-specific residency requirement</p>
                  <p className="text-sm text-[#6b6b6b] leading-relaxed">
                    The Philippines is one of a handful of countries where Spain reduces the standard
                    10-year residency to <strong>2 years</strong> , and allows <strong>dual citizenship</strong> (no renunciation required).
                    This is written into Spanish law under the bilateral nationality agreement.
                    The DNV counts toward residency from day one.
                  </p>
                </div>
              </div>
            </section>

            {/* ── WHAT IT MEANS ── */}
            <section id="what-it-means">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4e0d3]/40 border border-[#d4e0d3] mb-5">
                <Globe className="w-3.5 h-3.5 text-[#8fa38d]" />
                <span className="text-xs font-bold tracking-widest text-[#8fa38d] uppercase">What It Actually Means</span>
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3a3a3a] mb-4 leading-tight">
                An EU passport with a Philippine soul.
              </h2>
              <p className="text-[#6b6b6b] leading-relaxed mb-8 text-[17px]">
                I want to be clear about what I&apos;m working toward, because it&apos;s not just a document.
                It&apos;s the end of asking permission to exist in spaces I&apos;ve already earned.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {citizenshipPerks.map((p) => (
                  <div key={p.title} className="bg-white border border-[#e7ddd3] rounded-2xl p-5 hover:shadow-md hover:border-[#8fa38d]/40 transition-all">
                    <div className="text-2xl mb-3">{p.emoji}</div>
                    <h3 className="font-bold text-[#3a3a3a] mb-1.5">{p.title}</h3>
                    <p className="text-sm text-[#6b6b6b] leading-relaxed">{p.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── TWO EXAMS ── */}
            <section id="two-exams">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/40 border border-[#f2d6c9] mb-5">
                <BookOpen className="w-3.5 h-3.5 text-[#e3a99c]" />
                <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">The Two Exams</span>
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3a3a3a] mb-4 leading-tight">
                Two tests stand between me<br />and a Spanish passport.
              </h2>
              <p className="text-[#6b6b6b] leading-relaxed mb-8 text-[17px]">
                Before you can file for citizenship, you need to pass two exams from the Instituto Cervantes.
                Both. No skipping. Let&apos;s talk about them honestly.
              </p>

              <div className="space-y-5">
                {examFacts.map((e) => (
                  <div key={e.exam} className="bg-white border border-[#e7ddd3] rounded-3xl overflow-hidden">
                    <div className="p-6 border-b border-[#f0ebe6]" style={{ backgroundColor: e.bg + "60" }}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-3xl mb-2">{e.emoji}</p>
                          <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold" style={{ color: e.color }}>{e.exam}</h3>
                          <p className="text-xs text-[#aaaaaa] mt-0.5">{e.full}</p>
                        </div>
                        <span className="text-xs font-bold px-3 py-1 rounded-full border" style={{ color: e.color, borderColor: e.color + "30", backgroundColor: e.color + "10" }}>
                          {e.cost}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 grid sm:grid-cols-2 gap-4">
                      {[
                        { label: "Administered by", val: e.by },
                        { label: "Format", val: e.format },
                        { label: "Passing threshold", val: e.pass },
                        { label: "Results timeline", val: e.results },
                      ].map(({ label, val }) => (
                        <div key={label}>
                          <p className="text-[10px] font-bold tracking-widest uppercase text-[#aaaaaa] mb-0.5">{label}</p>
                          <p className="text-sm text-[#3a3a3a] font-medium">{val}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-6 pb-5">
                      <div className="bg-[#f9f5f2] rounded-2xl px-4 py-3 text-sm text-[#6b6b6b] italic">
                        💬 {e.note}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-800 text-sm mb-1">DELE A2 results take ~90 days</p>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    You cannot submit your citizenship application until you have the certificates in hand.
                    Register early. Build a 3-month buffer into your timeline. This is the one thing people
                    consistently underestimate.
                  </p>
                </div>
              </div>
            </section>

            {/* ── A2 CHALLENGE ── */}
            <section id="a2-challenge">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/40 border border-[#f2d6c9] mb-5">
                <Heart className="w-3.5 h-3.5 text-[#e3a99c]" />
                <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">My A2 Challenge</span>
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3a3a3a] mb-4 leading-tight">
                I&apos;m learning Spanish on the internet.<br />
                <span className="text-[#e3a99c]">Publicly. With a deadline.</span>
              </h2>

              <div className="space-y-5 text-[#6b6b6b] leading-relaxed text-[17px] mb-8">
                <p>
                  Okay. I&apos;m Filipino. I grew up speaking Tagalog and English.
                  Spanish is technically related to Tagalog (loanwords, history, colonisation , you know how it goes),
                  but <em>knowing</em> Spanish? That&apos;s a different thing. My Spanish right now is approximately:
                  <strong className="text-[#3a3a3a]"> café con leche, por favor</strong> and a very enthusiastic
                  <strong className="text-[#3a3a3a]"> ¡Gracias!</strong>
                </p>
                <p>
                  I need DELE A2 by the end of 2026. That gives me under 10 months.
                  The exam itself is basic ~conversational Spanish for daily situations,
                  but A2 is not nothing. I have to read, write, listen, and speak.
                  And I have to do it all in a language I&apos;m still learning while also building a business.
                </p>
                <p>
                  So I&apos;m being public about it. If I say it here, I have to do it.
                  Here&apos;s my plan:
                </p>
              </div>

              {/* A2 plan timeline */}
              <div className="relative space-y-4 pl-6 border-l-2 border-[#e7ddd3]">
                {a2plan.map((step, i) => (
                  <div key={i} className="relative flex gap-4 items-start">
                    <span className="absolute -left-[26px] w-5 h-5 rounded-full bg-white border-2 border-[#e3a99c] flex items-center justify-center text-[10px] flex-shrink-0">
                      {step.done ? "✓" : i + 1}
                    </span>
                    <div className={`flex-1 bg-white border rounded-2xl p-4 ${step.done ? "border-[#8fa38d]/40 bg-[#d4e0d3]/10" : "border-[#e7ddd3]"}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[10px] font-bold tracking-widest uppercase text-[#aaaaaa] mb-1">{step.month}</p>
                          <p className="text-sm font-medium text-[#3a3a3a]">{step.emoji} {step.task}</p>
                        </div>
                        {step.done && <CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-[#f2d6c9]/30 border border-[#f2d6c9] rounded-2xl p-5">
                <p className="text-sm text-[#6b6b6b] leading-relaxed">
                  <strong className="text-[#3a3a3a]">I&apos;ll update this section</strong> as I go through the plan.
                  Wins, fails, what I&apos;m using, how many times I said something embarrassing at the mercado.
                  All of it. If you&apos;re learning too, follow along , or better yet, hold me to it.
                </p>
              </div>
            </section>

            {/* ── FULL REQUIREMENTS ── */}
            <section id="requirements">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4e0d3]/40 border border-[#d4e0d3] mb-5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8fa38d]" />
                <span className="text-xs font-bold tracking-widest text-[#8fa38d] uppercase">Full Requirements</span>
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3a3a3a] mb-4 leading-tight">
                What you actually need<br />to qualify.
              </h2>
              <p className="text-[#6b6b6b] leading-relaxed mb-8 text-[17px]">
                These are the requirements for Filipinos applying through the 2-year residency route.
                Different routes (marriage, birth, etc.) have different rules , but this is my path.
              </p>

              <div className="space-y-4">
                {requirements.map((r) => {
                  const Icon = r.icon;
                  return (
                    <div key={r.title} className="bg-white border border-[#e7ddd3] rounded-2xl p-5 flex gap-4 items-start hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: r.bg }}>
                        <Icon className="w-5 h-5" style={{ color: r.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                          <h3 className="font-bold text-[#3a3a3a]">{r.title}</h3>
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ color: r.color, backgroundColor: r.color + "15" }}>
                            {r.tag}
                          </span>
                        </div>
                        <p className="text-sm text-[#6b6b6b] leading-relaxed">{r.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── DOCUMENTS ── */}
            <section id="documents">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/40 border border-[#f2d6c9] mb-5">
                <FileText className="w-3.5 h-3.5 text-[#e3a99c]" />
                <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">Document Checklist</span>
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3a3a3a] mb-4 leading-tight">
                The paper trail.<br />Start collecting now.
              </h2>
              <p className="text-[#6b6b6b] leading-relaxed mb-8 text-[17px]">
                Spanish bureaucracy is not known for being fast. Some of these documents , especially the
                NBI clearance, apostilles, and sworn translations ~take weeks. Start before you think you need to.
              </p>

              <div className="grid sm:grid-cols-2 gap-5">
                {docs.map((group) => (
                  <div key={group.cat} className="bg-white border border-[#e7ddd3] rounded-2xl p-5">
                    <p className="text-xs font-bold tracking-widest uppercase text-[#aaaaaa] mb-3">{group.cat}</p>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-[#3a3a3a]">
                          <div className="w-4 h-4 rounded border-2 border-[#e7ddd3] flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-[#3a3a3a] rounded-2xl p-5 flex gap-3 items-start">
                <span className="text-2xl flex-shrink-0">💡</span>
                <div>
                  <p className="font-bold text-white text-sm mb-1">The sworn translation thing is real</p>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Every foreign document needs an official (jurado) translator recognised by the Spanish
                    Ministry of Foreign Affairs. NBI clearance, birth certificate, anything from the Philippines.
                    Budget €60–€150 per document. Start early. They&apos;re not fast either.
                  </p>
                </div>
              </div>
            </section>

            {/* ── MY ROADMAP ── */}
            <section id="roadmap">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4e0d3]/40 border border-[#d4e0d3] mb-5">
                <Star className="w-3.5 h-3.5 text-[#8fa38d]" />
                <span className="text-xs font-bold tracking-widest text-[#8fa38d] uppercase">My Roadmap</span>
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3a3a3a] mb-4 leading-tight">
                From "10 Schengen days left"<br />to EU citizen. The plan.
              </h2>

              <div className="relative space-y-0">
                {[
                  { year: "Jan 8, 2026", event: "DNV approved 🎉", status: "done", body: "Legal residency in Spain starts now. The 2-year clock is officially ticking from this exact date.", color: "#8fa38d" },
                  { year: "Mar–Dec 2026", event: "Study Spanish. Pass DELE A2.", status: "active", body: "My public commitment. A2 by December 31, 2026. Also registering for CCSE exam , it's easier and I want it out of the way.", color: "#e3a99c" },
                  { year: "2027", event: "CCSE exam + document prep", status: "upcoming", body: "Get the CCSE certificate. Start collecting NBI clearances, apostilles, sworn translations. These take time. Don't wait.", color: "#bbcccd" },
                  { year: "Jan 8, 2028", event: "File citizenship application 📬", status: "upcoming", body: "Exactly 2 years from DNV approval , the earliest I can file. Submit online via Sede Electrónica del Ministerio de Justicia. The processing clock starts here.", color: "#bbcccd" },
                  { year: "Apr 2028 minimum", event: "Processing period ⏳", status: "upcoming", body: "Minimum 3 months to process. Realistically 6–18 months depending on backlog. Online applications are faster. This is the waiting game , and I will not be calm.", color: "#bbcccd" },
                  { year: "Late 2028 / Early 2029", event: "Oath. Spanish passport. Done. 🇪🇸", status: "upcoming", body: "Swear loyalty to the King and the Constitution within 180 days of approval. Collect the passport. Don't cry (I will cry).", color: "#e3a99c" },
                ].map((step, i) => (
                  <div key={i} className="flex gap-5 pb-8 relative">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full border-4 border-white shadow-md flex items-center justify-center z-10 ${step.status === "done" ? "bg-[#8fa38d]" :
                        step.status === "active" ? "bg-[#e3a99c] animate-pulse" :
                          "bg-[#e7ddd3]"
                        }`}>
                        <span className="text-white text-xs font-bold">{i + 1}</span>
                      </div>
                      {i < 5 && <div className="w-0.5 bg-[#e7ddd3] flex-1 mt-1" />}
                    </div>
                    <div className={`flex-1 bg-white border rounded-2xl p-5 mb-2 ${step.status === "active" ? "border-[#e3a99c]/40 shadow-md" :
                      step.status === "done" ? "border-[#8fa38d]/30" :
                        "border-[#e7ddd3]"
                      }`}>
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-[#3a3a3a]">{step.event}</h3>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ color: step.color, backgroundColor: step.color + "15" }}>
                          {step.year}
                        </span>
                      </div>
                      <p className="text-sm text-[#6b6b6b] leading-relaxed">{step.body}</p>
                      {step.status === "active" && (
                        <div className="mt-2 flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#e3a99c] animate-pulse" />
                          <span className="text-[10px] font-bold text-[#e3a99c] uppercase tracking-wider">In progress</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* ── SIDEBAR ── */}
          <aside className="lg:sticky lg:top-24 lg:self-start space-y-5">

            {/* Quick facts */}
            <div className="bg-[#3a3a3a] rounded-3xl p-5">
              <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Filipino Citizenship Fast Facts</p>
              <div className="space-y-3">
                {[
                  { label: "Residency required", val: "2 years" },
                  { label: "Renunciation required", val: "No ✅" },
                  { label: "Language exam", val: "DELE A2+" },
                  { label: "Civics exam", val: "CCSE (25 Qs)" },
                  { label: "Processing time", val: "6–18 months" },
                  { label: "Application fee", val: "~€104" },
                  { label: "DELE cost", val: "€108–€220" },
                  { label: "CCSE cost", val: "€85" },
                ].map(f => (
                  <div key={f.label} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                    <span className="text-white/50">{f.label}</span>
                    <span className="font-bold text-white">{f.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-[#f2d6c9]/40 border border-[#f2d6c9] rounded-3xl p-5">
              <p className="font-bold text-[#3a3a3a] mb-2 text-sm">Start your own journey</p>
              <p className="text-xs text-[#6b6b6b] leading-relaxed mb-4">
                Before citizenship comes the DNV. Check if you qualify ~ free, 2 minutes.
              </p>
              <Link href="/assessment"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full bg-[#e3a99c] text-[#3a3a3a] font-bold text-sm hover:bg-[#3a3a3a] hover:text-white transition-all group">
                Check Eligibility
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

          </aside>
        </div>
      </div>

      {/* ── CLOSING SECTION ── */}
      <section className="bg-[#3a3a3a] py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8fa38d]/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#e3a99c]/10 rounded-full blur-[80px]" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-5xl mb-6">🏆</p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            This is why I built<br />
            <span className="font-script text-[#8fa38d] text-5xl md:text-6xl relative inline-block transform -rotate-1 mt-2">
              Happy Voyager.
            </span>
          </h2>
          <p className="font-[family-name:var(--font-body)] text-lg text-white/60 mb-4 max-w-xl mx-auto leading-relaxed">
            I didn&apos;t just want to travel. I wanted to build a life , deliberately, legally, and without
            needing a powerful passport to do it.
          </p>
          <p className="font-[family-name:var(--font-body)] text-lg text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
            The DNV was step one. Citizenship is the finish line. If you&apos;re at step zero,
            let me help you get to step one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/assessment"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#e3a99c] text-[#3a3a3a] font-bold hover:bg-white transition-all duration-300 group">
              Check If You Qualify (Free)
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/how-to-apply-spain-digital-nomad-visa"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/20 text-white font-bold hover:border-white hover:bg-white/10 transition-all duration-300">
              How I Applied for the DNV
            </Link>
          </div>
        </div>
      </section>

      {/* ── SHARE STRIP ── */}
      <div className="border-t border-[#e7ddd3] py-5 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <p className="text-sm text-[#aaaaaa]">Know someone dreaming of EU citizenship? Send this their way.</p>
          <ShareButton title="My Road to Spanish Citizenship , A Filipino's 2-Year Plan for an EU Passport" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
