"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealTextProps {
  children: string | ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

const containerVariants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: {
      staggerChildren: stagger,
    },
  }),
};

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function RevealText({
  children,
  className = "",
  delay = 0,
  stagger = 0.08,
  as: Tag = "div",
}: RevealTextProps) {
  if (typeof children !== "string") {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    );
  }

  const words = children.split(" ");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={stagger}
      transition={{ delayChildren: delay }}
      className={`${className} flex flex-wrap gap-x-[0.25em]`}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariants} style={{ display: "inline-block" }}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
