"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { HeroBackground } from './HeroBackground';

interface LiquidHeroProps {
  children: React.ReactNode;
}

export function LiquidHero({ children }: LiquidHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Map scroll position to border radius for the liquid effect
  // 0 to 500px scroll -> 0 to 100px radius curve?
  // User asked for "liquid dropped up when scrolled down"
  // This implies the bottom edge curves as it goes up.
  
  // Create a spring for smooth mapping
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const borderBottomRadius = useTransform(smoothScrollY, [0, 800], ["0%", "50%"]);
  const scale = useTransform(smoothScrollY, [0, 800], [1, 0.9]);
  const opacity = useTransform(smoothScrollY, [0, 600], [1, 0]);
  const y = useTransform(smoothScrollY, [0, 800], [0, 100]); // Parallax lag

  return (
    <motion.section 
      ref={containerRef}
      className="h-screen w-full relative flex items-center justify-center shrink-0 overflow-hidden border-b-2 border-border bg-background"
      style={{ 
        borderBottomLeftRadius: borderBottomRadius,
        borderBottomRightRadius: borderBottomRadius,
        scale,
        // zIndex: 10 
      }}
    >
      <HeroBackground />
      
      <motion.div 
        className="w-full z-10 relative"
        style={{ opacity, y }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
