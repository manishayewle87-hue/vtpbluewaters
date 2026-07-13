import { generateSitemaps } from '@/app/sitemap';

export async function GET() {
  const sitemaps = await generateSitemaps();
  
  const baseUrl = 'https://vtpbluewaters.com';
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  for (const sitemap of sitemaps) {
    xml += `  <sitemap>\n`;
    xml += `    <loc>${baseUrl}/sitemap/${sitemap.id}.xml</loc>\n`;
    xml += `  </sitemap>\n`;
  }
  
  xml += '</sitemapindex>';
  
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}
