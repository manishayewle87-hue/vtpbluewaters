const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (filePath.includes('layout.js') || filePath.includes('page.js') && filePath.split('/').length === 4) {
    // for app/[lang]/layout.js and app/[lang]/page.js
    content = content.replace(/'\.\/components/g, "'../components");
    content = content.replace(/'\.\/services/g, "'../services");
  } else {
    // for deeply nested files
    content = content.replace(/'\.\.\/\.\.\/components/g, "'../../../components");
    content = content.replace(/'\.\.\/\.\.\/services/g, "'../../../services");
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      replaceInFile(fullPath);
    }
  }
}

walkDir('./app/[lang]');
console.log('Imports fixed.');
