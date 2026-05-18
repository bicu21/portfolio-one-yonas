"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import FloatingElement from "@/components/animations/FloatingElement";
import FogOverlay from "@/components/effects/FogOverlay";
import type { Artwork } from "@/types/artwork";

interface ArtworkDetailClientProps {
  artwork: Artwork;
}

export default function ArtworkDetailClient({ artwork }: ArtworkDetailClientProps) {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "#020617" }}>
      {/* Deep ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 30%, rgba(0,229,255,0.04) 0%, transparent 70%)",
        }}
      />

      <FogOverlay />

      {/* Back button */}
      <motion.div
        className="fixed top-24 left-6 z-30"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 font-body text-xs tracking-[0.3em] uppercase transition-colors duration-300"
          style={{ color: "rgba(0,229,255,0.5)" }}
        >
          <span>←</span>
          <span>Gallery</span>
        </Link>
      </motion.div>

      {/* Main layout */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-center gap-16 px-6 pt-24 pb-16">

        {/* ── Artwork Image (floating) ─────────────── */}
        <FloatingElement duration={9} amplitude={18} className="relative flex-shrink-0">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Glow behind image */}
            <div
              className="absolute -inset-8 rounded-sm pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,229,255,0.12) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />

            {/* Image */}
            <div
              className="relative overflow-hidden rounded-sm"
              style={{
                width: "min(90vw, 550px)",
                aspectRatio: "3/4",
                border: "1px solid rgba(0,229,255,0.15)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.8), 0 0 60px rgba(0,229,255,0.1)",
              }}
            >
              <Image
                src={artwork.image_url}
                alt={artwork.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 90vw, 550px"
              />
            </div>

            {/* Reflective floor */}
            <div
              className="absolute left-0 right-0 pointer-events-none overflow-hidden"
              style={{
                top: "100%",
                height: "30%",
                transform: "scaleY(-1)",
                opacity: 0.12,
                filter: "blur(6px)",
                maskImage: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
              }}
            >
              <Image
                src={artwork.image_url}
                alt=""
                fill
                className="object-cover"
                aria-hidden
                sizes="550px"
              />
            </div>
          </motion.div>
        </FloatingElement>

        {/* ── Artwork Info ────────────────────────── */}
        <motion.div
          className="relative max-w-md"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Vertical line accent */}
          <motion.div
            className="absolute left-0 top-0 w-px"
            style={{ background: "linear-gradient(to bottom, #00e5ff, transparent)" }}
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1.5, delay: 0.6 }}
          />

          <div className="pl-8">
            {/* Category + Year */}
            <div className="mb-4 flex items-center gap-4">
              <span
                className="font-body text-xs tracking-[0.4em] uppercase"
                style={{ color: "#00e5ff" }}
              >
                {artwork.category ?? "Art"}
              </span>
              {artwork.year && (
                <>
                  <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                  <span className="font-body text-xs tracking-widest text-white/30">
                    {artwork.year}
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h1
              className="font-display font-light text-white leading-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              {artwork.title}
            </h1>

            {/* Divider */}
            <div
              className="mb-6 h-px"
              style={{ background: "rgba(0,229,255,0.15)", width: "80%" }}
            />

            {/* Description */}
            {artwork.description && (
              <p className="font-body text-white/45 leading-loose text-sm">
                {artwork.description}
              </p>
            )}

            {/* Acquire / Contact CTA */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <Link href="/contact">
                <button
                  className="font-body text-xs tracking-[0.3em] uppercase px-8 py-3 rounded-sm transition-all duration-500"
                  style={{
                    border: "1px solid rgba(0,229,255,0.3)",
                    color: "#00e5ff",
                    background: "rgba(0,229,255,0.05)",
                  }}
                >
                  Inquire About This Work
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
