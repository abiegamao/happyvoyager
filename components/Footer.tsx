"use client";

import Link from "next/link";
import {
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  MapPin,
  ArrowRight,
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
    { name: "Thailand", href: "#destinations" },
  ],
  company: [
    { name: "About Abie", href: "#" },
    { name: "Success Stories", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contact", href: "#contact" },
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
    <footer className="relative bg-[#3a3a3a] text-white overflow-hidden pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Top Split */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 mb-20">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-8">
              <img
                src="/assets/logo.png"
                alt="Happy Voyager"
                className="h-12 w-auto object-contain mb-2 brightness-0 invert"
              />
              <p className="text-[#e3a99c] text-sm font-bold tracking-[0.2em] uppercase">Digital Nomad Consultant</p>
            </Link>
            <p className="text-white/60 text-lg leading-relaxed max-w-md mb-8">
              I help digital nomads turn their weak passports into global freedom through
              clear, executable visa roadmaps. Let's design your new life.
            </p>

            <div className="flex gap-4">
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
          <div className="lg:pt-4">
            <h3 className="text-2xl font-bold mb-4">Join the Newsletter</h3>
            <p className="text-white/60 mb-8">Get weekly visa updates, nomad tips, and exclusive guides delivered to your inbox.</p>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#e3a99c] transition-colors"
              />
              <button className="px-8 py-4 bg-[#e3a99c] rounded-xl text-[#3a3a3a] font-bold hover:bg-white transition-colors">
                Join
              </button>
            </div>
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
                  <Mail className="w-4 h-4" />
                  <span>abie@happyvoyager.com</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/60">
                <MapPin className="w-4 h-4" />
                <span>Remote-first, Worldwide</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5 text-sm text-white/40">
          <p>© {new Date().getFullYear()} Abie Maxey. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
