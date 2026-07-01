'use client';
import { motion } from 'framer-motion';

export default function ProjectSpecs({ specifications }) {
  return (
    <section className="py-24 bg-luxury-charcoal border-b border-luxury-gold/10">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-luxury-label text-luxury-gold mb-4">Craftsmanship</div>
          <h2 className="text-display-sm md:text-display-md font-display font-light">Premium <span className="italic text-luxury-silver">Specifications</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {specifications.map((spec, idx) => {
            const category = typeof spec === 'string' ? null : spec.category;
            const details = typeof spec === 'string' ? spec : spec.details;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-6 p-6 border-b border-white/5 group hover:bg-white/[0.02] transition-colors"
              >
                <div className="w-1 h-1 rounded-full bg-luxury-gold mt-2 flex-shrink-0"></div>
                <div>
                  {category && <div className="text-luxury-label text-luxury-gold mb-2">{category}</div>}
                  <p className="text-sm text-luxury-silver font-light text-editorial group-hover:text-luxury-white transition-colors">{details}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
