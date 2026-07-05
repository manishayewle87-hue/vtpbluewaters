import { cms } from '@/app/services/cms';
import { PUNE_MICRO_MARKETS } from './services/locationEngine';
import { seoSilos } from '@/app/data/seo-silos';
import contentData from '@/app/data/content-hub.json';

export const dynamic = 'force-static';

export default async function sitemap() {
  const baseUrl = 'https://vtpbluewaters.com';
  const langs = ['en'];
  
  const entries = [];
  
  // ─── 1. Core Pages + Projects ───
  const projects = await cms.getAllProjects();
  
  // ─── FULL KEYWORD INTENTS RESTORED ───
  const FULL_INTENTS_STR = [
    'price', 'floor-plan', 'brochure', 'reviews', 'amenities', 
    'payment-plan', 'virtual-tour', 'gallery', 'maharera', 
    'investment', 'location', 'offers',
    '2-bhk', '2-5-bhk', '3-bhk', '3-5-bhk', '4-bhk', '5-bhk',
    'penthouse', 'duplex', 'sky-villa',
    'apartments', 'luxury-apartments', 'townships',
    'near-metro', 'near-it-parks', 'near-schools', 'near-hospitals'
  ];

  for (const lang of langs) {
    const prefix = lang === 'en' ? baseUrl : `${baseUrl}/${lang}`;

    // Homepage
    entries.push({
      url: prefix,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: buildAlternates(baseUrl, '', langs),
      },
    });

    // Township
    entries.push({
      url: `${prefix}/township`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: buildAlternates(baseUrl, '/township', langs),
      },
    });

    // Project hub pages
    for (const project of projects) {
      entries.push({
        url: `${prefix}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
        images: project.image ? [`${baseUrl}${project.image}`] : [],
        alternates: {
          languages: buildAlternates(baseUrl, `/projects/${project.slug}`, langs),
        },
      });

      // Project intent sub-pages (MASSIVE SCALING)
      for (const intent of FULL_INTENTS_STR) {
        entries.push({
          url: `${prefix}/projects/${project.slug}/${intent}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: buildAlternates(baseUrl, `/projects/${project.slug}/${intent}`, langs),
          },
        });
      }
    }
  }

  // ─── 2. Location Pages ───
  const locationIntents = ['price', '2-bhk', '3-bhk', 'luxury-apartments'];

  for (const lang of langs) {
    const prefix = lang === 'en' ? baseUrl : `${baseUrl}/${lang}`;

    for (const loc of PUNE_MICRO_MARKETS) {
      entries.push({
        url: `${prefix}/locations/${loc.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: buildAlternates(baseUrl, `/locations/${loc.slug}`, langs),
        },
      });

      for (const intent of locationIntents) {
        entries.push({
          url: `${prefix}/locations/${loc.slug}/${intent}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: {
            languages: buildAlternates(baseUrl, `/locations/${loc.slug}/${intent}`, langs),
          },
        });
      }
    }
  }

  // ─── 3. Content Hub (Blogs, Insights, FAQ) ───
  const insightCategories = ['investment-guides', 'educational', 'market-reports', 'comparisons'];

  for (const lang of langs) {
    const prefix = lang === 'en' ? baseUrl : `${baseUrl}/${lang}`;

    entries.push({
      url: `${prefix}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    for (const blog of contentData.blogs) {
      entries.push({
        url: `${prefix}/blog/${blog.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }

    entries.push({
      url: `${prefix}/insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    for (const cat of insightCategories) {
      entries.push({
        url: `${prefix}/insights/${cat}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }

    entries.push({
      url: `${prefix}/faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // Dynamic SEO Keyword Routes (Batch 1)
  entries.push(...seoSilos.flatMap((silo) => 
    silo.slugs.map((item) => ({
      url: `${baseUrl}/en/explore/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))
  ));

  return entries;
}

// ─── Helper: Build hreflang alternates map ───
function buildAlternates(baseUrl, path, langs) {
  const map = {};
  for (const lang of langs) {
    const hreflang = lang === 'en' ? 'en-IN' : lang === 'hi' ? 'hi-IN' : 'mr-IN';
    map[hreflang] = lang === 'en' ? `${baseUrl}${path === '/' ? '' : path}` : `${baseUrl}/${lang}${path}`;
  }
  return map;
}
