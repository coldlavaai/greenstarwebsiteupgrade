'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      content: '0800 123 4567',
      link: 'tel:08001234567',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@greenstarsolar.co.uk',
      link: 'mailto:info@greenstarsolar.co.uk',
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'United Kingdom',
      link: '#',
    },
  ];

  return (
    <section id="contact" ref={ref} className="py-24 bg-transparent">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#8cc63f] font-semibold text-sm uppercase tracking-wider">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Book Your <span className="text-[#8cc63f]">Free Survey</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Ready to make the switch to solar? Contact us today for a free consultation and site assessment
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Let's Start Your Solar Journey
              </h3>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Our team of experts is ready to help you transition to clean, renewable energy. Get in touch for a free, no-obligation consultation.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm p-6 rounded-2xl shadow-md hover:shadow-[0_20px_60px_rgba(140,198,63,0.4)] hover:border-[#8cc63f]/50 transition-all border border-white/10"
                >
                  <div className="bg-[#8cc63f]/20 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-[#8cc63f]" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60 font-medium">{info.title}</div>
                    <div className="text-white font-semibold text-lg">{info.content}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Benefits List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-[#8cc63f] to-[#7ab52f] rounded-3xl p-8 text-white"
            >
              <h4 className="text-2xl font-bold mb-4">Why Choose Us?</h4>
              <ul className="space-y-3">
                {[
                  'Free site assessment & consultation',
                  'Transparent pricing with no hidden costs',
                  '25-year warranty on all installations',
                  'MCS certified installers',
                  'Expert advice & ongoing support',
                ].map((benefit, idx) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#8cc63f] focus:ring-2 focus:ring-[#8cc63f]/20 outline-none transition-all"
                      placeholder="John Smith"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#8cc63f] focus:ring-2 focus:ring-[#8cc63f]/20 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      {...register('phone', { required: 'Phone number is required' })}
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#8cc63f] focus:ring-2 focus:ring-[#8cc63f]/20 outline-none transition-all"
                      placeholder="07123 456789"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      {...register('message')}
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#8cc63f] focus:ring-2 focus:ring-[#8cc63f]/20 outline-none transition-all resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#8cc63f] to-[#7ab52f] text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-5 h-5" />
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.6 }}
                    className="w-20 h-20 bg-[#8cc63f] rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-12 h-12 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600">
                    We've received your message and will get back to you soon.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
