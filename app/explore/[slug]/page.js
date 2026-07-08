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

      <div className="container mx-auto px-6 max-w-4xl py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-heading text-luxury-gold mb-6 uppercase tracking-wider">
          {matchedKeyword}
        </h1>
        <p className="text-lg text-luxury-silver leading-relaxed mb-10">
          {matchedSilo.description} If you are looking to explore <strong>{matchedKeyword.toLowerCase()}</strong>, VTP Realty offers unmatched premium living spaces designed with the Maximum Livable Area philosophy.
        </p>
        
        {/* Market Intelligence Block - Crucial for "Helpful Content Update" compliance */}
        <div className="mb-10 p-8 border border-luxury-gold/20 bg-luxury-gold/5 rounded-xl text-left">
          <h2 className="text-2xl text-luxury-gold mb-4">Pune Real Estate Market Intelligence</h2>
          <p className="text-luxury-silver leading-relaxed text-sm">
            Pune's western corridor, particularly regions surrounding Mahalunge, Hinjewadi, and Baner, are witnessing unprecedented infrastructural growth. Investing in <strong>{matchedKeyword}</strong> positions you at the epicenter of this boom. VTP Realty's properties consistently demonstrate capital appreciation well above the market average, making them highly sought-after by HNIs and NRI investors. Our commitment to transparent pricing and flawless execution ensures that your investment in {matchedKeyword} is both secure and highly lucrative over the long term.
          </p>
        </div>

        <div className="p-8 border border-white/10 bg-white/5 rounded-xl text-left mb-10">
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

        {/* Dynamic FAQ Section */}
        <div className="mb-10 text-left">
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
        <div className="mb-10 p-8 border border-white/10 bg-white/5 rounded-xl text-left">
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

        {/* Legal Disclaimer Footer - Required for YMYL Google Compliance */}
        <div className="mt-16 pt-8 border-t border-white/10 text-xs text-luxury-silver/60 text-left">
          <p>
            <strong>Disclaimer:</strong> The information provided on this page regarding <em>{matchedKeyword}</em> is intended for general informational purposes only and does not constitute financial, investment, or legal advice. Real estate values are subject to market fluctuations. VTP Realty (MahaRERA Reg. No. available on maharera.mahaonline.gov.in) reserves the right to modify project specifications, amenities, and pricing without prior notice. Please consult with our official sales representatives for the most accurate and up-to-date information before making any investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
}

