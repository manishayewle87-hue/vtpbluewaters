const fs = require('fs');
const path = require('path');

const projectsPath = path.join(__dirname, '../app/data/projects.json');
const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

projectsData.forEach(project => {
  const loc = project.location.split(',')[0].trim();
  const titleName = project.name.replace(' BY VTP LUXE', '');
  
  // Hardened SEO Title
  project.seoTitle = `VTP ${titleName} ${loc} | Buy Luxury 3 & 4 BHK Flats in Pune`;
  
  // Hardened SEO Description
  project.seoDescription = `Invest in ${project.name}. Buy ultra-luxury 3, 4 BHK apartments in ${loc}, Pune. Zero Brokerage, exclusive pre-launch offers, and premium amenities. View Price & Floor Plan.`;
});

fs.writeFileSync(projectsPath, JSON.stringify(projectsData, null, 2), 'utf8');
console.log('Successfully hardened SEO metadata for all projects in projects.json');
