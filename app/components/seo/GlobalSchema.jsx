import React from 'react';

/**
 * GlobalSchema — Enterprise-grade JSON-LD structured data
 * 
 * Injects a comprehensive @graph containing:
 * - Organization (VTP Realty)
 * - WebSite with SearchAction (sitelinks search box)
 * - RealEstateAgent with full NAP (Name, Address, Phone)
 * - Place (VTP Blue Waters Township)
 * - ApartmentComplex (the flagship township entity)
 * 
 * This tells Google's Knowledge Graph exactly how VTP Realty
 * relates to the physical world of Pune real estate.
 */
export default function GlobalSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // ─── Organization ───
      {
        "@type": "Organization",
        "@id": "https://vtpbluewaters.com/#organization",
        "name": "VTP Realty",
        "alternateName": "VTP Group",
        "url": "https://vtprealty.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://vtpbluewaters.com/logo.svg",
          "width": 512,
          "height": 512
        },
        "image": "https://vtpbluewaters.com/logo.svg",
        "description": "VTP Realty is Pune's leading real estate developer, creating ultra-luxury residential projects, commercial hubs, and integrated townships across prime micro-markets in Maharashtra, India.",
        "foundingDate": "2007",
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "value": "500+"
        },
        "areaServed": {
          "@type": "City",
          "name": "Pune",
          "containedInPlace": {
            "@type": "State",
            "name": "Maharashtra"
          }
        },
        "sameAs": [
          "https://www.facebook.com/vtprealty",
          "https://www.instagram.com/vtp_realty/",
          "https://www.youtube.com/channel/UCmPnhF8p2QvA6U3D0K6x77w",
          "https://www.linkedin.com/company/vtp-realty",
          "https://vtprealty.in"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+91-7744009295",
            "contactType": "sales",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi", "Marathi"]
          }
        ]
      },

      // ─── WebSite with SearchAction ───
      {
        "@type": "WebSite",
        "@id": "https://vtpbluewaters.com/#website",
        "url": "https://vtpbluewaters.com/",
        "name": "VTP Blue Waters",
        "description": "Official website for VTP Blue Waters — a 200+ acre luxury township in Mahalunge, West Pune by VTP Realty.",
        "publisher": {
          "@id": "https://vtpbluewaters.com/#organization"
        },
        "inLanguage": ["en-IN", "hi-IN", "mr-IN"],
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://vtpbluewaters.com/projects/{search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },

      // ─── RealEstateAgent (NAP Entity) ───
      {
        "@type": "RealEstateAgent",
        "@id": "https://vtpbluewaters.com/#agent",
        "name": "VTP Realty",
        "image": "https://vtpbluewaters.com/logo.svg",
        "telephone": "+91-7744009295",
        "priceRange": "₹₹₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Site Office: VTP Blue Waters Township, Mahalunge",
          "addressLocality": "Pune",
          "postalCode": "411045",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 18.5516,
          "longitude": 73.9135
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "09:00",
          "closes": "20:00"
        },
        "parentOrganization": {
          "@id": "https://vtpbluewaters.com/#organization"
        }
      },

      // ─── Place: VTP Blue Waters Township ───
      {
        "@type": "Place",
        "@id": "https://vtpbluewaters.com/#place",
        "name": "VTP Blue Waters Township",
        "description": "A 200+ acre luxury township in Mahalunge, West Pune featuring premium 1, 2, 3, 4, 5, and 6 BHK residences and villas with resort-grade amenities.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Mahalunge, Near Baner",
          "addressLocality": "Pune",
          "postalCode": "411045",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 18.5837,
          "longitude": 73.7703
        },
        "containedInPlace": {
          "@type": "City",
          "name": "Pune",
          "containedInPlace": {
            "@type": "State",
            "name": "Maharashtra"
          }
        },
        "hasMap": "https://goo.gl/maps/VTPBluewaters"
      },

      // ─── ApartmentComplex (Flagship Entity) ───
      {
        "@type": "ApartmentComplex",
        "@id": "https://vtpbluewaters.com/#township",
        "name": "VTP Blue Waters",
        "description": "VTP Blue Waters is a master-planned 200+ acre luxury township in Mahalunge, West Pune, featuring a 1KM riverfront promenade, world-class high-street retail, and multiple residential phases.",
        "url": "https://vtpbluewaters.com/en/township",
        "image": "https://vtpbluewaters.com/logo.svg",
        "numberOfAvailableAccommodationUnits": {
          "@type": "QuantitativeValue",
          "value": "5000+"
        },

        "amenityFeature": [
          { "@type": "LocationFeatureSpecification", "name": "Olympic Swimming Pool" },
          { "@type": "LocationFeatureSpecification", "name": "5-Star Clubhouse" },
          { "@type": "LocationFeatureSpecification", "name": "1 KM Riverfront Promenade" },
          { "@type": "LocationFeatureSpecification", "name": "High Street Retail" },
          { "@type": "LocationFeatureSpecification", "name": "International School" },
          { "@type": "LocationFeatureSpecification", "name": "Multi-Sport Arena" }
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Mahalunge",
          "addressLocality": "Pune",
          "postalCode": "411045",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        },
        "containedInPlace": {
          "@id": "https://vtpbluewaters.com/#place"
        },
        "parentOrganization": {
          "@id": "https://vtpbluewaters.com/#organization"
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
