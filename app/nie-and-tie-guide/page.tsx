import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertCircle, Clock, BookOpen } from "lucide-react";

export const metadata = {
  title: "NIE vs TIE in Spain: The Complete Guide for 2026 ~ Happy Voyager",
  description:
    "The difference between Spain's NIE number and TIE card explained clearly ~ how to book your fingerprint appointment, documents needed, Modelo 790-012, and what to expect at the police station.",
};

const steps = [
  {
    number: "01",
    title: "Your visa approval letter already contains your NIE",
    body: "When UGE approves your Digital Nomad Visa application, the approval document includes a provisional NIE number. You don't need to apply for a separate NIE ~ it comes with the visa. What you don't have yet is the physical TIE card.",
    accent: "#e3a99c",
    bg: "#f2d6c9",
  },
  {
    number: "02",
    title: "Register your Padrón before booking the TIE appointment",
    body: "Most provinces (except Madrid and Barcelona) require a Padrón certificate before you can book a TIE fingerprint appointment. Go to your local ayuntamiento (town hall) with your passport, visa, and rental contract. The certificate is usually issued the same day.",
    accent: "#8fa38d",
    bg: "#d4e0d3",
  },
  {
    number: "03",
    title: "Pay the Modelo 790-012 fee at any bank branch",
    body: "Before your appointment, you need to pay a fee of €16.08 (2026 rate for initial TIE). Download the Modelo 790-012 form from the National Police website, complete it, print it, and take it to any Spanish bank branch or Correos. Keep the stamped receipt ~ you'll need it at the appointment.",
    accent: "#6b8cba",
    bg: "#dde8f5",
  },
  {
    number: "04",
    title: "Book your cita previa at the Oficina de Extranjería",
    body: "Go to sede.policia.gob.es and search for 'Toma de Huellas (Expedición de Tarjeta)' under the police station closest to your registered address. Appointments are released unpredictably and vanish in minutes. Use appointment alert tools or check at midnight and 8am ~ these are the most common release windows.",
    accent: "#c9a84c",
    bg: "#f5ecd7",
  },
  {
    number: "05",
    title: "Attend the fingerprint appointment with all documents",
    body: "Bring your passport (original + photocopy of all pages), visa approval letter, Padrón certificate (less than 3 months old), Modelo 790-012 receipt, two passport-sized photos (35x45mm, white background), and completed EX-17 form. The appointment takes about 15 minutes. Your TIE card will be ready in 30-40 days.",
    accent: "#c47c5a",
    bg: "#f5e6dc",
  },
  {
    number: "06",
    title: "Return to collect your TIE card",
    body: "No notification system exists ~ you'll need to check back or call the office after 30 days. Some provinces allow you to check online via the police portal. When you collect it, bring your passport and appointment receipt. Once you have it, the TIE is your primary ID in Spain.",
    accent: "#7a8f90",
    bg: "#e0eaeb",
  },
];

const doList = [
  "Bring originals AND photocopies of every document",
  "Get your Padrón certificate first (required in most provinces)",
  "Pay the Modelo 790-012 fee before your appointment ~ not on the day",
  "Use appointment alert tools if availability is low in your city",
  "Arrive 10 minutes early and have all documents pre-organised",
  "Keep your TIE safe ~ losing it means starting the process again",
];

const dontList = [
  "Don't book an appointment in a province where you're not registered",
  "Don't use an address that doesn't match your Padrón",
  "Don't assume a text message means your TIE is ready",
  "Don't confuse your NIE number with having a TIE card",
  "Don't let your TIE expire ~ renewal must be started 60 days before",
];

export default function NieTieGuidePage() {
  return (
    <div className="min-h-screen bg-[#f9f5f2] text-[#3a3a3a] font-sans">
      <Header darkBg />

      {/* Hero */}
      <div className="bg-[#3a3a3a] text-white pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="text-[10px] font-bold tracking-widest uppercase bg-[#f2d6c9]/20 text-[#e3a99c] border border-[#e3a99c]/30 px-3 py-1.5 rounded-full">
              🪪 Identity Documents
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase bg-white/10 text-white/60 px-3 py-1.5 rounded-full">
              Updated 2026
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-heading)] text-[2.4rem] lg:text-[3rem] font-bold mb-4 leading-tight">
            NIE vs TIE in Spain:<br />The Complete 2026 Guide
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-2xl">
            Your NIE number and TIE card are two different things ~ and confusing them is the most common mistake new arrivals make. Here&apos;s the full sequence, step by step.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { value: "6", label: "Steps" },
              { value: "~30 days", label: "TIE processing time" },
              { value: "€16.08", label: "2026 fee" },
              { value: "15 min", label: "Appointment length" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-white/40 uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-14">

        {/* NIE vs TIE explainer */}
        <div className="bg-white border border-[#e7ddd3] rounded-3xl p-7 mb-10">
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#3a3a3a] mb-4">
            NIE vs TIE ~ the one-paragraph explanation
          </h2>
          <p className="text-[#6b6b6b] text-sm leading-relaxed mb-4">
            Your <strong className="text-[#3a3a3a]">NIE (Número de Identificación de Extranjero)</strong> is just a number ~ like a foreigner&apos;s tax ID. It&apos;s printed on your visa approval letter and stays with you permanently. You use it to open a bank account, sign a rental contract, and pay taxes.
          </p>
          <p className="text-[#6b6b6b] text-sm leading-relaxed mb-4">
            Your <strong className="text-[#3a3a3a]">TIE (Tarjeta de Identidad de Extranjero)</strong> is the physical card that proves your legal residency status in Spain. It contains your NIE, your photo, your fingerprints, and your visa category. You need it to renew your visa, travel freely within the Schengen area as a resident, and for many official processes.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-5">
            <div className="bg-[#f2d6c9]/40 rounded-2xl p-4">
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#e3a99c] mb-2">NIE Number</p>
              <ul className="space-y-1.5 text-xs text-[#6b6b6b]">
                {["On your visa letter already", "Used for contracts & taxes", "Never expires", "No card ~ just a number"].map(i => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#e3a99c] flex-shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#dde8f5]/40 rounded-2xl p-4">
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#6b8cba] mb-2">TIE Card</p>
              <ul className="space-y-1.5 text-xs text-[#6b6b6b]">
                {["Physical plastic card", "Proves your residency", "Expires with your visa", "Fingerprints required"].map(i => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#6b8cba] flex-shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Steps */}
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#3a3a3a] mb-6">
          The 6-step TIE process
        </h2>
        <div className="space-y-4 mb-12">
          {steps.map((step) => (
            <div key={step.number} className="bg-white border border-[#e7ddd3] rounded-2xl overflow-hidden">
              <div className="px-6 pt-5 pb-3" style={{ backgroundColor: step.bg }}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold" style={{ color: step.accent }}>{step.number}</span>
                  <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-[#3a3a3a]">
                    {step.title}
                  </h3>
                </div>
              </div>
              <div className="px-6 py-4">
                <p className="text-sm text-[#6b6b6b] leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Do/Don't */}
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          <div className="bg-[#d4e0d3]/40 border border-[#8fa38d]/30 rounded-3xl p-6">
            <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-[#3a3a3a] mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#8fa38d]" />
              Do
            </h3>
            <ul className="space-y-2.5">
              {doList.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-xs text-[#6b6b6b]">
                  <span className="w-1 h-1 rounded-full bg-[#8fa38d] flex-shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#f2d6c9]/40 border border-[#e3a99c]/30 rounded-3xl p-6">
            <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-[#3a3a3a] mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#e3a99c]" />
              Don&apos;t
            </h3>
            <ul className="space-y-2.5">
              {dontList.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-xs text-[#6b6b6b]">
                  <span className="w-1 h-1 rounded-full bg-[#e3a99c] flex-shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Documents checklist */}
        <div className="bg-white border border-[#e7ddd3] rounded-3xl p-7 mb-10">
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#3a3a3a] mb-5">
            Complete documents checklist for TIE appointment
          </h2>
          <div className="space-y-3">
            {[
              { doc: "Passport", detail: "Original + photocopy of ALL pages including blank ones" },
              { doc: "Visa approval letter", detail: "From UGE (your NIE number is printed on this)" },
              { doc: "Padrón certificate", detail: "Certificado de empadronamiento ~ must be less than 3 months old" },
              { doc: "Modelo 790-012 receipt", detail: "The stamped bank receipt showing you&apos;ve paid the €16.08 fee" },
              { doc: "EX-17 form", detail: "Completed and signed ~ download from the Ministerio del Interior website" },
              { doc: "Passport photos", detail: "2 photos, 35x45mm, white background, recent" },
              { doc: "Proof of address", detail: "Rental contract (may be asked for in some provinces)" },
            ].map((item) => (
              <div key={item.doc} className="flex items-start gap-4 py-3 border-b border-[#f5f0eb] last:border-0">
                <CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#3a3a3a]">{item.doc}</p>
                  <p className="text-xs text-[#6b6b6b] mt-0.5" dangerouslySetInnerHTML={{ __html: item.detail }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timing callout */}
        <div className="bg-[#f5ecd7] border border-[#c9a84c]/30 rounded-2xl p-5 mb-10 flex items-start gap-4">
          <Clock className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-[#3a3a3a] mb-1">You have 30 days from arrival to start this process</p>
            <p className="text-xs text-[#6b6b6b] leading-relaxed">
              Technically, you should apply for your TIE within 30 days of entering Spain with your visa. In practice, appointment availability makes this difficult in some cities ~ but start the process immediately regardless. Keep a record of when you arrived and when you applied.
            </p>
          </div>
        </div>

        {/* Playbook CTA */}
        <div className="bg-[#3a3a3a] rounded-3xl p-8 text-center">
          <BookOpen className="w-8 h-8 text-[#c47c5a] mx-auto mb-4" />
          <p className="text-[10px] font-bold tracking-widest uppercase text-[#c47c5a] mb-2">
            Want the full picture?
          </p>
          <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-white mb-3">
            The Soft Landing Playbook
          </h3>
          <p className="text-white/50 text-sm max-w-md mx-auto mb-6 leading-relaxed">
            30 lessons covering everything after the visa stamp ~ NIE/TIE, Padrón, banking, healthcare, housing, and year one milestones. Join the early access waitlist.
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
              href="/playbook/spain-dnv"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-white/20 text-white/70 font-medium hover:text-white hover:border-white/40 transition-colors text-sm"
            >
              Spain DNV Playbook
            </Link>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
