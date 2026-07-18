'use client';
import React from 'react';

export default function Logo({ className }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 520 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="VTP BLUE WATERS Logo"
    >
      {/* --- VTP REALTY GRAPHIC MARK --- */}
      <g transform="translate(0, 5)">
        {/* Cyan vertical bar */}
        <rect x="22" y="0" width="24" height="72" fill="#36C5CD" rx="1" />
        
        {/* Light blue square - left */}
        <rect x="0" y="24" width="22" height="22" fill="#66CCF1" rx="1" />
        
        {/* Purple horizontal bar - overlaps */}
        <rect x="10" y="36" width="70" height="24" fill="#7D86C1" rx="1" />
        
        {/* VTP text inside purple bar */}
        <text 
          x="26" y="54" 
          fill="#FFFFFF" 
          fontSize="16" 
          fontWeight="800" 
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.05em"
        >
          VTP
        </text>
        
        {/* REALTY text below */}
        <text 
          x="48" y="72" 
          fill="#FDFDFD" 
          fontSize="9" 
          fontWeight="700" 
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.12em"
        >
          REALTY
        </text>
        
        {/* Tagline */}
        <text 
          x="0" y="88" 
          fill="#C0C0C0" 
          fontSize="5.5" 
          fontWeight="600" 
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.08em"
          opacity="0.7"
        >
          A WORLD OF THOUGHTFULNESS
        </text>
      </g>

      {/* --- DIVIDER --- */}
      <line x1="100" y1="8" x2="100" y2="88" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />

      {/* --- TOWNSHIP CODENAME TEXT --- */}
      <text 
        x="116" y="30" 
        fill="#C0C0C0" 
        fontSize="14" 
        fontWeight="700" 
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="0.25em"
      >
        TOWNSHIP CODENAME
      </text>

      {/* --- BLUEWATERS MAIN TITLE --- */}
      <text 
        x="114" y="72" 
        fill="#36C5CD" 
        fontSize="48" 
        fontWeight="900" 
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="-0.01em"
      >
        BLUEWATERS
      </text>

      {/* --- Subtle accent line under BLUEWATERS --- */}
      <rect x="116" y="80" width="60" height="1" fill="#D4AF37" opacity="0.4" rx="0.5" />
    </svg>
  );
}
