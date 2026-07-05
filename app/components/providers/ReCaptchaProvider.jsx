'use client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function ReCaptchaProvider({ children }) {
  // Use a placeholder key or environment variable. 
  // It's safe to expose the SITE key (not the SECRET key).
  const reCaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI is Google's test key

  return (
    <GoogleReCaptchaProvider 
      reCaptchaKey={reCaptchaKey}
      scriptProps={{
        strategy: 'lazyOnload',
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
