"use client";

import { useState } from "react";
import Link from "next/link";
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
  { name: "Services", link: "/#services" },
  { name: "Destinations", link: "/#destinations" },
  { name: "Free Tool", link: "/document-checklist" },
  { name: "Blogs", link: "/blog" },
  { name: "Contact", link: "/contact" },
  { name: "About", link: "/my-story" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar className="fixed top-0 z-50 font-[family-name:var(--font-body)]">
      {/* Desktop */}
      <NavBody className="bg-[#f9f5f2]/95 border-[#e7ddd3]">
        <Link href="/#hero" className="relative z-20 flex-shrink-0">
          <img
            src="/assets/logo.png"
            alt="Happy Voyager"
            className="h-10 w-auto max-w-[110px] object-contain"
          />
        </Link>

        <NavItems
          items={navLinks}
          className="text-[#3a3a3a] hover:text-[#e3a99c]"
        />

        <Link
          href="/booking"
          className="relative z-20 flex-shrink-0 px-6 py-2.5 rounded-full bg-[#3a3a3a] text-white text-sm font-semibold hover:bg-[#e3a99c] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Let&apos;s Talk
        </Link>
      </NavBody>

      {/* Mobile */}
      <MobileNav className="bg-[#f9f5f2]/95 px-4">
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
            href="/booking"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 px-8 py-3 rounded-full bg-[#3a3a3a] text-white font-semibold hover:bg-[#e3a99c] transition-colors w-full text-center block"
          >
            Let&apos;s Talk
          </Link>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
