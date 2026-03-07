"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Circle, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";
import { phases, totalLessons } from "../data";

export default function ProgressPage() {
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

  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="flex w-full h-full bg-white text-[#37352f] font-sans">
      <div className="flex-1 px-[calc(min(64px,5vw))] lg:px-12 py-6">
        <div className="max-w-[840px] pl-0 lg:pl-10 mx-auto w-full pb-24">
          {/* Header */}
          <div className="mb-8 border-b border-[#EAE9E9] pb-6">
            <h1 className="text-3xl font-bold text-[#37352f] mb-2">
              Your Progress
            </h1>
            <p className="text-[#787774] text-base">
              Track your journey through the Spain DNV Playbook.
            </p>
          </div>

          {/* Overall Progress Card */}
          <div className="bg-[#F7F6F3] rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-[#37352f]">
                Overall Completion
              </span>
              <span className="text-sm font-bold text-[#37352f]">
                {completedCount} / {totalLessons} lessons
              </span>
            </div>
            <div className="w-full h-3 bg-[#EAE9E9] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#37352f] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-[#787774] mt-2">
              {progressPercent}% complete
            </p>
          </div>

          {/* Completion Badge */}
          {progressPercent === 100 && (
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4 mb-8">
              <Trophy className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-green-800">
                  Playbook Complete!
                </p>
                <p className="text-xs text-green-600">
                  You&apos;ve finished all {totalLessons} lessons.
                  Congratulations!
                </p>
              </div>
            </div>
          )}

          {/* Phase Breakdown */}
          <div className="space-y-6">
            {phases.map((phase) => {
              const phaseCompleted = phase.lessons.filter(
                (l) => completedLessons[l.id],
              ).length;
              const phaseTotal = phase.lessons.length;
              const phasePercent =
                phaseTotal > 0
                  ? Math.round((phaseCompleted / phaseTotal) * 100)
                  : 0;

              return (
                <div
                  key={phase.id}
                  className="border border-[#EAE9E9] rounded-xl overflow-hidden"
                >
                  {/* Phase Header */}
                  <div className="px-5 py-4 bg-[#FAFAFA]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded"
                          style={{
                            background: phase.bg,
                            color: phase.accent,
                          }}
                        >
                          {phase.phase}
                        </span>
                        <h3 className="text-sm font-semibold text-[#37352f]">
                          {phase.title}
                        </h3>
                      </div>
                      <span className="text-xs text-[#787774]">
                        {phaseCompleted}/{phaseTotal}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#EAE9E9] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${phasePercent}%`,
                          backgroundColor: phase.accent,
                        }}
                      />
                    </div>
                  </div>

                  {/* Lessons List */}
                  <div className="divide-y divide-[#EAE9E9]">
                    {phase.lessons.map((lesson) => {
                      const isDone = completedLessons[lesson.id] || false;
                      const lessonNum = parseInt(lesson.number);

                      return (
                        <Link
                          key={lesson.id}
                          href={`/playbook/spain-dnv/lessons/lesson-${lessonNum}`}
                          className="flex items-center gap-3 px-5 py-3 hover:bg-[#F7F6F3] transition-colors group"
                        >
                          {isDone ? (
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-[#D3D1CB] flex-shrink-0" />
                          )}
                          <span
                            className={`text-sm flex-1 ${
                              isDone
                                ? "text-[#787774] line-through"
                                : "text-[#37352f]"
                            }`}
                          >
                            {lesson.number}. {lesson.title}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#D3D1CB] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
