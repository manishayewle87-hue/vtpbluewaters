import { cms } from '@/app/services/cms';
import { PUNE_MICRO_MARKETS } from './services/locationEngine';
import { seoSilos } from '@/app/data/seo-silos';

const CHUNK_SIZE = 2500;
const baseUrl = 'https://vtpbluewaters.com';

// Pre-calculate the total SEO slugs
const flatSeoSlugs = seoSilos.flatMap(silo => silo.slugs);

export async function generateSitemaps() {
  const numProgrammaticChunks = Math.ceil(flatSeoSlugs.length / CHUNK_SIZE);
  
  // Return chunks starting from 0 (Core) up to the required number of programmatic chunks
  const chunks = [{ id: 0 }]; // id: 0 is for core pages
  for (let i = 1; i <= numProgrammaticChunks; i++) {
    chunks.push({ id: i });
  }
  return chunks;
}

export default async function sitemap(props) {
  const rawId = await props.id;
  const id = parseInt(rawId, 10);
  const entries = [];
  
  if (id === 0) {
    // --- CORE PAGES (id: 0) ---
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

  } else {
    // --- PROGRAMMATIC SEO PAGES (id > 0) ---
    const chunkIndex = id - 1;
    const startIndex = chunkIndex * CHUNK_SIZE;
    const endIndex = startIndex + CHUNK_SIZE;
    const chunkSlugs = flatSeoSlugs.slice(startIndex, endIndex);

    for (const item of chunkSlugs) {
      const s = item.slug;

      // Tier 1: VTP project-specific brand pages — highest priority
      const isVtpProject =
        s.includes('vtp-altamira') || s.includes('vtp-monarque') ||
        s.includes('vtp-earth-1') || s.includes('vtp-flamante') ||
        s.includes('vtp-velvet-villas') || s.includes('vtp-cielo') ||
        s.includes('vtp-aurelia') || s.includes('vtp-volare') ||
        s.includes('vtp-realty') || s.includes('vtp-blue-waters');

      // Tier 2: Core township locations
      const isCoreLocation = s.includes('mahalunge') || s.includes('hinjawadi');

      // Tier 3: All new Pune locations
      const isNewLocation =
        s.includes('kharadi') || s.includes('baner') || s.includes('bavdhan') ||
        s.includes('wakad') || s.includes('pimple-saudagar') || s.includes('wanowrie') ||
        s.includes('hadapsar') || s.includes('wagholi') || s.includes('sus') ||
        s.includes('tathawade') || s.includes('pashan');

      const priority = isVtpProject ? 0.9 : isCoreLocation ? 0.8 : isNewLocation ? 0.7 : 0.5;
      const changeFrequency = isVtpProject ? 'daily' : isCoreLocation ? 'daily' : isNewLocation ? 'weekly' : 'weekly';

      // Use project-specific hero images for VTP brand pages for Google Images boost
      const imageSlug = isVtpProject && s.includes('vtp-altamira') ? 'vtp-altamira-kharadi-pune/accurate-hero.jpg'
        : isVtpProject && s.includes('vtp-monarque') ? 'vtp-monarque-hinjawadi-pune/accurate-hero.webp'
        : isVtpProject && s.includes('vtp-earth-1') ? 'earth-1/hero.jpg'
        : isVtpProject && s.includes('vtp-flamante') ? 'vtp-flamante-kharadi-pune/accurate-hero.svg'
        : isVtpProject && s.includes('vtp-velvet-villas') ? 'vtp-velvet-villas-kharadi-pune/accurate-hero.webp'
        : isVtpProject && s.includes('vtp-cielo') ? 'vtp-cielo-bavdhan-pune/accurate-hero.webp'
        : isVtpProject && s.includes('vtp-aurelia') ? 'vtp-aurelia-kharadi-pune/accurate-hero.jpg'
        : isVtpProject && s.includes('vtp-volare') ? 'vtp-volare-hinjawadi-pune/accurate-hero.webp'
        : 'earth-1/hero.jpg';

      entries.push({
        url: `${baseUrl}/explore/${s}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        images: [`${baseUrl}/assets/projects/${imageSlug}`],
      });
    }
  }

  return entries;
}

