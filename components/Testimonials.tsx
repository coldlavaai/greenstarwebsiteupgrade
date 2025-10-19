'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface Testimonial {
  name: string;
  location?: string;
  rating: number;
  text: string;
  platform?: string;
  date?: string;
}

interface TestimonialsProps {
  data?: any[];
}

const Testimonials = ({ data }: TestimonialsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const reviewsPerPage = isMobile ? 4 : 9;

  // All reviews from your markdown file
  const allReviews: Testimonial[] = [
    {
      name: 'Phill Ballard',
      location: 'Google Review',
      rating: 5,
      text: 'Great service from beginning to end and at a great price. Greenstar provided a first rate service. Already self sufficient with excess sent to the grid!',
      platform: 'Google',
    },
    {
      name: 'Steve Wolstenholme',
      location: 'Google Review',
      rating: 5,
      text: '5 star treatment from start to finish, couldn\'t of asked for anything else.',
      platform: 'Google',
    },
    {
      name: 'Max Copeland',
      location: 'Google Review',
      rating: 5,
      text: 'Very impressed with Greenstar Solar. Professional and efficient team. Installation was smooth and quick. Great price and couldn\'t be happier!',
      platform: 'Google',
    },
    {
      name: 'Martyn Brayshaw',
      location: 'Google Review',
      rating: 5,
      text: 'Communication from start to finish has been exemplary. They explained everything in simple terms and made us feel confident.',
      platform: 'Google',
    },
    {
      name: 'Jim Godfrey',
      location: 'Google Review',
      rating: 5,
      text: 'Excellent service in all respects. Cost was less than expected. Only used less than a kilowatt of power since installation. Very pleased!',
      platform: 'Google',
    },
    {
      name: 'Simon Wright',
      location: 'Google Review',
      rating: 5,
      text: 'Great experience working with Greenstar, good communication throughout and fitters were very clean and polite. Highly recommended.',
      platform: 'Google',
    },
    {
      name: 'Daniel Blackman',
      location: 'Google Review',
      rating: 5,
      text: 'Fantastic company! First class customer service continues after purchase. Big shout to Jack who is an absolute super star. Competitive pricing.',
      platform: 'Google',
    },
    {
      name: 'Yasmin Kingston',
      location: 'Google Review',
      rating: 5,
      text: 'Had 6 quotes prior and this was the best by far! Already saving money in bills. 10/10 recommend. John and Jack are a great team!',
      platform: 'Google',
    },
    {
      name: 'Ben Miles-Mathewson',
      location: 'Google Review',
      rating: 5,
      text: 'Good comms throughout. Install team were really helpful and thorough. System working so well adding a second battery next week!',
      platform: 'Google',
    },
    {
      name: 'David Payne',
      location: 'Google Review',
      rating: 5,
      text: 'Absolutely first class from start to finish. Better than large nationals. Installation outperformed expectations. No hesitation in recommending!',
      platform: 'Google',
    },
    {
      name: 'Tony Hamlett',
      location: 'Google Review',
      rating: 5,
      text: 'First class service with no pressure sales. Installation completed in one day. System has been superb for one month now.',
      platform: 'Google',
    },
    {
      name: 'Mark Diaper',
      location: 'Google Review',
      rating: 5,
      text: 'Not the cheapest of 5 quotes but best value. Excellent equipment and aftercare. Installers were tidy and any snags resolved immediately.',
      platform: 'Google',
    },
    {
      name: 'Vulcan XH558',
      location: 'Google Review',
      rating: 5,
      text: 'Jack, John, Tobias and engineers were brilliant. Professional with advice pre and post installation. Smooth and painless from start to finish.',
      platform: 'Google',
    },
    {
      name: 'Oliver',
      location: 'Google Review',
      rating: 5,
      text: 'Excellent customer service. Jack and John were quick to respond and courteous. Any concerns resolved quickly and professionally.',
      platform: 'Google',
    },
    {
      name: 'Peter Lucas',
      location: 'Google Review',
      rating: 5,
      text: 'Absolutely great company! 22 panel system installed in 2 days. Team were punctual, knowledgeable, polite and cleaned up everything.',
      platform: 'Google',
    },
    {
      name: 'Kevin',
      location: 'Trustpilot',
      rating: 5,
      text: 'Completely different from others - no hard sell! Speaking to knowledgeable technicians rather than salesmen. Installation in one day.',
      platform: 'Trustpilot',
    },
    {
      name: 'Martyn and Ann',
      location: 'Trustpilot',
      rating: 5,
      text: 'GreenStar Solar was superb. Explained processes clearly. Scaffolder and workmen all arrived on time. Completed within a day!',
      platform: 'Trustpilot',
    },
    {
      name: 'Ben',
      location: 'Trustpilot',
      rating: 5,
      text: 'Great guys to deal with. Knowledgable and not a hard sell. System performed exactly as hoped. Install team were nice and tidy.',
      platform: 'Trustpilot',
    },
    {
      name: 'Martin and Ann',
      location: 'Trustpilot',
      rating: 5,
      text: 'Very smooth process from start to finish. Good advice, professional installation, very good communication throughout.',
      platform: 'Trustpilot',
    },
    {
      name: 'Olivia',
      location: 'Trustpilot',
      rating: 5,
      text: 'As a business owner, switching to solar made sense. GreenStar made it easy. Already seeing benefits in reduced energy costs!',
      platform: 'Trustpilot',
    },
    {
      name: 'Rikesh',
      location: 'Trustpilot',
      rating: 5,
      text: 'Fair price, simple process. Jon explained everything clearly. Tobias kept things organized. Bills already dropping!',
      platform: 'Trustpilot',
    },
    {
      name: 'Meghan',
      location: 'Trustpilot',
      rating: 5,
      text: 'Whole process was smooth and easy. Tobias and team were patient with our many questions and very reassuring. Don\'t hesitate!',
      platform: 'Trustpilot',
    },
    {
      name: 'Sri',
      location: 'Trustpilot',
      rating: 5,
      text: 'Very professional service. Knowledgeable team that listened to our circumstances and needs. Extremely good value for money.',
      platform: 'Trustpilot',
    },
    {
      name: 'Jim',
      location: 'Trustpilot',
      rating: 5,
      text: 'Excellent explanation of system. Quote adjusted to my needs. Install was quick and well done. Already saving money!',
      platform: 'Trustpilot',
    },
    {
      name: 'Andy',
      location: 'Trustpilot',
      rating: 5,
      text: 'Jack, John, Tobias and engineers were brilliant. Professional with advice pre and post installation. Smooth and painless!',
      platform: 'Trustpilot',
    },
    {
      name: 'Phill',
      location: 'Trustpilot',
      rating: 5,
      text: 'Great price! Spoke to several companies - chose Greenstar as no1. Tom, Anthony and Ben completed first rate install. Self sufficient now!',
      platform: 'Trustpilot',
    },
    {
      name: 'Peter Lucas',
      location: 'Trustpilot',
      rating: 5,
      text: 'Faultless installation. Small issue sorted immediately. Clean, tidy and professional. If I could give more stars I would!',
      platform: 'Trustpilot',
    },
    {
      name: 'Denise',
      location: 'Trustpilot',
      rating: 5,
      text: 'Competitive quote, high standard work. Scaffolding removed in days not months! Already noticing significant energy savings.',
      platform: 'Trustpilot',
    },
    {
      name: 'Tony',
      location: 'Trustpilot',
      rating: 5,
      text: 'Honest experienced local company with no pressure. Professional and straightforward. After a month I am delighted!',
      platform: 'Trustpilot',
    },
    {
      name: 'Leanne',
      location: 'Trustpilot',
      rating: 5,
      text: 'Jon made sure I was comfortable with every decision. Tobias kept me updated from start to finish. Highly recommended!',
      platform: 'Trustpilot',
    },
  ];

  const totalPages = Math.ceil(allReviews.length / reviewsPerPage);
  const currentReviews = allReviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setIsAutoPlaying(false); // Pause auto-play when user manually navigates
  };

  // Auto-scroll through pages every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000); // Change page every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalPages]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section ref={ref} id="testimonials" className="py-24 bg-transparent relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            What Our{' '}
            <span className="bg-gradient-to-r from-accent via-primary-light to-accent bg-clip-text text-transparent">Customers Say</span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
            Real reviews from real customers on Google and Trustpilot
          </p>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-white/80 font-semibold">5.0 on Google</span>
            </div>
            <div className="w-px h-6 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-white/80 font-semibold">4.7 on Trustpilot</span>
            </div>
          </div>
        </motion.div>

        {/* Reviews Grid - 2x2 on mobile, 3x3 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          {currentReviews.map((review, index) => (
            <motion.div
              key={`${currentPage}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: 'spring', stiffness: 300, damping: 20 }
              }}
              className="group relative"
            >
              {/* Glassmorphism Card */}
              <div className="relative h-full bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20 shadow-lg hover:shadow-[0_20px_50px_rgba(140,198,63,0.4)] transition-all duration-300 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>

                {/* Quote icon - hidden on mobile for space */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity hidden md:flex">
                  <Quote className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Stars */}
                  <div className="flex space-x-0.5 md:space-x-1 mb-2 md:mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-white/90 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-3 md:line-clamp-4 group-hover:text-white transition-colors">
                    "{review.text}"
                  </p>

                  {/* Author */}
                  <div className="pt-3 md:pt-4 border-t border-white/10">
                    <div className="font-semibold text-white text-xs md:text-sm mb-1">
                      {review.name}
                    </div>
                    <div className="text-[10px] md:text-xs text-white/60 flex items-center gap-1 md:gap-2 flex-wrap">
                      <span className={`px-1.5 md:px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-medium ${
                        review.platform === 'Google'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-green-500/20 text-green-300'
                      }`}>
                        {review.platform}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevPage}
            className="bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all border-2 border-white/20 hover:border-primary/50 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Page indicator */}
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentPage(index);
                  setIsAutoPlaying(false);
                }}
                className={`transition-all ${
                  index === currentPage
                    ? 'w-8 h-2 bg-gradient-to-r from-primary to-primary-light shadow-lg'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                } rounded-full`}
              />
            ))}
          </div>

          {/* Auto-play toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleAutoPlay}
            className={`backdrop-blur-xl text-white w-12 h-12 rounded-full flex items-center justify-center transition-all border-2 shadow-lg ${
              isAutoPlaying
                ? 'bg-primary/20 border-primary/50 hover:bg-primary/30'
                : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-primary/50'
            }`}
            title={isAutoPlaying ? 'Pause auto-scroll' : 'Resume auto-scroll'}
          >
            {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextPage}
            className="bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all border-2 border-white/20 hover:border-primary/50 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
        >
          {[
            { value: '48+', label: 'Verified Reviews' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '100%', label: 'Would Recommend' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent mb-3">
                {stat.value}
              </div>
              <div className="text-white/70 text-sm md:text-base font-light">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
