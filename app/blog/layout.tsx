import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Insights | LuminaXpert',
  description: 'Expert perspectives on enterprise AI, digital transformation, and the future of work.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
