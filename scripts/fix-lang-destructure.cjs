const fs = require('fs');
const glob = require('glob');

const files = glob.sync('app/**/*.js');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('const { slug, lang } = await params;')) {
    content = content.replace(/const \{ slug, lang \} = await params;/g, 'const { slug } = await params;');
    fs.writeFileSync(file, content);
  }
});
console.log('Fixed lang destructuring');
