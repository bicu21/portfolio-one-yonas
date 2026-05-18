import type { Metadata } from "next";
import "./globals.css";
import CinematicNav from "@/components/ui/CinematicNav";
import ClientProviders from "./client-providers";

export const metadata: Metadata = {
  title: {
    default: "YONAS — Visual Artist",
    template: "%s | YONAS",
  },
  description:
    "An immersive digital exhibition by YONAS — floating paintings, cinematic atmosphere, and underwater light.",
  keywords: ["artist", "portfolio", "digital art", "visual art", "exhibition"],
  openGraph: {
    title: "YONAS — Visual Artist",
    description: "Immersive digital art exhibition",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-body antialiased" style={{ background: "#020617" }}>
        <ClientProviders>
          <CinematicNav />
          <main>{children}</main>
        </ClientProviders>
      </body>
    </html>
  );
}
