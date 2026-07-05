const fs = require('fs');
const glob = require('glob');

const files = glob.sync('app/**/*.js'); // Cover all JS in app/
let updatedCount = 0;

files.forEach(file => {
  if (!file.endsWith('page.js') && !file.endsWith('route.js')) return;

  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  // 1. Remove all existing instances to prevent duplicates
  if (content.includes("export const runtime = 'edge';")) {
    content = content.replace(/export const runtime = 'edge';\n?/g, '');
    modified = true;
  }
  
  if (content.includes("export const dynamic = 'force-static';")) {
    content = content.replace(/export const dynamic = 'force-static';\n?/g, '');
    modified = true;
  }

  // 2. Add a single instance of export const runtime = 'edge'; at the top
  // find last import
  const importRegex = /import .*;\n/g;
  let match;
  let lastIndex = -1;
  while ((match = importRegex.exec(content)) !== null) {
    lastIndex = match.index + match[0].length;
  }
  
  // Also check for multiline imports
  const multiImportRegex = /import\s+{[^}]*}\s+from\s+['"][^'"]+['"];?\n/g;
  while ((match = multiImportRegex.exec(content)) !== null) {
    if (match.index + match[0].length > lastIndex) {
      lastIndex = match.index + match[0].length;
    }
  }

  if (lastIndex !== -1) {
    content = content.substring(0, lastIndex) + "\nexport const runtime = 'edge';\n" + content.substring(lastIndex);
  } else {
    content = "export const runtime = 'edge';\n\n" + content;
  }
  modified = true;

  // 3. Bruteforce remove generateStaticParams
  if (content.includes('generateStaticParams')) {
    content = content.replace(/export async function generateStaticParams\(\) \{[\s\S]*?return params;\n?\}/g, '');
    content = content.replace(/export function generateStaticParams\(\) \{[\s\S]*?\n\}/g, '');
    content = content.replace(/export async function generateStaticParams\(\) \{[\s\S]*?\n\}/g, '');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(file, content);
    console.log('Fixed Edge SSR in:', file);
    updatedCount++;
  }
});

console.log(`Successfully fixed ${updatedCount} routes.`);
