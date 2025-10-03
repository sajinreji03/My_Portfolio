"use client";

import React, { useState, useEffect } from "react";
// --- PICK ONE of the two import lines below depending on what you use in your project ---
// Option A: Motion One (example from Aceternity) 
import { motion, AnimatePresence } from "motion/react";
// Option B: Framer Motion (if your project uses framer-motion)
// import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils"; // your utility; optional

/**
 * LayoutTextFlip
 * - words: array of strings to cycle through (e.g. ["Front End", "Full Stack"])
 * - duration: interval in ms between word changes (3000 = 3s)
 * - className: extra wrapper classes (inline styles recommended)
 */
export const LayoutTextFlip = ({
  words = ["Full Stack", "Front End"],
  duration = 3000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % words.length);
    }, duration);

    return () => clearInterval(id);
  }, [duration, words.length]);

  return (
    // role + aria-live make it polite for screen-readers
    <span
      className={cn("inline-flex items-center gap-3", className)}
      aria-live="polite"
      aria-atomic="true"
      role="status"
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={currentIndex}
          initial={{ y: -12, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: 12, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45 }}
          className="inline-block whitespace-nowrap rounded-md px-3 py-1 text-4xl md:text-6xl font-semibold
                     bg-white text-black shadow-sm ring-black/10 dark:bg-neutral-900 dark:text-white"
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
