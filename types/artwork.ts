export interface Artwork {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string | null;
  year: number | null;
  created_at: string;
}

export type ArtworkInsert = Omit<Artwork, "id" | "created_at">;
export type ArtworkUpdate = Partial<ArtworkInsert>;
