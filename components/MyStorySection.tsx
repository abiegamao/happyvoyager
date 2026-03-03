"use client";

import { ArrowRight, Youtube, Instagram, Linkedin, Globe } from "lucide-react";
import Link from "next/link";

export default function MyStorySection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-24 items-center">
          {/* Left Side: Image */}
          <div className="relative order-2 lg:order-1 h-[500px] lg:h-[600px] flex items-center justify-center">
            <div className="relative w-full max-w-md h-full rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src="/assets/story_abie.jpg"
                alt="Abie Maxey"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Floating card badge */}
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
            {/* Decorative blob */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#e3a99c]/20 rounded-full blur-3xl -z-10"></div>
          </div>

          {/* Right Side: Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/30 border border-[#f2d6c9] mb-6">
              <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
                The Origin Story
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-6 leading-tight">
              I studied the rules. Built a system. Got approved.
            </h2>

            <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] mb-4 leading-relaxed">
              I spent two years travelling the world, working remotely as a systems
              engineer and content creator. The freedom was real, but constant
              movement started feeling inefficient. I didn&apos;t want another
              tourist visa. I wanted a solid European base.
            </p>
            <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] mb-4 leading-relaxed">
              So I did what I always do:{" "}
              <span className="font-semibold text-[#3a3a3a]">
                I studied the rules, mapped the process, and built a system.
              </span>{" "}
              No lawyer. No agency. Just clear thinking and the right documents.
            </p>
            <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] mb-8 leading-relaxed">
              What I found was this: more information doesn&apos;t create clarity.
              Good systems do. This playbook is the operating system I wish I had
              when I started, grounded, systemised, and built to get you approved,
              not keep you stuck.{" "}
              <span className="font-semibold text-[#3a3a3a]">Now I&apos;m open-sourcing my system.</span> This is the documentation I wish existed when I started.
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-[#f2d6c9]">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#e3a99c] mb-1">
                  27+
                </div>
                <div className="text-sm text-[#6b6b6b]">Countries Unlocked <br />w/ a weak passport</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#e3a99c] mb-1">
                  99%
                </div>
                <div className="text-sm text-[#6b6b6b]">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#e3a99c] mb-1">
                  €0
                </div>
                <div className="text-sm text-[#6b6b6b]">Lawyer Fees</div>
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
