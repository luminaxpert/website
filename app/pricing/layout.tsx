import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engagement Models & Pricing",
  description: "Transparent AI consulting engagement models — Discovery Sprints, Transformation Programs and AI Partner Retainers — with clear scope and measurable success criteria.",
  alternates: { canonical: "/pricing" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
