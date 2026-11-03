import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Footer } from "@/components/FinalCta";
import { Nav } from "@/components/Nav";
import { ArrowOut } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/events";

// Older iOS Safari tints its status bar from this; the page opens on a navy header.
export const viewport: Viewport = { themeColor: "#050b1f" };

// The easter egg's prize: only reachable by scanning the QR on the final CTA (ScanTicket). Kept out of search.
export const metadata: Metadata = {
  title: "You found the golden ticket",
  description: "A little secret for the curious few who scanned the QR code on Smooth Tickets.",
  alternates: { canonical: null },
  robots: { index: false, follow: false },
};

export default function GoldenTicketPage() {
  return (
    <>
      <Nav />
      <main data-dark-top className="overflow-x-clip">
        <section aria-labelledby="golden-title" className="page-head text-center">
          <div className="container-page intro">
            <p className="badge badge-lg">Easter egg unlocked</p>
            <h1 id="golden-title" className="mt-5 type-display">
              You found the golden ticket.
            </h1>
            <p className="mx-auto mt-5 max-w-copy text-lead text-on-dark-muted">
              Most people scroll right past that QR code. You scanned it. That kind of curiosity makes great organisers.
            </p>
          </div>
        </section>

        <section aria-label="Your golden ticket" data-stagger className="container-page section">
          <div className="stub stub-gold">
            <div className="stub-top">
              <p className="type-overline">Golden ticket</p>
              <p className="mt-2 type-heading">Admit one: you</p>
            </div>
            <div aria-hidden className="perf-x" />
            <dl className="stub-lines">
              <div>
                <dt>Found by</dt>
                <dd>The curious few</dd>
              </div>
              <div>
                <dt>Spotted</dt>
                <dd>Final CTA, bottom right</dd>
              </div>
              <div className="rule-top pt-4 type-heading">
                <dt>Status</dt>
                <dd>Legend</dd>
              </div>
            </dl>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <a href={`${APP_URL}/auth/signup`} target="_blank" rel="noopener">
                Create an Event <ArrowOut />
              </a>
            </Button>
            <Button asChild variant="line">
              <Link href="/discovery">Explore Events</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
