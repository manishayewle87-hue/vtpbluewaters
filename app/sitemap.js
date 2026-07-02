import { cms } from './services/cms';
import { PUNE_MICRO_MARKETS } from './services/locationEngine';
import contentData from '@/app/data/content-hub.json';

export const dynamic = 'force-static';
export default async function sitemap() {
  const baseUrl = 'https://vtpbluewaters.com';
  const langs = ['en', 'mr', 'hi'];
  const sitemapEntries = [];

  langs.forEach(lang => {
    const langPrefix = `/${lang}`;
    
    // Static Routes
    sitemapEntries.push({
      url: `${baseUrl}${langPrefix}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    });
    
    sitemapEntries.push({
      url: `${baseUrl}${langPrefix}/insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
    
    sitemapEntries.push({
      url: `${baseUrl}${langPrefix}/faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    sitemapEntries.push({
      url: `${baseUrl}${langPrefix}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    // Content Hub Routes
    contentData.blogs.forEach(blog => {
      sitemapEntries.push({
        url: `${baseUrl}${langPrefix}/blog/${blog.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  // Dynamic Project Routes
  const projects = await cms.getAllProjects();
  const projectIntents = ['price', 'floor-plan', 'brochure', 'amenities', 'location', 'investment'];
  
  langs.forEach(lang => {
    const langPrefix = `/${lang}`;
    
    projects.forEach(project => {
      sitemapEntries.push({
        url: `${baseUrl}${langPrefix}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
      });
      
      projectIntents.forEach(intent => {
        sitemapEntries.push({
          url: `${baseUrl}${langPrefix}/projects/${project.slug}/${intent}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      });
    });
  });

  // Dynamic Location Routes
  const locationIntents = ['price', '2-bhk', '3-bhk', 'luxury-apartments'];
  
  langs.forEach(lang => {
    const langPrefix = `/${lang}`;
    
    PUNE_MICRO_MARKETS.forEach(loc => {
      sitemapEntries.push({
        url: `${baseUrl}${langPrefix}/locations/${loc.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
      
      locationIntents.forEach(intent => {
        sitemapEntries.push({
          url: `${baseUrl}${langPrefix}/locations/${loc.slug}/${intent}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });
    });
  });

  return sitemapEntries;
}
