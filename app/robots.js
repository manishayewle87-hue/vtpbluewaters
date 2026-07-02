export const runtime = 'edge';
export const revalidate = 86400;
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/api/',
          '/*?*intent=', // Block crawling of parametric intent filters if they exist
        ],
      },
      // Aggressively block AI scrapers to protect proprietary real estate data
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'ClaudeBot', 'anthropic-ai', 'Omgilibot', 'Omgili'],
        disallow: ['/'],
      }
    ],
    sitemap: 'https://vtpbluewaters.com/sitemap.xml',
  }
}
