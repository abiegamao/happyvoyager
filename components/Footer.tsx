"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Instagram,
  AtSign,
  Linkedin,
  Youtube,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const footerLinks = {
  services: [
    { name: "Visa Consulting", href: "#services" },
    { name: "Country Selection", href: "#destinations" },
    { name: "Business Setup", href: "#services" },
    { name: "Tax Advisory", href: "#services" },
  ],
  destinations: [
    { name: "Portugal", href: "#destinations" },
    { name: "Spain", href: "#destinations" },
    { name: "Croatia", href: "#destinations" },
    { name: "Balkans", href: "#destinations" },
  ],
  company: [
    { name: "About Abie", href: "/my-story" },
    { name: "Success Stories", href: "#" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/abiemaxey/", label: "Instagram" },
  { icon: AtSign, href: "https://www.threads.net/@abiemaxey", label: "Twitter" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/abiemaxey/", label: "LinkedIn" },
  { icon: Youtube, href: "https://www.youtube.com/@abiemaxey", label: "YouTube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    // Basic email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          tags: ["newsletter"],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "duplicate") {
          setStatus("success");
        } else {
          setError("Something went wrong. Please try again.");
          setStatus("idle");
        }
      } else {
        setStatus("success");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to submit. Please check your connection.");
      setStatus("idle");
    }
  };

  return (
    <footer className="relative bg-[#3a3a3a] text-white overflow-hidden pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Top Split */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 mb-20">
          {/* Brand */}
          <div className="text-center lg:text-left">
            <Link href="/" className="inline-block mb-8 group">
              <img
                src="/assets/logo.png"
                alt="Happy Voyager"
                className="h-10 md:h-12 w-auto object-contain mb-3 brightness-0 invert transition-transform group-hover:scale-105"
              />
              <p className="text-[#e3a99c] text-[10px] md:text-xs font-black tracking-[0.3em] uppercase">Digital Nomad Consultant</p>
            </Link>
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-md mb-8 mx-auto lg:mx-0">
              I help digital nomads turn their weak passports into global freedom through
              clear, executable visa roadmaps. Let's design your new life.
            </p>

            <div className="flex gap-4 justify-center lg:justify-start">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#e3a99c] hover:border-[#e3a99c] hover:text-[#3a3a3a] transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:pt-4 text-center lg:text-left">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Join the Newsletter</h3>
            <p className="text-white/60 text-sm md:text-base mb-8 mx-auto lg:mx-0 max-w-md">Get weekly visa updates, nomad tips, and exclusive guides delivered to your inbox.</p>

            {status === "success" ? (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-[#e3a99c]/20 flex items-center justify-center mx-auto mb-3 text-[#e3a99c]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white mb-1">You're Subscribed!</h4>
                <p className="text-sm text-white/60">Keep an eye on your inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="Enter your email address"
                    className={`flex-1 bg-white/5 border ${error ? "border-red-500/50" : "border-white/10"} rounded-2xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#e3a99c] transition-all text-sm`}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-8 py-4 bg-[#e3a99c] rounded-2xl text-[#3a3a3a] font-bold hover:bg-white transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px] shadow-lg shadow-[#e3a99c]/10"
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Join Now"
                    )}
                  </button>
                </div>
                {error && (
                  <p className="text-red-400 text-sm ml-2">{error}</p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-16" />

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div>
            <h4 className="font-bold text-white mb-6">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-white/60 hover:text-[#e3a99c] transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Destinations</h4>
            <ul className="space-y-4">
              {footerLinks.destinations.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-white/60 hover:text-[#e3a99c] transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-white/60 hover:text-[#e3a99c] transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:abie@happyvoyager.com" className="flex items-center gap-2 text-white/60 hover:text-[#e3a99c] transition-colors">
                  <span>hello@abiemaxey.com</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/60">
                <span>Remote-first, Worldwide</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/5 text-xs md:text-sm text-white/40 text-center md:text-left">
          <p>© {new Date().getFullYear()} Abie Maxey. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
