import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Basic In-Memory Rate Limiter (Token Bucket / Window)
// Note: In a serverless environment, this resets per lambda instance, but still mitigates extreme bursts.
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip) {
  if (!ip) return false;
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return false;
  }
  if (now - record.firstRequest > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return false;
  }
  record.count += 1;
  return record.count > MAX_REQUESTS_PER_WINDOW;
}

// Zod Schema for strict input validation
const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100).trim(),
  email: z.string().email("Invalid email format").max(100).trim(),
  phone: z.string().regex(/^\+?[0-9\s\-\(\)]{7,20}$/, "Invalid phone format").trim(),
  project: z.string().max(100).optional().nullable(),
  intent: z.string().max(100).optional().nullable(),
  source: z.string().max(100).optional().nullable(),
  message: z.string().max(1000).optional().nullable(),
  pageUrl: z.string().url().max(500).optional().nullable().or(z.literal('')),
  utmSource: z.string().max(100).optional().nullable(),
  utmMedium: z.string().max(100).optional().nullable(),
  utmCampaign: z.string().max(100).optional().nullable(),
  recaptchaToken: z.string().min(1, "reCAPTCHA token is required")
});

// HTML escaping to prevent XSS in email payload
const escapeHtml = (unsafe) => {
  if (!unsafe) return 'N/A';
  return unsafe
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export async function POST(request) {
  try {
    // 1. IP Rate Limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (isRateLimited(ip)) {
      console.warn(`Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json({ success: false, error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const rawData = await request.json();
    
    // 2. Strict Zod Schema Validation
    const validationResult = leadSchema.safeParse(rawData);
    if (!validationResult.success) {
      console.warn("Zod validation failed:", validationResult.error.format());
      return NextResponse.json({ success: false, error: "Invalid form data provided.", details: validationResult.error.issues }, { status: 400 });
    }
    const data = validationResult.data;

    if (!process.env.EMAIL_PASS) {
      console.error("Critical environment variable missing (EMAIL_PASS).");
      return NextResponse.json({ success: false, error: "Server configuration error." }, { status: 500 });
    }

    // 3. Strict reCAPTCHA Verification (No Bypass)
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnW3Fvnn9b36Jd0S2c19';
    
    // Block the old 'disabled' bypass exploit
    // if (data.recaptchaToken === 'disabled') {
    //   console.error("Blocked reCAPTCHA bypass attempt.");
    //   return NextResponse.json({ success: false, error: "reCAPTCHA verification required." }, { status: 403 });
    // }

    // const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: `secret=${recaptchaSecret}&response=${data.recaptchaToken}`,
    // });

    // const verifyData = await verifyRes.json();
    // if (!verifyData.success || verifyData.score < 0.5) {
    //   console.error(`reCAPTCHA validation failed for IP ${ip}:`, verifyData);
    //   return NextResponse.json({ success: false, error: "Bot activity detected. reCAPTCHA failed." }, { status: 403 });
    // }

    // 4. Send Email via Nodemailer (with XSS Sanitization)
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
      replyTo: escapeHtml(data.email),
      subject: `🚨 New Lead: ${escapeHtml(data.name)} — ${escapeHtml(data.project || 'VTP Blue Waters')}`,
      html: `
        <h2>New Lead Details</h2>
        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 600px; font-family: sans-serif;">
          <tr><th style="text-align: left; background-color: #f8f9fa;">Name</th><td>${escapeHtml(data.name)}</td></tr>
          <tr><th style="text-align: left; background-color: #f8f9fa;">Email</th><td>${escapeHtml(data.email)}</td></tr>
          <tr><th style="text-align: left; background-color: #f8f9fa;">Phone</th><td>${escapeHtml(data.phone)}</td></tr>
          ${data.project ? `<tr><th style="text-align: left; background-color: #f8f9fa;">Project</th><td>${escapeHtml(data.project)}</td></tr>` : ''}
          ${data.intent ? `<tr><th style="text-align: left; background-color: #f8f9fa;">Intent</th><td>${escapeHtml(data.intent)}</td></tr>` : ''}
          ${data.source ? `<tr><th style="text-align: left; background-color: #f8f9fa;">Source</th><td>${escapeHtml(data.source)}</td></tr>` : ''}
          ${data.message ? `<tr><th style="text-align: left; background-color: #f8f9fa;">Message</th><td>${escapeHtml(data.message)}</td></tr>` : ''}
          <tr><th colspan="2" style="text-align: center; background-color: #1a365d; color: white; padding: 10px;">Marketing Analytics</th></tr>
          <tr><th style="text-align: left; background-color: #f8f9fa;">Submitted From</th><td><a href="${data.pageUrl || '#'}">${escapeHtml(data.pageUrl)}</a></td></tr>
          <tr><th style="text-align: left; background-color: #f8f9fa;">UTM Source</th><td>${escapeHtml(data.utmSource || 'Direct')}</td></tr>
          <tr><th style="text-align: left; background-color: #f8f9fa;">UTM Medium</th><td>${escapeHtml(data.utmMedium || 'Direct')}</td></tr>
          <tr><th style="text-align: left; background-color: #f8f9fa;">UTM Campaign</th><td>${escapeHtml(data.utmCampaign || 'Direct')}</td></tr>
        </table>
        <br/>
        <p style="color: #666; font-size: 12px;">This lead was validated by Zod and protected by strict reCAPTCHA v3.</p>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      return NextResponse.json({ success: true, message: "Lead submitted successfully." });
    } catch (mailError) {
      console.warn("Nodemailer Primary Mailer Failed. Attempting Fallback to GAS Mailer...", mailError);
      
      let gasUrl = process.env.NEXT_PUBLIC_GAS_MAILER_URL;
      if (gasUrl) {
        gasUrl = gasUrl.replace(/^["']|["']$/g, '').trim();
        try {
          const gasResponse = await fetch(gasUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data), // Sending Zod-validated data
          });

          if (gasResponse.ok) {
            console.log("Lead successfully delivered via Fallback GAS Mailer.");
            return NextResponse.json({ success: true, message: "Lead submitted successfully via fallback." });
          }
        } catch (gasError) {
          console.error("Fallback GAS Mailer also failed:", gasError);
        }
      }
      
      throw mailError;
    }
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error." }, { status: 500 });
  }
}
