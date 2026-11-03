"use client";

import { useEffect, useRef, useState } from "react";
import { APP_URL } from "@/lib/events";
import { QrCode } from "./brand";

type State = "idle" | "scanning" | "admitted" | "used";

/**
 * Easter egg on the final CTA's ticket stub. Tap the QR: a scan line sweeps it and an "Admitted" stamp lands.
 * Tap again: "Already scanned", like the real scanner's one-scan-per-ticket rule, then the next ticket number
 * is ready. The QR is real: a phone camera opens /golden on whichever domain the page is served from, so the
 * Vercel preview works before launch. Nudges: a faint scan-line glint every few seconds, and the caption.
 */
export function ScanTicket() {
  const [state, setState] = useState<State>("idle");
  const [ticket, setTicket] = useState(1);
  const [played, setPlayed] = useState(false);
  const [url, setUrl] = useState(`${APP_URL}/golden`);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => setUrl(`${window.location.origin}/golden`), []);
  useEffect(() => () => clearTimeout(timer.current), []);

  const later = (ms: number, fn: () => void) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(fn, ms);
  };

  const scan = () => {
    if (state === "idle") {
      setState("scanning");
      later(900, () => {
        setState("admitted");
        setPlayed(true);
      });
    } else if (state === "admitted") {
      setState("used");
      later(2200, () => {
        setState("idle");
        setTicket((n) => n + 1);
      });
    }
  };

  return (
    <>
      <button type="button" onClick={scan} data-state={state} className="scan" aria-label={`Check in ticket number ${ticket}`}>
        <span className="cta-qr block">
          <QrCode value={url} className="size-32" />
        </span>
        <span aria-hidden className="scan-line" />
        {(state === "admitted" || state === "used") && (
          <span key={state} aria-hidden className="scan-stamp">
            {state === "used" ? "Already scanned 👀" : "Admitted ✓"}
          </span>
        )}
      </button>
      <p className="type-caption text-on-dark-muted">No. {String(ticket).padStart(6, "0")}</p>
      <p className="scan-hint">{played ? "Now try your phone camera" : "Tap or scan me"}</p>
      <span className="sr-only" aria-live="polite">
        {state === "admitted" ? `Ticket ${ticket} admitted` : state === "used" ? "Already scanned" : ""}
      </span>
    </>
  );
}
