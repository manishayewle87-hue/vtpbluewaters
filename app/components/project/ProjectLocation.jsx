'use client';
import { motion } from 'framer-motion';
import InteractiveMap from './InteractiveMap';

export default function ProjectLocation({ locationHighlights, location }) {
  return (
    <section className="py-12 lg:py-24 bg-luxury-navy border-b border-luxury-gold/10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-luxury-label text-luxury-gold mb-4">Strategic Advantage</div>
            <h2 className="text-display-sm md:text-display-md font-display font-light mb-10">
              Location <span className="italic text-luxury-silver">Connectivity</span>
            </h2>
            <div className="luxury-divider mb-10"></div>
            
            <div className="space-y-0">
              {locationHighlights.map((highlight, idx) => {
                const title = typeof highlight === 'string' ? highlight : highlight.title;
                const distance = typeof highlight === 'string' ? null : highlight.distance;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06 }}
                    className="flex items-center justify-between gap-6 py-5 border-b border-white/5 group hover:bg-white/[0.02] transition-colors px-2"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#36C5CD] mt-1.5 flex-shrink-0"></div>
                      <p className="text-sm text-luxury-silver font-light text-editorial group-hover:text-luxury-white transition-colors">{title}</p>
                    </div>
                    {distance && (
                      <span className="text-luxury-caption text-luxury-gold flex-shrink-0">{distance}</span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="aspect-square bg-luxury-charcoal overflow-hidden relative group rounded-xl border border-white/5 shadow-2xl"
          >
            <InteractiveMap locationName={location} />
            <div className="absolute inset-0 pointer-events-none border border-luxury-gold/10 rounded-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
