'use client';

import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Process', href: '#process' },
      { name: 'Testimonials', href: '#testimonials' },
      { name: 'Contact', href: '#contact' },
    ],
    systems: [
      { name: 'Solar Panels for Home', href: '#solar-home' },
      { name: 'Battery Storage for Home', href: '#battery-home' },
      { name: 'Solar Panels for Business', href: '#solar-business' },
      { name: 'Battery Storage for Business', href: '#battery-business' },
    ],
    resources: [
      { name: 'FAQ', href: '#faq' },
      { name: 'Blog', href: '#blog' },
      { name: 'Case Studies', href: '#case-studies' },
      { name: 'Warranty Info', href: '#warranty' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-2xl font-bold mb-4">
                <span className="text-[#8cc63f]">Green</span>star Solar
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Leading the way in renewable energy solutions. We help homes and businesses transition to clean, sustainable solar power.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a href="tel:08001234567" className="flex items-center space-x-3 text-gray-400 hover:text-[#8cc63f] transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>0800 123 4567</span>
                </a>
                <a href="mailto:info@greenstarsolar.co.uk" className="flex items-center space-x-3 text-gray-400 hover:text-[#8cc63f] transition-colors">
                  <Mail className="w-5 h-5" />
                  <span>info@greenstarsolar.co.uk</span>
                </a>
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="w-5 h-5" />
                  <span>United Kingdom</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/10 hover:bg-[#8cc63f] w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#8cc63f] transition-colors inline-block hover:translate-x-1 transform"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Systems Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-4">Systems</h3>
            <ul className="space-y-3">
              {footerLinks.systems.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#8cc63f] transition-colors inline-block hover:translate-x-1 transform"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#8cc63f] transition-colors inline-block hover:translate-x-1 transform"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Greenstar Solar. All rights reserved. | MCS Certified Installer
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-[#8cc63f] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-[#8cc63f] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-[#8cc63f] transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 bg-[#8cc63f] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl hover:bg-[#7ab52f] transition-colors z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </footer>
  );
};

export default Footer;
