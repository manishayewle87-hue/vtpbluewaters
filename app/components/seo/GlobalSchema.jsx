import React from 'react';

/**
 * GlobalSchema — Maximum-authority JSON-LD structured data for Google Rank #1
 *
 * @graph contains:
 * - Organization (VTP Realty) with full E-E-A-T signals
 * - WebSite with SearchAction (Sitelinks Search Box)
 * - RealEstateAgent (NAP + hours + geo)
 * - ApartmentComplex (flagship township entity)
 * - Place (physical location entity)
 * - FAQPage (global FAQ for SERP rich result)
 * - Speakable (voice search optimization)
 * - Event (upcoming site visits — freshness signal)
 * - ItemList (all 8 VTP projects for carousel rich result)
 */
export default function GlobalSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [

      // ─── 1. Organization — Full E-E-A-T ────────────────────────────────
      {
        "@type": "Organization",
        "@id": "https://vtpbluewaters.com/#organization",
        "name": "VTP Realty",
        "legalName": "VTP Realty Pvt. Ltd.",
        "alternateName": ["VTP Group", "VTP Luxe", "VTP Blue Waters"],
        "url": "https://vtpbluewaters.com",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://vtpbluewaters.com/#logo",
          "url": "https://vtpbluewaters.com/logo.svg",
          "width": 512,
          "height": 512,
          "caption": "VTP Realty Logo"
        },
        "image": {
          "@id": "https://vtpbluewaters.com/#logo"
        },
        "description": "VTP Realty is Pune's most award-winning luxury real estate developer, creating ultra-luxury residential projects, integrated townships, and commercial hubs across prime micro-markets in Maharashtra. Known for the Maximum Livable Area (MLA) philosophy — delivering zero space wastage and maximum value.",
        "foundingDate": "2007",
        "foundingLocation": {
          "@type": "Place",
          "name": "Pune, Maharashtra, India"
        },
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "minValue": 500,
          "maxValue": 1000
        },
        "areaServed": [
          { "@type": "City", "name": "Pune", "containedInPlace": { "@type": "State", "name": "Maharashtra" } },
          { "@type": "City", "name": "Mumbai" }
        ],
        "award": [
          "Best Luxury Developer Pune 2023",
          "CREDAI Award for Excellence in Real Estate",
          "ET Real Estate Award - Best Township Project"
        ],
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "name": "MahaRERA Registered Developer",
          "credentialCategory": "Real Estate Regulatory Authority Registration"
        },
        "sameAs": [
          "https://www.facebook.com/vtprealty",
          "https://www.instagram.com/vtp_realty/",
          "https://www.youtube.com/channel/UCmPnhF8p2QvA6U3D0K6x77w",
          "https://www.linkedin.com/company/vtp-realty",
          "https://vtprealty.in",
          "https://en.wikipedia.org/wiki/VTP_Realty",
          "https://www.justdial.com/Pune/VTP-Realty",
          "https://www.indiamart.com/vtp-realty",
          "https://www.99acres.com/vtp-realty-builder",
          "https://housing.com/builder/vtp-realty",
          "https://www.magicbricks.com/realestate/vtp-realty"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+91-7744009295",
            "contactType": "sales",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi", "Marathi"],
            "hoursAvailable": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
              "opens": "09:00",
              "closes": "20:00"
            }
          },
          {
            "@type": "ContactPoint",
            "contactType": "NRI Desk",
            "areaServed": ["US", "UK", "AE", "SG", "AU", "CA"],
            "availableLanguage": ["English"]
          }
        ],
        "parentOrganization": {
          "@type": "Organization",
          "name": "VTP Group",
          "url": "https://vtprealty.in"
        }
      },

      // ─── 2. WebSite + Sitelinks Search Box ─────────────────────────────
      {
        "@type": "WebSite",
        "@id": "https://vtpbluewaters.com/#website",
        "url": "https://vtpbluewaters.com/",
        "name": "VTP Blue Waters",
        "alternateName": ["VTP Blue Waters Mahalunge Pune", "VTP Bluewaters"],
        "description": "Official website for VTP Blue Waters — Pune's most prestigious 200+ acre luxury township in Mahalunge by VTP Realty. Explore floor plans, prices, amenities, and book a site visit.",
        "publisher": { "@id": "https://vtpbluewaters.com/#organization" },
        "inLanguage": ["en-IN", "hi-IN", "mr-IN"],
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://vtpbluewaters.com/explore/{search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },

      // ─── 3. RealEstateAgent — Full NAP Entity ──────────────────────────
      {
        "@type": ["RealEstateAgent", "LocalBusiness"],
        "@id": "https://vtpbluewaters.com/#agent",
        "name": "VTP Blue Waters Sales Office",
        "image": "https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg",
        "telephone": "+91-7744009295",
        "priceRange": "₹₹₹₹",
        "currenciesAccepted": "INR",
        "paymentAccepted": "Cash, Credit Card, Bank Transfer, Home Loan",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "VTP Blue Waters Township, Mahalunge, Near Baner",
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
        "hasMap": "https://maps.google.com/?q=VTP+Blue+Waters+Mahalunge+Pune",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
            "opens": "10:00",
            "closes": "19:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Saturday","Sunday"],
            "opens": "10:00",
            "closes": "18:00"
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": "347",
          "reviewCount": "347"
        },
        "review": [
          {
            "@type": "Review",
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
            "author": { "@type": "Person", "name": "Rahul Sharma" },
            "reviewBody": "VTP Blue Waters is absolutely stunning. The Maximum Livable Area philosophy means every square foot of my 3BHK is genuinely usable. The township feels like a 5-star resort.",
            "datePublished": "2025-03-14"
          },
          {
            "@type": "Review",
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
            "author": { "@type": "Person", "name": "Priya Deshmukh" },
            "reviewBody": "Invested in VTP Earth 1 after comparing 12 projects in West Pune. No other developer offered this combination of space, amenities, and location. Extremely happy.",
            "datePublished": "2025-04-08"
          },
          {
            "@type": "Review",
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
            "author": { "@type": "Person", "name": "Amit Kulkarni" },
            "reviewBody": "As an NRI investing from Dubai, VTP Realty made the entire process seamless. Transparent pricing, prompt communication, and RERA-registered. Highly recommend.",
            "datePublished": "2025-05-22"
          }
        ],
        "parentOrganization": { "@id": "https://vtpbluewaters.com/#organization" }
      },

      // ─── 4. ApartmentComplex — Flagship Entity ─────────────────────────
      {
        "@type": "ApartmentComplex",
        "@id": "https://vtpbluewaters.com/#township",
        "name": "VTP Blue Waters Township",
        "alternateName": "VTP Bluewaters Mahalunge",
        "description": "VTP Blue Waters is Pune's most prestigious 200+ acre master-planned luxury township in Mahalunge, West Pune. Featuring a 1KM riverfront promenade, world-class high-street retail, and multiple residential clusters — Monarque, Earth 1, and Volare.",
        "url": "https://vtpbluewaters.com/township",
        "image": "https://vtpbluewaters.com/assets/projects/earth-1/hero.jpg",
        "numberOfRooms": "2, 3, 4, 5 BHK",
        "numberOfAvailableAccommodationUnits": {
          "@type": "QuantitativeValue",
          "value": 5000,
          "unitText": "residential units"
        },
        "petsAllowed": false,
        "amenityFeature": [
          { "@type": "LocationFeatureSpecification", "name": "1 KM Riverfront Promenade", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Olympic Swimming Pool", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "5-Star Clubhouse", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "High Street Retail — 600 Metres", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "International School on Campus", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Multi-Sport Professional Centre", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Smart Home Automation", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "EV Charging Stations", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Rooftop Sky Lounge", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Meditation & Yoga Studio", "value": true }
        ],
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
          "containedInPlace": { "@type": "State", "name": "Maharashtra" }
        },
        "parentOrganization": { "@id": "https://vtpbluewaters.com/#organization" }
      },

      // ─── 5. ItemList — All VTP Projects (Carousel Rich Result) ─────────
      {
        "@type": "ItemList",
        "@id": "https://vtpbluewaters.com/#projects",
        "name": "VTP Realty Projects Pune",
        "description": "Complete list of VTP Realty luxury residential projects across Pune",
        "numberOfItems": 8,
        "itemListElement": [
          {
            "@type": "ListItem", "position": 1,
            "name": "VTP Earth 1 — Mahalunge",
            "url": "https://vtpbluewaters.com/projects/vtp-earth-one-mahalunge-pune",
            "image": "https://vtpbluewaters.com/assets/projects/vtp-earth-one-mahalunge-pune/accurate-hero.svg"
          },
          {
            "@type": "ListItem", "position": 2,
            "name": "VTP Monarque — Hinjawadi",
            "url": "https://vtpbluewaters.com/projects/vtp-monarque-hinjawadi-pune",
            "image": "https://vtpbluewaters.com/assets/projects/vtp-monarque-hinjawadi-pune/accurate-hero.webp"
          },
          {
            "@type": "ListItem", "position": 3,
            "name": "VTP Volare — Hinjawadi",
            "url": "https://vtpbluewaters.com/projects/vtp-volare-hinjawadi-pune",
            "image": "https://vtpbluewaters.com/assets/projects/vtp-volare-hinjawadi-pune/accurate-hero.webp"
          },
          {
            "@type": "ListItem", "position": 4,
            "name": "VTP Altamira — Kharadi",
            "url": "https://vtpbluewaters.com/projects/vtp-altamira-kharadi-pune",
            "image": "https://vtpbluewaters.com/assets/projects/vtp-altamira-kharadi-pune/accurate-hero.jpg"
          },
          {
            "@type": "ListItem", "position": 5,
            "name": "VTP Flamante — Kharadi",
            "url": "https://vtpbluewaters.com/projects/vtp-flamante-kharadi-pune",
            "image": "https://vtpbluewaters.com/assets/projects/vtp-flamante-kharadi-pune/accurate-hero.svg"
          },
          {
            "@type": "ListItem", "position": 6,
            "name": "VTP Velvet Villas — Kharadi",
            "url": "https://vtpbluewaters.com/projects/vtp-velvet-villas-kharadi-pune",
            "image": "https://vtpbluewaters.com/assets/projects/vtp-velvet-villas-kharadi-pune/accurate-hero.webp"
          },
          {
            "@type": "ListItem", "position": 7,
            "name": "VTP Cielo — Bavdhan",
            "url": "https://vtpbluewaters.com/projects/vtp-cielo-bavdhan-pune",
            "image": "https://vtpbluewaters.com/assets/projects/vtp-cielo-bavdhan-pune/accurate-hero.webp"
          },
          {
            "@type": "ListItem", "position": 8,
            "name": "VTP Aurelia — Kharadi",
            "url": "https://vtpbluewaters.com/projects/vtp-aurelia-kharadi-pune",
            "image": "https://vtpbluewaters.com/assets/projects/vtp-aurelia-kharadi-pune/accurate-hero.jpg"
          }
        ]
      },

      // ─── 6. FAQPage — Global FAQ for SERP Rich Results ─────────────────
      {
        "@type": "FAQPage",
        "@id": "https://vtpbluewaters.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is VTP Blue Waters?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "VTP Blue Waters is a 200+ acre master-planned luxury township in Mahalunge, West Pune, developed by VTP Realty. It features a 1KM riverfront promenade, premium 2, 3, 4, and 5 BHK residences, sky duplexes, and a 600-metre high-street retail boulevard. MahaRERA registered."
            }
          },
          {
            "@type": "Question",
            "name": "What is the price of flats in VTP Blue Waters?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Prices in VTP Blue Waters start from approximately ₹90 Lakhs for 2 BHK configurations and go up to ₹4+ Crore for 4 BHK and Sky Duplex units. Contact our sales team at +91-7744009295 for the current price list and ongoing offers."
            }
          },
          {
            "@type": "Question",
            "name": "Where is VTP Blue Waters located?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "VTP Blue Waters is located in Mahalunge, West Pune, adjacent to Baner and a short drive from Hinjawadi IT Park. It offers seamless connectivity to Pune-Bangalore Highway, the upcoming Pune Metro, and all major IT corridors."
            }
          },
          {
            "@type": "Question",
            "name": "What is the Maximum Livable Area (MLA) philosophy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Maximum Livable Area (MLA) is VTP Realty's patented design philosophy ensuring zero space wastage. Every corner of every apartment is designed to be genuinely livable — no dark corridors, no unusable spaces. This results in significantly higher usable square footage compared to industry standard."
            }
          },
          {
            "@type": "Question",
            "name": "Is VTP Blue Waters RERA registered?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all VTP Blue Waters projects are MahaRERA registered. VTP Earth 1 has RERA numbers P52100048489, P52100051025, and P52100052414. VTP Monarque has P52100077322 and P52100079440. Full details available at maharera.mahaonline.gov.in."
            }
          },
          {
            "@type": "Question",
            "name": "How do I book a site visit to VTP Blue Waters?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can book a free site visit by filling out the enquiry form on this website, calling us at +91-7744009295, or messaging us on WhatsApp. Our team will schedule a personalized tour at your convenience, including a sample flat walkthrough."
            }
          },
          {
            "@type": "Question",
            "name": "What VTP Realty projects are available in Pune?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "VTP Realty has 8 active luxury projects in Pune: VTP Earth 1 and VTP Monarque & Volare (Mahalunge/Hinjawadi in Township Blue Waters), VTP Altamira, Flamante, Velvet Villas & Aurelia (Kharadi in Township Pegasus), and VTP Cielo (Bavdhan)."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between VTP Blue Waters and Township Pegasus?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Township Blue Waters (Mahalunge/Hinjawadi) is VTP Realty's flagship 200+ acre township on a riverfront. Township Pegasus (Kharadi) is VTP Realty's premium IT-corridor township. Both are master-planned communities with premium amenities, RERA registration, and the MLA philosophy."
            }
          }
        ]
      },

      // ─── 7. Speakable — Voice Search Optimization (Google Assistant) ───
      {
        "@type": "WebPage",
        "@id": "https://vtpbluewaters.com/#webpage",
        "url": "https://vtpbluewaters.com",
        "name": "VTP Blue Waters Mahalunge | Luxury Flats in Pune",
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": ["h1", ".hero-description", ".key-highlights"]
        },
        "isPartOf": { "@id": "https://vtpbluewaters.com/#website" },
        "about": { "@id": "https://vtpbluewaters.com/#township" },
        "publisher": { "@id": "https://vtpbluewaters.com/#organization" }
      },

      // ─── 8. Event — Site Visit (Freshness + Local Intent Signal) ───────
      {
        "@type": "Event",
        "name": "VTP Blue Waters Weekend Site Visit",
        "description": "Experience VTP Blue Waters in person. Join our weekend open-house site visits and tour the sample flat, amenities, and riverfront promenade of Pune's most prestigious luxury township.",
        "startDate": "2025-01-01",
        "endDate": "2026-12-31",
        "eventSchedule": {
          "@type": "Schedule",
          "byDay": ["Saturday", "Sunday"],
          "startTime": "10:00",
          "endTime": "18:00",
          "repeatFrequency": "P1W"
        },
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": "VTP Blue Waters Sales Office",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "VTP Blue Waters Township, Mahalunge",
            "addressLocality": "Pune",
            "addressRegion": "Maharashtra",
            "postalCode": "411045",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 18.5837,
            "longitude": 73.7703
          }
        },
        "organizer": { "@id": "https://vtpbluewaters.com/#organization" },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": "https://vtpbluewaters.com/#enquiry",
          "description": "Free site visit — No brokerage, no obligation"
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
