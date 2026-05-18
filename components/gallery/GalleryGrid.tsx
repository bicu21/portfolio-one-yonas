"use client";

import { useArtworks } from "@/lib/hooks/useArtworks";
import ArtworkCard from "./ArtworkCard";
import { motion } from "framer-motion";

// Placeholder artworks for when Supabase isn't connected yet
const PLACEHOLDER_ARTWORKS = [
  {
    id: "1",
    title: "Void Horizon",
    description: "An exploration of infinite depth and light.",
    image_url: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80",
    category: "Abstract",
    year: 2024,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Luminous Drift",
    description: "Where light meets silence.",
    image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    category: "Digital",
    year: 2024,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Spectral Form",
    description: "Form dissolving into color.",
    image_url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80",
    category: "Mixed Media",
    year: 2023,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Deep Current",
    description: "Beneath the surface of perception.",
    image_url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    category: "Photography",
    year: 2023,
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Ethereal Gate",
    description: "Passages between worlds.",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    category: "Abstract",
    year: 2023,
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Silent Resonance",
    description: "The sound of still water.",
    image_url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80",
    category: "Conceptual",
    year: 2022,
    created_at: new Date().toISOString(),
  },
];

interface GalleryGridProps {
  limit?: number;
  preview?: boolean;
}

export default function GalleryGrid({ limit, preview = false }: GalleryGridProps) {
  const { artworks: fetched, loading, error } = useArtworks();

  // Use placeholders if no Supabase artworks or still loading
  const source = fetched.length > 0 ? fetched : PLACEHOLDER_ARTWORKS;
  const artworks = limit ? source.slice(0, limit) : source;

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: limit ?? 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] rounded-sm animate-pulse"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,229,255,0.05)" }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`grid gap-6 ${
        preview
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {artworks.map((artwork, i) => (
        <ArtworkCard
          key={artwork.id}
          artwork={artwork}
          index={i}
          featured={!preview && i === 0}
        />
      ))}
    </div>
  );
}
