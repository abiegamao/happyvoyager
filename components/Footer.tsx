"use client";

import Link from "next/link";
import {
  Plane,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  MapPin,
} from "lucide-react";

const footerLinks = {
  services: [
    { name: "Visa Consulting", href: "#services" },
    { name: "Country Selection", href: "#destinations" },
    { name: "Business Setup", href: "#services" },
    { name: "Tax Advisory", href: "#services" },
    { name: "Family Visas", href: "#services" },
  ],
  destinations: [
    { name: "Portugal", href: "#destinations" },
    { name: "Spain", href: "#destinations" },
    { name: "Croatia", href: "#destinations" },
    { name: "Thailand", href: "#destinations" },
    { name: "All Destinations", href: "#destinations" },
  ],
  resources: [
    { name: "About Abie", href: "#" },
    { name: "Success Stories", href: "#" },
    { name: "Visa Guides", href: "#" },
    { name: "FAQ", href: "#faq" },
    { name: "Blog", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Refund Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#3a3a3a] text-white overflow-hidden">


      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-[#e3a99c] via-[#f2d6c9] to-[#bbcccd]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e3a99c] to-[#f2d6c9] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <Plane className="w-5 h-5 text-white transform -rotate-45" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-[family-name:var(--font-heading)] text-xl font-semibold text-white tracking-tight">
                  Happy Voyager
                </span>
                <span className="text-[10px] tracking-[0.2em] text-[#e3a99c] uppercase font-medium -mt-1">
                  Visa Consulting
                </span>
              </div>
            </Link>

            <p className="font-[family-name:var(--font-body)] text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Hi, I&apos;m Abie! I help digital nomads turn their weak passports
              into global freedom through clear, executable visa roadmaps.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href="mailto:abie@happyvoyager.com"
                className="flex items-center gap-3 text-white/60 hover:text-[#e3a99c] transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="font-[family-name:var(--font-body)] text-sm">
                  abie@happyvoyager.com
                </span>
              </a>
              <div className="flex items-center gap-3 text-white/60">
                <MapPin className="w-4 h-4" />
                <span className="font-[family-name:var(--font-body)] text-sm">
                  Remote-first, Worldwide
                </span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#e3a99c] transition-colors group"
                >
                  <social.icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="font-[family-name:var(--font-body)] text-sm text-white/60 hover:text-[#e3a99c] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white mb-4">
              Destinations
            </h4>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="font-[family-name:var(--font-body)] text-sm text-white/60 hover:text-[#e3a99c] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="font-[family-name:var(--font-body)] text-sm text-white/60 hover:text-[#e3a99c] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="font-[family-name:var(--font-body)] text-sm text-white/60 hover:text-[#e3a99c] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white mb-2">
                Get Nomad Tips & Visa Updates
              </h4>
              <p className="font-[family-name:var(--font-body)] text-sm text-white/60">
                Weekly insights delivered to your inbox. No spam, unsubscribe
                anytime.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-5 py-3 rounded-full bg-white/10 border border-white/20 font-[family-name:var(--font-body)] text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#e3a99c] transition-colors"
              />
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#e3a99c] to-[#d69586] text-white font-[family-name:var(--font-body)] font-medium text-sm hover:shadow-lg transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-[family-name:var(--font-body)] text-sm text-white/40 text-center md:text-left">
            © {new Date().getFullYear()} Happy Voyager. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-white/40">
            <span className="font-[family-name:var(--font-body)] text-sm">
              Made with
            </span>
            <svg
              className="w-4 h-4 text-[#e3a99c]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-[family-name:var(--font-body)] text-sm">
              for nomads everywhere
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
