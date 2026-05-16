"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFFFFF]">
      
      {/* HEADER COMPACT */}
      <div className="w-full h-[72px] border-b border-[rgba(139, 63, 255, 0.15)] flex items-center px-5 md:px-10 bg-[#FFFFFF]">
        <Link href="/" className="inline-flex items-center gap-2.5 z-50">
          <Image src="/images/logo-bg.png" alt="LuminaXpert Logo" width={200} height={40} className="h-8 w-auto object-contain" />
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,245,160,0.1)_0%,transparent_70%)] rounded-full pointer-events-none"></div>
        
        <div className="glass-brand p-12 md:p-20 rounded-[32px] text-center max-w-[700px] w-full relative z-10 animate-slide-up-1">
          <div className="w-24 h-24 rounded-full bg-[#00F5A0]/10 border border-[#00F5A0]/30 mx-auto flex items-center justify-center text-[#00F5A0] mb-8 shadow-[0_0_30px_rgba(0,245,160,0.2)]">
            <CheckCircle2 size={48} strokeWidth={1.5} />
          </div>
          
          <h1 className="font-plus-jakarta-sans font-bold text-[40px] md:text-[56px] text-[#0D0D1F] mb-6">
            You're all set.
          </h1>
          
          <p className="font-inter text-[#4A5568] text-[18px] mb-10 max-w-[480px] mx-auto">
            Your request has been securely submitted. One of our lead specialists will review your details and reach out within 24 hours.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/" className="btn-ghost justify-center h-[56px] px-8">Return to Home</Link>
            <Link href="/blog" className="btn-primary justify-center h-[56px] px-8">Explore Insights <ArrowRight size={18} /></Link>
          </div>
        </div>
      </div>
      
    </div>
  );
}
