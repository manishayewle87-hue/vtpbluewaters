/**
 * Keyword Expansion Generator for VTP Blue Waters
 * 
 * Generates new SEO silos for:
 *   1. VTP Project-specific brand keywords (8 projects x ~60 variants = ~480)
 *   2. New Pune location silos (10 new locations x ~70 keywords = ~700)
 *   3. Pune city-wide real estate keywords (~100)
 *   4. VTP Realty brand + competitor capture (~80)
 * 
 * Run: node scripts/generate-seo-expansion.mjs
 * Output: app/data/seo-expansion.js  (to be appended into seo-silos.js)
 */

import { writeFileSync, readFileSync } from 'fs';

// ─── VTP PROJECTS ───────────────────────────────────────────────────────────
const vtpProjects = [
  {
    name: 'VTP Altamira',
    display: 'ALTAMIRA BY VTP LUXE',
    slug_prefix: 'vtp-altamira',
    location: 'Kharadi',
    township: 'Pegasus',
    configs: ['2 BHK', '3 BHK', '4 BHK', 'Simplex', 'Duplex'],
  },
  {
    name: 'VTP Monarque',
    display: 'MONARQUE BY VTP LUXE',
    slug_prefix: 'vtp-monarque',
    location: 'Hinjawadi',
    township: 'Blue Waters',
    configs: ['2 BHK', '3 BHK', '4 BHK', 'Duplex', 'Mansion'],
  },
  {
    name: 'VTP Earth 1',
    display: 'EARTH 1 BY VTP LUXE',
    slug_prefix: 'vtp-earth-1',
    location: 'Mahalunge',
    township: 'Blue Waters',
    configs: ['2 BHK', '3 BHK', '4 BHK', 'Simplex', 'Duplex'],
  },
  {
    name: 'VTP Flamante',
    display: 'FLAMANTE BY VTP LUXE',
    slug_prefix: 'vtp-flamante',
    location: 'Kharadi',
    township: 'Pegasus',
    configs: ['2 BHK', '3 BHK', '4 BHK', 'Simplex', 'Duplex'],
  },
  {
    name: 'VTP Velvet Villas',
    display: 'VELVET VILLAS BY VTP LUXE',
    slug_prefix: 'vtp-velvet-villas',
    location: 'Kharadi',
    township: 'Pegasus',
    configs: ['2 BHK', '3 BHK', '4 BHK Mansion'],
  },
  {
    name: 'VTP Cielo',
    display: 'CIELO BY VTP LUXE',
    slug_prefix: 'vtp-cielo',
    location: 'Bavdhan',
    township: 'Standalone',
    configs: ['2 BHK', '3 BHK', '4 BHK'],
  },
  {
    name: 'VTP Aurelia',
    display: 'VTP AURELIA',
    slug_prefix: 'vtp-aurelia',
    location: 'Kharadi',
    township: 'Pegasus',
    configs: ['2 BHK', '3 BHK', '4 BHK Mansion'],
  },
  {
    name: 'VTP Volare',
    display: 'VTP VOLARE',
    slug_prefix: 'vtp-volare',
    location: 'Hinjawadi',
    township: 'Blue Waters',
    configs: ['2 BHK', '3 BHK', '4 BHK'],
  },
];

function slugify(str) {
  return str.toLowerCase().replace(/[&]/g, 'and').replace(/[\s\/]+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// ─── BUILD VTP PROJECT SILOS ─────────────────────────────────────────────────
function buildProjectSilos(projects) {
  return projects.map(p => {
    const loc = p.location;
    const name = p.name;
    const display = p.display;
    const pfx = p.slug_prefix;
    const township = p.township;

    const variants = [
      // Brand exact match
      [`${name}`, `${display}`],
      [`${name}-pune`, `${name} Pune`],
      [`${name}-${slugify(loc)}`, `${name} ${loc}`],
      [`${name}-price`, `${name} Price`],
      [`${name}-price-list`, `${name} Price List`],
      [`${name}-floor-plan`, `${name} Floor Plan`],
      [`${name}-floor-plans`, `${name} Floor Plans`],
      [`${name}-layout-plan`, `${name} Layout Plan`],
      [`${name}-master-plan`, `${name} Master Plan`],
      [`${name}-brochure`, `${name} Brochure`],
      [`${name}-amenities`, `${name} Amenities`],
      [`${name}-review`, `${name} Review`],
      [`${name}-location`, `${name} Location`],
      [`${name}-possession-date`, `${name} Possession Date`],
      [`${name}-rera`, `${name} RERA`],
      [`${name}-maharera`, `${name} MahaRERA`],
      [`${name}-site-plan`, `${name} Site Plan`],
      [`${name}-virtual-tour`, `${name} Virtual Tour`],
      [`${name}-construction-update`, `${name} Construction Update`],
      [`${name}-sample-flat`, `${name} Sample Flat`],
      [`${name}-booking`, `${name} Booking`],
      [`${name}-buy`, `Buy ${name}`],
      [`${name}-invest`, `Invest in ${name}`],
      [`${name}-nri`, `${name} NRI Investment`],
      [`${name}-resale`, `${name} Resale`],
      [`${name}-resale-price`, `${name} Resale Price`],
      [`${name}-pre-launch`, `${name} Pre-Launch Offer`],
      [`${name}-launch-date`, `${name} Launch Date`],
      [`${name}-contact`, `${name} Contact`],
      [`${name}-site-visit`, `${name} Site Visit`],
      [`${name}-video`, `${name} Video`],
      [`${name}-township`, `${name} Township ${township}`],
      // Per config keywords
      ...p.configs.map(cfg => {
        const cfgSlug = slugify(cfg);
        return [`${pfx}-${cfgSlug}`, `${name} ${cfg}`];
      }),
      ...p.configs.map(cfg => {
        const cfgSlug = slugify(cfg);
        return [`${pfx}-${cfgSlug}-price`, `${name} ${cfg} Price`];
      }),
      ...p.configs.map(cfg => {
        const cfgSlug = slugify(cfg);
        return [`${pfx}-${cfgSlug}-floor-plan`, `${name} ${cfg} Floor Plan`];
      }),
      ...p.configs.map(cfg => {
        const cfgSlug = slugify(cfg);
        return [`${pfx}-${cfgSlug}-carpet-area`, `${name} ${cfg} Carpet Area`];
      }),
      // Competitor comparison keywords (high-intent)
      [`${name}-vs-godrej`, `${name} vs Godrej Properties`],
      [`${name}-vs-prestige`, `${name} vs Prestige Estates`],
      [`${name}-vs-lodha`, `${name} vs Lodha Group`],
      [`${name}-vs-sobha`, `${name} vs Sobha Developers`],
      // Long-tail transactional
      [`luxury-flats-${slugify(loc)}-${pfx}`, `Luxury Flats in ${loc} - ${name}`],
      [`premium-apartments-${slugify(loc)}-${pfx}`, `Premium Apartments in ${loc} - ${name}`],
      [`ready-possession-${pfx}`, `${name} Ready Possession`],
      [`under-construction-${pfx}`, `${name} Under Construction`],
      [`emi-calculator-${pfx}`, `${name} EMI Calculator`],
      [`home-loan-${pfx}`, `${name} Home Loan`],
      [`investment-${pfx}`, `${name} Investment Opportunity`],
      [`walk-score-${pfx}`, `${name} Walk Score Connectivity`],
    ];

    return {
      id: `project-${pfx}`,
      title: `${display} - Project Keywords`,
      description: `${display} is a premium luxury residential project by VTP Realty in ${loc}, Pune. Township: ${township}. Offering Maximum Livable Area philosophy, world-class amenities, and premium lifestyle.`,
      slugs: variants.map(([slug, keyword]) => ({
        slug: slug.replace(/^-|-$/g, ''),
        keyword,
      })),
    };
  });
}

// ─── NEW PUNE LOCATION SILOS ─────────────────────────────────────────────────
const newLocations = [
  {
    id: 'location-kharadi',
    name: 'Kharadi',
    title: 'Kharadi Real Estate & Properties',
    description: 'Kharadi is Pune\'s fastest-growing IT and commercial hub with premium luxury apartments near EON IT Park and Commerzone.',
  },
  {
    id: 'location-bavdhan',
    name: 'Bavdhan',
    title: 'Bavdhan Real Estate & Properties',
    description: 'Bavdhan offers a serene, green environment with excellent connectivity to Hinjawadi IT Park and Baner. Premium luxury apartments with lush valley views.',
  },
  {
    id: 'location-wakad',
    name: 'Wakad',
    title: 'Wakad Real Estate & Properties',
    description: 'Wakad is a thriving residential suburb with excellent connectivity to Hinjawadi IT Park. Premium flats and luxury apartments at competitive price points.',
  },
  {
    id: 'location-pimple-saudagar',
    name: 'Pimple Saudagar',
    title: 'Pimple Saudagar Real Estate & Properties',
    description: 'Pimple Saudagar is an upscale residential locality in west Pune offering premium apartments with great connectivity to IT hubs.',
  },
  {
    id: 'location-wanowrie',
    name: 'Wanowrie',
    title: 'Wanowrie Real Estate & Properties',
    description: 'Wanowrie is a premium residential area in south Pune with excellent connectivity to Hadapsar IT Park, Magarpatta City, and Pune airport.',
  },
  {
    id: 'location-hadapsar',
    name: 'Hadapsar',
    title: 'Hadapsar Real Estate & Properties',
    description: 'Hadapsar is a prime residential and IT destination in east Pune, home to Magarpatta City and SP Infocity. Premium apartments with excellent ROI.',
  },
  {
    id: 'location-wagholi',
    name: 'Wagholi',
    title: 'Wagholi Real Estate & Properties',
    description: 'Wagholi is an emerging residential hub in east Pune with affordable luxury apartments and excellent connectivity to Kharadi IT corridor.',
  },
  {
    id: 'location-sus',
    name: 'Sus',
    title: 'Sus Road Real Estate & Properties',
    description: 'Sus Road is an upscale residential micro-market adjacent to Baner and Pashan, offering premium villas, row houses, and luxury apartments in a green corridor.',
  },
  {
    id: 'location-tathawade',
    name: 'Tathawade',
    title: 'Tathawade Real Estate & Properties',
    description: 'Tathawade is a premium locality in the Pimpri-Chinchwad jurisdiction with excellent Hinjawadi IT Park connectivity and luxury housing options.',
  },
  {
    id: 'location-pashan',
    name: 'Pashan',
    title: 'Pashan Real Estate & Properties',
    description: 'Pashan is a serene, upscale residential area in west Pune with premium apartment projects, excellent IT Park connectivity, and lush green surroundings.',
  },
];

const locationKeywordTemplates = (locName) => {
  const l = locName;
  const sl = slugify(l);
  return [
    [`luxury-apartments-in-${sl}`, `Luxury Apartments in ${l}`],
    [`premium-flats-in-${sl}`, `Premium Flats in ${l}`],
    [`new-launch-projects-in-${sl}`, `New Launch Projects in ${l}`],
    [`township-projects-in-${sl}`, `Township Projects in ${l}`],
    [`real-estate-investment-in-${sl}`, `Real Estate Investment in ${l}`],
    [`1bhk-in-${sl}`, `1BHK in ${l}`],
    [`2bhk-in-${sl}`, `2BHK in ${l}`],
    [`3bhk-in-${sl}`, `3BHK in ${l}`],
    [`4bhk-in-${sl}`, `4BHK in ${l}`],
    [`5bhk-in-${sl}`, `5BHK in ${l}`],
    [`1-bhk-flats-in-${sl}`, `1 BHK Flats in ${l}`],
    [`2-bhk-flats-in-${sl}`, `2 BHK Flats in ${l}`],
    [`3-bhk-flats-in-${sl}`, `3 BHK Flats in ${l}`],
    [`4-bhk-flats-in-${sl}`, `4 BHK Flats in ${l}`],
    [`studio-apartments-in-${sl}`, `Studio Apartments in ${l}`],
    [`luxury-duplex-in-${sl}`, `Luxury Duplex in ${l}`],
    [`sky-duplex-in-${sl}`, `Sky Duplex in ${l}`],
    [`simplex-flats-in-${sl}`, `Simplex Flats in ${l}`],
    [`ultra-luxury-penthouse-in-${sl}`, `Ultra-Luxury Penthouse in ${l}`],
    [`double-height-living-in-${sl}`, `Double-Height Living in ${l}`],
    [`apartments-with-private-pool-in-${sl}`, `Apartments with Private Pool in ${l}`],
    [`nri-real-estate-investment-in-${sl}`, `NRI Real Estate Investment in ${l}`],
    [`properties-in-${sl}`, `Properties in ${l}`],
    [`flats-in-${sl}`, `Flats in ${l}`],
    [`villas-in-${sl}`, `Villas in ${l}`],
    [`row-houses-in-${sl}`, `Row Houses in ${l}`],
    [`commercial-properties-in-${sl}`, `Commercial Properties in ${l}`],
    [`retail-shops-in-${sl}`, `Retail Shops in ${l}`],
    [`office-spaces-in-${sl}`, `Office Spaces in ${l}`],
    [`ready-possession-flats-in-${sl}`, `Ready Possession Flats in ${l}`],
    [`under-construction-projects-in-${sl}`, `Under Construction Projects in ${l}`],
    [`homes-near-it-park-in-${sl}`, `Homes near IT Park in ${l}`],
    [`maximum-livable-area-homes-in-${sl}`, `Maximum Livable Area Homes in ${l}`],
    [`vtp-projects-in-${sl}`, `VTP Projects in ${l}`],
    [`${sl}-luxury-apartments`, `${l} Luxury Apartments`],
    [`${sl}-premium-flats`, `${l} Premium Flats`],
    [`${sl}-new-projects`, `${l} New Projects`],
    [`${sl}-2bhk-flats`, `${l} 2BHK Flats`],
    [`${sl}-3bhk-luxury-homes`, `${l} 3BHK Luxury Homes`],
    [`${sl}-4bhk-premium-apartments`, `${l} 4BHK Premium Apartments`],
    [`${sl}-penthouses`, `${l} Penthouses`],
    [`${sl}-nri-premium-homes`, `${l} NRI Premium Homes`],
    [`${sl}-properties`, `${l} Properties`],
    [`${sl}-flats`, `${l} Flats`],
    [`${sl}-villas`, `${l} Villas`],
    [`${sl}-ready-possession`, `${l} Ready Possession`],
    [`${sl}-under-construction`, `${l} Under Construction`],
    [`${sl}-it-park-homes`, `${l} IT Park Homes`],
    [`${sl}-mla-homes`, `${l} MLA Homes`],
    [`${sl}-vtp-projects`, `${l} VTP Projects`],
    [`property-price-in-${sl}`, `Property Price in ${l}`],
    [`flat-price-in-${sl}`, `Flat Price in ${l}`],
    [`apartment-price-in-${sl}`, `Apartment Price in ${l}`],
    [`real-estate-price-${sl}`, `Real Estate Price ${l}`],
    [`home-loan-${sl}`, `Home Loan ${l} Properties`],
    [`emi-calculator-${sl}`, `EMI Calculator ${l}`],
    [`rera-registered-projects-${sl}`, `RERA Registered Projects ${l}`],
    [`maharera-projects-${sl}`, `MahaRERA Projects ${l}`],
    [`smart-home-${sl}`, `Smart Home Apartments ${l}`],
    [`gated-community-${sl}`, `Gated Community ${l}`],
    [`high-rise-apartments-${sl}`, `High-Rise Apartments ${l}`],
    [`low-rise-apartments-${sl}`, `Low-Rise Apartments ${l}`],
    [`township-living-${sl}`, `Township Living ${l}`],
    [`buy-flat-${sl}`, `Buy Flat in ${l}`],
    [`buy-apartment-${sl}`, `Buy Apartment in ${l}`],
    [`invest-property-${sl}`, `Invest in Property ${l}`],
    [`high-roi-${sl}`, `High ROI Properties ${l}`],
    [`rental-yield-${sl}`, `Rental Yield Properties ${l}`],
  ];
};

function buildLocationSilos(locations) {
  return locations.map(loc => ({
    id: loc.id,
    title: loc.title,
    description: loc.description,
    slugs: locationKeywordTemplates(loc.name).map(([slug, keyword]) => ({ slug, keyword })),
  }));
}

// ─── PUNE CITY-WIDE SILOS ─────────────────────────────────────────────────────
function buildPuneCitySilos() {
  const configs = ['2 BHK', '3 BHK', '4 BHK', 'Luxury', 'Premium', 'Ultra-Luxury'];
  const intents = [
    ['luxury-apartments-in-pune', 'Luxury Apartments in Pune'],
    ['premium-flats-in-pune', 'Premium Flats in Pune'],
    ['luxury-real-estate-pune', 'Luxury Real Estate Pune'],
    ['real-estate-investment-pune', 'Real Estate Investment Pune'],
    ['buy-apartment-pune', 'Buy Apartment in Pune'],
    ['buy-flat-pune', 'Buy Flat in Pune'],
    ['new-launch-projects-pune', 'New Launch Projects Pune 2025'],
    ['upcoming-projects-pune', 'Upcoming Residential Projects Pune'],
    ['township-projects-pune', 'Township Projects Pune'],
    ['rera-registered-projects-pune', 'RERA Registered Projects Pune'],
    ['maharera-projects-pune', 'MahaRERA Projects Pune'],
    ['nri-investment-pune', 'NRI Investment Pune Real Estate'],
    ['nri-property-pune', 'NRI Property Pune'],
    ['best-locality-buy-flat-pune', 'Best Locality to Buy Flat in Pune'],
    ['most-luxurious-apartments-pune', 'Most Luxurious Apartments in Pune'],
    ['top-builders-pune', 'Top Builders in Pune'],
    ['best-developers-pune', 'Best Real Estate Developers Pune'],
    ['vtp-realty-pune', 'VTP Realty Pune'],
    ['vtp-realty-projects-pune', 'VTP Realty Projects Pune'],
    ['vtp-realty-new-launch', 'VTP Realty New Launch 2025'],
    ['vtp-realty-review', 'VTP Realty Review'],
    ['vtp-realty-contact', 'VTP Realty Contact Number'],
    ['vtp-realty-blue-waters', 'VTP Realty Blue Waters Township'],
    ['vtp-blue-waters-pune', 'VTP Blue Waters Pune'],
    ['vtp-blue-waters-mahalunge', 'VTP Blue Waters Mahalunge'],
    ['vtp-blue-waters-hinjawadi', 'VTP Blue Waters Hinjawadi'],
    ['vtp-township-pegasus', 'VTP Township Pegasus Kharadi'],
    ['pune-it-corridor-property', 'Property in Pune IT Corridor'],
    ['pune-west-luxury-apartments', 'Luxury Apartments West Pune'],
    ['pune-east-luxury-apartments', 'Luxury Apartments East Pune'],
    ['pune-2bhk-apartments', '2 BHK Apartments Pune'],
    ['pune-3bhk-apartments', '3 BHK Apartments Pune'],
    ['pune-4bhk-apartments', '4 BHK Apartments Pune'],
    ['pune-luxury-villas', 'Luxury Villas in Pune'],
    ['pune-penthouse', 'Penthouse in Pune'],
    ['pune-sky-duplex', 'Sky Duplex in Pune'],
    ['pune-mla-philosophy', 'Maximum Livable Area Homes Pune'],
    ['pune-smart-home', 'Smart Home Apartments Pune'],
    ['pune-gated-community', 'Gated Community Apartments Pune'],
    ['pune-high-rise', 'High Rise Apartments Pune'],
    ['pune-real-estate-2025', 'Pune Real Estate Market 2025'],
    ['pune-property-price', 'Pune Property Price 2025'],
    ['pune-flat-rate', 'Pune Flat Rate per Sq Ft'],
    ['pune-property-appreciation', 'Pune Property Appreciation Rate'],
    ['pune-rental-yield', 'Pune Rental Yield Properties'],
    ['pune-home-loan', 'Home Loan for Pune Property'],
    ['pune-emi-calculator', 'Pune Property EMI Calculator'],
    ['under-construction-projects-pune', 'Under Construction Projects Pune'],
    ['ready-possession-apartments-pune', 'Ready Possession Apartments Pune'],
    ['possession-2025-pune', 'Property Possession 2025 Pune'],
    ['possession-2026-pune', 'Property Possession 2026 Pune'],
    ['best-investment-pune', 'Best Property Investment Pune'],
    ['high-roi-property-pune', 'High ROI Property Pune'],
    ['pune-luxury-homes-price', 'Luxury Homes Price in Pune'],
    ['commercial-property-pune', 'Commercial Property Pune'],
    ['office-space-pune', 'Office Space for Sale Pune'],
    // Competitor-capturing
    ['godrej-properties-pune-alternative', 'Godrej Properties Pune Alternative'],
    ['lodha-pune-alternative', 'Lodha Pune Alternative'],
    ['prestige-pune-alternative', 'Prestige Estates Pune Alternative'],
    ['sobha-pune-alternative', 'Sobha Developers Pune Alternative'],
    ['kolte-patil-alternative', 'Kolte Patil Alternative Pune'],
    ['kul-corp-alternative', 'KUL Corp Alternative Pune'],
    ['amanora-pune-alternative', 'Amanora Park Town Alternative'],
    ['magarpatta-city-alternative', 'Magarpatta City Alternative Pune'],
    ['naiknavare-alternative', 'Naiknavare Developers Alternative'],
    ['pune-luxury-vs-mumbai', 'Pune Luxury Property vs Mumbai'],
    // VTP Realty-specific brand capture
    ['vtp-realty-altamira', 'VTP Realty Altamira Kharadi'],
    ['vtp-realty-monarque', 'VTP Realty Monarque Hinjawadi'],
    ['vtp-realty-earth-1', 'VTP Realty Earth 1 Mahalunge'],
    ['vtp-realty-flamante', 'VTP Realty Flamante Kharadi'],
    ['vtp-realty-velvet-villas', 'VTP Realty Velvet Villas Kharadi'],
    ['vtp-realty-cielo', 'VTP Realty Cielo Bavdhan'],
    ['vtp-realty-aurelia', 'VTP Realty Aurelia Kharadi'],
    ['vtp-realty-volare', 'VTP Realty Volare Hinjawadi'],
    ['vtp-luxe-brand', 'VTP Luxe Brand Apartments'],
    ['vtp-realty-mla-philosophy', 'VTP Realty Maximum Livable Area Philosophy'],
    ['vtp-realty-zero-brokerage', 'VTP Realty Zero Brokerage'],
    ['vtp-realty-sample-flat', 'VTP Realty Sample Flat Pune'],
    ['vtp-realty-site-visit', 'VTP Realty Site Visit Booking'],
    ['vtp-realty-brochure', 'VTP Realty Project Brochure Download'],
    ['vtp-realty-price-list', 'VTP Realty Price List 2025'],
    ['vtp-realty-floor-plan', 'VTP Realty Floor Plan'],
    ['vtp-realty-amenities', 'VTP Realty Amenities'],
    ['vtp-realty-virtual-tour', 'VTP Realty Virtual Tour'],
    ['vtp-realty-360-tour', 'VTP Realty 360 Degree Tour'],
    ['vtp-realty-investor-presentation', 'VTP Realty Investor Presentation'],
    ['vtp-realty-annual-report', 'VTP Realty Annual Report'],
    ['vtp-realty-award-winning', 'VTP Realty Award Winning Developer'],
    ['vtp-realty-track-record', 'VTP Realty Track Record Delivered Projects'],
  ];

  return {
    id: 'pune-citywide-real-estate',
    title: 'Pune City-Wide Real Estate & VTP Brand',
    description: 'Comprehensive Pune city-wide real estate keywords including VTP Realty brand keywords, competitor capture, and high-intent buyer queries across all Pune locations.',
    slugs: intents.map(([slug, keyword]) => ({ slug, keyword })),
  };
}

// ─── GENERATE ALL SILOS ──────────────────────────────────────────────────────
const projectSilos = buildProjectSilos(vtpProjects);
const locationSilos = buildLocationSilos(newLocations);
const citySilo = buildPuneCitySilos();

const allNewSilos = [...projectSilos, ...locationSilos, citySilo];

const totalNew = allNewSilos.reduce((a, s) => a + s.slugs.length, 0);
console.log(`Generated ${allNewSilos.length} new silos with ${totalNew} new keywords`);

// ─── INJECT INTO seo-silos.js ────────────────────────────────────────────────
const silosPath = 'app/data/seo-silos.js';
let existing = readFileSync(silosPath, 'utf-8');

// Remove the closing ]; and append new silos before it
const newEntries = allNewSilos.map(s => JSON.stringify(s, null, 2)).join(',\n');
existing = existing.trimEnd().replace(/\];?\s*$/, '');
existing = existing.trimEnd().replace(/,\s*$/, '');
existing += `,\n${newEntries}\n];\n`;

writeFileSync(silosPath, existing, 'utf-8');
console.log(`✅ Successfully injected ${totalNew} new keywords into seo-silos.js`);
