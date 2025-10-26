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
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleCard = (index: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

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
      location: 'Southampton, Hampshire',
      capacity: '8.4kW System',
      date: 'March 2024',
      systemDetails: 'Solar Panels + Battery Storage',
      panelCount: '21 x Aiko Neostar panels',
      battery: '13.5kWh GivEnergy Battery',
      performance: 'Generating 7,800 kWh annually',
      savings: '85% reduction in energy bills',
    },
    {
      image: 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_586564893-0f77e5a0-84f93a01.jpeg',
      title: 'Commercial Rooftop Array',
      location: 'Portsmouth, Hampshire',
      capacity: '95kW System',
      date: 'January 2024',
      systemDetails: 'Commercial Solar Array',
      panelCount: '238 x Commercial panels',
      inverter: 'SolarEdge Commercial Inverters',
      performance: 'Generating 89,000 kWh annually',
      savings: '72% reduction in energy costs',
    },
    {
      image: 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_553388506--281-29.jpeg',
      title: 'Home Battery Storage',
      location: 'Winchester, Hampshire',
      capacity: '6.8kW + Battery',
      date: 'September 2023',
      systemDetails: 'Solar + Battery + EV Charger',
      panelCount: '17 x Aiko panels',
      battery: '9.5kWh GivEnergy Battery',
      performance: 'Generating 6,200 kWh annually',
      savings: '78% reduction + free EV charging',
    },
    {
      image: 'https://irp.cdn-website.com/8f142869/dms3rep/multi/Blog_image_2.webp',
      title: 'Office Building Solar',
      location: 'Eastleigh, Hampshire',
      capacity: '42kW System',
      date: 'May 2024',
      systemDetails: 'Commercial Solar Installation',
      panelCount: '105 x High-efficiency panels',
      inverter: 'Fox ESS Commercial',
      performance: 'Generating 39,000 kWh annually',
      savings: '68% reduction in operating costs',
    },
    {
      image: 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_855615596.jpeg',
      title: 'Large Family Home',
      location: 'Romsey, Hampshire',
      capacity: '12.6kW System',
      date: 'July 2023',
      systemDetails: 'Premium Solar + Battery',
      panelCount: '32 x Aiko Neostar panels',
      battery: '18kWh Battery Storage',
      performance: 'Generating 11,400 kWh annually',
      savings: '92% energy independence',
    },
    {
      image: 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_586564893-0f77e5a0-84f93a01.jpeg',
      title: 'Farm Solar Project',
      location: 'New Forest, Hampshire',
      capacity: '120kW System',
      date: 'November 2023',
      systemDetails: 'Agricultural Solar Array',
      panelCount: '300 x Commercial panels',
      inverter: 'Multiple SolarEdge units',
      performance: 'Generating 112,000 kWh annually',
      savings: '£32,000 annual savings',
    },
  ];

  return (
    <section id="gallery" ref={ref} className="py-24 bg-transparent relative overflow-hidden">

      <div className="container mx-auto px-8 md:px-12 relative z-10">
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
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
              onClick={() => toggleCard(index)}
              whileHover={{ y: -8 }}
              className="group cursor-pointer perspective-1000"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className="relative aspect-[4/3] w-full"
                animate={{ rotateY: flippedCards[index] ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front of card */}
                <div
                  className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <motion.div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${project.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent/30 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-white font-bold text-2xl mb-3 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                      {project.title}
                    </h3>
                    <div className="space-y-2 text-white/90 text-sm font-light mb-3">
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
                    <div className="text-right">
                      <span className="text-primary/80 text-xs font-medium">Click for details →</span>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-dark/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-primary/30 overflow-hidden p-6"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="h-full flex flex-col justify-between text-white">
                    <div>
                      <h3 className="text-xl font-bold mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                        {project.title}
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="text-primary/80 text-xs uppercase tracking-wider mb-1">System Type</div>
                          <div className="font-medium">{project.systemDetails || project.capacity}</div>
                        </div>
                        {project.panelCount && (
                          <div className="bg-white/10 rounded-lg p-3">
                            <div className="text-primary/80 text-xs uppercase tracking-wider mb-1">Panels</div>
                            <div className="font-medium">{project.panelCount}</div>
                          </div>
                        )}
                        {project.battery && (
                          <div className="bg-white/10 rounded-lg p-3">
                            <div className="text-primary/80 text-xs uppercase tracking-wider mb-1">Battery</div>
                            <div className="font-medium">{project.battery}</div>
                          </div>
                        )}
                        {project.inverter && (
                          <div className="bg-white/10 rounded-lg p-3">
                            <div className="text-primary/80 text-xs uppercase tracking-wider mb-1">Inverter</div>
                            <div className="font-medium">{project.inverter}</div>
                          </div>
                        )}
                        {project.performance && (
                          <div className="bg-primary/20 rounded-lg p-3 border border-primary/30">
                            <div className="text-primary/90 text-xs uppercase tracking-wider mb-1">Performance</div>
                            <div className="font-bold">{project.performance}</div>
                          </div>
                        )}
                        {project.savings && (
                          <div className="bg-primary/20 rounded-lg p-3 border border-primary/30">
                            <div className="text-primary/90 text-xs uppercase tracking-wider mb-1">Savings</div>
                            <div className="font-bold">{project.savings}</div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right mt-4">
                      <span className="text-primary/80 text-xs font-medium">← Click to return</span>
                    </div>
                  </div>
                </div>
              </motion.div>
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
