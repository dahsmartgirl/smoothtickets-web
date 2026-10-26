import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/FinalCta";
import { Nav } from "@/components/Nav";
import { Arrow } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/events";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn't exist on Smooth Tickets.",
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
};

export default function NotFound() {
  return (
    <>
      <Nav overHero={false} />
      <main className="mx-auto max-w-copy px-page pt-40 pb-28 text-center sm:pt-48">
        <h1 className="type-display-caps">
          This page <span className="text-brand">isn&apos;t here.</span>
        </h1>
        <p className="mt-6 text-lead text-muted">
          The link may be mistyped, or the event may have ended or been removed. Find what&apos;s on now, or create your own event.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <a href={`${APP_URL}/discovery`}>
              Explore Events <Arrow />
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              Back to home
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
