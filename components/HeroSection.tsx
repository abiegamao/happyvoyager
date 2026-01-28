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
      {/* Dynamic Background Map Path */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-multiply"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-100 800 C 200 800, 400 600, 600 700 S 900 300, 1200 400 S 1500 100, 1600 100"
          stroke="#e3a99c"
          strokeWidth="3"
          className="animate-draw-path"
        />
        {/* Secondary decorative line */}
        <path
          d="M-100 850 C 250 850, 450 650, 650 750 S 950 350, 1250 450 S 1550 150, 1650 150"
          stroke="#bbcccd"
          strokeWidth="2"
          className="animate-draw-path delay-300"
          style={{ animationDelay: "0.5s" }}
        />
      </svg>

      {/* Parallax Floating Elements */}
      <div
        className="absolute top-1/4 right-[15%] hidden lg:block"
        style={{ transform: `translate(${-mousePos.x * 2}px, ${-mousePos.y * 2}px)` }}
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white/40 animate-float">
          <MapPin className="w-4 h-4 text-[#e3a99c]" />
          <span className="text-sm font-medium text-[#3a3a3a]">Lisbon, Portugal</span>
        </div>
      </div>

      <div
        className="absolute bottom-1/4 left-[10%] hidden lg:block"
        style={{ transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)` }}
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white/40 animate-float-delayed">
          <MapPin className="w-4 h-4 text-[#bbcccd]" />
          <span className="text-sm font-medium text-[#3a3a3a]">Chiang Mai, Thailand</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e3a99c]/10 border border-[#e3a99c]/20 mb-8 animate-slide-in-left">
            <span className="w-2 h-2 rounded-full bg-[#e3a99c] animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-[#d69586] uppercase">
              Global Citizenship
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-6xl lg:text-8xl font-bold text-[#3a3a3a] leading-[0.95] tracking-tight mb-8 animate-slide-up">
            Design Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e3a99c] to-[#d69586]">
              Freedom
            </span>
          </h1>

          <p className="font-[family-name:var(--font-body)] text-xl text-[#6b6b6b] leading-relaxed mb-10 max-w-lg animate-slide-up delay-200">
            Navigate the complexities of global visas and residencies. Turn your passport into a tool for location independence.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 animate-slide-up delay-300">
            <a
              href="#contact"
              className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 group"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="px-8 py-4 rounded-full text-[#3a3a3a] font-medium hover:bg-[#e7ddd3]/30 transition-colors w-full sm:w-auto text-center"
            >
              Explore Routes
            </a>
          </div>

          {/* Stats minimalist */}
          {/* <div className="mt-16 pt-8 border-t border-[#e7ddd3] grid grid-cols-2 gap-8 animate-slide-up delay-400">
            <div>
              <p className="text-3xl font-bold text-[#3a3a3a]">30+</p>
              <p className="text-sm text-[#6b6b6b] mt-1">Countries Navigated</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#3a3a3a]">98%</p>
              <p className="text-sm text-[#6b6b6b] mt-1">Approval Rate</p>
            </div>
          </div> */}
        </div>

        {/* Right side - Connected Circles Layout */}
        <div className="relative h-[600px] hidden lg:block" style={{ transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)` }}>

          {/* Connecting Line SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600" fill="none">
            <path
              d="M 50 450 C 150 450, 200 550, 300 500 S 400 200, 500 150"
              stroke="#e3a99c"
              strokeWidth="2"
              strokeDasharray="10 10"
              className="opacity-60"
            />
            {/* Animated moving dot on the line */}
            <circle r="4" fill="#e3a99c">
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                path="M 50 450 C 150 450, 200 550, 300 500 S 400 200, 500 150"
              />
            </circle>
          </svg>

          {/* Circle 1: Main (Top Right) - Traveler */}
          <div className="absolute top-0 right-10 w-72 h-72 rounded-full border-4 border-white shadow-2xl overflow-hidden animate-float">
            <img
              src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80"
              alt="Traveler"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* Circle 2: Secondary (Bottom Left) - Nature */}
          <div className="absolute bottom-20 left-10 w-56 h-56 rounded-full border-4 border-white shadow-2xl overflow-hidden animate-float-delayed">
            <img
              src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80"
              alt="Scenic"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* Circle 3: Tertiary (Center/Low) - Detail */}
          <div className="absolute top-[40%] right-[30%] w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden animate-float" style={{ animationDelay: '1.5s' }}>
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"
              alt="Detail"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
