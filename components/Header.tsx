"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Plane } from "lucide-react";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Destinations", href: "#destinations" },
  { name: "Process", href: "#process" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e3a99c] to-[#f2d6c9] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Plane className="w-5 h-5 text-white transform -rotate-45" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#bbcccd] animate-pulse-soft" />
            </div>
            <div className="flex flex-col">
              <span className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#3a3a3a] tracking-tight">
                Happy Voyager
              </span>
              <span className="text-[10px] tracking-[0.2em] text-[#e3a99c] uppercase font-medium -mt-1">
                Visa Consulting
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative font-[family-name:var(--font-body)] text-sm text-[#3a3a3a] hover:text-[#e3a99c] transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#e3a99c] to-[#bbcccd] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="#contact"
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              <span>Start Your Journey</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-[#e7ddd3] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[#3a3a3a]" />
            ) : (
              <Menu className="w-6 h-6 text-[#3a3a3a]" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-[family-name:var(--font-body)] text-lg text-[#3a3a3a] hover:text-[#e3a99c] transition-colors py-2 border-b border-[#e7ddd3]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-primary text-center mt-4"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
