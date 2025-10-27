'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { PortableText } from '@portabletext/react';

interface FAQ {
  question: string;
  answer: any;
}

interface FAQSectionProps {
  data: {
    title?: string;
    description?: string;
    faqs?: FAQ[];
    layout?: 'single' | 'two-column';
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
    normal: ({ children }: any) => (
      <p className="mb-2 text-gray-600 leading-relaxed">{children}</p>
    ),
  },
};

export default function FAQSection({ data }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const bgClass = data.backgroundColor === 'gray' ? 'bg-gray-50' : 'bg-white';
  const isTwoColumn = data.layout === 'two-column';

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900"
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

        {/* FAQ Items */}
        {data.faqs && data.faqs.length > 0 && (
          <div
            className={`max-w-4xl mx-auto ${
              isTwoColumn ? 'md:columns-2 md:gap-6' : ''
            }`}
          >
            {data.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`mb-4 ${isTwoColumn ? 'break-inside-avoid' : ''}`}
              >
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Question */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    </motion.div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-2">
                          <div className="prose max-w-none">
                            <PortableText
                              value={faq.answer}
                              components={portableTextComponents}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
