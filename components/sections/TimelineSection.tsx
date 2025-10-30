'use client';

import { motion } from 'framer-motion';
import { urlFor } from '@/lib/sanity';
import * as Icons from 'lucide-react';

interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
  image?: any;
  icon?: string;
}

interface TimelineSectionProps {
  data: {
    title?: string;
    subtitle?: string;
    events?: TimelineEvent[];
    layout?: 'vertical-left' | 'vertical-center' | 'vertical-alternating' | 'horizontal';
    backgroundColor?: 'white' | 'light-gray' | 'dark';
    padding?: 'small' | 'medium' | 'large';
  };
}

const bgColorMap: Record<string, string> = {
  white: 'bg-white',
  'light-gray': 'bg-gray-50',
  dark: 'bg-gray-900',
};

const paddingMap: Record<string, string> = {
  small: 'py-8 md:py-12',
  medium: 'py-16 md:py-24',
  large: 'py-24 md:py-32',
};

export default function TimelineSection({ data }: TimelineSectionProps) {
  const bgClass = bgColorMap[data.backgroundColor || 'white'];
  const paddingClass = paddingMap[data.padding || 'medium'];
  const isDark = data.backgroundColor === 'dark';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subtextColor = isDark ? 'text-white/80' : 'text-gray-600';

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

        {/* Timeline Events */}
        {data.events && data.events.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30" />

              {/* Events */}
              {data.events.map((event, index) => {
                const IconComponent = getIcon(event.icon);
                const imageUrl = event.image ? urlFor(event.image).width(600).height(400).fit('crop').quality(85).url() : null;
                const isAlternating = data.layout === 'vertical-alternating';
                const isRight = isAlternating && index % 2 === 1;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isRight ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex items-center mb-12 ${isRight ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-lg z-10" />

                    {/* Content */}
                    <div className={`ml-20 md:ml-0 ${isRight ? 'md:mr-[calc(50%+2rem)]' : 'md:ml-[calc(50%+2rem)]'} w-full md:w-[calc(50%-2rem)]`}>
                      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-lg`}>
                        {/* Date */}
                        <div className="text-primary font-semibold mb-2">{event.date}</div>

                        {/* Icon/Emoji */}
                        {event.icon && (
                          <div className="mb-3">
                            {IconComponent ? (
                              <IconComponent className={`w-8 h-8 ${isDark ? 'text-white' : 'text-primary'}`} />
                            ) : (
                              <span className="text-3xl">{event.icon}</span>
                            )}
                          </div>
                        )}

                        {/* Image */}
                        {imageUrl && (
                          <div className="mb-4 rounded-lg overflow-hidden">
                            <img src={imageUrl} alt={event.title} className="w-full h-auto" />
                          </div>
                        )}

                        {/* Title */}
                        <h3 className={`text-xl font-bold mb-2 ${textColor}`}>{event.title}</h3>

                        {/* Description */}
                        {event.description && (
                          <p className={subtextColor}>{event.description}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
