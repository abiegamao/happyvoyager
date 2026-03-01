"use client";

import {
  MessageSquare,
  FileText,
  Send,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Free Consultation",
    description:
      "We hop on a call, I assess your situation, passport, income, goals, and tell you exactly what's possible.",
    color: "#e3a99c",
  },
  {
    number: "02",
    icon: FileText,
    title: "Document Prep",
    description:
      "You get a personalized document checklist. I review every single file before submission, no room for errors.",
    color: "#bbcccd",
  },
  {
    number: "03",
    icon: Send,
    title: "Application",
    description:
      "I guide you through submission on the UGE portal. You'll know exactly what buttons to click and what to upload.",
    color: "#f2d6c9",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Approval",
    description:
      "Visa approved! But we're not done, I help you with TIE, next steps, and getting settled in your new city.",
    color: "#e3a99c",
  },
];

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="section-padding relative overflow-hidden bg-white"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-[#f2d6c9]/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-[#bbcccd]/15 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#bbcccd]/20 border border-[#bbcccd] mb-6">
            <span className="text-xs font-bold tracking-widest text-[#7a8f90] uppercase">
              The Process
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl font-bold text-[#3a3a3a] mb-6 leading-tight">
            From Zero to <br />
            <span className="font-script text-[#e3a99c] text-6xl md:text-7xl relative inline-block transform -rotate-2 mt-2">
              Visa
            </span>
            <span className="text-[#3a3a3a]"> in 4 Steps</span>
          </h2>

          <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed">
            I&apos;ve turned a confusing bureaucratic maze into a four-step
            execution plan. Here&apos;s the system.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-[#e7ddd3]" />

          {/* Steps grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group text-center lg:text-left pt-8 lg:pt-0"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Number badge / Dot */}
                <div className="absolute top-0 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-white shadow-sm z-20"
                  style={{ backgroundColor: step.color }}
                />

                {/* Mobile line connection */}
                <div className="lg:hidden absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-[#e7ddd3] -z-10 last:hidden" />

                {/* Card Content */}
                <div className="relative p-8 rounded-[2rem] bg-[#f9f5f2] hover:bg-white border border-transparent hover:border-[#e7ddd3] transition-all duration-300 hover:shadow-xl group-hover:-translate-y-2">

                  <div
                    className="inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-6 shadow-sm bg-white"
                  >
                    <step.icon className="w-8 h-8" style={{ color: step.color }} />
                  </div>

                  <div className="mb-4">
                    <span className="block font-[family-name:var(--font-heading)] text-5xl font-bold text-[#e7ddd3]/60 mb-2">
                      {step.number}
                    </span>
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#3a3a3a]">
                      {step.title}
                    </h3>
                  </div>

                  <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#3a3a3a] text-white font-bold text-lg hover:bg-[#e3a99c] transition-all duration-300 shadow-xl hover:shadow-[#e3a99c]/40 transform hover:-translate-y-1"
          >
            <span>Book Your Free Consultation</span>
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="mt-4 text-sm text-[#6b6b6b]">
            No commitment. Let&apos;s just figure out if this path makes sense for you.
          </p>
        </div>
      </div>
    </section>
  );
}
