"use client";

import { useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Award,
  Heart,
  Zap,
  MessageCircle,
  Volume2,
  VolumeX,
} from "lucide-react";
import Link from "next/link";

const profile = [
  "Non-EU passport holder (Philippines)",
  "Applied inside Spain via UGE (not through a consulate)",
  "100% DIY ~ no lawyer, no agency",
  "Got missing documents remotely, no need to fly home",
  "No EU spouse, no company transfer, no shortcuts",
  "Had only 10 Schengen days left when I applied",
];

const reasons = [
  {
    icon: Award,
    title: "Real Experience",
    description:
      "I held a passport that felt limiting. I lived the process ~ the rejections, the paperwork, the wins. This is not textbook advice.",
    color: "#e3a99c",
  },
  {
    icon: Heart,
    title: "Made for You",
    description:
      "Your passport, income, and goals all matter. No one-size-fits-all. I match the strategy to your situation.",
    color: "#bbcccd",
  },
  {
    icon: Zap,
    title: "Step-by-Step",
    description:
      "Every process is broken into clear, numbered steps. Easy to follow, nothing skipped.",
    color: "#f2d6c9",
  },
  {
    icon: MessageCircle,
    title: "Support After Approval",
    description:
      "Visa approved does not mean done. I help with the next steps too ~ NIE, empadronamiento, bank accounts, all of it.",
    color: "#e3a99c",
  },
];

export default function MyStorySection() {
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
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f9f5f2] rounded-full blur-[120px] opacity-60 translate-x-1/3 -translate-y-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Side: Video */}
          <div className="relative flex items-center justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[300px] h-[500px] sm:max-w-[340px] sm:h-[580px] lg:max-w-[360px] lg:h-[640px] mx-auto">
              <div className="absolute inset-0 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-[6px] sm:border-[8px] border-white transform rotate-2 z-10 hover:rotate-0 transition-transform duration-500 group">
                <div
                  className="w-full h-full relative overflow-hidden bg-black rounded-[2rem]"
                  onClick={togglePlay}
                >
                  <video
                    ref={videoRef}
                    src="https://res.cloudinary.com/drpxke63n/video/upload/v1769924749/compressed-J6ARCBXq_t9uxqp.mp4"
                    poster="/assets/story_image.jpg"
                    className="w-full h-full object-cover cursor-pointer rounded-[2rem]"
                    loop
                    muted={isMuted}
                    playsInline
                  />

                  {/* Play Button */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                      <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center pl-1">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Mute Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    className="absolute bottom-6 right-6 z-20 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all text-white border border-white/30"
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
            </div>
          </div>

          {/* Right Side: Story + Reasons */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/30 border border-[#f2d6c9] mb-6">
              <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
                My Story
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-6 leading-tight">
              I studied the rules.{" "}
              <span className="font-script text-[#e3a99c] text-5xl md:text-6xl relative inline-block transform -rotate-2">
                Built a system.
              </span>{" "}
              Got approved.
            </h2>

            <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] mb-4 leading-relaxed">
              I started with a Croatian Digital Nomad Visa ~ 100% online, approved in under a month. After 8 months exploring Europe, I was ready for Spain.
            </p>
            <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] mb-6 leading-relaxed">
              Why Spain?{" "}
              <span className="font-semibold text-[#3a3a3a]">Full EU access, public healthcare, and a real path to citizenship.</span>{" "}
              Some nationalities qualify in as little as 2 years. I applied via UGE with 10 Schengen days left. No lawyer. No fixer. Just the right documents, timing, and a clear system.
            </p>

            {/* Profile card */}
            <div className="bg-[#f9f5f2] rounded-2xl border border-[#e7ddd3] p-5 mb-6">
              <p className="text-xs font-bold tracking-widest text-[#7a8f90] uppercase mb-3">My profile when I applied</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {profile.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                    <span className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b]">{item}</span>
                  </div>
                ))}
              </div>
              <p className="font-[family-name:var(--font-body)] text-sm font-semibold text-[#e3a99c] mt-4">
                Sound like you? This playbook was made for your situation.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-6 pb-6 border-b border-[#f2d6c9]">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#e3a99c] mb-1">27+</div>
                <div className="text-sm text-[#6b6b6b]">Countries visited</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#e3a99c] mb-1">€0</div>
                <div className="text-sm text-[#6b6b6b]">Lawyer fees</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#e3a99c] mb-1">3yr</div>
                <div className="text-sm text-[#6b6b6b]">EU Residency</div>
              </div>
            </div>

            <Link
              href="/my-story"
              className="inline-flex items-center gap-2 text-[#3a3a3a] font-semibold group hover:text-[#e3a99c] transition-colors"
            >
              Read the Full Story
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Why This Works ~ 4 Reasons */}
        <div className="mt-16 lg:mt-24">
          <div className="text-center mb-10">
            <h3 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3a3a3a]">
              Why people trust{" "}
              <span className="font-script text-[#e3a99c] text-4xl md:text-5xl relative inline-block transform -rotate-1">
                this system
              </span>
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="flex gap-5 p-5 rounded-2xl bg-[#f9f5f2] border border-[#e7ddd3] hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm">
                  <reason.icon
                    className="w-6 h-6"
                    style={{ color: reason.color }}
                  />
                </div>
                <div>
                  <h4 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a] mb-1">
                    {reason.title}
                  </h4>
                  <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
