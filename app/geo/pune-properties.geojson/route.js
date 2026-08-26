import { cms } from '@/app/services/cms';

export const dynamic = 'force-static';

const COORDINATES_MAP = {
  'mahalunge': { lat: 18.5837, lng: 73.7703, zone: 'West Pune' },
  'hinjawadi': { lat: 18.5913, lng: 73.7389, zone: 'West Pune' },
  'hinjewadi': { lat: 18.5913, lng: 73.7389, zone: 'West Pune' },
  'kharadi': { lat: 18.5515, lng: 73.9348, zone: 'East Pune' },
  'new-kharadi': { lat: 18.5565, lng: 73.9450, zone: 'East Pune' },
  'bavdhan': { lat: 18.5089, lng: 73.7626, zone: 'West Pune' },
  'wakad': { lat: 18.5987, lng: 73.7688, zone: 'West Pune' },
  'baner': { lat: 18.5590, lng: 73.7868, zone: 'West Pune' },
  'balewadi': { lat: 18.5750, lng: 73.7780, zone: 'West Pune' },
  'sus': { lat: 18.5520, lng: 73.7540, zone: 'West Pune' },
  'pashan': { lat: 18.5410, lng: 73.7920, zone: 'West Pune' },
  'aundh': { lat: 18.5620, lng: 73.8070, zone: 'West Pune' },
  'undri': { lat: 18.4620, lng: 73.9140, zone: 'South Pune' },
  'nibm': { lat: 18.4760, lng: 73.8990, zone: 'South Pune' },
  'kondhwa': { lat: 18.4710, lng: 73.8890, zone: 'South Pune' },
  'pisoli': { lat: 18.4480, lng: 73.9180, zone: 'South Pune' },
  'wagholi': { lat: 18.5810, lng: 73.9820, zone: 'East Pune' },
  'viman': { lat: 18.5670, lng: 73.9140, zone: 'East Pune' },
  'kalyani': { lat: 18.5480, lng: 73.9030, zone: 'East Pune' },
  'keshavnagar': { lat: 18.5320, lng: 73.9310, zone: 'East Pune' },
  'hadapsar': { lat: 18.5080, lng: 73.9260, zone: 'East Pune' },
  'magarpatta': { lat: 18.5140, lng: 73.9280, zone: 'East Pune' },
  'talegaon': { lat: 18.7340, lng: 73.6760, zone: 'PCMC' },
  'tathawade': { lat: 18.6180, lng: 73.7540, zone: 'West Pune' },
  'punawale': { lat: 18.6290, lng: 73.7420, zone: 'West Pune' },
  'ravet': { lat: 18.6470, lng: 73.7380, zone: 'PCMC' },
  'default': { lat: 18.5204, lng: 73.8567, zone: 'Central Pune' }
};

export async function GET() {
  const projects = await cms.getAllProjects();
  const siteUrl = 'https://vtpbluewaters.com';

  const features = projects.map((project, idx) => {
    const locLower = (project.location || '').toLowerCase();
    let geo = COORDINATES_MAP['default'];
    for (const key of Object.keys(COORDINATES_MAP)) {
      if (locLower.includes(key)) {
        geo = COORDINATES_MAP[key];
        break;
      }
    }

    // Slight deterministic offset per project
    const offsetLat = ((idx % 7) - 3) * 0.0015;
    const offsetLng = (((idx * 3) % 7) - 3) * 0.0015;

    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [geo.lng + offsetLng, geo.lat + offsetLat]
      },
      properties: {
        id: project.slug,
        name: project.name,
        township: project.township || 'VTP Realty Luxury Development',
        location: project.location || 'Pune, Maharashtra',
        zone: geo.zone,
        url: `${siteUrl}/projects/${project.slug}`,
        image: project.image ? (project.image.startsWith('http') ? project.image : `${siteUrl}${project.image}`) : `${siteUrl}/assets/projects/earth-1/hero.jpg`,
        rera: Array.isArray(project.maharera) ? project.maharera.join(', ') : 'Registered',
        configurations: ['2 BHK', '3 BHK', '4 BHK'],
        priceRange: '₹90 Lakhs - ₹3.5+ Crores',
        phone: '+91-7744009295'
      }
    };
  });

  const geoJson = {
    type: 'FeatureCollection',
    name: 'VTP Realty Master Spatial Property Registry - Pune',
    crs: {
      type: 'name',
      properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' }
    },
    features
  };

  return new Response(JSON.stringify(geoJson, null, 2), {
    headers: {
      'Content-Type': 'application/geo+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
