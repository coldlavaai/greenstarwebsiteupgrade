'use client';

import { motion } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';

interface ContentSectionProps {
  data: {
    title?: string;
    content?: any[]; // Portable Text content
    layout?: string;
    backgroundColor?: string;
    padding?: string;
  };
}

const bgColorMap: Record<string, string> = {
  white: 'bg-white',
  'light-gray': 'bg-gray-50',
  'dark-gray': 'bg-gray-900',
  transparent: 'bg-transparent',
};

const paddingMap: Record<string, string> = {
  none: 'py-0',
  small: 'py-8 md:py-12',
  medium: 'py-12 md:py-16',
  large: 'py-16 md:py-24',
};

const layoutMap: Record<string, string> = {
  single: 'max-w-4xl',
  'two-column': 'max-w-6xl',
  narrow: 'max-w-2xl',
};

// Portable Text components for rich text rendering
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      return (
        <div className="my-8">
          <img
            src={urlFor(value).width(1200).url()}
            alt={value.alt || ''}
            className="rounded-lg w-full"
          />
          {value.caption && (
            <p className="text-sm text-gray-500 mt-2 text-center">{value.caption}</p>
          )}
        </div>
      );
    },
  },
  marks: {
    link: ({ value, children }: any) => {
      const target = value?.blank ? '_blank' : undefined;
      const rel = value?.blank ? 'noopener noreferrer' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-primary hover:text-primary-dark underline transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-8 text-white" style={{ fontFamily: 'var(--font-heading)' }}>
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl md:text-3xl font-bold mb-3 mt-6 text-white" style={{ fontFamily: 'var(--font-heading)' }}>
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl md:text-2xl font-bold mb-2 mt-4 text-white">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-white/80">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 text-white/80 leading-relaxed">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-white/80">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-white/80">
        {children}
      </ol>
    ),
  },
};

export default function ContentSection({ data }: ContentSectionProps) {
  const bgClass = bgColorMap[data.backgroundColor || 'transparent'] || bgColorMap.transparent;
  const paddingClass = paddingMap[data.padding || 'medium'] || paddingMap.medium;
  const layoutClass = layoutMap[data.layout || 'single'] || layoutMap.single;

  const contentColumns = data.layout === 'two-column' ? 'md:columns-2 md:gap-8' : '';

  return (
    <section className={`${bgClass} ${paddingClass}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mx-auto ${layoutClass}`}
        >
          {data.title && (
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {data.title}
            </h2>
          )}

          {data.content && (
            <div className={`prose prose-invert max-w-none ${contentColumns}`}>
              <PortableText value={data.content} components={portableTextComponents} />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
