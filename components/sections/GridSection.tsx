'use client';

import { motion } from 'framer-motion';
import { urlFor } from '@/lib/sanity';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface GridItem {
  title: string;
  description?: string;
  image?: any;
  icon?: string;
  link?: string;
}

interface GridSectionProps {
  data: {
    title?: string;
    description?: string;
    items?: GridItem[];
    columns?: 2 | 3 | 4;
    cardStyle?: 'plain' | 'card' | 'shadow';
    backgroundColor?: 'white' | 'gray' | 'primary';
  };
}

const bgColorMap: Record<string, string> = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  primary: 'bg-gradient-to-br from-primary/10 to-primary/5',
};

const columnMap: Record<number, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
};

const cardStyleMap: Record<string, string> = {
  plain: '',
  card: 'border border-gray-200 bg-white',
  shadow: 'bg-white shadow-lg hover:shadow-xl transition-shadow',
};

export default function GridSection({ data }: GridSectionProps) {
  const bgClass = bgColorMap[data.backgroundColor || 'white'];
  const columnClass = columnMap[data.columns || 3];
  const cardStyleClass = cardStyleMap[data.cardStyle || 'card'];
  const isDarkBg = data.backgroundColor === 'primary';

  const getIcon = (iconName?: string): LucideIcon | null => {
    if (!iconName) return null;
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || null;
  };

  return (
    <section className={`py-16 md:py-24 ${bgClass}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        {(data.title || data.description) && (
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            {data.title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
                  isDarkBg ? 'text-gray-900' : 'text-gray-900'
                }`}
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
                className="text-lg text-gray-600"
              >
                {data.description}
              </motion.p>
            )}
          </div>
        )}

        {/* Grid */}
        {data.items && data.items.length > 0 && (
          <div className={`grid grid-cols-1 ${columnClass} gap-6 md:gap-8`}>
            {data.items.map((item, index) => {
              const IconComponent = getIcon(item.icon);
              const imageUrl = item.image
                ? urlFor(item.image).width(600).height(400).fit('crop').quality(85).url()
                : null;

              const CardContent = (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 md:p-8 rounded-xl ${cardStyleClass} ${
                    item.link ? 'cursor-pointer group' : ''
                  } h-full flex flex-col`}
                >
                  {/* Image or Icon */}
                  {imageUrl ? (
                    <div className="mb-6 rounded-lg overflow-hidden aspect-video">
                      <img
                        src={imageUrl}
                        alt={item.image.alt || item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : IconComponent ? (
                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  ) : null}

                  {/* Title */}
                  <h3
                    className="text-xl md:text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  {item.description && (
                    <p className="text-gray-600 leading-relaxed flex-grow">
                      {item.description}
                    </p>
                  )}

                  {/* Link Arrow */}
                  {item.link && (
                    <div className="mt-4 flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                      <span>Learn more</span>
                      <Icons.ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  )}
                </motion.div>
              );

              return item.link ? (
                <a key={index} href={item.link} className="block">
                  {CardContent}
                </a>
              ) : (
                <div key={index}>{CardContent}</div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
