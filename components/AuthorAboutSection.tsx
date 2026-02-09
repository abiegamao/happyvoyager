"use client";

import { useState } from "react";
import Image from "next/image";
import { Youtube, Linkedin, AtSign, Instagram } from "lucide-react";

export default function AuthorAboutSection() {
    const [email, setEmail] = useState("");
    const [agreed, setAgreed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreed) {
            alert("Please agree to the terms to subscribe.");
            return;
        }
        // Handle newsletter subscription
        console.log("Subscribing email:", email);
        // TODO: Implement actual subscription logic
        alert("Thank you for subscribing!");
        setEmail("");
        setAgreed(false);
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
                <h3 className="text-lg font-bold text-[var(--color-charcoal)] text-center mb-4">
                    Be the first to know everything
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                    />

                    <div className="flex items-start gap-2">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="mt-1 w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                        />
                        <label htmlFor="terms" className="text-xs text-[var(--color-muted-foreground)] leading-relaxed">
                            I agree to the <a href="/terms-of-service" className="text-[var(--color-primary)] hover:underline">terms of use</a> regarding data storage.
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[var(--color-charcoal)] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[var(--color-charcoal)]/90 transition-colors uppercase tracking-wide"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </aside>
    );
}
