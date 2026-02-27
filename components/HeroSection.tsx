"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  MapPin,
  Calendar,
  Search,
  Star,
  Globe,
  ShieldCheck,
  Plane,
  CheckCircle2,
} from "lucide-react";

import PlaybookAccessModal from "./PlaybookAccessModal";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 60;
      const y = (e.clientY - innerHeight / 2) / 60;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] flex items-center overflow-hidden bg-[#f9f5f2] pt-24 pb-12"
    >
      <PlaybookAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Background World Map Image - Constrained & Blended */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="w-full max-w-[95%] lg:max-w-7xl opacity-[0.1] mix-blend-multiply filter grayscale contrast-125">
          <img
            src="/assets/world-map.jpg"
            alt="World Map Background"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Radial Gradient to fade edges into background softness */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 60% 50%, transparent 20%, #f9f5f2 100%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Content */}
        <div className="max-w-xl order-2 lg:order-1">
          {/* Stat Pills */}
          <div className="flex flex-wrap gap-3 mb-8 animate-slide-in-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fff4e6] shadow-sm border border-[#ffe4cc]">
              <span className="text-xs font-bold text-[#3a3a3a] tracking-wide">
                The Nomad OS 👩🏻‍💻
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-[family-name:var(--font-heading)] text-5xl lg:text-7xl font-bold text-[#3a3a3a] leading-[1.1] mb-6 animate-slide-up relative">
            The DIY System for{" "}
            <span className="text-[#e3a99c]  relative">
              Spain&apos;s Digital Nomad Visa
            </span>
          </h1>

          <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] leading-relaxed mb-10 max-w-lg animate-slide-up delay-100">
            I got approved without a lawyer. Then I turned my entire process
            into a playbook so you don&apos;t have to reverse-engineer Spain&apos;s bureaucracy alone.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 animate-slide-up delay-300">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 group px-8 py-4 text-base cursor-pointer"
            >
              Get the Playbook
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="/booking"
              className="px-8 py-4 rounded-full text-[#3a3a3a] font-semibold bg-white transition-colors w-full sm:w-auto text-center border-2 border-transparent hover:border-[#e7ddd3]"
            >
              Book a Free Call
            </a>
          </div>
        </div>

        {/* Right Column: Visuals */}
        <div
          className="relative h-[320px] sm:h-[420px] lg:h-[600px] flex items-center justify-center order-1 lg:order-2"
          style={{ transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)` }}
        >
          {/* Background circle */}
          <div className="absolute w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] lg:w-[480px] lg:h-[480px] rounded-full bg-[#e3a99c] shadow-2xl animate-pulse-soft" />

          {/* Orbiting Elements - Dashed Ring */}
          <div
            className="absolute w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] lg:w-[600px] lg:h-[600px] border-2 border-dashed border-[#bbcccd]/60 rounded-full animate-spin-slow pointer-events-none"
            style={{ animationDuration: "40s" }}
          >
            {/* Planet 1 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-[#3a3a3a] ring-4 ring-white" />
            {/* Planet 2 */}
            <div className="absolute bottom-1/4 right-[10%] w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-orange-400 ring-4 ring-white" />
          </div>

          {/* Plane on Orbit */}
          <div
            className="absolute w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] lg:w-[680px] lg:h-[680px] rounded-full animate-spin-slow pointer-events-none"
            style={{ animationDuration: "30s", animationDirection: "reverse" }}
          >
            <div className="absolute top-1/4 left-0 -rotate-90">
              <Plane className="w-5 h-5 lg:w-8 lg:h-8 text-[#3a3a3a] fill-current" />
            </div>
          </div>

          {/* Central Person Image */}
          <div className="relative z-10 w-[200px] h-[260px] sm:w-[280px] sm:h-[360px] lg:w-[400px] lg:h-[500px] flex items-center justify-center">
            <div className="relative w-full h-full rounded-[60px] lg:rounded-[100px] overflow-hidden border-4 lg:border-8 border-white shadow-2xl bg-white">
              <img
                src="/assets/hero_image1.jpeg"
                alt="Happy Traveler"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Status badge */}
            <div className="absolute -bottom-4 right-0 bg-white p-2.5 lg:p-4 rounded-2xl shadow-xl border border-gray-100 animate-float-delayed">
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="bg-green-100 p-1.5 lg:p-2 rounded-full">
                  <CheckCircle2 className="w-4 h-4 lg:w-6 lg:h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-[10px] lg:text-xs text-gray-400 font-bold uppercase">
                    Status
                  </p>
                  <p className="text-xs lg:text-sm font-bold text-[#3a3a3a]">
                    Approved
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Small floating dots */}
          <div className="absolute top-10 left-10 lg:top-20 lg:left-20 w-3 h-3 lg:w-4 lg:h-4 bg-orange-300 rounded-full animate-bounce delay-100" />
          <div className="absolute bottom-20 right-4 lg:bottom-40 lg:right-10 w-2 h-2 lg:w-3 lg:h-3 bg-[#bbcccd] rounded-full animate-bounce delay-700" />
        </div>
      </div>
    </section>
  );
}
