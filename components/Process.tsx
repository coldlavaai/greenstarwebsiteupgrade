'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Search, Lightbulb, Wrench, FileCheck, HeartHandshake } from 'lucide-react';

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
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleCard = (index: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Icon mapping
  const iconMap: Record<string, any> = {
    Search: Search,
    Lightbulb: Lightbulb,
    Wrench: Wrench,
    FileCheck: FileCheck,
    HeartHandshake: HeartHandshake,
  };

  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Personal Consultation',
      description: 'We begin with a face to face consultation to understand your energy usage, goals, and budget.',
      backContent: 'Our surveyors carry out a full structural and wind load assessment to ensure your roof is sound and suitable for installation. Every site is carefully assessed for roof orientation, shading, sunlight, and the ideal placement for inverters and batteries.',
      frontReview: { text: '"They explained everything in simple terms and made us feel confident."', author: 'Martyn Brayshaw' },
      backReview: { text: '"Jon explained everything clearly. Tobias kept things organized."', author: 'Rikesh' },
    },
    {
      number: '02',
      icon: Lightbulb,
      title: 'Bespoke Design',
      description: 'There is no one size fits all solution. Each system is tailored to your specific energy consumption and future requirements to ensure long term efficiency and flexibility.',
      backContent: 'Using premium components and industry leading software, we create a system that meets your needs today while preparing you for tomorrow.',
      frontReview: { text: '"Not the cheapest of 5 quotes but best value. Excellent equipment..."', author: 'Mark Diaper' },
      backReview: { text: '"Quote adjusted to my needs. Install was quick and well done."', author: 'Jim' },
    },
    {
      number: '03',
      icon: Wrench,
      title: 'Expert Installation',
      description: 'With over 15 years experience, our qualified installation team completes every project with precision and care.',
      backContent: 'We ensure full compliance, safety, and reliability so your system performs optimally for years to come.',
      frontReview: { text: '"Install team were really helpful and thorough."', author: 'Ben Miles-Mathewson' },
      backReview: { text: '"Team were punctual, knowledgeable, polite and cleaned up everything."', author: 'Peter Lucas' },
    },
    {
      number: '04',
      icon: FileCheck,
      title: 'System Handover',
      description: "Upon completion, you'll receive a comprehensive handover pack including your MCS certificate, DNO approval letter, and other essential documents required for Smart Export Guarantee onboarding.",
      backContent: "We assist you through this process to ensure a seamless transition onto the right export tariff. Our team also provides full guidance on using your monitoring app and understanding your energy data so you can get the most from your new system.",
      frontReview: { text: '"System working so well adding a second battery next week!"', author: 'Ben Miles-Mathewson' },
      backReview: { text: '"System has been superb for one month now."', author: 'Tony Hamlett' },
    },
    {
      number: '05',
      icon: HeartHandshake,
      title: 'Ongoing Support',
      description: "Our relationship doesn't end once your system is installed. Greenstar offers continued support with no labour call out charges post installation.",
      backContent: 'We ensure any issues are resolved quickly and efficiently. We remain available for advice, system checks, and performance reviews so you always have us to rely on for anything you need.',
      frontReview: { text: '"First class customer service continues after purchase."', author: 'Daniel Blackman' },
      backReview: { text: '"Any concerns resolved quickly and professionally."', author: 'Oliver' },
    },
  ];

  return (
    <section id="process" ref={ref} className="py-16 md:py-24 bg-transparent relative overflow-hidden">

      <div className="container mx-auto px-8 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-4 md:mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          >
            <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-accent"></div>
            <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent font-semibold text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em]">
              Our Process
            </span>
            <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-accent"></div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            We're With You{' '}
            <span className="bg-gradient-to-r from-accent via-primary-light to-accent bg-clip-text text-transparent">Every Step</span>
          </h2>
          <p className="text-xs md:text-sm lg:text-base text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
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
          <div className="space-y-6 md:space-y-10 lg:space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className="flex-1 w-full">
                  <motion.div
                    onClick={() => toggleCard(index)}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className={`group cursor-pointer perspective-1000 ${
                      index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'
                    }`}
                    style={{ perspective: '1000px' }}
                  >
                    <motion.div
                      className="relative w-full"
                      animate={{ rotateY: flippedCards[index] ? 180 : 0 }}
                      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Front of card */}
                      <div
                        className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl hover:shadow-[0_25px_70px_rgba(140,199,64,0.3)] transition-all duration-500 border border-white/10 hover:border-primary/30 relative overflow-hidden"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden'
                        }}
                      >
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Number Badge */}
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
                            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight pt-2" style={{ fontFamily: 'var(--font-heading)' }}>
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-white/70 leading-relaxed text-xs md:text-sm font-light mb-4">
                            {step.description}
                          </p>

                          {/* Customer Review Snippet */}
                          {step.frontReview && (
                            <div className="bg-white/5 border-l-2 border-primary/50 pl-3 py-2 rounded">
                              <p className="text-white/90 italic text-[10px] md:text-xs mb-1">{step.frontReview.text}</p>
                              <p className="text-primary/70 text-[9px] md:text-[10px] font-medium">— {step.frontReview.author}</p>
                            </div>
                          )}
                        </div>

                        {/* Click hint */}
                        <div className="relative z-10 text-right">
                          <span className="text-primary/60 text-xs font-medium">Click to learn more →</span>
                        </div>

                        {/* Corner accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>

                      {/* Back of card */}
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-dark/20 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border border-primary/30 overflow-hidden"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)'
                        }}
                      >
                        <div className="relative z-10 h-full flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-4 mb-4">
                              <div className="bg-gradient-to-br from-primary to-primary-dark text-white text-lg md:text-xl font-bold w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xl">
                                <span>{step.number}</span>
                              </div>
                              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                                {step.title}
                              </h3>
                            </div>
                            <p className="text-white/80 leading-relaxed text-xs md:text-sm font-light mb-4">
                              {step.backContent}
                            </p>

                            {/* Customer Review Snippet */}
                            {step.backReview && (
                              <div className="bg-white/5 border-l-2 border-primary/50 pl-3 py-2 rounded">
                                <p className="text-white/90 italic text-[10px] md:text-xs mb-1">{step.backReview.text}</p>
                                <p className="text-primary/70 text-[9px] md:text-[10px] font-medium">— {step.backReview.author}</p>
                              </div>
                            )}
                          </div>
                          <div className="text-right mt-4">
                            <span className="text-primary/80 text-xs font-medium">← Click to return</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Center Icon - Premium glass morphism */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ delay: index * 0.15 + 0.3, duration: 0.5, type: 'spring' }}
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
          className="text-center mt-20"
        >
          <p className="text-white/60 mb-8 text-xl font-light">
            Ready to start your solar journey?
          </p>
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(140,199,64,0.4)' }}
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
