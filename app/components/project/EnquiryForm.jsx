'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function EnquiryForm({ projectName }) {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', configuration: '', message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // Mock API call since backend is removed for Static Export
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'generate_lead', {
          currency: 'INR',
          value: 10000000,
          project_name: projectName,
          form_source: 'Project Page - Main Enquiry Form'
        });
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section className="py-32 bg-[#050914] relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-frost p-16 md:p-24 text-center"
          >
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 mx-auto mb-8 border-2 border-luxury-gold rounded-full flex items-center justify-center"
            >
              <span className="text-luxury-gold text-3xl">✓</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-display font-light mb-4">Thank You</h2>
            <p className="text-luxury-silver font-light text-lg">
              A luxury consultant will contact you within 24 hours regarding {projectName}.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 bg-[#050914] relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-frost p-10 md:p-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-gold/5 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#36C5CD]/5 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="text-center mb-12 relative z-10">
            <div className="text-luxury-label text-luxury-gold mb-4">Register Interest</div>
            <h2 className="text-display-sm font-display font-light">
              Experience <span className="italic text-luxury-white">{projectName}</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-luxury-label text-luxury-silver block">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  id="enquiry-name"
                  aria-label="Full Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/15 pb-3 text-luxury-white focus:outline-none focus:border-luxury-gold transition-colors placeholder:text-white/10 text-sm font-light" 
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-luxury-label text-luxury-silver block">Email Address</label>
                <input 
                  type="email"
                  name="email"
                  id="enquiry-email"
                  aria-label="Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/15 pb-3 text-luxury-white focus:outline-none focus:border-luxury-gold transition-colors placeholder:text-white/10 text-sm font-light" 
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-luxury-label text-luxury-silver block">Phone Number</label>
                <input 
                  type="tel"
                  name="phone"
                  id="enquiry-phone"
                  aria-label="Phone Number"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/15 pb-3 text-luxury-white focus:outline-none focus:border-luxury-gold transition-colors placeholder:text-white/10 text-sm font-light" 
                  placeholder="+91"
                />
              </div>
              <div className="space-y-2">
                <label className="text-luxury-label text-luxury-silver block">Configuration</label>
                <select 
                  name="configuration"
                  id="enquiry-config"
                  aria-label="Select Configuration"
                  value={formData.configuration}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/15 pb-3 text-luxury-white focus:outline-none focus:border-luxury-gold transition-colors text-sm font-light appearance-none cursor-pointer"
                >
                  <option value="" className="bg-luxury-navy">Select Configuration</option>
                  <option value="2 BHK" className="bg-luxury-navy">2 BHK Luxe</option>
                  <option value="3 BHK" className="bg-luxury-navy">3 BHK Premium</option>
                  <option value="4 BHK" className="bg-luxury-navy">4 BHK Mansion</option>
                  <option value="Villa" className="bg-luxury-navy">Villa</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-luxury-label text-luxury-silver block">Message (Optional)</label>
              <textarea 
                name="message"
                id="enquiry-message"
                aria-label="Message"
                rows="2"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/15 pb-3 text-luxury-white focus:outline-none focus:border-luxury-gold transition-colors placeholder:text-white/10 text-sm font-light resize-none" 
                placeholder="Any specific requirements?"
              />
            </div>

            <div className="pt-8 text-center">
              <button 
                type="submit"
                aria-label="Submit Enquiry Form"
                disabled={status === 'loading'}
                className="relative overflow-hidden group bg-luxury-gold text-luxury-navy px-14 py-5 text-luxury-label hover:bg-luxury-white transition-colors duration-500 w-full md:w-auto disabled:opacity-50"
              >
                {status === 'loading' ? 'Submitting...' : 'Request Callback'}
              </button>
            </div>
            
            {status === 'error' && (
              <p className="text-red-400 text-xs text-center mt-4">Something went wrong. Please try again.</p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-6 border-t border-white/5">
              <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
                WhatsApp Updates
              </div>
              <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-luxury-gold"></span>
                MahaRERA Approved
              </div>
              <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                256-Bit Encrypted
              </div>
            </div>

            <p className="text-luxury-caption text-center text-white/30 mt-6">
              By submitting this form, you agree to our Privacy Policy and consent to being contacted regarding luxury real estate offerings.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
