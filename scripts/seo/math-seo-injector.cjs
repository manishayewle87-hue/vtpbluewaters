const fs = require('fs');
const path = require('path');

const PROJECTS_FILE = path.join(__dirname, '../../app/data/projects.json');
const LOCATIONS_FILE = path.join(__dirname, '../../app/data/locations.json');

// LSI (Latent Semantic Indexing) Clusters
const LSI_CLUSTERS = [
  "high ROI real estate investment",
  "RERA registered luxury properties",
  "smart home automation Pune",
  "PMRDA ring road infrastructure",
  "premium rental yield properties",
  "IT hub connectivity",
  "seamless Hinjawadi IT Park access",
  "global standard lifestyle amenities"
];

// Helper to get random elements from array
function getRandomLSI(count = 2) {
  const shuffled = [...LSI_CLUSTERS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// 1. Process Projects Database
function processProjects() {
  console.log("🚀 Initializing Mathematical TF-IDF Injection for Projects...");
  
  if (!fs.existsSync(PROJECTS_FILE)) {
    console.error(`❌ File not found: ${PROJECTS_FILE}`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf8'));

  const optimizedData = data.map(project => {
    // Extract base entities
    const name = project.name;
    const location = project.location.replace(/, Pune/gi, '').trim();
    const township = project.township;

    // Grab 3 dynamic LSI keywords for mathematical density
    const lsi = getRandomLSI(3);

    // Rewrite seoDescription (150-160 chars optimized)
    project.seoDescription = `Discover ${name}, offering ultra-luxury residences in ${location}, Pune. Integrated within ${township}, featuring ${lsi[0]} and ${lsi[1]}.`;

    // Rewrite Overview (Targeting ~3% Keyword Density for TF-IDF optimization)
    project.overview = `Welcome to the unparalleled lifestyle at ${name}, a distinguished luxury cluster within the visionary ${township} ecosystem. As Pune's premier residential destination, this architectural marvel redefines urban luxury in ${location}. 

Designed strictly on the Maximum Livable Area (MLA) philosophy, every residence in ${name} ensures zero space wastage, soaring ceilings, and panoramic views. Nestled strategically, it seamlessly connects the tranquility of nature with the high-paced lifestyle of ${location}. 

For investors and homebuyers, ${name} represents a ${lsi[0]}. With ${lsi[1]} and ${lsi[2]}, residents experience a global benchmark in living. 

Experience world-class amenities, robust multi-tier security, and a community of like-minded elites. Investing in ${name} ensures unmatched returns and a world-class living experience at the heart of Pune's rapid development. Explore <a href="/locations/${location.toLowerCase().replace(/[^a-z0-9]+/g, '-')}">premium properties in ${location}</a> and secure your future today.`;

    return project;
  });

  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(optimizedData, null, 2), 'utf8');
  console.log(`✅ Mathematically optimized ${optimizedData.length} projects!`);
}

// 2. Process Locations Database
function processLocations() {
  console.log("🚀 Initializing Mathematical TF-IDF Injection for Locations...");
  
  if (!fs.existsSync(LOCATIONS_FILE)) {
    console.error(`❌ File not found: ${LOCATIONS_FILE}`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(LOCATIONS_FILE, 'utf8'));

  const optimizedData = data.map(loc => {
    const name = loc.name;
    const lsi = getRandomLSI(2);

    loc.seoDescription = `Explore ultra-luxury real estate in ${name}, Pune. A prime hub for ${lsi[0]}, featuring premium apartments and unmatched connectivity.`;
    
    // If overview exists, optimize it
    if (loc.overview) {
      loc.overview = `Discover the pinnacle of urban living in ${name}. Renowned for its strategic location, ${name} is rapidly emerging as the epicenter for ${lsi[0]} in Pune. Boasting unparalleled connectivity, residents enjoy seamless access to major IT hubs and lifestyle destinations. 

The real estate landscape in ${name} is characterized by ultra-premium developments that offer ${lsi[1]}. Whether you are seeking a lucrative investment or a forever home, ${name} provides a sophisticated blend of nature, luxury, and high-tech infrastructure.`;
    }

    return loc;
  });

  fs.writeFileSync(LOCATIONS_FILE, JSON.stringify(optimizedData, null, 2), 'utf8');
  console.log(`✅ Mathematically optimized ${optimizedData.length} locations!`);
}

processProjects();
processLocations();
console.log("🎉 TF-IDF and LSI Injection Complete!");
