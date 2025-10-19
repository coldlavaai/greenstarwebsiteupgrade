'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPin, Calendar, Zap } from 'lucide-react';
import { urlFor } from '@/lib/sanity';

interface GalleryItem {
  _id: string;
  _type: string;
  title: string;
  location?: string;
  systemSize?: string;
  image?: any;
  category?: string;
  description?: string;
}

interface GalleryProps {
  data?: GalleryItem[];
}

const Gallery = ({ data }: GalleryProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Hardcoded image URLs as fallbacks
  const imageMap: Record<string, string> = {
    'Residential Solar Installation': 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_855615596.jpeg',
    'Commercial Rooftop Array': 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_586564893-0f77e5a0-84f93a01.jpeg',
    'Home Battery Storage': 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_553388506--281-29.jpeg',
    'Office Building Solar': 'https://irp.cdn-website.com/8f142869/dms3rep/multi/Blog_image_2.webp',
    'Warehouse Solar Installation': 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_855615596.jpeg',
    'Farm Solar Project': 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_586564893-0f77e5a0-84f93a01.jpeg',
  };

  // Map CMS data or use fallback
  const projects = data?.map(item => {
    // Safely get image URL - check if image exists and has asset reference
    let imageUrl = imageMap[item.title] || '';
    if (item.image && item.image.asset) {
      try {
        imageUrl = urlFor(item.image).width(800).url();
      } catch (e) {
        // If URL building fails, use fallback
        imageUrl = imageMap[item.title] || '';
      }
    }

    return {
      _id: item._id,
      _type: item._type,
      image: imageUrl,
      title: item.title,
      location: item.location || '',
      capacity: item.systemSize || '',
      date: '2024',  // Default date
    };
  }) || [
    {
      image: 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_855615596.jpeg',
      title: 'Residential Solar Installation',
      location: 'Manchester, UK',
      capacity: '8kW System',
      date: '2024',
    },
    {
      image: 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_586564893-0f77e5a0-84f93a01.jpeg',
      title: 'Commercial Rooftop Array',
      location: 'Birmingham, UK',
      capacity: '45kW System',
      date: '2024',
    },
    {
      image: 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_553388506--281-29.jpeg',
      title: 'Home Battery Storage',
      location: 'London, UK',
      capacity: '13.5kWh Battery',
      date: '2024',
    },
    {
      image: 'https://irp.cdn-website.com/8f142869/dms3rep/multi/Blog_image_2.webp',
      title: 'Office Building Solar',
      location: 'Leeds, UK',
      capacity: '65kW System',
      date: '2024',
    },
    {
      image: 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_855615596.jpeg',
      title: 'Warehouse Solar Installation',
      location: 'Liverpool, UK',
      capacity: '120kW System',
      date: '2023',
    },
    {
      image: 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_586564893-0f77e5a0-84f93a01.jpeg',
      title: 'Farm Solar Project',
      location: 'Bristol, UK',
      capacity: '95kW System',
      date: '2023',
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-transparent relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent"></div>
            <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent font-semibold text-sm uppercase tracking-[0.2em]">
              Our Projects
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent"></div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            Recent{' '}
            <span className="bg-gradient-to-r from-accent via-primary-light to-accent bg-clip-text text-transparent">Installations</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
            Explore our portfolio of successful solar installations across the UK
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -12 }}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500"
              onClick={() => setSelectedImage(index)}
              style={{
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)',
              }}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <motion.div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${project.image}')` }}
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.5 }}
                />
                {/* Premium gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />
                {/* Accent gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/30 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content overlay */}
              <motion.div
                className="absolute inset-0 p-8 flex flex-col justify-end"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <h3 className="text-white font-bold text-2xl mb-3 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {project.title}
                  </h3>
                  <div className="space-y-2 text-white/90 text-sm font-light">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span>{project.capacity}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{project.date}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Premium border effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: '0 0 0 2px rgba(212, 175, 55, 0.5), 0 25px 70px rgba(212, 175, 55, 0.3)',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-20"
        >
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(140,198,63,0.4)' }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="inline-block bg-gradient-to-r from-primary via-primary-dark to-primary text-white px-12 py-5 rounded-full font-semibold text-lg shadow-xl relative overflow-hidden group"
          >
            <span className="relative z-10 tracking-wide">Start Your Project</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
