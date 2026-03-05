"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Link2, Check, Facebook, Linkedin } from "lucide-react";

interface ShareButtonProps {
  title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [igCopied, setIgCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const url = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.createElement("input");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => { setCopied(false); setOpen(false); }, 2000);
  };

  const shareX = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      "_blank", "noopener,noreferrer"
    );
    setOpen(false);
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank", "noopener,noreferrer"
    );
    setOpen(false);
  };

  const shareThreads = () => {
    window.open(
      `https://www.threads.net/intent/post?text=${encodeURIComponent(title + "\n\n" + url)}`,
      "_blank", "noopener,noreferrer"
    );
    setOpen(false);
  };

  const shareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank", "noopener,noreferrer"
    );
    setOpen(false);
  };

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(title + "\n\n" + url)}`,
      "_blank", "noopener,noreferrer"
    );
    setOpen(false);
  };

  // Instagram: copy link + open Instagram (no direct web share URL)
  const shareInstagram = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.createElement("input");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setIgCopied(true);
    setTimeout(() => { setIgCopied(false); }, 2500);
    window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-sm font-semibold text-[#e3a99c] hover:text-[#3a3a3a] transition-colors cursor-pointer"
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute bottom-full right-0 mb-2 w-56 bg-white rounded-2xl shadow-xl border border-[#e7ddd3] overflow-hidden z-50">

          {/* Copy link */}
          <button
            onClick={copyLink}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#3a3a3a] hover:bg-[#f9f5f2] transition-colors"
          >
            <span className="w-7 h-7 rounded-xl bg-[#f2d6c9] flex items-center justify-center flex-shrink-0">
              {copied ? <Check className="w-3.5 h-3.5 text-[#e3a99c]" /> : <Link2 className="w-3.5 h-3.5 text-[#e3a99c]" />}
            </span>
            <span className="font-medium">{copied ? "Link copied!" : "Copy link"}</span>
          </button>

          <div className="h-px bg-[#f0ebe6] mx-4" />

          {/* Threads */}
          <button
            onClick={shareThreads}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#3a3a3a] hover:bg-[#f9f5f2] transition-colors"
          >
            <span className="w-7 h-7 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-gray-900" viewBox="0 0 192 192" fill="currentColor">
                <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.23c8.248.054 14.474 2.452 18.502 7.13 2.932 3.405 4.893 8.11 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.05-14.127 5.177-6.6 8.452-15.153 9.898-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.352-22.808-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.207 17.11 97.015 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 97.144 0h-.29C68.988.195 47.389 9.643 32.926 28.08 19.819 44.91 13.082 68.399 12.828 96v.01c.254 27.6 6.991 51.089 20.098 67.92C47.389 182.357 68.988 191.805 96.854 192h.29c24.828-.173 42.287-6.676 56.621-21.006 18.545-18.54 17.972-41.659 11.885-55.845-4.316-10.062-12.45-18.267-23.113-23.161Zm-40.413 43.61c-10.457.577-21.38-4.104-27.166-11.797-3.584-4.728-5.402-10.44-5.15-16.6.467-11.262 10.024-23.966 37.948-22.394 3.327.191 6.587.47 9.78.832-1.248 15.516-5.848 45.718-15.412 49.96Z"/>
              </svg>
            </span>
            <span className="font-medium">Share on Threads</span>
          </button>

          {/* Instagram */}
          <button
            onClick={shareInstagram}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#3a3a3a] hover:bg-[#f9f5f2] transition-colors"
          >
            <span className="w-7 h-7 rounded-xl bg-pink-50 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </span>
            <span className="font-medium">{igCopied ? "Link copied ~ paste on IG!" : "Share on Instagram"}</span>
          </button>

          {/* X */}
          <button
            onClick={shareX}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#3a3a3a] hover:bg-[#f9f5f2] transition-colors"
          >
            <span className="w-7 h-7 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.261 5.636 5.903-5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </span>
            <span className="font-medium">Share on X</span>
          </button>

          {/* Facebook */}
          <button
            onClick={shareFacebook}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#3a3a3a] hover:bg-[#f9f5f2] transition-colors"
          >
            <span className="w-7 h-7 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Facebook className="w-3.5 h-3.5 text-blue-600" />
            </span>
            <span className="font-medium">Share on Facebook</span>
          </button>

          {/* LinkedIn */}
          <button
            onClick={shareLinkedIn}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#3a3a3a] hover:bg-[#f9f5f2] transition-colors"
          >
            <span className="w-7 h-7 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
              <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
            </span>
            <span className="font-medium">Share on LinkedIn</span>
          </button>

          {/* WhatsApp */}
          <button
            onClick={shareWhatsApp}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#3a3a3a] hover:bg-[#f9f5f2] transition-colors"
          >
            <span className="w-7 h-7 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </span>
            <span className="font-medium">Share on WhatsApp</span>
          </button>

        </div>
      )}
    </div>
  );
}
