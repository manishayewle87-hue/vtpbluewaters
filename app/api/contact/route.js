import { NextResponse } from 'next/server';


export async function POST(request) {
  try {
    const data = await request.json();
    
    // Server-to-server fetch completely bypasses Browser CORS and Redirect policies
    const res = await fetch('https://script.google.com/macros/s/AKfycbwp_ZU6sB-N8cqRgcb2rdb5y7oYFlkEHs8raExrNvGBgPC4t_aEwRlnlS4scX-r4iPrqA/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data),
      redirect: 'follow'
    });

    if (res.ok) {
      return NextResponse.json({ success: true, message: "Lead submitted successfully." });
    } else {
      console.error("Google Apps Script failed with status:", res.status);
      return NextResponse.json({ success: false, error: "Failed to submit lead to internal mailer." }, { status: 500 });
    }
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error." }, { status: 500 });
  }
}
