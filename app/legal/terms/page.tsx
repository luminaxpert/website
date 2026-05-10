import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-bg-deep)]">
      
      <section className="pt-[140px] pb-[60px] relative border-b border-[var(--color-border-subtle)]">
        <div className="absolute inset-0 ambient-center z-0 opacity-30"></div>
        <div className="container mx-auto px-5 max-w-[800px] relative z-10 text-center">
          <h1 className="font-syne font-black text-[40px] md:text-[56px] text-white mb-4">
            Terms of Service
          </h1>
          <p className="font-space-mono text-[14px] text-[#9494c0]">
            Last updated: October 1, 2026
          </p>
        </div>
      </section>

      <section className="py-[80px]">
        <div className="container mx-auto px-5 max-w-[800px]">
          <div className="font-outfit text-[#9494c0] text-[16px] leading-[1.8] flex flex-col gap-6">
            
            <p className="text-[18px] text-white">
              By accessing or using the LuminaXpert platform and services, you agree to be bound by these Terms of Service.
            </p>

            <h2 className="font-syne font-bold text-[28px] text-white mt-8 mb-2">1. Scope of Services</h2>
            <p>
              LuminaXpert provides AI consulting, custom model development, digital transformation strategies, and related enterprise services. The specific scope of any engagement will be outlined in a separate Statement of Work (SOW) or Master Services Agreement (MSA).
            </p>

            <h2 className="font-syne font-bold text-[28px] text-white mt-8 mb-2">2. Intellectual Property</h2>
            <p>
              Unless otherwise specified in a custom MSA:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>LuminaXpert retains ownership of its pre-existing proprietary methodologies and foundational IP.</li>
              <li>Clients retain ownership of their proprietary data and the specific models fine-tuned solely on that data.</li>
            </ul>

            <h2 className="font-syne font-bold text-[28px] text-white mt-8 mb-2">3. Confidentiality</h2>
            <p>
              Both parties agree to maintain the strict confidentiality of all proprietary information shared during the course of the engagement, subject to standard NDA provisions.
            </p>

            <h2 className="font-syne font-bold text-[28px] text-white mt-8 mb-2">4. Limitation of Liability</h2>
            <p>
              In no event shall LuminaXpert be liable for any indirect, incidental, special, or consequential damages arising out of the use of our services or AI models.
            </p>

            <p className="mt-8 font-space-mono text-[12px] text-[#4a4a80]">
              This is a demonstration terms of service document for the UI. Real legal documents should be reviewed by counsel.
            </p>
            
          </div>
        </div>
      </section>

    </div>
  );
}
