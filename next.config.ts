import type { NextConfig } from "next";

// Base path should include a leading slash but not a trailing slash
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/Aleks.-Aleksandrov';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // This helps with the hydration mismatch issue
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  // Suppress ESLint errors during build
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60,
    domains: [],
    unoptimized: true, // Unoptimized images for static export
  },
  // GitHub Pages configuration
  basePath: basePath,
  assetPrefix: basePath,
  // Add export configuration for static site generation
  output: 'export',
  // Ensure trailing slashes are consistent
  trailingSlash: true,
  // Disable image optimization for static export
  experimental: {
    // Disable image optimization for static export
    images: {
      allowFutureImage: true,
    },
  },
};

export default nextConfig;
