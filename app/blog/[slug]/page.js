import contentData from '@/app/data/content-hub.json';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import ArticleSchema from '@/app/components/seo/ArticleSchema';







export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cms = require('../../services/cms').cms;
  const blog = await cms.getBlogBySlug(slug);
  if (!blog) return { title: 'Not Found' };

  const url = `https://vtpbluewaters.com/blog/${slug}`;
  const title = `${blog.title} | VTP Blue Waters Real Estate Insights`;
  const description = `${blog.excerpt || blog.content?.substring(0, 155) || 'Comprehensive real estate insights for Mahalunge and Baner Annex.'}...`;
  const image = blog.image || 'https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg';

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: blog.createdAt || new Date().toISOString(),
      modifiedTime: blog.updatedAt || blog.createdAt || new Date().toISOString(),
      images: [{ url: image, width: 1200, height: 630, alt: blog.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  };
}

export default async function BlogPostPage({   params }) {
  const { slug, lang } = await params;
  const cms = require('../../services/cms').cms;
  const blog = await cms.getBlogBySlug(slug);

  if (!blog) {
    return <div className="min-h-screen pt-16 lg:pt-32 text-center text-white">Blog not found.</div>;
  }

  const url = `https://vtpbluewaters.com/blog/${slug}`;
  const image = blog.image || 'https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg';

  return (
    <div className="min-h-screen bg-luxury-navy pt-16 lg:pt-32 pb-12 lg:pb-24">
      <ArticleSchema
        headline={blog.title}
        description={blog.excerpt || blog.content?.substring(0, 160) || ''}
        url={url}
        image={image}
        datePublished={blog.createdAt ? new Date(blog.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
        dateModified={blog.updatedAt ? new Date(blog.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
        keywords={blog.tags || ['Pune real estate', 'VTP Realty', 'Mahalunge apartments']}
        wordCount={blog.content?.split(' ').length || 800}
      />
      <div className="container mx-auto px-6 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-luxury-gold hover:text-white transition-colors mb-12 text-sm uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <div className="mb-12 border-b border-white/10 pb-12">
          <span className="text-luxury-gold text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
            {blog.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-light text-luxury-white mb-6 leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-luxury-silver font-light">
            <span className="flex items-center gap-2"><Calendar size={14} /> {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            <span className="flex items-center gap-2"><User size={14} /> VTP Insights Team</span>
          </div>
        </div>

        <article className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-light prose-headings:text-luxury-white prose-p:text-luxury-silver prose-p:font-light prose-a:text-luxury-gold prose-strong:text-white">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const cms = require('../../services/cms').cms;
  const blogs = await cms.getAllBlogs();
  const params = [];
  for (const blog of blogs) {
      params.push({ slug: blog.slug });
    }
  return params;
}
