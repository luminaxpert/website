import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | LuminaXpert',
  description: 'Connect with LuminaXpert. Tell us what you\'re working on and we\'ll connect you with the right expert to architect your AI future.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
