import { notFound } from 'next/navigation';
import insightsData from '@/app/data/insights.json';
import Link from 'next/link';
import ArticleSchema from '@/app/components/seo/ArticleSchema';







export async function generateMetadata({ params }) {
  const post = insightsData.find(p => p.slug === params.slug);
  if (!post) return {};

  const url = `https://vtpbluewaters.com/insights/${params.category}/${params.slug}`;
  const title = `${post.title} | VTP Realty Insights`;
  const description = post.excerpt || post.content.substring(0, 160) + '...';

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'VTP Blue Waters',
      type: 'article',
      locale: 'en_IN',
      publishedTime: post.date,
      modifiedTime: post.updatedDate || post.date,
      authors: [`https://vtpbluewaters.com`],
      images: [{ url: post.image || 'https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg', width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: 'summary_large_image', site: '@VTPRealty', title, description, images: [post.image || 'https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg'] },
    robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  };
}

export default async function InsightPage({   params }) {
  const lang = 'en';
  const post = insightsData.find(p => p.slug === params.slug);
  if (!post) {
    notFound();
  }

  const url = `https://vtpbluewaters.com/insights/${params.category}/${post.slug}`;

  return (
    <div className="min-h-screen bg-luxury-charcoal pt-16 lg:pt-32 pb-20 px-4">
      <ArticleSchema
        headline={post.title}
        description={post.excerpt || post.content.substring(0, 160)}
        url={url}
        image={post.image}
        datePublished={post.date}
        dateModified={post.updatedDate || post.date}
        authorName={post.author || 'VTP Realty Research Team'}
        keywords={post.tags || ['Pune real estate', 'VTP Realty', 'luxury apartments Pune']}
        wordCount={post.content?.split(' ').length || 800}
      />

      <article className="max-w-4xl mx-auto bg-luxury-navy p-8 md:p-12 rounded-2xl border border-white/5">
        <div className="mb-8">
          <Link href={`/insights`} className="text-luxury-gold uppercase tracking-wider text-sm font-semibold hover:text-white transition-colors">
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

export async function generateStaticParams() {
  const cms = require('../../../services/cms').cms;
  const blogs = await cms.getAllBlogs();
  const params = [];
  // For simplicity, generate all combinations
  const categories = ['market-trends', 'investment', 'lifestyle', 'guides'];
  for (const category of categories) {
      for (const blog of blogs) {
        params.push({ category, slug: blog.slug });
      }
    }
  return params;
}
