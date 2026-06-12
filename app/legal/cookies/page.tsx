import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | LuminaXpert",
  description: "Cookie policy for LuminaXpert.",
};

export default function CookiePolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFFFFF]">
      
      <section className="pt-[140px] pb-[60px] relative border-b border-[rgba(139, 63, 255, 0.15)]">
        <div className="absolute inset-0 ambient-center z-0 opacity-30"></div>
        <div className="container mx-auto px-5 max-w-[800px] relative z-10 text-center">
          <h1 className="font-plus-jakarta-sans font-black text-[40px] md:text-[56px] text-[#0D0D1F] mb-4">
            Cookie Policy
          </h1>
          <p className="font-space-mono text-[14px] text-[#4A5568]">
            Last updated: October 1, 2026
          </p>
        </div>
      </section>

      <section className="py-[80px]">
        <div className="container mx-auto px-5 max-w-[800px]">
          <div className="font-inter text-[#4A5568] text-[16px] leading-[1.8] flex flex-col gap-6">
            
            <p className="text-[18px] text-[#0D0D1F]">
              This Cookie Policy explains how LuminaXpert uses cookies and similar technologies to recognize you when you visit our website.
            </p>

            <h2 className="font-plus-jakarta-sans font-bold text-[28px] text-[#0D0D1F] mt-8 mb-2">1. What are cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>

            <h2 className="font-plus-jakarta-sans font-bold text-[28px] text-[#0D0D1F] mt-8 mb-2">2. Why do we use cookies?</h2>
            <p>
              We use first and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our properties.
            </p>

            <h2 className="font-plus-jakarta-sans font-bold text-[28px] text-[#0D0D1F] mt-8 mb-2">3. How can I control cookies?</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject.
            </p>
            
          </div>
        </div>
      </section>

    </div>
  );
}
