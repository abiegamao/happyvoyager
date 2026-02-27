"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Designer",
    location: "From USA → Portugal",
    content:
      "Abie made my dream of working from Lisbon a reality. She guided me through every step of the D7 visa process with such patience. Within 4 months, I was sipping coffee at a café in Alfama!",
    avatar: "SC",
    rating: 5,
    color: "#e3a99c",
  },
  {
    name: "James Morrison",
    role: "Software Developer",
    location: "From UK → Spain",
    content:
      "I was overwhelmed by the Spanish visa requirements until I found Abie. She not only handled my application flawlessly but also connected me with a local accountant for tax setup.",
    avatar: "JM",
    rating: 5,
    color: "#bbcccd",
  },
  {
    name: "Yuki Tanaka",
    role: "Content Creator",
    location: "From Japan → Thailand",
    content:
      "Abie's knowledge of Southeast Asian visa options is incredible. She helped me choose between different visa types and navigate the Thai LTR process. Her weak passport experience resonated!",
    avatar: "YT",
    rating: 5,
    color: "#f2d6c9",
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
      className="section-padding relative overflow-hidden bg-[#3a3a3a] text-white"
    >
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#e3a99c]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#bbcccd]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Header Content */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
              <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
                Field Reports
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl font-bold mb-8 leading-tight">
              What Nomads <br />
              <span className="font-script text-[#f2d6c9] text-6xl md:text-7xl relative inline-block transform -rotate-2 mt-2">
                Are Saying
              </span>
            </h2>

            <p className="text-lg text-white/70 max-w-md leading-relaxed mb-8">
              Real people who used my playbooks and systems to get their visas
              approved. No fluff, just results.
            </p>

            <div className="flex gap-8">
              <div>
                <h4 className="text-3xl font-bold text-white mb-1">98%</h4>
                <p className="text-sm text-white/50 uppercase tracking-wider">Approval Rate</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-white mb-1">50+</h4>
                <p className="text-sm text-white/50 uppercase tracking-wider">Countries</p>
              </div>
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="relative">
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-12 rounded-[3rem] shadow-2xl">
              {/* Quote Icon */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#e3a99c] rounded-full flex items-center justify-center shadow-lg transform rotate-12">
                <Quote className="w-10 h-10 text-[#3a3a3a]" fill="#3a3a3a" />
              </div>

              <div className="mb-8">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="w-5 h-5 text-[#e3a99c]" fill="#e3a99c" />
                  ))}
                </div>
                <p className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-medium leading-relaxed italic text-white/90">
                  &quot;{testimonials[activeIndex].content}&quot;
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-[#3a3a3a]"
                  style={{ background: testimonials[activeIndex].color }}
                >
                  {testimonials[activeIndex].avatar}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{testimonials[activeIndex].name}</h4>
                  <p className="text-sm text-white/60">{testimonials[activeIndex].role}</p>
                  <p className="text-xs text-[#e3a99c] font-bold uppercase tracking-wide mt-1">{testimonials[activeIndex].location}</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-4 mt-8 pt-8 border-t border-white/10 justify-end">
                <button onClick={prevTestimonial} className="p-3 rounded-full hover:bg-white/10 transition-colors border border-white/20">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={nextTestimonial} className="p-3 rounded-full hover:bg-white/10 transition-colors border border-white/20">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
