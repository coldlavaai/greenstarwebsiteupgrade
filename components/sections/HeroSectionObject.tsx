'use client';

import { motion } from 'framer-motion';
import { urlFor } from '@/lib/sanity';
import { ArrowRight } from 'lucide-react';

interface Button {
  text: string;
  url: string;
  style: 'primary' | 'secondary' | 'ghost';
}

interface HeroSectionObjectProps {
  data: {
    heading?: string;
    subheading?: string;
    backgroundImage?: any;
    buttons?: Button[];
    height?: 'small' | 'medium' | 'large' | 'fullscreen';
    textAlignment?: 'left' | 'center' | 'right';
    overlay?: boolean;
  };
}

const heightMap: Record<string, string> = {
  small: 'min-h-[400px]',
  medium: 'min-h-[600px]',
  large: 'min-h-[800px]',
  fullscreen: 'min-h-screen',
};

const alignmentMap: Record<string, string> = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
};

export default function HeroSectionObject({ data }: HeroSectionObjectProps) {
  const heightClass = heightMap[data.height || 'large'];
  const alignmentClass = alignmentMap[data.textAlignment || 'center'];
  const backgroundImageUrl = data.backgroundImage
    ? urlFor(data.backgroundImage).width(1920).quality(90).quality(85).url()
    : null;

  const getButtonClasses = (style: string) => {
    switch (style) {
      case 'primary':
        return 'bg-primary text-white hover:bg-primary-dark shadow-lg';
      case 'secondary':
        return 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg';
      case 'ghost':
        return 'bg-transparent border-2 border-white text-white hover:bg-white/10';
      default:
        return 'bg-primary text-white hover:bg-primary-dark shadow-lg';
    }
  };

  return (
    <section className={`relative ${heightClass} flex items-center justify-center overflow-hidden`}>
      {/* Background Image */}
      {backgroundImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      )}

      {/* Overlay */}
      {data.overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`flex flex-col ${alignmentClass} max-w-4xl ${
            data.textAlignment === 'center' ? 'mx-auto' : ''
          }`}
        >
          {/* Heading */}
          {data.heading && (
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {data.heading}
            </motion.h1>
          )}

          {/* Subheading */}
          {data.subheading && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-10 max-w-3xl leading-relaxed"
            >
              {data.subheading}
            </motion.p>
          )}

          {/* Buttons */}
          {data.buttons && data.buttons.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className={`flex flex-wrap gap-4 ${
                data.textAlignment === 'center'
                  ? 'justify-center'
                  : data.textAlignment === 'right'
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              {data.buttons.map((button, index) => (
                <motion.a
                  key={index}
                  href={button.url}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center space-x-2 px-8 py-4 rounded-full font-semibold transition-all ${getButtonClasses(
                    button.style
                  )}`}
                >
                  <span>{button.text}</span>
                  {button.style === 'primary' && <ArrowRight className="w-5 h-5" />}
                </motion.a>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
    </section>
  );
}
