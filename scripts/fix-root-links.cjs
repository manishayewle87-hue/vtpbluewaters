const fs = require('fs');
const path = require('path');

const files = [
  'app/[lang]/blog/[slug]/page.js',
  'app/[lang]/disclaimer/page.js',
  'app/[lang]/faq/page.js',
  'app/[lang]/privacy-policy/page.js',
  'app/[lang]/terms-of-use/page.js',
  'app/components/ui/LuxuryNavbar.jsx'
];

for (const file of files) {
  const filePath = path.join('/Users/vikasyewle/Documents/vtpbluewaters', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/href="\/"/g, 'href="/en"');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
