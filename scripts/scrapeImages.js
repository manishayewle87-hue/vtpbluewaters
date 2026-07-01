const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');
const https = require('https');

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
      }
    }).on('error', (err) => {
      reject(err.message);
    });
  });
}

async function scrapeProjectImages(url, slug) {
  console.log(`Launching browser for ${slug}...`);
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Set headers to appear as a normal user
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
  });

  try {
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    
    await page.screenshot({ path: `${slug}-screenshot.png`, fullPage: true });

    console.log(`Extracting images...`);
    const images = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.map(img => ({
        src: img.src || img.getAttribute('data-src') || '',
        alt: img.alt || '',
        className: img.className || ''
      })).filter(img => img.src);
    });

    console.log(`Found ${images.length} images.`);
    
    // Create directory
    const dir = path.join(process.cwd(), 'public', 'assets', 'projects', slug);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Filter relevant images (keep all for now to inspect)
    const relevantImages = images;

    console.log(`Found ${relevantImages.length} relevant images to download.`);
    
    // Save metadata
    fs.writeFileSync(path.join(dir, 'images.json'), JSON.stringify(relevantImages, null, 2));

    let count = 1;
    for (const img of relevantImages) {
      if (img.src.startsWith('http')) {
        const ext = img.src.split('.').pop().split('?')[0] || 'jpg';
        const dest = path.join(dir, `image-${count}.${ext}`);
        try {
          await downloadImage(img.src, dest);
          console.log(`Downloaded ${img.src} -> image-${count}.${ext}`);
          count++;
        } catch (e) {
          console.error(`Failed to download ${img.src}:`, e);
        }
      }
    }

  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
  } finally {
    await browser.close();
  }
}

async function main() {
  await scrapeProjectImages('https://vtprealty.in/projects-in-pune/vtp-earth-one-mahalunge/', 'earth-1');
  await scrapeProjectImages('https://vtprealty.in/projects-in-pune/vtp-altamira-kharadi/', 'altamira');
  await scrapeProjectImages('https://vtprealty.in/projects-in-pune/vtp-monarque-hinjewadi/', 'monarque');
  console.log("Scraping complete!");
}

main();
