const { google } = require('googleapis');
const key = require('./service-account.json');
const fs = require('fs');

// Initialize JWT authentication with the required scope
const jwtClient = new google.auth.JWT({
  email: key.client_email,
  key: key.private_key,
  scopes: ['https://www.googleapis.com/auth/indexing'],
});

async function run() {
  console.log(`[+] Authenticating with Google Cloud as ${key.client_email}...`);
  try {
    await jwtClient.authorize();
    console.log('[+] Authentication successful!');
  } catch (error) {
    console.error('[-] Authentication failed:', error);
    return;
  }

  console.log(`\n[+] Generating priority URLs locally for Indexing API...`);
  
  // We will submit the core market intelligence pages immediately
  let urls = [
    'https://vtpbluewaters.com',
    'https://vtpbluewaters.com/market-intelligence/mahalunge-hinjewadi-investment-guide',
    'https://vtpbluewaters.com/market-intelligence/vtp-bluewaters-township-review',
    'https://vtpbluewaters.com/market-intelligence/pune-ultra-luxury-real-estate-trends',
    'https://vtpbluewaters.com/market-intelligence/vtp-bluewaters-vs-competitors',
    'https://vtpbluewaters.com/market-intelligence/hinjewadi-walk-to-work-lifestyle',
    'https://vtpbluewaters.com/investors/nri-investment-guide',
    'https://vtpbluewaters.com/investors/pune-infrastructure-impact-report',
    'https://vtpbluewaters.com/township'
  ];

  console.log(`[+] Pushing ${urls.length} high-priority Core & Market Intelligence pages to Google Indexing API...`);

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
