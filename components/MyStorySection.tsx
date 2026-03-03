"use client";

import { ArrowRight, Globe, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const profile = [
  "🇵🇭 Philippine passport holder",
  "Applied inside Spain via UGE, not through a consulate",
  "100% DIY, legally and intentionally",
  "Fulfilled missing requirements remotely, without flying home",
  "No EU spouse, no company relocation, no shortcuts",
  "Had 10 Schengen days remaining when I applied",
];

export default function MyStorySection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-24 items-center">

          {/* Left Side: Image */}
          <div className="relative order-2 lg:order-1 h-[500px] lg:h-[620px] flex items-center justify-center">
            <div className="relative w-full max-w-md h-full rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src="/assets/story_abie.jpg"
                alt="Abie Maxey"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -top-4 left-4 bg-white p-3 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="bg-[#f2d6c9]/50 p-2 rounded-xl">
                  <Globe className="w-5 h-5 text-[#e3a99c]" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Experience</p>
                  <p className="text-sm font-bold text-[#3a3a3a]">2+ Years Nomading</p>
                </div>
              </div>
            </div>
            {/* Approved badge */}
            <div className="absolute -bottom-4 right-4 bg-white p-3 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="bg-green-50 p-2 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Status</p>
                  <p className="text-sm font-bold text-[#3a3a3a]">DNV Approved 2026</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#e3a99c]/20 rounded-full blur-3xl -z-10" />
          </div>

          {/* Right Side: Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/30 border border-[#f2d6c9] mb-6">
              <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
                The Origin Story
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-6 leading-tight">
              I studied the rules.<br />Built a system. Got approved.
            </h2>

            <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] mb-4 leading-relaxed">
              I tested the EU waters first with a Croatian Digital Nomad Visa, 100% online, no apostilles, approved in under a month. After 8 months exploring the Schengen and Balkan region, I was ready to commit.
            </p>
            <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] mb-6 leading-relaxed">
              Spain was the obvious pick:{" "}
              <span className="font-semibold text-[#3a3a3a]">2-year citizenship path for Filipinos</span>, full EU market access, public healthcare, and long-term stability. I applied via UGE with 10 Schengen days left. No lawyer. No fixer. Just documents, timing, and clarity.
            </p>

            {/* Profile background card */}
            <div className="bg-[#f9f5f2] rounded-2xl border border-[#e7ddd3] p-5 mb-8">
              <p className="text-xs font-bold tracking-widest text-[#7a8f90] uppercase mb-3">My profile when I applied</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {profile.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                    <span className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b]">{item}</span>
                  </div>
                ))}
              </div>
              <p className="font-[family-name:var(--font-body)] text-sm font-semibold text-[#e3a99c] mt-4">
                If that sounds like you, this playbook will benefit you the most.
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-[#f2d6c9]">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#e3a99c] mb-1">27+</div>
                <div className="text-sm text-[#6b6b6b]">Countries visited w/ a Philippine passport</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#e3a99c] mb-1">€0</div>
                <div className="text-sm text-[#6b6b6b]">Lawyer fees</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#e3a99c] mb-1">3yr</div>
                <div className="text-sm text-[#6b6b6b]">EU Residency approved</div>
              </div>
            </div>

            <Link
              href="/my-story"
              className="inline-flex items-center gap-2 text-[#3a3a3a] font-semibold group hover:text-[#e3a99c] transition-colors text-lg"
            >
              Read the Full Origin Story
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
