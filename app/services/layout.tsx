import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Services — Consulting, Engineering, MLOps & Responsible AI',
  description: 'Explore LuminaXpert AI services including AI Agents, MLOps, Responsible AI, and more, designed for enterprise transformation.',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
