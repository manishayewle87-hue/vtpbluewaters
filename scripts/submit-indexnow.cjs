const fs = require('fs');
const path = require('path');

async function run() {
  const host = 'vtpbluewaters.com';
  const key = '3269e49cb163f1268960424999f0efe9';
  const keyLocation = `https://${host}/${key}.txt`;

  console.log(`\n[+] Loading all priority URLs for IndexNow API...`);
  
  const urls = [
    'https://vtpbluewaters.com',
    'https://vtpbluewaters.com/market-intelligence/mahalunge-hinjewadi-investment-guide',
    'https://vtpbluewaters.com/market-intelligence/vtp-bluewaters-township-review',
    'https://vtpbluewaters.com/market-intelligence/pune-ultra-luxury-real-estate-trends',
    'https://vtpbluewaters.com/market-intelligence/vtp-bluewaters-vs-competitors',
    'https://vtpbluewaters.com/market-intelligence/hinjewadi-walk-to-work-lifestyle',
    'https://vtpbluewaters.com/investors/nri-investment-guide',
    'https://vtpbluewaters.com/investors/pune-infrastructure-impact-report',
    'https://vtpbluewaters.com/township',
    'https://vtpbluewaters.com/configurations',
    'https://vtpbluewaters.com/insights',
    'https://vtpbluewaters.com/faq'
  ];

  // Try to load seoSilos file
  try {
    const silosPath = path.join(__dirname, '../app/data/seo-silos.js');
    if (fs.existsSync(silosPath)) {
      const fileContent = fs.readFileSync(silosPath, 'utf8');
      const jsonStart = fileContent.indexOf('[');
      const jsonEnd = fileContent.lastIndexOf(']');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        const silos = JSON.parse(fileContent.substring(jsonStart, jsonEnd + 1));
        silos.forEach(s => {
          if (Array.isArray(s.slugs)) {
            s.slugs.forEach(item => {
              urls.push(`https://${host}/explore/${item.slug}`);
            });
          }
        });
      }
    }
  } catch (e) {
    console.warn('[!] Note: Could not parse seo-silos for IndexNow, using core URLs:', e.message);
  }

  console.log(`[+] Pushing ${urls.length} high-priority pages to IndexNow API (Bing, Yahoo, Yandex, Seznam)...`);

  // Split into batches of 10,000 (IndexNow API limit)
  const batchSize = 10000;
  for (let i = 0; i < urls.length; i += batchSize) {
    const chunk = urls.slice(i, i + batchSize);
    const payload = {
      host: host,
      key: key,
      keyLocation: keyLocation,
      urlList: chunk
    };

    try {
      const response = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'charset': 'utf-8'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok || response.status === 200 || response.status === 202) {
        console.log(`[=] SUCCESS: Batch ${i / batchSize + 1} (${chunk.length} URLs) received by IndexNow (Status: ${response.status})`);
      } else {
        console.error(`[-] FAILED: IndexNow returned status ${response.status}`);
        const text = await response.text();
        console.error(`[-] Response: ${text}`);
      }
    } catch (error) {
      console.error(`[-] ERROR: Failed to submit to IndexNow - ${error.message}`);
    }
  }
}

run();
