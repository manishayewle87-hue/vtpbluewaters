'use client';

import { usePathname } from 'next/navigation';

export default function CanonicalHreflang() {
  const pathname = usePathname();
  const baseUrl = 'https://vtpbluewaters.com';

  if (!pathname) return null;

  // The pathname already contains the language prefix (e.g., /en/projects/...)
  // We want to construct the absolute canonical URL for the current path
  const canonicalUrl = `${baseUrl}${pathname}`;

  // We want to construct hreflang tags for en, mr, hi
  // Example pathname: /en/projects/earth-1-by-vtp-luxe
  // We need to strip the current lang and generate for all langs
  const segments = pathname.split('/').filter(Boolean);
  const currentLang = segments[0];
  const pathWithoutLang = segments.slice(1).join('/');

  const langs = ['en', 'hi', 'mr'];

  return (
    <>
      {/* Absolute Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang Tags for Internationalization SEO */}
      {langs.map((lang) => (
        <link 
          key={lang} 
          rel="alternate" 
          hrefLang={lang === 'en' ? 'en-IN' : lang === 'hi' ? 'hi-IN' : 'mr-IN'} 
          href={`${baseUrl}/${lang}/${pathWithoutLang}`} 
        />
      ))}
      
      {/* x-default fallback */}
      <link 
        rel="alternate" 
        hrefLang="x-default" 
        href={`${baseUrl}/en/${pathWithoutLang}`} 
      />
    </>
  );
}
