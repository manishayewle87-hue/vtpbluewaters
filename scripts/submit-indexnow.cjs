const fs = require('fs');

async function run() {
  const host = 'vtpbluewaters.com';
  const key = '3269e49cb163f1268960424999f0efe9';
  const keyLocation = `https://${host}/${key}.txt`;

  console.log(`\n[+] Generating priority URLs locally for IndexNow API...`);
  
  // Submit the core pages and market intelligence pages
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
    'https://vtpbluewaters.com/explore'
  ];

  console.log(`[+] Pushing ${urls.length} high-priority pages to IndexNow API (Bing, Yahoo, Yandex)...`);

  const payload = {
    host: host,
    key: key,
    keyLocation: keyLocation,
    urlList: urls
  };

  try {
    // IndexNow endpoint (Bing automatically shares with Yandex and others)
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'charset': 'utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log(`[=] SUCCESS: IndexNow received the URL batch (Status: ${response.status})`);
      console.log(`[=] The following search engines are now pinged: Bing, Yahoo, Yandex, Seznam.`);
    } else {
      console.error(`[-] FAILED: IndexNow returned status ${response.status}`);
      const text = await response.text();
      console.error(`[-] Response: ${text}`);
    }
  } catch (error) {
    console.error(`[-] ERROR: Failed to submit to IndexNow - ${error.message}`);
  }
}

run();
