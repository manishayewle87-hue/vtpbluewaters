export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: [
      // ─── Primary Search Engines (Full Access) ───
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: [
          '/admin/',
          '/private/',
          '/api/',
          '/preview/',
          '/staging/',
          '/test/',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/'],
      },
      {
        userAgent: 'Googlebot-Video',
        allow: ['/'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/'],
        disallow: [
          '/admin/',
          '/private/',
          '/api/',
          '/preview/',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Slurp',  // Yahoo
        allow: ['/'],
        disallow: ['/admin/', '/private/', '/api/'],
        crawlDelay: 2,
      },
      {
        userAgent: 'DuckDuckBot',
        allow: ['/'],
        disallow: ['/admin/', '/private/', '/api/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Yandex',
        allow: ['/'],
        disallow: ['/admin/', '/private/', '/api/'],
        crawlDelay: 2,
      },

      // ─── Default Rule for All Other Bots ───
      {
        userAgent: '*',
        allow: ['/'],
        disallow: [
          '/admin/',
          '/private/',
          '/api/',
          '/preview/',
          '/staging/',
          '/test/',
          '/*?*filter=',
          '/*?*sort=',
          '/*?*page=',
          '/*?*ref=',
          '/*?*utm_',
        ],
      },

      // ─── Block Unauthorized AI Scrapers ───
      // Protects proprietary real estate data, pricing, and floor plans
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'ClaudeBot', 'anthropic-ai', 'Omgilibot', 'Omgili', 'Bytespider', 'PetalBot', 'Amazonbot'],
        disallow: ['/'],
      },
    ],
    sitemap: [
      'https://vtpbluewaters.com/sitemap/0.xml',
      'https://vtpbluewaters.com/sitemap/1.xml',
      'https://vtpbluewaters.com/sitemap/2.xml',
    ],
    host: 'https://vtpbluewaters.com',
  };
}
