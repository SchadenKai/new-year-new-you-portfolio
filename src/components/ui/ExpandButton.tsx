import React from 'react';
import { motion } from 'framer-motion';

interface ExpandButtonProps {
  isExpanded: boolean;
  onClick: () => void;
  labelMore?: string;
  labelLess?: string;
  className?: string;
}

export function ExpandButton({
  isExpanded,
  onClick,
  labelMore = "View More",
  labelLess = "View Less",
  className = "",
}: ExpandButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3 bg-primary text-primary-foreground font-bold font-mono tracking-wider border-2 border-foreground shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-y-1 hover:shadow-none transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary items-center flex gap-2 rounded-sm ${className}`}
      aria-expanded={isExpanded}
    >
      {isExpanded ? labelLess : labelMore}
      <motion.span 
         animate={{ rotate: isExpanded ? 180 : 0 }}
         transition={{ duration: 0.3 }}
         aria-hidden="true"
         className="inline-block"
      >
        ↓
      </motion.span>
    </button>
  );
}
