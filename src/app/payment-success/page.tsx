import { CheckmarkCircle02Icon, Mail01Icon, QrCodeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Footer } from "@/components/FinalCta";
import { Nav } from "@/components/Nav";
import { Arrow } from "@/components/brand";
import { Button } from "@/components/ui/button";

// Older iOS Safari tints its status bar from this; the page opens on a navy header.
export const viewport: Viewport = { themeColor: "#050b1f" };

export const metadata: Metadata = {
  title: "Ticket confirmed",
  robots: { index: false, follow: false },
};

/**
 * Where buyers land after checkout: free orders straight away, paid ones once the backend points Paystack's
 * callback_url here. The tickets go out by email from the backend, and Paystack sends its own receipt.
 */
export default function PaymentSuccessPage() {
  return (
    <>
      <Nav />
      <main data-dark-top className="overflow-x-clip">
        <section aria-labelledby="confirm-title" className="page-head text-center">
          <div className="container-page intro">
            <span className="confirm-check">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} aria-hidden />
            </span>
            <h1 id="confirm-title" className="mt-7 type-display">
              You&apos;re <span className="text-brand">in.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-copy text-lead text-on-dark-muted">
              Your tickets are confirmed. We&apos;ve sent them to your email, each with its own QR code.
            </p>
          </div>
        </section>

        <section aria-labelledby="next-title" data-stagger className="container-page section">
          <div className="stub">
            <div className="stub-top">
              <h2 id="next-title" className="type-heading">
                What happens next
              </h2>
            </div>
            <div aria-hidden className="perf-x text-line" />
            <ol className="confirm-steps">
              <li>
                <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
                <div>
                  <h3 className="type-subheading">Check your inbox</h3>
                  <p className="mt-1 text-body text-muted">Your ticket PDF and QR code are in the email you used at checkout. Not there? Look in spam or promotions.</p>
                </div>
              </li>
              <li>
                <HugeiconsIcon icon={QrCodeIcon} strokeWidth={2} className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
                <div>
                  <h3 className="type-subheading">Show your QR code at the door</h3>
                  <p className="mt-1 text-body text-muted">On event day it&apos;s scanned for instant check-in.</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/discovery">
                Browse more events <Arrow />
              </Link>
            </Button>
            <Button asChild variant="line">
              <Link href="/contact">Need help?</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
