const fs = require('fs');
const path = require('path');

const PROJECTS_FILE = path.join(__dirname, '../../app/data/projects.json');

const missingProjects = [
  {
    name: "VTP LEONARA",
    township: "Township BLUEWATERS",
    location: "Mahalunge, Pune",
    slug: "vtp-leonara-mahalunge-pune",
    link: "https://vtprealty.in/projects/vtp-leonara-mahalunge-pune",
    image: "/images/premium_placeholders/exterior_luxury_1.jpg",
    seoTitle: "VTP LEONARA in Mahalunge, Pune | VTP BLUEWATERS",
    overview: "Generic overview for VTP Leonara that will be rewritten by TF-IDF script.",
    seoDescription: "Generic description for VTP Leonara that will be rewritten by TF-IDF script.",
    amenities: [
      { name: "Smart Home Features", icon: "Cpu" },
      { name: "Premium Club Leonara", icon: "Building" },
      { name: "Landscaped Gardens", icon: "Leaf" },
      { name: "Swimming Pool", icon: "Waves" }
    ],
    specifications: [
      { category: "Flooring", details: "Vitrified Tiles in all rooms." },
      { category: "Kitchen", details: "Granite Platform with SS Sink." },
      { category: "Security", details: "Video Door Phone & Intercom." }
    ],
    locationHighlights: [
      { title: "Hinjawadi IT Park", distance: "10 Mins" },
      { title: "Balewadi High Street", distance: "15 Mins" },
      { title: "Upcoming Metro", distance: "5 Mins" }
    ],
    masterLayout: "/images/real_vtp/about_34bebbbd76.jpg",
    floorPlans: [
      { type: "1 BHK", carpetArea: "425 Sq.Ft.", image: "/images/premium_placeholders/floor_plan_2bhk.jpg" },
      { type: "2 BHK", carpetArea: "630 Sq.Ft.", image: "/images/premium_placeholders/floor_plan_2bhk.jpg" },
      { type: "3 BHK", carpetArea: "870 Sq.Ft.", image: "/images/premium_placeholders/floor_plan_3bhk.jpg" }
    ],
    maharera: ["P52100019559"],
    gallery: [
      "/images/premium_placeholders/exterior_luxury_1.jpg",
      "/images/premium_placeholders/amenity_pool.jpg",
      "/images/premium_placeholders/amenity_clubhouse.jpg"
    ]
  },
  {
    name: "VTP BEL AIR",
    township: "Township BLUEWATERS",
    location: "Mahalunge, Pune",
    slug: "vtp-bel-air-mahalunge-pune",
    link: "https://vtprealty.in/projects/vtp-bel-air-mahalunge-pune",
    image: "/images/premium_placeholders/exterior_luxury_2.jpg",
    seoTitle: "VTP BEL AIR in Mahalunge, Pune | VTP BLUEWATERS",
    overview: "Generic overview for VTP Bel Air that will be rewritten by TF-IDF script.",
    seoDescription: "Generic description for VTP Bel Air that will be rewritten by TF-IDF script.",
    amenities: [
      { name: "Riverfront Views", icon: "Waves" },
      { name: "Club Bel Air", icon: "Building" },
      { name: "Yoga Pavilion", icon: "Leaf" },
      { name: "Advanced Security", icon: "Cpu" }
    ],
    specifications: [
      { category: "Flooring", details: "Premium Vitrified Tiles." },
      { category: "Kitchen", details: "Modular Kitchen Provisions." },
      { category: "Security", details: "3-Tier Security System." }
    ],
    locationHighlights: [
      { title: "Hinjawadi IT Park", distance: "10 Mins" },
      { title: "Balewadi High Street", distance: "15 Mins" },
      { title: "Mumbai Highway", distance: "5 Mins" }
    ],
    masterLayout: "/images/real_vtp/overview_dfe87892a1.jpg",
    floorPlans: [
      { type: "2 BHK", carpetArea: "730 Sq.Ft.", image: "/images/premium_placeholders/floor_plan_2bhk.jpg" },
      { type: "3 BHK", carpetArea: "980 Sq.Ft.", image: "/images/premium_placeholders/floor_plan_3bhk.jpg" }
    ],
    maharera: ["P52100020331", "P52100020368"],
    gallery: [
      "/images/premium_placeholders/exterior_luxury_2.jpg",
      "/images/premium_placeholders/amenity_gym.jpg",
      "/images/premium_placeholders/amenity_garden.jpg"
    ]
  },
  {
    name: "VTP ALPINE",
    township: "Township BLUEWATERS",
    location: "Mahalunge, Pune",
    slug: "vtp-alpine-mahalunge-pune",
    link: "https://vtprealty.in/projects/vtp-alpine-mahalunge-pune",
    image: "/images/real_vtp/waterfall_15a1aa4cf5.webp",
    seoTitle: "VTP ALPINE in Mahalunge, Pune | VTP BLUEWATERS",
    overview: "Generic overview for VTP Alpine that will be rewritten by TF-IDF script.",
    seoDescription: "Generic description for VTP Alpine that will be rewritten by TF-IDF script.",
    amenities: [
      { name: "High-Rise Living", icon: "Building" },
      { name: "Sports Arena", icon: "Dumbbell" },
      { name: "Sky Garden", icon: "Leaf" },
      { name: "Smart Controls", icon: "Cpu" }
    ],
    specifications: [
      { category: "Flooring", details: "Large Format Vitrified Tiles." },
      { category: "Kitchen", details: "Granite Top & SS Sink." },
      { category: "Security", details: "CCTV & Video Door Phone." }
    ],
    locationHighlights: [
      { title: "Hinjawadi IT Park", distance: "10 Mins" },
      { title: "Baner", distance: "15 Mins" },
      { title: "Wakad", distance: "10 Mins" }
    ],
    masterLayout: "/images/real_vtp/Square_d896b84b5a.webp",
    floorPlans: [
      { type: "2 BHK", carpetArea: "750 Sq.Ft.", image: "/images/premium_placeholders/floor_plan_2bhk.jpg" },
      { type: "3 BHK", carpetArea: "1050 Sq.Ft.", image: "/images/premium_placeholders/floor_plan_3bhk.jpg" }
    ],
    maharera: ["P52100020112"],
    gallery: [
      "/images/real_vtp/waterfall_15a1aa4cf5.webp",
      "/images/premium_placeholders/amenity_pool.jpg"
    ]
  },
  {
    name: "VTP CYGNUS",
    township: "Township PEGASUS",
    location: "New Kharadi, Pune",
    slug: "vtp-cygnus-kharadi-pune",
    link: "https://vtprealty.in/projects/vtp-cygnus-kharadi-pune",
    image: "/images/real_vtp/w_EB_b_ANNER_1920_X1080_ca362a2b3f.jpg",
    seoTitle: "VTP CYGNUS in New Kharadi, Pune | VTP PEGASUS",
    overview: "Generic overview for VTP Cygnus that will be rewritten by TF-IDF script.",
    seoDescription: "Generic description for VTP Cygnus that will be rewritten by TF-IDF script.",
    amenities: [
      { name: "Grand Entrance", icon: "Building" },
      { name: "Jogging Track", icon: "Dumbbell" },
      { name: "Central Park", icon: "Leaf" },
      { name: "Digital Security", icon: "Cpu" }
    ],
    specifications: [
      { category: "Flooring", details: "Imported Marble finish tiles." },
      { category: "Kitchen", details: "Designer Modular Kitchen provisions." },
      { category: "Security", details: "Biometric Access." }
    ],
    locationHighlights: [
      { title: "EON IT Park", distance: "5 Mins" },
      { title: "WTC Pune", distance: "5 Mins" },
      { title: "Pune Airport", distance: "20 Mins" }
    ],
    masterLayout: "/images/real_vtp/ELEVATION_NIGHT_Lores_940868b46f.jpg",
    floorPlans: [
      { type: "1 BHK", carpetArea: "450 Sq.Ft.", image: "/images/premium_placeholders/floor_plan_2bhk.jpg" },
      { type: "2 BHK", carpetArea: "650 Sq.Ft.", image: "/images/premium_placeholders/floor_plan_2bhk.jpg" }
    ],
    maharera: ["P52100026857"],
    gallery: [
      "/images/real_vtp/w_EB_b_ANNER_1920_X1080_ca362a2b3f.jpg",
      "/images/premium_placeholders/amenity_gym.jpg"
    ]
  },
  {
    name: "VTP BELLISSIMO",
    township: "Township BLUEWATERS",
    location: "Hinjawadi, Pune",
    slug: "vtp-bellissimo-hinjawadi-pune",
    link: "https://vtprealty.in/projects/vtp-bellissimo-hinjawadi-pune",
    image: "/images/real_vtp/banner_be053a20bf.jpg",
    seoTitle: "VTP BELLISSIMO in Hinjawadi, Pune | VTP BLUEWATERS",
    overview: "Generic overview for VTP Bellissimo that will be rewritten by TF-IDF script.",
    seoDescription: "Generic description for VTP Bellissimo that will be rewritten by TF-IDF script.",
    amenities: [
      { name: "IT Park Connectivity", icon: "Building" },
      { name: "Sports Club", icon: "Dumbbell" },
      { name: "Zen Garden", icon: "Leaf" },
      { name: "Smart Pods", icon: "Cpu" }
    ],
    specifications: [
      { category: "Flooring", details: "Anti-skid tiles in balconies, Vitrified inside." },
      { category: "Kitchen", details: "Engineered Quartz Counter." },
      { category: "Security", details: "Advanced 4-tier security." }
    ],
    locationHighlights: [
      { title: "Phase 1 IT Park", distance: "2 Mins" },
      { title: "Mumbai Highway", distance: "5 Mins" },
      { title: "Metro Station", distance: "1 Mins" }
    ],
    masterLayout: "/images/real_vtp/overview_dfe87892a1.jpg",
    floorPlans: [
      { type: "2 BHK", carpetArea: "780 Sq.Ft.", image: "/images/premium_placeholders/floor_plan_2bhk.jpg" },
      { type: "3 BHK", carpetArea: "1020 Sq.Ft.", image: "/images/premium_placeholders/floor_plan_3bhk.jpg" }
    ],
    maharera: ["P52100030588"],
    gallery: [
      "/images/real_vtp/banner_be053a20bf.jpg",
      "/images/premium_placeholders/amenity_clubhouse.jpg"
    ]
  }
];

function run() {
  console.log("🚀 Initializing VTP Portfolio Expander...");
  
  if (!fs.existsSync(PROJECTS_FILE)) {
    console.error(`❌ File not found: ${PROJECTS_FILE}`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf8'));

  let maxId = Math.max(...data.map(p => p.id));

  const newProjects = missingProjects.map(p => {
    maxId++;
    return { id: maxId, ...p };
  });

  const combinedData = [...data, ...newProjects];

  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(combinedData, null, 2), 'utf8');
  console.log(`✅ Successfully injected 5 missing projects!`);
  console.log(`Total projects in DB: ${combinedData.length}`);
}

run();
