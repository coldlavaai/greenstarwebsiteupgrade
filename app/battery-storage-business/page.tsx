'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Battery, TrendingDown, Shield, Zap, Building2, Clock, Power, Moon, ArrowRight, Target } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import DayNightBackground from '@/components/DayNightBackground';

export default function BatteryStorageBusiness() {
  const benefitsRef = useRef(null);
  const benefitsInView = useInView(benefitsRef, { once: true, margin: '-100px' });

  const processRef = useRef(null);
  const processInView = useInView(processRef, { once: true, margin: '-100px' });

  const benefits = [
    {
      icon: Battery,
      title: 'Peak Shaving',
      description: 'Reduce peak demand charges by storing energy during off-peak hours',
    },
    {
      icon: TrendingDown,
      title: 'Cost Optimization',
      description: 'Maximize savings with intelligent charging and discharging strategies',
    },
    {
      icon: Clock,
      title: 'Time-of-Use Management',
      description: 'Store cheap electricity and use it during expensive peak periods',
    },
    {
      icon: Shield,
      title: 'Business Continuity',
      description: 'Ensure uninterrupted operations during power outages with backup storage',
    },
    {
      icon: Power,
      title: 'Grid Services Revenue',
      description: 'Participate in grid services and generate additional revenue streams',
    },
    {
      icon: Target,
      title: 'Scalable Capacity',
      description: 'Expand storage capacity as your business energy needs grow',
    },
  ];

  const process = [
    {
      number: '01',
      title: 'Energy Analysis',
      description: 'Comprehensive analysis of your energy usage patterns, tariff structure, and solar generation',
    },
    {
      number: '02',
      title: 'Storage Strategy',
      description: 'Custom battery solution with optimized charge/discharge cycles for maximum ROI',
    },
    {
      number: '03',
      title: 'Professional Installation',
      description: 'Expert installation with minimal operational disruption and full compliance',
    },
    {
      number: '04',
      title: 'Intelligent Management',
      description: 'AI-powered system manages storage for optimal performance and cost savings',
    },
  ];

  const faqs = [
    {
      question: 'What is the ROI for commercial battery storage?',
      answer: 'ROI typically ranges from 4-7 years depending on your energy tariff, usage patterns, and system size. Businesses with high peak demand charges see the fastest returns.',
    },
    {
      question: 'How much capacity do I need?',
      answer: 'Capacity depends on your energy consumption patterns and objectives. We analyze your usage data to recommend optimal capacity, typically ranging from 50kWh to 500kWh+',
    },
    {
      question: 'Can battery storage work without solar panels?',
      answer: 'Yes! Battery storage can be used independently to capitalize on time-of-use tariffs, storing cheap off-peak electricity for use during expensive peak periods.',
    },
    {
      question: 'What is the lifespan of commercial batteries?',
      answer: 'Commercial battery systems typically last 10-15 years with warranties of 10 years. Modern lithium-ion systems maintain 70-80% capacity throughout their lifespan.',
    },
  ];

  return (
    <div className="relative min-h-screen">
      <DayNightBackground />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 mt-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-3 mb-8"
            >
              <Battery className="w-8 h-8 text-primary" />
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent font-semibold text-sm uppercase tracking-[0.2em]">
                Commercial Battery Solutions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Battery Storage for{' '}
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                Your Business
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed max-w-3xl mx-auto font-light"
            >
              Optimize energy costs and ensure business continuity with commercial battery storage. Reduce peak demand charges, participate in grid services, and maximize your solar investment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(140,198,63,0.5)' }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="group relative bg-gradient-to-r from-primary via-primary-dark to-primary text-white px-8 py-4 rounded-full font-semibold text-base overflow-hidden shadow-2xl"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <span className="tracking-wide">Get Free Assessment</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-24 bg-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              Commercial Battery{' '}
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">Advantages</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto font-light">
              Strategic energy management for modern businesses
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 50 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-primary/50 transition-all"
              >
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {benefit.title}
                </h3>
                <p className="text-white/70 leading-relaxed font-light">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-24 bg-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              Our Implementation{' '}
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto font-light">
              Tailored battery solutions designed for commercial efficiency
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 h-full">
                  <div className="text-6xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {step.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">Questions</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10"
              >
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {faq.question}
                </h3>
                <p className="text-white/70 leading-relaxed font-light">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary via-primary-dark to-primary rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                Optimize Your Energy Strategy
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-light">
                Schedule a free commercial energy assessment and discover your storage potential
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/#contact"
                className="inline-flex items-center space-x-3 bg-white text-primary px-10 py-5 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
