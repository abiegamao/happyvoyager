"use client";

import { useState } from "react";
import { Lock, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import type { PlaybookConfig } from "@/data/playbooks/types";

export default function WaitlistLanding({ config }: { config: PlaybookConfig }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          playbookSlug: config.slug,
          playbookTitle: config.heroTitle,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f9f5f2] text-[#3a3a3a]">
      {/* Hero */}
      <div className="bg-[#3a3a3a] text-white pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-5xl mb-4 block">{config.catalog.emoji}</span>
          <span
            className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-5 border"
            style={{ color: config.catalog.accent, borderColor: `${config.catalog.accent}40`, backgroundColor: `${config.catalog.accent}20` }}
          >
            🚀 Early Access ~ Join the Waitlist
          </span>
          <h1 className="font-[family-name:var(--font-heading)] text-[2.4rem] lg:text-[3rem] font-bold mb-4 leading-tight">
            {config.heroTitle}
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            {config.heroDescription}
          </p>

          {/* Waitlist form */}
          {success ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto bg-white/10 border border-white/20 rounded-2xl px-6 py-7"
            >
              <CheckCircle2 className="w-10 h-10 mx-auto mb-3 text-white" />
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold mb-2">
                You&apos;re on the list!
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                We&apos;ll email you the moment this playbook is live ~ often with an early access discount.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/50 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/50 transition-colors"
                />
              </div>
              {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: config.catalog.accent }}
              >
                {loading ? "Joining..." : "Notify Me When It Launches →"}
              </button>
              <p className="text-white/30 text-[11px] mt-3">
                No spam. One email when it launches. That&apos;s it.
              </p>
            </form>
          )}
        </div>
      </div>

      {/* What's inside preview */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-[10px] font-bold tracking-widest uppercase text-[#aaaaaa] mb-2">Preview</p>
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#3a3a3a]">
            What&apos;s Inside
          </h2>
        </div>

        <div className="space-y-4">
          {config.phases.map((phase) => (
            <div key={phase.id} className="bg-white border border-[#e7ddd3] rounded-2xl overflow-hidden">
              {/* Phase header */}
              <div className="px-5 py-4 flex items-center gap-3" style={{ backgroundColor: phase.bg }}>
                <span className="text-xl">{phase.emoji}</span>
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: phase.accent }}>
                    {phase.phase}
                  </p>
                  <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-[#3a3a3a]">
                    {phase.title}
                  </h3>
                </div>
                <span className="ml-auto text-xs text-[#aaaaaa] font-medium">
                  {phase.lessons.length} lessons
                </span>
              </div>

              {/* Lesson list ~ first 2 visible, rest blurred */}
              <div className="divide-y divide-[#f5f0eb]">
                {phase.lessons.map((lesson, i) => (
                  <div
                    key={lesson.id}
                    className={`px-5 py-3 flex items-center gap-3 ${i >= 2 ? "opacity-40 select-none" : ""}`}
                  >
                    <span className="text-[10px] font-bold text-[#aaaaaa] w-5 shrink-0">{lesson.number}</span>
                    <span className="text-sm text-[#3a3a3a] flex-1">{lesson.title}</span>
                    {i >= 2 && <Lock className="w-3 h-3 text-[#aaaaaa] shrink-0" />}
                    {i < 2 && (
                      <span className="text-[10px] text-[#aaaaaa] shrink-0">{lesson.time}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-3 gap-4 text-center">
          {[
            { value: config.totalTime, label: "Read time" },
            {
              value: `${config.phases.reduce((a, p) => a + p.lessons.length, 0)}`,
              label: "Lessons",
            },
            { value: `${config.phases.length}`, label: "Phases" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-[#e7ddd3] rounded-2xl py-5">
              <p className="text-2xl font-bold text-[#3a3a3a]">{s.value}</p>
              <p className="text-[10px] text-[#aaaaaa] uppercase tracking-widest mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA repeat */}
        {!success && (
          <div className="mt-12 bg-[#3a3a3a] rounded-3xl p-8 text-center">
            <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: config.catalog.accent }}>
              Be first in line
            </p>
            <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-white mb-3">
              Get Early Access
            </h3>
            <p className="text-white/50 text-sm max-w-sm mx-auto mb-6 leading-relaxed">
              Join the list and be notified the moment {config.heroTitle} launches ~ often with a discount for early supporters.
            </p>
            <form onSubmit={handleSubmit} className="max-w-xs mx-auto space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/40 transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all disabled:opacity-50"
                style={{ backgroundColor: config.catalog.accent }}
              >
                {loading ? "Joining..." : "Join the Waitlist →"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
