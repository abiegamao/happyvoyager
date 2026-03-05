"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";

const navLinks = [
  { name: "About", link: "/my-story" },
  { name: "Contact", link: "/contact" },
];

const blogFeatured = [
  {
    emoji: "🔴",
    tag: "Live · 2026",
    title: "DNV Updates 2026",
    sub: "What UGE actually expects now",
    link: "/dnv-updates-2026",
    accent: "#e3a99c",
    bg: "#f2d6c9",
  },
  {
    emoji: "📋",
    tag: "Step-by-step",
    title: "How to Apply for the DNV",
    sub: "The exact system I used",
    link: "/how-to-apply-spain-digital-nomad-visa",
    accent: "#7a8f90",
    bg: "#e0eaeb",
  },
  {
    emoji: "🏆",
    tag: "The endgame",
    title: "My Road to Citizenship",
    sub: "2 years. Not 10. Live countdown.",
    link: "/road-to-spanish-citizenship",
    accent: "#8fa38d",
    bg: "#d4e0d3",
  },
];

const freeToolsItems = [
  {
    emoji: "✨",
    title: "DNV Assessment",
    sub: "See if you qualify in 2 min",
    link: "/assessment",
    bg: "#f2d6c9",
  },
  {
    emoji: "📋",
    title: "Document Checklist",
    sub: "Full list, printable & ready",
    link: "/document-checklist",
    bg: "#e0eaeb",
  },
  {
    emoji: "📖",
    title: "Playbook Lite",
    sub: "The DNV roadmap condensed",
    link: "/#pricing",
    bg: "#d4e0d3",
  },
  {
    emoji: "🗓",
    title: "Schengen Day Calculator",
    sub: "Track your 90/180 days live",
    link: "/schengen-calculator",
    bg: "#e0eaeb",
  },
];

const servicesDropdown = [
  { emoji: "💼", title: "Pricing & Packages", sub: "Full support, transparent pricing", link: "/#pricing", bg: "#f2d6c9" },
  { emoji: "📅", title: "Book Appointment (NIE/TIE)", sub: "Lock in your NIE or TIE date", link: "/appointments", bg: "#e0eaeb" },
  { emoji: "🌐", title: "Document Translations", sub: "Certified, fast & apostille-ready", link: "/translations", bg: "#d4e0d3" },
  { emoji: "✈️", title: "Schengen Visa Assistance", sub: "Bridge the gap while you wait", link: "/schengen-visa", bg: "#f2d6c9" },
];

const dnvDropdown = [
  { name: "Overview", link: "/digital-nomad-visa#hero" },
  { name: "Who It's For", link: "/digital-nomad-visa#who-is-it-for" },
  { name: "Requirements", link: "/digital-nomad-visa#requirements" },
  { name: "What's Included", link: "/digital-nomad-visa#whats-included" },
  { name: "How It Works", link: "/digital-nomad-visa#how-it-works" },
  { name: "Why Us", link: "/digital-nomad-visa#why-us" },
  { name: "FAQ", link: "/digital-nomad-visa#faq" },
  { name: "✦ Free Assessment", link: "/assessment" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [dnvOpen, setDnvOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [freeToolsOpen, setFreeToolsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileDnvOpen, setMobileDnvOpen] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);
  const [mobileFreeToolsOpen, setMobileFreeToolsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dnvTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blogTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const freeToolsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };
  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 120);
  };

  const openDnvDropdown = () => {
    if (dnvTimeoutRef.current) clearTimeout(dnvTimeoutRef.current);
    setDnvOpen(true);
  };
  const closeDnvDropdown = () => {
    dnvTimeoutRef.current = setTimeout(() => setDnvOpen(false), 120);
  };

  const openBlogDropdown = () => {
    if (blogTimeoutRef.current) clearTimeout(blogTimeoutRef.current);
    setBlogOpen(true);
  };
  const closeBlogDropdown = () => {
    blogTimeoutRef.current = setTimeout(() => setBlogOpen(false), 120);
  };

  const openFreeToolsDropdown = () => {
    if (freeToolsTimeoutRef.current) clearTimeout(freeToolsTimeoutRef.current);
    setFreeToolsOpen(true);
  };
  const closeFreeToolsDropdown = () => {
    freeToolsTimeoutRef.current = setTimeout(() => setFreeToolsOpen(false), 120);
  };

  return (
    <Navbar className="fixed top-0 z-50 font-[family-name:var(--font-body)]">
      {/* ── Desktop ───────────────────────────────────────────────────────── */}
      <NavBody>
        <Link href="/#hero" className="relative z-20 flex-shrink-0">
          <img
            src="/assets/logo.png"
            alt="Happy Voyager"
            className="h-10 w-auto max-w-[110px] object-contain"
          />
        </Link>

        {/* Nav items */}
        <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center gap-0.5 text-sm font-medium lg:flex">

          {/* Services */}
          <div
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
          >
            <button className="flex items-center gap-1 px-3 py-2 rounded-full text-[#3a3a3a] hover:bg-[#f2d6c9]/40 hover:text-[#e3a99c] transition-colors duration-200 text-sm font-medium whitespace-nowrap">
              Services
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
            </button>

            {servicesOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <div className="bg-white border border-[#e7ddd3] rounded-2xl shadow-xl overflow-hidden w-[272px] py-2">
                  <p className="px-4 pt-2 pb-1 text-[10px] font-bold tracking-widest text-[#aaaaaa] uppercase">
                    What We Offer
                  </p>
                  {servicesDropdown.map((item) => (
                    <a
                      key={item.title}
                      href={item.link}
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-[#f9f5f2] transition-colors duration-150 group"
                    >
                      <span
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: item.bg }}
                      >
                        {item.emoji}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#3a3a3a] group-hover:text-[#e3a99c] transition-colors leading-snug">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-[#aaaaaa] mt-0.5 leading-snug">
                          {item.sub}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* DNV */}
          <div
            className="relative"
            onMouseEnter={openDnvDropdown}
            onMouseLeave={closeDnvDropdown}
          >
            <Link
              href="/digital-nomad-visa"
              className="relative flex items-center gap-1 px-3 py-2 rounded-full text-[#e3a99c] font-semibold text-sm bg-[#e3a99c]/10 border border-[#e3a99c]/30 hover:bg-[#e3a99c] hover:text-white transition-all duration-200 whitespace-nowrap"
            >
              🇪🇸 Digital Nomad Visa
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dnvOpen ? "rotate-180" : ""}`} />
            </Link>

            {dnvOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                onMouseEnter={openDnvDropdown}
                onMouseLeave={closeDnvDropdown}
              >
                <div className="bg-white border border-[#e7ddd3] rounded-2xl shadow-xl overflow-hidden min-w-[200px] py-2">
                  {dnvDropdown.map((item) => (
                    <a
                      key={item.name}
                      href={item.link}
                      className={`flex items-center px-5 py-3 text-sm transition-colors duration-150 ${
                        item.name.includes("Assessment")
                          ? "text-[#e3a99c] font-bold bg-[#f2d6c9]/20 hover:bg-[#f2d6c9]/40 border-t border-[#e7ddd3] mt-1"
                          : "text-[#3a3a3a] hover:bg-[#f9f5f2] hover:text-[#e3a99c]"
                      }`}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Free Tools ✨ */}
          <div
            className="relative"
            onMouseEnter={openFreeToolsDropdown}
            onMouseLeave={closeFreeToolsDropdown}
          >
            <button className="flex items-center gap-1 px-3 py-2 rounded-full text-[#8fa38d] font-semibold hover:bg-[#f2d6c9]/40 hover:text-[#e3a99c] transition-colors duration-200 text-sm whitespace-nowrap">
              ✨ Free Tools
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${freeToolsOpen ? "rotate-180" : ""}`} />
            </button>

            {freeToolsOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                onMouseEnter={openFreeToolsDropdown}
                onMouseLeave={closeFreeToolsDropdown}
              >
                <div className="bg-white border border-[#e7ddd3] rounded-2xl shadow-xl overflow-hidden w-[272px] py-2">
                  <p className="px-4 pt-2 pb-1 text-[10px] font-bold tracking-widest text-[#aaaaaa] uppercase">
                    Free Resources
                  </p>
                  {freeToolsItems.map((item) => (
                    <Link
                      key={item.link}
                      href={item.link}
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-[#f9f5f2] transition-colors duration-150 group"
                    >
                      <span
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: item.bg }}
                      >
                        {item.emoji}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-[#3a3a3a] group-hover:text-[#8fa38d] transition-colors leading-snug">
                            {item.title}
                          </p>
                          <span className="text-[9px] font-bold tracking-widest uppercase text-[#8fa38d] bg-[#d4e0d3]/60 rounded-full px-1.5 py-0.5 leading-none">
                            FREE
                          </span>
                        </div>
                        <p className="text-[11px] text-[#aaaaaa] mt-0.5 leading-snug">
                          {item.sub}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Blog */}
          <div
            className="relative"
            onMouseEnter={openBlogDropdown}
            onMouseLeave={closeBlogDropdown}
          >
            <button className="flex items-center gap-1 px-3 py-2 rounded-full text-[#3a3a3a] hover:bg-[#f2d6c9]/40 hover:text-[#e3a99c] transition-colors duration-200 text-sm font-medium whitespace-nowrap">
              Blog
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${blogOpen ? "rotate-180" : ""}`} />
            </button>

            {blogOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                onMouseEnter={openBlogDropdown}
                onMouseLeave={closeBlogDropdown}
              >
                <div className="bg-white border border-[#e7ddd3] rounded-2xl shadow-xl overflow-hidden w-[280px] py-2">
                  <p className="px-4 pt-2 pb-1 text-[10px] font-bold tracking-widest text-[#aaaaaa] uppercase">
                    Featured Guides
                  </p>
                  {blogFeatured.map((item) => (
                    <Link
                      key={item.link}
                      href={item.link}
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-[#f9f5f2] transition-colors duration-150 group"
                    >
                      <span
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: item.bg }}
                      >
                        {item.emoji}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#3a3a3a] group-hover:text-[#e3a99c] transition-colors leading-snug">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-[#aaaaaa] mt-0.5 leading-snug">
                          {item.sub}
                        </p>
                      </div>
                    </Link>
                  ))}
                  <div className="mx-4 my-1.5 h-px bg-[#f0ebe6]" />
                  <Link
                    href="/blog"
                    className="flex items-center justify-between px-4 py-2.5 text-xs font-bold text-[#e3a99c] hover:bg-[#f9f5f2] transition-colors duration-150"
                  >
                    Browse all articles
                    <span className="text-[#e3a99c]">→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Static links */}
          {navLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="relative px-3 py-2 text-[#3a3a3a] hover:text-[#e3a99c] transition-colors duration-200 text-sm font-medium rounded-full hover:bg-[#f2d6c9]/40 whitespace-nowrap"
            >
              {item.name}
            </a>
          ))}
        </div>

        <Link
          href="https://calendly.com/abie-gamao/spain-dnv"
          className="relative z-20 flex-shrink-0 px-5 py-2.5 rounded-full bg-[#3a3a3a] text-white text-sm font-semibold hover:bg-[#e3a99c] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap"
        >
          Book a Call
        </Link>
      </NavBody>

      {/* ── Mobile ────────────────────────────────────────────────────────── */}
      <MobileNav className="px-4">
        <MobileNavHeader>
          <Link href="/#hero">
            <img
              src="/assets/logo.png"
              alt="Happy Voyager"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          className="bg-[#f9f5f2] border-t border-[#e7ddd3]"
        >
          {/* DNV expandable */}
          <div className="w-full">
            <button
              onClick={() => setMobileDnvOpen(!mobileDnvOpen)}
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#e3a99c]/10 border border-[#e3a99c]/30 text-[#e3a99c] font-semibold text-sm"
            >
              <span>🇪🇸 Digital Nomad Visa</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileDnvOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileDnvOpen && (
              <div className="mt-2 ml-3 flex flex-col gap-2 border-l-2 border-[#e3a99c]/30 pl-4">
                {dnvDropdown.map((item) => (
                  <a
                    key={item.name}
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm transition-colors py-0.5 font-medium ${
                      item.name.includes("Assessment")
                        ? "text-[#e3a99c] font-bold"
                        : "text-[#e3a99c] hover:text-[#d38b7b]"
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Free Tools expandable */}
          <div className="w-full">
            <button
              onClick={() => setMobileFreeToolsOpen(!mobileFreeToolsOpen)}
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#d4e0d3]/40 border border-[#8fa38d]/30 text-[#8fa38d] font-semibold text-sm"
            >
              <span>✨ Free Tools</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileFreeToolsOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileFreeToolsOpen && (
              <div className="mt-2 ml-3 flex flex-col gap-1 border-l-2 border-[#8fa38d]/30 pl-4">
                {freeToolsItems.map((item) => (
                  <Link
                    key={item.link}
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 py-1.5 group"
                  >
                    <span
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-xs flex-shrink-0"
                      style={{ backgroundColor: item.bg }}
                    >
                      {item.emoji}
                    </span>
                    <span className="text-sm font-medium text-[#3a3a3a] group-hover:text-[#8fa38d] transition-colors leading-snug">
                      {item.title}
                    </span>
                    <span className="text-[9px] font-bold tracking-widest uppercase text-[#8fa38d] bg-[#d4e0d3]/60 rounded-full px-1.5 py-0.5 ml-auto leading-none">
                      FREE
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Services expandable */}
          <div className="w-full">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="flex items-center justify-between w-full text-base font-medium text-[#3a3a3a] hover:text-[#e3a99c] transition-colors py-1"
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileServicesOpen && (
              <div className="mt-2 ml-3 flex flex-col gap-1 border-l-2 border-[#e7ddd3] pl-4">
                {servicesDropdown.map((item) => (
                  <a
                    key={item.title}
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 py-1.5 group"
                  >
                    <span
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-xs flex-shrink-0"
                      style={{ backgroundColor: item.bg }}
                    >
                      {item.emoji}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#3a3a3a] group-hover:text-[#e3a99c] transition-colors leading-snug">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-[#aaaaaa] leading-snug">{item.sub}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Blog expandable */}
          <div className="w-full">
            <button
              onClick={() => setMobileBlogOpen(!mobileBlogOpen)}
              className="flex items-center justify-between w-full text-base font-medium text-[#3a3a3a] hover:text-[#e3a99c] transition-colors py-1"
            >
              Blog
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileBlogOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileBlogOpen && (
              <div className="mt-2 ml-3 flex flex-col gap-1 border-l-2 border-[#e7ddd3] pl-4">
                {blogFeatured.map((item) => (
                  <Link
                    key={item.link}
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 py-1.5 group"
                  >
                    <span
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-xs flex-shrink-0"
                      style={{ backgroundColor: item.bg }}
                    >
                      {item.emoji}
                    </span>
                    <span className="text-sm font-medium text-[#3a3a3a] group-hover:text-[#e3a99c] transition-colors leading-snug">
                      {item.title}
                    </span>
                  </Link>
                ))}
                <Link
                  href="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs font-bold text-[#e3a99c] py-1 mt-1"
                >
                  Browse all articles →
                </Link>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-[#3a3a3a] hover:text-[#e3a99c] transition-colors w-full py-1"
            >
              {link.name}
            </a>
          ))}

          <Link
            href="https://calendly.com/abie-gamao/spain-dnv"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 px-8 py-3 rounded-full bg-[#3a3a3a] text-white font-semibold hover:bg-[#e3a99c] transition-colors w-full text-center block"
          >
            Book a Call
          </Link>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
