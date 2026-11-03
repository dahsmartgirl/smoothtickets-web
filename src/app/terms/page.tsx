import type { Metadata, Viewport } from "next";
import { type LegalSection, LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";

// Older iOS Safari tints its status bar from this; the page opens on a navy header.
export const viewport: Viewport = { themeColor: "#050b1f" };

export const metadata: Metadata = pageMetadata({ title: "Terms of Service", description: "The terms for using Smooth Tickets as an event organiser, ticket buyer or affiliate, including fees, payouts, refunds and cancellations.", path: "/terms" });

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Introduction and acceptance",
    body: [
      "These Terms of Service (the **\"Terms\"**) govern your access to and use of Smooth Tickets, the event ticketing platform available at tickets.smooth.africa and through any related applications, tools and services (together, the **\"Platform\"**), operated by **Smooth Africa**, a business based in the Federal Republic of Nigeria (**\"Smooth\"**, **\"we\"**, **\"us\"** or **\"our\"**).",
      "By creating an Account, publishing an Event, purchasing or holding a Ticket, participating in the Affiliate Programme or otherwise using the Platform, you confirm that you have read, understood and agree to be bound by these Terms and by our Privacy Policy, which is incorporated into these Terms by reference. **If you do not agree to these Terms, you must not use the Platform.**",
      "You agree that your acceptance of these Terms by electronic means, including by clicking a button or completing a purchase, constitutes a valid and binding agreement between you and Smooth.",
      "If you use the Platform on behalf of a company, partnership or other organisation, you represent and warrant that you are authorised to bind that organisation to these Terms, and references to \"you\" include that organisation.",
    ],
  },
  {
    id: "definitions",
    title: "Definitions",
    body: [
      "In these Terms, unless the context requires otherwise:",
      "- **\"Account\"** means a registered Organiser or Affiliate account on the Platform;",
      "- **\"Affiliate\"** means a User who promotes Events through a unique referral link in exchange for Commission;",
      "- **\"Attendee\"** means any person who purchases a Ticket (a **\"Buyer\"**) or is named as the holder of a Ticket;",
      "- **\"Commission\"** means the amount payable to an Affiliate for a qualifying Ticket sale, as set by the Organiser;",
      "- **\"Event\"** means any event, experience or activity listed on the Platform;",
      "- **\"Organiser\"** means a User who creates, lists or manages an Event and sells Tickets for it through the Platform;",
      "- **\"Service Fee\"** means the fee charged by Smooth on each paid Ticket, displayed to the Buyer before payment;",
      "- **\"Ticket\"** means a ticket, pass or other right of admission to an Event issued through the Platform, including its unique QR code; and",
      "- **\"User\"** means any person who accesses or uses the Platform in any capacity.",
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility and accounts",
    body: [
      "To register an Account, you must be **at least eighteen (18) years of age** and have the legal capacity to enter into a binding contract. By using the Platform, you represent and warrant that you meet these requirements.",
      "A person under eighteen (18) years of age may purchase or hold a Ticket only with the consent and under the supervision of a parent or legal guardian, who accepts these Terms on that person's behalf and is responsible for their use of the Platform. Organisers remain responsible for enforcing any age restrictions that apply to their Events.",
      "You must provide accurate, current and complete information when registering or making a purchase, and keep it up to date. You are responsible for maintaining the confidentiality of your login credentials and **for all activity that occurs under your Account**. You must notify us immediately at " + CONTACT_EMAIL + " if you suspect any unauthorised access to or use of your Account.",
    ],
  },
  {
    id: "platform",
    title: "Nature of the Platform",
    body: [
      "Smooth provides a technology platform that enables Organisers to list Events, sell Tickets, issue discount codes, engage Affiliates, receive payouts and manage admission. **Smooth is not the organiser, promoter, owner or operator of any Event**, unless expressly stated otherwise on the relevant Event page.",
      "Each Ticket is sold by the Organiser of the relevant Event. The contract for admission to an Event is formed **directly between the Organiser and the Attendee**, and Smooth is not a party to that contract. In collecting payment for Tickets, Smooth acts solely as the Organiser's limited agent for the purpose of receiving and remitting funds.",
      "The Organiser is solely responsible for its Event, including its content, line-up, venue, timing, safety, security, accessibility, licensing, admission policies and the conduct of its staff and contractors. Smooth does not endorse any Event and makes no representation regarding the quality, legality or safety of any Event.",
    ],
  },
  {
    id: "organisers",
    title: "Obligations of Organisers",
    body: [
      "As an Organiser, you represent, warrant and undertake that:",
      "- (a) all information in your Event listings, including dates, times, venue, prices, Ticket descriptions and any restrictions, is **accurate, complete and not misleading**, and will be promptly updated if it changes;",
      "- (b) you hold, and will maintain, all licences, permits, approvals, insurance and consents required to hold the Event and sell Tickets for it;",
      "- (c) you own or are licensed to use all names, trade marks, images, music and other content in your Event listings, and their use on the Platform does not infringe the rights of any third party;",
      "- (d) you will **honour every valid Ticket** sold through the Platform and deliver the Event substantially as described;",
      "- (e) you will promptly notify Attendees of any material change to, postponement of or cancellation of the Event; and",
      "- (f) you will comply with all applicable laws and regulations, including consumer protection, data protection, health and safety and tax laws.",
      "Personal data of Attendees made available to you through the Platform may be used **only for the purpose of administering and communicating about the relevant Event**, and in accordance with the Nigeria Data Protection Act 2023 and any other applicable data protection law. You are independently responsible, as a data controller, for your processing of such personal data.",
      "You are solely responsible for determining, collecting, reporting and remitting **any taxes** applicable to your Ticket sales and Event.",
    ],
  },
  {
    id: "tickets",
    title: "Tickets and admission",
    body: [
      "A Ticket constitutes a **revocable licence** granting the named holder admission to the relevant Event, subject to the Organiser's terms and admission policies, including age restrictions, dress codes, security checks and the Organiser's right to refuse admission or eject any person.",
      "Each Ticket bears a unique QR code that **may be validated only once**. The first presentation of a valid code will be accepted and any subsequent presentation will be rejected. You are responsible for keeping your Ticket secure, and Smooth shall not be liable where a Ticket is lost, copied, shared or used by another person.",
      "You are responsible for reviewing your order before completing payment. Smooth is not responsible for Tickets obtained from any source other than the Platform or an official Platform link, and such Tickets may be cancelled without refund.",
    ],
  },
  {
    id: "fees",
    title: "Fees, payments and payouts",
    body: [
      "Organisers determine the face value of their Tickets. Smooth charges a **Service Fee** on each paid Ticket, which is displayed separately on the Event page and included in the total shown to the Buyer **before payment is made**. No Service Fee is charged on free Tickets. Smooth may revise its Service Fee from time to time; any revision will not affect orders already completed.",
      "Payments are processed by our third-party payment provider, **Paystack**. By making a payment, you also agree to Paystack's applicable terms. Smooth does not store full card details.",
      "Ticket proceeds due to Organisers, and Commission due to Affiliates, are paid **automatically** to the bank account registered on the relevant Account. You are responsible for ensuring that your bank details are accurate, and Smooth shall have no liability for funds remitted to incorrect details supplied by you.",
      "Smooth reserves the right to **delay, withhold or set off** any payout, or to recover amounts previously paid out, where we reasonably suspect fraud or a breach of these Terms, where a payment is disputed, reversed or charged back, where an Event is cancelled, or where required by law or a competent authority.",
    ],
  },
  {
    id: "refunds",
    title: "Refunds, cancellations and chargebacks",
    body: [
      "**All Ticket sales are final**, save where the Organiser elects to offer a refund, the Event is cancelled, or a refund is required by applicable law. Refund requests should be directed to the Organiser in the first instance.",
      "Where an Event is **cancelled**, the Organiser is responsible for refunding the face value of affected Tickets to Attendees. Where an Event is **postponed or rescheduled**, Tickets remain valid for the new date unless the Organiser offers refunds. Where Smooth continues to hold the proceeds of a Ticket sale, we may, at our discretion, process refunds to Attendees on the Organiser's behalf.",
      "**The Service Fee is non-refundable**, except where a refund of it is required by applicable law.",
      "Organisers are liable for all refunds, chargebacks, payment reversals and associated costs arising from their Events, and Smooth may deduct such amounts from any sums payable to the Organiser.",
    ],
  },
  {
    id: "discounts",
    title: "Discount codes",
    body: [
      "Organisers may create discount codes applicable to selected Ticket types and may amend or withdraw them at any time. Discount codes have **no cash value**, are not transferable for value, and cannot be used after they expire or are exhausted.",
    ],
  },
  {
    id: "affiliates",
    title: "Affiliate Programme",
    body: [
      "Affiliates may promote Events using a unique referral link. **The Commission for each Ticket type is determined by the Organiser.** A sale qualifies for Commission where the Buyer accesses the Event through the Affiliate's referral link and completes a purchase **within thirty (30) days on the same device and browser**. Where a Buyer has used more than one referral link, the most recent link prevails.",
      "Commission is paid automatically. Smooth may withhold, reverse or recover Commission on any sale that is refunded, disputed, charged back, fraudulent or otherwise made in breach of these Terms.",
      "Affiliates must promote Events honestly and in compliance with all applicable advertising and consumer protection laws. Affiliates **must not**:",
      "- (a) make any statement about an Event that is false, misleading or not authorised by the Organiser;",
      "- (b) send unsolicited bulk messages (spam) or promote Events in any unlawful manner;",
      "- (c) purchase Tickets through their own referral link, or induce others to do so, for the purpose of earning Commission; or",
      "- (d) use fake accounts, bots or any automated or deceptive means to generate visits, clicks or sales.",
      "Affiliates act as **independent contractors** and not as employees, agents or partners of Smooth or of any Organiser, and are responsible for any taxes on Commission received. Organisers may remove an Affiliate from their Events, and Smooth may suspend or terminate an Affiliate's participation, at any time.",
    ],
  },
  {
    id: "conduct",
    title: "Prohibited conduct",
    body: [
      "You must not use the Platform to:",
      "- (a) list any fictitious, fraudulent, misleading or unlawful Event;",
      "- (b) sell Tickets you are not authorised to sell, or copy, counterfeit or alter any Ticket;",
      "- (c) resell Tickets for commercial gain, except as expressly permitted by the Organiser;",
      "- (d) use another person's personal data or payment instrument without authorisation;",
      "- (e) interfere with, disrupt or attempt to gain unauthorised access to the Platform or its systems;",
      "- (f) scrape, harvest or extract data from the Platform by automated means; or",
      "- (g) engage in any conduct that is unlawful or that infringes the rights of any person.",
    ],
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: [
      "Organisers retain ownership of the content they upload to the Platform (**\"User Content\"**). You grant Smooth a **non-exclusive, worldwide, royalty-free licence** to host, reproduce, adapt, display and distribute your User Content for the purposes of operating, providing and promoting the Platform and your Event, including on our discovery pages and social media channels, for so long as the content remains on the Platform and for a reasonable period thereafter.",
      "The Platform, including the Smooth Tickets name, logos, software, design and content (excluding User Content), is owned by or licensed to Smooth and protected by intellectual property laws. Except for sharing links to Events, you may not use, copy or reproduce any of it without our prior written consent.",
    ],
  },
  {
    id: "third-party",
    title: "Third-party services",
    body: [
      "The Platform relies on and may link to services provided by third parties, including payment processors. Smooth does not control and is not responsible for any third-party service, and your use of it may be subject to that third party's own terms.",
    ],
  },
  {
    id: "termination",
    title: "Suspension and termination",
    body: [
      "You may stop using the Platform at any time. Smooth may, with or without notice, **remove any Event or content, suspend payouts, or suspend or terminate any Account** where we reasonably believe that you have breached these Terms or applicable law, or that your use of the Platform poses a risk to Users, third parties or Smooth. Where practicable, we will notify you of the reason.",
      "Termination does not affect any rights or obligations that accrued before termination. In particular, an Organiser remains responsible for all Events for which Tickets have been sold, and for any refunds and chargebacks relating to them.",
    ],
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    body: [
      "The Platform is provided on an **\"as is\" and \"as available\" basis**. To the fullest extent permitted by law, Smooth excludes all warranties, conditions and representations, whether express or implied, including as to merchantability, fitness for a particular purpose and non-infringement, and does not warrant that the Platform will be uninterrupted, secure or error-free.",
      "Smooth is not responsible for any Event, including its cancellation, postponement, alteration or quality, or for any act or omission of an Organiser, Affiliate or Attendee.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, Smooth shall not be liable for any **indirect, incidental, special or consequential loss**, or for any loss of profits, revenue, business, goodwill or data, or for travel, accommodation or other incidental expenses, howsoever arising.",
      "To the fullest extent permitted by law, Smooth's **total aggregate liability** to you arising out of or in connection with these Terms or the Platform shall not exceed the total Service Fees received by Smooth from you in the twelve (12) months preceding the event giving rise to the claim.",
      "Nothing in these Terms excludes or limits any liability that cannot be excluded or limited under applicable law, including your rights under the Federal Competition and Consumer Protection Act 2018.",
    ],
  },
  {
    id: "indemnity",
    title: "Indemnity",
    body: [
      "You agree to **indemnify and hold harmless** Smooth and its directors, officers, employees and agents from and against all claims, liabilities, losses, damages, costs and expenses (including reasonable legal fees) arising out of or in connection with your breach of these Terms, your violation of any law or third-party right, your User Content, or, where you are an Organiser, your Event.",
    ],
  },
  {
    id: "force-majeure",
    title: "Force majeure",
    body: [
      "Smooth shall not be liable for any failure or delay in performing its obligations caused by events beyond its reasonable control, including acts of God, epidemics, civil unrest, government action, failure of telecommunications, banking or payment networks, power outages or cyber-attacks.",
    ],
  },
  {
    id: "law",
    title: "Governing law and disputes",
    body: [
      "These Terms and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with **the laws of the Federal Republic of Nigeria**.",
      `Before commencing any proceedings, you agree to notify us of the dispute in writing at ${CONTACT_EMAIL}, and the parties shall attempt in good faith to resolve it amicably **within thirty (30) days** of that notice. If the dispute is not resolved within that period, either party may refer it to the courts of competent jurisdiction in Nigeria, which shall have exclusive jurisdiction.`,
    ],
  },
  {
    id: "general",
    title: "General",
    body: [
      "**Changes.** We may amend these Terms from time to time. The amended Terms take effect when published on this page, as indicated by the \"Last updated\" date. Where changes are material, we will give reasonable notice by email or through the Platform. Your continued use of the Platform after the changes take effect constitutes acceptance of them.",
      "**Entire agreement.** These Terms, together with the Privacy Policy, constitute the entire agreement between you and Smooth regarding the Platform and supersede any prior understanding.",
      "**Severability.** If any provision of these Terms is held to be invalid or unenforceable, that provision shall be limited to the minimum extent necessary and the remaining provisions shall continue in full force and effect.",
      "**No waiver.** No failure or delay by Smooth in exercising any right shall operate as a waiver of that right.",
      "**Assignment.** You may not assign or transfer your rights or obligations under these Terms without our prior written consent. Smooth may assign its rights and obligations to an affiliate or successor in connection with a merger, acquisition or sale of assets.",
      "**Survival.** Provisions which by their nature are intended to survive termination, including those relating to fees, refunds, intellectual property, disclaimers, limitation of liability, indemnity and governing law, shall survive.",
      `**Notices.** Notices to Smooth must be sent to ${CONTACT_EMAIL}. We may give notices to you by email to the address associated with your Account or order, or through the Platform.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="These Terms govern your use of Smooth Tickets as an organiser, ticket buyer, ticket holder or affiliate. Please read them carefully."
      updated="3 November 2026"
      sections={sections}
    />
  );
}
