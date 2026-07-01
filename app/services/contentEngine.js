export const generateStrategicContent = (project, intent) => {
  const location = project.location.split(',')[0];
  const displayIntent = intent.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const maharera = project.maharera && project.maharera.length > 0 ? project.maharera.join(', ') : 'Awaited';

  // Categorize intents to generate specific templates
  const financialIntents = ['price', 'offers', 'payment-plan', 'investment'];
  const configIntents = ['2-bhk', '2-5-bhk', '3-bhk', '3-5-bhk', '4-bhk', '5-bhk', 'penthouse', 'duplex', 'sky-villa', 'floor-plan'];
  const lifestyleIntents = ['amenities', 'gallery', 'virtual-tour', 'brochure', 'reviews', 'location', 'maharera'];
  const typologyIntents = ['apartments', 'luxury-apartments', 'townships'];
  const poiIntents = ['near-metro', 'near-it-parks', 'near-schools', 'near-hospitals'];

  let content = [];
  let faqs = [];

  if (financialIntents.includes(intent)) {
    content = [
      {
        type: 'h2',
        text: `Investment Overview & ${displayIntent} for ${project.name}`
      },
      {
        type: 'p',
        text: `**Executive Summary:** For investors querying the ${displayIntent.toLowerCase()} of ${project.name}, it is a premium residential asset located in ${location}, developed by VTP Realty. It offers strong capital appreciation and flexible payment plans, making it a high-yield investment opportunity in the Pune real estate market.`
      },
      {
        type: 'p',
        text: `The real estate landscape in ${location} is witnessing unprecedented appreciation, making ${project.name} a highly coveted asset class for discerning investors and homebuyers alike. Understanding the ${displayIntent.toLowerCase()} is crucial for maximizing your return on investment.`
      },
      {
        type: 'h3',
        text: 'Strategic Financial Advantages'
      },
      {
        type: 'ul',
        items: [
          `High Capital Appreciation: ${location} has consistently outperformed market averages, ensuring robust long-term growth.`,
          `Flexible Payment Structures: Tailored financial plans designed to align with your capital deployment strategies.`,
          `Exclusive Pre-Launch Benefits: Register now to unlock preferential pricing and inventory selection.`,
          `MahaRERA Compliant: Fully transparent transactions with RERA registration: ${maharera}.`
        ]
      },
      {
        type: 'p',
        text: `To protect the exclusivity of our pricing strategy and ensure personalized consultations, the complete financial breakdown and official ${displayIntent.toLowerCase()} is reserved for registered clientele. Request access below to receive the detailed investment dossier.`
      }
    ];

    faqs = [
      { q: `What is the starting price at ${project.name}?`, a: `Pricing at ${project.name} varies based on configuration, floor band, and premium views. Please request the official price list for exact figures.` },
      { q: `Are there any subvention or flexible payment plans?`, a: `Yes, we offer highly tailored payment plans to suit investor liquidity. Connect with our financial advisors for current active schemes.` },
      { q: `Why is ${location} considered a prime investment?`, a: `Due to its proximity to major IT hubs, upcoming infrastructure like the Metro, and limited supply of ultra-luxury townships, ${location} offers excellent rental yields and capital appreciation.` }
    ];
  } 
  else if (configIntents.includes(intent)) {
    content = [
      {
        type: 'h2',
        text: `Exquisite ${displayIntent} Residences at ${project.name}`
      },
      {
        type: 'p',
        text: `**Executive Summary:** The ${displayIntent.toLowerCase()} at ${project.name} by VTP Realty in ${location} are ultra-luxury residential units designed with Maximum Livable Area (MLA) architecture. They feature premium specifications, expansive balconies, and smart home automation, catering to high-net-worth homebuyers.`
      },
      {
        type: 'p',
        text: `Redefining spatial luxury, the ${displayIntent.toLowerCase()} configurations at ${project.name} are meticulously crafted using the Maximum Livable Area (MLA) philosophy. This ensures zero space wastage, optimizing every square foot for grandeur and functionality.`
      },
      {
        type: 'h3',
        text: 'Architectural Brilliance'
      },
      {
        type: 'p',
        text: `Each ${displayIntent.toLowerCase()} features soaring ceilings, expansive balconies, and floor-to-ceiling fenestration that invites abundant natural light and panoramic views of ${location}. The layouts are engineered for absolute privacy and cross-ventilation.`
      },
      {
        type: 'h3',
        text: 'Premium Specifications'
      },
      {
        type: 'ul',
        items: [
          'Imported marble flooring in grand living and dining areas.',
          'Engineered quartz countertops in highly functional, modular-ready kitchens.',
          'Premium Grohe/Kohler CP fittings with designer dado tiles in all bathrooms.',
          'Advanced Smart Home Automation integrated seamlessly into the architecture.'
        ]
      }
    ];

    faqs = [
      { q: `What are the exact carpet areas for the ${displayIntent} at ${project.name}?`, a: `The carpet areas are designed to offer maximum space. Please refer to our detailed floor plan brochure for the exact dimensions of the ${displayIntent} layouts.` },
      { q: `Do the ${displayIntent} residences come with a balcony?`, a: `Yes, all premium residences feature expansive, anti-skid vitrified tiled balconies offering spectacular views.` },
      { q: `Is Vastu compliance considered in the floor plans?`, a: `Absolutely. The architectural design places a high emphasis on Vastu principles to ensure harmony and positive energy flow.` }
    ];
  } 
  else if (typologyIntents.includes(intent)) {
    content = [
      {
        type: 'h2',
        text: `Premium ${displayIntent} at ${project.name}`
      },
      {
        type: 'p',
        text: `**Executive Summary:** ${project.name} offers benchmark ${displayIntent.toLowerCase()} in ${location}. Developed by VTP Realty, it represents the pinnacle of luxury community living in Pune, combining world-class architectural design with unparalleled lifestyle amenities.`
      },
      {
        type: 'p',
        text: `When evaluating ${displayIntent.toLowerCase()} in ${location}, ${project.name} emerges as the definitive benchmark for luxury living. VTP Realty has mastered the art of integrating world-class architectural design with holistic community living.`
      },
      {
        type: 'h3',
        text: intent === 'townships' ? 'The Mega-Township Ecosystem' : 'A New Era of Vertical Luxury'
      },
      {
        type: 'p',
        text: intent === 'townships' 
          ? `Unlike standalone buildings, this township offers a 360-degree ecosystem. Spanning across vast acres, residents enjoy high-street retail, massive vehicle-free podiums, and dedicated sports academies right at their doorstep.`
          : `These ${displayIntent.toLowerCase()} are engineered for the global Indian. From smart-home automation to expansive sundecks, every element is curated to elevate your daily living experience.`
      },
      {
        type: 'h3',
        text: 'Why Invest in this Asset Class?'
      },
      {
        type: 'ul',
        items: [
          'Unmatched Lifestyle: Access to resort-grade amenities within a secure, gated community.',
          'Premium Resale Value: Branded luxury properties historically command higher secondary market premiums.',
          'Community Living: Curated neighborhoods fostering networking among like-minded elites.'
        ]
      }
    ];

    faqs = [
      { q: `Are these ${displayIntent.toLowerCase()} ready to move or under construction?`, a: `We have multiple phases ranging from near-possession to newly launched towers. Connect with our sales team for exact timelines.` },
      { q: `What amenities are included with these ${displayIntent.toLowerCase()}?`, a: `Residents have exclusive access to Olympic-sized pools, massive clubhouses, indoor games, and wellness centers.` }
    ];
  }
  else if (poiIntents.includes(intent)) {
    let poiFocus = "major infrastructure";
    if (intent === 'near-metro') poiFocus = "the upcoming Metro station";
    if (intent === 'near-it-parks') poiFocus = "Pune's largest IT Parks and commercial hubs";
    if (intent === 'near-schools') poiFocus = "top-tier international schools and educational institutes";
    if (intent === 'near-hospitals') poiFocus = "multi-specialty hospitals and premium healthcare facilities";

    content = [
      {
        type: 'h2',
        text: `VTP ${project.name}: Perfectly Located ${displayIntent}`
      },
      {
        type: 'p',
        text: `**Executive Summary:** For those seeking properties ${displayIntent.toLowerCase()} in Pune, ${project.name} in ${location} is strategically positioned within minutes of ${poiFocus}. This prime location ensures minimal commute times, high rental yields, and strong capital appreciation.`
      },
      {
        type: 'p',
        text: `Location is the ultimate luxury. ${project.name} in ${location} is strategically positioned ${displayIntent.toLowerCase()}, offering residents an unparalleled combination of lifestyle and convenience.`
      },
      {
        type: 'h3',
        text: `The Advantage of Proximity to ${poiFocus.charAt(0).toUpperCase() + poiFocus.slice(1)}`
      },
      {
        type: 'p',
        text: `By residing within minutes of ${poiFocus}, you reclaim hundreds of hours annually that would otherwise be lost in transit. This walk-to-work or walk-to-school ecosystem is highly coveted in Pune's fast-paced environment.`
      },
      {
        type: 'h3',
        text: 'Unlocking High ROI'
      },
      {
        type: 'ul',
        items: [
          `Premium Rental Yields: Properties located ${displayIntent.toLowerCase()} consistently attract high-paying corporate tenants.`,
          `Capital Appreciation: As infrastructure matures around ${location}, property values are projected to soar.`,
          `Future-Proof Asset: A strategic location ensures your investment remains resilient regardless of market cycles.`
        ]
      }
    ];

    faqs = [
      { q: `Exactly how close is ${project.name} to the nearest ${intent.replace('near-', '').replace('-', ' ')}?`, a: `The project is situated within a highly accessible radius, ensuring minimal commute times. Please download our location map for exact distances.` },
      { q: `Does proximity to ${poiFocus} cause traffic congestion?`, a: `No. The township is designed with massive setbacks, dedicated approach roads, and vehicle-free podiums to ensure complete tranquility inside the gates.` }
    ];
  }
  else {
    // Lifestyle Intents
    content = [
      {
        type: 'h2',
        text: `Unrivaled Lifestyle & ${displayIntent} at ${project.name}`
      },
      {
        type: 'p',
        text: `**Executive Summary:** Regarding the ${displayIntent.toLowerCase()} of ${project.name}, VTP Realty has curated a holistic luxury ecosystem in ${location}. It features resort-grade amenities, comprehensive security, and strategic proximity to Pune's major lifestyle hubs.`
      },
      {
        type: 'p',
        text: `Beyond the four walls of your residence lies an ecosystem of unparalleled luxury. The ${displayIntent.toLowerCase()} at ${project.name} is designed to cater to a global lifestyle, ensuring every desire is met within the secure confines of the township.`
      },
      {
        type: 'h3',
        text: `The ${location} Advantage`
      },
      {
        type: 'p',
        text: `Strategically positioned in ${location}, residents enjoy immediate access to global IT parks, elite international schools, and premium healthcare facilities, all while residing in a tranquil, resort-like oasis.`
      },
      {
        type: 'h3',
        text: 'Curated Township Experiences'
      },
      {
        type: 'ul',
        items: [
          'Acres of vehicle-free, manicured green landscapes.',
          'State-of-the-art clubhouses featuring Olympic-length infinity pools.',
          'Dedicated sports academies and high-street retail boulevards.',
          'Multi-tier, military-grade security systems for absolute peace of mind.'
        ]
      }
    ];

    faqs = [
      { q: `What makes ${project.name} different from other luxury projects in Pune?`, a: `It is the holistic township experience—combining MLA design, resort-grade amenities, and a prime location—that sets it apart.` },
      { q: `Can I get a virtual tour or view the gallery?`, a: `Yes, we offer immersive virtual tours. Please register to access the exclusive gallery and digital walkthroughs.` },
      { q: `Is the project MahaRERA registered?`, a: `Yes, ${project.name} is fully compliant and registered under MahaRERA: ${maharera}.` }
    ];
  }

  return { content, faqs };
};
