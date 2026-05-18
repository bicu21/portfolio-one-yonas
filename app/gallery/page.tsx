"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import FogOverlay from "@/components/effects/FogOverlay";

gsap.registerPlugin(ScrollTrigger);

export default function GalleryPage() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-header-char", {
        y: 80,
        opacity: 0,
        stagger: 0.05,
        duration: 1.2,
        ease: "power3.out",
      });
    }, headerRef);
    return () => ctx.revert();
  }, []);

  const title = "THE COLLECTION";

  return (
    <div className="relative min-h-screen pt-28 pb-24 px-6" style={{ background: "#020617" }}>
      {/* Ambient glows */}
      <div
        className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 30%, rgba(22,78,99,0.12) 0%, transparent 60%)",
        }}
      />
      <div
        className="fixed top-0 right-0 w-full h-screen pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 80% 70%, rgba(0,229,255,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Page header */}
        <div ref={headerRef} className="mb-20 text-center">
          {/* Faded BG text */}
          <div
            className="absolute inset-x-0 flex justify-center pointer-events-none select-none overflow-hidden"
            style={{ top: "-2rem" }}
          >
            <span
              className="font-display font-bold uppercase text-white"
              style={{
                fontSize: "clamp(5rem, 18vw, 16rem)",
                opacity: 0.025,
                letterSpacing: "0.2em",
                lineHeight: 1,
              }}
            >
              GALLERY
            </span>
          </div>

          <p className="gallery-header-char font-body text-xs tracking-[0.5em] uppercase mb-4" style={{ color: "#00e5ff" }}>
            Digital Exhibition
          </p>

          <div className="overflow-hidden">
            <h1 className="font-display font-light text-white leading-none"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", letterSpacing: "0.2em" }}>
              {title.split("").map((char, i) => (
                <span
                  key={i}
                  className="gallery-header-char inline-block"
                  style={{ display: char === " " ? "inline" : "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
          </div>

          {/* Divider */}
          <motion.div
            className="mx-auto mt-8"
            style={{
              height: 1,
              background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent)",
            }}
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Filter tags (decorative) */}
        <motion.div
          className="flex flex-wrap gap-3 mb-12 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {["All Works", "Abstract", "Digital", "Mixed Media", "Photography", "Conceptual"].map(
            (tag, i) => (
              <button
                key={tag}
                className="font-body text-xs tracking-[0.2em] uppercase px-4 py-2 rounded-sm transition-all duration-300"
                style={{
                  border: i === 0 ? "1px solid rgba(0,229,255,0.5)" : "1px solid rgba(255,255,255,0.08)",
                  color: i === 0 ? "#00e5ff" : "rgba(255,255,255,0.3)",
                  background: i === 0 ? "rgba(0,229,255,0.05)" : "transparent",
                }}
              >
                {tag}
              </button>
            )
          )}
        </motion.div>

        {/* Gallery grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <GalleryGrid />
        </motion.div>
      </div>

      <FogOverlay />
    </div>
  );
}
