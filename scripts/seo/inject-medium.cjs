/**
 * Off-Page SEO: Medium.com Automated PR Injection
 * 
 * DESCRIPTION:
 * Pushes raw markdown PR articles directly to Medium via the Medium API.
 * This establishes high Domain Authority (DA 95+) contextual backlinks pointing 
 * directly to the VTP Bluewaters landing pages.
 * 
 * SETUP:
 * 1. Go to Medium -> Settings -> Security and Apps -> Integration Tokens
 * 2. Generate a token and set it in your environment: `export MEDIUM_TOKEN="your_token"`
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const MEDIUM_TOKEN = process.env.MEDIUM_TOKEN;

if (!MEDIUM_TOKEN) {
  console.error("❌ ERROR: MEDIUM_TOKEN environment variable is missing.");
  console.log("Please generate an Integration Token from your Medium settings and run:");
  console.log('export MEDIUM_TOKEN="your_token"');
  process.exit(1);
}

// 1. Get User ID
function getUserId() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.medium.com',
      path: '/v1/me',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${MEDIUM_TOKEN}`,
        'Accept': 'application/json',
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data).data.id);
        } else {
          reject(new Error(`Failed to get user ID: ${data}`));
        }
      });
    });
    
    req.on('error', reject);
    req.end();
  });
}

// 2. Publish Post
function publishPost(userId, title, contentMarkdown, tags) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      title: title,
      contentFormat: 'markdown',
      content: contentMarkdown,
      tags: tags,
      publishStatus: 'draft', // Safe default: Creates a draft. Change to 'public' when confident.
      notifyFollowers: true
    });

    const options = {
      hostname: 'api.medium.com',
      path: `/v1/users/${userId}/posts`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MEDIUM_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 201) {
          resolve(JSON.parse(data).data.url);
        } else {
          reject(new Error(`Failed to publish post: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function run() {
  console.log("🚀 Initializing Medium Injection Engine...");
  try {
    const userId = await getUserId();
    console.log(`✅ Authenticated with Medium (User ID: ${userId})`);

    // Example injection
    const title = "VTP Bluewaters: Why Mahalunge is Pune's Top Investment Hub in 2026";
    const tags = ["Real Estate", "Pune", "Investment", "Luxury Homes", "VTP Bluewaters"];
    
    const contentMarkdown = `
# VTP Bluewaters: Why Mahalunge is Pune's Top Investment Hub in 2026

Pune's real estate landscape is undergoing a massive transformation, and at the epicenter of this evolution lies **Mahalunge**. Anchoring this high-growth corridor is [VTP Bluewaters](https://vtpbluewaters.com/), a 200-acre mega-township that is redefining luxury living.

## The Mahalunge Advantage

Strategically located between Hinjawadi IT Park and Baner, Mahalunge offers unparalleled connectivity. The ongoing infrastructure developments, including the PMRDA ring road and upcoming metro lines, position this micro-market for exponential appreciation.

## VTP Bluewaters: The Township Ecosystem

VTP Bluewaters isn't just a residential project; it's a self-sustaining ecosystem. Featuring premium clusters like VTP Earth One and VTP Leonara, the township offers:
* Over 50% open green spaces bordered by the Mula-Mutha river.
* MLA (Maximum Livable Area) philosophy, ensuring zero space wastage.
* Premium lifestyle amenities, from grand clubhouses to professional sports academies.

Investors and homebuyers looking for a blend of nature, luxury, and high ROI should explore the official configurations at the [VTP Bluewaters Official Site](https://vtpbluewaters.com/).
`;

    console.log(`📡 Pushing "${title}" to Medium...`);
    const postUrl = await publishPost(userId, title, contentMarkdown, tags);
    console.log(`🎉 SUCCESS! Article injected to Medium as a draft.`);
    console.log(`🔗 Review and Publish here: ${postUrl}`);

  } catch (error) {
    console.error("❌ INJECTION FAILED:", error.message);
  }
}

run();
