'use client';

import { usePathname } from 'next/navigation';

export default function CanonicalHreflang() {
  const pathname = usePathname();
  const baseUrl = 'https://vtpbluewaters.com';

  if (!pathname) return null;

  const canonicalUrl = `${baseUrl}${pathname}`;

  return (
    <>
      {/* Absolute Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
    </>
  );
}
