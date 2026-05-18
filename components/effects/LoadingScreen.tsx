"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"particles" | "logo" | "fade">("particles");
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles
    const p: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(p);

    const t1 = setTimeout(() => setPhase("logo"), 1200);
    const t2 = setTimeout(() => setPhase("fade"), 3000);
    const t3 = setTimeout(() => onComplete(), 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "fade" ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "#020617" }}
          exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
        >
          {/* Ambient background glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,229,255,0.08) 0%, transparent 70%)",
            }}
          />

          {/* Floating particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: "#00e5ff",
                boxShadow: `0 0 ${p.size * 4}px rgba(0,229,255,0.8)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.8, 0.3, 0.8, 0],
                scale: [0, 1, 0.8, 1.2, 0],
                y: [0, -30, -60, -90, -120],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Horizontal line */}
          <motion.div
            className="absolute"
            style={{ height: 1, background: "rgba(0,229,255,0.2)", top: "50%" }}
            initial={{ width: 0, left: "50%" }}
            animate={{ width: "100%", left: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
          />

          {/* Artist Logo / Name */}
          <AnimatePresence>
            {phase === "logo" && (
              <motion.div
                key="logo"
                className="relative z-10 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Big faded BG text */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                  style={{ transform: "scale(2)", opacity: 0.05 }}
                >
                  <span
                    className="font-display text-[clamp(4rem,15vw,12rem)] font-bold tracking-[0.4em] text-white uppercase"
                  >
                    YONAS
                  </span>
                </div>

                {/* Foreground name */}
                <motion.h1
                  className="font-display text-[clamp(3rem,10vw,8rem)] font-light tracking-[0.6em] uppercase text-white"
                  style={{ textShadow: "0 0 40px rgba(0,229,255,0.6)" }}
                  initial={{ letterSpacing: "0.2em", opacity: 0 }}
                  animate={{ letterSpacing: "0.6em", opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  YONAS
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  className="mt-4 font-body text-xs tracking-[0.5em] uppercase"
                  style={{ color: "#00e5ff" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.7, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Visual Artist &bull; Digital Exhibition
                </motion.p>

                {/* Glow line under */}
                <motion.div
                  className="mx-auto mt-6"
                  style={{
                    height: 1,
                    background: "linear-gradient(90deg, transparent, #00e5ff, transparent)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: 200 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Corner decorations */}
          {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} w-8 h-8`}
              style={{
                borderTop: i < 2 ? "1px solid rgba(0,229,255,0.4)" : "none",
                borderBottom: i >= 2 ? "1px solid rgba(0,229,255,0.4)" : "none",
                borderLeft: i % 2 === 0 ? "1px solid rgba(0,229,255,0.4)" : "none",
                borderRight: i % 2 === 1 ? "1px solid rgba(0,229,255,0.4)" : "none",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            />
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
