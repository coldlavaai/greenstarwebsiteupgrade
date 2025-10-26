'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sun, TrendingDown, Shield, Zap, Home, CheckCircle, ArrowRight, Battery, Leaf, Award } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';

export default function SolarPanelsHome() {
  const benefitsRef = useRef(null);
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.1 });

  return (
    <PageWrapper>
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 flex items-center overflow-hidden pt-24 bg-transparent">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-3 mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Sun className="w-8 h-8 text-primary" />
              </motion.div>
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent font-semibold text-sm uppercase tracking-[0.2em]">
                Residential Solar Solutions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="block text-white">Solar Panels</span>
              <span className="block bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                for Your Home
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-4xl mx-auto mb-10"
            >
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light">
                With energy prices continuing to rise, there has never been a better time to invest in solar panels and battery storage. We design every system around your home and energy goals, ensuring maximum performance and long term value.
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

      {/* Premium Panels Showcase */}
      <section ref={benefitsRef} className="py-12 bg-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {/* Premium Panel Feature */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-12 p-12 md:p-16">
                <div className="flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={benefitsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <div className="inline-flex items-center space-x-2 mb-6">
                      <Award className="w-6 h-6 text-primary" />
                      <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                        Next Generation Technology
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                      Aiko Neostar 3S{' '}
                      <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                        N-Type ABC
                      </span>
                    </h2>
                    <p className="text-lg text-white/80 leading-relaxed font-light mb-8">
                      Our installations feature the Aiko Neostar 3S N Type ABC mono glass panels, the latest generation of high performance solar technology. These panels achieve efficiency levels of up to <span className="text-primary font-semibold">24.3%</span> and use precision overlap soldering for greater energy capture and a refined all black finish.
                    </p>
                    <p className="text-lg text-white/80 leading-relaxed font-light">
                      Each panel is covered by a <span className="text-primary font-semibold">25 year product warranty</span> and a <span className="text-primary font-semibold">30 year performance warranty</span>, offering lasting confidence in your investment.
                    </p>
                  </motion.div>
                </div>

                {/* Specs Highlight */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={benefitsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex flex-col justify-center space-y-6"
                >
                  <div className="bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-xl rounded-2xl p-8 border border-primary/20">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-primary/20 w-14 h-14 rounded-xl flex items-center justify-center">
                        <Zap className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <div className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                          24.3%
                        </div>
                        <div className="text-white/60 text-sm font-medium uppercase tracking-wide">
                          Peak Efficiency
                        </div>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Industry-leading conversion rates for maximum energy generation
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-primary/20 w-14 h-14 rounded-xl flex items-center justify-center">
                        <Shield className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <div className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                          25/30
                        </div>
                        <div className="text-white/60 text-sm font-medium uppercase tracking-wide">
                          Year Warranties
                        </div>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      25 year product + 30 year performance warranty included
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-primary/20 w-14 h-14 rounded-xl flex items-center justify-center">
                        <Leaf className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                          All Black
                        </div>
                        <div className="text-white/60 text-sm font-medium uppercase tracking-wide">
                          Premium Finish
                        </div>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Refined aesthetic with precision overlap soldering
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Complete System Section */}
      <section className="py-12 bg-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 mb-6">
                <Battery className="w-6 h-6 text-primary" />
                <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                  Complete Energy Solutions
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Power Your{' '}
                <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                  Independence
                </span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
                We pair these panels with hybrid inverters and battery systems from Hanchu, Fox ESS, EcoFlow, and Sigenergy, creating powerful, future ready energy solutions that allow you to generate, store, and manage your own clean energy with ease.
              </p>
            </div>

            {/* Brand Partners Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: 'Hanchu',
                  description: 'Advanced hybrid inverter technology',
                  icon: Zap,
                },
                {
                  name: 'Fox ESS',
                  description: 'Industry-leading energy storage',
                  icon: Battery,
                },
                {
                  name: 'EcoFlow',
                  description: 'Smart power management systems',
                  icon: Zap,
                },
                {
                  name: 'Sigenergy',
                  description: 'Next-gen battery solutions',
                  icon: Battery,
                },
              ].map((brand, index) => (
                <motion.div
                  key={brand.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-primary/30 transition-all"
                >
                  <div className="bg-gradient-to-br from-primary/20 to-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                    <brand.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                    {brand.name}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed font-light">
                    {brand.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-12 grid md:grid-cols-3 gap-6"
            >
              <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl rounded-xl p-6 border border-white/5">
                <CheckCircle className="w-8 h-8 text-primary mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Generate</h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  Maximum solar energy capture with premium panels
                </p>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl rounded-xl p-6 border border-white/5">
                <CheckCircle className="w-8 h-8 text-primary mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Store</h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  Reliable battery systems for 24/7 power availability
                </p>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl rounded-xl p-6 border border-white/5">
                <CheckCircle className="w-8 h-8 text-primary mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Manage</h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  Smart control over your energy usage and costs
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-transparent">
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
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
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
    </PageWrapper>
  );
}
