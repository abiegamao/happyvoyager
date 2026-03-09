import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertCircle, BookOpen, MapPin } from "lucide-react";

export const metadata = {
  title: "How to Register on the Padrón in Spain: The 2026 Guide ~ Happy Voyager",
  description:
    "What Spain's Padrón is, why every resident must register, documents you need, how to book your ayuntamiento appointment, and what you can do once you have your empadronamiento certificate.",
};

const useCases = [
  { icon: "🪪", title: "TIE appointment", desc: "Required in most provinces before you can book your fingerprint appointment at the police station." },
  { icon: "🏥", title: "Healthcare registration", desc: "Your Padrón certificate is required to register with your local Centro de Salud and get your Tarjeta Sanitaria." },
  { icon: "🏫", title: "School enrollment", desc: "Children must be registered at the address nearest to the school they want to attend." },
  { icon: "🏦", title: "Bank accounts", desc: "Some Spanish banks require a Padrón certificate when opening an account as a foreign resident." },
  { icon: "📋", title: "DNV renewal", desc: "UGE requires a Padrón certificate (less than 3 months old) as part of your annual DNV renewal application." },
  { icon: "🗳️", title: "Local services & benefits", desc: "Access to some municipal services, library cards, discounted gym memberships, and local subsidy programs." },
];

const documents = [
  {
    doc: "Passport or NIE/TIE",
    detail: "Original and photocopy. If you have your TIE, bring that instead of your passport as it confirms your NIE.",
  },
  {
    doc: "Rental contract",
    detail: "Must be for at least 6 months at your current address. Short-term tourist contracts are often rejected.",
  },
  {
    doc: "Proof of rent payment",
    detail: "A recent bank transfer receipt or receipt from your landlord showing you're actively paying rent.",
  },
  {
    doc: "Utility bill (sometimes)",
    detail: "Electricity, gas or water bill in the property's name ~ some ayuntamientos ask for this as additional proof.",
  },
  {
    doc: "Completed application form",
    detail: "Hoja de inscripción en el Padrón Municipal ~ available at the ayuntamiento or often downloadable from your city's website.",
  },
];

const cities = [
  { city: "Barcelona", method: "Online (bcn.cat) or in-person at OAC offices ~ same day", wait: "Same day" },
  { city: "Madrid", method: "Online (madrid.es) or by appointment at Oficinas de Atención Ciudadana", wait: "1-3 weeks" },
  { city: "Valencia", method: "In-person at Oficina de Padrón ~ no prior appointment usually needed", wait: "Same day" },
  { city: "Seville", method: "In-person at Servicio de Estadística offices", wait: "1-2 weeks" },
  { city: "Málaga", method: "In-person at OAC ~ appointment via telefónica or online", wait: "1-2 weeks" },
  { city: "Alicante", method: "In-person at Junta de Distrito offices", wait: "1-3 days" },
];

export default function PadronGuidePage() {
  return (
    <div className="min-h-screen bg-[#f9f5f2] text-[#3a3a3a] font-sans">
      <Header darkBg />

      {/* Hero */}
      <div className="bg-[#3a3a3a] text-white pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="text-[10px] font-bold tracking-widest uppercase bg-[#d4e0d3]/20 text-[#8fa38d] border border-[#8fa38d]/30 px-3 py-1.5 rounded-full">
              🏠 Settling In Spain
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase bg-white/10 text-white/60 px-3 py-1.5 rounded-full">
              Updated 2026
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-heading)] text-[2.4rem] lg:text-[3rem] font-bold mb-4 leading-tight">
            How to Register on the<br />Padrón in Spain
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-2xl">
            The Padrón is Spain&apos;s municipal census register ~ and it&apos;s the single most important document for new arrivals. Without it, you can&apos;t get your TIE, healthcare, or enroll your children in school.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { value: "Free", label: "Cost to register" },
              { value: "Same day", label: "Fastest processing" },
              { value: "6", label: "Things it unlocks" },
              { value: "3 months", label: "Freshness for TIE" },
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

        {/* What is it */}
        <div className="bg-white border border-[#e7ddd3] rounded-3xl p-7 mb-10">
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#3a3a3a] mb-4">
            What is the Padrón Municipal?
          </h2>
          <p className="text-[#6b6b6b] text-sm leading-relaxed mb-4">
            The <strong className="text-[#3a3a3a]">Padrón Municipal de Habitantes</strong> is Spain&apos;s official municipal register. Every person who lives in a Spanish municipality ~ Spanish citizen or foreign national ~ is legally required to register at their local ayuntamiento (town hall).
          </p>
          <p className="text-[#6b6b6b] text-sm leading-relaxed mb-4">
            Registering doesn&apos;t give you residency rights. It doesn&apos;t replace your TIE. What it does is create an official record that you live at a specific address in a specific municipality ~ and that record unlocks almost everything else in the Spanish administrative system.
          </p>
          <div className="bg-[#f5ecd7] border border-[#c9a84c]/30 rounded-2xl p-4 mt-2">
            <p className="text-xs text-[#6b6b6b] leading-relaxed">
              <strong className="text-[#3a3a3a]">The empadronamiento certificate</strong> is the document you&apos;ll use in appointments. It&apos;s a printed extract from the Padrón that proves you&apos;re registered at your address. Most institutions require one that&apos;s less than 3 months old ~ so you&apos;ll need to renew it regularly.
            </p>
          </div>
        </div>

        {/* Why it matters */}
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#3a3a3a] mb-5">
          6 things the Padrón unlocks
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {useCases.map((uc) => (
            <div key={uc.title} className="bg-white border border-[#e7ddd3] rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">{uc.icon}</span>
                <h3 className="font-semibold text-sm text-[#3a3a3a]">{uc.title}</h3>
              </div>
              <p className="text-xs text-[#6b6b6b] leading-relaxed">{uc.desc}</p>
            </div>
          ))}
        </div>

        {/* How to register */}
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#3a3a3a] mb-5">
          How to register: step by step
        </h2>
        <div className="space-y-4 mb-10">
          {[
            {
              step: "1",
              title: "Find your local ayuntamiento",
              body: "You must register at the town hall for the municipality where you actually live ~ not where you work or where you'd prefer to be registered. Use the Spanish government's online search tool or simply Google '[your city] ayuntamiento padrón appointment'.",
              accent: "#c47c5a",
              bg: "#f5e6dc",
            },
            {
              step: "2",
              title: "Book an appointment (or check walk-in availability)",
              body: "Many ayuntamientos in smaller towns and cities accept walk-ins during office hours. Barcelona, Madrid, and Valencia all have online appointment systems. Some cities (Valencia, for example) allow same-day registration without an appointment during certain hours.",
              accent: "#e3a99c",
              bg: "#f2d6c9",
            },
            {
              step: "3",
              title: "Gather your documents",
              body: "You'll need your passport or NIE/TIE, your rental contract, and proof you're paying rent. Some offices also ask for a utility bill in the property's name. Bring originals and photocopies of everything.",
              accent: "#8fa38d",
              bg: "#d4e0d3",
            },
            {
              step: "4",
              title: "Complete the registration form",
              body: "The Hoja de inscripción en el Padrón Municipal is a short form. You can download it from your city's website or collect it at the ayuntamiento. Fill in your name, address, nationality, NIE, and date of birth.",
              accent: "#6b8cba",
              bg: "#dde8f5",
            },
            {
              step: "5",
              title: "Collect your empadronamiento certificate",
              body: "Some offices issue the certificate on the spot. Others post it or ask you to collect it a few days later. Once you have it, make several copies ~ you'll use it repeatedly over the coming months.",
              accent: "#c9a84c",
              bg: "#f5ecd7",
            },
          ].map((step) => (
            <div key={step.step} className="bg-white border border-[#e7ddd3] rounded-2xl overflow-hidden">
              <div className="px-6 pt-5 pb-3" style={{ backgroundColor: step.bg }}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold" style={{ color: step.accent }}>0{step.step}</span>
                  <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-[#3a3a3a]">{step.title}</h3>
                </div>
              </div>
              <div className="px-6 py-4">
                <p className="text-sm text-[#6b6b6b] leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Documents */}
        <div className="bg-white border border-[#e7ddd3] rounded-3xl p-7 mb-10">
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#3a3a3a] mb-5">
            Documents checklist
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
        </div>

        {/* City guide */}
        <div className="bg-white border border-[#e7ddd3] rounded-3xl overflow-hidden mb-10">
          <div className="px-6 py-5 border-b border-[#e7ddd3] flex items-center gap-3">
            <MapPin className="w-4 h-4 text-[#8fa38d]" />
            <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a]">
              Processing times by city
            </h2>
          </div>
          <div className="divide-y divide-[#f5f0eb]">
            {cities.map((c) => (
              <div key={c.city} className="px-6 py-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#3a3a3a]">{c.city}</p>
                  <p className="text-xs text-[#6b6b6b] mt-0.5">{c.method}</p>
                </div>
                <span className="text-[10px] font-bold text-[#8fa38d] bg-[#d4e0d3] px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                  {c.wait}
                </span>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 bg-[#f9f5f2] border-t border-[#e7ddd3]">
            <p className="text-xs text-[#aaaaaa]">Times are estimates based on 2026 experience. Always check your city&apos;s current wait times ~ they vary seasonally.</p>
          </div>
        </div>

        {/* Common mistakes */}
        <div className="bg-[#f2d6c9]/40 border border-[#e3a99c]/30 rounded-3xl p-6 mb-10">
          <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-[#3a3a3a] mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#e3a99c]" />
            Common mistakes to avoid
          </h3>
          <ul className="space-y-2.5">
            {[
              "Registering at a friend&apos;s address you don&apos;t actually live at ~ this can invalidate your TIE application",
              "Using a short-term Airbnb as your registered address ~ most ayuntamientos won&apos;t accept it",
              "Forgetting to update your Padrón when you move to a new address",
              "Showing up with a certificate older than 3 months for a TIE or renewal appointment",
              "Not making copies of your certificate ~ you&apos;ll need it many more times than you expect",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-xs text-[#6b6b6b]">
                <span className="w-1 h-1 rounded-full bg-[#e3a99c] flex-shrink-0 mt-1.5" />
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
        </div>

        {/* Playbook CTA */}
        <div className="bg-[#3a3a3a] rounded-3xl p-8 text-center">
          <BookOpen className="w-8 h-8 text-[#c47c5a] mx-auto mb-4" />
          <p className="text-[10px] font-bold tracking-widest uppercase text-[#c47c5a] mb-2">
            The full playbook
          </p>
          <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-white mb-3">
            The Soft Landing Playbook
          </h3>
          <p className="text-white/50 text-sm max-w-md mx-auto mb-6 leading-relaxed">
            Everything after the visa stamp ~ 30 lessons on NIE, TIE, Padrón, banking, healthcare, housing, and your first year in Spain. Join the early access waitlist.
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
              href="/nie-and-tie-guide"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-white/20 text-white/70 font-medium hover:text-white hover:border-white/40 transition-colors text-sm"
            >
              NIE & TIE Guide
            </Link>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
