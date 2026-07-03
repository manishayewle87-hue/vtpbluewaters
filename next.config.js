/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './app/cloudflareLoader.js',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vtprealty.in',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // NOTE: Security headers are enforced at the Cloudflare edge via public/_headers
  // since output: 'export' does not support Next.js headers() at runtime.
};

export default nextConfig;
