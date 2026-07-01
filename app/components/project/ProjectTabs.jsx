'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'master-layout', label: 'Master Layout' },
  { id: 'floor-plans', label: 'Floor Plans' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'location', label: 'Location' },
  { id: 'enquiry', label: 'Enquiry' }
];

export default function ProjectTabs() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if tabs are sticking (offset by navbar height approx 80px)
      setIsSticky(window.scrollY > window.innerHeight * 0.6);

      // Simple intersection logic based on scroll position
      const sections = TABS.map(tab => document.getElementById(tab.id));
      
      let current = '';
      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
          }
        }
      });
      
      if (current) {
        setActiveTab(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for navbar + tabs height
      const y = element.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className={`w-full z-40 transition-all duration-300 border-b border-white/10 ${isSticky ? 'fixed top-[70px] lg:top-[88px] bg-luxury-navy/95 backdrop-blur-xl shadow-xl shadow-black/50' : 'relative bg-luxury-charcoal'}`}>
      <div className="container mx-auto px-0 md:px-6 max-w-7xl relative">
        
        {/* Mobile Fade Gradients for swipe affordance */}
        <div className="md:hidden absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-luxury-navy to-transparent z-10 pointer-events-none"></div>
        <div className="md:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-luxury-navy to-transparent z-10 pointer-events-none"></div>
        
        <ul className="flex overflow-x-auto hide-scrollbar gap-8 lg:gap-12 py-4 px-6 md:px-0 relative z-0 scroll-smooth">
          {TABS.map((tab) => (
            <li key={tab.id} className="whitespace-nowrap flex-shrink-0">
              <button 
                onClick={() => scrollTo(tab.id)}
                className={`text-[10px] tracking-[0.2em] uppercase transition-all duration-300 relative py-2 ${activeTab === tab.id ? 'text-luxury-gold font-bold' : 'text-luxury-silver hover:text-luxury-white'}`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-luxury-gold"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
