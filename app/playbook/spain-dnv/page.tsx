"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
    Lock,
    ArrowRight,
    Shield,
    Clock,
    Star,
    AlertCircle,
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

        const { data: purchaser, error: dbError } = await supabase
            .from("playbook_purchasers")
            .select("id, name")
            .eq("email", email.toLowerCase().trim())
            .single();

        if (dbError || !purchaser) {
            setLoading(false);
            setError(
                "No purchase found for this email. Please use the email you purchased with."
            );
            return;
        }

        // Verify they purchased this specific playbook
        const { data: access } = await supabase
            .from("playbook_purchases")
            .select("id, playbooks!inner(slug)")
            .eq("purchaser_id", purchaser.id)
            .eq("playbooks.slug", "spain-dnv")
            .maybeSingle();

        setLoading(false);

        if (!access) {
            setError(
                "No purchase found for this email. Please use the email you purchased with."
            );
            return;
        }

        // Save to session so they don't have to re-enter
        sessionStorage.setItem("playbook_email", email.toLowerCase().trim());
        sessionStorage.setItem("playbook_name", purchaser.name?.split(" ")[0] || "");

        router.push("/playbook/spain-dnv/home");
    };

    return (
        <main className="min-h-screen bg-white flex flex-col font-sans">

            {/* Body */}
            <div className="flex-1 flex flex-col md:flex-row">
                {/* Desktop cover — left panel */}
                <div className="hidden md:flex md:w-1/2 lg:w-[55%] bg-[#f7f7f5] items-center justify-center p-8 lg:p-12">
                    <div className="w-full max-w-[520px] rounded-2xl overflow-hidden shadow-xl">
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
                            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#787774] mb-3">
                                Playbook Pro
                            </span>
                            <h1 className="text-[28px] font-bold text-[#37352f] mb-2 tracking-tight leading-tight">
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
                                    className="w-full px-3 py-2.5 rounded-lg border border-[#EAE9E9] bg-white text-[15px] text-[#37352f] placeholder-[#d3d1cb] focus:outline-none focus:border-[#37352f] focus:ring-1 focus:ring-[#37352f] transition-all"
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
                                className="w-full py-3 rounded-lg bg-[#37352f] text-white font-semibold text-[15px] flex items-center justify-center gap-2 hover:bg-[#4a4945] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
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

                        <p className="mt-5 text-[13px] text-[#787774] text-center">
                            Haven&apos;t purchased yet?{" "}
                            <Link
                                href="/#pricing"
                                className="text-[#37352f] font-semibold hover:underline"
                            >
                                Get the Playbook Pro →
                            </Link>
                        </p>

                        {/* Trust badges */}
                        <div className="mt-8 pt-6 border-t border-[#EAE9E9] flex items-center justify-center gap-6 flex-wrap">
                            {[
                                { icon: Shield, label: "Secure access" },
                                { icon: Clock, label: "Instant unlock" },
                                { icon: Star, label: "Lifetime updates" },
                            ].map(({ icon: Icon, label }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-1.5 text-[12px] text-[#aaaaaa]"
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    {label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile cover image — below form */}
            <div className="md:hidden w-full bg-[#f7f7f5] flex items-center justify-center px-6 py-6">
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
