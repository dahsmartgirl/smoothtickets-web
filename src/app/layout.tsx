import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import localFont from "next/font/local";
import { APP_URL } from "@/lib/events";
import { pageMetadata } from "@/lib/seo";
import { StaggerObserver } from "@/components/Stagger";
import "./globals.css";

// Official unhinted Inter, so it renders the same on every OS.
const inter = localFont({
  src: "./fonts/InterVariable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
});


const title = "Smooth Tickets | Create Events & Sell Tickets Online in Nigeria";
const description =
  "Create events, sell tickets online, manage attendees, track revenue, and grow ticket sales with affiliates on Smooth Tickets.";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
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
      lang="en"
      className={`${inter.variable} ${unbounded.variable}`}
    >
      <body>
        {children}
        <StaggerObserver />
      </body>
    </html>
  );
}
