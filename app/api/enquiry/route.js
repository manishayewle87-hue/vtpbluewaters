import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';

export const runtime = 'edge';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // In Edge runtime on Cloudflare, the D1 binding is available globally or on request context
    // However, for Next-on-Pages with App Router, we use process.env.DB
    const adapter = new PrismaD1(process.env.DB);
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

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('Lead generation error:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit enquiry' }, { status: 500 });
  }
}
