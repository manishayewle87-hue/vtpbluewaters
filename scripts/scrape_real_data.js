const fs = require('fs');

const projectsPath = 'app/data/projects.json';
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

async function scrape() {
  console.log('Starting scrape of 14 VTP projects for RERA using fetch...');
  
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    console.log(`Fetching ${p.name} at ${p.link}`);
    try {
      const response = await fetch(p.link, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      const html = await response.text();
      
      const reraMatches = [...html.matchAll(/"ReraNumber":"([^"]+)"/g)];
      let maharera = [];
      
      if (reraMatches.length > 0) {
        maharera = [...new Set(reraMatches.map(m => m[1].replace(/MahaRERA Reg\.? No:?\s*/i, '')))];
        console.log(`  -> Found MahaRERA: ${maharera.join(', ')}`);
      } else {
        const fallback = html.match(/(?:P5|PR)\d+/g);
        if (fallback) {
          maharera = [...new Set(fallback)];
          console.log(`  -> Fallback found: ${maharera.join(', ')}`);
        } else {
          console.log(`  -> No MahaRERA found.`);
          maharera = ['Awaited']; 
        }
      }

      p.maharera = maharera;
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.error(`  -> Failed to fetch ${p.link}`, err.message);
      p.maharera = ['Awaited'];
    }
  }

  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
  console.log('Scraping complete. projects.json updated.');
}

scrape();
