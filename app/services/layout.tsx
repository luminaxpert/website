import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | LuminaXpert',
  description: 'Explore LuminaXpert AI services including AI Agents, MLOps, Responsible AI, and more, designed for enterprise transformation.',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
