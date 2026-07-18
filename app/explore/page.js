import Link from 'next/link';
import { seoSilos } from '@/app/data/seo-silos';

export const metadata = {
  title: 'Explore Properties | VTP Blue Waters Real Estate Hub',
  description: 'Browse our complete directory of luxury real estate, apartments, flats, and investment opportunities across Pune. 10,000+ property pages covering every micro-market.',
  alternates: { canonical: 'https://vtpbluewaters.com/explore' },
  openGraph: {
    title: 'Explore Properties | VTP Blue Waters Real Estate Hub',
    description: 'Browse 10,000+ luxury real estate listings across every Pune micro-market — 2 BHK, 3 BHK, 4 BHK, Duplex & Penthouse apartments by VTP Realty.',
    url: 'https://vtpbluewaters.com/explore',
    siteName: 'VTP Blue Waters',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: 'https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg', width: 1200, height: 630, alt: 'VTP Blue Waters Property Directory Pune' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@VTPRealty',
    title: 'Explore Properties | VTP Blue Waters Real Estate Hub',
    description: '10,000+ luxury real estate listings across every Pune micro-market by VTP Realty.',
    images: ['https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg'],
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
};

const directorySchema = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  '@id': 'https://vtpbluewaters.com/explore#dataset',
  name: 'VTP Blue Waters — Pune Luxury Real Estate Directory',
  description: 'A comprehensive programmatic directory of 10,000+ luxury real estate listings by VTP Realty across all Pune micro-markets, categorized by location, configuration, and buyer intent.',
  url: 'https://vtpbluewaters.com/explore',
  publisher: { '@id': 'https://vtpbluewaters.com/#organization' },
  inLanguage: 'en-IN',
  license: 'https://vtpbluewaters.com/terms-of-use',
  isAccessibleForFree: true,
  keywords: 'luxury apartments Pune, 2 BHK Mahalunge, 3 BHK Hinjewadi, 4 BHK Kharadi, duplex Pune, VTP Realty projects',
  spatialCoverage: {
    '@type': 'Place',
    name: 'Pune, Maharashtra, India',
    geo: { '@type': 'GeoCoordinates', latitude: 18.5204, longitude: 73.8567 },
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://vtpbluewaters.com' },
      { '@type': 'ListItem', position: 2, name: 'Property Explorer', item: 'https://vtpbluewaters.com/explore' },
    ],
  },
};

export default function ExploreHubPage() {
  return (
    <div className="min-h-screen bg-[#050914] pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(directorySchema) }} />

      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-luxury-gold/5 blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-900/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-light text-white mb-6">
            Real Estate <span className="text-luxury-gold font-normal">Directory</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-inter">
            Browse our comprehensive index of real estate opportunities, categorized by location and property type.
          </p>
        </div>

        <div className="space-y-16">
          {seoSilos.map((silo, idx) => (
            <div key={silo.id} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-outfit text-luxury-gold mb-2">{silo.title}</h2>
              <p className="text-gray-400 text-sm mb-6 border-b border-white/10 pb-4">{silo.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {silo.slugs.map((item) => (
                  <Link 
                    key={item.slug} 
                    href={`/explore/${item.slug}`}
                    prefetch={false}
                    className="text-gray-300 hover:text-white hover:underline text-sm font-inter flex items-center gap-2 group transition-colors"
                  >
                    <span className="w-1 h-1 rounded-full bg-luxury-gold/50 group-hover:bg-luxury-gold transition-colors" />
                    {item.keyword}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
