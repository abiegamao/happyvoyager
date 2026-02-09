"use client";

import { useState } from "react";
import Image from "next/image";
import { Youtube, Linkedin, AtSign, Instagram, Loader2, CheckCircle2 } from "lucide-react";

export default function AuthorAboutSection() {
    const [email, setEmail] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreed) {
            setError("Please agree to the terms to subscribe.");
            return;
        }

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
                    tags: ["newsletter"],
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.error === "duplicate") {
                    // Even if duplicate, we show success
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
        <aside className="space-y-8">
            {/* About Section */}
            <div className="bg-none rounded-2xl p-8 ">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-muted-foreground)] mb-6">
                    Author
                </h3>

                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-[var(--color-secondary)]">
                        <Image
                            src="/assets/hero_image1.jpeg"
                            alt="The Happy Voyager"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Name */}
                <h4 className="text-xl font-bold text-[var(--color-charcoal)] text-center mb-2">
                    The Happy Voyager
                </h4>

                {/* Subtext */}
                <p className="text-sm text-[var(--color-muted-foreground)] text-center mb-6">
                    Welcome to my little space here in the internet.
                </p>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-4">
                    <a
                        href="https://www.youtube.com/@abiemaxey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors"
                        aria-label="Website"
                    >
                        <Youtube className="w-5 h-5" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/abiemaxey/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors"
                        aria-label="Facebook"
                    >
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                        href="https://www.threads.net/@abiemaxey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors"
                        aria-label="Twitter"
                    >
                        <AtSign className="w-5 h-5" />
                    </a>
                    <a
                        href="https://www.instagram.com/abiemaxey/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors"
                        aria-label="Instagram"
                    >
                        <Instagram className="w-5 h-5" />
                    </a>
                </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-[var(--color-secondary)] rounded-2xl p-8 border border-[var(--color-border)]">
                {status === "success" ? (
                    <div className="text-center py-8 animate-fade-in">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 text-green-600">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-[var(--color-charcoal)] mb-2">
                            You're Subscribed!
                        </h3>
                        <p className="text-sm text-[var(--color-muted-foreground)]">
                            Thank you for joining. Keep an eye on your inbox!
                        </p>
                    </div>
                ) : (
                    <>
                        <h3 className="text-lg font-bold text-[var(--color-charcoal)] text-center mb-4">
                            Be the first to know everything
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (error) setError("");
                                    }}
                                    placeholder="Enter your email"
                                    // required // Custom validation used instead
                                    className={`w-full px-4 py-3 rounded-lg border ${error ? "border-red-500" : "border-[var(--color-border)]"
                                        } bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all`}
                                />
                                {error && (
                                    <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>
                                )}
                            </div>

                            <div className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreed}
                                    onChange={(e) => {
                                        setAgreed(e.target.checked);
                                        if (error) setError("");
                                    }}
                                    className="mt-1 w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                                />
                                <label
                                    htmlFor="terms"
                                    className="text-xs text-[var(--color-muted-foreground)] leading-relaxed"
                                >
                                    I agree to the{" "}
                                    <a
                                        href="/terms-of-service"
                                        className="text-[var(--color-primary)] hover:underline"
                                    >
                                        terms of use
                                    </a>{" "}
                                    regarding data storage.
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full bg-[var(--color-charcoal)] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[var(--color-charcoal)]/90 transition-colors uppercase tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {status === "loading" ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Subscribing...</span>
                                    </>
                                ) : (
                                    "Subscribe"
                                )}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </aside>
    );
}
