"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

interface GithubStatsProps {
  username: string;
}

interface AsyncStatsImageProps {
  src: string;
  alt: string;
  className?: string;
  displayBlock?: boolean;
}

function AsyncStatsImage({ src, alt, className = "", displayBlock = false }: AsyncStatsImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`relative w-full ${displayBlock ? 'block' : 'flex items-center justify-center'} min-h-[100px] ${className}`}>
        {isLoading && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-sm" />
        )}
        
        {!error ? (
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setIsLoading(false)}
                onError={() => { 
                    setIsLoading(false); 
                    setError(true); 
                }}
                className={`transition-opacity duration-500 w-full h-auto object-contain ${isLoading ? 'opacity-0 absolute' : 'opacity-100 relative'}`}
            />
        ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-border w-full h-full min-h-[150px]">
                <span className="text-4xl mb-2">👾</span>
                <p className="text-sm font-mono text-muted-foreground">
                    Failed to load {alt}
                </p>
            </div>
        )}
    </div>
  );
}

export function GithubStats({ username }: GithubStatsProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
        <section aria-labelledby="github-stats-heading" className="w-full">
            <h3 id="github-stats-heading" className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 uppercase flex items-center tracking-wide">
                <span className="w-4 h-4 md:w-6 md:h-6 bg-primary mr-3 md:mr-6" aria-hidden="true"></span>
                GitHub Activity
            </h3>
            <div className="w-full h-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-sm" />
        </section>
    ); 
  }

  const isDark = resolvedTheme === 'dark';
  
  // Theme configuration
  // User requested themes for dark mode, default/standard for light
  const graphTheme = isDark ? 'merko' : 'default';
  const langTheme = isDark ? 'react' : 'default';
  const streakTheme = isDark ? 'black-ice' : 'default';
  const statsTheme = isDark ? 'dark' : 'default';
  const calendarColor = '7C3AED'; 

  return (
    <section aria-labelledby="github-stats-heading" className="w-full">
      <h3 id="github-stats-heading" className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 uppercase flex items-center tracking-wide">
        <span className="w-4 h-4 md:w-6 md:h-6 bg-primary mr-3 md:mr-6" aria-hidden="true"></span>
        GitHub Activity
      </h3>

      <div className="flex flex-col gap-6 md:gap-8">
        
        {/* Top Row: Languages & Activity Graph */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            
            {/* Top Languages - ~40% space */}
             <motion.div 
               className="w-full lg:w-[40%] flex flex-col"
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
             >
                <div className="bg-surface border-2 border-border shadow-[4px_4px_0px_0px_var(--foreground)] rounded-sm overflow-hidden flex-grow">
                    <div className="p-4 flex items-center justify-center h-full bg-surface w-full">
                        <AsyncStatsImage
                            src={`https://github-readme-stats-matin.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${langTheme}&hide_border=true&bg_color=${isDark ? '1a1a1a' : 'ffffff'}`}
                            alt="Top Languages"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Activity Graph - ~60% space */}
            <motion.div 
                className="w-full lg:w-[60%] flex flex-col"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
            >
                 <div className="bg-surface border-2 border-border shadow-[4px_4px_0px_0px_var(--foreground)] rounded-sm overflow-hidden flex-grow">
                    <div className="p-4 flex items-center justify-center h-full bg-surface w-full">
                        <AsyncStatsImage
                            src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${graphTheme}&hide_border=true&area=true&bg_color=${isDark ? '1a1a1a' : 'ffffff'}&color=${calendarColor}`}
                            alt="Activity Graph"
                            displayBlock
                        />
                    </div>
                </div>
            </motion.div>
        </div>

        {/* Contribution Calendar (Heatmap) - Full Width */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full overflow-hidden bg-surface border-2 border-border shadow-[4px_4px_0px_0px_var(--foreground)] rounded-sm p-4 md:p-6"
        >
          <div className="flex flex-col gap-4">
            <h4 className="font-mono font-bold text-lg md:text-xl text-primary">Contribution Map</h4>
            <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
              <div className="min-w-[700px]">
                <AsyncStatsImage
                  src={`https://ghchart.rshah.org/${calendarColor}/${username}`} 
                  alt={`${username}'s Github Contribution Chart`}
                  displayBlock
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Streak Stats - Centered or Full Width */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="w-full bg-surface border-2 border-border shadow-[4px_4px_0px_0px_var(--foreground)] rounded-sm overflow-hidden flex flex-col"
        >
             <div className="p-4 md:p-6 flex-grow flex items-center justify-center bg-surface w-full">
                <AsyncStatsImage
                  src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${streakTheme}&hide_border=true&date_format=M%20j%20Y&background=${isDark ? '1a1a1a' : 'ffffff'}&ring=${calendarColor}&currStreakLabel=${calendarColor}`}
                  alt="GitHub Streak"
                />
             </div>
        </motion.div>

      </div>
    </section>
  );
}
