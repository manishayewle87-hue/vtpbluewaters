const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const keyPath = path.join(__dirname, '../service-account.json');
const projectsPath = path.join(__dirname, '../../app/data/projects.json');

const DOMAIN = 'https://www.vtpbluewaters.com';

async function run() {
  console.log("🚀 Initializing Google Indexing API Push...");

  if (!fs.existsSync(keyPath)) {
    console.error(`❌ ERROR: Credentials not found at ${keyPath}`);
    console.error(`Please place your Google Cloud 'service-account.json' file in the root of the project.`);
    process.exit(1);
  }

  // Load JWT Auth
  const auth = new google.auth.JWT({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  const indexing = google.indexing({
    version: 'v3',
    auth: auth,
  });

  // Extract URLs
  const urls = [`${DOMAIN}/`, `${DOMAIN}/township`, `${DOMAIN}/faq`, `${DOMAIN}/explore/virtual-tour`];
  
  if (fs.existsSync(projectsPath)) {
    const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
    projects.forEach(p => {
      if (p.slug) urls.push(`${DOMAIN}/projects/${p.slug}`);
    });
  }

  console.log(`📡 Discovered ${urls.length} URLs to index.`);
  console.log(`🔑 Authenticating with Google Cloud...`);

  try {
    for (const url of urls) {
      console.log(`Pushing URL: ${url}`);
      const res = await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED',
        },
      });
      console.log(`✅ Success: URL submitted for indexing.`);
    }
    console.log(`🎉 All URLs successfully pushed to Google Indexing API!`);
  } catch (err) {
    console.error(`❌ Error communicating with Indexing API:`, err.message);
    if (err.response && err.response.data) {
       console.error(JSON.stringify(err.response.data, null, 2));
       if (err.response.data.error.status === 'PERMISSION_DENIED') {
          console.error(`\n⚠️ PERMISSION DENIED: Ensure you have added the service account email as an OWNER in Google Search Console!`);
       }
    }
  }
}

run();
