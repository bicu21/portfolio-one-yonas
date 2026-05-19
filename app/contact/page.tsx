import type { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with YONAS for commissions, collaborations, or exhibition inquiries.",
};

export default function ContactPage() {
  return <ContactClient />;
}
