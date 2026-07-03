import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();
    
    // Optional: Verify reCAPTCHA token if SECRET is provided in env
    if (env.RECAPTCHA_SECRET_KEY && data.recaptchaToken) {
      const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${env.RECAPTCHA_SECRET_KEY}&response=${data.recaptchaToken}`,
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success || verifyData.score < 0.5) {
        console.error('reCAPTCHA verification failed:', verifyData);
        return new Response(JSON.stringify({ success: false, error: 'Spam detected' }), { status: 400 });
      }
    }

    let lead = null;
    try {
      if (env.DB) {
        const adapter = new PrismaD1(env.DB);
        const prisma = new PrismaClient({ adapter });
        lead = await prisma.lead.create({
          data: {
            name: data.name || 'Unknown',
            email: data.email || null,
            phone: data.phone || 'Unknown',
            configuration: data.configuration || null,
            message: data.message || null,
            source: (data.project || data.source || 'Website Enquiry') + (data.location ? ` - ${data.location}` : ''),
          }
        });
      }
    } catch (dbError) {
      console.error('Database save failed:', dbError);
    }

    // Google Apps Script Email Sending
    try {
      await fetch('https://script.google.com/macros/s/AKfycbwXEA-JwXyi92dgvncHSuLuQkVeK4YzvNhvvkPksWkslUjo-gKUQEUCMXiKsq89SMkQ/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          source: (data.project || data.source || 'Website Enquiry') + (data.location ? ` - ${data.location}` : '')
        })
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
