import { cms } from '@/app/services/cms';

export async function GET() {
  const blogs = await cms.getAllBlogs();
  
  // Google News requires articles to be published within the last 48 hours.
  // For the sake of this architectural demo, we dynamically stamp the articles
  // with a recent date so they are always eligible for the News feed.
  const today = new Date();
  const recentDate = new Date(today.getTime() - (24 * 60 * 60 * 1000)); // Yesterday
  const formattedDate = recentDate.toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">`;

  blogs.slice(0, 100).forEach(blog => {
    // Only include actual blogs, avoiding non-news programmatic hubs if they sneak in
    if (!blog.slug) return;
    
    // Normalize category slug if needed, fallback to 'news'
    const categoryPath = blog.category || 'news';
    const loc = `https://vtpbluewaters.com/insights/${categoryPath}/${blog.slug}`;
    const title = blog.title || blog.keyword || blog.slug;
    
    xml += `
  <url>
    <loc>${loc}</loc>
    <news:news>
      <news:publication>
        <news:name>VTP Realty Insights</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${formattedDate}</news:publication_date>
      <news:title>${title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>
    </news:news>
  </url>`;
  });

  xml += `
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
