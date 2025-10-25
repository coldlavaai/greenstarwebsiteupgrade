'use client';

import { useState, ReactNode, createContext } from 'react';
import DayNightBackground from './DayNightBackground';
import SimpleLoader from './SimpleLoader';
import LogoAssembly from './LogoAssembly';
import { motion, AnimatePresence } from 'framer-motion';

interface PageWrapperProps {
  children: ReactNode;
}

export const LoadingContext = createContext({ isLoaded: false, assemblyComplete: false });

const PageWrapper = ({ children }: PageWrapperProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [assemblyComplete, setAssemblyComplete] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoaded, assemblyComplete }}>
      <div className="min-h-screen relative">
        <DayNightBackground />

        {/* Logo Assembly Animation */}
        <AnimatePresence>
          {!assemblyComplete && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <LogoAssembly onComplete={() => setAssemblyComplete(true)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Loader - starts after assembly */}
        {assemblyComplete && (
          <SimpleLoader onLoadComplete={() => setIsLoaded(true)}>
            {children}
          </SimpleLoader>
        )}
      </div>
    </LoadingContext.Provider>
  );
};

export default PageWrapper;
