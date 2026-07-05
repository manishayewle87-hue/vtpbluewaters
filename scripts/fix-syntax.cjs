const fs = require('fs');
const glob = require('glob');
const path = require('path');

const dirs = ['app/(en)', 'app/mr', 'app/hi'];

function fixFiles(dir, lang) {
  const files = glob.sync(`${dir}/**/*.js`);
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // The error is:
    // export default function FunctionName({  const lang = 'xx';
    //  params }) {
    
    // OR
    // export default function RootLayout({  const lang = 'en';
    //  children, params: { = 'en'  } }) {

    // First, let's reverse the bad insertion
    const badRegex = new RegExp(`({\\s*)const lang = '${lang}';\\n`, 'g');
    content = content.replace(badRegex, '$1');

    // Also fix the layout issue where `params: { = 'en' }` is messed up.
    // It should probably just be `params` or `{ children }`
    content = content.replace(/params:\s*\{\s*=\s*'en'\s*\}/g, '');
    content = content.replace(/,\s*\}/g, '}');

    // Now, correctly insert `const lang = 'xx';` at the START OF THE FUNCTION BODY
    // The function body starts after `) {`
    const functionBodyRegex = /(export default (?:async )?function [^)]+\)\s*\{\n?)/g;
    // But wait, there might be multiple `{` in parameters, e.g. `{ params: { slug } }`
    // Next.js pages always have `) {` or `){` at the end of the signature.
    // Let's replace ONLY the first occurrence of `) {` after `export default`
    
    // Instead of regex, let's do a simple string replace for the first `) {`
    let exportIndex = content.indexOf('export default');
    if (exportIndex !== -1) {
       let blockStartIndex = content.indexOf(') {', exportIndex);
       if (blockStartIndex === -1) blockStartIndex = content.indexOf('){', exportIndex);
       
       if (blockStartIndex !== -1) {
           let insertPos = blockStartIndex + 3; // after `) {`
           content = content.slice(0, insertPos) + `\n  const lang = '${lang}';` + content.slice(insertPos);
       }
    }

    fs.writeFileSync(file, content);
  });
}

dirs.forEach(dir => {
  let lang = 'en';
  if (dir.includes('mr')) lang = 'mr';
  if (dir.includes('hi')) lang = 'hi';
  fixFiles(dir, lang);
});

console.log('Fixed syntax errors');
