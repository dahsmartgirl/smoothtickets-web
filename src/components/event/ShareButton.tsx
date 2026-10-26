"use client";

import { CheckmarkCircle02Icon, Share08Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { Button } from "../ui/button";

/** The phone's share sheet where there is one; otherwise copies the link. Affiliate `?ref=` links are shared as-is. */
export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // dismissed
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="glass" onClick={share}>
      <HugeiconsIcon icon={copied ? CheckmarkCircle02Icon : Share08Icon} strokeWidth={2} aria-hidden />
      <span aria-live="polite">{copied ? "Link copied" : "Share"}</span>
    </Button>
  );
}
