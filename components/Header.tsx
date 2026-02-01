"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Services", href: "/#services" },
  { name: "Destinations", href: "/#destinations" },
  { name: "Process", href: "/#process" },
  { name: "Blogs", href: "/blog" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/contact" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-[family-name:var(--font-body)] ${isScrolled
        ? "bg-[#f9f5f2]/95 backdrop-blur-md shadow-sm py-4"
        : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col group">
            <img
              src="/assets/logo.png"
              alt="Happy Voyager"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium text-[#3a3a3a] hover:text-[#e3a99c] transition-colors duration-300 group tracking-wide"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e3a99c] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full bg-[#3a3a3a] text-white text-sm font-semibold hover:bg-[#e3a99c] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Let&apos;s Talk
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#3a3a3a] hover:text-[#e3a99c] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-[#f9f5f2] border-t border-[#e7ddd3] shadow-lg transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="flex flex-col p-6 gap-6 items-center">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-[#3a3a3a] hover:text-[#e3a99c] transition-colors"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 px-8 py-3 rounded-full bg-[#3a3a3a] text-white font-semibold hover:bg-[#e3a99c] transition-colors w-full text-center"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
