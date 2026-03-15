// ─────────────────────────────────────────────
//  Playbook Session Utility
//  Centralizes all sessionStorage reads/writes
//  for the multi-playbook portal.
// ─────────────────────────────────────────────

export interface PlaybookPurchase {
  playbookSlug: string;
  purchaseType: string | null;
  subscriptionStatus: string | null;
  accessExpiresAt: string | null;
  trialEndsAt: string | null;
  currentPeriodEnd: string | null;
  isActive: boolean;
}

export interface PlaybookSession {
  email: string;
  name: string;
  customerId: string;
  purchases: PlaybookPurchase[];
}

const STORAGE_KEY = "playbook_session";

// Legacy keys (for backward compat during migration)
const LEGACY_EMAIL_KEY = "playbook_email";
const LEGACY_NAME_KEY = "playbook_name";

export function getSession(): PlaybookSession | null {
  if (typeof window === "undefined") return null;

  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as PlaybookSession;
    } catch {
      return null;
    }
  }

  // Fallback: read legacy keys for backward compat
  const email = sessionStorage.getItem(LEGACY_EMAIL_KEY);
  if (email) {
    return {
      email,
      name: sessionStorage.getItem(LEGACY_NAME_KEY) || "",
      customerId: "",
      purchases: [],
    };
  }

  return null;
}

export function setSession(data: PlaybookSession): void {
  if (typeof window === "undefined") return;

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  // Also write legacy keys so existing layout guards don't break
  sessionStorage.setItem(LEGACY_EMAIL_KEY, data.email);
  sessionStorage.setItem(LEGACY_NAME_KEY, data.name);
}

export function clearSession(): void {
  if (typeof window === "undefined") return;

  sessionStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(LEGACY_EMAIL_KEY);
  sessionStorage.removeItem(LEGACY_NAME_KEY);
}

export function hasAccessTo(slug: string): boolean {
  const session = getSession();
  if (!session) return false;
  return session.purchases.some((p) => p.playbookSlug === slug && p.isActive);
}
