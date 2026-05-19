"use client";

import { motion } from "framer-motion";
import FogOverlay from "@/components/effects/FogOverlay";
import FloatingElement from "@/components/animations/FloatingElement";
import RevealText from "@/components/animations/RevealText";
import Link from "next/link";

const timeline = [
  { year: "2018", event: "First solo exhibition — 'Absence of Color'" },
  { year: "2020", event: "Residency at the International Digital Arts Center" },
  { year: "2021", event: "Featured in WIRED — '50 Artists Shaping the Future'" },
  { year: "2022", event: "Retrospective at the Contemporary Museum of Digital Art" },
  { year: "2023", event: "Launch of the Void Series — 12 paintings, worldwide touring" },
  { year: "2024", event: "Digital Exhibition — immersive online gallery launch" },
];

export default function AboutClient() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "#020617" }}>
      {/* Background Image with Glassmorphism */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none opacity-15"
        style={{ backgroundImage: "url('/bg-waterfall.jpg')" }}
      />
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "rgba(2, 6, 23, 0.5)",
          backdropFilter: "blur(12px)",
        }}
      />

      <FogOverlay />

      {/* Ambient glow left */}
      <div
        className="fixed top-0 left-0 w-1/2 h-screen pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 0% 40%, rgba(22,78,99,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24">

        {/* ── Hero ── */}
        <div className="mb-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p
              className="font-body text-xs tracking-[0.5em] uppercase mb-4"
              style={{ color: "#00e5ff" }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              The Artist
            </motion.p>
            <motion.h1
              className="font-display font-light text-white leading-none mb-8"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "0.1em" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              YONAS
            </motion.h1>

            <motion.p
              className="font-body text-white/40 leading-loose max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              I work at the intersection of light, absence, and digital materiality.
              My paintings are not about what you see — they&apos;re about what remains after the light disappears.
              Each piece is an invitation to stay with the discomfort of not knowing.
            </motion.p>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link href="/contact">
                <button
                  className="font-body text-xs tracking-[0.3em] uppercase px-6 py-3 rounded-sm"
                  style={{ border: "1px solid rgba(0,229,255,0.25)", color: "rgba(0,229,255,0.6)" }}
                >
                  Get in Touch
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Decorative floating block */}
          <FloatingElement duration={10} amplitude={12} className="hidden lg:flex justify-center">
            <div
              className="relative w-72 h-72 rounded-sm flex items-center justify-center"
              style={{
                border: "1px solid rgba(0,229,255,0.08)",
                background: "rgba(0,229,255,0.01)",
              }}
            >
              <span
                className="font-display font-light text-white"
                style={{ fontSize: "8rem", opacity: 0.04, letterSpacing: "0.2em" }}
              >
                Y
              </span>
              {/* Corner marks */}
              {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r",
                "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((cls, i) => (
                <div
                  key={i}
                  className={`absolute w-4 h-4 ${cls}`}
                  style={{ borderColor: "rgba(0,229,255,0.4)", margin: "-1px" }}
                />
              ))}
            </div>
          </FloatingElement>
        </div>

        {/* ── Divider ── */}
        <div className="mb-20 h-px" style={{ background: "rgba(0,229,255,0.06)" }} />

        {/* ── Artist Statement ── */}
        <div className="mb-24 max-w-2xl">
          <motion.p
            className="font-body text-xs tracking-[0.5em] uppercase mb-6"
            style={{ color: "#00e5ff" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true }}
          >
            Artist Statement
          </motion.p>
          <RevealText
            className="font-display font-light text-white/70 leading-relaxed"
            style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" } as React.CSSProperties}
          >
            Art is the only language that survives translation across consciousness.
            I paint darkness because darkness is where we are most honest with ourselves.
          </RevealText>
        </div>

        {/* ── Timeline ── */}
        <div>
          <motion.p
            className="font-body text-xs tracking-[0.5em] uppercase mb-10"
            style={{ color: "#00e5ff" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true }}
          >
            Timeline
          </motion.p>
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-20 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom, rgba(0,229,255,0.2), transparent)" }}
            />

            {timeline.map((item, i) => (
              <motion.div
                key={i}
                className="relative pl-32 pb-10 last:pb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                {/* Year */}
                <span
                  className="absolute left-0 top-0.5 font-body text-xs tracking-widest"
                  style={{ color: "#00e5ff", opacity: 0.5 }}
                >
                  {item.year}
                </span>
                {/* Dot */}
                <div
                  className="absolute left-[5.2rem] top-1.5 w-2 h-2 rounded-full -translate-x-1/2"
                  style={{
                    background: "#00e5ff",
                    boxShadow: "0 0 8px rgba(0,229,255,0.8)",
                    opacity: 0.6,
                  }}
                />
                {/* Event */}
                <p className="font-body text-sm text-white/40 leading-relaxed">{item.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
