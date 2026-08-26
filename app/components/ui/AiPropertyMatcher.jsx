'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const PROJECTS_DATA = [
  {
    slug: 'vtp-earth-one-mahalunge-pune',
    name: 'VTP Earth 1',
    location: 'Mahalunge, West Pune',
    zone: 'West',
    bhk: ['2-bhk', '3-bhk', '4-bhk'],
    priceMin: 9000000,
    priceMax: 26000000,
    priceStr: '₹90 L - ₹2.6 Cr',
    possession: '2026/2027',
    highlight: '1 KM Riverfront Promenade, 5-Star Club & Sports Academy',
    tags: ['Township', 'River View', 'Luxury', 'High Appreciation'],
    image: '/assets/projects/earth-1/hero.jpg'
  },
  {
    slug: 'vtp-monarque-hinjawadi-pune',
    name: 'VTP Monarque',
    location: 'Hinjewadi Phase 1, West Pune',
    zone: 'West',
    bhk: ['2-bhk', '3-bhk'],
    priceMin: 9500000,
    priceMax: 18500000,
    priceStr: '₹95 L - ₹1.85 Cr',
    possession: '2027',
    highlight: 'Walk to Work Hinjewadi Phase 1, MLA Architecture',
    tags: ['IT Hub', 'Walk to Work', 'High Rental Yield'],
    image: '/assets/projects/monarque/hero.jpg'
  },
  {
    slug: 'vtp-volare-hinjawadi-pune',
    name: 'VTP Volare',
    location: 'Hinjewadi Phase 1, West Pune',
    zone: 'West',
    bhk: ['2-bhk', '3-bhk'],
    priceMin: 8500000,
    priceMax: 16500000,
    priceStr: '₹85 L - ₹1.65 Cr',
    possession: '2027',
    highlight: 'Modern Sky Amenities, Near Metro Line 3',
    tags: ['Metro Proximity', 'Tech Professional', 'Smart Home'],
    image: '/assets/projects/volare/hero.jpg'
  },
  {
    slug: 'vtp-altamira-kharadi-pune',
    name: 'VTP Altamira',
    location: 'Kharadi EON IT Park, East Pune',
    zone: 'East',
    bhk: ['2-bhk', '3-bhk', '4-bhk'],
    priceMin: 11000000,
    priceMax: 29000000,
    priceStr: '₹1.1 Cr - ₹2.9 Cr',
    possession: '2027',
    highlight: 'Township Pegasus, 5-Tier Security, Near World Trade Center',
    tags: ['East Pune Luxury', 'EON IT Park', 'Township'],
    image: '/assets/projects/altamira/hero.jpg'
  },
  {
    slug: 'vtp-flamante-kharadi-pune',
    name: 'VTP Flamante',
    location: 'Kharadi, East Pune',
    zone: 'East',
    bhk: ['2-bhk', '3-bhk', '4-bhk'],
    priceMin: 9800000,
    priceMax: 19500000,
    priceStr: '₹98 L - ₹1.95 Cr',
    possession: '2027',
    highlight: 'Curved Glass Facade, Ultra-Modern Lifestyle Amenities',
    tags: ['Iconic Facade', 'East Pune IT Hub', 'Young HNIs'],
    image: '/assets/projects/flamante/hero.jpg'
  },
  {
    slug: 'vtp-velvet-villas-kharadi-pune',
    name: 'VTP Velvet Villas',
    location: 'Kharadi, East Pune',
    zone: 'East',
    bhk: ['villas', '4-bhk', '5-bhk'],
    priceMin: 35000000,
    priceMax: 75000000,
    priceStr: '₹3.5 Cr - ₹7.5 Cr',
    possession: '2026',
    highlight: 'Exclusive Private Luxury Villas with Personal Garden & Terrace',
    tags: ['Ultra Luxury', 'Private Villa', 'High Net Worth'],
    image: '/assets/projects/velvet-villas/hero.jpg'
  },
  {
    slug: 'vtp-cielo-bavdhan-pune',
    name: 'VTP Cielo',
    location: 'Bavdhan, Pune',
    zone: 'West',
    bhk: ['2-bhk', '3-bhk', '4-bhk'],
    priceMin: 12000000,
    priceMax: 32000000,
    priceStr: '₹1.2 Cr - ₹3.2 Cr',
    possession: '2027',
    highlight: 'Serene Nature Reserve Views, 5 Mins to Kothrud & Chandani Chowk',
    tags: ['Nature Hill View', 'Central Connectivity', 'Large Deck'],
    image: '/assets/projects/cielo/hero.jpg'
  },
  {
    slug: 'vtp-euphoria-new-kharadi-pune',
    name: 'VTP Euphoria',
    location: 'New Kharadi, East Pune',
    zone: 'East',
    bhk: ['1-bhk', '2-bhk', '3-bhk'],
    priceMin: 6500000,
    priceMax: 14500000,
    priceStr: '₹65 L - ₹1.45 Cr',
    possession: '2027',
    highlight: '3+ Acres of Olympic Sports Amenities & Active Living',
    tags: ['Sports Township', 'Family Friendly', 'East Pune'],
    image: '/assets/projects/euphoria/hero.webp'
  },
  {
    slug: 'vtp-dolce-vita-new-kharadi-pune',
    name: 'VTP Dolce Vita',
    location: 'New Kharadi, East Pune',
    zone: 'East',
    bhk: ['1-bhk', '2-bhk', '3-bhk'],
    priceMin: 6800000,
    priceMax: 15500000,
    priceStr: '₹68 L - ₹1.55 Cr',
    possession: '2027',
    highlight: 'Contemporary Italian Living near EON IT Park',
    tags: ['Township Pegasus', 'Modern Living', 'IT Professionals'],
    image: '/assets/projects/dolce-vita/hero.webp'
  },
  {
    slug: 'vtp-aethereus-high-street-mahalunge-pune',
    name: 'VTP Aethereus',
    location: 'Mahalunge, West Pune',
    zone: 'West',
    bhk: ['2-bhk', '3-bhk'],
    priceMin: 7600000,
    priceMax: 16000000,
    priceStr: '₹76 L - ₹1.6 Cr',
    possession: 'Ready & Handover',
    highlight: '31+ Storey Towers with River and Hill Views in Blue Waters',
    tags: ['High Rise', 'River View', 'Ready Soon'],
    image: '/assets/projects/aethereus/hero.webp'
  },
  {
    slug: 'vtp-sierra-baner-sus-road-pune',
    name: 'VTP Sierra',
    location: 'Baner-Sus Road, West Pune',
    zone: 'West',
    bhk: ['2-bhk', '3-bhk'],
    priceMin: 7000000,
    priceMax: 14500000,
    priceStr: '₹70 L - ₹1.45 Cr',
    possession: '2026',
    highlight: 'Hillside Living with Scenic Forest Panoramas',
    tags: ['Hill View', 'Baner Connectivity', 'Tranquil Living'],
    image: '/assets/projects/sierra/hero.webp'
  },
  {
    slug: 'vtp-celesta-nibm-road-pune',
    name: 'VTP Celesta',
    location: 'NIBM Road, South Pune',
    zone: 'South',
    bhk: ['3-bhk'],
    priceMin: 9500000,
    priceMax: 17500000,
    priceStr: '₹95 L - ₹1.75 Cr',
    possession: 'Ready to Move',
    highlight: 'Exclusive Single-Tower Residences Overlooking Reserve Forest',
    tags: ['South Pune', 'Forest Reserve', 'Ready to Move'],
    image: '/assets/projects/cielo/hero.webp'
  },
  {
    slug: 'vtp-altitude-wakad-pune',
    name: 'VTP Altitude',
    location: 'Wakad, West Pune',
    zone: 'West',
    bhk: ['commercial', 'offices', 'retail'],
    priceMin: 4500000,
    priceMax: 35000000,
    priceStr: '₹45 L - ₹3.5 Cr',
    possession: '2026',
    highlight: 'Grade A Commercial Office Spaces & High Street Retail',
    tags: ['Commercial', 'Office Spaces', 'High ROI'],
    image: '/assets/projects/volare/hero.webp'
  }
];

export default function AiPropertyMatcher() {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    zone: 'Any',
    bhk: '3-bhk',
    budgetMax: 20000000, // ₹2 Cr
    purpose: 'self-use' // self-use or investment
  });

  const matches = React.useMemo(() => {
    return PROJECTS_DATA.map(p => {
      let score = 70; // baseline

      // Zone match
      if (preferences.zone === 'Any' || p.zone === preferences.zone) {
        score += 15;
      }

      // BHK match
      if (p.bhk.includes(preferences.bhk)) {
        score += 15;
      }

      // Budget match
      if (p.priceMin <= preferences.budgetMax) {
        score += 10;
        if (p.priceMax <= preferences.budgetMax) {
          score += 5;
        }
      } else {
        score -= 20;
      }

      return {
        ...p,
        matchScore: Math.min(99, Math.max(40, score))
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, [preferences]);

  return (
    <div className="w-full bg-[#070D1E] border border-luxury-gold/20 rounded-2xl p-6 md:p-10 text-white shadow-2xl backdrop-blur-xl">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs uppercase tracking-widest text-luxury-gold font-semibold">AI Match Engine</span>
        <h2 className="text-3xl md:text-4xl font-heading text-white mt-2">Smart Property Recommendation Advisor</h2>
        <p className="text-sm text-luxury-silver/80 mt-2">
          Tell us your ideal requirements, and our AI algorithm matches you with the highest-rated VTP residences.
        </p>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {[1, 2, 3].map((s) => (
          <button
            key={s}
            onClick={() => setStep(s)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              step === s
                ? 'bg-luxury-gold text-luxury-navy shadow-lg'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            <span>Step {s}</span>
            <span className="text-[10px] opacity-70">
              {s === 1 ? 'Location & Purpose' : s === 2 ? 'Configuration & Budget' : 'AI Match Results'}
            </span>
          </button>
        ))}
      </div>

      {/* Step 1: Location & Purpose */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 max-w-2xl mx-auto"
        >
          <div>
            <label className="block text-sm text-luxury-silver mb-3">Preferred Pune Region / Corridor</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { id: 'Any', label: 'All Pune Corridors' },
                { id: 'West', label: 'West Pune (Hinjewadi / Baner / Mahalunge)' },
                { id: 'East', label: 'East Pune (Kharadi / EON IT Hub)' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPreferences(p => ({ ...p, zone: opt.id }))}
                  className={`p-4 rounded-xl border text-left text-xs transition-all ${
                    preferences.zone === opt.id
                      ? 'border-luxury-gold bg-luxury-gold/10 text-white font-bold'
                      : 'border-white/10 bg-white/5 text-luxury-silver hover:bg-white/10'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-luxury-silver mb-3">Primary Purchase Goal</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'self-use', label: '🏡 Family Home / Self-Use', desc: 'Prioritizing luxury amenities, schools & space' },
                { id: 'investment', label: '📈 High Rental ROI / Investment', desc: 'Prioritizing tech park proximity & rental yield' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPreferences(p => ({ ...p, purpose: opt.id }))}
                  className={`p-4 rounded-xl border text-left text-xs transition-all ${
                    preferences.purpose === opt.id
                      ? 'border-luxury-gold bg-luxury-gold/10 text-white font-bold'
                      : 'border-white/10 bg-white/5 text-luxury-silver hover:bg-white/10'
                  }`}
                >
                  <div className="font-semibold text-sm">{opt.label}</div>
                  <div className="text-[11px] text-white/50 mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-8 py-3.5 bg-luxury-gold text-luxury-navy font-bold uppercase tracking-wider text-xs rounded-xl hover:brightness-110 shadow-lg"
            >
              Continue to Step 2 →
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 2: Configuration & Budget */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 max-w-2xl mx-auto"
        >
          <div>
            <label className="block text-sm text-luxury-silver mb-3">Preferred Configuration</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: '2-bhk', label: '2 BHK Luxury' },
                { id: '3-bhk', label: '3 BHK Grand' },
                { id: '4-bhk', label: '4 BHK Duplex' },
                { id: 'villas', label: 'Private Villa' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPreferences(p => ({ ...p, bhk: opt.id }))}
                  className={`p-4 rounded-xl border text-center text-xs transition-all ${
                    preferences.bhk === opt.id
                      ? 'border-luxury-gold bg-luxury-gold/10 text-white font-bold'
                      : 'border-white/10 bg-white/5 text-luxury-silver hover:bg-white/10'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-luxury-silver">Maximum Budget Ceiling</label>
              <span className="text-lg font-bold text-luxury-gold">
                ₹{(preferences.budgetMax / 10000000).toFixed(2)} Crore
              </span>
            </div>
            <input
              type="range"
              min={7000000}
              max={60000000}
              step={1000000}
              value={preferences.budgetMax}
              onChange={(e) => setPreferences(p => ({ ...p, budgetMax: Number(e.target.value) }))}
              className="w-full accent-[#C5A880] cursor-pointer h-2 bg-white/20 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-white/40 mt-1">
              <span>₹70 L</span>
              <span>₹2.5 Cr</span>
              <span>₹6 Cr+</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-3 bg-white/10 text-white text-xs rounded-xl hover:bg-white/20"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-8 py-3.5 bg-luxury-gold text-luxury-navy font-bold uppercase tracking-wider text-xs rounded-xl hover:brightness-110 shadow-lg"
            >
              Calculate AI Matches ⚡
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Match Results */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-xs text-luxury-silver">
              Showing top matches for: <strong className="text-white">{preferences.bhk.toUpperCase()}</strong> in <strong className="text-white">{preferences.zone} Pune</strong> (Under ₹{(preferences.budgetMax/10000000).toFixed(1)} Cr)
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs text-luxury-gold underline hover:text-white"
            >
              Modify Criteria
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.slice(0, 6).map((project, idx) => (
              <div
                key={project.slug}
                className="bg-[#0B132B] border border-white/10 rounded-2xl overflow-hidden hover:border-luxury-gold/50 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="relative h-48 w-full bg-slate-800 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-[#050914]/90 border border-luxury-gold px-3 py-1 rounded-full text-xs font-bold text-luxury-gold shadow-md">
                      {project.matchScore}% Match
                    </div>
                  </div>

                  <div className="p-5">
                    <span className="text-[10px] uppercase tracking-wider text-luxury-silver/70">{project.location}</span>
                    <h3 className="text-xl font-heading text-white mt-1 group-hover:text-luxury-gold transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs text-luxury-silver/80 mt-2 line-clamp-2">
                      {project.highlight}
                    </p>

                    <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                      <div>
                        <span className="text-white/40 block text-[10px]">Indicative Price</span>
                        <span className="text-luxury-gold font-bold">{project.priceStr}</span>
                      </div>
                      <div>
                        <span className="text-white/40 block text-[10px]">Possession</span>
                        <span className="text-white font-medium">{project.possession}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="w-full block text-center py-2.5 bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-navy font-bold uppercase tracking-wider text-xs rounded-xl transition-all"
                  >
                    View Floor Plans & Pricing →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
