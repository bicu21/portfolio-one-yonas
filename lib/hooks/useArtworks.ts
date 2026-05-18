"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Artwork } from "@/types/artwork";

export function useArtworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("artworks")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setArtworks(data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch artworks");
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  return { artworks, loading, error };
}
