'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const features = [
  {
    title: 'VTP High Street',
    description: 'A 4+ acre commercial paradise designed to rival the best high streets globally. Premium boutiques, fine dining, and vibrant nightlife right at your doorstep.',
    align: 'left'
  },
  {
    title: 'The Riverfront Promenade',
    description: 'Over 1 kilometer of beautifully landscaped promenade along the Mula-Mutha river. A serene escape for morning jogs or evening strolls under golden hour skies.',
    align: 'right'
  },
  {
    title: 'Smart City Infrastructure',
    description: 'Built with the future in mind. 100% DG backup, multi-tier security systems, intelligent traffic management, and sustainable eco-friendly practices woven into the masterplan.',
    align: 'left'
  }
];

export default function MasterplanDeepDive() {
  return (
    <section className="py-12 lg:py-24 lg:py-20 lg:py-40 bg-black text-white relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mb-12 lg:mb-24"
        >
          <p className="text-luxury-label text-luxury-gold mb-6">The Masterplan</p>
          <h2 className="text-4xl sm:text-5xl md:text-display-lg lg:text-display-xl font-display font-light uppercase tracking-tighter leading-[0.9]">
            A meticulously designed <br />
            <span className="text-luxury-gold font-normal">ecosystem</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 lg:gap-12 lg:gap-24 items-center">
          {/* Image Left */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 relative h-[50vh] lg:h-[80vh] rounded-2xl overflow-hidden"
          >
            <Image
              src="/images/real_vtp/monarque_hero.webp"
              alt="VTP High Street and Promenade"
              fill
              className="object-cover hover:scale-105 transition-transform duration-[2s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </motion.div>

          {/* Features Right */}
          <div className="w-full lg:w-1/2 flex flex-col gap-12 lg:gap-10 lg:gap-20">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="group cursor-default"
              >
                <h3 className="text-3xl md:text-4xl font-display font-normal text-luxury-gold mb-4 group-hover:text-white transition-colors duration-500">
                  {feature.title}
                </h3>
                <p className="text-base md:text-lg text-luxury-silver leading-relaxed font-light">
                  {feature.description}
                </p>
                <div className="w-0 h-px bg-luxury-gold mt-6 group-hover:w-full transition-all duration-700 ease-[0.16,1,0.3,1]"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
