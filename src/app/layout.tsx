import type { Metadata } from "next";
import { Instrument_Serif, Unbounded } from "next/font/google";
import localFont from "next/font/local";
import { APP_URL } from "@/lib/events";
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

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const title = "Smooth Tickets | Create Events & Sell Tickets Online in Nigeria";
const description =
  "Create events, sell tickets online, manage attendees, track revenue, and grow ticket sales with affiliates on Smooth Tickets.";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: { default: title, template: "%s | Smooth Tickets" },
  description,
  applicationName: "Smooth Tickets",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Smooth Tickets",
    title,
    description,
    url: "/",
    locale: "en_NG",
  },
  twitter: { card: "summary_large_image", title, description },
  icons: { icon: "/logo.svg" },
};

// Runs before paint so a saved dark preference never flashes light.
const themeScript = `try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Font variables go on <html>: Tailwind resolves --font-sans at the root, so on <body> Inter never applied.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${unbounded.variable} ${instrument.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
