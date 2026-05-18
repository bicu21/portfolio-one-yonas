"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/studio", label: "Studio", hidden: true },
];

export default function CinematicNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{}}
    >
      <motion.div
        className="absolute inset-0 backdrop-blur-md"
        style={{
          backgroundColor: `rgba(2,6,23,${bgOpacity})`,
          borderBottom: "1px solid rgba(0,229,255,0.05)",
        }}
      />

      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Logo */}
        <Link href="/" className="group relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="font-display text-2xl font-light tracking-[0.4em] uppercase"
              style={{ color: "#fff", textShadow: "0 0 20px rgba(0,229,255,0.4)" }}
            >
              Y
            </span>
            <span className="font-display text-2xl font-light tracking-[0.2em] uppercase text-white/60">
              ONAS
            </span>
          </motion.div>
        </Link>

        {/* Desktop Links */}
        <motion.ul
          className="hidden md:flex items-center gap-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {navLinks
            .filter((l) => !l.hidden)
            .map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative font-body text-xs tracking-[0.25em] uppercase transition-colors duration-300"
                  style={{
                    color: pathname === link.href ? "#00e5ff" : "rgba(226,232,240,0.6)",
                  }}
                >
                  {link.label}
                  {/* Underline glow */}
                  <span
                    className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                    style={{ background: "linear-gradient(90deg, transparent, #00e5ff, transparent)" }}
                  />
                </Link>
              </li>
            ))}

          {/* Studio link — subtle */}
          <li>
            <Link
              href="/studio"
              className="font-body text-xs tracking-[0.25em] uppercase transition-all duration-300 px-3 py-1.5 rounded-sm"
              style={{
                color: "rgba(0,229,255,0.5)",
                border: "1px solid rgba(0,229,255,0.15)",
              }}
            >
              Studio
            </Link>
          </li>
        </motion.ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden relative z-10 flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-px bg-white/70"
              animate={{
                width: i === 1 ? (mobileOpen ? "100%" : "60%") : "100%",
                opacity: mobileOpen && i === 1 ? 0 : 1,
                rotate:
                  mobileOpen
                    ? i === 0
                      ? 45
                      : i === 2
                      ? -45
                      : 0
                    : 0,
                y: mobileOpen ? (i === 0 ? 8 : i === 2 ? -8 : 0) : 0,
              }}
              style={{ width: "24px" }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden absolute top-full left-0 right-0 overflow-hidden"
        initial={false}
        animate={{ height: mobileOpen ? "auto" : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: "rgba(2,6,23,0.95)",
          borderBottom: "1px solid rgba(0,229,255,0.1)",
        }}
      >
        <ul className="flex flex-col gap-6 px-6 py-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-body text-sm tracking-[0.3em] uppercase"
                style={{ color: pathname === link.href ? "#00e5ff" : "rgba(226,232,240,0.7)" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.header>
  );
}
