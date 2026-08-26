import { cms } from '@/app/services/cms';

export const dynamic = 'force-static';

const COORDINATES_MAP = {
  'mahalunge': { lat: 18.5837, lng: 73.7703, postalCode: '411045', zone: 'West Pune' },
  'hinjawadi': { lat: 18.5913, lng: 73.7389, postalCode: '411057', zone: 'West Pune' },
  'hinjewadi': { lat: 18.5913, lng: 73.7389, postalCode: '411057', zone: 'West Pune' },
  'kharadi': { lat: 18.5515, lng: 73.9348, postalCode: '411014', zone: 'East Pune' },
  'new-kharadi': { lat: 18.5565, lng: 73.9450, postalCode: '411014', zone: 'East Pune' },
  'bavdhan': { lat: 18.5089, lng: 73.7626, postalCode: '411021', zone: 'West Pune' },
  'wakad': { lat: 18.5987, lng: 73.7688, postalCode: '411057', zone: 'West Pune' },
  'baner': { lat: 18.5590, lng: 73.7868, postalCode: '411045', zone: 'West Pune' },
  'balewadi': { lat: 18.5750, lng: 73.7780, postalCode: '411045', zone: 'West Pune' },
  'sus': { lat: 18.5520, lng: 73.7540, postalCode: '411021', zone: 'West Pune' },
  'pashan': { lat: 18.5410, lng: 73.7920, postalCode: '411021', zone: 'West Pune' },
  'aundh': { lat: 18.5620, lng: 73.8070, postalCode: '411007', zone: 'West Pune' },
  'undri': { lat: 18.4620, lng: 73.9140, postalCode: '411060', zone: 'South Pune' },
  'nibm': { lat: 18.4760, lng: 73.8990, postalCode: '411048', zone: 'South Pune' },
  'kondhwa': { lat: 18.4710, lng: 73.8890, postalCode: '411048', zone: 'South Pune' },
  'pisoli': { lat: 18.4480, lng: 73.9180, postalCode: '411060', zone: 'South Pune' },
  'wagholi': { lat: 18.5810, lng: 73.9820, postalCode: '412207', zone: 'East Pune' },
  'viman': { lat: 18.5670, lng: 73.9140, postalCode: '411014', zone: 'East Pune' },
  'kalyani': { lat: 18.5480, lng: 73.9030, postalCode: '411006', zone: 'East Pune' },
  'keshavnagar': { lat: 18.5320, lng: 73.9310, postalCode: '411036', zone: 'East Pune' },
  'hadapsar': { lat: 18.5080, lng: 73.9260, postalCode: '411028', zone: 'East Pune' },
  'magarpatta': { lat: 18.5140, lng: 73.9280, postalCode: '411028', zone: 'East Pune' },
  'talegaon': { lat: 18.7340, lng: 73.6760, postalCode: '410506', zone: 'PCMC' },
  'tathawade': { lat: 18.6180, lng: 73.7540, postalCode: '411033', zone: 'West Pune' },
  'punawale': { lat: 18.6290, lng: 73.7420, postalCode: '411033', zone: 'West Pune' },
  'ravet': { lat: 18.6470, lng: 73.7380, postalCode: '412101', zone: 'PCMC' },
  'default': { lat: 18.5204, lng: 73.8567, postalCode: '411001', zone: 'Central Pune' }
};

export async function GET() {
  const projects = await cms.getAllProjects();
  const siteUrl = 'https://vtpbluewaters.com';
  
  const listings = [];

  projects.forEach((project) => {
    const locLower = (project.location || '').toLowerCase();
    let geo = COORDINATES_MAP['default'];
    for (const key of Object.keys(COORDINATES_MAP)) {
      if (locLower.includes(key)) {
        geo = COORDINATES_MAP[key];
        break;
      }
    }

    const configs = Array.isArray(project.floorPlans) && project.floorPlans.length > 0 
      ? project.floorPlans.filter(f => f.type && f.type.toLowerCase() !== 'configuration')
      : [{ type: '2 BHK', carpetArea: '750 - 850 Sq.ft' }, { type: '3 BHK', carpetArea: '1050 - 1450 Sq.ft' }];

    configs.forEach((cfg, idx) => {
      const canonicalUrl = `${siteUrl}/projects/${project.slug}/${cfg.type.toLowerCase().includes('2') ? '2-bhk' : cfg.type.toLowerCase().includes('3') ? '3-bhk' : cfg.type.toLowerCase().includes('4') ? '4-bhk' : 'price'}`;
      
      let priceVal = 9000000;
      if (cfg.type.toLowerCase().includes('2')) priceVal = 9000000;
      if (cfg.type.toLowerCase().includes('3')) priceVal = 14500000;
      if (cfg.type.toLowerCase().includes('4')) priceVal = 26000000;
      if (cfg.type.toLowerCase().includes('villa')) priceVal = 45000000;

      listings.push({
        "@type": "RealEstateListing",
        "identifier": `${project.slug}-${idx + 1}`,
        "name": `${project.name} ${cfg.type}`,
        "url": canonicalUrl,
        "category": "for_sale",
        "datePosted": "2026-01-01",
        "validThrough": "2027-12-31",
        "price": priceVal,
        "priceCurrency": "INR",
        "project": project.name,
        "township": project.township || "VTP Realty Township",
        "zone": geo.zone,
        "location": project.location || "Pune",
        "maharera": Array.isArray(project.maharera) ? project.maharera : [project.maharera || "P52100026772"],
        "configuration": {
          "type": cfg.type,
          "carpetArea": cfg.carpetArea || "MLA Optimized",
          "unit": "SQFT"
        },
        "geoCoordinates": {
          "latitude": geo.lat,
          "longitude": geo.lng,
          "postalCode": geo.postalCode
        },
        "contact": {
          "agent": "VTP Realty Official Sales Desk",
          "phone": "+91-7744009295",
          "email": "sales@vtprealty.in"
        }
      });
    });
  });

  const responsePayload = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "VTP Realty Pune - Google Real Estate Property Listing Feed",
    "description": "Official real estate listing inventory for Google Search, Assistant, and Maps discovery across all VTP Realty Pune developments.",
    "numberOfItems": listings.length,
    "itemListElement": listings.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": item
    }))
  };

  return new Response(JSON.stringify(responsePayload, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
