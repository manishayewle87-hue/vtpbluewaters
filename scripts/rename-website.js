import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let count = 0;
let filesModified = 0;

walkDir(path.join(process.cwd(), 'app'), function(filePath) {
  if (filePath.endsWith('.js') || filePath.endsWith('.jsx') || filePath.endsWith('.json') || filePath.endsWith('.ts') || filePath.endsWith('.tsx') || filePath.endsWith('.md')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Ignore VTP Blue Waters (already correct)
    let newContent = content.replace(/VTP Bluewaters/gi, 'VTP Blue Waters');
    
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      count += (content.match(/VTP Bluewaters/gi) || []).length;
      filesModified++;
    }
  }
});

console.log(`Replaced ${count} instances across ${filesModified} files.`);
