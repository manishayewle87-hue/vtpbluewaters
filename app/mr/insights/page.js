import Image from 'next/image';
import Link from 'next/link';
import { articleEngine } from '@/app/services/articleEngine';

export const metadata = {
  title: 'VTP Realty Insights & Market Reports | Knowledge Hub',
  description: 'Stay ahead of the market with exclusive investment guides, luxury lifestyle articles, and comprehensive Pune real estate market reports by VTP Realty.',
  alternates: {
    canonical: 'https://vtpbluewaters.com/insights',
  }
};

export default async function InsightsHub() {
  const lang = 'mr';
  const allArticles = await articleEngine.getAllArticles();
  const categories = await articleEngine.getAllCategories();
  
  const heroArticle = allArticles[0];
  const remainingArticles = allArticles.slice(1);

  return (
    <article className="min-h-screen bg-luxury-navy">
      {/* Hub Header */}
      <header className="pt-16 lg:pt-32 pb-16 border-b border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
              <div className="text-luxury-gold text-sm tracking-widest uppercase mb-4">The Editorial</div>
              <h1 className="text-display-lg font-display font-light text-white leading-tight">
                Market <span className="italic text-luxury-silver">Insights</span> & <br />
                Investment Guides
              </h1>
            </div>
            
            <div className="flex gap-4 flex-wrap">
              <Link href="/insights" className="px-4 py-2 border border-luxury-gold text-luxury-gold text-sm transition-colors hover:bg-luxury-gold hover:text-luxury-navy">
                All
              </Link>
              {categories.map(cat => (
                <Link key={cat.slug} href={`/insights/${cat.slug}`} className="px-4 py-2 border border-white/20 text-white text-sm transition-colors hover:border-luxury-gold hover:text-luxury-gold">
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* Hero Article */}
          {heroArticle && (
            <Link href={`/insights/${heroArticle.category}/${heroArticle.slug}`} className="group block mb-12 lg:mb-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/10 group-hover:border-luxury-gold/50 transition-colors">
                <div className="relative h-[400px] lg:h-auto overflow-hidden">
                  <Image src={heroArticle.image} alt={heroArticle.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-12 lg:p-20 bg-luxury-charcoal flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-xs text-luxury-silver uppercase tracking-widest mb-6">
                    <span className="text-luxury-gold">{heroArticle.categoryLabel}</span>
                    <span>•</span>
                    <span>{heroArticle.readTime}</span>
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-display font-light text-white mb-6 leading-tight group-hover:text-luxury-gold transition-colors">
                    {heroArticle.title}
                  </h2>
                  <p className="text-luxury-silver font-light leading-relaxed mb-8 text-lg">
                    {heroArticle.excerpt}
                  </p>
                  <div className="text-luxury-gold text-sm uppercase tracking-widest flex items-center gap-2">
                    Read Editorial <span>→</span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingArticles.map(article => (
              <Link key={article.id} href={`/insights/${article.category}/${article.slug}`} className="group block h-full">
                <div className="bg-luxury-charcoal border border-white/5 group-hover:border-luxury-gold/30 transition-all duration-500 flex flex-col h-full">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-luxury-navy/80 backdrop-blur text-luxury-gold text-xs uppercase px-3 py-1 border border-luxury-gold/30">
                      {article.categoryLabel}
                    </div>
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
