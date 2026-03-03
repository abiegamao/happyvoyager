"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  FileText,
  CreditCard,
  Plane,
  Check,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Clock,
  Shield,
  Star,
  MessageSquare,
  CalendarCheck,
  Sparkles,
  Info,
} from "lucide-react";

// ─── Service Data ────────────────────────────────────────────────────────────

const services = [
  {
    id: "nie",
    icon: FileText,
    acronym: "NIE",
    fullName: "Número de Identificación de Extranjero",
    tagline: "Your Spanish Tax ID ~the first thing you'll ever need",
    description:
      "The NIE is Spain's foreigners' identification number. You need it to buy property, open a bank account, sign a work contract, register a car, or do almost anything official in Spain.",
    price: "75",
    currency: "€",
    paymentLink: "https://buy.stripe.com/fZudR27QC9d0a3vcRPew800",
    color: "#e3a99c",
    colorLight: "#f2d6c9",
    popular: false,
    whoNeedsIt: [
      "Buying or renting long-term property",
      "Opening a Spanish bank account",
      "Signing an employment contract",
      "Registering a vehicle or business",
      "Any official transaction in Spain",
    ],
    includes: [
      "Full explanation of the NIE process",
      "Step-by-step form completion (EX-15 / EX-18)",
      "Appointment booking at your chosen consulate or police station",
      "Document checklist tailored to your situation",
      "Pre-appointment briefing so you know exactly what to expect",
      "Post-appointment follow-up support",
    ],
  },
  {
    id: "tie",
    icon: CreditCard,
    acronym: "TIE",
    fullName: "Tarjeta de Identidad de Extranjero",
    tagline: "Your physical residency card ~proof you live here legally",
    description:
      "The TIE is the biometric residency card issued to non-EU nationals once their visa or residency permit is approved. It's the document you'll carry everywhere as proof of your legal right to live and work in Spain.",
    price: "75",
    currency: "€",
    paymentLink: "https://buy.stripe.com/5kQ7sE4EqgFs7Vn197ew801",
    color: "#bbcccd",
    colorLight: "#e0eaeb",
    popular: true,
    whoNeedsIt: [
      "Non-EU nationals whose visa/residency was recently approved",
      "Digital Nomad Visa holders",
      "Non-lucrative visa holders",
      "Golden Visa holders",
      "Anyone renewing their residency card",
    ],
    includes: [
      "Review of your approval documents",
      "Fingerprinting appointment booking (EX-17 form)",
      "Tailored document checklist",
      "Guidance on fees (Tasa 790/012)",
      "Pre-appointment prep call",
      "Support until you have your card in hand",
    ],
  },
  {
    id: "regreso",
    icon: Plane,
    acronym: "Regreso",
    fullName: "Autorización de Regreso",
    tagline: "Need to travel while your residency is pending? This is your lifeline",
    description:
      "If your residency is being processed but you need to leave and re-enter Spain, the Regreso is a temporary travel permit that lets you do so legally ~without losing your place in the queue.",
    price: "75",
    currency: "€",
    paymentLink: "https://buy.stripe.com/28EbIU3Am88W8Zr6trew802",
    color: "#8fa38d",
    colorLight: "#d4e0d3",
    popular: false,
    whoNeedsIt: [
      "Applicants waiting on a visa or residency renewal",
      "People whose residency card has expired but renewal is in progress",
      "Anyone who needs to travel internationally while their status is pending",
    ],
    includes: [
      "Eligibility assessment for your situation",
      "Appointment booking at the Oficina de Extranjería",
      "Form preparation and review",
      "Document checklist specific to Regreso",
      "Guidance on validity and re-entry rules",
      "Email support through the process",
    ],
  },
];

// ─── Process Steps ────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Tell Us Your Situation",
    description:
      "Fill out a short intake form so we understand exactly where you are in the process and which appointment type you need.",
    color: "#e3a99c",
  },
  {
    number: "02",
    icon: FileText,
    title: "Document Preparation",
    description:
      "We send you a personalised checklist and help you fill out every required form ~correctly, the first time.",
    color: "#bbcccd",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Appointment Booked",
    description:
      "We navigate the notoriously hard-to-get appointment slots and book the earliest available one for you.",
    color: "#f2d6c9",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Walk in with Confidence",
    description:
      "We prep you on exactly what to bring, what to say, and what to expect. No surprises at the window.",
    color: "#8fa38d",
  },
];

// ─── FAQ Data ────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "How quickly can you get me an appointment?",
    a: "It depends on the city and current demand. Madrid and Barcelona slots fill up fastest. We typically secure an appointment within 1–3 weeks, though we always aim for sooner. We'll give you an honest estimate based on your location.",
  },
  {
    q: "Do I need to be physically in Spain?",
    a: "For NIE at a Spanish consulate abroad, no ~we'll coordinate remotely. For TIE and Regreso, yes, you need to attend in person at a Spanish police station or immigration office. We handle everything else.",
  },
  {
    q: "What if I don't speak Spanish?",
    a: "No problem. The forms will be completed in Spanish by us. We'll also brief you on the key phrases you might need and what to expect from the officer at the window.",
  },
  {
    q: "Is the €75 fee per person or per appointment?",
    a: "It's per person, per appointment type. If you need both a NIE and a TIE, those are two separate services (€75 each). Government fees (Tasa 790) are separate and paid directly to the Spanish government ~we'll tell you exactly how much and how to pay.",
  },
  {
    q: "What if my appointment gets cancelled or rescheduled?",
    a: "We'll handle the rebooking at no extra charge. Cancellations happen in Spain's system more than we'd like ~we monitor and respond quickly.",
  },
  {
    q: "Can you help with other Spanish bureaucracy beyond these three?",
    a: "Yes ~if you're on a full VIP Concierge plan with us, we handle everything end-to-end including DigiCert, empadronamiento, and more. Check our main pricing page for details.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AppointmentsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#f9f5f2] overflow-hidden">
      <Header />

      {/* ── Hero Section ───────────────────────────────────────────────── */}
      <section className="pt-36 pb-20 px-6 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f2d6c9]/25 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#bbcccd]/20 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-[#6b6b6b] mb-8">
            <Link href="/" className="hover:text-[#e3a99c] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#3a3a3a] font-medium">Appointments</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#e7ddd3] mb-8 shadow-sm">
            <CalendarCheck className="w-4 h-4 text-[#e3a99c]" />
            <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
              Spanish Bureaucracy, Handled
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold text-[#3a3a3a] leading-tight mb-6">
            NIE, TIE &{" "}
            <span className="font-script text-[#e3a99c] text-6xl md:text-7xl lg:text-8xl relative inline-block transform -rotate-2">
              Regreso
            </span>
            <br />
            <span className="text-4xl md:text-5xl lg:text-6xl">Appointments</span>
          </h1>

          <p className="font-[family-name:var(--font-body)] text-lg md:text-xl text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed mb-10">
            Spain's immigration system is a maze of impossible-to-book slots,
            confusing forms, and strict requirements. We handle the hard parts
            so you don't have to.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#6b6b6b]">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#8fa38d]" />
              <span>100% done-for-you</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[#e7ddd3] hidden sm:block" />
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#e3a99c]" />
              <span>Appointments within 1–3 weeks</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[#e7ddd3] hidden sm:block" />
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#e3a99c] fill-[#e3a99c]" />
              <span>€75 flat fee, no surprises</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service Cards ───────────────────────────────────────────────── */}
      <section id="services" className="section-padding bg-white relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#e7ddd3] to-transparent" />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/30 border border-[#f2d6c9] mb-6">
              <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
                Our Services
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-4">
              Which appointment do you need?
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] max-w-xl mx-auto">
              Each service is €75 flat. Read the "You need this if…" section on each card to find your match.
            </p>
          </div>

          {/* Cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className={`relative rounded-[2.5rem] p-8 flex flex-col transition-all duration-500 ${
                    service.popular
                      ? "bg-white shadow-2xl border-2 border-[#bbcccd] scale-[1.02]"
                      : "bg-[#f9f5f2] border border-[#e7ddd3] hover:bg-white hover:shadow-xl hover:-translate-y-2"
                  }`}
                >
                  {/* Popular badge */}
                  {service.popular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                      <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#3a3a3a] text-white text-xs font-bold shadow-lg">
                        <Star className="w-3.5 h-3.5 fill-[#bbcccd] text-[#bbcccd]" />
                        <span>Most Requested</span>
                      </div>
                    </div>
                  )}

                  {/* Icon + Acronym */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0"
                      style={{ backgroundColor: service.colorLight }}
                    >
                      <Icon
                        className="w-7 h-7"
                        style={{ color: service.color }}
                      />
                    </div>
                    <div>
                      <p
                        className="font-[family-name:var(--font-heading)] text-3xl font-bold"
                        style={{ color: service.color }}
                      >
                        {service.acronym}
                      </p>
                      <p className="text-xs text-[#6b6b6b] font-medium">
                        {service.fullName}
                      </p>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a] mb-3">
                    {service.tagline}
                  </p>

                  {/* Description */}
                  <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Who needs it */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Info className="w-4 h-4" style={{ color: service.color }} />
                      <p className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
                        You need this if…
                      </p>
                    </div>
                    <ul className="space-y-2">
                      {service.whoNeedsIt.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-[#6b6b6b]"
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{ backgroundColor: service.color }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-[#e7ddd3] my-6" />

                  {/* What's included */}
                  <div className="mb-8 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b] mb-3">
                      What&apos;s included
                    </p>
                    <ul className="space-y-3">
                      {service.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-[#3a3a3a]">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: service.colorLight }}
                          >
                            <Check
                              className="w-3 h-3"
                              style={{ color: service.color }}
                            />
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
                        {service.currency}
                      </span>
                      <span className="font-[family-name:var(--font-heading)] text-5xl font-bold text-[#3a3a3a]">
                        {service.price}
                      </span>
                      <span className="text-sm text-[#6b6b6b] ml-1">flat fee</span>
                    </div>
                    <a
                      href={service.paymentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-[family-name:var(--font-body)] font-bold text-sm transition-all duration-300"
                      style={
                        service.popular
                          ? {
                              backgroundColor: "#3a3a3a",
                              color: "white",
                            }
                          : {
                              backgroundColor: "white",
                              color: "#3a3a3a",
                              border: "2px solid #e7ddd3",
                            }
                      }
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.backgroundColor = service.color;
                        el.style.color = "white";
                        el.style.border = "2px solid transparent";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        if (service.popular) {
                          el.style.backgroundColor = "#3a3a3a";
                          el.style.color = "white";
                          el.style.border = "2px solid transparent";
                        } else {
                          el.style.backgroundColor = "white";
                          el.style.color = "#3a3a3a";
                          el.style.border = "2px solid #e7ddd3";
                        }
                      }}
                    >
                      Book {service.acronym} Appointment
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <p className="text-center text-xs text-[#6b6b6b] mt-3">
                      Government fees (Tasa 790) paid separately
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ── Post-Payment Reassurance ─────────────────────────────────────── */}
      <section className="py-8 px-6 bg-[#3a3a3a]">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-3 text-center">
          <div className="w-2 h-2 rounded-full bg-[#e3a99c] flex-shrink-0" />
          <p className="text-white/80 text-sm">
            Once paid, our team will contact you with more details about your chosen province and next steps.
          </p>
          <div className="w-2 h-2 rounded-full bg-[#e3a99c] flex-shrink-0" />
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
              From inquiry to{" "}
              <span className="font-script text-[#e3a99c] text-5xl md:text-6xl relative inline-block transform -rotate-2">
                booked
              </span>{" "}
              in 4 steps
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] max-w-xl mx-auto">
              We've done this dozens of times. Here's exactly what happens when you work with us.
            </p>
          </div>

          {/* Steps */}
          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-[#e7ddd3]" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={i}
                    className="relative group text-center lg:text-left pt-8 lg:pt-0"
                  >
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

      {/* ── Why Us ───────────────────────────────────────────────────────── */}
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
                Spain's bureaucracy is{" "}
                <span className="font-script text-[#e3a99c] text-5xl md:text-6xl relative inline-block transform -rotate-2">
                  brutal.
                </span>
                <br />
                We've mapped every trap.
              </h2>
              <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed mb-10 max-w-lg">
                Appointment slots disappear in seconds. Forms get rejected for tiny errors.
                Offices change requirements without notice. We live in this system ~
                so you don't have to figure it out from scratch.
              </p>

              <div className="grid gap-6">
                {[
                  {
                    icon: Shield,
                    color: "#8fa38d",
                    title: "Forms done right the first time",
                    desc: "We review every field before your appointment. One wrong box = rejected application.",
                  },
                  {
                    icon: Clock,
                    color: "#e3a99c",
                    title: "We hunt the hard-to-get slots",
                    desc: "Appointment slots open and close in minutes. We know the system and check constantly.",
                  },
                  {
                    icon: MessageSquare,
                    color: "#bbcccd",
                    title: "Human support, not a chatbot",
                    desc: "You get a real person helping you. Questions answered fast, in plain English.",
                  },
                  {
                    icon: Star,
                    color: "#e3a99c",
                    title: "Flat €75 ~nothing hidden",
                    desc: "No upsells, no hidden fees. Government taxes are the only extra (we'll tell you exactly what they are).",
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

            {/* Right ~Stats / Visual */}
            <div className="relative flex flex-col gap-6">
              {/* Stat cards */}
              {[
                {
                  value: "100%",
                  label: "Personal attention on every appointment",
                  color: "#e3a99c",
                  bg: "#f2d6c9",
                },
                {
                  value: "1–3 wks",
                  label: "Average time to secure your appointment",
                  color: "#7a8f90",
                  bg: "#e0eaeb",
                },
                {
                  value: "€75",
                  label: "Flat fee with no surprises",
                  color: "#8fa38d",
                  bg: "#d4e0d3",
                },
                {
                  value: "3 types",
                  label: "NIE · TIE · Regreso ~all covered",
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
                      className="font-[family-name:var(--font-heading)] text-xl font-bold"
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
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e3a99c]/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#bbcccd]/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8">
            <Sparkles className="w-4 h-4 text-[#e3a99c]" />
            <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
              Ready to get it done?
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Stop fighting Spain's system.{" "}
            <span className="font-script text-[#e3a99c] text-5xl md:text-6xl lg:text-7xl block mt-2 transform -rotate-1">
              Let us handle it.
            </span>
          </h2>

          <p className="font-[family-name:var(--font-body)] text-[#e7ddd3] text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Pick your service, pay €75, and we handle everything ~ forms, appointment slots, prep, all of it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#services"
              className="flex items-center gap-3 px-10 py-5 rounded-full bg-[#e3a99c] text-white font-bold text-lg hover:bg-white hover:text-[#3a3a3a] transition-all duration-300 shadow-xl shadow-[#e3a99c]/20 transform hover:-translate-y-1"
            >
              Book an Appointment
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-5 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Have a Question?
            </Link>
          </div>

          <p className="mt-6 text-sm text-[#e7ddd3]/60">
            €75 flat. No hidden fees. No surprises.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
