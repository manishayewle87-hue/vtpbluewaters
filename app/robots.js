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
        disallow: ['/'], // Block entirely to save crawl budget
      },
      {
        userAgent: 'Baiduspider',
        disallow: ['/'], // Block entirely to save crawl budget
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

      // ─── Block Unauthorized AI Scrapers & SEO Crawler Bots ───
      // Protects proprietary real estate data, pricing, and our massive programmatic SEO footprint from competitors using Ahrefs/Semrush
      {
        userAgent: [
          // AI Bots
          'GPTBot', 'ChatGPT-User', 'CCBot', 'ClaudeBot', 'anthropic-ai', 'Omgilibot', 'Omgili', 'Bytespider', 'PetalBot', 'Amazonbot',
          // SEO & Scraper Bots
          'AhrefsBot', 'SemrushBot', 'DotBot', 'MJ12bot', 'Rogerbot', 'Screaming Frog SEO Spider', 'MegaIndex.ru', 'DataForSeoBot'
        ],
        disallow: ['/'],
      },
    ],
    sitemap: [
      'https://vtpbluewaters.com/sitemap.xml',
    ],
    host: 'https://vtpbluewaters.com',
  };
}
