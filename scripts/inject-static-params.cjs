const fs = require('fs');

const files = {
  'app/[lang]/projects/[slug]/page.js': `
export async function generateStaticParams() {
  const cms = require('../../../services/cms').cms;
  const projects = await cms.getAllProjects();
  const langs = ['en'];
  const params = [];
  for (const lang of langs) {
    for (const project of projects) {
      params.push({ lang, slug: project.slug });
    }
  }
  return params;
}
`,
  'app/[lang]/projects/[slug]/[intent]/page.js': `
export async function generateStaticParams() {
  const cms = require('../../../../services/cms').cms;
  const projects = await cms.getAllProjects();
  const intents = [
    '2-bhk', '3-bhk', '4-bhk', 'price', 'floor-plan', 'location', 
    'brochure', 'reviews', 'construction-update', 'amenities',
    'master-plan', 'contact', 'possession-date', 'rera'
  ];
  const langs = ['en'];
  const params = [];
  for (const lang of langs) {
    for (const project of projects) {
      for (const intent of intents) {
        params.push({ lang, slug: project.slug, intent });
      }
    }
  }
  return params;
}
`,
  'app/[lang]/locations/[location]/page.js': `
export async function generateStaticParams() {
  const cms = require('../../../services/cms').cms;
  const locations = await cms.getAllLocations();
  const langs = ['en'];
  const params = [];
  for (const lang of langs) {
    for (const loc of locations) {
      params.push({ lang, location: loc.slug });
    }
  }
  return params;
}
`,
  'app/[lang]/locations/[location]/[intent]/page.js': `
export async function generateStaticParams() {
  const cms = require('../../../../services/cms').cms;
  const locations = await cms.getAllLocations();
  const intents = ['flats', 'apartments', 'properties', 'real-estate', 'new-projects', 'luxury'];
  const langs = ['en'];
  const params = [];
  for (const lang of langs) {
    for (const loc of locations) {
      for (const intent of intents) {
        params.push({ lang, location: loc.slug, intent });
      }
    }
  }
  return params;
}
`,
  'app/[lang]/blog/[slug]/page.js': `
export async function generateStaticParams() {
  const cms = require('../../../services/cms').cms;
  const blogs = await cms.getAllBlogs();
  const langs = ['en'];
  const params = [];
  for (const lang of langs) {
    for (const blog of blogs) {
      params.push({ lang, slug: blog.slug });
    }
  }
  return params;
}
`,
  'app/[lang]/insights/[category]/page.js': `
export async function generateStaticParams() {
  const categories = ['market-trends', 'investment', 'lifestyle', 'guides'];
  const langs = ['en'];
  const params = [];
  for (const lang of langs) {
    for (const category of categories) {
      params.push({ lang, category });
    }
  }
  return params;
}
`,
  'app/[lang]/insights/[category]/[slug]/page.js': `
export async function generateStaticParams() {
  const cms = require('../../../../services/cms').cms;
  const blogs = await cms.getAllBlogs();
  const langs = ['en'];
  const params = [];
  // For simplicity, generate all combinations
  const categories = ['market-trends', 'investment', 'lifestyle', 'guides'];
  for (const lang of langs) {
    for (const category of categories) {
      for (const blog of blogs) {
        params.push({ lang, category, slug: blog.slug });
      }
    }
  }
  return params;
}
`,
  'app/[lang]/explore/[slug]/page.js': `
export async function generateStaticParams() {
  const slugs = ['virtual-tour', 'gallery', 'masterplan'];
  const langs = ['en'];
  const params = [];
  for (const lang of langs) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }
  return params;
}
`
};

for (const [filepath, genCode] of Object.entries(files)) {
  if (fs.existsSync(filepath)) {
    let content = fs.readFileSync(filepath, 'utf8');
    
    if (content.includes('generateStaticParams')) {
      content = content.replace(/export async function generateStaticParams[\s\S]*?return params;\n?\}/g, genCode.trim());
      content = content.replace(/export async function generateStaticParams[\s\S]*?\n\}/g, genCode.trim());
    } else {
      content += '\n' + genCode.trim() + '\n';
    }
    
    fs.writeFileSync(filepath, content);
    console.log('Injected correctly aligned generateStaticParams into:', filepath);
  }
}
