const https = require('https');

const DOMAIN = 'https://vtpbluewaters.com';
const SITEMAP_URL = `${DOMAIN}/sitemap.xml`;

const pingGoogle = () => {
  return new Promise((resolve, reject) => {
    const url = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
    
    console.log(`Pinging Google to crawl the chunked sitemaps: ${SITEMAP_URL}`);
    
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        console.log(`✅ Google successfully received the ping request!`);
        console.log(`They will now parse the sitemap index and crawl the 10,000+ URL chunks asynchronously.`);
        resolve();
      } else {
        console.error(`❌ Failed to ping Google. Status code: ${res.statusCode}`);
        reject(new Error(`Status Code: ${res.statusCode}`));
      }
    }).on('error', (e) => {
      console.error(`❌ Error pinging Google: ${e.message}`);
      reject(e);
    });
  });
};

const pingBing = () => {
  return new Promise((resolve, reject) => {
    const url = `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
    
    console.log(`Pinging Bing to crawl the chunked sitemaps: ${SITEMAP_URL}`);
    
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        console.log(`✅ Bing successfully received the ping request!`);
        resolve();
      } else {
        console.error(`❌ Failed to ping Bing. Status code: ${res.statusCode}`);
        reject(new Error(`Status Code: ${res.statusCode}`));
      }
    }).on('error', (e) => {
      console.error(`❌ Error pinging Bing: ${e.message}`);
      reject(e);
    });
  });
};

async function executePings() {
  try {
    await pingGoogle();
    console.log('---');
    await pingBing();
    console.log('\n🚀 ALL SEARCH ENGINES HAVE BEEN PINGED WITH THE NEW SITEMAP ARCHITECTURE.');
  } catch (err) {
    console.error('Failed to execute pings:', err);
  }
}

executePings();
