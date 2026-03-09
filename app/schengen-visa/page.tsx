"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  FileText,
  Check,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Clock,
  Shield,
  Star,
  Globe,
  Sparkles,
  MessageSquare,
  CalendarCheck,
  MapPin,
  Users,
  BadgeCheck,
  Plane,
  Hotel,
  BookOpen,
  Briefcase,
} from "lucide-react";

// ─── What's Included ─────────────────────────────────────────────────────────

const included = [
  {
    icon: FileText,
    title: "Personalised Cover Letter",
    desc: "Written specifically for your profile ~ employment status, travel history, purpose of visit. Not a template.",
    color: "#e3a99c",
    bg: "#f2d6c9",
  },
  {
    icon: MapPin,
    title: "Day-by-Day Itinerary",
    desc: "A detailed, credible travel plan for the countries you're visiting. Consulates want this. We build it for you.",
    color: "#bbcccd",
    bg: "#e0eaeb",
  },
  {
    icon: Plane,
    title: "Dummy Flight Reservations",
    desc: "Flight reservations that look real to consulates ~ without you paying for non-refundable tickets upfront.",
    color: "#8fa38d",
    bg: "#d4e0d3",
  },
  {
    icon: Hotel,
    title: "Hotel & Accommodation Proof",
    desc: "Confirmed hotel reservations (dummy) or AirBnB booking guidance that satisfies consulate requirements.",
    color: "#e3a99c",
    bg: "#f2d6c9",
  },
  {
    icon: BadgeCheck,
    title: "Document Checklist & Review",
    desc: "A checklist built for your exact profile (employed, self-employed, student, OFW). Every document reviewed before submission.",
    color: "#7a8f90",
    bg: "#e0eaeb",
  },
  {
    icon: BookOpen,
    title: "Application Form Completion",
    desc: "We fill out your Schengen visa application form correctly. Wrong answers are the #1 reason for rejection.",
    color: "#8fa38d",
    bg: "#d4e0d3",
  },
  {
    icon: CalendarCheck,
    title: "Appointment Booking Guidance",
    desc: "Step-by-step guide to booking your VFS or embassy appointment ~ slots go fast, we help you move quickly.",
    color: "#e3a99c",
    bg: "#f2d6c9",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Support",
    desc: "Direct access throughout the process. Ask anything, anytime. You won't be left guessing.",
    color: "#bbcccd",
    bg: "#e0eaeb",
  },
];

// ─── Who It's For ────────────────────────────────────────────────────────────

const profiles = [
  {
    icon: Briefcase,
    label: "Employed",
    desc: "Working in PH with employment certificate and payslips",
    color: "#e3a99c",
    bg: "#f2d6c9",
  },
  {
    icon: Globe,
    label: "Self-Employed / Business Owner",
    desc: "Business owners, freelancers, and online workers",
    color: "#8fa38d",
    bg: "#d4e0d3",
  },
  {
    icon: BookOpen,
    label: "Student",
    desc: "Enrolled students with school endorsement and financial support",
    color: "#7a8f90",
    bg: "#e0eaeb",
  },
  {
    icon: Users,
    label: "OFW / Working Abroad",
    desc: "Overseas workers applying through the Philippine embassy network",
    color: "#bbcccd",
    bg: "#e0eaeb",
  },
];

// ─── Process Steps ────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Share Your Profile",
    description:
      "After payment, you'll fill out a short intake form. Employment status, travel history, target countries, travel dates. 5 minutes.",
    color: "#e3a99c",
  },
  {
    number: "02",
    icon: FileText,
    title: "We Build Your Pack",
    description:
      "Cover letter, itinerary, flight and hotel reservations, and a personalised checklist ~ ready within 3–5 business days.",
    color: "#bbcccd",
  },
  {
    number: "03",
    icon: BadgeCheck,
    title: "Review & Submit",
    description:
      "We review your complete document set before you submit. We catch the errors consulates reject for.",
    color: "#f2d6c9",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Walk In With Confidence",
    description:
      "You go to your appointment knowing your documents are solid. We stay on WhatsApp until you get your answer.",
    color: "#8fa38d",
  },
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Does this guarantee my visa gets approved?",
    a: "No service can legally guarantee a visa ~ that decision rests with the consulate. What we guarantee is that your documents are as strong as they can be. Weak paperwork is the #1 reason Filipino applicants get rejected, and we eliminate that variable entirely.",
  },
  {
    q: "Which countries can I apply for?",
    a: "Any country in the Schengen zone ~ Spain, France, Italy, Germany, Netherlands, Greece, and 22 others. You apply through the embassy of the country you'll spend the most time in. We'll help you figure out which one to apply through.",
  },
  {
    q: "I've been rejected before. Can you still help?",
    a: "Yes ~ and honestly, previous rejections are something we specialise in. We'll review what went wrong, address it directly in your cover letter, and make sure your new application tells a more compelling story. Previous rejection doesn't disqualify you.",
  },
  {
    q: "Do I need to show a lot of money in my bank account?",
    a: "You need to show sufficient funds for your trip, not a massive balance. The consulate looks at consistency and stability, not just the number. We'll tell you exactly what your bank statements should show and how to present them.",
  },
  {
    q: "How long before my trip should I start?",
    a: "Ideally 6–8 weeks before your travel date. Schengen visas can only be applied for 6 months in advance and no later than 15 days before travel. The earlier you start, the more options you have for appointment slots.",
  },
  {
    q: "Is the €149 per person or per family?",
    a: "It's per applicant. If you're travelling with family, each person needs their own application and their own documents. Reach out if you have multiple applicants ~ we can discuss a bundled rate.",
  },
  {
    q: "Do you help with documents in Filipino / Tagalog?",
    a: "Yes. We understand Philippine civil documents ~ PSA-issued birth certificates, NBI clearance, CENOMAR, DTI/SEC registration, ITR from BIR. No need to explain what these are. We already know.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function SchengenVisaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#f9f5f2] overflow-hidden">
      <Header />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="pt-36 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f2d6c9]/25 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#bbcccd]/20 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-[#6b6b6b] mb-8">
            <Link href="/" className="hover:text-[#e3a99c] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#3a3a3a] font-medium">Schengen Visa Service</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#e7ddd3] mb-8 shadow-sm">
            <Globe className="w-4 h-4 text-[#e3a99c]" />
            <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
              For Filipino Passport Holders
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold text-[#3a3a3a] leading-tight mb-6">
            Your Schengen Visa,{" "}
            <br />
            <span className="font-script text-[#e3a99c] text-6xl md:text-7xl lg:text-8xl relative inline-block transform -rotate-2">
              Finally Approved
            </span>
          </h1>

          <p className="font-[family-name:var(--font-body)] text-lg md:text-xl text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed mb-6">
            A weak passport shouldn&apos;t stop you from seeing Europe. We handle every document, every form, and every step ~ so your application is bulletproof before it ever reaches the consulate.
          </p>

          {/* Filipino-specific note */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e3a99c]/10 border border-[#e3a99c]/30 mb-10">
            <span className="text-sm text-[#e3a99c] font-semibold">Built specifically for Philippine passport holders 🇵🇭</span>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#6b6b6b] mb-12">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#8fa38d]" />
              <span>Full document preparation</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[#e7ddd3] hidden sm:block" />
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#e3a99c]" />
              <span>WhatsApp support included</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[#e7ddd3] hidden sm:block" />
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#e3a99c] fill-[#e3a99c]" />
              <span>Guided by someone based in Spain</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://buy.stripe.com/7sY5kw9YK1KycbDg41ew808"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-10 py-5 rounded-full bg-[#3a3a3a] text-white font-bold text-lg hover:bg-[#e3a99c] transition-all duration-300 shadow-xl transform hover:-translate-y-1"
            >
              Get Started ~ €149
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              href="#whats-included"
              className="flex items-center gap-2 px-8 py-5 rounded-full border border-[#e7ddd3] text-[#3a3a3a] font-semibold hover:bg-white hover:shadow-md transition-all duration-300"
            >
              See What&apos;s Included
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pricing Banner ──────────────────────────────────────────────── */}
      <section className="py-10 px-6 bg-white border-y border-[#e7ddd3]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <p className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase mb-1">Launch Pricing</p>
              <div className="flex items-baseline gap-3">
                <span className="text-[#aaaaaa] text-xl line-through font-medium">€299</span>
                <span className="font-[family-name:var(--font-heading)] text-6xl font-bold text-[#3a3a3a]">€149</span>
                <span className="px-2.5 py-1 rounded-full bg-[#e3a99c]/15 text-[#e3a99c] text-xs font-bold">50% OFF</span>
              </div>
              <p className="text-sm text-[#6b6b6b] mt-1">Per applicant · One-time payment · No hidden fees</p>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              {[
                "Cover letter written for your profile",
                "Dummy flights & hotel reservations included",
                "Full document review before you submit",
                "WhatsApp support throughout the process",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#f2d6c9] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#e3a99c]" />
                  </div>
                  <span className="text-sm text-[#3a3a3a]">{item}</span>
                </div>
              ))}
            </div>
            <a
              href="https://buy.stripe.com/7sY5kw9YK1KycbDg41ew808"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-2 px-8 py-4 rounded-full bg-[#e3a99c] text-white font-bold hover:bg-[#3a3a3a] transition-all duration-300 whitespace-nowrap shadow-lg shadow-[#e3a99c]/20"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Schengen Calculator Feature ─────────────────────────────────── */}
      <section className="py-10 px-6 bg-[#f9f5f2]">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/schengen-calculator"
            className="group flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl bg-white border border-[#e7ddd3] hover:border-[#bbcccd] hover:shadow-lg transition-all duration-300"
          >
            {/* Icon block */}
            <div className="w-16 h-16 rounded-2xl bg-[#e0eaeb] flex items-center justify-center flex-shrink-0 text-3xl group-hover:scale-105 transition-transform duration-300">
              🗓
            </div>

            {/* Text */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <p className="text-xs font-bold tracking-widest uppercase text-[#7a8f90]">
                  Free Tool
                </p>
                <span className="text-[9px] font-bold tracking-widest uppercase text-[#8fa38d] bg-[#d4e0d3]/60 rounded-full px-1.5 py-0.5 leading-none">
                  NEW
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#3a3a3a] mb-1 group-hover:text-[#7a8f90] transition-colors">
                Already in Schengen? Track your 90/180 days.
              </h3>
              <p className="text-sm text-[#6b6b6b] leading-relaxed">
                Know exactly how many days you have left, plan future trips, and see when you can safely re-enter.
                Free, instant, no login required.
              </p>
            </div>

            {/* Arrow CTA */}
            <div className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#bbcccd] text-[#7a8f90] text-sm font-semibold group-hover:bg-[#e0eaeb] group-hover:border-[#7a8f90] transition-all duration-200 whitespace-nowrap">
              Open Calculator
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* ── Who It's For ───────────────────────────────────────────────── */}
      <section className="section-padding bg-[#f9f5f2]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#e7ddd3] mb-6">
              <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">Who It&apos;s For</span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-4">
              Whatever your{" "}
              <span className="font-script text-[#e3a99c] text-5xl md:text-6xl relative inline-block transform -rotate-2">profile
              </span>
              , we&apos;ve got you.
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] max-w-xl mx-auto">
              Your employment status changes what documents you need. We know all four profiles inside out.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {profiles.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white border border-[#e7ddd3] hover:border-[#e3a99c]/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: p.bg }}>
                    <Icon className="w-7 h-7" style={{ color: p.color }} />
                  </div>
                  <div>
                    <p className="font-bold text-[#3a3a3a] mb-1">{p.label}</p>
                    <p className="text-xs text-[#6b6b6b] leading-snug">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── What's Included ─────────────────────────────────────────────── */}
      <section id="whats-included" className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#e7ddd3] to-transparent" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/30 border border-[#f2d6c9] mb-6">
              <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">What&apos;s Included</span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-4">
              Everything your application{" "}
              <span className="font-script text-[#e3a99c] text-5xl md:text-6xl relative inline-block transform -rotate-2">needs
              </span>
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] max-w-xl mx-auto">
              At €149, this covers more than what most agencies charge €300+ for. Every item below is included.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {included.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-[#f9f5f2] border border-[#e7ddd3] hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: item.bg }}
                  >
                    <Icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-[#3a3a3a] mb-2">{item.title}</h3>
                  <p className="font-[family-name:var(--font-body)] text-xs text-[#6b6b6b] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-[#f9f5f2] relative overflow-hidden">
        <div className="absolute top-[20%] left-[5%] w-72 h-72 bg-[#f2d6c9]/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[5%] w-72 h-72 bg-[#bbcccd]/15 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#bbcccd]/20 border border-[#bbcccd] mb-6">
              <span className="text-xs font-bold tracking-widest text-[#7a8f90] uppercase">How It Works</span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-4">
              Pay once. We take it{" "}
              <span className="font-script text-[#e3a99c] text-5xl md:text-6xl relative inline-block transform -rotate-2">from here</span>
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] max-w-xl mx-auto">
              After payment you&apos;ll get an intake form. From there, we build everything and guide you to the finish line.
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
                      <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#3a3a3a] mb-3">{step.title}</h3>
                      <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Us ──────────────────────────────────────────────────────── */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#e7ddd3] to-transparent" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/30 border border-[#f2d6c9] mb-6">
                <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">Why Choose Us</span>
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-6 leading-tight">
                Guided by someone who{" "}
                <span className="font-script text-[#e3a99c] text-5xl md:text-6xl relative inline-block transform -rotate-2">
                  lives in Spain.
                </span>
              </h2>
              <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed mb-10 max-w-lg">
                I&apos;m a Filipino who figured out Europe with a weak passport. I know exactly what consulates want to see, what causes rejections, and how to position your profile to get approved. This isn&apos;t a template service. It&apos;s built on real experience.
              </p>

              <div className="grid gap-6">
                {[
                  {
                    icon: Globe,
                    color: "#e3a99c",
                    title: "Filipino-specific document knowledge",
                    desc: "PSA, NBI, BIR, DTI ~ we know what every Philippine document is and what the consulate expects from it.",
                  },
                  {
                    icon: Shield,
                    color: "#8fa38d",
                    title: "Previous rejection? We fix it.",
                    desc: "We understand why Philippine passports get rejected more often. We address it head-on in your application.",
                  },
                  {
                    icon: MessageSquare,
                    color: "#bbcccd",
                    title: "WhatsApp, not a ticket system",
                    desc: "You message a real person, not a chatbot. Questions answered fast, in plain English (or Filipino).",
                  },
                  {
                    icon: Star,
                    color: "#e3a99c",
                    title: "Half the price of agencies",
                    desc: "Agencies in the Philippines charge PHP 18,000–30,000 for this. We charge €149. Same result, less middleman.",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex gap-5 group p-4 rounded-2xl hover:bg-[#f9f5f2] transition-colors duration-300">
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm bg-white transition-all duration-300 group-hover:scale-110"
                        style={{ border: `1.5px solid ${item.color}33` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: item.color }} />
                      </div>
                      <div>
                        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a] mb-1">{item.title}</h3>
                        <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stat cards */}
            <div className="relative flex flex-col gap-6">
              {[
                { value: "€149", label: "vs PHP 18,000–30,000 at PH agencies", color: "#e3a99c", bg: "#f2d6c9" },
                { value: "26+", label: "Schengen countries your visa unlocks", color: "#7a8f90", bg: "#e0eaeb" },
                { value: "3–5d", label: "Documents ready within business days", color: "#8fa38d", bg: "#d4e0d3" },
                { value: "🇵🇭", label: "Service built for Filipino passport holders", color: "#e3a99c", bg: "#f2d6c9" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-6 p-6 rounded-2xl bg-[#f9f5f2] border border-[#e7ddd3] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-center"
                    style={{ backgroundColor: stat.bg }}
                  >
                    <span className="font-[family-name:var(--font-heading)] text-xl font-bold" style={{ color: stat.color }}>
                      {stat.value}
                    </span>
                  </div>
                  <p className="font-[family-name:var(--font-body)] text-[#3a3a3a] font-medium">{stat.label}</p>
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
              <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">FAQ</span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-4">
              Questions we always get
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#6b6b6b]">
              Still unsure?{" "}
              <Link href="/contact" className="text-[#e3a99c] font-semibold hover:underline">
                Reach out ~ we&apos;ll answer honestly.
              </Link>
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl bg-white border border-[#e7ddd3] overflow-hidden hover:shadow-md transition-shadow">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 p-6 text-left cursor-pointer"
                >
                  <span className="font-[family-name:var(--font-heading)] text-base font-bold text-[#3a3a3a] leading-snug">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#e3a99c] flex-shrink-0 mt-0.5 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <div className="w-full h-px bg-[#e7ddd3] mb-4" />
                    <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed text-sm">{faq.a}</p>
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
            <span className="text-sm">🇵🇭</span>
            <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
              For Filipino passport holders
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Europe is waiting.{" "}
            <span className="font-script text-[#e3a99c] text-5xl md:text-6xl lg:text-7xl block mt-2 transform -rotate-1">
              Your passport is not the problem.
            </span>
          </h2>

          <p className="font-[family-name:var(--font-body)] text-[#e7ddd3] text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            The right documents change everything. Let us build your application from the ground up ~ for €149, all in.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://buy.stripe.com/7sY5kw9YK1KycbDg41ew808"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-10 py-5 rounded-full bg-[#e3a99c] text-white font-bold text-lg hover:bg-white hover:text-[#3a3a3a] transition-all duration-300 shadow-xl shadow-[#e3a99c]/20 transform hover:-translate-y-1"
            >
              Get Started ~ €149
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-5 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Ask a Question First
            </Link>
          </div>

          <p className="mt-6 text-sm text-[#e7ddd3]/60">
            €149 per applicant · Launch pricing · No hidden fees
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
