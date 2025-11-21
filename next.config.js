const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Enable standalone output only for Docker builds
  output: process.env.DOCKER_BUILD === 'true' ? 'standalone' : undefined,

  // Optimize production builds
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Experimental performance features
  experimental: {
    // Optimize package imports for better tree shaking
    optimizePackageImports: ['react-icons', 'date-fns', '@reduxjs/toolkit', 'react-redux'],
  },

  images: {
    // Optimize image formats for faster loading
    formats: ['image/avif', 'image/webp'],
    // Optimize device sizes for mobile
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Allow local image proxy API route
    localPatterns: [
      {
        pathname: '/api/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      // News image sources
      {
        protocol: 'https',
        hostname: 'image.cnbcfm.com',
      },
      {
        protocol: 'https',
        hostname: 'media.zenfs.com',
      },
      {
        protocol: 'https',
        hostname: 's.yimg.com',
      },
      {
        protocol: 'https',
        hostname: 'static01.nyt.com',
      },
      {
        protocol: 'https',
        hostname: 'ichef.bbci.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'cdn.cnn.com',
      },
      {
        protocol: 'https',
        hostname: 'cbsnews1.cbsistatic.com',
      },
      {
        protocol: 'https',
        hostname: 'cbsnews2.cbsistatic.com',
      },
      {
        protocol: 'https',
        hostname: 'media.npr.org',
      },
      {
        protocol: 'https',
        hostname: 'a57.foxnews.com',
      },
      {
        protocol: 'https',
        hostname: 'bloximages.newyork1.vip.townnews.com',
      },
      {
        protocol: 'https',
        hostname: 'images.axios.com',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = withBundleAnalyzer(nextConfig);
