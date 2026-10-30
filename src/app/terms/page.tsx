import type { Metadata, Viewport } from "next";
import { type LegalSection, LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

// Older iOS Safari tints its status bar from this; the page opens on a navy header.
export const viewport: Viewport = { themeColor: "#050b1f" };

// Placeholder copy: kept out of search results until the final terms replace it. Then drop `robots`.
export const metadata: Metadata = {
  ...pageMetadata({ title: "Terms of Service", description: "The terms for using Smooth Tickets as an organiser, buyer or affiliate.", path: "/terms" }),
  robots: { index: false, follow: true },
};

// PLACEHOLDER: replace every [bracketed] line with the final terms.
const sections: LegalSection[] = [
  { id: "agreement", title: "Agreeing to these terms", body: ["[Who these terms apply to and how using Smooth Tickets means accepting them.]"] },
  { id: "accounts", title: "Accounts", body: ["[Eligibility, keeping login details safe, accurate information.]"] },
  { id: "organisers", title: "For organisers", body: ["[Responsibility for events, accurate listings, delivering what was sold, attendee data.]"] },
  { id: "buyers", title: "For ticket buyers", body: ["[Ticket validity, QR codes, transfers, entry at the organiser's discretion.]"] },
  { id: "fees", title: "Fees and payouts", body: ["[The service fee shown at checkout, automatic payouts to organisers, payout timing and any holds.]"] },
  { id: "refunds", title: "Refunds and cancellations", body: ["[Who handles refunds, what happens when an event is cancelled or postponed.]"] },
  { id: "affiliates", title: "Affiliates", body: ["[Commission set by organisers, how referrals are tracked, payouts, prohibited promotion.]"] },
  { id: "use", title: "Acceptable use", body: ["[No fraudulent events, ticket touting, misuse of the platform or other people's data.]"] },
  { id: "liability", title: "Liability", body: ["[Limits of Smooth Tickets' liability; organisers are responsible for their events.]"] },
  { id: "changes", title: "Changes and governing law", body: ["[How these terms change, and that the laws of Nigeria apply.]"] },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="[One-line summary: the rules for using Smooth Tickets.]"
      updated="[Date]"
      sections={sections}
    />
  );
}
