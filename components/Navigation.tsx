'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavigationData {
  _id?: string;
  _type?: string;
  title?: string;
  navItems?: Array<{
    label: string;
    href: string;
    order: number;
  }>;
  ctaButton?: {
    text: string;
    href: string;
  };
}

interface NavigationProps {
  data?: NavigationData;
}

const Navigation = ({ data }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Map Sanity navItems to component structure, or use fallback
  const navItems = data?.navItems?.map(item => ({
    name: item.label,
    href: item.href,
    // Add submenu for Systems if this is the Systems item
    ...(item.label === 'Systems' && {
      submenu: [
        { name: 'Solar Panels for Home', href: '/solar-panels-home' },
        { name: 'Battery Storage for Home', href: '/battery-storage-home' },
        { name: 'Solar Panels for Business', href: '/solar-panels-business' },
        { name: 'Battery Storage for Business', href: '/battery-storage-business' },
      ],
    }),
  })) || [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/#about' },
    {
      name: 'Systems',
      href: '/#systems',
      submenu: [
        { name: 'Solar Panels for Home', href: '/solar-panels-home' },
        { name: 'Battery Storage for Home', href: '/battery-storage-home' },
        { name: 'Solar Panels for Business', href: '/solar-panels-business' },
        { name: 'Battery Storage for Business', href: '/battery-storage-business' },
      ],
    },
    { name: 'Process', href: '/#process' },
    { name: 'Contact', href: '/#contact' },
  ];

  const ctaButton = data?.ctaButton || { text: 'Get Free Quote', href: '/#contact' };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md shadow-lg py-4'
          : 'bg-black/80 backdrop-blur-sm py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <img
              src="https://irp.cdn-website.com/8f142869/dms3rep/multi/Greenstar_Solar_Logo_WHITE.TAG_HZ-3x.png"
              alt="Greenstar Solar"
              className="h-12 md:h-16 w-auto"
            />
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveSubmenu(item.name)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center space-x-1 font-medium text-white transition-colors hover:text-[#8cc63f]"
                >
                  <span>{item.name}</span>
                  {item.submenu && <ChevronDown className="w-4 h-4" />}
                </a>

                {/* Submenu */}
                {item.submenu && (
                  <AnimatePresence>
                    {activeSubmenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2"
                      >
                        {item.submenu.map((subitem) => (
                          <a
                            key={subitem.name}
                            href={subitem.href}
                            className="block px-4 py-3 text-gray-700 hover:bg-[#8cc63f]/10 hover:text-[#8cc63f] transition-colors"
                          >
                            {subitem.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={ctaButton.href}
              className="bg-[#8cc63f] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#7ab52f] transition-colors shadow-lg"
            >
              {ctaButton.text}
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors text-white hover:text-[#8cc63f]"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 bg-black/95 backdrop-blur-lg rounded-lg shadow-xl overflow-hidden border border-white/10"
            >
              {navItems.map((item) => (
                <div key={item.name}>
                  <a
                    href={item.href}
                    className="block px-4 py-3 text-white hover:bg-[#8cc63f]/10 hover:text-[#8cc63f] transition-colors"
                    onClick={() => !item.submenu && setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                  {item.submenu && (
                    <div className="pl-4 bg-black/50">
                      {item.submenu.map((subitem) => (
                        <a
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-2 text-sm text-white/80 hover:text-[#8cc63f]"
                          onClick={() => setIsOpen(false)}
                        >
                          {subitem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="p-4">
                <a
                  href={ctaButton.href}
                  className="block w-full bg-[#8cc63f] text-white text-center px-6 py-3 rounded-full font-semibold hover:bg-[#7ab52f] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {ctaButton.text}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
