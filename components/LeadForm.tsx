"use client";

import { useState } from "react";
import { User, Mail, Phone, ArrowRight, Loader2 } from "lucide-react";

interface LeadFormProps {
    onSuccess: (leadData: { name: string; email: string; phone: string }) => void;
}

export default function LeadForm({ onSuccess }: LeadFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Basic Validation
        if (!formData.name || !formData.email || !formData.phone) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            onSuccess(formData);
        }, 1000);
    };

    return (
        <div className="bg-[var(--color-background)] p-8 rounded-2xl border border-[var(--color-border)] shadow-lg relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]" />

            <h3 className="text-2xl font-script text-[var(--color-charcoal)] mb-2">
                Join the Conversation
            </h3>
            <p className="text-[var(--color-muted-foreground)] mb-6 text-sm">
                Please verify your details to leave a comment. We respect your privacy.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg border border-red-100">
                        {error}
                    </div>
                )}

                <div className="space-y-1">
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)]" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-[var(--color-input)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all placeholder:text-[var(--color-muted-foreground)]/60 bg-white/50 backdrop-blur-sm"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)]" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-[var(--color-input)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all placeholder:text-[var(--color-muted-foreground)]/60 bg-white/50 backdrop-blur-sm"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)]" />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-[var(--color-input)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all placeholder:text-[var(--color-muted-foreground)]/60 bg-white/50 backdrop-blur-sm"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary flex items-center justify-center space-x-2 mt-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Verifying...</span>
                        </>
                    ) : (
                        <>
                            <span>Continue to Comment</span>
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
