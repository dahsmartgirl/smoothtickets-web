import { APP_URL } from "@/lib/events";
import { Arrow } from "../brand";
import { Button } from "../ui/button";

/**
 * Shown when the organiser has opened the event to every affiliate (affiliate_access_type "public").
 * Sign-up happens in the main app's affiliate portal; open events are listed in its dashboard to promote.
 */
export function AffiliateInvite() {
  return (
    <section aria-labelledby="earn-title" className="affiliate-invite">
      <p className="badge badge-lg">Smooth Affiliates</p>
      <h2 id="earn-title" className="mt-4 type-heading">
        Earn by sharing this event
      </h2>
      <p className="mt-2 text-lead text-on-dark-muted">
        This event is open to affiliates. Sign up, get your own link, and earn commission on every ticket sold through it.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button asChild>
          <a href={`${APP_URL}/affiliate/auth/signup`}>
            Become an affiliate <Arrow />
          </a>
        </Button>
        <Button asChild variant="glass">
          <a href={`${APP_URL}/affiliate/auth/login`}>I&apos;m already an affiliate</a>
        </Button>
      </div>
    </section>
  );
}
