import { cms } from '@/app/services/cms';

export const dynamic = 'force-static';

export async function GET() {
  const blogs = await cms.getAllBlogs();
  const siteUrl = 'https://vtpbluewaters.com';
  const now = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  blogs.forEach((blog) => {
    const pubDate = blog.createdAt ? new Date(blog.createdAt).toISOString() : now;
    const cleanTitle = (blog.title || 'VTP Realty Real Estate Market Update')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

    const cleanDesc = (blog.excerpt || blog.metaDescription || 'Pune Real Estate Market Intelligence')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const blogUrl = blog.slug.startsWith('http') ? blog.slug : `${siteUrl}/market-intelligence/${blog.slug}`;
    const mainImg = blog.image ? (blog.image.startsWith('http') ? blog.image : `${siteUrl}${blog.image}`) : `${siteUrl}/assets/projects/earth-1/hero.jpg`;

    xml += `  <url>
    <loc>${blogUrl}</loc>
    <news:news>
      <news:publication>
        <news:name>VTP Realty Market Intelligence</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${cleanTitle}</news:title>
    </news:news>
    <image:image>
      <image:loc>${mainImg.replace(/&/g, '&amp;')}</image:loc>
      <image:title>${cleanTitle}</image:title>
      <image:caption>${cleanDesc}</image:caption>
    </image:image>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  xml += `</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
