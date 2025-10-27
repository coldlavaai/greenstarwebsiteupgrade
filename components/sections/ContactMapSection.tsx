'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactMapSection({ data }: any) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
              {data?.title || 'Get In Touch'}
            </h2>
            <div className="space-y-6">
              {data?.address && (
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">{data.address}</p>
                  </div>
                </div>
              )}
              {data?.phone && (
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <a href={`tel:${data.phone}`} className="text-primary hover:text-primary-dark">
                      {data.phone}
                    </a>
                  </div>
                </div>
              )}
              {data?.email && (
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a href={`mailto:${data.email}`} className="text-primary hover:text-primary-dark">
                      {data.email}
                    </a>
                  </div>
                </div>
              )}
              {data?.hours && (
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Hours</h3>
                    <p className="text-gray-600">{data.hours}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-[400px] lg:h-full rounded-2xl overflow-hidden shadow-xl"
          >
            {data?.mapUrl ? (
              <iframe
                src={data.mapUrl}
                className="w-full h-full"
                loading="lazy"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                Map placeholder
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
