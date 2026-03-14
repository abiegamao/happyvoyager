"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowRight,
    Shield,
    Clock,
    Star,
    AlertCircle,
    BookOpen,
    ListChecks,
    RefreshCw,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const COVER_MOBILE = "https://res.cloudinary.com/dg1i3ew9w/image/upload/v1773169619/AbieMaxey_s_ReelsTiktok_Spain_Digital_jcitti.png";
const COVER_DESKTOP = "https://res.cloudinary.com/dg1i3ew9w/image/upload/v1773164761/AbieMaxey_s_Website_Spain_Digital_hoaw2f.png";

export default function PlaybookPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [checking, setChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (sessionStorage.getItem("playbook_email")) {
            router.replace("/playbook/spain-dnv/home");
        } else {
            setChecking(false);
        }
    }, [router]);

    if (checking) return null;

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
        <main className="min-h-screen bg-[#f9f5f2] flex flex-col font-sans">

            {/* Top header bar */}
            {/* <header className="h-14 flex items-center px-6 border-b border-[#e7ddd3] bg-[#f9f5f2]">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Image
                        src="/assets/logo.png"
                        alt="Happy Voyager"
                        width={22}
                        height={22}
                        className="rounded-sm"
                    />
                    <span className="font-semibold text-[15px] text-[#3a3a3a] tracking-tight">
                        Happy Voyager
                    </span>
                </Link>
            </header> */}

            {/* Body */}
            <div className="flex-1 flex flex-col md:flex-row">
                {/* Desktop cover — left panel */}
                <div className="hidden md:flex md:w-1/2 lg:w-[55%] bg-[#f2d6c9]/40 items-center justify-center p-6 lg:p-8">
                    <div className="w-full max-w-[680px] rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src={COVER_DESKTOP}
                            alt="Spain Digital Nomad Visa Playbook"
                            width={860}
                            height={580}
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Form panel — right */}
                <div className="flex-1 flex items-center justify-center px-6 py-10 md:py-16 md:px-10 lg:px-16">
                    <div className="w-full max-w-[380px]">
                        {/* Header */}
                        <div className="mb-8">
                            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#e3a99c] mb-3">
                                Playbook Pro
                            </span>
                            <h1 className="text-[28px] font-bold text-[#3a3a3a] mb-2 tracking-tight leading-tight">
                                Spain Digital Nomad Visa
                            </h1>
                            <p className="text-[15px] text-[#787774] leading-relaxed">
                                Enter the email you used to purchase to unlock your playbook.
                            </p>
                        </div>

                        {/* Form */}
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
                                    className="w-full px-3 py-2.5 rounded-lg border border-[#e7ddd3] bg-white text-[15px] text-[#3a3a3a] placeholder-[#d3d1cb] focus:outline-none focus:border-[#e3a99c] focus:ring-1 focus:ring-[#e3a99c] transition-all"
                                />
                            </div>

                            {error && (
                                <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-[#fdf2f2] border border-[#f5c6cc]">
                                    <AlertCircle className="w-4 h-4 text-[#d83a52] flex-shrink-0 mt-0.5" />
                                    <p className="text-[13px] text-[#d83a52]">
                                        {error}
                                    </p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-lg font-semibold text-[15px] flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                style={{
                                    background: "linear-gradient(135deg, #e3a99c 0%, #d69586 100%)",
                                    color: "#3a3a3a",
                                    boxShadow: "0 4px 15px rgba(227, 169, 156, 0.35)",
                                }}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-[3px] border-[#3a3a3a]/20 border-t-[#3a3a3a] rounded-full animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    <>
                                        Access my Playbook
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="mt-5 text-[13px] text-[#787774] text-center">
                            Haven&apos;t purchased yet?{" "}
                            <Link
                                href="/#pricing"
                                className="text-[#e3a99c] font-semibold hover:underline"
                            >
                                Get the Playbook Pro →
                            </Link>
                        </p>

                        {/* Trust badges */}
                        <div className="mt-8 pt-6 border-t border-[#e7ddd3] flex items-center justify-center gap-6 flex-wrap">
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
                        <div className="mt-6 rounded-xl border border-[#e7ddd3] bg-white p-4">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-[#b0a89e] mb-3">
                                What you&apos;re unlocking
                            </p>
                            <div className="space-y-2.5">
                                {[
                                    { icon: BookOpen, label: "24 lessons across 6 phases" },
                                    { icon: ListChecks, label: "Step-by-step document checklist" },
                                    { icon: RefreshCw, label: "Lifetime updates — always current" },
                                ].map(({ icon: Icon, label }) => (
                                    <div key={label} className="flex items-center gap-2.5 text-[13px] text-[#3a3a3a]">
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-[#f2d6c9]">
                                            <Icon className="w-3.5 h-3.5 text-[#d69586]" />
                                        </div>
                                        {label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile cover image — below form */}
            <div className="md:hidden w-full bg-[#f2d6c9]/30 flex items-center justify-center px-6 py-6">
                <div className="w-full max-w-[340px] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                        src={COVER_MOBILE}
                        alt="Spain Digital Nomad Visa Playbook"
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>
        </main>
    );
}
