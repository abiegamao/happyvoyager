"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Lock,
  ArrowRight,
  LogOut,
  Sparkles,
  Clock,
  Bell,
  Plane,
} from "lucide-react";
import { clearSession } from "@/lib/playbook-session";
import type { PlaybookSession, PlaybookPurchase } from "@/lib/playbook-session";
import { PLAYBOOKS, WAITLIST_PLAYBOOKS, COMING_SOON } from "@/data/playbooks";
import type { PlaybookConfig } from "@/data/playbooks/types";
import WaitlistCardButton from "./WaitlistCardButton";

interface DashboardProps {
  session: PlaybookSession;
  onLogout: () => void;
}

export default function Dashboard({ session, onLogout }: DashboardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const firstName = session.name?.split(" ")[0] || "Voyager";
  const activePurchases = session.purchases.filter((p) => p.isActive);
  const purchasedSlugs = new Set(activePurchases.map((p) => p.playbookSlug));

  // Playbooks available for purchase that user hasn't bought
  const unpurchased = PLAYBOOKS.filter((p) => !purchasedSlugs.has(p.slug));

  const handleLogout = () => {
    clearSession();
    onLogout();
  };

  return (
    <main className="min-h-screen bg-[#f9f5f2]">
      {/* Header */}
      <header className="border-b border-[#e7ddd3] bg-white/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="inline-block group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo.png"
              alt="Happy Voyager"
              className="w-[140px] h-auto group-hover:opacity-80 transition-opacity"
            />
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-[13px] text-[#787774] hover:text-[#3a3a3a] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div
          className={`mb-10 transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Plane className="w-5 h-5 text-[#e3a99c]" />
            <span className="text-[13px] font-semibold text-[#e3a99c] uppercase tracking-wide">
              Playbook Portal
            </span>
          </div>
          <h1 className="text-[28px] md:text-[34px] font-bold text-[#3a3a3a] tracking-tight">
            Welcome back, {firstName}!
          </h1>
          <p className="text-[15px] text-[#787774] mt-1">
            Here&apos;s everything in your travel toolkit.
          </p>
        </div>

        {/* ── Your Playbooks ── */}
        {activePurchases.length > 0 && (
          <section
            className={`mb-12 transition-all duration-500 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#b0a89e] mb-4">
              Your Playbooks
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {activePurchases.map((purchase) => (
                <OwnedPlaybookCard key={purchase.playbookSlug} purchase={purchase} />
              ))}
            </div>
          </section>
        )}

        {/* ── Explore More ── */}
        <section
          className={`mb-12 transition-all duration-500 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#b0a89e] mb-4">
            {activePurchases.length > 0 ? "Explore More" : "Available Playbooks"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Unpurchased available playbooks */}
            {unpurchased.map((playbook) => (
              <AvailableCard key={playbook.slug} playbook={playbook} email={session.email} />
            ))}

            {/* Waitlist */}
            {WAITLIST_PLAYBOOKS.map((playbook) => (
              <WaitlistCard key={playbook.slug} playbook={playbook} />
            ))}

            {/* Coming soon */}
            {COMING_SOON.map((item) => (
              <ComingSoonCard key={item.title} item={item} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

// ── Owned Playbook Card ──
function OwnedPlaybookCard({ purchase }: { purchase: PlaybookPurchase }) {
  const config = PLAYBOOKS.find((p) => p.slug === purchase.playbookSlug);
  if (!config) return null;

  const statusLabel =
    purchase.subscriptionStatus === "trialing"
      ? "Free Trial"
      : purchase.subscriptionStatus === "active"
        ? "Active"
        : "Purchased";

  const statusColor =
    purchase.subscriptionStatus === "trialing" ? "#c9a84c" : "#8fa38d";

  return (
    <Link
      href={`/playbook/${config.slug}/home`}
      className="group block bg-white rounded-2xl border border-[#e7ddd3] overflow-hidden hover:border-[#e3a99c] hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Cover image */}
      {config.catalog.coverImage && (
        <div className="h-40 overflow-hidden bg-[#f2d6c9]/30">
          <Image
            src={config.catalog.coverImage}
            alt={config.heroTitle}
            width={600}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{config.catalog.emoji}</span>
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ color: statusColor, backgroundColor: `${statusColor}20` }}
          >
            {statusLabel}
          </span>
        </div>
        <h3 className="text-[17px] font-bold text-[#3a3a3a] mb-1 group-hover:text-[#e3a99c] transition-colors">
          {config.heroTitle}
        </h3>
        <p className="text-[13px] text-[#787774] line-clamp-2 mb-4">
          {config.catalog.tagline}
        </p>

        <div className="flex items-center gap-2 text-[13px] font-semibold text-[#e3a99c]">
          <BookOpen className="w-4 h-4" />
          Continue Learning
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

// ── Available (unpurchased) Card ──
function AvailableCard({ playbook, email }: { playbook: PlaybookConfig; email: string }) {
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleGetAccess = async () => {
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, slug: playbook.slug }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutLoading(false);
      }
    } catch {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e7ddd3] overflow-hidden hover:shadow-md transition-all">
      {playbook.catalog.coverImage && (
        <div className="h-32 overflow-hidden bg-[#f2d6c9]/20 relative">
          <Image
            src={playbook.catalog.coverImage}
            alt={playbook.heroTitle}
            width={600}
            height={300}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{playbook.catalog.emoji}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#8fa38d] bg-[#8fa38d]/10 px-2 py-0.5 rounded-full">
            Available
          </span>
        </div>
        <h3 className="text-[15px] font-bold text-[#3a3a3a] mb-1">{playbook.heroTitle}</h3>
        <p className="text-[12px] text-[#787774] line-clamp-2 mb-3">
          {playbook.catalog.description}
        </p>
        <button
          onClick={handleGetAccess}
          disabled={checkoutLoading}
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white bg-[#3a3a3a] hover:bg-[#2a2a2a] px-4 py-2 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {checkoutLoading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Redirecting...
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              Get Access
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ── Waitlist Card ──
function WaitlistCard({ playbook }: { playbook: PlaybookConfig }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e7ddd3] p-4 hover:shadow-md transition-all">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{playbook.catalog.emoji}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#c9a84c] bg-[#c9a84c]/10 px-2 py-0.5 rounded-full">
          <Bell className="w-3 h-3 inline mr-0.5" />
          Waitlist
        </span>
      </div>
      <h3 className="text-[15px] font-bold text-[#3a3a3a] mb-1">{playbook.heroTitle}</h3>
      <p className="text-[12px] text-[#787774] line-clamp-2 mb-3">
        {playbook.catalog.tagline}
      </p>
      <WaitlistCardButton playbook={playbook} />
    </div>
  );
}

// ── Coming Soon Card ──
function ComingSoonCard({
  item,
}: {
  item: { emoji: string; title: string; tagline: string; accent: string; bg: string };
}) {
  return (
    <div className="bg-white/60 rounded-2xl border border-dashed border-[#e7ddd3] p-4 opacity-70">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{item.emoji}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#b0a89e] bg-[#e7ddd3]/50 px-2 py-0.5 rounded-full">
          <Lock className="w-3 h-3 inline mr-0.5" />
          Coming Soon
        </span>
      </div>
      <h3 className="text-[15px] font-bold text-[#3a3a3a] mb-1">{item.title}</h3>
      <p className="text-[12px] text-[#787774] line-clamp-2">
        {item.tagline}
      </p>
      <div className="mt-3 flex items-center gap-1.5 text-[12px] text-[#b0a89e]">
        <Clock className="w-3.5 h-3.5" />
        We&apos;ll let you know when it&apos;s ready
      </div>
    </div>
  );
}
