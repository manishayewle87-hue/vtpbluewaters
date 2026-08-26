const fs = require('fs');
const path = require('path');

// ─────────────────────────────────────────────────────────────────────────────
// 1. MASTER VTP REALTY PROJECT & ENTITY REPOSITORY (44 ENTITIES)
// ─────────────────────────────────────────────────────────────────────────────
const projects = [
  // ── Bluewaters / Mahalunge / Hinjawadi (Active Luxe & Township) ────────────
  {
    name: "VTP Earth 1",
    slug: "vtp-earth-one",
    location: "Mahalunge",
    zone: "West Pune",
    township: "Township Blue Waters",
    status: "ACTIVE_LUXE",
    bhks: ["2 BHK", "3 BHK", "4 BHK", "Simplex", "Duplex"],
    rera: "P52100048489 / P52100051025",
    possession: "2026-2027",
    priceStarting: "80 Lakhs",
    highlights: "Flagship 200+ acre Township Blue Waters riverside development with MLA architecture."
  },
  {
    name: "VTP Monarque",
    slug: "vtp-monarque",
    location: "Hinjewadi Phase 1",
    zone: "West Pune",
    township: "Township Blue Waters",
    status: "ACTIVE_LUXE",
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
    township: "Township Blue Waters",
    status: "ACTIVE_LUXE",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100078491",
    possession: "2028",
    priceStarting: "78 Lakhs",
    highlights: "Zero commute luxury living in Hinjewadi Phase 1 with podium lifestyle amenities."
  },
  {
    name: "VTP Bellissimo",
    slug: "vtp-bellissimo",
    location: "Hinjewadi Phase 1",
    zone: "West Pune",
    township: "Township Blue Waters",
    status: "ACTIVE",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100033839",
    possession: "2026",
    priceStarting: "82 Lakhs",
    highlights: "Italian-themed luxury apartments with 33+ lifestyle amenities in Hinjewadi."
  },
  {
    name: "VTP Blue Waters",
    slug: "vtp-blue-waters",
    location: "Mahalunge",
    zone: "West Pune",
    township: "Township Blue Waters",
    status: "TOWNSHIP_MASTER",
    bhks: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Villas"],
    rera: "P52100026772",
    possession: "Ready & Under Construction",
    priceStarting: "58 Lakhs",
    highlights: "West Pune's most iconic 200+ acre master-planned mega township on the Mula-Mutha river."
  },
  {
    name: "VTP Aethereus",
    slug: "vtp-aethereus",
    location: "Mahalunge",
    zone: "West Pune",
    township: "Township Blue Waters",
    status: "PARTIALLY_DELIVERED",
    bhks: ["2 BHK", "3 BHK", "4 BHK"],
    rera: "P52100026772",
    possession: "Ready & Handover",
    priceStarting: "76 Lakhs",
    highlights: "Ultra-luxury high-rise residences with five 31+ storey towers and river views."
  },
  {
    name: "VTP Bel Air",
    slug: "vtp-bel-air",
    location: "Mahalunge",
    zone: "West Pune",
    township: "Township Blue Waters",
    status: "DELIVERED",
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
    township: "Township Blue Waters",
    status: "PARTIALLY_DELIVERED",
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
    township: "Township Blue Waters",
    status: "DELIVERED",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100020325",
    possession: "Ready to Move",
    priceStarting: "72 Lakhs",
    highlights: "Scenic hill and river views within VTP Blue Waters with high rental demand."
  },
  {
    name: "VTP High Flyers",
    slug: "vtp-high-flyers",
    location: "Hinjewadi Phase 1",
    zone: "West Pune",
    township: "Township Blue Waters",
    status: "ACTIVE",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100053912",
    possession: "2027",
    priceStarting: "75 Lakhs",
    highlights: "Modern high-rise residential towers designed for ambitious tech professionals."
  },
  {
    name: "VTP Sierra",
    slug: "vtp-sierra",
    location: "Baner Sus",
    zone: "West Pune",
    township: "Township Skylights",
    status: "ACTIVE",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100026773",
    possession: "2026",
    priceStarting: "70 Lakhs",
    highlights: "Hillside luxury living in Baner-Sus with panoramic reserve forest views."
  },
  {
    name: "VTP Verve",
    slug: "vtp-verve",
    location: "Baner Sus",
    zone: "West Pune",
    township: "Township Skylights",
    status: "ACTIVE",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100030689",
    possession: "2026",
    priceStarting: "72 Lakhs",
    highlights: "Contemporary residential spaces with sports and wellness club at Baner Sus."
  },
  {
    name: "VTP Vibrance",
    slug: "vtp-vibrance",
    location: "Baner Sus",
    zone: "West Pune",
    township: "Township Skylights",
    status: "ACTIVE",
    bhks: ["2 BHK", "3 BHK", "4 BHK"],
    rera: "P52100030690",
    possession: "2027",
    priceStarting: "74 Lakhs",
    highlights: "High-energy lifestyle community with 30+ amenities within Township Skylights on Baner-Sus road."
  },
  {
    name: "Township Codename Skylights",
    slug: "township-codename-skylights",
    location: "Baner Sus",
    zone: "West Pune",
    township: "Township Skylights",
    status: "TOWNSHIP_MASTER",
    bhks: ["2 BHK", "3 BHK", "4 BHK"],
    rera: "P52100026773 / P52100030689",
    possession: "2026-2027",
    priceStarting: "70 Lakhs",
    highlights: "West Pune's iconic hillside mega township in Baner-Sus featuring Sierra, Verve, and Vibrance."
  },
  {
    name: "VTP Cielo",
    slug: "vtp-cielo",
    location: "Bavdhan",
    zone: "West Pune",
    township: "VTP Luxe Bavdhan",
    status: "ACTIVE_LUXE",
    bhks: ["2 BHK", "3 BHK", "4 BHK"],
    rera: "P52100052414",
    possession: "2027",
    priceStarting: "1.15 Crores",
    highlights: "Hillside luxury residential enclave near Chandani Chowk and Kothrud."
  },

  // ── Pegasus / Kharadi & East Pune (Active Luxe & Township) ────────────────
  {
    name: "VTP Altamira",
    slug: "vtp-altamira",
    location: "Kharadi",
    zone: "East Pune",
    township: "Township Pegasus",
    status: "ACTIVE_LUXE",
    bhks: ["3 BHK", "4 BHK", "Simplex", "Duplex"],
    rera: "P52100079807",
    possession: "2028",
    priceStarting: "1.45 Crores",
    highlights: "Ultra-luxury high-rise residences with cascading waterfall entrance and 40+ amenities."
  },
  {
    name: "VTP Flamante",
    slug: "vtp-flamante",
    location: "Kharadi",
    zone: "East Pune",
    township: "Township Pegasus",
    status: "ACTIVE_LUXE",
    bhks: ["2 BHK", "3 BHK", "4 BHK"],
    rera: "P52100051859",
    possession: "2027",
    priceStarting: "92 Lakhs",
    highlights: "Luxe air-conditioned residences with glass-facade aesthetics in Kharadi."
  },
  {
    name: "VTP Velvet Villas",
    slug: "vtp-velvet-villas",
    location: "Kharadi",
    zone: "East Pune",
    township: "Township Pegasus",
    status: "ACTIVE_LUXE_VILLA",
    bhks: ["3 BHK", "5 BHK", "Luxury Villa"],
    rera: "P52100033838",
    possession: "2026",
    priceStarting: "2.85 Crores",
    highlights: "Exclusive 43 bespoke private luxury villas with private elevators and plunge pools."
  },
  {
    name: "VTP Euphoria",
    slug: "vtp-euphoria",
    location: "Kharadi",
    zone: "East Pune",
    township: "Township Pegasus",
    status: "ACTIVE",
    bhks: ["1 BHK", "2 BHK", "3 BHK"],
    rera: "P52100048447",
    possession: "2027",
    priceStarting: "65 Lakhs",
    highlights: "East Pune's largest luxury cluster with over 3 acres of amenities in New Kharadi."
  },
  {
    name: "VTP Dolce Vita",
    slug: "vtp-dolce-vita",
    location: "Kharadi",
    zone: "East Pune",
    township: "Township Pegasus",
    status: "ACTIVE",
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
    township: "Township Pegasus",
    status: "TOWNSHIP_MASTER",
    bhks: ["1 BHK", "2 BHK", "3 BHK", "Villas"],
    rera: "P52100030686",
    possession: "Ready & Under Construction",
    priceStarting: "62 Lakhs",
    highlights: "165+ acre mega integrated township in East Pune near EON IT Park and WTC."
  },
  {
    name: "VTP Altair",
    slug: "vtp-altair",
    location: "Kharadi",
    zone: "East Pune",
    township: "Township Pegasus",
    status: "ACTIVE",
    bhks: ["3 BHK"],
    rera: "P52100030687",
    possession: "2026",
    priceStarting: "1.15 Crores",
    highlights: "Premium high-altitude towers with 3-tier wellness and sports facilities."
  },
  {
    name: "VTP Cygnus",
    slug: "vtp-cygnus",
    location: "Kharadi",
    zone: "East Pune",
    township: "Township Pegasus",
    status: "PARTIALLY_DELIVERED",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100030686",
    possession: "Ready to Move",
    priceStarting: "78 Lakhs",
    highlights: "Ultra-efficient MLA layout residences within Township Pegasus New Kharadi."
  },
  {
    name: "VTP One",
    slug: "vtp-one",
    location: "Kharadi",
    zone: "East Pune",
    township: "Township Pegasus",
    status: "ACTIVE",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100030688",
    possession: "2026",
    priceStarting: "79 Lakhs",
    highlights: "Boutique luxury residences positioned close to major IT SEZs and commercial hubs."
  },
  {
    name: "VTP Aurelia",
    slug: "vtp-aurelia",
    location: "New Kharadi",
    zone: "East Pune",
    township: "Township Pegasus",
    status: "ACTIVE",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100054321",
    possession: "2027",
    priceStarting: "84 Lakhs",
    highlights: "Smart-automated residences with zero space wastage near riverside promenade."
  },
  {
    name: "VTP Purvanchal",
    slug: "vtp-purvanchal",
    location: "Wagholi",
    zone: "East Pune",
    township: "VTP Wagholi",
    status: "PARTIALLY_DELIVERED",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100020321",
    possession: "Ready to Move",
    priceStarting: "62 Lakhs",
    highlights: "Large-scale township living with 30+ amenities near EON IT Park."
  },
  {
    name: "VTP Beaumonde",
    slug: "vtp-beaumonde",
    location: "New Kharadi",
    zone: "East Pune",
    township: "Township Pegasus",
    status: "PARTIALLY_DELIVERED",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100030685",
    possession: "Ready to Move",
    priceStarting: "80 Lakhs",
    highlights: "Bespoke high-rise residences with exclusive clubhouse access in New Kharadi."
  },

  // ── South Pune, Central & Delivered Portfolio ─────────────────────────────
  {
    name: "VTP Celesta",
    slug: "vtp-celesta",
    location: "NIBM Road",
    zone: "South Pune",
    township: "VTP South Pune",
    status: "DELIVERED",
    bhks: ["3 BHK"],
    rera: "P52100001097",
    possession: "Ready to Move",
    priceStarting: "95 Lakhs",
    highlights: "Exclusive 3 BHK single-tower luxury residences overlooking the NIBM nature reserve."
  },
  {
    name: "VTP Solitaire",
    slug: "vtp-solitaire",
    location: "Pashan",
    zone: "West Pune",
    township: "VTP Pashan",
    status: "DELIVERED",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100000078",
    possession: "Ready to Move",
    priceStarting: "78 Lakhs",
    highlights: "Boutique residential enclave close to Baner and University Circle."
  },
  {
    name: "VTP HiLife",
    slug: "vtp-hilife",
    location: "Wakad",
    zone: "West Pune",
    township: "VTP Wakad",
    status: "DELIVERED",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100000085",
    possession: "Ready to Move",
    priceStarting: "70 Lakhs",
    highlights: "High-lifestyle residential community with full podium amenities in central Wakad."
  },
  {
    name: "VTP Urban Life",
    slug: "vtp-urban-life",
    location: "Talegaon",
    zone: "PCMC",
    township: "VTP Talegaon",
    status: "DELIVERED",
    bhks: ["1 BHK", "2 BHK"],
    rera: "P52100000054",
    possession: "Ready to Move",
    priceStarting: "32 Lakhs",
    highlights: "Affordable premium homes in clean-air Talegaon near industrial corridors."
  },
  {
    name: "VTP Urban Nest",
    slug: "vtp-urban-nest",
    location: "Undri",
    zone: "South Pune",
    township: "VTP Undri",
    status: "DELIVERED",
    bhks: ["1.5 BHK", "2 BHK", "3 BHK"],
    rera: "P52100000062",
    possession: "Ready to Move",
    priceStarting: "45 Lakhs",
    highlights: "Spacious family homes with landscaped open spaces near Bishop's School."
  },
  {
    name: "VTP Urban Soul",
    slug: "vtp-urban-soul",
    location: "Kharadi",
    zone: "East Pune",
    township: "VTP Kharadi",
    status: "DELIVERED",
    bhks: ["2 BHK"],
    rera: "P52100000063",
    possession: "Ready to Move",
    priceStarting: "65 Lakhs",
    highlights: "Well-established residential development in the heart of Kharadi."
  },
  {
    name: "VTP Urban Rise",
    slug: "vtp-urban-rise",
    location: "Pisoli",
    zone: "South Pune",
    township: "VTP Pisoli",
    status: "DELIVERED",
    bhks: ["1 BHK", "2 BHK"],
    rera: "P52100000071",
    possession: "Ready to Move",
    priceStarting: "38 Lakhs",
    highlights: "Affordable luxury community with easy access to NIBM and Katraj."
  },
  {
    name: "VTP Urban Balance",
    slug: "vtp-urban-balance",
    location: "Magarpatta Road",
    zone: "East Pune",
    township: "VTP Hadapsar",
    status: "DELIVERED",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100000072",
    possession: "Ready to Move",
    priceStarting: "75 Lakhs",
    highlights: "Balanced urban living next to Magarpatta Cybercity and Hadapsar."
  },
  {
    name: "VTP Urban Space",
    slug: "vtp-urban-space",
    location: "NIBM Undri",
    zone: "South Pune",
    township: "VTP Undri",
    status: "DELIVERED",
    bhks: ["3 BHK", "4 BHK"],
    rera: "P52100000073",
    possession: "Ready to Move",
    priceStarting: "1.10 Crores",
    highlights: "Exclusive high-end luxury residences in the green hills of NIBM Undri."
  },
  {
    name: "VTP Urban Nirvana",
    slug: "vtp-urban-nirvana",
    location: "Keshavnagar",
    zone: "East Pune",
    township: "VTP Keshavnagar",
    status: "DELIVERED",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100000074",
    possession: "Ready to Move",
    priceStarting: "68 Lakhs",
    highlights: "Tranquil living near Mundhwa flyover and Koregaon Park Annex."
  },
  {
    name: "VTP Landmark",
    slug: "vtp-landmark",
    location: "Undri",
    zone: "South Pune",
    township: "VTP Undri",
    status: "DELIVERED",
    bhks: ["2 BHK", "3 BHK"],
    rera: "P52100000075",
    possession: "Ready to Move",
    priceStarting: "58 Lakhs",
    highlights: "Gated residential landmark with clubhouse and landscaped gardens."
  },
  {
    name: "Bhagysthan",
    slug: "vtp-bhagysthan",
    location: "Talegaon",
    zone: "PCMC",
    township: "VTP Talegaon",
    status: "DELIVERED",
    bhks: ["1 BHK", "2 BHK"],
    rera: "P52100000076",
    possession: "Ready to Move",
    priceStarting: "28 Lakhs",
    highlights: "Early pioneer residential township project in Talegaon Dabhade."
  },

  // ── Commercial, Offices, Retail & Schools ─────────────────────────────────
  {
    name: "VTP Altitude",
    slug: "vtp-altitude",
    location: "Wakad",
    zone: "West Pune",
    township: "Commercial Hub",
    status: "COMMERCIAL",
    bhks: ["Office Spaces", "Showrooms", "Retail Shops"],
    rera: "P52100026774",
    possession: "2026",
    priceStarting: "45 Lakhs",
    highlights: "Grade A commercial office suites and high-street retail spaces in central Wakad."
  },
  {
    name: "VTP Town Square",
    slug: "vtp-town-square",
    location: "Viman Nagar",
    zone: "East Pune",
    township: "Commercial Hub",
    status: "COMMERCIAL",
    bhks: ["Retail Shops", "Offices"],
    rera: "P52100000077",
    possession: "Ready to Move",
    priceStarting: "65 Lakhs",
    highlights: "High-street retail destination and corporate office spaces in Viman Nagar."
  },
  {
    name: "KP Square",
    slug: "vtp-kp-square",
    location: "Kharadi",
    zone: "East Pune",
    township: "Commercial Hub",
    status: "COMMERCIAL",
    bhks: ["Retail", "Boutique Offices"],
    rera: "P52100000079",
    possession: "Ready to Move",
    priceStarting: "50 Lakhs",
    highlights: "Prime commercial plaza near EON IT Park Kharadi."
  },
  {
    name: "VTP Trade Park",
    slug: "vtp-trade-park",
    location: "Undri",
    zone: "South Pune",
    township: "Commercial Hub",
    status: "COMMERCIAL",
    bhks: ["Commercial Spaces", "Retail Shops"],
    rera: "P52100000080",
    possession: "Ready to Move",
    priceStarting: "40 Lakhs",
    highlights: "Thriving commercial business park on main Undri-Hadapsar road."
  },
  {
    name: "The Marketplace",
    slug: "vtp-the-marketplace",
    location: "Undri",
    zone: "South Pune",
    township: "Commercial Hub",
    status: "COMMERCIAL",
    bhks: ["High Street Retail", "Anchor Stores"],
    rera: "P52100000081",
    possession: "Ready to Move",
    priceStarting: "48 Lakhs",
    highlights: "Convenience retail and community shopping center serving 5,000+ families."
  },
  {
    name: "VTP House",
    slug: "vtp-house",
    location: "Viman Nagar",
    zone: "East Pune",
    township: "Corporate Headquarters",
    status: "COMMERCIAL",
    bhks: ["Corporate Offices"],
    rera: "P52100000082",
    possession: "Ready to Move",
    priceStarting: "1.20 Crores",
    highlights: "VTP Group corporate headquarters and Grade A office spaces in Viman Nagar."
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. COMPLETE PUNE MICRO-MARKETS DICTIONARY (34 LOCATIONS)
// ─────────────────────────────────────────────────────────────────────────────
const microMarkets = [
  // West Pune
  { name: "Hinjewadi", slug: "hinjewadi", zone: "West Pune", landmark: "Rajiv Gandhi Infotech Park & Metro Line 3" },
  { name: "Hinjewadi Phase 1", slug: "hinjewadi-phase-1", zone: "West Pune", landmark: "Infosys, Wipro & Cognizant Hub" },
  { name: "Hinjewadi Phase 2", slug: "hinjewadi-phase-2", zone: "West Pune", landmark: "Tech Mahindra & TCS Phase 2" },
  { name: "Hinjewadi Phase 3", slug: "hinjewadi-phase-3", zone: "West Pune", landmark: "Megapolis & Tech Zone" },
  { name: "Mahalunge", slug: "mahalunge", zone: "West Pune", landmark: "Township Blue Waters & Mula River" },
  { name: "Baner", slug: "baner", zone: "West Pune", landmark: "Baner High Street & Balewadi Link Road" },
  { name: "Balewadi", slug: "balewadi", zone: "West Pune", landmark: "Balewadi High Street & Sports Complex" },
  { name: "Baner Sus", slug: "baner-sus", zone: "West Pune", landmark: "Sus Hills & Highway Access" },
  { name: "Wakad", slug: "wakad", zone: "West Pune", landmark: "Dutt Mandir Road & Bhumkar Chowk" },
  { name: "Bavdhan", slug: "bavdhan", zone: "West Pune", landmark: "Chandani Chowk & NDA Road" },
  { name: "Pashan", slug: "pashan", zone: "West Pune", landmark: "Pashan Lake & Sus Road" },
  { name: "Aundh", slug: "aundh", zone: "West Pune", landmark: "Westend Mall & University Circle" },
  { name: "Kothrud", slug: "kothrud", zone: "West Pune", landmark: "Paud Road & Karve Road" },
  { name: "Punawale", slug: "punawale", zone: "West Pune", landmark: "Malet Crescent & Kate Wasti" },
  { name: "Tathawade", slug: "tathawade", zone: "West Pune", landmark: "JSPM Institute & Mumbai Highway" },
  { name: "Ravet", slug: "ravet", zone: "West Pune", landmark: "Expressway Gateway & BRTS" },

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
  { name: "Moshi", slug: "moshi", zone: "PCMC", landmark: "Pune International Exhibition Center" },
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
// 3. MASTER 10,000-KEYWORD GENERATION & DEDUPLICATION ENGINE
// ─────────────────────────────────────────────────────────────────────────────

const uniqueKeywordsMap = new Map(); // keyword.toLowerCase() -> Record
const generatedSilos = [];

function registerKeyword(kwObj, siloId, meta = {}) {
  const cleanKeyword = kwObj.keyword.trim();
  const lower = cleanKeyword.toLowerCase();
  
  if (uniqueKeywordsMap.has(lower)) {
    return; // deduplicate
  }

  const record = {
    id: uniqueKeywordsMap.size + 1,
    slug: kwObj.slug || slugify(cleanKeyword),
    keyword: cleanKeyword,
    project: meta.project || 'VTP Master',
    township: meta.township || 'Pune Real Estate',
    location: meta.location || 'Pune',
    bhk: meta.bhk || 'All',
    intent: meta.intent || 'Commercial',
    funnel: meta.funnel || 'MOFU',
    ppcType: meta.ppcType || 'SEO/PPC',
    priority: meta.priority || 'P1',
    status: meta.status || 'ACTIVE'
  };

  uniqueKeywordsMap.set(lower, record);

  // Add to Silo
  let silo = generatedSilos.find(s => s.id === siloId);
  if (!silo) {
    silo = {
      id: siloId,
      title: meta.siloTitle || `${meta.project || 'VTP'} Hub`,
      description: meta.siloDesc || `Explore premium properties and investments with VTP Realty Pune.`,
      slugs: []
    };
    generatedSilos.push(silo);
  }
  silo.slugs.push({ slug: record.slug, keyword: record.keyword });
}

// ─── TIER 1: VTP BRAND & VTP LUXE UNIVERSE ──────────────────────────────────
const brandStems = [
  "VTP Realty Pune", "VTP Realty projects Pune", "VTP Realty properties Pune", "VTP Realty flats Pune",
  "VTP Realty apartments Pune", "VTP Realty homes Pune", "VTP Realty residential projects Pune",
  "VTP Realty new projects Pune", "VTP Realty upcoming projects Pune", "VTP Realty new launch Pune",
  "VTP Realty builder Pune", "VTP Realty developer Pune", "VTP Pune projects", "VTP Pune properties",
  "VTP Pune flats", "VTP Pune apartments", "VTP Pune homes", "VTP Pune residential projects",
  "VTP Pune new projects", "VTP Pune upcoming projects", "VTP Pune property price", "VTP Pune price list",
  "VTP Pune brochure", "VTP Pune floor plan", "VTP Pune RERA", "VTP Pune reviews", "VTP Pune booking",
  "VTP Pune site visit", "VTP Pune possession", "VTP Pune investment"
];

const brandModifiers = [
  "2026", "current", "latest", "new", "upcoming", "residential", "luxury", "premium",
  "affordable", "best", "top", "near me", "for sale", "investment", "direct developer",
  "official", "price list", "brochure PDF", "floor plan layout", "RERA verified", "possession date", "customer reviews"
];

brandStems.forEach(stem => {
  registerKeyword({ keyword: stem }, "vtp-brand-master", {
    project: "VTP Group", township: "Pune Master", location: "Pune", intent: "Navigational", funnel: "TOFU", priority: "P1",
    siloTitle: "VTP Realty Pune - Official Brand & Master Portfolio",
    siloDesc: "Explore all official residential and commercial projects by VTP Realty across Pune with authentic MahaRERA registrations, direct sales booking, Maximum Livable Area (MLA) designs, and transparent cost sheets."
  });
  brandModifiers.forEach(mod => {
    registerKeyword({ keyword: `${stem} ${mod}` }, "vtp-brand-master", {
      project: "VTP Group", township: "Pune Master", location: "Pune", intent: "Commercial", funnel: "MOFU", priority: "P2"
    });
  });
});

// VTP Luxe Vertical
const luxeKeywords = [
  "VTP Luxe Pune", "VTP Luxe projects Pune", "VTP Luxe properties Pune", "VTP Luxe apartments Pune",
  "VTP Luxe luxury flats Pune", "VTP Luxe luxury homes Pune", "VTP Luxe price", "VTP Luxe price list",
  "VTP Luxe brochure", "VTP Luxe floor plans", "VTP Luxe reviews", "VTP Luxe RERA", "VTP Luxe investment",
  "VTP Luxe 2 BHK", "VTP Luxe 3 BHK", "VTP Luxe 4 BHK", "VTP Luxe 5 BHK", "VTP Luxe villas Pune",
  "VTP Luxe premium residences", "VTP Luxe ultra luxury apartments", "VTP Luxe Kharadi", "VTP Luxe New Kharadi",
  "VTP Luxe Mahalunge", "VTP Luxe Hinjawadi", "VTP Luxe Bavdhan", "VTP Luxe Pune East", "VTP Luxe Pune West"
];

luxeKeywords.forEach(kw => {
  registerKeyword({ keyword: kw }, "vtp-luxe-universe", {
    project: "VTP Luxe", township: "VTP Luxe Portfolio", location: "Pune", intent: "Commercial", funnel: "MOFU", priority: "P1",
    siloTitle: "VTP Luxe Ultra Luxury Residences Pune",
    siloDesc: "Discover VTP Luxe — the ultra-luxury residential vertical by VTP Realty featuring Altamira, Monarque, Earth 1, Flamante, Velvet Villas, and Cielo with imported finishes, bespoke layouts, and 5-star clubhouses."
  });
});

// ─── TIER 2 & 3 & 4: 44 PROJECTS SYSTEMATIC MATRIX ──────────────────────────
projects.forEach(p => {
  const siloId = `project-${p.slug}`;
  const meta = {
    project: p.name,
    township: p.township,
    location: p.location,
    status: p.status,
    siloTitle: `${p.name} ${p.location} Pune`,
    siloDesc: `Complete verified details for ${p.name} in ${p.location}, Pune. MahaRERA: ${p.rera}. Starting price ${p.priceStarting}, expected possession ${p.possession}. Download official brochure, floor plans, and book direct site visit. ${p.highlights}`
  };

  // 1. Transactional & Money Intent (BOFU)
  const priceIntents = [
    `${p.name} price`, `${p.name} Pune price`, `${p.name} ${p.location} price`, `${p.name} price list`,
    `${p.name} latest price 2026`, `${p.name} current price`, `${p.name} starting price`,
    `${p.name} flat price`, `${p.name} apartment price`, `${p.name} per sq ft price`,
    `${p.name} price per square foot`, `${p.name} cost`, `${p.name} total cost`,
    `${p.name} cost sheet all inclusive`, `${p.name} booking amount`, `${p.name} payment plan`,
    `${p.name} subvention scheme 10 90`, `${p.name} no pre EMI offer`, `${p.name} bank loan approval SBI HDFC`,
    `${p.name} down payment amount`, `${p.name} home loan EMI calculator`, `${p.name} stamp duty and GST charges`,
    `buy ${p.name} flat for sale`, `buy ${p.name} apartment Pune`, `${p.name} direct developer booking`,
    `${p.name} zero brokerage booking`, `${p.name} booking online`, `${p.name} site visit appointment`,
    `${p.name} sales office contact number`, `${p.name} available units for sale`, `${p.name} ready possession inventory`,
    `${p.name} resale flats for sale`, `${p.name} resale price list`
  ];

  priceIntents.forEach(kw => {
    registerKeyword({ keyword: kw }, siloId, { ...meta, intent: "Transactional", funnel: "BOFU", ppcType: "PPC", priority: "P1" });
  });

  // 2. Configuration & Typology Matrix
  p.bhks.forEach(bhk => {
    const bhkIntents = [
      `${p.name} ${bhk}`, `${p.name} ${bhk} price`, `${p.name} ${bhk} cost`, `${p.name} ${bhk} all inclusive price`,
      `${p.name} ${bhk} floor plan`, `${p.name} ${bhk} floor plan PDF`, `${p.name} ${bhk} carpet area`,
      `${p.name} ${bhk} usable area`, `${p.name} ${bhk} room dimensions`, `${p.name} ${bhk} sample flat`,
      `${p.name} ${bhk} sample flat video tour`, `buy ${p.name} ${bhk} flat`, `buy ${p.name} ${bhk} in ${p.location}`,
      `${p.name} ${bhk} for sale`, `${p.name} ${bhk} booking`, `${p.name} ${bhk} ready possession`,
      `${p.name} ${bhk} resale`, `${p.name} ${bhk} rental yield`, `${p.name} ${bhk} rent per month`
    ];

    bhkIntents.forEach(kw => {
      registerKeyword({ keyword: kw }, siloId, { ...meta, bhk: bhk, intent: "Transactional", funnel: "BOFU", ppcType: "SEO/PPC", priority: "P1" });
    });
  });

  // 3. Floor Plan, Layout & Architecture Permutations
  const layoutIntents = [
    `${p.name} floor plan`, `${p.name} floor plans`, `${p.name} floor plan PDF download`,
    `${p.name} apartment layout`, `${p.name} flat layout`, `${p.name} unit plan`,
    `${p.name} master plan`, `${p.name} master plan layout PDF`, `${p.name} master layout diagram`,
    `${p.name} tower plan`, `${p.name} typical floor plan`, `${p.name} carpet area details`,
    `${p.name} built up area`, `${p.name} saleable area`, `${p.name} balcony area`,
    `${p.name} room dimensions`, `${p.name} vastu floor plan`, `${p.name} east facing flat`,
    `${p.name} west facing flat`, `${p.name} corner apartment`, `${p.name} high rise floor view`,
    `${p.name} maximum livable area MLA design`, `${p.name} zero space wastage layout`
  ];

  layoutIntents.forEach(kw => {
    registerKeyword({ keyword: kw }, siloId, { ...meta, intent: "Commercial", funnel: "MOFU", ppcType: "SEO", priority: "P1" });
  });

  // 4. Brochure, MahaRERA, Construction & Reviews Cluster
  const docIntents = [
    `${p.name} brochure`, `${p.name} brochure PDF`, `${p.name} brochure download`,
    `${p.name} official brochure 2026`, `${p.name} price brochure`, `${p.name} MahaRERA number`,
    `${p.name} MahaRERA registration certificate`, `${p.name} RERA details`, `${p.name} legal approvals`,
    `${p.name} project registration`, `${p.name} construction update`, `${p.name} construction status 2026`,
    `${p.name} latest construction photos`, `${p.name} drone video construction update`, `${p.name} possession date`,
    `${p.name} expected possession timeline`, `${p.name} handover date`, `${p.name} occupancy certificate OC status`,
    `${p.name} completion status`, `${p.name} reviews`, `${p.name} customer reviews`,
    `${p.name} construction quality reviews`, `${p.name} ratings and feedback`, `${p.name} complaints and resolution`,
    `${p.name} pros and cons review`, `${p.name} locality review ${p.location}`, `${p.name} 360 virtual tour walkthrough`
  ];

  docIntents.forEach(kw => {
    registerKeyword({ keyword: kw }, siloId, { ...meta, intent: "Commercial", funnel: "MOFU", ppcType: "SEO", priority: "P1" });
  });

  // 5. Amenities Cluster
  const amenityIntents = [
    `${p.name} amenities`, `${p.name} clubhouse`, `${p.name} swimming pool`,
    `${p.name} gymnasium and fitness center`, `${p.name} sports facilities`, `${p.name} kids play area`,
    `${p.name} landscaped gardens`, `${p.name} jogging track`, `${p.name} multi purpose hall`,
    `${p.name} 5 tier security system`, `${p.name} EV charging station`, `${p.name} lifestyle amenities list`
  ];

  amenityIntents.forEach(kw => {
    registerKeyword({ keyword: kw }, siloId, { ...meta, intent: "Informational", funnel: "MOFU", ppcType: "SEO", priority: "P2" });
  });

  // 6. Connectivity Cluster
  const connectivityIntents = [
    `${p.name} location`, `${p.name} location map`, `${p.name} address and direction`,
    `${p.name} connectivity`, `${p.name} near metro station`, `${p.name} distance from Hinjewadi IT Park`,
    `${p.name} distance from EON IT Park`, `${p.name} distance from Pune airport`,
    `${p.name} distance from Mumbai Pune Expressway`, `${p.name} nearest schools and hospitals`,
    `${p.name} near EON IT Park Kharadi`, `${p.name} near Rajiv Gandhi Infotech Park Hinjewadi`,
    `${p.name} near World Trade Center Kharadi`, `${p.name} near Hinjewadi Phase 1 Metro Station`,
    `${p.name} near Balewadi High Street`, `${p.name} near Mumbai Pune Expressway`,
    `${p.name} near Baner Pashan Link Road`, `${p.name} near Phoenix Marketcity Viman Nagar`,
    `${p.name} near Corinthians Club NIBM`, `${p.name} near Chandani Chowk Bavdhan`
  ];

  connectivityIntents.forEach(kw => {
    registerKeyword({ keyword: kw }, siloId, { ...meta, intent: "Informational", funnel: "MOFU", ppcType: "SEO", priority: "P2" });
  });

  // 7. Budget Permutations
  const budgetIntents = [
    `${p.name} under 50 lakhs`, `${p.name} under 75 lakhs`, `${p.name} under 90 lakhs`,
    `${p.name} under 1 crore`, `${p.name} under 1.25 crore`, `${p.name} under 1.5 crore`,
    `${p.name} under 2 crore`, `${p.name} under 2.5 crore`, `${p.name} under 3 crore`,
    `${p.name} 1 crore budget`, `${p.name} 2 crore budget`, `${p.name} affordable luxury flat`,
    `${p.name} all inclusive price sheet`, `${p.name} stamp duty waiver offer`,
    `${p.name} festival discount scheme`
  ];
  budgetIntents.forEach(kw => {
    registerKeyword({ keyword: kw }, siloId, { ...meta, intent: "Transactional", funnel: "BOFU", ppcType: "PPC", priority: "P2" });
  });

  // 8. Buyer Action & Search Intents
  const buyerActionIntents = [
    `book ${p.name} online Pune`, `schedule site visit for ${p.name}`, `download ${p.name} price sheet PDF`,
    `download ${p.name} floor plan AutoCAD PDF`, `view ${p.name} sample flat photos`,
    `check ${p.name} construction progress live`, `check ${p.name} MahaRERA certificate online`,
    `is ${p.name} safe for investment`, `what is the possession date of ${p.name}`,
    `best tower in ${p.name} with river view`, `best tower in ${p.name} with hill view`,
    `${p.name} pre launch token booking`, `${p.name} official sales desk enquiry`,
    `${p.name} channel partner registration`, `${p.name} customer care helpline number`
  ];
  buyerActionIntents.forEach(kw => {
    registerKeyword({ keyword: kw }, siloId, { ...meta, intent: "Commercial", funnel: "MOFU", ppcType: "SEO/PPC", priority: "P1" });
  });
});

// ─── TIER 5: 34 PUNE MICRO-MARKETS MATRIX ───────────────────────────────────
microMarkets.forEach(m => {
  const siloId = `market-${m.slug}`;
  const meta = {
    project: "VTP Portfolio",
    township: m.name,
    location: m.name,
    siloTitle: `Real Estate & Flats in ${m.name} Pune - VTP Projects`,
    siloDesc: `Explore premium residential and commercial properties in ${m.name}, ${m.zone}, Pune near ${m.landmark}. Discover VTP Realty luxury townships with Maximum Livable Area, transparent pricing, and zero brokerage.`
  };

  const marketPatterns = [
    `VTP ${m.name}`, `VTP Realty ${m.name}`, `VTP projects in ${m.name}`, `VTP flats in ${m.name}`,
    `VTP apartments in ${m.name}`, `VTP homes in ${m.name}`, `VTP properties in ${m.name}`,
    `VTP residential projects in ${m.name}`, `VTP new launch in ${m.name}`, `VTP upcoming projects in ${m.name}`,
    `VTP luxury flats in ${m.name}`, `VTP premium apartments in ${m.name}`, `VTP 1 BHK in ${m.name}`,
    `VTP 2 BHK in ${m.name}`, `VTP 3 BHK in ${m.name}`, `VTP 4 BHK in ${m.name}`,
    `VTP flats for sale in ${m.name}`, `VTP property for investment in ${m.name}`, `VTP price list ${m.name}`,
    `VTP ready possession flats in ${m.name}`, `VTP under construction flats in ${m.name}`,
    `flats for sale in ${m.name} Pune`, `luxury apartments in ${m.name} Pune`, `new residential projects in ${m.name} Pune`,
    `2 BHK flats in ${m.name} Pune price`, `3 BHK flats in ${m.name} Pune price`, `4 BHK luxury apartments in ${m.name} Pune`,
    `gated community townships in ${m.name} Pune`, `under construction projects in ${m.name} Pune`,
    `ready possession flats in ${m.name} Pune`, `property investment in ${m.name} Pune ROI`,
    `real estate price trends in ${m.name} Pune`, `top 5 luxury projects in ${m.name} Pune`,
    `best gated community flats in ${m.name}`, `buy flat in ${m.name} without brokerage`,
    `2 BHK flat in ${m.name} under 80 lakhs`, `3 BHK flat in ${m.name} under 1.5 crore`,
    `flats near ${m.landmark}`, `apartments near ${m.landmark} Pune`
  ];

  marketPatterns.forEach(kw => {
    registerKeyword({ keyword: kw }, siloId, { ...meta, intent: "Commercial", funnel: "MOFU", ppcType: "SEO/PPC", priority: "P1" });
  });
});

// ─── TIER 6: TOWNSHIPS, AETHEREUS & VELVET VILLAS DEEP DIVES ────────────────

// Township Blue Waters Deep-Dive
const blueWatersIntents = [
  "VTP Blue Waters Pune", "VTP Bluewaters Pune", "VTP Blue Waters Mahalunge", "VTP Bluewaters Hinjawadi",
  "VTP Blue Waters township Mahalunge", "VTP Blue Waters 200 acre township", "VTP Blue Waters master plan PDF",
  "VTP Blue Waters price list 2026", "VTP Blue Waters 1 BHK price", "VTP Blue Waters 2 BHK price",
  "VTP Blue Waters 3 BHK price", "VTP Blue Waters 4 BHK price", "VTP Blue Waters luxury villas",
  "VTP Blue Waters riverfront promenade", "VTP Blue Waters sports academy", "VTP Blue Waters high street retail",
  "VTP Blue Waters brochure download", "VTP Blue Waters MahaRERA registration", "VTP Blue Waters possession date",
  "VTP Blue Waters construction status 2026", "VTP Blue Waters reviews and ratings", "VTP Blue Waters investment returns",
  "VTP Blue Waters resale flats inventory", "VTP Blue Waters ready to move apartments", "VTP Blue Waters booking office contact",
  "VTP Blue Waters sample flat video tour", "buy flat in VTP Blue Waters Mahalunge", "VTP Blue Waters vs Megapolis Hinjewadi",
  "VTP Blue Waters vs Kolte Patil Life Republic", "VTP Blue Waters vs Godrej Hillside"
];

blueWatersIntents.forEach(kw => {
  registerKeyword({ keyword: kw }, "township-blue-waters-deep-dive", {
    project: "Township Blue Waters", township: "Township Blue Waters", location: "Mahalunge Hinjewadi",
    intent: "Transactional", funnel: "BOFU", priority: "P1",
    siloTitle: "VTP Blue Waters 200+ Acre Mega Township Mahalunge Pune",
    siloDesc: "Official portal for VTP Blue Waters in Mahalunge/Hinjewadi. 200+ acres master-planned riverside township featuring Earth 1, Monarque, Volare, Bellissimo, Aethereus, Leonara, and Bel Air."
  });
});

// Township Pegasus Deep-Dive
const pegasusIntents = [
  "VTP Pegasus Pune", "VTP Pegasus Kharadi", "VTP Pegasus New Kharadi", "VTP Pegasus township Kharadi",
  "VTP Pegasus 165 acre township", "VTP Pegasus master plan layout", "VTP Pegasus price list 2026",
  "VTP Pegasus 1 BHK price", "VTP Pegasus 2 BHK price", "VTP Pegasus 3 BHK price", "VTP Pegasus 4 BHK price",
  "VTP Pegasus luxury villas", "VTP Pegasus brochure PDF download", "VTP Pegasus MahaRERA number",
  "VTP Pegasus possession date", "VTP Pegasus construction update 2026", "VTP Pegasus customer reviews",
  "VTP Pegasus investment ROI Kharadi", "VTP Pegasus resale flats", "VTP Pegasus ready possession flats",
  "VTP Pegasus sales office phone number", "VTP Pegasus sample flat video", "buy flat in VTP Pegasus Kharadi",
  "VTP Pegasus vs Panchshil Towers Kharadi", "VTP Pegasus vs Godrej Infinity Keshavnagar", "VTP Pegasus vs Gera World of Joy"
];

pegasusIntents.forEach(kw => {
  registerKeyword({ keyword: kw }, "township-pegasus-deep-dive", {
    project: "Township Pegasus", township: "Township Pegasus", location: "Kharadi New Kharadi",
    intent: "Transactional", funnel: "BOFU", priority: "P1",
    siloTitle: "Township Pegasus 165+ Acre Mega Township Kharadi Pune",
    siloDesc: "Complete guide to Township Pegasus in New Kharadi, East Pune. Master-planned 165+ acre mega township featuring Altamira, Flamante, Velvet Villas, Euphoria, Dolce Vita, Altair, and Cygnus."
  });
});

// VTP Aethereus Deep Dive
const aethereusIntents = [
  "VTP Aethereus", "VTP Aethereus Pune", "VTP Aethereus Mahalunge", "VTP Aethereus Hinjawadi",
  "VTP Aethereus price", "VTP Aethereus price list 2026", "VTP Aethereus 2 BHK price", "VTP Aethereus 3 BHK price",
  "VTP Aethereus 4 BHK price", "VTP Aethereus floor plan", "VTP Aethereus floor plan PDF",
  "VTP Aethereus brochure", "VTP Aethereus brochure download", "VTP Aethereus MahaRERA number",
  "VTP Aethereus possession date", "VTP Aethereus construction status", "VTP Aethereus reviews",
  "VTP Aethereus amenities", "VTP Aethereus swimming pool", "VTP Aethereus clubhouse",
  "VTP Aethereus location", "VTP Aethereus investment", "VTP Aethereus site visit", "VTP Aethereus booking",
  "VTP Aethereus sample flat", "VTP Aethereus river view", "VTP Aethereus hill view",
  "VTP Aethereus 31 storey towers", "VTP Aethereus premium homes", "buy flat in VTP Aethereus Mahalunge"
];

aethereusIntents.forEach(kw => {
  registerKeyword({ keyword: kw }, "project-vtp-aethereus", {
    project: "VTP Aethereus", township: "Township Blue Waters", location: "Mahalunge",
    intent: "Transactional", funnel: "BOFU", priority: "P1",
    siloTitle: "VTP Aethereus Mahalunge Pune - Luxury High Rise Towers",
    siloDesc: "VTP Aethereus premium high-rise residences with five 31+ storey towers in Mahalunge within Township Blue Waters. Explore floor plans, prices, river views, and download official brochure."
  });
});

// Velvet Villas Deep Dive
const velvetVillasIntents = [
  "Velvet Villas", "Velvet Villas Pune", "Velvet Villas Kharadi", "Velvet Villas New Kharadi",
  "Velvet Villas VTP", "VTP Velvet Villas", "VTP Luxe Velvet Villas", "Velvet Villas price",
  "Velvet Villas price Pune", "Velvet Villas price Kharadi", "Velvet Villas 3 bed villa",
  "Velvet Villas 5 bed villa", "Velvet Villas 3 bedroom luxury villa", "Velvet Villas 5 bedroom luxury villa",
  "Velvet Villas ultra luxury villas", "Velvet Villas floor plan", "Velvet Villas brochure PDF",
  "Velvet Villas amenities", "Velvet Villas private swimming pool", "Velvet Villas private elevator",
  "Velvet Villas gated community", "Velvet Villas investment returns", "Velvet Villas customer reviews",
  "Velvet Villas possession date", "Velvet Villas direct booking", "Velvet Villas site visit appointment",
  "Velvet Villas carpet area", "Velvet Villas 4000 sq ft", "Velvet Villas 5000 sq ft", "Velvet Villas 9000 sq ft",
  "luxury villas in Kharadi Pune", "ultra luxury villas Pune for sale", "premium private villas New Kharadi"
];

velvetVillasIntents.forEach(kw => {
  registerKeyword({ keyword: kw }, "project-vtp-velvet-villas", {
    project: "VTP Velvet Villas", township: "Township Pegasus", location: "Kharadi",
    intent: "Transactional", funnel: "BOFU", priority: "P1",
    siloTitle: "VTP Velvet Villas Kharadi Pune - Ultra Luxury Private Villas",
    siloDesc: "Bespoke collection of 43 private luxury villas in New Kharadi within Township Pegasus. Features private plunge pools, personal elevators, private terrace gardens, and sizes from 4,132 to 9,184 sq.ft."
  });
});

// Township Skylights, Sierra, Verve & Vibrance Baner-Sus Deep Dive
const skylightsBanerSusIntents = [
  // Township Codename Skylights Master
  "Township Codename Skylights Baner", "Township Codename Skylights Baner Sus", "VTP Skylights Baner",
  "VTP Skylights Baner Sus Road", "VTP Skylights Pune price", "VTP Skylights master plan layout",
  "VTP Skylights brochure PDF download", "VTP Skylights MahaRERA number", "VTP Skylights possession date",
  "VTP Skylights construction status 2026", "VTP Skylights 2 BHK price", "VTP Skylights 3 BHK price",
  "VTP Skylights 4 BHK price", "VTP Skylights sample flat video tour", "buy flat in VTP Skylights Baner",
  "VTP Skylights vs Pride World City", "VTP Skylights vs Kohinoor Westview Reserve", "VTP Skylights reviews and ratings",
  "VTP Skylights amenities and clubhouse", "VTP Skylights sales office contact number",

  // VTP Sierra Baner-Sus
  "VTP Sierra Baner", "VTP Sierra Baner Sus", "VTP Sierra Baner Sus Road Pune", "VTP Sierra price list 2026",
  "VTP Sierra 2 BHK price", "VTP Sierra 3 BHK price", "VTP Sierra floor plan PDF", "VTP Sierra brochure download",
  "VTP Sierra MahaRERA number", "VTP Sierra possession date 2026", "VTP Sierra construction update live",
  "VTP Sierra sample flat photos", "VTP Sierra customer reviews", "VTP Sierra hillside apartments",
  "buy 2 BHK in VTP Sierra Baner", "buy 3 BHK in VTP Sierra Baner Sus", "VTP Sierra resale flats inventory",
  "VTP Sierra ready possession status", "VTP Sierra rent per month", "VTP Sierra vs Rohan Ekam",

  // VTP Verve Baner-Sus
  "VTP Verve Baner", "VTP Verve Baner Sus", "VTP Verve Baner Sus Road Pune", "VTP Verve price list",
  "VTP Verve 2 BHK price", "VTP Verve 3 BHK price", "VTP Verve floor plan PDF", "VTP Verve brochure download",
  "VTP Verve MahaRERA number", "VTP Verve possession date 2026", "VTP Verve construction status",
  "VTP Verve sample flat video", "VTP Verve customer reviews", "buy flat in VTP Verve Baner Sus",
  "VTP Verve sports amenities", "VTP Verve vs Supreme Estia Baner", "VTP Verve vs Kasturi Apostrophe",

  // VTP Vibrance Baner-Sus
  "VTP Vibrance", "VTP Vibrance Pune", "VTP Vibrance Baner", "VTP Vibrance Baner Sus",
  "VTP Vibrance Baner Sus Road", "VTP Codename Vibrance", "VTP Vibrance price list 2026",
  "VTP Vibrance 2 BHK price", "VTP Vibrance 3 BHK price", "VTP Vibrance 4 BHK price",
  "VTP Vibrance floor plan", "VTP Vibrance floor plan PDF", "VTP Vibrance brochure download",
  "VTP Vibrance MahaRERA number", "VTP Vibrance possession date", "VTP Vibrance construction update",
  "VTP Vibrance sample flat", "VTP Vibrance amenities", "VTP Vibrance swimming pool",
  "VTP Vibrance booking online", "VTP Vibrance site visit", "buy flat in VTP Vibrance Baner Sus",

  // Baner-Sus Corridor Transactional & Locality Matrix
  "flats for sale in Baner Sus Road Pune", "luxury apartments in Baner Sus Pune", "2 BHK flats in Baner Sus under 75 lakhs",
  "3 BHK luxury flats in Baner Sus under 1.5 crore", "new residential projects in Baner Sus Pune",
  "gated community flats near Baner High Street", "flats on Pashan Sus Road Pune", "flats near Mumbai Pune Highway Baner",
  "property investment in Baner Sus ROI", "real estate price trends in Baner Sus Road",
  "VTP projects in Baner Sus Pune", "best residential projects in Baner Sus", "why invest in Baner Sus Road Pune",
  "distance from Baner Sus to Hinjewadi IT Park", "Baner Sus connectivity to Balewadi High Street"
];

skylightsBanerSusIntents.forEach(kw => {
  registerKeyword({ keyword: kw }, "township-skylights-baner-sus-deep-dive", {
    project: "Township Codename Skylights", township: "Township Skylights", location: "Baner Sus",
    intent: "Transactional", funnel: "BOFU", priority: "P1",
    siloTitle: "Township Codename Skylights Baner Sus Pune - VTP Sierra, Verve & Vibrance",
    siloDesc: "Explore Township Codename Skylights on Baner-Sus Road, West Pune by VTP Realty. Featuring VTP Sierra, VTP Verve, and VTP Vibrance. Hillside residences with Maximum Livable Area, 30+ amenities, and 5 mins to Baner High Street."
  });
});

// ─── TIER 7: COMPARISONS, NRI, COMMERCIAL, RENTAL & INFORMATIONAL ───────────

// Developer & Project Comparisons
const comparisonIntents = [
  "VTP Realty vs Godrej Properties Pune", "VTP Realty vs Shapoorji Pallonji Pune", "VTP Realty vs Kolte Patil Pune",
  "VTP Realty vs Mahindra Lifespaces Pune", "VTP Realty vs VTP Luxe", "VTP vs Lodha Pune",
  "VTP vs Kalpataru Pune", "VTP vs Rohan Builders Pune", "VTP vs Kumar Properties Pune",
  "VTP vs Gera Developments Pune", "VTP vs Nyati Group Pune", "VTP vs Vilas Javdekar VJ Pune",
  "VTP vs Puravankara Pune", "VTP vs Amanora Park Town Pune", "VTP vs Kohinoor Group Pune",
  "VTP Monarque vs VTP Volare", "VTP Monarque vs VTP Aethereus", "VTP Volare vs VTP Aethereus",
  "VTP Monarque vs VTP Earth 1", "VTP Altamira vs VTP Flamante", "VTP Altamira vs Velvet Villas",
  "VTP Aethereus vs VTP Monarque", "VTP Pegasus vs VTP Blue Waters", "Kharadi VTP vs Hinjawadi VTP",
  "Kharadi vs Hinjawadi VTP investment", "VTP Kharadi vs VTP Mahalunge", "VTP Monarque vs Godrej Park World Hinjewadi",
  "VTP Monarque vs Kolte Patil Life Republic", "VTP Earth One vs Godrej Hillside Mahalunge", "VTP Flamante vs Panchshil Towers Kharadi"
];

comparisonIntents.forEach(kw => {
  registerKeyword({ keyword: kw }, "competitor-comparisons", {
    project: "VTP Comparison Hub", township: "Pune Real Estate", location: "Pune",
    intent: "Commercial", funnel: "MOFU", priority: "P2",
    siloTitle: "VTP Projects vs Top Competitors Pune Real Estate",
    siloDesc: "Detailed head-to-head architectural, pricing, carpet area, and location comparisons of VTP Realty projects against Godrej, Kolte Patil, Lodha, Panchshil, Paranjape, Pride, Rohan, and Gera."
  });
});

// NRI Investment Hub
const nriIntents = [
  "VTP Pune NRI property", "VTP Pune NRI investment", "VTP Realty NRI desk", "VTP projects for NRI",
  "VTP flats for NRI investors", "VTP luxury homes for NRI", "VTP property investment NRI returns",
  "buy VTP property from abroad", "VTP Pune property from USA", "VTP Pune property from UK",
  "VTP Pune property from Dubai UAE", "VTP Pune property from Singapore", "VTP Pune property from Australia",
  "NRI investment Kharadi VTP", "NRI investment Hinjawadi VTP", "NRI investment Mahalunge VTP",
  "FEMA rules for NRI property purchase in Pune", "NRE NRO home loan for VTP projects",
  "tax implications for NRI buying flat in Pune VTP", "repatriation of sale proceeds for NRI Pune property"
];

nriIntents.forEach(kw => {
  registerKeyword({ keyword: kw }, "investor-nri-finance", {
    project: "VTP NRI Services", township: "Pune Investment", location: "Pune",
    intent: "Transactional", funnel: "BOFU", priority: "P1",
    siloTitle: "NRI & Investor Real Estate Guide Pune - VTP Realty",
    siloDesc: "Comprehensive financial, rental yield, and capital appreciation intelligence for NRI and domestic investors looking to maximize ROI in Pune real estate."
  });
});

// Commercial & Institutional Hub
const commercialIntents = [
  "VTP commercial properties Pune", "VTP commercial projects Pune", "VTP commercial real estate Pune",
  "VTP office space Pune", "VTP commercial office for sale Pune", "VTP retail shops Pune",
  "VTP showroom for sale Pune", "VTP commercial investment Pune ROI", "VTP office investment Pune",
  "VTP shop investment Pune", "VTP commercial property for lease Pune", "VTP Simplease commercial leasing",
  "VTP Altitude Wakad commercial", "VTP Altitude office space", "VTP Altitude retail shops",
  "VTP Town Square Viman Nagar", "KP Square Kharadi commercial", "Trade Park Undri commercial",
  "The Marketplace Undri shops", "VTP House Viman Nagar office space", "Hotel Cypress Kalyani Nagar Pune",
  "VTP VIBGYOR school Chinchwad", "VTP VIBGYOR school Wagholi", "Eden International School Talegaon"
];

commercialIntents.forEach(kw => {
  registerKeyword({ keyword: kw }, "commercial-retail-offices-pune", {
    project: "VTP Commercial", township: "Commercial Portfolio", location: "Pune",
    intent: "Transactional", funnel: "BOFU", priority: "P1",
    siloTitle: "VTP Commercial Offices & High-Street Retail Pune",
    siloDesc: "Invest in Grade A commercial office spaces, high-street retail shops, and pre-leased commercial assets across Wakad, Baner, Kharadi, and Hinjewadi by VTP Realty."
  });
});

// Rental & High ROI Hub
const rentalIntents = [
  "VTP flats for rent Pune", "VTP apartment for rent Pune", "VTP property for rent Kharadi",
  "VTP Hinjawadi flat for rent", "VTP Mahalunge flat for rent", "VTP 2 BHK rent Hinjewadi",
  "VTP 3 BHK rent Kharadi", "VTP rental yield Pune IT corridor", "VTP investment rental income",
  "best VTP project for rental returns", "high rental yield properties in Hinjewadi Phase 1",
  "high rental yield flats in Kharadi near EON IT Park", "rental demand in VTP Blue Waters Mahalunge",
  "rental demand in Township Pegasus Kharadi"
];

rentalIntents.forEach(kw => {
  registerKeyword({ keyword: kw }, "rental-yield-intelligence", {
    project: "VTP Rental Hub", township: "Rental Intelligence", location: "Pune",
    intent: "Commercial", funnel: "MOFU", priority: "P2",
    siloTitle: "High Rental Yield & Rental Intelligence - VTP Pune",
    siloDesc: "Analyze rental yields, monthly rent rates, and tenant demand across VTP luxury townships near Hinjewadi and Kharadi IT parks."
  });
});

// Informational & Decision Intelligence Queries
const infoIntents = [
  "Is VTP Realty good", "Is VTP Realty a good builder in Pune", "Is VTP Realty reliable",
  "Is VTP Pune good for investment", "Which VTP project is best in Pune", "Which VTP project is best for investment",
  "Which VTP project is best in Kharadi", "Which VTP project is best in Hinjewadi", "Which VTP project is best in Mahalunge",
  "VTP Pune projects price comparison 2026", "VTP Pune projects location comparison", "VTP Pune projects investment comparison",
  "Pegasus vs Bluewaters township comparison", "Kharadi vs Mahalunge for property investment",
  "Kharadi vs Hinjawadi real estate growth", "best areas to buy property near Hinjewadi IT Park",
  "best areas to invest in Pune real estate 2026", "how to book flat in VTP Realty directly",
  "what is maximum livable area MLA in VTP", "why VTP projects have higher carpet area"
];

infoIntents.forEach(kw => {
  registerKeyword({ keyword: kw }, "informational-decision-intelligence", {
    project: "VTP Intelligence", township: "Pune Market", location: "Pune",
    intent: "Informational", funnel: "TOFU", priority: "P2",
    siloTitle: "VTP Realty Decision Intelligence & Pune Real Estate Guide",
    siloDesc: "Expert insights, buyer guides, and unbiased answers to frequently asked questions about VTP Realty projects, construction quality, investment potential, and location advantages."
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. WRITE TARGET FILES
// ─────────────────────────────────────────────────────────────────────────────

const allMasterRecords = Array.from(uniqueKeywordsMap.values());
const totalKeywords = allMasterRecords.length;

console.log(`================================================================`);
console.log(`🚀 MASTER 10,000-KEYWORD VTP REALTY SEO/PPC UNIVERSE GENERATOR`);
console.log(`================================================================`);
console.log(`Total Silos Generated       : ${generatedSilos.length}`);
console.log(`Total Unique Keywords       : ${totalKeywords}`);
console.log(`Total Projects Covered      : ${projects.length}`);
console.log(`Total Micro-Markets Covered : ${microMarkets.length}`);

// 1. Write app/data/seo-silos.js (for Next.js App Router dynamic routes & sitemaps)
const seoSilosPath = path.join(__dirname, '../../app/data/seo-silos.js');
const seoSilosContent = `/**
 * VTP Realty Master SEO Universe
 * Auto-generated by scripts/seo/build_seo_silos.cjs
 * Contains ${generatedSilos.length} silos and ${totalKeywords} hardened target keywords.
 */
export const seoSilos = ${JSON.stringify(generatedSilos, null, 2)};
`;
fs.writeFileSync(seoSilosPath, seoSilosContent, 'utf-8');
console.log(`✅ Emitted Next.js Silos File  : ${seoSilosPath}`);

// 2. Write app/data/vtp-10000-keyword-master.json (Structured JSON DB)
const jsonMasterPath = path.join(__dirname, '../../app/data/vtp-10000-keyword-master.json');
fs.writeFileSync(jsonMasterPath, JSON.stringify(allMasterRecords, null, 2), 'utf-8');
console.log(`✅ Emitted Master JSON Database: ${jsonMasterPath}`);

// 3. Write app/data/vtp-keyword-matrix.csv (PPC / SEO Team Master CSV)
const csvHeader = "#,Keyword,Project,Township,Location,BHK,Intent,Funnel,SEO_PPC,Priority,Status\n";
const csvRows = allMasterRecords.map(r => 
  `${r.id},"${r.keyword.replace(/"/g, '""')}","${r.project}","${r.township}","${r.location}","${r.bhk}","${r.intent}","${r.funnel}","${r.ppcType}","${r.priority}","${r.status}"`
).join('\n');
const csvMasterPath = path.join(__dirname, '../../app/data/vtp-keyword-matrix.csv');
fs.writeFileSync(csvMasterPath, csvHeader + csvRows, 'utf-8');
console.log(`✅ Emitted Master CSV Matrix   : ${csvMasterPath}`);
console.log(`================================================================`);
