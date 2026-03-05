"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Calendar,
  Plane,
  Info,
  RotateCcw,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Trip {
  id: string;
  entry: string;
  exit: string;
}

// ─── Pure date utilities ──────────────────────────────────────────────────────
function toUTC(s: string): Date {
  return new Date(s + "T00:00:00Z");
}

function toISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setUTCDate(r.getUTCDate() + n);
  return r;
}

function fmtDate(s: string): string {
  return toUTC(s).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function tripDuration(t: Trip): number {
  if (!t.entry || !t.exit) return 0;
  const diff = toUTC(t.exit).getTime() - toUTC(t.entry).getTime();
  return diff < 0 ? 0 : Math.round(diff / 86400000) + 1;
}

// ─── Schengen 90/180 calculation logic ───────────────────────────────────────

/** Build a Set of all ISO date strings that are Schengen days */
function buildSchengenSet(trips: Trip[]): Set<string> {
  const days = new Set<string>();
  for (const t of trips) {
    if (!t.entry || !t.exit) continue;
    const entry = toUTC(t.entry);
    const exit = toUTC(t.exit);
    if (exit < entry) continue;
    const cur = new Date(entry);
    while (cur <= exit) {
      days.add(toISO(cur));
      cur.setUTCDate(cur.getUTCDate() + 1);
    }
  }
  return days;
}

/** Count Schengen days in the 180-day rolling window ending on `ref` (inclusive) */
function daysUsedOn(set: Set<string>, ref: Date): number {
  let n = 0;
  const cur = addDays(ref, -179); // window start = ref - 179 days (180 total)
  while (cur <= ref) {
    if (set.has(toISO(cur))) n++;
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return n;
}

/**
 * Maximum continuous days you can stay if entering on `entry`,
 * given the existing Schengen days in `set`.
 * Returns 0 if you cannot enter at all.
 */
function calcMaxStay(set: Set<string>, entry: Date): number {
  const sim = new Set(set);
  let stay = 0;
  const cur = new Date(entry);
  while (stay < 90) {
    const iso = toISO(cur);
    sim.add(iso);
    if (daysUsedOn(sim, cur) > 90) {
      sim.delete(iso);
      break;
    }
    stay++;
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return stay;
}

/** Find the earliest date after `after` when you can re-enter Schengen */
function nextSafeEntry(set: Set<string>, after: Date): string | null {
  const cur = addDays(after, 1);
  const limit = addDays(after, 185);
  while (cur < limit) {
    if (calcMaxStay(set, cur) > 0) return toISO(cur);
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return null;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SchengenCalculator() {
  const todayISO = useMemo(() => toISO(new Date()), []);
  const todayDate = useMemo(() => toUTC(todayISO), [todayISO]);

  const [trips, setTrips] = useState<Trip[]>([
    { id: "1", entry: "", exit: "" },
  ]);
  const [checkEntry, setCheckEntry] = useState("");
  const [checkDays, setCheckDays] = useState(30);

  // ── Core computed values ────────────────────────────────────────────────────
  const schengenSet = useMemo(() => buildSchengenSet(trips), [trips]);

  const daysUsedNow = useMemo(
    () => daysUsedOn(schengenSet, todayDate),
    [schengenSet, todayDate]
  );

  const daysLeft = Math.max(0, 90 - daysUsedNow);

  const windowStart = useMemo(() => addDays(todayDate, -179), [todayDate]);

  const safeNextDate = useMemo(() => {
    if (daysLeft > 0) return null;
    return nextSafeEntry(schengenSet, todayDate);
  }, [schengenSet, daysLeft, todayDate]);

  type Status = "clear" | "safe" | "warning" | "danger";
  const status: Status =
    daysUsedNow === 0
      ? "clear"
      : daysLeft === 0
      ? "danger"
      : daysLeft <= 15
      ? "warning"
      : "safe";

  // ── 180-day timeline ────────────────────────────────────────────────────────
  const timelineData = useMemo(() => {
    const data: { date: string; isSchengen: boolean; isToday: boolean }[] = [];
    const cur = new Date(windowStart);
    while (cur <= todayDate) {
      const iso = toISO(cur);
      data.push({
        date: iso,
        isSchengen: schengenSet.has(iso),
        isToday: iso === todayISO,
      });
      cur.setUTCDate(cur.getUTCDate() + 1);
    }
    return data;
  }, [schengenSet, windowStart, todayDate, todayISO]);

  // Chunk into rows of 30 for the grid
  const timelineRows = useMemo(() => {
    const rows: (typeof timelineData)[] = [];
    for (let i = 0; i < timelineData.length; i += 30) {
      rows.push(timelineData.slice(i, i + 30));
    }
    return rows;
  }, [timelineData]);

  // ── Future trip check ───────────────────────────────────────────────────────
  const futureCheck = useMemo(() => {
    if (!checkEntry) return null;
    const entry = toUTC(checkEntry);
    const max = calcMaxStay(schengenSet, entry);
    return {
      maxDays: max,
      canStay: max >= checkDays,
      mustExitBy: max > 0 ? toISO(addDays(entry, max - 1)) : null,
    };
  }, [schengenSet, checkEntry, checkDays]);

  // ── Trip management ─────────────────────────────────────────────────────────
  const addTrip = () =>
    setTrips((p) => [...p, { id: Date.now().toString(), entry: "", exit: "" }]);

  const removeTrip = (id: string) =>
    setTrips((p) => p.filter((t) => t.id !== id));

  const updateTrip = (id: string, f: "entry" | "exit", v: string) =>
    setTrips((p) => p.map((t) => (t.id === id ? { ...t, [f]: v } : t)));

  const reset = () => {
    setTrips([{ id: "1", entry: "", exit: "" }]);
    setCheckEntry("");
    setCheckDays(30);
  };

  // ── Status style helpers ────────────────────────────────────────────────────
  const statusStyles: Record<Status, { card: string; num: string; icon: string }> = {
    clear: {
      card: "bg-white border-[#e7ddd3]",
      num: "text-[#3a3a3a]/30",
      icon: "text-[#bbcccd]",
    },
    safe: {
      card: "bg-[#d4e0d3]/40 border-[#8fa38d]/30",
      num: "text-[#8fa38d]",
      icon: "text-[#8fa38d]",
    },
    warning: {
      card: "bg-amber-50 border-amber-200",
      num: "text-amber-600",
      icon: "text-amber-400",
    },
    danger: {
      card: "bg-red-50 border-red-200",
      num: "text-red-500",
      icon: "text-red-400",
    },
  };
  const ss = statusStyles[status];

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-12 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-[#e7ddd3] rounded-full px-4 py-2 text-sm font-semibold text-[#3a3a3a] mb-6">
            <span>🇪🇺</span>
            <span>Schengen 90/180 Rule Calculator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-4 leading-tight">
            Know Exactly How Long
            <br className="hidden sm:block" /> You Can Stay
          </h1>
          <p className="text-lg text-[#3a3a3a]/60 max-w-2xl mx-auto leading-relaxed">
            Track your Schengen days in real time. Add your past trips, see
            your rolling 180-day window, and plan future travel without
            guessing.
          </p>
        </div>
      </section>

      {/* ── Main ─────────────────────────────────────────────────────────────── */}
      <main className="pb-24 px-6">
        <div className="container mx-auto max-w-4xl space-y-6">

          {/* ── Trip Input ────────────────────────────────────────────────────── */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#e7ddd3]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#3a3a3a] flex items-center gap-2">
                <Plane className="w-5 h-5 text-[#e3a99c]" />
                Your Schengen Trips
              </h2>
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#3a3a3a]/30 hover:text-[#3a3a3a]/60 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            <div className="space-y-5">
              {trips.map((trip, i) => {
                const dur = tripDuration(trip);
                const hasError =
                  trip.entry &&
                  trip.exit &&
                  toUTC(trip.exit) < toUTC(trip.entry);

                return (
                  <div
                    key={trip.id}
                    className="flex flex-col sm:flex-row gap-3 items-start sm:items-end"
                  >
                    {/* Trip number */}
                    <span className="hidden sm:block text-sm font-bold text-[#3a3a3a]/25 w-7 shrink-0 text-center pb-2.5">
                      {i + 1}
                    </span>

                    {/* Date inputs */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-[#3a3a3a]/40 mb-1.5">
                          Entry Date
                        </label>
                        <input
                          type="date"
                          value={trip.entry}
                          onChange={(e) =>
                            updateTrip(trip.id, "entry", e.target.value)
                          }
                          className="w-full rounded-xl border border-[#e7ddd3] px-4 py-2.5 text-sm text-[#3a3a3a] bg-[#f9f5f2] focus:outline-none focus:ring-2 focus:ring-[#e3a99c]/40 focus:border-[#e3a99c] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-[#3a3a3a]/40 mb-1.5">
                          Exit Date
                        </label>
                        <input
                          type="date"
                          value={trip.exit}
                          onChange={(e) =>
                            updateTrip(trip.id, "exit", e.target.value)
                          }
                          className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#3a3a3a] bg-[#f9f5f2] focus:outline-none focus:ring-2 focus:ring-[#e3a99c]/40 focus:border-[#e3a99c] transition-all ${
                            hasError ? "border-red-300" : "border-[#e7ddd3]"
                          }`}
                        />
                        {hasError && (
                          <p className="text-[10px] text-red-400 mt-1">
                            Exit must be after entry.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Duration badge + remove */}
                    <div className="flex items-center gap-2 pb-0 sm:pb-0.5">
                      {dur > 0 && !hasError ? (
                        <span className="text-xs font-bold text-[#e3a99c] bg-[#f2d6c9]/60 rounded-full px-3 py-1.5 whitespace-nowrap">
                          {dur}d
                        </span>
                      ) : (
                        <span className="w-14" />
                      )}
                      {trips.length > 1 && (
                        <button
                          onClick={() => removeTrip(trip.id)}
                          className="p-2 rounded-xl text-[#3a3a3a]/20 hover:text-red-400 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={addTrip}
              className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#e3a99c] hover:text-[#3a3a3a] transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add another trip
            </button>
          </div>

          {/* ── Status Dashboard ──────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Days Used */}
            <div className="bg-white rounded-3xl p-6 border border-[#e7ddd3] shadow-sm">
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#3a3a3a]/40 mb-3">
                Days Used
              </p>
              <div className="text-5xl font-bold text-[#3a3a3a] tabular-nums mb-1">
                {daysUsedNow}
              </div>
              <p className="text-xs text-[#3a3a3a]/40 mb-4">
                out of 90 in this window
              </p>
              <div className="h-1.5 bg-[#e7ddd3] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    daysUsedNow >= 90
                      ? "bg-red-400"
                      : daysUsedNow >= 75
                      ? "bg-amber-400"
                      : "bg-[#8fa38d]"
                  }`}
                  style={{
                    width: `${Math.min(100, (daysUsedNow / 90) * 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Days Remaining */}
            <div
              className={`rounded-3xl p-6 border shadow-sm ${ss.card}`}
            >
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#3a3a3a]/40 mb-3">
                Days Remaining
              </p>
              <div
                className={`text-5xl font-bold tabular-nums mb-1 ${ss.num}`}
              >
                {daysLeft}
              </div>
              <p className="text-xs text-[#3a3a3a]/40">
                {daysLeft === 0 && safeNextDate
                  ? `Next entry: ${fmtDate(safeNextDate)}`
                  : "days left in window"}
              </p>
            </div>

            {/* Status */}
            <div
              className={`rounded-3xl p-6 border shadow-sm flex flex-col ${ss.card}`}
            >
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#3a3a3a]/40 mb-3">
                Status
              </p>
              {status === "clear" && (
                <>
                  <CheckCircle2 className={`w-9 h-9 mb-2 ${ss.icon}`} />
                  <p className={`font-bold text-lg ${ss.num}`}>No trips yet</p>
                  <p className="text-xs text-[#3a3a3a]/40 mt-1">
                    Add your dates above
                  </p>
                </>
              )}
              {status === "safe" && (
                <>
                  <CheckCircle2 className={`w-9 h-9 mb-2 ${ss.icon}`} />
                  <p className={`font-bold text-lg ${ss.num}`}>All good 🎉</p>
                  <p className="text-xs text-[#3a3a3a]/40 mt-1">
                    {daysLeft} days available
                  </p>
                </>
              )}
              {status === "warning" && (
                <>
                  <AlertTriangle className={`w-9 h-9 mb-2 ${ss.icon}`} />
                  <p className={`font-bold text-lg ${ss.num}`}>Running low</p>
                  <p className="text-xs text-[#3a3a3a]/40 mt-1">
                    Only {daysLeft} days left
                  </p>
                </>
              )}
              {status === "danger" && (
                <>
                  <XCircle className={`w-9 h-9 mb-2 ${ss.icon}`} />
                  <p className={`font-bold text-lg ${ss.num}`}>Limit reached</p>
                  <p className="text-xs text-[#3a3a3a]/40 mt-1">
                    {safeNextDate
                      ? `Next entry: ${fmtDate(safeNextDate)}`
                      : "No days available"}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* ── 180-Day Timeline ──────────────────────────────────────────────── */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#e7ddd3]">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xl font-bold text-[#3a3a3a]">
                180-Day Window
              </h2>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#3a3a3a]/40">
                  <span className="w-3 h-3 rounded-sm bg-[#e3a99c] inline-block flex-shrink-0" />
                  In Schengen
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#3a3a3a]/40">
                  <span className="w-3 h-3 rounded-sm bg-[#e7ddd3] inline-block flex-shrink-0" />
                  Outside
                </span>
              </div>
            </div>

            <p className="text-xs text-[#3a3a3a]/30 mb-6">
              {fmtDate(toISO(windowStart))} — {fmtDate(todayISO)}
            </p>

            {/* Day grid: rows of 30 with month labels */}
            <div className="space-y-1.5">
              {timelineRows.map((row, ri) => {
                const month = toUTC(row[0].date).toLocaleDateString("en-US", {
                  month: "short",
                  timeZone: "UTC",
                });
                return (
                  <div key={ri} className="flex items-center gap-2">
                    <span className="text-[10px] text-[#3a3a3a]/30 w-7 shrink-0 text-right font-semibold">
                      {month}
                    </span>
                    <div
                      className="flex-1 grid gap-0.5"
                      style={{
                        gridTemplateColumns: `repeat(${row.length}, 1fr)`,
                      }}
                    >
                      {row.map((day) => (
                        <div
                          key={day.date}
                          title={`${day.date}${day.isSchengen ? " · In Schengen" : ""}`}
                          className={`aspect-square rounded-[2px] cursor-default transition-opacity duration-150 hover:opacity-60 ${
                            day.isToday
                              ? `ring-[1.5px] ring-[#3a3a3a]/50 ring-offset-[1px] ${
                                  day.isSchengen
                                    ? "bg-[#e3a99c]"
                                    : "bg-[#e7ddd3]"
                                }`
                              : day.isSchengen
                              ? "bg-[#e3a99c]"
                              : "bg-[#e7ddd3]/60"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-[10px] text-[#3a3a3a]/30 mt-4 leading-relaxed">
              Hover any block to see the date. The outlined block is today.
              Orange = Schengen days used.
            </p>
          </div>

          {/* ── Future Trip Planner ───────────────────────────────────────────── */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#e7ddd3]">
            <h2 className="text-xl font-bold text-[#3a3a3a] mb-1 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#e3a99c]" />
              Plan a Future Trip
            </h2>
            <p className="text-sm text-[#3a3a3a]/50 mb-6">
              Pick an entry date to see exactly how many Schengen days you can
              use.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[#3a3a3a]/40 mb-1.5">
                  Planned Entry Date
                </label>
                <input
                  type="date"
                  value={checkEntry}
                  min={todayISO}
                  onChange={(e) => setCheckEntry(e.target.value)}
                  className="w-full rounded-xl border border-[#e7ddd3] px-4 py-3 text-sm text-[#3a3a3a] bg-[#f9f5f2] focus:outline-none focus:ring-2 focus:ring-[#e3a99c]/40 focus:border-[#e3a99c] transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[#3a3a3a]/40 mb-1.5">
                  Desired Stay (days)
                </label>
                <input
                  type="number"
                  min={1}
                  max={90}
                  value={checkDays}
                  onChange={(e) =>
                    setCheckDays(
                      Math.min(90, Math.max(1, Number(e.target.value)))
                    )
                  }
                  className="w-full rounded-xl border border-[#e7ddd3] px-4 py-3 text-sm text-[#3a3a3a] bg-[#f9f5f2] focus:outline-none focus:ring-2 focus:ring-[#e3a99c]/40 focus:border-[#e3a99c] transition-all"
                />
              </div>
            </div>

            {/* Result */}
            {checkEntry && futureCheck ? (
              <div
                className={`rounded-2xl p-5 ${
                  futureCheck.maxDays === 0
                    ? "bg-red-50 border border-red-200"
                    : futureCheck.canStay
                    ? "bg-[#d4e0d3]/40 border border-[#8fa38d]/30"
                    : "bg-amber-50 border border-amber-200"
                }`}
              >
                {futureCheck.maxDays === 0 ? (
                  <div className="flex gap-3">
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-red-600">
                        You cannot enter on {fmtDate(checkEntry)}.
                      </p>
                      <p className="text-sm text-red-400/80 mt-1">
                        No Schengen days available on that date.
                        {safeNextDate &&
                          ` Earliest possible entry: ${fmtDate(safeNextDate)}.`}
                      </p>
                    </div>
                  </div>
                ) : futureCheck.canStay ? (
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#8fa38d] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#8fa38d]">
                        ✓ You can stay {checkDays} days.
                      </p>
                      <p className="text-sm text-[#3a3a3a]/60 mt-1">
                        Maximum available:{" "}
                        <strong>{futureCheck.maxDays} days</strong>.
                        {futureCheck.mustExitBy && (
                          <>
                            {" "}
                            You must exit by{" "}
                            <strong>{fmtDate(futureCheck.mustExitBy)}</strong>.
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-amber-700">
                        You can only stay {futureCheck.maxDays} days (not{" "}
                        {checkDays}).
                      </p>
                      <p className="text-sm text-amber-600/80 mt-1">
                        {futureCheck.mustExitBy && (
                          <>
                            Must exit by{" "}
                            <strong>{fmtDate(futureCheck.mustExitBy)}</strong>.
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-2xl p-5 bg-[#f9f5f2] border border-[#e7ddd3] text-center">
                <p className="text-sm text-[#3a3a3a]/40">
                  Pick an entry date above to see your options.
                </p>
              </div>
            )}
          </div>

          {/* ── How it works ──────────────────────────────────────────────────── */}
          <div className="bg-[#f2d6c9]/30 rounded-3xl p-6 md:p-8 border border-[#e3a99c]/20">
            <div className="flex gap-4">
              <Info className="w-5 h-5 text-[#e3a99c] shrink-0 mt-0.5" />
              <div className="space-y-3 text-sm text-[#3a3a3a]/70">
                <p className="font-bold text-[#3a3a3a] text-base">
                  How the 90/180 Rule Works
                </p>
                <p>
                  You can spend a maximum of{" "}
                  <strong>90 days in any 180-day rolling window</strong> in the
                  Schengen Area. The window is constantly moving, not tied to a
                  calendar year.
                </p>
                <p>
                  On any given day, count back 180 days. If 90 or more of those
                  days were spent in Schengen, you must leave (or stay out).
                  Both your entry day <em>and</em> exit day count as Schengen
                  days.
                </p>

                <div className="grid grid-cols-3 gap-3 pt-1">
                  <div className="bg-white/70 rounded-2xl p-4 text-center">
                    <p className="text-2xl font-bold text-[#e3a99c] mb-1">
                      90
                    </p>
                    <p className="text-[11px] text-[#3a3a3a]/50">
                      max days allowed
                    </p>
                  </div>
                  <div className="bg-white/70 rounded-2xl p-4 text-center">
                    <p className="text-2xl font-bold text-[#e3a99c] mb-1">
                      180
                    </p>
                    <p className="text-[11px] text-[#3a3a3a]/50">
                      day rolling window
                    </p>
                  </div>
                  <div className="bg-white/70 rounded-2xl p-4 text-center">
                    <p className="text-2xl font-bold text-[#e3a99c] mb-1">
                      Both
                    </p>
                    <p className="text-[11px] text-[#3a3a3a]/50">
                      entry & exit count
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-[#3a3a3a]/40 pt-1 border-t border-[#e3a99c]/20">
                  For informational purposes only. Always verify with official
                  immigration sources. Rules may vary by nationality and
                  bilateral agreements.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
