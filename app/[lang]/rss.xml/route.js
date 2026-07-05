import { cms } from '../../services/cms';



export async function GET() {
  const blogs = await cms.getAllBlogs();
  const projects = await cms.getAllProjects();
  
  const siteUrl = 'https://www.vtpbluewaters.com';
  
  let rssItems = '';
  
  // Syndicating blogs
  blogs.forEach(post => {
    rssItems += `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${siteUrl}/blog/${post.slug}</link>
        <description><![CDATA[${post.content.substring(0, 300)}...]]></description>
        <pubDate>${new Date(post.createdAt || Date.now()).toUTCString()}</pubDate>
        <guid>${siteUrl}/blog/${post.slug}</guid>
      </item>
    `;
  });

  // Syndicating projects as PR assets
  projects.forEach(project => {
    rssItems += `
      <item>
        <title><![CDATA[${project.seoTitle}]]></title>
        <link>${siteUrl}/projects/${project.slug}</link>
        <description><![CDATA[${project.seoDescription} - ${project.overview.substring(0, 200)}...]]></description>
        <pubDate>${new Date().toUTCString()}</pubDate>
        <guid>${siteUrl}/projects/${project.slug}</guid>
      </item>
    `;
  });

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>VTP Bluewaters - Official Ultra Luxury Real Estate</title>
        <link>${siteUrl}</link>
        <description>Premium luxury apartments, townships, and real estate insights in Pune.</description>
        <language>en</language>
        ${rssItems}
      </channel>
    </rss>
  `;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate'
    }
  });
}


export function generateStaticParams() {
  return [{ lang: 'en' }];
}
