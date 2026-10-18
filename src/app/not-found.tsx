import type { Metadata } from "next";
import { Footer } from "@/components/FinalCta";
import { Nav } from "@/components/Nav";
import { Arrow, Button, Eyebrow } from "@/components/ui";
import { APP_URL } from "@/lib/events";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Nav overHero={false} />
      <main className="mx-auto max-w-2xl px-4 pt-40 pb-28 text-center sm:px-6 sm:pt-48">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-4 font-display text-[clamp(2.2rem,5.5vw,3.6rem)] leading-[0.95] font-black tracking-[-0.03em] uppercase">
          This page <span className="font-serif font-normal tracking-normal normal-case italic text-brand">isn&apos;t here.</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          The link may be mistyped, or the event may have ended or been removed. Find what&apos;s on now, or create your own event.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href={`${APP_URL}/discovery`}>
            Explore Events <Arrow />
          </Button>
          <Button href="/" variant="outline">
            Back to home
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
