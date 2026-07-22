/**
 * Google Apps Script Redundant Mailer & Lead Database
 * 
 * INSTRUCTIONS:
 * 1. Open Google Sheets (https://sheets.google.com).
 * 2. Click "Extensions" > "Apps Script".
 * 3. Replace any existing code with this script.
 * 4. Replace 'propsmartrealty@gmail.com' with your target notification email if needed.
 * 5. Click "Deploy" (top right) > "New deployment".
 * 6. Select "Web app" as the type.
 * 7. Set:
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (crucial for client-side API requests)
 * 8. Click "Deploy", authorize permissions, and copy the "Web app URL".
 * 9. Paste the URL into your project's .env file as `NEXT_PUBLIC_GAS_MAILER_URL`.
 */

const NOTIFICATION_EMAIL = 'propsmartrealty@gmail.com';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    
    const name = payload.name || 'N/A';
    const email = payload.email || 'N/A';
    const phone = payload.phone || 'N/A';
    const project = payload.project || 'VTP Blue Waters';
    const configuration = payload.configuration || payload.intent || 'N/A';
    const location = payload.location || 'N/A';
    const message = payload.message || 'N/A';
    const pageUrl = payload.pageUrl || 'N/A';
    const utmSource = payload.utmSource || 'Direct';
    const utmMedium = payload.utmMedium || 'Direct';
    const utmCampaign = payload.utmCampaign || 'Direct';
    const timestamp = new Date().toISOString();

    try {
      const sheet = getOrCreateLeadsSheet();
      if (sheet) {
        sheet.appendRow([
          timestamp, name, phone, email, project, configuration, location,
          message, pageUrl, utmSource, utmMedium, utmCampaign
        ]);
      }
    } catch (sheetError) {
      console.warn("Could not save to sheet. Skipping sheet save.", sheetError);
    }

    sendEmailAlert({
      timestamp, name, phone, email, project, configuration, location,
      message, pageUrl, utmSource, utmMedium, utmCampaign
    });

    return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'Lead saved and email sent.' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('GAS Mailer Error:', error);
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doOptions(e) {
  return ContentService.createTextOutput('').setMimeType(ContentService.MimeType.TEXT);
}

function getOrCreateLeadsSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) return null;
  
  let sheet = ss.getSheetByName('Leads');
  
  if (!sheet) {
    sheet = ss.insertSheet('Leads');
    const headerRange = sheet.getRange(1, 1, 1, 12);
    sheet.appendRow([
      'Timestamp', 'Name', 'Phone', 'Email', 'Project', 'Configuration/Intent',
      'Preferred Location', 'Message/Requirements', 'Submitted From Page',
      'UTM Source', 'UTM Medium', 'UTM Campaign'
    ]);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#1a365d');
    headerRange.setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Format and send the lead notification email
function sendEmailAlert(data) {
  const subject = `🚨 Direct Lead: ${data.name} — ${data.project}`;
  
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
      <h2 style="color: #1a365d; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 0;">New Lead Captured</h2>
      <p style="color: #666; font-size: 14px;">A new lead has been submitted and saved in your Google Sheet database.</p>
      
      <table cellpadding="10" cellspacing="0" style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr style="background-color: #f8f9fa;">
          <th style="text-align: left; border-bottom: 1px solid #eee; width: 40%;">Name</th>
          <td style="border-bottom: 1px solid #eee;"><strong>${data.name}</strong></td>
        </tr>
        <tr>
          <th style="text-align: left; border-bottom: 1px solid #eee;">Phone</th>
          <td style="border-bottom: 1px solid #eee;"><a href="tel:${data.phone}" style="color: #1a365d; text-decoration: none;">${data.phone}</a></td>
        </tr>
        <tr style="background-color: #f8f9fa;">
          <th style="text-align: left; border-bottom: 1px solid #eee;">Email</th>
          <td style="border-bottom: 1px solid #eee;"><a href="mailto:${data.email}" style="color: #1a365d; text-decoration: none;">${data.email}</a></td>
        </tr>
        <tr>
          <th style="text-align: left; border-bottom: 1px solid #eee;">Project</th>
          <td style="border-bottom: 1px solid #eee;">${data.project}</td>
        </tr>
        <tr style="background-color: #f8f9fa;">
          <th style="text-align: left; border-bottom: 1px solid #eee;">Configuration</th>
          <td style="border-bottom: 1px solid #eee;">${data.configuration}</td>
        </tr>
        <tr>
          <th style="text-align: left; border-bottom: 1px solid #eee;">Location Preference</th>
          <td style="border-bottom: 1px solid #eee;">${data.location}</td>
        </tr>
        <tr style="background-color: #f8f9fa;">
          <th style="text-align: left; border-bottom: 1px solid #eee;">Requirements</th>
          <td style="border-bottom: 1px solid #eee;">${data.message}</td>
        </tr>
        <tr>
          <th style="text-align: left; border-bottom: 1px solid #eee;">Submitted From</th>
          <td style="border-bottom: 1px solid #eee;"><a href="${data.pageUrl}" style="color: #1a365d;">View Page</a></td>
        </tr>
        <tr style="background-color: #f8f9fa;">
          <th style="text-align: left; border-bottom: 1px solid #eee;">UTM parameters</th>
          <td style="border-bottom: 1px solid #eee; font-size: 12px; color: #555;">
            Source: ${data.utmSource}<br/>
            Medium: ${data.utmMedium}<br/>
            Campaign: ${data.utmCampaign}
          </td>
        </tr>
      </table>
      
      <p style="font-size: 11px; color: #888; text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
        Lead Backup Mailer System powered by Google Apps Script.
      </p>
    </div>
  `;

  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: subject,
    htmlBody: htmlBody,
    replyTo: data.email
  });
}
