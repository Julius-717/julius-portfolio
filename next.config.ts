import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Disable Turbopack for production builds
    if (!isServer) {
      config.target = 'serverless';
    }
    return config;
  },
};

export default nextConfig;
