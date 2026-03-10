"use client";

import { useState, useEffect } from "react";
import { Menu, ArrowLeft, ArrowRight } from "lucide-react";
import { guides, type ContentBlock } from "../data";
import { use } from "react";
import Link from "next/link";

export default function GuidePage(props: { params: Promise<{ guideId: string }> }) {
  const params = use(props.params);
  const guideId = params.guideId;
  const activeGuide = guides.find((g) => g.id === guideId) || guides[0];
  const currentIndex = guides.findIndex((g) => g.id === guideId);
  const prevGuide = guides[currentIndex - 1] ?? null;
  const nextGuide = guides[currentIndex + 1] ?? null;

  const [activeSection, setActiveSection] = useState<string>("");
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  // Intersection observer for TOC highlighting
  useEffect(() => {
    if (!activeGuide.sections.length) return;
    setActiveSection(activeGuide.sections[0]?.id || "");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    activeGuide.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeGuide]);

  // Load checklist progress
  useEffect(() => {
    const saved = localStorage.getItem(`playbook_guide_progress_${guideId}`);
    if (saved) {
      try {
        setCompletedItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse guide progress", e);
      }
    } else {
      setCompletedItems({});
    }
  }, [guideId]);

  const toggleItem = (itemText: string) => {
    const updated = {
      ...completedItems,
      [itemText]: !completedItems[itemText],
    };
    setCompletedItems(updated);
    localStorage.setItem(
      `playbook_guide_progress_${guideId}`,
      JSON.stringify(updated)
    );
  };

  // Converts **bold** markers in a plain string to <strong> nodes
  const applyBold = (str: string, keyPrefix: string): React.ReactNode[] => {
    const parts = str.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={`${keyPrefix}-b${idx}`} className="font-semibold text-[#37352f]">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const renderText = (text: string) => {
    // Split by markdown links [label](url) or bare URLs
    const combinedRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s]+)/g;
    const segments = text.split(combinedRegex);

    const result: React.ReactNode[] = [];
    let i = 0;
    while (i < segments.length) {
      const plain = segments[i];
      if (plain) result.push(...applyBold(plain, `t${i}`));

      if (i + 1 < segments.length) {
        const label = segments[i + 1];
        const url = segments[i + 2];
        const rawUrl = segments[i + 3];

        if (label && url) {
          result.push(
            <a key={`link-${i}`} href={url} target="_blank" rel="noopener noreferrer" className="text-[#2383e2] hover:underline underline-offset-4">
              {label}
            </a>
          );
        } else if (rawUrl) {
          result.push(
            <a key={`link-${i}`} href={rawUrl} target="_blank" rel="noopener noreferrer" className="text-[#2383e2] hover:underline underline-offset-4">
              {rawUrl}
            </a>
          );
        }
      }
      i += 4;
    }

    return result.length > 0 ? result : text;
  };

  return (
    <>
      {/* ─── Main Content ─── */}
      <div className="flex-1 min-w-0">
        <div className="px-6 lg:px-12 py-0">
          <div className="max-w-[720px] mx-auto">
            {/* Subtitle */}
            <div className="text-[#37352f] font-semibold text-[14px] mb-3">
              {activeGuide.subtitle}
            </div>

            {/* Title */}
            <h1 className="text-[32px] lg:text-[36px] leading-[1.1] font-bold text-[#37352f] tracking-tight mb-3">
              {activeGuide.title}
            </h1>

            {/* Mobile guide selector removed in favor of layout level or separate mobile menu, 
                assuming layout sidebar handles navigation */}

            {/* Sections */}
            <div className="space-y-8 mt-8">
              {activeGuide.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <h2 className="text-2xl font-semibold text-[#37352f] mb-4 mt-8 tracking-tight">
                    {section.title}
                  </h2>

                  <div className="space-y-4">
                    {section.content.map((block, bIdx) => {
                      const renderBlock = (block: ContentBlock, key: string | number) => {
                        if (block.type === "intro") {
                          return (
                            <p
                              key={key}
                              className="text-[#37352f] text-base leading-relaxed"
                            >
                              {renderText(block.text)}
                            </p>
                          );
                        }

                        if (block.type === "callout") {
                          return (
                            <div
                              key={key}
                              className={`flex items-start gap-3 p-4 rounded ${
                                block.bgClass || "bg-[#f1f1ef]"
                              } border ${
                                block.borderClass || "border-transparent"
                              } my-4`}
                            >
                              <span className="text-xl leading-none flex-shrink-0 mt-0.5">
                                {block.icon}
                              </span>
                              <div className="text-[#37352f] text-[15px] leading-relaxed whitespace-pre-wrap">
                                {renderText(block.text)}
                              </div>
                            </div>
                          );
                        }

                        if (block.type === "highlight") {
                          return (
                            <div key={key} className="my-4">
                              {block.label && (
                                <h3 className="font-semibold text-[#37352f] text-base mb-2">
                                  {block.label}
                                </h3>
                              )}
                              <ul className="list-disc pl-6 space-y-1">
                                {block.items.map((item: string, i: number) => (
                                  <li
                                    key={i}
                                    className="text-[15px] text-[#37352f] leading-relaxed pl-1"
                                  >
                                    {renderText(item)}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        }

                        if (block.type === "checklist") {
                          return (
                            <div key={key} className="my-4">
                              {block.label && (
                                <h3 className="font-semibold text-[#37352f] text-base mb-2">
                                  {block.label}
                                </h3>
                              )}
                              <div className="space-y-1.5">
                                {block.items.map((item: string, i: number) => {
                                  const isChecked = completedItems[item] || false;
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
                                        className={`text-[15px] leading-relaxed select-text ${
                                          isChecked
                                            ? "text-[#787774] line-through opacity-70"
                                            : "text-[#37352f]"
                                        }`}
                                      >
                                        {renderText(item)}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }

                        if (block.type === "image") {
                          return (
                            <div key={key} className="my-8">
                              <div className="rounded-xl overflow-hidden border border-[#EAE9E9] bg-[#F7F7F5] transition-all hover:shadow-md">
                                <img
                                  src={block.src}
                                  alt={block.alt || "Guide image"}
                                  className="w-full h-auto object-cover max-h-[480px]"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1543733394-970364f3fa02?q=80&w=1000&auto=format&fit=crop";
                                  }}
                                />
                              </div>
                              {block.caption && (
                                <p className="text-[13px] text-[#787774] mt-2 text-center italic">
                                  {block.caption}
                                </p>
                              )}
                            </div>
                          );
                        }

                        if (block.type === "divider") {
                          return (
                            <hr
                              key={key}
                              className="my-8 border-t border-[#EAE9E9]"
                            />
                          );
                        }

                        if (block.type === "table") {
                          return (
                            <div
                              key={key}
                              className="my-6 overflow-hidden rounded-lg border border-[#EAE9E9]"
                            >
                              <table className="w-full border-collapse text-left text-[14px]">
                                <thead>
                                  <tr className="bg-[#F7F7F5] border-b border-[#EAE9E9]">
                                    {block.headers.map((header: string, hIdx: number) => (
                                      <th
                                        key={hIdx}
                                        className="px-4 py-3 font-semibold text-[#37352f]"
                                      >
                                        {header}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-[#EAE9E9]">
                                  {block.rows.map((row: string[], rIdx: number) => (
                                    <tr
                                      key={rIdx}
                                      className="hover:bg-[#FBFBFA] transition-colors"
                                    >
                                      {row.map((cell: string, cIdx: number) => (
                                        <td
                                          key={cIdx}
                                          className="px-4 py-3 text-[#37352f] whitespace-pre-wrap leading-relaxed"
                                        >
                                          {renderText(cell)}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          );
                        }

                        if (block.type === "expandable") {
                          return (
                            <details
                              key={key}
                              id={block.id}
                              className="group my-4 border border-[#EAE9E9] rounded-lg overflow-hidden bg-[#F7F7F5]/50"
                            >
                              <summary className="flex items-center gap-2 p-4 cursor-pointer hover:bg-[#EFEFED] transition-colors list-none font-medium text-[#37352f]">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="transition-transform group-open:rotate-90 text-[#787774]"
                                >
                                  <path
                                    d="M4 2L8 6L4 10"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                {block.title}
                              </summary>
                              <div className="p-4 pt-0 space-y-4 border-t border-[#EAE9E9] bg-white">
                                <div className="mt-4">
                                  {block.content.map((nestedBlock: ContentBlock, nIdx: number) => 
                                    renderBlock(nestedBlock, `${key}-nested-${nIdx}`)
                                  )}
                                </div>
                              </div>
                            </details>
                          );
                        }

                        return null;
                      };

                      return renderBlock(block, bIdx);
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>

          {/* Prev / Next Guide Navigation */}
          <div className="border-t border-[#EAE9E9] pt-8 mt-8 flex flex-col sm:flex-row gap-4">
            {prevGuide ? (
              <Link
                href={`/playbook/spain-dnv/guides/${prevGuide.id}`}
                className="flex-1 flex items-center gap-3 p-5 rounded-xl border border-[#EAE9E9] hover:bg-[#f7f7f5] transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 text-[#787774] group-hover:text-[#37352f] transition-colors flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-[11px] text-[#787774] font-medium mb-0.5">Previous</div>
                  <div className="text-[14px] font-semibold text-[#37352f] truncate">{prevGuide.title}</div>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {nextGuide ? (
              <Link
                href={`/playbook/spain-dnv/guides/${nextGuide.id}`}
                className="flex-1 flex items-center justify-end gap-3 p-5 rounded-xl border border-[#EAE9E9] hover:bg-[#f7f7f5] transition-colors group text-right"
              >
                <div className="min-w-0">
                  <div className="text-[11px] text-[#787774] font-medium mb-0.5">Next</div>
                  <div className="text-[14px] font-semibold text-[#37352f] truncate">{nextGuide.title}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#787774] group-hover:text-[#37352f] transition-colors flex-shrink-0" />
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>

        </div>
      </div>

      {/* ─── Right Sidebar: On This Page (Sticky) ─── */}
      <aside className="hidden lg:flex w-[240px] flex-shrink-0 flex-col sticky top-[32px] max-h-[calc(100vh-140px)] overflow-y-auto">
        <div className="pt-0 pr-6 pl-4">
          <div className="text-[13px] font-semibold text-[#787774] mb-3 flex items-center gap-2">
            <Menu className="w-3.5 h-3.5" strokeWidth={2.5} />
            On this page
          </div>
          <nav className="flex flex-col relative ml-1">
            <div className="absolute left-0 top-1 bottom-1 w-[1px] bg-[#EAE9E9] z-0" />
            {activeGuide.sections.map((section) => (
              <div key={section.id} className="flex flex-col">
                <a
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(section.id)?.scrollIntoView({
                      behavior: "smooth",
                    });
                    window.history.pushState(null, "", `#${section.id}`);
                  }}
                  className={`text-[13px] leading-[1.4] py-1.5 pl-4 relative z-10 border-l-[2px] transition-colors ${
                    activeSection === section.id
                      ? "text-[#37352f] font-medium border-[#37352f]"
                      : "text-[#787774] hover:text-[#37352f] border-transparent"
                  }`}
                >
                  {section.title}
                </a>
                {/* Nested expandable blocks in TOC */}
                {section.content.map((block, idx) =>
                  block.type === "expandable" && block.id ? (
                    <a
                      key={block.id || idx}
                      href={`#${block.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(block.id!);
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth" });
                          const details = el.closest("details");
                          if (details) details.open = true;
                        }
                        window.history.pushState(null, "", `#${block.id}`);
                      }}
                      className="text-[12px] leading-[1.4] py-1 pl-8 pr-2 text-[#787774] hover:text-[#37352f] transition-colors mb-1 border-l-[2px] border-transparent"
                    >
                      {block.title}
                    </a>
                  ) : null
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
