"use client";

import {
  FileCheck,
  Globe,
  Briefcase,
  Users,
  Clock,
  Shield,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: FileCheck,
    title: "Visa Application Support",
    description:
      "I walk you through the full visa pipeline — documents, translations, apostilles, and submission. No step left undocumented.",
    color: "#e3a99c", // Dusty Rose
  },
  {
    icon: Globe,
    title: "Country Selection Advisory",
    description:
      "Not every country fits every nomad. I help you pick based on visa difficulty, tax implications, cost of living, and your actual lifestyle.",
    color: "#bbcccd", // Sage
  },
  {
    icon: Briefcase,
    title: "Business Registration",
    description:
      "Autonomo vs. SL? I'll help you choose the right structure and get registered without overpaying an accountant.",
    color: "#e3a99c", // Dusty Rose
  },
  {
    icon: Users,
    title: "Family Visa Solutions",
    description:
      "Bringing your partner or family? I'll handle the dependent visa paperwork so you don't double the stress.",
    color: "#f2d6c9", // Soft Peach
  },
  {
    icon: Clock,
    title: "Visa Extensions & Renewals",
    description:
      "I keep track of your deadlines so your visa doesn't expire while you're living your best life.",
    color: "#f2d6c9", // Soft Peach
  },
  {
    icon: Shield,
    title: "Compliance & Tax Advisory",
    description:
      "Taxes abroad are confusing. I'll help you understand what you owe, where you owe it, and how to stay compliant.",
    color: "#bbcccd", // Sage
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#f2d6c9]/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#bbcccd]/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/20 border border-[#f2d6c9] mb-6">
            <span className="text-xs font-bold tracking-widest text-[#d69586] uppercase">
              What I Offer
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl font-bold text-[#3a3a3a] mb-6 leading-tight">
            Services Built From <br />
            <span className="font-script text-[#e3a99c] text-6xl md:text-7xl relative inline-block transform -rotate-2 mt-2">
              Lived Experience
            </span>
          </h2>

          <p className="font-[family-name:var(--font-body)] text-lg md:text-xl text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed">
            I don&apos;t offer generic consulting. Each service is something
            I&apos;ve personally navigated or helped other nomads through.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-10 rounded-[2.5rem] bg-[#f9f5f2] hover:bg-white border border-transparent hover:border-[#e7ddd3] transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(227,169,156,0.15)] overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Decorative corner */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ backgroundColor: service.color }}
              />

              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 bg-white group-hover:bg-[#f9f5f2] shadow-sm"
              >
                <service.icon
                  className="w-8 h-8 transition-colors duration-300"
                  style={{ color: service.color }}
                />
              </div>

              {/* Content */}
              <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#3a3a3a] mb-4 group-hover:text-[#d69586] transition-colors duration-300">
                {service.title}
              </h3>
              <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed mb-8">
                {service.description}
              </p>

              {/* Learn more link */}
              <div className="flex items-center gap-2 text-sm font-bold text-[#3a3a3a] group-hover:text-[#e3a99c] transition-colors duration-300 cursor-pointer">
                <span className="uppercase tracking-wider">Learn more</span>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:bg-[#e3a99c] group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-4 h-4 transform group-hover:-rotate-45 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center p-8 xs:p-12 rounded-[3rem] bg-[#3a3a3a] text-white relative overflow-hidden group">
            {/* Background blobs for CTA */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e3a99c] rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#bbcccd] rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity duration-500" />

            <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-heading)] font-bold mb-6 relative z-10">
              Not sure where to start?
            </h3>

            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#3a3a3a] font-bold text-lg hover:bg-[#e3a99c] hover:text-white transition-all duration-300 shadow-lg hover:shadow-[#e3a99c]/50 transform hover:-translate-y-1 relative z-10"
            >
              <span>Get a Personal Assessment</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
