import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "storage.smoothballot.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  // The main app's confirmation URL. Anything still pointing there (older links, a Paystack callback) lands on ours.
  async redirects() {
    return [{ source: "/v2/payment-success", destination: "/payment-success", permanent: true }];
  },
  // Social preview images (opengraph-image.tsx) have to stay public for X, WhatsApp and LinkedIn to fetch them,
  // and robots.txt can't block them (X's crawler obeys it). This keeps them out of every search index instead.
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow, noimageindex" }];
    return [
      { source: "/opengraph-image", headers: noindex },
      { source: "/:path*/opengraph-image", headers: noindex },
    ];
  },
};

export default nextConfig;
