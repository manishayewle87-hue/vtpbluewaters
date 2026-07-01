const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace all variations of relative imports to components and services
  content = content.replace(/from\s+['"](?:\.\.\/)+components\/(.*?)['"]/g, "from '@/app/components/$1'");
  content = content.replace(/from\s+['"](?:\.\.\/)+services\/(.*?)['"]/g, "from '@/app/services/$1'");
  content = content.replace(/from\s+['"]\.\/components\/(.*?)['"]/g, "from '@/app/components/$1'");
  content = content.replace(/from\s+['"]\.\/services\/(.*?)['"]/g, "from '@/app/services/$1'");

  // Replace component direct imports without "from" if any
  content = content.replace(/import\s+(.*?)\s+from\s+['"](?:\.\.\/)+components\/(.*?)['"]/g, "import $1 from '@/app/components/$2'");
  
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
console.log('Imports fixed with absolute aliases.');
