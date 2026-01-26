"use client";

import { MapPin, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-hero noise-overlay" />

      {/* Decorative Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#bbcccd]/30 blob-1 animate-float" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-[#e3a99c]/20 blob-2 animate-float-delayed" />
      <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-[#f2d6c9]/40 rounded-full animate-pulse-soft" />
      <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-[#e7ddd3]/50 blob-1 animate-float" />

      {/* Sparkle decorations */}
      <Sparkles className="absolute top-32 right-1/4 w-6 h-6 text-[#e3a99c]/60 animate-sparkle" />
      <Sparkles className="absolute bottom-48 left-1/3 w-4 h-4 text-[#bbcccd]/60 animate-sparkle delay-500" />

      {/* Palm tree silhouette decoration */}
      <svg
        className="absolute bottom-0 left-0 w-48 h-64 text-[#bbcccd]/20 animate-wave"
        viewBox="0 0 100 150"
        fill="currentColor"
      >
        <path d="M50 150 L48 80 Q30 60 10 70 Q25 55 45 60 Q30 40 15 45 Q35 35 50 50 Q65 35 85 45 Q70 40 55 60 Q75 55 90 70 Q70 60 52 80 L50 150Z" />
      </svg>

      <svg
        className="absolute bottom-0 right-0 w-40 h-56 text-[#e3a99c]/15 animate-wave delay-300"
        viewBox="0 0 100 150"
        fill="currentColor"
      >
        <path d="M50 150 L48 80 Q30 60 10 70 Q25 55 45 60 Q30 40 15 45 Q35 35 50 50 Q65 35 85 45 Q70 40 55 60 Q75 55 90 70 Q70 60 52 80 L50 150Z" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#e7ddd3] mb-8 animate-slide-up">
          <span className="w-2 h-2 rounded-full bg-[#e3a99c] animate-pulse" />
          <span className="font-[family-name:var(--font-body)] text-sm text-[#3a3a3a]">
            Your Gateway to Global Remote Work
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-[#3a3a3a] leading-[1.1] mb-6 animate-slide-up delay-100">
          Work From{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-[#e3a99c]">Anywhere</span>
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-[#f2d6c9]"
              viewBox="0 0 200 12"
              preserveAspectRatio="none"
            >
              <path
                d="M0 8 Q50 0, 100 8 T200 8"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <br />
          <span className="italic font-medium">Live Everywhere</span>
        </h1>

        {/* Subheading */}
        <p className="font-[family-name:var(--font-body)] text-lg md:text-xl text-[#6b6b6b] max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up delay-200">
          Expert visa consulting for digital nomads. We navigate the
          complexities of international work permits so you can focus on what
          matters —
          <span className="text-[#3a3a3a] font-medium">
            {" "}
            living your adventure
          </span>
          .
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up delay-300">
          <a
            href="#contact"
            className="btn-primary text-base px-8 py-4 inline-flex items-center gap-3"
          >
            <span>Book Free Consultation</span>
            <svg
              className="w-5 h-5"
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
          </a>
          <a
            href="#services"
            className="btn-secondary text-base px-8 py-4 inline-flex items-center gap-2"
          >
            <span>Explore Services</span>
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto animate-slide-up delay-400">
          {[
            { number: "50+", label: "Countries Covered" },
            { number: "2,500+", label: "Happy Nomads" },
            { number: "98%", label: "Success Rate" },
            { number: "24/7", label: "Support Available" },
          ].map((stat, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 hover:bg-white/80 hover:shadow-lg transition-all duration-300"
            >
              <p className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[#e3a99c] group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </p>
              <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-600">
          <span className="font-[family-name:var(--font-body)] text-xs text-[#6b6b6b] tracking-widest uppercase">
            Scroll to explore
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-[#e3a99c]/50 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-[#e3a99c] animate-bounce" />
          </div>
        </div>
      </div>

      {/* Floating Location Pins */}
      <div className="absolute top-1/3 left-10 md:left-20 hidden lg:block animate-float">
        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 shadow-lg">
          <MapPin className="w-4 h-4 text-[#e3a99c]" />
          <span className="font-[family-name:var(--font-body)] text-xs text-[#3a3a3a]">
            Portugal
          </span>
        </div>
      </div>

      <div className="absolute top-1/2 right-10 md:right-24 hidden lg:block animate-float-delayed">
        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 shadow-lg">
          <MapPin className="w-4 h-4 text-[#bbcccd]" />
          <span className="font-[family-name:var(--font-body)] text-xs text-[#3a3a3a]">
            Spain
          </span>
        </div>
      </div>

      <div className="absolute bottom-1/3 left-16 md:left-32 hidden lg:block animate-float">
        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 shadow-lg">
          <MapPin className="w-4 h-4 text-[#f2d6c9]" />
          <span className="font-[family-name:var(--font-body)] text-xs text-[#3a3a3a]">
            Thailand
          </span>
        </div>
      </div>
    </section>
  );
}
