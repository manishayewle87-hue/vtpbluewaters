const { google } = require('googleapis');
const key = require('./service-account.json');
const https = require('https');

// Initialize JWT authentication with the required scope
const jwtClient = new google.auth.JWT({
  email: key.client_email,
  key: key.private_key,
  scopes: ['https://www.googleapis.com/auth/indexing'],
});

// We will fetch the first 200 URLs from sitemap/0.xml (due to 200/day quota limit)
const SITEMAP_URL = 'https://vtpbluewaters.com/sitemap/0.xml';

async function fetchSitemapUrls(sitemapUrl) {
  return new Promise((resolve, reject) => {
    https.get(sitemapUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        // Regex to extract all <loc> contents
        const regex = /<loc>(.*?)<\/loc>/g;
        let urls = [];
        let match;
        while ((match = regex.exec(data)) !== null) {
          urls.push(match[1]);
        }
        resolve(urls);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  console.log(`[+] Authenticating with Google Cloud as ${key.client_email}...`);
  try {
    await jwtClient.authorize();
    console.log('[+] Authentication successful!');
  } catch (error) {
    console.error('[-] Authentication failed:', error);
    return;
  }

  console.log(`\n[+] Fetching URLs from ${SITEMAP_URL}...`);
  let urls = await fetchSitemapUrls(SITEMAP_URL);
  
  if (urls.length === 0) {
    console.log('[-] No URLs found or sitemap is empty/failing. Ensure the sitemap is live.');
    return;
  }

  console.log(`[+] Found ${urls.length} URLs. Truncating to 200 to respect daily quota limits.`);
  urls = urls.slice(0, 200);

  let successCount = 0;
  let failCount = 0;

  console.log(`\n[+] Beginning batch submission to Google Indexing API...\n`);

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      const options = {
        url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          url: url,
          type: 'URL_UPDATED'
        },
      };

      const res = await jwtClient.request(options);
      console.log(`[${i+1}/${urls.length}] SUCCESS: ${url}`);
      successCount++;
    } catch (error) {
      console.log(`[${i+1}/${urls.length}] FAILED: ${url} - ${error.message}`);
      failCount++;
      // If we hit a 429 Too Many Requests, break out of loop
      if (error.response && error.response.status === 429) {
        console.log('\n[!] Quota Limit Exceeded. Stopping execution.');
        break;
      }
    }

    // Add a slight delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\n[=] Execution Complete.`);
  console.log(`[=] Successfully Submitted: ${successCount}`);
  console.log(`[=] Failed: ${failCount}`);
}

run();
