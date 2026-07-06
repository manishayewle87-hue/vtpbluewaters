const fs = require('fs');
const path = require('path');

const projectsPath = path.join(__dirname, '../app/data/projects.json');
const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
const assetsDir = path.join(__dirname, '../public/assets/projects');

// Get all project folders
const availableProjects = fs.readdirSync(assetsDir).filter(f => !f.includes('.'));

// Helper to get random image from a folder
function getRandomImage(folder) {
  const dirPath = path.join(assetsDir, folder);
  if (!fs.existsSync(dirPath)) return null;
  const files = fs.readdirSync(dirPath).filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i));
  if (files.length === 0) return null;
  return `/assets/projects/${folder}/${files[Math.floor(Math.random() * files.length)]}`;
}

// Fallback images
const fallbackImages = [
  '/images/real_vtp/earth_one_hero.jpg',
  '/images/real_vtp/flamante_hero.jpg',
  '/images/real_vtp/monarque_hero.webp',
  '/images/real_vtp/overview_dfe87892a1.jpg',
  '/images/real_vtp/waterfall_15a1aa4cf5.webp'
];

function getFallbackImage() {
  return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
}

projectsData.forEach(project => {
  // Try to match slug to a folder
  let matchedFolder = availableProjects.find(f => project.slug.includes(f));
  if (!matchedFolder) {
    if (project.slug.includes('earth-one')) matchedFolder = 'earth-1';
  }

  const replaceIfAi = (imgString) => {
    if (typeof imgString !== 'string') return imgString;
    if (imgString.includes('ai_assets') || imgString.includes('premium_placeholders')) {
      const newImg = matchedFolder ? getRandomImage(matchedFolder) : getFallbackImage();
      return newImg || getFallbackImage();
    }
    return imgString;
  };

  // Replace main image
  project.image = replaceIfAi(project.image);
  
  // Replace masterLayout
  project.masterLayout = replaceIfAi(project.masterLayout);

  // Replace floorPlans
  if (project.floorPlans) {
    project.floorPlans.forEach(fp => {
      fp.image = replaceIfAi(fp.image);
    });
  }

  // Replace gallery
  if (project.gallery) {
    project.gallery = project.gallery.map(img => replaceIfAi(img));
  }
});

fs.writeFileSync(projectsPath, JSON.stringify(projectsData, null, 2), 'utf8');
console.log('Successfully replaced all AI images with original scraped images!');
