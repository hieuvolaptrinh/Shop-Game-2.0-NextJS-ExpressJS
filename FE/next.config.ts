import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // React Compiler (experimental)
  reactCompiler: true,

  // Experimental features
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['@tanstack/react-query', 'date-fns'],
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  // Build output
  output: 'standalone',

  // Production source maps
  productionBrowserSourceMaps: false,

  // Compression
  compress: true,

  // Powered by header
  poweredByHeader: false,

  // Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/home',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
