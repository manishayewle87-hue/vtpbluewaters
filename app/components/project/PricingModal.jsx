'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { submitLead } from '@/app/services/leadService';

export default function PricingModal({ isOpen, onClose, planType, projectName }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formState, setFormState] = useState({ name: '', phone: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    let token = 'disabled';
    if (executeRecaptcha) {
      try {
        token = await executeRecaptcha('pricing_modal');
      } catch (err) {
        console.warn('reCAPTCHA execution failed, proceeding with fallback:', err);
      }
    } else {
      console.warn('reCAPTCHA script blocked or not loaded, proceeding with fallback.');
    }
    
    try {
      const leadPayload = {
        subject: `Pricing request for ${planType} at ${projectName}`,
        ...formState,
        project: projectName,
        configuration: planType,
        message: `Pricing request for ${planType}`,
        recaptchaToken: token,
      };

      const result = await submitLead(leadPayload);
      if (result.success) {
        setStatus('success');
        setTimeout(() => { onClose(); setStatus('idle'); setFormState({ name: '', phone: '' }); }, 3000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="glass-frost w-full max-w-md p-10 pointer-events-auto relative">
              {/* Close button */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-luxury-silver hover:text-luxury-white transition-colors text-xl"
              >
                ✕
              </button>

              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="text-5xl mb-6">✓</div>
                  <h3 className="text-2xl font-display font-light mb-3">Thank You</h3>
                  <p className="text-luxury-silver text-sm">A luxury consultant will share pricing details shortly.</p>
                </motion.div>
              ) : (
                <>
                  <div className="text-center mb-10">
                    <div className="text-luxury-label text-luxury-gold mb-3">Request Pricing</div>
                    <h3 className="text-2xl font-display font-light mb-2">{planType}</h3>
                    <p className="text-luxury-silver text-sm">{projectName}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-luxury-label text-luxury-silver block">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                        className="w-full bg-transparent border-b border-white/20 pb-3 text-luxury-white placeholder:text-white/15 text-sm"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-luxury-label text-luxury-silver block">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState(s => ({ ...s, phone: e.target.value }))}
                        className="w-full bg-transparent border-b border-white/20 pb-3 text-luxury-white placeholder:text-white/15 text-sm"
                        placeholder="+91"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-luxury-gold text-luxury-navy py-4 text-luxury-label hover:bg-luxury-white transition-colors duration-500 disabled:opacity-50"
                    >
                      {status === 'loading' ? 'Submitting...' : 'Get Exclusive Pricing'}
                    </button>

                    {status === 'error' && (
                      <p className="text-red-400 text-xs text-center">Something went wrong. Please try again.</p>
                    )}
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
