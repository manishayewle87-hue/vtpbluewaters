export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: [
      // ─── Google Search & Ecosystem Crawlers (Highest Priority) ───
      {
        userAgent: [
          'Googlebot',
          'Googlebot-Image',
          'Googlebot-Video',
          'Googlebot-News',
          'Storebot-Google',
          'Mediapartners-Google',
          'AdsBot-Google',
          'AdsBot-Google-Mobile',
          'Google-InspectionTool'
        ],
        allow: [
          '/',
          '/api/google-realestate/',
          '/google-realestate-feed.xml',
          '/geo/pune-properties.geojson',
          '/property-feed.xml'
        ],
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
          '/*?*gclid=',
          '/*?*fbclid='
        ]
      },

      // ─── Bing & Other Valid Search Engines ───
      {
        userAgent: ['Bingbot', 'msnbot', 'BingPreview'],
        allow: ['/'],
        disallow: ['/admin/', '/private/', '/api/', '/preview/'],
        crawlDelay: 1
      },
      {
        userAgent: ['DuckDuckBot', 'Slurp'],
        allow: ['/'],
        disallow: ['/admin/', '/private/', '/api/'],
        crawlDelay: 1
      },

      // ─── Block Crawl Budget Wasters ───
      {
        userAgent: ['Yandex', 'Baiduspider', 'Sogou'],
        disallow: ['/']
      },

      // ─── Default Rule for General Browsers & Crawlers ───
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
          '/_next/data/',
          '/cdn-cgi/',
          '/*?*gclid=',
          '/*?*fbclid='
        ]
      },

      // ─── Block Unauthorized AI Scrapers & Scraping Spiders ───
      {
        userAgent: [
          'GPTBot', 'ChatGPT-User', 'CCBot', 'ClaudeBot', 'anthropic-ai', 'Omgilibot', 'Omgili',
          'Bytespider', 'PetalBot', 'Amazonbot', 'Google-Extended', 'PerplexityBot', 'cohere-ai',
          'AhrefsBot', 'SemrushBot', 'DotBot', 'MJ12bot', 'Rogerbot', 'Screaming Frog SEO Spider',
          'MegaIndex.ru', 'DataForSeoBot', 'Barkrowler', 'BLEXBot', 'YisouSpider'
        ],
        disallow: ['/']
      }
    ],
    sitemap: [
      'https://vtpbluewaters.com/sitemap.xml',
      'https://vtpbluewaters.com/sitemap/0.xml',
      'https://vtpbluewaters.com/sitemap/1.xml',
      'https://vtpbluewaters.com/sitemap-news.xml',
      'https://vtpbluewaters.com/sitemap-video.xml',
      'https://vtpbluewaters.com/sitemap-locations.kml',
      'https://vtpbluewaters.com/google-realestate-feed.xml',
      'https://vtpbluewaters.com/geo/pune-properties.geojson',
      'https://vtpbluewaters.com/rss.xml',
      'https://vtpbluewaters.com/property-feed.xml'
    ],
    host: 'https://vtpbluewaters.com'
  };
}

