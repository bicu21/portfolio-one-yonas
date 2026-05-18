import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore the complete collection — paintings floating in infinite darkness.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
