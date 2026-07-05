const fs = require('fs');
const glob = require('glob');

const FULL_INTENTS_STR = `const KEYWORD_INTENTS = [
  // Original Intents
  'price', 'floor-plan', 'brochure', 'reviews', 'amenities', 
  'payment-plan', 'virtual-tour', 'gallery', 'maharera', 
  'investment', 'location', 'offers',
  // Configuration Intents
  '2-bhk', '2-5-bhk', '3-bhk', '3-5-bhk', '4-bhk', '5-bhk',
  'penthouse', 'duplex', 'sky-villa',
  // Property Typology Intents
  'apartments', 'luxury-apartments', 'townships',
  // POI (Point of Interest) Intents
  'near-metro', 'near-it-parks', 'near-schools', 'near-hospitals'
];`;

const files = glob.sync('app/**/page.js');
let updatedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  // 1. Restore KEYWORD_INTENTS array
  if (content.includes('const KEYWORD_INTENTS = [')) {
    const startIdx = content.indexOf('const KEYWORD_INTENTS = [');
    const endIdx = content.indexOf('];', startIdx);
    
    if (startIdx !== -1 && endIdx !== -1) {
      const before = content.substring(0, startIdx);
      const after = content.substring(endIdx + 2);
      content = before + FULL_INTENTS_STR + after;
      modified = true;
    }
  }

  // 2. Remove generateStaticParams entirely
  if (content.includes('export async function generateStaticParams')) {
    // We will aggressively regex remove the entire function block
    // Assuming standard formatting: export async function generateStaticParams() { ... return params; }
    content = content.replace(/export async function generateStaticParams\(\) \{[\s\S]*?return params;\n?\}/g, '');
    modified = true;
  }

  // 3. Inject export const runtime = 'edge'; if it's a dynamic route (has [ slug or intent ])
  if (file.includes('[') && file.includes(']') && !content.includes("export const runtime = 'edge';")) {
    // Add it after the imports
    content = content.replace(/(import .*;\n)+/g, match => match + "\nexport const runtime = 'edge';\n");
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(file, content);
    console.log('Migrated to Edge SSR:', file);
    updatedCount++;
  }
});

console.log(`Successfully migrated ${updatedCount} dynamic routes to Edge SSR.`);
