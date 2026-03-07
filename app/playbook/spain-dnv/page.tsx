"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
    BookOpen,
    Lock,
    ArrowRight,
    Shield,
    Clock,
    Star,
    AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function PlaybookPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleAccess = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { data, error: dbError } = await supabase
            .from("playbook_purchasers")
            .select("email, name")
            .eq("email", email.toLowerCase().trim())
            .single();

        setLoading(false);

        if (dbError || !data) {
            setError(
                "No purchase found for this email. Please use the email you purchased with."
            );
            return;
        }

        // Save to session so they don't have to re-enter
        sessionStorage.setItem("playbook_email", email.toLowerCase().trim());
        sessionStorage.setItem("playbook_name", data.name?.split(" ")[0] || "");

        router.push("/playbook/spain-dnv/home");
    };

    return (
        <main className="min-h-screen bg-white flex flex-col font-sans">
            {/* Top nav */}
            <nav className="px-6 py-4 flex items-center justify-between border-b border-[#EAE9E9]">
                <Link href="/" className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#37352f]" />
                    <span className="text-[15px] font-semibold text-[#37352f]">
                        Happy Voyager
                    </span>
                </Link>
                <span className="text-[13px] text-[#787774] flex items-center gap-1.5 font-medium">
                    <Lock className="w-3 h-3" />
                    Purchasers only
                </span>
            </nav>

            {/* Email gate */}
            <div className="flex-1 flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-[400px]">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#f7f7f5] border border-[#EAE9E9] mb-6">
                            <BookOpen className="w-7 h-7 text-[#37352f]" />
                        </div>
                        <h1 className="text-3xl font-bold text-[#37352f] mb-3 tracking-tight">
                            Playbook Pro
                        </h1>
                        <p className="text-[15px] text-[#787774] leading-relaxed">
                            Your complete guide to the Spain Digital Nomad Visa.
                            <br />
                            Enter the email you used to purchase.
                        </p>
                    </div>

                    {/* Form card */}
                    <div className="bg-white rounded-xl p-8 border border-[#EAE9E9] shadow-sm">
                        <form onSubmit={handleAccess} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-[13px] font-semibold text-[#787774] mb-2 uppercase tracking-wide"
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
                                    className="w-full px-3 py-2.5 rounded shadow-sm border border-[#EAE9E9] bg-white text-[15px] text-[#37352f] placeholder-[#d3d1cb] focus:outline-none focus:border-[#2383e2] focus:ring-1 focus:ring-[#2383e2] transition-all"
                                />
                            </div>

                            {error && (
                                <div className="flex items-start gap-2.5 px-3 py-2.5 rounded bg-[#fdf2f2] border border-[#f9cpx-3]">
                                    <AlertCircle className="w-4 h-4 text-[#d83a52] flex-shrink-0 mt-0.5" />
                                    <p className="text-[13px] text-[#d83a52]">
                                        {error}
                                    </p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2.5 rounded bg-[#2383e2] text-white font-medium text-[15px] flex items-center justify-center gap-2 hover:bg-[#1f73c7] transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
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

                        <div className="mt-6 pt-5 border-t border-[#EAE9E9] text-center">
                            <p className="text-[13px] text-[#787774]">
                                Haven&apos;t purchased yet?{" "}
                                <Link
                                    href="/#pricing"
                                    className="text-[#2383e2] font-medium hover:underline"
                                >
                                    Get the Playbook Pro →
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Trust badges */}
                    <div className="mt-8 flex items-center justify-center gap-6 flex-wrap">
                        {[
                            { icon: Shield, label: "Secure access" },
                            { icon: Clock, label: "Instant unlock" },
                            { icon: Star, label: "Lifetime updates" },
                        ].map(({ icon: Icon, label }) => (
                            <div
                                key={label}
                                className="flex items-center gap-1.5 text-xs text-[#aaaaaa] font-[family-name:var(--font-body)]"
                            >
                                <Icon className="w-3.5 h-3.5" />
                                {label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
