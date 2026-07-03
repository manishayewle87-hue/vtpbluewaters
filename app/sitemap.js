import { cms } from '@/app/services/cms';
import { PUNE_MICRO_MARKETS } from './services/locationEngine';
import { seoSilos } from '@/app/data/seo-silos';
import contentData from '@/app/data/content-hub.json';

export const dynamic = 'force-static';

// ─── Segmented Sitemap Architecture ───
// Next.js 16 generateSitemaps splits the monolithic sitemap into indexed segments:
//   /sitemap/0.xml → Core pages + Projects
//   /sitemap/1.xml → Location pages
//   /sitemap/2.xml → Content (Blogs, Insights, FAQ)
// Each segment stays well under Google's 50,000 URL limit.

export async function generateSitemaps() {
  return [{ id: '0' }, { id: '1' }, { id: '2' }];
}

export default async function sitemap(props) {
  const id = await props.id;
  const baseUrl = 'https://vtpbluewaters.com';
  const langs = ['en', 'mr', 'hi'];

  // ─── Segment 0: Core Pages + Projects ───
  if (id === '0') {
    return generateCoreAndProjectsSitemap(baseUrl, langs);
  }

  // ─── Segment 1: Location Pages ───
  if (id === '1') {
    return generateLocationsSitemap(baseUrl, langs);
  }

  // ─── Segment 2: Content Hub (Blogs, Insights, FAQ) ───
  if (id === '2') {
    return generateContentSitemap(baseUrl, langs);
  }

  return [];
}

// ─── Core Pages + Project URLs ───
async function generateCoreAndProjectsSitemap(baseUrl, langs) {
  const entries = [];
  const projects = await cms.getAllProjects();
  const projectIntents = ['price', 'floor-plan', 'brochure', 'amenities', 'location', 'investment'];

  for (const lang of langs) {
    const prefix = `${baseUrl}/${lang}`;

    // Homepage — highest priority
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
        images: project.image ? [project.image] : [],
        alternates: {
          languages: buildAlternates(baseUrl, `/projects/${project.slug}`, langs),
        },
      });

      // Project intent sub-pages
      for (const intent of projectIntents) {
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

  return entries;
}

// ─── Location Pages ───
function generateLocationsSitemap(baseUrl, langs) {
  const entries = [];
  const locationIntents = ['price', '2-bhk', '3-bhk', 'luxury-apartments'];

  for (const lang of langs) {
    const prefix = `${baseUrl}/${lang}`;

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

  return entries;
}

// ─── Content Hub (Blogs, Insights, FAQ) ───
function generateContentSitemap(baseUrl, langs) {
  const entries = [];
  const insightCategories = ['investment-guides', 'educational', 'market-reports', 'comparisons'];

  for (const lang of langs) {
    const prefix = `${baseUrl}/${lang}`;

    // Blog index
    entries.push({
      url: `${prefix}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    // Individual blog posts
    for (const blog of contentData.blogs) {
      entries.push({
        url: `${prefix}/blog/${blog.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }

    // Insights hub
    entries.push({
      url: `${prefix}/insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    // Insight categories
    for (const cat of insightCategories) {
      entries.push({
        url: `${prefix}/insights/${cat}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }

    // FAQ
    entries.push({
      url: `${prefix}/faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // Static Routes
  entries.push({
    url: `${baseUrl}/en`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  });
  entries.push({
    url: `${baseUrl}/en/township`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  });

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
    map[hreflang] = `${baseUrl}/${lang}${path}`;
  }
  return map;
}
