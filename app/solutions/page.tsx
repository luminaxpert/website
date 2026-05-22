"use client";

import Link from "next/link";
import { 
  Building2, Rocket, Landmark, Stethoscope, ShoppingBag, Truck,
  Factory, Scale, GraduationCap, Zap 
} from "lucide-react";
import FloatingGeometries from "@/components/FloatingGeometries";
import ScrollReveal from "@/components/ScrollReveal";

export default function SolutionsPage() {
  const industries = [
    {
      id: "finance",
      icon: <Landmark size={32} />,
      title: "Finance & Banking",
      color: "#00D9FF",
      desc: "Transform risk assessment, fraud detection, and algorithmic trading with high-precision models.",
      useCases: ["Algorithmic Trading", "Fraud Detection", "Risk Assessment", "Automated Compliance"]
    },
    {
      id: "healthcare",
      icon: <Stethoscope size={32} />,
      title: "Healthcare",
      color: "#00F5A0",
      desc: "Accelerate diagnostics, personalize patient care, and streamline hospital operations while maintaining HIPAA compliance.",
      useCases: ["Medical Image Analysis", "Predictive Diagnostics", "Patient Flow Optimization", "Drug Discovery"]
    },
    {
      id: "retail",
      icon: <ShoppingBag size={32} />,
      title: "Retail & E-commerce",
      color: "#FFD166",
      desc: "Create hyper-personalized shopping experiences and optimize supply chain logistics.",
      useCases: ["Demand Forecasting", "Hyper-Personalization", "Dynamic Pricing", "Inventory Automation"]
    },
    {
      id: "logistics",
      icon: <Truck size={32} />,
      title: "Logistics & Supply Chain",
      color: "#3B6FFF",
      desc: "Build resilient, predictive supply chains that adapt to global disruptions in real-time.",
      useCases: ["Route Optimization", "Predictive Maintenance", "Warehouse Automation", "Demand Planning"]
    },
    {
      id: "manufacturing",
      icon: <Factory size={32} />,
      title: "Manufacturing & Industry 4.0",
      color: "#E040FB",
      desc: "Implement predictive maintenance, visual quality inspection, and supply chain digital twins to optimize yield and reduce downtime.",
      useCases: ["Predictive Maintenance", "Visual Quality Inspection", "Supply Chain Digital Twins", "Yield Optimization"]
    },
    {
      id: "legal",
      icon: <Scale size={32} />,
      title: "Legal & Compliance",
      color: "#F5C842",
      desc: "Streamline contract analysis, automate compliance auditing, and perform regulatory mapping with auditable, explainable LLMs.",
      useCases: ["Contract Lifecycle Mgmt", "Regulatory Mapping", "Compliance Audit Automation", "Legal Document Drafting"]
    },
    {
      id: "education",
      icon: <GraduationCap size={32} />,
      title: "Education & EdTech",
      color: "#10B981",
      desc: "Deliver personalized learning paths, automate administrative workflows, and construct intelligent tutor systems at scale.",
      useCases: ["Personalized Learning", "Automated Grading Assistant", "Intelligent Tutoring Systems", "Curriculum Optimization"]
    },
    {
      id: "energy",
      icon: <Zap size={32} />,
      title: "Energy & Utilities",
      color: "#FF7A00",
      desc: "Optimize grid distribution, forecast power demand, and monitor asset health with high-fidelity predictive modeling.",
      useCases: ["Smart Grid Management", "Power Demand Forecasting", "Asset Health Monitoring", "Renewable Energy Integration"]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative">
      
      {/* Background Geometries */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingGeometries />
      </div>

      {/* HERO */}
      <section className="relative min-h-[50vh] pt-[160px] pb-[100px] flex items-center bg-transparent overflow-hidden">
        <div className="absolute inset-0 ambient-right z-0 opacity-40"></div>
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10 text-center">
          <ScrollReveal>
            <div className="font-space-mono text-[11px] text-[#E040FB] tracking-widest uppercase mb-4">SOLUTIONS</div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h1 className="font-plus-jakarta-sans font-bold text-[36px] md:text-[64px] leading-[1.1] tracking-tight mb-6">
              <span className="text-[#0D0D1F] block">Tailored intelligence.</span>
              <span className="text-gradient block">Industry specific impact.</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="font-inter text-[19px] text-[#4A5568] max-w-[600px] mx-auto">
              We don't believe in one-size-fits-all. Our models and strategies are fine-tuned for the unique regulatory and operational realities of your sector.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* BY SCALE */}
      <section className="py-[100px] bg-transparent">
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <ScrollReveal delay={0.1}>
              <div id="enterprise" className="glass-brand p-10 rounded-[24px] relative overflow-hidden group hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(224,64,251,0.2)] transition-all duration-500 hover:bg-[#FFFFFF]/80">
                <div className="absolute top-0 right-0 p-8 opacity-20 text-[#E040FB] group-hover:scale-125 transition-transform duration-500">
                  <Building2 size={120} strokeWidth={1} />
                </div>
                <div className="relative z-10">
                  <div className="font-space-mono text-[12px] text-[#E040FB] uppercase tracking-widest mb-4">FOR LARGE ORGS</div>
                  <h3 className="font-plus-jakarta-sans font-bold text-[28px] text-[#0D0D1F] mb-4">Enterprise Transformation</h3>
                  <p className="font-inter text-[#4A5568] text-[16px] mb-8 max-w-[400px] group-hover:text-[#0D0D1F] transition-colors">
                    Overcome organizational inertia. We help massive organizations deploy AI safely, securely, and at scale, modernizing legacy systems without disruption.
                  </p>
                  <ul className="flex flex-col gap-2 mb-8">
                    <li className="flex items-center gap-2 text-[#0D0D1F] font-inter text-[15px]"><span className="text-[#E040FB] group-hover:scale-125 transition-transform">✓</span> Change management & training</li>
                    <li className="flex items-center gap-2 text-[#0D0D1F] font-inter text-[15px]"><span className="text-[#E040FB] group-hover:scale-125 transition-transform">✓</span> Enterprise-grade security & compliance</li>
                    <li className="flex items-center gap-2 text-[#0D0D1F] font-inter text-[15px]"><span className="text-[#E040FB] group-hover:scale-125 transition-transform">✓</span> Legacy system integration</li>
                  </ul>
                  <Link href="/contact" className="btn-primary">Explore Enterprise Solutions</Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div id="startups" className="glass-card p-10 rounded-[24px] relative overflow-hidden group hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(0,217,255,0.2)] hover:border-[#00D9FF]/40 transition-all duration-500 hover:bg-[#FFFFFF]/80">
                <div className="absolute top-0 right-0 p-8 opacity-10 text-[#00D9FF] group-hover:scale-125 transition-transform duration-500 group-hover:opacity-30">
                  <Rocket size={120} strokeWidth={1} />
                </div>
                <div className="relative z-10">
                  <div className="font-space-mono text-[12px] text-[#00D9FF] uppercase tracking-widest mb-4">FOR HIGH-GROWTH</div>
                  <h3 className="font-plus-jakarta-sans font-bold text-[28px] text-[#0D0D1F] mb-4">Startup Acceleration</h3>
                  <p className="font-inter text-[#4A5568] text-[16px] mb-8 max-w-[400px] group-hover:text-[#0D0D1F] transition-colors">
                    Build an AI-native foundation from day one. We help startups implement intelligent infrastructure that scales infinitely as they grow.
                  </p>
                  <ul className="flex flex-col gap-2 mb-8">
                    <li className="flex items-center gap-2 text-[#0D0D1F] font-inter text-[15px]"><span className="text-[#00D9FF] group-hover:scale-125 transition-transform">✓</span> Rapid MVP development</li>
                    <li className="flex items-center gap-2 text-[#0D0D1F] font-inter text-[15px]"><span className="text-[#00D9FF] group-hover:scale-125 transition-transform">✓</span> Scalable cloud architectures</li>
                    <li className="flex items-center gap-2 text-[#0D0D1F] font-inter text-[15px]"><span className="text-[#00D9FF] group-hover:scale-125 transition-transform">✓</span> Cost-optimized model deployment</li>
                  </ul>
                  <Link href="/contact" className="btn-ghost group-hover:border-[#00D9FF] group-hover:bg-[#00D9FF]/10">Explore Startup Solutions</Link>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* BY INDUSTRY */}
      <section id="industry" className="py-[120px] bg-[#F0F4F8]/20 backdrop-blur-[2px]">
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px]">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-plus-jakarta-sans font-bold text-[36px] md:text-[52px] text-[#0D0D1F]">Solutions by Industry</h2>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industries.map((ind, i) => (
              <ScrollReveal key={ind.id} delay={i * 0.05}>
                <div className="glass-card p-8 flex flex-col h-full border-t border-l border-white/5 shadow-2xl group hover:scale-[1.03] hover:bg-[#1a1a3a]/80 transition-all duration-500" style={{ borderTopColor: `${ind.color}40`, borderLeftColor: `${ind.color}40` }}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#FFFFFF] flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_30px_var(--color-shadow)]" style={{ color: ind.color, boxShadow: `0 0 15px ${ind.color}30`, '--color-shadow': `${ind.color}50` } as any}>
                      {ind.icon}
                    </div>
                    <h3 className="font-plus-jakarta-sans font-bold text-[24px] text-[#0D0D1F] group-hover:text-[var(--text-color)] transition-colors duration-300" style={{ '--text-color': ind.color } as any}>{ind.title}</h3>
                  </div>
                  
                  <p className="font-inter text-[#4A5568] text-[16px] leading-[1.6] mb-8 group-hover:text-[#0D0D1F] transition-colors duration-300">
                    {ind.desc}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="font-space-mono text-[11px] text-[#718096] uppercase tracking-wider mb-3">Key Use Cases</div>
                    <div className="flex flex-wrap gap-2">
                      {ind.useCases.map((uc, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#0D0D1F] font-inter text-[13px] group-hover:border-[var(--border-color)] transition-colors duration-300" style={{ '--border-color': `${ind.color}50` } as any}>
                          {uc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          <ScrollReveal delay={0.2}>
            <div className="mt-16 text-center">
               <p className="font-inter text-[#4A5568] mb-6">Don't see your industry? Our foundational methodologies apply across sectors.</p>
               <Link href="/contact" className="btn-link text-[16px]">Speak with a specialist about your specific vertical →</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
