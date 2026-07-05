export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();
    
    // Optional: Verify reCAPTCHA token if SECRET is provided in env
    if (env.RECAPTCHA_SECRET_KEY && data.recaptchaToken) {
      const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${env.RECAPTCHA_SECRET_KEY}&response=${data.recaptchaToken}`,
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success || verifyData.score < 0.5) {
        console.error('reCAPTCHA verification failed:', verifyData);
        return new Response(JSON.stringify({ success: false, error: 'Spam detected' }), { status: 400 });
      }
    }

    let lead = null;

    // Cloudflare MailChannels Integration (Works out of the box for Pages)
    try {
      const emailContent = `
New Enquiry Received!

Name: ${data.name}
Email: ${data.email || 'N/A'}
Phone: ${data.phone}
Project/Source: ${data.project || 'Website Enquiry'}
Location: ${data.location || 'N/A'}
Configuration: ${data.configuration || 'N/A'}

Message:
${data.message || 'N/A'}
      `;

      const mailchannelsResponse = await fetch('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: 'propsmartrealty@gmail.com', name: 'Sales Team' }],
            },
          ],
          from: {
            email: 'leads@vtpbluewaters.com',
            name: 'VTP Bluewaters Website',
          },
          subject: `New Lead: ${data.name} - ${data.project || 'Website Enquiry'}`,
          content: [
            {
              type: 'text/plain',
              value: emailContent,
            },
          ],
        }),
      });

      if (!mailchannelsResponse.ok) {
        const errorText = await mailchannelsResponse.text();
        console.error('MailChannels Error:', errorText);
      }
    } catch (emailError) {
      console.error('Failed to send MailChannels email notification:', emailError);
    }

    // Google Apps Script Email Sending
    try {
      await fetch('https://script.google.com/macros/s/AKfycbwXEA-JwXyi92dgvncHSuLuQkVeK4YzvNhvvkPksWkslUjo-gKUQEUCMXiKsq89SMkQ/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          source: (data.project || data.source || 'Website Enquiry') + (data.location ? ` - ${data.location}` : '')
        })
      });
    } catch (emailError) {
      console.error('Failed to send Google Apps Script email notification:', emailError);
    }

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
