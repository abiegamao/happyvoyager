"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Designer",
    location: "From USA → Portugal",
    content:
      "Abie made my dream of working from Lisbon a reality. She guided me through every step of the D7 visa process with such patience and expertise. Within 4 months, I was sipping coffee at a café in Alfama while attending my morning standup!",
    avatar: "SC",
    rating: 5,
    color: "#e3a99c",
  },
  {
    name: "James Morrison",
    role: "Software Developer",
    location: "From UK → Spain",
    content:
      "I was overwhelmed by the Spanish visa requirements until I found Abie. She not only handled my application flawlessly but also connected me with a local accountant for tax setup. Her personal touch made all the difference.",
    avatar: "JM",
    rating: 5,
    color: "#bbcccd",
  },
  {
    name: "Yuki Tanaka",
    role: "Content Creator",
    location: "From Japan → Thailand",
    content:
      "Abie's knowledge of Southeast Asian visa options is incredible. She helped me choose between different visa types and navigate the Thai LTR visa process. Her weak passport experience really resonated with me!",
    avatar: "YT",
    rating: 5,
    color: "#f2d6c9",
  },
  {
    name: "Marcus Weber",
    role: "Freelance Writer",
    location: "From Germany → Croatia",
    content:
      "As a freelancer, I needed specific advice on tax implications. Abie not only secured my Croatian digital nomad visa but also provided crucial guidance on maintaining compliance. Her playbooks are incredibly detailed!",
    avatar: "MW",
    rating: 5,
    color: "#e7ddd3",
  },
  {
    name: "Priya Sharma",
    role: "UX Researcher",
    location: "From India → Portugal",
    content:
      "Having a weak passport myself, I instantly connected with Abie's story. She understood my challenges and created a clear roadmap for my Portugal visa. Her responsiveness and expertise gave me complete peace of mind.",
    avatar: "PS",
    rating: 5,
    color: "#e3a99c",
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section
      id="testimonials"
      className="section-padding relative overflow-hidden bg-[#3a3a3a]"
    >


      {/* Decorative shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-[#e3a99c]/10 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#bbcccd]/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-[family-name:var(--font-body)] text-sm tracking-[0.2em] text-[#e3a99c] uppercase mb-4">
            Success Stories
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6">
            From Our Happy
            <br />
            <span className="italic text-[#f2d6c9]">Voyagers</span>
          </h2>
          <p className="font-[family-name:var(--font-body)] text-lg text-white/60 max-w-2xl mx-auto">
            Join hundreds of digital nomads who&apos;ve successfully
            transitioned to location-independent living with my help.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Main testimonial card */}
          <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
            {/* Quote icon */}
            <div className="absolute -top-6 left-12">
              <div className="w-12 h-12 rounded-full bg-[#e3a99c] flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Avatar column */}
              <div className="flex flex-col items-center md:items-start">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-[family-name:var(--font-heading)] font-bold text-white mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${testimonials[activeIndex].color} 0%, ${testimonials[activeIndex].color}aa 100%)`,
                  }}
                >
                  {testimonials[activeIndex].avatar}
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-white text-center md:text-left">
                  {testimonials[activeIndex].name}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-white/60 text-sm">
                  {testimonials[activeIndex].role}
                </p>
                <p className="font-[family-name:var(--font-body)] text-[#e3a99c] text-sm mt-1">
                  {testimonials[activeIndex].location}
                </p>

                {/* Rating */}
                <div className="flex gap-1 mt-4">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-[#e3a99c]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Content column */}
              <div className="md:col-span-2">
                <p className="font-[family-name:var(--font-body)] text-lg md:text-xl text-white/80 leading-relaxed italic">
                  &quot;{testimonials[activeIndex].content}&quot;
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/10">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-8 bg-[#e3a99c]"
                        : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-16 text-center">
          <p className="font-[family-name:var(--font-body)] text-white/40 text-sm mb-6 uppercase tracking-wider">
            Trusted by nomads worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {[
              "2,500+ Successful Applications",
              "50+ Countries",
              "4.9/5 Average Rating",
              "24/7 Support",
            ].map((badge, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#e3a99c]" />
                <span className="font-[family-name:var(--font-body)] text-white/60 text-sm">
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
