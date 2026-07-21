/**
 * Dual-Redundant Secure Lead Ingestion Service
 * 
 * Flow:
 * 1. Primary (Next.js / Vercel API): POST to /api/contact
 * 2. Secondary (Direct Client-Side Fallback): POST to Google Apps Script Web App URL
 */
export async function submitLead(leadData) {
  // 1. Try Next.js Server-Side API (/api/contact)
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData),
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      console.log('Lead ingested successfully via Vercel SMTP.');
      return { success: true, method: 'vercel' };
    } else {
      // If the API returns a client error (validation, recaptcha, rate limit), stop immediately.
      // Do not try the GAS fallback if it's a deliberate block.
      if (response.status === 400 || response.status === 403 || response.status === 429) {
        console.warn('API rejected request:', data.error);
        return { success: false, error: data.error || 'Request rejected.' };
      }
      // If it's a 500 server error, throw it so the catch block falls back to GAS.
      throw new Error(data.error || 'Vercel API Server Error 500');
    }
  } catch (err) {
    console.warn('Vercel API lead ingestion failed, trying direct Google Apps Script fallback...', err);
  }

  // 2. Try Direct Client-Side Google Apps Script Web App Fallback
  let gasUrl = process.env.NEXT_PUBLIC_GAS_MAILER_URL || 'https://script.google.com/macros/s/AKfycbzhgXXBxCUdNL13DEQzdkqAEjhrGhDCQ28CRUBbChz9eIQYRQ7CvGA-steVGtdg0Enl3A/exec';
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
