"use client";

import { Award, Heart, Zap, MessageCircle } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Expert Knowledge",
    description:
      "Our team includes former immigration officers and visa specialists with decades of combined experience.",
  },
  {
    icon: Heart,
    title: "Personalized Approach",
    description:
      "Every nomad is unique. We create custom strategies tailored to your specific situation and goals.",
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description:
      "Our established relationships with embassies and efficient processes mean faster approvals.",
  },
  {
    icon: MessageCircle,
    title: "Ongoing Support",
    description:
      "We don't disappear after approval. Get continued support throughout your nomad journey.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-[#f9f5f2] to-[#e7ddd3]/30">
      {/* Decorative elements */}
      <div className="absolute top-20 left-1/4 w-2 h-2 rounded-full bg-[#e3a99c]" />
      <div className="absolute top-40 right-1/3 w-3 h-3 rounded-full bg-[#bbcccd]" />
      <div className="absolute bottom-32 left-1/3 w-2 h-2 rounded-full bg-[#f2d6c9]" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div>
            <span className="inline-block font-[family-name:var(--font-body)] text-sm tracking-[0.2em] text-[#e3a99c] uppercase mb-4">
              Why Happy Voyager
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-semibold text-[#3a3a3a] mb-6 leading-tight">
              We Make the{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Impossible</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#f2d6c9]/50 -z-0" />
              </span>
              <br />
              <span className="italic text-[#e3a99c]">Possible</span>
            </h2>
            <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] mb-8 leading-relaxed">
              Navigating international visa requirements can feel overwhelming.
              That&apos;s why we&apos;ve built a team of passionate experts who
              understand both the bureaucratic maze and the nomad dream.
            </p>

            {/* Feature list */}
            <div className="space-y-6">
              {reasons.map((reason, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
                    <reason.icon className="w-6 h-6 text-[#e3a99c]" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-[#3a3a3a] mb-1">
                      {reason.title}
                    </h3>
                    <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Visual */}
          <div className="relative">
            {/* Main image placeholder with decorative frame */}
            <div className="relative">
              {/* Background shapes */}
              <div className="absolute -top-8 -left-8 w-full h-full rounded-3xl bg-[#e3a99c]/10 transform rotate-3" />
              <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl bg-[#bbcccd]/20 transform rotate-1" />

              {/* Main content box */}
              <div className="relative rounded-3xl bg-gradient-to-br from-[#f2d6c9] to-[#e7ddd3] p-8 lg:p-12 overflow-hidden">
                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <pattern
                      id="grid"
                      width="10"
                      height="10"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx="5" cy="5" r="1" fill="currentColor" />
                    </pattern>
                    <rect width="100" height="100" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Stats card */}
                <div className="relative bg-white rounded-2xl p-6 shadow-xl mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b]">
                      Success Rate
                    </span>
                    <span className="text-xs text-[#e3a99c] bg-[#e3a99c]/10 px-2 py-1 rounded-full">
                      +12% this year
                    </span>
                  </div>
                  <div className="flex items-end gap-4">
                    <span className="font-[family-name:var(--font-heading)] text-5xl font-bold text-[#3a3a3a]">
                      98%
                    </span>
                    <div className="flex-1 h-16 flex items-end gap-1">
                      {[40, 55, 45, 70, 60, 80, 75, 90, 85, 95, 92, 98].map(
                        (height, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t-sm bg-gradient-to-t from-[#e3a99c] to-[#f2d6c9]"
                            style={{ height: `${height}%` }}
                          />
                        ),
                      )}
                    </div>
                  </div>
                </div>

                {/* Testimonial snippet */}
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#bbcccd] to-[#e7ddd3] flex items-center justify-center">
                      <span className="font-[family-name:var(--font-heading)] text-sm font-semibold text-white">
                        MR
                      </span>
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-heading)] text-sm font-semibold text-[#3a3a3a]">
                        Maria Rodriguez
                      </p>
                      <p className="font-[family-name:var(--font-body)] text-xs text-[#6b6b6b]">
                        Software Engineer
                      </p>
                    </div>
                  </div>
                  <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] italic">
                    &quot;They made my Portugal visa process completely
                    stress-free. Now I&apos;m living my dream in Lisbon!&quot;
                  </p>
                  <div className="flex gap-1 mt-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4 text-[#e3a99c]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#e3a99c] to-[#f2d6c9] flex items-center justify-center">
                    <span className="font-[family-name:var(--font-heading)] text-lg font-bold text-white">
                      5+
                    </span>
                  </div>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-[#6b6b6b] whitespace-nowrap">
                    Years Experience
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
