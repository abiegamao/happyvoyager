import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Globe, MapPin, Plane, Calendar, CheckCircle2, Heart, Zap } from "lucide-react";
import Link from "next/link";

const stats = [
  { value: "27+", label: "Countries visited", sub: "with a Philippine passport", color: "#e3a99c", bg: "#f2d6c9" },
  { value: "€0", label: "Lawyer fees", sub: "self-navigated the whole process", color: "#8fa38d", bg: "#d4e0d3" },
  { value: "2026", label: "Visa approved", sub: "Spain Digital Nomad Visa", color: "#7a8f90", bg: "#e0eaeb" },
  { value: "3yr", label: "EU Residency", sub: "path to citizenship unlocked", color: "#e3a99c", bg: "#f2d6c9" },
];

const timeline = [
  {
    period: "The Beginning",
    title: "A passport that felt like a cage",
    body: "Growing up in Davao, I watched people on YouTube travel the world like it was nothing. For us, every border crossing meant months of paperwork, embassy appointments, rejection risks, and fees. I had skills. I had income. But I couldn't move freely.",
    icon: MapPin,
    color: "#e3a99c",
    align: "left",
  },
  {
    period: "The Shift",
    title: "Going remote changed everything",
    body: "I started working remotely as a systems engineer. For the first time, my income wasn't tied to a location. I started travelling, Southeast Asia, the Middle East, Latin America. I learned how visas worked, what embassies looked for, and how to package myself on paper.",
    icon: Globe,
    color: "#8fa38d",
    align: "right",
  },
  {
    period: "The Discovery",
    title: "Spain's Digital Nomad Visa",
    body: "I found out Spain launched a Digital Nomad Visa under the Startup Law. A legal way to live in Europe, work remotely, and eventually apply for residency. Lawyers were quoting €2,000–€3,500. I didn't have that, and honestly, I didn't want to pay someone to do something I could learn myself.",
    icon: Zap,
    color: "#bbcccd",
    align: "left",
  },
  {
    period: "The System",
    title: "I mapped every step",
    body: "I spent months studying Spanish immigration law, reading UGE documentation, connecting with other applicants, and testing every requirement against my profile. I built templates, tracked every document, understood the apostille process, and prepared a cover letter that directly addressed every eligibility criterion.",
    icon: Calendar,
    color: "#7a8f90",
    align: "right",
  },
  {
    period: "2026",
    title: "Approved. 🇪🇸",
    body: "Visa approved. No lawyer. No agency. Just a well-built system and a clear understanding of the process. I landed in Spain and immediately started thinking: how many people are stuck exactly where I was two years ago?",
    icon: CheckCircle2,
    color: "#e3a99c",
    align: "left",
  },
  {
    period: "Now",
    title: "Happy Voyager was born",
    body: "I packaged everything I learned into the Spain DNV Playbook, the system I wish existed when I started. Not a generic guide. My actual process, my actual documents, my actual timeline. Now I help Filipinos and remote workers around the world do what I did, faster and with far less stress.",
    icon: Heart,
    color: "#8fa38d",
    align: "right",
  },
];

export default function MyStoryPage() {
  return (
    <main className="min-h-screen bg-[#f9f5f2] text-[#3a3a3a]">
      <Header />

      {/* ── HERO ── */}
      <section className="pt-36 pb-0 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            {/* Left: Text */}
            <div className="pb-12 lg:pb-24">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/40 border border-[#f2d6c9] mb-6">
                <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
                  Origin Story
                </span>
              </div>

              <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-8">
                From Davao<br />
                to{" "}
                <span className="font-script text-[#e3a99c] text-6xl md:text-7xl lg:text-8xl relative inline-block transform -rotate-2">
                  Madrid 🇪🇸
                </span>
              </h1>

              <p className="font-[family-name:var(--font-body)] text-xl text-[#6b6b6b] leading-relaxed max-w-lg mb-8">
                I turned a passport that felt like a cage into a boarding pass to Europe.
                No lawyer. No agency. Just a system I built myself, and now I&apos;m giving it to you.
              </p>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-[#f2d6c9] flex-shrink-0">
                  <img src="/assets/story_abie.jpg" alt="Abie Maxey" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-[#3a3a3a]">Abie Maxey</p>
                  <p className="text-sm text-[#6b6b6b]">Nomad. Systems thinker. Based in Spain 🇪🇸</p>
                </div>
              </div>
            </div>

            {/* Right: Photo */}
            <div className="relative h-[420px] lg:h-[560px] rounded-t-[3rem] overflow-hidden">
              <img
                src="/assets/story_abie.jpg"
                alt="Abie in Spain"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#f9f5f2]/60 to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-8 left-8 bg-white rounded-2xl px-5 py-3 shadow-xl border border-[#e7ddd3]">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-[#aaaaaa] font-bold uppercase tracking-wide">Status</p>
                    <p className="text-sm font-bold text-[#3a3a3a]">DNV Approved, 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-white border-y border-[#e7ddd3] py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3 mx-auto"
                style={{ backgroundColor: stat.bg }}
              >
                <span className="font-bold text-base" style={{ color: stat.color }}>✦</span>
              </div>
              <div className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#3a3a3a] mb-0.5">
                {stat.value}
              </div>
              <div className="font-bold text-sm text-[#3a3a3a]">{stat.label}</div>
              <div className="text-xs text-[#aaaaaa] mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── OPENING QUOTE ── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3a3a3a] leading-tight mb-6">
            &ldquo;Freedom wasn&apos;t about having a better passport.
            It was about{" "}
            <span className="text-[#e3a99c]">building a better system.</span>&rdquo;
          </blockquote>
          <p className="font-[family-name:var(--font-body)] text-[#6b6b6b]">— Abie Maxey</p>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-4 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section label */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#bbcccd]/20 border border-[#bbcccd] mb-4">
              <span className="text-xs font-bold tracking-widest text-[#7a8f90] uppercase">The Journey</span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a]">
              How I got here
            </h2>
          </div>

          {/* Timeline items */}
          <div className="relative">
            {/* Center line (desktop) */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[#e7ddd3]" />

            <div className="flex flex-col gap-12 md:gap-16">
              {timeline.map((item, i) => {
                const Icon = item.icon;
                const isLeft = item.align === "left";
                return (
                  <div key={i} className={`relative grid md:grid-cols-2 gap-6 md:gap-16 items-center ${!isLeft ? "md:[direction:rtl]" : ""}`}>
                    {/* Content card */}
                    <div className={`md:[direction:ltr] bg-white rounded-[2rem] p-7 border border-[#e7ddd3] shadow-sm hover:shadow-md transition-shadow duration-300 ${!isLeft ? "md:text-right" : ""}`}>
                      <span
                        className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
                        style={{ color: item.color, backgroundColor: item.color + "15" }}
                      >
                        {item.period}
                      </span>
                      <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#3a3a3a] mb-3">
                        {item.title}
                      </h3>
                      <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] leading-relaxed">
                        {item.body}
                      </p>
                    </div>

                    {/* Icon node (desktop) */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-white shadow-md items-center justify-center z-10"
                      style={{ backgroundColor: item.color + "20" }}>
                      <Icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>

                    {/* Empty column for layout */}
                    <div className="hidden md:block" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── LIFE NOW ── */}
      <section className="bg-white border-y border-[#e7ddd3] py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-[2.5rem] overflow-hidden h-[380px] lg:h-[480px] shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1543785734-4b6e564642f8?auto=format&fit=crop&w=900&q=80"
              alt="Life in Spain"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4e0d3]/40 border border-[#d4e0d3] mb-6">
              <span className="text-xs font-bold tracking-widest text-[#8fa38d] uppercase">Life Now</span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-[#3a3a3a] mb-6 leading-tight">
              Based in Spain.<br />Building in public.
            </h2>
            <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] leading-relaxed mb-4">
              I work from my laptop ~ cafés, co-working spaces, a terrace with a view.
              I have access to 26 Schengen countries. My residency is secure. My tax
              situation is handled. Life is genuinely good.
            </p>
            <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] leading-relaxed mb-8">
              And the thing I care most about right now? Making sure other Filipinos
              know this is possible, without paying €3,000 to a lawyer who doesn&apos;t
              speak your language and doesn&apos;t know your situation.
            </p>
            <div className="flex flex-wrap gap-3">
              {["🏙️ Living in Spain", "🌍 27+ countries visited", "💻 Fully remote", "🇵🇭 Filipino, proud of it"].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full bg-[#f9f5f2] border border-[#e7ddd3] text-sm font-medium text-[#3a3a3a]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY I HELP ── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/40 border border-[#f2d6c9] mb-6">
            <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">The Mission</span>
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-8 leading-tight">
            Why I built Happy Voyager
          </h2>
          <div className="space-y-5 text-left">
            {[
              "My struggle wasn't unique. Thousands of talented Filipinos are held back not by their skills, but by their borders.",
              "The information exists, but it's scattered across Reddit threads, outdated blog posts, and Facebook groups full of conflicting advice.",
              "I built the system I wish I had. One clear, tested, step-by-step process with real templates, real links, and real context from someone who lived it.",
              "Happy Voyager isn't a law firm. It's a playbook business, systems for global freedom, built by someone who engineered their own way out.",
            ].map((para, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f2d6c9] flex items-center justify-center mt-1">
                  <span className="text-[#e3a99c] text-xs font-bold">{i + 1}</span>
                </div>
                <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] leading-relaxed">{para}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#3a3a3a] py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e3a99c]/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#bbcccd]/10 rounded-full blur-[80px]" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to write<br />
            <span className="font-script text-[#f2d6c9] text-5xl md:text-6xl relative inline-block transform -rotate-1 mt-2">
              your own story?
            </span>
          </h2>
          <p className="font-[family-name:var(--font-body)] text-lg text-white/60 mb-10 max-w-xl mx-auto">
            Whether you start with the playbook or book a strategy call, the first step is just making the decision to try.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#e3a99c] text-[#3a3a3a] font-bold hover:bg-white transition-all duration-300 group"
            >
              See the Packages
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="https://calendly.com/abie-gamao/spain-dnv"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/20 text-white font-bold hover:border-white hover:bg-white/10 transition-all duration-300"
            >
              Book a Strategy Call
            </Link>
          </div>
          <p className="mt-8 text-white/30 text-sm">
            Or start free →{" "}
            <Link href="/#free-playbook" className="text-white/50 underline underline-offset-2 hover:text-white/70 transition-colors">
              Get the free playbook
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
