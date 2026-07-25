import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: false,
  },
  // Enable strict mode for better React practices
  reactStrictMode: true,
};

export default nextConfig;
