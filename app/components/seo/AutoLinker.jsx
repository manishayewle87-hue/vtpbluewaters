import React from 'react';
import Link from 'next/link';

/**
 * AutoLinker — Semantic Internal Linking Engine
 * 
 * Automatically scans text content and converts recognized entities (projects, locations)
 * into internal links. This builds massive topical authority without manual editing,
 * mimicking a Wikipedia-style internal linking architecture.
 * 
 * Usage:
 * <AutoLinker text={blog.content} lang="en" />
 */

const KEYWORD_MAP = {
  // Project Keywords
  'VTP Earth 1': '/projects/vtp-earth-one-mahalunge-pune',
  'Earth 1': '/projects/vtp-earth-one-mahalunge-pune',
  'VTP Altamira': '/projects/vtp-altamira-kharadi-pune',
  'Altamira': '/projects/vtp-altamira-kharadi-pune',
  'VTP Monarque': '/projects/vtp-monarque-hinjawadi-pune',
  'Monarque': '/projects/vtp-monarque-hinjawadi-pune',
  'VTP Blue Waters': '/township',
  
  // Location Keywords
  'Mahalunge': '/locations/mahalunge',
  'Baner': '/locations/baner-sus',
  'Hinjawadi': '/locations/hinjawadi',
  'Wakad': '/locations/wakad',
  'Kharadi': '/locations/kharadi',
};

// Sort keywords by length descending so we match "VTP Earth 1" before "Earth 1"
const sortedKeywords = Object.keys(KEYWORD_MAP).sort((a, b) => b.length - a.length);

export default function AutoLinker({ text, lang = 'en' }) {
  if (!text) return null;

  // Build a regex that matches any of the keywords, word boundaries ensure we don't match partial words
  // e.g., \b(VTP Earth 1|Earth 1|VTP Altamira)\b
  const regex = new RegExp(`\\b(${sortedKeywords.join('|')})\\b`, 'gi');

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Add the linked keyword
    const keyword = match[0];
    // Find the correct path (case-insensitive lookup)
    const originalKeyword = sortedKeywords.find(k => k.toLowerCase() === keyword.toLowerCase());
    const path = KEYWORD_MAP[originalKeyword];

    parts.push(
      <Link 
        key={match.index} 
        href={`${lang === 'en' ? path : '/' + lang + path}`}
        className="text-primary-600 hover:text-primary-800 underline decoration-primary-300 decoration-2 underline-offset-2 font-medium transition-colors"
        title={`View details for ${keyword}`}
      >
        {keyword}
      </Link>
    );

    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <span>{parts}</span>;
}
