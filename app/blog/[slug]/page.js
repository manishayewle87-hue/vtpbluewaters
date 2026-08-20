import contentData from '@/app/data/content-hub.json';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import ArticleSchema from '@/app/components/seo/ArticleSchema';
import { cms } from '@/app/services/cms';

export async function generateMetadata({ params }) {
  const { slug } = await params;
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

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = await cms.getBlogBySlug(slug);

  if (!blog) {
    return <div className="min-h-screen pt-16 lg:pt-32 text-center text-white">Blog not found.</div>;
  }

  const url = `https://vtpbluewaters.com/blog/${slug}`;
  const image = blog.image || 'https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg';

  return (
    <div className="min-h-screen bg-luxury-navy pt-16 lg:pt-32 pb-12 lg:pb-24">
      <ArticleSchema article={blog} />
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-luxury-gold hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to Insights
        </Link>
        <header className="mb-12">
          <span className="text-xs uppercase tracking-widest text-luxury-gold mb-3 block">{blog.category}</span>
          <h1 className="text-display-sm md:text-display-md font-display font-light text-white mb-6 leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-luxury-silver border-y border-white/10 py-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-luxury-gold" />
              <span>{blog.author || 'VTP Research'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-luxury-gold" />
              <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent'}</span>
            </div>
          </div>
        </header>
        <article className="prose prose-invert prose-gold max-w-none text-luxury-silver font-light leading-relaxed">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const blogs = await cms.getAllBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}
