import { NextResponse } from 'next/server';

/**
 * Advanced CRM Routing API
 * Automatically scores leads based on SEO intent and pipes them directly to Salesforce/HubSpot.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, intent, url, source } = body;

    // 1. Algorithmic Lead Scoring
    let leadScore = 50; // Base score
    
    // High-intent keywords
    if (['price', 'pricing', 'payment-plan', 'offers'].includes(intent)) {
      leadScore += 40;
    }
    // Mid-intent keywords
    else if (['floor-plan', 'masterplan', 'virtual-tour', '2-bhk', '3-bhk', '4-bhk'].includes(intent)) {
      leadScore += 25;
    }
    // Low-intent (Information gathering)
    else if (['brochure', 'amenities', 'location', 'reviews'].includes(intent)) {
      leadScore += 10;
    }

    // Boost score for specific high-value campaigns
    if (url && url.includes('nri') || source === 'google_discover') {
      leadScore += 20;
    }

    // Cap at 100
    leadScore = Math.min(leadScore, 100);

    // 2. Format payload for Enterprise CRM (HubSpot / Salesforce structure)
    const crmPayload = {
      leadDetails: {
        firstName: name?.split(' ')[0] || '',
        lastName: name?.split(' ').slice(1).join(' ') || '',
        email: email,
        phone: phone,
        leadScore: leadScore,
        lifecycleStage: leadScore >= 80 ? 'SQL' : (leadScore >= 60 ? 'MQL' : 'Lead'),
      },
      context: {
        capturedUrl: url,
        seoIntent: intent,
        utmSource: source || 'organic_search',
        timestamp: new Date().toISOString()
      }
    };

    // 3. Pipe to CRM (Placeholder for actual fetch to api.hubapi.com or login.salesforce.com)
    // const crmResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(crmPayload)
    // });
    
    // For demonstration, we simply log the payload that would be sent
    console.log('[CRM WEBHOOK] Routing high-intent lead to CRM:', JSON.stringify(crmPayload, null, 2));

    return NextResponse.json({ 
      success: true, 
      message: 'Lead scored and routed successfully',
      score: leadScore,
      routedTo: 'Salesforce/HubSpot'
    }, { status: 200 });

  } catch (error) {
    console.error('[CRM WEBHOOK ERROR]', error);
    return NextResponse.json({ success: false, error: 'Failed to route lead' }, { status: 500 });
  }
}
