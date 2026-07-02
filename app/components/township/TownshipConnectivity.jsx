'use client';
import { motion } from 'framer-motion';

const connections = [
  { location: 'Hinjawadi Phase 1', time: '2 Mins', desc: 'Direct access via the new Mahalunge-Hinjawadi bridge.' },
  { location: 'Baner', time: '5 Mins', desc: 'Seamlessly connected to West Pune\'s premier lifestyle hub.' },
  { location: 'Mumbai-Bengaluru Highway', time: '10 Mins', desc: 'Instant access to the major national highway.' },
  { location: 'Upcoming Metro Station', time: '7 Mins', desc: 'Future-ready connectivity for rapid transit.' }
];

export default function TownshipConnectivity() {
  return (
    <section className="py-24 lg:py-40 bg-black text-white relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/3"
          >
            <p className="text-luxury-label text-luxury-gold mb-6">Strategic Location</p>
            <h2 className="text-display-md md:text-display-lg font-display font-light uppercase tracking-tighter leading-[0.9] mb-8">
              Hyper<br />
              <span className="text-luxury-gold font-normal">Connected</span>
            </h2>
            <p className="text-luxury-silver text-lg font-light leading-relaxed">
              Nestled at the critical junction of Baner (residential capital) and Hinjawadi (IT capital). The new bridge transforms Mahalunge into the most strategically positioned township in Pune.
            </p>
          </motion.div>

          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {connections.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="glass p-8 md:p-10 rounded-xl hover:border-luxury-gold/30 transition-colors duration-500 group"
              >
                <div className="flex justify-between items-end mb-6">
                  <h3 className="text-2xl md:text-3xl font-display font-normal text-white group-hover:text-luxury-gold transition-colors duration-300">
                    {item.location}
                  </h3>
                  <span className="text-luxury-gold font-mono text-xl md:text-2xl">{item.time}</span>
                </div>
                <p className="text-luxury-silver font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
