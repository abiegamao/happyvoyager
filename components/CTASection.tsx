"use client";

import { Plane, Mail, Calendar } from "lucide-react";

export default function CTASection() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f2d6c9] via-[#e7ddd3] to-[#bbcccd]/50" />

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 blob-1 animate-float" />
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/20 blob-2 animate-float-delayed" />
      <div className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-[#e3a99c]/40" />
      <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-[#bbcccd]/50" />

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <pattern
            id="cta-pattern"
            width="5"
            height="5"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2.5" cy="2.5" r="1" fill="currentColor" />
          </pattern>
          <rect width="100" height="100" fill="url(#cta-pattern)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 mb-8">
            <Plane className="w-4 h-4 text-[#e3a99c] transform -rotate-45" />
            <span className="font-[family-name:var(--font-body)] text-sm text-[#3a3a3a]">
              Your Journey Starts Here
            </span>
          </div>

          {/* Main heading */}
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-semibold text-[#3a3a3a] mb-6">
            Ready to Embrace
            <br />
            <span className="italic text-[#e3a99c]">Location Freedom?</span>
          </h2>

          <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] max-w-2xl mx-auto mb-12">
            Take the first step towards your digital nomad lifestyle. Book a
            free 30-minute consultation and discover your visa options.
          </p>

          {/* CTA Form */}
          <div className="max-w-lg mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <form className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-5 py-4 rounded-xl bg-[#f9f5f2] border border-[#e7ddd3] font-[family-name:var(--font-body)] text-[#3a3a3a] placeholder:text-[#6b6b6b]/60 focus:outline-none focus:border-[#e3a99c] transition-colors"
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-5 py-4 rounded-xl bg-[#f9f5f2] border border-[#e7ddd3] font-[family-name:var(--font-body)] text-[#3a3a3a] placeholder:text-[#6b6b6b]/60 focus:outline-none focus:border-[#e3a99c] transition-colors"
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b6b]/40" />
                </div>
                <div className="relative">
                  <select
                    className="w-full px-5 py-4 rounded-xl bg-[#f9f5f2] border border-[#e7ddd3] font-[family-name:var(--font-body)] text-[#3a3a3a] focus:outline-none focus:border-[#e3a99c] transition-colors appearance-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Interested Destination
                    </option>
                    <option value="portugal">Portugal</option>
                    <option value="spain">Spain</option>
                    <option value="thailand">Thailand</option>
                    <option value="croatia">Croatia</option>
                    <option value="indonesia">Indonesia</option>
                    <option value="other">Not Sure Yet</option>
                  </select>
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b6b]/40 pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#e3a99c] to-[#d69586] text-white font-[family-name:var(--font-body)] font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Free Consultation</span>
                </button>
              </form>

              <p className="font-[family-name:var(--font-body)] text-xs text-[#6b6b6b] mt-4 text-center">
                By submitting, you agree to our{" "}
                <a href="#" className="text-[#e3a99c] hover:underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#e3a99c] hover:underline">
                  Terms of Service
                </a>
              </p>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["SC", "JM", "YT", "MW"].map((initials, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e3a99c] to-[#f2d6c9] flex items-center justify-center text-white text-xs font-medium border-2 border-white"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <span className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b]">
                Joined this week
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-[#e3a99c]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b]">
                No commitment required
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-[#e3a99c]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b]">
                Response within 24h
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
