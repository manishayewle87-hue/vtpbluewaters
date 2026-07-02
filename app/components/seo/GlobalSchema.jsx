import React from 'react';

export default function GlobalSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://vtpbluewaters.com/#organization",
        "name": "VTP Realty",
        "url": "https://vtprealty.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://vtpbluewaters.com/logo.png"
        },
        "sameAs": [
          "https://www.facebook.com/vtprealty",
          "https://www.instagram.com/vtp_realty/",
          "https://www.youtube.com/channel/UCmPnhF8p2QvA6U3D0K6x77w"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://vtpbluewaters.com/#website",
        "url": "https://vtpbluewaters.com/",
        "name": "VTP BLUEWATERS",
        "publisher": {
          "@id": "https://vtpbluewaters.com/#organization"
        },
        "inLanguage": "en-IN"
      },
      {
        "@type": "RealEstateAgent",
        "@id": "https://vtpbluewaters.com/#agent",
        "name": "VTP Realty",
        "image": "https://vtpbluewaters.com/logo.png",
        "telephone": "+91 20 6777 0000",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "9th Floor, Cerebrum IT Park, Kalyani Nagar",
          "addressLocality": "Pune",
          "postalCode": "411006",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 18.5516,
          "longitude": 73.9135
        },
        "parentOrganization": {
          "@id": "https://vtpbluewaters.com/#organization"
        }
      },
      {
        "@type": "Place",
        "@id": "https://vtpbluewaters.com/#place",
        "name": "VTP Bluewaters Township",
        "description": "A 200+ acre luxury township in Mahalunge, West Pune featuring premium 1, 2, 3, 4, 5, and 6 BHK residences and villas.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Mahalunge, Near Baner",
          "addressLocality": "Pune",
          "postalCode": "411045",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        },
        "containedInPlace": {
          "@type": "City",
          "name": "Pune"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
