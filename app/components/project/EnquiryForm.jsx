'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function EnquiryForm({ projectName, customTitle, inline = false }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    name: '', 
    email: '', 
    phone: '', 
    configuration: '', 
    project: projectName || '',
    location: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  // If projectName prop changes, update the state
  useEffect(() => {
    if (projectName) {
      setFormData(prev => ({ ...prev, project: projectName }));
    }
  }, [projectName]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    if (!executeRecaptcha) {
      console.warn('Execute recaptcha not yet available');
      setStatus('idle');
      return;
    }

    try {
      // Get reCAPTCHA token
      const token = await executeRecaptcha('enquiry_form');

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          subject: `🚨 New Lead: ${formData.name} — ${projectName || 'VTP Blue Waters'}`,
          from_name: 'VTP Blue Waters Leads',
          replyto: formData.email,
          ...formData,
          project: projectName || 'VTP Blue Waters',
          recaptchaToken: token
        })
      });
      
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'generate_lead', {
            currency: 'INR',
            value: 10000000,
            project_name: formData.project,
            form_source: 'Project Page - Main Enquiry Form'
          });
        }
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section className="py-16 lg:py-32 bg-[#050914] relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-frost p-16 md:p-24 text-center rounded-3xl border border-luxury-gold/20"
          >
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 mx-auto mb-8 border-2 border-luxury-gold rounded-full flex items-center justify-center bg-luxury-gold/10 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              <span className="text-luxury-gold text-3xl">✓</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-display font-light mb-4">Thank You</h2>
            <p className="text-luxury-silver font-light text-lg">
              A luxury consultant will contact you within 24 hours regarding your interest in {formData.project || 'our properties'}.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-32 bg-[#050914] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-frost p-8 md:p-16 relative overflow-hidden rounded-3xl border border-white/5 shadow-2xl backdrop-blur-xl"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#36C5CD]/5 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="text-center mb-16 relative z-10">
            <div className="inline-block px-4 py-1 border border-luxury-gold/30 rounded-full text-luxury-gold text-xs font-bold tracking-[0.2em] uppercase mb-6 bg-luxury-gold/5">
              Priority Access
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-light">
              Register <span className="italic text-luxury-silver">Interest</span>
            </h2>
            <p className="mt-4 text-luxury-silver font-light max-w-xl mx-auto">
              Share your preferences and our experts will curate a personalized portfolio of luxury residences matching your exact lifestyle requirements.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-8 max-w-3xl mx-auto">
            {/* Row 1: Name & Phone */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative group">
                <input 
                  type="text" 
                  name="name"
                  id="enquiry-name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-luxury-white focus:outline-none focus:border-luxury-gold focus:bg-white/10 transition-all peer" 
                  placeholder=" "
                />
                <label className="absolute left-5 top-4 text-white/40 text-sm font-light transition-all peer-focus:-translate-y-8 peer-focus:text-luxury-gold peer-focus:text-xs peer-focus:bg-[#0a0f1d] peer-focus:px-2 peer-focus:-ml-2 peer-valid:-translate-y-8 peer-valid:text-luxury-silver peer-valid:text-xs peer-valid:bg-[#0a0f1d] peer-valid:px-2 peer-valid:-ml-2 pointer-events-none rounded">
                  Full Name *
                </label>
              </div>
              
              <div className="relative group">
                <input 
                  type="tel"
                  name="phone"
                  id="enquiry-phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-luxury-white focus:outline-none focus:border-luxury-gold focus:bg-white/10 transition-all peer" 
                  placeholder=" "
                />
                <label className="absolute left-5 top-4 text-white/40 text-sm font-light transition-all peer-focus:-translate-y-8 peer-focus:text-luxury-gold peer-focus:text-xs peer-focus:bg-[#0a0f1d] peer-focus:px-2 peer-focus:-ml-2 peer-valid:-translate-y-8 peer-valid:text-luxury-silver peer-valid:text-xs peer-valid:bg-[#0a0f1d] peer-valid:px-2 peer-valid:-ml-2 pointer-events-none rounded">
                  Phone Number *
                </label>
              </div>
            </div>
            
            {/* Row 2: Email & Configuration */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative group">
                <input 
                  type="email"
                  name="email"
                  id="enquiry-email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-luxury-white focus:outline-none focus:border-luxury-gold focus:bg-white/10 transition-all peer" 
                  placeholder=" "
                />
                <label className="absolute left-5 top-4 text-white/40 text-sm font-light transition-all peer-focus:-translate-y-8 peer-focus:text-luxury-gold peer-focus:text-xs peer-focus:bg-[#0a0f1d] peer-focus:px-2 peer-focus:-ml-2 peer-valid:-translate-y-8 peer-valid:text-luxury-silver peer-valid:text-xs peer-valid:bg-[#0a0f1d] peer-valid:px-2 peer-valid:-ml-2 pointer-events-none rounded">
                  Email Address *
                </label>
              </div>

              <div className="relative group">
                <select 
                  name="configuration"
                  id="enquiry-config"
                  required
                  value={formData.configuration}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-luxury-white focus:outline-none focus:border-luxury-gold focus:bg-white/10 transition-all appearance-none cursor-pointer peer"
                >
                  <option value="" disabled className="bg-luxury-navy">Select Configuration *</option>
                  <option value="2 BHK" className="bg-luxury-navy text-white py-2">2 BHK Premium</option>
                  <option value="3 BHK" className="bg-luxury-navy text-white py-2">3 BHK Luxury</option>
                  <option value="4 BHK" className="bg-luxury-navy text-white py-2">4 BHK Mansion</option>
                  <option value="Villa" className="bg-luxury-navy text-white py-2">Villa Estate</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-luxury-gold">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Row 3: Project & Location */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative group">
                <select 
                  name="project"
                  id="enquiry-project"
                  required
                  value={formData.project}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-luxury-white focus:outline-none focus:border-luxury-gold focus:bg-white/10 transition-all appearance-none cursor-pointer peer"
                >
                  <option value="" disabled className="bg-luxury-navy">Select Project *</option>
                  <option value="VTP Blue Waters Township" className="bg-luxury-navy text-white py-2">VTP Blue Waters Township</option>
                  <option value="Altamira" className="bg-luxury-navy text-white py-2">Altamira by VTP Luxe</option>
                  <option value="Monarque" className="bg-luxury-navy text-white py-2">Monarque by VTP Luxe</option>
                  <option value="Earth 1" className="bg-luxury-navy text-white py-2">Earth 1 by VTP Luxe</option>
                  <option value="Other" className="bg-luxury-navy text-white py-2">Other / Not Sure Yet</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-luxury-gold">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="relative group">
                <select 
                  name="location"
                  id="enquiry-location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-luxury-white focus:outline-none focus:border-luxury-gold focus:bg-white/10 transition-all appearance-none cursor-pointer peer"
                >
                  <option value="" disabled className="bg-luxury-navy">Select Preferred Location *</option>
                  <option value="Mahalunge" className="bg-luxury-navy text-white py-2">Mahalunge</option>
                  <option value="Baner" className="bg-luxury-navy text-white py-2">Baner / Baner Annex</option>
                  <option value="Hinjawadi" className="bg-luxury-navy text-white py-2">Hinjawadi</option>
                  <option value="Kharadi" className="bg-luxury-navy text-white py-2">Kharadi</option>
                  <option value="Any" className="bg-luxury-navy text-white py-2">Any Prime Location</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-luxury-gold">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Row 4: Message */}
            <div className="relative group">
              <textarea 
                name="message"
                id="enquiry-message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-luxury-white focus:outline-none focus:border-luxury-gold focus:bg-white/10 transition-all resize-none peer placeholder-transparent" 
                placeholder=" "
              />
              <label className="absolute left-5 top-4 text-white/40 text-sm font-light transition-all peer-focus:-translate-y-8 peer-focus:text-luxury-gold peer-focus:text-xs peer-focus:bg-[#0a0f1d] peer-focus:px-2 peer-focus:-ml-2 peer-valid:-translate-y-8 peer-valid:text-luxury-silver peer-valid:text-xs peer-valid:bg-[#0a0f1d] peer-valid:px-2 peer-valid:-ml-2 pointer-events-none rounded">
                Additional Requirements (Optional)
              </label>
            </div>

            <div className="pt-6 text-center">
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="relative overflow-hidden group bg-luxury-gold text-luxury-navy px-16 py-5 rounded-full font-bold tracking-[0.2em] uppercase text-sm hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-500 w-full md:w-auto disabled:opacity-50"
              >
                <span className="relative z-10">{status === 'loading' ? 'Processing Request...' : 'Schedule Private Viewing'}</span>
                <div className="absolute inset-0 bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
              </button>
            </div>
            
            {status === 'error' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm text-center mt-4">
                We encountered an issue submitting your request. Please try again.
              </motion.p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-widest font-medium">
                <span className="w-2 h-2 rounded-full bg-[#25D366] shadow-[0_0_10px_#25D366]"></span>
                WhatsApp Updates
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-widest font-medium">
                <span className="w-2 h-2 rounded-full bg-luxury-gold shadow-[0_0_10px_#D4AF37]"></span>
                MahaRERA Approved
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-widest font-medium">
                <svg className="w-4 h-4 text-luxury-silver" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                256-Bit Encrypted
              </div>
            </div>

            <p className="text-[10px] text-center text-white/30 mt-6 tracking-wide">
              By submitting this form, you agree to our Privacy Policy and consent to being contacted by our authorized luxury consultants.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
