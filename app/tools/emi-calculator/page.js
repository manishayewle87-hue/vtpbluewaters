import React from 'react';
import Link from 'next/link';
import EmiCalculator from '@/app/components/ui/EmiCalculator';
import FAQSection from '@/app/components/ui/FAQSection';

export const metadata = {
  title: 'Pune Home Loan EMI & Stamp Duty Calculator 2026 | VTP Realty',
  description: 'Calculate monthly EMI, interest amortization, Maharashtra stamp duty (6-7%), and projected rental yields for luxury flats in Pune. Free online home loan calculator.',
  alternates: {
    canonical: 'https://vtpbluewaters.com/tools/emi-calculator'
  },
  openGraph: {
    title: 'Pune Home Loan EMI & Stamp Duty Calculator 2026 | VTP Realty',
    description: 'Calculate monthly EMI, total interest, Maharashtra stamp duty, and rental yields for flats in Hinjewadi, Mahalunge & Kharadi.',
    url: 'https://vtpbluewaters.com/tools/emi-calculator',
    siteName: 'VTP Blue Waters',
    images: [{ url: 'https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg', width: 1200, height: 630, alt: 'VTP Pune EMI Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@VTPRealty',
    title: 'Pune Home Loan EMI & Stamp Duty Calculator 2026 | VTP Realty',
    description: 'Calculate monthly home loan payments, Maharashtra stamp duty, and investment returns for Pune properties.',
    images: ['https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg'],
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
};

export default function EmiCalculatorPage() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://vtpbluewaters.com/tools/emi-calculator#app",
        "name": "Pune Home Loan EMI & Stamp Duty Calculator",
        "url": "https://vtpbluewaters.com/tools/emi-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "featureList": [
          "Real-time Monthly EMI calculation",
          "Maharashtra Stamp Duty & 1% Metro Cess breakdown",
          "Concession calculation for women homebuyers",
          "Gross rental yield and ROI projection",
          "SBI, HDFC, ICICI bank loan comparison"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://vtpbluewaters.com/tools/emi-calculator#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://vtpbluewaters.com" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://vtpbluewaters.com/tools/emi-calculator" },
          { "@type": "ListItem", "position": 3, "name": "EMI & Stamp Duty Calculator", "item": "https://vtpbluewaters.com/tools/emi-calculator" }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://vtpbluewaters.com/tools/emi-calculator#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the current Stamp Duty on property in Pune (Maharashtra)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In Pune, Maharashtra, the standard stamp duty rate is 6% plus a 1% Local Body Tax / Metro Cess, making it 7% for male buyers. For women homebuyers, there is a 1% concession, making the effective rate 6%."
            }
          },
          {
            "@type": "Question",
            "name": "What are the home loan interest rates for VTP Realty projects?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "VTP Realty has pre-approved project ties with major banks including SBI, HDFC, ICICI, and Axis Bank with interest rates starting from 8.35% to 8.75% per annum depending on the applicant's CIBIL score."
            }
          },
          {
            "@type": "Question",
            "name": "How is the monthly EMI calculated for Pune flats?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Monthly EMI is calculated using the reducing balance method based on loan amount, annual interest rate, and repayment tenure in months. Use the interactive calculator above to simulate your exact monthly outflow."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />

      <div className="min-h-screen bg-[#050914] text-white pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-luxury-silver/60 uppercase tracking-widest mb-8">
            <Link href="/" className="hover:text-luxury-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-luxury-gold">Financial Tools</span>
            <span>/</span>
            <span className="text-white">EMI Calculator</span>
          </div>

          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-heading text-luxury-gold uppercase tracking-wider mb-4">
              Pune Real Estate Financial Calculator
            </h1>
            <p className="text-base text-luxury-silver leading-relaxed">
              Accurately estimate your home loan EMI, down payment, total interest, Maharashtra stamp duty and registration fees across all VTP Realty luxury townships in Pune.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="mb-20">
            <EmiCalculator />
          </div>

          {/* Strategic Context Guide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-heading text-luxury-gold mb-3">1. Maharashtra Stamp Duty</h3>
              <p className="text-sm text-luxury-silver leading-relaxed">
                Standard stamp duty in PMC/PCMC limits is 7% (6% basic + 1% metro cess). Women buyers enjoy an official 1% state government concession (6% net). Registration charges are capped at ₹30,000.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-heading text-luxury-gold mb-3">2. Bank Approvals & Subvention</h3>
              <p className="text-sm text-luxury-silver leading-relaxed">
                All VTP projects (Earth 1, Monarque, Volare, Altamira, Flamante, Cielo) are pre-approved by SBI, HDFC, and ICICI with attractive 10:90 and 20:80 flexible builder subvention schemes.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-heading text-luxury-gold mb-3">3. Tax Savings (Sec 24b & 80C)</h3>
              <p className="text-sm text-luxury-silver leading-relaxed">
                Under the Income Tax Act, homebuyers can claim deductions up to ₹2 Lakhs on interest paid (Section 24b) and up to ₹1.5 Lakhs on principal repayment (Section 80C) annually.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="border-t border-white/10 pt-16">
            <FAQSection />
          </div>
        </div>
      </div>
    </>
  );
}
