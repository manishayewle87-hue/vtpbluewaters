import { cms } from './cms';

export const PUNE_MICRO_MARKETS = [
  // West Pune
  { slug: 'baner', name: 'Baner', zone: 'West' },
  { slug: 'balewadi', name: 'Balewadi', zone: 'West' },
  { slug: 'mahalunge', name: 'Mahalunge', zone: 'West' },
  { slug: 'hinjewadi', name: 'Hinjewadi', zone: 'West' },
  { slug: 'wakad', name: 'Wakad', zone: 'West' },
  { slug: 'tathawade', name: 'Tathawade', zone: 'West' },
  { slug: 'punawale', name: 'Punawale', zone: 'West' },
  { slug: 'bavdhan', name: 'Bavdhan', zone: 'West' },
  { slug: 'sus', name: 'Sus', zone: 'West' },
  { slug: 'pashan', name: 'Pashan', zone: 'West' },
  { slug: 'aundh', name: 'Aundh', zone: 'West' },
  { slug: 'kothrud', name: 'Kothrud', zone: 'West' },
  { slug: 'bhugaon', name: 'Bhugaon', zone: 'West' },
  { slug: 'pirangut', name: 'Pirangut', zone: 'West' },

  // East Pune
  { slug: 'kharadi', name: 'Kharadi', zone: 'East' },
  { slug: 'viman-nagar', name: 'Viman Nagar', zone: 'East' },
  { slug: 'hadapsar', name: 'Hadapsar', zone: 'East' },
  { slug: 'manjari', name: 'Manjari', zone: 'East' },
  { slug: 'wagholi', name: 'Wagholi', zone: 'East' },
  { slug: 'magarpatta', name: 'Magarpatta', zone: 'East' },
  { slug: 'yerawada', name: 'Yerawada', zone: 'East' },
  { slug: 'lohegaon', name: 'Lohegaon', zone: 'East' },

  // PCMC / North
  { slug: 'moshi', name: 'Moshi', zone: 'PCMC' },
  { slug: 'ravet', name: 'Ravet', zone: 'PCMC' },
  { slug: 'kiwale', name: 'Kiwale', zone: 'PCMC' },
  { slug: 'pimpri', name: 'Pimpri', zone: 'PCMC' },
  { slug: 'chinchwad', name: 'Chinchwad', zone: 'PCMC' },
  { slug: 'nigdi', name: 'Nigdi', zone: 'PCMC' },

  // South Pune
  { slug: 'undri', name: 'Undri', zone: 'South' },
  { slug: 'kondhwa', name: 'Kondhwa', zone: 'South' }
];

// Resolves the nearest VTP projects based on the geographic zone
export const getProjectsNearLocation = async (locationSlug) => {
  const location = PUNE_MICRO_MARKETS.find(l => l.slug === locationSlug);
  if (!location) return [];

  const allProjects = await cms.getAllProjects();
  
  // Try to find exact matches first
  const exactMatches = allProjects.filter(p => p.location.toLowerCase().includes(location.name.toLowerCase()));
  if (exactMatches.length > 0) return exactMatches;

  // Proximity fallback based on Zone
  let fallbackLocations = [];
  if (location.zone === 'West') fallbackLocations = ['Mahalunge', 'Hinjawadi', 'Hinjewadi', 'Bavdhan'];
  if (location.zone === 'East') fallbackLocations = ['Kharadi'];
  if (location.zone === 'PCMC') fallbackLocations = ['Hinjawadi', 'Hinjewadi', 'Mahalunge']; // Closest hubs to PCMC
  if (location.zone === 'South') fallbackLocations = ['Kharadi']; // Closest luxury hub for South buyers

  const nearbyProjects = allProjects.filter(p => {
    return fallbackLocations.some(fallback => p.location.toLowerCase().includes(fallback.toLowerCase()));
  });

  return nearbyProjects;
};

// Procedural text generator for hyper-local SEO
export const generateLocationContent = (locationName, projects, intent = null) => {
  const isExactLocation = projects.some(p => p.location.toLowerCase().includes(locationName.toLowerCase()));
  const proximityText = isExactLocation ? `in the heart of ${locationName}` : `strategically located in proximity to ${locationName}`;
  const displayIntent = intent ? intent.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Luxury Residences';

  const content = [
    {
      type: 'h2',
      text: `Premium ${displayIntent} ${proximityText}`
    },
    {
      type: 'p',
      text: `${locationName} has emerged as one of Pune's most highly sought-after micro-markets. Characterized by rapid infrastructure development, excellent connectivity, and a thriving cosmopolitan culture, finding the perfect ${displayIntent.toLowerCase()} here is a crucial investment decision.`
    },
    {
      type: 'p',
      text: `VTP Realty, Pune's #1 real estate brand, offers a curated selection of ultra-luxury masterpieces ${proximityText}. Designed strictly on the Maximum Livable Area (MLA) philosophy, these residences ensure zero space wastage while providing resort-grade amenities.`
    },
    {
      type: 'h3',
      text: `Why Choose VTP Projects Near ${locationName}?`
    },
    {
      type: 'ul',
      items: [
        `Seamless Connectivity: Enjoy rapid access to major IT hubs, commercial centers, and upcoming infrastructure near ${locationName}.`,
        `Unmatched ROI: Properties in and around ${locationName} have historically yielded robust capital appreciation and rental returns.`,
        `Township Living: Experience 360-degree lifestyle ecosystems with vast vehicle-free zones, high-street retail, and multiple Olympic-sized pools.`
      ]
    }
  ];

  const faqs = [
    {
      q: `What are the best VTP projects near ${locationName}?`,
      a: `Some of the finest VTP luxury projects easily accessible from ${locationName} include ${projects.map(p => p.name).slice(0,3).join(', ')}.`
    },
    {
      q: `Is ${locationName} a good location for real estate investment?`,
      a: `Yes, ${locationName} and its immediate vicinity boast excellent connectivity, proximity to employment hubs, and high lifestyle quotients, making it a highly lucrative investment destination.`
    }
  ];

  return { content, faqs, isExactLocation };
};
