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
  { id: 'sinhagad-road', name: 'Sinhagad Road', desc: 'Sinhagad Road is a massive residential corridor favored by traditional Pune families.' },
  { id: 'dhayari', name: 'Dhayari', desc: 'Dhayari offers affordable yet premium living spaces in South-West Pune.' },
  { id: 'nanded-city', name: 'Nanded City', desc: 'Nanded City is a massive, well-established integrated township ecosystem.' },

  // Emerging & Tier-2 Areas
  { id: 'pimple-saudagar', name: 'Pimple Saudagar', desc: 'Pimple Saudagar is a highly cosmopolitan hub preferred by PCMC IT professionals.' },
  { id: 'pimple-nilakh', name: 'Pimple Nilakh', desc: 'Pimple Nilakh offers excellent connectivity to Baner and Wakad IT hubs.' },
  { id: 'chikhali', name: 'Chikhali', desc: 'Chikhali is witnessing rapid industrial and residential growth in the PCMC belt.' },
  { id: 'charholi', name: 'Charholi', desc: 'Charholi is emerging as a well-planned luxury destination near the airport.' },
  { id: 'lohegaon', name: 'Lohegaon', desc: 'Lohegaon is the prime residential market driven by its proximity to the airport and IT parks.' },
  { id: 'dhanori', name: 'Dhanori', desc: 'Dhanori is East Pune\'s fast-emerging destination for premium housing.' },
  { id: 'vishrantwadi', name: 'Vishrantwadi', desc: 'Vishrantwadi connects central Pune to the eastern IT corridors.' },
  { id: 'karve-nagar', name: 'Karve Nagar', desc: 'Karve Nagar offers a blend of traditional Pune culture and premium new developments.' },
  { id: 'warje', name: 'Warje', desc: 'Warje acts as a critical gateway connecting South and West Pune.' },
  { id: 'talegaon', name: 'Talegaon', desc: 'Talegaon is a massive industrial hub and a prime location for second homes.' },
  { id: 'lonavala', name: 'Lonavala', desc: 'Lonavala is the ultimate luxury destination for private villas and holiday homes.' },

  // Macro Zones
  { id: 'pune-west', name: 'West Pune', desc: 'West Pune is the ultimate destination for luxury real estate, IT parks, and high ROI investments.' },
  { id: 'pune-east', name: 'East Pune', desc: 'East Pune features rapidly growing IT hubs and premium residential townships.' },
  { id: 'pune-city', name: 'Pune City', desc: 'Explore the finest real estate opportunities across Pune, from luxury apartments to premium townships.' },
  { id: 'pcmc-region', name: 'PCMC Region', desc: 'Pimpri-Chinchwad is the industrial powerhouse driving massive real estate demand.' },

  // Global NRI Hubs (Targeting "across the globe")
  { id: 'dubai', name: 'Dubai', desc: 'Premium Pune real estate investment opportunities for NRI investors in Dubai, UAE.' },
  { id: 'singapore', name: 'Singapore', desc: 'High ROI Pune luxury apartments and townships for NRI investors based in Singapore.' },
  { id: 'london', name: 'London', desc: 'Secure high-yield real estate investments in Pune from London, UK.' },
  { id: 'new-york', name: 'New York', desc: 'Exclusive Pune property investment portfolios for NRI buyers in New York, USA.' },
  { id: 'san-francisco', name: 'San Francisco', desc: 'Premium IT-hub adjacent Pune real estate for tech professionals in San Francisco Bay Area.' },
  { id: 'sydney', name: 'Sydney', desc: 'Top-tier Pune residential townships for NRI investors in Sydney, Australia.' },
  { id: 'melbourne', name: 'Melbourne', desc: 'Invest in Pune\'s rapidly appreciating real estate market from Melbourne, Australia.' },
  { id: 'toronto', name: 'Toronto', desc: 'Lucrative Pune real estate opportunities for NRI investors based in Toronto, Canada.' },
  { id: 'qatar', name: 'Qatar', desc: 'Premium Pune luxury properties and townships for NRI investors in Qatar.' },
  { id: 'kuwait', name: 'Kuwait', desc: 'High-return Pune real estate investments designed for NRI buyers in Kuwait.' },
  { id: 'bahrain', name: 'Bahrain', desc: 'Exclusive Pune property investments for NRI buyers located in Bahrain.' }
];

const projects = [
  // West Pune Projects (Bluewaters & Baner)
  { id: 'vtp-bluewaters', name: 'VTP Bluewaters', desc: 'VTP Bluewaters is a 200+ acre mega township in Mahalunge featuring premium 1, 2, 3 & 4 BHK residences.' },
  { id: 'vtp-earth-one', name: 'VTP Earth One', desc: 'VTP Earth One offers signature 2, 3, and 4 BHK luxury residences in Mahalunge, Baner Annexe.' },
  { id: 'vtp-leonara', name: 'VTP Leonara', desc: 'VTP Leonara in Mahalunge offers smartly designed homes with perfect space utilization.' },
  { id: 'vtp-bel-air', name: 'VTP Bel Air', desc: 'Experience premium riverfront living at VTP Bel Air in Mahalunge.' },
  { id: 'vtp-alpine', name: 'VTP Alpine', desc: 'VTP Alpine presents exquisite high-rise living with sweeping views of Pune.' },
  { id: 'vtp-aethereus', name: 'VTP Aethereus', desc: 'VTP Aethereus is a landmark development in Mahalunge offering premium homes and high-street retail.' },
  { id: 'vtp-town-square', name: 'VTP Town Square', desc: 'VTP Town Square is the premier commercial and retail destination within the Bluewaters township.' },
  { id: 'vtp-sierra', name: 'VTP Sierra', desc: 'VTP Sierra in Baner-Sus offers Spanish-inspired, spacious 2 & 3 BHK homes at the foothills.' },
  { id: 'vtp-verve', name: 'VTP Verve', desc: 'VTP Verve presents contemporary urban living in the highly sought-after Baner-Sus corridor.' },
  { id: 'vtp-solitaire', name: 'VTP Solitaire', desc: 'VTP Solitaire brings exclusive, premium living to Pashan.' },
  
  // Hinjawadi Projects
  { id: 'vtp-bellissimo', name: 'VTP Bellissimo', desc: 'VTP Bellissimo in Hinjawadi Phase 1 brings ultra-luxury smart homes to IT professionals.' },
  { id: 'vtp-monarque', name: 'VTP Monarque', desc: 'VTP Monarque offers unparalleled luxury, infinity pools, and exclusivity in Hinjawadi Phase 1.' },
  
  // East Pune Projects (Kharadi & Wagholi)
  { id: 'vtp-pegasus', name: 'VTP Pegasus', desc: 'VTP Pegasus is the mega-township in New Kharadi offering an elite lifestyle ecosystem.' },
  { id: 'vtp-altamira', name: 'VTP Altamira', desc: 'VTP Altamira brings the pinnacle of luxury living to Kharadi.' },
  { id: 'vtp-flamante', name: 'VTP Flamante', desc: 'VTP Flamante by VTP Luxe in Kharadi offers premium high-rise residences with state-of-the-art wellness amenities.' },
  { id: 'vtp-velvet-villas', name: 'VTP Velvet Villas', desc: 'VTP Velvet Villas offers 43 bespoke, ultra-luxury villas in New Kharadi.' },
  { id: 'vtp-altair', name: 'VTP Altair', desc: 'VTP Altair is a significant luxury high-rise development in the heart of Kharadi.' },
  { id: 'vtp-cygnus', name: 'VTP Cygnus', desc: 'VTP Cygnus provides premium, highly sought-after residences in East Pune.' },
  { id: 'vtp-beaumonde', name: 'VTP Beaumonde', desc: 'VTP Beaumonde offers exquisite living spaces for those who demand the finest in Kharadi.' },
  { id: 'vtp-purvanchal', name: 'VTP Purvanchal', desc: 'VTP Purvanchal offers a perfect blend of space and community living in Wagholi.' },
  
  // South & Central Projects
  { id: 'vtp-celesta', name: 'VTP Celesta', desc: 'VTP Celesta in NIBM brings premium luxury living to South Pune.' },
  { id: 'vtp-urban-nest', name: 'VTP Urban Nest', desc: 'VTP Urban Nest provides modern, family-centric homes in Undri.' },
  { id: 'vtp-skylights', name: 'VTP Skylights', desc: 'VTP Skylights offers a massive, integrated township experience with premium lifestyle amenities.' }
];

const categories = [
  { id: 'luxury-apartments', prefix: 'Luxury Apartments in', suffix: 'Luxury Apartments' },
  { id: 'premium-flats', prefix: 'Premium Flats in', suffix: 'Premium Flats' },
  { id: 'new-launch-projects', prefix: 'New Launch Projects in', suffix: 'New Launch Projects' },
  { id: 'township-projects', prefix: 'Township Projects in', suffix: 'Township Projects' },
  { id: 'real-estate-investment', prefix: 'Real Estate Investment in', suffix: 'Real Estate Investment' },
  
  // Exact Match Configs
  { id: '1bhk', prefix: '1BHK in', suffix: '1BHK Flats' },
  { id: '2bhk', prefix: '2BHK in', suffix: '2BHK Flats' },
  { id: '3bhk', prefix: '3BHK in', suffix: '3BHK Luxury Homes' },
  { id: '4bhk', prefix: '4BHK in', suffix: '4BHK Premium Apartments' },
  { id: '5bhk', prefix: '5BHK in', suffix: '5BHK Villas' },
  { id: '1-bhk-flats', prefix: '1 BHK Flats in', suffix: '1 BHK' },
  { id: '2-bhk-flats', prefix: '2 BHK Flats in', suffix: '2 BHK' },
  { id: '3-bhk-flats', prefix: '3 BHK Flats in', suffix: '3 BHK' },
  { id: '4-bhk-flats', prefix: '4 BHK Flats in', suffix: '4 BHK' },
  { id: 'studio', prefix: 'Studio Apartments in', suffix: 'Studio Apartments' },
  
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
  { id: 'villas', prefix: 'Villas in', suffix: 'Villas' },
  { id: 'row-houses', prefix: 'Row Houses in', suffix: 'Row Houses' },
  { id: 'commercial', prefix: 'Commercial Properties in', suffix: 'Commercial Real Estate' },
  { id: 'retail', prefix: 'Retail Shops in', suffix: 'Retail Spaces' },
  { id: 'office', prefix: 'Office Spaces in', suffix: 'Office Spaces' },
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

const globalHubs = ['dubai', 'singapore', 'london', 'new-york', 'san-francisco', 'sydney', 'melbourne', 'toronto', 'qatar', 'kuwait', 'bahrain'];

// 1. Generate Location-Based Silos (e.g., "Luxury Apartments in Mahalunge")
locations.forEach(loc => {
  const isGlobal = globalHubs.includes(loc.id);
  
  const slugs = categories.map(cat => {
    const keyword = isGlobal 
      ? `Pune ${cat.suffix} for NRI in ${loc.name}` 
      : `${cat.prefix} ${loc.name}`;
    return { slug: generateSlug(keyword), keyword };
  });
  
  // Add reverse combinations (e.g., "Mahalunge Luxury Apartments")
  categories.forEach(cat => {
    const keyword = isGlobal
      ? `${loc.name} NRI Investors for Pune ${cat.suffix}`
      : `${loc.name} ${cat.suffix}`;
    slugs.push({ slug: generateSlug(keyword), keyword });
  });

  silos.push({
    id: `location-${loc.id}`,
    title: isGlobal ? `Pune Real Estate for NRI in ${loc.name}` : `${loc.name} Real Estate & Properties`,
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
  { id: 'metro-connected-properties', name: 'Properties near Pune Metro' },
  { id: 'top-10-builders', name: 'Top 10 Builders in Pune' },
  { id: 'stamp-duty-registration', name: 'Stamp Duty and Registration in Pune' },
  { id: 'pune-real-estate-bubble', name: 'Is Pune Real Estate a Bubble' },
  { id: 'pune-vs-bangalore', name: 'Pune vs Bangalore Real Estate' },
  { id: 'pet-friendly-apartments', name: 'Pet Friendly Apartments in Pune' },
  { id: 'smart-home-automation', name: 'Smart Home Automation in Pune' },
  { id: 'co-living-spaces', name: 'Co-Living Spaces in Pune' },
  { id: 'senior-living-communities', name: 'Senior Living Communities in Pune' }
];

themes.forEach(theme => {
  const slugs = locations.map(loc => {
    const isGlobal = globalHubs.includes(loc.id);
    const keyword = isGlobal 
      ? `${theme.name} for NRI in ${loc.name}` 
      : `${theme.name} in ${loc.name}`;
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
