import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
const keyPath = path.join(process.cwd(), 'service_account.json');
const projectsPath = path.join(process.cwd(), 'app/data/projects.json');
const baseUrl = 'https://vtpbluewaters.com';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function getUrlsToIndex() {
  const urls = [
    `${baseUrl}`,
    `${baseUrl}/township`,
    `${baseUrl}/insights`,
    `${baseUrl}/faq`,
    `${baseUrl}/explore`,
    `${baseUrl}/market-intelligence/mahalunge-hinjewadi-investment-guide`,
    `${baseUrl}/market-intelligence/vtp-bluewaters-township-review`,
    `${baseUrl}/investors/nri-investment-guide`,
    `${baseUrl}/investors/pune-infrastructure-impact-report`,
  ];

  try {
    const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
    const projects = projectsData.projects || projectsData; // Handle both structures just in case
    
    for (const project of projects) {
      urls.push(`${baseUrl}/projects/${project.slug}`);
      urls.push(`${baseUrl}/projects/${project.slug}/price`);
      urls.push(`${baseUrl}/projects/${project.slug}/floor-plan`);
      urls.push(`${baseUrl}/projects/${project.slug}/location`);
    }
  } catch (error) {
    console.log("Could not load dynamic projects from CMS, proceeding with static list.");
  }

  return urls;
}

async function runBatchIndex() {
  if (!fs.existsSync(keyPath)) {
    console.error('ERROR: service_account.json not found in project root.');
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

    const urls = await getUrlsToIndex();
    console.log(`Starting batch index of ${urls.length} URLs...`);

    for (const url of urls) {
      try {
        const response = await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED',
          },
        });
        console.log(`[SUCCESS] Indexed ${url} (Status: ${response.status})`);
      } catch (err) {
        console.error(`[ERROR] Failed for ${url}:`, err.message);
      }
      
      // Delay to avoid hitting Google's rate limits (approx 1 sec)
      await delay(1000); 
    }
    
    console.log('Batch indexing complete!');
  } catch (error) {
    console.error('Failed to authorize with Google:', error.message);
  }
}

runBatchIndex();
