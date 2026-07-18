/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gzip/Brotli compress all responses — immediate Core Web Vitals boost
  compress: true,

  // Strict production optimizations
  productionBrowserSourceMaps: false,
  poweredByHeader: false,

  images: {
    loader: 'custom',
    loaderFile: './app/cloudflareLoader.js',
    remotePatterns: [
      { protocol: 'https', hostname: 'vtprealty.in' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'vtpbluewaters.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache for images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@react-three/drei',
      '@react-three/fiber',
      'three',
      'gsap',
      'lenis',
    ],
  },

  // Security + Performance Headers
  async headers() {
    return [
      // Long-lived immutable cache for all static assets
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Long cache for media assets
      {
        source: '/assets/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Security headers for all routes
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://www.clarity.ms; connect-src 'self' https://www.google-analytics.com https://stats.g.doubleclick.net https://w.clarity.ms https://a.clarity.ms; img-src 'self' data: https: blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; frame-src 'self' https://www.google.com/recaptcha/;",
          },
          // Preconnect hints via headers for max LCP speed
          { key: 'Link', value: '<https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect; crossorigin, <https://www.googletagmanager.com>; rel=preconnect' },
        ],
      },
    ];
  },
};

export default nextConfig;
