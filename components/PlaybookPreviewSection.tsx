"use client";

import {
  HelpCircle,
  FileText,
  Globe,
  Search,
  ShieldAlert,
  File,
  Sparkles,
  Link as LinkIcon,
  MessageCircle,
  Bot,
} from "lucide-react";

const mainFeatures = [
  {
    icon: HelpCircle,
    title: "What's this visa about & do I qualify?",
    description:
      "Understand eligibility requirements, income thresholds, and who this visa is perfect for.",
  },
  {
    icon: FileText,
    title: "What documents to submit?",
    description:
      "Complete list of required documents with exactly what to include in each one.",
  },
  {
    icon: Globe,
    title: "Where and how to apply via UGE?",
    description:
      "Step-by-step walkthrough of the UGE portal, with screenshots and tips.",
  },
  {
    icon: Search,
    title: "How to track your application?",
    description:
      "Monitor your visa status and know exactly what to expect at each stage.",
  },
];

const bonuses = [
  {
    icon: ShieldAlert,
    text: "Avoid common rejection mistakes",
  },
  {
    icon: File,
    text: "FREE templates included",
  },
  {
    icon: Sparkles,
    text: "Which documents to apostille/translate",
  },
  {
    icon: LinkIcon,
    text: "Working UGE links (Spain is notorious for broken links!)",
  },
];

import { useState } from "react";
import PlaybookAccessModal from "./PlaybookAccessModal";

export default function PlaybookPreviewSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="section-padding bg-[#f9f5f2] relative overflow-hidden">
      <PlaybookAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/30 border border-[#f2d6c9] mb-8">
            <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
              Inside the Playbook
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-[#3a3a3a] mb-6 leading-tight">
            Everything I Learned,<br />
            Packaged for You
          </h2>

          <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] leading-relaxed mb-8">
            Not just a visa guide ~ a complete system that takes you from &ldquo;should I move to Spain?&rdquo;
            all the way to Spanish citizenship. 6 phases, 24 lessons, zero guesswork.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
          {mainFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#e7ddd3]/50 flex gap-4 md:gap-6 items-start"
            >
              <div className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#f2d6c9]/30 flex items-center justify-center text-[#e3a99c]">
                <feature.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-[family-name:var(--font-heading)] text-base md:text-lg font-bold text-[#3a3a3a] mb-2">
                  {feature.title}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* AI Guide Highlight */}
        <div className="relative rounded-[2.5rem] p-8 md:p-12 mb-8 bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a] text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#e3a99c]/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#8fa38d]/10 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left ~ icon + text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
                <Bot className="w-4 h-4 text-[#e3a99c]" />
                <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
                  AI-Powered
                </span>
              </div>

              <h3 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Your AI guide inside{" "}
                <span className="font-script text-[#e3a99c] text-4xl md:text-5xl relative inline-block transform -rotate-1">
                  every lesson
                </span>
              </h3>

              <p className="font-[family-name:var(--font-body)] text-[#e7ddd3] leading-relaxed max-w-lg">
                Stuck on a step? Ask Abie ~ your AI assistant trained on the entire playbook.
                Get instant answers about eligibility, documents, timelines, and next steps
                without leaving the lesson.
              </p>
            </div>

            {/* Right ~ mock chat */}
            <div className="w-full max-w-sm flex-shrink-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-5 space-y-3">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="bg-[#e3a99c] rounded-2xl rounded-br-md px-4 py-2.5 max-w-[85%]">
                    <p className="text-sm font-medium text-white">
                      Do I need to apostille my degree if it&apos;s from the Philippines?
                    </p>
                  </div>
                </div>
                {/* AI response */}
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#e3a99c]/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <MessageCircle className="w-3.5 h-3.5 text-[#e3a99c]" />
                  </div>
                  <div className="bg-white/10 rounded-2xl rounded-bl-md px-4 py-2.5">
                    <p className="text-sm text-[#e7ddd3] leading-relaxed">
                      Yes! Philippine degrees need apostille via DFA, then
                      sworn translation to Spanish. Phase 1, Lesson 5 walks
                      you through it step by step.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs text-white/40 mt-3">
                Available 24/7 inside every Playbook Pro lesson
              </p>
            </div>
          </div>
        </div>

        {/* Bonuses Section */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-[#e7ddd3]/50 text-center">
          <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#3a3a3a] mb-12">
            Bonuses I Packed In
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bonuses.map((bonus, index) => (
              <div key={index} className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#e3a99c]/20 flex items-center justify-center text-[#e3a99c]">
                  <bonus.icon className="w-6 h-6" />
                </div>
                <p className="font-[family-name:var(--font-body)] text-sm font-medium text-[#3a3a3a] max-w-[200px]">
                  {bonus.text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
