import fs from 'fs';
import path from 'path';

async function run() {
  const projectsPath = path.join(process.cwd(), 'app/data/projects.json');
  const silosPath = path.join(process.cwd(), 'app/data/seo-silos.js');

  const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
  const { seoSilos } = await import(new URL('file://' + silosPath));

  let count = 0;

  for (const project of projectsData) {
    // Generate the silo ID. E.g. vtp-earth-one-mahalunge-pune -> project-vtp-earth-one
    let siloId = 'project-' + project.slug.replace(/-pune/g, '')
                                         .replace(/-mahalunge/g, '')
                                         .replace(/-kharadi/g, '')
                                         .replace(/-hinjawadi/g, '')
                                         .replace(/-bavdhan/g, '');

    const silo = seoSilos.find(s => s.id === siloId);

    if (silo) {
      const exactSlug = project.slug;
      // create string like "VTP Earth One Mahalunge Pune"
      const exactKeyword = `${project.name} ${project.location}`;
      
      if (!silo.slugs.some(s => s.slug === exactSlug)) {
          silo.slugs.unshift({
              slug: exactSlug,
              keyword: exactKeyword
          });
          count++;
          console.log(`Added exact keyword: ${exactKeyword} -> ${exactSlug}`);
      }
    } else {
        console.log(`Could not find silo for ${project.slug} (Tried ID: ${siloId})`);
    }
  }

  const newSilosContent = `export const seoSilos = ${JSON.stringify(seoSilos, null, 2)};\n`;
  fs.writeFileSync(silosPath, newSilosContent);
  console.log(`Successfully injected ${count} exact match project keywords into seo-silos.js!`);
}

run();
