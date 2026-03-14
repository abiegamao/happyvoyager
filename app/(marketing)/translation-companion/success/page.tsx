"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CheckCircle,
  MessageCircle,
  ArrowRight,
  CalendarCheck,
  Clock,
} from "lucide-react";

const WHATSAPP_NUMBER = "34657752940";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi! I just booked a Translation Companion through Happy Voyager. I'd like to share my appointment details."
);
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function TranslationCompanionSuccessPage() {
  return (
    <main className="min-h-screen bg-[#f9f5f2] overflow-hidden">
      <Header />

      <section className="pt-36 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#d4e0d3]/25 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          {/* Success icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#d4e0d3] mb-8">
            <CheckCircle className="w-10 h-10 text-[#8fa38d]" />
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] leading-tight mb-4">
            You're all set!
          </h1>

          <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] max-w-lg mx-auto leading-relaxed mb-10">
            Your Translation Companion booking is confirmed. Now let's coordinate
            ~ message us on WhatsApp so we can match you with your companion.
          </p>

          {/* WhatsApp CTA */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#25D366] text-white font-bold text-lg hover:bg-[#1ebe5d] transition-all duration-300 shadow-xl shadow-[#25D366]/20 transform hover:-translate-y-1 mb-6"
          >
            <MessageCircle className="w-6 h-6" />
            Message Us on WhatsApp
            <ArrowRight className="w-5 h-5" />
          </a>

          <p className="text-sm text-[#6b6b6b] mb-16">
            Or message us directly at{" "}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] font-semibold hover:underline"
            >
              +34 657 752 940
            </a>
          </p>

          {/* Next steps */}
          <div className="bg-white rounded-3xl border border-[#e7ddd3] p-8 text-left">
            <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#3a3a3a] mb-6">
              What happens next
            </h2>

            <div className="space-y-6">
              {[
                {
                  icon: MessageCircle,
                  color: "#25D366",
                  bg: "#dcf8e8",
                  title: "Message us on WhatsApp",
                  desc: "Share your appointment date, time, and location so we can assign a companion.",
                },
                {
                  icon: CalendarCheck,
                  color: "#e3a99c",
                  bg: "#f2d6c9",
                  title: "We confirm your companion",
                  desc: "Within 24 hours, we'll introduce you to your companion via WhatsApp.",
                },
                {
                  icon: Clock,
                  color: "#8fa38d",
                  bg: "#d4e0d3",
                  title: "Meet at your appointment",
                  desc: "Your companion meets you at the location. They handle the Spanish ~ you focus on getting sorted.",
                },
              ].map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="flex gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: step.bg }}
                    >
                      <Icon className="w-5 h-5" style={{ color: step.color }} />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-[#3a3a3a] mb-1">
                        {step.title}
                      </h3>
                      <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Back link */}
          <div className="mt-10">
            <Link
              href="/translation-companion"
              className="text-sm text-[#6b6b6b] hover:text-[#e3a99c] transition-colors"
            >
              ← Back to Translation Companion
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
