const fs = require('fs');

const staticPages = [
  'app/[lang]/disclaimer/page.js',
  'app/[lang]/faq/page.js',
  'app/[lang]/privacy-policy/page.js',
  'app/[lang]/terms-of-use/page.js',
  'app/[lang]/township/page.js',
  'app/[lang]/rss.xml/route.js',
  'app/page.js' // Root redirect
];

const generateStaticParamsCode = `
export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'hi' }, { lang: 'mr' }];
}
`;

staticPages.forEach(file => {
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  // Remove edge runtime
  if (content.includes("export const runtime = 'edge';")) {
    content = content.replace(/export const runtime = 'edge';\n?/g, '');
    modified = true;
  }

  // Remove force-static
  if (content.includes("export const dynamic = 'force-static';")) {
    content = content.replace(/export const dynamic = 'force-static';\n?/g, '');
    modified = true;
  }

  // Add generateStaticParams if not present (skip for app/page.js since it has no [lang])
  if (!file.includes('app/page.js') && !content.includes('generateStaticParams')) {
    content += '\n' + generateStaticParamsCode;
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(file, content);
    console.log('Made static:', file);
  }
});
