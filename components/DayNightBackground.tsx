'use client';

import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame, animate } from 'framer-motion';
import { useRef, useContext, useEffect } from 'react';
import { LoadingContext } from './PageWrapper';

const DayNightBackground = () => {
  const { scrollYProgress } = useScroll();
  const baseRotation = useMotionValue(0);
  const timeRef = useRef(0);
  const { isLoaded, assemblyComplete } = useContext(LoadingContext);

  // Continuous clockwise rotation
  useAnimationFrame((t) => {
    timeRef.current = t;
    baseRotation.set((t / 1000) * 4); // 4 degrees per second = 90 sec for 360°
  });

  // Scroll-based rotation boost (speeds up clockwise when scrolling down)
  const scrollRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Combine rotations
  const combinedRotation = useTransform(
    [baseRotation, scrollRotation],
    ([base, scroll]: [number, number]) => base + scroll
  );

  // Logo opacity - starts at 0, fades to bright, then dims smoothly as content loads
  const logoOpacity = useMotionValue(0);
  const hasStartedEntranceRef = useRef(false);

  // Entrance animation: fade in to bright
  useEffect(() => {
    if (!hasStartedEntranceRef.current) {
      hasStartedEntranceRef.current = true;
      animate(logoOpacity, 0.3, {
        duration: 1.2,
        ease: [0.25, 0.1, 0.0, 1.0]
      });
    }
  }, [logoOpacity]);

  // Dimming animation: when content loads, dim gradually (10% brighter than before)
  useEffect(() => {
    if (isLoaded) {
      animate(logoOpacity, 0.11, {
        duration: 2.0,
        ease: [0.25, 0.1, 0.25, 1.0]
      });
    }
  }, [isLoaded, logoOpacity]);

  // Consistent dark background (no mist effect)
  const backgroundGradient = 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)';

  // Accent color glow
  const accentOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.2]);

  // Grid lines
  const gridOpacity = useTransform(scrollYProgress, [0, 1], [0.05, 0.02]);

  return (
    <motion.div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ background: backgroundGradient }}
    >
      {/* Subtle Grid Pattern */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: gridOpacity }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(140, 198, 63, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(140, 198, 63, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </motion.div>

      {/* Accent Green Glow - Top */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ opacity: accentOpacity }}
      >
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(140, 198, 63, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </motion.div>

      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => {
        const xPos = ((i * 37) % 100);
        const yStart = ((i * 53) % 100);
        const duration = 8 + ((i * 0.5) % 4);
        const delay = (i * 0.3) % 3;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${xPos}%`,
              top: `${yStart}%`,
              width: '2px',
              height: '2px',
              background: 'rgba(140, 198, 63, 0.6)',
              boxShadow: '0 0 10px rgba(140, 198, 63, 0.4)',
            }}
            animate={{
              y: [0, -200, -400],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: 'linear',
            }}
          />
        );
      })}

      {/* Rotating Logo - Present from the START */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{ opacity: logoOpacity }}
      >
        {/* Logo Container with Parallax Rotation */}
        <motion.div
          className="relative"
          style={{
            rotate: combinedRotation,
          }}
          initial={{ scale: 0.3 }}
          animate={{
            scale: 1
          }}
          transition={{
            scale: { duration: 1.2, ease: [0.25, 0.1, 0.0, 1.0] }
          }}
        >
          {/* Subtle Electrical Glow Pulse */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [0.2, 0.35, 0.2],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              filter: 'blur(30px)',
              background: 'radial-gradient(circle, rgba(140, 198, 63, 0.25) 0%, transparent 70%)',
            }}
          />

          {/* Logo Image */}
          <motion.img
            src="/images/greenstar-logo-dots.png"
            alt="Greenstar Logo"
            className="relative z-10"
            style={{
              width: '600px',
              height: '600px',
              filter: 'drop-shadow(0 0 15px rgba(140, 198, 63, 0.25))',
            }}
            animate={{
              filter: [
                'drop-shadow(0 0 15px rgba(140, 198, 63, 0.25))',
                'drop-shadow(0 0 22px rgba(140, 198, 63, 0.35))',
                'drop-shadow(0 0 15px rgba(140, 198, 63, 0.25))',
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-green-500/40 to-transparent" />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-green-500/40 to-transparent" />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-green-500/40 to-transparent" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-green-500/40 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-green-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-px h-full bg-gradient-to-t from-green-500/40 to-transparent" />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-green-500/40 to-transparent" />
        <div className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-t from-green-500/40 to-transparent" />
      </div>
    </motion.div>
  );
};

export default DayNightBackground;
