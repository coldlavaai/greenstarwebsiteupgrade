'use client';

import { motion } from 'framer-motion';
import { urlFor } from '@/lib/sanity';

export default function GalleryGridSection({ data }: any) {
  const images = data?.images || [];
  const columns = data?.columns || 3;
  const gridClass = columns === 2 ? 'md:grid-cols-2' : columns === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3';

  return (
    <section className="bg-white py-16 md:py-24">
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
        {images.length > 0 && (
          <div className={`grid grid-cols-1 ${gridClass} gap-4`}>
            {images.map((img: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
                className="aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-[0_20px_60px_rgba(140,198,63,0.4)] border border-gray-200 hover:border-[#8cc63f]/50"
                style={{
                  transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                }}
              >
                <img
                  src={urlFor(img.image).width(800).height(800).fit('crop').quality(85).url()}
                  alt={img.alt || ''}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
