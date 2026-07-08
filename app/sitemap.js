import { cms } from '@/app/services/cms';
import { PUNE_MICRO_MARKETS } from './services/locationEngine';
import { seoSilos } from '@/app/data/seo-silos';

export const dynamic = 'force-static';

const CHUNK_SIZE = 4000;
const baseUrl = 'https://vtpbluewaters.com';

// Pre-calculate the total SEO slugs
const flatSeoSlugs = seoSilos.flatMap(silo => silo.slugs);

export async function generateSitemaps() {
  const totalSeoPages = flatSeoSlugs.length;
  // Chunk 0 is reserved for Core Pages + first batch of SEO pages
  // Chunks 1 to N are just remaining SEO pages
  const chunksNeeded = Math.ceil(totalSeoPages / CHUNK_SIZE);
  
  // Return [{ id: 0 }, { id: 1 }, { id: 2 }]
  return Array.from({ length: chunksNeeded }).map((_, i) => ({
    id: i,
  }));
}

export default async function sitemap({ id }) {
  const entries = [];
  
  // --- CORE PAGES (Only included in Chunk 0) ---
  if (id === 0) {
    const projects = await cms.getAllProjects();
    const FULL_INTENTS_STR = [
      'price', 'floor-plan', 'brochure', 'reviews', 'amenities', 
      'payment-plan', 'virtual-tour', 'gallery', 'maharera', 
      'investment', 'location', 'offers',
      '2-bhk', '2-5-bhk', '3-bhk', '3-5-bhk', '4-bhk', '5-bhk',
      'penthouse', 'duplex', 'sky-villa',
      'apartments', 'luxury-apartments', 'townships',
      'near-metro', 'near-it-parks', 'near-schools', 'near-hospitals'
    ];

    entries.push({ url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 });
    entries.push({ url: `${baseUrl}/township`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 });

    for (const project of projects) {
      entries.push({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
        images: project.image ? [`${baseUrl}${project.image}`] : [],
      });
      for (const intent of FULL_INTENTS_STR) {
        entries.push({ url: `${baseUrl}/projects/${project.slug}/${intent}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 });
      }
    }

    const locationIntents = ['price', '2-bhk', '3-bhk', 'luxury-apartments'];
    for (const loc of PUNE_MICRO_MARKETS) {
      entries.push({ url: `${baseUrl}/locations/${loc.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 });
      for (const intent of locationIntents) {
        entries.push({ url: `${baseUrl}/locations/${loc.slug}/${intent}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 });
      }
    }

    const pillarPages = [
      '/market-intelligence/mahalunge-hinjewadi-investment-guide',
      '/market-intelligence/vtp-bluewaters-township-review',
      '/market-intelligence/pune-ultra-luxury-real-estate-trends',
      '/market-intelligence/vtp-bluewaters-vs-competitors',
      '/market-intelligence/hinjewadi-walk-to-work-lifestyle',
      '/investors/nri-investment-guide',
      '/investors/pune-infrastructure-impact-report'
    ];
    for (const route of pillarPages) {
      entries.push({ url: `${baseUrl}${route}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 });
    }

    entries.push({ url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });
    const allBlogs = await cms.getAllBlogs();
    for (const blog of allBlogs) {
      entries.push({ url: `${baseUrl}/blog/${blog.slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 });
    }

    const insightCategories = ['investment-guides', 'educational', 'market-reports', 'comparisons'];
    entries.push({ url: `${baseUrl}/insights`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });
    for (const cat of insightCategories) {
      entries.push({ url: `${baseUrl}/insights/${cat}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 });
    }
    entries.push({ url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });
  }

  // --- PROGRAMMATIC SEO PAGES (Chunked across all IDs) ---
  const startIdx = id * CHUNK_SIZE;
  const endIdx = startIdx + CHUNK_SIZE;
  const chunkedSlugs = flatSeoSlugs.slice(startIdx, endIdx);

  for (const item of chunkedSlugs) {
    entries.push({
      url: `${baseUrl}/explore/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  return entries;
}
