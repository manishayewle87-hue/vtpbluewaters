import TownshipHero from '@/app/components/township/TownshipHero';
import TownshipInfographics from '@/app/components/township/TownshipInfographics';
import MasterplanDeepDive from '@/app/components/township/MasterplanDeepDive';
import TownshipExperience from '@/app/components/township/TownshipExperience';
import TownshipConnectivity from '@/app/components/township/TownshipConnectivity';
import TownshipLegacy from '@/app/components/township/TownshipLegacy';
import Footer from '@/app/components/ui/Footer';


export const metadata = {
  title: 'VTP Blue Waters Township | 200+ Acres of Luxury in Pune',
  description: 'Explore the masterplan of VTP Blue Waters, a sprawling 200+ acre luxury township in Mahalunge, West Pune. Featuring a 1KM riverfront promenade and world-class high street retail.'};

export default function TownshipPage() {
  const lang = 'en';
    return (
    <main className="min-h-screen bg-luxury-navy flex flex-col">
      <TownshipHero />
      <TownshipInfographics />
      <MasterplanDeepDive />
      <TownshipExperience />
      <TownshipConnectivity />
      <TownshipLegacy />
      <Footer />
    </main>
  );
}



