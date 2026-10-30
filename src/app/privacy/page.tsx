import type { Metadata, Viewport } from "next";
import { type LegalSection, LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

// Older iOS Safari tints its status bar from this; the page opens on a navy header.
export const viewport: Viewport = { themeColor: "#050b1f" };

// Placeholder copy: kept out of search results until the final policy replaces it. Then drop `robots`.
export const metadata: Metadata = {
  ...pageMetadata({ title: "Privacy Policy", description: "How Smooth Tickets collects, uses and protects your information.", path: "/privacy" }),
  robots: { index: false, follow: true },
};

// PLACEHOLDER: replace every [bracketed] line with the final policy.
const sections: LegalSection[] = [
  { id: "collect", title: "Information we collect", body: ["[What organisers, buyers and affiliates give us: names, emails, phone numbers, bank details for payouts.]", "[What we collect automatically: device, browser, pages visited, cookies.]"] },
  { id: "use", title: "How we use it", body: ["[Selling and delivering tickets, paying organisers and affiliates, support, fraud prevention, product updates.]"] },
  { id: "payments", title: "Payments", body: ["[Who processes card payments (e.g. Paystack) and what card data Smooth Tickets does and doesn't store.]"] },
  { id: "sharing", title: "Who we share it with", body: ["[Event organisers (attendee details for their event), payment processors, service providers, legal requests.]"] },
  { id: "cookies", title: "Cookies", body: ["[Which cookies we use, including affiliate referral tracking, and how to control them.]"] },
  { id: "retention", title: "How long we keep it", body: ["[Retention periods for accounts, ticket records and payout records.]"] },
  { id: "rights", title: "Your rights", body: ["[Access, correction, deletion and objection, including rights under the Nigeria Data Protection Act 2023, and how to make a request.]"] },
  { id: "changes", title: "Changes to this policy", body: ["[How we tell you when this policy changes.]"] },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="[One-line summary: what this policy covers and who it applies to.]"
      updated="[Date]"
      sections={sections}
    />
  );
}
