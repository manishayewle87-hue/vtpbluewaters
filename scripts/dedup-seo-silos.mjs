/**
 * Deduplication script for seo-silos.js
 * Removes any duplicate slugs (keeping first occurrence across all silos)
 */
import { readFileSync, writeFileSync } from 'fs';
import { seoSilos } from '../app/data/seo-silos.js';

const seen = new Set();
const deduped = seoSilos.map(silo => ({
  ...silo,
  slugs: silo.slugs.filter(k => {
    if (seen.has(k.slug)) return false;
    seen.add(k.slug);
    return true;
  })
})).filter(silo => silo.slugs.length > 0); // Remove any silos that ended up empty

const totalKeywords = deduped.reduce((a, x) => a + x.slugs.length, 0);
console.log(`After deduplication: ${deduped.length} silos | ${totalKeywords} unique keywords`);

const out = `export const seoSilos = ${JSON.stringify(deduped, null, 2)};\n`;
writeFileSync('app/data/seo-silos.js', out, 'utf-8');
console.log('✅ seo-silos.js written successfully');
