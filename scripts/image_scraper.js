const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');

const PROJECTS = [
    { url: 'https://vtprealty.in/projects/earth-one-by-vtp-luxe-mahalunge-pune', slug: 'earth-1' },
    { url: 'https://vtprealty.in/projects/vtp-altamira-kharadi-pune', slug: 'altamira' },
    { url: 'https://vtprealty.in/projects/vtp-monarque-hinjawadi-pune', slug: 'monarque' },
    { url: 'https://vtprealty.in/projects/flamante-by-vtp-luxe-kharadi-pune', slug: 'flamante' },
    { url: 'https://vtprealty.in/projects/velvet-villas-by-vtp-luxe-kharadi-pune', slug: 'velvet-villas' }
];

(async () => {
    console.log("Launching headless browser...");
    const browser = await puppeteer.launch({ 
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    for (const project of PROJECTS) {
        console.log(`\nNavigating to ${project.url}...`);
        const page = await browser.newPage();
        
        const outputDir = path.join(__dirname, '../public/assets/projects', project.slug);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        let imgCount = 1;
        
        page.on('response', async (response) => {
            const url = response.url();
            const resourceType = response.request().resourceType();
            
            if (resourceType === 'image') {
                try {
                    const buffer = await response.buffer();
                    // Save images larger than 50KB to skip tiny icons/logos
                    if (buffer.length > 50000) {
                        let ext = '.jpg';
                        if (url.toLowerCase().includes('.png')) ext = '.png';
                        if (url.toLowerCase().includes('.webp')) ext = '.webp';
                        
                        const filename = `scraped-${imgCount}${ext}`;
                        fs.writeFileSync(path.join(outputDir, filename), buffer);
                        console.log(`Saved ${filename} (${Math.round(buffer.length/1024)} KB)`);
                        imgCount++;
                    }
                } catch (e) {
                    // Ignore buffer errors (e.g., redirects, aborted requests)
                }
            }
        });
        
        try {
            await page.goto(project.url, { waitUntil: 'networkidle2', timeout: 30000 });
            
            // Scroll down a bit to trigger lazy loading
            await page.evaluate(() => window.scrollBy(0, 1500));
            await new Promise(r => setTimeout(r, 2000));
            
            await page.evaluate(() => window.scrollBy(0, 1500));
            await new Promise(r => setTimeout(r, 2000));
            
            await page.evaluate(() => window.scrollBy(0, 1500));
            await new Promise(r => setTimeout(r, 4000));
            
        } catch (e) {
            console.log(`Timeout or error on ${project.slug}: ${e.message}`);
        }
        
        await page.close();
    }
    
    await browser.close();
    console.log("\nDone scraping all projects!");
})();
