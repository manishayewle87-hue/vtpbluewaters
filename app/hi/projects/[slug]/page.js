import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cms } from '@/app/services/cms';
import ProjectTabs from '@/app/components/project/ProjectTabs';
import ProjectAmenities from '@/app/components/project/ProjectAmenities';
import ProjectSpecs from '@/app/components/project/ProjectSpecs';
import ProjectLocation from '@/app/components/project/ProjectLocation';
import EnquiryForm from '@/app/components/project/EnquiryForm';
import EmiCalculator from '@/app/components/project/EmiCalculator';


import ProjectMasterLayout from '@/app/components/project/ProjectMasterLayout';
import ProjectFloorPlans from '@/app/components/project/ProjectFloorPlans';
import ProjectVirtualTour from '@/app/components/project/ProjectVirtualTour';

export async function generateStaticParams() {
  const projects = await cms.getAllProjects();
  return projects.map((project) => ({
    slug: project.slug}));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await cms.getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };
  
  return {
    title: project.seoTitle,
    description: project.seoDescription,
    alternates: {
      canonical: `https://vtpbluewaters.com/${(await params).lang}/projects/${project.slug}`},
    openGraph: {
      title: project.seoTitle,
      description: project.seoDescription,
      images: [project.image],
      type: 'website'}};
}

function generateJsonLd(project, lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ApartmentComplex',
    name: project.name,
    description: project.overview,
    url: `https://vtpbluewaters.com/${lang}/projects/${project.slug}`,
    image: project.image,
    address: {
      '@type': 'PostalAddress',
      addressLocality: project.location?.split(',')[0]?.trim(),
      addressRegion: 'Maharashtra',
      addressCountry: 'IN'},
    parentOrganization: {
      "@id": "https://vtpbluewaters.com/#organization"
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock'}
  };
}

export default async function ProjectDetail({   params }) {
  const lang = 'hi';
  const { slug } = await params;
  const project = await cms.getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const jsonLd = generateJsonLd(project, lang);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-luxury-navy">
        {/* 1. Cinematic Hero Section */}
        <header className="relative h-[80vh] flex items-end pb-16 lg:pb-32 border-b border-luxury-gold/20">
          <div className="absolute inset-0 z-0">
            <Image 
              src={project.image} 
              alt={project.name}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-40 scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy via-luxury-navy/60 to-transparent"></div>
          </div>
          
          <div className="container relative z-10 mx-auto px-6 max-w-7xl">
            <Link href="/#residences" className="inline-flex items-center gap-2 text-luxury-caption text-luxury-silver hover:text-luxury-gold transition-colors mb-16">
              <span>←</span> Return to Portfolio
            </Link>
            
            <div className="text-luxury-label text-luxury-gold mb-6">{project.township}</div>
            <h1 className="text-display-md md:text-display-xl font-display font-light mb-6">{project.name}</h1>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <p className="text-lg md:text-xl font-light text-luxury-silver tracking-wide flex items-center gap-4">
                <span className="w-2 h-2 bg-[#36C5CD] rounded-full"></span>
                {project.location}
              </p>
              {project.maharera && project.maharera.length > 0 && (
                <div className="flex flex-wrap gap-3 border-l border-white/20 pl-6">
                  {project.maharera.map((num, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 px-4 py-2 flex items-center gap-2">
                      <span className="text-luxury-caption text-luxury-silver">MahaRERA: {num}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Sticky Tab Navigation */}
        <ProjectTabs />

        {/* 2. Editorial Overview */}
        <section id="overview" className="py-16 lg:py-32 container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <div className="text-luxury-label text-luxury-gold mb-4">The Vision</div>
              <h2 className="text-display-sm md:text-display-md font-display font-light mb-8">
                A Masterpiece in <span className="italic text-[#36C5CD]">{project.location.split(',')[0]}</span>
              </h2>
              <p className="text-luxury-silver font-light leading-relaxed text-base mb-8 text-editorial">
                {project.overview}
              </p>
              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8 mt-12">
                <div>
                  <div className="text-display-sm font-display font-light text-luxury-white mb-1">2, 3 & 4</div>
                  <div className="text-luxury-label text-luxury-gold">BHK Residences</div>
                </div>
                <div>
                  <div className="text-display-sm font-display font-light text-luxury-white mb-1">MLA</div>
                  <div className="text-luxury-label text-luxury-gold">Maximum Livable Area</div>
                </div>
              </div>
            </div>
            
            <div className="aspect-[4/5] bg-luxury-charcoal relative overflow-hidden group">
               <Image 
                 src={project.image} 
                 alt={`${project.name} Architecture`}
                 fill
                 sizes="(max-width: 1024px) 100vw, 50vw"
                 className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy via-transparent to-transparent opacity-50"></div>
            </div>
          </div>
        </section>

        {/* 3. Dynamic Amenities */}
        <div id="amenities">
          <ProjectAmenities amenities={project.amenities || []} />
        </div>

        {/* 4. Master Layout */}
        <ProjectMasterLayout masterLayout={project.masterLayout} projectName={project.name} />

        {/* 5. Floor Plans */}
        <ProjectFloorPlans floorPlans={project.floorPlans} projectName={project.name} />

        {/* 6. Virtual Reality Walkthrough */}
        {/* <ProjectVirtualTour projectName={project.name} tourImage={project.virtualTourImage} /> */}

        {/* 6. Specifications */}
        <div id="specifications">
          <ProjectSpecs specifications={project.specifications || []} />
        </div>

        {/* 7. Location Connectivity */}
        <div id="location">
          <ProjectLocation locationHighlights={project.locationHighlights || []} location={project.location} />
        </div>

        {/* 8. Lead Conversion Form & EMI */}
        <div id="enquiry" className="container mx-auto px-6 max-w-7xl">
          <EmiCalculator />
          <EnquiryForm projectName={project.name} />
        </div>

        {/* Statutory Compliance Footer */}
        <div className="border-t border-white/5 py-12">
          <div className="container mx-auto px-6 max-w-7xl text-center">
             {project.maharera && project.maharera.length > 0 ? (
               <div className="mb-4">
                 <p className="text-luxury-caption text-luxury-silver mb-2">MahaRERA Registration Numbers:</p>
                 <p className="text-sm font-display text-luxury-gold">{project.maharera.join(' | ')}</p>
               </div>
             ) : (
               <p className="text-luxury-caption text-luxury-silver mb-4">MahaRERA Registration Number: Awaited</p>
             )}
             <p className="text-[8px] tracking-widest text-white/30 uppercase max-w-3xl mx-auto leading-relaxed">
               The project has been registered via MahaRERA registration number and is available on the website maharera.mahaonline.gov.in under registered projects. 
               Images are for representation purpose only.
             </p>
          </div>
        </div>
      </article>
    </>
  );
}
