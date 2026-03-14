"use client";

import { ArrowRight, Library } from "lucide-react";

const phases = [
  {
    number: "0",
    title: "Qualify",
    subtitle: "Am I eligible?",
    description:
      "Find out if this visa is for you before you spend a minute on paperwork. Eligibility check, income thresholds, and which path fits your profile.",
    accent: "#8fa38d",
    bg: "#d4e0d3",
  },
  {
    number: "1",
    title: "Prepare",
    subtitle: "Build your file",
    description:
      "Gather, apostille, and translate every document. Templates, checklists, and exact requirements so nothing gets missed.",
    accent: "#e3a99c",
    bg: "#f2d6c9",
  },
  {
    number: "2",
    title: "Apply",
    subtitle: "Submit to UGE",
    description:
      "Step-by-step portal walkthrough with screenshots. Avoid the requerimiento and common rejections that send people back to square one.",
    accent: "#7a8f90",
    bg: "#e0eaeb",
  },
  {
    number: "3",
    title: "Arrive",
    subtitle: "Land & set up",
    description:
      "Your first 30 days in Spain ~ Padrón, NIE, TIE appointment, bank account. Every legal step within the correct windows.",
    accent: "#8fa38d",
    bg: "#d4e0d3",
  },
  {
    number: "4",
    title: "Maintain",
    subtitle: "Stay legal",
    description:
      "Renewals, tax obligations, and the Beckham Law strategy. Keep your residency clock running and your visa valid.",
    accent: "#e3a99c",
    bg: "#f2d6c9",
  },
  {
    number: "5",
    title: "Become Spanish",
    subtitle: "The endgame",
    description:
      "Permanent residency, citizenship timeline, and fast-track options for eligible nationalities. Your path to an EU passport.",
    accent: "#c9a84c",
    bg: "#f5ecd7",
  },
];

export default function PlaybookJourneySection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#e7ddd3] to-transparent" />
      <div className="absolute top-[15%] right-[5%] w-80 h-80 bg-[#f2d6c9]/15 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-80 h-80 bg-[#d4e0d3]/15 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/30 border border-[#f2d6c9] mb-6">
            <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
              The Playbook Journey
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-[#3a3a3a] mb-6 leading-tight">
            From &ldquo;should I?&rdquo; to{" "}
            <span className="font-script text-[#e3a99c] text-5xl md:text-6xl lg:text-7xl relative inline-block transform -rotate-2">
              Spanish passport
            </span>
          </h2>

          <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed">
            The Playbook covers your entire journey in Spain ~ not just the visa application.
            6 phases, 24 lessons, from your first eligibility check to EU citizenship.
          </p>
        </div>

        {/* Journey Timeline */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-8 left-[calc(8.33%+1rem)] right-[calc(8.33%+1rem)] h-0.5 bg-[#e7ddd3]" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {phases.map((phase, i) => (
              <div key={i} className="relative group">
                {/* Timeline dot (desktop) */}
                <div
                  className="hidden lg:block absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-white shadow-sm z-10"
                  style={{ backgroundColor: phase.accent }}
                />

                <div className="p-6 rounded-[2rem] bg-[#f9f5f2] border border-transparent hover:border-[#e7ddd3] hover:bg-white hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 lg:mt-6">
                  {/* Phase number + title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: phase.bg }}
                    >
                      <span
                        className="font-[family-name:var(--font-heading)] text-sm font-bold"
                        style={{ color: phase.accent }}
                      >
                        {phase.number}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a]">
                        {phase.title}
                      </h3>
                      <p className="text-xs text-[#6b6b6b] font-medium">
                        {phase.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Playbook Library */}
        <div className="mt-20 mb-14">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8fa38d]/15 border border-[#8fa38d]/30 mb-6">
              <Library className="w-4 h-4 text-[#8fa38d]" />
              <span className="text-xs font-bold tracking-widest text-[#8fa38d] uppercase">
                The Playbook Library
              </span>
            </div>

            <h3 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3a3a3a] mb-4 leading-tight">
              One subscription.{" "}
              <span className="font-script text-[#e3a99c] text-4xl md:text-5xl relative inline-block transform -rotate-1">
                An entire library.
              </span>
            </h3>

            <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] max-w-xl mx-auto">
              Your Playbook Pro subscription unlocks every guide as it launches ~ no extra cost.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                emoji: "🇪🇸",
                title: "Spain DNV Playbook",
                tagline: "The complete visa system ~ available now",
                accent: "#e3a99c",
                bg: "#f2d6c9",
                available: true,
              },
              {
                emoji: "✈️",
                title: "Schengen First Playbook",
                tagline: "Get your Schengen visa before Spain",
                accent: "#bbcccd",
                bg: "#e0eaeb",
                available: false,
              },
              {
                emoji: "🗺️",
                title: "Visa Runner's Playbook",
                tagline: "Navigate the 90/180 rule across Europe",
                accent: "#8fa38d",
                bg: "#d4e0d3",
                available: false,
              },
              {
                emoji: "🌞",
                title: "Soft Landing Playbook",
                tagline: "Your first 90 days settled in Spain",
                accent: "#e3a99c",
                bg: "#f2d6c9",
                available: false,
              },
              {
                emoji: "📖",
                title: "DELE A2 Playbook",
                tagline: "Learn Spanish for your citizenship exam",
                accent: "#7a8f90",
                bg: "#e0eaeb",
                available: false,
              },
              {
                emoji: "🏆",
                title: "Spanish Passport Playbook",
                tagline: "The 2-year fast track to EU citizenship",
                accent: "#c9a84c",
                bg: "#f5ecd7",
                available: false,
              },
            ].map((book, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#f9f5f2] border border-[#e7ddd3] hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                  style={{ backgroundColor: book.bg }}
                >
                  {book.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-[family-name:var(--font-heading)] text-sm font-bold text-[#3a3a3a] truncate">
                      {book.title}
                    </h4>
                    {book.available ? (
                      <span className="flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8fa38d]/15 text-[#8fa38d]">
                        LIVE
                      </span>
                    ) : (
                      <span className="flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e3a99c]/15 text-[#e3a99c]">
                        SOON
                      </span>
                    )}
                  </div>
                  <p className="font-[family-name:var(--font-body)] text-xs text-[#6b6b6b]">
                    {book.tagline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] mb-5">
            Start your 14-day free trial ~ explore every phase before you pay a cent.
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#3a3a3a] text-white font-bold hover:bg-[#e3a99c] transition-all duration-300 shadow-lg hover:shadow-[#e3a99c]/20 transform hover:-translate-y-1"
          >
            See Pricing
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
