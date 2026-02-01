"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MyStorySection() {
    return (
        <section className="section-padding bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Left Side: Image */}
                    <div className="relative order-2 lg:order-1 h-[500px] lg:h-[600px] flex items-center justify-center">
                        <div className="relative w-full max-w-md h-full rounded-[2.5rem] overflow-hidden shadow-2xl">
                            <img
                                src="/assets/story_image.jpg"
                                alt="Abie Maxey"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        {/* Decorative blob */}
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#e3a99c]/20 rounded-full blur-3xl -z-10"></div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/30 border border-[#f2d6c9] mb-6">
                            <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
                                My Journey
                            </span>
                        </div>

                        <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-6 leading-tight">
                            From Weak Passport to <br />
                            <span className="text-[#e3a99c] font-script relative inline-block text-5xl md:text-6xl transform -rotate-2 mt-2">
                                Global Citizen
                            </span>
                        </h2>

                        <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] mb-6 leading-relaxed">
                            [TODO: Text from image] Navigating the complexities of visa applications and residency requirements taught me one thing: freedom is designed, not given.
                        </p>
                        <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] mb-8 leading-relaxed">
                            I've dedicated my career to helping others break free from geographical limitations and build a life on their own terms.
                        </p>

                        <Link
                            href="/my-story"
                            className="inline-flex items-center gap-2 text-[#3a3a3a] font-semibold group hover:text-[#e3a99c] transition-colors text-lg"
                        >
                            Read My Full Story
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
