import type { Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind YONAS — a visual artist exploring the tension between light and darkness.",
};

export default function AboutPage() {
  return <AboutClient />;
}
