"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, Video } from "lucide-react";

export default function BookingPage() {
    const [iframeKey] = useState(() => Date.now());
    return (
        <main className="min-h-screen bg-[#f9f5f2] font-sans text-[#3a3a3a]">
            <Header />

            {/* Hero / Title Section */}
            <div className="pt-40  px-6 lg:px-8 max-w-5xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/30 border border-[#f2d6c9] mb-8 animate-fade-in">
                    <Calendar className="w-4 h-4 text-[#e3a99c]" />
                    <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
                        Start Your Journey
                    </span>
                </div>
                <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-up">
                    Book Your{" "}
                    <span className="text-[#e3a99c] font-script relative inline-block transform -rotate-2 mt-2">
                        Free Consultation
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-[#6b6b6b] max-w-2xl mx-auto mb-4 animate-fade-in delay-200">
                    Let's discuss your global mobility goals and design your path to visa freedom.
                </p>
            </div>

            {/* Calendar Embed Section */}
            <div className="px-5 max-w-6xl mx-auto">
                <div className="bg-none ">
                    {/* GHL Calendar Embed */}
                    <div className="relative min-h-[650px]">
                        <iframe
                            key={iframeKey}
                            src="https://links.talentmucho.com/widget/booking/rpY1q6dGq57KRRIrxoCk"
                            className="w-full min-h-[1450px] lg:min-h-[900px] border-none overflow-hidden"
                            scrolling="no"
                            id={`rpY1q6dGq57KRRIrxoCk_${iframeKey}`}
                            title="Book an Appointment"
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
