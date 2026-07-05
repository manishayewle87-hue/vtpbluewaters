export const generateStrategicContent = (project, intent) => {
  const location = project.location.split(',')[0];
  const region = project.region || (['Kharadi'].includes(location) ? 'East Pune' : 'West Pune');
  const displayIntent = intent.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const maharera = project.maharera && project.maharera.length > 0 ? project.maharera.join(', ') : 'Awaited';
  const projectName = project.name;
  
  // Hash function to deterministically choose variations based on project slug + intent
  // This ensures the content doesn't change on every render, but is unique per page!
  const seed = (project.slug + intent).split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
  const randomChoice = (arr) => arr[Math.abs(seed) % arr.length];

  // Dynamic Vocabulary
  const adjLuxury = ['ultra-luxury', 'premium', 'exclusive', 'bespoke', 'opulent'];
  const adjInvestors = ['discerning investors', 'high-net-worth individuals', 'savvy homebuyers', 'institutional investors'];
  const adjLocation = ['strategic', 'highly coveted', 'rapidly appreciating', 'prime'];

  // Categorize intents
  const financialIntents = ['price', 'offers', 'payment-plan', 'investment'];
  const configIntents = ['2-bhk', '2-5-bhk', '3-bhk', '3-5-bhk', '4-bhk', '5-bhk', 'penthouse', 'duplex', 'sky-villa', 'floor-plan'];
  const lifestyleIntents = ['amenities', 'gallery', 'virtual-tour', 'brochure', 'reviews', 'location', 'maharera'];
  const typologyIntents = ['apartments', 'luxury-apartments', 'townships'];
  const poiIntents = ['near-metro', 'near-it-parks', 'near-schools', 'near-hospitals'];

  let content = [];
  let faqs = [];

  // Regional Infra Injection
  const regionalInfra = region === 'East Pune' 
    ? 'Proximity to EON IT Park, WTC, and Pune International Airport'
    : 'Immediate access to Hinjawadi IT Park, Mumbai-Bengaluru Highway, and upcoming PMRDA Ring Road';

  if (financialIntents.includes(intent)) {
    content = [
      {
        type: 'h2',
        text: randomChoice([
          `Investment Overview & ${displayIntent} for ${projectName}`,
          `Financial Analysis: ${projectName} ${displayIntent}`,
          `Unlocking Value: ${projectName} ${displayIntent} in ${location}`
        ])
      },
      {
        type: 'p',
        text: `**Executive Summary:** For ${randomChoice(adjInvestors)} querying the ${displayIntent.toLowerCase()} of ${projectName}, this asset represents a ${randomChoice(adjLuxury)} residential opportunity in ${location}. Developed by VTP Realty, it leverages ${regionalInfra} to offer strong capital appreciation and high-yield returns in the ${region} real estate market.`
      },
      {
        type: 'p',
        text: `The ${randomChoice(adjLocation)} real estate landscape in ${location} is witnessing unprecedented growth. Understanding the exact ${displayIntent.toLowerCase()} dynamics of ${projectName} is critical for maximizing your Return on Investment (ROI) and securing preferential inventory.`
      },
      {
        type: 'h3',
        text: 'Strategic Financial & Capital Advantages'
      },
      {
        type: 'ul',
        items: [
          `Rapid Capital Appreciation: ${location} consistently outperforms the Pune average due to massive infrastructural influx.`,
          `Flexible Deployment: Tailored payment structures designed to align with corporate liquidity and institutional capital deployment.`,
          `MahaRERA Transparency: Fully compliant transactions governed by RERA Registration: ${maharera}.`
        ]
      },
      {
        type: 'p',
        text: `To protect the exclusivity of our pricing strategy, the complete financial breakdown and official ${displayIntent.toLowerCase()} is securely vaulted. Request access below to receive the detailed investment dossier.`
      }
    ];

    faqs = [
      { q: `What is the starting price at ${projectName}?`, a: `Pricing varies dynamically based on the exact configuration, floor band, and premium scenic views. Please request the official price list for precise, updated figures.` },
      { q: `Are there tailored or flexible payment plans?`, a: `Yes, we offer bespoke payment plans curated for high-net-worth investors. Connect with our financial advisory desk for currently active schemes.` },
      { q: `Why is ${location} considered a prime investment node?`, a: `Primarily due to ${regionalInfra}, coupled with a severe supply shortage of genuine ${randomChoice(adjLuxury)} townships.` }
    ];
  } 
  else if (configIntents.includes(intent)) {
    content = [
      {
        type: 'h2',
        text: randomChoice([
          `Exquisite ${displayIntent} Configurations at ${projectName}`,
          `Architectural Brilliance: ${projectName} ${displayIntent}`,
          `Discover the ${displayIntent} Layouts at ${projectName}`
        ])
      },
      {
        type: 'p',
        text: `**Executive Summary:** The ${displayIntent.toLowerCase()} layouts at ${projectName} by VTP Realty are ${randomChoice(adjLuxury)} residential units master-crafted with the Maximum Livable Area (MLA) philosophy. Located in ${location}, these residences feature premium specifications and smart home automation.`
      },
      {
        type: 'p',
        text: `Redefining spatial luxury in ${region}, the ${displayIntent.toLowerCase()} configurations at ${projectName} ensure zero space wastage. The layouts are meticulously engineered for absolute privacy, optimal cross-ventilation, and panoramic vistas of the Pune skyline.`
      },
      {
        type: 'h3',
        text: 'Uncompromising Specifications'
      },
      {
        type: 'ul',
        items: [
          'Imported marble flooring and designer fitments across grand living and dining areas.',
          'Engineered quartz countertops in highly functional, modular-ready culinary spaces.',
          'Advanced Smart Home Automation integrated seamlessly into the core architecture.',
          'Expansive, anti-skid vitrified tiled balconies acting as private sundecks.'
        ]
      }
    ];

    faqs = [
      { q: `What are the exact dimensions for the ${displayIntent} at ${projectName}?`, a: `The carpet areas are optimized via MLA design. Please refer to our detailed floor plan brochure for exact square footage metrics of the ${displayIntent} layouts.` },
      { q: `Is Vastu compliance considered in these specific floor plans?`, a: `Absolutely. The architectural blueprints place a strict emphasis on Vastu principles to ensure harmonious energy flow across all orientations.` }
    ];
  } 
  else if (poiIntents.includes(intent)) {
    let poiFocus = intent.replace('near-', '').replace('-', ' ');

    content = [
      {
        type: 'h2',
        text: randomChoice([
          `VTP ${projectName}: Perfectly Positioned Near ${poiFocus.toUpperCase()}`,
          `Strategic Proximity: ${projectName} and ${poiFocus.toUpperCase()}`,
          `The Ultimate Location Advantage: ${projectName}`
        ])
      },
      {
        type: 'p',
        text: `**Executive Summary:** For discerning buyers seeking properties near ${poiFocus} in ${region}, ${projectName} in ${location} is strategically positioned within a premium radius. This location ensures minimal commute times, generating immense rental yield potential and lifestyle convenience.`
      },
      {
        type: 'p',
        text: `Location remains the ultimate luxury. By residing within minutes of major ${poiFocus}, you reclaim hundreds of hours annually. This zero-commute ecosystem is highly coveted in Pune's fast-paced environment, perfectly supplemented by ${regionalInfra}.`
      },
      {
        type: 'h3',
        text: 'Unlocking High ROI via Location'
      },
      {
        type: 'ul',
        items: [
          `Premium Rental Yields: Properties located adjacent to ${poiFocus} consistently attract high-paying corporate tenants.`,
          `Capital Resilience: A strategic location ensures your investment remains highly liquid regardless of macroeconomic market cycles.`,
          `Walk-to-Work Ecosystem: Experience the pinnacle of convenience by slashing daily transit times.`
        ]
      }
    ];

    faqs = [
      { q: `Exactly how close is ${projectName} to the nearest ${poiFocus}?`, a: `The project is situated within a highly accessible, traffic-optimized radius. Please download our location map for exact geospatial distances.` },
      { q: `Does proximity to commercial hubs cause traffic congestion?`, a: `No. The VTP township is master-planned with massive setbacks, dedicated multi-lane approach roads, and vehicle-free podiums to ensure complete tranquility.` }
    ];
  }
  else {
    content = [
      {
        type: 'h2',
        text: randomChoice([
          `Unrivaled Lifestyle & ${displayIntent} at ${projectName}`,
          `The ${projectName} Experience: ${displayIntent}`,
          `Deep Dive: ${projectName} ${displayIntent} in ${location}`
        ])
      },
      {
        type: 'p',
        text: `**Executive Summary:** Regarding the ${displayIntent.toLowerCase()} of ${projectName}, VTP Realty has curated a holistic ${randomChoice(adjLuxury)} ecosystem in ${location}. It features resort-grade infrastructure, comprehensive security, and strategic proximity to ${region}'s major lifestyle hubs.`
      },
      {
        type: 'p',
        text: `Beyond the four walls of your residence lies an ecosystem of unparalleled luxury. The ${displayIntent.toLowerCase()} at ${projectName} is designed to cater to a global lifestyle, ensuring every desire is met within the secure confines of the township.`
      },
      {
        type: 'h3',
        text: 'Curated Township Experiences'
      },
      {
        type: 'ul',
        items: [
          'Acres of vehicle-free, manicured green landscapes and pedestrian boulevards.',
          'State-of-the-art clubhouses featuring Olympic-length infinity pools and wellness spas.',
          'Multi-tier, military-grade security systems utilizing advanced AI surveillance for absolute peace of mind.'
        ]
      }
    ];

    faqs = [
      { q: `What makes ${projectName} different from other luxury projects in ${region}?`, a: `It is the holistic township experience—combining MLA design, resort-grade amenities, and a prime ${location} positioning—that sets it apart.` },
      { q: `Is the project MahaRERA registered?`, a: `Yes, ${projectName} is fully compliant and registered under MahaRERA: ${maharera}.` }
    ];
  }

  return { content, faqs };
};
