'use client';
import { useEffect } from 'react';

/**
 * Speculation Rules API
 * Modern W3C standard for instant 0ms prerendering and prefetching in Chromium browsers.
 * Drastically improves Google Core Web Vitals (INP, LCP, CLS) and user dwell metrics.
 */
export default function SpeculationRules() {
  useEffect(() => {
    // Check if browser supports speculation rules
    if (HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules')) {
      const existing = document.querySelector('script[type="speculationrules"]');
      if (existing) return;

      const specRules = {
        prerender: [
          {
            source: 'list',
            urls: [
              '/configurations',
              '/township',
              '/tools/emi-calculator',
              '/investors/nri-investment-guide',
              '/insights'
            ],
            eagerness: 'moderate'
          },
          {
            source: 'document',
            where: {
              and: [
                { href_matches: '/projects/*' },
                { not: { href_matches: '/*?*' } }
              ]
            },
            eagerness: 'conservative'
          },
          {
            source: 'document',
            where: {
              and: [
                { href_matches: '/explore/*' },
                { not: { href_matches: '/*?*' } }
              ]
            },
            eagerness: 'conservative'
          }
        ],
        prefetch: [
          {
            source: 'document',
            where: {
              and: [
                { href_matches: '/*' },
                { not: { href_matches: '/api/*' } },
                { not: { href_matches: '/admin/*' } }
              ]
            },
            eagerness: 'conservative'
          }
        ]
      };

      const script = document.createElement('script');
      script.type = 'speculationrules';
      script.textContent = JSON.stringify(specRules);
      document.head.appendChild(script);
    }
  }, []);

  return null;
}
