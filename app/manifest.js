export default function manifest() {
  return {
    name: 'VTP Bluewaters | Premium Luxury Residences',
    short_name: 'VTP Bluewaters',
    description: 'Experience ultra-luxury living at VTP Bluewaters Pune.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A111F',
    theme_color: '#D4AF37',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
