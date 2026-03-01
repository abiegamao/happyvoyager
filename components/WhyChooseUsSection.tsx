"use client";

import { useEffect, useRef, useState } from "react";
import {
  Award,
  Heart,
  Zap,
  MessageCircle,
  CheckCircle2,
  Volume2,
  VolumeX,
} from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Lived Experience",
    description:
      "I held a passport that felt like a cage. I've lived the process: the rejections, the bureaucracy, the wins. This isn't advice from a textbook.",
    color: "#e3a99c",
  },
  {
    icon: Heart,
    title: "Personalized Approach",
    description:
      "Your situation is unique, your passport, income structure, and goals all matter. There's no one-size-fits-all. I tailor the strategy to you.",
    color: "#bbcccd",
  },
  {
    icon: Zap,
    title: "Clear Roadmaps",
    description:
      "I break complex processes into clear, numbered steps. Think of it as documentation for your life's next deployment.",
    color: "#f2d6c9",
  },
  {
    icon: MessageCircle,
    title: "Ongoing Support",
    description:
      "Visa approved ≠ mission complete. I stick around for the post-arrival chaos — NIE, empadronamiento, bank accounts, all of it.",
    color: "#e3a99c",
  },
];

export default function WhyChooseUsSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="section-padding relative overflow-hidden bg-[#f9f5f2]">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[120px] opacity-60 translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#e3a99c]/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left side - Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#bbcccd]/20 border border-[#bbcccd] mb-6">
              <span className="text-xs font-bold tracking-widest text-[#7a8f90] uppercase">
                Why This Works
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl font-bold text-[#3a3a3a] mb-8 leading-tight">
              I Turned My Weak Passport <br />
              <span className="relative inline-block z-10">
                Into a
                <span className="absolute bottom-2 left-0 w-full h-4 bg-[#e3a99c]/30 -z-10 transform -rotate-2" />
              </span>{" "}
              <span className="font-script text-[#e3a99c] text-6xl md:text-7xl relative inline-block transform -rotate-3 ml-2">
                Cheat Code
              </span>
            </h2>

            <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] mb-10 leading-relaxed max-w-lg">
              I didn&apos;t have privilege or connections. I had research,
              systems-thinking, and stubbornness. I documented everything so
              you can skip the years of trial and error.
            </p>

            {/* Feature list */}
            <div className="grid ">
              {reasons.map((reason, index) => (
                <div
                  key={index}
                  className="flex gap-6 group p-4 rounded-2xl hover:bg-white/50 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm bg-white">
                    <reason.icon
                      className="w-7 h-7"
                      style={{ color: reason.color }}
                    />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#3a3a3a] mb-2 group-hover:text-[#e3a99c] transition-colors">
                      {reason.title}
                    </h3>
                    <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Visual */}
          <div className="relative lg:h-[700px] flex items-center justify-center">
            <div className="relative w-full max-w-[300px] h-[580px] sm:max-w-[350px] sm:h-[650px] lg:max-w-[380px] lg:h-[700px] mx-auto flex items-center justify-center">
              {/* Main Video Card */}
              <div className="absolute inset-0 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-[6px] sm:border-[8px] border-white transform rotate-2 z-10 hover:rotate-0 transition-transform duration-500 group">
                <div
                  className="w-full h-full relative overflow-hidden bg-black group rounded-[2rem]"
                  onClick={togglePlay}
                >
                  <video
                    ref={videoRef}
                    src="https://res.cloudinary.com/drpxke63n/video/upload/v1769924749/compressed-J6ARCBXq_t9uxqp.mp4"
                    poster="/assets/hero_image2.jpeg"
                    className="w-full h-full object-cover cursor-pointer rounded-[2rem]"
                    loop
                    muted={isMuted}
                    playsInline
                  />

                  {/* Play Button Overlay */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                      <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center pl-1">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Sound Toggle Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    className="absolute bottom-6 right-6 z-20 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all text-white border border-white/30 hover:opacity-100 transition-opacity"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Floating Element 2: Image Card - Hidden on mobile */}
              {/* <div className="hidden sm:block absolute top-[15%] -right-16 lg:-right-20 w-40 h-52 lg:w-48 lg:h-60 bg-white p-2 lg:p-3 rounded-[2rem] shadow-2xl border border-white transform rotate-6 transition-transform hover:rotate-0 duration-500 z-0">
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80"
                    alt="Venice Pastel"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-[10px] lg:text-xs font-medium uppercase tracking-wider mb-1">
                      Italy
                    </p>
                    <p className="font-script text-xl lg:text-2xl">
                      Dolce Vita
                    </p>
                  </div>
                </div>
              </div> */}

              {/* Floating Element 3: Testimonial - Adjusted for mobile */}
              {/* <div className="absolute -bottom-12 sm:-bottom-16 left-0 right-0 sm:-left-12 sm:-right-12 bg-white/95 backdrop-blur-xl p-4 sm:p-6 rounded-[2rem] shadow-xl border border-[#e7ddd3] animate-float-delayed z-30 scale-90 sm:scale-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Client"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[#3a3a3a] text-sm">Sarah Jenkins</p>
                    <p className="text-xs text-[#e3a99c] font-medium">Freelance Designer</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#e3a99c]" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[#6b6b6b] italic leading-relaxed">
                  &quot;Finally got my D7 visa approved! Abie made the impossible paperwork feel like a breeze.&quot;
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
