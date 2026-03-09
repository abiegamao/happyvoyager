"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface CalendlyModalProps {
    isOpen: boolean;
    onClose: () => void;
    url?: string;
    title?: string;
}

const DEFAULT_CALENDLY_URL = "https://calendly.com/abie-gamao/free-discovery-call";
const DEFAULT_TITLE = "Book a Free 15-min Call";

export default function CalendlyModal({
    isOpen,
    onClose,
    url = DEFAULT_CALENDLY_URL,
    title = DEFAULT_TITLE
}: CalendlyModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Inject Calendly widget script once
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (document.getElementById("calendly-script")) return;
        const script = document.createElement("script");
        script.id = "calendly-script";
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.head.appendChild(script);
    }, []);

    // Manually initialize the widget when the modal opens
    useEffect(() => {
        if (isOpen && mounted && (window as any).Calendly) {
            // Give the DOM a tiny moment to ensure the widget container is rendered
            const timer = setTimeout(() => {
                const container = document.getElementById('calendly-inline-container');
                if (container) {
                    (window as any).Calendly.initInlineWidget({
                        url: `${url}?hide_landing_page_details=1&hide_gdpr_banner=1`,
                        parentElement: container,
                    });
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isOpen, mounted, url]);

    // Lock body scroll while open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                style={{ height: "min(680px, 90vh)" }}
            >
                {/* Header bar */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-[#3a3a3a] text-white flex-shrink-0">
                    <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-[#e3a99c]" />
                        <span className="text-sm font-semibold">{title}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-4 h-4 text-white" />
                    </button>
                </div>

                {/* Calendly inline embed container */}
                <div className="flex-1 overflow-hidden relative">
                    <div
                        id="calendly-inline-container"
                        className="w-full h-full"
                        style={{ minWidth: 320, height: "100%" }}
                    />
                </div>
            </div>
        </div>,
        document.body
    );
}
