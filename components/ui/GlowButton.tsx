"use client";

import { motion } from "framer-motion";
import type { ReactNode, ButtonHTMLAttributes } from "react";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  href?: string;
}

export default function GlowButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: GlowButtonProps) {
  const base =
    "relative inline-flex items-center gap-2 px-8 py-3 font-body text-xs tracking-[0.3em] uppercase transition-all duration-500 overflow-hidden rounded-sm";

  const styles = {
    primary: {
      background: "rgba(0,229,255,0.1)",
      border: "1px solid rgba(0,229,255,0.4)",
      color: "#00e5ff",
    },
    ghost: {
      background: "transparent",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "rgba(226,232,240,0.7)",
    },
    outline: {
      background: "transparent",
      border: "1px solid rgba(0,229,255,0.2)",
      color: "rgba(0,229,255,0.8)",
    },
  };

  return (
    <motion.button
      className={`${base} ${className}`}
      style={styles[variant]}
      whileHover={{
        boxShadow: "0 0 30px rgba(0,229,255,0.4), 0 0 60px rgba(0,229,255,0.15)",
        borderColor: "rgba(0,229,255,0.8)",
        color: "#fff",
        y: -2,
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      {...(props as Parameters<typeof motion.button>[0])}
    >
      {/* Shimmer overlay */}
      <motion.span
        className="absolute inset-0 opacity-0"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(0,229,255,0.15) 50%, transparent 60%)",
        }}
        whileHover={{ opacity: 1, x: ["−100%", "200%"] }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
