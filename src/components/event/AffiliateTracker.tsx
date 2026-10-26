"use client";

import { useEffect } from "react";
import { API_URL } from "@/lib/api";

/**
 * Affiliate attribution, exactly as the main app does it: when an event link carries `?ref=<affiliate>`,
 * fingerprint the browser (FingerprintJS, the app's version), keep it in a `fingerprint` cookie for 30 days
 * and report the visit. Checkout sends the same fingerprint and ref, so the sale is credited to the affiliate.
 */
export function AffiliateTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref")?.trim();
    if (!ref) return;
    (async () => {
      try {
        const FingerprintJS = (await import("@fingerprintjs/fingerprintjs")).default;
        const { visitorId } = await (await FingerprintJS.load()).get();
        if (!visitorId) return;
        document.cookie = `fingerprint=${encodeURIComponent(visitorId)}; max-age=${30 * 24 * 60 * 60}; path=/; samesite=lax`;
        const qs = new URLSearchParams({ slug, affiliate: ref, fingerprint: visitorId });
        await fetch(`${API_URL}/ticket/whitelist?${qs}`, { headers: { "Content-Type": "application/json" } });
      } catch {
        // Attribution is best-effort; it must never get in the way of buying.
      }
    })();
  }, [slug]);
  return null;
}
