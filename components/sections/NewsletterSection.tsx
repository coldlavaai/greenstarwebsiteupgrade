'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useState } from 'react';

export default function NewsletterSection({ data }: any) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section className="bg-primary py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Mail className="w-12 h-12 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {data?.title || 'Subscribe to Our Newsletter'}
            </h2>
            <p className="text-white/90 mb-8">
              {data?.description || 'Get the latest updates and offers.'}
            </p>
            {submitted ? (
              <div className="bg-white/20 rounded-full px-8 py-4 text-white font-semibold">
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 rounded-full focus:ring-2 focus:ring-white/50 transition-all"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-all shadow-lg"
                >
                  Subscribe
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
