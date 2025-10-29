'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Home, BatteryCharging as Battery, Sun, TrendingDown, Zap, Calendar, MapPin, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface CaseStudy {
  id: string;
  customerName: string;
  location: string;
  installDate: string;
  image: string;
  systemType: string;
  systemSize: string;
  batteryCapacity?: string;
  panelCount: number;
  inverterType: string;
  annualGeneration: string;
  co2Saved: string;
  billReduction: string;
  paybackPeriod: string;
  testimonial: string;
  challenge: string;
  solution: string;
  results: string[];
}

const caseStudies: CaseStudy[] = [
  {
    id: '1',
    customerName: 'The Johnson Family',
    location: 'Southampton, Hampshire',
    installDate: 'March 2024',
    image: 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_855615596.jpeg',
    systemType: 'Solar Panels + Battery Storage',
    systemSize: '8.4kW',
    batteryCapacity: '13.5kWh',
    panelCount: 21,
    inverterType: 'GivEnergy Hybrid Inverter',
    annualGeneration: '7,800 kWh',
    co2Saved: '3.2 tonnes per year',
    billReduction: '85%',
    paybackPeriod: '7 years',
    testimonial: '"The system has exceeded our expectations. We\'re now generating more energy than we use during the day and the battery keeps us powered through the evening."',
    challenge: 'The Johnson family had high energy bills due to working from home and wanted to reduce their carbon footprint while achieving energy independence.',
    solution: 'We designed a comprehensive solar and battery storage system that maximizes their south-facing roof space and stores excess energy for evening use.',
    results: [
      'Monthly electricity bills reduced from £180 to £27',
      'Complete energy independence during summer months',
      'Battery provides backup power during outages',
      'System generating 20% more than initial projections',
    ],
  },
  {
    id: '2',
    customerName: 'Green Manufacturing Ltd',
    location: 'Portsmouth, Hampshire',
    installDate: 'January 2024',
    image: 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_586564893-0f77e5a0-84f93a01.jpeg',
    systemType: 'Commercial Solar Array',
    systemSize: '95kW',
    panelCount: 238,
    inverterType: 'SolarEdge Commercial Inverters',
    annualGeneration: '89,000 kWh',
    co2Saved: '37 tonnes per year',
    billReduction: '72%',
    paybackPeriod: '5.5 years',
    testimonial: '"Greenstar delivered a professional installation with minimal disruption to our operations. The return on investment has been better than expected."',
    challenge: 'Rising energy costs were impacting profit margins. The business needed a scalable renewable energy solution that wouldn\'t disrupt operations.',
    solution: 'We installed a large-scale commercial solar array across three warehouse roofs, optimizing panel orientation for maximum generation throughout the day.',
    results: [
      'Annual energy costs reduced by over £28,000',
      'Installation completed in just 2 weeks',
      'Enhanced corporate sustainability credentials',
      'Qualified for enhanced capital allowances tax relief',
    ],
  },
  {
    id: '3',
    customerName: 'The Smith Residence',
    location: 'Winchester, Hampshire',
    installDate: 'September 2023',
    image: 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_553388506--281-29.jpeg',
    systemType: 'Solar Panels + Battery + EV Charger',
    systemSize: '6.8kW',
    batteryCapacity: '9.5kWh',
    panelCount: 17,
    inverterType: 'GivEnergy Hybrid Inverter',
    annualGeneration: '6,200 kWh',
    co2Saved: '2.6 tonnes per year',
    billReduction: '78%',
    paybackPeriod: '8 years',
    testimonial: '"We\'re now charging our electric car for free using solar energy. The battery means we can use solar power even at night. Couldn\'t be happier!"',
    challenge: 'With an electric vehicle and plans for a second, the family needed a solution to charge their cars affordably while reducing grid dependence.',
    solution: 'Integrated solar, battery storage, and smart EV charging to create a comprehensive home energy ecosystem that prioritizes solar charging.',
    results: [
      'EV charging costs reduced to nearly zero',
      'Home energy bills down 78%',
      'Battery stores excess solar for evening EV charging',
      'Smart system optimizes solar usage automatically',
    ],
  },
];

export default function CaseStudiesPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
            className="text-center mb-16 md:mb-24"
          >
            <motion.div
              className="inline-flex items-center space-x-2 mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent"></div>
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent font-semibold text-xs uppercase tracking-[0.2em]">
                Success Stories
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent"></div>
            </motion.div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Real Results from{' '}
              <span className="bg-gradient-to-r from-accent via-primary-light to-accent bg-clip-text text-transparent">Real Customers</span>
            </h1>

            <p className="text-sm md:text-base text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
              Discover how homeowners and businesses across Hampshire have transformed their energy usage with Greenstar Solar
            </p>
          </motion.div>

          {/* Case Studies */}
          <div className="space-y-16 md:space-y-24">
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={study.id} study={study} index={index} isInView={isInView} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1 }}
            className="text-center mt-20"
          >
            <p className="text-white/60 mb-8 text-xl font-light">
              Ready to start your own success story?
            </p>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/#contact"
              className="inline-block relative px-12 py-5 rounded-full font-semibold text-lg overflow-hidden group"
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
              <span className="relative z-10 tracking-wide text-white drop-shadow-lg">Book Your Free Survey</span>
            </motion.a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Case Study Card Component
const CaseStudyCard = ({ study, index, isInView }: { study: CaseStudy; index: number; isInView: boolean }) => {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className={`grid lg:grid-cols-2 gap-8 md:gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Image Section */}
      <motion.div
        className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${study.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Location Badge */}
          <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
            <div className="flex items-center space-x-2 text-white text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{study.location}</span>
            </div>
          </div>

          {/* Install Date Badge */}
          <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
            <div className="flex items-center space-x-2 text-white text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{study.installDate}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} space-y-6`}>
        {/* Header */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {study.customerName}
          </h2>
          <p className="text-primary text-lg font-medium">{study.systemType}</p>
        </div>

        {/* System Specs Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Sun className="w-5 h-5 text-primary" />
              <span className="text-white/60 text-xs">System Size</span>
            </div>
            <p className="text-white font-bold text-lg">{study.systemSize}</p>
          </div>

          {study.batteryCapacity && (
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <Battery className="w-5 h-5 text-primary" />
                <span className="text-white/60 text-xs">Battery</span>
              </div>
              <p className="text-white font-bold text-lg">{study.batteryCapacity}</p>
            </div>
          )}

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-white/60 text-xs">Annual Generation</span>
            </div>
            <p className="text-white font-bold text-lg">{study.annualGeneration}</p>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingDown className="w-5 h-5 text-primary" />
              <span className="text-white/60 text-xs">Bill Reduction</span>
            </div>
            <p className="text-white font-bold text-lg">{study.billReduction}</p>
          </div>
        </div>

        {/* Challenge, Solution, Results */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-white/5 to-white/0 p-5 rounded-xl border-l-4 border-primary/50">
            <h3 className="text-white font-bold mb-2 text-sm uppercase tracking-wider">The Challenge</h3>
            <p className="text-white/70 text-sm leading-relaxed">{study.challenge}</p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/0 p-5 rounded-xl border-l-4 border-accent/50">
            <h3 className="text-white font-bold mb-2 text-sm uppercase tracking-wider">Our Solution</h3>
            <p className="text-white/70 text-sm leading-relaxed">{study.solution}</p>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-5 rounded-xl border border-primary/20">
            <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">The Results</h3>
            <ul className="space-y-2">
              {study.results.map((result, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-white/80 text-sm">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 rounded-xl border border-white/10 relative">
          <div className="absolute -top-3 -left-3 text-primary text-6xl font-serif opacity-20">"</div>
          <p className="text-white italic leading-relaxed relative z-10">{study.testimonial}</p>
          <p className="text-primary font-semibold mt-3">— {study.customerName}</p>
        </div>

        {/* View Details Link */}
        <motion.a
          href="/#contact"
          whileHover={{ x: 8 }}
          className="inline-flex items-center space-x-2 text-primary font-semibold group"
        >
          <span>Get a similar system</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
        </motion.a>
      </div>
    </motion.div>
  );
};
