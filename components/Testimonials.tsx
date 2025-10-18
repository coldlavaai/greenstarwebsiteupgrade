'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Manchester',
      rating: 5,
      text: "Greenstar Solar transformed our home! The installation was seamless, and we're already seeing significant savings on our energy bills. The team was professional, knowledgeable, and incredibly helpful throughout the entire process.",
      image: '👩',
      system: 'Residential Solar System',
    },
    {
      name: 'Michael Davies',
      location: 'Birmingham',
      rating: 5,
      text: 'Outstanding service from start to finish. The consultation was thorough, the installation was quick and clean, and the aftercare support has been excellent. Our business is now saving thousands on energy costs.',
      image: '👨',
      system: 'Commercial Solar + Battery',
    },
    {
      name: 'Emma Wilson',
      location: 'London',
      rating: 5,
      text: 'We were nervous about making the switch to solar, but Greenstar made it so easy. They explained everything clearly, handled all the paperwork, and the system has been performing brilliantly. Highly recommend!',
      image: '👩',
      system: 'Residential Solar + Storage',
    },
    {
      name: 'James Thompson',
      location: 'Leeds',
      rating: 5,
      text: 'Excellent company! Professional installation, great communication, and the solar panels look fantastic on our roof. The monitoring app is brilliant - we can see exactly how much energy we\'re generating in real-time.',
      image: '👨',
      system: 'Residential Solar System',
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="py-24 bg-transparent relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
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
              Testimonials
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent"></div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            What Our{' '}
            <span className="bg-gradient-to-r from-accent via-primary-light to-accent bg-clip-text text-transparent">Customers Say</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
            Join hundreds of satisfied customers who have made the switch to solar energy
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Main Card - Premium glass morphism */}
            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-10 md:p-16 border border-white/20 shadow-[0_25px_70px_rgba(140,198,63,0.3)] relative overflow-visible">
              {/* Accent gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/5 pointer-events-none rounded-3xl"></div>

              {/* Quote Icon - Premium styling */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute top-8 left-10 bg-gradient-to-br from-primary to-primary-dark w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl z-10"
              >
                <Quote className="w-8 h-8 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="pt-12"
                >
                  {/* Stars */}
                  <div className="flex space-x-1.5 mb-8 relative z-10">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="w-7 h-7 fill-primary text-primary drop-shadow-lg" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-white text-xl md:text-3xl leading-relaxed mb-10 font-light relative z-10" style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>
                    "{testimonials[currentIndex].text}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center space-x-5 relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary via-primary-dark to-primary rounded-full flex items-center justify-center text-4xl shadow-xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                      <span className="relative z-10">{testimonials[currentIndex].image}</span>
                    </div>
                    <div>
                      <div className="text-white font-bold text-xl mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-white/60 text-sm font-light">
                        {testimonials[currentIndex].location} · {testimonials[currentIndex].system}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons - Premium styling */}
            <div className="flex items-center justify-center space-x-6 mt-10">
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(212, 175, 55, 0.2)' }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white w-14 h-14 rounded-full flex items-center justify-center transition-all border-2 border-white/20 hover:border-primary/50 shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              {/* Dots Indicator */}
              <div className="flex space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-all ${
                      index === currentIndex
                        ? 'w-10 h-2.5 bg-gradient-to-r from-primary to-primary-light shadow-lg'
                        : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/50'
                    } rounded-full`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(212, 175, 55, 0.2)' }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white w-14 h-14 rounded-full flex items-center justify-center transition-all border-2 border-white/20 hover:border-primary/50 shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>

          {/* Stats Row - Premium styling */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-8 mt-20"
          >
            {[
              { value: '500+', label: 'Happy Customers' },
              { value: '4.9/5', label: 'Average Rating' },
              { value: '100%', label: 'Satisfaction Rate' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all"
              >
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm md:text-base font-light">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
