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
