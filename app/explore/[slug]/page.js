import { notFound } from 'next/navigation';
import { seoSilos } from '@/app/data/seo-silos';
import Link from 'next/link';
import { cms } from '@/app/services/cms';
import dynamic from 'next/dynamic';
import { generateUniqueContent, generateDeterministicRecentDate, generateDeterministicRating } from '@/app/services/seoContentEngine';

const ConfigurationsGrid = dynamic(() => import('@/app/components/ui/ConfigurationsGrid'), {
  loading: () => <div className="h-96 bg-[#050914] animate-pulse rounded-xl border border-white/5 mx-auto max-w-7xl"></div>
});
import { preload } from 'react-dom';

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

  const title = `${matchedKeyword}`;
  const description = `Discover ${matchedKeyword}. ${matchedSilo.description} Explore ultimate luxury, premium amenities, and Maximum Livable Area philosophy with VTP Realty.`;
  const url = `https://vtpbluewaters.com/explore/${params.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'VTP Blue Waters',
      locale: 'en_IN',
      type: 'article',
      publishedTime: generateDeterministicRecentDate(params.slug + '-published'),
      modifiedTime: generateDeterministicRecentDate(params.slug),
      authors: ['https://vtpbluewaters.com'],
      images: [
        {
          url: 'https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg',
          width: 1200,
          height: 630,
          alt: `${matchedKeyword} - VTP Blue Waters Pune`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@VTPRealty',
      title,
      description,
      images: ['https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg'],
    },
    robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
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
  const projects = await cms.getAllProjects();
  
  // LCP Preload Hero Image for Core Web Vitals Rank #1 Boost
  preload('https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg', { as: 'image' });
  
  // Dynamic Content Generation
  const dynamicMarketIntelligence = generateUniqueContent(params.slug, matchedKeyword, matchedSilo.id);
  const dynamicDateModified = generateDeterministicRecentDate(params.slug);
  const dynamicRating = generateDeterministicRating(params.slug);

  // Dynamic FAQs generated based on keyword
  const faqs = [
    {
      question: `What makes ${matchedKeyword} a premium choice?`,
      answer: `Our ${matchedKeyword} offerings are designed with VTP Realty's signature Maximum Livable Area (MLA) philosophy, ensuring zero space wastage, ultra-luxury fittings, and world-class township amenities.`
    },
    {
      question: `Is ${matchedKeyword} a good investment?`,
      answer: `Yes, investing in ${matchedKeyword} provides excellent ROI due to the strategic location in Pune's fastest-growing IT and lifestyle corridors, backed by VTP Realty's unparalleled brand equity.`
    },
    {
      question: `What amenities are included with ${matchedKeyword}?`,
      answer: `Residents enjoy access to multi-acre central parks, premium clubhouses, smart home automation features, and state-of-the-art security, all integral to the VTP Blue Waters township experience.`
    }
  ];

  return (
    <div className="min-h-screen bg-[#050914] text-white pt-24">
      {/* Advanced Knowledge Graph Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": `${currentUrl}#webpage`,
                "url": currentUrl,
                "name": matchedKeyword,
                "description": matchedSilo.description,
                "datePublished": "2023-01-01T08:00:00+08:00",
                "dateModified": dynamicDateModified,
                "publisher": { "@id": "https://vtpbluewaters.com/#organization" },
                "isPartOf": { "@id": "https://vtpbluewaters.com/#website" }
              },
              {
                "@type": "Organization",
                "@id": "https://vtpbluewaters.com/#organization",
                "name": "VTP Realty",
                "url": "https://vtpbluewaters.com",
                "logo": "https://vtpbluewaters.com/icon.svg"
              },
              {
                "@type": "RealEstateListing",
                "@id": `${currentUrl}#listing`,
                "name": matchedKeyword,
                "description": matchedSilo.description,
                "url": currentUrl,
                "provider": { "@id": "https://vtpbluewaters.com/#organization" },
                "mainEntityOfPage": { "@id": `${currentUrl}#webpage` }
              },
              {
                "@type": "Product",
                "@id": `${currentUrl}#product`,
                "name": matchedKeyword,
                "description": matchedSilo.description,
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": dynamicRating.rating,
                  "reviewCount": dynamicRating.reviews
                },
                "mainEntityOfPage": { "@id": `${currentUrl}#webpage` }
              },
              {
                "@type": "LocalBusiness",
                "@id": `${currentUrl}#localbusiness`,
                "name": `${matchedKeyword} - VTP Realty`,
                "image": "https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg",
                "telephone": "+91-7744009295",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "VTP Blue Waters Township, Mahalunge",
                  "addressLocality": "Pune",
                  "addressRegion": "Maharashtra",
                  "postalCode": "411045",
                  "addressCountry": "IN"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "18.5837",
                  "longitude": "73.7703"
                },
                "url": currentUrl,
                "priceRange": "₹₹₹₹"
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${currentUrl}#breadcrumb`,
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
              },
              {
                "@type": "FAQPage",
                "@id": `${currentUrl}#faq`,
                "mainEntity": faqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                  }
                }))
              }
            ]
          })
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl py-12 text-center">
        
        {/* Breadcrumb UI */}
        <div className="flex items-center justify-center gap-2 text-xs text-luxury-silver/60 uppercase tracking-widest mb-6">
          <Link href="/" className="hover:text-luxury-gold transition-colors">Home</Link>
          <span>/</span>
          <span className="text-luxury-gold">{matchedSilo.title}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-heading text-luxury-gold mb-6 uppercase tracking-wider max-w-4xl mx-auto">
          {matchedKeyword}
        </h1>
        <p className="text-lg text-luxury-silver leading-relaxed mb-8 max-w-4xl mx-auto">
          {matchedSilo.description} If you are looking to explore <strong>{matchedKeyword.toLowerCase()}</strong>, VTP Realty offers unmatched premium living spaces designed with the Maximum Livable Area philosophy.
        </p>

        {/* Table of Contents (SERP Jump-to Sitelinks Target) */}
        <div className="mb-12 p-6 border border-white/10 bg-white/5 rounded-xl max-w-3xl mx-auto text-left">
          <h2 className="text-lg text-luxury-gold uppercase tracking-widest mb-4 font-bold">On This Page</h2>
          <nav>
            <ul className="flex flex-col md:flex-row md:flex-wrap gap-4 text-sm text-luxury-silver">
              <li><a href="#market-intelligence" className="hover:text-white transition-colors underline decoration-luxury-gold/30 underline-offset-4">Market Intelligence</a></li>
              <li><a href="#configurations" className="hover:text-white transition-colors underline decoration-luxury-gold/30 underline-offset-4">Floor Plans & Pricing</a></li>
              <li><a href="#semantic-cluster" className="hover:text-white transition-colors underline decoration-luxury-gold/30 underline-offset-4">Related Configurations</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors underline decoration-luxury-gold/30 underline-offset-4">Frequently Asked Questions</a></li>
            </ul>
          </nav>
        </div>
        
        {/* Market Intelligence Block - Highly Dynamic Spintax */}
        <div id="market-intelligence" className="mb-16 p-8 border border-luxury-gold/20 bg-luxury-gold/5 rounded-xl text-left max-w-4xl mx-auto scroll-mt-24">
          <h2 className="text-2xl text-luxury-gold mb-4">{matchedKeyword} - Real Estate Market Intelligence</h2>
          <p className="text-luxury-silver leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: dynamicMarketIntelligence }} />
        </div>

        {/* Dynamic Project Injection with TF-IDF Heading */}
        <div id="configurations" className="mb-16 -mx-6 md:mx-0 scroll-mt-24">
          <h2 className="sr-only">Floor Plans & Pricing for {matchedKeyword}</h2>
          <ConfigurationsGrid projects={projects} />
        </div>

        {/* Internal PageRank Sculpting: Semantic Cluster Links (Same Silo) */}
        <div id="semantic-cluster" className="p-8 border border-white/10 bg-white/5 rounded-xl text-left mb-10 max-w-4xl mx-auto scroll-mt-24">
          <h2 className="text-2xl text-luxury-white mb-4">Explore Related Properties in {matchedSilo.title}</h2>
          <p className="text-luxury-silver mb-6 text-sm">Discover specific floor plans and price points closely related to {matchedKeyword}:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchedSilo.slugs
              .filter(s => s.slug !== params.slug)
              .slice(0, 6) // Grab 6 closely related keywords from the same silo to trap PageRank
              .map((related, i) => (
              <li key={`cluster-${i}`}>
                <Link href={`/explore/${related.slug}`} prefetch={false} className="text-luxury-gold hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="text-luxury-gold/50 group-hover:text-luxury-gold transition-colors">→</span>
                  {related.keyword}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Dynamic FAQ Section */}
        <div id="faq" className="mb-16 text-left max-w-4xl mx-auto scroll-mt-24">
          <h2 className="text-3xl text-luxury-white font-heading mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={`faq-${idx}`} className="p-6 border border-white/10 bg-white/5 rounded-xl">
                <h3 className="text-xl text-luxury-gold mb-2">{faq.question}</h3>
                <p className="text-luxury-silver text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Dynamic Cross-Silo Spiderweb Linking */}
        <div className="mb-16 p-8 border border-white/10 bg-white/5 rounded-xl text-left max-w-4xl mx-auto">
          <h2 className="text-2xl text-luxury-white mb-4">Discover More Pune Real Estate Corridors</h2>
          <p className="text-luxury-silver mb-6 text-sm">Explore our extensive portfolio of luxury properties across Pune's most premium locations:</p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {seoSilos
              .filter(s => s.id !== matchedSilo.id)
              .map(s => s.slugs[0]) // Get the highest priority keyword from every other silo
              .slice(0, 15) // Limit to top 15 to avoid massive DOM footprint
              .map((related, i) => (
                <li key={`cross-${i}`}>
                  <Link href={`/explore/${related.slug}`} prefetch={false} className="text-luxury-silver hover:text-luxury-gold transition-colors text-xs font-light">
                    {related.keyword}
                  </Link>
                </li>
            ))}
          </ul>
        </div>

        {/* Legal Disclaimer Footer - Required for YMYL Google Compliance */}
        <div className="mt-16 pt-8 border-t border-white/10 text-xs text-luxury-silver/60 text-left max-w-4xl mx-auto">
          <p>
            <strong>Disclaimer:</strong> The information provided on this page regarding <em>{matchedKeyword}</em> is intended for general informational purposes only and does not constitute financial, investment, or legal advice. Real estate values are subject to market fluctuations. VTP Realty (MahaRERA Reg. No. available on maharera.mahaonline.gov.in) reserves the right to modify project specifications, amenities, and pricing without prior notice. Please consult with our official sales representatives for the most accurate and up-to-date information before making any investment decisions.
          </p>
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
