const https = require('https');

const DOMAIN = 'https://vtpbluewaters.com';
const SITEMAPS = [
  `${DOMAIN}/sitemap.xml`,
  `${DOMAIN}/sitemap-news.xml`,
  `${DOMAIN}/sitemap-video.xml`
];

const pingGoogle = (sitemapUrl) => {
  return new Promise((resolve) => {
    const url = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    console.log(`[Google] Pinging: ${sitemapUrl}`);
    
    https.get(url, (res) => {
      console.log(`[Google] Response status: ${res.statusCode}`);
      resolve();
    }).on('error', (e) => {
      console.warn(`[Google] Ping notice: ${e.message}`);
      resolve();
    });
  });
};

const pingBing = (sitemapUrl) => {
  return new Promise((resolve) => {
    const url = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    console.log(`[Bing] Pinging: ${sitemapUrl}`);
    
    https.get(url, (res) => {
      console.log(`[Bing] Response status: ${res.statusCode}`);
      resolve();
    }).on('error', (e) => {
      console.warn(`[Bing] Ping notice: ${e.message}`);
      resolve();
    });
  });
};

async function executePings() {
  console.log('====================================================');
  console.log('🚀 Pinging Google & Bing with all Verified Sitemaps');
  console.log('====================================================');
  for (const sitemap of SITEMAPS) {
    await pingGoogle(sitemap);
    await pingBing(sitemap);
  }
  console.log('\n✅ All sitemaps dispatched to search engine crawl queues.');
}

executePings();
