/** @type {import('next').NextConfig} */
const nextConfig = {
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
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@react-three/drei', '@react-three/fiber', 'three'],
  },
  // NOTE: Security headers are enforced at the Cloudflare edge via public/_headers
  // since output: 'export' does not support Next.js headers() at runtime.
};

export default nextConfig;
