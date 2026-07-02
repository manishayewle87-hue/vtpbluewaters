'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const deliveredClusters = [
  {
    name: 'VTP Leonara',
    description: 'The first masterpiece delivered in VTP Bluewaters, setting the tone for luxury.',
    image: '/images/real_vtp/leonara_banner.jpg',
    status: 'Delivered & Sold Out'
  },
  {
    name: 'VTP Bel Air',
    description: 'A towering success of architectural brilliance and community living.',
    image: '/images/real_vtp/bel_air_banner.jpg',
    status: 'Delivered'
  },
  {
    name: 'VTP Alpine',
    description: 'Elevated lifestyle with premium finishes and panoramic views.',
    image: '/images/real_vtp/alpine_banner.jpg',
    status: 'Delivered & Sold Out'
  }
];

export default function TownshipLegacy() {
  return (
    <section className="py-24 lg:py-40 bg-luxury-navy text-white relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20 max-w-4xl mx-auto"
        >
          <p className="text-luxury-label text-luxury-gold mb-6">A Legacy of Trust</p>
          <h2 className="text-display-md md:text-display-lg font-display font-light uppercase tracking-tighter leading-[0.9] mb-8">
            Delivering on the <br />
            <span className="text-luxury-gold font-normal">Promise</span>
          </h2>
          <p className="text-luxury-silver text-lg font-light leading-relaxed">
            VTP Bluewaters isn't just a vision; it's a thriving reality. Thousands of families already call our delivered clusters home, experiencing the extraordinary lifestyle we promised.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {deliveredClusters.map((cluster, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden"
            >
              <Image
                src={cluster.image}
                alt={cluster.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
                // Using a fallback for images that might 404
                onError={(e) => {
                  e.currentTarget.src = '/images/township_hero_bg.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy via-luxury-navy/40 to-transparent"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="text-luxury-gold text-xs font-mono tracking-widest uppercase mb-3">
                  {cluster.status}
                </span>
                <h3 className="text-3xl font-display font-normal text-white mb-3">
                  {cluster.name}
                </h3>
                <p className="text-luxury-silver text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {cluster.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
