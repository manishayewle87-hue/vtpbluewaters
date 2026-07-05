/**
 * Off-Page SEO: WordPress/Blogger Automated PR Injection
 * 
 * DESCRIPTION:
 * Pushes HTML PR articles to any self-hosted WordPress site or WordPress.com 
 * blog via the standard WordPress REST API.
 * 
 * SETUP:
 * 1. Generate an Application Password in your WordPress Admin (Users -> Profile -> Application Passwords)
 * 2. Set environment variables:
 *    export WP_URL="https://yourblog.com"
 *    export WP_USER="your_username"
 *    export WP_PASS="your_application_password"
 */

const https = require('https');

const WP_URL = process.env.WP_URL;
const WP_USER = process.env.WP_USER;
const WP_PASS = process.env.WP_PASS;

if (!WP_URL || !WP_USER || !WP_PASS) {
  console.error("❌ ERROR: WordPress environment variables are missing.");
  console.log("Please export WP_URL, WP_USER, and WP_PASS.");
  process.exit(1);
}

function publishWordPressPost(title, contentHtml) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      title: title,
      content: contentHtml,
      status: 'draft', // Change to 'publish' when confident
    });

    const url = new URL(`${WP_URL}/wp-json/wp/v2/posts`);
    const auth = Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64');

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
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
          resolve(JSON.parse(data).link);
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
  console.log(`🚀 Initializing WordPress Injection Engine for ${WP_URL}...`);
  try {
    const title = "Discovering Mahalunge: The Future of Pune Real Estate";
    
    // WordPress API expects HTML content
    const contentHtml = `
      <p>Pune's real estate landscape is undergoing a massive transformation, and at the epicenter of this evolution lies <strong>Mahalunge</strong>. Anchoring this high-growth corridor is <a href="https://vtpbluewaters.com/">VTP Bluewaters</a>, a 200-acre mega-township that is redefining luxury living.</p>
      
      <h2>The Mahalunge Advantage</h2>
      <p>Strategically located between Hinjawadi IT Park and Baner, Mahalunge offers unparalleled connectivity. The ongoing infrastructure developments, including the PMRDA ring road and upcoming metro lines, position this micro-market for exponential appreciation.</p>
      
      <h2>VTP Bluewaters: The Township Ecosystem</h2>
      <p>VTP Bluewaters isn't just a residential project; it's a self-sustaining ecosystem. Featuring premium clusters like VTP Earth One and VTP Leonara, the township offers:</p>
      <ul>
        <li>Over 50% open green spaces bordered by the Mula-Mutha river.</li>
        <li>MLA (Maximum Livable Area) philosophy, ensuring zero space wastage.</li>
        <li>Premium lifestyle amenities, from grand clubhouses to professional sports academies.</li>
      </ul>
      
      <p>Investors and homebuyers looking for a blend of nature, luxury, and high ROI should explore the official configurations at the <a href="https://vtpbluewaters.com/">VTP Bluewaters Official Site</a>.</p>
    `;

    console.log(`📡 Pushing "${title}" to WordPress...`);
    const postUrl = await publishWordPressPost(title, contentHtml);
    console.log(`🎉 SUCCESS! Article injected to WordPress as a draft.`);
    console.log(`🔗 Review and Publish here: ${postUrl}`);

  } catch (error) {
    console.error("❌ INJECTION FAILED:", error.message);
  }
}

run();
