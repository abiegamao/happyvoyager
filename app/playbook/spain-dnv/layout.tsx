"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, ChevronDown, ChevronRight, Menu, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TopbarLinks } from "@/components/playbook/TopbarLinks";
import { phases } from "./data";

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

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  if (isChecking) return null;

  if (isGatePage) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col h-screen min-h-screen bg-white text-[#37352f] font-sans">
      {/* Global Top Bar */}
      <header className="h-[64px] flex items-center justify-center px-4 md:px-6 bg-white shrink-0 z-50">
        <div className="flex items-center justify-between w-full max-w-[1400px] mx-auto h-full">
          <div className="flex items-center gap-2 h-full w-auto md:w-[250px] flex-shrink-0">
            {isLessonPage && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 text-[#37352f] hover:bg-[#efefed] rounded md:hidden -ml-2 mr-1"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <Link
              href="/playbook/spain-dnv"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={20}
                height={20}
                className="rounded-sm"
              />
              <span className="font-semibold text-[15px] tracking-tight">
                Spain DNV Playbook
              </span>
            </Link>
          </div>

          <div className="hidden md:flex justify-center flex-1 max-w-[480px]">
            <div className="flex items-center gap-2 px-3 py-2 w-full bg-[#f7f7f5] hover:bg-[#efefed] rounded-full transition-colors cursor-pointer text-[#787774]">
              <Search className="w-4 h-4 opacity-70" />
              <span className="text-[14px] font-medium mr-auto">Search...</span>
              <span className="text-[12px] opacity-70 font-medium">Ctrl K</span>
            </div>
          </div>
        </div>
      </header>

      <TopbarLinks />

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
            className={`absolute md:static top-0 left-0 h-full w-[280px] bg-white flex flex-col transition-transform duration-300 ease-in-out z-40 ${
              sidebarOpen
                ? "translate-x-0 shadow-2xl md:shadow-none"
                : "-translate-x-full md:translate-x-0"
            } border-r border-[#EAE9E9]`}
          >
            <div className="flex-1 overflow-y-auto pt-6 pb-20">
              {/* Phase navigation */}
              <div className="px-5 space-y-1">
                <div className="px-2 py-1.5 text-xs font-semibold text-[#37352f] uppercase tracking-wider mb-2">
                  Playbook Phases
                </div>

                {phases.map((phase) => {
                  const isExpanded = expandedPhases[phase.id] ?? false;

                  return (
                    <div key={phase.id} className="mb-1">
                      <button
                        onClick={() => togglePhase(phase.id)}
                        className="flex items-center gap-2 w-full px-2 py-2 rounded text-left hover:bg-[#f7f7f5] transition-colors group"
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
                        <span className="text-[13px] font-semibold text-[#37352f] truncate">
                          {phase.phase}: {phase.title}
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="ml-4 pl-3 border-l-[2px] border-[#EAE9E9] space-y-0.5 mt-1 mb-2">
                          {phase.lessons.map((lesson) => (
                            <Link
                              key={lesson.id}
                              href={`/playbook/spain-dnv/lessons/lesson-${parseInt(lesson.number)}`}
                              className={`flex items-center gap-2 px-2 py-1.5 rounded text-[13px] hover:text-[#37352f] hover:bg-[#f7f7f5] transition-colors ${
                                pathname.includes(
                                  `/lessons/lesson-${parseInt(lesson.number)}`,
                                )
                                  ? "bg-[#efefed] text-[#37352f] font-medium"
                                  : "text-[#787774]"
                              }`}
                            >
                              <span className="text-[11px] font-medium text-[#787774] w-5 flex-shrink-0">
                                {lesson.number}
                              </span>
                              <span className="truncate">{lesson.title}</span>
                              {!lesson.free && (
                                <Lock className="w-3 h-3 text-[#c4c4c2] flex-shrink-0 ml-auto" />
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        )}

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-white h-full overflow-y-auto">
          <div className="flex-1 flex flex-col pt-8 pb-24">{children}</div>
        </main>
      </div>
    </div>
  );
}
