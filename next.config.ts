import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Allow longer server actions for audit processing
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  // Allow images from external sources (screenshots)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
