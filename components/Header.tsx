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
  { name: "Blog", link: "/blog" },
  { name: "About", link: "/my-story" },
  { name: "Contact", link: "/contact" },
];

const servicesDropdown = [
  { name: "Pricing & Packages", link: "/#pricing" },
  { name: "Book Appointment (NIE/TIE)", link: "/appointments" },
  { name: "Document Translations", link: "/translations" },
  { name: "Schengen Visa Assistance", link: "/schengen-visa" },
];

const dnvDropdown = [
  { name: "Overview", link: "/digital-nomad-visa#hero" },
  { name: "Who It's For", link: "/digital-nomad-visa#who-is-it-for" },
  { name: "Requirements", link: "/digital-nomad-visa#requirements" },
  { name: "What's Included", link: "/digital-nomad-visa#whats-included" },
  { name: "How It Works", link: "/digital-nomad-visa#how-it-works" },
  { name: "Why Us", link: "/digital-nomad-visa#why-us" },
  { name: "FAQ", link: "/digital-nomad-visa#faq" },
  { name: "Free Checklist", link: "/document-checklist" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [dnvOpen, setDnvOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileDnvOpen, setMobileDnvOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dnvTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

        {/* Nav items ~ Services dropdown + rest */}
        <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium lg:flex lg:space-x-2">
          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
          >
            <button className="flex items-center gap-1 px-4 py-2 rounded-full text-[#3a3a3a] hover:bg-gray-100 hover:text-[#e3a99c] transition-colors duration-200 text-sm font-medium">
              Services
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {servicesOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <div className="bg-white border border-[#e7ddd3] rounded-2xl shadow-xl overflow-hidden min-w-[220px] py-2">
                  {servicesDropdown.map((item) => (
                    <a
                      key={item.name}
                      href={item.link}
                      className="flex items-center px-5 py-3 text-sm text-[#3a3a3a] hover:bg-[#f9f5f2] hover:text-[#e3a99c] transition-colors duration-150"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* DNV dropdown link */}
          <div
            className="relative"
            onMouseEnter={openDnvDropdown}
            onMouseLeave={closeDnvDropdown}
          >
            <div className="flex items-center">
              <Link
                href="/digital-nomad-visa"
                className="relative flex items-center gap-1 px-4 py-2 rounded-full text-[#e3a99c] font-semibold text-sm bg-[#e3a99c]/10 border border-[#e3a99c]/30 hover:bg-[#e3a99c] hover:text-white transition-all duration-200"
              >
                🇪🇸 Digital Nomad Visa
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${dnvOpen ? "rotate-180" : ""}`}
                />
              </Link>
            </div>

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
                      className="flex items-center px-5 py-3 text-sm text-[#3a3a3a] hover:bg-[#f9f5f2] hover:text-[#e3a99c] transition-colors duration-150"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Other nav links */}
          {navLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="relative px-4 py-2 text-[#3a3a3a] hover:text-[#e3a99c] transition-colors duration-200 text-sm font-medium rounded-full hover:bg-gray-100"
            >
              {item.name}
            </a>
          ))}
        </div>

        <Link
          href="https://calendly.com/abie-gamao/spain-dnv"
          className="relative z-20 flex-shrink-0 px-6 py-2.5 rounded-full bg-[#3a3a3a] text-white text-sm font-semibold hover:bg-[#e3a99c] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Book a Call
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
          {/* DNV expandable */}
          <div className="w-full">
            <button
              onClick={() => setMobileDnvOpen(!mobileDnvOpen)}
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#e3a99c]/10 border border-[#e3a99c]/30 text-[#e3a99c] font-semibold text-sm"
            >
              <div className="flex items-center gap-2">
                <span>🇪🇸 Digital Nomad Visa</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${mobileDnvOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileDnvOpen && (
              <div className="mt-2 ml-3 flex flex-col gap-2 border-l-2 border-[#e3a99c]/30 pl-4">
                {dnvDropdown.map((item) => (
                  <a
                    key={item.name}
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm text-[#e3a99c] hover:text-[#d38b7b] transition-colors py-0.5 font-medium"
                  >
                    {item.name}
                  </a>
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
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileServicesOpen && (
              <div className="mt-2 ml-3 flex flex-col gap-2 border-l-2 border-[#e7ddd3] pl-4">
                {servicesDropdown.map((item) => (
                  <a
                    key={item.name}
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm text-[#6b6b6b] hover:text-[#e3a99c] transition-colors py-0.5"
                  >
                    {item.name}
                  </a>
                ))}
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
