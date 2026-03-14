"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  FileText,
  CreditCard,
  Landmark,
  Check,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Clock,
  Shield,
  Star,
  MessageCircle,
  MessageSquare,
  Users,
  Sparkles,
  CalendarCheck,
  MapPin,
} from "lucide-react";

// ─── Service Tiers ──────────────────────────────────────────────────────────

const tiers = [
  {
    id: "nie-tie",
    icon: FileText,
    title: "NIE / TIE Appointments",
    subtitle: "Police station & Extranjería",
    description:
      "A bilingual companion accompanies you to your NIE or TIE appointment at the police station or immigration office. They'll translate everything in real-time and make sure nothing gets lost.",
    price: "99",
    currency: "€",
    paymentLink: "https://buy.stripe.com/test_NIE_TIE_COMPANION_PLACEHOLDER",
    color: "#e3a99c",
    colorLight: "#f2d6c9",
    popular: true,
    includes: [
      "Meet you at the appointment location",
      "Real-time Spanish ↔ English translation",
      "Help you understand officer instructions",
      "Ensure your documents are presented correctly",
      "Post-appointment debrief & next steps",
    ],
  },
  {
    id: "bank",
    icon: CreditCard,
    title: "Bank Account Opening",
    subtitle: "CaixaBank, Sabadell, BBVA & more",
    description:
      "Opening a Spanish bank account involves paperwork, questions about your tax situation, and product upsells. Your companion makes sure you understand every word and only sign what you need.",
    price: "89",
    currency: "€",
    paymentLink: "https://buy.stripe.com/test_BANK_COMPANION_PLACEHOLDER",
    color: "#bbcccd",
    colorLight: "#e0eaeb",
    popular: false,
    includes: [
      "Meet you at the bank branch",
      "Translate all banker questions & paperwork",
      "Help you avoid unnecessary products",
      "Ensure correct account type is opened",
      "Clarify fees, cards & online banking setup",
    ],
  },
  {
    id: "padron",
    icon: Landmark,
    title: "Padrón / Town Hall",
    subtitle: "Empadronamiento & census registration",
    description:
      "The padrón is your proof of address in Spain. Town hall staff rarely speak English, and the forms are entirely in Spanish. Your companion handles the conversation so you walk out registered.",
    price: "79",
    currency: "€",
    paymentLink: "https://buy.stripe.com/test_PADRON_COMPANION_PLACEHOLDER",
    color: "#8fa38d",
    colorLight: "#d4e0d3",
    popular: false,
    includes: [
      "Meet you at your local Ayuntamiento",
      "Translate all staff interactions",
      "Help fill out the empadronamiento form",
      "Ensure your documents are accepted",
      "Collect your certificado de empadronamiento",
    ],
  },
];

// ─── Process Steps ──────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    icon: CreditCard,
    title: "Pick Your Appointment & Pay",
    description:
      "Choose the appointment type you need help with and complete payment. Simple, transparent pricing ~ no surprises.",
    color: "#e3a99c",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Message Us on WhatsApp",
    description:
      "After payment, you'll be redirected to WhatsApp. Share your appointment date, time, and location ~ we'll match you with a companion in Madrid.",
    color: "#bbcccd",
  },
  {
    number: "03",
    icon: Users,
    title: "Meet Your Companion",
    description:
      "Your companion meets you at the appointment location. They're a native Spanish speaker who knows the process inside out.",
    color: "#f2d6c9",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Walk Out Sorted",
    description:
      "Your companion translates everything in real-time, ensures nothing is missed, and debriefs you on next steps afterward.",
    color: "#8fa38d",
  },
];

// ─── FAQ Data ───────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "What cities do you cover?",
    a: "We're currently available in Madrid. We're expanding to Barcelona, Valencia, and other major cities soon ~ reach out if you're elsewhere and we'll let you know when we launch in your area.",
  },
  {
    q: "How far in advance should I book?",
    a: "Ideally 3–5 business days before your appointment. Same-day bookings may be available depending on companion availability in your city ~ reach out and we'll do our best.",
  },
  {
    q: "What if my appointment gets rescheduled?",
    a: "No problem. Let us know the new date and we'll reassign a companion at no extra charge. If you need to cancel entirely, we offer a full refund if you notify us at least 48 hours before.",
  },
  {
    q: "Can I book for multiple appointments?",
    a: "Absolutely. If you have a NIE appointment in the morning and a bank appointment in the afternoon, you can book both separately. We'll try to assign the same companion for continuity.",
  },
  {
    q: "What if I need help beyond what happens at the appointment?",
    a: "Your companion is there for the appointment itself. For ongoing support like document preparation, form filling, or full concierge service, check out our VIP Concierge package on the main pricing page.",
  },
  {
    q: "Do your companions have any qualifications?",
    a: "All our companions are native or near-native Spanish speakers who live in Spain and have personal experience navigating the bureaucracy. Many have helped dozens of expats through the exact same appointments.",
  },
];

// ─── Component ──────────────────────────────────────────────────────────────

export default function TranslationCompanionPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#f9f5f2] overflow-hidden">
      <Header />

      {/* ── Hero Section ───────────────────────────────────────────────── */}
      <section className="pt-36 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f2d6c9]/25 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#bbcccd]/20 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-[#6b6b6b] mb-8">
            <Link href="/" className="hover:text-[#e3a99c] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/#pricing" className="hover:text-[#e3a99c] transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#3a3a3a] font-medium">Translation Companion</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#e7ddd3] mb-8 shadow-sm">
            <Users className="w-4 h-4 text-[#e3a99c]" />
            <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
              In-Person Support
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold text-[#3a3a3a] leading-tight mb-6">
            Your Spanish-Speaking{" "}
            <span className="font-script text-[#e3a99c] text-6xl md:text-7xl lg:text-8xl relative inline-block transform -rotate-2">
              Companion
            </span>
          </h1>

          <p className="font-[family-name:var(--font-body)] text-lg md:text-xl text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed mb-10">
            Don't stress about the language barrier ~ hire a bilingual companion
            to accompany you to your appointment and translate everything in real-time.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#6b6b6b]">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#8fa38d]" />
              <span>Bilingual natives</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[#e7ddd3] hidden sm:block" />
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#e3a99c]" />
              <span>All major appointments</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[#e7ddd3] hidden sm:block" />
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#e3a99c]" />
              <span>Same-day available</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service Cards ───────────────────────────────────────────────── */}
      <section id="services" className="section-padding bg-white relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#e7ddd3] to-transparent" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/30 border border-[#f2d6c9] mb-6">
              <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
                Choose Your Appointment Type
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-4">
              Where do you need a{" "}
              <span className="font-script text-[#e3a99c] text-5xl md:text-6xl relative inline-block transform -rotate-2">
                companion?
              </span>
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] max-w-xl mx-auto">
              Each tier is tailored to the specific appointment type. Your companion knows exactly what to expect.
            </p>
          </div>

          {/* Cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.id}
                  className={`relative rounded-[2.5rem] p-8 flex flex-col transition-all duration-500 ${
                    tier.popular
                      ? "bg-white shadow-2xl border-2 border-[#e3a99c] scale-[1.02]"
                      : "bg-[#f9f5f2] border border-[#e7ddd3] hover:bg-white hover:shadow-xl hover:-translate-y-2"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                      <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#3a3a3a] text-white text-xs font-bold shadow-lg">
                        <Star className="w-3.5 h-3.5 fill-[#e3a99c] text-[#e3a99c]" />
                        <span>Most Requested</span>
                      </div>
                    </div>
                  )}

                  {/* Icon + Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0"
                      style={{ backgroundColor: tier.colorLight }}
                    >
                      <Icon className="w-7 h-7" style={{ color: tier.color }} />
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#3a3a3a]">
                        {tier.title}
                      </p>
                      <p className="text-xs text-[#6b6b6b] font-medium">
                        {tier.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  {/* Divider */}
                  <div className="border-t border-[#e7ddd3] my-4" />

                  {/* What's included */}
                  <div className="mb-8 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b] mb-3">
                      What&apos;s included
                    </p>
                    <ul className="space-y-3">
                      {tier.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-[#3a3a3a]">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: tier.colorLight }}
                          >
                            <Check className="w-3 h-3" style={{ color: tier.color }} />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price + CTA */}
                  <div className="border-t border-[#e7ddd3] pt-6">
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-lg text-[#6b6b6b] font-medium">
                        {tier.currency}
                      </span>
                      <span className="font-[family-name:var(--font-heading)] text-5xl font-bold text-[#3a3a3a]">
                        {tier.price}
                      </span>
                      <span className="text-sm text-[#6b6b6b] ml-1">per appointment</span>
                    </div>
                    <a
                      href={tier.paymentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl font-[family-name:var(--font-body)] font-bold text-sm transition-all duration-300 ${
                        tier.popular
                          ? "bg-[#3a3a3a] text-white hover:bg-[#e3a99c]"
                          : "bg-white text-[#3a3a3a] border-2 border-[#e7ddd3] hover:border-[#3a3a3a] hover:bg-[#3a3a3a] hover:text-white"
                      }`}
                    >
                      Book a Companion
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <p className="flex items-center justify-center gap-1.5 text-xs text-[#6b6b6b] mt-3">
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      You'll coordinate via WhatsApp after payment
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Cross-sell Banner ───────────────────────────────────────────── */}
      <section className="py-8 px-6 bg-[#f2d6c9]/40">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <CalendarCheck className="w-6 h-6 text-[#e3a99c] flex-shrink-0" />
          <p className="font-[family-name:var(--font-body)] text-[#3a3a3a] text-sm">
            Need us to <strong>book the appointment</strong> for you too? We handle NIE, TIE & Regreso slots.
          </p>
          <Link
            href="/appointments"
            className="flex items-center gap-1 text-sm font-bold text-[#e3a99c] hover:text-[#3a3a3a] transition-colors whitespace-nowrap"
          >
            View Appointment Packages
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-[#f9f5f2] relative overflow-hidden">
        <div className="absolute top-[20%] left-[5%] w-72 h-72 bg-[#f2d6c9]/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[5%] w-72 h-72 bg-[#bbcccd]/15 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#bbcccd]/20 border border-[#bbcccd] mb-6">
              <span className="text-xs font-bold tracking-widest text-[#7a8f90] uppercase">
                How It Works
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-4">
              From booking to{" "}
              <span className="font-script text-[#e3a99c] text-5xl md:text-6xl relative inline-block transform -rotate-2">
                sorted
              </span>{" "}
              in 4 steps
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] max-w-xl mx-auto">
              We make it effortless. Here's what happens after you book.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-[#e7ddd3]" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="relative group text-center lg:text-left pt-8 lg:pt-0">
                    <div
                      className="absolute top-0 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-white shadow-sm z-20"
                      style={{ backgroundColor: step.color }}
                    />
                    <div className="lg:hidden absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-[#e7ddd3] -z-10" />
                    <div className="p-8 rounded-[2rem] bg-white hover:bg-[#f9f5f2] border border-transparent hover:border-[#e7ddd3] transition-all duration-300 hover:shadow-xl group-hover:-translate-y-2">
                      <div
                        className="inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-5 shadow-sm"
                        style={{ backgroundColor: step.color + "22" }}
                      >
                        <Icon className="w-7 h-7" style={{ color: step.color }} />
                      </div>
                      <span
                        className="block font-[family-name:var(--font-heading)] text-4xl font-bold mb-2"
                        style={{ color: step.color + "55" }}
                      >
                        {step.number}
                      </span>
                      <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#3a3a3a] mb-3">
                        {step.title}
                      </h3>
                      <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────────────── */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#e7ddd3] to-transparent" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/30 border border-[#f2d6c9] mb-6">
                <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
                  Why Choose Us
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-6 leading-tight">
                The language barrier is{" "}
                <span className="font-script text-[#e3a99c] text-5xl md:text-6xl relative inline-block transform -rotate-2">
                  real.
                </span>
                <br />
                We bridge it for you.
              </h2>
              <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed mb-10 max-w-lg">
                Government offices, banks, and town halls in Spain rarely have English-speaking
                staff. One misunderstood question can mean a wasted trip. Our companions have
                been through it all ~ they know the process and the language.
              </p>

              <div className="grid gap-6">
                {[
                  {
                    icon: Users,
                    color: "#8fa38d",
                    title: "Native Spanish speakers",
                    desc: "Local residents who speak the language fluently and understand regional dialects.",
                  },
                  {
                    icon: Shield,
                    color: "#e3a99c",
                    title: "Familiar with the process",
                    desc: "They've accompanied dozens of expats through the same appointments. No learning curve.",
                  },
                  {
                    icon: MapPin,
                    color: "#bbcccd",
                    title: "Available in Madrid",
                    desc: "Currently serving Madrid ~ expanding to Barcelona, Valencia, and more soon.",
                  },
                  {
                    icon: Star,
                    color: "#e3a99c",
                    title: "Know your documents",
                    desc: "They'll double-check what you're bringing and flag anything missing before you walk in.",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="flex gap-5 group p-4 rounded-2xl hover:bg-[#f9f5f2] transition-colors duration-300"
                    >
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm bg-white transition-all duration-300 group-hover:scale-110"
                        style={{ border: `1.5px solid ${item.color}33` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: item.color }} />
                      </div>
                      <div>
                        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a] mb-1">
                          {item.title}
                        </h3>
                        <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right ~ Stats */}
            <div className="relative flex flex-col gap-6">
              {[
                {
                  value: "100%",
                  label: "In-person, face-to-face translation",
                  color: "#e3a99c",
                  bg: "#f2d6c9",
                },
                {
                  value: "Madrid",
                  label: "Currently serving ~ more cities soon",
                  color: "#7a8f90",
                  bg: "#e0eaeb",
                },
                {
                  value: "From €79",
                  label: "Per appointment ~ no hourly surprises",
                  color: "#8fa38d",
                  bg: "#d4e0d3",
                },
                {
                  value: "Same day",
                  label: "Bookings available where possible",
                  color: "#e3a99c",
                  bg: "#f2d6c9",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-6 p-6 rounded-2xl bg-[#f9f5f2] border border-[#e7ddd3] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-center"
                    style={{ backgroundColor: stat.bg }}
                  >
                    <span
                      className="font-[family-name:var(--font-heading)] text-lg font-bold"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </span>
                  </div>
                  <p className="font-[family-name:var(--font-body)] text-[#3a3a3a] font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="section-padding bg-[#f9f5f2]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#e7ddd3] mb-6">
              <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
                FAQ
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-4">
              Questions we always get
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#6b6b6b]">
              Still have questions? Reach out via the contact page.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border border-[#e7ddd3] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 p-6 text-left cursor-pointer"
                >
                  <span className="font-[family-name:var(--font-heading)] text-base font-bold text-[#3a3a3a] leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#e3a99c] flex-shrink-0 mt-0.5 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <div className="w-full h-px bg-[#e7ddd3] mb-4" />
                    <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed text-sm">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="section-padding bg-[#3a3a3a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e3a99c]/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#bbcccd]/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8">
            <Sparkles className="w-4 h-4 text-[#e3a99c]" />
            <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
              Don't go alone
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Don't face the{" "}
            <span className="font-script text-[#e3a99c] text-5xl md:text-6xl lg:text-7xl relative inline-block transform -rotate-1">
              oficina
            </span>{" "}
            alone.
          </h2>

          <p className="font-[family-name:var(--font-body)] text-[#e7ddd3] text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            A bilingual companion by your side means no miscommunication, no wasted trips, and no stress.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#services"
              className="flex items-center gap-3 px-10 py-5 rounded-full bg-[#e3a99c] text-white font-bold text-lg hover:bg-white hover:text-[#3a3a3a] transition-all duration-300 shadow-xl shadow-[#e3a99c]/20 transform hover:-translate-y-1"
            >
              Book a Companion
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              href="/appointments"
              className="flex items-center gap-2 px-8 py-5 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-300"
            >
              View Appointment Packages
            </Link>
          </div>

          <p className="mt-6 text-sm text-[#e7ddd3]/60">
            From €79 per appointment. No hourly surprises.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
