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

const projectsPath = path.join(process.cwd(), 'app/data/projects.json');
const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

client.authorize(async (err, tokens) => {
  if (err) {
    console.error('Authentication Error:', err);
    return;
  }
  
  for (const project of projectsData) {
    const targetUrl = `https://vtpbluewaters.com/explore/${project.slug}`;
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
      console.log(`[SUCCESS] Pinged Google for: ${targetUrl} (Status: ${res.status})`);
    } catch (apiErr) {
      console.error(`[ERROR] Failed to index ${targetUrl}:`, apiErr.message);
    }
    
    // Quick delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 500));
  }
});
