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

    // Native Cloudflare Email Sending
    if (env.EMAIL_SENDER) {
      try {
        // Create an EmailMessage for the new Email Sending binding
        // Using the sendEmail API format (requires importing standard API, or if we use the object format from the docs)
        // From the docs: env.EMAIL_SENDER.send({ from: '...', to: '...', subject: '...', text: '...' })
        // Let's use the object format which works directly for the Email Routing sendEmail binding
        await env.EMAIL_SENDER.send({
          from: { email: 'leads@vtpbluewaters.com', name: 'VTP Bluewaters' },
          to: [{ email: 'propsmartrealty@gmail.com', name: 'Sales Team' }],
          subject: `New Lead: ${lead.name} - ${lead.source}`,
          text: `
New Enquiry Received!

Name: ${lead.name}
Email: ${lead.email || 'N/A'}
Phone: ${lead.phone}
Project/Source: ${lead.source}
Configuration: ${lead.configuration || 'N/A'}

Message:
${lead.message || 'N/A'}
          `
        });
      } catch (emailError) {
        console.error('Failed to send native email notification:', emailError);
        // We continue anyway, so the lead is still saved to DB
      }
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
