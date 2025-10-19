'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, Lightbulb, Wrench, HeartHandshake } from 'lucide-react';

interface ProcessStep {
  _id: string;
  _type: string;
  order: number;
  title: string;
  description: string;
  icon?: string;
  image?: any;
}

interface ProcessProps {
  data?: ProcessStep[];
}

const Process = ({ data }: ProcessProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Icon mapping
  const iconMap: Record<string, any> = {
    Search: Search,
    Lightbulb: Lightbulb,
    Wrench: Wrench,
    HeartHandshake: HeartHandshake,
  };

  // Map CMS data or use fallback
  const steps = data?.map((step, index) => ({
    _id: step._id,
    _type: step._type,
    number: step.order.toString().padStart(2, '0'),
    icon: step.icon ? (iconMap[step.icon] || Search) : Search,
    title: step.title,
    description: step.description,
    features: [],  // Features not in current schema but kept for compatibility
  })) || [
    {
      number: '01',
      icon: Search,
      title: 'Personal Consultation',
      description: 'We begin with a thorough face to face consultation to understand your energy usage patterns, environmental goals, and budget. Our expert surveyors conduct a comprehensive site assessment, analysing roof orientation, shading, sunlight, cable runs, and optimal placement for inverters and batteries.',
      features: ['Free home visit', 'Face to face meeting', 'Site survey', 'Personalised recommendations'],
    },
    {
      number: '02',
      icon: Lightbulb,
      title: 'Bespoke Design',
      description: 'Using cutting edge technology and high quality products, we design a bespoke solution that maximises energy efficiency and cost savings tailored specifically to your unique requirements.',
      features: ['Custom system design', 'ROI analysis', 'Transparent pricing', 'Product selection'],
    },
    {
      number: '03',
      icon: Wrench,
      title: 'Expert Installation',
      description: 'Our skilled technicians handle the entire installation process with precision, ensuring your system is ready to perform reliably and efficiently for years to come.',
      features: ['Expert team', 'Premium equipment', 'Minimal disruption', 'Quality assurance'],
    },
    {
      number: '04',
      icon: HeartHandshake,
      title: 'Ongoing Support',
      description: 'Our commitment continues with comprehensive aftercare appointments, app training, and ongoing system monitoring. We stay in close communication so you feel informed and confident at every step.',
      features: ['Personal aftercare', 'App training', '5 year guarantee', 'System monitoring'],
    },
  ];

  return (
    <section id="process" ref={ref} className="py-16 md:py-24 bg-transparent relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-4 md:mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          >
            <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-accent"></div>
            <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent font-semibold text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em]">
              Our Process
            </span>
            <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-accent"></div>
          </motion.div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            We're With You{' '}
            <span className="bg-gradient-to-r from-accent via-primary-light to-accent bg-clip-text text-transparent">Every Step</span>
          </h2>
          <p className="text-base md:text-xl lg:text-2xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
            A highly personalised approach with ongoing personal support throughout your solar journey
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line - Premium gradient */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary-light to-primary/30"></div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-primary to-primary-light"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-10 md:space-y-16 lg:space-y-20">
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
                    whileHover={{ scale: 1.02, y: -8 }}
                    className={`group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl hover:shadow-[0_25px_70px_rgba(140,198,63,0.3)] transition-all duration-500 border border-white/10 hover:border-primary/30 relative overflow-hidden ${
                      index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'
                    }`}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Number Badge - Compact styling */}
                    <div className="relative z-10 mb-5">
                      <div className="flex items-start gap-4 mb-4">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="bg-gradient-to-br from-primary to-primary-dark text-white text-lg md:text-xl font-bold w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xl relative overflow-hidden"
                        >
                          <span className="relative z-10">{step.number}</span>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </motion.div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight pt-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-white/70 leading-relaxed text-sm md:text-base font-light">
                        {step.description}
                      </p>
                    </div>

                    {/* Features Grid - Compact styling */}
                    <div className="grid grid-cols-2 gap-2 md:gap-3 relative z-10">
                      {step.features.map((feature, idx) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ delay: index * 0.2 + idx * 0.1 }}
                          className="flex items-center space-x-2 text-xs md:text-sm text-white/90 bg-white/5 backdrop-blur-sm px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all group/feature"
                        >
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-primary to-primary-light rounded-full flex-shrink-0"></div>
                          <span className="font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </motion.div>
                </div>

                {/* Center Icon - Premium glass morphism */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ delay: index * 0.2 + 0.3, duration: 0.5, type: 'spring' }}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  className="relative flex-shrink-0 z-20 group/icon hidden lg:block"
                >
                  <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-white via-white to-white/90 backdrop-blur-xl rounded-xl lg:rounded-2xl flex items-center justify-center shadow-2xl border-4 border-primary relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10"></div>
                    <step.icon className="w-10 h-10 lg:w-12 lg:h-12 text-primary relative z-10" />
                  </div>
                  {/* Glow Effect */}
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0, 0.4],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light rounded-xl lg:rounded-2xl blur-md"
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
          className="text-center mt-24"
        >
          <p className="text-white/60 mb-8 text-xl font-light">
            Ready to start your solar journey?
          </p>
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(140,198,63,0.4)' }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="inline-block bg-gradient-to-r from-primary via-primary-dark to-primary text-white px-12 py-5 rounded-full font-semibold text-lg hover:shadow-2xl transition-all relative overflow-hidden group"
          >
            <span className="relative z-10 tracking-wide">Book Your Free Survey</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
