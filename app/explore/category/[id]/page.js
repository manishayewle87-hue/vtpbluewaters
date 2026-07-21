import Link from 'next/link';
import { notFound } from 'next/navigation';
import { seoSilos } from '@/app/data/seo-silos';

export function generateStaticParams() {
  return seoSilos.map((silo) => ({
    id: silo.id,
  }));
}

export function generateMetadata({ params }) {
  const silo = seoSilos.find((s) => s.id === params.id);
  if (!silo) return {};

  return {
    title: `${silo.title} | VTP Blue Waters Property Directory`,
    description: silo.description,
    alternates: { canonical: `https://vtpbluewaters.com/explore/category/${silo.id}` },
    robots: { index: true, follow: true },
  };
}

export default function CategorySpokePage({ params }) {
  const silo = seoSilos.find((s) => s.id === params.id);
  
  if (!silo) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#050914] pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-luxury-gold/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Breadcrumbs */}
        <nav className="mb-8 flex text-sm text-gray-500 font-inter" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-luxury-gold transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/explore" className="hover:text-luxury-gold transition-colors">Directory</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">{silo.title}</span>
        </nav>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-outfit font-light text-white mb-4">
            {silo.title}
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg font-inter">
            {silo.description}
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {silo.slugs.map((item) => (
              <Link 
                key={item.slug} 
                href={`/explore/${item.slug}`}
                prefetch={false}
                className="text-gray-300 hover:text-white hover:underline text-sm font-inter flex items-start gap-3 group transition-colors p-2 rounded-lg hover:bg-white/5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold/50 group-hover:bg-luxury-gold transition-colors mt-1.5 flex-shrink-0" />
                <span className="leading-snug">{item.keyword}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
