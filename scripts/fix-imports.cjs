const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../app');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else if (dirPath.endsWith('.js') || dirPath.endsWith('.jsx')) {
      callback(dirPath);
    }
  });
}

walkDir(appDir, (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Fix relative imports and requires because we moved up one folder
  content = content.replace(/\.\.\/\.\.\/\.\.\/\.\.\/services\/cms/g, '../../../services/cms');
  content = content.replace(/\.\.\/\.\.\/\.\.\/services\/cms/g, '../../services/cms');
  content = content.replace(/\.\.\/\.\.\/services\/cms/g, '../services/cms');

  // Fix syntax errors
  content = content.replace(/\$\{baseUrl\}\/\$\{\}/g, '${baseUrl}');
  content = content.replace(/https:\/\/vtpbluewaters\.com\/\$\{\}\//g, 'https://vtpbluewaters.com/');
  content = content.replace(/<html lang=\{\}\s*className/g, '<html lang="en" className');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed:', filePath);
  }
});
