import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PUNE_MICRO_MARKETS, getProjectsNearLocation, generateLocationContent } from '@/app/services/locationEngine';
import EnquiryForm from '@/app/components/project/EnquiryForm';

// We import the same intents as the main project pages to keep the matrix consistent
const KEYWORD_INTENTS = [
  'price', 'floor-plan', 'brochure', 'reviews', 'amenities', 
  'payment-plan', 'virtual-tour', 'gallery', 'maharera', 
  'investment', 'location', 'offers',
  // Configuration Intents
  '2-bhk', '2-5-bhk', '3-bhk', '3-5-bhk', '4-bhk', '5-bhk',
  'penthouse', 'duplex', 'sky-villa',
  // Property Typology Intents
  'apartments', 'luxury-apartments', 'townships',
  // POI (Point of Interest) Intents
  'near-metro', 'near-it-parks', 'near-schools', 'near-hospitals'
];

export async function generateStaticParams() {
  const params = [];
  
  PUNE_MICRO_MARKETS.forEach((location) => {
    KEYWORD_INTENTS.forEach((intent) => {
      params.push({
        location: location.slug,
        intent: intent,
      });
    });
  });
  
  return params;
}

export async function generateMetadata({ params }) {
  const { location, intent } = await params;
  
  const locData = PUNE_MICRO_MARKETS.find(l => l.slug === location);
  if (!locData || !KEYWORD_INTENTS.includes(intent)) {
    return { title: 'Not Found' };
  }
  
  const displayIntent = intent.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const title = `VTP Projects: ${displayIntent} in ${locData.name} | Latest 2026 Details`;
  const description = `Explore premium VTP Realty projects offering ${displayIntent.toLowerCase()} in and around ${locData.name}, Pune. Discover floor plans, prices, and exclusive offers.`;
  
  return {
    title,
    description,
    alternates: {
      canonical: `https://vtpbluewaters.com/locations/${location}/${intent}`,
    }
  };
}

export default async function LocationIntentDetail({ params }) {
  const { location, intent } = await params;
  
  const locData = PUNE_MICRO_MARKETS.find(l => l.slug === location);
  if (!locData || !KEYWORD_INTENTS.includes(intent)) {
    notFound();
  }

  const projects = await getProjectsNearLocation(location);
  const displayIntent = intent.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const { content, faqs, isExactLocation } = generateLocationContent(locData.name, projects, intent);
  
  const heroTitle = isExactLocation ? `${displayIntent} in ${locData.name}` : `${displayIntent} near ${locData.name}`;

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="min-h-screen bg-luxury-navy">
        {/* Location Hero */}
        <header className="relative h-[50vh] flex items-center justify-center border-b border-luxury-gold/20">
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-navy via-luxury-navy to-luxury-charcoal z-0"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0"></div>
          
          <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center mt-20">
            <div className="text-luxury-label text-luxury-gold mb-4">Location Spotlight: {locData.zone} Pune</div>
            <h1 className="text-display-md font-display font-light mb-6 text-white">
              {heroTitle}
            </h1>
            <p className="text-lg font-light text-luxury-silver/80">
              Discover ultra-luxury VTP Realty masterpieces curated for your exact requirements in the thriving micro-market of {locData.name}.
            </p>
          </div>
        </header>

        <main className="py-24">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* Left Column: Semantic Content Engine */}
              <div className="lg:col-span-7">
                <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-light prose-h2:text-3xl prose-h2:text-luxury-gold prose-h3:text-2xl prose-h3:text-white prose-p:text-luxury-silver prose-p:font-light prose-p:leading-relaxed prose-li:text-luxury-silver prose-li:font-light">
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

                {/* FAQs */}
                <div className="mt-16 pt-12 border-t border-white/10">
                  <h3 className="text-2xl font-display font-light mb-8 text-white">Frequently Asked Questions</h3>
                  <div className="space-y-6">
                    {faqs.map((faq, i) => (
                      <div key={i}>
                        <h4 className="text-lg text-luxury-gold mb-2 font-medium">{faq.q}</h4>
                        <p className="text-luxury-silver font-light leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Aggregated Project Cards & Sticky Form */}
              <div className="lg:col-span-5 relative">
                <div className="sticky top-24 space-y-8">
                  
                  {/* Recommended Projects Map */}
                  <div className="bg-luxury-charcoal/50 border border-white/10 p-6 rounded-lg backdrop-blur-sm">
                    <h3 className="text-xl font-display text-white mb-6">Recommended Projects {isExactLocation ? 'in' : 'near'} {locData.name}</h3>
                    <div className="space-y-4">
                      {projects.map(p => (
                        <Link href={`/projects/${p.slug}/${intent}`} key={p.id} className="block group">
                          <div className="flex items-center gap-4 p-3 rounded bg-white/5 border border-white/5 group-hover:border-luxury-gold/50 transition-colors">
                            <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                              <Image src={p.image} alt={p.name} fill className="object-cover" />
                            </div>
                            <div>
                              <div className="text-white text-sm font-medium group-hover:text-luxury-gold transition-colors">{p.name}</div>
                              <div className="text-luxury-silver text-xs">{p.location}</div>
                            </div>
                          </div>
                        </Link>
                      ))}
                      {projects.length === 0 && (
                        <p className="text-luxury-silver text-sm">Currently mapping new exclusive inventory...</p>
                      )}
                    </div>
                  </div>

                  {/* High-Converting Form */}
                  <div className="bg-luxury-charcoal border border-luxury-gold/20 p-8">
                    <h3 className="text-2xl font-display text-white mb-2">Request Information</h3>
                    <p className="text-luxury-silver text-sm mb-6">Get the official {displayIntent.toLowerCase()} for projects near {locData.name}.</p>
                    <EnquiryForm projectName={`Location: ${locData.name}`} customTitle="Unlock Details" />
                  </div>
                  
                </div>
              </div>

            </div>
          </div>
        </main>
      </article>
    </>
  );
}
