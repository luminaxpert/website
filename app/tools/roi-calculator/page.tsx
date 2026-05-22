"use client";

import React from "react";
import RoiCalculator from "@/components/RoiCalculator";
import NeuralNetwork from "@/components/NeuralNetwork";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RoiCalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NeuralNetwork />
      </div>

      {/* Hero Header */}
      <section className="relative pt-[140px] pb-[60px] flex items-center bg-transparent overflow-hidden">
        <div className="absolute inset-0 ambient-center z-0 opacity-40"></div>
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10 text-center flex flex-col items-center">
          
          <ScrollReveal>
            <Link href="/" className="inline-flex items-center gap-2 font-space-mono text-[12px] text-gray-400 hover:text-[#00D9FF] hover:-translate-x-1 transition-all duration-300 mb-8">
              <ArrowLeft size={14} /> BACK TO HOME
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="font-space-mono text-[11px] text-[#F5C842] tracking-widest uppercase mb-4">INTERACTIVE TOOLS</div>
            <h1 className="font-plus-jakarta-sans font-bold text-[36px] md:text-[56px] leading-[1.1] tracking-tight mb-6">
              <span className="text-[#0D0D1F] block">AI Return on Investment</span>
              <span className="text-gradient block">Calculator</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="font-inter text-[18px] text-[#4A5568] max-w-[620px] mx-auto mb-10">
              Estimate your potential cost savings, productivity multiplier, and break-even timeline for custom AI deployments.
            </p>
          </ScrollReveal>
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
