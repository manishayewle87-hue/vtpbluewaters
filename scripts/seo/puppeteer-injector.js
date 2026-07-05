/**
 * Off-Page SEO: Semi-Autonomous Puppeteer Injection Engine
 * 
 * DESCRIPTION:
 * Automates navigation and form filling for high-DA business directories.
 * Pauses execution to allow the user to solve CAPTCHAs or enter OTPs manually.
 * 
 * USAGE:
 * node scripts/seo/puppeteer-injector.js
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const readline = require('readline');

puppeteer.use(StealthPlugin());

// The "Golden NAP" Data
const SEO_DATA = {
  businessName: 'VTP Bluewaters Mahalunge',
  phone: '7744009295', // Ensure it's the exact number to receive OTPs
  website: 'https://vtpbluewaters.com',
  email: 'sales@vtprealty.in',
  address: 'Site Office: VTP Bluewaters Township, Mahalunge, Pune, Maharashtra 411045',
  description: 'VTP Bluewaters is a 200-acre premium mega-township in Mahalunge, Pune. Situated between Hinjawadi and Baner, it offers 2, 3 & 4 BHK luxury residences built on the Maximum Livable Area (MLA) philosophy, featuring over 50% open green spaces and world-class sports academies.'
};

// Helper function to pause terminal until user hits Enter
function waitForHumanInteraction(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => rl.question(`\n⚠️  [HUMAN REQUIRED] ${message} \n(Press ENTER to continue when done...)`, ans => {
    rl.close();
    resolve();
  }));
}

async function injectPuneBusinessDirectory(page) {
  console.log('📡 Navigating to Pune Business Directory...');
  await page.goto('https://punebusinessdirectory.com/add-listing', { waitUntil: 'networkidle2' });
  
  console.log('✍️  Filling out generic forms...');
  
  // Note: Selectors may change over time. Using generic fuzzy logic or broad selectors.
  try {
    // Try to find common input fields
    await page.evaluate((data) => {
      const setInputValue = (selector, value) => {
        const el = document.querySelector(selector);
        if (el) {
          el.value = value;
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
      };

      // Broad heuristic matching for directory listing forms
      document.querySelectorAll('input, textarea').forEach(el => {
        const name = (el.name || '').toLowerCase();
        const placeholder = (el.placeholder || '').toLowerCase();
        const id = (el.id || '').toLowerCase();
        const str = name + placeholder + id;

        if (str.includes('company') || str.includes('business') || str.includes('title')) setInputValue(el.tagName.toLowerCase() + `[name="${el.name}"]`, data.businessName);
        else if (str.includes('phone') || str.includes('mobile')) setInputValue(el.tagName.toLowerCase() + `[name="${el.name}"]`, data.phone);
        else if (str.includes('email')) setInputValue(el.tagName.toLowerCase() + `[name="${el.name}"]`, data.email);
        else if (str.includes('website') || str.includes('url')) setInputValue(el.tagName.toLowerCase() + `[name="${el.name}"]`, data.website);
        else if (str.includes('address') || str.includes('location')) setInputValue(el.tagName.toLowerCase() + `[name="${el.name}"]`, data.address);
        else if (str.includes('desc') || str.includes('about')) setInputValue(el.tagName.toLowerCase() + `[name="${el.name}"]`, data.description);
      });
    }, SEO_DATA);
  } catch (err) {
    console.log("   Could not auto-fill all elements, please review the page.");
  }

  await waitForHumanInteraction("Review the filled data, solve the CAPTCHA, and click Submit/Next. Press ENTER here ONLY when the submission is completely finished.");
}

async function run() {
  console.log("🚀 Initializing Semi-Autonomous Puppeteer Injector...");
  
  // Launch in non-headless mode so the user can interact!
  const browser = await puppeteer.launch({ 
    headless: false, 
    defaultViewport: null,
    args: ['--start-maximized'] 
  });
  
  const page = await browser.newPage();

  try {
    // Target 1: Pune Business Directory
    await injectPuneBusinessDirectory(page);
    
    // Add more targets here using the same pattern!
    // await injectSmartSuburbs(page);
    // await injectMagicBricks(page);

    console.log('\n🎉 All target injections completed successfully!');
  } catch (err) {
    console.error('❌ Injection sequence failed:', err);
  } finally {
    console.log("Closing browser in 5 seconds...");
    setTimeout(() => browser.close(), 5000);
  }
}

run();
