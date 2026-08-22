import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'propsmartrealty@gmail.com',
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `System Audit <${process.env.EMAIL_USER || 'propsmartrealty@gmail.com'}>`,
      to: 'propsmartrealty@gmail.com',
      subject: '✅ Vercel Backend Test Successful',
      text: 'This email was triggered directly from the Vercel backend API, bypassing the frontend completely. If you receive this, the Vercel server has perfect credentials and is not IP-blocked by Gmail.'
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: "Email sent directly from Vercel backend." });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
