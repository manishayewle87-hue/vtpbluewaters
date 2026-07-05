const fs = require('fs');

let content = fs.readFileSync('app/lib/seo.js', 'utf8');
content = content.replace(/\/\$\{lang\}\//g, "${lang === 'en' ? '/' : '/' + lang + '/'}");
fs.writeFileSync('app/lib/seo.js', content);

let content2 = fs.readFileSync('app/components/seo/CanonicalHreflang.jsx', 'utf8');
content2 = content2.replace(/\/\$\{lang\}\//g, "${lang === 'en' ? '/' : '/' + lang + '/'}");
fs.writeFileSync('app/components/seo/CanonicalHreflang.jsx', content2);

let content3 = fs.readFileSync('app/components/seo/AutoLinker.jsx', 'utf8');
content3 = content3.replace(/\/\$\{lang\}\//g, "${lang === 'en' ? '/' : '/' + lang + '/'}");
// Also handle `/${lang}${path}`
content3 = content3.replace(/\/\$\{lang\}\$\{path\}/g, "${lang === 'en' ? path : '/' + lang + path}");
fs.writeFileSync('app/components/seo/AutoLinker.jsx', content3);

console.log('Done!');
