'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Users, TrendingUp, Shield } from 'lucide-react';

interface AboutData {
  _id?: string;
  _type?: string;
  heading?: string;
  content?: string;
  stats?: Array<{
    value: string;
    label: string;
    icon: string;
  }>;
}

interface AboutProps {
  data?: AboutData;
}

const About = ({ data }: AboutProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const iconMap: Record<string, any> = {
    award: Award,
    users: Users,
    trending: TrendingUp,
    shield: Shield,
  };

  const stats = data?.stats?.map(stat => ({
    icon: iconMap[stat.icon] || Award,
    value: stat.value,
    label: stat.label,
  })) || [
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: Users, value: '500+', label: 'Happy Customers' },
    { icon: TrendingUp, value: '95%', label: 'Energy Savings' },
    { icon: Shield, value: '100%', label: 'Satisfaction Rate' },
  ];

  return (
    <section id="about" ref={ref} className="py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
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
              className="text-[#8cc63f] font-semibold text-xs md:text-sm uppercase tracking-wider"
            >
              About Greenstar Solar
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 md:mt-4 mb-4 md:mb-6 tracking-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
              data-sanity={data?._id ? `${data._id}.heading` : undefined}
            >
              {data?.heading || 'Leading the Way in'}{' '}
              <span className="text-[#8cc63f]">Renewable Energy</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-lg text-white/80 mb-4 md:mb-6 leading-relaxed"
              data-sanity={data?._id ? `${data._id}.content` : undefined}
            >
              {data?.content || "At Greenstar Solar, we're committed to making solar energy accessible and affordable for everyone. With over 15 years of experience, we've helped hundreds of homes and businesses transition to clean, renewable energy."}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg text-white/80 mb-6 md:mb-8 leading-relaxed"
            >
              We take a highly personalised approach with face to face consultations and ongoing support. Our goal is to design and install solar energy systems that perfectly match your unique energy needs, maximise efficiency, and deliver exceptional savings while minimising environmental impact.
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
            className="grid grid-cols-2 gap-4 md:gap-6 max-w-full overflow-hidden"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl p-4 md:p-8 rounded-xl md:rounded-2xl border border-white/10 shadow-lg hover:shadow-[0_20px_60px_rgba(140,198,63,0.4)] hover:border-[#8cc63f]/50 transition-all w-full max-w-full overflow-hidden"
              >
                <div className="bg-[#8cc63f]/20 w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-4">
                  <stat.icon className="w-5 h-5 md:w-7 md:h-7 text-[#8cc63f]" />
                </div>
                <div className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">{stat.value}</div>
                <div className="text-white/70 font-medium text-xs md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
