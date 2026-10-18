import type { MetadataRoute } from "next";
import { APP_URL } from "@/lib/events";

export default function robots(): MetadataRoute.Robots {
  return {
    // Signed-in areas have nothing for search engines; everything public stays crawlable.
    rules: { userAgent: "*", allow: "/", disallow: ["/dashboard", "/affiliate/dashboard"] },
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
