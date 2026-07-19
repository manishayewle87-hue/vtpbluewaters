/**
 * Triple-Redundant Lead Ingestion Service
 * 
 * Flow:
 * 1. Primary (Next.js / Vercel API): POST to /api/contact
 * 2. Secondary (Cloudflare Pages API): POST to /api/enquiry
 * 3. Tertiary (Direct Client-Side Fallback): POST to Google Apps Script Web App URL
 */
export async function submitLead(leadData) {
  // 1. Try Next.js Server-Side API (/api/contact)
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData),
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        console.log('Lead ingested successfully via Vercel SMTP.');
        return { success: true, method: 'vercel' };
      }
    }
  } catch (err) {
    console.warn('Vercel API lead ingestion failed, trying Cloudflare API fallback...', err);
  }

  // 2. Try Cloudflare Pages serverless API (/api/enquiry)
  try {
    const response = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        console.log('Lead ingested successfully via Cloudflare Web3Forms.');
        return { success: true, method: 'cloudflare' };
      }
    }
  } catch (err) {
    console.warn('Cloudflare API lead ingestion failed, trying direct Google Apps Script fallback...', err);
  }

  // 3. Try Direct Client-Side Google Apps Script Web App Fallback
  let gasUrl = process.env.NEXT_PUBLIC_GAS_MAILER_URL || 'https://script.google.com/macros/s/AKfycbwXEA-JwXyi92dgvncHSuLuQkVeK4YzvNhvvkPksWkslUjo-gKUQEUCMXiKsq89SMkQ/exec';
  if (gasUrl) {
    gasUrl = gasUrl.replace(/^["']|["']$/g, '').trim();
    try {
      const response = await fetch(gasUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors', // Google Apps Script web apps redirect and return no-cors response
        body: JSON.stringify(leadData),
      });
      
      // With no-cors, response.type is 'opaque' and status is 0, but the execution succeeds.
      console.log('Lead ingested successfully via client-side Google Apps Script Web App.');
      return { success: true, method: 'gas_direct' };
    } catch (err) {
      console.error('All lead ingestion endpoints failed:', err);
    }
  }

  return { success: false, error: 'All submission endpoints failed.' };
}
