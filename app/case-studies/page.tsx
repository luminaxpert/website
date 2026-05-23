"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Activity, Landmark, ShoppingBag, Truck, Building2, Factory } from "lucide-react";
import LuminaBackground from "@/components/LuminaBackground";
import ScrollReveal from "@/components/ScrollReveal";

const caseStudies = [
  {
    category: "Finance",
    tag: "AI Consulting & Risk Strategy",
    client: "Fortune 500 Bank",
    title: "Real-Time Fraud Prevention System",
    challenge: "Faced rising fraud losses and high false positive rates in payment processing.",
    solution: "Consulted on governance, designed custom anomaly detection algorithms, and trained key personnel.",
    metrics: ["340% ROI", "92% Fraud Catch", "4× Faster Decisions"],
    icon: <Landmark size={24} />,
    color: "#00D9FF"
  },
  {
    category: "Healthcare",
    tag: "Data Engineering & AI Development",
    client: "Global Hospital Network",
    title: "Predictive Diagnostics Integration",
    challenge: "Siloed patient data delayed diagnosis of critical heart conditions.",
    solution: "Engineered secure pipelines feeding a real-time clinical predictive model.",
    metrics: ["40% Faster Diagnosis", "99.7% Accuracy", "25% Cost Reduction"],
    icon: <Activity size={24} />,
    color: "#00F5A0"
  },
  {
    category: "Retail",
    tag: "AI Development & Personalization",
    client: "E-commerce Platform",
    title: "Hyper-Personalization Engine",
    challenge: "High cart abandonment rates and declining customer lifetime value.",
    solution: "Built custom transformer-based recommendation engine fine-tuned for user intent.",
    metrics: ["3× Revenue Lift", "55% Less Abandonment", "$12M Net Present Value"],
    icon: <ShoppingBag size={24} />,
    color: "#FFD166"
  },
  {
    category: "Logistics",
    tag: "Digital Transformation & Operations",
    client: "Global Logistics Leader",
    title: "Autonomous Fleet Route Optimization",
    challenge: "Rising fuel costs and driver inefficiency during last-mile deliveries.",
    solution: "Modernized legacy routing systems with reinforcement learning algorithms.",
    metrics: ["60% Fuel Savings", "8× Deployment Speed", "100% System Uptime"],
    icon: <Truck size={24} />,
    color: "#3B6FFF"
  },
  {
    category: "Enterprise",
    tag: "AI Strategy & Roadmap",
    client: "Series B AI Startup",
    title: "Product Scaling & Long-Term Roadmap",
    challenge: "Struggled to articulate proprietary AI defensibility to growth investors.",
    solution: "Drafted detailed 3-year AI strategy, competitive benchmarking, and infrastructure plans.",
    metrics: ["Secured $45M Series C", "2× Team Efficiency", "18-Month Runway Ext."],
    icon: <Building2 size={24} />,
    color: "#E040FB"
  },
  {
    category: "Manufacturing",
    tag: "AI Agents & Automation",
    client: "Titan Manufacturing",
    title: "Predictive Maintenance AI Agents",
    challenge: "Unplanned machinery downtime cost millions in halted production lines.",
    solution: "Deployed autonomous agents monitoring thermal and acoustic sensors with edge models.",
    metrics: ["70% Downtime Reduction", "$4M Saved Annually", "Zero Unplanned Stops"],
    icon: <Factory size={24} />,
    color: "#FF7A00"
  }
];

export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Finance", "Healthcare", "Retail", "Logistics", "Enterprise", "Manufacturing"];

  const filteredCaseStudies = activeFilter === "All" 
    ? caseStudies 
    : caseStudies.filter(cs => cs.category === activeFilter);

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      {/* Background Geometries */}
      <LuminaBackground />

      {/* HERO */}
      <section className="relative min-h-[50vh] pt-[160px] pb-[80px] flex items-center bg-transparent overflow-hidden">
        <div className="absolute inset-0 ambient-left z-0 opacity-40"></div>
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10 text-center flex flex-col items-center">
          <ScrollReveal>
            <div className="font-space-mono text-[11px] text-[#F5C842] tracking-widest uppercase mb-4">
              PROVEN RESULTS
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h1 className="font-plus-jakarta-sans font-bold text-[48px] md:text-[72px] leading-[1.1] text-[#0D0D1F] tracking-tight mb-8">
              Proof Over <span className="text-gradient">Promises.</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="font-inter text-[19px] text-[#4A5568] max-w-[640px] mb-12">
              Real clients. Measurable outcomes. Verified results. Explore how we design and deploy production-grade AI systems across global enterprises.
            </p>
          </ScrollReveal>

          {/* FILTER BAR */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-3 bg-[#F0F4F8] border border-[rgba(139,63,255,0.15)] rounded-2xl p-2 backdrop-blur-xl">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2.5 rounded-xl font-plus-jakarta-sans text-[14px] font-semibold transition-all cursor-pointer ${
                    activeFilter === filter
                      ? "bg-gradient-to-r from-[#3B6FFF] to-[#E040FB] text-[#0D0D1F] shadow-[0_0_15px_rgba(139,63,255,0.3)]"
                      : "text-[#718096] hover:text-[#0D0D1F] hover:bg-[#F0F4F8]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CASE STUDIES GRID */}
      <section className="relative py-16 bg-transparent z-10">
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaseStudies.map((cs, i) => (
              <ScrollReveal key={cs.title} delay={i * 0.05}>
                <div 
                  className="glass-card !bg-[#FFFFFF]/90 !border-[rgba(139,63,255,0.15)] p-8 rounded-[24px] h-full flex flex-col justify-between group hover:border-[#F5C842]/40 hover:shadow-[0_0_40px_rgba(245,200,66,0.15)] hover:-translate-y-2 transition-all duration-300"
                  style={{ borderLeft: `2px solid ${cs.color}` }}
                >
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <span className="font-space-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-[#F0F4F8] border border-[rgba(139,63,255,0.15)] text-[#4A5568]">
                        {cs.tag}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#F0F4F8] border border-[rgba(139,63,255,0.15)] flex items-center justify-center text-[#F5C842]">
                        {cs.icon}
                      </div>
                    </div>

                    <span className="font-space-mono text-[12px] text-[#718096] block mb-2">{cs.client}</span>
                    <h3 className="font-plus-jakarta-sans font-bold text-[22px] text-[#0D0D1F] group-hover:text-[#F5C842] transition-colors mb-4">
                      {cs.title}
                    </h3>
                    
                    <div className="mb-6 space-y-4">
                      <div>
                        <span className="font-space-mono text-[11px] text-[#718096] uppercase tracking-wider block mb-1">Challenge</span>
                        <p className="font-inter text-[14px] text-[#4A5568] leading-relaxed">{cs.challenge}</p>
                      </div>
                      <div>
                        <span className="font-space-mono text-[11px] text-[#718096] uppercase tracking-wider block mb-1">Solution</span>
                        <p className="font-inter text-[14px] text-[#4A5568] leading-relaxed">{cs.solution}</p>
                      </div>
                    </div>
                  </div>

                  {/* Outcome Metrics */}
                  <div className="mt-auto">
                    <div className="border-t border-[rgba(139,63,255,0.15)] pt-6 mb-6">
                      <span className="font-space-mono text-[11px] text-[#718096] uppercase tracking-wider block mb-3">Key Outcomes</span>
                      <div className="flex flex-col gap-2">
                        {cs.metrics.map((metric, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="text-[#F5C842] font-semibold text-[13px]">✓</span>
                            <span className="font-plus-jakarta-sans font-bold text-[#F5C842] text-[15px]">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link href="/contact" className="btn-link text-[14px] !text-[#0D0D1F] flex items-center gap-1 group-hover:underline">
                      Request Technical Blueprint <ChevronRight size={14} className="mt-0.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {filteredCaseStudies.length === 0 && (
            <div className="text-center py-20 bg-[#F0F4F8] border border-[rgba(139,63,255,0.15)] rounded-[24px]">
              <p className="font-inter text-[#718096] text-[16px]">No case studies found for this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-[120px] bg-transparent relative z-10">
        <div className="container mx-auto px-5 relative">
          <ScrollReveal>
            <div className="glass-card !bg-[#F8F9FA] !border-[rgba(139,63,255,0.15)] w-full max-w-[900px] mx-auto rounded-[32px] p-12 md:p-16 text-center hover:shadow-[0_0_50px_rgba(139,63,255,0.2)] hover:scale-[1.01] transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#3b6fff]/5 to-[#e040fb]/5 pointer-events-none"></div>
              
              <h3 className="font-plus-jakarta-sans font-extrabold text-[32px] md:text-[44px] text-[#0D0D1F] mb-6 leading-tight">
                Your results could be next.
              </h3>
              <p className="font-inter text-[18px] text-[#4A5568] mb-10 max-w-[500px] mx-auto">
                Schedule a 30-minute feasibility audit to explore high-impact AI use cases inside your operational stack.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                <Link href="/contact" className="btn-primary px-8 py-4 text-[15px] uppercase tracking-wider font-bold">
                  Book a Free Discovery Call
                </Link>
                <Link href="/services" className="btn-ghost !text-[#0D0D1F] px-8 py-4 text-[15px] font-semibold">
                  Explore Services Guide
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
