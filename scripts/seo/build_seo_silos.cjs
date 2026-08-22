const fs = require('fs');
const path = require('path');

// 1. Projects Array
const projects = [
  // Hinjewadi / West Pune
  { name: "VTP Monarque", slug: "vtp-monarque", location: "Hinjewadi Phase 1", bhks: ["2 BHK", "3 BHK", "4 BHK", "Duplex", "Mansion"], rera: "P52100077322 / P52100079440" },
  { name: "VTP Volare", slug: "vtp-volare", location: "Hinjewadi Phase 1", bhks: ["2 BHK", "3 BHK"], rera: "P52100078491" },
  { name: "VTP High Flyers", slug: "vtp-high-flyers", location: "Hinjewadi Phase 1", bhks: ["2 BHK", "3 BHK"], rera: "P52100053912" },
  { name: "VTP Bellissimo", slug: "vtp-bellissimo", location: "Hinjewadi Phase 1", bhks: ["2 BHK", "3 BHK"], rera: "P52100033839" },
  { name: "VTP Earth One", slug: "vtp-earth-one", location: "Mahalunge", bhks: ["2 BHK", "3 BHK", "4 BHK", "Simplex", "Duplex"], rera: "P52100048489 / P52100051025" },
  { name: "VTP Blue Waters", slug: "vtp-blue-waters", location: "Mahalunge", bhks: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Villas"], rera: "P52100026772" },
  { name: "VTP Bel Air", slug: "vtp-bel-air", location: "Mahalunge", bhks: ["1 BHK", "2 BHK", "3 BHK"], rera: "P52100020326" },
  { name: "VTP Leonara", slug: "vtp-leonara", location: "Mahalunge", bhks: ["1 BHK", "2 BHK", "3 BHK"], rera: "P52100019956" },
  { name: "VTP Alpine", slug: "vtp-alpine", location: "Mahalunge", bhks: ["2 BHK", "3 BHK", "4 BHK"], rera: "P52100020325" },
  { name: "VTP Aethereus", slug: "vtp-aethereus", location: "Mahalunge", bhks: ["2 BHK", "3 BHK"], rera: "P52100026772" },
  
  // Kharadi / East Pune
  { name: "VTP Euphoria", slug: "vtp-euphoria", location: "Kharadi", bhks: ["1 BHK", "2 BHK", "3 BHK"], rera: "P52100048447" },
  { name: "VTP Flamante", slug: "vtp-flamante", location: "Kharadi", bhks: ["2 BHK", "3 BHK", "4 BHK"], rera: "P52100051859" },
  { name: "VTP Dolce Vita", slug: "vtp-dolce-vita", location: "Kharadi", bhks: ["1 BHK", "2 BHK", "3 BHK"], rera: "P52100053911" },
  { name: "VTP Pegasus", slug: "vtp-pegasus", location: "New Kharadi", bhks: ["1 BHK", "2 BHK", "3 BHK", "Villas"], rera: "P52100030686" },
  { name: "VTP Velvet Villas", slug: "vtp-velvet-villas", location: "Kharadi", bhks: ["3 BHK", "5 BHK", "Luxury Villa"], rera: "P52100033838" },
  { name: "VTP Cygnus", slug: "vtp-cygnus", location: "Kharadi", bhks: ["2 BHK", "3 BHK"], rera: "P52100030686" },
  { name: "VTP Altair", slug: "vtp-altair", location: "Kharadi", bhks: ["3 BHK"], rera: "P52100030687" },
  { name: "VTP Aurelia", slug: "vtp-aurelia", location: "New Kharadi", bhks: ["2 BHK", "3 BHK"], rera: "P52100054321" },
  { name: "VTP One", slug: "vtp-one", location: "Kharadi", bhks: ["2 BHK", "3 BHK"], rera: "P52100030688" },

  // Bavdhan / Baner / Sus
  { name: "VTP Cielo", slug: "vtp-cielo", location: "Bavdhan", bhks: ["2 BHK", "3 BHK", "4 BHK"], rera: "P52100052414" },
  { name: "VTP NatureScape", slug: "vtp-naturescape", location: "Bavdhan", bhks: ["2 BHK", "3 BHK", "4 BHK"], rera: "P52100055234" },
  { name: "VTP Sierra", slug: "vtp-sierra", location: "Baner-Sus", bhks: ["2 BHK", "3 BHK"], rera: "P52100030689" },
  { name: "VTP Verve", slug: "vtp-verve", location: "Baner-Sus", bhks: ["2 BHK", "3 BHK"], rera: "P52100030690" },
  { name: "VTP Magnum Opus", slug: "vtp-magnum-opus", location: "Baner Next", bhks: ["2 BHK", "3 BHK", "4 BHK"], rera: "P52100030691" },
  { name: "VTP Solitaire", slug: "vtp-solitaire", location: "Baner-Pashan", bhks: ["2 BHK", "3 BHK", "4 BHK"], rera: "P52100020324" },
  { name: "VTP HiLife", slug: "vtp-hilife", location: "Wakad", bhks: ["2 BHK", "3 BHK"], rera: "P52100020323" },

  // South & Central Pune
  { name: "VTP Celesta", slug: "vtp-celesta", location: "NIBM Road", bhks: ["2 BHK", "3 BHK"], rera: "P52100020322" },
  { name: "VTP Purvanchal", slug: "vtp-purvanchal", location: "Wagholi", bhks: ["2 BHK", "3 BHK"], rera: "P52100020321" },
  { name: "VTP The Landmark", slug: "vtp-the-landmark", location: "Undri", bhks: ["2 BHK", "3 BHK"], rera: "P52100020320" },

  // Urban Series
  { name: "VTP Urban Life", slug: "vtp-urban-life", location: "Talegaon", bhks: ["1 BHK", "2 BHK", "3 BHK"], rera: "P52100018273" },
  { name: "VTP Urban Nest", slug: "vtp-urban-nest", location: "Undri", bhks: ["1.5 BHK", "2 BHK", "3 BHK"], rera: "P52100018274" },
  { name: "VTP Urban Soul", slug: "vtp-urban-soul", location: "Kharadi", bhks: ["2 BHK", "3 BHK"], rera: "P52100018275" },
  { name: "VTP Urban Rise", slug: "vtp-urban-rise", location: "Pisoli", bhks: ["1 BHK", "2 BHK", "3 BHK"], rera: "P52100018276" },
  { name: "VTP Urban Balance", slug: "vtp-urban-balance", location: "Hadapsar", bhks: ["2 BHK", "3 BHK"], rera: "P52100018277" },
  { name: "VTP Urban Space", slug: "vtp-urban-space", location: "NIBM", bhks: ["2 BHK", "3 BHK"], rera: "P52100018278" },
  { name: "VTP Urban Nirvana", slug: "vtp-urban-nirvana", location: "Kondhwa-Pisoli", bhks: ["1 BHK", "2 BHK", "3 BHK"], rera: "P52100018279" },

  // Commercial & Retail
  { name: "VTP Altitude", slug: "vtp-altitude", location: "Wakad", bhks: ["Commercial Office", "Retail Shop"], rera: "P52100030692" },
  { name: "VTP Trade Park", slug: "vtp-trade-park", location: "Undri", bhks: ["Commercial Space", "Retail Shop"], rera: "P52100030693" },
  { name: "VTP Town Square", slug: "vtp-town-square", location: "Mahalunge", bhks: ["Retail Shop", "Office"], rera: "P52100030694" },
  { name: "VTP KP Square", slug: "vtp-kp-square", location: "Chinchwad", bhks: ["Retail Space", "Office Suite"], rera: "P52100030695" },
  { name: "VTP Marketplace", slug: "vtp-marketplace", location: "Undri", bhks: ["High Street Retail", "Office"], rera: "P52100030696" }
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

// Generate Silos
const generatedSilos = [];

// Silo 1: Master Brand & High-Intent BOFU
generatedSilos.push({
  id: "vtp-brand-master",
  title: "VTP Realty Pune - Official Brand & Master Portfolio",
  description: "Explore all official residential and commercial projects by VTP Realty across Pune with authentic RERA approvals, direct booking, and transparent price lists.",
  slugs: [
    { slug: "vtp-realty-pune", keyword: "VTP Realty Pune" },
    { slug: "vtp-projects-pune", keyword: "VTP Projects Pune" },
    { slug: "vtp-properties-pune", keyword: "VTP Properties Pune" },
    { slug: "vtp-new-launch-projects-pune", keyword: "VTP New Launch Projects Pune" },
    { slug: "vtp-luxury-apartments-pune", keyword: "VTP Luxury Apartments Pune" },
    { slug: "vtp-townships-pune", keyword: "VTP Townships Pune" },
    { slug: "vtp-realty-price-list-pune", keyword: "VTP Realty Price List Pune" },
    { slug: "vtp-booking-online-pune", keyword: "VTP Booking Online Pune" },
    { slug: "vtp-site-visit-appointment", keyword: "VTP Site Visit Appointment" },
    { slug: "vtp-maharera-numbers-list", keyword: "VTP MahaRERA Numbers List" },
    { slug: "vtp-realty-customer-reviews", keyword: "VTP Realty Customer Reviews" },
    { slug: "best-vtp-project-for-investment-pune", keyword: "Best VTP Project for Investment Pune" },
    { slug: "vtp-property-near-me-pune", keyword: "VTP Property Near Me Pune" },
    { slug: "vtp-sales-office-contact-number", keyword: "VTP Sales Office Contact Number" }
  ]
});

// Silo per Project
projects.forEach(p => {
  const projectSlugs = [];
  
  // 1. Core keywords
  projectSlugs.push({ slug: `${p.slug}-pune`, keyword: `${p.name} Pune` });
  projectSlugs.push({ slug: `${p.slug}-${slugify(p.location)}`, keyword: `${p.name} ${p.location}` });
  projectSlugs.push({ slug: `${p.slug}-price-list`, keyword: `${p.name} Price List` });
  projectSlugs.push({ slug: `${p.slug}-floor-plan-pdf`, keyword: `${p.name} Floor Plan PDF` });
  projectSlugs.push({ slug: `${p.slug}-master-plan-layout`, keyword: `${p.name} Master Plan Layout` });
  projectSlugs.push({ slug: `${p.slug}-brochure-download`, keyword: `${p.name} Brochure Download` });
  projectSlugs.push({ slug: `${p.slug}-amenities-clubhouse`, keyword: `${p.name} Amenities & Clubhouse` });
  projectSlugs.push({ slug: `${p.slug}-location-map`, keyword: `${p.name} Location Map` });
  projectSlugs.push({ slug: `${p.slug}-reviews-feedback`, keyword: `${p.name} Reviews & Feedback` });
  projectSlugs.push({ slug: `${p.slug}-possession-date-construction-status`, keyword: `${p.name} Possession Date & Construction Status` });
  projectSlugs.push({ slug: `${p.slug}-maharera-number`, keyword: `${p.name} MahaRERA Number` });
  projectSlugs.push({ slug: `${p.slug}-site-visit-booking`, keyword: `${p.name} Site Visit & Booking` });
  projectSlugs.push({ slug: `${p.slug}-investment-roi-review`, keyword: `${p.name} Investment ROI Review` });
  projectSlugs.push({ slug: `buy-${p.slug}-flats-for-sale`, keyword: `Buy ${p.name} Flats for Sale` });

  // 2. BHK specific permutations
  p.bhks.forEach(bhk => {
    const bhkSlug = slugify(bhk);
    projectSlugs.push({ slug: `${p.slug}-${bhkSlug}-price`, keyword: `${p.name} ${bhk} Price` });
    projectSlugs.push({ slug: `${p.slug}-${bhkSlug}-floor-plan`, keyword: `${p.name} ${bhk} Floor Plan` });
  });

  generatedSilos.push({
    id: `project-${p.slug}`,
    title: `${p.name} ${p.location}`,
    description: `Complete authentic details for ${p.name} in ${p.location}. Verified MahaRERA: ${p.rera}, current price list, floor plans, and site visit booking.`,
    slugs: projectSlugs
  });
});

// Silo: Competitor Comparisons
generatedSilos.push({
  id: "competitor-comparisons",
  title: "VTP Projects vs Top Competitors Pune",
  description: "Comprehensive head-to-head comparison of VTP projects against Godrej, Kolte Patil, Lodha, and Panchshil across Pune's prime corridors.",
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
    { slug: "vtp-cielo-vs-rohan-ekam", keyword: "VTP Cielo vs Rohan Ekam Bavdhan" },
    { slug: "vtp-naturescape-vs-kolte-patil-24k", keyword: "VTP NatureScape vs Kolte Patil 24K Glamore" },
    { slug: "vtp-vs-godrej-properties-pune-comparison", keyword: "VTP vs Godrej Properties Pune Comparison" },
    { slug: "vtp-vs-kolte-patil-pune", keyword: "VTP vs Kolte Patil Pune" },
    { slug: "vtp-vs-amanora-pune", keyword: "VTP vs Amanora Pune" }
  ]
});

// Silo: Multilingual High-Intent
generatedSilos.push({
  id: "multilingual-pune-real-estate",
  title: "VTP Realty Pune - Multilingual High Intent Hub",
  description: "पुणे आणि हिंजवडी, महाळुंगे, खाराडी मधील व्हीटीपी प्रोजेक्ट्सची संपूर्ण माहिती - किंमत, बुकिंग व साईट व्हिजिट. VTP property booking & flat price in Pune.",
  slugs: [
    { slug: "vtp-property-pune-mein", keyword: "VTP Property Pune Mein" },
    { slug: "pune-mein-vtp-flat-lena-hai", keyword: "Pune Mein VTP Flat Lena Hai" },
    { slug: "vtp-monarque-price-hinjewadi-mein", keyword: "VTP Monarque Price Hinjewadi Mein" },
    { slug: "vtp-flat-booking-pune-mein", keyword: "VTP Flat Booking Pune Mein" },
    { slug: "vtp-project-best-kaunsa-hai-pune", keyword: "VTP Project Best Kaunsa Hai Pune" },
    { slug: "vtp-flat-pune-marathi", keyword: "VTP फ्लॅट पुणे" },
    { slug: "vtp-hinjewadi-property-marathi", keyword: "VTP हिंजवडी प्रॉपर्टी" },
    { slug: "vtp-kharadi-flat-marathi", keyword: "VTP खाराडी फ्लॅट" },
    { slug: "vtp-mahalunge-property-marathi", keyword: "VTP महाळुंगे प्रॉपर्टी" },
    { slug: "vtp-pune-navin-project-marathi", keyword: "VTP पुणे नवीन प्रोजेक्ट" },
    { slug: "vtp-property-guntavnuk-pune", keyword: "VTP प्रॉपर्टी गुंतवणूक पुणे" }
  ]
});

const totalKeywords = generatedSilos.reduce((acc, s) => acc + s.slugs.length, 0);
console.log(`Generated ${generatedSilos.length} silos containing a total of ${totalKeywords} high-intent keywords.`);

const outputContent = `export const seoSilos = ${JSON.stringify(generatedSilos, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, 'app/data/seo-silos.js'), outputContent, 'utf-8');
console.log('Saved seo-silos.js successfully.');
