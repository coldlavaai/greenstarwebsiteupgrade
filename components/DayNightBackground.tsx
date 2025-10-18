'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

const DayNightBackground = () => {
  const { scrollYProgress } = useScroll();

  // Sleek black gradient transitions
  const backgroundGradient = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      'radial-gradient(ellipse at top, #1a1a1a 0%, #000000 100%)',
      'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)',
      'radial-gradient(ellipse at bottom, #000000 0%, #000000 100%)',
    ]
  );

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

      {/* Geometric Lines - Animated */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.1 }}
      >
        {/* Diagonal Lines */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2"
              style={{
                width: '2px',
                height: `${300 + i * 100}px`,
                background: 'linear-gradient(to bottom, transparent, rgba(140, 198, 63, 0.3), transparent)',
                transform: `translate(-50%, -50%) rotate(${i * 60}deg)`,
                transformOrigin: 'center',
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Pulsing Circles */}
      <div className="absolute inset-0 pointer-events-none">
        {[300, 500, 700].map((size, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-500/10"
            style={{
              width: `${size}px`,
              height: `${size}px`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      {/* Scan Lines Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.03 }}
      >
        <motion.div
          className="w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"
          animate={{
            y: ['0vh', '100vh'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
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
