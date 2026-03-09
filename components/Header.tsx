"use client";

import { useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
import BookCallButton from "@/components/BookCallButton";

const navLinks = [
  { name: "About", link: "/my-story" },
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
    emoji: "🗓",
    title: "Schengen Day & Budget Tracker",
    sub: "Track your 90/180 days and budget",
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

const spainVisasDropdown = [
  {
    emoji: "🇪🇸",
    title: "Digital Nomad Visa",
    sub: "Remote workers & freelancers",
    link: "/digital-nomad-visa",
    bg: "#f2d6c9",
    badge: "Our Specialty",
  },
  {
    emoji: "🏡",
    title: "Non-Lucrative Visa",
    sub: "Retirees & passive income earners",
    link: "/non-lucrative-visa",
    bg: "#e0eaeb",
    badge: null,
  },
  {
    emoji: "🎓",
    title: "Student Visa",
    sub: "Students & language learners",
    link: "/student-visa",
    bg: "#d4e0d3",
    badge: null,
  },
];

function HeaderInner({ darkBg }: { darkBg?: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [spainVisasOpen, setSpainVisasOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [freeToolsOpen, setFreeToolsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileSpainVisasOpen, setMobileSpainVisasOpen] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);
  const [mobileFreeToolsOpen, setMobileFreeToolsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const spainVisasTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blogTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const freeToolsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };
  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 120);
  };

  const openSpainVisasDropdown = () => {
    if (spainVisasTimeoutRef.current) clearTimeout(spainVisasTimeoutRef.current);
    setSpainVisasOpen(true);
  };
  const closeSpainVisasDropdown = () => {
    spainVisasTimeoutRef.current = setTimeout(() => setSpainVisasOpen(false), 120);
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
      <NavBody className={darkBg ? "!bg-[#f9f5f2]/95 !backdrop-blur-md shadow-[0_0_0_1px_rgba(231,221,211,0.6)]" : ""}>
        <Link href="/#" className="relative z-20 flex-shrink-0">
          <img
            src="/assets/logo.png"
            alt="Happy Voyager"
            className="h-10 w-auto max-w-[110px] object-contain"
          />
        </Link>

        {/* Nav items */}
        <div className="absolute inset-0 hidden flex-row items-center justify-center gap-0.5 text-sm font-medium lg:flex pr-72 pl-40">

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

          {/* Spain Visas */}
          <div
            className="relative"
            onMouseEnter={openSpainVisasDropdown}
            onMouseLeave={closeSpainVisasDropdown}
          >
            <button
              className="relative flex items-center gap-1 px-3 py-2 rounded-full text-[#e3a99c] font-semibold text-sm bg-[#e3a99c]/10 border border-[#e3a99c]/30 hover:bg-[#e3a99c] hover:text-white transition-all duration-200 whitespace-nowrap"
            >
              🇪🇸 Spain Visas
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${spainVisasOpen ? "rotate-180" : ""}`} />
            </button>

            {spainVisasOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                onMouseEnter={openSpainVisasDropdown}
                onMouseLeave={closeSpainVisasDropdown}
              >
                <div className="bg-white border border-[#e7ddd3] rounded-2xl shadow-xl overflow-hidden w-[288px] py-2">
                  <p className="px-4 pt-2 pb-1 text-[10px] font-bold tracking-widest text-[#aaaaaa] uppercase">
                    Visa Guides
                  </p>
                  {spainVisasDropdown.map((item) => (
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
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-[#3a3a3a] group-hover:text-[#e3a99c] transition-colors leading-snug">
                            {item.title}
                          </p>
                          {item.badge && (
                            <span className="text-[9px] font-bold tracking-widest uppercase text-[#e3a99c] bg-[#f2d6c9] rounded-full px-1.5 py-0.5 leading-none flex-shrink-0">
                              {item.badge}
                            </span>
                          )}
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

        <div className="relative z-20 flex-shrink-0 flex items-center gap-2">
          <Link
            href="/playbook"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3a3a3a] text-white text-xs font-bold tracking-wide hover:bg-[#e3a99c] transition-all duration-300 whitespace-nowrap"
          >
            📖 Playbook
            <span className="text-[9px] font-bold tracking-widest uppercase text-white/60 bg-white/10 rounded-full px-1.5 py-0.5 leading-none">
              PRO
            </span>
          </Link>
          <BookCallButton className="px-5 py-2.5 rounded-full border border-[#3a3a3a]/30 text-[#3a3a3a] text-sm font-semibold hover:bg-[#3a3a3a] hover:text-white transition-all duration-300 whitespace-nowrap">
            Book a Call
          </BookCallButton>
        </div>
      </NavBody>

      {/* ── Mobile ────────────────────────────────────────────────────────── */}
      <MobileNav className={darkBg ? "!bg-[#f9f5f2]/95" : ""}>
        <MobileNavHeader>
          <Link href="/#hero">
            <img
              src="/assets/logo.png"
              alt="Happy Voyager"
              className="h-11 w-auto object-contain"
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
          {/* Playbook Pro ~ standalone prominent link */}
          <Link
            href="/playbook"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-[#3a3a3a] text-white font-bold text-sm"
          >
            <span className="flex items-center gap-2">
              📖 Playbook
            </span>
            <span className="text-[9px] font-bold tracking-widest uppercase text-white/60 bg-white/10 rounded-full px-2 py-1 leading-none">
              PRO
            </span>
          </Link>

          {/* Spain Visas expandable */}
          <div className="w-full">
            <button
              onClick={() => setMobileSpainVisasOpen(!mobileSpainVisasOpen)}
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#e3a99c]/10 border border-[#e3a99c]/30 text-[#e3a99c] font-semibold text-sm"
            >
              <span>🇪🇸 Spain Visas</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileSpainVisasOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileSpainVisasOpen && (
              <div className="mt-2 ml-3 flex flex-col gap-1 border-l-2 border-[#e3a99c]/30 pl-4">
                {spainVisasDropdown.map((item) => (
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
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#3a3a3a] group-hover:text-[#e3a99c] transition-colors leading-snug">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-[#aaaaaa] leading-snug">{item.sub}</p>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] font-bold tracking-widest uppercase text-[#e3a99c] bg-[#f2d6c9] rounded-full px-1.5 py-0.5 ml-auto leading-none flex-shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </Link>
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

          <BookCallButton
            className="mt-2 px-8 py-3 rounded-full bg-[#3a3a3a] text-white font-semibold hover:bg-[#e3a99c] transition-colors w-full text-center block"
          >
            Book a Call
          </BookCallButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}

function HeaderWithEmbedCheck({ darkBg }: { darkBg?: boolean }) {
  const searchParams = useSearchParams();
  if (searchParams.get("embed") === "1") return null;
  return <HeaderInner darkBg={darkBg} />;
}

export default function Header({ darkBg }: { darkBg?: boolean } = {}) {
  return (
    <Suspense fallback={<HeaderInner darkBg={darkBg} />}>
      <HeaderWithEmbedCheck darkBg={darkBg} />
    </Suspense>
  );
}
