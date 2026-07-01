import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, phone, project, configuration, message, source } = data;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone number are required.' },
        { status: 400 }
      );
    }

    console.log('🏠 NEW LUXURY LEAD CAPTURED');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const newLead = await prisma.lead.create({
      data: {
        name,
        email: email || null,
        phone,
        project: project || 'General',
        source: source || 'Primary Website Form',
      }
    });
    
    console.log(`Lead saved to SQLite Database! ID: ${newLead.id}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return NextResponse.json({
      success: true,
      message: 'Your enquiry has been received. A luxury consultant will contact you shortly.',
    });
  } catch (error) {
    console.error('CRM Push Failed:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
