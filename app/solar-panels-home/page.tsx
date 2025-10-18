'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sun, TrendingDown, Shield, Zap, Home, CheckCircle, ArrowRight, Battery, Leaf, Award } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import DayNightBackground from '@/components/DayNightBackground';

export default function SolarPanelsHome() {
  const benefitsRef = useRef(null);
  const benefitsInView = useInView(benefitsRef, { once: true, margin: '-100px' });

  return (
    <div className="relative min-h-screen">
      <DayNightBackground />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 mt-8">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-3 mb-8"
            >
              <Sun className="w-8 h-8 text-primary" />
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent font-semibold text-sm uppercase tracking-[0.2em]">
                Residential Solar Solutions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Solar Panels for{' '}
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                Your Home
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-4xl mx-auto mb-10"
            >
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light mb-6">
                With energy prices at an all-time high, now is an ideal time to invest in solar panels and battery storage. We offer a variety of options, including solar panels, battery storage systems, or a combined setup tailored to meet your home's energy needs.
              </p>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light">
                Our custom-designed systems feature highly efficient{' '}
                <a
                  href="https://aikosolar.com/en/products/neostar-2splus54-dual-glass/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-light underline transition-colors"
                >
                  Aiko Neostar 2S N-type mono glass panels
                </a>
                , known for their ethical sourcing and top-tier performance. Paired with the latest hybrid inverters and batteries from leading brands like Fox ESS, SolarEdge, and EcoFlow, our solutions provide state-of-the-art solar power to help you achieve your energy goals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(140,198,63,0.5)' }}
                whileTap={{ scale: 0.95 }}
                href="/#contact"
                className="group relative bg-gradient-to-r from-primary via-primary-dark to-primary text-white px-8 py-4 rounded-full font-semibold text-base overflow-hidden shadow-2xl"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <span className="tracking-wide">Get Free Quote</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/#systems"
                className="backdrop-blur-xl bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-base border-2 border-white/20 hover:border-primary/50 transition-all shadow-xl"
              >
                ← Back to Systems
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section ref={benefitsRef} className="py-24 bg-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              Why Choose Solar for{' '}
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">Your Home</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto font-light">
              Premium solar solutions that deliver exceptional value
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Sun,
                title: 'Premium Aiko Panels',
                description: 'Highly efficient N-type mono glass panels with ethical sourcing and top-tier performance',
              },
              {
                icon: Battery,
                title: 'Leading Brand Batteries',
                description: 'Latest hybrid inverters and batteries from Fox ESS, SolarEdge, and EcoFlow',
              },
              {
                icon: TrendingDown,
                title: 'Maximum Savings',
                description: 'Combat high energy prices with custom-designed systems that maximize your investment',
              },
              {
                icon: Zap,
                title: 'Flexible Options',
                description: 'Choose from solar panels only, battery storage, or combined systems',
              },
              {
                icon: Home,
                title: 'Custom Design',
                description: 'Tailored solutions designed specifically for your home\'s energy needs',
              },
              {
                icon: Shield,
                title: 'State-of-the-Art',
                description: 'Latest technology and premium components for reliable, long-lasting performance',
              },
            ].map((benefit, index) => (
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
                Ready to Go Solar?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-light">
                Get a free, no-obligation quote and site assessment from our expert team
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/#contact"
                className="inline-flex items-center space-x-3 bg-white text-primary px-10 py-5 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all"
              >
                <span>Book Free Consultation</span>
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
