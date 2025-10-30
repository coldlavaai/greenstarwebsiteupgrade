'use client';

import { motion } from 'framer-motion';
import { urlFor } from '@/lib/sanity';

interface Logo {
  logo: any;
  name: string;
  link?: string;
}

interface LogoCloudSectionProps {
  data: {
    title?: string;
    subtitle?: string;
    logos?: Logo[];
    layout?: 'grid' | 'row' | 'carousel';
    itemsPerRow?: number;
    logoSize?: 'small' | 'medium' | 'large';
    grayscale?: boolean;
    backgroundColor?: 'white' | 'light-gray' | 'dark-gray';
    padding?: 'small' | 'medium' | 'large';
  };
}

const bgColorMap: Record<string, string> = {
  white: 'bg-white',
  'light-gray': 'bg-gray-50',
  'dark-gray': 'bg-gray-900',
};

const paddingMap: Record<string, string> = {
  small: 'py-8 md:py-12',
  medium: 'py-16 md:py-24',
  large: 'py-24 md:py-32',
};

const sizeMap: Record<string, string> = {
  small: 'h-12',
  medium: 'h-16',
  large: 'h-24',
};

export default function LogoCloudSection({ data }: LogoCloudSectionProps) {
  const bgClass = bgColorMap[data.backgroundColor || 'light-gray'];
  const paddingClass = paddingMap[data.padding || 'medium'];
  const sizeClass = sizeMap[data.logoSize || 'medium'];
  const isDark = data.backgroundColor === 'dark-gray';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subtextColor = isDark ? 'text-white/80' : 'text-gray-600';

  const gridCols = data.itemsPerRow || 4;
  const gridClass = `grid-cols-2 md:grid-cols-${Math.min(gridCols, 4)} lg:grid-cols-${gridCols}`;

  return (
    <section className={`${bgClass} ${paddingClass}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        {(data.title || data.subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            {data.title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-3xl md:text-4xl font-bold mb-4 ${textColor}`}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {data.title}
              </motion.h2>
            )}
            {data.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`text-lg ${subtextColor}`}
              >
                {data.subtitle}
              </motion.p>
            )}
          </div>
        )}

        {/* Logos Grid */}
        {data.logos && data.logos.length > 0 && (
          <div className={`grid ${gridClass} gap-8 md:gap-12 items-center justify-items-center`}>
            {data.logos.map((logo, index) => {
              const logoUrl = urlFor(logo.logo).width(400).quality(85).url();

              const LogoImage = (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`${sizeClass} flex items-center justify-center p-4`}
                >
                  <img
                    src={logoUrl}
                    alt={logo.name}
                    className={`max-h-full w-auto object-contain ${
                      data.grayscale
                        ? 'grayscale hover:grayscale-0 opacity-60 hover:opacity-100'
                        : 'opacity-80 hover:opacity-100'
                    } transition-all duration-300`}
                  />
                </motion.div>
              );

              return logo.link ? (
                <a
                  key={index}
                  href={logo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {LogoImage}
                </a>
              ) : (
                <div key={index}>{LogoImage}</div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
