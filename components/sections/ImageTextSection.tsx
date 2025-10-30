'use client';

import { motion } from 'framer-motion';
import { urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { ArrowRight } from 'lucide-react';

interface ImageTextSectionProps {
  data: {
    heading?: string;
    content?: any;
    image?: any;
    imagePosition?: 'left' | 'right';
    button?: {
      text: string;
      url: string;
      style: 'primary' | 'secondary';
    };
    backgroundColor?: 'white' | 'gray';
  };
}

const portableTextComponents = {
  marks: {
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        className="text-primary hover:text-primary-dark underline transition-colors"
      >
        {children}
      </a>
    ),
  },
  block: {
    h3: ({ children }: any) => (
      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 text-gray-600 leading-relaxed">{children}</p>
    ),
  },
};

export default function ImageTextSection({ data }: ImageTextSectionProps) {
  const bgClass = data.backgroundColor === 'gray' ? 'bg-gray-50' : 'bg-white';
  const imageUrl = data.image ? urlFor(data.image).width(800).quality(90).quality(85).url() : null;
  const isImageLeft = data.imagePosition === 'left';

  return (
    <section className={`py-16 md:py-24 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
            isImageLeft ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Image */}
          {imageUrl && (
            <motion.div
              initial={{ opacity: 0, x: isImageLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={imageUrl}
                  alt={data.image.alt || data.heading || 'Section image'}
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isImageLeft ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}
          >
            {data.heading && (
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {data.heading}
              </h2>
            )}

            {data.content && (
              <div className="prose max-w-none mb-8">
                <PortableText value={data.content} components={portableTextComponents} />
              </div>
            )}

            {data.button?.text && data.button?.url && (
              <motion.a
                href={data.button.url}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center space-x-2 px-8 py-4 rounded-full font-semibold transition-all ${
                  data.button.style === 'primary'
                    ? 'bg-primary text-white hover:bg-primary-dark shadow-lg'
                    : 'border-2 border-gray-300 text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span>{data.button.text}</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
