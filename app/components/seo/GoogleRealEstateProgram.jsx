import React from 'react';

/**
 * Google Real Estate Program - Structured Data Engine
 * Injects RealEstateListing and Accommodation schema graph compliant with Google's Real Estate Search specifications.
 */
export default function GoogleRealEstateProgram({ project, unitConfig }) {
  if (!project) return null;

  const siteUrl = 'https://vtpbluewaters.com';
  const projectUrl = `${siteUrl}/projects/${project.slug}`;
  const canonicalUrl = unitConfig ? `${projectUrl}/${unitConfig.slug || 'price'}` : projectUrl;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        "@id": `${canonicalUrl}#listing`,
        "name": unitConfig ? `${project.name} ${unitConfig.name || unitConfig.type}` : `${project.name} Luxury Residences`,
        "url": canonicalUrl,
        "datePosted": "2026-01-01",
        "validThrough": "2027-12-31",
        "category": "for_sale",
        "realEstateAgent": {
          "@type": "RealEstateAgent",
          "@id": `${siteUrl}/#agent`,
          "name": "VTP Realty",
          "telephone": "+91-7744009295",
          "url": siteUrl
        },
        "mainEntity": {
          "@type": ["SingleFamilyResidence", "Apartment", "Accommodation"],
          "@id": `${canonicalUrl}#residence`,
          "name": unitConfig ? `${project.name} ${unitConfig.type}` : project.name,
          "description": project.overview || project.seoDescription || `Ultra-luxury residences in ${project.location} by VTP Realty.`,
          "image": project.image ? (project.image.startsWith('http') ? project.image : `${siteUrl}${project.image}`) : `${siteUrl}/assets/projects/earth-1/hero.jpg`,
          "numberOfBedrooms": unitConfig?.bedrooms || (project.name.includes('4') ? 4 : project.name.includes('3') ? 3 : 2),
          "numberOfBathroomsTotal": unitConfig?.bathrooms || 2,
          "floorSize": {
            "@type": "QuantitativeValue",
            "value": unitConfig?.carpetArea || "850 - 1800",
            "unitText": "SQFT"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": `${project.name}, ${project.location || 'Pune'}`,
            "addressLocality": "Pune",
            "addressRegion": "Maharashtra",
            "postalCode": "411045",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 18.5837,
            "longitude": 73.7703
          },
          "amenityFeature": [
            { "@type": "LocationFeatureSpecification", "name": "Maximum Livable Area (MLA) Design", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Grand Clubhouse & Swimming Pool", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "5-Tier High-Tech Security", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Pre-Approved SBI & HDFC Home Loans", "value": true }
          ]
        },
        "offers": {
          "@type": "Offer",
          "price": unitConfig?.price || "9000000",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "validFrom": "2026-01-01",
          "url": canonicalUrl,
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": unitConfig?.price || "9000000",
            "priceCurrency": "INR",
            "unitText": "unit"
          },
          "seller": {
            "@type": "Organization",
            "name": "VTP Realty",
            "url": siteUrl
          }
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
