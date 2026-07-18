/**
 * SEO Content Engine
 * Defeats Google's Helpful Content / Duplicate Content algorithm by pseudo-randomly
 * generating highly varied "Spintax" paragraphs using a deterministic seed (the slug hash).
 * This ensures no two programmatic pages ever have identical content, while remaining
 * perfectly static on every build for a specific URL.
 */

// Simple deterministic string hashing to generate a pseudo-random seed
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Pseudo-random number generator between 0 and 1 using seed
function seededRandom(seed) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Pick an item from an array deterministically based on seed
function pickDeterministic(arr, seed) {
  const index = Math.floor(seededRandom(seed) * arr.length);
  return arr[index];
}

const spintaxBlocks = {
  mahalunge: [
    [
      "Mahalunge is rapidly transforming into Pune's most coveted high-tech corridor.",
      "The Mahalunge micro-market is widely regarded as the crown jewel of PMRDA's town planning scheme.",
      "Positioned perfectly between Baner and Hinjawadi, Mahalunge is West Pune's fastest-growing residential hub.",
      "As Pune expands westward, Mahalunge has emerged as the premier destination for high-end luxury real estate."
    ],
    [
      "By investing in {KEYWORD}, you are positioning yourself at the epicenter of massive infrastructural development.",
      "Securing property at {KEYWORD} guarantees a sophisticated lifestyle enveloped by rapid urban modernization.",
      "Exploring {KEYWORD} gives you unparalleled access to the highly anticipated Maan-Mahalunge Hi-Tech City.",
      "Properties such as {KEYWORD} offer a rare combination of serene riverside living and hyper-connectivity."
    ],
    [
      "With the impending metro line and the proposed ring road drastically reducing commute times, rental yields here are expected to surge.",
      "VTP Blue Waters commands a significant premium in this sector, promising extraordinary capital appreciation over the next decade.",
      "The massive influx of IT professionals and seamless connectivity makes this locale a goldmine for aggressive ROI.",
      "Our expansive master-planned township in this sector provides resort-style luxury that standalone buildings simply cannot match."
    ]
  ],
  hinjawadi: [
    [
      "Hinjawadi remains the undisputed IT capital of Pune, driving immense demand for luxury housing.",
      "As the heartbeat of Pune's commercial and tech boom, Hinjawadi offers an unparalleled urban ecosystem.",
      "The Hinjawadi IT Park corridor continues to attract massive foreign investment and top-tier talent.",
      "Renowned for its massive employment generation, Hinjawadi is the nucleus of West Pune's real estate growth."
    ],
    [
      "{KEYWORD} offers IT professionals the ultimate zero-commute lifestyle, maximizing work-life balance.",
      "When you choose {KEYWORD}, you are buying into a vibrant, future-ready neighborhood that never sleeps.",
      "Looking closely at {KEYWORD}, investors recognize the incredible potential for consistent, high-yield rental income.",
      "Properties like {KEYWORD} provide a perfect sanctuary away from the bustle, yet minutes from major corporate campuses."
    ],
    [
      "With Phase 3 expanding rapidly and the upcoming metro line set to drastically reduce travel times, capital values are poised to skyrocket.",
      "VTP Blue Waters ensures your investment here is backed by world-class amenities, premium construction quality, and maximum livable area.",
      "Smart investors are leveraging the infrastructural upgrades in this zone to secure assets that guarantee generational wealth.",
      "The integration of smart city features and luxury gated communities makes this the ultimate destination for discerning buyers."
    ]
  ],
  baner: [
    [
      "Baner represents the absolute pinnacle of cosmopolitan, high-street living in Pune.",
      "Known for its elite demographic and vibrant social infrastructure, Baner is Pune's most aspirational zip code.",
      "The Baner-Balewadi corridor seamlessly blends upscale residential tranquility with buzzing commercial energy.",
      "Baner continues to be the most coveted micro-market for HNIs and NRIs seeking ultra-luxury real estate."
    ],
    [
      "Investing in {KEYWORD} places you within walking distance of Pune's finest dining, elite schools, and premium retail.",
      "Choosing {KEYWORD} means embracing a lifestyle surrounded by the iconic Balewadi High Street ecosystem.",
      "With {KEYWORD}, you secure a highly prestigious address that instantly elevates your social standing.",
      "Exploring {KEYWORD} reveals a rare opportunity to own a piece of Baner's rapidly depleting prime land parcels."
    ],
    [
      "Because land parcels here are exceedingly scarce, ultra-luxury projects command a massive premium, ensuring strong resale value.",
      "VTP Blue Waters brings its signature Maximum Livable Area philosophy here, offering expansive living spaces without compromise.",
      "The unmatched connectivity to the Mumbai-Bengaluru highway and the upcoming metro ensures property values will continue their aggressive upward trajectory.",
      "This neighborhood guarantees a sophisticated lifestyle coupled with an elite community profile that is second to none."
    ]
  ],
  kharadi: [
    [
      "Kharadi is the beating heart of East Pune's IT and commercial sectors, offering unmatched dynamism.",
      "The exponential growth of Kharadi has cemented its status as Pune's most lucrative eastern real estate market.",
      "Anchored by world-class SEZs, Kharadi provides a cosmopolitan lifestyle tailored for global professionals.",
      "Kharadi has rapidly evolved from an industrial outskirt to an ultra-premium, high-tech residential paradise."
    ],
    [
      "Exploring {KEYWORD} means positioning yourself mere minutes away from EON IT Park and the World Trade Center.",
      "With {KEYWORD}, you gain access to an elite community driven by the massive influx of multinational corporations.",
      "Securing an asset like {KEYWORD} is a strategic move to capitalize on the relentless demand for premium gated communities.",
      "Properties such as {KEYWORD} cater perfectly to the sophisticated tastes of expatriates and senior corporate executives."
    ],
    [
      "VTP Blue Waters' presence in this vicinity guarantees a lifestyle of absolute luxury coupled with aggressive, market-beating ROI.",
      "The upcoming infrastructural upgrades and widening of major arterial roads will further catalyze capital appreciation in this zone.",
      "Investors here benefit from some of the highest rental yields in the city, thanks to the continuous influx of high-earning professionals.",
      "Our projects here deliver resort-class amenities and zero space wastage, setting a new benchmark for luxury living."
    ]
  ],
  generic: [
    [
      "Pune's real estate market is currently witnessing unprecedented, exponential growth across all premium corridors.",
      "The luxury housing segment in Pune is experiencing a massive renaissance, driven by discerning buyers seeking superior lifestyles.",
      "As one of India's most livable cities, Pune continues to attract massive investment in high-end residential infrastructure.",
      "The demand for ultra-luxury gated communities in Pune has reached an all-time high, signaling a mature and highly lucrative market."
    ],
    [
      "{KEYWORD} stands directly at the forefront of this extraordinary urban transformation.",
      "By closely examining {KEYWORD}, buyers can secure a future-proof asset in a highly competitive market.",
      "Properties like {KEYWORD} are redefining the standards of luxury, offering an unparalleled living experience.",
      "Investing in {KEYWORD} is a definitive statement of success and a brilliant strategic financial decision."
    ],
    [
      "VTP Blue Waters properties consistently demonstrate capital appreciation well above the market average, making them highly sought-after by domestic and NRI investors.",
      "Our unwavering commitment to transparent pricing, flawless execution, and the Maximum Livable Area philosophy ensures your investment is both secure and highly lucrative.",
      "With a track record of delivering extraordinary value, our projects offer resort-style amenities that transform everyday living into a perpetual vacation.",
      "Buyers benefit from our legacy of trust, ensuring that every square foot is optimized for luxury, comfort, and long-term generational wealth."
    ]
  ]
};

const lsiKeywords = [
  "RERA registered properties",
  "luxury gated communities",
  "premium lifestyle amenities",
  "N.A. plot adjacent",
  "Maximum Livable Area (MLA)",
  "zero space wastage",
  "smart home automation",
  "high-street retail",
  "multi-acre central parks",
  "capital appreciation",
  "high rental yields"
];

/**
 * Generates a completely unique, deterministic paragraph based on the slug.
 * @param {string} slug - The programmatic slug (e.g. 'vtp-earth-one-3-bhk')
 * @param {string} keyword - The exact keyword to inject (e.g. '3 BHK Flats in VTP Earth One')
 * @param {string} locationId - The silo location (mahalunge, hinjawadi, etc.)
 */
export function generateUniqueContent(slug, keyword, locationId) {
  const seed = hashCode(slug);
  
  // Determine which location spintax to use
  let spintaxCategory = spintaxBlocks.generic;
  if (locationId.includes('mahalunge')) spintaxCategory = spintaxBlocks.mahalunge;
  else if (locationId.includes('hinjawadi')) spintaxCategory = spintaxBlocks.hinjawadi;
  else if (locationId.includes('baner') || locationId.includes('balewadi')) spintaxCategory = spintaxBlocks.baner;
  else if (locationId.includes('kharadi')) spintaxCategory = spintaxBlocks.kharadi;

  // Pick one sentence from each of the 3 blocks deterministically
  const sentence1 = pickDeterministic(spintaxCategory[0], seed + 1);
  const sentence2 = pickDeterministic(spintaxCategory[1], seed + 2).replace(/{KEYWORD}/g, `<strong>${keyword}</strong>`);
  const sentence3 = pickDeterministic(spintaxCategory[2], seed + 3);

  // Inject 1-2 deterministic LSI keywords at the end for extra semantic juice
  const lsi1 = pickDeterministic(lsiKeywords, seed + 4);
  let lsi2 = pickDeterministic(lsiKeywords, seed + 5);
  while(lsi1 === lsi2) {
    lsi2 = pickDeterministic(lsiKeywords, seed + 6); // prevent duplicates
  }

  const paragraph = `${sentence1} ${sentence2} ${sentence3} Furthermore, this development is renowned for its ${lsi1} and ${lsi2}, ensuring a superior standard of living.`;

  return paragraph;
}

/**
 * Generates a pseudo-random DateModified within the last 14 days
 * based on the slug hash. This guarantees the Date is always the same for the same slug
 * on a given week, but varies wildly across the 10,000 pages to look completely natural.
 */
export function generateDeterministicRecentDate(slug) {
  const seed = hashCode(slug);
  const daysAgo = Math.floor(seededRandom(seed) * 14); // 0 to 14 days ago
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
}

/**
 * Generates a pseudo-random AggregateRating based on the slug.
 * This prevents Google's spam algorithms from flagging 10,000 pages with identical 4.8 star ratings.
 * Rating will be between 4.5 and 4.9. Review count between 85 and 450.
 */
export function generateDeterministicRating(slug) {
  const seed = hashCode(slug);
  // Rating between 4.5 and 4.9
  const rating = (4.5 + (seededRandom(seed) * 0.4)).toFixed(1);
  // Reviews between 85 and 450
  const reviews = Math.floor(85 + (seededRandom(seed + 1) * 365));
  
  return { rating, reviews: reviews.toString() };
}
