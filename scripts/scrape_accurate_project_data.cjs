const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');
const path = require('path');
const https = require('https');

const projectsPath = path.join(__dirname, '../app/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      } else {
        resolve(false);
      }
    }).on('error', (err) => {
      resolve(false);
    });
  });
}

(async () => {
    console.log("Launching headless browser...");
    const browser = await puppeteer.launch({ 
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        if (!project.link || project.link === '/' || project.link.includes('coming-soon')) continue;

        console.log(`\n[${i+1}/${projects.length}] Navigating to ${project.link}...`);
        
        try {
            const page = await browser.newPage();
            // Block heavy requests to speed up (keep images this time to read their dimensions)
            await page.setRequestInterception(true);
            page.on('request', (req) => {
                if (req.resourceType() === 'stylesheet' || req.resourceType() === 'font' || req.resourceType() === 'media') {
                    req.abort();
                } else {
                    req.continue();
                }
            });

            await page.goto(project.link, { waitUntil: 'networkidle2', timeout: 60000 });
            
            // Extract All Large Images for Gallery & Layout
            const imgData = await page.evaluate(() => {
                const imgs = Array.from(document.querySelectorAll('img'));
                const results = [];
                for (let img of imgs) {
                    const src = img.src || img.dataset.src || '';
                    if (src && src.startsWith('http') && !src.includes('logo') && !src.includes('icon')) {
                        results.push(src);
                    }
                }
                return [...new Set(results)]; // Deduplicate
            });

            const dir = path.join(__dirname, '../public/assets/projects', project.slug);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

            let gallery = [];
            let masterLayout = project.masterLayout;
            let count = 1;

            if (imgData && imgData.length > 0) {
                console.log(`Found ${imgData.length} potential images for gallery/layout.`);
                
                for (let src of imgData) {
                    const ext = src.split('.').pop().split('?')[0] || 'jpg';
                    
                    // Identify Master Layout
                    if (src.toLowerCase().includes('master') || src.toLowerCase().includes('layout') || src.toLowerCase().includes('plan')) {
                        const mlDest = path.join(dir, `accurate-master-layout.${ext}`);
                        const mlPub = `/assets/projects/${project.slug}/accurate-master-layout.${ext}`;
                        const succ = await downloadImage(src, mlDest);
                        if (succ) masterLayout = mlPub;
                    } 
                    // Otherwise it's a gallery image (skip hero as it's already done)
                    else if (!src.toLowerCase().includes('banner') && !src.toLowerCase().includes('hero')) {
                        const galDest = path.join(dir, `accurate-gallery-${count}.${ext}`);
                        const galPub = `/assets/projects/${project.slug}/accurate-gallery-${count}.${ext}`;
                        const succ = await downloadImage(src, galDest);
                        if (succ) {
                            gallery.push(galPub);
                            count++;
                        }
                    }
                    if (gallery.length >= 6) break; // Limit gallery to 6 high quality images
                }
            }

            if (gallery.length > 0) {
                project.gallery = gallery;
                console.log(`Updated Gallery: ${gallery.length} authentic images downloaded.`);
            }
            if (masterLayout && masterLayout !== project.masterLayout) {
                project.masterLayout = masterLayout;
                console.log(`Updated Master Layout: ${masterLayout}`);
            }

            await page.close();

        } catch (err) {
            console.error(`Error on ${project.slug}:`, err.message);
        }
    }

    fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2), 'utf8');
    console.log("\nGallery & Master Layout Scraping complete. projects.json updated.");
    await browser.close();
})();
