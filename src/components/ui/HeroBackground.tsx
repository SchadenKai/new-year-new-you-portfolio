"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function HeroBackground() {
  const [isIdle, setIsIdle] = React.useState(false);

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      setIsIdle(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsIdle(true), 5000);
    };

    // Initial timer
    timeoutId = setTimeout(() => setIsIdle(true), 5000);

    // Listeners
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('scroll', resetTimer);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-background">
      {/* Moving Grid - formatted for light mode */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-10"
        initial={{ backgroundPosition: "0px 0px" }}
        animate={{ backgroundPosition: "50px 50px" }}
        transition={{ 
          repeat: Infinity, 
          duration: 5, 
          ease: "linear" 
        }}
        style={{
          backgroundImage: `linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Floating Geometric Shapes */}
      {/* Top Left - Purple Circle */}
      <motion.div 
        animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[5%] w-32 h-32 bg-primary rounded-full border-2 border-border opacity-80"
        style={{ boxShadow: '4px 4px 0px 0px var(--border-color)' }}
      />

      {/* Bottom Right - Yellow Square */}
      <motion.div 
        animate={{ 
            y: [0, 30, 0],
            rotate: [0, -10, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[20%] right-[10%] w-40 h-40 bg-secondary border-2 border-border opacity-80"
        style={{ boxShadow: '4px 4px 0px 0px var(--border-color)' }}
      />
      
      {/* Center/Random - Accent Triangle/Shape */}
      <motion.div 
        animate={{ 
            y: [0, -15, 0],
            x: [0, 10, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[30%] right-[30%] w-16 h-16 bg-accent border-2 border-border rounded-lg rotate-45 opacity-80"
        style={{ boxShadow: '4px 4px 0px 0px var(--border-color)' }}
      />

      {/* Decorative accent for "Dev" theme */}
      <div className="absolute top-0 right-0 p-10 opacity-20">
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="var(--primary)" stroke="var(--border-color)" strokeWidth="2" d="M45.7,-76.3C58.9,-69.3,69.1,-58.3,77.6,-46.3C86.1,-34.3,92.9,-21.3,92.4,-8.6C91.9,4.1,84.1,16.5,75.2,27.9C66.3,39.3,56.3,49.7,45,57.1C33.7,64.5,21.1,68.9,8.2,69.5C-4.7,70.1,-17.9,66.9,-30.3,60.8C-42.7,54.7,-54.3,45.7,-63.9,34.4C-73.5,23.1,-81.1,9.5,-80.7,-3.9C-80.3,-17.3,-71.9,-30.5,-61.1,-40.8C-50.3,-51.1,-37.1,-58.5,-23.7,-65.4C-10.3,-72.3,3.3,-78.7,17.4,-80.3L45.7,-76.3Z" transform="translate(100 100)" />
        </svg>
      </div>

      {/* EASTER EGG PLAYGROUND */}
      <AnimatePresence>
        {isIdle && (
          <EasterEggContainer />
        )}
      </AnimatePresence>
    </div>
  );
}

// ... (previous code)

function EasterEggContainer() {
  const [mode, setMode] = React.useState(1);

  React.useEffect(() => {
    setMode(Math.floor(Math.random() * 4) + 1);
  }, []);

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-10 pointer-events-none"
    >
        {mode === 1 && <SlimeMode />}
        {mode === 2 && <InvasionMode />}
        {mode === 3 && <KnightMode />}
        {mode === 4 && <CoinMode />}

        {/* System Idle Badge */}
        <div className="absolute bottom-10 left-10 p-2 border border-border bg-background shadow-[2px_2px_0px_0px_var(--border-color)] z-20 hidden md:block opacity-50">
           <div className="flex items-center gap-2 font-mono text-xs">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span>SYSTEM_IDLE: MODE_0{mode}</span>
           </div>
        </div>
    </motion.div>
  );
}

// --- SPRITE ANIMATOR HELPER ---
// Supports non-square sprites with width/height
function PixelSprite(props: any) {
     const { src, size = 32, width, height, frames = 4, row = 0, scale = 3, flip = false, fps = 12 } = props;
     const w = width ?? size;
     const h = height ?? size;
     
     return (
        <div style={{
            width: w,
            height: h,
            transform: `scale(${scale}) ${flip ? 'scaleX(-1)' : ''}`,
            overflow: 'hidden',
            imageRendering: 'pixelated'
        }}>
            <div style={{
                width: w * frames,
                height: h,
                backgroundImage: `url(${src})`,
                backgroundPositionY: -row * h,
                animation: `spriteRun ${frames/fps}s steps(${frames}) infinite`
            }}>
                <style>{`
                    @keyframes spriteRun {
                        0% { transform: translateX(0px); }
                        100% { transform: translateX(-${w * frames}px); }
                    }
                `}</style>
            </div>
        </div>
     );
}

// MODE 1: THE SLIME (VIRUS REPLACEMENT)
function SlimeMode() {
    return (
        <div className="relative w-full h-full">
            <motion.div 
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                animate={{ 
                    x: ["30%", "60%", "35%", "80%"],
                }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
                {/* Increased FPS for smoother hopping. Size fixed to 24 for 96x72 sprites  */}
                <PixelSprite src="/sprites/slime_green.png" size={24} frames={4} row={0} scale={3} fps={10} />
            </motion.div>
            
            {/* Glitch effects - Enhanced for visibility in light/dark modes */}
            {/* Green color flash overlay */}
            <motion.div 
                className="absolute inset-0 pointer-events-none mix-blend-multiply dark:mix-blend-screen"
                style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)' }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 3 }}
            />
            
            {/* Scanline effect */}
            <motion.div 
                className="absolute inset-0 pointer-events-none overflow-hidden"
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3, delay: 0.05 }}
            >
                <div 
                    className="w-full h-full"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.1) 2px, rgba(0, 255, 0, 0.1) 4px)',
                        backgroundSize: '100% 4px',
                    }}
                />
            </motion.div>
            
            {/* Chromatic aberration / color shift effect */}
            <motion.div 
                className="absolute inset-0 pointer-events-none"
                animate={{ 
                    opacity: [0, 0.6, 0],
                    x: [0, 3, -3, 0],
                }}
                transition={{ duration: 0.12, repeat: Infinity, repeatDelay: 4 }}
            >
                <div 
                    className="absolute inset-0"
                    style={{
                        boxShadow: 'inset 0 0 100px rgba(0, 255, 0, 0.2), inset 0 0 200px rgba(0, 255, 0, 0.1)',
                    }}
                />
            </motion.div>
        </div>
    )
}

// MODE 2: INVASION (SPACESHIPS REPLACEMENT)
function InvasionMode() {
    return (
        <div className="relative w-full h-full">
             {[...Array(8)].map((_, i) => (
                 <motion.div
                    key={i}
                    className="absolute top-10"
                    style={{ left: `${10 + i * 10}%` }}
                    animate={{ y: [0, 40, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                 >
                     {/* Purple slime: 96x72 -> 4 frames of 24x24, 3 rows */}
                     <PixelSprite src="/sprites/coin.png" size={16} frames={4} row={0} scale={2} fps={10} />
                 </motion.div>
             ))}
             {/* Use Knight as defender? */}
             <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                <PixelSprite src="/sprites/knight.png" size={32} frames={2} row={0} scale={3} fps={6} />
             </div>
        </div>
    )
}

// MODE 3: KNIGHT RUN (NINJA REPLACEMENT)
function KnightMode() {
    return (
        <div className="relative w-full h-full flex items-end pb-10">
             <motion.div
                className="absolute"
                animate={{ x: ["-10vw", "110vw"] }}
                // Faster movement to match running
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
             >
                  {/* Row 2 is Run. Row 1 was the label. */}
                  <PixelSprite src="/sprites/knight.png" size={32} frames={8} row={2} scale={4} fps={14} />
             </motion.div>
        </div>
    )
}

// MODE 4: BOUNCING COIN (DVD REPLACEMENT)
function CoinMode() {
    return (
        <div className="relative w-full h-full">
            <motion.div
                className="absolute"
                animate={{ 
                    x: ["0vw", "90vw", "0vw"],
                    y: ["0vh", "90vh", "0vh"],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear", times: [0, 0.5, 1] }}
            >
                {/* Coin usually single row animation */}
                <PixelSprite src="/sprites/coin.png" size={16} frames={4} row={0} scale={6} fps={10} />
            </motion.div>
        </div>
    )
}


// ... Typewriter and other helpers

function TypewriterText({ text, active, delay = 0 }: { text: string; active: boolean; delay?: number }) {
  const [displayed, setDisplayed] = React.useState('');
  
  React.useEffect(() => {
    if (!active) {
      setDisplayed('');
      return;
    }

    const timeout = setTimeout(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= text.length) {
                setDisplayed(text.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 50);

        return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [active, text, delay]);

  return <div className="min-h-[1.2em]">{displayed}</div>;
}

