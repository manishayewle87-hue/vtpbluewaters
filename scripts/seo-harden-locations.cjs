const fs = require('fs');
const path = require('path');

const locPath = path.join(__dirname, '../app/data/locations.json');
const locData = JSON.parse(fs.readFileSync(locPath, 'utf8'));

locData.forEach(loc => {
  const name = loc.name;
  
  // Hardened SEO Title
  loc.seoTitle = `Real Estate in ${name} Pune | Buy Luxury 2, 3, 4 BHK Flats & Apartments`;
  
  // Hardened SEO Description
  loc.seoDescription = `Looking for properties in ${name}, Pune? Explore ultra-luxury 2, 3 & 4 BHK flats and apartments by VTP Realty. High ROI, zero brokerage, and premium amenities. Enquire now.`;
});

fs.writeFileSync(locPath, JSON.stringify(locData, null, 2), 'utf8');
console.log('Successfully hardened SEO metadata for all locations in locations.json');
