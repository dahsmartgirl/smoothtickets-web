import Image from "next/image";
import { APP_URL } from "@/lib/events";
import { HeroPhone } from "./HeroPhone";
import { Arrow } from "./brand";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="torn-bottom grain relative isolate overflow-hidden bg-night pt-38 pb-24 text-white sm:pt-40 sm:pb-28 lg:min-h-[92dvh] lg:pb-36">
      {/* Party photo. Mobile shows the dark top of the shot behind the headline; desktop centers on the crowd. */}
      <Image
        src="/images/hero-party.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[50%_30%] lg:object-[50%_68%]"
      />
      {/* Readability + brand wash */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night/80 via-night/30 to-night/85 lg:bg-gradient-to-r lg:from-night/95 lg:via-night/55 lg:to-night/10" />
      <div className="absolute inset-0 -z-10 bg-brand/25 mix-blend-color" />
      <div className="absolute -right-40 -bottom-40 -z-10 size-[600px] rounded-full bg-brand/35 blur-[120px]" />

      <div className="mx-auto grid max-w-6xl items-center gap-20 px-page lg:grid-cols-[2fr_1fr] lg:gap-10">
        <div>
          <h1 className="font-display text-[clamp(2.1rem,3.5vw,3.2rem)] leading-[1.02] font-black tracking-[-0.03em] uppercase">
            {/* One sentence per line on desktop. */}
            <span className="block lg:whitespace-nowrap">Create your event.</span>
            <span className="block text-brand-soft lg:whitespace-nowrap">Sell more tickets.</span>
            <span className="block lg:whitespace-nowrap">
              Make it <span className="text-flame">happen.</span>
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lead text-white/75">
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
              <a href={`${APP_URL}/discovery`}>
                Explore Events
              </a>
            </Button>
          </div>
        </div>

        {/* Product visual is desktop-only; on phones the headline and CTAs carry the hero. */}
        <div className="hidden lg:block">
          <HeroPhone />
        </div>
      </div>
    </section>
  );
}
