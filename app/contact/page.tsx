"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Youtube, Facebook, Globe, AtSign, ArrowRight, Mail, MessageCircle, MapPin, Linkedin } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#f9f5f2] text-[#3a3a3a] overflow-hidden flex flex-col font-sans">
            <Header />

            <section className="flex-grow pt-32 pb-20 px-4 md:px-6 lg:px-8 relative">
                <div className="max-w-7xl mx-auto relative z-10 w-full">

                    {/* Header Bubble */}
                    <div className="flex justify-center mb-16">
                        <div className="relative">
                            <div className="bg-[#3a3a3a] text-[#f9f5f2] px-10 py-4 rounded-[2rem] text-4xl md:text-5xl font-bold tracking-tight shadow-xl animate-fade-in relative z-10">
                                Contact me.
                            </div>
                            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#3a3a3a] rotate-45 z-0"></div>
                        </div>
                    </div>

                    {/* Grid Container */}
                    <div className="border-t border-l border-[#e7ddd3] grid md:grid-cols-2 lg:grid-cols-3">

                        {/* Cell 1: Journal (Large) */}
                        <div className="col-span-1 md:col-span-2 lg:col-span-2 border-r border-b border-[#e7ddd3]  md:p-14 group bg-white/40 transition-colors duration-300 relative overflow-hidden">

                            <div className="">
                                <div className="rounded-xl">
                                    <img src="/assets/abie-logo.png" alt="Abie Logo" className="w-30 h-30 object-contain" />
                                </div>
                                <h2 className="text-3xl font-bold mb-4">Read my Journal.</h2>
                                <p className="text-[#6b6b6b] text-lg max-w-md">
                                    Explore my latest thoughts, professional journey, and guides on the digital nomad lifestyle.
                                </p>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <Link
                                    href="https://abiemaxey.com/"
                                    target="_blank"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#e7ddd3] font-semibold hover:border-[#e3a99c] hover:text-[#e3a99c] transition-all"
                                >
                                    Visit Website
                                </Link>
                            </div>
                        </div>

                        {/* Cell 2: YouTube */}
                        <div className="col-span-1 border-r border-b border-[#e7ddd3] p-10 md:p-14 group bg-white/40">
                            <div className="mb-6">
                                <div className="bg-red-100 p-3 rounded-xl inline-block mb-4">
                                    <Youtube className="w-8 h-8 text-red-600" />
                                </div>
                                <h2 className="text-2xl font-bold mb-3">Watch on YouTube.</h2>
                                <p className="text-[#6b6b6b]">
                                    Vlogs, guides, and travel content for your next adventure.
                                </p>
                            </div>
                            <Link
                                href="https://www.youtube.com/@abiemaxey"
                                target="_blank"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#e7ddd3] text-sm font-semibold hover:border-red-500 hover:text-red-500 transition-all mt-4"
                            >
                                Visit Channel
                            </Link>
                        </div>

                        {/* Cell 3: Facebook */}
                        <div className="col-span-1 border-r border-b border-[#e7ddd3] p-10 group bg-white/40">
                            <div className="mb-4">
                                <Linkedin className="w-10 h-10 text-[#1877F2] mb-4" />
                                <h3 className="text-xl font-bold mb-2">Connect on Linkedin.</h3>
                                <p className="text-[#6b6b6b] text-sm mb-6">
                                    Let's connect and stay updated.
                                </p>
                                <Link
                                    href="https://www.linkedin.com/in/abiemaxey/"
                                    target="_blank"
                                    className="block w-full text-center py-2 rounded-full border border-[#e7ddd3] text-sm font-semibold hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all"
                                >
                                    Connect with Abie Maxey
                                </Link>
                            </div>
                        </div>

                        {/* Cell 4: Threads */}
                        <div className="col-span-1 border-r border-b border-[#e7ddd3] p-10 group bg-white/40">
                            <div className="mb-4">
                                <AtSign className="w-10 h-10 text-black mb-4" />
                                <h3 className="text-xl font-bold mb-2">Follow on Threads.</h3>
                                <p className="text-[#6b6b6b] text-sm mb-6">
                                    Quick updates and daily thoughts.
                                </p>
                                <Link
                                    href="https://www.threads.net/@abiemaxey"
                                    target="_blank"
                                    className="block w-full text-center py-2 rounded-full border border-[#e7ddd3] text-sm font-semibold hover:bg-black hover:text-white hover:border-black transition-all"
                                >
                                    @abiemaxey
                                </Link>
                            </div>
                        </div>

                        {/* Cell 5: Email / Community */}
                        <div className="col-span-1 border-r border-b border-[#e7ddd3] p-10 group bg-white/40">
                            <div className="mb-4">
                                <Mail className="w-10 h-10 text-[#3a3a3a] mb-4" />
                                <h3 className="text-xl font-bold mb-2">Send an Email.</h3>
                                <p className="text-[#6b6b6b] text-sm mb-6">
                                    Business inquiries and consulting.
                                </p>
                                <a
                                    href="mailto:hello@abiemaxey.com"
                                    className="block w-full text-center py-2 rounded-full border border-[#e7ddd3] text-sm font-semibold hover:bg-[#3a3a3a] hover:text-white hover:border-[#3a3a3a] transition-all"
                                >
                                    hello@abiemaxey.com
                                </a>
                            </div>
                        </div>

                        {/* Cell 6: CTA Bottom (Full Width) */}
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 border-r border-b border-[#e7ddd3] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 group bg-white/40">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-2">Ready to start your <span className="text-[#e3a99c]">freedom?</span></h2>
                                <p className="text-[#6b6b6b] text-lg">Start building your digital nomad lifestyle today.</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/#services"
                                    className="px-8 py-3 rounded-full bg-[#3a3a3a] text-white font-bold hover:bg-[#e3a99c] transition-all duration-300 shadow-lg"
                                >
                                    Start Consulting
                                </Link>
                                <Link
                                    href="https://abiemaxey.com/"
                                    target="_blank"
                                    className="px-8 py-3 rounded-full border border-[#3a3a3a] text-[#3a3a3a] font-bold hover:bg-[#3a3a3a] hover:text-white transition-all duration-300"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
