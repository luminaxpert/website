import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Started | LuminaXpert',
  description: 'Join the elite network of AI-driven enterprises. Let us build your profile to match you with the right AI specialists.',
};

export default function GetStartedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
