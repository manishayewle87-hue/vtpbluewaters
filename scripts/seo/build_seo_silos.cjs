const fs = require('fs');
const path = require('path');

// ─────────────────────────────────────────────────────────────────────────────
// 1. COMPLETE VTP REALTY PROJECTS REPOSITORY (44 Projects)
// ─────────────────────────────────────────────────────────────────────────────
const projects = [
  // ── Hinjewadi / Mahalunge (Township Blue Waters & West Corridor) ──────────
  {
    name: "VTP Monarque",
    slug: "vtp-monarque",
    location: "Hinjewadi Phase 1",
    zone: "West Pune",
    bhks: ["2 BHK", "3 BHK", "4 BHK", "Duplex", "Mansion"],
    rera: "P52100077322 / P52100079440",
    possession: "2028",
    priceStarting: "85 Lakhs",
    highlights: "Dual luxury clubhouses, infinity edge pool, adjacent to Rajiv Gandhi Infotech Park Phase 1."
  },
  {
    name: "VTP Volare",
    slug: "vtp-volare",
    location: "Hinjewadi Phase 1",
    zone: "West Pune",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100078491",
    possession: "2028",
    priceStarting: "78 Lakhs",
    highlights: "Zero commute luxury living in Hinjewadi Phase 1 with podium lifestyle amenities."
  },
  {
    name: "VTP High Flyers",
    slug: "vtp-high-flyers",
    location: "Hinjewadi Phase 1",
    zone: "West Pune",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100053912",
    possession: "2027",
    priceStarting: "75 Lakhs",
    highlights: "Modern high-rise residential towers designed for ambitious tech professionals."
  },
  {
    name: "VTP Bellissimo",
    slug: "vtp-bellissimo",
    location: "Hinjewadi Phase 1",
    zone: "West Pune",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100033839",
    possession: "2026",
    priceStarting: "82 Lakhs",
    highlights: "Italian-themed luxury apartments with 33+ lifestyle amenities in Hinjewadi."
  },
  {
    name: "VTP Earth One",
    slug: "vtp-earth-one",
    location: "Mahalunge",
    zone: "West Pune",
    bhks: ["2 BHK", "3 BHK", "4 BHK", "Simplex", "Duplex"],
    rera: "P52100048489 / P52100051025",
    possession: "2026-2027",
    priceStarting: "80 Lakhs",
    highlights: "Flagship 200+ acre Township Blue Waters riverside development with MLA architecture."
  },
  {
    name: "VTP Blue Waters",
    slug: "vtp-blue-waters",
    location: "Mahalunge",
    zone: "West Pune",
    bhks: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Villas"],
    rera: "P52100026772",
    possession: "Ready & Under Construction",
    priceStarting: "58 Lakhs",
    highlights: "West Pune's most iconic 200+ acre master-planned mega township on the Mula-Mutha river."
  },
  {
    name: "VTP Bel Air",
    slug: "vtp-bel-air",
    location: "Mahalunge",
    zone: "West Pune",
    bhks: ["1 BHK", "2 BHK", "3 BHK"],
    rera: "P52100020326",
    possession: "Ready to Move",
    priceStarting: "55 Lakhs",
    highlights: "Delivered & ready-to-move-in luxury cluster at Township Blue Waters Mahalunge."
  },
  {
    name: "VTP Leonara",
    slug: "vtp-leonara",
    location: "Mahalunge",
    zone: "West Pune",
    bhks: ["1 BHK", "2 BHK", "3 BHK"],
    rera: "P52100019956",
    possession: "Ready to Move",
    priceStarting: "56 Lakhs",
    highlights: "Premier residential towers with grand clubhouse and riverfront views in Mahalunge."
  },
  {
    name: "VTP Alpine",
    slug: "vtp-alpine",
    location: "Mahalunge",
    zone: "West Pune",
    bhks: ["2 BHK", "3 BHK", "4 BHK"],
    rera: "P52100020325",
    possession: "Ready to Move",
    priceStarting: "72 Lakhs",
    highlights: "Scenic hill and river views within VTP Blue Waters with high rental demand."
  },
  {
    name: "VTP Aethereus",
    slug: "vtp-aethereus",
    location: "Mahalunge",
    zone: "West Pune",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100026772",
    possession: "Ready to Move",
    priceStarting: "76 Lakhs",
    highlights: "Ultra-luxury high-rise residences with panoramic views of the Mahalunge biodiversity corridor."
  },

  // ── Kharadi & East Pune (Township Pegasus & IT Corridor) ───────────────────
  {
    name: "VTP Euphoria",
    slug: "vtp-euphoria",
    location: "Kharadi",
    zone: "East Pune",
    bhks: ["1 BHK", "2 BHK", "3 BHK"],
    rera: "P52100048447",
    possession: "2027",
    priceStarting: "65 Lakhs",
    highlights: "East Pune's largest luxury cluster with over 3 acres of amenities in New Kharadi."
  },
  {
    name: "VTP Flamante",
    slug: "vtp-flamante",
    location: "Kharadi",
    zone: "East Pune",
    bhks: ["2 BHK", "3 BHK", "4 BHK"],
    rera: "P52100051859",
    possession: "2027",
    priceStarting: "92 Lakhs",
    highlights: "Luxe air-conditioned residences with glass-facade aesthetics in Kharadi."
  },
  {
    name: "VTP Dolce Vita",
    slug: "vtp-dolce-vita",
    location: "Kharadi",
    zone: "East Pune",
    bhks: ["1 BHK", "2 BHK", "3 BHK"],
    rera: "P52100053911",
    possession: "2027",
    priceStarting: "68 Lakhs",
    highlights: "Contemporary lifestyle homes next to EON IT Park and World Trade Center Kharadi."
  },
  {
    name: "VTP Pegasus",
    slug: "vtp-pegasus",
    location: "New Kharadi",
    zone: "East Pune",
    bhks: ["1 BHK", "2 BHK", "3 BHK", "Villas"],
    rera: "P52100030686",
    possession: "Ready & Under Construction",
    priceStarting: "62 Lakhs",
    highlights: "100+ acre mega integrated township in East Pune with high-street commercial zone."
  },
  {
    name: "VTP Velvet Villas",
    slug: "vtp-velvet-villas",
    location: "Kharadi",
    zone: "East Pune",
    bhks: ["3 BHK", "5 BHK", "Luxury Villa"],
    rera: "P52100033838",
    possession: "2026",
    priceStarting: "2.85 Crores",
    highlights: "Exclusive gated villa enclave with private elevators, plunge pools, and landscaped lawns."
  },
  {
    name: "VTP Cygnus",
    slug: "vtp-cygnus",
    location: "Kharadi",
    zone: "East Pune",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100030686",
    possession: "2026",
    priceStarting: "78 Lakhs",
    highlights: "Ultra-efficient MLA layout residences within Township Pegasus New Kharadi."
  },
  {
    name: "VTP Altair",
    slug: "vtp-altair",
    location: "Kharadi",
    zone: "East Pune",
    bhks: ["3 BHK"],
    rera: "P52100030687",
    possession: "2026",
    priceStarting: "1.15 Crores",
    highlights: "Premium high-altitude towers with 3-tier wellness and sports facilities."
  },
  {
    name: "VTP Aurelia",
    slug: "vtp-aurelia",
    location: "New Kharadi",
    zone: "East Pune",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100054321",
    possession: "2027",
    priceStarting: "84 Lakhs",
    highlights: "Smart-automated residences with zero space wastage near riverside promenade."
  },
  {
    name: "VTP Altamira",
    slug: "vtp-altamira",
    location: "Kharadi",
    zone: "East Pune",
    bhks: ["3 BHK", "4 BHK"],
    rera: "P52100079807",
    possession: "2028",
    priceStarting: "1.45 Crores",
    highlights: "Ultra-luxury high-rise residences with cascading waterfall entrance and 40+ amenities."
  },
  {
    name: "VTP One",
    slug: "vtp-one",
    location: "Kharadi",
    zone: "East Pune",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100030688",
    possession: "2026",
    priceStarting: "79 Lakhs",
    highlights: "Boutique luxury residences positioned close to major IT SEZs and commercial hubs."
  },
  {
    name: "VTP Purvanchal",
    slug: "vtp-purvanchal",
    location: "Wagholi",
    zone: "East Pune",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100020321",
    possession: "Ready to Move",
    priceStarting: "62 Lakhs",
    highlights: "Large-scale township living with 30+ amenities near EON IT Park."
  },

  // ── Bavdhan, Baner, Sus & West Corridors ──────────────────────────────────
  {
    name: "VTP Cielo",
    slug: "vtp-cielo",
    location: "Bavdhan",
    zone: "West Pune",
    bhks: ["2 BHK", "3 BHK", "4 BHK"],
    rera: "P52100052414",
    possession: "2027",
    priceStarting: "95 Lakhs",
    highlights: "Scenic hill-facing luxury apartments in Bavdhan with seamless Kothrud connectivity."
  },
  {
    name: "VTP NatureScape",
    slug: "vtp-naturescape",
    location: "Bavdhan",
    zone: "West Pune",
    bhks: ["2 BHK", "3 BHK", "4 BHK"],
    rera: "P52100055234",
    possession: "2028",
    priceStarting: "1.05 Crores",
    highlights: "Biophilic architectural design surrounded by pristine NDA forest greens in West Bavdhan."
  },
  {
    name: "VTP Sierra",
    slug: "vtp-sierra",
    location: "Baner-Sus",
    zone: "West Pune",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100030689",
    possession: "2026",
    priceStarting: "88 Lakhs",
    highlights: "Modern high-rise residential project with 360-degree hill and city views."
  },
  {
    name: "VTP Verve",
    slug: "vtp-verve",
    location: "Baner-Sus",
    zone: "West Pune",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100030690",
    possession: "2026",
    priceStarting: "86 Lakhs",
    highlights: "Urban lifestyle community with zero-brokerage direct developer pricing."
  },
  {
    name: "VTP Magnum Opus",
    slug: "vtp-magnum-opus",
    location: "Baner Next",
    zone: "West Pune",
    bhks: ["2 BHK", "3 BHK", "4 BHK"],
    rera: "P52100030691",
    possession: "2027",
    priceStarting: "1.20 Crores",
    highlights: "Monumental architectural design delivering maximum usable carpet area in Baner."
  },
  {
    name: "VTP Solitaire",
    slug: "vtp-solitaire",
    location: "Baner-Pashan",
    zone: "West Pune",
    bhks: ["2 BHK", "3 BHK", "4 BHK"],
    rera: "P52100020324",
    possession: "Ready to Move",
    priceStarting: "98 Lakhs",
    highlights: "Exclusive boutique residences nestled between Baner and Pashan hill reserves."
  },
  {
    name: "VTP HiLife",
    slug: "vtp-hilife",
    location: "Wakad",
    zone: "West Pune",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100020323",
    possession: "Ready to Move",
    priceStarting: "75 Lakhs",
    highlights: "Iconic completed high-rise community near Dange Chowk and Mumbai-Pune Expressway."
  },

  // ── South & South-East Pune (NIBM, Undri, Hadapsar, Kondhwa) ──────────────
  {
    name: "VTP Celesta",
    slug: "vtp-celesta",
    location: "NIBM Road",
    zone: "South Pune",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100020322",
    possession: "Ready to Move",
    priceStarting: "82 Lakhs",
    highlights: "South Pune's premier gated community with panoramic views of the NIBM reserve."
  },
  {
    name: "VTP The Landmark",
    slug: "vtp-the-landmark",
    location: "Undri",
    zone: "South Pune",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100020320",
    possession: "Ready to Move",
    priceStarting: "60 Lakhs",
    highlights: "Spacious family apartments near Pune's top international schools in Undri."
  },
  {
    name: "VTP Urban Nest",
    slug: "vtp-urban-nest",
    location: "Undri",
    zone: "South Pune",
    bhks: ["1.5 BHK", "2 BHK", "3 BHK"],
    rera: "P52100018274",
    possession: "Ready to Move",
    priceStarting: "48 Lakhs",
    highlights: "Integrated luxury residential community with school and shopping access."
  },
  {
    name: "VTP Urban Soul",
    slug: "vtp-urban-soul",
    location: "Kharadi",
    zone: "East Pune",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100018275",
    possession: "Ready to Move",
    priceStarting: "68 Lakhs",
    highlights: "Urban residences with high rental yields in Pune's major IT corridor."
  },
  {
    name: "VTP Urban Rise",
    slug: "vtp-urban-rise",
    location: "Pisoli",
    zone: "South Pune",
    bhks: ["1 BHK", "2 BHK", "3 BHK"],
    rera: "P52100018276",
    possession: "Ready to Move",
    priceStarting: "42 Lakhs",
    highlights: "Affordable luxury apartments with full clubhouse amenities in South Pune."
  },
  {
    name: "VTP Urban Balance",
    slug: "vtp-urban-balance",
    location: "Hadapsar",
    zone: "East Pune",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100018277",
    possession: "Ready to Move",
    priceStarting: "64 Lakhs",
    highlights: "Close to Magarpatta City and SP Infocity with zero commute friction."
  },
  {
    name: "VTP Urban Space",
    slug: "vtp-urban-space",
    location: "NIBM",
    zone: "South Pune",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100018278",
    possession: "Ready to Move",
    priceStarting: "85 Lakhs",
    highlights: "Refined aesthetic living spaces in the elite NIBM green corridor."
  },
  {
    name: "VTP Urban Nirvana",
    slug: "vtp-urban-nirvana",
    location: "Kondhwa-Pisoli",
    zone: "South Pune",
    bhks: ["1 BHK", "2 BHK", "3 BHK"],
    rera: "P52100018279",
    possession: "Ready to Move",
    priceStarting: "45 Lakhs",
    highlights: "Peaceful gated residential community with round-the-clock security."
  },
  {
    name: "VTP Urban Life",
    slug: "vtp-urban-life",
    location: "Talegaon",
    zone: "North Pune",
    bhks: ["1 BHK", "2 BHK", "3 BHK"],
    rera: "P52100018273",
    possession: "Ready to Move",
    priceStarting: "38 Lakhs",
    highlights: "Clean air and scenic hillside living in Talegaon with industrial corridor access."
  },

  // ── Commercial, Retail & Grade-A Workspaces ──────────────────────────────
  {
    name: "VTP Altitude",
    slug: "vtp-altitude",
    location: "Wakad",
    zone: "West Pune",
    bhks: ["Commercial Office", "Retail Shop", "Showroom"],
    rera: "P52100030692",
    possession: "2026",
    priceStarting: "45 Lakhs",
    highlights: "Grade-A commercial workspace towers with rooftop amenities in Wakad."
  },
  {
    name: "VTP Trade Park",
    slug: "vtp-trade-park",
    location: "Undri",
    zone: "South Pune",
    bhks: ["Commercial Space", "Retail Shop", "Office"],
    rera: "P52100030693",
    possession: "Ready to Move",
    priceStarting: "35 Lakhs",
    highlights: "High-street retail and commercial business hub in South Pune."
  },
  {
    name: "VTP Town Square",
    slug: "vtp-town-square",
    location: "Mahalunge",
    zone: "West Pune",
    bhks: ["Retail Shop", "Showroom", "Office"],
    rera: "P52100030694",
    possession: "2026",
    priceStarting: "50 Lakhs",
    highlights: "600m high-street commercial boulevard within Township Blue Waters."
  },
  {
    name: "VTP KP Square",
    slug: "vtp-kp-square",
    location: "Chinchwad",
    zone: "PCMC",
    bhks: ["Retail Space", "Office Suite"],
    rera: "P52100030695",
    possession: "Ready to Move",
    priceStarting: "40 Lakhs",
    highlights: "Central commercial business center with high pedestrian footfall."
  },
  {
    name: "VTP Marketplace",
    slug: "vtp-marketplace",
    location: "Undri",
    zone: "South Pune",
    bhks: ["High Street Retail", "Boutique Office"],
    rera: "P52100030696",
    possession: "Ready to Move",
    priceStarting: "32 Lakhs",
    highlights: "Daily convenience and luxury retail center serving 5000+ resident families."
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. COMPLETE PUNE MICRO-MARKETS (32 Corridors)
// ─────────────────────────────────────────────────────────────────────────────
const microMarkets = [
  // West Pune
  { name: "Hinjewadi", slug: "hinjewadi", zone: "West Pune", landmark: "Rajiv Gandhi Infotech Park" },
  { name: "Mahalunge", slug: "mahalunge", zone: "West Pune", landmark: "Township Blue Waters & Mula River" },
  { name: "Baner", slug: "baner", zone: "West Pune", landmark: "Balewadi High Street" },
  { name: "Balewadi", slug: "balewadi", zone: "West Pune", landmark: "Balewadi Sports Complex" },
  { name: "Baner Sus Road", slug: "baner-sus", zone: "West Pune", landmark: "Sus Valley & Baner Hills" },
  { name: "Wakad", slug: "wakad", zone: "West Pune", landmark: "Dange Chowk & Mumbai Highway" },
  { name: "Bavdhan", slug: "bavdhan", zone: "West Pune", landmark: "Chandni Chowk & NDA Forest" },
  { name: "Pashan", slug: "pashan", zone: "West Pune", landmark: "Pashan Lake & IISER" },
  { name: "Aundh", slug: "aundh", zone: "West Pune", landmark: "Westend Mall & University" },
  { name: "Kothrud", slug: "kothrud", zone: "West Pune", landmark: "Paud Road & Karve Road" },
  { name: "Punawale", slug: "punawale", zone: "West Pune", landmark: "Expressway Connector" },
  { name: "Tathawade", slug: "tathawade", zone: "West Pune", landmark: "JSPM & Hinjewadi Phase 3" },
  { name: "Bhugaon", slug: "bhugaon", zone: "West Pune", landmark: "Manas Lake & Kothrud Next" },
  { name: "Pirangut", slug: "pirangut", zone: "West Pune", landmark: "Paud Road MIDC Corridor" },

  // East Pune
  { name: "Kharadi", slug: "kharadi", zone: "East Pune", landmark: "EON Free Zone & World Trade Center" },
  { name: "New Kharadi", slug: "new-kharadi", zone: "East Pune", landmark: "Township Pegasus & Riverside Promenade" },
  { name: "Wagholi", slug: "wagholi", zone: "East Pune", landmark: "Nagar Road & Decathlon" },
  { name: "Viman Nagar", slug: "viman-nagar", zone: "East Pune", landmark: "Phoenix Marketcity & Airport" },
  { name: "Kalyani Nagar", slug: "kalyani-nagar", zone: "East Pune", landmark: "Bishop's School & Trump Towers" },
  { name: "Keshavnagar Mundhwa", slug: "keshavnagar-mundhwa", zone: "East Pune", landmark: "Mundhwa Flyover & Magarpatta Road" },
  { name: "Hadapsar", slug: "hadapsar", zone: "East Pune", landmark: "Magarpatta Cybercity & SP Infocity" },
  { name: "Manjari", slug: "manjari", zone: "East Pune", landmark: "Serum Institute & Solapur Highway" },
  { name: "Yerawada", slug: "yerawada", zone: "East Pune", landmark: "Commerzone & Golf Course" },
  { name: "Dhanori Lohegaon", slug: "dhanori-lohegaon", zone: "East Pune", landmark: "Pune International Airport" },

  // South Pune
  { name: "NIBM Road", slug: "nibm-road", zone: "South Pune", landmark: "NIBM Reserve & Corinthian Club" },
  { name: "Undri", slug: "undri", zone: "South Pune", landmark: "Bishop's Undri & Euro School" },
  { name: "Kondhwa", slug: "kondhwa", zone: "South Pune", landmark: "Salunke Vihar & Lullanagar" },
  { name: "Pisoli", slug: "pisoli", zone: "South Pune", landmark: "South Pune Growth Corridor" },
  { name: "Wanowrie", slug: "wanowrie", zone: "South Pune", landmark: "Command Hospital & Kedari Ground" },

  // PCMC & North Pune
  { name: "Pimple Saudagar", slug: "pimple-saudagar", zone: "PCMC", landmark: "Linear Garden & Kunal Icon Road" },
  { name: "Ravet", slug: "ravet", zone: "PCMC", landmark: "Mumbai-Pune Expressway Gateway" },
  { name: "Moshi", slug: "moshi", zone: "PCMC", landmark: "Pune International Exhibition Center" },
  { name: "Chakan", slug: "chakan", zone: "PCMC", landmark: "Automobile Hub & MIDC" },
  { name: "Talegaon", slug: "talegaon", zone: "PCMC", landmark: "Clean Air Eco Zone & Highway" }
];

// Helper slugify
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. SILO GENERATION ENGINE
// ─────────────────────────────────────────────────────────────────────────────
const generatedSilos = [];

// Silo 1: Master Brand & High-Intent Developer Portfolio
generatedSilos.push({
  id: "vtp-brand-master",
  title: "VTP Realty Pune - Official Brand & Master Portfolio",
  description: "Explore all official residential and commercial projects by VTP Realty across Pune with authentic MahaRERA registrations, direct sales booking, Maximum Livable Area (MLA) designs, and transparent cost sheets.",
  slugs: [
    { slug: "vtp-realty-pune", keyword: "VTP Realty Pune" },
    { slug: "vtp-projects-pune", keyword: "VTP Projects Pune" },
    { slug: "vtp-properties-pune", keyword: "VTP Properties Pune" },
    { slug: "vtp-new-launch-projects-pune", keyword: "VTP New Launch Projects Pune" },
    { slug: "vtp-pre-launch-offers-pune", keyword: "VTP Pre Launch Offers Pune" },
    { slug: "vtp-luxury-apartments-pune", keyword: "VTP Luxury Apartments Pune" },
    { slug: "vtp-townships-pune", keyword: "VTP Townships Pune" },
    { slug: "vtp-realty-price-list-pune", keyword: "VTP Realty Price List Pune" },
    { slug: "vtp-cost-sheet-all-inclusive", keyword: "VTP Cost Sheet All Inclusive" },
    { slug: "vtp-booking-online-pune", keyword: "VTP Booking Online Pune" },
    { slug: "vtp-direct-developer-booking", keyword: "VTP Direct Developer Booking" },
    { slug: "vtp-site-visit-appointment", keyword: "VTP Site Visit Appointment" },
    { slug: "vtp-maharera-numbers-list", keyword: "VTP MahaRERA Numbers List" },
    { slug: "vtp-realty-customer-reviews", keyword: "VTP Realty Customer Reviews" },
    { slug: "best-vtp-project-for-investment-pune", keyword: "Best VTP Project for Investment Pune" },
    { slug: "vtp-property-near-me-pune", keyword: "VTP Property Near Me Pune" },
    { slug: "vtp-sales-office-contact-number", keyword: "VTP Sales Office Contact Number" },
    { slug: "vtp-head-office-pune-address", keyword: "VTP Head Office Pune Address" },
    { slug: "vtp-mla-philosophy-maximum-livable-area", keyword: "VTP MLA Philosophy Maximum Livable Area" },
    { slug: "vtp-realty-construction-quality-ratings", keyword: "VTP Realty Construction Quality Ratings" },
    { slug: "vtp-realty-awards-and-recognition", keyword: "VTP Realty Awards and Recognition" },
    { slug: "vtp-realty-careers-channel-partner", keyword: "VTP Realty Channel Partner Registration" },
    { slug: "vtp-group-infrastructure-legacy-pune", keyword: "VTP Group Infrastructure Legacy Pune" }
  ]
});

// Silo 2 to 45: Comprehensive Project Silos (44 Projects)
projects.forEach(p => {
  const projectSlugs = [];
  
  // 1. Core transactional, discovery, and high-intent buyer keywords
  projectSlugs.push({ slug: `${p.slug}-pune`, keyword: `${p.name} Pune` });
  projectSlugs.push({ slug: `${p.slug}-${slugify(p.location)}`, keyword: `${p.name} ${p.location}` });
  projectSlugs.push({ slug: `${p.slug}-price-list`, keyword: `${p.name} Price List` });
  projectSlugs.push({ slug: `${p.slug}-cost-sheet-all-inclusive`, keyword: `${p.name} Cost Sheet All Inclusive` });
  projectSlugs.push({ slug: `${p.slug}-floor-plan-pdf`, keyword: `${p.name} Floor Plan PDF` });
  projectSlugs.push({ slug: `${p.slug}-master-plan-layout`, keyword: `${p.name} Master Plan Layout` });
  projectSlugs.push({ slug: `${p.slug}-brochure-download`, keyword: `${p.name} Brochure Download` });
  projectSlugs.push({ slug: `${p.slug}-amenities-clubhouse`, keyword: `${p.name} Amenities & Clubhouse` });
  projectSlugs.push({ slug: `${p.slug}-location-map-connectivity`, keyword: `${p.name} Location Map & Connectivity` });
  projectSlugs.push({ slug: `${p.slug}-reviews-ratings-feedback`, keyword: `${p.name} Reviews Ratings & Feedback` });
  projectSlugs.push({ slug: `${p.slug}-possession-date-construction-status`, keyword: `${p.name} Possession Date & Construction Status` });
  projectSlugs.push({ slug: `${p.slug}-sample-flat-video-tour`, keyword: `${p.name} Sample Flat Video Tour` });
  projectSlugs.push({ slug: `${p.slug}-maharera-number-rera-certificate`, keyword: `${p.name} MahaRERA Number & Certificate` });
  projectSlugs.push({ slug: `${p.slug}-site-visit-booking-appointment`, keyword: `${p.name} Site Visit & Booking Appointment` });
  projectSlugs.push({ slug: `${p.slug}-investment-roi-rental-yield`, keyword: `${p.name} Investment ROI & Rental Yield` });
  projectSlugs.push({ slug: `buy-${p.slug}-flats-for-sale`, keyword: `Buy ${p.name} Flats for Sale` });
  projectSlugs.push({ slug: `${p.slug}-direct-developer-booking-offers`, keyword: `${p.name} Direct Developer Booking Offers` });
  projectSlugs.push({ slug: `${p.slug}-payment-plans-subvention-scheme`, keyword: `${p.name} Payment Plans & Subvention Scheme` });
  projectSlugs.push({ slug: `${p.slug}-bank-loan-approval-sbi-hdfc`, keyword: `${p.name} Bank Loan Approval SBI HDFC` });
  projectSlugs.push({ slug: `${p.slug}-resale-flats-inventory`, keyword: `${p.name} Resale Flats & Available Inventory` });
  projectSlugs.push({ slug: `${p.slug}-ready-possession-towers`, keyword: `${p.name} Ready Possession Towers & Units` });
  projectSlugs.push({ slug: `${p.slug}-zero-brokerage-booking`, keyword: `${p.name} Zero Brokerage Direct Booking` });
  projectSlugs.push({ slug: `${p.slug}-360-virtual-tour-walkthrough`, keyword: `${p.name} 360 Virtual Tour Walkthrough` });
  projectSlugs.push({ slug: `${p.slug}-stamp-duty-registration-calculator`, keyword: `${p.name} Stamp Duty & Registration Calculator` });

  // 2. BHK-specific granular permutations
  p.bhks.forEach(bhk => {
    const bhkSlug = slugify(bhk);
    projectSlugs.push({ slug: `${p.slug}-${bhkSlug}-price`, keyword: `${p.name} ${bhk} Price` });
    projectSlugs.push({ slug: `${p.slug}-${bhkSlug}-floor-plan`, keyword: `${p.name} ${bhk} Floor Plan` });
    projectSlugs.push({ slug: `${p.slug}-${bhkSlug}-carpet-area`, keyword: `${p.name} ${bhk} Carpet Area` });
    projectSlugs.push({ slug: `${p.slug}-${bhkSlug}-sample-flat`, keyword: `${p.name} ${bhk} Sample Flat` });
    projectSlugs.push({ slug: `buy-${p.slug}-${bhkSlug}-flat`, keyword: `Buy ${p.name} ${bhk} Flat` });
    projectSlugs.push({ slug: `${p.slug}-${bhkSlug}-cost-sheet`, keyword: `${p.name} ${bhk} All Inclusive Cost Sheet` });
  });

  generatedSilos.push({
    id: `project-${p.slug}`,
    title: `${p.name} ${p.location} Pune`,
    description: `Complete verified details for ${p.name} in ${p.location}, Pune. MahaRERA: ${p.rera}. Starting price ${p.priceStarting}, expected possession ${p.possession}. Download official brochure, floor plans, and book direct site visit. ${p.highlights}`,
    slugs: projectSlugs
  });
});

// Silo: Pune Micro-Market High Intent Hubs
microMarkets.forEach(m => {
  generatedSilos.push({
    id: `market-${m.slug}`,
    title: `Real Estate & Flats in ${m.name} Pune - VTP Projects`,
    description: `Explore premium residential and commercial properties in ${m.name}, ${m.zone}, Pune near ${m.landmark}. Discover VTP Realty luxury townships with Maximum Livable Area, transparent pricing, and zero brokerage.`,
    slugs: [
      { slug: `vtp-projects-in-${m.slug}`, keyword: `VTP Projects in ${m.name}` },
      { slug: `flats-for-sale-in-${m.slug}-pune`, keyword: `Flats for Sale in ${m.name} Pune` },
      { slug: `luxury-apartments-in-${m.slug}-pune`, keyword: `Luxury Apartments in ${m.name} Pune` },
      { slug: `new-residential-projects-in-${m.slug}-pune`, keyword: `New Residential Projects in ${m.name} Pune` },
      { slug: `2-bhk-flats-in-${m.slug}-pune-price`, keyword: `2 BHK Flats in ${m.name} Pune Price` },
      { slug: `3-bhk-flats-in-${m.slug}-pune-price`, keyword: `3 BHK Flats in ${m.name} Pune Price` },
      { slug: `4-bhk-luxury-apartments-${m.slug}-pune`, keyword: `4 BHK Luxury Apartments in ${m.name} Pune` },
      { slug: `gated-community-townships-in-${m.slug}-pune`, keyword: `Gated Community Townships in ${m.name} Pune` },
      { slug: `under-construction-projects-${m.slug}-pune`, keyword: `Under Construction Projects in ${m.name} Pune` },
      { slug: `ready-possession-flats-${m.slug}-pune`, keyword: `Ready Possession Flats in ${m.name} Pune` },
      { slug: `property-investment-in-${m.slug}-pune-roi`, keyword: `Property Investment in ${m.name} Pune ROI` },
      { slug: `real-estate-price-trends-${m.slug}-pune`, keyword: `Real Estate Price Trends in ${m.name} Pune` },
      { slug: `top-luxury-projects-in-${m.slug}-pune`, keyword: `Top Luxury Projects in ${m.name} Pune` },
      { slug: `best-gated-community-flats-${m.slug}`, keyword: `Best Gated Community Flats in ${m.name}` },
      { slug: `vtp-new-launch-in-${m.slug}-pune`, keyword: `VTP New Launch in ${m.name} Pune` }
    ]
  });
});

// Silo: IT Parks & Major Employment Corridors
generatedSilos.push({
  id: "it-corridors-pune",
  title: "Homes Near Pune IT Parks & Commercial SEZs",
  description: "Find zero-commute luxury residences and high-rental-yield apartments near Pune's prime tech corridors including Rajiv Gandhi Infotech Park, EON IT Park, WTC Kharadi, and Magarpatta Cybercity.",
  slugs: [
    { slug: "flats-near-rajiv-gandhi-infotech-park-hinjewadi", keyword: "Flats Near Rajiv Gandhi Infotech Park Hinjewadi" },
    { slug: "flats-near-hinjewadi-phase-1-it-companies", keyword: "Flats Near Hinjewadi Phase 1 IT Companies" },
    { slug: "flats-near-hinjewadi-phase-2-wipro-infosys", keyword: "Flats Near Hinjewadi Phase 2 Wipro Infosys" },
    { slug: "flats-near-hinjewadi-phase-3-tech-zone", keyword: "Flats Near Hinjewadi Phase 3 Tech Zone" },
    { slug: "flats-near-eon-it-park-kharadi", keyword: "Flats Near EON IT Park Kharadi" },
    { slug: "flats-near-world-trade-center-wtc-kharadi", keyword: "Flats Near World Trade Center WTC Kharadi" },
    { slug: "flats-near-international-tech-park-itpp-kharadi", keyword: "Flats Near International Tech Park ITPP Kharadi" },
    { slug: "flats-near-commerzone-yerawada-kharadi", keyword: "Flats Near Commerzone Yerawada Kharadi" },
    { slug: "flats-near-magarpatta-cybercity-hadapsar", keyword: "Flats Near Magarpatta Cybercity Hadapsar" },
    { slug: "flats-near-sp-infocity-phursungi-hadapsar", keyword: "Flats Near SP Infocity Phursungi Hadapsar" },
    { slug: "flats-near-pune-metro-line-3-stations", keyword: "Flats Near Pune Metro Line 3 Stations" },
    { slug: "flats-near-mumbai-pune-expressway-gateway", keyword: "Flats Near Mumbai Pune Expressway Gateway" },
    { slug: "flats-near-pune-ring-road-corridor", keyword: "Flats Near Pune Ring Road Corridor" },
    { slug: "walk-to-work-apartments-pune-it-corridor", keyword: "Walk to Work Apartments Pune IT Corridor" }
  ]
});

// Silo: Mega Townships Ecosystem
generatedSilos.push({
  id: "township-living-pune",
  title: "VTP Mega Integrated Townships in Pune",
  description: "Experience 100+ to 200+ acre master-planned mega integrated townships in Pune by VTP Realty. Riverfront living, high-street shopping, international sports academies, and MLA architecture.",
  slugs: [
    { slug: "vtp-blue-waters-township-mahalunge-hinjewadi", keyword: "VTP Blue Waters Township Mahalunge Hinjewadi" },
    { slug: "township-pegasus-kharadi-new-kharadi", keyword: "Township Pegasus Kharadi New Kharadi" },
    { slug: "township-skylights-baner-sus-pune", keyword: "Township Skylights Baner Sus Pune" },
    { slug: "200-acre-integrated-township-pune", keyword: "200 Acre Integrated Township Pune" },
    { slug: "riverfront-luxury-apartments-pune", keyword: "Riverfront Luxury Apartments Pune" },
    { slug: "township-apartments-with-sports-academy-pune", keyword: "Township Apartments with Sports Academy Pune" },
    { slug: "high-street-retail-residential-township-pune", keyword: "High Street Retail Residential Township Pune" },
    { slug: "best-township-projects-in-pune-to-live", keyword: "Best Township Projects in Pune to Live" }
  ]
});

// Silo: Commercial, Office & High-Street Retail
generatedSilos.push({
  id: "commercial-retail-offices-pune",
  title: "VTP Commercial Offices & High-Street Retail Pune",
  description: "Invest in Grade A commercial office spaces, high-street retail shops, and pre-leased commercial assets across Wakad, Baner, Kharadi, and Hinjewadi by VTP Realty.",
  slugs: [
    { slug: "vtp-altitude-wakad-commercial-office-space", keyword: "VTP Altitude Wakad Commercial Office Space" },
    { slug: "vtp-trade-park-commercial-shops-pune", keyword: "VTP Trade Park Commercial Shops Pune" },
    { slug: "vtp-kp-square-kharadi-commercial", keyword: "VTP KP Square Kharadi Commercial" },
    { slug: "vtp-marketplace-high-street-retail-pune", keyword: "VTP Marketplace High Street Retail Pune" },
    { slug: "buy-commercial-office-space-in-wakad-pune", keyword: "Buy Commercial Office Space in Wakad Pune" },
    { slug: "pre-leased-commercial-property-pune-roi", keyword: "Pre Leased Commercial Property Pune ROI" },
    { slug: "high-street-retail-shops-for-sale-pune", keyword: "High Street Retail Shops for Sale Pune" },
    { slug: "grade-a-office-space-for-investment-pune", keyword: "Grade A Office Space for Investment Pune" }
  ]
});

// Silo: Competitor Head-to-Head Comparisons
generatedSilos.push({
  id: "competitor-comparisons",
  title: "VTP Projects vs Top Competitors Pune",
  description: "Detailed head-to-head architectural, pricing, carpet area, and location comparisons of VTP Realty projects against Godrej, Kolte Patil, Lodha, Panchshil, Paranjape, Pride, Rohan, and Gera.",
  slugs: [
    { slug: "vtp-monarque-vs-godrej-park-world", keyword: "VTP Monarque vs Godrej Park World Hinjewadi" },
    { slug: "vtp-monarque-vs-kolte-patil-life-republic", keyword: "VTP Monarque vs Kolte Patil Life Republic" },
    { slug: "vtp-volare-vs-godrej-elements", keyword: "VTP Volare vs Godrej Elements Hinjewadi" },
    { slug: "vtp-earth-one-vs-godrej-hillside", keyword: "VTP Earth One vs Godrej Hillside Mahalunge" },
    { slug: "vtp-earth-one-vs-kasturi-apostrophe", keyword: "VTP Earth One vs Kasturi Apostrophe" },
    { slug: "vtp-blue-waters-vs-paranjape-blue-ridge", keyword: "VTP Blue Waters vs Paranjape Blue Ridge Hinjewadi" },
    { slug: "vtp-euphoria-vs-godrej-infinity", keyword: "VTP Euphoria vs Godrej Infinity Keshavnagar" },
    { slug: "vtp-flamante-vs-panchshil-towers", keyword: "VTP Flamante vs Panchshil Towers Kharadi" },
    { slug: "vtp-dolce-vita-vs-gera-world-of-joy", keyword: "VTP Dolce Vita vs Gera World of Joy Kharadi" },
    { slug: "vtp-velvet-villas-vs-lodha-belmondo", keyword: "VTP Velvet Villas vs Lodha Belmondo Villas" },
    { slug: "vtp-cielo-vs-rohan-ekam", keyword: "VTP Cielo vs Rohan Ekam Bavdhan" },
    { slug: "vtp-naturescape-vs-kolte-patil-24k", keyword: "VTP NatureScape vs Kolte Patil 24K Glamore" },
    { slug: "vtp-sierra-vs-pride-world-city", keyword: "VTP Sierra vs Pride World City" },
    { slug: "vtp-vs-godrej-properties-pune-comparison", keyword: "VTP vs Godrej Properties Pune Comparison" },
    { slug: "vtp-vs-kolte-patil-pune", keyword: "VTP vs Kolte Patil Pune" },
    { slug: "vtp-vs-lodha-pune", keyword: "VTP vs Lodha Pune" },
    { slug: "vtp-vs-amanora-pune", keyword: "VTP vs Amanora Pune" },
    { slug: "vtp-vs-shapoorji-pallonji-pune", keyword: "VTP vs Shapoorji Pallonji Pune" },
    { slug: "vtp-vs-kohinoor-group-pune", keyword: "VTP vs Kohinoor Group Pune" },
    { slug: "vtp-vs-rohan-builders-pune", keyword: "VTP vs Rohan Builders Pune" },
    { slug: "vtp-vs-gera-developments-pune", keyword: "VTP vs Gera Developments Pune" }
  ]
});

// Silo: Budget & Luxury Configurations
generatedSilos.push({
  id: "configurations-pricing-hub",
  title: "VTP Flats by Budget & Configuration in Pune",
  description: "Browse 1 BHK, 2 BHK, 3 BHK, 4 BHK, 5 BHK Sky Villas, Duplexes, and Luxury Penthouses across East and West Pune categorized by transparent budget brackets.",
  slugs: [
    { slug: "1-bhk-luxury-flats-pune-vtp", keyword: "1 BHK Luxury Flats Pune VTP" },
    { slug: "2-bhk-flats-in-pune-under-80-lakhs", keyword: "2 BHK Flats in Pune Under 80 Lakhs" },
    { slug: "2-bhk-luxury-flats-in-pune-under-1-crore", keyword: "2 BHK Luxury Flats in Pune Under 1 Crore" },
    { slug: "3-bhk-premium-flats-in-pune-under-1-5-crore", keyword: "3 BHK Premium Flats in Pune Under 1.5 Crore" },
    { slug: "3-bhk-luxury-apartments-pune-hinjewadi-kharadi", keyword: "3 BHK Luxury Apartments Pune Hinjewadi Kharadi" },
    { slug: "4-bhk-ultra-luxury-apartments-pune", keyword: "4 BHK Ultra Luxury Apartments Pune" },
    { slug: "5-bhk-penthouse-and-duplex-pune", keyword: "5 BHK Penthouse and Duplex Pune" },
    { slug: "gated-community-luxury-villas-pune", keyword: "Gated Community Luxury Villas Pune" },
    { slug: "simplex-duplex-mansions-pune-vtp", keyword: "Simplex Duplex Mansions Pune VTP" },
    { slug: "sky-villas-with-private-terrace-pune", keyword: "Sky Villas with Private Terrace Pune" },
    { slug: "commercial-retail-shops-office-space-pune-vtp", keyword: "Commercial Retail Shops & Office Space Pune VTP" }
  ]
});

// Silo: Investor, NRI & Financial Hub
generatedSilos.push({
  id: "investor-nri-finance",
  title: "NRI & Investor Real Estate Guide Pune - VTP Realty",
  description: "Comprehensive financial, rental yield, and capital appreciation intelligence for NRI and domestic investors looking to maximize ROI in Pune real estate.",
  slugs: [
    { slug: "nri-real-estate-investment-guide-pune", keyword: "NRI Real Estate Investment Guide Pune" },
    { slug: "high-rental-yield-properties-in-pune-it-corridor", keyword: "High Rental Yield Properties in Pune IT Corridor" },
    { slug: "real-estate-capital-appreciation-mahalunge-vs-kharadi", keyword: "Real Estate Capital Appreciation Mahalunge vs Kharadi" },
    { slug: "best-pre-launch-investment-projects-pune", keyword: "Best Pre Launch Investment Projects Pune" },
    { slug: "commercial-real-estate-investment-pune-vtp", keyword: "Commercial Real Estate Investment Pune VTP" },
    { slug: "vtp-realty-stamp-duty-gst-registration-offers", keyword: "VTP Realty Stamp Duty GST Registration Offers" },
    { slug: "home-loan-interest-rates-and-emi-calculator-vtp", keyword: "Home Loan Interest Rates and EMI Calculator VTP" },
    { slug: "tax-benefits-on-property-investment-section-54f-pune", keyword: "Tax Benefits on Property Investment Section 54F Pune" },
    { slug: "nri-dubai-usa-singapore-pune-property-investment", keyword: "NRI Dubai USA Singapore Pune Property Investment" },
    { slug: "fema-guidelines-for-nri-property-purchase-in-pune", keyword: "FEMA Guidelines for NRI Property Purchase in Pune" }
  ]
});

// Silo: Multilingual & Conversational Voice Search
generatedSilos.push({
  id: "multilingual-voice-search-hub",
  title: "VTP Realty Pune - Multilingual & Conversational Search Hub",
  description: "पुणे, हिंजवडी, महाळुंगे, आणि खाराडी मधील व्हीटीपी प्रोजेक्ट्सची संपूर्ण माहिती - किंमत, बुकिंग, व साईट व्हिजिट. Pune real estate voice and conversational search in Hindi, Marathi, and English.",
  slugs: [
    // Hindi / Hinglish High Intent
    { slug: "pune-mein-flat-kharidna-hai-vtp", keyword: "Pune Mein Flat Kharidna Hai VTP" },
    { slug: "hinjewadi-mein-2-bhk-flat-ki-keemat", keyword: "Hinjewadi Mein 2 BHK Flat Ki Keemat" },
    { slug: "kharadi-mein-vtp-project-kaunsa-accha-hai", keyword: "Kharadi Mein VTP Project Kaunsa Accha Hai" },
    { slug: "vtp-earth-one-sample-flat-video-kaise-dekhe", keyword: "VTP Earth One Sample Flat Video Kaise Dekhe" },
    { slug: "pune-it-park-ke-paas-flat-price", keyword: "Pune IT Park Ke Paas Flat Price" },
    { slug: "vtp-flat-direct-booking-discount-offers", keyword: "VTP Flat Direct Booking Discount Offers" },
    { slug: "vtp-monarque-possession-date-kya-hai", keyword: "VTP Monarque Possession Date Kya Hai" },
    { slug: "pune-mein-rera-approved-best-township", keyword: "Pune Mein RERA Approved Best Township" },
    { slug: "vtp-blue-waters-me-flat-ka-price-kitna-hai", keyword: "VTP Blue Waters Me Flat Ka Price Kitna Hai" },

    // Marathi High Intent
    { slug: "vtp-realty-pune-marathi-mahiti", keyword: "व्हीटीपी रिअल्टी पुणे माहिती" },
    { slug: "hinjewadi-vtp-flat-price-marathi", keyword: "हिंजवडी व्हीटीपी फ्लॅट किंमत" },
    { slug: "kharadi-vtp-residential-projects-marathi", keyword: "खाराडी व्हीटीपी गृहप्रकल्प" },
    { slug: "mahalunge-blue-waters-township-marathi", keyword: "महाळुंगे ब्लू वॉटर्स टाऊनशिप" },
    { slug: "pune-property-guntavnuk-top-projects", keyword: "पुणे प्रॉपर्टी गुंतवणूक टॉप प्रोजेक्ट्स" },
    { slug: "vtp-flat-booking-offers-marathi", keyword: "व्हीटीपी फ्लॅट बुकिंग ऑफर्स" },
    { slug: "vtp-cielo-bavdhan-marathi-review", keyword: "व्हीटीपी सिएलो बावधन रिव्ह्यू" },
    { slug: "pune-madhe-ghar-ghyanyasathi-uttam-project", keyword: "पुणे मध्ये घर घेण्यासाठी उत्तम प्रोजेक्ट" },
    { slug: "vtp-earth-one-mahalunge-marathi-mahiti", keyword: "व्हीटीपी अर्थ वन महाळुंगे माहिती" }
  ]
});

// Calculate statistics
const totalKeywords = generatedSilos.reduce((acc, s) => acc + s.slugs.length, 0);
console.log(`================================================================`);
console.log(`🚀 ULTRA ADVANCED VTP REALTY SEO UNIVERSE GENERATOR`);
console.log(`================================================================`);
console.log(`Total Silos Generated   : ${generatedSilos.length}`);
console.log(`Total Target Keywords   : ${totalKeywords}`);
console.log(`Projects Covered        : ${projects.length}`);
console.log(`Micro-Markets Covered   : ${microMarkets.length}`);

// Write out to app/data/seo-silos.js
const targetFile = path.join(__dirname, '../../app/data/seo-silos.js');
const outputContent = `/**
 * VTP Realty Master SEO Universe
 * Auto-generated by scripts/seo/build_seo_silos.cjs
 * Contains ${generatedSilos.length} silos and ${totalKeywords} hardened target keywords.
 */
export const seoSilos = ${JSON.stringify(generatedSilos, null, 2)};
`;

fs.writeFileSync(targetFile, outputContent, 'utf-8');
console.log(`✅ Successfully written to ${targetFile}`);
console.log(`================================================================`);
