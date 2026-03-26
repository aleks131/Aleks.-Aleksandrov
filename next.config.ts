import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // This helps with the hydration mismatch issue
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  // Suppress TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Suppress ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000,
    domains: [],
  },
  // Production optimizations
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
