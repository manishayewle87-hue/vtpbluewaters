'use client';

import { usePathname } from 'next/navigation';

export default function BreadcrumbSchema() {
  const pathname = usePathname();
  const baseUrl = 'https://vtpbluewaters.com';

  if (!pathname || pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  
  const itemListElement = [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": `${baseUrl}/${segments[0] || 'en'}`
  }];

  let accumulatedPath = `/${segments[0]}`;
  
  for (let i = 1; i < segments.length; i++) {
    accumulatedPath += `/${segments[i]}`;
    // Format the segment for display (capitalize, replace hyphens)
    const formattedName = segments[i].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    itemListElement.push({
      "@type": "ListItem",
      "position": i + 1,
      "name": formattedName,
      "item": `${baseUrl}${accumulatedPath}`
    });
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  );
}
