"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-16 h-8 bg-gray-300 rounded-full p-1 opacity-50" />
    )
  }

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`
        w-16 h-11 rounded-full p-1 flex items-center transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 border-2 border-border shadow-[2px_2px_0px_0px_var(--border-color)]
        ${isDark ? "bg-secondary" : "bg-primary"}
      `}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        className="bg-background w-6 h-6 rounded-full shadow-md flex items-center justify-center border border-border"
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        style={{
           // Align left if light (not dark), right if dark
           marginLeft: isDark ? "auto" : 0,
           marginRight: isDark ? 0 : "auto" 
        }}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 0 : 360, scale: isDark ? 0 : 1, opacity: isDark ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          style={{ position: "absolute" }}
        >
          <Sun className="w-3 h-3 text-foreground" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 0 : -360, scale: isDark ? 1 : 0, opacity: isDark ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ position: "absolute" }}
        >
          <Moon className="w-3 h-3 text-foreground" />
        </motion.div>
      </motion.div>
    </button>
  )
}
