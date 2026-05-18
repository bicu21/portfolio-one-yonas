"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Artwork } from "@/types/artwork";

interface ArtworkCardProps {
  artwork: Artwork;
  index?: number;
  featured?: boolean;
}

export default function ArtworkCard({ artwork, index = 0, featured = false }: ArtworkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative ${featured ? "col-span-2 row-span-2" : ""}`}
    >
      <Link href={`/artwork/${artwork.id}`}>
        <motion.div
          className="relative overflow-hidden rounded-sm cursor-none"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(0,229,255,0.08)",
          }}
          whileHover={{
            boxShadow: "0 0 40px rgba(0,229,255,0.25), 0 0 80px rgba(0,229,255,0.1)",
            borderColor: "rgba(0,229,255,0.4)",
            y: -8,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Image */}
          <div className={`relative overflow-hidden ${featured ? "aspect-[4/3]" : "aspect-[3/4]"}`}>
            <Image
              src={artwork.image_url}
              alt={artwork.title}
              fill
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Overlay gradient */}
            <div
              className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-30"
              style={{
                background:
                  "linear-gradient(to top, rgba(2,6,23,0.9) 0%, rgba(2,6,23,0.3) 50%, transparent 100%)",
              }}
            />
            {/* Cyan glow top-right corner on hover */}
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              style={{
                background:
                  "radial-gradient(circle at top right, rgba(0,229,255,0.15), transparent 70%)",
              }}
            />
          </div>

          {/* Info */}
          <div className="p-4">
            <motion.h3
              className="font-display text-lg font-light tracking-wide text-white/90 leading-tight"
              style={{ textShadow: "0 0 20px rgba(0,229,255,0)" }}
              whileHover={{ textShadow: "0 0 20px rgba(0,229,255,0.4)" }}
            >
              {artwork.title}
            </motion.h3>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-body text-xs tracking-widest uppercase text-white/30">
                {artwork.category ?? "Art"}
              </span>
              <span className="font-body text-xs text-white/20">{artwork.year}</span>
            </div>

            {/* Bottom line */}
            <motion.div
              className="mt-3 h-px"
              style={{ background: "rgba(0,229,255,0.1)" }}
              whileHover={{ background: "rgba(0,229,255,0.5)", scaleX: 1.02 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
