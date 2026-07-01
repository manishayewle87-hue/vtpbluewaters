'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

// SVG Animated Icons mapped to amenity icon names
const AmenityIcon = ({ name, isHovered }) => {
  const icons = {
    Waves: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <motion.path
          d="M6 24c3-4 6-4 9 0s6 4 9 0 6-4 9 0 6 4 9 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isHovered ? 1 : 0.7 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <motion.path
          d="M6 32c3-4 6-4 9 0s6 4 9 0 6-4 9 0 6 4 9 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeInOut" }}
        />
        <motion.path
          d="M6 16c3-4 6-4 9 0s6 4 9 0 6-4 9 0 6 4 9 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.3}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
        />
      </svg>
    ),
    Building: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <motion.rect x="10" y="8" width="28" height="34" rx="2" stroke="currentColor" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        <motion.rect x="16" y="14" width="5" height="5" rx="1" fill="currentColor" opacity={isHovered ? 1 : 0.4}
          animate={{ opacity: isHovered ? 1 : 0.4 }} transition={{ duration: 0.3 }} />
        <motion.rect x="27" y="14" width="5" height="5" rx="1" fill="currentColor" opacity={isHovered ? 1 : 0.4}
          animate={{ opacity: isHovered ? 1 : 0.4, transition: { delay: 0.1 } }} />
        <motion.rect x="16" y="24" width="5" height="5" rx="1" fill="currentColor" opacity={isHovered ? 1 : 0.4}
          animate={{ opacity: isHovered ? 1 : 0.4, transition: { delay: 0.2 } }} />
        <motion.rect x="27" y="24" width="5" height="5" rx="1" fill="currentColor" opacity={isHovered ? 1 : 0.4}
          animate={{ opacity: isHovered ? 1 : 0.4, transition: { delay: 0.3 } }} />
        <motion.rect x="20" y="34" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.4 }} />
      </svg>
    ),
    Leaf: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <motion.path
          d="M12 36C12 36 14 14 36 10C36 10 38 36 14 38"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <motion.path
          d="M14 36C18 30 24 22 36 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={0.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isHovered ? 1 : 0.6 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </svg>
    ),
    Cpu: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <motion.rect x="14" y="14" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
        <motion.rect x="19" y="19" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: isHovered ? 1 : 0.6 }}
          transition={{ duration: 0.6, delay: 0.3 }} />
        {[20, 24, 28].map((x, i) => (
          <motion.g key={`top-${i}`}>
            <motion.line x1={x} y1="8" x2={x} y2="14" stroke="currentColor" strokeWidth="1.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * i + 0.5 }} />
            <motion.line x1={x} y1="34" x2={x} y2="40" stroke="currentColor" strokeWidth="1.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * i + 0.6 }} />
          </motion.g>
        ))}
        {[20, 24, 28].map((y, i) => (
          <motion.g key={`side-${i}`}>
            <motion.line x1="8" y1={y} x2="14" y2={y} stroke="currentColor" strokeWidth="1.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * i + 0.7 }} />
            <motion.line x1="34" y1={y} x2="40" y2={y} stroke="currentColor" strokeWidth="1.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * i + 0.8 }} />
          </motion.g>
        ))}
      </svg>
    ),
    Dumbbell: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <motion.line x1="14" y1="24" x2="34" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
        <motion.rect x="8" y="18" width="6" height="12" rx="2" stroke="currentColor" strokeWidth="2"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 0.3, type: 'spring' }} />
        <motion.rect x="34" y="18" width="6" height="12" rx="2" stroke="currentColor" strokeWidth="2"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 0.4, type: 'spring' }} />
        <motion.line x1="6" y1="20" x2="6" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.3, delay: 0.5 }} />
        <motion.line x1="42" y1="20" x2="42" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.3, delay: 0.6 }} />
      </svg>
    ),
    Briefcase: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <motion.rect x="8" y="16" width="32" height="22" rx="3" stroke="currentColor" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
        <motion.path d="M18 16V12a2 2 0 012-2h8a2 2 0 012 2v4" stroke="currentColor" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.3 }} />
        <motion.line x1="8" y1="26" x2="40" y2="26" stroke="currentColor" strokeWidth="1.5" opacity={0.4}
          initial={{ pathLength: 0 }} animate={{ pathLength: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.6, delay: 0.5 }} />
      </svg>
    ),
  };

  return icons[name] || icons['Building'];
};

// Spec category icons
const SpecIcon = ({ category, isHovered }) => {
  const icons = {
    Flooring: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <motion.path d="M5 35L20 5L35 35H5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
        <motion.line x1="12" y1="25" x2="28" y2="25" stroke="currentColor" strokeWidth="1" opacity={0.4}
          animate={{ opacity: isHovered ? 0.8 : 0.4 }} />
        <motion.line x1="9" y1="30" x2="31" y2="30" stroke="currentColor" strokeWidth="1" opacity={0.4}
          animate={{ opacity: isHovered ? 0.8 : 0.4, transition: { delay: 0.1 } }} />
      </svg>
    ),
    Kitchen: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <motion.rect x="6" y="10" width="28" height="22" rx="2" stroke="currentColor" strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
        <motion.circle cx="15" cy="21" r="3" stroke="currentColor" strokeWidth="1.5"
          animate={{ scale: isHovered ? 1.1 : 1 }} transition={{ duration: 0.3 }} />
        <motion.circle cx="25" cy="21" r="3" stroke="currentColor" strokeWidth="1.5"
          animate={{ scale: isHovered ? 1.1 : 1 }} transition={{ duration: 0.3, delay: 0.1 }} />
      </svg>
    ),
    Bathrooms: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <motion.path d="M10 20h20v8a4 4 0 01-4 4H14a4 4 0 01-4-4v-8z" stroke="currentColor" strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
        <motion.path d="M14 20V10a4 4 0 018 0" stroke="currentColor" strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.3 }} />
        {isHovered && [14, 20, 26].map((x, i) => (
          <motion.line key={i} x1={x} y1="6" x2={x} y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
            initial={{ opacity: 0, y: 2 }} animate={{ opacity: [0, 1, 0], y: [2, -2, -6] }}
            transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }} />
        ))}
      </svg>
    ),
    Security: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <motion.path d="M20 5L6 12v10c0 8 6 13 14 16 8-3 14-8 14-16V12L20 5z" stroke="currentColor" strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        <motion.path d="M15 21l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.5 }} />
      </svg>
    ),
  };
  return icons[category] || icons['Security'];
};

export default function ProjectAmenities({ amenities }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section className="py-28 bg-[#080e1f] border-b border-luxury-gold/10 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#36C5CD]/[0.02] rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="text-luxury-label text-luxury-gold mb-4">World-Class Living</div>
          <h2 className="text-display-sm md:text-display-md font-display font-light mb-6">
            Curated <span className="italic text-luxury-silver">Amenities</span>
          </h2>
          <p className="text-sm text-luxury-silver/60 max-w-lg mx-auto font-light">
            Every amenity has been thoughtfully designed to elevate your daily experience into the extraordinary.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
          {amenities.map((amenity, idx) => {
            const name = typeof amenity === 'string' ? amenity : amenity.name;
            const iconName = typeof amenity === 'string' ? 'Building' : (amenity.icon || 'Building');
            const isHovered = hoveredIdx === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group relative"
              >
                <div className={`
                  relative p-8 lg:p-10 border transition-all duration-500 cursor-default overflow-hidden
                  ${isHovered 
                    ? 'bg-white/[0.04] border-luxury-gold/40 shadow-[0_0_40px_rgba(212,175,55,0.06)]' 
                    : 'bg-white/[0.015] border-white/[0.06]'}
                `}>
                  {/* Animated corner accent */}
                  <motion.div 
                    className="absolute top-0 left-0 w-8 h-px bg-luxury-gold"
                    animate={{ width: isHovered ? 40 : 32, opacity: isHovered ? 1 : 0.3 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.div 
                    className="absolute top-0 left-0 h-8 w-px bg-luxury-gold"
                    animate={{ height: isHovered ? 40 : 32, opacity: isHovered ? 1 : 0.3 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Icon */}
                  <motion.div 
                    className={`w-12 h-12 mb-6 transition-colors duration-500 ${isHovered ? 'text-luxury-gold' : 'text-luxury-silver/50'}`}
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                  >
                    <AmenityIcon name={iconName} isHovered={isHovered} />
                  </motion.div>

                  {/* Label */}
                  <h3 className={`text-sm font-display font-light tracking-wide transition-colors duration-500 ${isHovered ? 'text-luxury-white' : 'text-luxury-silver/80'}`}>
                    {name}
                  </h3>

                  {/* Subtle index number */}
                  <div className="absolute bottom-4 right-5 text-[8px] tracking-widest text-white/10 font-display">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Export SpecIcon for use in ProjectSpecs
export { SpecIcon };
