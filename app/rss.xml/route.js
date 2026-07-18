import { cms } from '../services/cms';
import insightsData from '../data/insights.json';

export const dynamic = 'force-static';

export async function GET() {
  const blogs = await cms.getAllBlogs();
  const projects = await cms.getAllProjects();

  const siteUrl = 'https://vtpbluewaters.com';

  let rssItems = '';

  // ── 1. Insights / editorial articles (highest E-E-A-T value) ─────────────
  insightsData.forEach(post => {
    const pubDate = post.date
      ? new Date(post.date).toUTCString()
      : new Date().toUTCString();
    rssItems += `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${siteUrl}/insights/${post.category}/${post.slug}</link>
        <description><![CDATA[${post.excerpt || post.content?.substring(0, 300) || ''}...]]></description>
        <pubDate>${pubDate}</pubDate>
        <author>research@vtpbluewaters.com (${post.author || 'VTP Realty Research Team'})</author>
        <category><![CDATA[${post.categoryLabel || post.category}]]></category>
        <guid isPermaLink="true">${siteUrl}/insights/${post.category}/${post.slug}</guid>
        ${post.image ? `<enclosure url="${siteUrl}${post.image}" type="image/jpeg" />` : ''}
      </item>
    `;
  });

  // ── 2. Blog / CMS posts ───────────────────────────────────────────────────
  blogs.forEach(post => {
    const pubDate = post.createdAt
      ? new Date(post.createdAt).toUTCString()
      : new Date().toUTCString();
    rssItems += `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${siteUrl}/blog/${post.slug}</link>
        <description><![CDATA[${post.content?.substring(0, 300) || ''}...]]></description>
        <pubDate>${pubDate}</pubDate>
        <author>insights@vtpbluewaters.com (VTP Insights Team)</author>
        <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      </item>
    `;
  });

  // ── 3. Projects (as PR/brand assets) ─────────────────────────────────────
  projects.forEach(project => {
    rssItems += `
      <item>
        <title><![CDATA[${project.seoTitle}]]></title>
        <link>${siteUrl}/projects/${project.slug}</link>
        <description><![CDATA[${project.seoDescription} - ${project.overview?.substring(0, 200) || ''}...]]></description>
        <pubDate>${new Date().toUTCString()}</pubDate>
        <category><![CDATA[Luxury Real Estate Pune]]></category>
        <guid isPermaLink="true">${siteUrl}/projects/${project.slug}</guid>
      </item>
    `;
  });

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:media="http://search.yahoo.com/mrss/">
      <channel>
        <title>VTP Blue Waters — Luxury Real Estate Insights, Pune</title>
        <link>${siteUrl}</link>
        <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
        <description>Expert market intelligence, investment guides, and luxury real estate insights for Mahalunge and West Pune by VTP Realty's Senior Research Analysts.</description>
        <language>en-IN</language>
        <copyright>Copyright ${new Date().getFullYear()} VTP Realty Pvt. Ltd.</copyright>
        <managingEditor>research@vtpbluewaters.com (VTP Realty Research Team)</managingEditor>
        <webMaster>tech@vtpbluewaters.com (VTP Tech)</webMaster>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <image>
          <url>${siteUrl}/logo.png</url>
          <title>VTP Blue Waters</title>
          <link>${siteUrl}</link>
        </image>
        <ttl>1440</ttl>
        ${rssItems}
      </channel>
    </rss>
  `;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}
