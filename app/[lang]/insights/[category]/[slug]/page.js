import { notFound } from 'next/navigation';
import insightsData from '@/app/data/insights.json';
import Link from 'next/link';

export async function generateStaticParams() {
  const params = [];
  const langs = ['en', 'mr', 'hi'];
  
  for (const lang of langs) {
    for (const post of insightsData) {
      params.push({ lang, category: post.category, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const post = insightsData.find(p => p.slug === params.slug);
  if (!post) return {};
  
  return {
    title: `${post.title} | VTP Realty Insights`,
    description: post.content.substring(0, 160) + '...',
  };
}

export default function InsightPage({ params }) {
  const post = insightsData.find(p => p.slug === params.slug);
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-luxury-charcoal pt-32 pb-20 px-4">
      {/* AI Overview Specific Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "author": {
              "@type": "Organization",
              "name": post.author
            },
            "datePublished": post.date,
            "articleBody": post.content
          })
        }}
      />

      <article className="max-w-4xl mx-auto bg-luxury-navy p-8 md:p-12 rounded-2xl border border-white/5">
        <div className="mb-8">
          <Link href={`/${params.lang}/insights`} className="text-luxury-gold uppercase tracking-wider text-sm font-semibold hover:text-white transition-colors">
            {post.category.replace('-', ' ')}
          </Link>
          <h1 className="text-3xl md:text-5xl font-heading text-luxury-white mt-4 mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center text-luxury-silver text-sm space-x-4">
            <span>By {post.author}</span>
            <span>•</span>
            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        <div className="prose prose-invert prose-lg prose-headings:font-heading prose-headings:text-luxury-gold prose-p:text-luxury-silver prose-a:text-luxury-gold hover:prose-a:text-white max-w-none leading-relaxed">
          <p>{post.content}</p>
          {/* In a real production setup, this content would be rich HTML or MDX parsed via a CMS */}
        </div>
      </article>
    </div>
  );
}
