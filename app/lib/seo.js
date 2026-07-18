/**
 * Enterprise SEO Metadata Engine
 * 
 * Centralizes the generation of title, description, openGraph, and twitter
 * metadata across all page types for programmatic consistency.
 * 
 * Usage:
 *   import { generateProjectMeta, generateLocationMeta, generateBlogMeta } from '@/app/lib/seo';
 */

const BASE_URL = 'https://vtpbluewaters.com';
const SITE_NAME = 'VTP Blue Waters';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.jpg`;

// ─── Project Page Metadata ───
export function generateProjectMeta(project, lang = 'en') {
  if (!project) return { title: 'Project Not Found | VTP Blue Waters' };

  const location = project.location?.split(',')[0]?.trim() || 'Pune';
  const title = project.seoTitle || `${project.name} in ${location} | Luxury Residences by VTP Realty`;
  const description = project.seoDescription || 
    `Experience ultra-luxury living at ${project.name}, ${location}. Explore master plan, floor plans, amenities, and pricing. RERA registered project by VTP Realty.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/projects/${project.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${lang === 'en' ? '/' : '/' + lang + '/'}projects/${project.slug}`,
      siteName: SITE_NAME,
      images: [{ url: project.image || DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: project.name }],
      type: 'website',
      locale: lang === 'en' ? 'en_IN' : lang === 'hi' ? 'hi_IN' : 'mr_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.image || DEFAULT_OG_IMAGE],
    },
  };
}

// ─── Project Intent Page Metadata ───
export function generateProjectIntentMeta(project, intent, lang = 'en') {
  if (!project) return { title: 'Not Found | VTP Blue Waters' };

  const formattedIntent = formatIntent(intent);
  const location = project.location?.split(',')[0]?.trim() || 'Pune';
  const title = `${project.name} ${formattedIntent} | Latest ${new Date().getFullYear()} Details & Offers`;
  const description = `Discover the official ${formattedIntent.toLowerCase()} for ${project.name} in ${location}. Get exclusive insights, downloadable resources, and premium details from VTP Realty.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/projects/${project.slug}/${intent}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${lang === 'en' ? '/' : '/' + lang + '/'}projects/${project.slug}/${intent}`,
      siteName: SITE_NAME,
      images: [{ url: project.image || DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `${project.name} ${formattedIntent}` }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// ─── Location Page Metadata ───
export function generateLocationMeta(location, lang = 'en') {
  if (!location) return { title: 'Location Not Found | VTP Blue Waters' };

  const title = `Top Luxury Real Estate in ${location.name}, Pune | VTP Realty`;
  const description = `Discover premium 2, 3, 4 BHK luxury apartments and townships in ${location.name}, ${location.region || 'Pune'}. Compare prices, floor plans, and RERA-registered projects by VTP Realty.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/locations/${location.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${lang === 'en' ? '/' : '/' + lang + '/'}locations/${location.slug}`,
      siteName: SITE_NAME,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `Real Estate in ${location.name}` }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// ─── Location Intent Page Metadata ───
export function generateLocationIntentMeta(location, intent, lang = 'en') {
  if (!location) return { title: 'Not Found | VTP Blue Waters' };

  const formattedIntent = formatIntent(intent);
  const title = `VTP Projects: ${formattedIntent} in ${location.name} | Latest ${new Date().getFullYear()} Details`;
  const description = `Explore premium VTP Realty projects offering ${formattedIntent.toLowerCase()} in and around ${location.name}, Pune. Discover floor plans, prices, and exclusive offers.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/locations/${location.slug}/${intent}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${lang === 'en' ? '/' : '/' + lang + '/'}locations/${location.slug}/${intent}`,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// ─── Blog Page Metadata ───
export function generateBlogMeta(blog, lang = 'en') {
  if (!blog) return { title: 'Article Not Found | VTP Blue Waters' };

  const title = `${blog.title} | VTP Blue Waters Real Estate Insights`;
  const description = blog.excerpt || `Read about ${blog.title}. Comprehensive real estate insights for Pune's luxury market.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/blog/${blog.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${lang === 'en' ? '/' : '/' + lang + '/'}blog/${blog.slug}`,
      siteName: SITE_NAME,
      type: 'article',
      publishedTime: blog.date || new Date().toISOString(),
      authors: ['VTP Insights Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// ─── Insight Page Metadata ───
export function generateInsightMeta(article, category, lang = 'en') {
  if (!article) return { title: 'Insight Not Found | VTP Blue Waters' };

  const title = `${article.title} | VTP Blue Waters Insights`;
  const description = article.excerpt || `In-depth analysis: ${article.title}. Expert real estate insights from VTP Realty.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/insights/${category}/${article.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${lang === 'en' ? '/' : '/' + lang + '/'}insights/${category}/${article.slug}`,
      siteName: SITE_NAME,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// ─── Structured Data Generators ───

/**
 * Generate ApartmentComplex JSON-LD for a project page
 */
export function generateProjectJsonLd(project, lang = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ApartmentComplex',
    '@id': `${BASE_URL}${lang === 'en' ? '/' : '/' + lang + '/'}projects/${project.slug}#residence`,
    name: project.name,
    description: project.overview || project.seoDescription,
    url: `${BASE_URL}${lang === 'en' ? '/' : '/' + lang + '/'}projects/${project.slug}`,
    image: project.image,
    numberOfRooms: project.configurations?.length || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: project.location?.split(',')[0]?.trim(),
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      postalCode: '411045',
      addressCountry: 'IN',
    },
    geo: project.coordinates ? {
      '@type': 'GeoCoordinates',
      latitude: project.coordinates.lat,
      longitude: project.coordinates.lng,
    } : undefined,
    parentOrganization: {
      '@id': `${BASE_URL}/#organization`,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      ...(project.startingPrice && { price: project.startingPrice }),
    },
    amenityFeature: project.amenities?.map(a => ({
      '@type': 'LocationFeatureSpecification',
      name: typeof a === 'string' ? a : a.name,
    })),
  };
}

/**
 * Generate Article JSON-LD for blog posts
 */
export function generateArticleJsonLd(article, lang = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    datePublished: article.date || new Date().toISOString().split('T')[0],
    dateModified: article.updatedAt || article.date || new Date().toISOString().split('T')[0],
    author: [{
      '@type': 'Organization',
      name: 'VTP Insights Team',
      url: BASE_URL,
    }],
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}${lang === 'en' ? '/' : '/' + lang + '/'}blog/${article.slug}`,
    },
  };
}

/**
 * Generate FAQPage JSON-LD
 */
export function generateFaqJsonLd(faqs) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q || faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a || faq.answer,
      },
    })),
  };
}

// ─── Helper ───
function formatIntent(intent) {
  return intent
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
