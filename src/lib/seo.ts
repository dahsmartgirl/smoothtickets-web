import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/contact";
import { APP_URL } from "@/lib/events";


/**
 * Title, description, canonical, Open Graph and Twitter for one page, kept in agreement.
 * A page-level openGraph replaces the layout's instead of merging, so every page gets the full set.
 * The preview image comes from the route's own opengraph-image.tsx (template in lib/og.tsx); X reads it too.
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  // The layout's title template doesn't reach og:title, so add the brand here (the homepage title already has it).
  const social = path === "/" ? title : `${title} | Smooth Tickets`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Smooth Tickets",
      locale: "en_NG",
      title: social,
      description,
      url: path,
    },
    twitter: { card: "summary_large_image", title: social, description },
  };
}

/** The site's one Organization, referenced by @id from other pages' structured data. */
export const ORG_ID = `${APP_URL}/#organization`;

/**
 * Organization + WebSite on every page (root layout), so search and answer engines get one consistent entity:
 * who runs Smooth Tickets, how to reach them and where they are on social. Only facts the site shows.
 */
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Smooth Tickets",
      url: APP_URL,
      logo: `${APP_URL}/logo.svg`,
      email: CONTACT_EMAIL,
      description:
        "Smooth Tickets is an online event ticketing platform for African organisers. Create events, sell individual and group tickets, manage attendees, track earnings, check guests in with QR codes, and grow sales through affiliates.",
      areaServed: { "@type": "Country", name: "Nigeria" },
      sameAs: ["https://x.com/SmoothBallot", "https://www.linkedin.com/company/smooth-ballot/"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: CONTACT_EMAIL,
        telephone: "+2349025100530",
        availableLanguage: "English",
      },
      parentOrganization: { "@type": "Organization", name: "Smooth Africa", url: "https://smooth.africa" },
    },
    {
      "@type": "WebSite",
      "@id": `${APP_URL}/#website`,
      name: "Smooth Tickets",
      url: APP_URL,
      inLanguage: "en-NG",
      publisher: { "@id": ORG_ID },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${APP_URL}/discovery?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};
