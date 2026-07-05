const fs = require('fs');
const path = require('path');

const replacements = [
  {
    file: 'app/[lang]/page.js',
    replacements: [
      { find: 'export default async function LanguageRoot({ params }) {', replace: 'export default async function LanguageRoot({ params }) {' },
      { find: "  const lang = params.lang || 'en';", replace: "  const { lang } = await params;" }
    ]
  },
  {
    file: 'app/[lang]/layout.js',
    replacements: [
      { find: 'export default function RootLayout({ children, params }) {', replace: 'export default async function RootLayout({ children, params }) {' },
      { find: "  const lang = params.lang || 'en';", replace: "  const { lang } = await params;" }
    ]
  },
  {
    file: 'app/[lang]/locations/[location]/page.js',
    replacements: [
      { find: 'const loc = locationsData.find(l => l.slug === params.location);', replace: 'const { location } = await params;\n  const loc = locationsData.find(l => l.slug === location);' },
      { find: 'export default function LocationPage({   params }) {', replace: 'export default async function LocationPage({   params }) {' },
      { find: "  const lang = 'en';\n  const loc = locationsData.find(l => l.slug === params.location);", replace: "  const { lang, location } = await params;\n  const loc = locationsData.find(l => l.slug === location);" }
    ]
  },
  {
    file: 'app/[lang]/blog/[slug]/page.js',
    replacements: [
      { find: 'export function generateMetadata({ params }) {', replace: 'export async function generateMetadata({ params }) {' },
      { find: 'const post = blogPosts.find(p => p.slug === params.slug);', replace: 'const { slug } = await params;\n  const post = blogPosts.find(p => p.slug === slug);' },
      { find: 'export default function BlogPostPage({   params }) {', replace: 'export default async function BlogPostPage({   params }) {' },
      { find: "  const lang = 'en';\n  const post = blogPosts.find(p => p.slug === params.slug);", replace: "  const { lang, slug } = await params;\n  const post = blogPosts.find(p => p.slug === slug);" }
    ]
  },
  {
    file: 'app/[lang]/explore/[slug]/page.js',
    replacements: [
      { find: "const page = landingPagesData[params.slug];", replace: "const { slug } = await params;\n  const page = landingPagesData[slug];" },
      { find: "export default function SeoLandingPage({   params }) {", replace: "export default async function SeoLandingPage({   params }) {" },
      { find: "  const lang = 'en';\n  const page = landingPagesData[params.slug];", replace: "  const { lang, slug } = await params;\n  const page = landingPagesData[slug];" }
    ]
  },
  {
    file: 'app/[lang]/insights/[category]/[slug]/page.js',
    replacements: [
      { find: "const article = insightsData.find(a => a.slug === params.slug);", replace: "const { slug } = await params;\n  const article = insightsData.find(a => a.slug === slug);" },
      { find: "export default function InsightPage({   params }) {", replace: "export default async function InsightPage({   params }) {" },
      { find: "  const lang = 'en';\n  const article = insightsData.find(a => a.slug === params.slug);", replace: "  const { lang, slug } = await params;\n  const article = insightsData.find(a => a.slug === slug);" }
    ]
  },
  {
    file: 'app/[lang]/insights/[category]/page.js',
    replacements: [
      { find: "const cat = params.category;", replace: "const { category } = await params;\n  const cat = category;" },
      { find: "export default async function CategoryArchive({   params }) {", replace: "export default async function CategoryArchive({   params }) {" },
      { find: "  const lang = 'en';\n  const cat = params.category;", replace: "  const { lang, category } = await params;\n  const cat = category;" }
    ]
  },
  {
    file: 'app/[lang]/locations/[location]/[intent]/page.js',
    replacements: [
      { find: "const loc = locationsData.find(l => l.slug === params.location);", replace: "const { location } = await params;\n  const loc = locationsData.find(l => l.slug === location);" },
      { find: "export default async function LocationIntentDetail({   params }) {", replace: "export default async function LocationIntentDetail({   params }) {" },
      { find: "  const lang = 'en';\n  const { location, intent } = params;", replace: "  const { lang, location, intent } = await params;" }
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
        console.log(`Could not find string in ${file}:\n${rep.find}`);
      }
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
}
