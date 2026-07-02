export default function KnowledgeGraph() {
  const entityGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": "https://vtpbluewaters.com/#organization",
        "name": "VTP BLUEWATERS",
        "url": "https://vtpbluewaters.com",
        "logo": "https://vtpbluewaters.com/logo.svg",
        "image": "https://vtpbluewaters.com/logo.svg",
        "description": "VTP Realty is Pune's leading real estate brand, developing ultra-luxury residential projects, commercial hubs, and integrated townships across prime micro-markets.",
        "telephone": "+91-0000000000",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "VTP House, Wakad",
          "addressLocality": "Pune",
          "addressRegion": "Maharashtra",
          "postalCode": "411057",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://www.facebook.com/vtprealty",
          "https://www.instagram.com/vtprealty",
          "https://www.linkedin.com/company/vtp-realty"
        ]
      },
      {
        "@type": "Place",
        "@id": "https://vtpbluewaters.com/#pune",
        "name": "Pune",
        "description": "A major IT and manufacturing hub in Maharashtra, India.",
        "hasMap": "https://goo.gl/maps/Pune"
      },
      {
        "@type": "WebSite",
        "@id": "https://vtpbluewaters.com/#website",
        "url": "https://vtpbluewaters.com",
        "name": "VTP Bluewaters",
        "publisher": {
          "@id": "https://vtpbluewaters.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://vtpbluewaters.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(entityGraph) }}
    />
  );
}
