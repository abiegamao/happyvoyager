"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function TopbarLinks() {
  const pathname = usePathname();

  const tabs = [
    {
      label: "Home",
      href: "/playbook/spain-dnv/home",
      active:
        pathname.includes("/home") ||
        pathname === "/playbook/spain-dnv",
    },
    {
      label: "Guides",
      href: "/playbook/spain-dnv/guides",
      active: pathname.includes("/guides"),
    },
    {
      label: "Lessons",
      href: "/playbook/spain-dnv/lessons/lesson-1",
      active: pathname.includes("/lessons/"),
    },
    {
      label: "Progress",
      href: "/playbook/spain-dnv/progress",
      active: pathname.includes("/progress"),
    },
    {
      label: "FAQs & Tips",
      href: "/playbook/spain-dnv/faqs-and-tips",
      active: pathname.includes("/faqs-and-tips"),
    },
  ];

  return (
    <div className="h-[48px] border-b border-[#EAE9E9] flex items-center justify-center px-4 md:px-6 bg-white shrink-0 overflow-x-auto">
      <div className="flex items-center w-full max-w-[1400px] mx-auto h-full">
        <nav className="flex items-center gap-6 h-full">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              href={tab.href}
              className={`text-[14px] font-medium transition-colors whitespace-nowrap h-full flex items-center border-b-[3px] ${
                tab.active
                    ? "text-[#37352f] border-[#37352f]"
                    : "text-[#787774] hover:text-[#37352f] border-transparent"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
