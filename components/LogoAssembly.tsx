'use client';

import { useEffect, useState } from 'react';

interface LogoAssemblyProps {
  onComplete: () => void;
}

const LogoAssembly = ({ onComplete }: LogoAssemblyProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Wait for assembly animation to complete (1.2s animation) - content loads RIGHT when logo finishes
    const timer = setTimeout(() => {
      onComplete();
    }, 1200);

    return () => clearTimeout(timer);
  }, [isMounted, onComplete]);

  // This component is now just a timer - the actual animation happens in DayNightBackground
  return null;
};

export default LogoAssembly;
