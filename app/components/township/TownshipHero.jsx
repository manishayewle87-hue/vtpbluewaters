'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function TownshipHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-luxury-navy">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <Image
          src="/images/real_vtp/earth_one_hero.jpg"
          alt="VTP Blue Waters Township Aerial View"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-navy/40 via-luxury-navy/20 to-luxury-navy"></div>
      </motion.div>

      <div className="relative z-10 text-center flex flex-col items-center max-w-7xl px-6 pt-10 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 text-luxury-label text-luxury-gold"
        >
          City Within A City
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-5xl md:text-display-xl lg:text-display-2xl text-white font-display font-light uppercase tracking-tighter mb-8"
        >
          200+ Acres Of <br />
          <span className="text-luxury-gold font-normal">Unparalleled Vision</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-xl text-luxury-silver/90 max-w-3xl font-light leading-relaxed text-editorial"
        >
          Welcome to West Pune's most spectacular real estate phenomenon. A seamlessly integrated luxury ecosystem where nature, cutting-edge architecture, and vibrant community life converge.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-luxury-caption text-luxury-gold">Explore The Ecosystem</span>
        <div className="w-[1px] h-14 bg-luxury-gold/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 bg-luxury-gold"
          />
        </div>
      </motion.div>
    </section>
  );
}
