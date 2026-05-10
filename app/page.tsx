"use client";

import { useEffect } from "react";
import Link from "next/link";
import { PlayCircle, Shield, Zap, Globe, Lock, CheckCircle2, ChevronDown, Brain, Cpu, BarChart, Code, Map, GraduationCap, Compass, Layers, Rocket, Infinity } from "lucide-react";
import LuminaBackground from "@/components/LuminaBackground";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  
  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      
      {/* 4-LAYERED ADVANCED 3D BACKGROUND */}
      <LuminaBackground />
      
      {/* ─── SECTION 1: HERO ─────────────────────────────────── */}
      <section className="relative min-h-screen pt-[72px] flex items-center overflow-hidden">
        {/* Background Ambients */}
        <div className="absolute inset-0 ambient-left z-0"></div>
        <div className="absolute inset-0 ambient-right z-0"></div>
        
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10 flex flex-col items-center text-center">
          
          {/* Main Content Container - Stacked & Centered */}
          <div className="w-full max-w-[900px] flex flex-col items-center relative">
            
            {/* Visual focus element (if needed, but LuminaBackground handles the main ribbon) */}

            <ScrollReveal>
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="w-8 h-[1px] bg-[var(--gradient-brand)]"></div>
                <span className="font-space-mono text-[11px] text-[#E040FB] tracking-[0.3em] uppercase">AI-Powered Expertise</span>
                <div className="w-8 h-[1px] bg-[var(--gradient-brand)]"></div>
              </div>
            </ScrollReveal>
            
            <h1 className="font-syncopate font-bold text-[48px] md:text-[84px] leading-[1.1] tracking-tight mb-8">
              <ScrollReveal delay={0.1}><div className="text-gradient drop-shadow-[0_0_40px_rgba(139,63,255,0.4)]">Illuminate</div></ScrollReveal>
              <ScrollReveal delay={0.2}><div className="text-white">Your Potential.</div></ScrollReveal>
              <ScrollReveal delay={0.3}><div className="text-gradient drop-shadow-[0_0_40px_rgba(139,63,255,0.4)]">Expertise</div></ScrollReveal>
              <ScrollReveal delay={0.4}><div className="text-white">Redefined.</div></ScrollReveal>
            </h1>
            
            <ScrollReveal delay={0.5}>
              <p className="font-plus-jakarta-sans text-[18px] text-[#9494c0] leading-[1.8] max-w-[640px] mx-auto mb-12">
                LuminaXpert connects you with world-class AI experts and 
                precision tools to transform your business — infinitely.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-6 mb-12 relative z-10">
                <Link href="/get-started" className="btn-primary inline-flex justify-center items-center px-10 h-[60px]">Start Your Journey →</Link>
                <Link href="/contact" className="btn-ghost inline-flex justify-center items-center gap-2 px-10 h-[60px]">
                  <PlayCircle size={18} /> Book a Consultation
                </Link>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.7}>
              <div className="flex flex-col items-center gap-4 mt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full bg-[#17173A] border-2 border-[#E040FB]/40 relative z-[1] overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-[#3B6FFF]/20 to-[#E040FB]/20 flex items-center justify-center text-[10px] text-[#E040FB]">UX</div>
                    </div>
                  ))}
                </div>
                <span className="font-space-mono text-[12px] text-[#4a4a80] uppercase tracking-widest">Trusted by 3,200+ global enterprises</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="animate-bounce">
            <ChevronDown size={24} className="text-[#E040FB]" />
          </div>
          <span className="font-space-mono text-[10px] text-[#4a4a80] mt-2 tracking-widest">SCROLL</span>
        </div>
      </section>

      {/* ─── SECTION 2: STATS BAR ────────────────────────────── */}
      <section className="relative w-full py-[140px] border-y border-[#8b3fff]/20 bg-[#11112a]/65 backdrop-blur-[30px] z-10">
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0">
            <ScrollReveal delay={0.1} className="flex-1">
              <div className="flex flex-col items-center text-center w-full">
                <div className="font-syne font-black text-[56px] text-gradient">500+</div>
                <div className="font-space-mono text-[12px] uppercase tracking-[0.15em] text-[#9494c0]">Expert Specialists</div>
              </div>
            </ScrollReveal>
            <div className="hidden md:block w-[1px] h-16 bg-gradient-to-b from-transparent via-[#8b3fff]/30 to-transparent"></div>
            
            <ScrollReveal delay={0.2} className="flex-1">
              <div className="flex flex-col items-center text-center w-full">
                <div className="font-syne font-black text-[56px] text-gradient">98.6%</div>
                <div className="font-space-mono text-[12px] uppercase tracking-[0.15em] text-[#9494c0]">Client Satisfaction</div>
              </div>
            </ScrollReveal>
            <div className="hidden md:block w-[1px] h-16 bg-gradient-to-b from-transparent via-[#8b3fff]/30 to-transparent"></div>
            
            <ScrollReveal delay={0.3} className="flex-1">
              <div className="flex flex-col items-center text-center w-full">
                <div className="font-syne font-black text-[56px] text-gradient">120+</div>
                <div className="font-space-mono text-[12px] uppercase tracking-[0.15em] text-[#9494c0]">Countries Served</div>
              </div>
            </ScrollReveal>
            <div className="hidden md:block w-[1px] h-16 bg-gradient-to-b from-transparent via-[#8b3fff]/30 to-transparent"></div>
            
            <ScrollReveal delay={0.4} className="flex-1">
              <div className="flex flex-col items-center text-center w-full">
                <div className="font-syne font-black text-[56px] text-gradient">$1.8B+</div>
                <div className="font-space-mono text-[12px] uppercase tracking-[0.15em] text-[#9494c0]">Value Delivered</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: SERVICES OVERVIEW ────────────────────── */}
      <section className="relative py-[120px] bg-[var(--color-bg-deep)]">
        <div className="absolute inset-0 ambient-left z-0 opacity-50"></div>
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10">
          
          <ScrollReveal>
            <div className="flex flex-col items-center text-center mb-20">
              <div className="font-space-mono text-[11px] text-[#00D9FF] tracking-widest uppercase mb-4 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#00D9FF]/50"></span>
                OUR SERVICES
                <span className="w-8 h-[1px] bg-[#00D9FF]/50"></span>
              </div>
              <h2 className="font-syne font-extrabold text-[40px] md:text-[56px] leading-[1.1] mb-6">
                <span className="text-white block">Everything you need to</span>
                <span className="text-gradient block">lead with AI.</span>
              </h2>
              <p className="font-outfit text-[19px] text-[#9494c0] max-w-[560px]">
                From strategy to implementation — six service lines, one integrated vision.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Brain size={32} />, title: "AI Consulting", desc: "Strategic advisory for AI adoption and organizational readiness." },
              { icon: <Cpu size={32} />, title: "Digital Transformation", desc: "End-to-end modernization with AI at the core of your operations." },
              { icon: <BarChart size={32} />, title: "Data & Analytics", desc: "Extract actionable intelligence and insights from your raw data." },
              { icon: <Code size={32} />, title: "AI Development", desc: "Custom models and solutions built specifically for your needs." },
              { icon: <Map size={32} />, title: "Strategy & Roadmap", desc: "Actionable 12-month AI plans aligned with your business goals." },
              { icon: <GraduationCap size={32} />, title: "Training & Enablement", desc: "Upskill your entire team to thrive in an AI-native environment." }
            ].map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card p-8 group hover:-translate-y-2 hover:border-[#E040FB]/40 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-[#8b3fff]/10 border border-[#8b3fff]/20 flex items-center justify-center text-[#E040FB] mb-5 drop-shadow-[0_0_8px_rgba(224,64,251,0.5)]">
                    {service.icon}
                  </div>
                  <h3 className="font-plus-jakarta-sans font-bold text-[22px] text-white mb-3">{service.title}</h3>
                  <p className="font-outfit text-[15px] leading-[1.7] text-[#9494c0] mb-5">{service.desc}</p>
                  <Link href="/services" className="btn-link">Learn more →</Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          <ScrollReveal delay={0.4}>
            <div className="flex justify-center mt-12">
              <Link href="/services" className="btn-ghost">View All Services →</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── SECTION 4: HOW IT WORKS ─────────────────────────── */}
      <section className="relative py-[120px] bg-[var(--color-bg-surface)] border-y border-[var(--color-border-subtle)]">
        <div className="absolute inset-0 ambient-center z-0 opacity-40"></div>
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10">
          
          <ScrollReveal>
            <div className="flex flex-col items-center text-center mb-20">
              <div className="font-space-mono text-[11px] text-[#E040FB] tracking-widest uppercase mb-4">THE PROCESS</div>
              <h2 className="font-syne font-extrabold text-[40px] md:text-[52px] leading-[1.1]">
                <span className="text-white block">From challenge to transformation</span>
                <span className="text-gradient block">in four steps.</span>
              </h2>
            </div>
          </ScrollReveal>
          
          <div className="flex flex-col md:flex-row justify-between relative gap-10 md:gap-4">
            {/* Dashed connecting line for desktop */}
            <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-[#8b3fff]/40 z-0"></div>
            
            {[
              { num: "01", title: "Discover", icon: <Compass size={36} />, desc: "We audit your current landscape and pinpoint where AI creates the most impact." },
              { num: "02", title: "Design", icon: <Layers size={36} />, desc: "Our specialists architect a precision strategy tailored to your team and industry." },
              { num: "03", title: "Deploy", icon: <Rocket size={36} />, desc: "We implement AI solutions alongside your team, ensuring smooth integration." },
              { num: "04", title: "Scale", icon: <Infinity size={36} />, desc: "Continuous optimization and scaling — because transformation never stops." }
            ].map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.15} className="flex-1">
                <div className="flex flex-col items-center text-center w-full md:w-[220px] mx-auto relative z-10 group">
                  <div className="font-space-mono font-bold text-[13px] text-[#4a4a80] tracking-[0.2em] mb-3 group-hover:text-white transition-colors">{step.num}</div>
                  <div className="w-[80px] h-[80px] rounded-full bg-[#0d0d1f]/80 border-[1.5px] border-[#8b3fff]/40 shadow-[0_0_20px_rgba(139,63,255,0.15)] flex items-center justify-center mb-6 group-hover:border-[#E040FB]/60 group-hover:shadow-[0_0_30px_rgba(224,64,251,0.25)] transition-all duration-300">
                    <span className="text-[#00D9FF] group-hover:text-[#E040FB] transition-colors drop-shadow-[0_0_8px_rgba(0,217,255,0.5)]">
                      {step.icon}
                    </span>
                  </div>
                  <h4 className="font-plus-jakarta-sans font-bold text-[20px] text-white mb-3">{step.title}</h4>
                  <p className="font-outfit text-[14px] leading-[1.7] text-[#9494c0] max-w-[200px]">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          <ScrollReveal delay={0.4}>
            <div className="mt-24 flex justify-center">
              <div className="glass-brand py-10 px-10 md:px-16 rounded-[24px] max-w-[900px] text-center">
                <h3 className="font-syne font-extrabold italic text-[28px] md:text-[44px] text-gradient">
                  "Intelligence without limits. Expertise without boundaries."
                </h3>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── SECTION 5: WHY LUMINAXPERT ──────────────────────── */}
      <section className="relative py-[120px] bg-[var(--color-bg-deep)]">
        <div className="absolute inset-0 ambient-right z-0 opacity-50"></div>
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10">
          
          <div className="flex flex-col md:flex-row gap-16 items-center">
            {/* Left Visual */}
            <div className="w-full md:w-[45%] perspective-[1200px]">
              <ScrollReveal>
                <div className="glass-card w-full aspect-[4/3] transform rotate-x-[10deg] -rotate-y-[8deg] hover:rotate-x-[5deg] hover:-rotate-y-[4deg] transition-transform duration-700 p-6 flex flex-col">
                  <div className="flex items-center gap-2 border-b border-[#8b3fff]/15 pb-4 mb-4">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="font-space-mono text-[12px] text-[#9494c0] ml-2">LuminaXpert Console</span>
                  </div>
                  
                  <div className="flex-1 flex gap-4">
                    <div className="w-1/2 h-full rounded-xl bg-[#0f0f28]/50 border border-[#8b3fff]/10 relative overflow-hidden p-4">
                      {/* Placeholder for chart */}
                      <div className="absolute inset-0 flex items-end justify-between px-4 pb-4">
                        {[40, 70, 45, 90, 65, 100].map((h, i) => (
                          <div key={i} className="w-4 bg-gradient-to-t from-[#3B6FFF]/50 to-[#00D9FF]/80 rounded-t-sm" style={{height: `${h}%`}}></div>
                        ))}
                      </div>
                    </div>
                    <div className="w-1/2 flex flex-col gap-3">
                      <div className="glass-brand p-3 rounded-xl flex items-center justify-between">
                        <span className="font-space-mono text-[11px] text-[#00F5A0]">ROI:</span>
                        <span className="font-syne font-bold text-white text-[16px]">+340%</span>
                      </div>
                      <div className="glass-brand p-3 rounded-xl flex items-center justify-between">
                        <span className="font-space-mono text-[11px] text-[#00D9FF]">Speed:</span>
                        <span className="font-syne font-bold text-white text-[16px]">8× faster</span>
                      </div>
                      <div className="glass-brand p-3 rounded-xl flex items-center justify-between">
                        <span className="font-space-mono text-[11px] text-[#FFD166]">Accuracy:</span>
                        <span className="font-syne font-bold text-white text-[16px]">99.7%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            
            {/* Right Text */}
            <div className="w-full md:w-[55%]">
              <ScrollReveal>
                <div className="font-space-mono text-[11px] text-[#E040FB] tracking-widest uppercase mb-4">WHY US</div>
                <h2 className="font-syne font-extrabold text-[40px] md:text-[52px] leading-[1.1] mb-8">
                  <span className="text-white block">The LuminaXpert</span>
                  <span className="text-gradient block">difference.</span>
                </h2>
              </ScrollReveal>
              
              <div className="flex flex-col">
                {[
                  { icon: Shield, title: "Verified Experts", desc: "Every specialist is rigorously vetted — credentials checked, track record confirmed." },
                  { icon: Zap, title: "Rapid Deployment", desc: "From brief to first delivery in days, not months." },
                  { icon: Globe, title: "Global Reach, Local Understanding", desc: "Experts across 40+ countries who understand your market." },
                  { icon: Lock, title: "Enterprise-Grade Security", desc: "SOC 2 Type II, GDPR compliant, zero data compromise." }
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <div className={`flex gap-5 py-5 ${i !== 3 ? 'border-b border-[var(--color-border-subtle)]' : ''}`}>
                      <div className="mt-1 text-[#E040FB] drop-shadow-[0_0_8px_rgba(224,64,251,0.5)]">
                        <item.icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-plus-jakarta-sans font-bold text-[18px] text-white mb-2">{item.title}</h4>
                        <p className="font-outfit text-[15px] text-[#9494c0] leading-[1.6]">{item.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-32">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                  <div className="font-space-mono text-[11px] text-[#00D9FF] tracking-widest uppercase mb-4">LATEST INSIGHTS</div>
                  <h2 className="font-syne font-extrabold text-[40px] text-white">Featured Intelligence</h2>
                </div>
                <Link href="/blog" className="btn-link">View All Insights →</Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScrollReveal delay={0.1}>
                <Link href="/blog/future-generative-ai" className="glass-card flex flex-col md:flex-row overflow-hidden group hover:border-[#E040FB]/40 transition-all duration-500">
                  <div className="md:w-[40%] h-[240px] md:h-auto overflow-hidden">
                    <img src="/images/blog/prompt1.png" alt="Generative AI" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="md:w-[60%] p-8 flex flex-col justify-center bg-[#0d0d1f]/60 backdrop-blur-md">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-[#E040FB]/10 text-[#E040FB] font-space-mono text-[10px] uppercase font-bold border border-[#E040FB]/20">Strategy</span>
                      <span className="text-[#4a4a80] font-space-mono text-[11px]">8 MIN READ</span>
                    </div>
                    <h3 className="font-plus-jakarta-sans font-bold text-[24px] text-white group-hover:text-[#E040FB] transition-colors mb-4">The Future of Generative AI in Enterprise</h3>
                    <p className="font-outfit text-[#9494c0] text-[15px] line-clamp-2">How autonomous agents are redefining the corporate landscape and what it means for your infrastructure.</p>
                  </div>
                </Link>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <Link href="/blog/ai-infrastructure" className="glass-card flex flex-col md:flex-row overflow-hidden group hover:border-[#00D9FF]/40 transition-all duration-500">
                  <div className="md:w-[40%] h-[240px] md:h-auto overflow-hidden">
                    <img src="/images/blog/prompt2.png" alt="AI Infrastructure" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="md:w-[60%] p-8 flex flex-col justify-center bg-[#0d0d1f]/60 backdrop-blur-md">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-[#00D9FF]/10 text-[#00D9FF] font-space-mono text-[10px] uppercase font-bold border border-[#00D9FF]/20">Engineering</span>
                      <span className="text-[#4a4a80] font-space-mono text-[11px]">12 MIN READ</span>
                    </div>
                    <h3 className="font-plus-jakarta-sans font-bold text-[24px] text-white group-hover:text-[#00D9FF] transition-colors mb-4">Scaling AI Infrastructure Globally</h3>
                    <p className="font-outfit text-[#9494c0] text-[15px] line-clamp-2">The architecture behind multi-region AI orchestration and autonomous workflow delivery.</p>
                  </div>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: CTA BAND ─────────────────────────────── */}
      <section className="relative py-[80px] bg-[var(--color-bg-void)] border-y border-[var(--color-brand-magenta)]/30 overflow-hidden mt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B6FFF]/10 via-[#8B3FFF]/15 to-[#E040FB]/10 z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(139,63,255,0.15)_0%,transparent_70%)] rounded-full animate-pulse z-0"></div>
        
        <div className="container mx-auto px-5 relative z-10 flex flex-col items-center text-center">
          <ScrollReveal>
            <h2 className="font-syne font-black text-[40px] md:text-[56px] text-white mb-4">
              Ready to illuminate your potential?
            </h2>
            <p className="font-outfit text-[20px] text-[#9494c0] mb-8">
              Talk to a LuminaXpert specialist today. No commitment.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-4 mb-6 relative z-10">
              <Link href="/contact" className="btn-primary">Book a Free Consultation</Link>
              <Link href="/services" className="btn-ghost">Explore Our Services</Link>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="font-space-mono text-[11px] text-[#4a4a80] flex flex-wrap justify-center gap-4">
              <span>✓ No credit card</span>
              <span className="hidden sm:inline">·</span>
              <span>✓ 30-min discovery call</span>
              <span className="hidden sm:inline">·</span>
              <span>✓ Proposal within 48h</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
