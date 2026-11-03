import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import localFont from "next/font/local";
import { SERVED_URL, pageMetadata, siteJsonLd } from "@/lib/seo";
import { StaggerObserver } from "@/components/Stagger";
import "./globals.css";

// Official unhinted Inter, so it renders the same on every OS. Subset to Latin, punctuation, currency (₦)
// and arrows, with every weight and OpenType feature kept: 344 KB down to 118 KB, on every page.
const inter = localFont({
  src: "./fonts/InterVariable-latin.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["700", "900"], // font-bold and font-black, the only two the site uses
});


const title = "Smooth Tickets | Create Events & Sell Tickets Online in Nigeria";
const description =
  "Create events, sell tickets online, manage attendees, track revenue, and grow ticket sales with affiliates on Smooth Tickets.";

export const metadata: Metadata = {
  // Resolves the preview image URLs; canonicals are absolute on APP_URL (lib/seo.ts).
  metadataBase: new URL(SERVED_URL),
  ...pageMetadata({ title, description, path: "/" }),
  title: { default: title, template: "%s | Smooth Tickets" },
  applicationName: "Smooth Tickets",
  // Icons come from app/icon.svg and app/apple-icon.tsx.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Font variables go on <html>: Tailwind resolves --font-sans at the root, so on <body> Inter never applied.
    <html
      lang="en-NG"
      className={`${inter.variable} ${unbounded.variable}`}
    >
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
        {children}
        <StaggerObserver />
      </body>
    </html>
  );
}
