"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Wallet,
  Sun,
} from "lucide-react";

const destinations = [
  {
    country: "Portugal",
    city: "Lisbon",
    image: "linear-gradient(135deg, #f2d6c9 0%, #e3a99c 50%, #bbcccd 100%)",
    visa: "D7 Visa / Digital Nomad Visa",
    duration: "1-2 years renewable",
    cost: "€3,040 min. income/month",
    climate: "Mediterranean",
    highlights: [
      "No tax on foreign income for 10 years",
      "Gateway to EU",
      "Strong nomad community",
    ],
    flag: "🇵🇹",
  },
  {
    country: "Spain",
    city: "Barcelona",
    image: "linear-gradient(135deg, #e7ddd3 0%, #f2d6c9 50%, #e3a99c 100%)",
    visa: "Digital Nomad Visa",
    duration: "3 years renewable",
    cost: "€2,646 min. income/month",
    climate: "Mediterranean",
    highlights: [
      "24% flat tax rate",
      "Access to Schengen",
      "World-class healthcare",
    ],
    flag: "🇪🇸",
  },
  {
    country: "Thailand",
    city: "Bangkok",
    image: "linear-gradient(135deg, #bbcccd 0%, #e7ddd3 50%, #f2d6c9 100%)",
    visa: "Long-Term Resident Visa",
    duration: "5-10 years",
    cost: "$80,000 annual income",
    climate: "Tropical",
    highlights: [
      "Low cost of living",
      "Amazing food scene",
      "Digital infrastructure",
    ],
    flag: "🇹🇭",
  },
  {
    country: "Croatia",
    city: "Dubrovnik",
    image: "linear-gradient(135deg, #e3a99c 0%, #bbcccd 50%, #e7ddd3 100%)",
    visa: "Digital Nomad Permit",
    duration: "1 year",
    cost: "€2,539 min. income/month",
    climate: "Mediterranean",
    highlights: [
      "Tax-free for nomads",
      "Stunning coastline",
      "EU candidate country",
    ],
    flag: "🇭🇷",
  },
  {
    country: "Indonesia",
    city: "Bali",
    image: "linear-gradient(135deg, #f2d6c9 0%, #bbcccd 50%, #e3a99c 100%)",
    visa: "Second Home Visa",
    duration: "5-10 years",
    cost: "$130,000 in savings",
    climate: "Tropical",
    highlights: ["Affordable living", "Vibrant culture", "Co-working paradise"],
    flag: "🇮🇩",
  },
];

export default function DestinationsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + destinations.length) % destinations.length,
    );
  };

  return (
    <section
      id="destinations"
      className="section-padding relative overflow-hidden bg-white"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <pattern id="dots" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.5" fill="currentColor" />
          </pattern>
          <rect width="100" height="100" fill="url(#dots)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-[family-name:var(--font-body)] text-sm tracking-[0.2em] text-[#e3a99c] uppercase mb-4">
            Popular Destinations
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-semibold text-[#3a3a3a] mb-6">
            Where Will Your
            <br />
            <span className="italic text-[#e3a99c]">Adventure Begin?</span>
          </h2>
          <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] max-w-2xl mx-auto">
            Explore some of the most popular destinations for digital nomads,
            each offering unique visa programs and lifestyle benefits.
          </p>
        </div>

        {/* Destinations Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#f2d6c9] transition-colors group"
          >
            <ChevronLeft className="w-6 h-6 text-[#3a3a3a] group-hover:text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#e3a99c] transition-colors group"
          >
            <ChevronRight className="w-6 h-6 text-[#3a3a3a] group-hover:text-white" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden px-4">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {destinations.map((dest, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Image Side */}
                    <div className="relative group">
                      <div
                        className="aspect-[4/3] rounded-3xl overflow-hidden"
                        style={{ background: dest.image }}
                      >
                        {/* Overlay content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white">
                          <span className="text-5xl mb-2 block">
                            {dest.flag}
                          </span>
                          <h3 className="font-[family-name:var(--font-heading)] text-3xl font-semibold">
                            {dest.city}
                          </h3>
                          <p className="font-[family-name:var(--font-body)] text-white/80">
                            {dest.country}
                          </p>
                        </div>

                        {/* Floating elements */}
                        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                          <span className="font-[family-name:var(--font-body)] text-sm text-[#3a3a3a] font-medium">
                            {dest.visa}
                          </span>
                        </div>
                      </div>

                      {/* Decorative element */}
                      <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-[#f2d6c9]/30 -z-10" />
                    </div>

                    {/* Content Side */}
                    <div className="space-y-6">
                      <div className="space-y-4">
                        {/* Info items */}
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f9f5f2] group hover:bg-[#f2d6c9]/20 transition-colors">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                            <Clock className="w-5 h-5 text-[#e3a99c]" />
                          </div>
                          <div>
                            <p className="font-[family-name:var(--font-body)] text-xs text-[#6b6b6b] uppercase tracking-wider">
                              Duration
                            </p>
                            <p className="font-[family-name:var(--font-heading)] text-lg text-[#3a3a3a]">
                              {dest.duration}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f9f5f2] group hover:bg-[#bbcccd]/20 transition-colors">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                            <Wallet className="w-5 h-5 text-[#bbcccd]" />
                          </div>
                          <div>
                            <p className="font-[family-name:var(--font-body)] text-xs text-[#6b6b6b] uppercase tracking-wider">
                              Income Requirement
                            </p>
                            <p className="font-[family-name:var(--font-heading)] text-lg text-[#3a3a3a]">
                              {dest.cost}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f9f5f2] group hover:bg-[#e7ddd3]/30 transition-colors">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                            <Sun className="w-5 h-5 text-[#f2d6c9]" />
                          </div>
                          <div>
                            <p className="font-[family-name:var(--font-body)] text-xs text-[#6b6b6b] uppercase tracking-wider">
                              Climate
                            </p>
                            <p className="font-[family-name:var(--font-heading)] text-lg text-[#3a3a3a]">
                              {dest.climate}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div>
                        <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] uppercase tracking-wider mb-3">
                          Key Benefits
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {dest.highlights.map((highlight, i) => (
                            <span
                              key={i}
                              className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#e3a99c]/10 to-[#bbcccd]/10 border border-[#e7ddd3] font-[family-name:var(--font-body)] text-sm text-[#3a3a3a]"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <a
                        href="#contact"
                        className="btn-primary inline-flex items-center gap-2"
                      >
                        <span>Apply for {dest.country}</span>
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
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {destinations.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-[#e3a99c]"
                    : "w-2 bg-[#e7ddd3] hover:bg-[#f2d6c9]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* View all destinations */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="font-[family-name:var(--font-body)] text-[#e3a99c] hover:text-[#d69586] transition-colors inline-flex items-center gap-2"
          >
            <span>View all 50+ destinations</span>
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
