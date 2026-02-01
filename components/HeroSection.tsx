"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin, Calendar, Search, Star, Globe, ShieldCheck, Plane, CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
          style={{ background: 'radial-gradient(circle at 60% 50%, transparent 20%, #f9f5f2 100%)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Content */}
        <div className="max-w-xl">
          {/* Stat Pills */}
          <div className="flex flex-wrap gap-3 mb-8 animate-slide-in-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fff4e6] shadow-sm border border-[#ffe4cc]">
              <span className="text-xs font-bold text-[#3a3a3a] tracking-wide">Nomad Visa Consultant</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-[family-name:var(--font-heading)] text-5xl lg:text-7xl font-bold text-[#3a3a3a] leading-[1.1] mb-6 animate-slide-up relative">
            Design Your <br />
            <span className="text-[#e3a99c] inline-block relative">
              Global Freedom
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#e3a99c] opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] leading-relaxed mb-10 max-w-lg animate-slide-up delay-100">
            Navigate the complexities of second citizenships and nomad visas. We simplify the path to your borderless life.
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
              className="px-8 py-4 rounded-full text-[#3a3a3a] font-semibold bg-white transition-colors w-full sm:w-auto text-center border-2 border-transparent hover:border-[#e7ddd3]"
            >
              Explore Routes
            </a>
          </div>
        </div>

        {/* Right Column: Visuals - Start from line 125 */}
        <div className="relative h-[600px] flex items-center justify-center hidden lg:flex" style={{ transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)` }}>

          {/* Main Purple Circle (Brand Color) */}
          <div className="absolute w-[450px] h-[450px] rounded-full bg-[#E5D4FA] opacity-100" />
          {/* Using a lavender/purple tint similar to the reference but within brand logic? 
                 Reference has purple. User said "like this". 
                 I'll use a brand-adjacent color or just the brand accent.
                 Actually, the reference has a strong circle. I'll use a solid circle.
                 If brand colors are #e3a99c (dusty rose), #bbcccd (sage).
                 I'll use a soft variation of Brand Primary #e3a99c or Sage #bbcccd.
                 Let's go with #e3a99c as the base, maybe slightly lighter.
             */}
          <div className="absolute w-[480px] h-[480px] rounded-full bg-[#e3a99c] shadow-2xl animate-pulse-soft" />

          {/* Orbiting Elements - Dashed Ring */}
          <div className="absolute w-[600px] h-[600px] border-2 border-dashed border-[#bbcccd]/60 rounded-full animate-spin-slow pointer-events-none" style={{ animationDuration: '40s' }}>
            {/* Planet 1 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#3a3a3a] ring-4 ring-white" />
            {/* Planet 2 */}
            <div className="absolute bottom-1/4 right-[10%] w-3 h-3 rounded-full bg-orange-400 ring-4 ring-white" />
          </div>

          {/* Plane on Orbit */}
          <div className="absolute w-[680px] h-[680px] rounded-full animate-spin-slow pointer-events-none" style={{ animationDuration: '30s', animationDirection: 'reverse' }}>
            <div className="absolute top-1/4 left-0 -rotate-90">
              <Plane className="w-8 h-8 text-[#3a3a3a] fill-current" />
            </div>
          </div>


          {/* Central Person Image "Cutout" Illusion */}
          {/* Since we don't have a transparent PNG, we use a rounded rectangle that matches the width 
                but taller, to simulate 'popping out' top/bottom or just a nice framed shot.
                Actually, to match the "circle" vibe with a person inside, 
                we can use a circle mask or a rounded-t-full rounded-b-full pill shape. 
             */}
          <div className="relative z-10 w-[400px] h-[500px] flex items-center justify-center">
            <div className="relative w-full h-full rounded-[100px] overflow-hidden border-8 border-white shadow-2xl bg-white">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                alt="Happy Traveler"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Overlay Badge like the "Camera" or "Suitcase" in reference? 
                     Implementation: A floating card. 
                 */}
            <div className="absolute -bottom-6 right-0 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 animate-float-delayed">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Status</p>
                  <p className="text-sm font-bold text-[#3a3a3a]">Approved</p>
                </div>
              </div>
            </div>
          </div>

          {/* Small floating dots around */}
          <div className="absolute top-20 left-20 w-4 h-4 bg-orange-300 rounded-full animate-bounce delay-100" />
          <div className="absolute bottom-40 right-10 w-3 h-3 bg-[#bbcccd] rounded-full animate-bounce delay-700" />

        </div>
      </div>
    </section>
  );
}
