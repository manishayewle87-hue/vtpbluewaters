'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExitIntentModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const handleMouseLeave = (e) => {
      // If cursor leaves the top of the window (intent to close/change tab)
      if (e.clientY <= 0 && !hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true);
        // Optional: Set cookie/localStorage to not annoy returning users
        sessionStorage.setItem('exit_intent_triggered', 'true');
      }
    };

    // Check if already triggered in this session
    if (sessionStorage.getItem('exit_intent_triggered') !== 'true') {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasTriggered]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: '01d09588-d933-46ef-b70a-120c6aa71e5a',
          subject: `🚨 Exit Intent Lead: ${data.name || 'Visitor'}`,
          from_name: 'VTP Bluewaters Leads',
          ...data,
          source: 'Exit Intent Modal'
        }),
      });
      setStatus('success');
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'generate_lead', {
          currency: 'INR',
          value: 10000000,
          form_source: 'Exit Intent Modal'
        });
      }
      setTimeout(() => setIsVisible(false), 3000);
    } catch {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisible(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-luxury-navy border border-luxury-gold/30 p-8 md:p-12 shadow-2xl overflow-hidden"
          >
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-gold/5 blur-[100px] rounded-full pointer-events-none"></div>
            
            <button 
              onClick={() => setIsVisible(false)}
              aria-label="Close modal"
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors text-2xl font-light"
            >
              ×
            </button>

            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-6 border border-luxury-gold rounded-full flex items-center justify-center">
                  <span className="text-luxury-gold text-2xl">✓</span>
                </div>
                <h3 className="text-3xl font-display font-light mb-2">Brochure Sent</h3>
                <p className="text-luxury-silver">Check your email and WhatsApp.</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="text-luxury-label text-luxury-gold mb-3">Wait Before You Go!</div>
                  <h3 className="text-3xl font-display font-light text-white mb-3">
                    Unlock Exclusive <span className="italic text-[#36C5CD]">Pre-Launch</span> Pricing
                  </h3>
                  <p className="text-luxury-silver font-light text-sm">
                    Enter your details to instantly download the master brochure, floor plans, and highly confidential pricing inventory.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <input 
                    type="text" 
                    name="name"
                    required
                    className="w-full bg-white/5 border border-white/10 px-5 py-4 text-white focus:outline-none focus:border-luxury-gold transition-colors placeholder:text-white/30 text-sm font-light" 
                    placeholder="Full Name"
                  />
                  <div className="flex gap-4">
                    <input 
                      type="tel"
                      name="phone" 
                      required
                      className="w-full bg-white/5 border border-white/10 px-5 py-4 text-white focus:outline-none focus:border-luxury-gold transition-colors placeholder:text-white/30 text-sm font-light" 
                      placeholder="Phone Number (+91)"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-luxury-gold text-luxury-navy px-8 py-4 text-luxury-label hover:bg-white transition-colors disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Processing...' : 'Download Master Brochure'}
                  </button>

                  <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-white/30 uppercase tracking-widest">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    256-Bit Secure & 100% Spam Free
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
