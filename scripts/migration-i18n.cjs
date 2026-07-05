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

  // 1. Remove `const { lang } = await params;` or `const { lang, ... } = await params;`
  content = content.replace(/const\s+\{\s*lang\s*,\s*([^}]+)\}\s*=\s*await params;/g, 'const { $1} = await params;');
  content = content.replace(/const\s+\{\s*lang\s*\}\s*=\s*await params;/g, '');
  content = content.replace(/const\s+\{\s*lang\s*,\s*([^}]+)\}\s*=\s*params;/g, 'const { $1} = params;');
  content = content.replace(/const\s+\{\s*lang\s*\}\s*=\s*params;/g, '');

  // 2. Fix generateStaticParams
  content = content.replace(/const langs = \['en'\];\s*/g, '');
  content = content.replace(/for \(const lang of langs\) \{\s*/g, '');
  // Because we removed a loop, there is an extra closing brace before `return params;`
  content = content.replace(/\}\s*return params;/g, 'return params;');
  // Remove `lang, ` from params.push({ lang, slug: ... })
  content = content.replace(/\{\s*lang,\s*/g, '{ ');
  content = content.replace(/\{\s*lang\s*\}/g, '{}');

  // 3. Fix Layout html lang
  if (filePath.endsWith('layout.js')) {
    content = content.replace(/<html lang=\{lang\}/g, '<html lang="en"');
  }

  // 4. Fix Links (e.g. href="/en/...", href={`/en/...`, etc)
  content = content.replace(/href="\/en\//g, 'href="/');
  content = content.replace(/href="\/en"/g, 'href="/"');
  content = content.replace(/href=\{`\/en\//g, 'href={`/');
  
  // 5. Fix dynamic Link refs that used params.lang
  content = content.replace(/href=\{`\/\$\{params\.lang\}\//g, 'href={`/');

  // For app/components, fix hardcoded /en/ strings
  content = content.replace(/'\/en\//g, "'/");

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath);
  }
});
