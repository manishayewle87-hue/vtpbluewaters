import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cms } from '@/app/services/cms';
import { generateStrategicContent } from '@/app/services/contentEngine';
import ProjectTabs from '@/app/components/project/ProjectTabs';
import ProjectAmenities from '@/app/components/project/ProjectAmenities';
import ProjectSpecs from '@/app/components/project/ProjectSpecs';
import ProjectLocation from '@/app/components/project/ProjectLocation';
import EnquiryForm from '@/app/components/project/EnquiryForm';
import ProjectMasterLayout from '@/app/components/project/ProjectMasterLayout';
import ProjectFloorPlans from '@/app/components/project/ProjectFloorPlans';

const KEYWORD_INTENTS = [
  'price', 'floor-plan', 'brochure', 'amenities', 'location', 'luxury-apartments'
];

export async function generateStaticParams() {
  const projects = await cms.getAllProjects();
  const params = [];
  
  // Cross-multiply every project with every intent
  projects.forEach((project) => {
    KEYWORD_INTENTS.forEach((intent) => {
      params.push({
        slug: project.slug,
        intent: intent});
    });
  });
  
  return params;
}

// Generate dynamic, hyper-specific metadata for the pSEO page
export async function generateMetadata({ params }) {
  const { slug, intent } = await params;
  const project = await cms.getProjectBySlug(slug);
  
  if (!project || !KEYWORD_INTENTS.includes(intent)) {
    return { title: 'Not Found' };
  }
  
  // Format intent for title (e.g., 'floor-plan' -> 'Floor Plan')
  const formattedIntent = intent.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const title = `${project.name} ${formattedIntent} | Latest 2026 Details & Offers`;
  const description = `Discover the official ${formattedIntent.toLowerCase()} for ${project.name} in ${project.location.split(',')[0]}. Get exclusive insights, downloadable resources, and premium details.`;
  
  return {
    title,
    description,
    alternates: {
      canonical: `https://vtpbluewaters.com/${params.lang}/projects/${project.slug}/${intent}`},
    openGraph: {
      title,
      description,
      images: [project.image],
      type: 'website'}};
}

export default async function ProjectIntentDetail({   params }) {
  const lang = 'mr';
  const { slug, intent } = await params;
  const project = await cms.getProjectBySlug(slug);

  if (!project || !KEYWORD_INTENTS.includes(intent)) {
    notFound();
  }

  // Format intent for display
  const displayIntent = intent.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  // Generate Strategic Content
  const { content, faqs } = generateStrategicContent(project, intent);

  // Structured Data specific to the intent + FAQ Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ApartmentComplex',
    name: `${project.name} ${displayIntent}`,
    description: `Official details regarding ${displayIntent} for ${project.name}.`,
    url: `https://vtpbluewaters.com/${params.lang}/projects/${project.slug}/${intent}`,
    image: project.image,
    parentOrganization: {
      "@id": "https://vtpbluewaters.com/#organization"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="min-h-screen bg-luxury-navy">
        {/* Intent Hero Section */}
        <header className="relative h-[60vh] flex items-end pb-20 border-b border-luxury-gold/20">
          <div className="absolute inset-0 z-0">
            <Image 
              src={project.image} 
              alt={`${project.name} ${displayIntent}`}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-30 scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy via-luxury-navy/80 to-transparent"></div>
          </div>
          
          <div className="container relative z-10 mx-auto px-6 max-w-7xl">
            <Link href={`/${params.lang}/projects/${project.slug}`} className="inline-flex items-center gap-2 text-luxury-caption text-luxury-silver hover:text-luxury-gold transition-colors mb-8">
              <span>←</span> Back to Main Project
            </Link>
            
            <div className="text-luxury-label text-luxury-gold mb-4">{project.name}</div>
            <h1 className="text-display-md font-display font-light mb-6 text-white">
              <span className="text-luxury-silver italic">{displayIntent}</span> Overview
            </h1>
            <p className="text-lg font-light text-luxury-silver/80 max-w-2xl">
              Comprehensive details and official information regarding the {displayIntent.toLowerCase()} for {project.name}.
            </p>
          </div>
        </header>

        {/* Intent Navigation (Cross-linking pSEO pages) */}
        <div className="border-b border-white/5 bg-white/[0.02] sticky top-0 z-40 backdrop-blur-md">
          <div className="container mx-auto px-6 max-w-7xl overflow-x-auto">
            <div className="flex gap-8 py-4 w-max">
              {KEYWORD_INTENTS.map(k => (
                <Link 
                  key={k} 
                  href={`/${params.lang}/projects/${project.slug}/${k}`}
                  className={`text-sm tracking-wider uppercase whitespace-nowrap transition-colors ${intent === k ? 'text-luxury-gold font-medium' : 'text-luxury-silver hover:text-white'}`}
                >
                  {k.replace(/-/g, ' ')}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Content Injection based on Intent */}
        <main className="py-12 lg:py-24">

          {/* === EXPANSIVE CONTENT ENGINE (MAGAZINE LAYOUT) === */}
          <section className="container mx-auto px-6 max-w-4xl mb-12 lg:mb-24">
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-light prose-h2:text-4xl prose-h2:text-luxury-gold prose-h3:text-2xl prose-h3:text-white prose-p:text-luxury-silver prose-p:font-light prose-p:leading-relaxed prose-li:text-luxury-silver prose-li:font-light">
              {content.map((block, i) => {
                if (block.type === 'h2') return <h2 key={i} className="mb-6">{block.text}</h2>;
                if (block.type === 'h3') return <h3 key={i} className="mt-12 mb-4">{block.text}</h3>;
                if (block.type === 'p') return <p key={i} className="mb-6">{block.text}</p>;
                if (block.type === 'ul') return (
                  <ul key={i} className="space-y-3 mb-8">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-luxury-gold flex-shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
                return null;
              })}
            </div>

            {/* Dynamic FAQs */}
            {faqs.length > 0 && (
              <div className="mt-16 pt-12 border-t border-white/10">
                <h3 className="text-2xl font-display font-light mb-8">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  {faqs.map((faq, i) => (
                    <div key={i}>
                      <h4 className="text-lg text-white mb-2 font-medium">{faq.q}</h4>
                      <p className="text-luxury-silver font-light leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Specific Intent Modules (If applicable) */}
          {intent === 'floor-plan' && (
            <div className="mb-12 lg:mb-24">
              <ProjectFloorPlans floorPlans={project.floorPlans} projectName={project.name} />
            </div>
          )}

          {intent === 'amenities' && (
            <div className="mb-12 lg:mb-24">
              <ProjectAmenities amenities={project.amenities || []} />
            </div>
          )}

          {intent === 'location' && (
            <div className="mb-12 lg:mb-24">
              <ProjectLocation locationHighlights={project.locationHighlights || []} location={project.location} />
            </div>
          )}

          {/* Generic Intent Catch-all Form */}
          {['price', 'brochure', 'reviews', 'payment-plan', 'virtual-tour', 'gallery', 'maharera', 'investment', 'offers', '2-bhk', '2-5-bhk', '3-bhk', '3-5-bhk', '4-bhk', '5-bhk', 'penthouse', 'duplex', 'sky-villa'].includes(intent) && (
            <section className="container mx-auto px-6 max-w-4xl text-center mb-12 lg:mb-24">
              <div className="bg-luxury-charcoal border border-luxury-gold/20 p-12 lg:p-20 relative overflow-hidden group">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-luxury-gold to-transparent opacity-50"></div>
                <h2 className="text-3xl lg:text-5xl font-display font-light mb-6">Request Official <span className="italic text-luxury-silver">{displayIntent}</span></h2>
                <p className="text-luxury-silver font-light text-lg mb-12">
                  Due to high demand and strict compliance, the complete {displayIntent.toLowerCase()} for {project.name} is available upon request. Register below for instant access.
                </p>
                <EnquiryForm projectName={project.name} customTitle={`Unlock ${displayIntent}`} />
              </div>
            </section>
          )}

          {/* Always show Enquiry Form at bottom if not already shown in catch-all */}
          {!['price', 'brochure', 'reviews', 'payment-plan', 'virtual-tour', 'gallery', 'maharera', 'investment', 'offers', '2-bhk', '2-5-bhk', '3-bhk', '3-5-bhk', '4-bhk', '5-bhk', 'penthouse', 'duplex', 'sky-villa'].includes(intent) && (
            <div className="mt-12 lg:mt-24">
               <EnquiryForm projectName={project.name} />
            </div>
          )}
        </main>
      </article>
    </>
  );
}
