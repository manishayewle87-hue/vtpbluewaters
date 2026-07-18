import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Authenticate using the Service Account JSON
const SERVICE_ACCOUNT_FILE = path.join(process.cwd(), 'service_account.json');
const keys = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_FILE, 'utf-8'));

const client = new google.auth.JWT({
  email: keys.client_email,
  key: keys.private_key,
  scopes: ['https://www.googleapis.com/auth/indexing'],
});

const TARGET_URL = 'https://vtpbluewaters.com/explore/vtp-bluewaters-township-mahalunge';

client.authorize(async (err, tokens) => {
  if (err) {
    console.error('Authentication Error:', err);
    return;
  }
  
  const options = {
    url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokens.access_token}`
    },
    data: {
      url: TARGET_URL,
      type: 'URL_UPDATED' // Tell Google to crawl or re-crawl immediately
    }
  };

  try {
    const res = await client.request(options);
    console.log(`[SUCCESS] Pinged Google for: ${TARGET_URL}`);
    console.log(`Status Code: ${res.status}`);
  } catch (apiErr) {
    console.error(`[ERROR] Failed to index ${TARGET_URL}:`, apiErr.message);
  }
});
