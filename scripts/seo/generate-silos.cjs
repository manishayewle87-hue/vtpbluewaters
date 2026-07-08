const fs = require('fs');
const path = require('path');

const locations = [
  // Core VTP Hubs
  { id: 'mahalunge', name: 'Mahalunge', desc: 'VTP Bluewaters in Mahalunge is West Pune\'s most prestigious 200+ acre luxury township.' },
  { id: 'hinjawadi', name: 'Hinjawadi', desc: 'Invest in Hinjawadi, Pune\'s largest IT hub. Premium apartments near Rajiv Gandhi Infotech Park.' },
  { id: 'baner', name: 'Baner', desc: 'Baner offers the perfect blend of cosmopolitan lifestyle and serene living with ultra-luxury apartments.' },
  { id: 'kharadi', name: 'Kharadi', desc: 'Kharadi is the beating heart of East Pune. Discover ultra-luxury apartments near EON IT Park.' },
  
  // West & North-West (Ring Road Impact)
  { id: 'wakad', name: 'Wakad', desc: 'Wakad is a premium residential hub offering excellent connectivity to Hinjawadi IT Park and Mumbai-Pune Expressway.' },
  { id: 'balewadi', name: 'Balewadi', desc: 'Balewadi is synonymous with sports, luxury, and high-end living in West Pune.' },
  { id: 'tathawade', name: 'Tathawade', desc: 'Tathawade is an emerging educational and residential hotspot in West Pune with tremendous growth potential.' },
  { id: 'bavdhan', name: 'Bavdhan', desc: 'Bavdhan offers scenic nature views combined with premium luxury living in West Pune.' },
  { id: 'aundh', name: 'Aundh', desc: 'Aundh remains one of Pune\'s most elite, established residential corridors.' },
  { id: 'pashan', name: 'Pashan', desc: 'Pashan offers a tranquil, green environment in close proximity to major West Pune hubs.' },
  { id: 'sus', name: 'Sus', desc: 'Sus is rapidly developing into a highly preferred residential destination near the IT hubs.' },
  { id: 'kothrud', name: 'Kothrud', desc: 'Kothrud combines rich cultural heritage with modern premium residential developments.' },
  
  // East & Central (Premium Hubs)
  { id: 'kalyani-nagar', name: 'Kalyani Nagar', desc: 'Kalyani Nagar is an exclusive enclave known for its ultra-luxury lifestyle and premium connectivity.' },
  { id: 'koregaon-park', name: 'Koregaon Park', desc: 'Koregaon Park is Pune\'s most prestigious address, defined by its massive green canopy and elite residences.' },
  { id: 'viman-nagar', name: 'Viman Nagar', desc: 'Viman Nagar offers unparalleled convenience, retail hubs, and proximity to the international airport.' },
  { id: 'magarpatta', name: 'Magarpatta', desc: 'Magarpatta is the original integrated IT township and a beacon for modern residential living.' },
  { id: 'hadapsar', name: 'Hadapsar', desc: 'Hadapsar is a massive growth corridor connecting industrial parks and premium IT zones.' },
  { id: 'wagholi', name: 'Wagholi', desc: 'Wagholi is East Pune\'s fastest-growing residential destination for IT professionals.' },
  
  // PCMC & Emerging Growth
  { id: 'pcmc', name: 'PCMC', desc: 'Pimpri-Chinchwad (PCMC) offers unparalleled infrastructure and premium residential developments.' },
  { id: 'ravet', name: 'Ravet', desc: 'Ravet is the gateway to Pune, witnessing a massive boom in premium high-rise living.' },
  { id: 'punawale', name: 'Punawale', desc: 'Punawale is a prime investment hub, capitalizing on the upcoming Ring Road infrastructure.' },
  { id: 'moshi', name: 'Moshi', desc: 'Moshi is transforming into a self-sufficient residential hotspot in the PCMC region.' },
  
  // South Pune
  { id: 'undri', name: 'Undri', desc: 'Undri offers serene, large-format living away from the city chaos but with excellent connectivity.' },
  { id: 'kondhwa', name: 'Kondhwa', desc: 'Kondhwa represents the established South Pune market with diverse residential options.' },

  // Macro Zones
  { id: 'pune-west', name: 'West Pune', desc: 'West Pune is the ultimate destination for luxury real estate, IT parks, and high ROI investments.' },
  { id: 'pune-east', name: 'East Pune', desc: 'East Pune features rapidly growing IT hubs and premium residential townships.' },
  { id: 'pune-city', name: 'Pune City', desc: 'Explore the finest real estate opportunities across Pune, from luxury apartments to premium townships.' }
];

const projects = [
  { id: 'vtp-bluewaters', name: 'VTP Bluewaters', desc: 'VTP Bluewaters is a 200+ acre mega township in Mahalunge featuring premium 1, 2, 3 & 4 BHK residences.' },
  { id: 'vtp-earth-one', name: 'VTP Earth One', desc: 'VTP Earth One offers signature 2, 3, and 4 BHK luxury residences in Mahalunge, Baner Annexe.' },
  { id: 'vtp-leonara', name: 'VTP Leonara', desc: 'VTP Leonara in Mahalunge offers smartly designed homes with perfect space utilization.' },
  { id: 'vtp-bel-air', name: 'VTP Bel Air', desc: 'Experience premium riverfront living at VTP Bel Air in Mahalunge.' },
  { id: 'vtp-alpine', name: 'VTP Alpine', desc: 'VTP Alpine presents exquisite high-rise living with sweeping views of Pune.' },
  { id: 'vtp-town-square', name: 'VTP Town Square', desc: 'VTP Town Square is the premier commercial and retail destination within the Bluewaters township.' },
  { id: 'vtp-bellissimo', name: 'VTP Bellissimo', desc: 'VTP Bellissimo in Hinjawadi Phase 1 brings ultra-luxury smart homes to IT professionals.' },
  { id: 'vtp-monarque', name: 'VTP Monarque', desc: 'VTP Monarque offers unparalleled luxury and exclusivity in Hinjawadi.' },
  { id: 'vtp-altamira', name: 'VTP Altamira', desc: 'VTP Altamira brings the pinnacle of luxury living to Kharadi.' },
  { id: 'vtp-flamante', name: 'VTP Flamante', desc: 'VTP Flamante in Kharadi offers premium residences with state-of-the-art amenities.' }
];

const categories = [
  { id: 'luxury-apartments', prefix: 'Luxury Apartments in', suffix: 'Luxury Apartments' },
  { id: 'premium-flats', prefix: 'Premium Flats in', suffix: 'Premium Flats' },
  { id: 'new-launch-projects', prefix: 'New Launch Projects in', suffix: 'New Launch Projects' },
  { id: 'township-projects', prefix: 'Township Projects in', suffix: 'Township Projects' },
  { id: 'real-estate-investment', prefix: 'Real Estate Investment in', suffix: 'Real Estate Investment' },
  
  // Exact Match Configs
  { id: '2bhk', prefix: '2BHK in', suffix: '2BHK Flats' },
  { id: '3bhk', prefix: '3BHK in', suffix: '3BHK Luxury Homes' },
  { id: '4bhk', prefix: '4BHK in', suffix: '4BHK Premium Apartments' },
  { id: '5bhk', prefix: '5BHK in', suffix: '5BHK Villas' },
  { id: '2-bhk-flats', prefix: '2 BHK Flats in', suffix: '2 BHK' },
  { id: '3-bhk-flats', prefix: '3 BHK Flats in', suffix: '3 BHK' },
  { id: '4-bhk-flats', prefix: '4 BHK Flats in', suffix: '4 BHK' },
  
  // Ultra-Luxury & Architectural (HNWI Targeting)
  { id: 'duplex', prefix: 'Luxury Duplex in', suffix: 'Duplex Apartments' },
  { id: 'skyduplex', prefix: 'Sky Duplex in', suffix: 'Sky Duplex' },
  { id: 'simplex', prefix: 'Simplex Flats in', suffix: 'Simplex Apartments' },
  { id: 'penthouse', prefix: 'Ultra-Luxury Penthouse in', suffix: 'Penthouses' },
  { id: 'double-height', prefix: 'Double-Height Living in', suffix: 'Double-Height Homes' },
  { id: 'private-pool', prefix: 'Apartments with Private Pool in', suffix: 'Private Plunge Pool Flats' },
  { id: 'nri-investment', prefix: 'NRI Real Estate Investment in', suffix: 'NRI Premium Homes' },
  
  // Broad Intents
  { id: 'properties', prefix: 'Properties in', suffix: 'Properties' },
  { id: 'flats', prefix: 'Flats in', suffix: 'Flats' },
  { id: 'ready-possession', prefix: 'Ready Possession Flats in', suffix: 'Ready Possession' },
  { id: 'under-construction', prefix: 'Under Construction Projects in', suffix: 'Under Construction' },
  { id: 'it-park-homes', prefix: 'Homes near IT Park in', suffix: 'IT Park Homes' },
  { id: 'mla-homes', prefix: 'Maximum Livable Area Homes in', suffix: 'MLA Homes' },
  { id: 'vtp-projects', prefix: 'VTP Projects in', suffix: 'VTP Projects' }
];

const generateSlug = (str) => {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

const silos = [];

// 1. Generate Location-Based Silos (e.g., "Luxury Apartments in Mahalunge")
locations.forEach(loc => {
  const slugs = categories.map(cat => {
    const keyword = `${cat.prefix} ${loc.name}`;
    return { slug: generateSlug(keyword), keyword };
  });
  
  // Add reverse combinations (e.g., "Mahalunge Luxury Apartments")
  categories.forEach(cat => {
    const keyword = `${loc.name} ${cat.suffix}`;
    slugs.push({ slug: generateSlug(keyword), keyword });
  });

  silos.push({
    id: `location-${loc.id}`,
    title: `${loc.name} Real Estate & Properties`,
    description: loc.desc,
    slugs: slugs
  });
});

// 2. Generate Project-Based Silos (e.g., "VTP Earth One 3 BHK Price")
const projectIntents = [
  'Price', 'Floor Plan', 'Brochure', 'Reviews', 'Location', 
  'Construction Status', 'Sample Flat', 'Master Plan', 'Investment', 
  '2 BHK', '3 BHK', '4 BHK', 'Possession Date', 'RERA Number', 
  'Contact Number', 'Latest Photos', 'Township Layout', 'Amenities', 
  'Maximum Livable Area', 'vs Godrej Hillside', 'vs Competitors', 
  'NRI Investment', 'Resale', 'Rent', 'Floor Plan PDF', 
  'Walkthrough Video', 'Smart Homes', 'IT Park Proximity', 'Pre EMI Offer'
];

projects.forEach(proj => {
  const slugs = projectIntents.map(intent => {
    const keyword = `${proj.name} ${intent}`;
    return { slug: generateSlug(keyword), keyword };
  });

  // Cross-pollinate projects with ALL Pune locations to intercept buyers city-wide
  locations.forEach(loc => {
    const keyword = `${proj.name} for buyers in ${loc.name}`;
    slugs.push({ slug: generateSlug(keyword), keyword });
  });

  silos.push({
    id: `project-${proj.id}`,
    title: `${proj.name} Project Details`,
    description: proj.desc,
    slugs: slugs
  });
});

// 3. Generate High-Volume Theme Silos
const themes = [
  { id: 'pune-smart-city', name: 'Pune Smart City Projects' },
  { id: 'riverfront-living', name: 'Riverfront Living Pune' },
  { id: 'high-roi-investment', name: 'High ROI Investment Pune' },
  { id: 'zero-brokerage-flats', name: 'Zero Brokerage Flats Pune' },
  { id: 'rera-registered-projects', name: 'RERA Registered Projects Pune' },
  { id: 'best-areas-invest-2026', name: 'Best Areas to Invest in Pune 2026' },
  { id: 'pune-real-estate-market', name: 'Pune Real Estate Market Trends' },
  { id: 'walk-to-work-homes', name: 'Walk-to-Work Homes Pune' },
  { id: 'metro-connected-properties', name: 'Properties near Pune Metro' }
];

themes.forEach(theme => {
  const slugs = locations.slice(0, 5).map(loc => {
    const keyword = `${theme.name} in ${loc.name}`;
    return { slug: generateSlug(keyword), keyword };
  });
  
  silos.push({
    id: `theme-${theme.id}`,
    title: theme.name,
    description: `Discover the best ${theme.name.toLowerCase()} for exceptional lifestyle and returns.`,
    slugs: slugs
  });
});

const fileContent = `// AUTO-GENERATED SEO SILOS DATABASE
// Generated via programmatic SEO engine for massive keyword injection.
// Total Silos: ${silos.length}
// Total Keywords: ${silos.reduce((acc, curr) => acc + curr.slugs.length, 0)}

export const seoSilos = ${JSON.stringify(silos, null, 2)};
`;

const outputPath = path.join(__dirname, '../../app/data/seo-silos.js');
fs.writeFileSync(outputPath, fileContent, 'utf8');

console.log("Successfully generated " + silos.length + " silos and " + silos.reduce((acc, curr) => acc + curr.slugs.length, 0) + " keywords.");
