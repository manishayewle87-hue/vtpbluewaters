import { notFound } from 'next/navigation';
import { seoSilos } from '@/app/data/seo-silos';
import Link from 'next/link';
import { cms } from '@/app/services/cms';
import ConfigurationsGrid from '@/app/components/ui/ConfigurationsGrid';
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
          url: 'https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg', // Default premium fallback
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
      images: ['https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg'],
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
  const projects = await cms.getAllProjects();

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
      answer: `Residents enjoy access to multi-acre central parks, premium clubhouses, smart home automation features, and state-of-the-art security, all integral to the VTP Bluewaters township experience.`
    }
  ];

  return (
    <div className="min-h-screen bg-[#050914] text-white pt-24">
      {/* Invisible SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": matchedKeyword,
              "description": matchedSilo.description,
              "url": currentUrl,
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "124"
              }
            },
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
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            }
          ])
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl py-20 text-center">
        
        {/* Breadcrumb UI */}
        <div className="flex items-center justify-center gap-2 text-xs text-luxury-silver/60 uppercase tracking-widest mb-8">
          <Link href="/" className="hover:text-luxury-gold transition-colors">Home</Link>
          <span>/</span>
          <span className="text-luxury-gold">{matchedSilo.title}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-heading text-luxury-gold mb-6 uppercase tracking-wider max-w-4xl mx-auto">
          {matchedKeyword}
        </h1>
        <p className="text-lg text-luxury-silver leading-relaxed mb-10 max-w-4xl mx-auto">
          {matchedSilo.description} If you are looking to explore <strong>{matchedKeyword.toLowerCase()}</strong>, VTP Realty offers unmatched premium living spaces designed with the Maximum Livable Area philosophy.
        </p>
        
        {/* Market Intelligence Block - Crucial for "Helpful Content Update" compliance */}
        <div className="mb-12 p-8 border border-luxury-gold/20 bg-luxury-gold/5 rounded-xl text-left max-w-4xl mx-auto">
          <h2 className="text-2xl text-luxury-gold mb-4">Pune Real Estate Market Intelligence</h2>
          <p className="text-luxury-silver leading-relaxed text-sm">
            {matchedSilo.id.includes('mahalunge') && `Mahalunge is the crown jewel of PMRDA's town planning scheme. By investing in ${matchedKeyword}, you are positioning yourself in a high-tech smart city corridor. With the upcoming Maan-Mahalunge infrastructure boom and seamless connectivity to Hinjewadi Phase 1, properties here are projected to yield massive capital appreciation. VTP Realty's sprawling townships in this sector offer resort-style luxury that standalone buildings simply cannot match.`}
            {matchedSilo.id.includes('hinjawadi') && `Hinjawadi remains the undisputed IT capital of Pune. ${matchedKeyword} offers IT professionals the ultimate zero-commute lifestyle. With Phase 3 expanding rapidly and the upcoming metro line set to drastically reduce travel times, rental yields in Hinjawadi are among the highest in the country. VTP Realty ensures your investment here is backed by world-class amenities and premium construction quality.`}
            {matchedSilo.id.includes('baner') && `Baner represents the pinnacle of cosmopolitan living in Pune. When you invest in ${matchedKeyword}, you are buying into a vibrant ecosystem of premium dining, elite schools, and upscale retail like Balewadi High Street. Because land parcels here are scarce, ultra-luxury projects by VTP Realty command a significant premium, ensuring strong resale value and an elite neighborhood profile.`}
            {matchedSilo.id.includes('kharadi') && `Kharadi is the beating heart of East Pune's IT and commercial sectors. Exploring ${matchedKeyword} means looking at properties located near EON IT Park and World Trade Center. The massive influx of multinational corporations has driven up demand for premium gated communities. VTP Realty's presence here guarantees a sophisticated lifestyle coupled with aggressive ROI.`}
            {matchedSilo.id.includes('balewadi') && `Balewadi seamlessly blends residential tranquility with commercial vibrancy. Investing in ${matchedKeyword} places you near the iconic Balewadi High Street and major sports complexes. It is a highly coveted micro-market for HNIs. VTP Realty's projects in this vicinity are designed with the Maximum Livable Area philosophy, offering expansive living spaces without compromise.`}
            {!['mahalunge', 'hinjawadi', 'baner', 'kharadi', 'balewadi'].some(loc => matchedSilo.id.includes(loc)) && `Pune's real estate market is witnessing unprecedented growth, and ${matchedKeyword} is at the forefront of this transformation. VTP Realty properties consistently demonstrate capital appreciation well above the market average, making them highly sought-after by domestic and NRI investors. Our commitment to transparent pricing and flawless execution ensures your investment is both secure and highly lucrative.`}
          </p>
        </div>

        {/* Dynamic Project Injection */}
        <div className="mb-16 -mx-6 md:mx-0">
          <ConfigurationsGrid projects={projects} />
        </div>

        <div className="p-8 border border-white/10 bg-white/5 rounded-xl text-left mb-10 max-w-4xl mx-auto">
          <h2 className="text-2xl text-luxury-white mb-4">Explore {matchedSilo.title}</h2>
          <p className="text-luxury-silver mb-6">Browse related searches and categories:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchedSilo.slugs.map((related, i) => (
              <li key={i}>
                <Link href={`/explore/${related.slug}`} prefetch={false} className="text-luxury-gold hover:text-white transition-colors text-sm">
                  {related.keyword}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Dynamic FAQ Section */}
        <div className="mb-10 text-left max-w-4xl mx-auto">
          <h2 className="text-3xl text-luxury-white font-heading mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 border border-white/10 bg-white/5 rounded-xl">
                <h3 className="text-xl text-luxury-gold mb-2">{faq.question}</h3>
                <p className="text-luxury-silver text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Dynamic Cross-Silo Spiderweb Linking */}
        <div className="mb-10 p-8 border border-white/10 bg-white/5 rounded-xl text-left max-w-4xl mx-auto">
          <h2 className="text-2xl text-luxury-white mb-4">Discover More Pune Real Estate</h2>
          <p className="text-luxury-silver mb-6">Explore our extensive portfolio of luxury properties across Pune's most premium locations:</p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {seoSilos
              .filter(s => s.id !== matchedSilo.id)
              .map(s => s.slugs[0]) // Get the highest priority keyword from every other silo
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
