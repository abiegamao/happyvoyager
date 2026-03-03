"use client";

import { CalendarCheck, Globe, Plane, ArrowRight } from "lucide-react";

const services = [
  {
    icon: CalendarCheck,
    color: "#e3a99c",
    bg: "#f2d6c9",
    label: "NIE & TIE Appointments",
    description:
      "Need your Spanish tax ID or residency card? We handle the booking so you don't miss a slot.",
    href: "/appointments",
    cta: "Book an Appointment",
  },
  {
    icon: Globe,
    color: "#8fa38d",
    bg: "#d4e0d3",
    label: "Document Translations",
    description:
      "Philippine documents ~ PSA, NBI, diplomas, contracts ~ translated to Spanish for consulates and official use.",
    href: "/translations",
    cta: "Get a Translation",
  },
  {
    icon: Plane,
    color: "#7a8f90",
    bg: "#e0eaeb",
    label: "Schengen Visa Assistance",
    description:
      "Visiting Europe? We prepare your cover letter, travel itinerary, and supporting documents for the consulate.",
    href: "/schengen-visa",
    cta: "Learn More",
  },
];

export default function OtherServicesSection() {
  return (
    <section className="py-16 px-6 bg-[#f9f5f2]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-widest text-[#7a8f90] uppercase mb-3">
            Also Available
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3a3a3a]">
            More ways we can help
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                className="group flex flex-col gap-4 p-7 rounded-3xl bg-white border border-[#e7ddd3] hover:border-[#e3a99c]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: s.bg }}
                >
                  <Icon className="w-6 h-6" style={{ color: s.color }} />
                </div>

                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a] mb-2">
                    {s.label}
                  </h3>
                  <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-sm font-semibold text-[#e3a99c] group-hover:gap-2 transition-all duration-200">
                  {s.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
