import Image from "next/image";
import Link from "next/link";
import { APP_URL } from "@/lib/events";
import { Arrow } from "./brand";
import { HeroVideo } from "./HeroVideo";
import { TypeWords } from "./TypeWords";
import { Button } from "@/components/ui/button";

/** "Make it ___": the hero types through these. The first is what loads and what screen readers hear. */
const HAPPEN = ["happen.", "smooth.", "pop.", "lit.", "sell out."];

export function Hero() {
  return (
    <section className="hero">
      <Image src="/images/hero-party.jpg" alt="" fill priority sizes="100vw" className="hero-media" />
      <HeroVideo />
      <div className="hero-scrim" />

      <div className="container-page">
        <h1 className="hero-title type-display">
          <span>Create your event.</span>
          <span>Sell more tickets.</span>
          <span>
            Make it <TypeWords words={HAPPEN} className="text-brand" />
          </span>
        </h1>
        <p className="mt-7 max-w-copy text-lead text-on-dark-muted">
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
            <Link href="/discovery">Explore Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
