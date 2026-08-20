import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'edge';

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

    // 3. Strict reCAPTCHA Verification (No Bypass)
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnW3Fvnn9b36Jd0S2c19';
    
    // Block the old 'disabled' bypass exploit
    if (data.recaptchaToken === 'disabled') {
      console.error("Blocked reCAPTCHA bypass attempt.");
      return NextResponse.json({ success: false, error: "reCAPTCHA verification required." }, { status: 403 });
    }

    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${recaptchaSecret}&response=${data.recaptchaToken}`,
    });

    const verifyData = await verifyRes.json();
    if (!verifyData.success || verifyData.score < 0.5) {
      console.error(`reCAPTCHA validation failed for IP ${ip}:`, verifyData);
      return NextResponse.json({ success: false, error: "Bot activity detected. reCAPTCHA failed." }, { status: 403 });
    }

    // 4. Send Email via HTTP-based GAS Mailer (Edge Compatible)
    let gasUrl = process.env.NEXT_PUBLIC_GAS_MAILER_URL || 'https://script.google.com/macros/s/AKfycbxBufZCiFAWy8XEE34FayMSk6fjSW8DfbRJKEBUJXYPvcQ8F9QJ7Kg46dSzKBdrEhhWaw/exec';
    
    gasUrl = gasUrl.replace(/^["']|["']$/g, '').trim();

    // Prepare payload with strict sanitization and guaranteed recipient propsmartrealty@gmail.com
    const payload = {
      ...data,
      to: 'propsmartrealty@gmail.com',
      recipient: 'propsmartrealty@gmail.com',
      targetEmail: 'propsmartrealty@gmail.com',
      recipientEmail: 'propsmartrealty@gmail.com',
      subject: `🚨 New Lead: ${escapeHtml(data.name)} — ${escapeHtml(data.project || 'VTP Blue Waters')}`,
    };

    try {
      const gasResponse = await fetch(gasUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), // Sending Zod-validated data
      });

      if (gasResponse.ok) {
        console.log("Lead successfully delivered to propsmartrealty@gmail.com via HTTP Mailer.");
        return NextResponse.json({ success: true, message: "Lead submitted successfully." });
      } else {
        throw new Error("HTTP Mailer rejected the payload.");
      }
    } catch (gasError) {
      console.error("HTTP Mailer failed:", gasError);
      return NextResponse.json({ success: false, error: "Email delivery failed." }, { status: 500 });
    }
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error." }, { status: 500 });
  }
}
