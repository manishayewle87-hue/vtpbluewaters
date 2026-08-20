import { cms } from '@/app/services/cms';

export const runtime = 'edge';

// Approximate coordinates for Pune Micro-Markets
const LOCATION_COORDINATES = {
  'kharadi': { lat: 18.5515, lng: 73.9348 },
  'hinjawadi': { lat: 18.5913, lng: 73.7389 },
  'mahalunge': { lat: 18.5837, lng: 73.7703 },
  'baner': { lat: 18.5590, lng: 73.7868 },
  'balewadi': { lat: 18.5759, lng: 73.7787 },
  'wakad': { lat: 18.5987, lng: 73.7688 },
  'bavdhan': { lat: 18.5089, lng: 73.7626 },
  'default': { lat: 18.5204, lng: 73.8567 } // Pune Center
};

export async function GET() {
  const projects = await cms.getAllProjects();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>VTP Realty Projects - Pune</name>
    <description>Geo-Spatial mapping of all premium VTP Realty luxury townships and residential projects across Pune.</description>
    <Style id="vtpStyle">
      <IconStyle>
        <Icon>
          <href>https://vtpbluewaters.com/icon.svg</href>
        </Icon>
      </IconStyle>
    </Style>
`;

  projects.forEach(project => {
    // Extract base location
    const baseLocation = project.location ? project.location.split(',')[0].trim().toLowerCase().replace(/\\s+/g, '-') : '';
    const coords = LOCATION_COORDINATES[baseLocation] || LOCATION_COORDINATES['default'];
    
    // Add slight deterministic jitter so multiple projects in the same location don't overlap perfectly
    const jitterLat = (Math.random() - 0.5) * 0.005;
    const jitterLng = (Math.random() - 0.5) * 0.005;
    const finalLat = (coords.lat + jitterLat).toFixed(6);
    const finalLng = (coords.lng + jitterLng).toFixed(6);

    const title = project.name;
    const description = project.seoDescription || project.overview.substring(0, 200) + '...';
    const loc = `https://vtpbluewaters.com/projects/${project.slug}`;

    xml += `
    <Placemark>
      <name>${title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</name>
      <description><![CDATA[
        <p>${description}</p>
        <p><a href="${loc}">View Project Details</a></p>
        <img src="${project.image}" width="400" />
      ]]></description>
      <styleUrl>#vtpStyle</styleUrl>
      <Point>
        <coordinates>${finalLng},${finalLat},0</coordinates>
      </Point>
    </Placemark>`;
  });

  xml += `
  </Document>
</kml>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/vnd.google-earth.kml+xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
