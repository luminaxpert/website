import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive AI ROI Calculator | LuminaXpert Tools",
  description: "Calculate your projected annual cost savings, Year 1 and Year 3 ROI percentage, break-even months, and productivity multiplier from AI integrations.",
};

export default function RoiCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
