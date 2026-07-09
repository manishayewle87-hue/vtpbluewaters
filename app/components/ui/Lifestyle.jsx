'use client';
import { motion } from 'framer-motion';

import Image from 'next/image';

export default function Lifestyle() {
  return (
    <section id="amenities" className="py-16 lg:py-16 lg:py-32 bg-luxury-navy relative overflow-hidden border-t border-luxury-gold/10">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-24"
        >
          <div className="text-luxury-label text-luxury-gold mb-4">Beyond the Residence</div>
          <h2 className="text-display-sm md:text-display-md font-display font-light">
            An Unrivaled <span className="italic text-luxury-silver">Lifestyle</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="aspect-[4/3] bg-luxury-charcoal relative overflow-hidden group"
          >
            <Image 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940&auto=format&fit=crop" 
              alt="Lifestyle"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-display font-light text-luxury-white mb-4">High Street Retail</h3>
              <p className="text-luxury-silver font-light text-editorial leading-relaxed">
                Step down to a sprawling commercial high street offering premium dining, boutique shopping, and everyday conveniences right within the township.
              </p>
            </div>
            <div className="luxury-divider"></div>
            <div>
              <h3 className="text-2xl font-display font-light text-luxury-white mb-4">Sports Academy</h3>
              <p className="text-luxury-silver font-light text-editorial leading-relaxed">
                Professional-grade sports facilities including tennis courts, a full-size cricket ground, and Olympic-length swimming pools managed by global experts.
              </p>
            </div>
            <div className="luxury-divider"></div>
            <div>
              <h3 className="text-2xl font-display font-light text-luxury-white mb-4">Wellness Sanctuaries</h3>
              <p className="text-luxury-silver font-light text-editorial leading-relaxed">
                Dedicated zones for meditation, yoga pavilions overlooking the river, and luxury spas designed to rejuvenate your mind and body.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
