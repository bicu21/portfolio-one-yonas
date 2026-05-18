"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FloatingElementProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  amplitude?: number;
  className?: string;
}

export default function FloatingElement({
  children,
  duration = 6,
  delay = 0,
  amplitude = 20,
  className = "",
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amplitude, 0],
        rotate: [0, 0.5, 0, -0.5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
