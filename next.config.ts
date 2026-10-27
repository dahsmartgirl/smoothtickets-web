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
};

export default nextConfig;
