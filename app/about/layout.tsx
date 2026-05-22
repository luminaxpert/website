import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About LuminaXpert | AI Consultancy',
  description: 'Learn about LuminaXpert, our mission, team, and expertise in delivering enterprise AI solutions.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
