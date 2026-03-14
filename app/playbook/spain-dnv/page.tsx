"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSession, hasAccessTo } from "@/lib/playbook-session";

/**
 * Spain DNV gate page ~ now a redirect to the unified portal.
 * Handles backward-compat for bookmarks and Stripe redirects.
 */
export default function SpainDnvGatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    // Stripe redirect ~ forward to portal with session_id
    if (sessionId) {
      router.replace(`/playbook?session_id=${sessionId}`);
      return;
    }

    // Already logged in with access ~ go straight to playbook
    const session = getSession();
    if (session && hasAccessTo("spain-dnv")) {
      router.replace("/playbook/spain-dnv/home");
      return;
    }

    // Not logged in ~ send to portal
    router.replace("/playbook");
  }, [router, searchParams]);

  // Show nothing while redirecting
  return (
    <div className="min-h-screen bg-[#f9f5f2] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#e3a99c]/30 border-t-[#e3a99c] rounded-full animate-spin" />
    </div>
  );
}
