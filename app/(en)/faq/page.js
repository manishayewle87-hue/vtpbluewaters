import contentData from '@/app/data/content-hub.json';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Frequently Asked Questions | VTP Bluewaters Mahalunge',
  description: 'Comprehensive FAQs for VTP Bluewaters, Baner Annex. Find answers regarding pricing, amenities, connectivity, and MahaRERA details.',
};

export default function FAQPage() {
  const lang = 'en';
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": contentData.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-luxury-navy pt-16 lg:pt-32 pb-12 lg:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-luxury-gold hover:text-white transition-colors mb-12 text-sm uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to Township
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-display font-light text-luxury-white mb-6">
          Frequently Asked <span className="text-luxury-gold italic">Questions</span>
        </h1>
        <p className="text-luxury-silver font-light text-lg mb-16 leading-relaxed">
          Everything you need to know about investing and living at VTP Bluewaters, Mahalunge.
        </p>

        <div className="space-y-8">
          {contentData.faqs.map((faq, index) => (
            <div key={index} className="border border-white/10 bg-[#050914] p-8 rounded-sm hover:border-luxury-gold/30 transition-colors">
              <h3 className="text-xl font-display text-luxury-white mb-4 leading-snug">{faq.question}</h3>
              <p className="text-luxury-silver font-light leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
