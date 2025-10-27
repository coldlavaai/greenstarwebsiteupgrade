'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

interface Stat {
  number: string;
  label: string;
  icon?: string;
}

interface StatsSectionProps {
  data: {
    title?: string;
    subtitle?: string;
    stats?: Stat[];
    layout?: '2-col' | '3-col' | '4-col' | 'row';
    backgroundColor?: 'white' | 'light-gray' | 'primary' | 'dark';
    textColor?: 'dark' | 'white';
    padding?: 'small' | 'medium' | 'large';
  };
}

const layoutMap: Record<string, string> = {
  '2-col': 'md:grid-cols-2',
  '3-col': 'md:grid-cols-2 lg:grid-cols-3',
  '4-col': 'grid-cols-2 lg:grid-cols-4',
  row: 'md:grid-cols-auto md:grid-flow-col md:auto-cols-fr',
};

const bgColorMap: Record<string, string> = {
  white: 'bg-white',
  'light-gray': 'bg-gray-50',
  primary: 'bg-gradient-to-br from-primary to-primary-dark',
  dark: 'bg-gray-900',
};

const paddingMap: Record<string, string> = {
  small: 'py-8 md:py-12',
  medium: 'py-16 md:py-24',
  large: 'py-24 md:py-32',
};

export default function StatsSection({ data }: StatsSectionProps) {
  const layoutClass = layoutMap[data.layout || '4-col'];
  const bgClass = bgColorMap[data.backgroundColor || 'primary'];
  const paddingClass = paddingMap[data.padding || 'medium'];
  const isLightText = data.textColor === 'white' || data.backgroundColor === 'primary' || data.backgroundColor === 'dark';
  const textColor = isLightText ? 'text-white' : 'text-gray-900';
  const subtextColor = isLightText ? 'text-white/80' : 'text-gray-600';

  const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || null;
  };

  return (
    <section className={`${bgClass} ${paddingClass}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        {(data.title || data.subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            {data.title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${textColor}`}
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

        {/* Stats Grid */}
        {data.stats && data.stats.length > 0 && (
          <div className={`grid ${layoutClass} gap-8 md:gap-12`}>
            {data.stats.map((stat, index) => {
              const IconComponent = getIcon(stat.icon);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  {/* Icon or Emoji */}
                  {stat.icon && (
                    <div className="mb-4 flex justify-center">
                      {IconComponent ? (
                        <div className={`w-12 h-12 rounded-lg ${isLightText ? 'bg-white/10' : 'bg-primary/10'} flex items-center justify-center`}>
                          <IconComponent className={`w-6 h-6 ${isLightText ? 'text-white' : 'text-primary'}`} />
                        </div>
                      ) : (
                        <span className="text-4xl">{stat.icon}</span>
                      )}
                    </div>
                  )}

                  {/* Number */}
                  <div
                    className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-2 ${textColor}`}
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {stat.number}
                  </div>

                  {/* Label */}
                  <div className={`text-lg md:text-xl ${subtextColor}`}>
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
