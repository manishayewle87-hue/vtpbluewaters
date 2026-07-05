import HeroSection from '@/app/components/ui/HeroSection';
import TownshipOverview from '@/app/components/ui/TownshipOverview';
import ConfigurationsGrid from '@/app/components/ui/ConfigurationsGrid';
import { cms } from '@/app/services/cms';
import Lifestyle from '@/app/components/ui/Lifestyle';
import FAQSection from '@/app/components/ui/FAQSection';

export default async function Home() {
  const lang = 'mr';
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
