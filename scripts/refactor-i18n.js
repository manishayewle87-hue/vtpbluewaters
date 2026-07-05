import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LANG_DIR = path.join(__dirname, '../app/[lang]');
const APP_DIR = path.join(__dirname, '../app');
const MR_DIR = path.join(__dirname, '../app/mr');
const HI_DIR = path.join(__dirname, '../app/hi');

function copyRecursive(src, destEn, destMr, destHi) {
  if (fs.statSync(src).isDirectory()) {
    if (!fs.existsSync(destEn)) fs.mkdirSync(destEn, { recursive: true });
    if (!fs.existsSync(destMr)) fs.mkdirSync(destMr, { recursive: true });
    if (!fs.existsSync(destHi)) fs.mkdirSync(destHi, { recursive: true });

    fs.readdirSync(src).forEach(file => {
      copyRecursive(
        path.join(src, file),
        path.join(destEn, file),
        path.join(destMr, file),
        path.join(destHi, file)
      );
    });
  } else {
    // It's a file
    let content = fs.readFileSync(src, 'utf8');

    // Replace `params: { lang }` or `params: { lang, ... }`
    // We can just inject `const lang = 'en';` at the top of the function body.
    
    // Instead of complex AST, we can just do:
    // params: { lang } -> params: {}
    // params: { lang, slug } -> params: { slug }
    // { params: { lang, slug } } -> { params: { slug } }
    let enContent = content.replace(/params\s*:\s*\{\s*lang\s*,?\s*([^}]*)\s*\}/g, 'params: { $1 }');
    enContent = enContent.replace(/params\s*:\s*\{\s*lang\s*\}/g, 'params: {}');
    
    // Inject `const lang = 'en';` right after `export default function` or `export default async function`
    enContent = enContent.replace(/(export default (?:async )?function [^{]+\{\n?)/, "$1  const lang = 'en';\n");

    let mrContent = content.replace(/params\s*:\s*\{\s*lang\s*,?\s*([^}]*)\s*\}/g, 'params: { $1 }');
    mrContent = mrContent.replace(/params\s*:\s*\{\s*lang\s*\}/g, 'params: {}');
    mrContent = mrContent.replace(/(export default (?:async )?function [^{]+\{\n?)/, "$1  const lang = 'mr';\n");

    let hiContent = content.replace(/params\s*:\s*\{\s*lang\s*,?\s*([^}]*)\s*\}/g, 'params: { $1 }');
    hiContent = hiContent.replace(/params\s*:\s*\{\s*lang\s*\}/g, 'params: {}');
    hiContent = hiContent.replace(/(export default (?:async )?function [^{]+\{\n?)/, "$1  const lang = 'hi';\n");

    fs.writeFileSync(destEn, enContent);
    fs.writeFileSync(destMr, mrContent);
    fs.writeFileSync(destHi, hiContent);
  }
}

console.log('Starting refactor...');
copyRecursive(LANG_DIR, APP_DIR, MR_DIR, HI_DIR);
console.log('Copy complete! Deleting [lang]...');
fs.rmSync(LANG_DIR, { recursive: true, force: true });
console.log('Done!');
