"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import { getSession, setSession } from "@/lib/playbook-session";
import type { PlaybookSession } from "@/lib/playbook-session";
import PortalLogin from "@/components/playbook/PortalLogin";
import Dashboard from "@/components/playbook/Dashboard";

async function redirectToCheckout(slug: string, interval?: string | null) {
  const res = await fetch("/api/stripe/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug, interval: interval || undefined }),
  });
  const data = await res.json();
  if (data.url) {
    window.location.href = data.url;
    return true;
  }
  return false;
}

function PortalContent() {
  const searchParams = useSearchParams();
  const [session, setSessionState] = useState<PlaybookSession | null>(null);
  const [checking, setChecking] = useState(true);
  const [redirectingToCheckout, setRedirectingToCheckout] = useState(false);

  const sessionId = searchParams.get("session_id");
  const purchaseIntent = searchParams.get("intent") === "purchase"
    ? searchParams.get("slug")
    : null;
  const interval = searchParams.get("interval");

  useEffect(() => {
    (async () => {
      // ── If returning from Stripe with session_id, verify + save purchase first ──
      if (sessionId) {
        try {
          const verifyRes = await fetch(
            `/api/stripe/verify-session?session_id=${sessionId}`
          );
          const verifyData = await verifyRes.json();

          if (verifyData.hasAccess && verifyData.email) {
            // Purchase saved — now load the full session
            const res = await fetch("/api/stripe/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: verifyData.email }),
            });
            const data = await res.json();
            const pbSession: PlaybookSession = {
              email: verifyData.email,
              name: data.name || verifyData.name || "",
              customerId: data.customerId || "",
              purchases: data.purchases || [],
            };
            setSession(pbSession);
            setSessionState(pbSession);
            setChecking(false);
            return;
          }
        } catch {
          // Fall through to normal flow
        }
      }

      // ── Check for existing playbook session (fast path) ──
      const existing = getSession();
      if (existing && existing.purchases.length > 0) {
        setSessionState(existing);

        if (purchaseIntent) {
          setRedirectingToCheckout(true);
          const redirected = await redirectToCheckout(purchaseIntent, interval);
          if (!redirected) setRedirectingToCheckout(false);
          return;
        }

        setChecking(false);
        return;
      }

      // ── Check Supabase Auth ──
      const supabase = createSupabaseBrowser();
      const { data: { user } } = await supabase.auth.getUser();

      if (user?.email) {
        if (purchaseIntent) {
          setRedirectingToCheckout(true);
          const redirected = await redirectToCheckout(purchaseIntent, interval);
          if (!redirected) {
            setRedirectingToCheckout(false);
            setChecking(false);
          }
          return;
        }

        try {
          const res = await fetch("/api/stripe/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email }),
          });
          const data = await res.json();
          const pbSession: PlaybookSession = {
            email: user.email,
            name: user.user_metadata?.name || data.name || "",
            customerId: data.customerId || "",
            purchases: data.purchases || [],
          };
          setSession(pbSession);
          setSessionState(pbSession);
        } catch {
          const pbSession: PlaybookSession = {
            email: user.email,
            name: user.user_metadata?.name || "",
            customerId: "",
            purchases: [],
          };
          setSession(pbSession);
          setSessionState(pbSession);
        }
      }

      setChecking(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checking || redirectingToCheckout) {
    return (
      <div className="min-h-screen bg-[#f9f5f2] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#e3a99c]/30 border-t-[#e3a99c] rounded-full animate-spin mx-auto mb-3" />
          {redirectingToCheckout && (
            <p className="text-[14px] text-[#787774]">Redirecting to checkout...</p>
          )}
        </div>
      </div>
    );
  }

  if (session) {
    return (
      <Dashboard
        session={session}
        onLogout={async () => {
          const supabase = createSupabaseBrowser();
          await supabase.auth.signOut();
          window.location.href = "/";
        }}
      />
    );
  }

  return (
    <PortalLogin
      onLoginSuccess={(s) => setSessionState(s)}
      initialSessionId={sessionId}
      purchaseIntent={purchaseIntent ? { slug: purchaseIntent, interval } : undefined}
    />
  );
}

export default function PlaybookPortalPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f9f5f2] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#e3a99c]/30 border-t-[#e3a99c] rounded-full animate-spin" />
        </div>
      }
    >
      <PortalContent />
    </Suspense>
  );
}
