'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StickyEnquiryWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Pre-load enquiry form on website loading and handle external triggers
  useEffect(() => {
    // Open after a short delay on initial load
    const timer = setTimeout(() => {
      if (sessionStorage.getItem('enquiry_auto_opened') !== 'true') {
        setIsOpen(true);
        sessionStorage.setItem('enquiry_auto_opened', 'true');
      }
    }, 2000);

    // Listen for clicks on any element with the 'enquiry-trigger' class
    const handleGlobalClick = (e) => {
      const trigger = e.target.closest('.enquiry-trigger');
      if (trigger) {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    
    document.addEventListener('click', handleGlobalClick);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 hidden md:flex items-center gap-3 bg-luxury-gold text-luxury-navy px-6 py-4 rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:shadow-[0_10px_40px_rgba(212,175,55,0.4)] transition-shadow duration-300 group overflow-hidden enquiry-trigger"
      >
        <span className="relative z-10 font-bold tracking-widest uppercase text-xs">ENQUIRE NOW</span>
        <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
        <motion.div 
          className="absolute inset-0 bg-white"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '0%' : '-100%' }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </motion.button>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-luxury-navy/80 backdrop-blur-md cursor-pointer"
              onClick={() => setIsOpen(false)}
            />

            {/* Form Container */}
            <motion.div
              layoutId="enquiry-widget"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-luxury-charcoal border border-luxury-gold/20 p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto hide-scrollbar"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-luxury-silver hover:text-white p-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="mb-8">
                <div className="text-luxury-label text-luxury-gold mb-2">Connect With Us</div>
                <h3 className="text-2xl font-display font-light">Register <span className="italic text-luxury-silver">Interest</span></h3>
              </div>

              <form className="space-y-5" onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = {
                  name: formData.get('name'),
                  phone: formData.get('phone'),
                  email: formData.get('email'),
                  source: 'Sticky Enquiry Widget'
                };
                
                try {
                  await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                      access_key: '01d09588-d933-46ef-b70a-120c6aa71e5a',
                      subject: `🚨 Sticky Widget Lead: ${data.name || 'Visitor'}`,
                      from_name: 'VTP Bluewaters Leads',
                      ...data
                    }),
                  });
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'generate_lead', {
                      currency: 'INR',
                      value: 10000000,
                      form_source: 'Sticky Widget'
                    });
                  }
                  setIsOpen(false);
                } catch (err) {
                  console.error(err);
                }
              }}>
                <div>
                  <input type="text" name="name" placeholder="Full Name" required
                    className="w-full bg-white/5 border-b border-white/10 px-4 py-3 text-white focus:outline-none focus:border-luxury-gold transition-colors font-light text-sm"
                  />
                </div>
                <div>
                  <input type="tel" name="phone" placeholder="Phone Number" required
                    className="w-full bg-white/5 border-b border-white/10 px-4 py-3 text-white focus:outline-none focus:border-luxury-gold transition-colors font-light text-sm"
                  />
                </div>
                <div>
                  <input type="email" name="email" placeholder="Email Address" required
                    className="w-full bg-white/5 border-b border-white/10 px-4 py-3 text-white focus:outline-none focus:border-luxury-gold transition-colors font-light text-sm"
                  />
                </div>
                <button type="submit" className="w-full bg-luxury-gold text-luxury-navy py-4 text-sm tracking-widest uppercase font-medium hover:bg-white transition-colors">
                  Submit Enquiry
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
