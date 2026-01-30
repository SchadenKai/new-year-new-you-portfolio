"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BackToTop() {
  // visibility state
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Show button when user has scrolled past 80% of the viewport height (Hero section)
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check on mount as well
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ 
            scale: 1.05,
            x: -2,
            y: -2,
            boxShadow: "4px 4px 0px 0px var(--border-color)"
          }}
          whileTap={{ 
            scale: 0.95,
            x: 0,
            y: 0,
            boxShadow: "2px 2px 0px 0px var(--border-color)"
          }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 p-3 min-w-[44px] min-h-[44px] bg-primary text-primary-foreground border-2 border-border shadow-[2px_2px_0px_0px_var(--border-color)] rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
