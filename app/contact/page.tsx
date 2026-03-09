"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Instagram, Youtube, Facebook, AtSign, ArrowRight, Mail, Linkedin, User, Loader2, CheckCircle2, MapPin, Globe, Briefcase } from "lucide-react";
import Link from "next/link";

function ContactForm() {
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!formData.firstName || !formData.email || !formData.message) {
            setError("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        try {
            await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    message: formData.message,
                    tags: ["Contact Form Inquiry"],
                }),
            });
            setSubmitted(true);
        } catch {
            setError("Something went wrong. Please try emailing directly.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-[#8fa38d]/15 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-[#8fa38d]" />
                </div>
                <h3 className="text-2xl font-bold text-[#3a3a3a]">Message received!</h3>
                <p className="text-[#6b6b6b]">I'll get back to you within 1–2 business days.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl border border-red-100">{error}</div>
            )}
            <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaaaaa]" />
                    <input
                        type="text" name="firstName" placeholder="First Name *"
                        value={formData.firstName} onChange={handleChange} required
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e7ddd3] focus:border-[#e3a99c] focus:ring-2 focus:ring-[#e3a99c]/20 outline-none transition-all bg-white text-sm"
                    />
                </div>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaaaaa]" />
                    <input
                        type="text" name="lastName" placeholder="Last Name"
                        value={formData.lastName} onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e7ddd3] focus:border-[#e3a99c] focus:ring-2 focus:ring-[#e3a99c]/20 outline-none transition-all bg-white text-sm"
                    />
                </div>
            </div>
            <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaaaaa]" />
                <input
                    type="email" name="email" placeholder="Email Address *"
                    value={formData.email} onChange={handleChange} required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e7ddd3] focus:border-[#e3a99c] focus:ring-2 focus:ring-[#e3a99c]/20 outline-none transition-all bg-white text-sm"
                />
            </div>
            <textarea
                name="message" placeholder="Tell me about your situation *" rows={5}
                value={formData.message} onChange={handleChange} required
                className="w-full px-4 py-3 rounded-xl border border-[#e7ddd3] focus:border-[#e3a99c] focus:ring-2 focus:ring-[#e3a99c]/20 outline-none transition-all bg-white text-sm resize-none"
            />
            <button
                type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#3a3a3a] text-white font-bold hover:bg-[#e3a99c] transition-all duration-300 flex items-center justify-center gap-2 text-sm"
            >
                {loading
                    ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Sending...</span></>
                    : <><span>Send Message</span><ArrowRight className="w-4 h-4" /></>}
            </button>
        </form>
    );
}

const socials = [
    {
        icon: <Instagram className="w-5 h-5" />,
        label: "Instagram",
        handle: "@abiemaxey",
        href: "https://www.instagram.com/abiemaxey/",
        color: "hover:border-pink-400 hover:text-pink-500",
        bg: "bg-pink-50",
        iconColor: "text-pink-500",
    },
    {
        icon: <AtSign className="w-5 h-5" />,
        label: "Threads",
        handle: "@abiemaxey",
        href: "https://www.threads.net/@abiemaxey",
        color: "hover:border-black hover:text-black",
        bg: "bg-gray-50",
        iconColor: "text-black",
    },
    {
        icon: <Facebook className="w-5 h-5" />,
        label: "Facebook",
        handle: "@abiemaxey",
        href: "https://www.facebook.com/abiemaxey",
        color: "hover:border-blue-500 hover:text-blue-600",
        bg: "bg-blue-50",
        iconColor: "text-blue-600",
    },
    {
        icon: <Youtube className="w-5 h-5" />,
        label: "YouTube",
        handle: "@abiemaxey",
        href: "https://www.youtube.com/@abiemaxey",
        color: "hover:border-red-500 hover:text-red-600",
        bg: "bg-red-50",
        iconColor: "text-red-600",
    },
    {
        icon: <Linkedin className="w-5 h-5" />,
        label: "LinkedIn",
        handle: "Abie Maxey",
        href: "https://www.linkedin.com/in/abiemaxey/",
        color: "hover:border-[#0A66C2] hover:text-[#0A66C2]",
        bg: "bg-sky-50",
        iconColor: "text-[#0A66C2]",
    },
    {
        icon: <Mail className="w-5 h-5" />,
        label: "Email",
        handle: "hello@abiemaxey.com",
        href: "mailto:hello@abiemaxey.com",
        color: "hover:border-[#3a3a3a] hover:text-[#3a3a3a]",
        bg: "bg-[#f9f5f2]",
        iconColor: "text-[#3a3a3a]",
    },
];

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#f9f5f2] text-[#3a3a3a] flex flex-col">
            <Header />

            <section className="flex-grow pt-28 pb-16 px-4 md:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">

                    {/* Page heading */}
                    <div className="mb-10">
                        <p className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase mb-2">Get in touch</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-[#3a3a3a]">Contact me.</h1>
                    </div>

                    {/* Two-column layout */}
                    <div className="grid lg:grid-cols-5 gap-8 items-start">

                        {/* LEFT: Form */}
                        <div className="lg:col-span-3 bg-white rounded-3xl p-8 shadow-sm border border-[#e7ddd3]">
                            <h2 className="text-2xl font-bold mb-1">Let&apos;s Talk.</h2>
                            <p className="text-[#6b6b6b] text-sm mb-6">
                                Have a question about the visa process or want to explore working together?
                            </p>
                            <ContactForm />
                        </div>

                        {/* RIGHT: Info + Socials */}
                        <div className="lg:col-span-2 flex flex-col gap-5">

                            {/* Profile card */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e7ddd3]">
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src="/assets/avatar.png"
                                        alt="Abie Maxey"
                                        className="w-14 h-14 rounded-2xl object-cover border-2 border-[#e7ddd3]"
                                    />
                                    <div>
                                        <p className="font-bold text-[#3a3a3a]">Abie Maxey</p>
                                        <p className="text-sm text-[#6b6b6b]">Freedom Engineer</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[#6b6b6b] mb-1">
                                    <MapPin className="w-4 h-4 text-[#e3a99c] flex-shrink-0" />
                                    <span>Based in Spain</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[#6b6b6b]">
                                    <Mail className="w-4 h-4 text-[#e3a99c] flex-shrink-0" />
                                    <a href="mailto:hello@abiemaxey.com" className="hover:text-[#e3a99c] transition-colors">
                                        hello@abiemaxey.com
                                    </a>
                                </div>
                                <div className="mt-4 pt-4 border-t border-[#e7ddd3]">
                                    <p className="text-xs text-[#aaaaaa]">Typical reply within 1–2 business days.</p>
                                </div>
                            </div>

                            {/* Socials grid */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e7ddd3]">
                                <p className="text-xs font-bold tracking-widest text-[#aaaaaa] uppercase mb-4">Find me on</p>
                                <div className="grid grid-cols-2 gap-3">
                                    {socials.map((s) => (
                                        <Link
                                            key={s.label}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-3 p-3 rounded-2xl border border-[#e7ddd3] transition-all duration-200 group ${s.color}`}
                                        >
                                            <div className={`w-8 h-8 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0 ${s.iconColor}`}>
                                                {s.icon}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-bold text-[#3a3a3a] leading-none mb-0.5">{s.label}</p>
                                                <p className="text-[11px] text-[#aaaaaa] truncate">{s.handle}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Website card */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e7ddd3]">
                                <p className="text-xs font-bold tracking-widest text-[#aaaaaa] uppercase mb-4">More from Abie</p>
                                <div className="flex flex-col gap-3">
                                    <Link
                                        href="https://abiemaxey.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 rounded-2xl border border-[#e7ddd3] hover:border-[#e3a99c] hover:text-[#e3a99c] transition-all duration-200 group"
                                    >
                                        <div className="w-8 h-8 rounded-xl bg-[#f2d6c9]/40 flex items-center justify-center flex-shrink-0">
                                            <Globe className="w-4 h-4 text-[#e3a99c]" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-[#3a3a3a] leading-none mb-0.5 group-hover:text-[#e3a99c] transition-colors">abiemaxey.com</p>
                                            <p className="text-[11px] text-[#aaaaaa]">Personal website</p>
                                        </div>
                                        <ArrowRight className="w-3.5 h-3.5 ml-auto text-[#aaaaaa] group-hover:text-[#e3a99c] group-hover:translate-x-0.5 transition-all" />
                                    </Link>
                                    <Link
                                        href="https://abie-portfolio.vercel.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 rounded-2xl border border-[#e7ddd3] hover:border-[#e3a99c] hover:text-[#e3a99c] transition-all duration-200 group"
                                    >
                                        <div className="w-8 h-8 rounded-xl bg-[#bbcccd]/30 flex items-center justify-center flex-shrink-0">
                                            <Briefcase className="w-4 h-4 text-[#7a8f90]" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-[#3a3a3a] leading-none mb-0.5 group-hover:text-[#e3a99c] transition-colors">Media Kit & Services</p>
                                            <p className="text-[11px] text-[#aaaaaa]">Content creation · Work with me</p>
                                        </div>
                                        <ArrowRight className="w-3.5 h-3.5 ml-auto text-[#aaaaaa] group-hover:text-[#e3a99c] group-hover:translate-x-0.5 transition-all" />
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
