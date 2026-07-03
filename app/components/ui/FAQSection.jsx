'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What is VTP Bluewaters Township?",
    answer: "VTP Bluewaters is a 200+ acre premium residential and commercial township located in Mahalunge, West Pune. It is developed by VTP Realty and features multiple luxury clusters like VTP Aethereus, VTP Bel Air, and VTP Leonara."
  },
  {
    question: "Is VTP Bluewaters registered with MahaRERA?",
    answer: "Yes, all individual projects within the VTP Bluewaters township are registered with MahaRERA. The registration numbers are available on the respective project detail pages and the official MahaRERA website."
  },
  {
    question: "What amenities are available at VTP Bluewaters?",
    answer: "The township boasts world-class amenities including Olympic-length infinity pools, 5-star clubhouses, high-street retail, a professional sports academy, zen meditation gardens, and over 50% open green spaces."
  },
  {
    question: "Where is VTP Bluewaters located in Pune?",
    answer: "VTP Bluewaters is strategically located in Mahalunge, seamlessly connecting Hinjawadi Phase 1 with Baner. It offers excellent connectivity to major IT parks, international schools, and the upcoming Metro."
  },
  {
    question: "What configurations are available?",
    answer: "The township offers a wide range of configurations including premium 1, 2, 3, 4, 5, and 6 BHK apartments, as well as ultra-luxury villas and duplexes, catering to diverse lifestyle needs."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  // Generate FAQPage JSON-LD schema
  const faqSchema = {
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
  };

  return (
    <section className="py-20 pb-28 lg:py-32 lg:pb-32 bg-luxury-navy border-t border-luxury-gold/10 relative">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <div className="text-luxury-label text-luxury-gold mb-4">Knowledge Base</div>
          <h2 className="text-display-sm md:text-display-md font-display font-light">
            Frequently Asked <span className="italic text-luxury-silver">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="border border-white/10 bg-white/[0.02] overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <h3 className="text-lg font-light font-display text-luxury-white">
                    {faq.question}
                  </h3>
                  <span className={`text-luxury-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 text-luxury-silver/80 font-light text-editorial leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
