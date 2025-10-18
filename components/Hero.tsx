'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sun, Battery, Zap, Sparkles } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { urlFor } from '@/lib/sanity';

interface HeroData {
  _id?: string;
  _type?: string;
  heading?: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: any;
  stats?: Array<{
    _key?: string;
    value: string;
    label: string;
  }>;
}

interface HeroProps {
  data?: HeroData;
}

const Hero = ({ data }: HeroProps) => {
  const ref = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: Sun, text: 'Solar Panels', color: 'from-orange-400 to-yellow-500' },
    { icon: Battery, text: 'Battery Storage', color: 'from-[#8cc63f] to-[#7ab52f]' },
    { icon: Zap, text: 'Energy Savings', color: 'from-green-400 to-emerald-500' },
  ];

  // Use stats from CMS or fallback to default
  const stats = data?.stats || [
    { value: '15+', label: 'Years Experience' },
    { value: '500+', label: 'Happy Customers' },
  ];

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20 md:pt-24">
      {/* Very subtle text shadow overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none"></div>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="container mx-auto px-4 relative z-10 mt-4 md:mt-8">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="text-white max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 md:space-x-3 mb-6 md:mb-8"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary via-primary-light to-primary flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </motion.div>
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent font-semibold text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em]">
                Premium Solar Solutions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
              data-sanity={data?._id ? `${data._id}.heading` : undefined}
            >
              {data?.heading || 'Power Your Future with'}{' '}
              <motion.span
                className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent bg-[length:200%_auto]"
                animate={{ backgroundPosition: ['0% center', '200% center'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{ textShadow: '0 0 80px rgba(140, 198, 63, 0.3)' }}
              >
                Solar Energy
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base md:text-lg lg:text-xl text-gray-200 mb-6 md:mb-8 leading-relaxed font-light"
              data-sanity={data?._id ? `${data._id}.subheading` : undefined}
            >
              {data?.subheading || 'Bespoke solar energy systems designed to perfectly match your unique requirements. Save money, reduce your carbon footprint, and achieve true energy independence.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-10"
            >
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(140,198,63,0.5)' }}
                whileTap={{ scale: 0.95 }}
                href={data?.ctaLink || "#contact"}
                className="group relative bg-gradient-to-r from-primary via-primary-dark to-primary text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm md:text-base overflow-hidden shadow-2xl ring-2 ring-primary/30 ring-offset-2 ring-offset-transparent"
                data-sanity={data?._id ? `${data._id}.ctaText` : undefined}
              >
                <span className="relative z-10 flex items-center space-x-2 md:space-x-3">
                  <span className="tracking-wide">{data?.ctaText || 'Get Free Survey'}</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>

              <motion.a
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderColor: 'rgba(140,198,63,0.8)',
                  boxShadow: '0 20px 40px rgba(140,198,63,0.3)',
                }}
                whileTap={{ scale: 0.95 }}
                href={data?.secondaryCtaLink || "#systems"}
                className="group relative backdrop-blur-xl bg-white/5 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm md:text-base border-2 border-white/20 transition-all shadow-xl"
                data-sanity={data?._id ? `${data._id}.secondaryCtaText` : undefined}
              >
                <span className="flex items-center space-x-2 md:space-x-3">
                  <span className="tracking-wide">{data?.secondaryCtaText || 'Explore Systems'}</span>
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sun className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </motion.span>
                </span>
              </motion.a>
            </motion.div>

            {/* Features with premium animations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-3 gap-2 md:gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{
                    y: -6,
                    scale: 1.03,
                    transition: { type: 'spring', stiffness: 300, damping: 20 }
                  }}
                  className="group relative cursor-pointer"
                >
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-2 md:p-4 rounded-lg md:rounded-xl hover:bg-white/10 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(140,198,63,0.3)] hover:border-[#8cc63f]/50">
                    {/* Gradient glow effect on hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 rounded-lg md:rounded-xl blur-xl transition-opacity duration-300`}
                    />

                    <div className={`relative bg-gradient-to-br ${feature.color} p-1.5 md:p-2.5 rounded-md md:rounded-lg mb-1 md:mb-2 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </div>
                    <span className="text-[10px] md:text-xs font-semibold text-white/90 group-hover:text-white transition-colors">
                      {feature.text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Premium 3D Card Effect */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotateY: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative w-[450px] mx-auto"
            >
              {/* Main Image Card with 3D effect */}
              <div
                className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-xl bg-white/5 w-full"
                data-sanity={data?._id ? `${data._id}.backgroundImage` : undefined}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: data?.backgroundImage
                      ? `url('${urlFor(data.backgroundImage).width(800).url()}')`
                      : `url('/images/hero-house.png')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#8cc63f]/30 via-transparent to-[#8cc63f]/30" />
              </div>

              {/* Floating Stats Cards with premium effects */}
              {stats.map((stat, index) => (
                <motion.div
                  key={stat._key || index}
                  initial={{ opacity: 0, scale: 0, rotateZ: index === 0 ? -10 : 10 }}
                  animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
                  transition={{ delay: 1.2 + index * 0.2, type: 'spring' }}
                  whileHover={{ scale: 1.1, rotateZ: index === 0 ? 5 : -5, y: -10 }}
                  className={`absolute ${index === 0 ? 'top-10 -left-10' : 'bottom-10 -right-10'} bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-2xl hover:shadow-[0_20px_60px_rgba(140,198,63,0.4)] cursor-pointer`}
                  style={{ transformStyle: 'preserve-3d' }}
                  data-sanity={data?._id && stat._key ? `${data._id}.stats[_key=="${stat._key}"]` : undefined}
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#8cc63f] to-[#7ab52f] bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white font-semibold">{stat.label}</div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#8cc63f] to-[#7ab52f] opacity-0 hover:opacity-20 rounded-3xl blur transition-opacity" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Premium Scroll Indicator - hides when scrolled */}
      {!scrolled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            <div className="w-8 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2 backdrop-blur-sm bg-white/5">
              <motion.div
                className="w-1.5 h-3 bg-gradient-to-b from-[#8cc63f] to-white rounded-full"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-[#8cc63f] to-[#7ab52f] opacity-50 blur-xl animate-pulse" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
