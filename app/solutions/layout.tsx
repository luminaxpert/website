import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solutions | LuminaXpert - Industry Specific AI Solutions',
  description: 'Explore LuminaXpert industry solutions for Finance, Healthcare, Retail, Logistics, Manufacturing, Legal, Education, and Energy. Tailored AI services to drive enterprise transformation.'
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
