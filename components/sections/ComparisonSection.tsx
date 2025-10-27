'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export default function ComparisonSection({ data }: any) {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        {data?.title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900"
          >
            {data.title}
          </motion.h2>
        )}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                {data?.leftTitle || 'Option A'}
              </h3>
              <ul className="space-y-3">
                {data?.leftItems?.map((item: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary/10 rounded-2xl p-8 border-2 border-primary"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                {data?.rightTitle || 'Option B'}
              </h3>
              <ul className="space-y-3">
                {data?.rightItems?.map((item: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
