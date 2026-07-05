const fs = require('fs');
const glob = require('glob');

const files = glob.sync('app/**/*.js');

const defaultParams = `
export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'hi' }, { lang: 'mr' }];
}
`;

files.forEach(file => {
  if (!file.includes('[lang]')) return;
  if (!file.endsWith('page.js') && !file.endsWith('route.js')) return;
  
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('generateStaticParams')) {
    content += '\n' + defaultParams;
    fs.writeFileSync(file, content);
    console.log('Added default generateStaticParams to:', file);
  }
});
