'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { submitLead } from '@/app/services/leadService';

export default function StickyEnquiryWidget() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

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
      {/* Sticky Button Trigger */}
      <div 
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center justify-end"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-luxury-gold hover:bg-white text-luxury-navy font-display font-medium text-xs tracking-[0.3em] uppercase py-6 px-4 rounded-l-2xl shadow-[0_0_35px_rgba(212,175,55,0.35)] transition-all duration-300 flex items-center justify-center gap-3 [writing-mode:vertical-lr] rotate-180 h-48 select-none"
        >
          <span className="tracking-[0.2em] font-light">Enquire Now</span>
          <span className="text-sm font-bold">✉</span>
        </button>
      </div>

      {/* Modal / Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            {/* Click Outside to Close */}
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

            {/* Form Card */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-luxury-navy border border-white/10 w-full max-w-md p-8 md:p-10 rounded-2xl relative z-10 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors text-xl font-light"
              >
                ✕
              </button>

              <div className="mb-8">
                <div className="text-luxury-label text-luxury-gold mb-2">Connect With Us</div>
                <h3 className="text-2xl font-display font-light">Register <span className="italic text-luxury-silver">Interest</span></h3>
              </div>

              <form className="space-y-5" onSubmit={async (e) => {
                e.preventDefault();
                setStatus('loading');
                let token = 'disabled';
                if (executeRecaptcha) {
                  try {
                    token = await executeRecaptcha('sticky_enquiry');
                  } catch (err) {
                    console.warn('reCAPTCHA execution failed, proceeding with fallback:', err);
                  }
                } else {
                  console.warn('reCAPTCHA script blocked or not loaded, proceeding with fallback.');
                }

                const formData = new FormData(e.target);
                const data = {
                  name: formData.get('name'),
                  phone: formData.get('phone'),
                  email: formData.get('email'),
                  source: 'Sticky Enquiry Widget'
                };
                
                try {
                  const leadPayload = {
                    subject: `🚨 Sticky Widget Lead: ${data.name || 'Visitor'}`,
                    from_name: 'VTP Blue Waters Leads',
                    replyto: data.email,
                    recaptchaToken: token,
                    ...data
                  };

                  const result = await submitLead(leadPayload);
                  
                  if (result.success) {
                    setStatus('success');
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'generate_lead', {
                        currency: 'INR',
                        value: 10000000,
                        form_source: 'Sticky Widget'
                      });
                    }
                    setTimeout(() => {
                      setIsOpen(false);
                      setStatus('idle');
                    }, 2000);
                  } else {
                    setStatus('error');
                  }
                } catch (err) {
                  console.error(err);
                  setStatus('error');
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
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full bg-luxury-gold text-luxury-navy py-4 text-sm tracking-widest uppercase font-medium hover:bg-white transition-colors disabled:opacity-50"
                >
                  {status === 'loading' ? 'Processing...' : status === 'success' ? 'Thank You!' : (status !== 'idle' ? status : 'Submit Enquiry')}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
