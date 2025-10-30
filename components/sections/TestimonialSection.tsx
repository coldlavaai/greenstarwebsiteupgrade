'use client';

import { motion } from 'framer-motion';
import { urlFor } from '@/lib/sanity';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  customerName: string;
  customerTitle?: string;
  customerImage?: any;
  rating?: number;
}

interface TestimonialSectionProps {
  data: {
    title?: string;
    subtitle?: string;
    testimonials?: Testimonial[];
    layout?: 'grid-2' | 'grid-3' | 'carousel' | 'single';
    backgroundColor?: 'white' | 'light-gray' | 'dark-gray' | 'primary';
    padding?: 'none' | 'small' | 'medium' | 'large';
  };
}

const bgColorMap: Record<string, string> = {
  white: 'bg-white',
  'light-gray': 'bg-gray-50',
  'dark-gray': 'bg-gray-900',
  primary: 'bg-gradient-to-br from-primary/10 to-primary/5',
};

const paddingMap: Record<string, string> = {
  none: 'py-0',
  small: 'py-8 md:py-12',
  medium: 'py-16 md:py-24',
  large: 'py-24 md:py-32',
};

const layoutMap: Record<string, string> = {
  'grid-2': 'md:grid-cols-2',
  'grid-3': 'md:grid-cols-2 lg:grid-cols-3',
  carousel: 'md:grid-cols-1',
  single: 'md:grid-cols-1',
};

export default function TestimonialSection({ data }: TestimonialSectionProps) {
  const bgClass = bgColorMap[data.backgroundColor || 'white'];
  const paddingClass = paddingMap[data.padding || 'medium'];
  const layoutClass = layoutMap[data.layout || 'grid-3'];
  const isDark = data.backgroundColor === 'dark-gray';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subtextColor = isDark ? 'text-white/80' : 'text-gray-600';

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex space-x-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
    );
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

        {/* Testimonials Grid */}
        {data.testimonials && data.testimonials.length > 0 && (
          <div className={`grid grid-cols-1 ${layoutClass} gap-8`}>
            {data.testimonials.map((testimonial, index) => {
              const imageUrl = testimonial.customerImage
                ? urlFor(testimonial.customerImage).width(200).height(200).fit('crop').quality(85).url()
                : null;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  } rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow ${
                    data.layout === 'single' ? 'max-w-3xl mx-auto' : ''
                  }`}
                >
                  {/* Quote Icon */}
                  <Quote className={`w-10 h-10 mb-4 ${isDark ? 'text-primary/40' : 'text-primary/20'}`} />

                  {/* Rating */}
                  {renderStars(testimonial.rating)}

                  {/* Quote */}
                  <blockquote className={`text-lg md:text-xl mb-6 leading-relaxed ${textColor}`}>
                    &quot;{testimonial.quote}&quot;
                  </blockquote>

                  {/* Customer Info */}
                  <div className="flex items-center space-x-4">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={testimonial.customerName}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">
                          {testimonial.customerName.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className={`font-semibold ${textColor}`}>
                        {testimonial.customerName}
                      </div>
                      {testimonial.customerTitle && (
                        <div className={`text-sm ${subtextColor}`}>
                          {testimonial.customerTitle}
                        </div>
                      )}
                    </div>
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
