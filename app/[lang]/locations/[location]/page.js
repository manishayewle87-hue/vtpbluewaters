import { notFound } from 'next/navigation';
import Image from 'next/image';
import locationsData from '@/app/data/locations.json';
import projectsData from '@/app/data/projects.json';
import HeroSection from '@/app/components/ui/HeroSection';
import TownshipOverview from '@/app/components/ui/TownshipOverview';
import Link from 'next/link';

export async function generateStaticParams() {
  const params = [];
  const langs = ['en', 'mr', 'hi'];
  
  for (const lang of langs) {
    for (const loc of locationsData) {
      params.push({ lang, location: loc.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const loc = locationsData.find(l => l.slug === params.location);
  if (!loc) return {};
  
  return {
    title: `Luxury Real Estate in ${loc.name}, Pune | VTP Realty`,
    description: `Explore premium 2, 3, 4 BHK luxury apartments and townships in ${loc.name}, ${loc.region}. Find your dream home near top IT parks with VTP Realty.`,
  };
}

export default function LocationPage({ params }) {
  const loc = locationsData.find(l => l.slug === params.location);
  if (!loc) {
    notFound();
  }

  // Find associated projects
  const associatedProjects = projectsData.filter(p => loc.projects.includes(p.slug));

  return (
    <div className="min-h-screen bg-luxury-charcoal">
      {/* Location Hero */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-navy/80 via-luxury-charcoal/60 to-luxury-charcoal z-10" />
          <Image 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop"
            alt={`${loc.name} Real Estate`}
            fill
            sizes="100vw"
            priority
            className="object-cover scale-105 transform hover:scale-100 transition-transform duration-[10s]"
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-4 mt-10 lg:mt-20">
          <h1 className="text-4xl md:text-6xl font-heading text-luxury-white mb-6 uppercase tracking-wider">
            Premium Properties in <span className="text-luxury-gold">{loc.name}</span>
          </h1>
          <p className="text-lg md:text-xl text-luxury-silver font-light max-w-2xl mx-auto">
            {loc.description}
          </p>
        </div>
      </section>

      {/* Local Infrastructure Schema (Invisible to user, highly visible to AI Overviews) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Place",
            "name": loc.name,
            "description": loc.description,
            "containedInPlace": {
              "@type": "City",
              "name": "Pune"
            },
            "amenityFeature": loc.highlights.map(h => ({
              "@type": "LocationFeatureSpecification",
              "name": h.title,
              "value": h.value
            }))
          })
        }}
      />

      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 lg:mb-20">
          {loc.highlights.map((highlight, idx) => (
            <div key={idx} className="bg-luxury-navy p-8 rounded-xl border border-white/5 hover:border-luxury-gold/30 transition-all">
              <h3 className="text-xl font-heading text-luxury-gold mb-2">{highlight.title}</h3>
              <p className="text-luxury-silver">{highlight.value}</p>
            </div>
          ))}
        </div>

        <h2 className="text-3xl md:text-5xl font-heading text-luxury-white mb-12 text-center uppercase tracking-wider">
          VTP Projects in {loc.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {associatedProjects.map((project) => (
            <Link href={`/${params.lang}/projects/${project.slug}`} key={project.id} className="group">
              <div className="bg-luxury-navy rounded-xl overflow-hidden border border-white/5 group-hover:border-luxury-gold/50 transition-all duration-300">
                <div className="h-64 overflow-hidden relative">
                  <Image src={project.image} alt={project.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-heading text-luxury-white mb-2">{project.name}</h3>
                  <p className="text-luxury-gold text-sm mb-4">{project.location}</p>
                  <p className="text-luxury-silver line-clamp-3 text-sm">{project.overview}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
