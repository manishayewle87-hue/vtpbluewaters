import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsPath = path.join(__dirname, '../app/data/projects.json');
const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

const redirectsMap = [];

projectsData.forEach(p => {
  const oldSlug = p.slug;
  let newSlug = oldSlug;

  // Clean the location to create a URL-friendly location string
  const locationRaw = p.location.replace(/,/g, '').replace(/\s+/g, '-').toLowerCase();
  
  // Format the project name
  let nameRaw = p.name.replace(/ BY VTP LUXE/i, '').replace(/\s+/g, '-').toLowerCase();
  if (!nameRaw.includes('vtp')) {
    nameRaw = 'vtp-' + nameRaw;
  }
  
  // Replace "earth-1" with "earth-one"
  nameRaw = nameRaw.replace('earth-1', 'earth-one');

  newSlug = `${nameRaw}-${locationRaw}`;

  if (oldSlug !== newSlug) {
    redirectsMap.push(`/projects/${oldSlug} /projects/${newSlug} 301`);
    p.slug = newSlug;
  }
});

fs.writeFileSync(projectsPath, JSON.stringify(projectsData, null, 2));

// Create _redirects file
const redirectsPath = path.join(__dirname, '../public/_redirects');
let existingRedirects = '';
if (fs.existsSync(redirectsPath)) {
  existingRedirects = fs.readFileSync(redirectsPath, 'utf8');
}

const finalRedirects = existingRedirects + '\n' + redirectsMap.join('\n');
fs.writeFileSync(redirectsPath, finalRedirects.trim());

console.log('Slugs updated and redirects generated successfully.');
