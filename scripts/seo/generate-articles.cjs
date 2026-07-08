const fs = require('fs');
const path = require('path');

const contentHubPath = path.join(__dirname, '../../app/data/content-hub.json');
const contentData = JSON.parse(fs.readFileSync(contentHubPath, 'utf8'));

const locations = ['Mahalunge', 'Baner', 'Hinjawadi', 'Wakad', 'Balewadi', 'Kharadi', 'Tathawade', 'Bavdhan'];
const projects = ['VTP Bluewaters', 'VTP Earth One', 'VTP Leonara', 'VTP Bel Air', 'VTP Alpine', 'VTP Bellissimo'];
const topics = [
  { 
    cat: 'Investment', 
    titleTemplate: 'Why {Location} is the Best Real Estate Investment in 2026', 
    slugTemplate: 'why-{loc}-is-best-real-estate-investment-2026',
    content: 'The real estate market in {Location} is experiencing unprecedented growth. Driven by robust IT infrastructure, proximity to commercial hubs, and massive government spending on civic amenities, {Location} has emerged as the premier destination for investors. Projects like {Project} are leading this transformation, offering high rental yields and exceptional capital appreciation.'
  },
  { 
    cat: 'Luxury Living', 
    titleTemplate: 'Top Luxury Apartments in {Location}: A Comprehensive Guide', 
    slugTemplate: 'top-luxury-apartments-in-{loc}-guide',
    content: 'When it comes to luxury living, {Location} sets the gold standard. Homebuyers are no longer just looking for a roof over their heads; they demand an ecosystem. Developments such as {Project} provide a 5-star lifestyle complete with resort-grade clubhouses, smart home automation, and sprawling green spaces right in the heart of {Location}.'
  },
  { 
    cat: 'Comparisons', 
    titleTemplate: '{Location} vs Other Hubs: Where Should You Buy a Home?', 
    slugTemplate: '{loc}-vs-other-hubs-where-to-buy',
    content: 'Choosing the right micro-market is crucial. {Location} consistently outperforms other areas due to its strategic positioning. Whether you are an IT professional looking for a zero-commute lifestyle or an investor eyeing long-term gains, {Location} offers a balanced blend of cosmopolitan culture and serene living. {Project} exemplifies the pinnacle of what this region has to offer.'
  },
  {
    cat: 'Market Trends',
    titleTemplate: '{Project} Review: Redefining Real Estate in Pune',
    slugTemplate: '{proj}-review-redefining-real-estate-pune',
    content: '{Project} is not just a residential complex; it is a masterclass in modern architecture and township planning. By integrating the Maximum Livable Area (MLA) philosophy, {Project} ensures zero space wastage. Located strategically in Pune, it offers seamless connectivity and an unparalleled suite of amenities.'
  }
];

let generatedCount = 0;

locations.forEach(loc => {
  projects.slice(0, 3).forEach(proj => {
    topics.forEach(topic => {
      // Avoid duplicate massive generation, just create a subset
      if (Math.random() > 0.5) {
        const title = topic.titleTemplate.replace('{Location}', loc).replace('{Project}', proj);
        const slug = topic.slugTemplate.replace('{loc}', loc.toLowerCase()).replace('{proj}', proj.toLowerCase().replace(/\\s+/g, '-'));
        const content = topic.content.replace(/{Location}/g, loc).replace(/{Project}/g, proj);
        
        // Ensure uniqueness
        if (!contentData.blogs.some(b => b.slug === slug)) {
          contentData.blogs.push({
            slug,
            title,
            category: topic.cat,
            content
          });
          generatedCount++;
        }
      }
    });
  });
});

fs.writeFileSync(contentHubPath, JSON.stringify(contentData, null, 2), 'utf8');

console.log("Successfully generated and injected " + generatedCount + " new programmatic articles into content-hub.json.");
