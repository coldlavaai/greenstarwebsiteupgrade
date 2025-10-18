'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Home, Building2, Battery, Sun, ArrowRight, Zap } from 'lucide-react';

const Systems = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: Sun,
      title: 'Solar Panels for Home',
      description: 'Transform your home with our premium residential solar panel installations. Reduce your electricity bills and increase your property value.',
      features: ['Free energy assessment', 'Custom system design', '25-year warranty', 'Smart monitoring'],
      image: 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_855615596.jpeg',
    },
    {
      icon: Battery,
      title: 'Battery Storage for Home',
      description: 'Store excess solar energy and use it when you need it most. Achieve energy independence with our advanced battery solutions.',
      features: ['24/7 backup power', 'Peak shaving', 'Seamless integration', 'Smart controls'],
      image: 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_553388506--281-29.jpeg',
    },
    {
      icon: Building2,
      title: 'Solar Panels for Business',
      description: 'Reduce operational costs and demonstrate environmental responsibility with commercial solar installations.',
      features: ['ROI analysis', 'Scalable solutions', 'Tax incentives', 'Minimal downtime'],
      image: 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_586564893-0f77e5a0-84f93a01.jpeg',
    },
    {
      icon: Zap,
      title: 'Battery Storage for Business',
      description: 'Ensure business continuity and optimize energy costs with commercial-grade battery storage systems.',
      features: ['Demand response', 'Grid independence', 'Load management', 'Remote monitoring'],
      image: 'https://irp.cdn-website.com/8f142869/dms3rep/multi/Blog_image_2.webp',
    },
  ];

  return (
    <section id="systems" ref={ref} className="py-24 bg-transparent relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block text-[#8cc63f] font-semibold text-sm uppercase tracking-wider mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          >
            Our Solutions
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Tailored Solar & Storage <span className="bg-gradient-to-r from-[#8cc63f] to-[#7ab52f] bg-clip-text text-transparent">Systems</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Whether you're a homeowner or business owner, we have the perfect renewable energy solution for your needs
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6 text-lg">
            Not sure which system is right for you?
          </p>
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(140,198,63,0.3)' }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="inline-block bg-gradient-to-r from-[#8cc63f] to-[#7ab52f] text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all relative overflow-hidden group"
          >
            <span className="relative z-10">Schedule Free Consultation</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer h-full"
      style={{
        boxShadow: isHovered ? '0 20px 60px rgba(140, 198, 63, 0.4)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
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
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        {/* Black overlay - lighter on hover */}
        <motion.div
          className="absolute inset-0 bg-black"
          animate={{
            opacity: isHovered ? 0.5 : 0.7,
          }}
          transition={{ duration: 0.4 }}
        />
        {/* Subtle green accent border on hover */}
        <motion.div
          className="absolute inset-0"
          style={{
            border: '2px solid rgba(140, 198, 63, 0)',
          }}
          animate={{
            borderColor: isHovered ? 'rgba(140, 198, 63, 0.5)' : 'rgba(140, 198, 63, 0)',
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 h-full min-h-[480px] flex flex-col">
        {/* Icon - Subtle scale on hover */}
        <motion.div
          className="mb-6"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <service.icon className="w-8 h-8 text-[#8cc63f]" />
          </div>
        </motion.div>

        {/* Title - Subtle lift on hover */}
        <motion.h3
          className="text-2xl font-bold text-white mb-3"
          animate={{
            y: isHovered ? -2 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {service.title}
        </motion.h3>

        <p className="text-white/80 mb-6 leading-relaxed text-sm">
          {service.description}
        </p>

        {/* Features List - Stagger animation on hover */}
        <ul className="space-y-2.5 mb-6 flex-grow">
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
              className="flex items-center space-x-2 text-white/70 text-sm"
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#8cc63f]"
                animate={{
                  scale: isHovered ? 1.3 : 1,
                }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
              />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button - Minimal hover effect */}
        <motion.a
          href="#contact"
          className="inline-flex items-center space-x-2 text-white font-medium text-sm self-start group/btn"
          animate={{
            x: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <span className="border-b border-white/30 group-hover/btn:border-[#8cc63f] transition-colors">
            Learn More
          </span>
          <ArrowRight className="w-4 h-4 text-[#8cc63f]" />
        </motion.a>
      </div>

      {/* Subtle green glow on hover - bottom accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8cc63f] to-transparent"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default Systems;
