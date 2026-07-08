import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required environment variables
    if (!process.env.EMAIL_PASS) {
      console.error("EMAIL_PASS environment variable is missing.");
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'propsmartrealty@gmail.com',
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `VTP Bluewaters Leads <${process.env.EMAIL_USER || 'propsmartrealty@gmail.com'}>`,
      to: 'propsmartrealty@gmail.com',
      replyTo: data.email,
      subject: `🚨 New Lead: ${data.name || 'Visitor'} — ${data.project || 'VTP Bluewaters'}`,
      html: `
        <h2>New Lead Details</h2>
        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 600px; font-family: sans-serif;">
          <tr>
            <th style="text-align: left; background-color: #f8f9fa;">Name</th>
            <td>${data.name || 'N/A'}</td>
          </tr>
          <tr>
            <th style="text-align: left; background-color: #f8f9fa;">Email</th>
            <td>${data.email || 'N/A'}</td>
          </tr>
          <tr>
            <th style="text-align: left; background-color: #f8f9fa;">Phone</th>
            <td>${data.phone || 'N/A'}</td>
          </tr>
          ${data.project ? `
          <tr>
            <th style="text-align: left; background-color: #f8f9fa;">Project</th>
            <td>${data.project}</td>
          </tr>` : ''}
          ${data.intent ? `
          <tr>
            <th style="text-align: left; background-color: #f8f9fa;">Intent</th>
            <td>${data.intent}</td>
          </tr>` : ''}
          ${data.source ? `
          <tr>
            <th style="text-align: left; background-color: #f8f9fa;">Source</th>
            <td>${data.source}</td>
          </tr>` : ''}
          ${data.message ? `
          <tr>
            <th style="text-align: left; background-color: #f8f9fa;">Message</th>
            <td>${data.message}</td>
          </tr>` : ''}
        </table>
        <br/>
        <p style="color: #666; font-size: 12px;">This lead was generated from your VTP Bluewaters website.</p>
      `
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Lead submitted successfully." });
  } catch (error) {
    console.error("Nodemailer API Route Error:", error);
    return NextResponse.json({ success: false, error: "Failed to send email." }, { status: 500 });
  }
}
