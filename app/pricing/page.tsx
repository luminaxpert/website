"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, HelpCircle, Info, Sparkles, HelpCircle as HelpIcon } from "lucide-react";
import LuminaBackground from "@/components/LuminaBackground";
import ScrollReveal from "@/components/ScrollReveal";

const pricingTiers = [
  {
    tier: "Discovery Sprint",
    duration: "2–4 Weeks",
    desc: "Best for organizations new to AI or evaluating technical feasibility.",
    features: [
      "AI readiness & capability audit",
      "Current-state data architecture assessment",
      "3 priority AI use cases identified",
      "Interactive executive findings presentation",
      "Actionable 30-day quick-win roadmap"
    ],
    investment: "Starting from $15,000",
    cta: "Book a Discovery Sprint",
    popular: false,
    color: "#00D9FF"
  },
  {
    tier: "Transformation Program",
    duration: "3–12 Months",
    desc: "Our signature engagement model to deploy production AI at scale.",
    features: [
      "Everything in Discovery Sprint",
      "Full 3-year AI strategy & MLOps roadmap",
      "End-to-end custom model training & deployment",
      "Dedicated senior expert engineering team",
      "Monthly executive progress reporting",
      "Ongoing AI safety & compliance governance"
    ],
    investment: "Custom pricing based on scope",
    cta: "Get a Custom Proposal",
    popular: true,
    color: "#F5C842"
  },
  {
    tier: "AI Partner Retainer",
    duration: "12+ Months",
    desc: "Long-term partnership to maintain ongoing competitive AI advantage.",
    features: [
      "Everything in Transformation Program",
      "On-demand priority access to specialist network",
      "Quarterly algorithmic strategy audits",
      "Emerging technology briefs & advisory sessions",
      "Preferred discounted rates on additional sprints",
      "SLA-backed production model maintenance"
    ],
    investment: "Annual retainer — contact us",
    cta: "Explore Partnership",
    popular: false,
    color: "#E040FB"
  }
];

const faqs = [
  {
    q: "How long does a typical engagement take?",
    a: "Discovery Sprints take between 2 to 4 weeks. Full Transformation Programs run from 3 to 12 months, depending on integration complexity, training cycles, and organizational scale."
  },
  {
    q: "Do you work with startups or only enterprises?",
    a: "We serve both. Our Startup Acceleration program is tailored for high-growth Series A/B startups seeking to establish solid AI architecture, while our Transformation Programs are designed for global enterprises."
  },
  {
    q: "What does a 'dedicated expert team' mean?",
    a: "You receive direct access to senior ML engineers, data pipelines architects, MLOps specialists, and technology consultants. The team acts as an integrated extension of your in-house engineering group."
  },
  {
    q: "How is success measured?",
    a: "Every project starts with defining clear performance indicators (KPIs) — such as inference cost reductions, latency optimizations, model accuracy improvements, or direct manual workload elimination."
  },
  {
    q: "Can we start with a smaller pilot?",
    a: "Absolutely. We encourage starting with a Discovery Sprint or a scoped 6-week Proof of Concept (PoC) pilot to validate feasibility and project ROI before committing to larger scaling programs."
  }
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      {/* Background Geometries */}
      <LuminaBackground />

      {/* HERO */}
      <section className="relative min-h-[50vh] pt-[160px] pb-[80px] flex items-center bg-transparent overflow-hidden">
        <div className="absolute inset-0 ambient-right z-0 opacity-40"></div>
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10 text-center flex flex-col items-center">
          <ScrollReveal>
            <div className="font-space-mono text-[11px] text-[#F5C842] tracking-widest uppercase mb-4">
              ENGAGEMENT MODELS
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h1 className="font-plus-jakarta-sans font-bold text-[48px] md:text-[72px] leading-[1.1] text-[#0D0D1F] tracking-tight mb-8">
              Flexible Engagements. <span className="text-gradient">Transparent Value.</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="font-inter text-[19px] text-[#4A5568] max-w-[680px] mb-12">
              We don't believe in surprise invoices. Every engagement starts with a clear scope, defined deliverables, and measurable success criteria.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* PRICING GRID */}
      <section className="relative py-16 bg-transparent z-10">
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {pricingTiers.map((tier, i) => (
              <ScrollReveal key={tier.tier} delay={i * 0.1}>
                <div 
                  className={`glass-card !bg-[#FFFFFF]/90 !border-[rgba(139,63,255,0.15)] p-8 md:p-10 rounded-[28px] h-full flex flex-col justify-between relative hover:-translate-y-2 transition-all duration-300 ${
                    tier.popular ? "shadow-lg border-[#F5C842]/40" : "hover:border-[#050DEB]"
                  }`}
                  style={{ borderTop: `4px solid ${tier.color}` }}
                >
                  {tier.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F5C842] text-[#0A0F1E] font-space-mono font-bold text-[9px] uppercase tracking-widest px-3.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                      <Sparkles size={10} /> Most Popular
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="mb-6">
                      <span className="font-space-mono text-[10px] text-[#718096] uppercase tracking-widest">
                        {tier.duration}
                      </span>
                      <h3 className="font-plus-jakarta-sans font-bold text-[28px] text-[#0D0D1F] mt-1">
                        {tier.tier}
                      </h3>
                      <p className="font-inter text-[14px] text-[#718096] mt-3 leading-relaxed">
                        {tier.desc}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#F0F4F8] border border-[rgba(139,63,255,0.15)] flex items-center justify-center text-[#F5C842] shrink-0 mt-0.5">
                            <Check size={12} />
                          </div>
                          <span className="font-inter text-[14px] text-[#4A5568] leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing / Investment */}
                  <div className="border-t border-[rgba(139,63,255,0.15)] pt-8 mt-auto">
                    <span className="font-space-mono text-[10px] text-[#718096] uppercase tracking-wider block mb-1">
                      Estimated Investment
                    </span>
                    <div className="font-plus-jakarta-sans font-black text-[#0D0D1F] text-[24px] mb-6">
                      {tier.investment}
                    </div>

                    <Link 
                      href="/contact" 
                      className={`w-full py-4 rounded-xl font-plus-jakarta-sans font-bold text-[14px] uppercase tracking-wider transition-all flex items-center justify-center cursor-pointer ${
                        tier.popular 
                          ? "bg-[#F5C842] hover:bg-[#F5C842]/90 text-[#0A0F1E] shadow-lg shadow-[#F5C842]/10" 
                          : "bg-[#F0F4F8] hover:bg-[#E2E8F0] text-[#0D0D1F] border border-[rgba(139,63,255,0.15)] hover:border-[#050DEB]"
                      }`}
                    >
                      {tier.cta}
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="relative py-24 bg-transparent z-10">
        <div className="container mx-auto px-5 md:px-20 max-w-[850px]">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="font-space-mono text-[11px] text-[#00D9FF] tracking-widest uppercase mb-4 flex items-center justify-center gap-3">
                <HelpIcon size={16} /> FAQ
              </div>
              <h2 className="font-plus-jakarta-sans font-bold text-[36px] text-[#0D0D1F]">
                Frequently Asked Questions
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.05}>
                <div className="glass-card !bg-[#FFFFFF] !border-[rgba(139,63,255,0.15)] rounded-2xl overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex justify-between items-center text-[#0D0D1F] hover:text-[#F5C842] transition-colors cursor-pointer"
                  >
                    <span className="font-plus-jakarta-sans font-bold text-[16px] md:text-[18px]">
                      {faq.q}
                    </span>
                    <ChevronDown 
                      size={18} 
                      className={`text-[#F5C842] transition-transform duration-300 shrink-0 ${
                        openFaq === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      openFaq === idx ? "max-h-[300px] border-t border-[rgba(139,63,255,0.15)]" : "max-h-0"
                    }`}
                  >
                    <div className="p-6 font-inter text-[#4A5568] text-[15px] leading-relaxed bg-[#F0F4F8]">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-[100px] bg-transparent relative z-10">
        <div className="container mx-auto px-5 text-center">
          <ScrollReveal>
            <h3 className="font-plus-jakarta-sans font-bold text-[28px] text-[#0D0D1F] mb-4">
              Not sure which engagement fits?
            </h3>
            <p className="font-inter text-[#718096] text-[16px] mb-8 max-w-[500px] mx-auto">
              Our partners will assess your goals and compile a tailored scope proposal.
            </p>
            <Link href="/contact" className="btn-primary px-8">
              Let's talk
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
