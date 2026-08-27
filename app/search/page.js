import React, { Suspense } from 'react';
import Link from 'next/link';
import SearchClient from './SearchClient';
import projectsData from '@/app/data/projects.json';

export const metadata = {
  title: 'Search Pune Properties & VTP Projects | VTP Blue Waters',
  description: 'Search across 45+ luxury VTP Realty projects, 2, 3, 4 & 5 BHK flats, villas, and commercial spaces across Mahalunge, Kharadi, Hinjawadi, and Baner-Sus.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://vtpbluewaters.com/search'
  }
};

export default function SearchPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    "name": "VTP Realty Property Search",
    "url": "https://vtpbluewaters.com/search",
    "description": "Real-time search engine for luxury flats, apartments, and villas in Pune by VTP Realty.",
    "publisher": {
      "@type": "Organization",
      "name": "VTP Realty",
      "url": "https://vtpbluewaters.com"
    }
  };

  return (
    <div className="min-h-screen bg-[#050914] text-white pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-luxury-silver/60 uppercase tracking-widest mb-8">
          <Link href="/" className="hover:text-luxury-gold transition-colors">Home</Link>
          <span>/</span>
          <span className="text-luxury-gold">Property Search</span>
        </div>

        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-luxury-gold font-semibold">Google Sitelinks & Quick Search</span>
          <h1 className="text-3xl md:text-5xl font-heading text-white uppercase tracking-wider mt-2 mb-4">
            Search VTP Projects & Configurations
          </h1>
          <p className="text-sm text-luxury-silver leading-relaxed">
            Instant search across 45+ projects, 34 micro-markets, and verified floor plans in Pune.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-20 text-luxury-silver">Loading search index...</div>}>
          <SearchClient projects={projectsData} />
        </Suspense>
      </div>
    </div>
  );
}
