import type { Metadata } from "next";

const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Smooth Tickets: create your event, sell more tickets, make it happen.",
};

/**
 * Title, description, canonical, Open Graph and Twitter for one page, kept in agreement.
 * A page-level openGraph replaces the layout's instead of merging, so every page gets the full set.
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
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: social, description, images: [ogImage] },
  };
}
