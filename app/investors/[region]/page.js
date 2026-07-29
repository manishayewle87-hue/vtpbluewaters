import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Briefcase, Building, ShieldCheck, Globe } from 'lucide-react';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';

// Pre-defined region data for dynamic generation
const regionData = {
  uae: {
    name: 'UAE & Middle East',
    currency: 'AED',
    currencySymbol: 'د.إ',
    flag: '🇦🇪',
    title: 'Pune Real Estate Investment Guide for UAE NRIs (2026)',
    roiComparison: 'Unlike Dubai real estate which is currently peaking, Pune offers a 12-15% YoY capital appreciation phase with a much lower entry point. Your Dirhams stretch further in Pune.',
    femaRule: 'UAE NRIs can easily invest via NRE/NRO accounts. Repatriation of rental income and sale proceeds to the UAE is fully permissible up to USD 1 Million per financial year under FEMA.'
  },
  usa: {
    name: 'USA',
    currency: 'USD',
    currencySymbol: '$',
    flag: '🇺🇸',
    title: 'Pune Real Estate Investment Guide for US NRIs (2026)',
    roiComparison: 'With the US housing market facing high mortgage rates, investing USD in Pune’s debt-free luxury real estate yields an inflation-beating 12-15% YoY capital appreciation.',
    femaRule: 'US NRIs can invest seamlessly via NRE/NRO accounts. Double Taxation Avoidance Agreement (DTAA) benefits apply, and repatriation to the US is permissible up to USD 1 Million/year.'
  },
  uk: {
    name: 'United Kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    flag: '🇬🇧',
    title: 'Pune Real Estate Investment Guide for UK NRIs (2026)',
    roiComparison: 'Compared to stagnant UK property yields, Pune luxury townships offer massive capital appreciation (12-15% YoY) driven by the IT boom and foreign direct investment.',
    femaRule: 'UK NRIs can invest via NRE/NRO accounts. The UK-India DTAA ensures you aren’t taxed twice, and repatriation is straightforward under RBI guidelines.'
  },
  singapore: {
    name: 'Singapore & APAC',
    currency: 'SGD',
    currencySymbol: 'S$',
    flag: '🇸🇬',
    title: 'Pune Real Estate Investment Guide for Singapore NRIs (2026)',
    roiComparison: 'While Singapore ABSD makes local property prohibitively expensive, Pune offers massive 200+ acre luxury townships at a fraction of the cost, with 12-15% YoY growth.',
    femaRule: 'Singapore NRIs can invest via NRE/NRO accounts. Repatriation to Singapore is seamless, and DTAA benefits apply.'
  }
};

export async function generateMetadata({ params }) {
  const { region } = params;
  const data = regionData[region.toLowerCase()];

  if (!data) return {};

  return {
    title: data.title,
    description: `Complete 2026 guide for ${data.name} NRIs investing in Pune real estate. Compare ${data.currency} ROI, understand FEMA rules, and explore VTP Blue Waters.`,
    alternates: {
      canonical: `https://vtpbluewaters.com/investors/${region}`
    }
  };
}

export function generateStaticParams() {
  return Object.keys(regionData).map((region) => ({
    region: region,
  }));
}

export default function NRIInvestmentRegionPage({ params }) {
  const { region } = params;
  const data = regionData[region.toLowerCase()];

  if (!data) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://vtpbluewaters.com/investors/${region}`
    },
    "headline": data.title,
    "description": `Complete 2026 guide for ${data.name} NRIs investing in Pune real estate.`,
    "author": { "@id": "https://vtpbluewaters.com/#organization" },
    "publisher": { "@id": "https://vtpbluewaters.com/#organization" }
  };

  return (
    <div className="min-h-screen bg-luxury-charcoal text-luxury-silver">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero Section */}
      <section className="relative w-full h-[50vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy via-luxury-navy/80 to-transparent z-10" />
          <Image 
            src="https://images.unsplash.com/photo-1558036117-15d82a90b968?q=80&w=2940&auto=format&fit=crop"
            alt="Global Investment"
            fill
            sizes="100vw"
            priority
            className="object-cover scale-105"
          />
        </div>
        <div className="relative z-10 max-w-7xl px-6 md:px-12 w-full mx-auto">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Investors', href: '/investors' },
            { label: data.name, href: `/investors/${region}` }
          ]} />
          <div className="mt-6 flex items-center gap-3">
            <span className="text-4xl">{data.flag}</span>
            <h1 className="text-3xl md:text-5xl font-heading text-white leading-tight">
              {data.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        <article className="lg:w-2/3 prose prose-invert prose-lg prose-headings:font-heading prose-headings:text-white prose-a:text-luxury-gold">
          
          <p className="lead text-xl font-light text-white/90 border-l-2 border-luxury-gold pl-6">
            For Non-Resident Indians (NRIs) based in {data.name}, Pune's real estate market in 2026 presents an unprecedented wealth-creation opportunity. As global markets face volatility, Pune's IT-driven economy provides a high-growth, stable sanctuary for your capital.
          </p>

          <h2>Why Pune Real Estate over Local {data.name} Investments?</h2>
          <p>{data.roiComparison}</p>
          <p>
            When earning in <strong>{data.currency}</strong>, the exchange rate dynamic heavily favors investing in Indian luxury real estate right now. VTP Blue Waters offers massive 200+ acre township living—a lifestyle that is astronomically expensive in global tier-1 cities, but highly accessible in Pune.
          </p>

          <div className="bg-white/5 border border-luxury-gold/20 p-8 rounded-2xl my-10">
            <h3 className="text-luxury-gold mt-0 flex items-center gap-2"><Globe className="w-6 h-6" /> FEMA & RBI Guidelines for {data.name} NRIs</h3>
            <p className="m-0 text-base">{data.femaRule}</p>
            <p className="mb-0 text-base mt-4"><strong>Key Requirement:</strong> Transactions must be routed through your NRE (Non-Resident External), NRO (Non-Resident Ordinary), or FCNR (Foreign Currency Non-Resident) accounts.</p>
          </div>

          <h2>The VTP Blue Waters NRI Advantage</h2>
          <ul>
            <li><strong>MahaRERA Registered:</strong> 100% transparent documentation, protecting your investment.</li>
            <li><strong>Zero-Headache Management:</strong> As an integrated township, security, maintenance, and facility management are handled entirely by professional agencies.</li>
            <li><strong>High Rental Yields:</strong> Proximity to Hinjewadi IT Park ensures constant demand from corporate expatriates and IT leaders, yielding passive income in INR.</li>
            <li><strong>Dedicated NRI Desk:</strong> Our specialized {data.name} NRI team handles everything from virtual tours to digital registration and banking compliance.</li>
          </ul>

          <div className="mt-12 p-8 bg-luxury-gold text-luxury-navy rounded-2xl text-center">
            <h3 className="text-2xl font-heading text-luxury-navy mt-0 mb-2">Schedule a Virtual Tour</h3>
            <p className="text-sm mb-6 text-luxury-navy/80">Connect with our dedicated {data.name} NRI specialist.</p>
            <Link href="/" className="px-8 py-3 bg-luxury-navy text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-black transition-colors">
              Contact NRI Desk
            </Link>
          </div>

        </article>

        <aside className="lg:w-1/3">
          <div className="sticky top-32 space-y-8">
            <div className="bg-luxury-navy/50 border border-luxury-gold/30 rounded-2xl p-6">
              <h4 className="text-white font-heading text-xl mb-6">{data.currency} vs INR Advantage</h4>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Briefcase className="w-8 h-8 text-luxury-gold" />
                  <div>
                    <div className="text-xs text-luxury-silver uppercase tracking-widest">Target Investment</div>
                    <div className="text-xl font-bold text-white">Luxury Townships</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Building className="w-8 h-8 text-luxury-gold" />
                  <div>
                    <div className="text-xs text-luxury-silver uppercase tracking-widest">Est. Pune Appreciation</div>
                    <div className="text-xl font-bold text-white">12-15% YoY</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <ShieldCheck className="w-8 h-8 text-luxury-gold" />
                  <div>
                    <div className="text-xs text-luxury-silver uppercase tracking-widest">Repatriation Limit</div>
                    <div className="text-xl font-bold text-white">USD 1 Million/Yr</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
