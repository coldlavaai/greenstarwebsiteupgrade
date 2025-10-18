'use client';

import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

interface FooterData {
  _id?: string;
  _type?: string;
  title?: string;
  companyDescription?: string;
  copyright?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
}

interface FooterProps {
  data?: FooterData;
}

const Footer = ({ data }: FooterProps) => {
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

  // Icon mapping for social platforms
  const iconMap: Record<string, any> = {
    Facebook: Facebook,
    Instagram: Instagram,
    Twitter: Instagram, // fallback
    LinkedIn: Instagram, // fallback
  };

  const socialLinks = data?.socialLinks?.map(link => ({
    icon: iconMap[link.platform] || Facebook,
    href: link.url,
    label: link.platform,
  })) || [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>

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
              <a href="#home" className="inline-block mb-6">
                <img
                  src="https://irp.cdn-website.com/8f142869/dms3rep/multi/Greenstar_Solar_Logo_WHITE.TAG_HZ-3x.png"
                  alt="Greenstar Solar"
                  className="h-12 w-auto"
                />
              </a>
              <p
                className="text-gray-400 mb-6 leading-relaxed text-left"
                data-sanity={data?._id ? `${data._id}.companyDescription` : undefined}
              >
                {data?.companyDescription || 'Leading the way in renewable energy solutions. We help homes and businesses transition to clean, sustainable solar power.'}
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-left">
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
            className="text-left"
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
            className="text-left"
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
            className="text-left"
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
            <div
              className="text-gray-400 text-sm text-center md:text-left"
              data-sanity={data?._id ? `${data._id}.copyright` : undefined}
            >
              {data?.copyright || `© ${new Date().getFullYear()} Greenstar Solar. All rights reserved. | MCS Certified Installer`}
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm text-center md:text-left">
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
