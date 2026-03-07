"use client";

import Link from "next/link";
import {
  Clock,
  Lock,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

interface LessonNav {
  number: string;
  title: string;
  path: string;
}

interface LessonPageProps {
  lessonId: string;
  number: string;
  title: string;
  description: string;
  bullets: string[];
  time: string;
  tag: string;
  free: boolean;
  phase: {
    phase: string;
    title: string;
    accent: string;
    bg: string;
  };
  prev: LessonNav | null;
  next: LessonNav | null;
}

export default function LessonPageContent({
  lessonId,
  number,
  title,
  description,
  bullets,
  time,
  tag,
  free,
  phase,
  prev,
  next,
}: LessonPageProps) {
  const [completedLessons, setCompletedLessons] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const saved = localStorage.getItem("playbook_lesson_progress");
    if (saved) {
      try {
        setCompletedLessons(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse lesson progress", e);
      }
    }
  }, []);

  const toggleComplete = () => {
    const updated = {
      ...completedLessons,
      [lessonId]: !completedLessons[lessonId],
    };
    setCompletedLessons(updated);
    localStorage.setItem("playbook_lesson_progress", JSON.stringify(updated));
  };

  const isDone = completedLessons[lessonId] || false;

  return (
    <div className="flex w-full h-full bg-white text-[#37352f] font-sans">
      <div className="flex-1 px-[calc(min(64px,5vw))] lg:px-12 py-6">
        <div className="max-w-[840px] pl-0 lg:pl-10 mx-auto w-full pb-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[13px] text-[#787774] mb-8 flex-wrap">
            <Link
              href="/playbook/spain-dnv/home"
              className="hover:text-[#37352f] transition-colors"
            >
              Playbook
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span>
              {phase.phase}: {phase.title}
            </span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#37352f] font-medium">Lesson {number}</span>
          </nav>

          {/* Lesson Header */}
          <div className="mb-10 border-b border-[#EAE9E9] pb-8">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span
                className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                style={{ color: phase.accent, backgroundColor: phase.bg }}
              >
                {phase.phase}
              </span>
              <span
                className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: phase.bg, color: phase.accent }}
              >
                {tag}
              </span>
              <span className="text-[12px] text-[#787774] flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {time}
              </span>
              {free ? (
                <span className="text-[11px] font-semibold text-[#2383e2] bg-[#e8f0fe] px-2 py-0.5 rounded-full">
                  Free
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[11px] text-[#787774]">
                  <Lock className="w-3 h-3" />
                  Pro
                </span>
              )}
            </div>

            <h1 className="text-[36px] leading-[1.15] font-bold text-[#37352f] tracking-tight mb-4">
              {title}
            </h1>

            <p className="text-[17px] leading-[1.7] text-[#787774]">
              {description}
            </p>
          </div>

          {/* Key Points */}
          <div className="mb-10">
            <h2 className="text-[20px] font-semibold text-[#37352f] mb-5">
              What you&apos;ll learn
            </h2>
            <div className="space-y-3">
              {bullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-[#f7f7f5] border border-[#EAE9E9]"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: phase.bg, color: phase.accent }}
                  >
                    {idx + 1}
                  </div>
                  <span className="text-[14px] text-[#37352f] leading-relaxed">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mark Complete */}
          <div className="mb-12">
            <button
              onClick={toggleComplete}
              className={`flex items-center gap-3 px-5 py-3 rounded-lg border text-[14px] font-semibold transition-colors ${
                isDone
                  ? "bg-[#37352f] text-white border-[#37352f]"
                  : "bg-white text-[#37352f] border-[#EAE9E9] hover:bg-[#f7f7f5]"
              }`}
            >
              {isDone ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Completed
                </>
              ) : (
                <>
                  <div className="w-4 h-4 rounded border border-[#c4c4c2]" />
                  Mark as complete
                </>
              )}
            </button>
          </div>

          {/* Prev / Next Navigation */}
          <div className="border-t border-[#EAE9E9] pt-8 flex flex-col sm:flex-row gap-4">
            {prev ? (
              <Link
                href={prev.path}
                className="flex-1 flex items-center gap-3 p-5 rounded-xl border border-[#EAE9E9] hover:bg-[#f7f7f5] transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 text-[#787774] group-hover:text-[#37352f] transition-colors flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-[11px] text-[#787774] font-medium mb-0.5">
                    Previous
                  </div>
                  <div className="text-[14px] font-semibold text-[#37352f] truncate">
                    {prev.number}. {prev.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {next ? (
              <Link
                href={next.path}
                className="flex-1 flex items-center justify-end gap-3 p-5 rounded-xl border border-[#EAE9E9] hover:bg-[#f7f7f5] transition-colors group text-right"
              >
                <div className="min-w-0">
                  <div className="text-[11px] text-[#787774] font-medium mb-0.5">
                    Next
                  </div>
                  <div className="text-[14px] font-semibold text-[#37352f] truncate">
                    {next.number}. {next.title}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#787774] group-hover:text-[#37352f] transition-colors flex-shrink-0" />
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
