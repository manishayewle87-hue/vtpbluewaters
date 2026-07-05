import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articleEngine } from '@/app/services/articleEngine';

export const runtime = 'edge';

export async function generateStaticParams() {
  const categories = await articleEngine.getAllCategories();
  return categories.map((cat) => ({
    category: cat.slug}));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const categories = await articleEngine.getAllCategories();
  const catData = categories.find(c => c.slug === category);
  
  if (!catData) {
    return { title: 'Not Found' };
  }
  
  return {
    title: `${catData.label} | VTP Realty Insights`,
    description: `Explore our latest ${catData.label.toLowerCase()} to stay informed about Pune's luxury real estate market.`,
    alternates: {
      canonical: `https://vtpbluewaters.com/insights/${category}`}
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

  return (
    <article className="min-h-screen bg-luxury-navy">
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
