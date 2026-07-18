import Link from 'next/link';
import Image from 'next/image';
import { cms } from '@/app/services/cms';

export const metadata = {
  title: 'VTP Blue Waters Blog | Real Estate Insights & News',
  description: 'Stay updated with the latest news, luxury lifestyle guides, design ideas, and investment reviews from VTP Blue Waters in Mahalunge, Pune.',
  alternates: { canonical: 'https://vtpbluewaters.com/blog' },
  openGraph: {
    title: 'VTP Blue Waters Blog | Real Estate Insights & News',
    description: 'Latest news, luxury lifestyle guides, design ideas, and investment reviews from VTP Blue Waters.',
    url: 'https://vtpbluewaters.com/blog',
    siteName: 'VTP Blue Waters',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: 'https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg', width: 1200, height: 630, alt: 'VTP Blue Waters Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@VTPRealty',
    title: 'VTP Blue Waters Blog | Real Estate Insights',
    description: 'Latest news and luxury lifestyle guides from VTP Blue Waters.',
    images: ['https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg'],
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
};

export default async function BlogRootPage() {
  const blogs = await cms.getAllBlogs();

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://vtpbluewaters.com/blog#collectionpage',
    'name': 'VTP Blue Waters Real Estate Blog',
    'description': 'Latest real estate news, luxury lifestyle guides, and project reviews from VTP Blue Waters.',
    'url': 'https://vtpbluewaters.com/blog',
    'publisher': { '@id': 'https://vtpbluewaters.com/#organization' },
    'isPartOf': { '@id': 'https://vtpbluewaters.com/#website' },
    'hasPart': blogs.slice(0, 15).map((blog, i) => ({
      '@type': 'BlogPosting',
      'position': i + 1,
      'name': blog.title,
      'url': `https://vtpbluewaters.com/blog/${blog.slug}`,
      'datePublished': blog.date || '2026-07-01',
      'image': blog.image || 'https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg',
    }))
  };

  return (
    <div className="min-h-screen bg-luxury-navy pt-24 lg:pt-36 pb-24 relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-luxury-gold/5 blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-900/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-luxury-gold text-xs font-bold tracking-[0.3em] uppercase block mb-4">Official Journal</span>
          <h1 className="text-4xl md:text-6xl font-display font-light text-white mb-6">
            The <span className="text-luxury-gold italic font-normal">Blue Waters</span> Blog
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Discover articles on urban design, local infrastructure developments, township living, and smart property investment strategies.
          </p>
        </div>

        {/* Blog Post List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => {
            const blogImage = blog.image || 'https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg';
            return (
              <Link 
                key={blog.slug} 
                href={`/blog/${blog.slug}`}
                className="group block h-full border border-white/5 bg-white/[0.02] hover:border-luxury-gold/30 hover:bg-white/[0.04] transition-all duration-300 rounded-2xl overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={blogImage} 
                    alt={blog.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 bg-luxury-navy/80 backdrop-blur text-luxury-gold text-xs uppercase tracking-widest px-3 py-1 border border-luxury-gold/20">
                    {blog.category || 'Insights'}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col justify-between h-[240px]">
                  <div>
                    <h2 className="text-xl font-display text-white group-hover:text-luxury-gold transition-colors line-clamp-2 leading-snug mb-3">
                      {blog.title}
                    </h2>
                    <p className="text-gray-400 text-sm font-light line-clamp-3 leading-relaxed">
                      {blog.excerpt || (blog.content && blog.content.replace(/<[^>]*>/g, '').substring(0, 140)) || 'Comprehensive real estate insights and updates.'}...
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500 uppercase tracking-widest pt-4 border-t border-white/5">
                    <span>{blog.date || 'July 2026'}</span>
                    <span className="text-luxury-gold font-bold group-hover:underline">Read Article →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
