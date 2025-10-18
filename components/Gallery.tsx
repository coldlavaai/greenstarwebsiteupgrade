'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPin, Calendar, Zap } from 'lucide-react';

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const projects = [
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
          className="text-center mb-16"
        >
          <span className="text-[#8cc63f] font-semibold text-sm uppercase tracking-wider">
            Our Projects
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Recent <span className="bg-gradient-to-r from-[#8cc63f] to-[#7ab52f] bg-clip-text text-transparent">Installations</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
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
              whileHover={{ y: -10 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer hover:shadow-[0_20px_60px_rgba(140,198,63,0.4)] transition-shadow duration-400"
              onClick={() => setSelectedImage(index)}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <motion.div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${project.image}')` }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              </div>

              {/* Content overlay */}
              <motion.div
                className="absolute inset-0 p-6 flex flex-col justify-end"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-white font-bold text-xl mb-2">{project.title}</h3>
                  <div className="space-y-1 text-white/90 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span>{project.capacity}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{project.date}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Hover border effect */}
              <motion.div
                className="absolute inset-0 border-2 border-[#8cc63f] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  boxShadow: '0 0 30px rgba(140,198,63,0.5)',
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
          className="text-center mt-16"
        >
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(140,198,63,0.3)' }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="inline-block bg-gradient-to-r from-[#8cc63f] to-[#7ab52f] text-white px-10 py-4 rounded-full font-semibold text-lg shadow-xl relative overflow-hidden group"
          >
            <span className="relative z-10">Start Your Project</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
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
