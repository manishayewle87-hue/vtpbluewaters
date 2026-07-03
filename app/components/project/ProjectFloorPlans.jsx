'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import PricingModal from './PricingModal';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 80, damping: 20 }
  }
};

const imageRevealVariants = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  show: { 
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 1, ease: [0.77, 0, 0.175, 1] } // Quintic ease for fluid masking
  }
};

export default function ProjectFloorPlans({ floorPlans, projectName }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  const openModal = (planType) => {
    setSelectedPlan(planType);
    setModalOpen(true);
  };

  return (
    <>
      <section id="floor-plans" className="py-16 lg:py-24 bg-luxury-navy border-b border-luxury-gold/10 relative overflow-hidden">
        {/* Subtle background texture/glow */}
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-luxury-gold/[0.015] rounded-full blur-[150px] pointer-events-none"></div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-luxury-gold/20 pb-8"
          >
            <div>
              <div className="text-luxury-label text-luxury-gold mb-4 tracking-[0.3em]">Intelligent Design</div>
              <h2 className="text-display-sm font-display font-light">Floor <span className="italic text-luxury-silver">Plans</span></h2>
            </div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-5%" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {floorPlans?.map((plan, idx) => {
              const isHovered = hoveredCard === idx;
              
              return (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="bg-luxury-charcoal border border-white/5 overflow-hidden group cursor-pointer relative"
                  onClick={() => openModal(plan.type)}
                >
                  {/* Fluid Border Glow */}
                  <motion.div 
                    className="absolute inset-0 border border-luxury-gold/40 pointer-events-none z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  />

                  <motion.div variants={imageRevealVariants} className="aspect-[4/3] overflow-hidden relative bg-luxury-navy">
                    <motion.div
                      animate={{ 
                        scale: isHovered ? 1.08 : 1,
                        filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)'
                      }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="w-full h-full relative"
                    >
                      <Image 
                        src={plan.image || '/assets/projects/earth-1/floor-plan-3bhk.jpg'} 
                        alt={plan.type}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
                      />
                    </motion.div>
                    
                    {/* Overlay Gradient for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal via-transparent to-transparent opacity-80"></div>
                  </motion.div>

                  <div className="p-8 text-center border-t border-white/5 relative z-10 bg-luxury-charcoal overflow-hidden">
                    <motion.div 
                      className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-luxury-gold to-transparent"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    
                    <motion.h3 
                      className="text-xl font-display font-light text-luxury-white mb-2"
                      animate={{ y: isHovered ? -2 : 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {plan.type}
                    </motion.h3>
                    <motion.p 
                      className="text-luxury-label text-luxury-gold"
                      animate={{ y: isHovered ? -2 : 0 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.05 }}
                    >
                      {plan.carpetArea}
                    </motion.p>
                    
                    <motion.button 
                      className="mt-6 w-full border border-luxury-gold/30 text-luxury-label py-3 relative overflow-hidden group/btn"
                    >
                      <span className="relative z-10 transition-colors duration-300 text-luxury-silver group-hover/btn:text-luxury-navy">
                        Request Pricing
                      </span>
                      <motion.div 
                        className="absolute inset-0 bg-luxury-gold origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <PricingModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        planType={selectedPlan}
        projectName={projectName || 'VTP BLUEWATERS'}
      />
    </>
  );
}
