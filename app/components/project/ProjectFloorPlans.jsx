'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import PricingModal from './PricingModal';

export default function ProjectFloorPlans({ floorPlans, projectName }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const openModal = (planType) => {
    setSelectedPlan(planType);
    setModalOpen(true);
  };

  return (
    <>
      <section id="floor-plans" className="py-24 bg-luxury-navy border-b border-luxury-gold/10">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-luxury-gold/20 pb-8"
          >
            <div>
              <div className="text-luxury-label text-luxury-gold mb-4">Intelligent Design</div>
              <h2 className="text-display-sm font-display font-light">Floor <span className="italic text-luxury-silver">Plans</span></h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {floorPlans?.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-luxury-charcoal border border-white/5 overflow-hidden group hover:border-luxury-gold/40 transition-colors duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden relative bg-black/50">
                  <img 
                    src={plan.image} 
                    alt={plan.type} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal"
                  />
                </div>
                <div className="p-8 text-center border-t border-white/5 relative">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h3 className="text-xl font-display font-light text-luxury-white mb-2">{plan.type}</h3>
                  <p className="text-luxury-label text-luxury-gold">{plan.carpetArea}</p>
                  <button 
                    onClick={() => openModal(plan.type)}
                    className="mt-6 w-full border border-luxury-gold/30 text-luxury-label py-3 text-luxury-silver hover:bg-luxury-gold hover:text-luxury-navy transition-colors duration-300"
                  >
                    Request Pricing
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
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
