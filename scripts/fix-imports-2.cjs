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

  // We need to resolve the correct relative path from the current file to `app/services/cms`
  const relativePathToApp = path.relative(path.dirname(filePath), appDir);
  const correctCmsPath = path.join(relativePathToApp, 'services/cms').replace(/\\/g, '/');
  
  // Replace any existing require(/services/cms) with the correct one
  content = content.replace(/require\(['"]\.\.?\/?.*?services\/cms['"]\)/g, `require('${correctCmsPath.startsWith('.') ? correctCmsPath : './' + correctCmsPath}')`);

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed:', filePath);
  }
});
