'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPin, Calendar, Zap } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface GalleryItem {
  _id?: string;
  image: string;
  title: string;
  location: string;
  capacity: string;
  date: string;
  systemDetails?: string;
  panelCount?: string;
  battery?: string;
  inverter?: string;
  performance?: string;
  savings?: string;
}

export default function GalleryPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleCard = (index: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Real Greenstar Solar project data - reordered for visual diversity
  const projects: GalleryItem[] = [
    {
      image: '/gallery/greenstar-6.jpg',
      title: 'High-Capacity System',
      location: 'Brockenhurst, Hampshire',
      capacity: '9.5kW System',
      date: 'July 2025',
      systemDetails: 'Solar + Dual Battery Storage',
      panelCount: '20 x AIKO 475w Gen 3 Panels',
      battery: '23.04kWh FoxESS EP12 Plus x2 Battery',
      performance: 'Generating 9,810 kWh annually',
      savings: '164% bill reduction - £2,610 annual savings',
    },
    {
      image: '/gallery/greenstar-17.jpg',
      title: 'All-in-One Solar System',
      location: 'Bishops Waltham, Hampshire',
      capacity: '7.05kW System',
      date: 'May 2025',
      systemDetails: 'Solar + All-in-One Battery',
      panelCount: '15 x AIKO 470w Gen 3 Panels',
      battery: '10.24kWh FOX EVO All In One Battery',
      performance: 'Generating 6,683 kWh annually',
      savings: '121% bill reduction - £1,371 annual savings',
    },
    {
      image: '/gallery/greenstar-11.jpg',
      title: 'High-Efficiency System',
      location: 'Whiteley, Hampshire',
      capacity: '10.45kW System',
      date: 'June 2025',
      systemDetails: 'Solar + Sigenergy Battery',
      panelCount: '22 x AIKO 475w Gen 3 Panels',
      battery: '9.04kWh Sigenergy 10.0 Battery',
      performance: 'Generating 11,015 kWh annually',
      savings: '133% bill reduction - £1,930 annual savings',
    },
    {
      image: '/gallery/greenstar-5.jpg',
      title: 'Large-Scale Residential',
      location: 'Salisbury, Wiltshire',
      capacity: '12.35kW System',
      date: 'August 2025',
      systemDetails: 'Premium Solar + All-in-One Battery',
      panelCount: '26 x AIKO 475w Gen 3 Panels',
      battery: '10.24kWh FOX EVO All In One Battery',
      performance: 'Generating 12,498 kWh annually',
      savings: '134% bill reduction - £2,329 annual savings',
    },
    {
      image: '/gallery/greenstar-1.jpg',
      title: 'Residential Solar + Battery',
      location: 'Alton, Hampshire',
      capacity: '7.2kW System',
      date: 'November 2024',
      systemDetails: 'Solar Panels + Battery Storage',
      panelCount: '16 x DMEG 450w Panels',
      battery: '10.36kWh FoxESS EP11 Battery',
      performance: 'Generating 7,200 kWh annually',
      savings: '92% bill reduction - £1,663 annual savings',
    },
    {
      image: '/gallery/greenstar-13.jpg',
      title: 'Large Residential System',
      location: 'Romsey, Hampshire',
      capacity: '17.1kW System',
      date: 'August 2025',
      systemDetails: 'Large Solar + Dual Battery Storage',
      panelCount: '36 x AIKO 475w Gen 3 Panels',
      battery: '23.04kWh FoxESS EP12 Plus x2 Battery',
      performance: 'Generating 18,008 kWh annually',
      savings: '125% bill reduction - £3,284 annual savings',
    },
    {
      image: '/gallery/greenstar-7.jpg',
      title: 'Dual Battery System',
      location: 'Hayling Island, Hampshire',
      capacity: '10.12kW System',
      date: 'December 2024',
      systemDetails: 'Solar + Dual Ecoflow Batteries',
      panelCount: '22 x AIKO 460w Gen 2 Panels',
      battery: '10.2kWh Ecoflow x2 Battery',
      performance: 'Generating 9,887 kWh annually',
      savings: '99% bill reduction - £2,160 annual savings',
    },
    {
      image: '/gallery/greenstar-8.jpg',
      title: 'Advanced Sigenergy System',
      location: 'Fareham, Hampshire',
      capacity: '9.66kW System',
      date: 'February 2025',
      systemDetails: 'Solar + Dual Sigenergy Batteries',
      panelCount: '21 x AIKO 460w Gen 2 Panels',
      battery: '16.12kWh Sigenergy 8.0 x2 Battery',
      performance: 'Generating 9,853 kWh annually',
      savings: '82% bill reduction - £2,387 annual savings',
    },
    {
      image: '/gallery/greenstar-9.jpg',
      title: 'Premium Large Installation',
      location: 'Wokingham, Berkshire',
      capacity: '17.86kW System',
      date: 'September 2025',
      systemDetails: 'Large-Scale Solar + Triple Battery',
      panelCount: '38 x AIKO 470w Gen 3 Panels',
      battery: '27.12kWh Sigenergy 10.0 x3 Battery',
      performance: 'Generating 16,090 kWh annually',
      savings: '92% bill reduction - £5,124 annual savings',
    },
    {
      image: '/gallery/greenstar-10.jpg',
      title: 'EV Charging Installation',
      location: 'Various Locations',
      capacity: 'EV Charger',
      date: '2024-2025',
      systemDetails: 'Zappi 7kW EV Charger All Black',
      panelCount: 'Professional EV charging solution',
      performance: 'Smart solar-integrated charging',
      savings: 'Free EV charging from solar power',
    },
    {
      image: '/gallery/greenstar-11.jpg',
      title: 'High-Efficiency System',
      location: 'Whiteley, Hampshire',
      capacity: '10.45kW System',
      date: 'June 2025',
      systemDetails: 'Solar + Sigenergy Battery',
      panelCount: '22 x AIKO 475w Gen 3 Panels',
      battery: '9.04kWh Sigenergy 10.0 Battery',
      performance: 'Generating 11,015 kWh annually',
      savings: '133% bill reduction - £1,930 annual savings',
    },
    {
      image: '/gallery/greenstar-12.jpg',
      title: 'Premium Large Installation',
      location: 'Wokingham, Berkshire',
      capacity: '17.86kW System',
      date: 'September 2025',
      systemDetails: 'Large-Scale Solar + Triple Battery',
      panelCount: '38 x AIKO 470w Gen 3 Panels',
      battery: '27.12kWh Sigenergy 10.0 x3 Battery',
      performance: 'Generating 16,090 kWh annually',
      savings: '92% bill reduction - £5,124 annual savings',
    },
    {
      image: '/gallery/greenstar-13.jpg',
      title: 'Large Residential System',
      location: 'Romsey, Hampshire',
      capacity: '17.1kW System',
      date: 'August 2025',
      systemDetails: 'Large Solar + Dual Battery Storage',
      panelCount: '36 x AIKO 475w Gen 3 Panels',
      battery: '23.04kWh FoxESS EP12 Plus x2 Battery',
      performance: 'Generating 18,008 kWh annually',
      savings: '125% bill reduction - £3,284 annual savings',
    },
    {
      image: '/gallery/greenstar-14.jpg',
      title: 'Advanced Sigenergy System',
      location: 'Fareham, Hampshire',
      capacity: '9.66kW System',
      date: 'February 2025',
      systemDetails: 'Solar + Dual Sigenergy Batteries',
      panelCount: '21 x AIKO 460w Gen 2 Panels',
      battery: '16.12kWh Sigenergy 8.0 x2 Battery',
      performance: 'Generating 9,853 kWh annually',
      savings: '82% bill reduction - £2,387 annual savings',
    },
    {
      image: '/gallery/greenstar-15.jpg',
      title: 'High-Performance System',
      location: 'Winchester, Hampshire',
      capacity: '10.01kW System',
      date: 'February 2025',
      systemDetails: 'Solar + Battery Storage',
      panelCount: '22 x AIKO 455w Gen 2 Panels',
      battery: '10.36kWh FoxESS EP11 Battery',
      performance: 'Generating 18,008 kWh annually',
      savings: '114% bill reduction - £2,268 annual savings',
    },
    {
      image: '/gallery/greenstar-16.jpg',
      title: 'Premium Installation',
      location: 'Ferndown, Dorset',
      capacity: '10.45kW System',
      date: 'February 2025',
      systemDetails: 'Solar + Battery Storage',
      panelCount: '22 x AIKO 475w Gen 3 Panels',
      battery: '11.52kWh FoxESS EP12 Plus Battery',
      performance: 'Generating 10,241 kWh annually',
      savings: '136% bill reduction - £1,995 annual savings',
    },
    {
      image: '/gallery/greenstar-17.jpg',
      title: 'All-in-One Solar System',
      location: 'Bishops Waltham, Hampshire',
      capacity: '7.05kW System',
      date: 'May 2025',
      systemDetails: 'Solar + All-in-One Battery',
      panelCount: '15 x AIKO 470w Gen 3 Panels',
      battery: '10.24kWh FOX EVO All In One Battery',
      performance: 'Generating 6,683 kWh annually',
      savings: '121% bill reduction - £1,371 annual savings',
    },
    {
      image: '/gallery/greenstar-18.jpg',
      title: 'Hybrid Battery System',
      location: 'Fareham, Hampshire',
      capacity: '9.5kW System',
      date: 'April 2025',
      systemDetails: 'Solar + Hybrid Battery Setup',
      panelCount: '20 x AIKO 475w Gen 3 Panels',
      battery: '10.36kWh FoxESS EP11 + 5.18kWh Fox EP5 Battery',
      performance: 'Generating 9,455 kWh annually',
      savings: '102% bill reduction - £1,405 annual savings',
    },
    {
      image: '/gallery/greenstar-19.jpg',
      title: 'Dual Ecoflow System',
      location: 'Cranleigh, Surrey',
      capacity: '9.025kW System',
      date: 'October 2025',
      systemDetails: 'Solar + Dual Ecoflow Batteries',
      panelCount: '19 x AIKO 475w Gen 3 Panels',
      battery: '10.2kWh Ecoflow x2 Battery',
      performance: 'Generating 8,890 kWh annually',
      savings: '127% bill reduction - £1,645 annual savings',
    },
    {
      image: '/gallery/greenstar-20.jpg',
      title: 'Premium Large Installation',
      location: 'Wokingham, Berkshire',
      capacity: '17.86kW System',
      date: 'September 2025',
      systemDetails: 'Large-Scale Solar + Triple Battery',
      panelCount: '38 x AIKO 470w Gen 3 Panels',
      battery: '27.12kWh Sigenergy 10.0 x3 Battery',
      performance: 'Generating 16,090 kWh annually',
      savings: '92% bill reduction - £5,124 annual savings',
    },
    {
      image: '/gallery/greenstar-21.jpg',
      title: 'Triple Battery System',
      location: 'Romsey, Hampshire',
      capacity: '15.47kW System',
      date: 'May 2025',
      systemDetails: 'Large Solar + Triple Sigenergy Batteries',
      panelCount: '34 x AIKO 455w Gen 2 Panels',
      battery: '24.18kWh Sigenergy 8.0 x3 Battery',
      performance: 'Generating 13,551 kWh annually',
      savings: '87% bill reduction - £4,115 annual savings',
    },
    {
      image: '/gallery/greenstar-22.jpg',
      title: 'Triple Battery System',
      location: 'Romsey, Hampshire',
      capacity: '15.47kW System',
      date: 'May 2025',
      systemDetails: 'Large Solar + Triple Sigenergy Batteries',
      panelCount: '34 x AIKO 455w Gen 2 Panels',
      battery: '24.18kWh Sigenergy 8.0 x3 Battery',
      performance: 'Generating 13,551 kWh annually',
      savings: '87% bill reduction - £4,115 annual savings',
    },
    {
      image: '/gallery/greenstar-23.jpg',
      title: 'Triple Battery System',
      location: 'Romsey, Hampshire',
      capacity: '15.47kW System',
      date: 'May 2025',
      systemDetails: 'Large Solar + Triple Sigenergy Batteries',
      panelCount: '34 x AIKO 455w Gen 2 Panels',
      battery: '24.18kWh Sigenergy 8.0 x3 Battery',
      performance: 'Generating 13,551 kWh annually',
      savings: '87% bill reduction - £4,115 annual savings',
    },
    {
      image: '/gallery/greenstar-24.jpg',
      title: 'Triple Battery System',
      location: 'Romsey, Hampshire',
      capacity: '15.47kW System',
      date: 'May 2025',
      systemDetails: 'Large Solar + Triple Sigenergy Batteries',
      panelCount: '34 x AIKO 455w Gen 2 Panels',
      battery: '24.18kWh Sigenergy 8.0 x3 Battery',
      performance: 'Generating 13,551 kWh annually',
      savings: '87% bill reduction - £4,115 annual savings',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Navigation />

      <main ref={ref} className="pt-32 pb-24">
        <div className="container mx-auto px-8 md:px-12">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-flex items-center space-x-2 mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent"></div>
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent font-semibold text-sm uppercase tracking-[0.2em]">
                Our Projects
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent"></div>
            </motion.div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Project{' '}
              <span className="bg-gradient-to-r from-accent via-primary-light to-accent bg-clip-text text-transparent">Gallery</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
              Explore our complete portfolio of successful solar installations across the UK. Click any image to see detailed specifications.
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onClick={() => toggleCard(index)}
                whileHover={{ y: -8 }}
                className="group cursor-pointer perspective-1000"
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  className="relative aspect-[4/3] w-full"
                  animate={{ rotateY: flippedCards[index] ? 180 : 0 }}
                  transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front of card */}
                  <div
                    className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <motion.div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${project.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/30 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Location badge - bottom left */}
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/20">
                        <span className="text-white/90 text-xs font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3" style={{ color: '#8CC63F' }} />
                          {project.location.split(',')[0]}
                        </span>
                      </div>
                    </div>
                    {/* Click prompt - bottom right */}
                    <div className="absolute bottom-4 right-4">
                      <span className="text-white text-xs font-medium">Tap to flip</span>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-dark/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-primary/30 overflow-hidden p-4"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div className="h-full flex flex-col text-white overflow-y-auto">
                      <div className="flex-1 overflow-y-auto">
                        <h3 className="text-lg font-bold mb-2 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                          {project.title}
                        </h3>

                        {/* Basic Info */}
                        <div className="space-y-1.5 mb-3 text-xs">
                          <div className="flex items-center space-x-2 text-white/90">
                            <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                            <span>{project.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-white/90">
                            <Zap className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                            <span>{project.capacity}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-white/90">
                            <Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                            <span>{project.date}</span>
                          </div>
                        </div>

                        {/* Key Metrics First - Savings & Performance */}
                        <div className="space-y-2 text-xs mb-3">
                          {project.savings && (
                            <div className="bg-primary/20 rounded-lg p-2 border border-primary/30">
                              <div className="text-primary/90 text-[10px] uppercase tracking-wider mb-0.5">Savings</div>
                              <div className="font-bold text-xs">{project.savings}</div>
                            </div>
                          )}
                          {project.performance && (
                            <div className="bg-primary/20 rounded-lg p-2 border border-primary/30">
                              <div className="text-primary/90 text-[10px] uppercase tracking-wider mb-0.5">Performance</div>
                              <div className="font-bold text-xs">{project.performance}</div>
                            </div>
                          )}
                        </div>

                        {/* System Details */}
                        <div className="space-y-2 text-xs">
                          <div className="bg-white/10 rounded-lg p-2">
                            <div className="text-primary/80 text-[10px] uppercase tracking-wider mb-0.5">System Type</div>
                            <div className="font-medium text-xs">{project.systemDetails || project.capacity}</div>
                          </div>
                          {project.panelCount && (
                            <div className="bg-white/10 rounded-lg p-2">
                              <div className="text-primary/80 text-[10px] uppercase tracking-wider mb-0.5">Panels</div>
                              <div className="font-medium text-xs">{project.panelCount}</div>
                            </div>
                          )}
                          {project.battery && (
                            <div className="bg-white/10 rounded-lg p-2">
                              <div className="text-primary/80 text-[10px] uppercase tracking-wider mb-0.5">Battery</div>
                              <div className="font-medium text-xs">{project.battery}</div>
                            </div>
                          )}
                          {project.inverter && (
                            <div className="bg-white/10 rounded-lg p-2">
                              <div className="text-primary/80 text-[10px] uppercase tracking-wider mb-0.5">Inverter</div>
                              <div className="font-medium text-xs">{project.inverter}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right mt-2 pt-2 border-t border-white/10 flex-shrink-0">
                        <span className="text-primary/80 text-[10px] font-medium">← Click to return</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-20"
          >
            <p className="text-white/60 mb-8 text-xl font-light">
              Want to see your property featured in our gallery?
            </p>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/#contact"
              className="inline-block relative px-6 py-3 md:px-12 md:py-5 rounded-full font-semibold text-sm md:text-lg overflow-hidden group"
              style={{
                background: 'rgba(140, 198, 63, 0.15)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(140, 198, 63, 0.3)',
                boxShadow: '0 8px 32px rgba(140, 198, 63, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <span className="relative z-10 tracking-wide text-white drop-shadow-lg">Start Your Project</span>
            </motion.a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
