import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Import the massive programmatic SEO silos
import { seoSilos } from '../app/data/seo-silos.js';

// Authenticate using the Service Account JSON (Local File or GitHub Secret)
let keys;
if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
  keys = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
} else {
  const SERVICE_ACCOUNT_FILE = path.join(process.cwd(), 'service_account.json');
  keys = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_FILE, 'utf-8'));
}

const client = new google.auth.JWT({
  email: keys.client_email,
  key: keys.private_key,
  scopes: ['https://www.googleapis.com/auth/indexing'],
});

client.authorize(async (err, tokens) => {
  if (err) {
    console.error('Authentication Error:', err);
    return;
  }
  
  // Flatten all slugs
  const flatSlugs = seoSilos.flatMap(silo => silo.slugs.map(s => s.slug));
  
  // Prioritize Mahalunge and Hinjawadi for immediate indexing
  const prioritizedSlugs = flatSlugs.filter(slug => slug.includes('mahalunge') || slug.includes('hinjawadi'));
  
  // Google Indexing API standard quota is 200 per day.
  // We will submit the top 150 most critical programmatic pages right now.
  const targetSlugs = prioritizedSlugs.slice(0, 150);

  console.log(`🚀 Starting Google Indexing API submission for ${targetSlugs.length} priority programmatic pages...`);

  let successCount = 0;
  let failCount = 0;

  for (const slug of targetSlugs) {
    const targetUrl = `https://vtpbluewaters.com/explore/${slug}`;
    const options = {
      url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.access_token}`
      },
      data: {
        url: targetUrl,
        type: 'URL_UPDATED'
      }
    };

    try {
      const res = await client.request(options);
      console.log(`✅ [SUCCESS] Pinged: ${targetUrl} (Status: ${res.status})`);
      successCount++;
    } catch (apiErr) {
      console.error(`❌ [ERROR] Failed to index ${targetUrl}:`, apiErr.message);
      failCount++;
    }
    
    // 500ms delay to prevent rate limit triggers (HTTP 429 Too Many Requests)
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('----------------------------------------------------');
  console.log(`✅ Indexing Submission Complete!`);
  console.log(`📊 Successfully Pinged: ${successCount} URLs`);
  console.log(`⚠️ Failed Pings: ${failCount} URLs`);
});
