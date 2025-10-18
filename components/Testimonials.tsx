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
    <section ref={ref} className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#8cc63f] font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            What Our <span className="text-[#8cc63f]">Customers Say</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
            {/* Main Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-[0_20px_60px_rgba(140,198,63,0.3)]">
              {/* Quote Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute -top-6 left-8 bg-[#8cc63f] w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl"
              >
                <Quote className="w-6 h-6 text-white" />
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Stars */}
                  <div className="flex space-x-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-[#8cc63f] text-[#8cc63f]" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-white text-xl md:text-2xl leading-relaxed mb-8 font-light">
                    "{testimonials[currentIndex].text}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#8cc63f] to-[#7ab52f] rounded-full flex items-center justify-center text-3xl">
                      {testimonials[currentIndex].image}
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-gray-300 text-sm">
                        {testimonials[currentIndex].location} · {testimonials[currentIndex].system}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all border border-white/20"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              {/* Dots Indicator */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-all ${
                      index === currentIndex
                        ? 'w-8 h-2 bg-[#8cc63f]'
                        : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                    } rounded-full`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all border border-white/20"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-8 mt-16"
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
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#8cc63f] mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
