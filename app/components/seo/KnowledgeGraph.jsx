export default function KnowledgeGraph() {
  const entityGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": "https://vtpbluewaters.in/#organization",
        "name": "VTP Realty",
        "url": "https://vtpbluewaters.in",
        "logo": "https://vtpbluewaters.in/logo.png",
        "image": "https://vtpbluewaters.in/logo.png",
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
        "@id": "https://vtpbluewaters.in/#pune",
        "name": "Pune",
        "description": "A major IT and manufacturing hub in Maharashtra, India.",
        "hasMap": "https://goo.gl/maps/Pune"
      },
      {
        "@type": "WebSite",
        "@id": "https://vtpbluewaters.in/#website",
        "url": "https://vtpbluewaters.in",
        "name": "VTP Bluewaters",
        "publisher": {
          "@id": "https://vtpbluewaters.in/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://vtpbluewaters.in/search?q={search_term_string}",
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
