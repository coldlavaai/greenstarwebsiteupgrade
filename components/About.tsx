'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Users, TrendingUp, Shield } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: Users, value: '500+', label: 'Happy Customers' },
    { icon: TrendingUp, value: '95%', label: 'Energy Savings' },
    { icon: Shield, value: '100%', label: 'Satisfaction Rate' },
  ];

  return (
    <section id="about" ref={ref} className="py-24 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
              className="text-[#8cc63f] font-semibold text-sm uppercase tracking-wider"
            >
              About Greenstar Solar
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6"
            >
              Leading the Way in{' '}
              <span className="text-[#8cc63f]">Renewable Energy</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/80 mb-6 leading-relaxed"
            >
              At Greenstar Solar, we&apos;re committed to making solar energy accessible and affordable for everyone. With over 15 years of experience, we&apos;ve helped hundreds of homes and businesses transition to clean, renewable energy.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-white/80 mb-8 leading-relaxed"
            >
              Our goal is to design and install solar energy systems that perfectly match your unique energy needs, maximize efficiency, and deliver exceptional savings while minimizing environmental impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              {[
                'Certified and experienced installers',
                'Premium quality solar panels and equipment',
                'Comprehensive warranty and support',
                'Tailored solutions for your energy goals',
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-[#8cc63f] rounded-full"></div>
                  <span className="text-white/80">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-lg hover:shadow-[0_20px_60px_rgba(140,198,63,0.4)] hover:border-[#8cc63f]/50 transition-all"
              >
                <div className="bg-[#8cc63f]/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  <stat.icon className="w-7 h-7 text-[#8cc63f]" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/70 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
