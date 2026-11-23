import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies — Proven AI Results",
  description: "Real clients, measurable outcomes. See how LuminaXpert designs and deploys production-grade AI across finance, healthcare, retail, logistics and manufacturing.",
  alternates: { canonical: "/case-studies" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
