"use client";

import { useState, useEffect, useRef } from "react";
import { Search, FileText, BookOpen, X, Command } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { phases } from "@/app/playbook/spain-dnv/data";
import { guides } from "@/app/playbook/spain-dnv/guides/data";

interface SearchItem {
  id: string;
  title: string;
  description?: string;
  type: "lesson" | "guide" | "section";
  path: string;
  category: string;
}

function extractText(blocks: any[]): string {
  return blocks
    .map((c) => {
      if (c.type === "intro" || c.type === "callout") return c.text || "";
      if (c.type === "highlight" || c.type === "checklist")
        return `${c.label || ""} ${c.items?.join(" ") || ""}`;
      if (c.type === "table")
        return `${c.headers?.join(" ") || ""} ${c.rows?.flat().join(" ") || ""}`;
      if (c.type === "expandable")
        return `${c.title} ${extractText(c.content)}`;
      return "";
    })
    .join(" ");
}

export function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Indexing logic
  const items: SearchItem[] = [
    // Lessons
    ...phases.flatMap((phase) =>
      phase.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        searchable: `${lesson.title} ${lesson.description} ${lesson.bullets.join(" ")}`,
        type: "lesson" as const,
        path: `/playbook/spain-dnv/lessons/lesson-${parseInt(lesson.number)}`,
        category: `${phase.phase}: ${phase.title}`,
      }))
    ),
    // Guides
    ...guides.map((guide) => ({
      id: guide.id,
      title: guide.title,
      description: guide.subtitle,
      searchable: `${guide.title} ${guide.subtitle || ""}`,
      type: "guide" as const,
      path: `/playbook/spain-dnv/guides/${guide.id}`,
      category: "Guides",
    })),
    // Sections within guides
    ...guides.flatMap((guide) =>
      guide.sections.map((section) => {
        const sectionContent = extractText(section.content);
        const introBlock = section.content.find((c) => c.type === "intro") as
          | { text: string }
          | undefined;

        return {
          id: section.id,
          title: section.title,
          description: introBlock?.text,
          searchable: `${section.title} ${sectionContent}`,
          type: "section" as const,
          path: `/playbook/spain-dnv/guides/${guide.id}#${section.id}`,
          category: guide.title,
        };
      })
    ),
  ];

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTerms = query.toLowerCase().split(" ");
    const filtered = items
      .filter((item) => {
        const content = (item as any).searchable.toLowerCase();
        return searchTerms.every((term) => content.includes(term));
      })
      .slice(0, 8); // Limit results

    setResults(filtered);
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % results.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      }
    } else if (e.key === "Enter") {
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const handleSelect = (item: SearchItem) => {
    router.push(item.path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative w-full max-w-[650px] bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_10px_30px_rgba(0,0,0,0.1)] overflow-hidden"
          >
            <div className="flex items-center px-4 py-3 border-b border-[#EAE9E9]">
              <Search className="w-5 h-5 text-[#787774] mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search lessons, guides, or keywords..."
                className="flex-1 bg-transparent border-none outline-none text-[16px] text-[#37352f] placeholder:text-[#9b9a97]"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="flex items-center gap-1.5 px-1.5 py-0.5 bg-[#F1F1EF] rounded text-[#787774] text-[11px] font-medium">
                ESC
              </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto py-2 custom-scrollbar">
              {query === "" ? (
                <div className="px-6 py-10 text-center">
                  <div className="w-12 h-12 bg-[#F1F1EF] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Command className="w-6 h-6 text-[#9b9a97]" />
                  </div>
                  <h3 className="text-[14px] font-semibold text-[#37352f] mb-1">
                    Search Playbook Pro
                  </h3>
                  <p className="text-[13px] text-[#787774]">
                    Type keywords to find documentation, checklists, and roadmap lessons.
                  </p>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-1 px-2">
                  {results.map((item, index) => (
                    <button
                      key={`${item.type}-${item.id}`}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-start gap-3 w-full p-3 rounded-lg text-left transition-colors ${
                        selectedIndex === index
                          ? "bg-[#F1F1EF]"
                          : "hover:bg-[#F7F7F5]"
                      }`}
                    >
                      <div className="mt-0.5">
                        {item.type === "lesson" ? (
                          <FileText className="w-4 h-4 text-[#787774]" />
                        ) : (
                          <BookOpen className="w-4 h-4 text-[#787774]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[14px] font-semibold text-[#37352f] truncate">
                            {item.title}
                          </span>
                          <span className="text-[11px] font-medium text-[#9b9a97] bg-[#EDEDEB] px-1.5 py-0.5 rounded">
                            {item.type}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-[12px] text-[#787774] line-clamp-1 mb-1">
                            {item.description}
                          </p>
                        )}
                        <div className="text-[11px] text-[#9b9a97] flex items-center gap-1">
                          {item.category}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-10 text-center">
                  <p className="text-[14px] text-[#787774]">
                    No results found for "{query}"
                  </p>
                </div>
              )}
            </div>

            <div className="px-4 py-3 bg-[#FBFBFA] border-t border-[#EAE9E9] flex items-center justify-between text-[11px] text-[#9b9a97]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="px-1 py-0.5 bg-[#F1F1EF] rounded text-[10px] border border-[#EAE9E9]">
                    ↑↓
                  </span>{" "}
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <span className="px-1 py-0.5 bg-[#F1F1EF] rounded text-[10px] border border-[#EAE9E9]">
                    ENTER
                  </span>{" "}
                  Select
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>Created by AntiGravity</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
