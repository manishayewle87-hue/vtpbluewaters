import { cms } from '@/app/services/cms';

export const runtime = 'edge';

export async function GET() {
  const projects = await cms.getAllProjects();
  
  // Standard Google Dynamic Remarketing Feed format for Real Estate
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>VTP Realty - Official Property Feed</title>
    <link>https://vtpbluewaters.com</link>
    <description>Dynamic real estate inventory for VTP Realty luxury townships in Pune.</description>
`;

  projects.forEach(project => {
    const title = project.seoTitle || project.name;
    const description = project.seoDescription || project.overview.substring(0, 100) + '...';
    const loc = `https://vtpbluewaters.com/projects/${project.slug}`;
    const image = project.image || 'https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg';
    
    const city = project.location ? project.location.split(',')[1]?.trim() || 'Pune' : 'Pune';
    const neighborhood = project.location ? project.location.split(',')[0]?.trim() : 'Pune';

    xml += `
    <item>
      <g:id>${project.slug}</g:id>
      <g:title>${title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</g:title>
      <g:description>${description.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</g:description>
      <g:link>${loc}</g:link>
      <g:image_link>${image.replace(/&/g, '&amp;')}</g:image_link>
      <g:property_type>Apartment</g:property_type>
      <g:listing_type>for_sale</g:listing_type>
      <g:price>On Request</g:price>
      <g:city>${city}</g:city>
      <g:region>Maharashtra</g:region>
      <g:neighborhood>${neighborhood}</g:neighborhood>
      <g:country>IN</g:country>
      <g:condition>new</g:condition>
    </item>`;
  });

  xml += `
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
