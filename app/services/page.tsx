"use client";

import Link from "next/link";
import NeuralNetwork from "@/components/NeuralNetwork";
import ScrollReveal from "@/components/ScrollReveal";

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen relative">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NeuralNetwork />
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] pt-[120px] flex items-center overflow-hidden bg-transparent">
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10 text-center flex flex-col items-center">
          <ScrollReveal>
            <div className="font-space-mono text-[11px] text-[#00D9FF] tracking-widest uppercase mb-6">WHAT WE OFFER</div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h1 className="font-plus-jakarta-sans font-bold text-[36px] md:text-[64px] leading-[1.1] tracking-tight mb-8">
              <span className="text-[#0D0D1F] block">Precision AI Services</span>
              <span className="text-gradient block">for the modern enterprise.</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="font-inter text-[19px] text-[#4A5568] max-w-[680px] mb-12">
              Nine core service lines, infinite combinations, one unified mission — your transformation.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "AI Consulting", "Digital Transformation", "Data & Analytics", 
                "AI Development", "Strategy & Roadmap", "Training & Enablement", 
                "AI Agents & Automation", "MLOps & Model Governance", "Responsible & Ethical AI"
              ].map((srv, i) => (
                <a href={`#service-${i+1}`} key={i} className="glass-card px-5 py-2 rounded-full font-plus-jakarta-sans text-[14px] text-[#0D0D1F] hover:border-[#E040FB]/50 hover:bg-[#1a1a3a]/80 hover:scale-105 transition-all duration-300">
                  {srv}
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SERVICE DEEP DIVES */}
      <div className="bg-transparent">
        {[
          { 
            id: 1, title: "AI Consulting", subtitle: "Expertise That Moves You Forward",
            desc: "Navigate the complex landscape of artificial intelligence with confidence. Our strategic advisory ensures your investments align with business objectives.",
            features: ["AI readiness assessment", "Executive alignment", "Use case prioritization", "ROI modeling", "Risk & ethics review", "Implementation guidance"],
            metrics: ["340% avg ROI", "4× faster decisions", "98% success"],
            alignRight: false,
            image: "/images/services/ai consultancy.png"
          },
          { 
            id: 2, title: "Digital Transformation", subtitle: "Reshape Your Business",
            desc: "Modernize your legacy systems and operational models. We build the digital foundation required for AI to thrive across your entire enterprise.",
            features: ["Digital audit", "Architecture design", "Process automation", "Change management", "Staff enablement", "Ongoing governance"],
            metrics: ["60% cost reduction", "8× deployment speed", "100% uptime"],
            alignRight: true,
            image: "/images/services/digital transformation.png"
          },
          { 
            id: 3, title: "Data & Analytics", subtitle: "Intelligence From Your Data",
            desc: "Turn fragmented data into a cohesive intelligence engine. We engineer the pipelines that feed your predictive models and executive dashboards.",
            features: ["Data strategy", "Pipeline architecture", "BI dashboards", "Predictive modeling", "Real-time analytics", "Data governance"],
            metrics: ["10× faster insights", "99.7% accuracy", "Live dashboards"],
            alignRight: false,
            image: "/images/services/data and analytics.png"
          },
          { 
            id: 4, title: "AI Development", subtitle: "Custom Solutions for Complex Problems",
            desc: "Build proprietary AI models tailored to your specific workflows. We handle everything from data labeling to model training, deployment, and optimization.",
            features: ["Custom model training", "NLP & Computer Vision", "API integration", "Model fine-tuning", "LLM deployment", "Continuous learning"],
            metrics: ["500+ models", "99.9% uptime", "Zero lock-in"],
            alignRight: true,
            image: "/images/services/ai development.png"
          },
          { 
            id: 5, title: "Strategy & Roadmap", subtitle: "Chart Your Course to the Future",
            desc: "Develop a robust, future-proof AI roadmap. We help you identify high-impact opportunities, assess competitive landscapes, and plan for long-term scalability.",
            features: ["Market analysis", "Competitive benchmarking", "Roadmap development", "Resource planning", "Technology stack selection", "Execution planning"],
            metrics: ["50+ industries", "3-year roadmaps", "Actionable insights"],
            alignRight: false,
            image: "/images/services/strategy roadmap.png"
          },
          { 
            id: 6, title: "Training & Enablement", subtitle: "Empower Your Workforce",
            desc: "Upskill your internal teams to thrive in an AI-driven world. We provide comprehensive training programs covering everything from basic AI literacy to advanced development.",
            features: ["Executive workshops", "Technical bootcamps", "AI literacy programs", "Custom curriculum", "Hands-on labs", "Certification prep"],
            metrics: ["10k+ trained", "95% satisfaction", "Tailored content"],
            alignRight: true,
            image: "/images/services/training and environment.png"
          },
          {
            id: 7, title: "AI Agents & Automation", subtitle: "Autonomous Intelligence at Work",
            desc: "Deploy intelligent agents that execute complex, multi-step business workflows with zero human bottlenecks — from customer service to financial reporting.",
            features: ["Agentic workflow design", "LLM-powered task automation", "RPA + AI integration", "Multi-agent orchestration", "Autonomous reporting", "Human-in-the-loop failsafes"],
            metrics: ["70% work eliminated", "24/7 active operation", "$4M+ avg annual savings"],
            alignRight: false,
            image: "/images/services/ai agents and anomaly.png"
          },
          {
            id: 8, title: "MLOps & Model Governance", subtitle: "AI That Runs Reliably, Forever",
            desc: "Production AI breaks without the right infrastructure. We build the pipelines, monitoring systems, and governance frameworks that keep your models accurate, compliant, and performant.",
            features: ["Model registry & versioning", "Drift & degradation detection", "Automated retraining pipelines", "Compliance audit logging", "A/B model testing", "Multi-cloud deployment"],
            metrics: ["99.9% model uptime", "10× faster retraining", "Full audit trail"],
            alignRight: true,
            image: "/images/services/MLoPs and model governance.png"
          },
          {
            id: 9, title: "Responsible & Ethical AI", subtitle: "AI You Can Trust. AI You Can Defend.",
            desc: "Regulatory pressure is intensifying. We align your AI systems with EU AI Act, NIST AI RMF, and ISO 42001 — so your deployments are auditable, explainable, and bias-free.",
            features: ["Bias & fairness auditing", "Explainability frameworks (SHAP, LIME)", "EU AI Act compliance", "NIST AI RMF alignment", "AI governance policy drafting", "Human oversight design"],
            metrics: ["100% audit-ready", "Zero regulatory incidents", "Board-level compliance"],
            alignRight: false,
            image: "/images/services/responsible and ethical AI.png"
          }
        ].map((srv) => (
          <section id={`service-${srv.id}`} key={srv.id} className="relative py-[100px] border-t border-[#8b3fff]/20 overflow-hidden bg-[#F0F4F8]/20 backdrop-blur-[2px]">
            <div className="font-plus-jakarta-sans font-bold text-[100px] md:text-[200px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none z-0">
              0{srv.id}
            </div>
            
            <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10 flex flex-col md:flex-row items-center gap-16">
              
              <ScrollReveal className={`w-full md:w-1/2 ${srv.alignRight ? 'md:order-2' : ''}`}>
                <div className="font-space-mono text-[11px] text-[#00D9FF] tracking-widest uppercase mb-4">SERVICE 0{srv.id}</div>
                <h2 className="font-plus-jakarta-sans font-bold text-[32px] md:text-[44px] leading-[1.2] mb-6">
                  <span className="text-[#0D0D1F] block">{srv.title}</span>
                  <span className="text-gradient block text-[24px] md:text-[32px] mt-2">{srv.subtitle}</span>
                </h2>
                
                <p className="font-inter text-[17px] text-[#4A5568] mb-8 max-w-[500px] leading-[1.8] hover:text-[#0D0D1F] transition-colors duration-300">
                  {srv.desc}
                </p>
                
                <ul className="flex flex-col gap-4 mb-8">
                  {srv.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 group">
                      <span className="text-gradient group-hover:scale-125 transition-transform">✓</span>
                      <span className="font-inter text-[16px] text-[#0D0D1F] group-hover:text-[#00D9FF] transition-colors">{feat}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-3 mb-10">
                  {srv.metrics.map((metric, i) => (
                    <div key={i} className="glass-brand px-4 py-2 rounded-xl flex flex-col hover:bg-[rgba(139,63,255,0.2)] hover:scale-105 hover:shadow-[0_0_20px_rgba(139,63,255,0.3)] transition-all duration-300 cursor-default">
                      <span className="font-plus-jakarta-sans font-bold text-gradient">{metric.split(' ')[0]}</span>
                      <span className="font-space-mono text-[10px] text-[#4A5568] uppercase tracking-wider">{metric.substring(metric.indexOf(' ') + 1)}</span>
                    </div>
                  ))}
                </div>
                
                <Link href="/contact" className="btn-ghost">Get Started with {srv.title} →</Link>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2} className={`w-full md:w-1/2 h-[400px] glass-card flex items-center justify-center group hover:shadow-[0_0_40px_rgba(224,64,251,0.2)] hover:border-[#E040FB]/50 hover:scale-[1.02] transition-all duration-500 overflow-hidden relative ${srv.alignRight ? 'md:order-1' : ''}`}>
                 <img src={srv.image} alt={`${srv.title} 3D Visual`} className="w-full h-full object-cover rounded-[24px] group-hover:scale-105 transition-transform duration-700 relative z-10" />
                 <div className="absolute inset-0 bg-gradient-to-br from-[#8b3fff]/5 to-[#e040fb]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[24px] z-20 pointer-events-none mix-blend-overlay"></div>
              </ScrollReveal>
              
            </div>
          </section>
        ))}
      </div>

      {/* BOTTOM CTA */}
      <section className="py-[100px] bg-transparent">
        <div className="container mx-auto px-5 relative z-10">
          <ScrollReveal>
            <div className="glass-brand w-full max-w-[1280px] mx-auto rounded-[24px] p-16 text-center hover:bg-[rgba(139,63,255,0.1)] hover:shadow-[0_0_50px_rgba(139,63,255,0.2)] hover:scale-[1.01] transition-all duration-500">
              <h3 className="font-plus-jakarta-sans font-bold text-[28px] md:text-[36px] text-[#0D0D1F] mb-8">Not sure which service fits your challenge?</h3>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
                <Link href="/contact" className="btn-primary">Talk to an Expert</Link>
                <Link href="/contact" className="btn-ghost">Download Services Guide (PDF)</Link>
              </div>
              <p className="font-inter text-[15px] text-[#4A5568]">Free consultation · No commitment · Proposal within 48h</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
