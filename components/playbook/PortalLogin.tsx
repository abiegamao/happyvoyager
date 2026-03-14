"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  Shield,
  Clock,
  Star,
  AlertCircle,
  Plane,
  Eye,
  EyeOff,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import { setSession } from "@/lib/playbook-session";
import type { PlaybookSession } from "@/lib/playbook-session";

// ── Journey data (ordered by progression) ──
const JOURNEY_STEPS = [
  { emoji: "🇪🇺", title: "Schengen First", tagline: "Get your Schengen visa before you apply for the DNV", status: "soon" as const, accent: "#bbcccd" },
  { emoji: "🇪🇸", title: "Spain DNV Playbook", tagline: "DNV application ~ Spanish citizenship", status: "available" as const, accent: "#e3a99c" },
  { emoji: "🌞", title: "Soft Landing", tagline: "Life in Spain, from day one", status: "soon" as const, accent: "#c47c5a" },
  { emoji: "🛂", title: "Visa Runner", tagline: "90/180 decoded ~ travel freely", status: "soon" as const, accent: "#6b8cba" },
  { emoji: "🗣️", title: "DELE A2", tagline: "Pass the exam on the citizenship track", status: "soon" as const, accent: "#c4523a" },
  { emoji: "🏆", title: "Spanish Passport", tagline: "Residency ~ EU passport, step by step", status: "soon" as const, accent: "#c9a84c" },
];

interface PortalLoginProps {
  onLoginSuccess: (session: PlaybookSession) => void;
  initialSessionId?: string | null;
  purchaseIntent?: { slug: string };
}

export default function PortalLogin({ onLoginSuccess, initialSessionId, purchaseIntent }: PortalLoginProps) {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [verifyingSession, setVerifyingSession] = useState(!!initialSessionId);

  const supabase = createSupabaseBrowser();

  // Handle Stripe redirect with session_id
  useEffect(() => {
    if (!initialSessionId) return;
    (async () => {
      try {
        const res = await fetch(
          `/api/stripe/verify-session?session_id=${initialSessionId}&slug=spain-dnv`
        );
        const data = await res.json();
        if (data.hasAccess && data.email) {
          const portalRes = await fetch("/api/stripe/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: data.email }),
          });
          const portalData = await portalRes.json();
          const session: PlaybookSession = {
            email: data.email,
            name: portalData.name || data.name || "",
            purchaserId: portalData.purchaserId || "",
            purchases: portalData.purchases || [],
          };
          setSession(session);
          onLoginSuccess(session);
        } else {
          setVerifyingSession(false);
        }
      } catch {
        setVerifyingSession(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSessionId]);

  const redirectToCheckout = async (userEmail: string, slug: string) => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, slug }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
      return true;
    }
    return false;
  };

  const fetchPurchasesAndLogin = async (userEmail: string, userName?: string) => {
    // If there's a purchase intent, redirect to Stripe checkout instead
    if (purchaseIntent) {
      await redirectToCheckout(userEmail, purchaseIntent.slug);
      return;
    }

    const res = await fetch("/api/stripe/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail }),
    });
    const data = await res.json();
    const session: PlaybookSession = {
      email: userEmail,
      name: userName || data.name || "",
      purchaserId: data.purchaserId || "",
      purchases: data.purchases || [],
    };
    setSession(session);
    onLoginSuccess(session);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password,
    });

    if (authError) {
      setError(authError.message === "Invalid login credentials"
        ? "Invalid email or password. Please try again."
        : authError.message);
      setLoading(false);
      return;
    }

    await fetchPurchasesAndLogin(email.toLowerCase().trim());
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authError } = await supabase.auth.signUp({
      email: email.toLowerCase().trim(),
      password,
      options: { data: { name: name.trim() } },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    await fetchPurchasesAndLogin(email.toLowerCase().trim(), name.trim());
    setLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.toLowerCase().trim(),
      { redirectTo: `${window.location.origin}/playbook` }
    );

    if (resetError) {
      setError(resetError.message);
    } else {
      setSuccess("Check your email for a password reset link.");
    }
    setLoading(false);
  };

  // ── Verifying Stripe session ──
  if (verifyingSession) {
    return (
      <div className="min-h-screen bg-[#3a3a3a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#e3a99c]/30 border-t-[#e3a99c] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50 text-sm">Verifying your purchase...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      {/* ── Left: Dark Journey Panel ── */}
      <div className="lg:w-[45%] bg-[#3a3a3a] flex flex-col justify-center px-8 py-14 lg:px-14 lg:py-16 relative overflow-hidden">
        {/* Subtle grain overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />

        {/* Animated airplane */}
        <div className="absolute top-10 left-0 w-full pointer-events-none">
          <Plane className="w-5 h-5 text-white/10 animate-fly-across" style={{ animationDelay: "1s" }} />
        </div>
        <div className="absolute bottom-16 left-0 w-full pointer-events-none">
          <Plane className="w-3.5 h-3.5 text-[#e3a99c]/15 animate-fly-across" style={{ animationDelay: "4s", animationDuration: "10s" }} />
        </div>

        <div className="relative z-10">
          {/* Logo */}
          <Link href="/" className="inline-block mb-10 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo.png"
              alt="Happy Voyager"
              className="w-[160px] h-auto brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </Link>

          {/* Header */}
          <div className="mb-10">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#e3a99c] mb-3">
              Playbook Library
            </span>
            <h2 className="text-[26px] font-bold text-white mb-2 tracking-tight leading-tight">
              Your Spain Journey
            </h2>
            <p className="text-[14px] text-white/40 leading-relaxed">
              From visa application to EU passport ~ one playbook at a time.
            </p>
          </div>

          {/* Journey timeline */}
          <div className="space-y-0">
            {JOURNEY_STEPS.map((step, i) => (
              <div key={step.title} className="flex items-start gap-4 group">
                {/* Timeline node + connector */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center text-lg flex-shrink-0 transition-all duration-300 ${
                      step.status === "available"
                        ? "bg-white/10 shadow-lg shadow-[#e3a99c]/20 ring-2 ring-[#e3a99c]/40 scale-110"
                        : "bg-white/5 ring-1 ring-white/10"
                    }`}
                  >
                    {step.emoji}
                  </div>
                  {i < JOURNEY_STEPS.length - 1 && (
                    <div className="w-px h-6 border-l-2 border-dashed border-white/10 my-0.5" />
                  )}
                </div>

                {/* Content */}
                <div className="pt-2 pb-3">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className={`text-[14px] font-bold ${
                      step.status === "available" ? "text-white" : "text-white/50"
                    }`}>
                      {step.title}
                    </h3>
                    {step.status === "available" ? (
                      <span className="text-[8px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full bg-[#e3a99c]/20 text-[#e3a99c] border border-[#e3a99c]/30">
                        Available
                      </span>
                    ) : (
                      <span className="text-[8px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full bg-white/5 text-white/25 border border-white/10">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-white/30">{step.tagline}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div className="mt-10 pt-8 border-t border-white/10 flex gap-8">
            {[
              { value: "6", label: "Playbooks" },
              { value: "100+", label: "Lessons" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-[20px] font-bold text-white">{stat.value}</p>
                <p className="text-[10px] text-white/30 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Browse catalog link */}
          <Link
            href="/playbook/catalog"
            className="mt-6 inline-flex items-center gap-1.5 text-[13px] text-white/50 hover:text-white transition-colors group"
          >
            Browse all playbooks
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ── Right: Auth Form (warm gradient) ── */}
      <div
        className="lg:w-[55%] flex items-center justify-center px-6 py-14 lg:px-16 lg:py-16 relative"
        style={{
          background: "linear-gradient(160deg, #f9f5f2 0%, #f2d6c9 50%, #e7ddd3 100%)",
        }}
      >
        <div className="w-full max-w-[420px]">
          {/* Purchase intent banner */}
          {purchaseIntent && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-[#e3a99c]/10 border border-[#e3a99c]/30 text-center">
              <p className="text-[13px] text-[#3a3a3a] font-semibold">
                Create a free account to start your trial
              </p>
              <p className="text-[11px] text-[#787774] mt-0.5">
                No credit card required ~ try the playbook free for 14 days
              </p>
            </div>
          )}

          {/* Auth card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 p-8 shadow-xl shadow-[#e3a99c]/10">
            {/* Tabs */}
            {mode !== "forgot" && (
              <div className="flex gap-1 bg-[#f9f5f2]/80 rounded-lg p-1 mb-6">
                <button
                  onClick={() => { setMode("login"); setError(""); setSuccess(""); }}
                  className={`flex-1 py-2.5 rounded-md text-[13px] font-semibold transition-all ${
                    mode === "login"
                      ? "bg-white text-[#3a3a3a] shadow-sm"
                      : "text-[#b0a89e] hover:text-[#787774]"
                  }`}
                >
                  Log In
                </button>
                <button
                  onClick={() => { setMode("signup"); setError(""); setSuccess(""); }}
                  className={`flex-1 py-2.5 rounded-md text-[13px] font-semibold transition-all ${
                    mode === "signup"
                      ? "bg-white text-[#3a3a3a] shadow-sm"
                      : "text-[#b0a89e] hover:text-[#787774]"
                  }`}
                >
                  Sign Up Free
                </button>
              </div>
            )}

            {/* Free signup note */}
            {mode === "signup" && !purchaseIntent && (
              <p className="text-[12px] text-[#787774] text-center -mt-3 mb-5">
                Free to sign up ~ start a 14-day trial of any playbook
              </p>
            )}

            {mode === "forgot" && (
              <div className="mb-6">
                <button
                  onClick={() => { setMode("login"); setError(""); setSuccess(""); }}
                  className="text-[13px] text-[#787774] hover:text-[#3a3a3a] transition-colors mb-4"
                >
                  ← Back to login
                </button>
                <h3 className="text-[20px] font-bold text-[#3a3a3a]">Reset password</h3>
                <p className="text-[13px] text-[#787774] mt-1">
                  We&apos;ll send you a link to reset your password.
                </p>
              </div>
            )}

            <form
              onSubmit={
                mode === "login" ? handleLogin
                : mode === "signup" ? handleSignup
                : handleForgotPassword
              }
              className="space-y-4"
            >
              {/* Name (signup only) */}
              {mode === "signup" && (
                <div>
                  <label className="block text-[12px] font-semibold text-[#787774] mb-1.5 uppercase tracking-wide">
                    First name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Abie"
                    className="w-full px-4 py-3 rounded-xl border border-[#e7ddd3] bg-white text-[15px] text-[#3a3a3a] placeholder-[#d3d1cb] focus:outline-none focus:border-[#e3a99c] focus:ring-2 focus:ring-[#e3a99c]/20 transition-all"
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-[12px] font-semibold text-[#787774] mb-1.5 uppercase tracking-wide">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#e7ddd3] bg-white text-[15px] text-[#3a3a3a] placeholder-[#d3d1cb] focus:outline-none focus:border-[#e3a99c] focus:ring-2 focus:ring-[#e3a99c]/20 transition-all pr-10"
                  />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d3d1cb]" />
                </div>
              </div>

              {/* Password (login + signup) */}
              {mode !== "forgot" && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[12px] font-semibold text-[#787774] uppercase tracking-wide">
                      Password
                    </label>
                    {mode === "login" && (
                      <button
                        type="button"
                        onClick={() => { setMode("forgot"); setError(""); setSuccess(""); }}
                        className="text-[11px] text-[#e3a99c] hover:text-[#d69586] font-semibold transition-colors"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={mode === "signup" ? "Min 6 characters" : "••••••••"}
                      minLength={6}
                      className="w-full px-4 py-3 rounded-xl border border-[#e7ddd3] bg-white text-[15px] text-[#3a3a3a] placeholder-[#d3d1cb] focus:outline-none focus:border-[#e3a99c] focus:ring-2 focus:ring-[#e3a99c]/20 transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#d3d1cb] hover:text-[#787774] transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-[#fdf2f2] border border-[#f5c6cc]">
                  <AlertCircle className="w-4 h-4 text-[#d83a52] flex-shrink-0 mt-0.5" />
                  <p className="text-[13px] text-[#d83a52]">{error}</p>
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-[#f0f9f4] border border-[#b5dfc5]">
                  <Mail className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                  <p className="text-[13px] text-[#3a7a52]">{success}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-semibold text-[15px] flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed bg-[#3a3a3a] text-white hover:bg-[#2a2a2a] active:scale-[0.98] shadow-lg shadow-[#3a3a3a]/20"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-[3px] border-white/20 border-t-white rounded-full animate-spin" />
                    {mode === "forgot" ? "Sending..." : mode === "signup" ? "Creating account..." : "Logging in..."}
                  </>
                ) : (
                  <>
                    {mode === "forgot" ? "Send reset link" : mode === "signup" ? "Create free account" : "Log in"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Bottom link */}
          <p className="mt-6 text-[13px] text-[#787774] text-center">
            Sign up is free ~ try the playbook with a{" "}
            <Link href="/#pricing" className="text-[#e3a99c] font-semibold hover:underline">
              14-day free trial →
            </Link>
          </p>

          {/* Trust badges */}
          <div className="mt-6 flex items-center justify-center gap-6 flex-wrap">
            {[
              { icon: Shield, label: "Secure access" },
              { icon: Clock, label: "Instant unlock" },
              { icon: Star, label: "Lifetime updates" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-[12px] text-[#b0a89e]">
                <Icon className="w-3.5 h-3.5 text-[#e3a99c]" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes fly-across {
          0% { transform: translateX(-20px) rotate(-10deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(100vw) rotate(-10deg); opacity: 0; }
        }
        :global(.animate-fly-across) {
          animation: fly-across 6s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
