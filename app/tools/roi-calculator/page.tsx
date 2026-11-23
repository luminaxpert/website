"use client";

import React from "react";
import RoiCalculator from "@/components/RoiCalculator";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RoiCalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen relative">

      {/* Hero Header */}
      <section className="relative pt-[140px] pb-[60px] flex items-center bg-transparent overflow-hidden">
        <div className="absolute inset-0 ambient-center z-0 opacity-40"></div>
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10 text-center flex flex-col items-center">
          
          <div className="animate-slide-up-1">
            <Link href="/" className="inline-flex items-center gap-2 font-space-mono text-[12px] text-[#4A5568] hover:text-[#0891B2] hover:-translate-x-1 transition-all duration-300 mb-8">
              <ArrowLeft size={14} /> BACK TO HOME
            </Link>
          </div>

          <div className="animate-slide-up-2">
            <div className="font-space-mono text-[11px] text-[#B7791F] tracking-widest uppercase mb-4">INTERACTIVE TOOLS</div>
            <h1 className="font-plus-jakarta-sans font-bold text-[36px] md:text-[56px] leading-[1.1] tracking-tight mb-6">
              <span className="text-[#0D0D1F] block">AI Return on Investment</span>
              <span className="text-gradient block">Calculator</span>
            </h1>
          </div>
          
          <div className="animate-slide-up-3">
            <p className="font-inter text-[18px] text-[#4A5568] max-w-[620px] mx-auto mb-10">
              Estimate your potential cost savings, productivity multiplier, and break-even timeline for custom AI deployments.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-[120px] relative z-10 bg-transparent">
        <div className="container mx-auto px-5">
          <ScrollReveal delay={0.3}>
            <RoiCalculator />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
