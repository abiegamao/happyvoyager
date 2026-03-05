"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Pad({ n }: { n: number }) {
  return <>{String(n).padStart(2, "0")}</>;
}

function CountdownBlock({
  label,
  target,
  accent,
  emoji,
  bg,
  note,
}: {
  label: string;
  target: Date;
  accent: string;
  emoji: string;
  bg: string;
  note: string;
}) {
  const [t, setT] = useState<TimeLeft>(calcTimeLeft(target));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setT(calcTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!mounted) return null;

  const done = t.days === 0 && t.hours === 0 && t.minutes === 0 && t.seconds === 0;

  return (
    <div className={`rounded-3xl p-7 ${bg} flex flex-col gap-5`}>
      <div>
        <p className="text-xs font-bold tracking-widest uppercase mb-1 opacity-60">{label}</p>
        <p className="text-2xl font-bold leading-snug" style={{ color: accent }}>
          {emoji}
        </p>
      </div>

      {done ? (
        <p className="text-3xl font-bold" style={{ color: accent }}>🎉 It&apos;s time!</p>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {[
            { v: t.days, u: "days" },
            { v: t.hours, u: "hrs" },
            { v: t.minutes, u: "min" },
            { v: t.seconds, u: "sec" },
          ].map(({ v, u }) => (
            <div key={u} className="text-center bg-white/60 rounded-2xl py-3 px-1">
              <div
                className="font-[family-name:var(--font-heading)] text-3xl font-bold tabular-nums"
                style={{ color: accent }}
              >
                <Pad n={v} />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-50 mt-0.5">{u}</div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs opacity-50 leading-relaxed">{note}</p>
    </div>
  );
}

export default function CitizenshipCountdown() {
  // Citizenship eligibility: 2 years from DNV approval (March 5, 2026)
  const citizenshipDate = new Date("2028-03-05T00:00:00");
  // A2 exam goal: end of 2026
  const a2Date = new Date("2026-12-31T23:59:59");

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <CountdownBlock
        label="Citizenship eligibility in"
        emoji="🇪🇸 The Big One"
        target={citizenshipDate}
        accent="#8fa38d"
        bg="bg-[#d4e0d3]/40"
        note="2 years of legal residency required. Filing window opens March 2028 — then approx. 6–18 months to process."
      />
      <CountdownBlock
        label="DELE A2 exam goal"
        emoji="📖 A2 by end of 2026"
        target={a2Date}
        accent="#e3a99c"
        bg="bg-[#f2d6c9]/40"
        note="My personal deadline to pass the Spanish language exam. No excuses. The clock is running."
      />
    </div>
  );
}
