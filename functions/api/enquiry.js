export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();
    
    // Optional: Verify reCAPTCHA token if SECRET is provided in env
    if (env.RECAPTCHA_SECRET_KEY && data.recaptchaToken && data.recaptchaToken !== 'disabled') {
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

    // Web3Forms Integration - Flawless, Serverless Email Delivery
    try {
      const web3formsRes = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: "01d09588-d933-46ef-b70a-120c6aa71e5a",
          subject: `🚨 New Lead: ${data.name || 'Unknown'} — ${data.project || 'Website Enquiry'}`,
          from_name: "VTP Bluewaters Leads",
          name: data.name,
          email: data.email || 'N/A',
          phone: data.phone,
          project: data.project || 'Website Enquiry',
          configuration: data.configuration || 'N/A',
          location: data.location || 'N/A',
          message: data.message || 'N/A'
        })
      });
      
      const web3formsData = await web3formsRes.json();
      if (!web3formsData.success) {
        console.error('Web3Forms Error:', web3formsData);
      }
    } catch (emailError) {
      console.error('Failed to send Web3Forms email notification:', emailError);
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
