import { notFound } from 'next/navigation';
import { seoSilos } from '@/app/data/seo-silos';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  let matchedKeyword = '';
  let matchedSilo = null;

  for (const silo of seoSilos) {
    const found = silo.slugs.find(s => s.slug === params.slug);
    if (found) {
      matchedKeyword = found.keyword;
      matchedSilo = silo;
      break;
    }
  }

  if (!matchedKeyword) return {};

  const title = `${matchedKeyword} | VTP Realty | Pune Premium Properties`;
  const description = `Discover ${matchedKeyword}. ${matchedSilo.description} Explore ultimate luxury, premium amenities, and Maximum Livable Area philosophy with VTP Realty.`;
  const url = `https://vtpbluewaters.com/explore/${params.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'VTP Realty',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: 'https://vtpbluewaters.com/images/vtp-bluewaters-hero.jpg', // Default premium fallback
          width: 1200,
          height: 630,
          alt: matchedKeyword,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://vtpbluewaters.com/images/vtp-bluewaters-hero.jpg'],
    },
  };
}

export default async function SeoLandingPage({ params }) {
  let matchedKeyword = '';
  let matchedSilo = null;

  for (const silo of seoSilos) {
    const found = silo.slugs.find(s => s.slug === params.slug);
    if (found) {
      matchedKeyword = found.keyword;
      matchedSilo = silo;
      break;
    }
  }

  if (!matchedKeyword) {
    notFound();
  }

  const currentUrl = `https://vtpbluewaters.com/explore/${params.slug}`;

  return (
    <div className="min-h-screen bg-[#050914] text-white pt-24">
      {/* Invisible SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "RealEstateListing",
              "name": matchedKeyword,
              "description": matchedSilo.description,
              "url": currentUrl,
              "provider": {
                "@type": "Organization",
                "name": "VTP Realty",
                "url": "https://vtpbluewaters.com"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://vtpbluewaters.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Explore",
                  "item": "https://vtpbluewaters.com/explore"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": matchedKeyword,
                  "item": currentUrl
                }
              ]
            }
          ])
        }}
      />

      <div className="container mx-auto px-6 max-w-4xl py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-heading text-luxury-gold mb-6 uppercase tracking-wider">
          {matchedKeyword}
        </h1>
        <p className="text-lg text-luxury-silver leading-relaxed mb-10">
          {matchedSilo.description} If you are looking to explore <strong>{matchedKeyword.toLowerCase()}</strong>, VTP Realty offers unmatched premium living spaces designed with the Maximum Livable Area philosophy.
        </p>
        
        <div className="p-8 border border-white/10 bg-white/5 rounded-xl text-left">
          <h2 className="text-2xl text-luxury-white mb-4">Explore {matchedSilo.title}</h2>
          <p className="text-luxury-silver mb-6">Browse related searches and categories:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchedSilo.slugs.map((related, i) => (
              <li key={i}>
                <Link href={`/explore/${related.slug}`} className="text-luxury-gold hover:text-white transition-colors text-sm">
                  {related.keyword}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Dynamic Cross-Silo Spiderweb Linking */}
        <div className="mt-8 p-8 border border-white/10 bg-white/5 rounded-xl text-left">
          <h2 className="text-2xl text-luxury-white mb-4">Discover More Pune Real Estate</h2>
          <p className="text-luxury-silver mb-6">Explore our extensive portfolio of luxury properties across Pune's most premium locations:</p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {seoSilos
              .filter(s => s.id !== matchedSilo.id)
              .map(s => s.slugs[0]) // Get the highest priority keyword from every other silo
              .map((related, i) => (
                <li key={`cross-${i}`}>
                  <Link href={`/explore/${related.slug}`} className="text-luxury-silver hover:text-luxury-gold transition-colors text-xs font-light">
                    {related.keyword}
                  </Link>
                </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const { seoSilos } = require('@/app/data/seo-silos');
  const slugs = ['virtual-tour', 'gallery', 'masterplan'];
  
  // Inject massive programmatic SEO silos
  seoSilos.forEach(silo => {
    silo.slugs.forEach(s => {
      slugs.push(s.slug);
    });
  });

  const params = [];
  for (const slug of slugs) {
      params.push({ slug });
  }
  return params;
}
