const https = require('https');
const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://vtpbluewaters.com';
const SITEMAPS = [
  `${DOMAIN}/sitemap.xml`,
  `${DOMAIN}/sitemap-news.xml`,
  `${DOMAIN}/sitemap-video.xml`,
  `${DOMAIN}/google-realestate-feed.xml`,
  `${DOMAIN}/geo/pune-properties.geojson`
];

async function pingUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode);
    }).on('error', () => {
      resolve(null);
    });
  });
}

async function pingSitemaps() {
  console.log('\n======================================================');
  console.log('📡 1. PINGING GOOGLE & BING SITEMAP REGISTRIES');
  console.log('======================================================');
  
  for (const sitemap of SITEMAPS) {
    const googlePing = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemap)}`;
    const bingPing = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemap)}`;
    
    const [gStatus, bStatus] = await Promise.all([
      pingUrl(googlePing),
      pingUrl(bingPing)
    ]);
    
    console.log(`[+] ${sitemap}`);
    console.log(`    ↳ Google Status: ${gStatus || 'Dispatched'}`);
    console.log(`    ↳ Bing Status  : ${bStatus || 'Dispatched'}`);
  }
}

async function pingWebSubHubs() {
  console.log('\n======================================================');
  console.log('📡 1.5. NOTIFYING GOOGLE WEBSUB / PUBSUBHUBBUB HUBS');
  console.log('======================================================');

  const feeds = [
    'https://vtpbluewaters.com/rss.xml',
    'https://vtpbluewaters.com/property-feed.xml',
    'https://vtpbluewaters.com/google-realestate-feed.xml'
  ];

  const hubs = [
    'https://pubsubhubbub.appspot.com/',
    'https://pubsubhubbub.superfeedr.com/'
  ];

  for (const feed of feeds) {
    for (const hub of hubs) {
      try {
        const body = new URLSearchParams();
        body.append('hub.mode', 'publish');
        body.append('hub.url', feed);

        const res = await fetch(hub, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString()
        });

        console.log(`[+] WebSub Ping: ${feed} -> ${hub} (HTTP ${res.status})`);
      } catch (err) {
        console.warn(`[!] WebSub Ping warning: ${err.message}`);
      }
    }
  }
}

async function triggerIndexNow() {
  console.log('\n======================================================');
  console.log('⚡ 2. SUBMITTING URLS TO INDEXNOW (BING, YAHOO, YANDEX)');
  console.log('======================================================');

  const host = 'vtpbluewaters.com';
  const key = '3269e49cb163f1268960424999f0efe9';
  const keyLocation = `https://${host}/${key}.txt`;

  const urls = [
    'https://vtpbluewaters.com',
    'https://vtpbluewaters.com/township',
    'https://vtpbluewaters.com/configurations',
    'https://vtpbluewaters.com/tools/emi-calculator',
    'https://vtpbluewaters.com/insights',
    'https://vtpbluewaters.com/faq',
    'https://vtpbluewaters.com/investors/nri-investment-guide',
    'https://vtpbluewaters.com/market-intelligence/mahalunge-hinjewadi-investment-guide',
  ];

  try {
    const silosPath = path.join(__dirname, '../../app/data/seo-silos.js');
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
    console.warn('[!] Note: Using core URLs for IndexNow batch:', e.message);
  }

  console.log(`[+] Pushing ${urls.length} verified landing pages to IndexNow API...`);

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

      console.log(`    ↳ Batch ${i / batchSize + 1} (${chunk.length} URLs): HTTP ${response.status}`);
    } catch (error) {
      console.error(`    ↳ Error: ${error.message}`);
    }
  }
}

async function checkGoogleIndexingApi() {
  console.log('\n======================================================');
  console.log('🤖 3. GOOGLE INDEXING API (SERVICE ACCOUNT CHECK)');
  console.log('======================================================');
  
  const keyPath = path.join(process.cwd(), 'service_account.json');
  if (fs.existsSync(keyPath)) {
    console.log('✅ service_account.json found! Running Google Indexing API push...');
    try {
      require('child_process').execSync('node scripts/batch-indexer.js', { stdio: 'inherit' });
    } catch (err) {
      console.error('[-] Error during Google Indexing API push:', err.message);
    }
  } else {
    console.log('ℹ️  service_account.json not found in project root.');
    console.log('   (To activate instant Google Indexing API push, download your GCP Service Account JSON key as service_account.json)');
  }
}

async function main() {
  console.log('======================================================');
  console.log('🚀 ENTERPRISE SEARCH ENGINE INDEXING & DISPATCH SUITE');
  console.log('======================================================');
  
  await pingSitemaps();
  await pingWebSubHubs();
  await triggerIndexNow();
  await checkGoogleIndexingApi();
  
  console.log('\n======================================================');
  console.log('✅ ALL SEARCH ENGINE NOTIFICATION CYCLES COMPLETE');
  console.log('======================================================\n');
}

main();
