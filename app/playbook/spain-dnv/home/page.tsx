"use client";

import { CheckCircle, Globe, Instagram, Youtube, Linkedin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { phases, playbookMeta, totalLessons } from "../data";

export default function PlaybookHome() {
  return (
    <div className="flex w-full h-full bg-white text-[#37352f] font-sans">
      <div className="flex-1 px-[calc(min(64px,5vw))] lg:px-12 py-6">
        <div className="max-w-[840px] pl-0 lg:pl-10 mx-auto w-full pb-24">

          {/* Cover Image */}
          <div className="rounded-xl overflow-hidden border border-[#EAE9E9] mb-10">
            <Image
              src="https://res.cloudinary.com/dg1i3ew9w/image/upload/v1773164761/AbieMaxey_s_Website_Spain_Digital_hoaw2f.png"
              alt="Spain Digital Nomad Visa Playbook"
              width={840}
              height={400}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Hero */}
          <div className="mb-10 border-b border-[#EAE9E9] pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-1 text-[12px] font-semibold bg-[#37352f] text-white rounded-full">
                {playbookMeta.badge}
              </span>
              <span className="text-[12px] text-[#787774] font-medium">
                {playbookMeta.updatedLabel}
              </span>
            </div>
            <h1 className="text-[40px] leading-[1.1] font-bold text-[#37352f] tracking-tight mb-4">
              {playbookMeta.heroTitle}
            </h1>
            <p className="text-[18px] leading-[1.6] text-[#787774] font-medium">
              {playbookMeta.heroDescription}
            </p>
            <div className="flex items-center gap-4 mt-5 text-[14px] text-[#787774]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {playbookMeta.totalTime} total
              </span>
              <span>{totalLessons} lessons</span>
              <span>{phases.length} phases</span>
            </div>
          </div>

          {/* Author */}
          <div className="mb-12 flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <div className="w-16 h-16 rounded-full flex-shrink-0 overflow-hidden border border-[#EAE9E9]">
              <Image
                src="https://res.cloudinary.com/dg1i3ew9w/image/upload/v1773164922/avatar_v3grgg.png"
                alt="Abie Maxey Gamao"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-[22px] font-semibold text-[#37352f] mb-1">
                Abie Maxey Gamao (Abz)
              </h2>
              <p className="text-[15px] text-[#787774] mb-3">
                Systems engineer, content creator, and DNV holder based in Spain.
              </p>
              <div className="flex flex-wrap gap-3 text-[#787774]">
                <Globe className="w-4 h-4 cursor-pointer hover:text-[#37352f] transition-colors" />
                <Instagram className="w-4 h-4 cursor-pointer hover:text-[#37352f] transition-colors" />
                <Youtube className="w-4 h-4 cursor-pointer hover:text-[#37352f] transition-colors" />
                <Linkedin className="w-4 h-4 cursor-pointer hover:text-[#37352f] transition-colors" />
              </div>
            </div>
          </div>

          {/* What this playbook covers */}
          <div className="bg-[#f7f7f5] rounded-xl p-8 border border-[#EAE9E9] mb-12">
            <h3 className="text-[18px] font-semibold text-[#37352f] mb-4">
              What this playbook covers
            </h3>
            <ul className="space-y-2.5">
              {playbookMeta.modalFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#2383e2] mt-0.5 shrink-0" />
                  <span className="text-[15px] text-[#37352f]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Phases overview */}
          <div className="space-y-4">
            <h2 className="text-[28px] font-bold text-[#37352f] tracking-tight">
              Playbook Roadmap
            </h2>

            {phases.map((phase) => {
              const firstLesson = parseInt(phase.lessons[0]?.number ?? "1");
              return (
                <div
                  key={phase.id}
                  className="rounded-xl border border-[#EAE9E9] overflow-hidden"
                  style={{ borderLeft: `4px solid ${phase.accent}` }}
                >
                  <div className="p-6 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                          style={{ color: phase.accent, backgroundColor: phase.bg }}
                        >
                          {phase.phase}
                        </span>
                        <span className="text-[12px] text-[#787774]">
                          {phase.lessons.length} lessons
                        </span>
                      </div>
                      <h3 className="text-[18px] font-bold text-[#37352f] mb-1">
                        {phase.title}
                      </h3>
                      <p className="text-[14px] text-[#787774] leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                    <Link
                      href={`/playbook/spain-dnv/lessons/lesson-${firstLesson}`}
                      className="flex items-center gap-1.5 text-[13px] font-medium text-[#2383e2] hover:underline flex-shrink-0"
                    >
                      Start
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Final CTA */}
          <div className="mt-16 bg-[#37352f] rounded-xl p-8 text-center">
            <h3 className="text-[22px] font-bold text-white mb-2">
              {playbookMeta.finalCtaTitle}
            </h3>
            <p className="text-[15px] text-white/70 mb-6">
              {playbookMeta.finalCtaDescription}
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#37352f] rounded-lg text-[14px] font-semibold hover:bg-[#f7f7f5] transition-colors"
            >
              Book a Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
