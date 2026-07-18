import fs from 'fs';
import path from 'path';

async function run() {
  const projectsPath = path.join(process.cwd(), 'app/data/projects.json');
  const silosPath = path.join(process.cwd(), 'app/data/seo-silos.js');

  const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
  const { seoSilos } = await import(new URL('file://' + silosPath));

  const allProjectsSilo = {
    id: "project-all-exact-matches",
    title: "All Projects Exact Matches",
    description: "Exact match keywords for all project names and locations.",
    slugs: []
  };

  let count = 0;

  for (const project of projectsData) {
    const exactSlug = project.slug;
    const exactKeyword = `${project.name} ${project.location}`;
    
    allProjectsSilo.slugs.push({
      slug: exactSlug,
      keyword: exactKeyword
    });
    count++;
  }

  // Check if our special silo already exists
  const existingIndex = seoSilos.findIndex(s => s.id === 'project-all-exact-matches');
  if (existingIndex >= 0) {
    seoSilos[existingIndex] = allProjectsSilo;
  } else {
    seoSilos.push(allProjectsSilo);
  }

  const newSilosContent = `export const seoSilos = ${JSON.stringify(seoSilos, null, 2)};\n`;
  fs.writeFileSync(silosPath, newSilosContent);
  console.log(`Successfully injected ${count} exact match project keywords into a dedicated silo!`);
}

run();
