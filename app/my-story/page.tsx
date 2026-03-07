"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Globe, MapPin, Plane, Calendar, CheckCircle2, Heart, Zap, Instagram, AtSign, Linkedin, Youtube, Facebook, Mail, Briefcase, RefreshCw, AlertTriangle, FileText, User, Loader2 } from "lucide-react";
import Link from "next/link";
import BookCallButton from "@/components/BookCallButton";

function ContactFormEmbed() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!formData.firstName || !formData.email || !formData.message) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          message: formData.message,
          tags: ["Contact Form Inquiry"],
        }),
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please email me directly.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="w-14 h-14 rounded-full bg-[#8fa38d]/15 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-[#8fa38d]" />
        </div>
        <h3 className="text-xl font-bold text-[#3a3a3a]">Message received!</h3>
        <p className="text-[#6b6b6b] text-sm">I&apos;ll get back to you within 1~2 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl border border-red-100">{error}</div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaaaaa]" />
          <input
            type="text" name="firstName" placeholder="First Name *"
            value={formData.firstName} onChange={handleChange} required
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e7ddd3] focus:border-[#e3a99c] focus:ring-2 focus:ring-[#e3a99c]/20 outline-none transition-all bg-white text-sm"
          />
        </div>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaaaaa]" />
          <input
            type="text" name="lastName" placeholder="Last Name"
            value={formData.lastName} onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e7ddd3] focus:border-[#e3a99c] focus:ring-2 focus:ring-[#e3a99c]/20 outline-none transition-all bg-white text-sm"
          />
        </div>
      </div>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaaaaa]" />
        <input
          type="email" name="email" placeholder="Email Address *"
          value={formData.email} onChange={handleChange} required
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e7ddd3] focus:border-[#e3a99c] focus:ring-2 focus:ring-[#e3a99c]/20 outline-none transition-all bg-white text-sm"
        />
      </div>
      <textarea
        name="message" placeholder="Tell me about your situation *" rows={4}
        value={formData.message} onChange={handleChange} required
        className="w-full px-4 py-3 rounded-xl border border-[#e7ddd3] focus:border-[#e3a99c] focus:ring-2 focus:ring-[#e3a99c]/20 outline-none transition-all bg-white text-sm resize-none"
      />
      <button
        type="submit" disabled={loading}
        className="w-full py-3.5 rounded-xl bg-[#3a3a3a] text-white font-bold hover:bg-[#e3a99c] transition-all duration-300 flex items-center justify-center gap-2 text-sm"
      >
        {loading
          ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Sending...</span></>
          : <><span>Send Message</span><ArrowRight className="w-4 h-4" /></>}
      </button>
    </form>
  );
}

const stats = [
  { value: "27+", label: "Countries visited", sub: "Philippine passport only", color: "#e3a99c", bg: "#f2d6c9" },
  { value: "2 yrs", label: "Global exploration", sub: "engineered on a local salary", color: "#8fa38d", bg: "#d4e0d3" },
  { value: "€0", label: "Lawyer fees", sub: "self-navigated every visa", color: "#7a8f90", bg: "#e0eaeb" },
  { value: "3yr", label: "EU Residency", sub: "Spain DNV approved, 2026", color: "#e3a99c", bg: "#f2d6c9" },
];

const timeline = [
  {
    period: "The Leap",
    title: "A one-way ticket and no plan B",
    body: "I booked a one-way ticket with a Philippine income and a remote job. No powerful passport. No Western salary. My family didn't expect it to last. Had they known I'd be gone this long, leaving might have been harder. But I felt called to expand my mind, not just my map.",
    icon: Plane,
    color: "#e3a99c",
    align: "left",
  },
  {
    period: "The Road",
    title: "Japan. USA. Canada. Mexico. EU. Balkans.",
    body: "I jumped from one hostel to another, chasing cheap flights and opportunities. Japan to the Americas, then into Europe. I stretched every dollar until it had no choice but to last. Two years of global exploration on a salary people said wasn't enough to travel. I engineered it to be.",
    icon: Globe,
    color: "#8fa38d",
    align: "right",
  },
  {
    period: "Proving a Point",
    title: "Mobility is a skill, not a privilege",
    body: "Coming from the Global South, the stereotype is that we travel to overstay or escape. I traveled to prove a point and build a life. People told me I had to go home to apply for visas. Instead, I successfully applied for Canadian and Schengen visas from third countries, praying for a yes while stretching every dollar. Mobility isn't about the passport you're born with. It's about the system you build.",
    icon: MapPin,
    color: "#bbcccd",
    align: "left",
  },
  {
    period: "The Crash",
    title: "The lost of safety net",
    body: "After years of working for someone else, I was suddenly locked out of my job and left without a safety net. The nomad life that felt like freedom suddenly felt very fragile. I had a choice: go home and accept defeat, or treat my life like a system that needed a hard reset.",
    icon: AlertTriangle,
    color: "#e3a99c",
    align: "right",
  },
  {
    period: "The Reset",
    title: "I chose the hard reset",
    body: "I applied for the Spanish Digital Nomad Visa on my own. No lawyer. No agency. I studied the bureaucracy until I cracked the code, mapped every document requirement, and built a system from scratch. The same way I'd been building myself my entire nomad life.",
    icon: RefreshCw,
    color: "#7a8f90",
    align: "left",
  },
  {
    period: "2026",
    title: "Approved. 🇪🇸",
    body: "Visa approved. No lawyer. No agency. Just months of research turned into a working system. I landed in Spain and immediately started thinking: how many people are stuck exactly where I was? How many have the skills, the income, the drive, but not the roadmap?",
    icon: CheckCircle2,
    color: "#8fa38d",
    align: "right",
  },
  {
    period: "Now",
    title: "From Passive Nomad to Digital Settler",
    body: "I'm transitioning from drifting to building. My goal is to use this residency to document the reality of engineering a new life in Europe, and to launch a mentorship program that teaches other Global South talent that they don't need a powerful passport to be free. They just need a better strategy. I've done the impossible. Now I'm here to help others do the same.",
    icon: Heart,
    color: "#e3a99c",
    align: "left",
  },
];

export default function MyStoryPage() {
  return (
    <main className="min-h-screen bg-[#f9f5f2] text-[#3a3a3a]">
      <Header />

      {/* ── HERO ── */}
      <section className="pt-36 pb-0 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            {/* Left: Text */}
            <div className="pb-12 lg:pb-24">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/40 border border-[#f2d6c9] mb-6">
                <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
                  Origin Story
                </span>
              </div>

              <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-8">
                One-way ticket.<br />
                <span className="font-script text-[#e3a99c] text-6xl md:text-7xl lg:text-8xl relative inline-block transform -rotate-2">
                  No plan B. 🌍
                </span>
              </h1>

              <p className="font-[family-name:var(--font-body)] text-xl text-[#6b6b6b] leading-relaxed max-w-lg mb-8">
                I booked a one-way ticket with a Philippine passport and a local salary.
                Two years later, I cracked the code on the Spain Digital Nomad Visa.
                No lawyer. No agency. Just a system I built, and a point I needed to prove.
              </p>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-[#f2d6c9] flex-shrink-0">
                  <img src="/assets/avatar.png" alt="Abie Maxey" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-[#3a3a3a]">Abie Maxey</p>
                  <p className="text-sm text-[#6b6b6b]">Digital Settler. Systems thinker. Based in Spain 🇪🇸</p>
                </div>
              </div>
            </div>

            {/* Right: Photo */}
            <div className="relative h-[420px] lg:h-[560px] rounded-t-[3rem] overflow-hidden">
              <img
                src="/assets/story_abie.jpg"
                alt="Abie in Spain"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#f9f5f2]/60 to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-8 left-8 bg-white rounded-2xl px-5 py-3 shadow-xl border border-[#e7ddd3]">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-[#aaaaaa] font-bold uppercase tracking-wide">Status</p>
                    <p className="text-sm font-bold text-[#3a3a3a]">DNV Approved · Spain, 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-white border-y border-[#e7ddd3] py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3 mx-auto"
                style={{ backgroundColor: stat.bg }}
              >
                <span className="font-bold text-base" style={{ color: stat.color }}>✦</span>
              </div>
              <div className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#3a3a3a] mb-0.5">
                {stat.value}
              </div>
              <div className="font-bold text-sm text-[#3a3a3a]">{stat.label}</div>
              <div className="text-xs text-[#aaaaaa] mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── OPENING QUOTE ── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3a3a3a] leading-tight mb-6">
            &ldquo;I took a journey to find myself.
            I ended up{" "}
            <span className="text-[#e3a99c]">building myself</span>{" "}
            along the way.&rdquo;
          </blockquote>
          <p className="font-[family-name:var(--font-body)] text-[#6b6b6b]">~ Abie Maxey</p>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-4 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section label */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#bbcccd]/20 border border-[#bbcccd] mb-4">
              <span className="text-xs font-bold tracking-widest text-[#7a8f90] uppercase">The Journey</span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a]">
              How I got here
            </h2>
          </div>

          {/* Timeline items */}
          <div className="relative">
            {/* Center line (desktop) */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[#e7ddd3]" />

            <div className="flex flex-col gap-12 md:gap-16">
              {timeline.map((item, i) => {
                const Icon = item.icon;
                const isLeft = item.align === "left";
                return (
                  <div key={i} className={`relative grid md:grid-cols-2 gap-6 md:gap-16 items-center ${!isLeft ? "md:[direction:rtl]" : ""}`}>
                    {/* Content card */}
                    <div className={`md:[direction:ltr] bg-white rounded-[2rem] p-7 border border-[#e7ddd3] shadow-sm hover:shadow-md transition-shadow duration-300 ${!isLeft ? "md:text-right" : ""}`}>
                      <span
                        className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
                        style={{ color: item.color, backgroundColor: item.color + "15" }}
                      >
                        {item.period}
                      </span>
                      <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#3a3a3a] mb-3">
                        {item.title}
                      </h3>
                      <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] leading-relaxed">
                        {item.body}
                      </p>
                    </div>

                    {/* Icon node (desktop) */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-white shadow-md items-center justify-center z-10"
                      style={{ backgroundColor: item.color}}>
                      <Icon className="w-5 h-5" style={{ color: "#ffffff" }} />
                    </div>

                    {/* Empty column for layout */}
                    <div className="hidden md:block" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── PASSIVE NOMAD → DIGITAL SETTLER ── */}
      <section className="bg-[#3a3a3a] py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e3a99c]/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8fa38d]/10 rounded-full blur-[80px]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e3a99c]/20 border border-[#e3a99c]/30 mb-4">
              <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">The Shift</span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-white leading-tight">
              From Passive Nomad<br />
              <span className="font-script text-[#e3a99c] text-5xl md:text-6xl relative inline-block transform -rotate-1 mt-2">
                to Digital Settler
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Before ~ Passive Nomad</p>
              <div className="space-y-3">
                {[
                  "Drifting between hostels and cheap flights",
                  "Chasing opportunities without a base",
                  "Stretching every dollar to survive the next month",
                  "Always one visa rejection away from going home",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 flex-shrink-0 mt-2" />
                    <span className="text-sm text-white/50">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#e3a99c]/10 border border-[#e3a99c]/20 rounded-3xl p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[#e3a99c] mb-4">Now ~ Digital Settler</p>
              <div className="space-y-3">
                {[
                  "3-year EU residency, renewable to citizenship",
                  "Building systems, not just crossing borders",
                  "Mentoring Global South talent on strategic mobility",
                  "Documenting the reality of building a new life in Europe",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#e3a99c] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-white/40 text-sm mt-8 max-w-xl mx-auto">
            Mobility is a skill, not a privilege. You don&apos;t need a powerful passport to be free.
            You just need a better strategy.
          </p>
        </div>
      </section>

      {/* ── LIFE NOW ── */}
      <section className="bg-white border-y border-[#e7ddd3] py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-[2.5rem] overflow-hidden h-[380px] lg:h-[480px] shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1543785734-4b6e564642f8?auto=format&fit=crop&w=900&q=80"
              alt="Life in Spain"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4e0d3]/40 border border-[#d4e0d3] mb-6">
              <span className="text-xs font-bold tracking-widest text-[#8fa38d] uppercase">Life Now</span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-[#3a3a3a] mb-6 leading-tight">
              Based in Spain.<br />Building what I needed.
            </h2>
            <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] leading-relaxed mb-4">
              I work from my laptop, cafés, co-working spaces, a terrace with a view.
              I have access to 26 Schengen countries. My residency is secure. The system I built works.
            </p>
            <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] leading-relaxed mb-4">
              And the thing I care most about right now? Teaching other Global South talent
              that they don&apos;t need a powerful passport to be free, they just need a better strategy.
            </p>
            <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] leading-relaxed mb-8">
              I&apos;ve done the impossible. Now I&apos;m here to help others do the same.
            </p>
            <div className="flex flex-wrap gap-3">
              {["🏙️ Living in Spain", "🌍 27+ countries", "💻 Fully remote", "🇵🇭 Global South, proud"].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full bg-[#f9f5f2] border border-[#e7ddd3] text-sm font-medium text-[#3a3a3a]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY I HELP ── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/40 border border-[#f2d6c9] mb-6">
            <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">The Mission</span>
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-8 leading-tight">
            Why I built Happy Voyager
          </h2>
          <div className="space-y-5 text-left">
            {[
              "My struggle wasn't unique. Thousands of talented people from the Global South are held back not by their skills, but by their borders and the systems they don't know exist.",
              "People told me I needed to go home to apply for visas. I applied for Canadian and Schengen visas from third countries and got them. The rules are bendable when you understand them.",
              "I built the system I wish I had. One clear, tested, step-by-step process with real templates, real links, and real context from someone who lived it with a Philippine passport and a local salary.",
              "Happy Voyager isn't a law firm. It's a mentorship and systems business, strategic mobility for Global South talent, built by someone who engineered their own way out.",
            ].map((para, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f2d6c9] flex items-center justify-center mt-1">
                  <span className="text-[#e3a99c] text-xs font-bold">{i + 1}</span>
                </div>
                <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] leading-relaxed">{para}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK WITH ME ── */}
      <section className="py-20 px-6 bg-[#f9f5f2]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/40 border border-[#f2d6c9] mb-3">
                <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">Work with me</span>
              </div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[#3a3a3a] leading-tight">
                Ready to build your own system?
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-4">

            {/* Card 1 ~ Free Assessment */}
            <Link
              href="/assessment"
              className="group relative bg-white border border-[#e7ddd3] rounded-3xl p-6 hover:shadow-xl hover:border-[#e3a99c]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#f2d6c9] flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5 text-[#e3a99c]" />
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#f2d6c9]/60 text-[10px] font-bold tracking-widest text-[#e3a99c] uppercase mb-3 self-start">Free</span>
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a] mb-2 leading-snug">
                DNV Eligibility Assessment
              </h3>
              <p className="text-sm text-[#6b6b6b] leading-relaxed flex-1 mb-5">
                2 minutes. Answer 6 questions about your work setup, income, and location. Get a personalised verdict and your exact next steps.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-[#e3a99c] group-hover:gap-3 transition-all mt-auto">
                Check if you qualify
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            {/* Card 2 ~ Strategy Call */}
            <BookCallButton
              className="group relative bg-[#3a3a3a] rounded-3xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col text-left"
              url="https://calendly.com/abie-gamao/spain-dnv"
              title="Book a Strategy Call"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#e3a99c]/20 flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5 text-[#e3a99c]" />
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#e3a99c]/20 border border-[#e3a99c]/30 text-[10px] font-bold tracking-widest text-[#e3a99c] uppercase mb-3 self-start">1-on-1</span>
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-white mb-2 leading-snug">
                Strategy Call with Abie
              </h3>
              <p className="text-sm text-white/60 leading-relaxed flex-1 mb-5">
                30 minutes. We look at your profile together, map your full document timeline, and leave with a clear action plan. Fee credited toward your package.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-[#e3a99c] group-hover:gap-3 transition-all mt-auto">
                Book a call
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </BookCallButton>

            {/* Card 3 ~ Done-with-You Package */}
            <Link
              href="/digital-nomad-visa#packages"
              className="group relative bg-white border border-[#e7ddd3] rounded-3xl p-6 hover:shadow-xl hover:border-[#8fa38d]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#d4e0d3] flex items-center justify-center mb-4">
                <FileText className="w-5 h-5 text-[#8fa38d]" />
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#d4e0d3]/60 text-[10px] font-bold tracking-widest text-[#8fa38d] uppercase mb-3 self-start">Done-with-you</span>
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a] mb-2 leading-snug">
                Full File Build Support
              </h3>
              <p className="text-sm text-[#6b6b6b] leading-relaxed flex-1 mb-5">
                I review your documents, flag what&apos;s missing, and guide your file from first draft to UGE-ready submission. WhatsApp support end to end.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-[#8fa38d] group-hover:gap-3 transition-all mt-auto">
                See what&apos;s included
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

          </div>

          <p className="text-center text-xs text-[#aaaaaa]">
            I did this myself with 10 Schengen days left. No lawyer. No agency.{" "}
            <span className="text-[#e3a99c] font-semibold">Now I help others do the same.</span>
          </p>
        </div>
      </section>

      {/* ── SOCIAL + LINKS ── */}
      <section className="bg-white border-y border-[#e7ddd3] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/40 border border-[#f2d6c9] mb-4">
              <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">Follow Along</span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#3a3a3a]">
              Find me online
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Socials grid */}
            <div>
              <p className="text-xs font-bold tracking-widest text-[#aaaaaa] uppercase mb-4">Social media</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <Instagram className="w-5 h-5" />, label: "Instagram", handle: "@abiemaxey", href: "https://www.instagram.com/abiemaxey/", bg: "bg-pink-50", iconColor: "text-pink-500", hover: "hover:border-pink-400 hover:text-pink-500" },
                  { icon: <AtSign className="w-5 h-5" />, label: "Threads", handle: "@abiemaxey", href: "https://www.threads.net/@abiemaxey", bg: "bg-gray-50", iconColor: "text-black", hover: "hover:border-black hover:text-black" },
                  { icon: <Facebook className="w-5 h-5" />, label: "Facebook", handle: "@abiemaxey", href: "https://www.facebook.com/abiemaxey", bg: "bg-blue-50", iconColor: "text-blue-600", hover: "hover:border-blue-500 hover:text-blue-600" },
                  { icon: <Youtube className="w-5 h-5" />, label: "YouTube", handle: "@abiemaxey", href: "https://www.youtube.com/@abiemaxey", bg: "bg-red-50", iconColor: "text-red-600", hover: "hover:border-red-500 hover:text-red-600" },
                  { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", handle: "Abie Maxey", href: "https://www.linkedin.com/in/abiemaxey/", bg: "bg-sky-50", iconColor: "text-[#0A66C2]", hover: "hover:border-[#0A66C2] hover:text-[#0A66C2]" },
                  { icon: <Mail className="w-5 h-5" />, label: "Email", handle: "hello@abiemaxey.com", href: "mailto:hello@abiemaxey.com", bg: "bg-[#f9f5f2]", iconColor: "text-[#3a3a3a]", hover: "hover:border-[#3a3a3a] hover:text-[#3a3a3a]" },
                  { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.24 8.24 0 0 0 4.81 1.53V6.83a4.85 4.85 0 0 1-1.04-.14z" /></svg>, label: "TikTok", handle: "@happyvoyager", href: "https://www.tiktok.com/@happyvoyager", bg: "bg-gray-50", iconColor: "text-gray-900", hover: "hover:border-gray-400 hover:text-gray-900" },
                  { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.261 5.636 5.903-5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>, label: "X", handle: "@abiemaxey", href: "https://x.com/abiemaxey", bg: "bg-gray-50", iconColor: "text-gray-900", hover: "hover:border-gray-400 hover:text-gray-900" },
                ].map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-3 rounded-2xl border border-[#e7ddd3] transition-all duration-200 ${s.hover}`}
                  >
                    <div className={`w-8 h-8 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0 ${s.iconColor}`}>
                      {s.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#3a3a3a] leading-none mb-0.5">{s.label}</p>
                      <p className="text-[11px] text-[#aaaaaa] truncate">{s.handle}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Websites */}
            <div>
              <p className="text-xs font-bold tracking-widest text-[#aaaaaa] uppercase mb-4">More from Abie</p>
              <div className="flex flex-col gap-3">
                {[
                  { icon: <Globe className="w-4 h-4 text-[#e3a99c]" />, bg: "bg-[#f2d6c9]/40", label: "abiemaxey.com", sub: "Personal website", href: "https://abiemaxey.com" },
                  { icon: <Briefcase className="w-4 h-4 text-[#7a8f90]" />, bg: "bg-[#bbcccd]/30", label: "Media Kit & Services", sub: "Content creation · Work with me", href: "https://abiemaxey.vercel.app/" },
                ].map((w) => (
                  <Link
                    key={w.label}
                    href={w.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-2xl border border-[#e7ddd3] hover:border-[#e3a99c] hover:text-[#e3a99c] transition-all duration-200 group"
                  >
                    <div className={`w-9 h-9 rounded-xl ${w.bg} flex items-center justify-center flex-shrink-0`}>
                      {w.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-[#3a3a3a] leading-none mb-0.5 group-hover:text-[#e3a99c] transition-colors">{w.label}</p>
                      <p className="text-xs text-[#aaaaaa]">{w.sub}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#aaaaaa] group-hover:text-[#e3a99c] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GET IN TOUCH ── */}
      <section className="py-20 px-6 bg-[#f9f5f2]" id="contact">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/40 border border-[#f2d6c9] mb-4">
              <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">Get in Touch</span>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-[#3a3a3a]">
              Let&apos;s talk.
            </h2>
            <p className="text-[#6b6b6b] text-sm mt-3 max-w-md mx-auto">
              Have a question about the visa process or want to explore working together? Drop me a message.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Form */}
            <div className="lg:col-span-3 bg-white rounded-3xl p-8 border border-[#e7ddd3] shadow-sm">
              <ContactFormEmbed />
            </div>

            {/* Info */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="bg-white rounded-3xl p-6 border border-[#e7ddd3] shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <img src="/assets/avatar.png" alt="Abie Maxey" className="w-12 h-12 rounded-2xl object-cover border-2 border-[#e7ddd3]" />
                  <div>
                    <p className="font-bold text-[#3a3a3a] text-sm">Abie Maxey</p>
                    <p className="text-xs text-[#6b6b6b]">Freedom Engineer</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-[#6b6b6b]">
                    <MapPin className="w-4 h-4 text-[#e3a99c] flex-shrink-0" />
                    <span>Based in Spain 🇪🇸</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6b6b6b]">
                    <Mail className="w-4 h-4 text-[#e3a99c] flex-shrink-0" />
                    <a href="mailto:hello@abiemaxey.com" className="hover:text-[#e3a99c] transition-colors">
                      hello@abiemaxey.com
                    </a>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#e7ddd3]">
                  <p className="text-xs text-[#aaaaaa]">Typical reply within 1~2 business days.</p>
                </div>
              </div>

              <BookCallButton
                className="flex w-full items-center justify-between gap-3 bg-[#3a3a3a] rounded-3xl p-6 group hover:bg-[#e3a99c] transition-colors duration-300 text-left"
                url="https://calendly.com/abie-gamao/spain-dnv"
                title="Book a Strategy Call"
              >
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-white/50 mb-1">Prefer to talk?</p>
                  <p className="font-bold text-white text-sm">Book a Strategy Call</p>
                  <p className="text-xs text-white/50 mt-0.5">30 min · Video call</p>
                </div>
                <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </BookCallButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#3a3a3a] py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e3a99c]/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#bbcccd]/10 rounded-full blur-[80px]" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            You don&apos;t need a better passport.<br />
            <span className="font-script text-[#f2d6c9] text-5xl md:text-6xl relative inline-block transform -rotate-1 mt-2">
              Just a better strategy.
            </span>
          </h2>
          <p className="font-[family-name:var(--font-body)] text-lg text-white/60 mb-10 max-w-xl mx-auto">
            I applied for visas from third countries. I stretched a local salary across two years of global travel.
            I got the Spain DNV with 10 Schengen days left. If I figured it out, so can you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/assessment"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#e3a99c] text-[#3a3a3a] font-bold hover:bg-white transition-all duration-300 group"
            >
              Check If You Qualify
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <BookCallButton
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/20 text-white font-bold hover:border-white hover:bg-white/10 transition-all duration-300"
              url="https://calendly.com/abie-gamao/spain-dnv"
              title="Book a Strategy Call"
            >
              Book a Strategy Call
            </BookCallButton>
          </div>
          <p className="mt-8 text-white/30 text-sm">
            Or start free →{" "}
            <Link href="/#free-playbook" className="text-white/50 underline underline-offset-2 hover:text-white/70 transition-colors">
              Get the free playbook
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
