"use client";

import { useState } from "react";
import CalendlyModal from "@/components/CalendlyModal";

interface BookCallButtonProps {
    children: React.ReactNode;
    className?: string;
    url?: string;
    title?: string;
}

/**
 * Drop-in replacement for <a href="https://calendly.com/...">
 * Opens the Calendly booking UI in an inline modal instead of a new tab.
 */
export default function BookCallButton({ children, className = "", url, title }: BookCallButtonProps) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button onClick={() => setOpen(true)} className={className}>
                {children}
            </button>
            <CalendlyModal
                isOpen={open}
                onClose={() => setOpen(false)}
                url={url}
                title={title}
            />
        </>
    );
}
