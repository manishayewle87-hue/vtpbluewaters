const fs = require('fs');
const glob = require('glob'); // Note: we can just use native fs since it's just a few files
const files = [
  'app/lib/seo.js',
  'app/sitemap.js',
  'app/components/seo/CanonicalHreflang.jsx',
  'app/components/seo/AutoLinker.jsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace `/${lang}` with `${lang === 'en' ? '' : '/' + lang}`
  content = content.replace(/\/\$\{lang\}/g, "${lang === 'en' ? '' : '/' + lang}");
  // Also handle `/${lang}/`
  content = content.replace(/\/\$\{lang\}\//g, "${lang === 'en' ? '/' : '/' + lang + '/'}");
  
  // Specifically in sitemap.js
  content = content.replace(/const prefix = \`\$\{baseUrl\}\/\$\{lang\}\`;/g, "const prefix = lang === 'en' ? baseUrl : `${baseUrl}/${lang}`;");
  
  fs.writeFileSync(file, content);
});
console.log('Done replacing links');
