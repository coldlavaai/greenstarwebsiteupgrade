'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, ReactNode } from 'react';

interface SimpleLoaderProps {
  children: ReactNode;
  onLoadComplete: () => void;
}

const SimpleLoader = ({ children, onLoadComplete }: SimpleLoaderProps) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // No delay - load immediately!
    setIsComplete(true);
    onLoadComplete();
  }, [onLoadComplete]);

  return (
    <>
      {/* Content - fades in gradually, synchronized with logo dimming */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.0, ease: [0.25, 0.1, 0.25, 1.0] }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default SimpleLoader;
