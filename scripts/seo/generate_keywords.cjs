const fs = require('fs');
const path = require('path');

// 1. Projects Data
const projects = [
  // Hinjewadi / West Pune
  { name: "VTP Monarque", slug: "vtp-monarque", location: "Hinjewadi Phase 1", bhks: ["2 BHK", "3 BHK", "4 BHK", "Duplex", "Mansion"], rera: "P52100077322 / P52100079440", highlights: "Dual luxury clubhouses, infinity edge pool, adjacent to Rajiv Gandhi Infotech Park Phase 1." },
  { name: "VTP Volare", slug: "vtp-volare", location: "Hinjewadi Phase 1", bhks: ["2 BHK", "3 BHK"], rera: "P52100078491", highlights: "Zero commute luxury living in Hinjewadi Phase 1 with podium lifestyle amenities." },
  { name: "VTP High Flyers", slug: "vtp-high-flyers", location: "Hinjewadi Phase 1", bhks: ["2 BHK", "3 BHK"], rera: "P52100053912", highlights: "Modern high-rise residential towers designed for ambitious tech professionals." },
  { name: "VTP Bellissimo", slug: "vtp-bellissimo", location: "Hinjewadi Phase 1", bhks: ["2 BHK", "3 BHK"], rera: "P52100033839", highlights: "Italian-themed luxury apartments with 33+ lifestyle amenities in Hinjewadi." },
  { name: "VTP Earth One", slug: "vtp-earth-one", location: "Mahalunge", bhks: ["2 BHK", "3 BHK", "4 BHK", "Simplex", "Duplex"], rera: "P52100048489 / P52100051025", highlights: "Flagship 200+ acre Township Blue Waters riverside development with MLA architecture." },
  { name: "VTP Blue Waters", slug: "vtp-blue-waters", location: "Mahalunge", bhks: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Villas"], rera: "P52100026772", highlights: "West Pune's most iconic 200+ acre master-planned mega township on the Mula-Mutha river." },
  { name: "VTP Bel Air", slug: "vtp-bel-air", location: "Mahalunge", bhks: ["1 BHK", "2 BHK", "3 BHK"], rera: "P52100020326", highlights: "Delivered & ready-to-move-in luxury cluster at Township Blue Waters Mahalunge." },
  { name: "VTP Leonara", slug: "vtp-leonara", location: "Mahalunge", bhks: ["1 BHK", "2 BHK", "3 BHK"], rera: "P52100019956", highlights: "Premier residential towers with grand clubhouse and riverfront views in Mahalunge." },
  { name: "VTP Alpine", slug: "vtp-alpine", location: "Mahalunge", bhks: ["2 BHK", "3 BHK", "4 BHK"], rera: "P52100020325", highlights: "Scenic hill and river views within VTP Blue Waters with high rental demand." },
  { name: "VTP Aethereus", slug: "vtp-aethereus", location: "Mahalunge", bhks: ["2 BHK", "3 BHK"], rera: "P52100026772", highlights: "Ultra-luxury high-rise residences with panoramic views of the Mahalunge biodiversity corridor." },
  
  // Kharadi / East Pune
  { name: "VTP Euphoria", slug: "vtp-euphoria", location: "Kharadi", bhks: ["1 BHK", "2 BHK", "3 BHK"], rera: "P52100048447", highlights: "East Pune's largest luxury cluster with over 3 acres of amenities in New Kharadi." },
  { name: "VTP Flamante", slug: "vtp-flamante", location: "Kharadi", bhks: ["2 BHK", "3 BHK", "4 BHK"], rera: "P52100051859", highlights: "Luxe air-conditioned residences with glass-facade aesthetics in Kharadi." },
  { name: "VTP Dolce Vita", slug: "vtp-dolce-vita", location: "Kharadi", bhks: ["1 BHK", "2 BHK", "3 BHK"], rera: "P52100053911", highlights: "Contemporary lifestyle homes next to EON IT Park and World Trade Center Kharadi." },
  { name: "VTP Pegasus", slug: "vtp-pegasus", location: "New Kharadi", bhks: ["1 BHK", "2 BHK", "3 BHK", "Villas"], rera: "P52100030686", highlights: "100+ acre mega integrated township in East Pune with high-street commercial zone." },
  { name: "VTP Velvet Villas", slug: "vtp-velvet-villas", location: "Kharadi", bhks: ["3 BHK", "5 BHK", "Luxury Villa"], rera: "P52100033838", highlights: "Exclusive gated villa enclave with private elevators, plunge pools, and landscaped lawns." },
  { name: "VTP Cygnus", slug: "vtp-cygnus", location: "Kharadi", bhks: ["2 BHK", "3 BHK"], rera: "P52100030686", highlights: "Ultra-efficient MLA layout residences within Township Pegasus New Kharadi." },
  { name: "VTP Altair", slug: "vtp-altair", location: "Kharadi", bhks: ["3 BHK", "Luxury Residences"], rera: "P52100030687", highlights: "Premium high-altitude towers with 3-tier wellness and sports facilities." },
  { name: "VTP Aurelia", slug: "vtp-aurelia", location: "New Kharadi", bhks: ["2 BHK", "3 BHK"], rera: "P52100054321", highlights: "Smart-automated residences with zero space wastage near riverside promenade." },
  { name: "VTP One", slug: "vtp-one", location: "Kharadi", bhks: ["2 BHK", "3 BHK"], rera: "P52100030688", highlights: "Boutique luxury residences positioned close to major IT SEZs and commercial hubs." },

  // Bavdhan / Baner / Sus
  { name: "VTP Cielo", slug: "vtp-cielo", location: "Bavdhan", bhks: ["2 BHK", "3 BHK", "4 BHK"], rera: "P52100052414", highlights: "Scenic hill-facing luxury apartments in Bavdhan with seamless Kothrud connectivity." },
  { name: "VTP NatureScape", slug: "vtp-naturescape", location: "Bavdhan", bhks: ["2 BHK", "3 BHK", "4 BHK"], rera: "P52100055234", highlights: "Biophilic architectural design surrounded by pristine NDA forest greens in West Bavdhan." },
  { name: "VTP Sierra", slug: "vtp-sierra", location: "Baner-Sus", bhks: ["2 BHK", "3 BHK"], rera: "P52100030689", highlights: "Modern high-rise residential project with 360-degree hill and city views." },
  { name: "VTP Verve", slug: "vtp-verve", location: "Baner-Sus", bhks: ["2 BHK", "3 BHK"], rera: "P52100030690", highlights: "Urban lifestyle community with zero-brokerage direct developer pricing." },
  { name: "VTP Magnum Opus", slug: "vtp-magnum-opus", location: "Baner Next", bhks: ["2 BHK", "3 BHK", "4 BHK"], rera: "P52100030691", highlights: "Monumental architectural design delivering maximum usable carpet area in Baner." },
  { name: "VTP Solitaire", slug: "vtp-solitaire", location: "Baner-Pashan", bhks: ["2 BHK", "3 BHK", "4 BHK"], rera: "P52100020324", highlights: "Exclusive boutique residences nestled between Baner and Pashan hill reserves." },
  { name: "VTP HiLife", slug: "vtp-hilife", location: "Wakad", bhks: ["2 BHK", "3 BHK"], rera: "P52100020323", highlights: "Iconic completed high-rise community near Dange Chowk and Mumbai-Pune Expressway." },

  // South & Central Pune
  { name: "VTP Celesta", slug: "vtp-celesta", location: "NIBM Road", bhks: ["2 BHK", "3 BHK"], rera: "P52100020322", highlights: "South Pune's premier gated community with panoramic views of the NIBM reserve." },
  { name: "VTP Purvanchal", slug: "vtp-purvanchal", location: "Wagholi", bhks: ["2 BHK", "3 BHK"], rera: "P52100020321", highlights: "Large-scale township living with 30+ amenities near EON IT Park." },
  { name: "VTP The Landmark", slug: "vtp-the-landmark", location: "Undri", bhks: ["2 BHK", "3 BHK"], rera: "P52100020320", highlights: "Spacious family apartments near Pune's top international schools in Undri." },

  // Urban Series
  { name: "VTP Urban Life", slug: "vtp-urban-life", location: "Talegaon", bhks: ["1 BHK", "2 BHK", "3 BHK"], rera: "P52100018273", highlights: "Clean air and scenic hillside living in Talegaon with industrial corridor access." },
  { name: "VTP Urban Nest", slug: "vtp-urban-nest", location: "Undri", bhks: ["1.5 BHK", "2 BHK", "3 BHK"], rera: "P52100018274", highlights: "Integrated luxury residential community with school and shopping access." },
  { name: "VTP Urban Soul", slug: "vtp-urban-soul", location: "Kharadi", bhks: ["2 BHK", "3 BHK"], rera: "P52100018275", highlights: "Urban residences with high rental yields in Pune's major IT corridor." },
  { name: "VTP Urban Rise", slug: "vtp-urban-rise", location: "Pisoli", bhks: ["1 BHK", "2 BHK", "3 BHK"], rera: "P52100018276", highlights: "Affordable luxury apartments with full clubhouse amenities in South Pune." },
  { name: "VTP Urban Balance", slug: "vtp-urban-balance", location: "Hadapsar", bhks: ["2 BHK", "3 BHK"], rera: "P52100018277", highlights: "Close to Magarpatta City and SP Infocity with zero commute friction." },
  { name: "VTP Urban Space", slug: "vtp-urban-space", location: "NIBM", bhks: ["2 BHK", "3 BHK"], rera: "P52100018278", highlights: "Refined aesthetic living spaces in the elite NIBM green corridor." },
  { name: "VTP Urban Nirvana", slug: "vtp-urban-nirvana", location: "Kondhwa-Pisoli", bhks: ["1 BHK", "2 BHK", "3 BHK"], rera: "P52100018279", highlights: "Peaceful gated residential community with round-the-clock security." },

  // Commercial & Retail
  { name: "VTP Altitude", slug: "vtp-altitude", location: "Wakad", bhks: ["Commercial Office", "Retail Shop", "Showroom"], rera: "P52100030692", highlights: "Grade-A commercial workspace towers with rooftop amenities in Wakad." },
  { name: "VTP Trade Park", slug: "vtp-trade-park", location: "Undri", bhks: ["Commercial Space", "Retail Shop", "Office"], rera: "P52100030693", highlights: "High-street retail and commercial business hub in South Pune." },
  { name: "VTP Town Square", slug: "vtp-town-square", location: "Mahalunge", bhks: ["Retail Shop", "Showroom", "Office"], rera: "P52100030694", highlights: "600m high-street commercial boulevard within Township Blue Waters." },
  { name: "VTP KP Square", slug: "vtp-kp-square", location: "Chinchwad", bhks: ["Retail Space", "Office Suite"], rera: "P52100030695", highlights: "Central commercial business center with high pedestrian footfall." },
  { name: "VTP Marketplace", slug: "vtp-marketplace", location: "Undri", bhks: ["High Street Retail", "Boutique Office"], rera: "P52100030696", highlights: "Daily convenience and luxury retail center serving 5000+ resident families." }
];

console.log(`Loaded ${projects.length} VTP projects.`);
