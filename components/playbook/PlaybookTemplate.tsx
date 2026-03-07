"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Lock,
  Unlock,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  Clock,
  X,
  Zap,
  BookOpen,
  Trophy,
  RefreshCw,
  Mail,
  LogOut,
} from "lucide-react";
import type { PlaybookConfig } from "@/data/playbooks/types";
import WaitlistModal from "./WaitlistModal";

/* ─────────────────────────────────────────────
   Admin bypass ~ email addresses that get Pro
   access without a Stripe purchase
───────────────────────────────────────────── */
const ADMIN_EMAILS = ["joenabie@me.com"];
const isAdminEmail = (e: string) => ADMIN_EMAILS.includes(e.toLowerCase().trim());

/* ─────────────────────────────────────────────
   Tag color helper
───────────────────────────────────────────── */
function tagStyle(tag: string) {
  if (tag.includes("Tool") || tag.includes("Interactive"))
    return "bg-[#d4e0d3] text-[#5d7a5b]";
  if (tag.includes("Core")) return "bg-[#f2d6c9] text-[#c47a6a]";
  if (tag.includes("Tax")) return "bg-[#f5ecd7] text-[#9a7a3a]";
  if (tag.includes("Updated")) return "bg-[#e0eaeb] text-[#4a7070]";
  if (tag.includes("Shortcut")) return "bg-[#f2d6c9] text-[#e3a99c]";
  return "bg-[#f0ebe6] text-[#7a7a7a]";
}

/* ─────────────────────────────────────────────
   Lesson Modal (iframe)
───────────────────────────────────────────── */
function LessonModal({
  url,
  title,
  onClose,
}: {
  url: string;
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[95] flex flex-col">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex flex-col w-full h-full max-w-5xl mx-auto my-4 lg:my-8 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex-shrink-0 flex items-center justify-between gap-4 bg-[#3a3a3a] text-white px-4 py-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-1.5 h-1.5 rounded-full bg-[#e3a99c] flex-shrink-0" />
            <p className="text-sm font-semibold text-white truncate">{title}</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-white/50 hover:text-white/90 transition-colors"
            >
              Full page <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
        <iframe
          src={`${url}${url.includes("?") ? "&" : "?"}embed=1`}
          className="flex-1 w-full border-0 bg-[#f9f5f2]"
          title={title}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Lesson Content Modal
   For Pro lessons that don't have a dedicated
   page yet ~ shows description + bullets inline
───────────────────────────────────────────── */
function LessonContentModal({
  lesson,
  accentColor,
  bgColor,
  onClose,
}: {
  lesson: { number: string; title: string; description: string; bullets: string[]; time: string; tag: string };
  accentColor: string;
  bgColor: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#f9f5f2] rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 bg-[#3a3a3a] text-white flex-shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-1.5 h-1.5 rounded-full bg-[#e3a99c] flex-shrink-0" />
            <p className="text-sm font-semibold text-white truncate">
              Lesson {lesson.number} ~ {lesson.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${tagStyle(lesson.tag)}`}>
              {lesson.tag}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-[#aaaaaa]">
              <Clock className="w-3 h-3" />
              {lesson.time}
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#3a3a3a] mb-4 leading-tight">
            {lesson.title}
          </h2>
          <p className="text-sm text-[#6b6b6b] leading-relaxed mb-6">
            {lesson.description}
          </p>
          <div className="rounded-2xl p-5" style={{ backgroundColor: bgColor }}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#6b6b6b] mb-3">
              What&apos;s covered
            </p>
            <ul className="space-y-3">
              {lesson.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm text-[#3a3a3a] leading-relaxed">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: accentColor }}
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Email Capture Modal
───────────────────────────────────────────── */
function EmailCaptureModal({
  lessonTitle,
  onSubmit,
  onClose,
}: {
  lessonTitle: string;
  onSubmit: (email: string) => void;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setTimeout(() => onSubmit(email), 600);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f0ebe6] flex items-center justify-center hover:bg-[#e7ddd3] transition-colors"
        >
          <X className="w-4 h-4 text-[#6b6b6b]" />
        </button>
        <div className="w-12 h-12 rounded-2xl bg-[#d4e0d3] flex items-center justify-center mx-auto mb-5">
          <Mail className="w-6 h-6 text-[#8fa38d]" />
        </div>
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#3a3a3a] text-center mb-2">
          Unlock Free Access
        </h2>
        <p className="text-[#6b6b6b] text-sm text-center mb-1 leading-relaxed">
          Enter your email to unlock:
        </p>
        <p className="text-[#3a3a3a] text-sm font-semibold text-center mb-6 px-4">
          {lessonTitle}
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-xl border border-[#e7ddd3] bg-[#f9f5f2] text-[#3a3a3a] text-sm focus:outline-none focus:border-[#e3a99c] transition-colors"
            autoFocus
          />
          {error && <p className="text-[#e3a99c] text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-[#3a3a3a] text-white font-bold hover:bg-[#e3a99c] transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Unlock className="w-4 h-4" />
                Unlock Free Lesson
              </>
            )}
          </button>
        </form>
        <p className="text-center text-[10px] text-[#aaaaaa] mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Unlock Modal (Stripe-powered)
───────────────────────────────────────────── */
function UnlockModal({
  onClose,
  onProUnlocked,
  playbookSlug,
  totalLessons,
  modalFeatures,
}: {
  onClose: () => void;
  onProUnlocked: (email: string) => void;
  playbookSlug: string;
  totalLessons: number;
  modalFeatures: string[];
}) {
  const [tab, setTab] = useState<"buy" | "restore">("buy");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Auto-close after success animation
  useEffect(() => {
    if (!success) return;
    const t = setTimeout(onClose, 2000);
    return () => clearTimeout(t);
  }, [success, onClose]);

  const switchTab = (t: "buy" | "restore") => {
    setTab(t);
    setError("");
    setEmail("");
  };

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, slug: playbookSlug }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleRestore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter your email address.");
      return;
    }
    const clean = email.toLowerCase().trim();
    setLoading(true);
    setError("");

    // Admin bypass ~ no Stripe check needed
    if (isAdminEmail(clean)) {
      localStorage.setItem(`hv_pro_${playbookSlug}`, clean);
      localStorage.setItem("hv_email", clean);
      onProUnlocked(clean);
      setLoading(false);
      setSuccess(true);
      return;
    }

    try {
      const res = await fetch("/api/stripe/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, slug: playbookSlug }),
      });
      const data = await res.json();
      if (data.hasAccess) {
        localStorage.setItem(`hv_pro_${playbookSlug}`, clean);
        localStorage.setItem("hv_email", clean);
        onProUnlocked(clean);
        setSuccess(true);
      } else {
        setError("No purchase found for this email. Try a different address or get access below.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f0ebe6] flex items-center justify-center hover:bg-[#e7ddd3] transition-colors"
        >
          <X className="w-4 h-4 text-[#6b6b6b]" />
        </button>
        <div className="w-12 h-12 rounded-2xl bg-[#f2d6c9] flex items-center justify-center mx-auto mb-5">
          <Zap className="w-6 h-6 text-[#e3a99c]" />
        </div>
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#3a3a3a] text-center mb-2">
          Unlock Playbook Pro
        </h2>
        <p className="text-[#6b6b6b] text-sm text-center mb-5 leading-relaxed">
          Full access to all {totalLessons} lessons ~ application to Spanish passport.
        </p>

        {/* Success state */}
        {success && (
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-[#d4e0d3] flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-[#8fa38d]" />
              </div>
              <div className="absolute inset-0 rounded-full bg-[#8fa38d]/30 animate-ping" />
            </div>
            <div className="text-center">
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#3a3a3a] mb-1">
                Access Restored!
              </h3>
              <p className="text-sm text-[#6b6b6b]">Unlocking all lessons now...</p>
            </div>
          </div>
        )}

        {/* Tabs ~ hidden once success animation plays */}
        {!success && (
          <>
            <div className="flex rounded-xl bg-[#f0ebe6] p-1 mb-6">
              <button
                onClick={() => switchTab("buy")}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${tab === "buy" ? "bg-white text-[#3a3a3a] shadow-sm" : "text-[#6b6b6b]"
                  }`}
              >
                Get Access
              </button>
              <button
                onClick={() => switchTab("restore")}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${tab === "restore" ? "bg-white text-[#3a3a3a] shadow-sm" : "text-[#6b6b6b]"
                  }`}
              >
                Restore Access
              </button>
            </div>

            {tab === "buy" && (
              <>
                <ul className="space-y-2 mb-5">
                  {modalFeatures.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-[#3a3a3a]">
                      <CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <form onSubmit={handleBuy} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#e7ddd3] bg-[#f9f5f2] text-[#3a3a3a] text-sm focus:outline-none focus:border-[#e3a99c] transition-colors"
                    autoFocus
                  />
                  {error && <p className="text-red-400 text-xs">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-full bg-[#3a3a3a] text-white font-bold hover:bg-[#e3a99c] transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Get Instant Access →
                      </>
                    )}
                  </button>
                </form>
                <p className="text-center text-[10px] text-[#aaaaaa] mt-3">
                  Secure payment via Stripe. One-time purchase ~ lifetime access.
                </p>
              </>
            )}

            {tab === "restore" && (
              <>
                <p className="text-sm text-[#6b6b6b] mb-5 text-center leading-relaxed">
                  Already purchased? Enter the email you used to restore full access on this device.
                </p>
                <form onSubmit={handleRestore} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#e7ddd3] bg-[#f9f5f2] text-[#3a3a3a] text-sm focus:outline-none focus:border-[#e3a99c] transition-colors"
                    autoFocus
                  />
                  {error && <p className="text-red-400 text-xs">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-full bg-[#3a3a3a] text-white font-bold hover:bg-[#e3a99c] transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Unlock className="w-4 h-4" />
                        Restore My Access
                      </>
                    )}
                  </button>
                </form>
                <p className="text-center text-[10px] text-[#aaaaaa] mt-3">
                  Can&apos;t find it? Email hello@abiemaxey.com for help.
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Template
───────────────────────────────────────────── */
export default function PlaybookTemplate({
  config,
  waitlistMode = false,
}: {
  config: PlaybookConfig;
  waitlistMode?: boolean;
}) {
  const totalLessons = config.phases.reduce((acc, p) => acc + p.lessons.length, 0);
  const freeLessons = config.phases.reduce(
    (acc, p) => acc + p.lessons.filter((l) => l.free).length,
    0
  );
  const next = config.nextPlaybook ?? null;

  const [activePhase, setActivePhase] = useState(config.phases[0]?.id ?? "");
  const [expandedPhases, setExpandedPhases] = useState<string[]>([config.phases[0]?.id ?? ""]);
  const [showModal, setShowModal] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [lessonModal, setLessonModal] = useState<{ url: string; title: string } | null>(null);
  const [lessonContentModal, setLessonContentModal] = useState<{
    lesson: PlaybookConfig["phases"][0]["lessons"][0];
    accentColor: string;
    bgColor: string;
  } | null>(null);
  const [emailCaptureTarget, setEmailCaptureTarget] = useState<{ url: string; title: string } | null>(null);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [proEmail, setProEmail] = useState("");

  const proKey = `hv_pro_${config.slug}`;

  // Handle Stripe return + restore stored pro access (skipped in waitlist mode)
  useEffect(() => {
    if (waitlistMode) return;

    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (sessionId) {
      window.history.replaceState({}, "", `/playbook/${config.slug}`);
      fetch(`/api/stripe/verify-session?session_id=${sessionId}&slug=${config.slug}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.hasAccess && data.email) {
            localStorage.setItem(proKey, data.email);
            localStorage.setItem("hv_email", data.email);
            setIsPro(true);
            setProEmail(data.email);
            setEmailCaptured(true);
          }
        })
        .catch(console.error);
      return;
    }

    const storedProEmail = localStorage.getItem(proKey);
    if (storedProEmail) {
      // Admin bypass ~ no Stripe check needed
      if (isAdminEmail(storedProEmail)) {
        setIsPro(true);
        setProEmail(storedProEmail);
        setEmailCaptured(true);
        return;
      }
      fetch("/api/stripe/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: storedProEmail, slug: config.slug }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.hasAccess) {
            setIsPro(true);
            setProEmail(storedProEmail);
            setEmailCaptured(true);
          } else {
            localStorage.removeItem(proKey);
            setEmailCaptured(!!localStorage.getItem("hv_email"));
          }
        })
        .catch(() => {
          setIsPro(true);
          setProEmail(storedProEmail);
          setEmailCaptured(true);
        });
    } else {
      setEmailCaptured(!!localStorage.getItem("hv_email"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openFreeLesson = (url: string, title: string) => {
    if (emailCaptured) {
      setLessonModal({ url, title });
    } else {
      setEmailCaptureTarget({ url, title });
    }
  };

  const togglePhase = (id: string) => {
    setExpandedPhases((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleLessonClick = (
    lesson: PlaybookConfig["phases"][0]["lessons"][0],
    phaseAccent: string,
    phaseBg: string,
  ) => {
    if (waitlistMode) {
      setShowWaitlistModal(true);
      return;
    }
    if (isPro) {
      if (lesson.link) {
        setLessonModal({ url: lesson.link, title: lesson.title });
      } else {
        setLessonContentModal({ lesson, accentColor: phaseAccent, bgColor: phaseBg });
      }
    } else if (lesson.free && lesson.link) {
      openFreeLesson(lesson.link, lesson.title);
    } else if (!lesson.free) {
      setShowModal(true);
    }
  };

  const scrollToPhase = (id: string) => {
    setActivePhase(id);
    const el = document.getElementById(`phase-${id}`);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Derived: is a lesson "accessible" (open to click into)
  const isLessonAccessible = (lesson: { free: boolean }) =>
    !waitlistMode && (isPro || lesson.free);

  return (
    <>
      <Header darkBg />

      {/* Stripe unlock modal */}
      {showModal && !waitlistMode && (
        <UnlockModal
          onClose={() => setShowModal(false)}
          onProUnlocked={(email) => {
            setIsPro(true);
            setProEmail(email);
            setEmailCaptured(true);
          }}
          playbookSlug={config.slug}
          totalLessons={totalLessons}
          modalFeatures={config.modalFeatures}
        />
      )}

      {/* Waitlist modal */}
      {showWaitlistModal && (
        <WaitlistModal
          playbook={config}
          onClose={() => setShowWaitlistModal(false)}
        />
      )}

      {emailCaptureTarget && !waitlistMode && (
        <EmailCaptureModal
          lessonTitle={emailCaptureTarget.title}
          onSubmit={(email) => {
            localStorage.setItem("hv_email", email);
            setEmailCaptured(true);
            setLessonModal({ url: emailCaptureTarget.url, title: emailCaptureTarget.title });
            setEmailCaptureTarget(null);
          }}
          onClose={() => setEmailCaptureTarget(null)}
        />
      )}
      {lessonModal && (
        <LessonModal
          url={lessonModal.url}
          title={lessonModal.title}
          onClose={() => setLessonModal(null)}
        />
      )}
      {lessonContentModal && (
        <LessonContentModal
          lesson={lessonContentModal.lesson}
          accentColor={lessonContentModal.accentColor}
          bgColor={lessonContentModal.bgColor}
          onClose={() => setLessonContentModal(null)}
        />
      )}

      {/* ── Mobile Nav Bottom Sheet ───────────────────────────── */}
      {showMobileNav && (
        <div className="fixed inset-0 z-[90] lg:hidden" onClick={() => setShowMobileNav(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#3a3a3a] rounded-t-3xl max-h-[88vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 flex-shrink-0">
              <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
                Course Navigation
              </p>
              <button onClick={() => setShowMobileNav(false)}>
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>
            {/* Scrollable nav */}
            <nav className="flex-1 overflow-y-auto py-2">
              {config.phases.map((phase) => {
                const isExpanded = expandedPhases.includes(phase.id);
                const isActive = activePhase === phase.id;
                return (
                  <div key={phase.id}>
                    <button
                      onClick={() => { togglePhase(phase.id); scrollToPhase(phase.id); }}
                      className={`w-full flex items-center justify-between px-5 py-3 transition-colors ${isActive ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-lg flex-shrink-0">{phase.emoji}</span>
                        <div className="text-left min-w-0">
                          <p className="text-[9px] font-bold tracking-widest uppercase text-white/30">
                            {phase.phase}
                          </p>
                          <p className="text-sm font-semibold leading-tight">{phase.title}</p>
                        </div>
                      </div>
                      <svg
                        className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isExpanded && (
                      <div className="ml-5 border-l border-white/10 py-1">
                        {phase.lessons.map((lesson) => (
                          <button
                            key={lesson.id}
                            onClick={() => {
                              setShowMobileNav(false);
                              if (waitlistMode) {
                                setShowWaitlistModal(true);
                              } else if (isPro) {
                                if (lesson.link) {
                                  setLessonModal({ url: lesson.link, title: lesson.title });
                                } else {
                                  setLessonContentModal({ lesson, accentColor: phase.accent, bgColor: phase.bg });
                                }
                              } else if (lesson.free) {
                                if (lesson.link) openFreeLesson(lesson.link, lesson.title);
                              } else {
                                setShowModal(true);
                              }
                            }}
                            className="w-full flex items-center gap-3 pl-4 pr-4 py-2 text-left group"
                          >
                            {isLessonAccessible(lesson) ? (
                              <span className="w-3.5 h-3.5 rounded-full border border-[#8fa38d] bg-[#8fa38d]/20 flex-shrink-0" />
                            ) : (
                              <Lock className="w-3 h-3 text-white/20 flex-shrink-0" />
                            )}
                            <span className="text-xs text-white/50 group-hover:text-white/80 transition-colors leading-snug">
                              {lesson.number}. {lesson.title}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
            {/* CTA */}
            <div className="p-4 border-t border-white/10 flex-shrink-0">
              {waitlistMode ? (
                <button
                  onClick={() => { setShowMobileNav(false); setShowWaitlistModal(true); }}
                  className="w-full py-3 rounded-xl text-white text-sm font-bold transition-colors flex items-center justify-center gap-2"
                  style={{ backgroundColor: config.catalog.accent }}
                >
                  <Mail className="w-4 h-4" />
                  Join the Waitlist
                </button>
              ) : isPro ? (
                <div className="w-full py-3 rounded-xl bg-[#8fa38d]/20 text-[#8fa38d] text-sm font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Full Access Active
                </div>
              ) : (
                <button
                  onClick={() => { setShowMobileNav(false); setShowModal(true); }}
                  className="w-full py-3 rounded-xl bg-[#e3a99c] text-white text-sm font-bold hover:bg-[#d38b7b] transition-colors flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Unlock All {totalLessons} Lessons
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#f9f5f2] font-sans text-[#3a3a3a]">

        {/* ── Hero ──────────────────────────────────────────────── */}
        <div className="bg-[#3a3a3a] text-white pt-28 pb-12 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="text-[10px] font-bold tracking-widest uppercase bg-[#e3a99c]/20 text-[#e3a99c] border border-[#e3a99c]/30 px-3 py-1.5 rounded-full">
                {config.badge}
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase bg-white/10 text-white/60 px-3 py-1.5 rounded-full">
                {config.badgeLabel}
              </span>
              {waitlistMode ? (
                <span
                  className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border"
                  style={{ color: config.catalog.accent, borderColor: `${config.catalog.accent}40`, backgroundColor: `${config.catalog.accent}20` }}
                >
                  🚀 Early Access ~ Join the Waitlist
                </span>
              ) : (
                <span className="text-[10px] font-bold tracking-widest uppercase bg-[#8fa38d]/20 text-[#8fa38d] border border-[#8fa38d]/30 px-3 py-1.5 rounded-full">
                  {config.updatedLabel}
                </span>
              )}
            </div>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {config.heroTitle}
            </h1>
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-8">
              {config.heroDescription}
            </p>
            <div className="flex flex-wrap gap-6 mb-6">
              {waitlistMode ? (
                <>
                  {[
                    { value: `${totalLessons}`, label: "Lessons" },
                    { value: `${config.phases.length}`, label: "Phases" },
                    { value: config.totalTime, label: "Total read time" },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="text-2xl font-bold text-white">{s.value}</p>
                      <p className="text-xs text-white/40 uppercase tracking-widest">{s.label}</p>
                    </div>
                  ))}
                  <button
                    onClick={() => setShowWaitlistModal(true)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-bold text-sm transition-all hover:opacity-90"
                    style={{ backgroundColor: config.catalog.accent }}
                  >
                    <Mail className="w-4 h-4" />
                    Join the Waitlist
                  </button>
                </>
              ) : (
                [
                  { value: `${totalLessons}`, label: "Lessons" },
                  { value: `${config.phases.length}`, label: "Phases" },
                  { value: `${freeLessons}`, label: "Free" },
                  { value: config.totalTime, label: "Total read time" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-white">{s.value}</p>
                    <p className="text-xs text-white/40 uppercase tracking-widest">{s.label}</p>
                  </div>
                ))
              )}
            </div>
            {!waitlistMode && config.freeVersion && (
              <div className="mt-1 mb-0">
                <Link
                  href={config.freeVersion.link}
                  className="text-white/40 hover:text-white/70 text-xs font-medium transition-colors underline underline-offset-2"
                >
                  {config.freeVersion.label}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ── Docs Layout ─────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto flex gap-0 lg:gap-8 px-0 lg:px-6 py-8">

          {/* ── Sidebar ─────────────────────────────────────────── */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-[#3a3a3a] rounded-2xl overflow-hidden">
              <div className="px-4 py-4 border-b border-white/10">
                <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
                  Course Navigation
                </p>
              </div>
              <nav className="py-2 max-h-[calc(100vh-12rem)] overflow-y-auto">
                {config.phases.map((phase) => {
                  const isExpanded = expandedPhases.includes(phase.id);
                  const isActive = activePhase === phase.id;
                  return (
                    <div key={phase.id}>
                      <button
                        onClick={() => { togglePhase(phase.id); scrollToPhase(phase.id); }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 transition-colors ${isActive ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                          }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-base flex-shrink-0">{phase.emoji}</span>
                          <div className="text-left min-w-0">
                            <p className="text-[9px] font-bold tracking-widest uppercase text-white/30">
                              {phase.phase}
                            </p>
                            <p className="text-xs font-semibold leading-tight truncate">{phase.title}</p>
                          </div>
                        </div>
                        <svg
                          className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isExpanded && (
                        <div className="ml-4 border-l border-white/10 py-1">
                          {phase.lessons.map((lesson) => (
                            <button
                              key={lesson.id}
                              onClick={() => {
                                if (waitlistMode) {
                                  setShowWaitlistModal(true);
                                } else if (isPro) {
                                  if (lesson.link) {
                                    setLessonModal({ url: lesson.link, title: lesson.title });
                                  } else {
                                    setLessonContentModal({ lesson, accentColor: phase.accent, bgColor: phase.bg });
                                  }
                                } else if (lesson.free) {
                                  if (lesson.link) openFreeLesson(lesson.link, lesson.title);
                                } else {
                                  setShowModal(true);
                                }
                              }}
                              className="w-full flex items-center gap-2 pl-3 pr-2 py-1.5 text-left group"
                            >
                              {isLessonAccessible(lesson) ? (
                                <span className="w-3.5 h-3.5 rounded-full border border-[#8fa38d] bg-[#8fa38d]/20 flex-shrink-0" />
                              ) : (
                                <Lock className="w-3 h-3 text-white/20 flex-shrink-0" />
                              )}
                              <span className="text-[11px] text-white/40 group-hover:text-white/70 transition-colors leading-tight">
                                {lesson.number}. {lesson.title}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Sidebar CTA */}
              <div className="p-4 border-t border-white/10">
                {waitlistMode ? (
                  <button
                    onClick={() => setShowWaitlistModal(true)}
                    className="w-full py-2.5 rounded-xl text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
                    style={{ backgroundColor: config.catalog.accent }}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Join the Waitlist
                  </button>
                ) : isPro ? (
                  <div className="w-full py-2.5 rounded-xl bg-[#8fa38d]/20 text-[#8fa38d] text-xs font-bold flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Pro Access Active
                  </div>
                ) : (
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full py-2.5 rounded-xl bg-[#e3a99c] text-white text-xs font-bold hover:bg-[#d38b7b] transition-colors flex items-center justify-center gap-2"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Unlock All {totalLessons} Lessons
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* ── Main Content ─────────────────────────────────────── */}
          <main className="flex-1 min-w-0 px-4 lg:px-0 space-y-6">

            {/* Mobile sticky nav bar */}
            <div className="lg:hidden sticky top-16 z-30 -mx-4 px-4 pt-2 pb-2 bg-[#f9f5f2]/95 backdrop-blur-sm border-b border-[#e7ddd3]">
              <div className="flex flex-wrap gap-1.5 justify-center">
                <button
                  onClick={() => setShowMobileNav(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#3a3a3a] text-white whitespace-nowrap shadow-sm"
                >
                  <BookOpen className="w-3 h-3" />
                  All Lessons
                </button>
                {config.phases.map((phase) => (
                  <button
                    key={phase.id}
                    onClick={() => scrollToPhase(phase.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap ${activePhase === phase.id
                        ? "bg-[#e3a99c] text-white"
                        : "bg-white border border-[#e7ddd3] text-[#6b6b6b]"
                      }`}
                  >
                    {phase.emoji} {phase.phase}
                  </button>
                ))}
              </div>
            </div>

            {/* Access banner */}
            {waitlistMode ? (
              <div
                className="border rounded-2xl px-5 py-4 flex items-start gap-3"
                style={{ backgroundColor: `${config.catalog.accent}15`, borderColor: `${config.catalog.accent}40` }}
              >
                <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: config.catalog.accent }} />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#3a3a3a]">Early Access ~ Content launching soon</p>
                  <p className="text-xs text-[#6b6b6b] mt-0.5">
                    Browse the full lesson outline below and join the waitlist to be notified when this playbook goes live.
                  </p>
                </div>
                <button
                  onClick={() => setShowWaitlistModal(true)}
                  className="flex-shrink-0 text-[10px] font-bold uppercase tracking-widest hover:underline whitespace-nowrap"
                  style={{ color: config.catalog.accent }}
                >
                  Join →
                </button>
              </div>
            ) : isPro ? (
              <div className="bg-[#d4e0d3]/50 border border-[#8fa38d]/40 rounded-2xl px-5 py-4 flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#3a3a3a]">Pro Access Active</p>
                  <p className="text-xs text-[#6b6b6b] mt-0.5">
                    All {totalLessons} lessons unlocked. Logged in as {proEmail}.
                  </p>
                </div>
                <button
                  onClick={() => {
                    localStorage.removeItem(proKey);
                    localStorage.removeItem("hv_email");
                    setIsPro(false);
                    setProEmail("");
                    setEmailCaptured(false);
                  }}
                  className="flex-shrink-0 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#aaaaaa] hover:text-[#3a3a3a] transition-colors"
                  title="Log out"
                >
                  <LogOut className="w-3 h-3" />
                  Log out
                </button>
              </div>
            ) : (
              <div className="bg-[#d4e0d3]/50 border border-[#8fa38d]/40 rounded-2xl px-5 py-4 flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#3a3a3a]">Phase 0 ~ free with your email</p>
                  <p className="text-xs text-[#6b6b6b] mt-0.5">
                    Drop your email to unlock the free lessons. Unlock all {totalLessons - freeLessons} remaining lessons with Playbook Pro.
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex-shrink-0 text-[10px] font-bold uppercase tracking-widest text-[#e3a99c] hover:underline whitespace-nowrap"
                >
                  Unlock →
                </button>
              </div>
            )}

            {/* ── Phases ──────────────────────────────────────────── */}
            {config.phases.map((phase, phaseIdx) => (
              <section key={phase.id} id={`phase-${phase.id}`}>
                {/* Phase header */}
                <div className="rounded-2xl px-6 py-5 mb-4" style={{ backgroundColor: phase.bg }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-full bg-white/60 text-[#3a3a3a]">
                          {phase.phase}
                        </span>
                        <span className="text-[9px] font-bold tracking-widest uppercase text-[#6b6b6b]">
                          {phase.lessons.length} lessons
                        </span>
                      </div>
                      <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#3a3a3a] mb-1">
                        {phase.emoji} {phase.title}
                      </h2>
                      <p className="text-sm text-[#6b6b6b]">{phase.description}</p>
                    </div>
                    {(waitlistMode || (!isPro && phaseIdx > 0 && phase.lessons.every((l) => !l.free))) && (
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-[#6b6b6b]" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Lesson cards */}
                <div className="space-y-3">
                  {phase.lessons.map((lesson) => {
                    const accessible = isLessonAccessible(lesson);
                    return (
                      <div
                        key={lesson.id}
                        className={`relative bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${accessible
                            ? "border-[#e7ddd3] hover:border-[#e3a99c] hover:shadow-md cursor-pointer"
                            : "border-[#e7ddd3] cursor-pointer"
                          }`}
                        onClick={() => handleLessonClick(lesson, phase.accent, phase.bg)}
                      >
                        <div className="p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1 min-w-0">
                              <div
                                className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold"
                                style={{
                                  backgroundColor: accessible ? phase.bg : "#f0ebe6",
                                  color: accessible ? phase.accent : "#aaaaaa",
                                }}
                              >
                                {lesson.number}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                  <h3 className="font-bold text-sm leading-snug text-[#3a3a3a]">
                                    {lesson.title}
                                  </h3>
                                  {waitlistMode ? (
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#6b8cba] bg-[#dde8f5] px-2 py-0.5 rounded-full flex-shrink-0">
                                      Soon
                                    </span>
                                  ) : lesson.free ? (
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#8fa38d] bg-[#d4e0d3] px-2 py-0.5 rounded-full flex-shrink-0">
                                      Free
                                    </span>
                                  ) : isPro ? (
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#8fa38d] bg-[#d4e0d3] px-2 py-0.5 rounded-full flex-shrink-0">
                                      Unlocked
                                    </span>
                                  ) : (
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#e3a99c] bg-[#f2d6c9] px-2 py-0.5 rounded-full flex-shrink-0">
                                      Pro
                                    </span>
                                  )}
                                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full flex-shrink-0 ${tagStyle(lesson.tag)}`}>
                                    {lesson.tag}
                                  </span>
                                </div>
                                <p className="text-xs text-[#6b6b6b] leading-relaxed mb-3">
                                  {lesson.description}
                                </p>
                                <ul className="space-y-1">
                                  {lesson.bullets.map((bullet) => (
                                    <li key={bullet} className="flex items-start gap-2 text-xs text-[#6b6b6b]">
                                      <span
                                        className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                                        style={{ backgroundColor: phase.accent }}
                                      />
                                      {bullet}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Right side CTA */}
                            <div className="flex-shrink-0 flex flex-col items-end gap-2">
                              <div className="flex items-center gap-1 text-[10px] text-[#aaaaaa]">
                                <Clock className="w-3 h-3" />
                                {lesson.time}
                              </div>
                              {waitlistMode ? (
                                <div className="w-7 h-7 rounded-lg bg-[#f0ebe6] flex items-center justify-center">
                                  <Lock className="w-3.5 h-3.5 text-[#aaaaaa]" />
                                </div>
                              ) : accessible ? (
                                lesson.link ? (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (isPro) {
                                        setLessonModal({ url: lesson.link!, title: lesson.title });
                                      } else {
                                        openFreeLesson(lesson.link!, lesson.title);
                                      }
                                    }}
                                    className="flex items-center gap-1 text-[10px] font-bold text-[#8fa38d] hover:text-[#e3a99c] transition-colors whitespace-nowrap"
                                  >
                                    Open <BookOpen className="w-3 h-3" />
                                  </button>
                                ) : null
                              ) : (
                                <div className="w-7 h-7 rounded-lg bg-[#f0ebe6] flex items-center justify-center">
                                  <Lock className="w-3.5 h-3.5 text-[#aaaaaa]" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        {!accessible && (
                          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#e7ddd3] to-transparent" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* After phase 0: nudge */}
                {phaseIdx === 0 && (
                  <div className="mt-4 border-2 border-dashed rounded-2xl p-6 text-center"
                    style={{
                      borderColor: waitlistMode ? `${config.catalog.accent}40` : "#e3a99c40",
                      backgroundColor: waitlistMode ? `${config.catalog.accent}10` : "#f2d6c920",
                    }}
                  >
                    <Lock className="w-5 h-5 mx-auto mb-3" style={{ color: waitlistMode ? config.catalog.accent : "#e3a99c" }} />
                    {waitlistMode ? (
                      <>
                        <p className="font-bold text-[#3a3a3a] mb-1 text-sm">
                          Full content coming soon
                        </p>
                        <p className="text-xs text-[#6b6b6b] mb-4 max-w-sm mx-auto">
                          Join the waitlist to be notified the moment all {totalLessons} lessons go live.
                        </p>
                        <button
                          onClick={() => setShowWaitlistModal(true)}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-xs font-bold hover:opacity-90 transition-opacity"
                          style={{ backgroundColor: config.catalog.accent }}
                        >
                          <Mail className="w-3.5 h-3.5" />
                          Join the Waitlist
                        </button>
                      </>
                    ) : !isPro && (
                      <>
                        <p className="font-bold text-[#3a3a3a] mb-1 text-sm">
                          Most of Phases 1~5 are Pro-only
                        </p>
                        <p className="text-xs text-[#6b6b6b] mb-4 max-w-sm mx-auto">
                          Unlock all {totalLessons - freeLessons} remaining Pro lessons to continue from document prep to citizenship.
                        </p>
                        <button
                          onClick={() => setShowModal(true)}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#3a3a3a] text-white text-xs font-bold hover:bg-[#e3a99c] transition-colors"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          Unlock Playbook Pro
                        </button>
                      </>
                    )}
                  </div>
                )}
              </section>
            ))}

            {/* ── Final CTA ────────────────────────────────────────── */}
            <div className="bg-[#3a3a3a] rounded-3xl p-8 md:p-10 text-center mt-8">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: waitlistMode ? `${config.catalog.accent}20` : "#e3a99c20" }}
              >
                {waitlistMode ? (
                  <Mail className="w-6 h-6" style={{ color: config.catalog.accent }} />
                ) : (
                  <Trophy className="w-6 h-6 text-[#e3a99c]" />
                )}
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-white mb-3">
                {waitlistMode ? "Be first in line" : config.finalCtaTitle}
              </h2>
              <p className="text-white/50 text-sm max-w-md mx-auto mb-7 leading-relaxed">
                {waitlistMode
                  ? `Join the waitlist and get notified the moment ${config.heroTitle} launches ~ often with an early access discount.`
                  : config.finalCtaDescription}
              </p>
              {waitlistMode ? (
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setShowWaitlistModal(true)}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white font-bold transition-all hover:opacity-90"
                    style={{ backgroundColor: config.catalog.accent }}
                  >
                    <Mail className="w-4 h-4" />
                    Join the Waitlist
                  </button>
                  <Link
                    href="https://calendly.com/abie-gamao/spain-dnv"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-white/70 text-sm font-medium hover:border-white/40 hover:text-white transition-colors"
                  >
                    Book a Strategy Call
                  </Link>
                </div>
              ) : !isPro ? (
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#e3a99c] text-white font-bold hover:bg-[#d38b7b] transition-colors"
                  >
                    <Zap className="w-4 h-4" />
                    Unlock Playbook Pro
                  </button>
                  <Link
                    href="https://calendly.com/abie-gamao/spain-dnv"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-white/70 text-sm font-medium hover:border-white/40 hover:text-white transition-colors"
                  >
                    Book a Strategy Call
                  </Link>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#8fa38d]/20 text-[#8fa38d] font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  Full Access Active ~ enjoy the journey!
                </div>
              )}
              {!isPro && !waitlistMode && (
                <p className="text-white/20 text-xs mt-4">
                  Paid consultation ~ book your session now.
                </p>
              )}
            </div>

            {/* ── What's Next: Chapter 2 Reveal ───────────────────── */}
            {next && (
              <div className="mt-6 relative overflow-hidden rounded-3xl" style={{ backgroundColor: "#18140e" }}>

                {/* Ambient glow */}
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className="absolute -top-16 -right-16 w-72 h-72 rounded-full blur-3xl opacity-25"
                    style={{ backgroundColor: next.accent }}
                  />
                  <div
                    className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full blur-3xl opacity-15"
                    style={{ backgroundColor: next.accent }}
                  />
                </div>

                <div className="relative z-10 px-8 pt-10 pb-8 md:px-12 md:pt-12">

                  {/* Chapter divider */}
                  <div className="flex items-center gap-4 mb-10">
                    <div className="h-px flex-1 opacity-20" style={{ backgroundColor: next.accent }} />
                    <span
                      className="text-[9px] font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full border"
                      style={{ color: next.accent, borderColor: `${next.accent}40`, backgroundColor: `${next.accent}10` }}
                    >
                      ✦ &nbsp; What&apos;s Next &nbsp; ✦
                    </span>
                    <div className="h-px flex-1 opacity-20" style={{ backgroundColor: next.accent }} />
                  </div>

                  {/* Hero text */}
                  <div className="text-center mb-10">
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: `${next.accent}80` }}>
                      {next.chapterLabel}
                    </p>
                    <div className="text-6xl mb-5">{next.emoji}</div>
                    <h3 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                      {next.title}
                    </h3>
                    <p className="text-white/50 text-base max-w-lg mx-auto leading-relaxed">
                      {next.tagline}
                    </p>
                  </div>

                  {/* Phase roadmap */}
                  <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {next.phasePreview.map((phase, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium text-white/50"
                        style={{ borderColor: `${next.accent}25`, backgroundColor: `${next.accent}08` }}
                      >
                        <span>{phase.emoji}</span>
                        <span>{phase.title}</span>
                        {i < next.phasePreview.length - 1 && (
                          <span className="ml-1 opacity-30" style={{ color: next.accent }}>→</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Journey tracker */}
                  <div
                    className="flex items-center gap-3 justify-center mb-10 px-4 py-3 rounded-2xl border mx-auto max-w-sm"
                    style={{ borderColor: `${next.accent}20`, backgroundColor: `${next.accent}08` }}
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: config.catalog.accent, color: "#18140e" }}>
                        {config.catalog.emoji}
                      </span>
                      <span className="text-white/60">{config.heroTitle.replace("The ", "").replace(" Playbook Pro", "").replace(" Playbook", "")}</span>
                    </div>
                    <div className="flex-1 h-px opacity-30" style={{ backgroundColor: next.accent }} />
                    <span className="text-[10px]" style={{ color: next.accent }}>You are here</span>
                    <div className="flex-1 h-px opacity-20" style={{ backgroundColor: next.accent }} />
                    <div className="flex items-center gap-2 text-xs opacity-50">
                      <span className="w-6 h-6 rounded-full border flex items-center justify-center text-[10px]" style={{ borderColor: `${next.accent}60` }}>
                        {next.emoji}
                      </span>
                      <span className="text-white/40">{next.title.replace("The ", "").replace(" Playbook", "")}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="text-center pb-2">
                    <Link
                      href={`/playbook/${next.slug}`}
                      className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm transition-all hover:opacity-90 hover:scale-[1.02] active:scale-100"
                      style={{ backgroundColor: next.accent, color: "#18140e" }}
                    >
                      <Trophy className="w-4 h-4" />
                      Preview {next.chapterLabel}
                    </Link>
                    <p className="text-white/20 text-xs mt-4">
                      Early access ~ join the waitlist and be first in line.
                    </p>
                  </div>

                </div>
              </div>
            )}

          </main>
        </div>

        <Footer />
      </div>
    </>
  );
}
