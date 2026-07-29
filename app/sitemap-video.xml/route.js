import { cms } from '@/app/services/cms';

export async function GET() {
  const projects = await cms.getAllProjects();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;

  projects.forEach(project => {
    // Generate video sitemap entry for the virtual-tour intent page
    const loc = `https://vtpbluewaters.com/projects/${project.slug}/virtual-tour`;
    const title = `Virtual Tour: ${project.name}`;
    const description = `Experience a fully immersive 360 virtual tour of ${project.name} located in ${project.location}. Walk through the Maximum Livable Area luxury residences today.`;
    const thumbnail = project.image || 'https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg';
    
    // We assume a generic YouTube player URL for the demonstration, 
    // ideally this would be a specific YouTube ID from the project data.
    const playerLoc = project.virtualTourVideoUrl || 'https://www.youtube.com/embed/example';
    
    // Fallback date to today if project doesn't have one
    const pubDate = new Date().toISOString();

    xml += `
  <url>
    <loc>${loc}</loc>
    <video:video>
      <video:thumbnail_loc>${thumbnail}</video:thumbnail_loc>
      <video:title>${title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</video:title>
      <video:description>${description.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</video:description>
      <video:player_loc>${playerLoc.replace(/&/g, '&amp;')}</video:player_loc>
      <video:publication_date>${pubDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
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
