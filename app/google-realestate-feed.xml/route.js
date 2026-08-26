import { cms } from '@/app/services/cms';

export const dynamic = 'force-static';

const COORDINATES_MAP = {
  'mahalunge': { lat: 18.5837, lng: 73.7703, postalCode: '411045' },
  'hinjawadi': { lat: 18.5913, lng: 73.7389, postalCode: '411057' },
  'hinjewadi': { lat: 18.5913, lng: 73.7389, postalCode: '411057' },
  'kharadi': { lat: 18.5515, lng: 73.9348, postalCode: '411014' },
  'new-kharadi': { lat: 18.5565, lng: 73.9450, postalCode: '411014' },
  'bavdhan': { lat: 18.5089, lng: 73.7626, postalCode: '411021' },
  'wakad': { lat: 18.5987, lng: 73.7688, postalCode: '411057' },
  'baner': { lat: 18.5590, lng: 73.7868, postalCode: '411045' },
  'balewadi': { lat: 18.5750, lng: 73.7780, postalCode: '411045' },
  'sus': { lat: 18.5520, lng: 73.7540, postalCode: '411021' },
  'pashan': { lat: 18.5410, lng: 73.7920, postalCode: '411021' },
  'aundh': { lat: 18.5620, lng: 73.8070, postalCode: '411007' },
  'undri': { lat: 18.4620, lng: 73.9140, postalCode: '411060' },
  'nibm': { lat: 18.4760, lng: 73.8990, postalCode: '411048' },
  'kondhwa': { lat: 18.4710, lng: 73.8890, postalCode: '411048' },
  'pisoli': { lat: 18.4480, lng: 73.9180, postalCode: '411060' },
  'wagholi': { lat: 18.5810, lng: 73.9820, postalCode: '412207' },
  'viman': { lat: 18.5670, lng: 73.9140, postalCode: '411014' },
  'kalyani': { lat: 18.5480, lng: 73.9030, postalCode: '411006' },
  'keshavnagar': { lat: 18.5320, lng: 73.9310, postalCode: '411036' },
  'hadapsar': { lat: 18.5080, lng: 73.9260, postalCode: '411028' },
  'magarpatta': { lat: 18.5140, lng: 73.9280, postalCode: '411028' },
  'talegaon': { lat: 18.7340, lng: 73.6760, postalCode: '410506' },
  'tathawade': { lat: 18.6180, lng: 73.7540, postalCode: '411033' },
  'punawale': { lat: 18.6290, lng: 73.7420, postalCode: '411033' },
  'ravet': { lat: 18.6470, lng: 73.7380, postalCode: '412101' },
  'default': { lat: 18.5204, lng: 73.8567, postalCode: '411001' }
};

export async function GET() {
  const projects = await cms.getAllProjects();
  const siteUrl = 'https://vtpbluewaters.com';
  const now = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:g="http://base.google.com/ns/1.0">
  <title>VTP Realty - Google Real Estate Property Listing Feed</title>
  <link rel="self" href="${siteUrl}/google-realestate-feed.xml" />
  <link rel="alternate" href="${siteUrl}" />
  <updated>${now}</updated>
  <author>
    <name>VTP Realty Sales Intelligence</name>
    <email>sales@vtprealty.in</email>
  </author>
`;

  projects.forEach((project) => {
    const locLower = (project.location || '').toLowerCase();
    let geo = COORDINATES_MAP['default'];
    for (const key of Object.keys(COORDINATES_MAP)) {
      if (locLower.includes(key)) {
        geo = COORDINATES_MAP[key];
        break;
      }
    }

    const cleanName = (project.name || 'VTP Luxury Residence').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const cleanOverview = (project.overview || project.seoDescription || 'Luxury residences in Pune by VTP Realty.')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .substring(0, 500);

    const rera = Array.isArray(project.maharera) && project.maharera.length > 0 ? project.maharera.join(', ') : 'Registered under MahaRERA';
    const mainImage = project.image ? (project.image.startsWith('http') ? project.image : `${siteUrl}${project.image.startsWith('/') ? project.image : '/' + project.image}`) : `${siteUrl}/assets/projects/earth-1/hero.jpg`;

    // Process floor plans if available, else create standard configurations
    const configs = Array.isArray(project.floorPlans) && project.floorPlans.length > 0 
      ? project.floorPlans.filter(f => f.type && f.type.toLowerCase() !== 'configuration')
      : [{ type: '2 BHK', carpetArea: '750 - 850 Sq.ft' }, { type: '3 BHK', carpetArea: '1050 - 1450 Sq.ft' }, { type: '4 BHK', carpetArea: '1800 - 2400 Sq.ft' }];

    configs.forEach((cfg, idx) => {
      const unitId = `${project.slug}-${cfg.type.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${idx + 1}`;
      const unitTitle = `${cleanName} — ${cfg.type} Luxury Apartment in ${project.location || 'Pune'}`;
      const unitLink = `${siteUrl}/projects/${project.slug}/${cfg.type.toLowerCase().includes('2') ? '2-bhk' : cfg.type.toLowerCase().includes('3') ? '3-bhk' : cfg.type.toLowerCase().includes('4') ? '4-bhk' : 'price'}`;
      
      let approxPrice = '9000000 INR';
      if (cfg.type.toLowerCase().includes('2')) approxPrice = '9000000 INR';
      if (cfg.type.toLowerCase().includes('3')) approxPrice = '14500000 INR';
      if (cfg.type.toLowerCase().includes('4')) approxPrice = '26000000 INR';
      if (cfg.type.toLowerCase().includes('villa')) approxPrice = '45000000 INR';

      const bedrooms = cfg.type.toLowerCase().includes('2') ? '2' : cfg.type.toLowerCase().includes('3') ? '3' : cfg.type.toLowerCase().includes('4') ? '4' : '3';
      const bathrooms = cfg.type.toLowerCase().includes('2') ? '2' : cfg.type.toLowerCase().includes('3') ? '3' : cfg.type.toLowerCase().includes('4') ? '4' : '3';

      xml += `
  <entry>
    <g:id>${unitId}</g:id>
    <g:title>${unitTitle}</g:title>
    <g:description><![CDATA[${cleanOverview} | Configuration: ${cfg.type} (${cfg.carpetArea || 'MLA Design'}). MahaRERA No: ${rera}. Zero brokerage, pre-approved bank loans available.]]></g:description>
    <g:link>${unitLink}</g:link>
    <g:image_link>${mainImage.replace(/&/g, '&amp;')}</g:image_link>
    <g:price>${approxPrice}</g:price>
    <g:property_type>Apartment</g:property_type>
    <g:listing_type>for_sale</g:listing_type>
    <g:address>${project.location || 'Pune, Maharashtra'}</g:address>
    <g:city>Pune</g:city>
    <g:region>Maharashtra</g:region>
    <g:postal_code>${geo.postalCode}</g:postal_code>
    <g:country>IN</g:country>
    <g:latitude>${geo.lat}</g:latitude>
    <g:longitude>${geo.lng}</g:longitude>
    <g:num_bedrooms>${bedrooms}</g:num_bedrooms>
    <g:num_bathrooms>${bathrooms}</g:num_bathrooms>
    <g:condition>new</g:condition>
    <g:year_built>2026</g:year_built>
    <g:custom_label_0>${project.township || 'VTP Realty Luxury'}</g:custom_label_0>
    <g:custom_label_1>${rera}</g:custom_label_1>
    <g:custom_label_2>Maximum Livable Area</g:custom_label_2>
  </entry>`;
    });
  });

  xml += `
</feed>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
