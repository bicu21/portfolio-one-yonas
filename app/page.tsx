"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingElement from "@/components/animations/FloatingElement";
import RevealText from "@/components/animations/RevealText";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import FogOverlay from "@/components/effects/FogOverlay";
import GlowButton from "@/components/ui/GlowButton";

gsap.registerPlugin(ScrollTrigger);

// Dynamically import 3D scene (no SSR)
const AtmosphereScene = dynamic(
  () => import("@/components/3d/AtmosphereScene"),
  { ssr: false, loading: () => null }
);

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Parallax transforms
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const bgTextY = useTransform(scrollY, [0, 600], [0, -80]);

  // Mouse parallax
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      gsap.to(".hero-layer-1", { x: dx * -18, y: dy * -18, duration: 1.5, ease: "power2.out" });
      gsap.to(".hero-layer-2", { x: dx * -30, y: dy * -30, duration: 2, ease: "power2.out" });
      gsap.to(".hero-layer-3", { x: dx * -8, y: dy * -8, duration: 2.5, ease: "power2.out" });
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // GSAP section reveals
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".section-reveal", {
        scrollTrigger: {
          trigger: ".section-reveal",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative overflow-x-hidden" style={{ background: "#020617" }}>

      {/* ──────────────── HERO ──────────────── */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "100svh" }}
      >
        {/* 3D Background Canvas */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <AtmosphereScene className="h-full w-full" />
        </motion.div>

        {/* Fog overlay */}
        <FogOverlay />

        {/* Background faded BIG text */}
        <motion.div
          ref={bgTextRef}
          className="hero-layer-3 absolute inset-0 flex items-center justify-center pointer-events-none select-none z-5"
          style={{ y: bgTextY }}
        >
          <span
            className="font-display font-bold uppercase text-white"
            style={{
              fontSize: "clamp(6rem, 25vw, 22rem)",
              letterSpacing: "0.3em",
              opacity: 0.03,
              lineHeight: 1,
            }}
          >
            ART
          </span>
        </motion.div>

        {/* Center content */}
        <div className="hero-layer-1 relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Eyebrow */}
          <motion.p
            className="hero-layer-2 mb-6 font-body text-xs tracking-[0.5em] uppercase"
            style={{ color: "#00e5ff" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Visual Artist &bull; Digital Exhibition
          </motion.p>

          {/* Main headline */}
          <motion.h1
            className="font-display font-light leading-none text-white"
            style={{ fontSize: "clamp(4rem, 12vw, 10rem)", letterSpacing: "0.15em" }}
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            YONAS
          </motion.h1>

          {/* Sub-tagline */}
          <motion.p
            className="mt-6 font-body font-light text-white/50 max-w-lg mx-auto"
            style={{ fontSize: "clamp(0.8rem, 2vw, 1rem)", letterSpacing: "0.1em" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Enter an immersive world where paintings float in infinite darkness,
            illuminated by cold cyan light.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="mt-12 flex items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <Link href="/gallery">
              <GlowButton variant="primary">Enter Gallery</GlowButton>
            </Link>
            <Link href="/about">
              <GlowButton variant="ghost">About the Artist</GlowButton>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-white/40">
            Scroll
          </span>
          <motion.div
            className="w-px h-12"
            style={{ background: "linear-gradient(to bottom, rgba(0,229,255,0.5), transparent)" }}
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Corner accents */}
        <div className="absolute top-24 left-6 z-20 opacity-30">
          <div className="w-8 h-8" style={{ borderTop: "1px solid #00e5ff", borderLeft: "1px solid #00e5ff" }} />
        </div>
        <div className="absolute top-24 right-6 z-20 opacity-30">
          <div className="w-8 h-8" style={{ borderTop: "1px solid #00e5ff", borderRight: "1px solid #00e5ff" }} />
        </div>
      </section>

      {/* ──────────────── FEATURED WORKS ──────────────── */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Background Image with Glassmorphism */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-20"
          style={{ backgroundImage: "url('/bg-deepblue.jpg')" }}
        />
        <div
          className="absolute inset-0 z-5 pointer-events-none"
          style={{
            background: "rgba(2, 6, 23, 0.4)",
            backdropFilter: "blur(6px)",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section header */}
          <div className="section-reveal mb-16 flex items-end justify-between">
            <div>
              <p className="font-body text-xs tracking-[0.5em] uppercase mb-3" style={{ color: "#00e5ff" }}>
                Selected Works
              </p>
              <h2 className="font-display font-light text-white leading-none"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
                The Collection
              </h2>
            </div>
            <Link href="/gallery" className="hidden md:block">
              <GlowButton variant="outline">View All</GlowButton>
            </Link>
          </div>

          {/* Gallery */}
          <GalleryGrid limit={6} preview />

          <div className="mt-12 flex justify-center md:hidden">
            <Link href="/gallery">
              <GlowButton variant="outline">View All Works</GlowButton>
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────── ABOUT TEASER ──────────────── */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Background Image with Glassmorphism */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-25"
          style={{ backgroundImage: "url('/bg-waterfall.jpg')" }}
        />
        <div
          className="absolute inset-0 z-5 pointer-events-none"
          style={{
            background: "rgba(2, 6, 23, 0.55)",
            backdropFilter: "blur(8px)",
          }}
        />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="section-reveal">
            <p className="font-body text-xs tracking-[0.5em] uppercase mb-4" style={{ color: "#00e5ff" }}>
              The Artist
            </p>
            <h2 className="font-display font-light text-white leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
              Between Light<br />and Darkness
            </h2>
            <p className="font-body text-white/40 leading-relaxed mb-8" style={{ maxWidth: "38ch" }}>
              My work exists in the tension between presence and absence — paintings that breathe,
              surfaces that reflect, and light that feels like water.
            </p>
            <Link href="/about">
              <GlowButton variant="ghost">Read More</GlowButton>
            </Link>
          </div>

          {/* Decorative floating frame */}
          <div className="section-reveal relative h-80 hidden md:block">
            <FloatingElement duration={8} amplitude={15} className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-64 h-64 rounded-sm relative"
                style={{
                  border: "1px solid rgba(0,229,255,0.15)",
                  background: "rgba(255,255,255,0.02)",
                  boxShadow: "0 0 60px rgba(0,229,255,0.08)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="absolute -top-3 -left-3 w-6 h-6"
                  style={{ borderTop: "1px solid #00e5ff", borderLeft: "1px solid #00e5ff", opacity: 0.6 }}
                />
                <div
                  className="absolute -bottom-3 -right-3 w-6 h-6"
                  style={{ borderBottom: "1px solid #00e5ff", borderRight: "1px solid #00e5ff", opacity: 0.6 }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="font-display text-7xl font-light text-white"
                    style={{ opacity: 0.06, letterSpacing: "0.3em" }}
                  >
                    Y
                  </span>
                </div>
              </div>
            </FloatingElement>
          </div>
        </div>
      </section>

      {/* ──────────────── CONTACT CTA ──────────────── */}
      <section className="relative py-32 px-6 text-center overflow-hidden">
        {/* Background Image with Glassmorphism */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-20"
          style={{ backgroundImage: "url('/bg-hallway.jpg')" }}
        />
        <div
          className="absolute inset-0 z-5 pointer-events-none"
          style={{
            background: "rgba(2, 6, 23, 0.6)",
            backdropFilter: "blur(10px)",
          }}
        />

        <div className="max-w-2xl mx-auto section-reveal relative z-10">
          <p className="font-body text-xs tracking-[0.5em] uppercase mb-4" style={{ color: "#00e5ff" }}>
            Collaborations
          </p>
          <h2 className="font-display font-light text-white leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            Let&apos;s Create<br />Something Together
          </h2>
          <Link href="/contact">
            <GlowButton variant="primary" className="mt-4">Get in Touch</GlowButton>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t" style={{ borderColor: "rgba(0,229,255,0.05)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span
            className="font-display text-lg font-light tracking-[0.4em] uppercase text-white/30"
          >
            YONAS
          </span>
          <p className="font-body text-xs text-white/20 tracking-widest uppercase">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
