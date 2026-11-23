import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Maturity Assessment — Free 2-Minute Quiz",
  description: "Benchmark your organization's AI strategy, data, talent, deployment and governance maturity in two minutes and get personalized next steps.",
  alternates: { canonical: "/assessment" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
