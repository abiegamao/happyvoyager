import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertCircle, BookOpen } from "lucide-react";

export const metadata = {
  title: "Opening a Bank Account in Spain as an Expat (2026 Guide) ~ Happy Voyager",
  description:
    "Which Spanish banks are actually foreigner-friendly, what documents you need, non-resident account options, Wise vs Revolut vs Spanish bank ~ and how to structure your money for life in Spain.",
};

const banks = [
  {
    name: "Sabadell",
    emoji: "🏦",
    verdict: "Most foreigner-friendly",
    pros: ["English-speaking staff in many branches", "Accepts non-residents with NIE", "Good app and online banking", "English online portal available"],
    cons: ["Monthly maintenance fee if balance falls below threshold", "Some branches not helpful ~ visit a larger branch"],
    best: "Best overall for new DNV arrivals",
    accent: "#6b8cba",
    bg: "#dde8f5",
  },
  {
    name: "BBVA",
    emoji: "🏛️",
    verdict: "Best mobile app",
    pros: ["Excellent BBVA app rated consistently highly", "No fees with minimum balance", "Wide ATM network", "Online account opening possible in some cases"],
    cons: ["English support hit-or-miss at branches", "Stricter on proof of income documentation"],
    best: "Best if you want great mobile banking",
    accent: "#8fa38d",
    bg: "#d4e0d3",
  },
  {
    name: "CaixaBank",
    emoji: "🔵",
    verdict: "Largest network",
    pros: ["Biggest branch and ATM network in Spain", "ImaginBank (digital arm) for younger clients", "Partnership with Correos ~ great rural access"],
    cons: ["Customer service quality varies significantly by branch", "High fees if you don't meet minimum balance requirements"],
    best: "Best for rural areas or if network size matters",
    accent: "#c9a84c",
    bg: "#f5ecd7",
  },
];

const digitalOptions = [
  {
    name: "Wise",
    type: "International Transfer",
    iban: "European IBAN",
    good: ["International transfers at real exchange rate", "Multi-currency account", "Works for many Spanish direct debits"],
    notGood: ["Not accepted by all Spanish utilities", "No physical branch if something goes wrong"],
    use: "Receiving foreign income + international transfers",
  },
  {
    name: "Revolut",
    type: "Neobank",
    iban: "Lithuanian IBAN",
    good: ["Excellent travel spending", "Metal plan includes decent insurance", "Crypto and stock trading"],
    notGood: ["Lithuanian IBAN rejected by some Spanish landlords and utilities", "Limited customer support"],
    use: "Day-to-day spending and travel",
  },
  {
    name: "Openbank",
    type: "Spanish Digital Bank",
    iban: "Spanish IBAN",
    good: ["Full Spanish IBAN ~ accepted everywhere", "Santander subsidiary with proper banking licence", "Good interest on savings accounts"],
    notGood: ["No branches ~ online only", "Stricter NIE requirements"],
    use: "Second Spanish account with no fees",
  },
];

const documents = [
  { doc: "Passport or TIE card", detail: "Original + photocopy. TIE is preferred once you have it." },
  { doc: "NIE number", detail: "On your visa approval letter ~ you don't need the physical TIE to open many accounts." },
  { doc: "Padrón certificate", detail: "Required by most banks ~ must be less than 3 months old." },
  { doc: "Proof of income", detail: "Three months of payslips, client contracts, or a company letter confirming your remote employment." },
  { doc: "Spanish address", detail: "Your rental contract matching your registered Padrón address." },
  { doc: "Spanish phone number", detail: "Required for SMS verification ~ get a SIM card first." },
];

export default function SpainBankAccountGuidePage() {
  return (
    <div className="min-h-screen bg-[#f9f5f2] text-[#3a3a3a] font-sans">
      <Header darkBg />

      {/* Hero */}
      <div className="bg-[#3a3a3a] text-white pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="text-[10px] font-bold tracking-widest uppercase bg-[#dde8f5]/20 text-[#6b8cba] border border-[#6b8cba]/30 px-3 py-1.5 rounded-full">
              🏦 Banking in Spain
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase bg-white/10 text-white/60 px-3 py-1.5 rounded-full">
              Updated 2026
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-heading)] text-[2.4rem] lg:text-[3rem] font-bold mb-4 leading-tight">
            Opening a Bank Account<br />in Spain as an Expat
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-2xl">
            You need a Spanish IBAN for utilities, rent, and life in Spain. But banks make it harder than it should be. Here&apos;s which ones actually work for foreigners, what to bring, and how to structure your finances.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { value: "3", label: "Banks compared" },
              { value: "NIE required", label: "Minimum document" },
              { value: "~1 week", label: "Card delivery time" },
              { value: "€0", label: "Best monthly fee possible" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-white/40 uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-14">

        {/* Why you need a Spanish IBAN */}
        <div className="bg-white border border-[#e7ddd3] rounded-3xl p-7 mb-10">
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#3a3a3a] mb-4">
            Why Wise and Revolut aren&apos;t enough
          </h2>
          <p className="text-[#6b6b6b] text-sm leading-relaxed mb-4">
            Wise gives you a European IBAN and Revolut gives you a Lithuanian IBAN ~ both useful for international transfers and daily spending. But for life in Spain, you&apos;ll run into walls:
          </p>
          <ul className="space-y-2 mb-4">
            {[
              "Spanish utility companies (electricity, gas) often reject non-Spanish IBANs for direct debits",
              "Landlords frequently require a Spanish bank account for standing order payments",
              "The Hacienda (tax authority) prefers Spanish IBANs for refunds",
              "Some government agencies only accept payments from Spanish-registered bank accounts",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-xs text-[#6b6b6b]">
                <span className="w-1 h-1 rounded-full bg-[#e3a99c] flex-shrink-0 mt-1.5" />
                {item}
              </li>
            ))}
          </ul>
          <div className="bg-[#dde8f5] border border-[#6b8cba]/20 rounded-2xl p-4">
            <p className="text-xs text-[#6b6b6b] leading-relaxed">
              <strong className="text-[#3a3a3a]">The recommended setup:</strong> A Spanish bank for direct debits and official payments + Wise for international income + Revolut for travel spending. Three accounts, each doing what it does best.
            </p>
          </div>
        </div>

        {/* Bank comparison */}
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#3a3a3a] mb-5">
          Spanish banks compared
        </h2>
        <div className="space-y-4 mb-12">
          {banks.map((bank) => (
            <div key={bank.name} className="bg-white border border-[#e7ddd3] rounded-3xl overflow-hidden">
              <div className="px-6 pt-5 pb-4 flex items-start justify-between gap-4" style={{ backgroundColor: bank.bg }}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{bank.emoji}</span>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a]">{bank.name}</h3>
                  </div>
                  <p className="text-xs font-semibold" style={{ color: bank.accent }}>{bank.verdict}</p>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white flex-shrink-0" style={{ backgroundColor: bank.accent }}>
                  {bank.best}
                </span>
              </div>
              <div className="px-6 py-5 grid sm:grid-cols-2 gap-5">
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#8fa38d] mb-2">Pros</p>
                  <ul className="space-y-1.5">
                    {bank.pros.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-xs text-[#6b6b6b]">
                        <CheckCircle2 className="w-3 h-3 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#e3a99c] mb-2">Cons</p>
                  <ul className="space-y-1.5">
                    {bank.cons.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-xs text-[#6b6b6b]">
                        <AlertCircle className="w-3 h-3 text-[#e3a99c] flex-shrink-0 mt-0.5" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Digital options */}
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#3a3a3a] mb-5">
          Digital alternatives: Wise, Revolut & Openbank
        </h2>
        <div className="space-y-4 mb-12">
          {digitalOptions.map((opt) => (
            <div key={opt.name} className="bg-white border border-[#e7ddd3] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-[#3a3a3a] text-sm">{opt.name}</h3>
                  <p className="text-[10px] text-[#aaaaaa] uppercase tracking-widest">{opt.type} · {opt.iban}</p>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest bg-[#f0ebe6] text-[#6b6b6b] px-2.5 py-1 rounded-full flex-shrink-0">
                  Best for: {opt.use}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#8fa38d] mb-1.5">Works well for</p>
                  <ul className="space-y-1">
                    {opt.good.map((g) => (
                      <li key={g} className="text-xs text-[#6b6b6b] flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#8fa38d] flex-shrink-0 mt-1.5" />{g}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#e3a99c] mb-1.5">Limitations</p>
                  <ul className="space-y-1">
                    {opt.notGood.map((n) => (
                      <li key={n} className="text-xs text-[#6b6b6b] flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#e3a99c] flex-shrink-0 mt-1.5" />{n}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Documents */}
        <div className="bg-white border border-[#e7ddd3] rounded-3xl p-7 mb-10">
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#3a3a3a] mb-5">
            Documents to bring to the bank
          </h2>
          <div className="space-y-3">
            {documents.map((item) => (
              <div key={item.doc} className="flex items-start gap-4 py-3 border-b border-[#f5f0eb] last:border-0">
                <CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#3a3a3a]">{item.doc}</p>
                  <p className="text-xs text-[#6b6b6b] mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#f5ecd7] border border-[#c9a84c]/30 rounded-2xl p-4 mt-4">
            <p className="text-xs text-[#6b6b6b] leading-relaxed">
              <strong className="text-[#3a3a3a]">Pro tip:</strong> Visit a branch in a larger city centre. Airport branches and tourist-area branches tend to be less experienced with foreign resident accounts. A Sabadell or BBVA branch in a business district will have handled this many times before.
            </p>
          </div>
        </div>

        {/* Non-resident account note */}
        <div className="bg-[#d4e0d3]/40 border border-[#8fa38d]/30 rounded-2xl p-5 mb-10">
          <h3 className="font-semibold text-sm text-[#3a3a3a] mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#8fa38d]" />
            What if I don&apos;t have my TIE or Padrón yet?
          </h3>
          <p className="text-xs text-[#6b6b6b] leading-relaxed">
            Some banks (Sabadell, N26) will open a non-resident account with just your passport and NIE number ~ useful for the first few weeks. You can upgrade to a resident account once you have your Padrón certificate. This gives you a Spanish IBAN immediately for urgent direct debits while you work through the bureaucratic sequence.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-[#3a3a3a] rounded-3xl p-8 text-center">
          <BookOpen className="w-8 h-8 text-[#c47c5a] mx-auto mb-4" />
          <p className="text-[10px] font-bold tracking-widest uppercase text-[#c47c5a] mb-2">
            Part of the Soft Landing Playbook
          </p>
          <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-white mb-3">
            Banking is just Phase 2 of 6
          </h3>
          <p className="text-white/50 text-sm max-w-md mx-auto mb-6 leading-relaxed">
            The Soft Landing Playbook covers everything ~ NIE/TIE, Padrón, banking, healthcare, housing, SIM cards, schools, and your year-one milestones. 30 lessons. Join the early access waitlist.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/playbook/soft-landing"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#c47c5a] text-white font-bold hover:bg-[#b36848] transition-colors text-sm"
            >
              Preview the Playbook
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/padron-guide"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-white/20 text-white/70 font-medium hover:text-white hover:border-white/40 transition-colors text-sm"
            >
              Padrón Guide →
            </Link>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
