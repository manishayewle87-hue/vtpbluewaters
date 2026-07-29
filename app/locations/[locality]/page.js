import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Clock, Building, ShieldCheck, Map } from 'lucide-react';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';
import localitiesData from '@/app/data/localities.json';

export async function generateMetadata({ params }) {
  const { locality } = params;
  const location = localitiesData.locations.find(loc => loc.slug === locality);

  if (!location) return {};

  return {
    title: `Luxury Flats near ${location.name} | VTP Blue Waters Mahalunge`,
    description: `Looking for luxury apartments near ${location.name}? VTP Blue Waters is a 200+ acre township just ${location.distanceMins} minutes away. Explore 2, 3 & 4 BHK homes.`,
    alternates: {
      canonical: `https://vtpbluewaters.com/locations/${locality}`
    },
    openGraph: {
      title: `Luxury Flats near ${location.name}`,
      description: `Upgrade your lifestyle with VTP Blue Waters. Just ${location.distanceMins} mins from ${location.name}.`,
      url: `https://vtpbluewaters.com/locations/${locality}`,
      siteName: 'VTP Blue Waters',
      images: [{ url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2940&auto=format&fit=crop', width: 1200, height: 630, alt: 'VTP Blue Waters Luxury Real Estate' }],
      type: 'article',
    }
  };
}

export function generateStaticParams() {
  return localitiesData.locations.map((loc) => ({
    locality: loc.slug,
  }));
}

export default function LocalityPage({ params }) {
  const { locality } = params;
  const location = localitiesData.locations.find(loc => loc.slug === locality);

  if (!location) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Luxury Flats near ${location.name} | VTP Blue Waters`,
    "description": `Premium 2, 3 & 4 BHK apartments located just ${location.distanceMins} minutes from ${location.name}.`,
    "url": `https://vtpbluewaters.com/locations/${locality}`,
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
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2940&auto=format&fit=crop"
            alt={`Flats near ${location.name}`}
            fill
            sizes="100vw"
            priority
            className="object-cover scale-105"
          />
        </div>
        <div className="relative z-10 max-w-7xl px-6 md:px-12 w-full mx-auto">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Locations', href: '/locations' },
            { label: location.name, href: `/locations/${locality}` }
          ]} />
          <div className="mt-6">
            <div className="flex items-center gap-2 text-luxury-gold font-bold text-xs uppercase tracking-widest mb-4">
              <MapPin className="w-4 h-4" />
              <span>Just {location.distanceMins} Mins Away</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading text-white leading-tight">
              Luxury Flats near <br className="hidden md:block"/>
              <span className="text-luxury-gold italic font-light">{location.name}</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        <article className="lg:w-2/3 prose prose-invert prose-lg prose-headings:font-heading prose-headings:text-white prose-a:text-luxury-gold">
          
          <p className="lead text-xl font-light text-white/90 border-l-2 border-luxury-gold pl-6">
            {location.hook}. When looking for premium apartments near {location.name}, VTP Blue Waters in Mahalunge offers a massive 200+ acre luxury township lifestyle that standalone buildings simply cannot match.
          </p>

          <h2>The Location Advantage</h2>
          <p>
            Distance and connectivity are critical factors when choosing a home. VTP Blue Waters is strategically located just <strong>{location.distanceKm} km</strong> from {location.name}, translating to a smooth, stress-free <strong>{location.distanceMins}-minute drive</strong>.
          </p>
          <p>
            {location.competitorInsight}
          </p>

          <div className="bg-white/5 border border-luxury-gold/20 p-8 rounded-2xl my-10">
            <h3 className="text-luxury-gold mt-0 flex items-center gap-2"><Building className="w-6 h-6" /> Township Amenities</h3>
            <ul className="m-0 text-base space-y-2 mt-4">
              <li>1KM Long Riverfront Promenade</li>
              <li>Multiple 5-Star Clubhouses</li>
              <li>Olympic-sized Swimming Pools</li>
              <li>600-metre High Street Retail Boulevard</li>
              <li>Smart Home Automation & Premium Specifications</li>
            </ul>
          </div>

          <h2>Configurations Designed for You</h2>
          <p>Whether you are a young IT professional working in {location.type === 'IT Park' ? location.name : 'Hinjewadi'} or a family looking for expansive space, we have the perfect layout:</p>
          <ul>
            <li><strong>2 BHK Premium:</strong> Perfect for high rental yields or young couples.</li>
            <li><strong>3 BHK Luxury:</strong> Unmatched space with VTP's Maximum Livable Area (MLA) philosophy.</li>
            <li><strong>4 BHK Duplex:</strong> The pinnacle of ultra-luxury living.</li>
          </ul>

          <div className="mt-12 p-8 bg-luxury-gold text-luxury-navy rounded-2xl text-center">
            <h3 className="text-2xl font-heading text-luxury-navy mt-0 mb-2">Book a Site Visit Today</h3>
            <p className="text-sm mb-6 text-luxury-navy/80">Experience the township just {location.distanceMins} mins from {location.name}.</p>
            <Link href="/#enquiry" className="px-8 py-3 bg-luxury-navy text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-black transition-colors">
              Schedule Visit
            </Link>
          </div>

        </article>

        {/* Sidebar */}
        <aside className="lg:w-1/3">
          <div className="sticky top-32 space-y-8">
            <div className="bg-luxury-navy/50 border border-luxury-gold/30 rounded-2xl p-6">
              <h4 className="text-white font-heading text-xl mb-6">Proximity to {location.name}</h4>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Clock className="w-8 h-8 text-luxury-gold" />
                  <div>
                    <div className="text-xs text-luxury-silver uppercase tracking-widest">Drive Time</div>
                    <div className="text-xl font-bold text-white">{location.distanceMins} Minutes</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Map className="w-8 h-8 text-luxury-gold" />
                  <div>
                    <div className="text-xs text-luxury-silver uppercase tracking-widest">Distance</div>
                    <div className="text-xl font-bold text-white">{location.distanceKm} km</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <ShieldCheck className="w-8 h-8 text-luxury-gold" />
                  <div>
                    <div className="text-xs text-luxury-silver uppercase tracking-widest">Route</div>
                    <div className="text-xl font-bold text-white">Direct & Signal-free</div>
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
