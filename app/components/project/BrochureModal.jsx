'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { submitLead } from '@/app/services/leadService';

export default function BrochureModal({ isOpen, onClose, projectName }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success
  
  const brochureLink = '/assets/brochure-placeholder.pdf'; // Ideally a real PDF

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    let token = 'disabled';
    if (executeRecaptcha) {
      try {
        token = await executeRecaptcha('brochure_download');
      } catch (err) {
        console.warn('reCAPTCHA execution failed, proceeding with fallback:', err);
      }
    } else {
      console.warn('reCAPTCHA script blocked or not loaded, proceeding with fallback.');
    }

    try {
      const leadPayload = { 
        subject: `Brochure Download Request for ${projectName || 'VTP Blue Waters'}`,
        message: 'Requested to download the brochure.',
        project: projectName || 'VTP Blue Waters',
        source: 'Brochure Modal',
        recaptchaToken: token,
        ...formData, 
      };

      const result = await submitLead(leadPayload);
      if (result.success) {
        setStatus('success');
        // Auto-download the file
        const link = document.createElement('a');
        link.href = brochureLink;
        link.download = `${(projectName || 'VTP-Bluewaters').replace(/\s+/g, '-')}-Brochure.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setStatus('idle');
        alert('Something went wrong, please try again.');
      }
    } catch {
      setStatus('idle');
      alert('Network error, please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-luxury-navy/90 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-luxury-charcoal border border-luxury-gold/20 rounded-2xl p-8 md:p-12 max-w-md w-full relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="absolute top-0 right-0 w-40 h-40 bg-luxury-gold/5 blur-[50px] rounded-full pointer-events-none"></div>

            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 border-2 border-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6 bg-luxury-gold/10">
                  <span className="text-luxury-gold text-2xl">✓</span>
                </div>
                <h3 className="text-2xl font-display text-white mb-2">Brochure Unlocked</h3>
                <p className="text-luxury-silver text-sm">
                  Your download should begin automatically. 
                </p>
                <a href={brochureLink} download className="inline-block mt-6 text-luxury-gold text-sm underline hover:text-white transition-colors">
                  Click here if it didn't start
                </a>
              </div>
            ) : (
              <>
                <div className="text-center mb-8 relative z-10">
                  <div className="text-luxury-label text-luxury-gold mb-2">Exclusive Access</div>
                  <h3 className="text-2xl font-display font-light text-white">Download Brochure</h3>
                  <p className="text-luxury-silver text-sm font-light mt-2">
                    Enter your details to instantly access the official floor plans, master layout, and pricing guide.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Full Name *" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-luxury-gold focus:bg-white/10 transition-colors"
                    />
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      placeholder="Phone Number *" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-luxury-gold focus:bg-white/10 transition-colors"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Email Address *" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-luxury-gold focus:bg-white/10 transition-colors"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-luxury-gold text-luxury-navy font-bold tracking-widest uppercase text-xs py-4 rounded-lg hover:bg-white transition-colors duration-300 disabled:opacity-50 mt-4"
                  >
                    {status === 'loading' ? 'Verifying...' : 'Unlock & Download'}
                  </button>
                  
                  <p className="text-[10px] text-white/30 text-center mt-4">
                    By downloading, you consent to our privacy policy and receiving communications regarding this project.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
