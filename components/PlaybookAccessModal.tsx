"use client";

import { useState } from "react";
import { X, ArrowRight, Loader2, CheckCircle2, Lock } from "lucide-react";

interface PlaybookAccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PlaybookAccessModal({
    isOpen,
    onClose,
}: PlaybookAccessModalProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError("Please enter your email address");
            return;
        }

        // Basic email validation
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setStatus("loading");
        setError("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    tags: ["playbook"],
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.error === "duplicate") {
                    // Even if duplicate, we show success so they get the link again
                    setStatus("success");
                } else {
                    setError("Something went wrong. Please try again.");
                    setStatus("idle");
                }
            } else {
                setStatus("success");
            }
        } catch (error) {
            console.error(error);
            setError("Failed to submit. Please check your connection.");
            setStatus("idle");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[#3a3a3a]/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-[#e7ddd3] animate-scale-in overflow-hidden"
                style={{ animationDuration: '0.3s' }}
            >
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#e3a99c] to-[#f2d6c9]" />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#f2d6c9]/30 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#bbcccd]/30 rounded-full blur-2xl" />

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#f9f5f2] text-[#6b6b6b] transition-colors z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="relative z-10 text-center">
                    {status === "success" ? (
                        // Success State
                        <div className="animate-fade-in">
                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 text-green-600">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#3a3a3a] mb-4">
                                You're In!
                            </h3>
                            <p className="text-[#6b6b6b] mb-8 font-[family-name:var(--font-body)]">
                                Here is your exclusive link to the Spain Digital Nomad Playbook.
                            </p>

                            <a
                                href="https://coda.io/@abiemaxey/spain-digital-nomad-playbook"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary w-full flex items-center justify-center gap-2 group mb-4"
                            >
                                <span>Open Playbook</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>

                            <button
                                onClick={onClose}
                                className="text-sm text-[#6b6b6b] hover:text-[#3a3a3a] underline decoration-[#e3a99c] decoration-2 underline-offset-4"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        // Form State
                        <>
                            <div className="w-16 h-16 rounded-full bg-[#e3a99c]/10 flex items-center justify-center mx-auto mb-6 text-[#e3a99c]">
                                <Lock className="w-8 h-8" />
                            </div>

                            <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#3a3a3a] mb-2">
                                Unlock the Playbook
                            </h3>
                            <p className="text-[#6b6b6b] mb-8 font-[family-name:var(--font-body)]">
                                Enter your email to get instant access to the complete Spain Digital Nomad Visa guide.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="text-left">
                                    <label htmlFor="email" className="block text-sm font-medium text-[#3a3a3a] mb-1 pl-1">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3 rounded-xl border border-[#e7ddd3] focus:border-[#e3a99c] focus:ring-2 focus:ring-[#e3a99c]/20 outline-none transition-all placeholder:text-[#6b6b6b]/50 bg-[#f9f5f2]/50"
                                        autoFocus
                                    />
                                    {error && (
                                        <p className="text-red-500 text-sm mt-1 pl-1 animate-fade-in">
                                            {error}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="btn-primary w-full flex items-center justify-center gap-2 group cursor-pointer"
                                >
                                    {status === "loading" ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Unlocking...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Get Instant Access</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <p className="mt-6 text-xs text-[#6b6b6b]/60">
                                We respect your inbox. No spam, ever.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
