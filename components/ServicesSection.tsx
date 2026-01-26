"use client";

import {
  FileCheck,
  Globe,
  Briefcase,
  Users,
  Clock,
  Shield,
} from "lucide-react";

const services = [
  {
    icon: FileCheck,
    title: "Visa Application Support",
    description:
      "Complete guidance through the visa application process, from document preparation to submission.",
    color: "#e3a99c",
  },
  {
    icon: Globe,
    title: "Country Selection Advisory",
    description:
      "Find your perfect destination based on visa requirements, cost of living, and lifestyle preferences.",
    color: "#bbcccd",
  },
  {
    icon: Briefcase,
    title: "Business Registration",
    description:
      "Help setting up legal entities, freelance structures, and tax-compliant business arrangements.",
    color: "#f2d6c9",
  },
  {
    icon: Users,
    title: "Family Visa Solutions",
    description:
      "Bring your loved ones along. We handle dependent visas and family reunion applications.",
    color: "#e7ddd3",
  },
  {
    icon: Clock,
    title: "Visa Extensions & Renewals",
    description:
      "Never worry about expiration. We track deadlines and handle all renewal paperwork.",
    color: "#e3a99c",
  },
  {
    icon: Shield,
    title: "Compliance & Tax Advisory",
    description:
      "Stay compliant with local regulations. Expert advice on tax obligations and legal requirements.",
    color: "#bbcccd",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#f2d6c9]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#bbcccd]/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-[family-name:var(--font-body)] text-sm tracking-[0.2em] text-[#e3a99c] uppercase mb-4">
            What We Offer
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-semibold text-[#3a3a3a] mb-6">
            Services Tailored for
            <br />
            <span className="italic text-[#e3a99c]">Digital Nomads</span>
          </h2>
          <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] max-w-2xl mx-auto">
            From your first application to long-term residency, we&apos;re your
            dedicated partner in building a location-independent life.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-3xl bg-white border border-[#e7ddd3]/50 card-hover overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Decorative corner */}
              <div
                className="absolute top-0 right-0 w-24 h-24 opacity-10 transition-opacity group-hover:opacity-20"
                style={{
                  background: `radial-gradient(circle at top right, ${service.color}, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3"
                style={{ backgroundColor: `${service.color}20` }}
              >
                <service.icon
                  className="w-7 h-7"
                  style={{ color: service.color }}
                />
              </div>

              {/* Content */}
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#3a3a3a] mb-3">
                {service.title}
              </h3>
              <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed">
                {service.description}
              </p>

              {/* Learn more link */}
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#e3a99c] opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Learn more</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] mb-6">
            Not sure which service you need?
          </p>
          <a
            href="#contact"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <span>Get a Free Assessment</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
