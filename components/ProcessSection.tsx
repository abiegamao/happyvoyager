"use client";

import {
  FileText,
  ChevronRight,
  ArrowRight,
  CalendarCheck,
  MapPin,
  BadgeCheck,
  Send,
  Plane,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Strategy Call",
    description:
      "We assess your eligibility ~ income, work setup, documents ~ and map out your full timeline before you spend anything.",
    color: "#e3a99c",
  },
  {
    number: "02",
    icon: FileText,
    title: "Build Your Package",
    description:
      "Cover letter, document checklist, application forms, and income presentation strategy ~ all tailored to your exact profile.",
    color: "#bbcccd",
  },
  {
    number: "03",
    icon: BadgeCheck,
    title: "Documents & Apostille",
    description:
      "We review every document you've gathered and flag issues before the consulate does. DFA apostille process guided step by step.",
    color: "#f2d6c9",
  },
  {
    number: "04",
    icon: Send,
    title: "Application Submission",
    description:
      "Once in Spain, we guide you through getting your NIE and Digital Certificate ~ then we submit everything to UGE on your behalf. You must be in Spain for this step.",
    color: "#8fa38d",
  },
  {
    number: "05",
    icon: Plane,
    title: "Approval & Next Steps",
    description:
      "Visa approved ~ well done. Now the real work begins. We will still guide you post-approval via our system.",
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
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#bbcccd]/20 border border-[#bbcccd] mb-6">
            <span className="text-xs font-bold tracking-widest text-[#7a8f90] uppercase">
              How It Works
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl font-bold text-[#3a3a3a] mb-6 leading-tight">
            From Davao to{" "}
            <span className="font-script text-[#e3a99c] text-6xl md:text-7xl relative inline-block transform -rotate-2 mt-2">
              Madrid 🇪🇸
            </span>
            , step by step.
          </h2>

          <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed">
            We work through this with you ~ not just a document dump. Every step has a human being on the other end.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          <div className="grid md:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group text-center"
              >
                <div className="p-6 rounded-[2rem] bg-[#f9f5f2] hover:bg-white border border-transparent hover:border-[#e7ddd3] transition-all duration-300 hover:shadow-xl group-hover:-translate-y-2 h-full">
                  <div
                    className="inline-flex w-12 h-12 rounded-2xl items-center justify-center mb-4"
                    style={{ backgroundColor: step.color + "22" }}
                  >
                    <step.icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>

                  <span
                    className="block font-[family-name:var(--font-heading)] text-3xl font-bold mb-2"
                    style={{ color: step.color + "55" }}
                  >
                    {step.number}
                  </span>

                  <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-[#3a3a3a] mb-2">
                    {step.title}
                  </h3>

                  <p className="font-[family-name:var(--font-body)] text-xs text-[#6b6b6b] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-10 -right-3 w-6 h-6 items-center justify-center z-10">
                    <ChevronRight className="w-4 h-4 text-[#e7ddd3]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tell Me More CTA */}
        <div className="mt-16 text-center">
          <a
            href="/digital-nomad-visa"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#3a3a3a] text-white font-bold hover:bg-[#e3a99c] transition-all duration-300 shadow-lg"
          >
            Tell Me More
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="mt-4 text-sm text-[#6b6b6b]">
            See requirements, what&apos;s included, pricing, and FAQ.
          </p>
        </div>
      </div>
    </section>
  );
}
