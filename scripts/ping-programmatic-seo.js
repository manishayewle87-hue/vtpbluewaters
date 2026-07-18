import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Import all SEO silos
import { seoSilos } from '../app/data/seo-silos.js';

const BASE_URL = 'https://vtpbluewaters.com';
const DAILY_QUOTA = 180; // Stay under Google's 200/day limit with 20 buffer

// ─── AUTH ────────────────────────────────────────────────────────────────────
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

// ─── SMART ROTATING QUEUE LOGIC ──────────────────────────────────────────────
// We have 11,000+ pages. Google allows 200 pings/day.
// Strategy: Use today's UTC date as a deterministic offset to rotate
// through ALL slugs over time — so every page gets indexed eventually.

const flatSlugs = seoSilos.flatMap(silo => silo.slugs.map(s => s.slug));

// Priority Tier 1: VTP Brand + Project-specific pages (highest intent)
const tier1 = flatSlugs.filter(s =>
  s.includes('vtp-altamira') || s.includes('vtp-monarque') ||
  s.includes('vtp-earth-1') || s.includes('vtp-flamante') ||
  s.includes('vtp-velvet-villas') || s.includes('vtp-cielo') ||
  s.includes('vtp-aurelia') || s.includes('vtp-volare') ||
  s.includes('vtp-realty') || s.includes('vtp-blue-waters') ||
  s.includes('pune-citywide')
);

// Priority Tier 2: Mahalunge + Hinjawadi (core location)
const tier2 = flatSlugs.filter(s =>
  !tier1.includes(s) && (s.includes('mahalunge') || s.includes('hinjawadi'))
);

// Priority Tier 3: All other location silos
const tier3 = flatSlugs.filter(s =>
  !tier1.includes(s) && !tier2.includes(s) &&
  (s.includes('kharadi') || s.includes('baner') || s.includes('bavdhan') ||
   s.includes('wakad') || s.includes('pimple-saudagar') || s.includes('wanowrie') ||
   s.includes('hadapsar') || s.includes('wagholi') || s.includes('sus') ||
   s.includes('tathawade') || s.includes('pashan'))
);

// Priority Tier 4: Everything else (configuration silos, amenity silos, etc.)
const tier4 = flatSlugs.filter(s =>
  !tier1.includes(s) && !tier2.includes(s) && !tier3.includes(s)
);

// Build the full prioritized queue
const prioritizedQueue = [...tier1, ...tier2, ...tier3, ...tier4];

console.log(`📦 Total URLs in queue: ${prioritizedQueue.length}`);
console.log(`   Tier 1 (VTP Brand/Projects): ${tier1.length}`);
console.log(`   Tier 2 (Mahalunge/Hinjawadi): ${tier2.length}`);
console.log(`   Tier 3 (New Pune Locations): ${tier3.length}`);
console.log(`   Tier 4 (All others): ${tier4.length}`);

// Calculate today's offset for rotation
// Using day-of-year so each daily run submits a fresh batch
const now = new Date();
const startOfYear = new Date(Date.UTC(now.getUTCFullYear(), 0, 0));
const dayOfYear = Math.floor((now - startOfYear) / 86400000);
const batchOffset = (dayOfYear * DAILY_QUOTA) % prioritizedQueue.length;

// Extract today's batch, wrapping around the array if needed
let todayBatch = [];
for (let i = 0; i < DAILY_QUOTA; i++) {
  todayBatch.push(prioritizedQueue[(batchOffset + i) % prioritizedQueue.length]);
}

// Always ensure Tier 1 items are included in first ~40 slots of today's batch
// This means VTP project pages get pinged EVERY day regardless of rotation
const tier1Daily = tier1.slice(0, 40);
const nonTier1Batch = todayBatch.filter(s => !tier1Daily.includes(s)).slice(0, DAILY_QUOTA - tier1Daily.length);
const finalBatch = [...tier1Daily, ...nonTier1Batch];

console.log(`\n🗓️  Day of Year: ${dayOfYear} | Batch Offset: ${batchOffset}`);
console.log(`🎯 Today's target: ${finalBatch.length} URLs (${tier1Daily.length} Tier-1 guaranteed + ${nonTier1Batch.length} rotating)\n`);

// ─── PING GOOGLE ─────────────────────────────────────────────────────────────
client.authorize(async (err, tokens) => {
  if (err) {
    console.error('❌ Authentication Error:', err);
    process.exit(1);
  }

  let successCount = 0;
  let failCount = 0;
  const failedUrls = [];

  for (const slug of finalBatch) {
    const targetUrl = `${BASE_URL}/explore/${slug}`;
    const options = {
      url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.access_token}`,
      },
      data: { url: targetUrl, type: 'URL_UPDATED' },
    };

    try {
      const res = await client.request(options);
      console.log(`✅ [${res.status}] ${targetUrl}`);
      successCount++;
    } catch (apiErr) {
      const status = apiErr?.response?.status;
      if (status === 429) {
        console.warn(`⏸️  Rate limited. Stopping early.`);
        failedUrls.push(targetUrl);
        break;
      }
      console.error(`❌ [${status || 'ERR'}] ${targetUrl}: ${apiErr.message}`);
      failedUrls.push(targetUrl);
      failCount++;
    }

    // 400ms delay — aggressive but safe
    await new Promise(resolve => setTimeout(resolve, 400));
  }

  console.log('\n════════════════════════════════════════');
  console.log(`✅ Submitted: ${successCount} URLs`);
  console.log(`❌ Failed:    ${failCount} URLs`);
  if (failedUrls.length > 0) {
    console.log(`\nFailed URLs (first 5):`);
    failedUrls.slice(0, 5).forEach(u => console.log(`  - ${u}`));
  }
  console.log(`\n📅 Next rotation offset: ${(batchOffset + DAILY_QUOTA) % prioritizedQueue.length}`);
  console.log(`⏳ Days to cover all ${prioritizedQueue.length} URLs at ${DAILY_QUOTA}/day: ~${Math.ceil(prioritizedQueue.length / (DAILY_QUOTA - tier1Daily.length))} days`);
  console.log('════════════════════════════════════════');
});
