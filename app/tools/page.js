import React from 'react';
import Link from 'next/link';
import EmiCalculator from '@/app/components/ui/EmiCalculator';
import AiPropertyMatcher from '@/app/components/ui/AiPropertyMatcher';
import CommuteMatrix from '@/app/components/ui/CommuteMatrix';
import FAQSection from '@/app/components/ui/FAQSection';

export const metadata = {
  title: 'Real Estate Decision Intelligence & Financial Tools | VTP Realty',
  description: 'Access smart Pune real estate decision tools: Home Loan EMI Calculator, AI Property Matcher, Maharashtra Stamp Duty Estimator, and Metro Transit Matrix.',
  alternates: {
    canonical: 'https://vtpbluewaters.com/tools'
  },
  openGraph: {
    title: 'Real Estate Decision Intelligence & Financial Tools | VTP Realty',
    description: 'AI Property Matcher, Home Loan EMI & Stamp Duty Calculator, and Transit Matrix for Pune properties.',
    url: 'https://vtpbluewaters.com/tools',
    siteName: 'VTP Blue Waters',
    images: [{ url: 'https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg', width: 1200, height: 630, alt: 'VTP Decision Intelligence Tools' }],
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
};

export default function ToolsHubPage() {
  return (
    <div className="min-h-screen bg-[#050914] text-white pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-luxury-silver/60 uppercase tracking-widest mb-8">
          <Link href="/" className="hover:text-luxury-gold transition-colors">Home</Link>
          <span>/</span>
          <span className="text-luxury-gold">Decision Intelligence Tools</span>
        </div>

        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-luxury-gold font-semibold">Tech & Analytics Suite</span>
          <h1 className="text-4xl md:text-6xl font-heading text-white uppercase tracking-wider mt-2 mb-4">
            Real Estate Decision Intelligence
          </h1>
          <p className="text-base text-luxury-silver leading-relaxed">
            Data-backed algorithms, financial calculators, and AI matching tools designed to help you discover and finance your ideal home in Pune.
          </p>
        </div>

        {/* 1. AI Property Matcher */}
        <div className="mb-20">
          <AiPropertyMatcher />
        </div>

        {/* 2. Interactive EMI & Financial Calculator */}
        <div className="mb-20">
          <EmiCalculator />
        </div>

        {/* 3. Live Metro & Commute Matrix */}
        <div className="mb-20">
          <CommuteMatrix />
        </div>

        {/* FAQ Section */}
        <div className="border-t border-white/10 pt-16">
          <FAQSection />
        </div>
      </div>
    </div>
  );
}
