/**
 * KnowledgeGraph — Supplementary entity relationships
 * 
 * This component has been consolidated into GlobalSchema.jsx which now
 * contains the complete @graph with Organization, WebSite + SearchAction,
 * RealEstateAgent, Place, and ApartmentComplex entities.
 * 
 * This file is retained for backwards compatibility and renders nothing
 * to avoid duplicate structured data (which can confuse Google).
 */
export default function KnowledgeGraph() {
  // All entity data has been merged into GlobalSchema.jsx
  // Returning null prevents duplicate JSON-LD injection
  return null;
}
