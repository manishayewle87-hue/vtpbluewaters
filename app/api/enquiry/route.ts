import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP_HOST,
      port: Number(process.env.EMAIL_SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_SMTP_USER,
        pass: process.env.EMAIL_SMTP_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_SMTP_USER,
      to: 'propsmartrealty@gmail.com',
      subject: `New enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error) {
    console.error('Enquiry error:', error);
    return NextResponse.json({ error: 'Failed to send enquiry' }, { status: 500 });
  }
}
