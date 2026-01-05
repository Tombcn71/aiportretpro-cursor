/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sdbooth2-production.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'www.aiheadshots.nl',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Disable legacy polyfills for modern browsers only
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Remove polyfills for modern browsers
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
  async redirects() {
    return [
      {
        source: '/linkedin-profielfoto',
        destination: '/linkedin-foto-laten-maken',
        permanent: true, // 301 redirect
      },
      {
        source: '/pricing',
        has: [
          {
            type: 'query',
            key: 'source',
          },
        ],
        destination: '/pricing',
        permanent: false, // Keep query params but don't index separately
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
