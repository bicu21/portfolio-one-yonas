"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/hooks/useAuth";
import GlowButton from "@/components/ui/GlowButton";
import FogOverlay from "@/components/effects/FogOverlay";

type FormState = {
  title: string;
  description: string;
  category: string;
  year: string;
};

const CATEGORIES = ["Abstract", "Digital", "Mixed Media", "Photography", "Conceptual", "Painting"];

export default function StudioPage() {
  const { user, loading, signIn, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [form, setForm] = useState<FormState>({ title: "", description: "", category: "", year: "" });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const onDrop = useCallback((accepted: File[]) => {
    const f = accepted[0];
    if (!f) return;
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    const { error } = await signIn(email, password);
    if (error) setAuthError(error.message);
    setAuthLoading(false);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !form.title) return;
    setUploading(true);
    setUploadMsg(null);

    try {
      const supabase = createClient();
      // Upload to storage
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { data: storageData, error: storageError } = await supabase.storage
        .from("artworks")
        .upload(fileName, file, { upsert: false });
      if (storageError) throw storageError;

      const { data: { publicUrl } } = supabase.storage.from("artworks").getPublicUrl(fileName);

      // Insert into DB
      const { error: dbError } = await supabase.from("artworks").insert({
        title: form.title,
        description: form.description || null,
        image_url: publicUrl,
        category: form.category || null,
        year: form.year ? parseInt(form.year) : null,
      });
      if (dbError) throw dbError;

      setUploadMsg({ type: "success", text: "Artwork published successfully." });
      setForm({ title: "", description: "", category: "", year: "" });
      setFile(null);
      setPreviewUrl(null);
    } catch (err) {
      setUploadMsg({ type: "error", text: err instanceof Error ? err.message : "Upload failed." });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#020617" }}>
        <motion.div
          className="w-8 h-8 rounded-full border-t-2"
          style={{ borderColor: "#00e5ff" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  // ── Login Gate ─────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="relative min-h-screen flex items-center justify-center px-6"
        style={{ background: "#020617" }}>
        <FogOverlay />
        <motion.div
          className="relative z-10 w-full max-w-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <p className="font-body text-xs tracking-[0.5em] uppercase mb-3" style={{ color: "#00e5ff" }}>
              Private Access
            </p>
            <h1 className="font-display font-light text-white text-4xl tracking-widest">Studio</h1>
          </div>

          <form
            onSubmit={handleLogin}
            className="rounded-sm p-8 flex flex-col gap-5"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(0,229,255,0.1)",
              backdropFilter: "blur(10px)",
            }}
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 text-sm"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 text-sm"
            />

            {authError && (
              <p className="text-xs text-red-400/70 tracking-wide">{authError}</p>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 font-body text-xs tracking-[0.3em] uppercase rounded-sm transition-all duration-300"
              style={{
                background: "rgba(0,229,255,0.08)",
                border: "1px solid rgba(0,229,255,0.35)",
                color: "#00e5ff",
              }}
            >
              {authLoading ? "Entering..." : "Enter Studio"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ── Studio Dashboard ────────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6" style={{ background: "#020617" }}>
      <FogOverlay />
      <div className="max-w-4xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="mb-12 flex items-end justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <p className="font-body text-xs tracking-[0.5em] uppercase mb-2" style={{ color: "#00e5ff" }}>
              Private
            </p>
            <h1 className="font-display font-light text-white text-5xl tracking-widest">Studio</h1>
          </div>
          <button
            onClick={signOut}
            className="font-body text-xs tracking-[0.3em] uppercase px-4 py-2 transition-colors duration-300"
            style={{ color: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            Sign Out
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* ── Upload Form ─── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleUpload} className="flex flex-col gap-5">
              <p className="font-body text-xs tracking-[0.4em] uppercase text-white/30 mb-2">
                New Artwork
              </p>

              {/* Dropzone */}
              <div
                {...getRootProps()}
                className="relative rounded-sm flex flex-col items-center justify-center cursor-pointer transition-all duration-400"
                style={{
                  border: `1px dashed ${isDragActive ? "#00e5ff" : "rgba(0,229,255,0.15)"}`,
                  background: isDragActive ? "rgba(0,229,255,0.04)" : "rgba(255,255,255,0.01)",
                  padding: "2rem",
                  minHeight: "140px",
                  boxShadow: isDragActive ? "0 0 30px rgba(0,229,255,0.1)" : "none",
                }}
              >
                <input {...getInputProps()} />
                <p className="font-body text-xs tracking-widest uppercase text-center"
                  style={{ color: isDragActive ? "#00e5ff" : "rgba(255,255,255,0.2)" }}>
                  {isDragActive ? "Drop it here" : "Drag & drop artwork"}
                </p>
                <p className="mt-1 font-body text-xs text-white/10">or click to browse · max 10MB</p>
              </div>

              {/* Fields */}
              <input
                type="text"
                placeholder="Title *"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full px-4 py-3 text-sm"
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 text-sm resize-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 text-sm"
                >
                  <option value="">Category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <input
                  type="number"
                  placeholder="Year"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full px-4 py-3 text-sm"
                />
              </div>

              {/* Status */}
              <AnimatePresence>
                {uploadMsg && (
                  <motion.p
                    className="text-xs tracking-wide"
                    style={{ color: uploadMsg.type === "success" ? "#00e5ff" : "#f87171" }}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {uploadMsg.text}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={uploading || !file || !form.title}
                className="w-full py-3 font-body text-xs tracking-[0.3em] uppercase rounded-sm transition-all duration-300 disabled:opacity-30"
                style={{
                  background: "rgba(0,229,255,0.08)",
                  border: "1px solid rgba(0,229,255,0.35)",
                  color: "#00e5ff",
                }}
              >
                {uploading ? "Publishing..." : "Publish Artwork"}
              </button>
            </form>
          </motion.div>

          {/* ── Live Preview ─── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="font-body text-xs tracking-[0.4em] uppercase text-white/30 mb-5">
              Preview
            </p>

            <div
              className="rounded-sm overflow-hidden"
              style={{
                border: "1px solid rgba(0,229,255,0.08)",
                background: "rgba(255,255,255,0.01)",
              }}
            >
              {/* Image preview */}
              <div className="relative aspect-[4/3] bg-black/20">
                {previewUrl ? (
                  <Image src={previewUrl} alt="Preview" fill className="object-cover" unoptimized />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-body text-xs text-white/10 tracking-widest uppercase">
                      No image selected
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-display text-xl font-light text-white/70">
                  {form.title || "Untitled"}
                </h3>
                <div className="mt-2 flex gap-4">
                  <span className="font-body text-xs text-white/30 tracking-widest uppercase">
                    {form.category || "—"}
                  </span>
                  <span className="font-body text-xs text-white/20">
                    {form.year || "—"}
                  </span>
                </div>
                {form.description && (
                  <p className="mt-3 font-body text-xs text-white/25 leading-loose">
                    {form.description}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
