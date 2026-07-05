const fs = require('fs');
const path = require('path');

const PROJECTS_FILE = path.join(__dirname, '../../app/data/projects.json');

function runPatcher() {
  console.log("🚀 Initializing AI Asset Patcher...");
  
  if (!fs.existsSync(PROJECTS_FILE)) {
    console.error(`❌ File not found: ${PROJECTS_FILE}`);
    return;
  }

  let dbContent = fs.readFileSync(PROJECTS_FILE, 'utf8');

  // Map of replacements
  const mappings = {
    '/images/premium_placeholders/exterior_luxury_1.jpg': '/images/ai_assets/exterior_luxury.jpg',
    '/images/premium_placeholders/exterior_luxury_2.jpg': '/images/ai_assets/exterior_luxury.jpg',
    '/images/premium_placeholders/amenity_pool.jpg': '/images/ai_assets/amenity_pool.jpg',
    '/images/premium_placeholders/amenity_gym.jpg': '/images/ai_assets/amenity_clubhouse.jpg',
    '/images/premium_placeholders/amenity_clubhouse.jpg': '/images/ai_assets/amenity_clubhouse.jpg',
    '/images/premium_placeholders/amenity_garden.jpg': '/images/ai_assets/exterior_luxury.jpg',
    '/images/premium_placeholders/floor_plan_2bhk.jpg': '/images/ai_assets/floor_plan_3bhk.jpg',
    '/images/premium_placeholders/floor_plan_3bhk.jpg': '/images/ai_assets/floor_plan_3bhk.jpg',
    '/images/premium_placeholders/floor_plan_4bhk.jpg': '/images/ai_assets/floor_plan_3bhk.jpg'
  };

  let replaceCount = 0;

  for (const [placeholder, realAsset] of Object.entries(mappings)) {
    const regex = new RegExp(placeholder, 'g');
    const matches = (dbContent.match(regex) || []).length;
    if (matches > 0) {
      replaceCount += matches;
      dbContent = dbContent.replace(regex, realAsset);
    }
  }

  // Edge cases where someone might have used just a partial path or generic
  // We will do a generic catch-all for any remaining premium_placeholders
  const genericRegex = /\/images\/premium_placeholders\/[a-zA-Z0-9_]+\.jpg/g;
  const genericMatches = (dbContent.match(genericRegex) || []).length;
  
  if (genericMatches > 0) {
    replaceCount += genericMatches;
    dbContent = dbContent.replace(genericRegex, '/images/ai_assets/exterior_luxury.jpg');
  }

  fs.writeFileSync(PROJECTS_FILE, dbContent, 'utf8');
  console.log(`✅ Successfully overwritten ${replaceCount} broken placeholders with 8K Photorealistic AI Assets!`);
}

runPatcher();
