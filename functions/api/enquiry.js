import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();
    
    // Connect to the Cloudflare D1 Database using the environment binding (env.DB)
    const adapter = new PrismaD1(env.DB);
    const prisma = new PrismaClient({ adapter });

    const lead = await prisma.lead.create({
      data: {
        name: data.name || 'Unknown',
        email: data.email || null,
        phone: data.phone || 'Unknown',
        configuration: data.configuration || null,
        message: data.message || null,
        source: data.source || data.project || 'Website Enquiry',
      }
    });

    // Google Apps Script Email Sending
    try {
      await fetch('https://script.google.com/macros/s/AKfycbwXEA-JwXyi92dgvncHSuLuQkVeK4YzvNhvvkPksWkslUjo-gKUQEUCMXiKsq89SMkQ/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
    } catch (emailError) {
      console.error('Failed to send Google Apps Script email notification:', emailError);
      // We continue anyway, so the lead is still saved to DB
    }

    return new Response(JSON.stringify({ success: true, lead }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Lead generation error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to submit enquiry' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
