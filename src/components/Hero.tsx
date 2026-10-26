import Image from "next/image";
import { APP_URL } from "@/lib/events";
import { Arrow } from "./brand";
import { Button } from "@/components/ui/button";

/**
 * Optional background clip, e.g. "/videos/hero.mp4" in public/. Keep it short (8–15s loop),
 * muted, and under ~3 MB. When null, the party photo shows.
 */
const HERO_VIDEO: string | null = null;

export function Hero() {
  return (
    <section className="hero">
      <Image src="/images/hero-party.jpg" alt="" fill priority sizes="100vw" className="hero-media" />
      {HERO_VIDEO && (
        // Reduced-motion users keep the still photo underneath.
        <video
          className="hero-media motion-reduce:hidden"
          src={HERO_VIDEO}
          poster="/images/hero-party.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
      )}
      <div className="hero-scrim" />

      <div className="container-page">
        <h1 className="hero-title type-display">
          <span>Create your event.</span>
          <span>Sell more tickets.</span>
          <span>
            Make it <span className="text-brand">happen.</span>
          </span>
        </h1>
        <p className="mt-7 max-w-copy text-subtext text-on-dark-muted">
          Smooth Tickets is an online event ticketing platform for African organisers. Create events, sell individual and group
          tickets, manage attendees, track earnings, and grow sales through affiliates. All in one place.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button asChild>
            <a href={`${APP_URL}/auth/signup`}>
              Create an Event <Arrow />
            </a>
          </Button>
          <Button asChild variant="glass">
            <a href={`${APP_URL}/discovery`}>Explore Events</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
