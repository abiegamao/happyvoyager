"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    ArrowRight,
    Shield,
    Clock,
    Star,
    AlertCircle,
    BookOpen,
    ListChecks,
    RefreshCw,
    CheckCircle2,
    Sparkles,
    Lock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const COVER_MOBILE = "https://res.cloudinary.com/dg1i3ew9w/image/upload/v1773169619/AbieMaxey_s_ReelsTiktok_Spain_Digital_jcitti.png";
const COVER_DESKTOP = "https://res.cloudinary.com/dg1i3ew9w/image/upload/v1773164761/AbieMaxey_s_Website_Spain_Digital_hoaw2f.png";

function PlaybookPageInner() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [checking, setChecking] = useState(true);
    const [verifyingSession, setVerifyingSession] = useState(false);
    const [welcome, setWelcome] = useState(false);
    const [welcomeName, setWelcomeName] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    // Check for existing session or session_id from Stripe redirect
    useEffect(() => {
        if (sessionStorage.getItem("playbook_email")) {
            router.replace("/playbook/spain-dnv/home");
            return;
        }

        const sessionId = searchParams.get("session_id");
        if (sessionId) {
            setVerifyingSession(true);
            fetch(`/api/stripe/verify-session?session_id=${encodeURIComponent(sessionId)}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.hasAccess && data.email) {
                        sessionStorage.setItem("playbook_email", data.email);
                        sessionStorage.setItem(
                            "playbook_name",
                            data.name?.split(" ")[0] || ""
                        );
                        setWelcomeName(data.name?.split(" ")[0] || "");
                        setWelcome(true);
                        setVerifyingSession(false);

                        // Auto-redirect after welcome animation
                        setTimeout(() => {
                            router.replace("/playbook/spain-dnv/home");
                        }, 3500);
                    } else {
                        setVerifyingSession(false);
                        setChecking(false);
                        setError("We couldn't verify your purchase. Please enter the email you used to check out.");
                    }
                })
                .catch(() => {
                    setVerifyingSession(false);
                    setChecking(false);
                    setError("Something went wrong verifying your purchase. Please try entering your email.");
                });
        } else {
            setChecking(false);
        }
    }, [router, searchParams]);

    // Welcome screen ~ post-purchase success animation
    if (welcome) {
        return (
            <main className="min-h-screen bg-[#f9f5f2] flex items-center justify-center font-sans">
                <div className="flex flex-col items-center gap-5 px-6 text-center animate-fade-in">
                    {/* Animated checkmark */}
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-[#d4e0d3] flex items-center justify-center">
                            <CheckCircle2 className="w-10 h-10 text-[#8fa38d]" />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-[#8fa38d]/30 animate-ping" />
                    </div>

                    <div>
                        <h1 className="text-[28px] font-bold text-[#3a3a3a] tracking-tight">
                            {welcomeName ? `You're in, ${welcomeName}!` : "You're in!"}
                        </h1>
                        <p className="text-[15px] text-[#787774] mt-1">
                            Setting up your playbook...
                        </p>
                    </div>

                    {/* Loading dots */}
                    <div className="flex gap-1.5 mt-2">
                        <div className="w-2 h-2 rounded-full bg-[#e3a99c] animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 rounded-full bg-[#e3a99c] animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 rounded-full bg-[#e3a99c] animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                </div>
            </main>
        );
    }

    // Loading state ~ verifying Stripe session
    if (verifyingSession || checking) {
        return (
            <main className="min-h-screen bg-[#f9f5f2] flex items-center justify-center font-sans">
                <div className="flex flex-col items-center gap-4 px-6 text-center">
                    <div className="w-8 h-8 border-[3px] border-[#e7ddd3] border-t-[#e3a99c] rounded-full animate-spin" />
                    <p className="text-[15px] text-[#787774]">
                        {verifyingSession ? "Verifying your purchase..." : "Loading..."}
                    </p>
                </div>
            </main>
        );
    }

    const handleAccess = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/stripe/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.toLowerCase().trim(), slug: "spain-dnv" }),
            });
            const { hasAccess, name } = await res.json();

            if (!hasAccess) {
                setError("No purchase found for this email. Please use the email you purchased with.");
                return;
            }

            sessionStorage.setItem("playbook_email", email.toLowerCase().trim());
            sessionStorage.setItem("playbook_name", (name as string | null)?.split(" ")[0] || "");
            router.push("/playbook/spain-dnv/home");
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f9f5f2] flex flex-col font-sans relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #3a3a3a 1px, transparent 0)", backgroundSize: "32px 32px" }} />

            {/* Body */}
            <div className="flex-1 flex flex-col md:flex-row relative z-10">
                {/* Desktop cover ~ left panel */}
                <div className="hidden md:flex md:w-1/2 lg:w-[55%] relative items-center justify-center p-8 lg:p-12">
                    {/* Gradient background for left panel */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f2d6c9]/50 via-[#f9f5f2] to-[#d4e0d3]/30" />
                    <div className="relative w-full max-w-[640px]">
                        {/* Floating badge */}
                        <div className="absolute -top-2 left-6 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3a3a3a] text-white text-[11px] font-bold tracking-wide shadow-lg">
                            <Sparkles className="w-3 h-3 text-[#e3a99c]" />
                            PRO ACCESS
                        </div>
                        <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                            <Image
                                src={COVER_DESKTOP}
                                alt="Spain Digital Nomad Visa Playbook"
                                width={860}
                                height={580}
                                className="w-full h-auto object-cover"
                                priority
                            />
                        </div>
                        {/* Stats bar below image */}
                        <div className="mt-6 flex items-center justify-center gap-8">
                            {[
                                { value: "24", label: "Lessons" },
                                { value: "6", label: "Phases" },
                                { value: "100+", label: "Students" },
                            ].map(({ value, label }) => (
                                <div key={label} className="text-center">
                                    <p className="text-[20px] font-bold text-[#3a3a3a]">{value}</p>
                                    <p className="text-[11px] text-[#b0a89e] uppercase tracking-wider font-medium">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form panel ~ right */}
                <div className="flex-1 flex items-center justify-center px-6 py-12 md:py-16 md:px-10 lg:px-16">
                    <div className="w-full max-w-[400px]">
                        {/* Logo */}
                        <Link href="/" className="inline-flex items-center gap-2 mb-10 group">
                            <Image
                                src="/assets/logo.png"
                                alt="Happy Voyager"
                                width={28}
                                height={28}
                                className="rounded-md"
                            />
                            <span className="font-semibold text-[15px] text-[#3a3a3a] tracking-tight group-hover:text-[#e3a99c] transition-colors">
                                Happy Voyager
                            </span>
                        </Link>

                        {/* Header */}
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f2d6c9]/60 mb-4">
                                <Lock className="w-3 h-3 text-[#d69586]" />
                                <span className="text-[11px] font-bold uppercase tracking-widest text-[#d69586]">
                                    Playbook Pro
                                </span>
                            </div>
                            <h1 className="text-[32px] font-bold text-[#3a3a3a] mb-3 tracking-tight leading-[1.15]">
                                Spain Digital<br />Nomad Visa
                            </h1>
                            <p className="text-[15px] text-[#787774] leading-relaxed">
                                Enter the email you used to purchase to unlock all lessons and guides.
                            </p>
                        </div>

                        {/* Form card */}
                        <div className="bg-white rounded-2xl border border-[#e7ddd3] p-5 shadow-sm">
                            <form onSubmit={handleAccess} className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-[12px] font-semibold text-[#787774] mb-1.5 uppercase tracking-wide"
                                    >
                                        Purchase email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3 rounded-xl border border-[#e7ddd3] bg-[#f9f5f2] text-[15px] text-[#3a3a3a] placeholder-[#d3d1cb] focus:outline-none focus:border-[#e3a99c] focus:ring-2 focus:ring-[#e3a99c]/20 focus:bg-white transition-all"
                                    />
                                </div>

                                {error && (
                                    <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl bg-[#fdf2f2] border border-[#f5c6cc]">
                                        <AlertCircle className="w-4 h-4 text-[#d83a52] flex-shrink-0 mt-0.5" />
                                        <p className="text-[13px] text-[#d83a52] leading-snug">
                                            {error}
                                        </p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3.5 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
                                    style={{
                                        background: "linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%)",
                                        color: "#ffffff",
                                        boxShadow: "0 4px 20px rgba(58, 58, 58, 0.25)",
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-[3px] border-white/20 border-t-white rounded-full animate-spin" />
                                            Verifying...
                                        </>
                                    ) : (
                                        <>
                                            Unlock my Playbook
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        <p className="mt-5 text-[13px] text-[#787774] text-center">
                            Haven&apos;t purchased yet?{" "}
                            <Link
                                href="/#pricing"
                                className="text-[#e3a99c] font-semibold hover:underline underline-offset-2"
                            >
                                See the Packages →
                            </Link>
                        </p>

                        {/* Trust badges */}
                        <div className="mt-8 pt-6 border-t border-[#e7ddd3]/60 flex items-center justify-center gap-6 flex-wrap">
                            {[
                                { icon: Shield, label: "Secure access" },
                                { icon: Clock, label: "Instant unlock" },
                                { icon: Star, label: "Lifetime updates" },
                            ].map(({ icon: Icon, label }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-1.5 text-[12px] text-[#b0a89e]"
                                >
                                    <Icon className="w-3.5 h-3.5 text-[#e3a99c]" />
                                    {label}
                                </div>
                            ))}
                        </div>

                        {/* What you're unlocking teaser */}
                        <div className="mt-6 rounded-2xl border border-[#e7ddd3]/60 bg-white/80 backdrop-blur-sm p-5">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-[#b0a89e] mb-4">
                                What you&apos;re unlocking
                            </p>
                            <div className="space-y-3">
                                {[
                                    { icon: BookOpen, label: "24 lessons across 6 phases", color: "bg-[#f2d6c9]", iconColor: "text-[#d69586]" },
                                    { icon: ListChecks, label: "Step-by-step document checklist", color: "bg-[#d4e0d3]", iconColor: "text-[#8fa38d]" },
                                    { icon: RefreshCw, label: "Lifetime updates ~ always current", color: "bg-[#dde8e9]", iconColor: "text-[#7a8f90]" },
                                ].map(({ icon: Icon, label, color, iconColor }) => (
                                    <div key={label} className="flex items-center gap-3 text-[13px] text-[#3a3a3a]">
                                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
                                            <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
                                        </div>
                                        {label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile cover image ~ below form */}
            <div className="md:hidden w-full bg-gradient-to-b from-[#f9f5f2] to-[#f2d6c9]/30 flex items-center justify-center px-6 py-8 relative z-10">
                <div className="w-full max-w-[340px]">
                    <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
                        <Image
                            src={COVER_MOBILE}
                            alt="Spain Digital Nomad Visa Playbook"
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    {/* Mobile stats */}
                    <div className="mt-5 flex items-center justify-center gap-6">
                        {[
                            { value: "24", label: "Lessons" },
                            { value: "6", label: "Phases" },
                            { value: "100+", label: "Students" },
                        ].map(({ value, label }) => (
                            <div key={label} className="text-center">
                                <p className="text-[18px] font-bold text-[#3a3a3a]">{value}</p>
                                <p className="text-[10px] text-[#b0a89e] uppercase tracking-wider font-medium">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function PlaybookPage() {
    return (
        <Suspense fallback={
            <main className="min-h-screen bg-[#f9f5f2] flex items-center justify-center font-sans">
                <div className="w-8 h-8 border-[3px] border-[#e7ddd3] border-t-[#e3a99c] rounded-full animate-spin" />
            </main>
        }>
            <PlaybookPageInner />
        </Suspense>
    );
}
