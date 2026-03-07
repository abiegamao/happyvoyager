"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  Clock,
  Copy,
  Menu,
  BookOpen,
  FileText,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

/* ─── Types ─── */
type ContentBlock =
  | { type: "intro"; text: string }
  | { type: "highlight"; label?: string; items: string[] }
  | { type: "checklist"; label?: string; items: string[] }
  | {
      type: "callout";
      icon: string;
      text: string;
      bgClass?: string;
      borderClass?: string;
    };

type Section = {
  id: string;
  title: string;
  content: ContentBlock[];
};

type Guide = {
  id: string;
  title: string;
  subtitle: string;
  sections: Section[];
};

/* ─── Guide Data ─── */
const guides: Guide[] = [
  {
    id: "whats-this-playbook-about",
    title: "What's this visa about and do I qualify?",
    subtitle: "Get started",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: [
          {
            type: "intro",
            text: "Spain's Digital Nomad Visa (officially \u201CVisado de Teletrabajador\u201D) allows non-EU remote workers to live legally in Spain while working for companies or clients outside Spain. It\u2019s one of Europe\u2019s most attractive options for digital nomads. Introduced in 2023 as part of Spain\u2019s Startup Act, the visa lets non-EU citizens (including UK nationals) live & work remotely in Spain for up to five years.",
          },
        ],
      },
      {
        id: "eligibility",
        title: "Who is eligible?",
        content: [
          {
            type: "highlight",
            label: "Basic Qualifications",
            items: [
              "Age: 18+",
              "Nationality: Non-EU/EEA citizens only",
              "Work Status: Remote employee OR freelancer/entrepreneur",
              "Professional credentials: A university degree (bachelor\u2019s or higher), OR 3+ years documented work experience in your field",
            ],
          },
          {
            type: "highlight",
            label: "Income Requirements (2026)",
            items: [
              "Single applicant: \u20AC2,894/month minimum (gross, before taxes)",
              "With spouse/partner: \u20AC4,017/month minimum",
              "Each additional dependent: Add 25% of base amount",
            ],
          },
          {
            type: "callout",
            icon: "\uD83D\uDCDD",
            text: "Note: These thresholds are tied to Spain\u2019s minimum wage and can increase over time.",
            bgClass: "bg-[#F1F1EF]",
            borderClass: "border-transparent text-[#37352f]",
          },
          {
            type: "checklist",
            label: "Other Requirements",
            items: [
              "Clean criminal record (past 5 years)",
              "Valid passport with at least 12+ months remaining",
              "Private health insurance valid in Spain",
              "Applicant must not have been a resident in Spain in the past 5 years",
            ],
          },
        ],
      },
      {
        id: "work-requirements",
        title: "Work Requirements",
        content: [
          {
            type: "highlight",
            label: "For employees:",
            items: [
              "You must have an employment contract with a company outside Spain",
              "Company must have been operating for 1+ year",
              "You need a letter from your employer confirming remote work permission",
            ],
          },
          {
            type: "highlight",
            label: "For freelancers:",
            items: [
              "At least 80% of your income must come from clients outside Spain",
              "You can work up to 20% for Spanish clients",
              "Your business must be established for 1+ year",
            ],
          },
        ],
      },
      {
        id: "getting-into-spain",
        title: "Getting into Spain",
        content: [
          {
            type: "intro",
            text: "If you use the UGE route (online application via Unit for Large Enterprises & Strategic Collectives), you might need a Schengen visa to enter Spain first (if your nationality requires it).",
          },
          {
            type: "callout",
            icon: "\uD83C\uDF0D",
            text: "FUN FACT: Did you know that you can get a Schengen Visa from any country regardless if you\u2019re just a tourist?\n\nYou just need to prove:\n\u2714 You\u2019re a long-term traveller (been out of your country for more than 6 months+)\nor..\n\u2714 You have an exceptional circumstance. Read more about it here.\n\nI did this twice in the USA \uD83C\uDDFA\uD83C\uDDF8 and Bosnia \uD83C\uDDE7\uD83C\uDDE6 via the Netherlands Embassy. \uD83D\uDC49 Here\u2019s the proof.\n\nI love applying via the Netherlands as they have been really generous. I always get 90-days multiple entry even when I only requested for 2-weeks. I heard you can do this via France Embassy as well. But they tend to give you lesser days than Netherlands.",
            bgClass: "bg-[#EDF3EC]",
            borderClass: "border-[#D1E2CD]",
          },
          {
            type: "intro",
            text: "If you want to apply via Netherlands \uD83C\uDDF3\uD83C\uDDF1 like I did, here\u2019s how to start.",
          },
        ],
      },
    ],
  },
];

/* ─── Page Component ─── */
export default function GuidesPage() {
  const [activeGuideId, setActiveGuideId] = useState(guides[0].id);
  const [activeSection, setActiveSection] = useState<string>("");
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>(
    {},
  );

  const activeGuide = guides.find((g) => g.id === activeGuideId) ?? guides[0];

  // Intersection observer for TOC highlighting
  useEffect(() => {
    setActiveSection(activeGuide.sections[0]?.id ?? "");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "0px 0px -80% 0px" },
    );

    activeGuide.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeGuide]);

  // Load checklist progress
  useEffect(() => {
    const saved = localStorage.getItem(
      `playbook_guide_progress_${activeGuideId}`,
    );
    if (saved) {
      try {
        setCompletedItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse guide progress", e);
      }
    } else {
      setCompletedItems({});
    }
  }, [activeGuideId]);

  const toggleItem = (itemText: string) => {
    const updated = {
      ...completedItems,
      [itemText]: !completedItems[itemText],
    };
    setCompletedItems(updated);
    localStorage.setItem(
      `playbook_guide_progress_${activeGuideId}`,
      JSON.stringify(updated),
    );
  };

  return (
    <div className="flex w-full h-full overflow-hidden">
      {/* ─── Left Sidebar: Guide List ─── */}
      <aside className="hidden md:flex w-[240px] flex-shrink-0 flex-col border-r border-[#EAE9E9] bg-[#FBFBFA] h-full overflow-y-auto">
        <div className="pt-6 pb-20">
          <div className="px-5">
            <div className="px-2 py-1.5 text-xs font-semibold text-[#37352f] uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" />
              Reading Guides
            </div>

            <div className="space-y-0.5">
              {guides.map((guide) => (
                <button
                  key={guide.id}
                  onClick={() => setActiveGuideId(guide.id)}
                  className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded text-left transition-colors group ${
                    activeGuideId === guide.id
                      ? "bg-[#efefed] text-[#37352f]"
                      : "text-[#787774] hover:bg-[#f7f7f5] hover:text-[#37352f]"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 flex-shrink-0 opacity-60" />
                  <span className="text-[13px] font-medium truncate">
                    {guide.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* ─── Scrollable Center + Sticky Right ─── */}
      <div className="flex-1 flex min-w-0 h-full overflow-hidden">
        {/* Main Content — only this scrolls */}
        <div className="flex-1 min-w-0 overflow-y-auto">
          <div className="px-6 lg:px-12 py-6">
            <div className="max-w-[720px] mx-auto">
              {/* Subtitle */}
              <div className="text-[#37352f] font-semibold text-[14px] mb-3">
                {activeGuide.subtitle}
              </div>

              {/* Title */}
              <h1 className="text-[32px] lg:text-[36px] leading-[1.1] font-bold text-[#37352f] tracking-tight mb-3">
                {activeGuide.title}
              </h1>

              {/* Mobile guide selector */}
              <div className="md:hidden mb-6">
                <select
                  value={activeGuideId}
                  onChange={(e) => setActiveGuideId(e.target.value)}
                  className="w-full px-3 py-2 border border-[#EAE9E9] rounded-lg text-sm text-[#37352f] bg-white"
                >
                  {guides.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sections */}
              <div className="space-y-8 mt-8">
                {activeGuide.sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-24"
                  >
                    <h2 className="text-2xl font-semibold text-[#37352f] mb-4 mt-8 tracking-tight">
                      {section.title}
                    </h2>

                    <div className="space-y-4">
                      {section.content.map((block, bIdx) => {
                        if (block.type === "intro") {
                          return (
                            <p
                              key={bIdx}
                              className="text-[#37352f] text-base leading-relaxed"
                            >
                              {block.text}
                            </p>
                          );
                        }

                        if (block.type === "callout") {
                          return (
                            <div
                              key={bIdx}
                              className={`flex items-start gap-3 p-4 rounded ${block.bgClass || "bg-[#f1f1ef]"} border ${block.borderClass || "border-transparent"} my-4`}
                            >
                              <span className="text-xl leading-none flex-shrink-0 mt-0.5">
                                {block.icon}
                              </span>
                              <div className="text-[#37352f] text-[15px] leading-relaxed whitespace-pre-wrap">
                                {block.text}
                              </div>
                            </div>
                          );
                        }

                        if (block.type === "highlight") {
                          return (
                            <div key={bIdx} className="my-4">
                              {block.label && (
                                <h3 className="font-semibold text-[#37352f] text-base mb-2">
                                  {block.label}
                                </h3>
                              )}
                              <ul className="list-disc pl-6 space-y-1">
                                {block.items.map((item, i) => (
                                  <li
                                    key={i}
                                    className="text-[15px] text-[#37352f] leading-relaxed pl-1"
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        }

                        if (block.type === "checklist") {
                          return (
                            <div key={bIdx} className="my-4">
                              {block.label && (
                                <h3 className="font-semibold text-[#37352f] text-base mb-2">
                                  {block.label}
                                </h3>
                              )}
                              <div className="space-y-1.5">
                                {block.items.map((item, i) => {
                                  const isChecked =
                                    completedItems[item] || false;
                                  return (
                                    <label
                                      key={i}
                                      className="flex items-start gap-2.5 cursor-pointer group hover:bg-[#efefed] rounded p-1 -ml-1 transition-colors"
                                    >
                                      <div className="mt-[3px] relative cursor-pointer">
                                        <input
                                          type="checkbox"
                                          className="peer sr-only"
                                          checked={isChecked}
                                          onChange={() => toggleItem(item)}
                                        />
                                        <div className="w-[15px] h-[15px] rounded-[3px] border border-[#d3d1cb] bg-white transition-colors peer-checked:bg-[#2383e2] peer-checked:border-[#2383e2] flex items-center justify-center">
                                          {isChecked && (
                                            <svg
                                              viewBox="0 0 14 14"
                                              className="w-3 h-3 text-white fill-current"
                                            >
                                              <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039" />
                                            </svg>
                                          )}
                                        </div>
                                      </div>
                                      <span
                                        className={`text-[15px] leading-relaxed select-text ${isChecked ? "text-[#787774] line-through opacity-70" : "text-[#37352f]"}`}
                                      >
                                        {item}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }

                        return null;
                      })}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Right Sidebar: On This Page (sticky, not scrollable with content) ─── */}
        <aside className="hidden lg:flex w-[200px] flex-shrink-0 flex-col h-full border-l border-[#EAE9E9]">
          <div className="pt-6 pr-6 pl-4">
            <div className="text-xs font-semibold text-[#787774] tracking-wide mb-3 flex items-center gap-2">
              <Menu className="w-3 h-3" strokeWidth={3} />
              On this page
            </div>
            <nav className="pl-4 border-l border-[#EAE9E9] flex flex-col gap-1.5">
              {activeGuide.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`text-[13px] leading-[1.3] truncate transition-colors py-0.5 ${
                    activeSection === section.id
                      ? "text-[#37352f] font-semibold"
                      : "text-[#787774] hover:text-[#37352f]"
                  }`}
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}
