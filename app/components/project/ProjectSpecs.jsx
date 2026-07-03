'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { SpecIcon } from './ProjectAmenities';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

export default function ProjectSpecs({ specifications }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section className="py-24 bg-luxury-charcoal border-b border-luxury-gold/10 relative overflow-hidden">
      {/* Background glow that follows active item */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-luxury-gold/[0.02] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="text-luxury-label text-luxury-gold mb-4 tracking-[0.3em]">Craftsmanship</div>
          <h2 className="text-display-sm md:text-display-md font-display font-light">
            Premium <span className="italic text-luxury-silver">Specifications</span>
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5%" }}
          className="grid md:grid-cols-2 gap-x-12 gap-y-6"
        >
          {specifications.map((spec, idx) => {
            const category = typeof spec === 'string' ? 'Details' : spec.category;
            const details = typeof spec === 'string' ? spec : spec.details;
            const isHovered = hoveredIdx === idx;

            return (
              <motion.div
                variants={itemVariants}
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group relative flex items-start gap-6 p-6 rounded-lg cursor-default border border-transparent transition-all duration-500"
              >
                {/* Fluid Background Hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-luxury-gold/5 to-transparent rounded-lg border border-luxury-gold/10 pointer-events-none"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ 
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.95,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />

                {/* Animated Icon */}
                <motion.div 
                  className={`w-10 h-10 mt-1 flex-shrink-0 transition-colors duration-500 relative z-10 ${isHovered ? 'text-luxury-gold' : 'text-luxury-silver/30'}`}
                  animate={{ scale: isHovered ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <SpecIcon category={category} isHovered={isHovered} />
                </motion.div>
                
                <div className="relative z-10">
                  {category && (
                    <motion.div 
                      className="text-luxury-label text-luxury-gold mb-2 tracking-[0.2em]"
                      animate={{ x: isHovered ? 5 : 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                      {category}
                    </motion.div>
                  )}
                  <p className={`text-sm font-light text-editorial leading-relaxed transition-colors duration-500 ${isHovered ? 'text-luxury-white' : 'text-luxury-silver'}`}>
                    {details}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
