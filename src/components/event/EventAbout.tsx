import { Link01Icon, Navigation03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { EventDetail } from "@/lib/event";
import { AffiliateInvite } from "./AffiliateInvite";

/** About, location and (for events open to affiliates) the affiliate invite: the long-form half of the event page. */
export function EventAbout({ event }: { event: EventDetail }) {
  const place = event.location;
  const address = place ? [place.venue, place.address, place.city, place.state].filter(Boolean).join(", ") : "";

  return (
    <div className="event-about">
      {(event.description || event.communityLink) && (
        <section aria-labelledby="about-title">
          <h2 id="about-title" className="type-heading">
            About this event
          </h2>
          {event.description && <p className="mt-4 text-lead whitespace-pre-line text-muted">{event.description}</p>}
          {event.communityLink && (
            <a href={event.communityLink} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 link">
              <HugeiconsIcon icon={Link01Icon} strokeWidth={2} className="icon" aria-hidden />
              Join the community
            </a>
          )}
        </section>
      )}

      {place && (
        <section aria-labelledby="where-title" className="rule-top pt-10">
          <h2 id="where-title" className="type-heading">
            Where it&apos;s happening
          </h2>
          <p className="mt-4 text-lead text-muted">{address}</p>
          <div className="event-map">
            <iframe
              title={`Map of ${place.venue || place.city}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 link"
          >
            <HugeiconsIcon icon={Navigation03Icon} strokeWidth={2} className="icon" aria-hidden />
            Get directions
          </a>
        </section>
      )}

      {event.openToAffiliates && <AffiliateInvite />}
    </div>
  );
}
