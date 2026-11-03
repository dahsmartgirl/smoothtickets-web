import type { Metadata, Viewport } from "next";
import { type LegalSection, LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";

// Older iOS Safari tints its status bar from this; the page opens on a navy header.
export const viewport: Viewport = { themeColor: "#050b1f" };

export const metadata: Metadata = pageMetadata({ title: "Privacy Policy", description: "How Smooth Tickets collects, uses, shares and protects personal data of organisers, ticket buyers and affiliates under the Nigeria Data Protection Act 2023.", path: "/privacy" });

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction and scope",
    body: [
      "This Privacy Policy explains how **Smooth Africa** (**\"Smooth\"**, **\"we\"**, **\"us\"** or **\"our\"**) collects, uses, discloses and protects personal data in connection with Smooth Tickets, the event ticketing platform available at tickets.smooth.africa and through any related applications and services (the **\"Platform\"**).",
      "This Policy applies to all persons whose personal data we process through the Platform, including event organisers (**\"Organisers\"**), ticket purchasers (**\"Buyers\"**), persons named as ticket holders (**\"Ticket Holders\"**), affiliates (**\"Affiliates\"**) and visitors to the Platform. It should be read together with our Terms of Service.",
      "We process personal data in accordance with the **Nigeria Data Protection Act 2023** (the **\"NDPA\"**), any regulations and directives issued under it by the Nigeria Data Protection Commission (the **\"NDPC\"**), and other applicable data protection laws.",
    ],
  },
  {
    id: "controller",
    title: "Data controller",
    body: [
      `Smooth Africa is the **data controller** responsible for personal data processed through the Platform, except as described in clause 2.2. Enquiries about this Policy or our processing of your personal data may be directed to ${CONTACT_EMAIL}.`,
      "Where an Organiser receives Attendee personal data through the Platform and uses it for its own purposes in connection with its Event, **the Organiser acts as an independent data controller** and is responsible for its own compliance with applicable data protection law.",
    ],
  },
  {
    id: "collect",
    title: "Personal data we collect",
    body: [
      "We collect the following categories of personal data:",
      "- (a) **Organiser data:** name, email address, telephone number and login credentials; Event details, Ticket types, prices and images; and bank account details for the purpose of payouts;",
      "- (b) **Buyer data:** first and last name, email address and telephone number; details of Tickets purchased and any discount code applied; and transaction records, including amount, payment reference and status;",
      "- (c) **Ticket Holder data:** the name and email address provided by a Buyer for each person named on a Ticket;",
      "- (d) **Affiliate data:** name, username, email address, telephone number and login credentials; the Events promoted and sales attributed to the Affiliate's referral links; and bank account details for the purpose of Commission payouts;",
      "- (e) **Technical and usage data:** IP address, browser and device type, pages viewed and similar information collected automatically when you use the Platform; and a **device identifier** generated when you access an Event through an Affiliate's referral link (see clause 8); and",
      "- (f) **Admission data:** a record of when a Ticket is validated at an Event.",
      "We collect personal data **directly from you**, **from Buyers** in respect of Ticket Holders, **automatically** through your use of the Platform, and **from our payment provider** in respect of the status of transactions.",
    ],
  },
  {
    id: "use",
    title: "Purposes and lawful bases",
    body: [
      "We process personal data only where we have a lawful basis to do so under the NDPA. We rely on the following lawful bases for the following purposes:",
      "- (a) **Performance of a contract:** to create and administer Accounts; to publish Events; to process orders and payments; to issue and deliver Tickets and receipts; to validate Tickets at admission; and to pay Organisers and Affiliates;",
      "- (b) **Legitimate interests:** to attribute sales to Affiliates; to detect and prevent fraud, abuse and security incidents; to provide customer support; and to analyse and improve the Platform, provided that such interests are not overridden by your rights and freedoms;",
      "- (c) **Compliance with a legal obligation:** to maintain financial and tax records, to respond to lawful requests from public authorities, and to comply with applicable law; and",
      "- (d) **Consent:** to send marketing communications where consent is required by law. You may withdraw your consent at any time, without affecting the lawfulness of processing carried out before withdrawal.",
      "We will send you service communications relating to your Account, orders and Events. These are necessary for the provision of the Platform and are not marketing communications.",
    ],
  },
  {
    id: "payments",
    title: "Payment information",
    body: [
      "Payments on the Platform are processed by our third-party payment provider, **Paystack**. Card and bank details are entered directly on Paystack's secure payment pages. **Smooth does not collect or store full card numbers or card security codes.** Paystack processes payment data in accordance with its own privacy policy and applicable payment card industry standards.",
    ],
  },
  {
    id: "disclosure",
    title: "Disclosure of personal data",
    body: [
      "We disclose personal data only as described in this Policy, namely to:",
      "- (a) **Organisers:** the names, email addresses and telephone numbers of Buyers and Ticket Holders for the relevant Event, to enable the Organiser to administer attendance, admit Attendees and communicate about the Event;",
      "- (b) **Affiliates:** aggregated information about the sales and Commission attributed to their referral links;",
      "- (c) **Service providers:** third parties who process personal data on our behalf, including payment processing, hosting, data storage and email delivery providers, under written terms requiring them to process it only on our instructions and to keep it secure;",
      "- (d) **Public authorities and legal process:** law enforcement, regulators, courts or other parties, where required by law or where reasonably necessary to establish, exercise or defend legal claims or to protect the rights, property or safety of Smooth, our Users or the public; and",
      "- (e) **Successors:** a prospective or actual purchaser or successor in connection with a merger, acquisition, restructuring or sale of all or part of our business, subject to equivalent confidentiality and data protection obligations.",
      "**We do not sell personal data.**",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and affiliate attribution",
    body: [
      "The Platform uses cookies and similar technologies that are **strictly necessary** for its operation, including to maintain your session, remember your preferences and protect the Platform.",
      "When you access an Event through an Affiliate's referral link, we generate an identifier from characteristics of your browser and device and store it in a cookie named **\"fingerprint\"** for **thirty (30) days**. This identifier is used solely to attribute any resulting Ticket purchase to the referring Affiliate and to prevent fraud. **It is not used for advertising or cross-site tracking.**",
      "You may block or delete cookies through your browser settings. Doing so may affect the functionality of the Platform, including sign-in and Affiliate attribution.",
    ],
  },
  {
    id: "third-party-data",
    title: "Personal data of other persons",
    body: [
      "Where you provide the personal data of another person, for example by naming them as a Ticket Holder, you confirm that you are authorised to do so and that you have informed them of the disclosure of their personal data to Smooth and to the relevant Organiser in accordance with this Policy.",
    ],
  },
  {
    id: "transfers",
    title: "International transfers",
    body: [
      "Some of our service providers may process personal data outside Nigeria. Where personal data is transferred outside Nigeria, we will ensure that the transfer complies with the NDPA, including by relying on an adequacy decision of the NDPC, appropriate contractual safeguards or another lawful transfer mechanism.",
    ],
  },
  {
    id: "retention",
    title: "Retention",
    body: [
      "We retain personal data **only for as long as is necessary** for the purposes for which it was collected, including to satisfy legal, accounting, tax and reporting requirements.",
      "Account data is retained for as long as the Account remains active. Upon closure of an Account, we will delete or anonymise the associated personal data within a reasonable period, save where continued retention is required by law or for the establishment, exercise or defence of legal claims.",
      "Transaction, payout and Commission records are retained for the period required by applicable financial and tax laws. Ticket records remain available to the relevant Organiser after the Event for the purpose of reconciling attendance and sales.",
    ],
  },
  {
    id: "security",
    title: "Security and breach notification",
    body: [
      "We implement appropriate **technical and organisational measures** to protect personal data against unauthorised access, loss, alteration or disclosure, including encryption in transit, access controls and the use of a regulated payment provider. No method of transmission or storage is entirely secure, and we cannot guarantee absolute security.",
      "In the event of a personal data breach that is likely to result in a risk to the rights and freedoms of data subjects, we will notify the NDPC **within seventy-two (72) hours** of becoming aware of it, and will notify affected data subjects without undue delay where the breach is likely to result in a high risk to them, in each case as required by the NDPA.",
    ],
  },
  {
    id: "rights",
    title: "Your rights",
    body: [
      "Subject to the conditions and exceptions in the NDPA, you have the right to:",
      "- (a) be informed about and obtain **access** to the personal data we hold about you;",
      "- (b) request the **rectification** of inaccurate or incomplete personal data;",
      "- (c) request the **erasure** of your personal data;",
      "- (d) request the **restriction** of processing of your personal data;",
      "- (e) **object** to processing based on our legitimate interests, and to processing for direct marketing at any time;",
      "- (f) receive your personal data in a structured, commonly used and machine-readable format (**data portability**); and",
      "- (g) **withdraw your consent** at any time, where processing is based on consent.",
      `To exercise any of these rights, please contact us at **${CONTACT_EMAIL}**. We may need to verify your identity before responding. We will respond within the period prescribed by applicable law.`,
      "If you are dissatisfied with our response, you have the right to lodge a complaint with the **Nigeria Data Protection Commission** (ndpc.gov.ng).",
    ],
  },
  {
    id: "automated",
    title: "Automated decision-making",
    body: [
      "We do not make decisions about you based solely on automated processing that produce legal effects concerning you or similarly significantly affect you.",
    ],
  },
  {
    id: "children",
    title: "Children",
    body: [
      "Accounts are available only to persons aged **eighteen (18) years or older**. A person under eighteen (18) may purchase or hold a Ticket only with the consent and under the supervision of a parent or legal guardian. We do not knowingly collect personal data from children without such consent. If you believe that we have done so, please contact us and we will take steps to delete it.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this Policy",
    body: [
      "We may update this Policy from time to time. The updated Policy takes effect when published on this page, as indicated by the \"Last updated\" date. Where changes are material, we will give reasonable notice by email or through the Platform before they take effect.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="How Smooth Africa collects, uses, discloses and protects personal data on Smooth Tickets, and the rights available to you."
      updated="3 November 2026"
      sections={sections}
    />
  );
}
