import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articleEngine } from '@/app/services/articleEngine';







export async function generateMetadata({ params }) {
  const { category } = await params;
  const categories = await articleEngine.getAllCategories();
  const catData = categories.find(c => c.slug === category);
  
  if (!catData) {
    return { title: 'Not Found' };
  }

  const title = `${catData.label} | VTP Realty Insights`;
  const description = `Explore our latest ${catData.label.toLowerCase()} to stay informed about Pune's luxury real estate market. Expert analysis from VTP Realty's research team.`;
  const url = `https://vtpbluewaters.com/insights/${category}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [{ url: 'https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg'],
    },
  };
}

export default async function CategoryArchive({   params }) {
  const lang = 'en';
  const { category } = await params;
  const categories = await articleEngine.getAllCategories();
  const catData = categories.find(c => c.slug === category);

  if (!catData) {
    notFound();
  }

  const articles = await articleEngine.getArticlesByCategory(category);
  const url = `https://vtpbluewaters.com/insights/${category}`;

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collectionpage`,
    'name': `${catData.label} | VTP Realty Insights`,
    'description': `Expert ${catData.label.toLowerCase()} from VTP Realty's Senior Real Estate Analysts.`,
    'url': url,
    'isPartOf': { '@id': 'https://vtpbluewaters.com/#website' },
    'publisher': { '@id': 'https://vtpbluewaters.com/#organization' },
    'inLanguage': 'en-IN',
    'hasPart': articles.slice(0, 8).map(a => ({
      '@type': 'Article',
      'name': a.title,
      'url': `https://vtpbluewaters.com/insights/${a.category}/${a.slug}`,
      'image': a.image,
      'datePublished': a.date,
    })),
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://vtpbluewaters.com' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Insights', 'item': 'https://vtpbluewaters.com/insights' },
        { '@type': 'ListItem', 'position': 3, 'name': catData.label, 'item': url },
      ],
    },
  };

  return (
    <article className="min-h-screen bg-luxury-navy">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <header className="pt-16 lg:pt-32 pb-16 border-b border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
              <Link href="/insights" className="text-luxury-silver text-sm hover:text-luxury-gold transition-colors mb-4 inline-block">← Back to Insights</Link>
              <h1 className="text-display-lg font-display font-light text-white leading-tight">
                {catData.label}
              </h1>
            </div>
            
            <div className="flex gap-4 flex-wrap">
              <Link href="/insights" className="px-4 py-2 border border-white/20 text-white text-sm transition-colors hover:border-luxury-gold hover:text-luxury-gold">
                All
              </Link>
              {categories.map(cat => (
                <Link key={cat.slug} href={`/insights/${cat.slug}`} className={`px-4 py-2 border text-sm transition-colors ${cat.slug === category ? 'border-luxury-gold text-luxury-gold' : 'border-white/20 text-white hover:border-luxury-gold hover:text-luxury-gold'}`}>
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <Link key={article.id} href={`/insights/${article.category}/${article.slug}`} className="group block h-full">
                <div className="bg-luxury-charcoal border border-white/5 group-hover:border-luxury-gold/30 transition-all duration-500 flex flex-col h-full">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-display text-white mb-4 group-hover:text-luxury-gold transition-colors leading-snug">{article.title}</h3>
                    <p className="text-luxury-silver font-light text-sm line-clamp-3 mb-6 flex-grow">
                      {article.excerpt}
                    </p>
                    <div className="flex justify-between items-center text-xs text-luxury-silver uppercase tracking-widest">
                      <span>{article.date}</span>
                      <span className="text-luxury-gold group-hover:underline">Read →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </article>
  );
}

export async function generateStaticParams() {
  const categories = ['market-trends', 'investment', 'lifestyle', 'guides'];
  const params = [];
  for (const category of categories) {
      params.push({ category });
    }
  return params;
}
