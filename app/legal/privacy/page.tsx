import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-bg-deep)]">
      
      {/* HEADER */}
      <section className="pt-[140px] pb-[60px] relative border-b border-[var(--color-border-subtle)]">
        <div className="absolute inset-0 ambient-center z-0 opacity-30"></div>
        <div className="container mx-auto px-5 max-w-[800px] relative z-10 text-center">
          <h1 className="font-syne font-black text-[40px] md:text-[56px] text-white mb-4">
            Privacy Policy
          </h1>
          <p className="font-space-mono text-[14px] text-[#9494c0]">
            Last updated: October 1, 2026
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-[80px]">
        <div className="container mx-auto px-5 max-w-[800px]">
          <div className="font-outfit text-[#9494c0] text-[16px] leading-[1.8] flex flex-col gap-6">
            
            <p className="text-[18px] text-white">
              At LuminaXpert, we are committed to protecting your privacy and ensuring the security of your personal and enterprise data. This Privacy Policy outlines how we collect, use, and protect your information.
            </p>

            <h2 className="font-syne font-bold text-[28px] text-white mt-8 mb-2">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you use our website, contact our team, or engage our services. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact information (name, email address, phone number).</li>
              <li>Enterprise data (company name, role, industry).</li>
              <li>Project details shared during consultations.</li>
            </ul>

            <h2 className="font-syne font-bold text-[28px] text-white mt-8 mb-2">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services.</li>
              <li>Communicate with you regarding consultations and project updates.</li>
              <li>Ensure enterprise-grade security and compliance (SOC 2, GDPR).</li>
              <li>Send technical notices, updates, and administrative messages.</li>
            </ul>

            <h2 className="font-syne font-bold text-[28px] text-white mt-8 mb-2">3. Data Security & AI Models</h2>
            <p>
              Your privacy is paramount, especially when working with AI technologies. We adhere to strict zero-retention policies where applicable. Your proprietary data is <strong>never</strong> used to train public foundation models without explicit, written consent.
            </p>

            <h2 className="font-syne font-bold text-[28px] text-white mt-8 mb-2">4. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact our Data Protection Officer at:
            </p>
            <p className="font-space-mono text-[#E040FB]">
              privacy@luminaxpert.com
            </p>
            
          </div>
        </div>
      </section>

    </div>
  );
}
