import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArtworkDetailClient from "./artwork-detail-client";

// Placeholder data for SSG/SSR fallback
const PLACEHOLDER_ARTWORKS = [
  { id: "1", title: "Void Horizon", description: "An exploration of infinite depth and light. Where the horizon dissolves into pure abstraction, this work asks where darkness ends and space begins.", image_url: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=1600&q=90", category: "Abstract", year: 2024, created_at: "" },
  { id: "2", title: "Luminous Drift", description: "Where light meets silence. A study in luminescence and the slow movement of energy through still environments.", image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&q=90", category: "Digital", year: 2024, created_at: "" },
  { id: "3", title: "Spectral Form", description: "Form dissolving into color. The boundary between object and light becomes indistinguishable.", image_url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1600&q=90", category: "Mixed Media", year: 2023, created_at: "" },
  { id: "4", title: "Deep Current", description: "Beneath the surface of perception lies a world of constant movement, invisible to the waking eye.", image_url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=90", category: "Photography", year: 2023, created_at: "" },
  { id: "5", title: "Ethereal Gate", description: "Passages between worlds. A threshold between what we see and what we feel.", image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=90", category: "Abstract", year: 2023, created_at: "" },
  { id: "6", title: "Silent Resonance", description: "The sound of still water. Silence as a form of presence, not absence.", image_url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1600&q=90", category: "Conceptual", year: 2022, created_at: "" },
];

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const artwork = PLACEHOLDER_ARTWORKS.find((a) => a.id === id);
  if (!artwork) return { title: "Artwork Not Found" };
  return {
    title: artwork.title,
    description: artwork.description ?? undefined,
  };
}

export default async function ArtworkPage({ params }: Props) {
  const { id } = await params;

  // Try Supabase first (server-side)
  let artwork = null;
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data } = await supabase.from("artworks").select("*").eq("id", id).single();
    artwork = data;
  } catch {
    // Supabase not configured — use placeholder
  }

  if (!artwork) {
    artwork = PLACEHOLDER_ARTWORKS.find((a) => a.id === id) ?? null;
  }

  if (!artwork) notFound();

  return <ArtworkDetailClient artwork={artwork} />;
}
