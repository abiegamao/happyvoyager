"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import { getSession, setSession } from "@/lib/playbook-session";
import type { PlaybookSession } from "@/lib/playbook-session";
import PortalLogin from "@/components/playbook/PortalLogin";
import Dashboard from "@/components/playbook/Dashboard";

async function redirectToCheckout(email: string, slug: string) {
  const res = await fetch("/api/stripe/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, slug }),
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
  const router = useRouter();
  const [session, setSessionState] = useState<PlaybookSession | null>(null);
  const [checking, setChecking] = useState(true);
  const [redirectingToCheckout, setRedirectingToCheckout] = useState(false);

  const sessionId = searchParams.get("session_id");
  const purchaseIntent = searchParams.get("intent") === "purchase"
    ? searchParams.get("slug")
    : null;

  useEffect(() => {
    (async () => {
      // Check for existing playbook session first (fast path)
      const existing = getSession();
      if (existing && existing.purchases.length > 0) {
        setSessionState(existing);

        // If logged in with a purchase intent, go straight to checkout
        if (purchaseIntent) {
          setRedirectingToCheckout(true);
          const redirected = await redirectToCheckout(existing.email, purchaseIntent);
          if (!redirected) setRedirectingToCheckout(false);
          return;
        }

        setChecking(false);
        return;
      }

      // Check Supabase Auth
      const supabase = createSupabaseBrowser();
      const { data: { user } } = await supabase.auth.getUser();

      if (user?.email) {
        // If auth user exists with a purchase intent, go straight to checkout
        if (purchaseIntent) {
          setRedirectingToCheckout(true);
          const redirected = await redirectToCheckout(user.email, purchaseIntent);
          if (!redirected) setRedirectingToCheckout(false);
          return;
        }

        // Fetch purchases for this user
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
            purchaserId: data.purchaserId || "",
            purchases: data.purchases || [],
          };
          setSession(pbSession);
          setSessionState(pbSession);
        } catch {
          // Auth exists but no purchases ~ still show dashboard
          const pbSession: PlaybookSession = {
            email: user.email,
            name: user.user_metadata?.name || "",
            purchaserId: "",
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
          setSessionState(null);
        }}
      />
    );
  }

  return (
    <PortalLogin
      onLoginSuccess={(s) => setSessionState(s)}
      initialSessionId={sessionId}
      purchaseIntent={purchaseIntent ? { slug: purchaseIntent } : undefined}
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
