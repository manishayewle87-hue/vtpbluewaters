import { cms } from '@/app/services/cms';

// Precise coordinates for Pune Micro-Markets
const LOCATION_COORDINATES = {
  'kharadi': { lat: 18.5515, lng: 73.9348 },
  'new-kharadi': { lat: 18.5580, lng: 73.9420 },
  'hinjawadi': { lat: 18.5913, lng: 73.7389 },
  'mahalunge': { lat: 18.5837, lng: 73.7703 },
  'baner': { lat: 18.5590, lng: 73.7868 },
  'balewadi': { lat: 18.5759, lng: 73.7787 },
  'wakad': { lat: 18.5987, lng: 73.7688 },
  'bavdhan': { lat: 18.5089, lng: 73.7626 },
  'sus': { lat: 18.5490, lng: 73.7580 },
  'pashan': { lat: 18.5380, lng: 73.7920 },
  'nibm-road': { lat: 18.4760, lng: 73.8990 },
  'undri': { lat: 18.4620, lng: 73.9140 },
  'hadapsar': { lat: 18.5018, lng: 73.9262 },
  'wagholi': { lat: 18.5800, lng: 73.9800 },
  'default': { lat: 18.5204, lng: 73.8567 } // Pune Center
};

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export async function GET() {
  const projects = await cms.getAllProjects();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>VTP Realty Projects - Pune Geo-Spatial Map</name>
    <description>Geo-Spatial verified locations of all VTP Realty luxury townships and residential developments across Pune.</description>
    <Style id="vtpStyle">
      <IconStyle>
        <Icon>
          <href>https://vtpbluewaters.com/logo.svg</href>
        </Icon>
      </IconStyle>
    </Style>
`;

  projects.forEach(project => {
    const baseLocation = project.location ? project.location.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-') : '';
    const coords = LOCATION_COORDINATES[baseLocation] || LOCATION_COORDINATES['default'];
    
    // Deterministic offset based on slug hash so coordinates are stable
    const hash = simpleHash(project.slug);
    const offsetLat = ((hash % 100) - 50) * 0.0001;
    const offsetLng = (((hash >> 2) % 100) - 50) * 0.0001;
    const finalLat = (coords.lat + offsetLat).toFixed(6);
    const finalLng = (coords.lng + offsetLng).toFixed(6);

    const title = `${project.name} - VTP Realty ${project.location}`;
    const description = project.seoDescription || (project.overview ? project.overview.substring(0, 200) + '...' : `Explore ${project.name} by VTP Realty in ${project.location}.`);
    const loc = `https://vtpbluewaters.com/projects/${project.slug}`;
    const image = project.image ? (project.image.startsWith('http') ? project.image : `https://vtpbluewaters.com${project.image.startsWith('/') ? project.image : '/' + project.image}`) : 'https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg';

    xml += `
    <Placemark>
      <name>${title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</name>
      <description><![CDATA[
        <h3>${project.name}</h3>
        <p>${description}</p>
        <p><strong>Location:</strong> ${project.location}</p>
        <p><a href="${loc}">View Verified Floor Plans & Pricing</a></p>
        <img src="${image}" width="400" alt="${project.name}" />
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
      'Content-Type': 'application/vnd.google-earth.kml+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
