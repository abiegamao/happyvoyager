import { ArrowRight, BadgeCheck, Banknote, Clock, Globe } from "lucide-react";

const facts = [
  {
    icon: Banknote,
    color: "#e3a99c",
    bg: "#f2d6c9",
    label: "Minimum income",
    value: "€2,894/mo",
    note: "~PHP 173K/mo from foreign clients",
  },
  {
    icon: BadgeCheck,
    color: "#8fa38d",
    bg: "#d4e0d3",
    label: "Who qualifies",
    value: "Remote workers",
    note: "Employed or freelancing for overseas clients",
  },
  {
    icon: Clock,
    color: "#7a8f90",
    bg: "#e0eaeb",
    label: "Visa duration",
    value: "1–5 years",
    note: "Renewable, path to permanent residency",
  },
  {
    icon: Globe,
    color: "#bbcccd",
    bg: "#e8f0f1",
    label: "Schengen access",
    value: "26 countries",
    note: "Travel freely across Europe as a resident",
  },
];

export default function DNVTeaser() {
  return (
    <section className="bg-white border-y border-[#e7ddd3] py-14 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2d6c9]/40 border border-[#f2d6c9] mb-3">
              <span className="text-[10px] font-bold tracking-widest text-[#e3a99c] uppercase">
                🇪🇸 Spain Digital Nomad Visa
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-[#3a3a3a] leading-tight">
              Is this visa right for you?
            </h2>
            <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] mt-1">
              Quick snapshot ~ full requirements, eligibility check, and FAQ on the next page.
            </p>
          </div>
          <a
            href="/digital-nomad-visa"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3a3a3a] text-white font-bold text-sm hover:bg-[#e3a99c] transition-all duration-300 whitespace-nowrap"
          >
            Read the Full Guide
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Facts grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {facts.map((fact, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#e7ddd3] p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 bg-[#f9f5f2]"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: fact.bg }}
              >
                <fact.icon className="w-4 h-4" style={{ color: fact.color }} />
              </div>
              <p className="font-[family-name:var(--font-body)] text-[10px] font-bold uppercase tracking-widest text-[#aaaaaa] mb-1">
                {fact.label}
              </p>
              <p className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a] mb-1">
                {fact.value}
              </p>
              <p className="font-[family-name:var(--font-body)] text-xs text-[#6b6b6b] leading-snug">
                {fact.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
