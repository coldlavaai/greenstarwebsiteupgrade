'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, Lightbulb, Wrench, HeartHandshake } from 'lucide-react';

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Survey & Consultation',
      description: 'We start with a face-to-face consultation to understand your energy needs and goals, followed by a thorough site assessment to optimize system design.',
      features: ['Free home visit', 'Energy audit', 'Site analysis', 'Custom recommendations'],
    },
    {
      number: '02',
      icon: Lightbulb,
      title: 'Design & Quotation',
      description: 'Our expert designers create a tailored solar solution focused on maximizing efficiency and savings while minimizing cost.',
      features: ['3D system design', 'ROI calculation', 'Transparent pricing', 'Financing options'],
    },
    {
      number: '03',
      icon: Wrench,
      title: 'Installation',
      description: 'Our certified installers expertly fit your solar system with minimal disruption, using premium equipment and following best practices.',
      features: ['Professional team', 'Quality equipment', 'Fast installation', 'Clean workspace'],
    },
    {
      number: '04',
      icon: HeartHandshake,
      title: 'Aftercare & Support',
      description: 'We provide ongoing support, system monitoring, and maintenance to ensure your solar system performs optimally for years to come.',
      features: ['25-year warranty', 'System monitoring', 'Regular maintenance', '24/7 support'],
    },
  ];

  return (
    <section id="process" ref={ref} className="py-24 bg-transparent relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-[#8cc63f] font-semibold text-sm uppercase tracking-wider">
            Our Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            From Consultation to <span className="text-[#8cc63f]">Installation</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Our streamlined 4-step process ensures a smooth transition to solar energy
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#8cc63f] via-[#8cc63f]/50 to-[#8cc63f]/20"></div>

          {/* Steps */}
          <div className="space-y-20">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className="flex-1 w-full">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`bg-white/5 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-[0_20px_60px_rgba(140,198,63,0.4)] transition-all border border-white/10 hover:border-[#8cc63f]/50 ${
                      index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'
                    }`}
                  >
                    {/* Number Badge */}
                    <div className="flex items-start gap-6 mb-6">
                      <div className="bg-[#8cc63f] text-white text-2xl font-bold w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0">
                        {step.number}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                          {step.title}
                        </h3>
                        <p className="text-white/70 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      {step.features.map((feature, idx) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ delay: index * 0.2 + idx * 0.1 }}
                          className="flex items-center space-x-2 text-sm text-white bg-white/10 px-3 py-2 rounded-lg"
                        >
                          <div className="w-1.5 h-1.5 bg-[#8cc63f] rounded-full"></div>
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Center Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ delay: index * 0.2 + 0.3, duration: 0.5, type: 'spring' }}
                  className="relative flex-shrink-0 z-20"
                >
                  <div className="w-20 h-20 bg-white border-4 border-[#8cc63f] rounded-2xl flex items-center justify-center shadow-lg">
                    <step.icon className="w-10 h-10 text-[#8cc63f]" />
                  </div>
                  {/* Pulse Effect */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                    className="absolute inset-0 bg-[#8cc63f] rounded-2xl"
                  ></motion.div>
                </motion.div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden lg:block"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1 }}
          className="text-center mt-20"
        >
          <p className="text-white/70 mb-6 text-lg">
            Ready to start your solar journey?
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="inline-block bg-gradient-to-r from-[#8cc63f] to-[#7ab52f] text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all"
          >
            Book Your Free Survey
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
