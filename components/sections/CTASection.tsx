'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  data: {
    title?: string;
    description?: string;
    primaryButton?: {
      text: string;
      link: string;
    };
    secondaryButton?: {
      text: string;
      link: string;
    };
    backgroundColor?: string;
    layout?: string;
  };
}

const bgColorMap: Record<string, string> = {
  white: 'bg-white',
  'light-gray': 'bg-gray-50',
  primary: 'bg-gradient-to-br from-primary to-primary-dark',
  dark: 'bg-gray-900',
};

export default function CTASection({ data }: CTASectionProps) {
  const bgClass = bgColorMap[data.backgroundColor || 'primary'] || bgColorMap.primary;
  const isDark = data.backgroundColor === 'primary' || data.backgroundColor === 'dark';
  const textColor = isDark ? 'text-white' : 'text-gray-900';

  return (
    <section className={`py-16 md:py-24 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl mx-auto text-center ${data.layout === 'side-by-side' ? 'md:text-left md:flex md:items-center md:justify-between' : ''}`}>
          <div className={data.layout === 'side-by-side' ? 'md:flex-1 md:pr-8' : ''}>
            {data.title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 ${textColor}`}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {data.title}
              </motion.h2>
            )}

            {data.description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`text-base md:text-lg mb-8 ${isDark ? 'text-white/80' : 'text-gray-600'}`}
              >
                {data.description}
              </motion.p>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center md:justify-start"
          >
            {data.primaryButton && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={data.primaryButton.link}
                className={`inline-flex items-center space-x-2 px-8 py-4 rounded-full font-semibold transition-all shadow-lg ${
                  isDark
                    ? 'bg-white text-gray-900 hover:bg-gray-100'
                    : 'bg-primary text-white hover:bg-primary-dark'
                }`}
              >
                <span>{data.primaryButton.text}</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            )}

            {data.secondaryButton && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={data.secondaryButton.link}
                className={`inline-flex items-center space-x-2 px-8 py-4 rounded-full font-semibold transition-all border-2 ${
                  isDark
                    ? 'border-white/30 text-white hover:bg-white/10'
                    : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span>{data.secondaryButton.text}</span>
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
