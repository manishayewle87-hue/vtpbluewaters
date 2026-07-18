import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Usage: node scripts/google-indexer.js <url_to_index>
// Make sure you have downloaded your Service Account JSON key from GCP
// and saved it as service_account.json in the project root.

const keyPath = path.join(process.cwd(), 'service_account.json');

async function pushUrlToGoogleIndex(url) {
  if (!fs.existsSync(keyPath)) {
    console.error('ERROR: service_account.json not found in project root.');
    console.error('Please generate a Service Account key from Google Cloud Console with Indexing API permissions.');
    process.exit(1);
  }

  const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

  const jwtClient = new google.auth.JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: ['https://www.googleapis.com/auth/indexing']
  });

  try {
    await jwtClient.authorize();
    
    const indexing = google.indexing({
      version: 'v3',
      auth: jwtClient,
    });

    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: 'URL_UPDATED',
      },
    });

    console.log(`Success! Sent URL_UPDATED notification for ${url}`);
    console.log(`Response Status: ${response.status}`);
  } catch (error) {
    console.error('Failed to index URL:', error.message);
  }
}

const targetUrl = process.argv[2];
if (!targetUrl) {
  console.log('Please provide a URL to index.');
  console.log('Example: node scripts/google-indexer.js https://vtpbluewaters.com/en/township');
  process.exit(1);
}

pushUrlToGoogleIndex(targetUrl);
