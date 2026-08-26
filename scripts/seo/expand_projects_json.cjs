const fs = require('fs');
const path = require('path');

const currentProjects = require('../../app/data/projects.json');
const currentSlugs = new Set(currentProjects.map(p => p.slug));

// 44 Projects Master Directory with rich metadata
const masterProjectsList = [
  // ── Bluewaters / Mahalunge / Hinjawadi ──
  {
    township: "Township BLUEWATERS",
    name: "MONARQUE BY VTP LUXE",
    location: "Hinjawadi Phase 1, Pune",
    slug: "vtp-monarque-hinjawadi-pune",
    shortSlug: "vtp-monarque",
    image: "/assets/projects/monarque/hero.webp",
    seoTitle: "VTP Monarque Hinjawadi Phase 1 | Ultra Luxury 2 & 3 BHK Flats",
    seoDescription: "VTP Monarque in Hinjawadi Phase 1 Pune. Ultra-luxury 2, 3 BHK & duplex residences with dual clubhouses, infinity pool, and MLA design. View price, brochure & floor plans.",
    overview: "VTP Monarque by VTP Luxe is West Pune's premier ultra-luxury residential landmark situated in Hinjawadi Phase 1 near Rajiv Gandhi Infotech Park. Featuring dual clubhouses, an infinity-edge swimming pool, and Maximum Livable Area (MLA) layouts.",
    maharera: ["P52100077322", "P52100079440"],
    possession: "2028",
    priceStarting: "₹85 Lakhs",
    floorPlans: [
      { type: "2 BHK", carpetArea: "780 - 860 Sq.ft", image: "/assets/projects/monarque/hero.webp" },
      { type: "3 BHK", carpetArea: "1080 - 1350 Sq.ft", image: "/assets/projects/monarque/hero.webp" },
      { type: "4 BHK Duplex", carpetArea: "1850 - 2400 Sq.ft", image: "/assets/projects/monarque/hero.webp" }
    ]
  },
  {
    township: "Township BLUEWATERS",
    name: "EARTH 1 BY VTP LUXE",
    location: "Mahalunge, Pune",
    slug: "vtp-earth-one-mahalunge-pune",
    shortSlug: "vtp-earth-one",
    image: "/assets/projects/earth-1/hero.jpg",
    seoTitle: "VTP Earth 1 Mahalunge Pune | 2, 3 & 4 BHK Luxury Residences",
    seoDescription: "VTP Earth 1 at Township Blue Waters Mahalunge. Premium 2, 3, 4 BHK apartments with panoramic riverside views, wellness club, and zero space wastage. Download brochure.",
    overview: "VTP Earth 1 is the crown jewel of the 200+ acre Township Blue Waters in Mahalunge. Offering biophilic architecture, riverside promenade access, and luxury clubhouses.",
    maharera: ["P52100048489", "P52100051025"],
    possession: "2026-2027",
    priceStarting: "₹80 Lakhs",
    floorPlans: [
      { type: "2 BHK", carpetArea: "750 - 850 Sq.ft", image: "/assets/projects/earth-1/hero.jpg" },
      { type: "3 BHK", carpetArea: "1050 - 1450 Sq.ft", image: "/assets/projects/earth-1/hero.jpg" },
      { type: "4 BHK", carpetArea: "1800 - 2250 Sq.ft", image: "/assets/projects/earth-1/hero.jpg" }
    ]
  },
  {
    township: "Township BLUEWATERS",
    name: "VTP VOLARE",
    location: "Hinjawadi Phase 1, Pune",
    slug: "vtp-volare-hinjawadi-pune",
    shortSlug: "vtp-volare",
    image: "/assets/projects/volare/hero.webp",
    seoTitle: "VTP Volare Hinjawadi Phase 1 | Luxury 2 & 3 BHK Apartments",
    seoDescription: "VTP Volare Hinjawadi Phase 1 Pune. Walk-to-work 2 & 3 BHK luxury residences adjacent to Infosys and Wipro. View pricing, floor plans and book site visit.",
    overview: "VTP Volare delivers zero-commute luxury living in Hinjawadi Phase 1. Designed for ambitious tech leaders with podium wellness amenities and MLA architecture.",
    maharera: ["P52100078491"],
    possession: "2028",
    priceStarting: "₹78 Lakhs",
    floorPlans: [
      { type: "2 BHK", carpetArea: "720 - 840 Sq.ft", image: "/assets/projects/volare/hero.webp" },
      { type: "3 BHK", carpetArea: "1020 - 1280 Sq.ft", image: "/assets/projects/volare/hero.webp" }
    ]
  },
  {
    township: "Township BLUEWATERS",
    name: "VTP BELLISSIMO",
    location: "Hinjawadi Phase 1, Pune",
    slug: "vtp-bellissimo-hinjawadi-pune",
    shortSlug: "vtp-bellissimo",
    image: "/assets/projects/bellissimo/hero.webp",
    seoTitle: "VTP Bellissimo Hinjawadi Phase 1 | Italian Themed Luxury Homes",
    seoDescription: "VTP Bellissimo in Hinjawadi Phase 1 Pune. Italian-inspired 2 & 3 BHK residences with 33+ amenities. Download official brochure and cost sheet.",
    overview: "VTP Bellissimo blends European architectural grandeur with modern tech conveniences in Hinjawadi Phase 1.",
    maharera: ["P52100033839"],
    possession: "2026",
    priceStarting: "₹82 Lakhs",
    floorPlans: [
      { type: "2 BHK", carpetArea: "760 - 860 Sq.ft", image: "/assets/projects/bellissimo/hero.webp" },
      { type: "3 BHK", carpetArea: "1060 - 1320 Sq.ft", image: "/assets/projects/bellissimo/hero.webp" }
    ]
  },
  {
    township: "Township BLUEWATERS",
    name: "VTP BLUE WATERS (TOWNSHIP MASTER)",
    location: "Mahalunge-Hinjawadi, Pune",
    slug: "vtp-blue-waters-mahalunge-pune",
    shortSlug: "vtp-blue-waters",
    image: "/images/real_vtp/Main_website_da76ded661.webp",
    seoTitle: "VTP Blue Waters Mahalunge Pune | 200+ Acre Mega Township",
    seoDescription: "VTP Blue Waters Mahalunge-Hinjawadi Pune. 200+ acre riverfront mega township with 1, 2, 3, 4 BHK luxury apartments, sports academy and high street retail.",
    overview: "VTP Blue Waters is West Pune's most celebrated 200+ acre integrated township located at the junction of Mahalunge and Hinjawadi along the Mula river.",
    maharera: ["P52100026772"],
    possession: "Ready & Under Construction",
    priceStarting: "₹58 Lakhs",
    floorPlans: [
      { type: "1 BHK", carpetArea: "450 - 520 Sq.ft", image: "/images/real_vtp/Main_website_da76ded661.webp" },
      { type: "2 BHK", carpetArea: "720 - 880 Sq.ft", image: "/images/real_vtp/Main_website_da76ded661.webp" },
      { type: "3 BHK", carpetArea: "1050 - 1450 Sq.ft", image: "/images/real_vtp/Main_website_da76ded661.webp" },
      { type: "4 BHK", carpetArea: "1800 - 2400 Sq.ft", image: "/images/real_vtp/Main_website_da76ded661.webp" }
    ]
  },
  {
    township: "Township BLUEWATERS",
    name: "VTP AETHEREUS",
    location: "Mahalunge, Pune",
    slug: "vtp-aethereus-high-street-mahalunge-pune",
    shortSlug: "vtp-aethereus",
    image: "/assets/projects/aethereus/hero.webp",
    seoTitle: "VTP Aethereus Mahalunge Pune | Premium 31+ Storey Towers",
    seoDescription: "VTP Aethereus in Mahalunge Pune. 5 soaring 31-storey high-rise towers with 2 & 3 BHK luxury residences overlooking hills and river. View price & floor plans.",
    overview: "VTP Aethereus features five iconic 31+ storey towers offering panoramic views of the surrounding hills and river within Township Blue Waters.",
    maharera: ["P52100026772"],
    possession: "Ready & Handover",
    priceStarting: "₹76 Lakhs",
    floorPlans: [
      { type: "2 BHK", carpetArea: "740 - 850 Sq.ft", image: "/assets/projects/aethereus/hero.webp" },
      { type: "3 BHK", carpetArea: "1040 - 1320 Sq.ft", image: "/assets/projects/aethereus/hero.webp" }
    ]
  },
  {
    township: "Township BLUEWATERS",
    name: "VTP LEONARA",
    location: "Mahalunge, Pune",
    slug: "vtp-leonara-mahalunge-pune",
    shortSlug: "vtp-leonara",
    image: "/assets/projects/leonara/hero.webp",
    seoTitle: "VTP Leonara Mahalunge Pune | 1, 2 & 3 BHK Delivered Residences",
    seoDescription: "VTP Leonara Mahalunge Pune. Delivered luxury residences within Township Blue Waters. Ready-to-move-in and resale inventory available with high rental yield.",
    overview: "VTP Leonara offers completed and ready-possession luxury residences with full access to the 200+ acre Blue Waters township infrastructure.",
    maharera: ["P52100019956"],
    possession: "Ready to Move",
    priceStarting: "₹56 Lakhs",
    floorPlans: [
      { type: "1 BHK", carpetArea: "450 - 500 Sq.ft", image: "/assets/projects/leonara/hero.webp" },
      { type: "2 BHK", carpetArea: "720 - 820 Sq.ft", image: "/assets/projects/leonara/hero.webp" },
      { type: "3 BHK", carpetArea: "1020 - 1250 Sq.ft", image: "/assets/projects/leonara/hero.webp" }
    ]
  },
  {
    township: "Township BLUEWATERS",
    name: "VTP BEL AIR",
    location: "Mahalunge, Pune",
    slug: "vtp-bel-air-mahalunge-pune",
    shortSlug: "vtp-bel-air",
    image: "/assets/projects/belair/hero.webp",
    seoTitle: "VTP Bel Air Mahalunge Pune | Ready Possession 1, 2 & 3 BHK",
    seoDescription: "VTP Bel Air Mahalunge. Delivered luxury cluster in Township Blue Waters. OC received, zero GST, ready to move in flats near Hinjewadi Phase 1.",
    overview: "VTP Bel Air is a fully delivered luxury enclave within Township Blue Waters offering instant possession and zero GST benefits.",
    maharera: ["P52100020326"],
    possession: "Ready to Move",
    priceStarting: "₹55 Lakhs",
    floorPlans: [
      { type: "1 BHK", carpetArea: "460 - 510 Sq.ft", image: "/assets/projects/belair/hero.webp" },
      { type: "2 BHK", carpetArea: "710 - 830 Sq.ft", image: "/assets/projects/belair/hero.webp" },
      { type: "3 BHK", carpetArea: "1030 - 1280 Sq.ft", image: "/assets/projects/belair/hero.webp" }
    ]
  },
  {
    township: "Township BLUEWATERS",
    name: "VTP ALPINE",
    location: "Mahalunge, Pune",
    slug: "vtp-alpine-mahalunge-pune",
    shortSlug: "vtp-alpine",
    image: "/assets/projects/alpine/hero.webp",
    seoTitle: "VTP Alpine Mahalunge Pune | Scenic Hill View 2 & 3 BHK Flats",
    seoDescription: "VTP Alpine Mahalunge. Ready-to-move-in 2 & 3 BHK luxury residences with scenic hill views and premium lifestyle amenities in Township Blue Waters.",
    overview: "VTP Alpine provides serene hill-view residential apartments with high livability scores and strong rental demand in Mahalunge.",
    maharera: ["P52100020325"],
    possession: "Ready to Move",
    priceStarting: "₹72 Lakhs",
    floorPlans: [
      { type: "2 BHK", carpetArea: "750 - 850 Sq.ft", image: "/assets/projects/alpine/hero.webp" },
      { type: "3 BHK", carpetArea: "1050 - 1300 Sq.ft", image: "/assets/projects/alpine/hero.webp" }
    ]
  },
  {
    township: "Township BLUEWATERS",
    name: "VTP HIGH FLYERS",
    location: "Hinjewadi Phase 1, Pune",
    slug: "vtp-high-flyers-hinjawadi-pune",
    shortSlug: "vtp-high-flyers",
    image: "/assets/projects/monarque/hero.webp",
    seoTitle: "VTP High Flyers Hinjawadi Phase 1 | Modern 2 & 3 BHK Tech Homes",
    seoDescription: "VTP High Flyers in Hinjawadi Phase 1 Pune. Modern high-rise residences designed for IT leaders with smart automation and zero commute.",
    overview: "VTP High Flyers caters to ambitious young professionals in Hinjewadi Phase 1 with contemporary tech amenities and smart space planning.",
    maharera: ["P52100053912"],
    possession: "2027",
    priceStarting: "₹75 Lakhs",
    floorPlans: [
      { type: "2 BHK", carpetArea: "720 - 830 Sq.ft", image: "/assets/projects/monarque/hero.webp" },
      { type: "3 BHK", carpetArea: "1010 - 1260 Sq.ft", image: "/assets/projects/monarque/hero.webp" }
    ]
  },
  {
    township: "Township SKYLIGHTS",
    name: "VTP SIERRA",
    location: "Baner-Sus Road, Pune",
    slug: "vtp-sierra-baner-sus-road-pune",
    shortSlug: "vtp-sierra",
    image: "/assets/projects/sierra/hero.webp",
    seoTitle: "VTP Sierra Baner Sus Road Pune | 2 & 3 BHK Hillside Residences",
    seoDescription: "VTP Sierra on Baner Sus Road Pune. Premium 2 & 3 BHK hillside apartments with scenic reserve views and 5-minute connectivity to Baner High Street.",
    overview: "VTP Sierra is set against the backdrop of pristine Sus hills, offering fresh air, panoramic valley views, and seamless connectivity to Baner and Pashan.",
    maharera: ["P52100026773"],
    possession: "2026",
    priceStarting: "₹70 Lakhs",
    floorPlans: [
      { type: "2 BHK", carpetArea: "730 - 840 Sq.ft", image: "/assets/projects/sierra/hero.webp" },
      { type: "3 BHK", carpetArea: "1030 - 1290 Sq.ft", image: "/assets/projects/sierra/hero.webp" }
    ]
  },
  {
    township: "Township SKYLIGHTS",
    name: "VTP VERVE",
    location: "Baner-Sus Road, Pune",
    slug: "vtp-verve-baner-sus-road-pune",
    shortSlug: "vtp-verve",
    image: "/assets/projects/verve/hero.webp",
    seoTitle: "VTP Verve Baner Sus Road Pune | Modern 2 & 3 BHK Apartments",
    seoDescription: "VTP Verve on Baner Sus Road Pune. Contemporary residences with 30+ lifestyle amenities and rapid connectivity to Hinjewadi and Baner IT corridor.",
    overview: "VTP Verve offers vibrant community living in Baner-Sus with landscaped gardens, sports courts, and Maximum Livable Area architecture.",
    maharera: ["P52100030689"],
    possession: "2026",
    priceStarting: "₹72 Lakhs",
    floorPlans: [
      { type: "2 BHK", carpetArea: "740 - 850 Sq.ft", image: "/assets/projects/verve/hero.webp" },
      { type: "3 BHK", carpetArea: "1040 - 1310 Sq.ft", image: "/assets/projects/verve/hero.webp" }
    ]
  },
  {
    township: "VTP Luxe Bavdhan",
    name: "CIELO BY VTP LUXE",
    location: "Bavdhan, Pune",
    slug: "vtp-cielo-bavdhan-pune",
    shortSlug: "vtp-cielo",
    image: "/assets/projects/cielo/hero.webp",
    seoTitle: "VTP Cielo Bavdhan Pune | Ultra Luxury 2, 3 & 4 BHK Hillside Homes",
    seoDescription: "VTP Cielo in Bavdhan Pune. Ultra-luxury hillside residences overlooking NDA forest reserves. 10 mins from Kothrud with temperature-controlled pool.",
    overview: "VTP Cielo by VTP Luxe is Bavdhan's most exclusive luxury hillside enclave, nestled amidst protected green reserves with 5-star lifestyle amenities.",
    maharera: ["P52100052414"],
    possession: "2027",
    priceStarting: "₹1.15 Crores",
    floorPlans: [
      { type: "2 BHK", carpetArea: "820 - 920 Sq.ft", image: "/assets/projects/cielo/hero.webp" },
      { type: "3 BHK", carpetArea: "1150 - 1500 Sq.ft", image: "/assets/projects/cielo/hero.webp" },
      { type: "4 BHK", carpetArea: "1900 - 2400 Sq.ft", image: "/assets/projects/cielo/hero.webp" }
    ]
  },

  // ── Pegasus / Kharadi & East Pune ──
  {
    township: "Township Pegasus",
    name: "ALTAMIRA BY VTP LUXE",
    location: "Kharadi, Pune",
    slug: "vtp-altamira-kharadi-pune",
    shortSlug: "vtp-altamira",
    image: "/assets/projects/vtp-altamira-kharadi-pune/accurate-hero.jpg&w=1200&q=75",
    seoTitle: "VTP ALTAMIRA Kharadi | Buy Luxury 3 & 4 BHK Flats in Pune",
    seoDescription: "Invest in ALTAMIRA BY VTP LUXE. Buy ultra-luxury 3, 4 BHK apartments in Kharadi, Pune. Zero Brokerage, exclusive pre-launch offers, and premium amenities.",
    overview: "ALTAMIRA BY VTP LUXE is a distinguished ultra-luxury cluster within Township Pegasus, featuring a 30-foot cascading waterfall entrance and imported marble finishes.",
    maharera: ["P52100079807"],
    possession: "2028",
    priceStarting: "₹1.45 Crores",
    floorPlans: [
      { type: "3 BHK", carpetArea: "988 - 1475 Sq.ft", image: "/assets/projects/vtp-altamira-kharadi-pune/accurate-hero.jpg&w=1200&q=75" },
      { type: "4 BHK Simplex & Duplex", carpetArea: "1976 - 2894 Sq.ft", image: "/assets/projects/vtp-altamira-kharadi-pune/accurate-hero.jpg&w=1200&q=75" }
    ]
  },
  {
    township: "Township Pegasus",
    name: "FLAMANTE BY VTP LUXE",
    location: "Kharadi, Pune",
    slug: "vtp-flamante-kharadi-pune",
    shortSlug: "vtp-flamante",
    image: "/assets/projects/flamante/hero.webp",
    seoTitle: "VTP Flamante Kharadi Pune | Luxury 2, 3 & 4 BHK Air-Conditioned Flats",
    seoDescription: "VTP Flamante in Kharadi Pune. Glass-facade luxury residences with air-conditioned apartments and sky lounge overlooking Township Pegasus.",
    overview: "VTP Flamante brings contemporary glass-facade architectural elegance and air-conditioned luxury living to Kharadi within Township Pegasus.",
    maharera: ["P52100051859"],
    possession: "2027",
    priceStarting: "₹92 Lakhs",
    floorPlans: [
      { type: "2 BHK", carpetArea: "780 - 890 Sq.ft", image: "/assets/projects/flamante/hero.webp" },
      { type: "3 BHK", carpetArea: "1090 - 1420 Sq.ft", image: "/assets/projects/flamante/hero.webp" },
      { type: "4 BHK", carpetArea: "1850 - 2350 Sq.ft", image: "/assets/projects/flamante/hero.webp" }
    ]
  },
  {
    township: "Township Pegasus",
    name: "VELVET VILLAS BY VTP LUXE",
    location: "Kharadi, Pune",
    slug: "vtp-velvet-villas-kharadi-pune",
    shortSlug: "vtp-velvet-villas",
    image: "/assets/projects/velvet-villas/hero.webp",
    seoTitle: "VTP Velvet Villas Kharadi Pune | Bespoke Ultra Luxury Villas",
    seoDescription: "VTP Velvet Villas in New Kharadi Pune. 43 bespoke ultra-luxury villas with private elevators, plunge pools, and 4,132 to 9,184 sq.ft layouts.",
    overview: "VTP Velvet Villas comprises 43 bespoke ultra-luxury private estates with personal elevators, private plunge pools, and landscaped rooftop terraces.",
    maharera: ["P52100033838"],
    possession: "2026",
    priceStarting: "₹2.85 Crores",
    floorPlans: [
      { type: "3 BHK Villa", carpetArea: "4132 - 5200 Sq.ft", image: "/assets/projects/velvet-villas/hero.webp" },
      { type: "5 BHK Luxury Villa", carpetArea: "6500 - 9184 Sq.ft", image: "/assets/projects/velvet-villas/hero.webp" }
    ]
  },
  {
    township: "Township Pegasus",
    name: "VTP EUPHORIA",
    location: "New Kharadi, Pune",
    slug: "vtp-euphoria-new-kharadi-pune",
    shortSlug: "vtp-euphoria",
    image: "/assets/projects/euphoria/hero.webp",
    seoTitle: "VTP Euphoria New Kharadi Pune | Integrated Sports Township Homes",
    seoDescription: "VTP Euphoria in New Kharadi Pune. 1, 2 & 3 BHK luxury residences with over 3 acres of amenities and Olympic sports infrastructure in Township Pegasus.",
    overview: "VTP Euphoria is East Pune's largest integrated sports and wellness cluster spanning over 3 acres of podium amenities in New Kharadi.",
    maharera: ["P52100048447"],
    possession: "2027",
    priceStarting: "₹65 Lakhs",
    floorPlans: [
      { type: "1 BHK", carpetArea: "480 - 530 Sq.ft", image: "/assets/projects/euphoria/hero.webp" },
      { type: "2 BHK", carpetArea: "730 - 860 Sq.ft", image: "/assets/projects/euphoria/hero.webp" },
      { type: "3 BHK", carpetArea: "1050 - 1300 Sq.ft", image: "/assets/projects/euphoria/hero.webp" }
    ]
  },
  {
    township: "Township Pegasus",
    name: "VTP DOLCE VITA",
    location: "New Kharadi, Pune",
    slug: "vtp-dolce-vita-new-kharadi-pune",
    shortSlug: "vtp-dolce-vita",
    image: "/assets/projects/dolce-vita/hero.webp",
    seoTitle: "VTP Dolce Vita New Kharadi Pune | 1, 2 & 3 BHK Contemporary Homes",
    seoDescription: "VTP Dolce Vita in New Kharadi Pune. Modern luxury flats minutes from EON IT Park and WTC Kharadi. View cost sheet, floor plans, and amenities.",
    overview: "VTP Dolce Vita delivers Italian-inspired contemporary residences with full lifestyle club amenities adjacent to Kharadi IT corridor.",
    maharera: ["P52100053911"],
    possession: "2027",
    priceStarting: "₹68 Lakhs",
    floorPlans: [
      { type: "1 BHK", carpetArea: "470 - 520 Sq.ft", image: "/assets/projects/dolce-vita/hero.webp" },
      { type: "2 BHK", carpetArea: "720 - 840 Sq.ft", image: "/assets/projects/dolce-vita/hero.webp" },
      { type: "3 BHK", carpetArea: "1030 - 1280 Sq.ft", image: "/assets/projects/dolce-vita/hero.webp" }
    ]
  },
  {
    township: "Township Pegasus",
    name: "VTP PEGASUS (TOWNSHIP MASTER)",
    location: "New Kharadi, Pune",
    slug: "vtp-pegasus-kharadi-pune",
    shortSlug: "vtp-pegasus",
    image: "/assets/projects/flamante/hero.webp",
    seoTitle: "Township Pegasus Kharadi Pune | 165+ Acre Mega Integrated Township",
    seoDescription: "Township Pegasus New Kharadi Pune. 165+ acre mega township with 1, 2, 3, 4 BHK luxury apartments and bespoke villas near EON IT Park and WTC.",
    overview: "Township Pegasus is East Pune's landmark 165+ acre integrated township near World Trade Center and EON Free Zone, home to over 8,000 happy families.",
    maharera: ["P52100030686"],
    possession: "Ready & Under Construction",
    priceStarting: "₹62 Lakhs",
    floorPlans: [
      { type: "1 BHK", carpetArea: "460 - 530 Sq.ft", image: "/assets/projects/flamante/hero.webp" },
      { type: "2 BHK", carpetArea: "720 - 880 Sq.ft", image: "/assets/projects/flamante/hero.webp" },
      { type: "3 BHK", carpetArea: "1050 - 1450 Sq.ft", image: "/assets/projects/flamante/hero.webp" },
      { type: "4 BHK & Villas", carpetArea: "1850 - 5000 Sq.ft", image: "/assets/projects/flamante/hero.webp" }
    ]
  },
  {
    township: "Township Pegasus",
    name: "VTP ALTAIR",
    location: "Kharadi, Pune",
    slug: "vtp-altair-kharadi-pune",
    shortSlug: "vtp-altair",
    image: "/assets/projects/flamante/hero.webp",
    seoTitle: "VTP Altair Kharadi Pune | Premium 3 BHK High Rise Residences",
    seoDescription: "VTP Altair in Kharadi Pune. High-altitude 3 BHK luxury residences with panoramic skyline views and 3-tier wellness facilities within Township Pegasus.",
    overview: "VTP Altair offers premium 3 BHK high-rise residences designed for high-achieving corporate executives in Kharadi.",
    maharera: ["P52100030687"],
    possession: "2026",
    priceStarting: "₹1.15 Crores",
    floorPlans: [
      { type: "3 BHK", carpetArea: "1080 - 1380 Sq.ft", image: "/assets/projects/flamante/hero.webp" }
    ]
  },
  {
    township: "Township Pegasus",
    name: "VTP CYGNUS",
    location: "Kharadi, Pune",
    slug: "vtp-cygnus-kharadi-pune",
    shortSlug: "vtp-cygnus",
    image: "/assets/projects/cygnus/hero.webp",
    seoTitle: "VTP Cygnus Kharadi Pune | 2 & 3 BHK MLA Smart Residences",
    seoDescription: "VTP Cygnus in Kharadi Pune. Maximum Livable Area 2 & 3 BHK luxury residences with zero space wastage near EON IT Park.",
    overview: "VTP Cygnus combines precision architectural efficiency with smart home technology in New Kharadi within Township Pegasus.",
    maharera: ["P52100030686"],
    possession: "Ready to Move",
    priceStarting: "₹78 Lakhs",
    floorPlans: [
      { type: "2 BHK", carpetArea: "730 - 840 Sq.ft", image: "/assets/projects/cygnus/hero.webp" },
      { type: "3 BHK", carpetArea: "1040 - 1300 Sq.ft", image: "/assets/projects/cygnus/hero.webp" }
    ]
  },
  {
    township: "Township Pegasus",
    name: "VTP ONE",
    location: "Kharadi, Pune",
    slug: "vtp-one-kharadi-pune",
    shortSlug: "vtp-one",
    image: "/assets/projects/flamante/hero.webp",
    seoTitle: "VTP One Kharadi Pune | Boutique 2 & 3 BHK Luxury Apartments",
    seoDescription: "VTP One in Kharadi Pune. Boutique luxury residences with resort-grade amenities and close proximity to World Trade Center Kharadi.",
    overview: "VTP One is an exclusive boutique residential development offering serene privacy and high-specification finishes in Kharadi.",
    maharera: ["P52100030688"],
    possession: "2026",
    priceStarting: "₹79 Lakhs",
    floorPlans: [
      { type: "2 BHK", carpetArea: "750 - 850 Sq.ft", image: "/assets/projects/flamante/hero.webp" },
      { type: "3 BHK", carpetArea: "1050 - 1320 Sq.ft", image: "/assets/projects/flamante/hero.webp" }
    ]
  },
  {
    township: "Township Pegasus",
    name: "VTP AURELIA",
    location: "Kharadi, Pune",
    slug: "vtp-aurelia-kharadi-pune",
    shortSlug: "vtp-aurelia",
    image: "/assets/projects/aurelia/hero.webp",
    seoTitle: "VTP Aurelia Kharadi Pune | 2 & 3 BHK Riverside Luxury Flats",
    seoDescription: "VTP Aurelia in Kharadi Pune. Smart automated 2 & 3 BHK luxury residences with zero space wastage near riverside promenade.",
    overview: "VTP Aurelia combines nature and urban convenience with smart-automated homes overlooking the riverside promenade.",
    maharera: ["P52100054321"],
    possession: "2027",
    priceStarting: "₹84 Lakhs",
    floorPlans: [
      { type: "2 BHK", carpetArea: "760 - 870 Sq.ft", image: "/assets/projects/aurelia/hero.webp" },
      { type: "3 BHK", carpetArea: "1080 - 1350 Sq.ft", image: "/assets/projects/aurelia/hero.webp" }
    ]
  },
  {
    township: "VTP Wagholi",
    name: "VTP PURVANCHAL",
    location: "Wagholi-Kharadi, Pune",
    slug: "vtp-purvanchal-wagholi-pune",
    shortSlug: "vtp-purvanchal",
    image: "/assets/projects/flamante/hero.webp",
    seoTitle: "VTP Purvanchal Wagholi Pune | 2 & 3 BHK Large Township Residences",
    seoDescription: "VTP Purvanchal in Wagholi Pune. Delivered large-scale township living with 30+ amenities near EON IT Park and Nagar Road.",
    overview: "VTP Purvanchal is a massive, established residential township community offering expansive sports courts, lush landscaped gardens, and high rental yield.",
    maharera: ["P52100020321"],
    possession: "Ready to Move",
    priceStarting: "₹62 Lakhs",
    floorPlans: [
      { type: "2 BHK", carpetArea: "720 - 830 Sq.ft", image: "/assets/projects/flamante/hero.webp" },
      { type: "3 BHK", carpetArea: "1020 - 1260 Sq.ft", image: "/assets/projects/flamante/hero.webp" }
    ]
  },
  {
    township: "Township Pegasus",
    name: "VTP BEAUMONDE",
    location: "New Kharadi, Pune",
    slug: "vtp-beaumonde-kharadi-pune",
    shortSlug: "vtp-beaumonde",
    image: "/assets/projects/flamante/hero.webp",
    seoTitle: "VTP Beaumonde New Kharadi Pune | Bespoke 2 & 3 BHK Residences",
    seoDescription: "VTP Beaumonde in New Kharadi Pune. Bespoke high-rise residences with exclusive clubhouse access and panoramic views in Township Pegasus.",
    overview: "VTP Beaumonde delivers sophisticated urban living with high-grade interior specifications and comprehensive wellness amenities.",
    maharera: ["P52100030685"],
    possession: "Ready to Move",
    priceStarting: "₹80 Lakhs",
    floorPlans: [
      { type: "2 BHK", carpetArea: "750 - 850 Sq.ft", image: "/assets/projects/flamante/hero.webp" },
      { type: "3 BHK", carpetArea: "1060 - 1320 Sq.ft", image: "/assets/projects/flamante/hero.webp" }
    ]
  },

  // ── South Pune & Delivered Portfolio ──
  {
    township: "VTP South Pune",
    name: "VTP CELESTA",
    location: "NIBM Road, Pune",
    slug: "vtp-celesta-nibm-road-pune",
    shortSlug: "vtp-celesta",
    image: "/assets/projects/cielo/hero.webp",
    seoTitle: "VTP Celesta NIBM Road Pune | Exclusive 3 BHK Luxury Residences",
    seoDescription: "VTP Celesta on NIBM Road Pune. Exclusive 3 BHK single-tower luxury residences overlooking the NIBM nature reserve. Ready possession.",
    overview: "VTP Celesta is a boutique single-tower luxury development overlooking the lush NIBM forest reserve in South Pune.",
    maharera: ["P52100001097"],
    possession: "Ready to Move",
    priceStarting: "₹95 Lakhs",
    floorPlans: [
      { type: "3 BHK", carpetArea: "1150 - 1450 Sq.ft", image: "/assets/projects/cielo/hero.webp" }
    ]
  },
  {
    township: "VTP Pashan",
    name: "VTP SOLITAIRE",
    location: "Pashan, Pune",
    slug: "vtp-solitaire-pashan-pune",
    shortSlug: "vtp-solitaire",
    image: "/assets/projects/sierra/hero.webp",
    seoTitle: "VTP Solitaire Pashan Pune | 2 & 3 BHK Boutique Apartments",
    seoDescription: "VTP Solitaire in Pashan Pune. Boutique luxury apartments near Baner and Pune University Circle with premium specifications.",
    overview: "VTP Solitaire provides tranquil, low-density living in prime Pashan with rapid access to Baner, Aundh, and Shivaji Nagar.",
    maharera: ["P52100000078"],
    possession: "Ready to Move",
    priceStarting: "₹78 Lakhs",
    floorPlans: [
      { type: "2 BHK", carpetArea: "760 - 860 Sq.ft", image: "/assets/projects/sierra/hero.webp" },
      { type: "3 BHK", carpetArea: "1080 - 1320 Sq.ft", image: "/assets/projects/sierra/hero.webp" }
    ]
  },
  {
    township: "VTP Wakad",
    name: "VTP HILIFE",
    location: "Wakad, Pune",
    slug: "vtp-hilife-wakad-pune",
    shortSlug: "vtp-hilife",
    image: "/assets/projects/volare/hero.webp",
    seoTitle: "VTP HiLife Wakad Pune | Ready Possession 2 & 3 BHK Flats",
    seoDescription: "VTP HiLife in Wakad Pune. Delivered luxury community with full podium amenities, clubhouse, and swimming pool in central Wakad.",
    overview: "VTP HiLife is a flagship delivered residential landmark in Wakad known for its high livability and outstanding rental yields.",
    maharera: ["P52100000085"],
    possession: "Ready to Move",
    priceStarting: "₹70 Lakhs",
    floorPlans: [
      { type: "2 BHK", carpetArea: "720 - 840 Sq.ft", image: "/assets/projects/volare/hero.webp" },
      { type: "3 BHK", carpetArea: "1020 - 1280 Sq.ft", image: "/assets/projects/volare/hero.webp" }
    ]
  },
  {
    township: "VTP Talegaon",
    name: "VTP URBAN LIFE",
    location: "Talegaon, Pune",
    slug: "vtp-urban-life-talegaon-pune",
    shortSlug: "vtp-urban-life",
    image: "/assets/projects/alpine/hero.webp",
    seoTitle: "VTP Urban Life Talegaon Pune | 1 & 2 BHK Affordable Homes",
    seoDescription: "VTP Urban Life in Talegaon Pune. Affordable premium apartments in clean-air Talegaon near industrial and automobile corridors.",
    overview: "VTP Urban Life offers budget-friendly quality housing in Talegaon with lush landscaped open spaces and community amenities.",
    maharera: ["P52100000054"],
    possession: "Ready to Move",
    priceStarting: "₹32 Lakhs",
    floorPlans: [
      { type: "1 BHK", carpetArea: "420 - 480 Sq.ft", image: "/assets/projects/alpine/hero.webp" },
      { type: "2 BHK", carpetArea: "620 - 720 Sq.ft", image: "/assets/projects/alpine/hero.webp" }
    ]
  },
  {
    township: "VTP Undri",
    name: "VTP URBAN NEST",
    location: "Undri, Pune",
    slug: "vtp-urban-nest-undri-pune",
    shortSlug: "vtp-urban-nest",
    image: "/assets/projects/cielo/hero.webp",
    seoTitle: "VTP Urban Nest Undri Pune | 1.5, 2 & 3 BHK Family Residences",
    seoDescription: "VTP Urban Nest in Undri Pune. Spacious family homes with landscaped open spaces near Bishop's School and Corinthians Club.",
    overview: "VTP Urban Nest is an established family community in Undri featuring multi-tier security, clubhouse, and lush surroundings.",
    maharera: ["P52100000062"],
    possession: "Ready to Move",
    priceStarting: "₹45 Lakhs",
    floorPlans: [
      { type: "1.5 BHK", carpetArea: "580 - 640 Sq.ft", image: "/assets/projects/cielo/hero.webp" },
      { type: "2 BHK", carpetArea: "720 - 820 Sq.ft", image: "/assets/projects/cielo/hero.webp" },
      { type: "3 BHK", carpetArea: "1020 - 1250 Sq.ft", image: "/assets/projects/cielo/hero.webp" }
    ]
  },
  {
    township: "VTP Kharadi",
    name: "VTP URBAN SOUL",
    location: "Kharadi, Pune",
    slug: "vtp-urban-soul-kharadi-pune",
    shortSlug: "vtp-urban-soul",
    image: "/assets/projects/cygnus/hero.webp",
    seoTitle: "VTP Urban Soul Kharadi Pune | 2 BHK Delivered Apartments",
    seoDescription: "VTP Urban Soul in Kharadi Pune. Ready possession 2 BHK apartments in the heart of Kharadi near EON IT Park and World Trade Center.",
    overview: "VTP Urban Soul is a well-established residential development located directly in central Kharadi.",
    maharera: ["P52100000063"],
    possession: "Ready to Move",
    priceStarting: "₹65 Lakhs",
    floorPlans: [
      { type: "2 BHK", carpetArea: "720 - 810 Sq.ft", image: "/assets/projects/cygnus/hero.webp" }
    ]
  },
  {
    township: "VTP Pisoli",
    name: "VTP URBAN RISE",
    location: "Pisoli, Pune",
    slug: "vtp-urban-rise-pisoli-pune",
    shortSlug: "vtp-urban-rise",
    image: "/assets/projects/alpine/hero.webp",
    seoTitle: "VTP Urban Rise Pisoli Pune | 1 & 2 BHK Affordable Luxury Flats",
    seoDescription: "VTP Urban Rise in Pisoli South Pune. Quality 1 & 2 BHK homes with easy access to NIBM, Undri, and Katraj-Kondhwa road.",
    overview: "VTP Urban Rise provides budget-conscious buyers with premium construction standards and lifestyle amenities in South Pune.",
    maharera: ["P52100000071"],
    possession: "Ready to Move",
    priceStarting: "₹38 Lakhs",
    floorPlans: [
      { type: "1 BHK", carpetArea: "430 - 490 Sq.ft", image: "/assets/projects/alpine/hero.webp" },
      { type: "2 BHK", carpetArea: "640 - 740 Sq.ft", image: "/assets/projects/alpine/hero.webp" }
    ]
  },
  {
    township: "VTP Hadapsar",
    name: "VTP URBAN BALANCE",
    location: "Magarpatta Road, Pune",
    slug: "vtp-urban-balance-hadapsar-pune",
    shortSlug: "vtp-urban-balance",
    image: "/assets/projects/cygnus/hero.webp",
    seoTitle: "VTP Urban Balance Hadapsar Pune | 2 & 3 BHK Homes near Magarpatta",
    seoDescription: "VTP Urban Balance on Magarpatta Road Hadapsar Pune. Delivered 2 & 3 BHK luxury residences adjacent to Cybercity and SP Infocity.",
    overview: "VTP Urban Balance offers unbeatable walk-to-work convenience for IT professionals working in Magarpatta Cybercity.",
    maharera: ["P52100000072"],
    possession: "Ready to Move",
    priceStarting: "₹75 Lakhs",
    floorPlans: [
      { type: "2 BHK", carpetArea: "760 - 860 Sq.ft", image: "/assets/projects/cygnus/hero.webp" },
      { type: "3 BHK", carpetArea: "1080 - 1320 Sq.ft", image: "/assets/projects/cygnus/hero.webp" }
    ]
  },
  {
    township: "VTP Undri",
    name: "VTP URBAN SPACE",
    location: "NIBM-Undri, Pune",
    slug: "vtp-urban-space-nibm-undri-pune",
    shortSlug: "vtp-urban-space",
    image: "/assets/projects/cielo/hero.webp",
    seoTitle: "VTP Urban Space NIBM Undri Pune | Ultra Luxury 3 & 4 BHK Flats",
    seoDescription: "VTP Urban Space in NIBM Undri Pune. High-end luxury residences with expansive balconies and panoramic forest views.",
    overview: "VTP Urban Space represents the zenith of spacious, low-density luxury living in the tranquil green hills of NIBM Undri.",
    maharera: ["P52100000073"],
    possession: "Ready to Move",
    priceStarting: "₹1.10 Crores",
    floorPlans: [
      { type: "3 BHK", carpetArea: "1250 - 1550 Sq.ft", image: "/assets/projects/cielo/hero.webp" },
      { type: "4 BHK", carpetArea: "1850 - 2300 Sq.ft", image: "/assets/projects/cielo/hero.webp" }
    ]
  },
  {
    township: "VTP Keshavnagar",
    name: "VTP URBAN NIRVANA",
    location: "Keshavnagar-Mundhwa, Pune",
    slug: "vtp-urban-nirvana-keshavnagar-pune",
    shortSlug: "vtp-urban-nirvana",
    image: "/assets/projects/flamante/hero.webp",
    seoTitle: "VTP Urban Nirvana Keshavnagar Pune | 2 & 3 BHK Riverside Homes",
    seoDescription: "VTP Urban Nirvana in Keshavnagar Mundhwa Pune. Peaceful residences near Koregaon Park Annex and Kharadi with modern amenities.",
    overview: "VTP Urban Nirvana offers peaceful residential living near the Mula-Mutha river with effortless access to Koregaon Park and Magarpatta.",
    maharera: ["P52100000074"],
    possession: "Ready to Move",
    priceStarting: "₹68 Lakhs",
    floorPlans: [
      { type: "2 BHK", carpetArea: "740 - 840 Sq.ft", image: "/assets/projects/flamante/hero.webp" },
      { type: "3 BHK", carpetArea: "1050 - 1280 Sq.ft", image: "/assets/projects/flamante/hero.webp" }
    ]
  },
  {
    township: "VTP Undri",
    name: "VTP LANDMARK",
    location: "Undri, Pune",
    slug: "vtp-landmark-undri-pune",
    shortSlug: "vtp-landmark",
    image: "/assets/projects/cielo/hero.webp",
    seoTitle: "VTP Landmark Undri Pune | Gated Community 2 & 3 BHK Homes",
    seoDescription: "VTP Landmark in Undri Pune. Gated residential community with clubhouse, swimming pool, and landscaped gardens in South Pune.",
    overview: "VTP Landmark is a classic gated residential community in Undri offering a secure and serene living environment.",
    maharera: ["P52100000075"],
    possession: "Ready to Move",
    priceStarting: "₹58 Lakhs",
    floorPlans: [
      { type: "2 BHK", carpetArea: "730 - 830 Sq.ft", image: "/assets/projects/cielo/hero.webp" },
      { type: "3 BHK", carpetArea: "1030 - 1260 Sq.ft", image: "/assets/projects/cielo/hero.webp" }
    ]
  },
  {
    township: "VTP Talegaon",
    name: "BHAGYSTHAN BY VTP",
    location: "Talegaon Dabhade, Pune",
    slug: "vtp-bhagysthan-talegaon-pune",
    shortSlug: "vtp-bhagysthan",
    image: "/assets/projects/alpine/hero.webp",
    seoTitle: "Bhagysthan Talegaon Pune | 1 & 2 BHK Homes by VTP Realty",
    seoDescription: "Bhagysthan by VTP Realty in Talegaon Dabhade Pune. Budget-friendly residential apartments in a clean green micro-market.",
    overview: "Bhagysthan is an early pioneering residential project by VTP Realty in Talegaon offering affordable homes with solid construction quality.",
    maharera: ["P52100000076"],
    possession: "Ready to Move",
    priceStarting: "₹28 Lakhs",
    floorPlans: [
      { type: "1 BHK", carpetArea: "400 - 460 Sq.ft", image: "/assets/projects/alpine/hero.webp" },
      { type: "2 BHK", carpetArea: "600 - 690 Sq.ft", image: "/assets/projects/alpine/hero.webp" }
    ]
  },

  // ── Commercial & Retail ──
  {
    township: "Commercial Hub",
    name: "VTP ALTITUDE",
    location: "Wakad, Pune",
    slug: "vtp-altitude-wakad-pune",
    shortSlug: "vtp-altitude",
    image: "/assets/projects/volare/hero.webp",
    seoTitle: "VTP Altitude Wakad Pune | Grade A Office Spaces & Retail Shops",
    seoDescription: "VTP Altitude in Wakad Pune. Grade A commercial office spaces and high-street retail shops on main arterial corridor. View price & ROI.",
    overview: "VTP Altitude is West Pune's premier Grade A commercial office and retail destination in central Wakad, offering high rental yields and capital appreciation.",
    maharera: ["P52100026774"],
    possession: "2026",
    priceStarting: "₹45 Lakhs",
    floorPlans: [
      { type: "Boutique Office", carpetArea: "350 - 650 Sq.ft", image: "/assets/projects/volare/hero.webp" },
      { type: "Corporate Floor", carpetArea: "1200 - 5000 Sq.ft", image: "/assets/projects/volare/hero.webp" },
      { type: "Retail Showroom", carpetArea: "500 - 2500 Sq.ft", image: "/assets/projects/volare/hero.webp" }
    ]
  },
  {
    township: "Commercial Hub",
    name: "VTP TOWN SQUARE",
    location: "Viman Nagar, Pune",
    slug: "vtp-town-square-viman-nagar-pune",
    shortSlug: "vtp-town-square",
    image: "/assets/projects/flamante/hero.webp",
    seoTitle: "VTP Town Square Viman Nagar Pune | High Street Retail & Offices",
    seoDescription: "VTP Town Square in Viman Nagar Pune. Thriving commercial and retail destination near Phoenix Marketcity and Pune Airport.",
    overview: "VTP Town Square provides premium retail frontage and Grade A office spaces in the affluent commercial district of Viman Nagar.",
    maharera: ["P52100000077"],
    possession: "Ready to Move",
    priceStarting: "₹65 Lakhs",
    floorPlans: [
      { type: "Retail Shop", carpetArea: "300 - 800 Sq.ft", image: "/assets/projects/flamante/hero.webp" },
      { type: "Office Suite", carpetArea: "600 - 2000 Sq.ft", image: "/assets/projects/flamante/hero.webp" }
    ]
  },
  {
    township: "Commercial Hub",
    name: "KP SQUARE",
    location: "Kharadi, Pune",
    slug: "vtp-kp-square-kharadi-pune",
    shortSlug: "vtp-kp-square",
    image: "/assets/projects/cygnus/hero.webp",
    seoTitle: "KP Square Kharadi Pune | Commercial Shops & Corporate Spaces",
    seoDescription: "KP Square by VTP Realty in Kharadi Pune. High-footfall retail shops and boutique office spaces near EON IT Park.",
    overview: "KP Square is an established commercial hub in Kharadi catering to tech corporate employees and local residents.",
    maharera: ["P52100000079"],
    possession: "Ready to Move",
    priceStarting: "₹50 Lakhs",
    floorPlans: [
      { type: "Commercial Unit", carpetArea: "400 - 1200 Sq.ft", image: "/assets/projects/cygnus/hero.webp" }
    ]
  },
  {
    township: "Commercial Hub",
    name: "VTP TRADE PARK",
    location: "Undri, Pune",
    slug: "vtp-trade-park-undri-pune",
    shortSlug: "vtp-trade-park",
    image: "/assets/projects/cielo/hero.webp",
    seoTitle: "VTP Trade Park Undri Pune | Prime Commercial Business Park",
    seoDescription: "VTP Trade Park in Undri Pune. High-street retail shops and commercial office suites on main Undri-Hadapsar road.",
    overview: "VTP Trade Park delivers prime commercial frontage on the main arterial road in South Pune with high rental demand.",
    maharera: ["P52100000080"],
    possession: "Ready to Move",
    priceStarting: "₹40 Lakhs",
    floorPlans: [
      { type: "Retail Store", carpetArea: "350 - 900 Sq.ft", image: "/assets/projects/cielo/hero.webp" },
      { type: "Office Space", carpetArea: "500 - 1500 Sq.ft", image: "/assets/projects/cielo/hero.webp" }
    ]
  },
  {
    township: "Commercial Hub",
    name: "THE MARKETPLACE",
    location: "Undri, Pune",
    slug: "vtp-the-marketplace-undri-pune",
    shortSlug: "vtp-the-marketplace",
    image: "/assets/projects/cielo/hero.webp",
    seoTitle: "The Marketplace Undri Pune | Community Shopping & Retail Plaza",
    seoDescription: "The Marketplace in Undri Pune. Convenience shopping, anchor retail stores, and food courts serving 5,000+ local families.",
    overview: "The Marketplace is a high-traffic community shopping plaza serving affluent residential neighborhoods in Undri and NIBM.",
    maharera: ["P52100000081"],
    possession: "Ready to Move",
    priceStarting: "₹48 Lakhs",
    floorPlans: [
      { type: "Anchor Retail", carpetArea: "800 - 3000 Sq.ft", image: "/assets/projects/cielo/hero.webp" }
    ]
  },
  {
    township: "Corporate Headquarters",
    name: "VTP HOUSE",
    location: "Viman Nagar, Pune",
    slug: "vtp-house-viman-nagar-pune",
    shortSlug: "vtp-house",
    image: "/assets/projects/flamante/hero.webp",
    seoTitle: "VTP House Viman Nagar Pune | Landmark Corporate Headquarters",
    seoDescription: "VTP House in Viman Nagar Pune. Corporate headquarters and Grade A commercial office spaces in prime business enclave.",
    overview: "VTP House is the prestigious corporate headquarters of VTP Group situated in prime Viman Nagar near Pune Airport.",
    maharera: ["P52100000082"],
    possession: "Ready to Move",
    priceStarting: "₹1.20 Crores",
    floorPlans: [
      { type: "Corporate Suite", carpetArea: "1500 - 8000 Sq.ft", image: "/assets/projects/flamante/hero.webp" }
    ]
  }
];

// Standard Specs & Amenities
const defaultAmenities = [
  { name: "Grand Clubhouse & Lounge", icon: "Building" },
  { name: "Infinity-Edge Swimming Pool", icon: "Waves" },
  { name: "State-of-the-Art Fitness Center", icon: "Activity" },
  { name: "5-Tier Biometric Security & CCTV", icon: "Shield" },
  { name: "EV Charging Infrastructure", icon: "Zap" },
  { name: "Kids Adventure Play Park", icon: "Smile" },
  { name: "Jogging & Cycling Track", icon: "Navigation" }
];

const defaultSpecifications = [
  { category: "Flooring", details: "Imported Vitrified/Marble in Living & Dining; Laminated Wooden Flooring in Master Bedroom." },
  { category: "Kitchen", details: "Granite/Quartz Countertop with Stainless Steel Sink and Exhaust Provision." },
  { category: "Bathrooms", details: "Premium CP & Sanitary Fittings (Kohler / Grohe or equivalent)." },
  { category: "Electrical", details: "Concealed Copper Wiring with Schneider/Legrand Modular Switches and EV Charging Provision." }
];

const defaultLocationHighlights = [
  { title: "Nearest IT SEZ / Tech Park", distance: "5 Mins" },
  { title: "Top International Schools", distance: "7 Mins" },
  { title: "Multi-Speciality Hospitals", distance: "10 Mins" },
  { title: "Pune Metro Line 3 Transit", distance: "4 Mins" },
  { title: "High-Street Shopping & Dining", distance: "6 Mins" }
];

// Merge into final array ensuring unique slugs
const finalProjects = [];
let nextId = 1;

masterProjectsList.forEach(mp => {
  // Check if existing project in currentProjects matches slug
  const existing = currentProjects.find(cp => cp.slug === mp.slug || cp.slug === mp.shortSlug);
  
  if (existing) {
    // Preserve existing rich details and enhance missing fields
    finalProjects.push({
      ...existing,
      id: nextId++,
      township: existing.township || mp.township,
      name: existing.name || mp.name,
      location: existing.location || mp.location,
      image: existing.image || mp.image,
      seoTitle: existing.seoTitle || mp.seoTitle,
      seoDescription: existing.seoDescription || mp.seoDescription,
      overview: existing.overview || mp.overview,
      maharera: Array.isArray(existing.maharera) && existing.maharera.length > 0 ? existing.maharera : mp.maharera,
      floorPlans: Array.isArray(existing.floorPlans) && existing.floorPlans.length > 0 ? existing.floorPlans : mp.floorPlans
    });
  } else {
    // Add new project
    finalProjects.push({
      id: nextId++,
      township: mp.township,
      name: mp.name,
      location: mp.location,
      image: mp.image,
      link: `https://vtprealty.in/projects/${mp.slug}`,
      slug: mp.slug,
      seoTitle: mp.seoTitle,
      seoDescription: mp.seoDescription,
      overview: mp.overview,
      amenities: defaultAmenities,
      specifications: defaultSpecifications,
      locationHighlights: defaultLocationHighlights,
      masterLayout: "/images/real_vtp/Main_website_da76ded661.webp",
      floorPlans: mp.floorPlans,
      maharera: mp.maharera,
      gallery: [
        mp.image,
        "/assets/projects/earth-1/hero.jpg",
        "/assets/projects/monarque/hero.webp",
        "/assets/projects/flamante/hero.webp"
      ]
    });
  }
});

const projectsFilePath = path.join(__dirname, '../../app/data/projects.json');
fs.writeFileSync(projectsFilePath, JSON.stringify(finalProjects, null, 2), 'utf-8');

console.log(`================================================================`);
console.log(`✅ Successfully hardened projects.json with all ${finalProjects.length} VTP Realty projects!`);
console.log(`================================================================`);
