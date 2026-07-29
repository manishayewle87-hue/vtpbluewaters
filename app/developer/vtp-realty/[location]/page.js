import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Building, MapPin, Award } from 'lucide-react';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';
import projectsData from '@/app/data/projects.json';

// Group projects by exact location strings in projectsData
const generateLocationMap = () => {
  const map = {};
  projectsData.forEach(p => {
    // e.g., "Kharadi, Pune" -> "kharadi"
    const locSlug = p.location.split(',')[0].toLowerCase().trim().replace(/\\s+/g, '-');
    if (!map[locSlug]) {
      map[locSlug] = {
        name: p.location.split(',')[0].trim(),
        projects: []
      };
    }
    map[locSlug].projects.push(p);
  });
  return map;
};

const locationMap = generateLocationMap();

export async function generateMetadata({ params }) {
  const { location } = params;
  const locData = locationMap[location.toLowerCase()];

  if (!locData) return {};

  return {
    title: `VTP Realty Projects in ${locData.name}, Pune | Luxury Flats`,
    description: `Explore all VTP Realty residential projects in ${locData.name}, Pune. Discover premium 2, 3, 4 BHK flats and luxury townships developed by VTP Realty.`,
    alternates: {
      canonical: `https://vtpbluewaters.com/developer/vtp-realty/${location}`
    },
    openGraph: {
      title: `VTP Realty Projects in ${locData.name}, Pune`,
      description: `Official listing of all VTP Realty luxury apartments in ${locData.name}.`,
      url: `https://vtpbluewaters.com/developer/vtp-realty/${location}`,
      siteName: 'VTP Realty Master Hub',
      type: 'article',
    }
  };
}

export function generateStaticParams() {
  return Object.keys(locationMap).map((loc) => ({
    location: loc,
  }));
}

export default function VTPRealtyLocationPage({ params }) {
  const { location } = params;
  const locData = locationMap[location.toLowerCase()];

  if (!locData) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `VTP Realty Projects in ${locData.name}, Pune`,
    "description": `Comprehensive list of VTP Realty luxury developments in ${locData.name}.`,
    "publisher": { "@id": "https://vtpbluewaters.com/#organization" },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": locData.projects.map((p, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": p.name,
        "url": p.link
      }))
    }
  };

  return (
    <div className="min-h-screen bg-luxury-navy text-luxury-silver pt-24 pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'VTP Realty', href: '/' },
          { label: locData.name, href: `/developer/vtp-realty/${location}` }
        ]} />

        {/* Brand Header */}
        <div className="mt-10 mb-16 border-b border-white/10 pb-10">
          <div className="flex items-center gap-2 text-luxury-gold mb-4 text-xs tracking-[0.2em] uppercase font-bold">
            <Award className="w-4 h-4" /> Pune's #1 Real Estate Brand
          </div>
          <h1 className="text-4xl md:text-6xl font-heading text-white leading-tight">
            VTP Realty Projects in <span className="text-luxury-gold italic font-light">{locData.name}</span>
          </h1>
          <p className="mt-6 text-lg text-luxury-silver/80 max-w-3xl leading-relaxed">
            Discover the pinnacle of luxury living with VTP Realty in {locData.name}, Pune. 
            Designed with our patented <strong>Maximum Livable Area (MLA)</strong> philosophy, 
            these premium developments offer zero space wastage, soaring ceilings, and world-class amenities.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locData.projects.map((project) => (
            <div key={project.id} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-luxury-gold/50 transition-colors duration-500">
              <div className="relative h-64 w-full overflow-hidden">
                <Image 
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {project.township}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 text-luxury-gold text-xs uppercase tracking-widest mb-2 font-bold">
                  <MapPin className="w-4 h-4" /> {project.location}
                </div>
                <h2 className="text-2xl font-heading text-white mb-3 group-hover:text-luxury-gold transition-colors">
                  {project.name}
                </h2>
                <p className="text-sm text-luxury-silver/80 line-clamp-3 mb-6">
                  {project.seoDescription}
                </p>
                <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest hover:text-luxury-gold transition-colors">
                  Explore Project <span className="text-luxury-gold">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
