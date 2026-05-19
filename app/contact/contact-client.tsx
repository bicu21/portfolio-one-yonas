"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FogOverlay from "@/components/effects/FogOverlay";

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, wire to an email service (Resend, Mailgun, etc.)
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16"
      style={{ background: "#020617" }}>
      {/* Background Image with Glassmorphism */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none opacity-15"
        style={{ backgroundImage: "url('/bg-hallway.jpg')" }}
      />
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "rgba(2, 6, 23, 0.5)",
          backdropFilter: "blur(12px)",
        }}
      />

      <FogOverlay />

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,229,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="font-body text-xs tracking-[0.5em] uppercase mb-4"
            style={{ color: "#00e5ff" }}>
            Let&apos;s Connect
          </p>
          <h1 className="font-display font-light text-white leading-none"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", letterSpacing: "0.1em" }}>
            Contact
          </h1>
          <motion.div
            className="mx-auto mt-6 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent)" }}
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 1.2, delay: 0.4 }}
          />
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-8 rounded-sm"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(0,229,255,0.08)",
            backdropFilter: "blur(10px)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="col-span-2 sm:col-span-1 w-full px-4 py-3 text-sm"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="col-span-2 sm:col-span-1 w-full px-4 py-3 text-sm"
            />
          </div>
          <textarea
            placeholder="Your message..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            rows={5}
            className="w-full px-4 py-3 text-sm resize-none"
          />

          <AnimatePresence>
            {sent && (
              <motion.p
                className="text-xs tracking-widest uppercase text-center"
                style={{ color: "#00e5ff" }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Message sent — I&apos;ll be in touch soon.
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            className="w-full py-3 font-body text-xs tracking-[0.3em] uppercase rounded-sm transition-all duration-400"
            style={{
              background: "rgba(0,229,255,0.08)",
              border: "1px solid rgba(0,229,255,0.35)",
              color: "#00e5ff",
            }}
            whileHover={{
              boxShadow: "0 0 30px rgba(0,229,255,0.3)",
              borderColor: "rgba(0,229,255,0.7)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Send Message
          </motion.button>
        </motion.form>

        {/* Social / Contact Links */}
        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <a
            href="mailto:yonas@example.com"
            className="flex flex-col items-center justify-center p-4 rounded-sm transition-all duration-300 group"
            style={{
              background: "rgba(255,255,255,0.01)",
              border: "1px solid rgba(0,229,255,0.06)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,229,255,0.3)";
              e.currentTarget.style.background = "rgba(0,229,255,0.02)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0,229,255,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,229,255,0.06)";
              e.currentTarget.style.background = "rgba(255,255,255,0.01)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-white/30 group-hover:text-[#00e5ff] transition-colors">
              Email
            </span>
            <span className="mt-1 font-body text-xs text-white/60 tracking-wider">
              yonas@example.com
            </span>
          </a>

          <a
            href="https://instagram.com/yonas"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 rounded-sm transition-all duration-300 group"
            style={{
              background: "rgba(255,255,255,0.01)",
              border: "1px solid rgba(0,229,255,0.06)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,229,255,0.3)";
              e.currentTarget.style.background = "rgba(0,229,255,0.02)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0,229,255,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,229,255,0.06)";
              e.currentTarget.style.background = "rgba(255,255,255,0.01)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-white/30 group-hover:text-[#00e5ff] transition-colors">
              Instagram
            </span>
            <span className="mt-1 font-body text-xs text-white/60 tracking-wider">
              @yonas
            </span>
          </a>

          <a
            href="https://t.me/yonas"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 rounded-sm transition-all duration-300 group"
            style={{
              background: "rgba(255,255,255,0.01)",
              border: "1px solid rgba(0,229,255,0.06)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,229,255,0.3)";
              e.currentTarget.style.background = "rgba(0,229,255,0.02)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0,229,255,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,229,255,0.06)";
              e.currentTarget.style.background = "rgba(255,255,255,0.01)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-white/30 group-hover:text-[#00e5ff] transition-colors">
              Telegram
            </span>
            <span className="mt-1 font-body text-xs text-white/60 tracking-wider">
              @yonas
            </span>
          </a>
        </motion.div>

        {/* Socials / info */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="font-body text-xs text-white/20 tracking-widest uppercase">
            Available for commissions &bull; collaborations &bull; exhibitions
          </p>
        </motion.div>
      </div>
    </div>
  );
}
