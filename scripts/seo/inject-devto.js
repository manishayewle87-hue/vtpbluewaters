/**
 * Off-Page SEO: Dev.to Automated PR Injection
 * 
 * DESCRIPTION:
 * Pushes raw markdown PR articles directly to Dev.to via the Forem API.
 * Excellent for targeting tech-savvy buyers and IT professionals (Hinjawadi IT crowd).
 * 
 * SETUP:
 * 1. Go to Dev.to -> Settings -> Extensions -> Generate API Key
 * 2. Set it in your environment: `export DEVTO_API_KEY="your_key"`
 */

const https = require('https');

const DEVTO_API_KEY = process.env.DEVTO_API_KEY;

if (!DEVTO_API_KEY) {
  console.error("❌ ERROR: DEVTO_API_KEY environment variable is missing.");
  console.log("Please generate an API Key from your Dev.to settings and run:");
  console.log('export DEVTO_API_KEY="your_key"');
  process.exit(1);
}

function publishDevToPost(title, contentMarkdown, tags) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      article: {
        title: title,
        body_markdown: contentMarkdown,
        published: false, // Set to false creates a draft
        tags: tags
      }
    });

    const options = {
      hostname: 'dev.to',
      path: '/api/articles',
      method: 'POST',
      headers: {
        'api-key': DEVTO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.forem.api-v1+json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 201) {
          resolve(JSON.parse(data).url);
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
  console.log("🚀 Initializing Dev.to Injection Engine...");
  try {
    const title = "Smart Home Integration in Pune's Real Estate: A Look at VTP Bluewaters";
    const tags = ["tech", "realestate", "pune", "smartcity"];
    
    const contentMarkdown = `
As the IT sector in Pune (specifically around Hinjawadi and Baner) continues to explode, the demand for tech-integrated, smart homes is at an all-time high. 

Tech professionals are no longer looking for just four walls; they want automated lighting, advanced security, and high-speed fiber-optic infrastructure built right into the township.

## Enter VTP Bluewaters

Located in Mahalunge (the exact center point between Hinjawadi Phase 1 and Baner), [VTP Bluewaters](https://vtpbluewaters.com/) is setting a new benchmark for modern living. 

With its Maximum Livable Area (MLA) philosophy, the design maximizes space utility, which is crucial for modern remote-work setups. The township includes cutting-edge security systems and smart home provisions that cater perfectly to the IT demographic.

Explore the tech-forward configurations and amenities at the [official VTP Bluewaters platform](https://vtpbluewaters.com/).
`;

    console.log(`📡 Pushing "${title}" to Dev.to...`);
    const postUrl = await publishDevToPost(title, contentMarkdown, tags);
    console.log(`🎉 SUCCESS! Article injected to Dev.to as a draft.`);
    console.log(`🔗 Review and Publish here: ${postUrl}`);

  } catch (error) {
    console.error("❌ INJECTION FAILED:", error.message);
  }
}

run();
