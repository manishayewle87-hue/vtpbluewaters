/**
 * ArticleSchema — Maximum E-E-A-T Article Structured Data
 *
 * Renders a complete @graph for a single Article/BlogPosting page.
 * Covers all Google-required fields for News, Top Stories, and
 * AI Overview eligibility.
 *
 * Usage:
 *   <ArticleSchema
 *     headline="..."
 *     description="..."
 *     url="https://vtpbluewaters.com/..."
 *     image="https://vtpbluewaters.com/assets/..."
 *     datePublished="2025-01-15"
 *     dateModified="2025-06-01"
 *     authorName="VTP Realty Research Team"
 *     keywords={["Pune real estate", "luxury apartments"]}
 *     wordCount={1200}
 *   />
 */
export default function ArticleSchema({
  headline,
  description,
  url,
  image = 'https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg',
  datePublished,
  dateModified,
  authorName = 'VTP Realty Research Team',
  keywords = [],
  wordCount = 1000,
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      // ── Article Entity ──────────────────────────────────────────────────
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        'headline': headline,
        'description': description,
        'url': url,
        'mainEntityOfPage': { '@id': `${url}#webpage` },
        'image': {
          '@type': 'ImageObject',
          '@id': `${url}#primaryimage`,
          'url': image,
          'width': 1200,
          'height': 630,
          'caption': headline,
        },
        'datePublished': datePublished,
        'dateModified': dateModified || datePublished,
        'author': {
          '@type': 'Person',
          '@id': 'https://vtpbluewaters.com/#author-vtp-research',
          'name': authorName,
          'jobTitle': 'Senior Real Estate Analyst',
          'worksFor': { '@id': 'https://vtpbluewaters.com/#organization' },
          'url': 'https://vtpbluewaters.com/insights',
        },
        'publisher': {
          '@id': 'https://vtpbluewaters.com/#organization',
        },
        'about': { '@id': 'https://vtpbluewaters.com/#township' },
        'keywords': keywords.join(', '),
        'wordCount': wordCount,
        'inLanguage': 'en-IN',
        'articleSection': 'Real Estate Market Intelligence',
        'isAccessibleForFree': true,
        'license': 'https://vtpbluewaters.com/terms-of-use',
      },
      // ── WebPage Entity ──────────────────────────────────────────────────
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        'url': url,
        'name': headline,
        'description': description,
        'isPartOf': { '@id': 'https://vtpbluewaters.com/#website' },
        'primaryImageOfPage': { '@id': `${url}#primaryimage` },
        'publisher': { '@id': 'https://vtpbluewaters.com/#organization' },
        'datePublished': datePublished,
        'dateModified': dateModified || datePublished,
        'inLanguage': 'en-IN',
        // Speakable specification for AI Overviews / voice search
        'speakable': {
          '@type': 'SpeakableSpecification',
          'cssSelector': ['h1', 'h2', '.article-intro'],
        },
      },
      // ── BreadcrumbList ──────────────────────────────────────────────────
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://vtpbluewaters.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Insights', 'item': 'https://vtpbluewaters.com/insights' },
          { '@type': 'ListItem', 'position': 3, 'name': headline, 'item': url },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
