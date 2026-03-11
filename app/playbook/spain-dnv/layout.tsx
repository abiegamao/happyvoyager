"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, ChevronDown, ChevronRight, Menu, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TopbarLinks } from "@/components/playbook/TopbarLinks";
import { phases } from "./data";
import { motion, AnimatePresence } from "motion/react";
import { SearchModal } from "@/components/playbook/SearchModal";
import { AIChatbot } from "@/components/playbook/AIChatbot";
import { ProgressContext } from "./progress-context";

const totalLessons = phases.reduce((acc, p) => acc + p.lessons.length, 0);

// Ordered list of lesson IDs — the source of truth for sequential unlock order
const allLessonIds = phases.flatMap((p) => p.lessons.map((l) => l.id));

export default function PlaybookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>(
    {},
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  const isGatePage = pathname === "/playbook/spain-dnv";
  const isLessonPage = pathname.includes("/lessons/");

  useEffect(() => {
    const email = sessionStorage.getItem("playbook_email");
    if (!email && !isGatePage) {
      router.replace("/playbook/spain-dnv");
    } else {
      setIsChecking(false);
    }
  }, [pathname, isGatePage, router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Auto-expand phase matching current lesson route
    const lessonMatch = pathname.match(/\/lessons\/lesson-(\d+)/);
    if (lessonMatch) {
      const lessonNum = lessonMatch[1].padStart(2, "0");
      const matchingPhase = phases.find((p) =>
        p.lessons.some((l) => l.number === lessonNum),
      );
      if (matchingPhase) {
        setExpandedPhases((prev) => ({ ...prev, [matchingPhase.id]: true }));
      }
    }
    const hash = window.location.hash?.replace("#", "");
    if (hash) {
      const matchingPhase = phases.find(
        (p) => p.id === hash || p.lessons.some((l) => l.id === hash),
      );
      if (matchingPhase) {
        setExpandedPhases((prev) => ({ ...prev, [matchingPhase.id]: true }));
      }
    }
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Load lesson progress: optimistic from localStorage, then sync from server
  useEffect(() => {
    if (isGatePage) return;
    const email = sessionStorage.getItem("playbook_email");
    if (!email) return;

    // Seed optimistically from localStorage while fetch is in-flight
    let localIds: string[] = [];
    try {
      const raw = localStorage.getItem("playbook_lesson_progress");
      if (raw) {
        const local: Record<string, boolean> = JSON.parse(raw);
        localIds = Object.entries(local).filter(([, v]) => v).map(([k]) => k);
        setCompletedLessonIds(localIds);
      }
    } catch { /* ignore */ }

    // Fetch server state
    fetch(`/api/playbook/progress?email=${encodeURIComponent(email)}&playbook_slug=spain-dnv`)
      .then((r) => r.json())
      .then(({ completedLessonIds: serverIds }: { completedLessonIds: string[] }) => {
        if (serverIds.length === 0 && localIds.length > 0) {
          // Backfill server for existing users who have localStorage progress
          const backfill = localIds.map((lessonId) =>
            fetch("/api/playbook/progress", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, playbook_slug: "spain-dnv", lesson_id: lessonId, completed: true }),
            })
          );
          Promise.all(backfill).catch(() => { /* silent fail */ });
          // Keep local state as-is
        } else {
          setCompletedLessonIds(serverIds);
          // Sync server state back to localStorage
          const updated: Record<string, boolean> = {};
          serverIds.forEach((id) => { updated[id] = true; });
          try {
            localStorage.setItem("playbook_lesson_progress", JSON.stringify(updated));
          } catch { /* ignore */ }
        }
      })
      .catch(() => { /* keep local state on network error */ });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGatePage]);

  const markComplete = useCallback((lessonId: string, completed: boolean) => {
    const email = sessionStorage.getItem("playbook_email");
    if (!email) return;

    // Optimistic update
    setCompletedLessonIds((prev) =>
      completed ? [...new Set([...prev, lessonId])] : prev.filter((id) => id !== lessonId)
    );

    // Sync localStorage
    try {
      const raw = localStorage.getItem("playbook_lesson_progress");
      const local: Record<string, boolean> = raw ? JSON.parse(raw) : {};
      if (completed) {
        local[lessonId] = true;
      } else {
        delete local[lessonId];
      }
      localStorage.setItem("playbook_lesson_progress", JSON.stringify(local));
    } catch { /* ignore */ }

    // Fire API (non-blocking)
    fetch("/api/playbook/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, playbook_slug: "spain-dnv", lesson_id: lessonId, completed }),
    }).catch(() => { /* silent fail — local state already updated */ });
  }, []);

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  if (isChecking) return null;

  if (isGatePage) {
    return <>{children}</>;
  }

  return (
    <ProgressContext.Provider value={{ completedLessonIds, markComplete }}>
    <div className="flex flex-col h-screen min-h-screen bg-[#f9f5f2] text-[#3a3a3a] font-sans">
      {/* Global Top Bar */}
      <header className="h-[64px] flex items-center justify-center px-4 md:px-6 bg-white border-b border-[#e7ddd3] shrink-0 z-50">
        <div className="flex items-center justify-between w-full max-w-[1400px] mx-auto h-full">
          <div className="flex items-center gap-2 h-full w-auto md:w-[250px] flex-shrink-0">
            {isLessonPage && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 text-[#3a3a3a] hover:bg-[#f2d6c9] rounded md:hidden -ml-2 mr-1 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <Link
              href="/playbook/spain-dnv/home"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              {/* <Image
                src="/assets/logo.png"
                alt="Logo"
                width={20}
                height={20}
                className="rounded-sm"
              /> */}
              <span className="font-semibold text-[15px] tracking-tight text-[#3a3a3a]">
                Spain DNV Playbook
              </span>
            </Link>
          </div>

          {/* Desktop search bar */}
          <div className="hidden md:flex justify-center flex-1 max-w-[480px]">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 w-full bg-[#f2d6c9]/40 hover:bg-[#f2d6c9]/70 border border-[#e7ddd3] rounded-full transition-colors cursor-default text-[#787774]"
            >
              <Search className="w-4 h-4 opacity-70" />
              <span className="text-[14px] font-medium mr-auto">Search...</span>
              <span className="text-[12px] opacity-70 font-medium">Ctrl K</span>
            </button>
          </div>

          {/* Mobile search icon */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 text-[#787774] hover:text-[#3a3a3a] hover:bg-[#f2d6c9] rounded-lg transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </header>

      <TopbarLinks />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <AIChatbot />

      <div className="flex-1 flex overflow-hidden max-w-[1400px] w-full mx-auto">
        {isLessonPage && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar — only on lesson pages */}
        {isLessonPage && (
          <aside
            className={`absolute md:static top-0 left-0 h-full w-[280px] bg-[#faf8f6] flex flex-col transition-transform duration-300 ease-in-out z-40 ${
              sidebarOpen
                ? "translate-x-0 shadow-2xl md:shadow-none"
                : "-translate-x-full md:translate-x-0"
            } border-r border-[#e7ddd3]`}
          >
            <div className="flex-1 overflow-y-auto pt-6 pb-20">
              {/* Phase navigation */}
              <div className="px-5 space-y-1">
                <div className="px-2 py-1.5 mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#3a3a3a] uppercase tracking-wider">
                    Playbook Phases
                  </span>
                  {completedLessonIds.length > 0 && (
                    <span className="text-[11px] text-[#b0a89e] font-medium">
                      {completedLessonIds.length}/{totalLessons} done
                    </span>
                  )}
                </div>

                {phases.map((phase) => {
                  const isExpanded = expandedPhases[phase.id] ?? false;

                  return (
                    <div key={phase.id} className="mb-1">
                      <button
                        onClick={() => togglePhase(phase.id)}
                        className="flex items-center gap-2 w-full px-2 py-2 rounded text-left hover:bg-[#f2d6c9]/40 transition-colors group"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-3.5 h-3.5 text-[#787774] flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-[#787774] flex-shrink-0" />
                        )}
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: phase.accent }}
                        />
                        <span className="text-[13px] font-semibold text-[#3a3a3a] truncate">
                          {phase.phase}: {phase.title}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 pl-3 border-l-[2px] border-[#e7ddd3] space-y-0.5 mt-1 mb-2">
                              {phase.lessons.map((lesson) => {
                                const isActive = pathname.includes(
                                  `/lessons/lesson-${parseInt(lesson.number)}`,
                                );
                                const lessonIndex = allLessonIds.indexOf(lesson.id);
                                const isProgressLocked =
                                  lessonIndex > 0 &&
                                  !completedLessonIds.includes(allLessonIds[lessonIndex - 1]);
                                const lessonContent = (
                                  <>
                                    <span className="text-[11px] font-medium text-[#b0a89e] w-5 flex-shrink-0">
                                      {lesson.number}
                                    </span>
                                    <span className="truncate">
                                      {lesson.title}
                                    </span>
                                    {isProgressLocked ? (
                                      <Lock className="w-3 h-3 text-[#d3c4bc] flex-shrink-0 ml-auto" />
                                    ) : completedLessonIds.includes(lesson.id) ? (
                                      <span className="w-3 h-3 ml-auto flex-shrink-0 text-[#8fa38d] text-[10px] font-bold">✓</span>
                                    ) : null}
                                  </>
                                );
                                return isProgressLocked ? (
                                  <span
                                    key={lesson.id}
                                    className="flex items-center gap-2 px-2 py-1.5 rounded text-[13px] text-[#c0b8b0] cursor-not-allowed select-none"
                                  >
                                    {lessonContent}
                                  </span>
                                ) : (
                                  <Link
                                    key={lesson.id}
                                    href={`/playbook/spain-dnv/lessons/lesson-${parseInt(lesson.number)}`}
                                    className={`flex items-center gap-2 px-2 py-1.5 rounded text-[13px] transition-colors ${
                                      isActive
                                        ? "bg-[#f2d6c9] text-[#3a3a3a] font-medium"
                                        : "text-[#787774] hover:text-[#3a3a3a] hover:bg-[#f2d6c9]/40"
                                    }`}
                                  >
                                    {lessonContent}
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        )}

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#f9f5f2] h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">
          <div className="flex-1 flex flex-col pt-8 pb-24">{children}</div>
        </main>
      </div>
    </div>
    </ProgressContext.Provider>
  );
}
