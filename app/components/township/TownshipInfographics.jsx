'use client';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: '200+', label: 'Acres of Ecosystem', colSpan: 2, bgClass: 'bg-luxury-gold text-luxury-navy' },
  { value: '1KM', label: 'Riverfront Promenade', colSpan: 1, bgClass: 'glass' },
  { value: '6', label: 'Luxury Residential Clusters', colSpan: 1, bgClass: 'glass' },
  { value: '100+', label: 'World-Class Amenities', colSpan: 1, bgClass: 'glass' },
  { value: '4+', label: 'Acres of High Street Retail', colSpan: 1, bgClass: 'glass' }
];

export default function TownshipInfographics() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="py-16 lg:py-32 bg-luxury-navy relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-10 lg:mb-20"
        >
          <h2 className="text-display-md md:text-display-lg text-white font-display font-light uppercase tracking-tight">
            The Scale of <span className="text-luxury-gold font-normal">Luxury</span>
          </h2>
          <div className="w-16 h-px bg-luxury-gold mx-auto mt-8"></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`${
                stat.colSpan === 2 ? 'col-span-2' : 'col-span-1'
              } ${stat.bgClass} flex flex-col justify-center items-center p-8 md:p-12 text-center group overflow-hidden relative min-h-[200px]`}
            >
              {stat.bgClass.includes('glass') && (
                <div className="absolute inset-0 bg-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              )}
              <h3 className={`text-5xl md:text-7xl font-display font-light mb-3 relative z-10 ${
                stat.bgClass.includes('text-luxury-navy') ? 'text-luxury-navy' : 'text-luxury-gold'
              }`}>
                {stat.value}
              </h3>
              <p className={`text-xs md:text-sm font-medium tracking-[0.2em] uppercase relative z-10 ${
                stat.bgClass.includes('text-luxury-navy') ? 'text-luxury-navy/80' : 'text-luxury-silver'
              }`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
