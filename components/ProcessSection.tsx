"use client";

import {
  MessageSquare,
  FileText,
  Send,
  CheckCircle,
  Plane,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Free Consultation",
    description:
      "Schedule a call to discuss your goals, timeline, and ideal destinations. We'll assess your eligibility and recommend the best visa options.",
    color: "#e3a99c",
  },
  {
    number: "02",
    icon: FileText,
    title: "Document Preparation",
    description:
      "We provide a personalized checklist and guide you through gathering all required documents. Our team reviews everything for accuracy.",
    color: "#bbcccd",
  },
  {
    number: "03",
    icon: Send,
    title: "Application Submission",
    description:
      "We handle the entire submission process, communicate with embassies on your behalf, and keep you updated on progress.",
    color: "#f2d6c9",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Approval & Beyond",
    description:
      "Celebrate your approval! We continue to support you with arrival procedures, local registration, and ongoing compliance.",
    color: "#e7ddd3",
  },
];

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="section-padding relative overflow-hidden bg-gradient-to-b from-white to-[#f9f5f2]"
    >
      {/* Decorative background elements */}
      <div className="absolute top-40 left-10 w-64 h-64 bg-[#f2d6c9]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#bbcccd]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block font-[family-name:var(--font-body)] text-sm tracking-[0.2em] text-[#e3a99c] uppercase mb-4">
            How It Works
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-semibold text-[#3a3a3a] mb-6">
            Your Journey to
            <br />
            <span className="italic text-[#e3a99c]">Freedom</span> in 4 Steps
          </h2>
          <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] max-w-2xl mx-auto">
            We&apos;ve simplified the complex visa process into a clear,
            stress-free journey. Here&apos;s what to expect.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#e3a99c] via-[#bbcccd] to-[#f2d6c9]" />

          {/* Steps grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Step card */}
                <div className="relative p-8 rounded-3xl bg-white border border-[#e7ddd3]/50 shadow-sm hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                  {/* Number badge */}
                  <div
                    className="absolute -top-4 left-8 w-16 h-8 rounded-full flex items-center justify-center text-white font-[family-name:var(--font-heading)] text-sm font-semibold shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}dd 100%)`,
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mt-4 transition-transform group-hover:scale-110 group-hover:rotate-3"
                    style={{ backgroundColor: `${step.color}20` }}
                  >
                    <step.icon
                      className="w-8 h-8"
                      style={{ color: step.color }}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#3a3a3a] mb-3">
                    {step.title}
                  </h3>
                  <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed text-sm">
                    {step.description}
                  </p>

                  {/* Arrow decoration */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                      <svg
                        className="w-8 h-8 text-[#e7ddd3]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Decorative dot on timeline - desktop */}
                <div
                  className="hidden lg:block absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-md"
                  style={{ backgroundColor: step.color }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom visual */}
        <div className="mt-20 relative">
          <div className="bg-gradient-to-r from-[#f2d6c9] via-[#e7ddd3] to-[#bbcccd] rounded-3xl p-8 md:p-12 overflow-hidden">
            {/* Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <pattern
                  id="process-pattern"
                  width="8"
                  height="8"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="4" cy="4" r="1.5" fill="currentColor" />
                </pattern>
                <rect width="100" height="100" fill="url(#process-pattern)" />
              </svg>
            </div>

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-semibold text-[#3a3a3a] mb-3">
                  Ready to Start Your Nomad Journey?
                </h3>
                <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] max-w-xl">
                  Book your free consultation today and take the first step
                  towards location independence.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="#contact"
                  className="btn-primary inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <span>Book Free Call</span>
                  <Plane className="w-4 h-4 transform -rotate-45" />
                </a>
                <span className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b]">
                  30-min consultation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
