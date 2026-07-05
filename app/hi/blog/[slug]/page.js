import contentData from '@/app/data/content-hub.json';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const runtime = 'edge';




export function generateMetadata({ params }) {
  const blog = contentData.blogs.find(b => b.slug === params.slug);
  if (!blog) return { title: 'Not Found' };
  
  return {
    title: `${blog.title} | VTP Bluewaters Real Estate Insights`,
    description: `Read about ${blog.title}. Comprehensive real estate insights for Mahalunge and Baner Annex.`
  };
}

export default function BlogPostPage({   params }) {
  const lang = 'hi';
  const blog = contentData.blogs.find(b => b.slug === params.slug);

  if (!blog) {
    return <div className="min-h-screen pt-16 lg:pt-32 text-center text-white">Blog not found.</div>;
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "datePublished": new Date().toISOString().split('T')[0],
    "author": [{
        "@type": "Organization",
        "name": "VTP Insights Team",
        "url": "https://vtpbluewaters.com"
    }]
  };

  return (
    <div className="min-h-screen bg-luxury-navy pt-16 lg:pt-32 pb-12 lg:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
