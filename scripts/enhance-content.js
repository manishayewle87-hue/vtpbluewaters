import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsPath = path.join(__dirname, '../app/data/projects.json');
const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

projectsData.forEach(p => {
  // Weave in VTP Bluewaters, Mahalunge, and Project Name strategically
  let overview = p.overview || '';
  
  // Create natural but keyword-dense sentences
  const keywordIntro = `Welcome to the unparalleled lifestyle at ${p.name}, a distinguished part of the visionary VTP Bluewaters ecosystem. As the premier residential destination, VTP Bluewaters in Mahalunge redefines urban luxury. `;
  const keywordOutro = ` Investing in ${p.name} within the VTP Bluewaters master-planned community ensures unmatched returns and a world-class living experience at the heart of Mahalunge's rapid development. Explore the ultimate residential marvel that is VTP Bluewaters today.`;
  
  if (!overview.includes('VTP Bluewaters ecosystem')) {
    p.overview = keywordIntro + overview + keywordOutro;
  }
  
  // Enhance SEO Description
  let seoDesc = p.seoDescription || '';
  if (!seoDesc.includes('VTP Bluewaters')) {
    p.seoDescription = `${seoDesc} Set within the iconic VTP Bluewaters Mahalunge township, ${p.name} offers unparalleled luxury.`;
  }
});

fs.writeFileSync(projectsPath, JSON.stringify(projectsData, null, 2));

console.log('Content dynamically optimized for VTP Bluewaters, Mahalunge, and project names.');
