import { notFound } from 'next/navigation';
import Image from 'next/image';
import locationsData from '@/app/data/locations.json';
import projectsData from '@/app/data/projects.json';
import { seoSilos } from '@/app/data/seo-silos';
import Link from 'next/link';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';
import { Briefcase, Train, Coffee, TrendingUp, Plane, Cpu, MapPin, Leaf, Star, CheckCircle2 } from 'lucide-react';
import { PUNE_MICRO_MARKETS, getProjectsNearLocation } from '@/app/services/locationEngine';

export async function generateMetadata({ params }) {
  const { location } = await params;
  let loc = locationsData.find(l => l.slug === location);
  
  if (!loc) {
    const market = PUNE_MICRO_MARKETS.find(m => m.slug === location);
    if (!market) return {};
    loc = {
      slug: market.slug,
      name: market.name,
      seoDescription: `Explore premium luxury apartments and townships in ${market.name}, Pune. Find your dream home near top IT parks with VTP Realty. RERA Registered projects.`,
    };
  }

  const url = `https://vtpbluewaters.com/locations/${loc.slug}`;
  const title = `Luxury Real Estate in ${loc.name}, Pune | VTP Realty`;
  const description = loc.seoDescription || `Explore premium luxury apartments and townships in ${loc.name}, Pune. Find your dream home near top IT parks with VTP Realty. RERA Registered projects.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'VTP Blue Waters',
      locale: 'en_IN',
      type: 'website',
      images: [{ url: 'https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg', width: 1200, height: 630, alt: `Luxury Real Estate ${loc.name} Pune` }]
    },
    twitter: { card: 'summary_large_image', title, description, images: ['https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg'] },
    robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 }
  };
}

const IconMap = {
  Briefcase: Briefcase,
  Train: Train,
  Coffee: Coffee,
  TrendingUp: TrendingUp,
  Plane: Plane,
  Cpu: Cpu,
  MapPin: MapPin,
  Leaf: Leaf,
  Star: Star
};

export default async function LocationPage({ params }) {
  const { location } = await params;
  let loc = locationsData.find(l => l.slug === location);
  let associatedProjects = [];

  if (loc) {
    // Find associated projects from locations.json mapping
    associatedProjects = projectsData.filter(p => loc.projects.includes(p.slug));
  } else {
    // Fallback dynamically to PUNE_MICRO_MARKETS
    const market = PUNE_MICRO_MARKETS.find(m => m.slug === location);
    if (!market) {
      notFound();
    }
    associatedProjects = await getProjectsNearLocation(location);
    loc = {
      slug: market.slug,
      name: market.name,
      description: `Premium luxury apartments and townships in and around ${market.name}, Pune. Built on the Maximum Livable Area philosophy.`,
      expansiveDescription: `${market.name} is one of West Pune's fast-growing residential micro-markets. Benefiting from proximity to major IT corridors and robust infrastructure development, the area has become highly attractive to tech professionals and families alike.\n\nGrade-A developments in the vicinity, particularly VTP Realty's flagship townships, offer residents high ROI potential and an exceptional quality of life. Explore premium properties near ${market.name} to secure your home.`,
      highlights: [
        { title: 'Prime Location', value: `Seamless connectivity to major employment and lifestyle corridors in Pune.`, icon: 'MapPin' },
        { title: 'Growth Hub', value: `Excellent capital appreciation and rental yield potential driven by infrastructure.`, icon: 'TrendingUp' },
        { title: 'Premium Living', value: `World-class lifestyle amenities and smart-home integrated layouts.`, icon: 'Star' }
      ]
    };
  }

  return (
    <div className="min-h-screen bg-luxury-charcoal">
      {/* Location Hero */}
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-navy/90 via-luxury-charcoal/80 to-luxury-charcoal z-10" />
          <Image 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop"
            alt={`${loc.name} Real Estate Overview`}
            fill
            sizes="100vw"
            priority
            className="object-cover scale-105 transform hover:scale-100 transition-transform duration-[10s]"
          />
        </div>
        <div className="relative z-10 text-center max-w-5xl px-6 mt-10 lg:mt-20">
          <div className="flex justify-center mb-6">
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Locations', href: '/#locations' },
              { label: loc.name, href: `/locations/${loc.slug}` }
            ]} />
          </div>
          <h1 className="text-5xl md:text-7xl font-heading text-luxury-white mb-6 uppercase tracking-widest drop-shadow-lg">
            Premium Properties in <span className="text-luxury-gold">{loc.name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-luxury-silver font-light max-w-3xl mx-auto drop-shadow">
            {loc.description}
          </p>
        </div>
      </section>

      {/* Full Knowledge Graph for Location Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Place",
                "@id": `https://vtpbluewaters.com/locations/${loc.slug}#place`,
                "name": `${loc.name}, Pune`,
                "description": loc.expansiveDescription || loc.description,
                "containedInPlace": { "@type": "City", "name": "Pune", "containedInPlace": { "@type": "State", "name": "Maharashtra" } },
                "amenityFeature": loc.highlights?.map(h => ({ "@type": "LocationFeatureSpecification", "name": h.title, "value": true })) || []
              },
              {
                "@type": "LocalBusiness",
                "@id": `https://vtpbluewaters.com/locations/${loc.slug}#localbusiness`,
                "name": `VTP Realty ${loc.name} Sales Office`,
                "description": `VTP Realty's luxury residential projects in ${loc.name}, Pune. RERA registered. Premium 2, 3, 4 BHK apartments with Maximum Livable Area philosophy.`,
                "url": `https://vtpbluewaters.com/locations/${loc.slug}`,
                "telephone": "+91-7744009295",
                "priceRange": "₹₹₹₹",
                "image": "https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg",
                "address": { "@type": "PostalAddress", "addressLocality": loc.name, "addressRegion": "Maharashtra", "addressCountry": "IN" },
                "parentOrganization": { "@id": "https://vtpbluewaters.com/#organization" }
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://vtpbluewaters.com" },
                  { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://vtpbluewaters.com/#locations" },
                  { "@type": "ListItem", "position": 3, "name": loc.name, "item": `https://vtpbluewaters.com/locations/${loc.slug}` }
                ]
              }
            ]
          })
        }}
      />

      {/* Expansive Locational Details Section */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-2/3">
            <h2 className="text-sm font-bold tracking-[0.3em] text-luxury-gold uppercase mb-6">Location Overview</h2>
            <h3 className="text-3xl md:text-5xl font-heading text-white mb-8 leading-tight">
              The Evolution of <span className="text-luxury-gold">{loc.name}</span>
            </h3>
            
            <div className="space-y-6 text-luxury-silver text-lg font-light leading-relaxed">
              {loc.expansiveDescription ? (
                loc.expansiveDescription.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))
              ) : (
                <p>{loc.description}</p>
              )}
            </div>
          </div>

          {/* Advantages Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            <h4 className="text-2xl font-heading text-white mb-8 border-b border-white/10 pb-4">Key Advantages</h4>
            {loc.highlights?.map((highlight, idx) => {
              const IconComponent = IconMap[highlight.icon] || MapPin;
              return (
                <div key={idx} className="bg-luxury-navy/50 p-6 rounded-2xl border border-white/5 hover:border-luxury-gold/30 hover:bg-luxury-navy transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-luxury-gold/10 rounded-lg group-hover:bg-luxury-gold/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-luxury-gold" />
                    </div>
                    <div>
                      <h5 className="text-lg font-heading text-white mb-2">{highlight.title}</h5>
                      <p className="text-sm text-luxury-silver leading-relaxed">{highlight.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Project Briefings */}
      <section className="py-24 px-6 md:px-12 bg-black/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold tracking-[0.3em] text-luxury-gold uppercase mb-4">Project Briefings</h2>
            <h3 className="text-4xl md:text-6xl font-heading text-white">
              VTP Luxe Signatures in {loc.name}
            </h3>
            <p className="mt-6 text-luxury-silver max-w-2xl mx-auto text-lg">
              Explore our portfolio of ultra-luxury residences designed on the Maximum Livable Area (MLA) philosophy.
            </p>
          </div>

          <div className="space-y-24">
            {associatedProjects.map((project, index) => (
              <div key={project.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>
                
                {/* Project Image */}
                <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden group">
                  <Image 
                    src={project.image} 
                    alt={project.name} 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw" 
                    className="object-cover group-hover:scale-105 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {project.maharera && (
                    <div className="absolute bottom-6 left-6 text-xs text-white/70 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                      MahaRERA: {project.maharera[0]}
                    </div>
                  )}
                </div>

                {/* Project Details */}
                <div className="w-full lg:w-1/2 space-y-8">
                  <div>
                    <h4 className="text-4xl md:text-5xl font-heading text-white mb-2">{project.name}</h4>
                    <p className="text-luxury-gold uppercase tracking-widest text-sm">{project.location}</p>
                  </div>

                  <p className="text-luxury-silver text-lg font-light leading-relaxed">
                    {project.overview.split('\n\n')[1] || project.overview.split('\n\n')[0]}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {project.amenities?.slice(0, 4).map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                        <span className="text-sm text-luxury-silver">{amenity.name}</span>
                      </div>
                    ))}
                  </div>

                  {project.floorPlans && (
                    <div className="bg-luxury-navy/30 p-6 rounded-2xl border border-white/5">
                      <h5 className="text-white font-heading mb-4">Available Configurations</h5>
                      <div className="space-y-3">
                        {project.floorPlans.map((plan, idx) => (
                          <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                            <span className="text-luxury-gold text-sm tracking-wide">{plan.type}</span>
                            <span className="text-luxury-silver text-sm">{plan.carpetArea}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4">
                    <Link 
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center justify-center px-10 py-4 bg-transparent border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-navy transition-all duration-300 rounded-full font-bold tracking-[0.2em] text-xs uppercase"
                    >
                      View Full Details
                    </Link>
                  </div>
                </div>

              </div>
            ))}

            {associatedProjects.length === 0 && (
              <div className="text-center py-20 bg-luxury-navy/30 rounded-3xl border border-white/5">
                <h4 className="text-2xl text-luxury-silver font-light">New ultra-luxury phases launching soon in {loc.name}.</h4>
              </div>
            )}
          </div>
        </div>
      </section>
        {/* Internal PageRank Sculpting: Location → Programmatic SEO Hub */}
        {(() => {
          // Find matching silo for this location
          const locationSlugKey = loc.slug.toLowerCase().replace(/-/g, '');
          const matchingSilo = seoSilos.find(silo =>
            silo.id.includes(loc.slug) || silo.title.toLowerCase().includes(loc.name.toLowerCase())
          );
          if (!matchingSilo) return null;
          const topSlugs = matchingSilo.slugs.slice(0, 24);
          return (
            <section className="py-16 px-6 border-t border-white/5 bg-black/20">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-xs font-bold tracking-[0.3em] text-luxury-gold uppercase mb-3">Explore by Type</h2>
                <h3 className="text-2xl font-heading text-white mb-8">
                  All Property Types in {loc.name}, Pune
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {topSlugs.map((item, i) => (
                    <Link
                      key={i}
                      href={`/explore/${item.slug}`}
                      prefetch={false}
                      className="text-luxury-silver hover:text-luxury-gold text-sm py-2 px-4 border border-white/5 hover:border-luxury-gold/30 rounded-lg transition-all duration-300 truncate"
                    >
                      {item.keyword}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })()}
      </div>
  );
}

export async function generateStaticParams() {
  return PUNE_MICRO_MARKETS.map(loc => ({ location: loc.slug }));
}
