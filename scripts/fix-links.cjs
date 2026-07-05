const fs = require('fs');
const path = require('path');
const glob = require('glob');

const files = glob.sync('app/**/*.jsx').concat(glob.sync('app/**/*.js'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  let modified = false;
  // Replace explicit /en/ links with /
  if (content.includes('href="/en/')) {
    content = content.replace(/href="\/en\//g, 'href="/');
    modified = true;
  }
  if (content.includes("href='/en/")) {
    content = content.replace(/href='\/en\//g, "href='/");
    modified = true;
  }
  if (content.includes("href={`/en/")) {
    content = content.replace(/href={`\/en\//g, "href={`/");
    modified = true;
  }
  if (content.includes("href: '/en/")) {
    content = content.replace(/href: '\/en\//g, "href: '/");
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(file, content);
    console.log('Fixed links in:', file);
  }
});
console.log('Link fixing complete.');
