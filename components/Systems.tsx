'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Home, Building2, Battery, Sun, ArrowRight, Zap } from 'lucide-react';
import { urlFor } from '@/lib/sanity';

interface Service {
  _id: string;
  _type: string;
  title: string;
  description: string;
  features?: string[];
  icon?: string;
  image?: any;
  category?: string;
}

interface SystemsProps {
  data?: Service[];
}

const Systems = ({ data }: SystemsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Icon mapping
  const iconMap: Record<string, any> = {
    Sun: Sun,
    Battery: Battery,
    Building2: Building2,
    Zap: Zap,
    Home: Home,
  };

  // Hardcoded image URLs as fallbacks
  const imageMap: Record<string, string> = {
    'Solar Panels for Home': 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_855615596.jpeg',
    'Battery Storage for Home': 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_553388506--281-29.jpeg',
    'Solar Panels for Business': 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_586564893-0f77e5a0-84f93a01.jpeg',
    'Battery Storage for Business': 'https://irp.cdn-website.com/8f142869/dms3rep/multi/Blog_image_2.webp',
  };

  const linkMap: Record<string, string> = {
    'Solar Panels for Home': '/solar-panels-home',
    'Battery Storage for Home': '/battery-storage-home',
    'Solar Panels for Business': '/solar-panels-business',
    'Battery Storage for Business': '/battery-storage-business',
  };

  // Map CMS data to component format or use fallback
  const services = data?.map(service => {
    // Safely get image URL - check if image exists and has asset reference
    let imageUrl = imageMap[service.title] || '';
    if (service.image && service.image.asset) {
      try {
        imageUrl = urlFor(service.image).width(800).url();
      } catch (e) {
        // If URL building fails, use fallback
        imageUrl = imageMap[service.title] || '';
      }
    }

    return {
      _id: service._id,
      _type: service._type,
      icon: service.icon ? (iconMap[service.icon] || Sun) : Sun,
      title: service.title,
      description: service.description,
      features: service.features || [],
      image: imageUrl,
      link: linkMap[service.title] || `/${service.category || 'services'}`,
    };
  }) || [
    {
      icon: Sun,
      title: 'Solar Panels for Home',
      description: 'Transform your home with our premium residential solar panel installations. Reduce your electricity bills and increase your property value.',
      features: ['Free energy assessment', 'Custom system design', '25-year warranty', 'Smart monitoring'],
      image: 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_855615596.jpeg',
      link: '/solar-panels-home',
    },
    {
      icon: Battery,
      title: 'Battery Storage for Home',
      description: 'Store excess solar energy and use it when you need it most. Achieve energy independence with our advanced battery solutions.',
      features: ['24/7 backup power', 'Peak shaving', 'Seamless integration', 'Smart controls'],
      image: 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_553388506--281-29.jpeg',
      link: '/battery-storage-home',
    },
    {
      icon: Building2,
      title: 'Solar Panels for Business',
      description: 'Reduce operational costs and demonstrate environmental responsibility with commercial solar installations.',
      features: ['ROI analysis', 'Scalable solutions', 'Tax incentives', 'Minimal downtime'],
      image: 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_586564893-0f77e5a0-84f93a01.jpeg',
      link: '/solar-panels-business',
    },
    {
      icon: Zap,
      title: 'Battery Storage for Business',
      description: 'Ensure business continuity and optimize energy costs with commercial-grade battery storage systems.',
      features: ['Demand response', 'Grid independence', 'Load management', 'Remote monitoring'],
      image: 'https://irp.cdn-website.com/8f142869/dms3rep/multi/Blog_image_2.webp',
      link: '/battery-storage-business',
    },
  ];

  return (
    <section id="systems" ref={ref} className="py-16 md:py-24 bg-transparent relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-4 md:mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          >
            <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-accent"></div>
            <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent font-semibold text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em]">
              Our Solutions
            </span>
            <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-accent"></div>
          </motion.div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            Tailored Solar & Storage{' '}
            <span className="bg-gradient-to-r from-accent via-primary-light to-accent bg-clip-text text-transparent">Systems</span>
          </h2>
          <p className="text-base md:text-xl lg:text-2xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed px-4">
            Whether you're a homeowner or business owner, we have the perfect renewable energy solution for your needs
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 md:mt-20"
        >
          <p className="text-white/60 mb-6 md:mb-8 text-base md:text-xl font-light">
            Not sure which system is right for you?
          </p>
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(140,198,63,0.4)' }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="inline-block bg-gradient-to-r from-primary via-primary-dark to-primary text-white px-8 py-4 md:px-12 md:py-5 rounded-full font-semibold text-base md:text-lg hover:shadow-2xl transition-all relative overflow-hidden group"
          >
            <span className="relative z-10 tracking-wide">Schedule Free Consultation</span>
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

// Premium Minimal Card Component
const ServiceCard = ({ service, index, isInView }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={service.link}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-3xl overflow-hidden cursor-pointer h-full block"
      style={{
        boxShadow: isHovered
          ? '0 25px 70px rgba(212, 175, 55, 0.3), 0 0 0 1px rgba(212, 175, 55, 0.2)'
          : '0 8px 30px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        transition: 'box-shadow 0.4s ease',
      }}
    >
      {/* Background Image with Subtle Zoom */}
      <div className="absolute inset-0">
        <motion.div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('${service.image}')`,
          }}
          animate={{
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        {/* Gradient overlay - creates depth */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/60"
          animate={{
            opacity: isHovered ? 0.85 : 0.95,
          }}
          transition={{ duration: 0.4 }}
        />
        {/* Accent gradient on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-primary/20 to-transparent"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-10 h-full min-h-[420px] md:min-h-[520px] flex flex-col">
        {/* Glass morphism icon container */}
        <motion.div
          className="mb-5 md:mb-8"
          animate={{
            scale: isHovered ? 1.1 : 1,
            y: isHovered ? -4 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <service.icon className="w-7 h-7 md:w-10 md:h-10 text-primary relative z-10" />
          </div>
        </motion.div>

        {/* Title with premium typography */}
        <motion.h3
          className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 tracking-tight leading-tight"
          style={{ fontFamily: 'var(--font-playfair)' }}
          animate={{
            y: isHovered ? -4 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {service.title}
        </motion.h3>

        <p className="text-white/70 mb-5 md:mb-8 leading-relaxed text-sm md:text-base font-light">
          {service.description}
        </p>

        {/* Features List with premium styling */}
        <ul className="space-y-2 md:space-y-3.5 mb-5 md:mb-8 flex-grow">
          {service.features.map((feature: string, idx: number) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? {
                opacity: 1,
                x: 0,
              } : { opacity: 0, x: -10 }}
              transition={{
                delay: index * 0.1 + idx * 0.05,
                duration: 0.3,
              }}
              className="flex items-center space-x-2 md:space-x-3 text-white/80 text-sm md:text-base group/item"
            >
              <motion.div
                className="flex-shrink-0 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-primary to-primary-light shadow-lg"
                animate={{
                  scale: isHovered ? 1.3 : 1,
                }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
              />
              <span className="group-hover/item:text-white transition-colors">{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* Glass morphism CTA button */}
        <motion.div
          className="inline-flex items-center space-x-2 md:space-x-3 self-start group/btn"
          animate={{
            x: isHovered ? 8 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-white font-semibold text-sm md:text-base border-b-2 border-primary/50 group-hover/btn:border-primary transition-colors pb-1">
            Learn More
          </span>
          <motion.div
            animate={{
              x: isHovered ? 4 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          </motion.div>
        </motion.div>
      </div>

      {/* Premium accent line on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Corner accent */}
      <motion.div
        className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-full"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
};

export default Systems;
