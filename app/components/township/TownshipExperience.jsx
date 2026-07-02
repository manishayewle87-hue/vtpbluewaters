'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TownshipExperience() {
  return (
    <section className="py-24 lg:py-40 bg-luxury-navy text-white relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-24 max-w-4xl mx-auto"
        >
          <p className="text-luxury-label text-luxury-gold mb-6">The Lifestyle</p>
          <h2 className="text-display-md md:text-display-lg lg:text-display-xl font-display font-light uppercase tracking-tighter leading-[0.9] mb-8">
            Breathe the <br />
            <span className="text-luxury-gold font-normal">Extraordinary</span>
          </h2>
          <p className="text-luxury-silver text-lg font-light leading-relaxed">
            Immerse yourself in sprawling green lungs and a meticulously crafted riverfront. 
            VTP Bluewaters is designed to elevate your everyday living into a resort-like experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Text Left */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8 order-2 lg:order-1"
          >
            <div>
              <h3 className="text-3xl md:text-4xl font-display font-normal text-luxury-gold mb-4">
                The Central Gardens
              </h3>
              <p className="text-lg text-luxury-silver font-light leading-relaxed">
                Step into massive open green spaces designed for all ages. Featuring vast lawns, reflexology paths, children's play zones, and serene water bodies. The lungs of the township ensure fresh air and tranquility right outside your towering luxury residence.
              </p>
            </div>
            
            <div className="w-full h-px bg-white/10"></div>
            
            <div>
              <h3 className="text-3xl md:text-4xl font-display font-normal text-luxury-gold mb-4">
                1KM River Promenade
              </h3>
              <p className="text-lg text-luxury-silver font-light leading-relaxed">
                Enjoy exclusive access to the beautifully landscaped Mula-Mutha river promenade. Designed for morning jogs, sunset walks, and outdoor seating, blending urban luxury with nature's undisturbed rhythm.
              </p>
            </div>
          </motion.div>

          {/* Image Right */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-[60vh] lg:h-[80vh] rounded-2xl overflow-hidden order-1 lg:order-2 shadow-2xl shadow-luxury-gold/5"
          >
            <Image
              src="/images/real_vtp/flamante_hero.jpg"
              alt="VTP Bluewaters Central Garden"
              fill
              className="object-cover hover:scale-105 transition-transform duration-[2s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy/80 via-transparent to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
