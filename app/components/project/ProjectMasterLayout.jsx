'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import LightboxGallery from '../ui/LightboxGallery';

export default function ProjectMasterLayout({ masterLayout }) {
  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const imageSrc = masterLayout || '/assets/projects/earth-1/master-plan.jpg';

  return (
    <section id="master-layout" className="py-12 lg:py-24 bg-luxury-charcoal border-b border-luxury-gold/10">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="text-luxury-label text-luxury-gold mb-4">Zoning & Planning</div>
          <h2 className="text-display-sm md:text-display-md font-display font-light">Master <span className="italic text-luxury-silver">Layout</span></h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-luxury-navy border border-white/5 group cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        >
          <Image 
            src={imageSrc} 
            alt="Master Layout"
            fill
            sizes="100vw"
            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-luxury-navy/20 pointer-events-none group-hover:bg-transparent transition-all duration-500"></div>
          
          <div className="absolute bottom-6 right-6 flex gap-4 z-10">
             <button 
                onClick={(e) => { e.stopPropagation(); setLightboxOpen(true); }}
                className="glass-frost px-6 py-2 text-luxury-caption text-luxury-gold hover:bg-luxury-gold hover:text-luxury-navy transition-colors"
             >
               Enlarge Map
             </button>
             <button 
                onClick={(e) => e.stopPropagation()} // Prevent lightbox if they somehow added download logic
                className="glass-frost px-6 py-2 text-luxury-caption text-luxury-white hover:bg-white hover:text-luxury-navy transition-colors"
             >
               Download PDF
             </button>
          </div>
        </motion.div>
      </div>

      <LightboxGallery 
        images={[{ src: imageSrc, alt: 'Master Layout' }]} 
        isOpen={isLightboxOpen} 
        onClose={() => setLightboxOpen(false)} 
      />
    </section>
  );
}
