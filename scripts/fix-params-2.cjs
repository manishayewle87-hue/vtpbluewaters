const fs = require('fs');
const path = require('path');

const replacements = [
  {
    file: 'app/[lang]/blog/[slug]/page.js',
    replacements: [
      { find: 'const blog = contentData.blogs.find(b => b.slug === params.slug);', replace: 'const { slug } = await params;\n  const blog = contentData.blogs.find(b => b.slug === slug);' },
      { find: "  const lang = 'en';\n  const blog = contentData.blogs.find(b => b.slug === params.slug);", replace: "  const { slug, lang } = await params;\n  const blog = contentData.blogs.find(b => b.slug === slug);" }
    ]
  },
  {
    file: 'app/[lang]/explore/[slug]/page.js',
    replacements: [
      { find: 'const page = landingPagesData.find(p => p.slug === params.slug);', replace: 'const { slug } = await params;\n  const page = landingPagesData.find(p => p.slug === slug);' },
      { find: "  const lang = 'en';\n  const page = landingPagesData.find(p => p.slug === params.slug);", replace: "  const { slug, lang } = await params;\n  const page = landingPagesData.find(p => p.slug === slug);" }
    ]
  },
  {
    file: 'app/[lang]/insights/[category]/[slug]/page.js',
    replacements: [
      { find: 'const article = contentData.insights.find(a => a.slug === params.slug);', replace: 'const { slug } = await params;\n  const article = contentData.insights.find(a => a.slug === slug);' },
      { find: "  const lang = 'en';\n  const article = contentData.insights.find(a => a.slug === params.slug);", replace: "  const { slug, lang } = await params;\n  const article = contentData.insights.find(a => a.slug === slug);" }
    ]
  },
  {
    file: 'app/[lang]/insights/[category]/page.js',
    replacements: [
      { find: 'const category = params.category;', replace: 'const { category } = await params;' },
      { find: "  const lang = 'en';\n  const category = params.category;", replace: "  const { category, lang } = await params;" }
    ]
  },
  {
    file: 'app/[lang]/locations/[location]/[intent]/page.js',
    replacements: [
      { find: 'const loc = locationsData.find(l => l.slug === params.location);', replace: 'const { location } = await params;\n  const loc = locationsData.find(l => l.slug === location);' },
      { find: "  const lang = 'en';\n  const loc = locationsData.find(l => l.slug === params.location);\n  const intent = params.intent;", replace: "  const { location, intent, lang } = await params;\n  const loc = locationsData.find(l => l.slug === location);" },
      { find: "const { location, intent } = params;", replace: "const { location, intent, lang } = await params;" }
    ]
  }
];

for (const { file, replacements: reps } of replacements) {
  const filePath = path.join('/Users/vikasyewle/Documents/vtpbluewaters', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const rep of reps) {
      if (content.includes(rep.find)) {
        content = content.replace(rep.find, rep.replace);
      } else {
        // Try regex fallback if possible, or just log
      }
    }
    
    // Universal regex fallbacks for these files
    content = content.replace(/const blog = contentData\.blogs\.find\(b => b\.slug === params\.slug\);/g, 'const { slug } = await params;\n  const blog = contentData.blogs.find(b => b.slug === slug);');
    content = content.replace(/const page = landingPagesData\[params\.slug\];/g, 'const { slug } = await params;\n  const page = landingPagesData[slug];');
    content = content.replace(/const article = insightsData\.find\(a => a\.slug === params\.slug\);/g, 'const { slug } = await params;\n  const article = insightsData.find(a => a.slug === slug);');
    content = content.replace(/const cat = params\.category;/g, 'const { category: cat } = await params;');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
