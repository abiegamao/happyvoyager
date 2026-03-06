"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, ChevronRight, Menu, X, Book } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TopbarLinks } from "@/components/playbook/TopbarLinks";

export default function PlaybookLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    const isGatePage = pathname === "/playbook";

    useEffect(() => {
        const email = sessionStorage.getItem("playbook_email");
        if (!email && !isGatePage) {
            router.replace("/playbook");
        } else {
            setIsChecking(false);
        }
    }, [pathname, isGatePage, router]);

    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

    if (isChecking) return null;

    if (isGatePage) {
        return <>{children}</>;
    }

    const navLinks = [
        {
            title: "What’s this visa about and do I qualify?",
            href: "/playbook/whats-this-playbook-about",
            icon: <FileIcon />,
            active: pathname.includes("whats-this-playbook-about")
        },
        {
            title: "Application Process",
            href: "#",
            icon: <FileIcon />,
            active: false,
            disabled: true
        }
    ];

    return (
        <div className="flex flex-col h-screen min-h-screen bg-white text-[#37352f] font-sans">
            {/* Global Top Bar (Notion Developers style) */}
            <header className="h-[64px] flex items-center justify-center px-4 md:px-6 bg-white shrink-0 z-50">
                <div className="flex items-center justify-between w-full max-w-[1400px] mx-auto h-full">
                    {/* Left: Logo */}
                    <div className="flex items-center gap-2 h-full w-auto md:w-[250px] flex-shrink-0">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-1.5 text-[#37352f] hover:bg-[#efefed] rounded md:hidden -ml-2 mr-1"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <Link href="/playbook" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <Image src="/assets/logo.png" alt="Logo" width={20} height={20} className="rounded-sm" />
                            <span className="font-semibold text-[15px] tracking-tight">Spain Digital Nomad Playbook</span>
                        </Link>
                    </div>

                    {/* Center: Search */}
                    <div className="hidden md:flex justify-center flex-1 max-w-[480px]">
                        <div className="flex items-center gap-2 px-3 py-2 w-full bg-[#f7f7f5] hover:bg-[#efefed] rounded-full transition-colors cursor-pointer text-[#787774]">
                            <Search className="w-4 h-4 opacity-70" />
                            <span className="text-[14px] font-medium mr-auto">Search...</span>
                            <div className="flex items-center gap-3">
                                <span className="text-[12px] opacity-70 font-medium">Ctrl K</span>
                                <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#37352f] px-2.5 py-1 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-[#EAE9E9]"> Ask AI
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Secondary Top Bar */}
            <TopbarLinks />

            <div className="flex-1 flex overflow-hidden max-w-[1400px] w-full mx-auto">
                {/* Mobile Sidebar Overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Left Sidebar */}
                <aside
                    className={`absolute md:static top-0 left-0 h-full w-[280px] bg-white flex flex-col transition-transform duration-300 ease-in-out z-40 ${sidebarOpen ? "translate-x-0 shadow-2xl md:shadow-none" : "-translate-x-full md:translate-x-0"
                        } border-r border-[#EAE9E9]`}
                >
                    <div className="flex-1 overflow-y-auto pt-6 pb-20">
                        {/* Status, Community, Blog */}
                        <div className="px-5 mb-8 space-y-1">
                            <Link href="#" className="flex items-center gap-3 px-2 py-1.5 text-[14px] text-[#787774] hover:text-[#37352f] hover:bg-[#efefed] rounded transition-colors">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20V10M18 20V4M6 20v-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                Status
                            </Link>
                            <Link href="#" className="flex items-center gap-3 px-2 py-1.5 text-[14px] text-[#787774] hover:text-[#37352f] hover:bg-[#efefed] rounded transition-colors">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                Community
                            </Link>
                            <Link href="#" className="flex items-center gap-3 px-2 py-1.5 text-[14px] text-[#787774] hover:text-[#37352f] hover:bg-[#efefed] rounded transition-colors">
                                <Book className="w-4 h-4" />
                                Blog
                            </Link>
                        </div>

                        {/* Guides section */}
                        <div className="px-5">
                            <div className="px-2 py-1.5 text-xs font-semibold text-[#37352f] mb-1">
                                Get started
                            </div>
                            <div className="space-y-0.5 border-l-[3px] border-[#EAE9E9] ml-2 pl-3">
                                <Link
                                    href="/playbook/whats-this-playbook-about"
                                    className={`block text-[14px] py-1.5 px-2 rounded -ml-2 transition-colors ${pathname.includes("whats-this-playbook-about")
                                        ? "bg-[#efefed] text-[#37352f] font-medium"
                                        : "text-[#787774] hover:bg-[#f7f7f5]"
                                        }`}
                                >
                                    Notion API Overview
                                </Link>
                                <Link
                                    href="#"
                                    className="block text-[14px] py-1.5 px-2 rounded -ml-2 text-[#787774] hover:bg-[#f7f7f5] transition-colors"
                                >
                                    Build your first integration
                                </Link>
                                <Link
                                    href="#"
                                    className="block text-[14px] py-1.5 px-2 rounded -ml-2 text-[#787774] hover:bg-[#f7f7f5] transition-colors"
                                >
                                    Authorization
                                </Link>
                                <Link
                                    href="#"
                                    className="block text-[14px] py-1.5 px-2 rounded -ml-2 text-[#787774] hover:bg-[#f7f7f5] transition-colors"
                                >
                                    Publishing to Notion&apos;s Integration Gallery
                                </Link>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col min-w-0 bg-white h-full overflow-y-auto">
                    <div className="flex-1 flex flex-col pt-8 pb-24">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

function FileIcon({ className = "w-4 h-4" }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
        </svg>
    );
}
