'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface PricingPlan {
  name: string;
  price: string;
  description?: string;
  features?: { feature: string; included: boolean }[];
  highlighted?: boolean;
  highlightLabel?: string;
  buttonText?: string;
  buttonLink?: string;
}

interface PricingSectionProps {
  data: {
    title?: string;
    subtitle?: string;
    plans?: PricingPlan[];
    layout?: '1-col' | '2-col' | '3-col';
    backgroundColor?: 'white' | 'light-gray' | 'dark';
    padding?: 'small' | 'medium' | 'large';
  };
}

const layoutMap: Record<string, string> = {
  '1-col': 'max-w-md mx-auto',
  '2-col': 'md:grid-cols-2 max-w-4xl mx-auto',
  '3-col': 'md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto',
};

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

export default function PricingSection({ data }: PricingSectionProps) {
  const bgClass = bgColorMap[data.backgroundColor || 'light-gray'];
  const paddingClass = paddingMap[data.padding || 'large'];
  const layoutClass = layoutMap[data.layout || '3-col'];
  const isDark = data.backgroundColor === 'dark';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subtextColor = isDark ? 'text-white/80' : 'text-gray-600';

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

        {/* Pricing Plans */}
        {data.plans && data.plans.length > 0 && (
          <div className={`grid grid-cols-1 ${layoutClass} gap-8`}>
            {data.plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-xl p-8 flex flex-col ${
                  plan.highlighted ? 'ring-4 ring-primary scale-105 z-10' : ''
                }`}
              >
                {/* Highlight Label */}
                {plan.highlighted && plan.highlightLabel && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {plan.highlightLabel}
                    </span>
                  </div>
                )}

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-4xl md:text-5xl font-bold text-gray-900">{plan.price}</span>
                </div>

                {/* Description */}
                {plan.description && (
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                )}

                {/* Features */}
                {plan.features && plan.features.length > 0 && (
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? 'text-gray-900' : 'text-gray-400 line-through'}>
                          {feature.feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Button */}
                {plan.buttonText && (
                  <motion.a
                    href={plan.buttonLink || '#'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full px-8 py-4 rounded-full font-semibold text-center transition-all ${
                      plan.highlighted
                        ? 'bg-primary text-white hover:bg-primary-dark shadow-lg'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.buttonText}
                  </motion.a>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
