import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import projectsData from '@/app/data/projects.json';
import Breadcrumbs from '@/app/components/ui/Breadcrumbs';
import { CheckCircle2 } from 'lucide-react';

const CONFIG_MAP = {
  '2-bhk': { name: '2 BHK Luxury Apartments', searchKey: '2 BHK' },
  '3-bhk': { name: '3 BHK Premium Residences', searchKey: '3 BHK' },
  '4-bhk': { name: '4 BHK Mansions', searchKey: '4 BHK' },
  'duplex': { name: 'Luxury Duplexes', searchKey: 'DUPLEX' },
  'villas': { name: 'Premium Villas', searchKey: 'VILLA' },
  'simplex': { name: 'Luxury Simplexes', searchKey: 'SIMPLEX' }
};

export async function generateMetadata({ params }) {
  const { type } = await params;
  const config = CONFIG_MAP[type];
  
  if (!config) return {};

  const title = `Buy ${config.name} in Pune | VTP Blue Waters`;
  const description = `Explore ultra-luxury ${config.name} in Pune by VTP Realty. Premium amenities, prime locations in Mahalunge, Hinjawadi, and Kharadi. Zero Brokerage.`;
  const url = `https://vtpbluewaters.com/configurations/${type}`;

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
      images: [{ url: 'https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg', width: 1200, height: 630, alt: config.name }]
    }
  };
}

export default async function ConfigurationPage({ params }) {
  const { type } = await params;
  const config = CONFIG_MAP[type];

  if (!config) {
    notFound();
  }

  // Filter projects that have this configuration in their floorPlans
  const associatedProjects = projectsData.filter(project => {
    if (!project.floorPlans) return false;
    return project.floorPlans.some(plan => 
      plan.type.toUpperCase().includes(config.searchKey.toUpperCase())
    );
  });

  return (
    <div className="min-h-screen bg-luxury-charcoal">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-navy/90 via-luxury-charcoal/80 to-luxury-charcoal z-10" />
          <Image 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940&auto=format&fit=crop"
            alt={config.name}
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
              { label: 'Configurations', href: '/configurations' },
              { label: config.searchKey, href: `/configurations/${type}` }
            ]} />
          </div>
          <h1 className="text-5xl md:text-7xl font-heading text-luxury-white mb-6 uppercase tracking-widest drop-shadow-lg">
            Premium <span className="text-luxury-gold">{config.searchKey}</span> Homes
          </h1>
          <p className="text-xl md:text-2xl text-luxury-silver font-light max-w-3xl mx-auto drop-shadow">
            Designed on the Maximum Livable Area (MLA) philosophy for ultimate space and luxury.
          </p>
        </div>
      </section>

      {/* Schema Markup for Configuration Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": `VTP Realty ${config.name} in Pune`,
            "description": `A curated collection of ${config.name} by VTP Realty across prime Pune locations.`,
            "itemListElement": associatedProjects.map((project, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Product",
                "name": project.name,
                "url": `https://vtpbluewaters.com/projects/${project.slug}`,
                "image": `https://vtpbluewaters.com${project.image}`,
                "description": project.seoDescription || project.overview.substring(0, 150)
              }
            }))
          })
        }}
      />

      {/* Detailed Project Briefings */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold tracking-[0.3em] text-luxury-gold uppercase mb-4">VTP Luxe Collection</h2>
          <h3 className="text-3xl md:text-5xl font-heading text-white">
            Available {config.name}
          </h3>
        </div>

        <div className="space-y-24">
          {associatedProjects.map((project, index) => {
            // Find the specific floor plan for this config to display its image
            const targetPlan = project.floorPlans.find(plan => plan.type.toUpperCase().includes(config.searchKey.toUpperCase()));
            const displayImage = targetPlan?.image && !targetPlan.image.includes('Configuration') ? targetPlan.image : project.image;

            return (
              <div key={project.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>
                
                {/* Project Image */}
                <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden group">
                  <Image 
                    src={displayImage.split('&')[0]} // Strip query params if any for safe loading
                    alt={`${project.name} ${config.searchKey}`} 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw" 
                    className="object-cover group-hover:scale-105 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 text-xs text-white/70 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                    {project.location}
                  </div>
                </div>

                {/* Project Details */}
                <div className="w-full lg:w-1/2 space-y-8">
                  <div>
                    <h4 className="text-4xl font-heading text-white mb-2">{project.name}</h4>
                    <p className="text-luxury-gold tracking-widest text-sm">{targetPlan?.type || config.searchKey}</p>
                  </div>

                  <p className="text-luxury-silver text-lg font-light leading-relaxed line-clamp-4">
                    {project.overview.split('\n\n')[1] || project.overview.split('\n\n')[0]}
                  </p>

                  <div className="bg-luxury-navy/30 p-6 rounded-2xl border border-white/5">
                    <h5 className="text-white font-heading mb-4">Configuration Details</h5>
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                      <span className="text-luxury-gold text-sm tracking-wide">Carpet Area</span>
                      <span className="text-luxury-silver font-bold">{targetPlan?.carpetArea || 'Contact for details'}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3">
                      <span className="text-luxury-gold text-sm tracking-wide">Starting Price</span>
                      <span className="text-luxury-silver font-bold">Request Pricing</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {project.amenities?.slice(0, 4).map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                        <span className="text-xs text-luxury-silver">{amenity.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex gap-4">
                    <Link 
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center justify-center px-8 py-4 bg-luxury-gold border border-luxury-gold text-luxury-navy hover:bg-transparent hover:text-luxury-gold transition-all duration-300 rounded-full font-bold tracking-widest text-xs uppercase"
                    >
                      View Project
                    </Link>
                    <a 
                      href="#enquire"
                      className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/20 text-white hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300 rounded-full font-bold tracking-widest text-xs uppercase"
                    >
                      Enquire Now
                    </a>
                  </div>
                </div>

              </div>
            );
          })}

          {associatedProjects.length === 0 && (
            <div className="text-center py-20 bg-luxury-navy/30 rounded-3xl border border-white/5">
              <h4 className="text-2xl text-luxury-silver font-light">No specific {config.searchKey} projects found at the moment.</h4>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(CONFIG_MAP).map(type => ({ type }));
}
