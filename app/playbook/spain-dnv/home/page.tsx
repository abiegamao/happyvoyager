"use client";

import {
  CheckCircle,
  Globe,
  Instagram,
  Youtube,
  Facebook,
  Linkedin,
  Clock,
  Lock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { phases, playbookMeta, totalLessons } from "../data";

export default function PlaybookHome() {
  const [completedLessons, setCompletedLessons] = useState<
    Record<string, boolean>
  >({});
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>(
    { qualify: true },
  );

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

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

  const toggleLesson = (lessonId: string) => {
    const updated = {
      ...completedLessons,
      [lessonId]: !completedLessons[lessonId],
    };
    setCompletedLessons(updated);
    localStorage.setItem("playbook_lesson_progress", JSON.stringify(updated));
  };

  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="flex w-full h-full bg-white text-[#37352f] font-sans">
      <div className="flex-1 px-[calc(min(64px,5vw))] lg:px-12 py-6">
        <div className="max-w-[840px] pl-0 lg:pl-10 mx-auto w-full pb-24">
          {/* Main Title Section */}
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

          {/* Progress Bar */}
          <div className="mb-10 bg-[#f7f7f5] rounded-xl p-6 border border-[#EAE9E9]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px] font-semibold text-[#37352f]">
                Your Progress
              </span>
              <span className="text-[13px] text-[#787774]">
                {completedCount} / {totalLessons} lessons completed
              </span>
            </div>
            <div className="w-full h-2 bg-[#EAE9E9] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#37352f] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Author Section */}
          <div className="mb-12 flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <div className="w-16 h-16 rounded-full bg-[#f1f1ef] flex-shrink-0 relative overflow-hidden flex items-center justify-center border border-[#EAE9E9]">
              <span className="text-xl font-medium text-[#787774]">AG</span>
            </div>
            <div>
              <h2 className="text-[22px] font-semibold text-[#37352f] mb-1">
                Abie Maxey Gamao (Abz)
              </h2>
              <p className="text-[15px] text-[#787774] mb-3">
                Systems engineer, content creator, and DNV holder based in
                Spain.
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

          {/* Phases & Lessons Roadmap */}
          <div className="space-y-6">
            <h2 className="text-[28px] font-bold text-[#37352f] tracking-tight">
              Playbook Roadmap
            </h2>

            {phases.map((phase) => {
              const isExpanded = expandedPhases[phase.id] ?? false;
              const phaseLessonsDone = phase.lessons.filter(
                (l) => completedLessons[l.id],
              ).length;

              return (
                <div
                  key={phase.id}
                  id={phase.id}
                  className="rounded-xl border border-[#EAE9E9] overflow-hidden scroll-mt-24"
                >
                  {/* Phase Header */}
                  <button
                    onClick={() => togglePhase(phase.id)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-[#fafafa] transition-colors"
                    style={{ borderLeft: `4px solid ${phase.accent}` }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                          style={{
                            color: phase.accent,
                            backgroundColor: phase.bg,
                          }}
                        >
                          {phase.phase}
                        </span>
                        <span className="text-[12px] text-[#787774]">
                          {phaseLessonsDone}/{phase.lessons.length} done
                        </span>
                      </div>
                      <h3 className="text-[20px] font-bold text-[#37352f] mb-1">
                        {phase.title}
                      </h3>
                      <p className="text-[14px] text-[#787774] leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-[#787774]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#787774]" />
                      )}
                    </div>
                  </button>

                  {/* Lessons */}
                  {isExpanded && (
                    <div className="border-t border-[#EAE9E9]">
                      {phase.lessons.map((lesson, idx) => {
                        const isDone = completedLessons[lesson.id] || false;

                        return (
                          <div
                            key={lesson.id}
                            id={lesson.id}
                            className={`p-6 scroll-mt-24 ${
                              idx < phase.lessons.length - 1
                                ? "border-b border-[#f0f0f0]"
                                : ""
                            } ${isDone ? "bg-[#fafffe]" : ""}`}
                          >
                            <div className="flex items-start gap-4">
                              {/* Checkbox */}
                              <button
                                onClick={() => toggleLesson(lesson.id)}
                                className={`mt-1 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                  isDone
                                    ? "bg-[#37352f] border-[#37352f]"
                                    : "border-[#c4c4c2] hover:border-[#787774]"
                                }`}
                              >
                                {isDone && (
                                  <svg
                                    viewBox="0 0 14 14"
                                    className="w-3 h-3 text-white fill-current"
                                  >
                                    <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039" />
                                  </svg>
                                )}
                              </button>

                              <div className="flex-1 min-w-0">
                                {/* Lesson header */}
                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                  <span className="text-[12px] font-mono font-bold text-[#787774]">
                                    {lesson.number}
                                  </span>
                                  <span
                                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                                    style={{
                                      backgroundColor: phase.bg,
                                      color: phase.accent,
                                    }}
                                  >
                                    {lesson.tag}
                                  </span>
                                  <span className="text-[12px] text-[#787774] flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {lesson.time}
                                  </span>
                                  {lesson.free ? (
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

                                <Link
                                  href={`/playbook/spain-dnv/lessons/lesson-${parseInt(lesson.number)}`}
                                  className={`block text-[17px] font-semibold mb-2 hover:underline ${
                                    isDone
                                      ? "text-[#787774] line-through"
                                      : "text-[#37352f]"
                                  }`}
                                >
                                  {lesson.title}
                                </Link>

                                <p className="text-[14px] text-[#787774] leading-relaxed mb-4">
                                  {lesson.description}
                                </p>

                                {/* Bullets */}
                                <ul className="space-y-2 mb-4">
                                  {lesson.bullets.map((bullet, bIdx) => (
                                    <li
                                      key={bIdx}
                                      className="flex items-start gap-2.5 text-[14px] text-[#37352f] leading-relaxed"
                                    >
                                      <div className="w-1.5 h-1.5 rounded-full bg-[#c4c4c2] flex-shrink-0 mt-2" />
                                      <span>{bullet}</span>
                                    </li>
                                  ))}
                                </ul>

                                {/* Link */}
                                <Link
                                  href={`/playbook/spain-dnv/lessons/lesson-${parseInt(lesson.number)}`}
                                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#2383e2] hover:underline"
                                >
                                  Open lesson
                                  <ArrowRight className="w-3 h-3" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
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
