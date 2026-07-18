import contentData from '@/app/data/content-hub.json';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'FAQs — VTP Blue Waters Mahalunge | Luxury Flats Pune',
  description: 'Comprehensive FAQs about VTP Blue Waters township in Mahalunge, Pune. Get answers on pricing, floor plans, amenities, MahaRERA registration, home loans, and NRI investment.',
  alternates: { canonical: 'https://vtpbluewaters.com/faq' },
  openGraph: {
    title: 'FAQs — VTP Blue Waters Mahalunge | Luxury Flats Pune',
    description: 'All your questions answered about VTP Blue Waters Mahalunge. Pricing, floor plans, RERA, amenities, and NRI investment guide.',
    url: 'https://vtpbluewaters.com/faq',
    siteName: 'VTP Blue Waters',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: 'https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg', width: 1200, height: 630, alt: 'VTP Blue Waters FAQ' }],
  },
  twitter: { card: 'summary_large_image', title: 'VTP Blue Waters FAQ', description: 'All your questions answered about VTP Blue Waters Mahalunge luxury township.', images: ['https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg'] },
  robots: { index: true, follow: true, 'max-snippet': -1 },
};

const VTP_PROJECTS = [
  { name: 'VTP Earth 1', slug: 'vtp-earth-one-mahalunge-pune', location: 'Mahalunge' },
  { name: 'VTP Monarque', slug: 'vtp-monarque-hinjawadi-pune', location: 'Hinjawadi' },
  { name: 'VTP Volare', slug: 'vtp-volare-hinjawadi-pune', location: 'Hinjawadi' },
  { name: 'VTP Altamira', slug: 'vtp-altamira-kharadi-pune', location: 'Kharadi' },
  { name: 'VTP Flamante', slug: 'vtp-flamante-kharadi-pune', location: 'Kharadi' },
  { name: 'VTP Velvet Villas', slug: 'vtp-velvet-villas-kharadi-pune', location: 'Kharadi' },
  { name: 'VTP Cielo', slug: 'vtp-cielo-bavdhan-pune', location: 'Bavdhan' },
  { name: 'VTP Aurelia', slug: 'vtp-aurelia-kharadi-pune', location: 'Kharadi' },
];

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": "https://vtpbluewaters.com/faq#faqpage",
        "name": "VTP Blue Waters Frequently Asked Questions",
        "url": "https://vtpbluewaters.com/faq",
        "dateModified": new Date().toISOString().split('T')[0],
        "publisher": { "@id": "https://vtpbluewaters.com/#organization" },
        "mainEntity": contentData.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://vtpbluewaters.com" },
          { "@type": "ListItem", "position": 2, "name": "FAQ", "item": "https://vtpbluewaters.com/faq" }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-luxury-navy pt-16 lg:pt-32 pb-12 lg:pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-luxury-gold hover:text-white transition-colors mb-12 text-sm uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to Township
        </Link>

        <h1 className="text-4xl md:text-6xl font-display font-light text-luxury-white mb-6">
          Frequently Asked <span className="text-luxury-gold italic">Questions</span>
        </h1>
        <p className="text-luxury-silver font-light text-lg mb-16 leading-relaxed">
          Everything you need to know about investing and living at VTP Blue Waters — Pune&apos;s most prestigious 200+ acre luxury township in Mahalunge.
        </p>

        {/* FAQ Items */}
        <div className="space-y-8 mb-20">
          {contentData.faqs.map((faq, index) => (
            <div key={index} className="border border-white/10 bg-[#050914] p-8 rounded-sm hover:border-luxury-gold/30 transition-colors">
              <h2 className="text-xl font-display text-luxury-white mb-4 leading-snug">{faq.question}</h2>
              <p className="text-luxury-silver font-light leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Internal Links to All VTP Projects — PageRank Distribution */}
        <div className="border-t border-white/10 pt-16">
          <h2 className="text-sm font-bold tracking-[0.3em] text-luxury-gold uppercase mb-3">Explore Projects</h2>
          <h3 className="text-2xl font-display text-white mb-8">All VTP Realty Projects in Pune</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {VTP_PROJECTS.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group p-4 border border-white/10 rounded-xl hover:border-luxury-gold/40 hover:bg-luxury-gold/5 transition-all duration-300"
              >
                <p className="text-xs text-luxury-gold uppercase tracking-widest mb-1">{project.location}</p>
                <p className="text-sm text-white font-medium group-hover:text-luxury-gold transition-colors">{project.name}</p>
              </Link>
            ))}
          </div>

          {/* Internal Links to Key Location Pages */}
          <h3 className="text-lg font-display text-white mb-4">Premium Locations in Pune</h3>
          <div className="flex flex-wrap gap-3">
            {['mahalunge', 'hinjawadi', 'baner-sus', 'kharadi', 'bavdhan'].map((loc) => (
              <Link
                key={loc}
                href={`/locations/${loc}`}
                className="text-sm text-luxury-silver hover:text-luxury-gold border border-white/10 hover:border-luxury-gold/30 px-4 py-2 rounded-full transition-all"
              >
                {loc.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


