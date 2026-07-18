import dynamic from 'next/dynamic';
import HeroSection from '@/app/components/ui/HeroSection';
import { cms } from '@/app/services/cms';

// Code Splitting: Dynamically import heavy below-the-fold components
// This slashes the initial JS bundle size, drastically improving Time to Interactive (TTI) and Core Web Vitals
const TownshipOverview = dynamic(() => import('@/app/components/ui/TownshipOverview'), {
  loading: () => <div className="h-screen bg-[#050914] animate-pulse"></div>
});

const ConfigurationsGrid = dynamic(() => import('@/app/components/ui/ConfigurationsGrid'), {
  loading: () => <div className="h-96 bg-[#050914] animate-pulse"></div>
});

const Lifestyle = dynamic(() => import('@/app/components/ui/Lifestyle'));
const FAQSection = dynamic(() => import('@/app/components/ui/FAQSection'));

export default async function LanguageRoot({ params }) {
  
    const projects = await cms.getAllProjects();

  return (
    <div className="bg-luxury-navy relative">
      {/* 1. Immersive Hero with Three.js WebGL (via HeroSection) */}
      <HeroSection />
      
      {/* 2. Pinned GSAP Storytelling (The Vision) */}
      <TownshipOverview />
      
      {/* 3. The Collection (Signature Projects) */}
      <ConfigurationsGrid projects={projects} />
      
      {/* 4. Lifestyle & Amenities Showcase */}
      <Lifestyle />

      {/* 5. SEO FAQ Section for AI Overviews */}
      <FAQSection />
    </div>
  );
}
