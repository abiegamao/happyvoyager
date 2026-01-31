"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 50;
      const y = (e.clientY - innerHeight / 2) / 50;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#f9f5f2] pt-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#e3a99c 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e3a99c]/10 border border-[#e3a99c]/20 mb-8 animate-slide-in-left">
            <span className="w-2 h-2 rounded-full bg-[#e3a99c] animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-[#d69586] uppercase">
              Global Citizenship
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-6xl lg:text-8xl font-bold text-[#3a3a3a] leading-[0.95] tracking-tight mb-6 animate-slide-up relative z-10">
            Design Your <br />
            <span className="relative inline-block text-[#e3a99c]">
              Freedom
            </span>
          </h1>

          <p className="font-[family-name:var(--font-body)] text-xl text-[#6b6b6b] leading-relaxed mb-10 max-w-lg animate-slide-up delay-200 mt-8">
            Navigate the complexities of global visas and residencies. Turn your weak passport into a tool for global independence.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 animate-slide-up delay-300">
            <a
              href="#contact"
              className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 group px-8 py-4 text-base"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="px-8 py-4 rounded-full text-[#3a3a3a] font-semibold hover:bg-[#e7ddd3]/30 transition-colors w-full sm:w-auto text-center border-2 border-transparent hover:border-[#e7ddd3]"
            >
              Explore Routes
            </a>
          </div>
        </div>

        {/* Right side - Pastel Vintage Vibe */}
        <div className="relative h-[650px] hidden lg:block" style={{ transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)` }}>

          {/* Main Image (Pink Architecture) */}
          <div className="absolute top-10 right-10 w-80 h-96 rounded-[2rem] shadow-2xl overflow-hidden animate-float z-20 border-[8px] border-white">
            <img
              src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80"
              alt="Pink Architecture Cinque Terre"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Secondary Image (Vintage Car / Palm) */}
          <div className="absolute bottom-10 left-10 w-64 h-72 rounded-[2rem] shadow-2xl overflow-hidden animate-float-delayed z-10 border-[8px] border-white">
            <img
              src="https://images.unsplash.com/photo-1574876881057-2c6b24d5174b?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Vintage Palm Springs"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-[40%] left-[20%] w-24 h-24 rounded-full bg-[#f2d6c9] mix-blend-multiply filter blur-xl opacity-70 animate-pulse-soft" />
          <div className="absolute bottom-[20%] right-[10%] w-32 h-32 rounded-full bg-[#bbcccd] mix-blend-multiply filter blur-xl opacity-70 animate-pulse-soft delay-500" />

          {/* Floating Badge */}
          <div className="absolute top-1/3 right-[85%] z-30 animate-float" style={{ animationDelay: "1.5s" }}>
            <div className="bg-white/90 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-lg border border-white/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#e3a99c]/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#e3a99c]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#3a3a3a]">Digital Nomad</span>
                <span className="text-[10px] text-[#6b6b6b] font-medium">Visa Approved</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
