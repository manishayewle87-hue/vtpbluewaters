const fs = require('fs');
const path = require('path');
const glob = require('glob');

const newIntentsStr = `const KEYWORD_INTENTS = [
  'price', 'floor-plan', 'brochure', 'amenities', 'location', 'luxury-apartments'
];`;

const files = glob.sync('app/**/page.js');
let updated = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('const KEYWORD_INTENTS = [')) {
    // We'll replace the block. Find start and end of array
    const startIdx = content.indexOf('const KEYWORD_INTENTS = [');
    const endIdx = content.indexOf('];', startIdx);
    
    if (startIdx !== -1 && endIdx !== -1) {
      const before = content.substring(0, startIdx);
      const after = content.substring(endIdx + 2);
      fs.writeFileSync(file, before + newIntentsStr + after);
      console.log('Trimmed intents in:', file);
      updated++;
    }
  }
});

console.log(`Trimmed intents in ${updated} files.`);
