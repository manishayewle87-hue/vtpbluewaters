import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required environment variables
    if (!process.env.EMAIL_PASS) {
      console.error("Critical environment variable missing (EMAIL_PASS).");
      return NextResponse.json({ success: false, error: "Server configuration error." }, { status: 500 });
    }

    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnW3Fvnn9b36Jd0S2c19';

    // Server-Side reCAPTCHA Validation
    if (!data.recaptchaToken) {
      return NextResponse.json({ success: false, error: "Missing reCAPTCHA token." }, { status: 400 });
    }

    if (data.recaptchaToken !== 'disabled') {
      const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${recaptchaSecret}&response=${data.recaptchaToken}`,
      });

      const verifyData = await verifyRes.json();
      if (!verifyData.success || verifyData.score < 0.5) {
        console.error("reCAPTCHA validation failed:", verifyData);
        return NextResponse.json({ success: false, error: "Bot activity detected." }, { status: 403 });
      }
    } else {
      console.warn("reCAPTCHA bypassed on client-side (blocked or failed to load). Processing lead directly.");
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'propsmartrealty@gmail.com',
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `VTP Blue Waters Leads <${process.env.EMAIL_USER || 'propsmartrealty@gmail.com'}>`,
      to: 'propsmartrealty@gmail.com',
      replyTo: data.email,
      subject: `🚨 New Lead: ${data.name || 'Visitor'} — ${data.project || 'VTP Blue Waters'}`,
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
          <tr>
            <th colspan="2" style="text-align: center; background-color: #1a365d; color: white; padding: 10px;">Marketing Analytics</th>
          </tr>
          <tr>
            <th style="text-align: left; background-color: #f8f9fa;">Submitted From</th>
            <td><a href="${data.pageUrl}">${data.pageUrl || 'Direct / Unknown'}</a></td>
          </tr>
          <tr>
            <th style="text-align: left; background-color: #f8f9fa;">UTM Source</th>
            <td>${data.utmSource || 'Direct'}</td>
          </tr>
          <tr>
            <th style="text-align: left; background-color: #f8f9fa;">UTM Medium</th>
            <td>${data.utmMedium || 'Direct'}</td>
          </tr>
          <tr>
            <th style="text-align: left; background-color: #f8f9fa;">UTM Campaign</th>
            <td>${data.utmCampaign || 'Direct'}</td>
          </tr>
        </table>
        <br/>
        <p style="color: #666; font-size: 12px;">This lead was generated from your VTP Blue Waters website and protected by reCAPTCHA v3.</p>
      `
    };

    // Send the email
    try {
      await transporter.sendMail(mailOptions);
      return NextResponse.json({ success: true, message: "Lead submitted successfully." });
    } catch (mailError) {
      console.warn("Nodemailer Primary Mailer Failed. Attempting Fallback to GAS Mailer...", mailError);
      
      const gasUrl = process.env.NEXT_PUBLIC_GAS_MAILER_URL;
      if (gasUrl) {
        try {
          const gasResponse = await fetch(gasUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: data.name,
              email: data.email,
              phone: data.phone,
              project: data.project,
              intent: data.intent,
              message: data.message,
              pageUrl: data.pageUrl,
              utmSource: data.utmSource,
              utmMedium: data.utmMedium,
              utmCampaign: data.utmCampaign
            }),
          });

          if (gasResponse.ok) {
            console.log("Lead successfully delivered via Fallback GAS Mailer.");
            return NextResponse.json({ success: true, message: "Lead submitted successfully via fallback." });
          }
        } catch (gasError) {
          console.error("Fallback GAS Mailer also failed:", gasError);
        }
      }
      
      // Re-throw original SMTP error if fallback also fails or is not configured
      throw mailError;
    }
  } catch (error) {
    console.error("Nodemailer API Route Error:", error);
    return NextResponse.json({ success: false, error: "Failed to send email." }, { status: 500 });
  }
}
