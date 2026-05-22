"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  PlayCircle, Shield, Zap, Globe, Lock, CheckCircle2, ChevronDown, Brain, Cpu, 
  BarChart, Code, Map, GraduationCap, Compass, Layers, Rocket, Infinity,
  Landmark, Activity, ShoppingCart, Truck, Factory, Radio, Star, ChevronLeft, 
  ChevronRight, Quote 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LuminaBackground from "@/components/LuminaBackground";
import ScrollReveal from "@/components/ScrollReveal";
import RoiCalculator from "@/components/RoiCalculator";

const clientLogos = [
  { name: "Apex Finance", icon: <Landmark size={20} /> },
  { name: "Helix Health", icon: <Activity size={20} /> },
  { name: "Vortex Retail", icon: <ShoppingCart size={20} /> },
  { name: "Atlas Logistics", icon: <Truck size={20} /> },
  { name: "Quantum Mfg", icon: <Factory size={20} /> },
  { name: "Nova Telecom", icon: <Radio size={20} /> },
  { name: "Global Insure", icon: <Shield size={20} /> },
  { name: "Horizon Travel", icon: <Globe size={20} /> },
  { name: "Titan Energy", icon: <Zap size={20} /> },
  { name: "Cyber Safe", icon: <Lock size={20} /> },
  { name: "Orion Research", icon: <Brain size={20} /> },
  { name: "Prime Systems", icon: <Cpu size={20} /> },
];

const testimonials = [
  {
    quote: "LuminaXpert transformed how we approach data. What used to take our team two weeks now takes two hours. The ROI was visible within 60 days.",
    name: "James Whitmore",
    role: "CTO",
    company: "Global Fintech Company",
    stars: 5,
    metric: "60-day ROI"
  },
  {
    quote: "We went from zero AI capability to a full production deployment in under 3 months. Their team felt like an extension of ours.",
    name: "Priya Nair",
    role: "VP Operations",
    company: "Fortune 500 Healthcare Provider",
    stars: 5,
    metric: "3-month deployment"
  },
  {
    quote: "The strategy roadmap they delivered became the foundation for our Series C pitch. We closed $45M shortly after.",
    name: "Alex Torres",
    role: "CEO",
    company: "Series B AI Startup",
    stars: 5,
    metric: "$45M raised"
  },
  {
    quote: "Their training program upskilled 400 of our employees in 6 weeks. The culture shift was remarkable.",
    name: "Sophie Brennan",
    role: "CHRO",
    company: "European Logistics Leader",
    stars: 5,
    metric: "400 employees trained"
  },
  {
    quote: "Best-in-class security standards and zero compliance incidents since deployment. Exactly what we needed in a regulated environment.",
    name: "Daniel Osei",
    role: "Chief Compliance Officer",
    company: "Tier-1 Investment Bank",
    stars: 5,
    metric: "Zero compliance incidents"
  }
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovering]);
  
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
            
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="w-8 h-[1px] bg-[var(--gradient-brand)]"></div>
                <span className="font-space-mono text-[11px] text-[#E040FB] tracking-[0.3em] uppercase">AI-Powered Expertise</span>
                <div className="w-8 h-[1px] bg-[var(--gradient-brand)]"></div>
              </div>
            </ScrollReveal>
            
            <h1 className="font-plus-jakarta-sans font-bold text-[48px] md:text-[84px] leading-[1.1] tracking-tight mb-8">
              <ScrollReveal delay={0.1}><div className="text-gradient drop-shadow-[0_0_40px_rgba(139,63,255,0.4)]">Build AI</div></ScrollReveal>
              <ScrollReveal delay={0.2}><div className="text-[#0D0D1F]">That Actually Works.</div></ScrollReveal>
              <ScrollReveal delay={0.3}><div className="text-gradient drop-shadow-[0_0_40px_rgba(139,63,255,0.4)]">Expertise</div></ScrollReveal>
              <ScrollReveal delay={0.4}><div className="text-[#0D0D1F]">Redefined.</div></ScrollReveal>
            </h1>
            
            <ScrollReveal delay={0.5}>
              <p className="font-plus-jakarta-sans text-[18px] text-[#4A5568] leading-[1.8] max-w-[640px] mx-auto mb-12">
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
                    <div key={i} className="w-12 h-12 rounded-full bg-[#FFFFFF] border-2 border-[#E040FB]/40 relative z-[1] overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-[#3B6FFF]/20 to-[#E040FB]/20 flex items-center justify-center text-[10px] text-[#E040FB]">UX</div>
                    </div>
                  ))}
                </div>
                <span className="font-space-mono text-[12px] text-[#718096] uppercase tracking-widest">Trusted by 3,200+ global enterprises</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="animate-bounce">
            <ChevronDown size={24} className="text-[#E040FB]" />
          </div>
          <span className="font-space-mono text-[10px] text-[#718096] mt-2 tracking-widest">SCROLL</span>
        </div>
      </section>

      {/* ─── SECTION 2: STATS BAR ────────────────────────────── */}
      <section className="relative w-full py-[140px] border-y border-[#8b3fff]/20 bg-[#F0F4F8]/65 backdrop-blur-[30px] z-10">
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0">
            <ScrollReveal delay={0.1} className="flex-1">
              <div className="flex flex-col items-center text-center w-full">
                <div className="font-plus-jakarta-sans font-black text-[56px] text-gradient">500+</div>
                <div className="font-space-mono text-[12px] uppercase tracking-[0.15em] text-[#4A5568]">Expert Specialists</div>
              </div>
            </ScrollReveal>
            <div className="hidden md:block w-[1px] h-16 bg-gradient-to-b from-transparent via-[#8b3fff]/30 to-transparent"></div>
            
            <ScrollReveal delay={0.2} className="flex-1">
              <div className="flex flex-col items-center text-center w-full">
                <div className="font-plus-jakarta-sans font-black text-[56px] text-gradient">98.6%</div>
                <div className="font-space-mono text-[12px] uppercase tracking-[0.15em] text-[#4A5568]">
                  Client Satisfaction
                </div>
                <span className="text-[10px] font-space-mono text-gray-500 mt-1 uppercase tracking-wider block">
                  * Independent Audit Verified
                </span>
              </div>
            </ScrollReveal>
            <div className="hidden md:block w-[1px] h-16 bg-gradient-to-b from-transparent via-[#8b3fff]/30 to-transparent"></div>
            
            <ScrollReveal delay={0.3} className="flex-1">
              <div className="flex flex-col items-center text-center w-full">
                <div className="font-plus-jakarta-sans font-black text-[56px] text-gradient">120+</div>
                <div className="font-space-mono text-[12px] uppercase tracking-[0.15em] text-[#4A5568]">Countries Served</div>
              </div>
            </ScrollReveal>
            <div className="hidden md:block w-[1px] h-16 bg-gradient-to-b from-transparent via-[#8b3fff]/30 to-transparent"></div>
            
            <ScrollReveal delay={0.4} className="flex-1">
              <div className="flex flex-col items-center text-center w-full">
                <div className="font-plus-jakarta-sans font-black text-[56px] text-gradient">$1.8B+</div>
                <div className="font-space-mono text-[12px] uppercase tracking-[0.15em] text-[#4A5568]">Value Delivered</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2.5: CLIENT LOGOS MARQUEE ───────────────── */}
      <section className="relative w-full py-12 bg-[#080D1A] overflow-hidden border-b border-[#ffffff08] marquee-container z-10">
        {/* Replace with real client logos */}
        <div className="text-center mb-6">
          <span className="font-space-mono text-[10px] text-gray-500 tracking-[0.3em] uppercase">
            Trusted by Industry Leaders
          </span>
        </div>
        
        {/* Row 1: Left to Right */}
        <div className="flex overflow-hidden relative w-full mb-4">
          <div className="animate-marquee-ltr flex gap-12 whitespace-nowrap">
            {clientLogos.map((logo, idx) => (
              <div key={idx} className="flex items-center gap-3 text-gray-400 opacity-40 hover:opacity-80 transition-opacity duration-300 cursor-pointer">
                <span className="text-[#E040FB]">{logo.icon}</span>
                <span className="font-space-mono text-[13px] tracking-wider uppercase">{logo.name}</span>
              </div>
            ))}
            {/* Duplicate for infinite effect */}
            {clientLogos.map((logo, idx) => (
              <div key={`dup1-${idx}`} className="flex items-center gap-3 text-gray-400 opacity-40 hover:opacity-80 transition-opacity duration-300 cursor-pointer">
                <span className="text-[#E040FB]">{logo.icon}</span>
                <span className="font-space-mono text-[13px] tracking-wider uppercase">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left (Desktop Only) */}
        <div className="hidden md:flex overflow-hidden relative w-full">
          <div className="animate-marquee-rtl flex gap-12 whitespace-nowrap">
            {clientLogos.map((logo, idx) => (
              <div key={idx} className="flex items-center gap-3 text-gray-400 opacity-40 hover:opacity-80 transition-opacity duration-300 cursor-pointer">
                <span className="text-[#00D9FF]">{logo.icon}</span>
                <span className="font-space-mono text-[13px] tracking-wider uppercase">{logo.name}</span>
              </div>
            ))}
            {/* Duplicate for infinite effect */}
            {clientLogos.map((logo, idx) => (
              <div key={`dup2-${idx}`} className="flex items-center gap-3 text-gray-400 opacity-40 hover:opacity-80 transition-opacity duration-300 cursor-pointer">
                <span className="text-[#00D9FF]">{logo.icon}</span>
                <span className="font-space-mono text-[13px] tracking-wider uppercase">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: SERVICES OVERVIEW ────────────────────── */}
      <section className="relative py-[120px] bg-[#FFFFFF]">
        <div className="absolute inset-0 ambient-left z-0 opacity-50"></div>
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10">
          
          <ScrollReveal>
            <div className="flex flex-col items-center text-center mb-20">
              <div className="font-space-mono text-[11px] text-[#00D9FF] tracking-widest uppercase mb-4 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#00D9FF]/50"></span>
                OUR SERVICES
                <span className="w-8 h-[1px] bg-[#00D9FF]/50"></span>
              </div>
              <h2 className="font-plus-jakarta-sans font-extrabold text-[40px] md:text-[56px] leading-[1.1] mb-6">
                <span className="text-[#0D0D1F] block">Everything you need to</span>
                <span className="text-gradient block">lead with AI.</span>
              </h2>
              <p className="font-inter text-[19px] text-[#4A5568] max-w-[560px]">
                From strategy to implementation — nine service lines, one integrated vision.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Brain size={32} />, title: "AI Consulting", desc: "Strategic advisory for AI adoption and organizational readiness.", link: "/services#service-1" },
              { icon: <Cpu size={32} />, title: "Digital Transformation", desc: "End-to-end modernization with AI at the core of your operations.", link: "/services#service-2" },
              { icon: <BarChart size={32} />, title: "Data & Analytics", desc: "Extract actionable intelligence and insights from your raw data.", link: "/services#service-3" },
              { icon: <Code size={32} />, title: "AI Development", desc: "Custom models and solutions built specifically for your needs.", link: "/services#service-4" },
              { icon: <Map size={32} />, title: "Strategy & Roadmap", desc: "Actionable 12-month AI plans aligned with your business goals.", link: "/services#service-5" },
              { icon: <GraduationCap size={32} />, title: "Training & Enablement", desc: "Upskill your entire team to thrive in an AI-native environment.", link: "/services#service-6" }
            ].map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card p-8 group hover:-translate-y-2 hover:border-[#E040FB]/40 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-[#8b3fff]/10 border border-[#8b3fff]/20 flex items-center justify-center text-[#E040FB] mb-5 drop-shadow-[0_0_8px_rgba(224,64,251,0.5)]">
                    {service.icon}
                  </div>
                  <h3 className="font-plus-jakarta-sans font-bold text-[22px] text-[#0D0D1F] mb-3">{service.title}</h3>
                  <p className="font-inter text-[15px] leading-[1.7] text-[#4A5568] mb-5">{service.desc}</p>
                  <Link href={service.link} className="btn-link">Learn more →</Link>
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
      <section className="relative py-[120px] bg-[#F0F4F8] border-y border-[rgba(139, 63, 255, 0.15)]">
        <div className="absolute inset-0 ambient-center z-0 opacity-40"></div>
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10">
          
          <ScrollReveal>
            <div className="flex flex-col items-center text-center mb-20">
              <div className="font-space-mono text-[11px] text-[#E040FB] tracking-widest uppercase mb-4">THE PROCESS</div>
              <h2 className="font-plus-jakarta-sans font-extrabold text-[40px] md:text-[52px] leading-[1.1]">
                <span className="text-[#0D0D1F] block">From challenge to transformation</span>
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
                  <div className="font-space-mono font-bold text-[13px] text-[#718096] tracking-[0.2em] mb-3 group-hover:text-[#0D0D1F] transition-colors">{step.num}</div>
                  <div className="w-[80px] h-[80px] rounded-full bg-[#FFFFFF]/80 border-[1.5px] border-[#8b3fff]/40 shadow-[0_0_20px_rgba(139,63,255,0.15)] flex items-center justify-center mb-6 group-hover:border-[#E040FB]/60 group-hover:shadow-[0_0_30px_rgba(224,64,251,0.25)] transition-all duration-300">
                    <span className="text-[#00D9FF] group-hover:text-[#E040FB] transition-colors drop-shadow-[0_0_8px_rgba(0,217,255,0.5)]">
                      {step.icon}
                    </span>
                  </div>
                  <h4 className="font-plus-jakarta-sans font-bold text-[20px] text-[#0D0D1F] mb-3">{step.title}</h4>
                  <p className="font-inter text-[14px] leading-[1.7] text-[#4A5568] max-w-[200px]">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          <ScrollReveal delay={0.4}>
            <div className="mt-24 flex justify-center">
              <div className="glass-brand py-10 px-10 md:px-16 rounded-[24px] max-w-[900px] text-center">
                <h3 className="font-plus-jakarta-sans font-extrabold italic text-[28px] md:text-[44px] text-gradient">
                  "Intelligence without limits. Expertise without boundaries."
                </h3>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── SECTION 5: WHY LUMINAXPERT ──────────────────────── */}
      <section className="relative py-[120px] bg-[#FFFFFF]">
        <div className="absolute inset-0 ambient-right z-0 opacity-50"></div>
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10">
          
          <div className="flex flex-col md:flex-row gap-16 items-center">
            {/* Left Visual */}
            <div className="w-full md:w-[45%] perspective-[1200px]">
              <ScrollReveal>
                <div className="glass-card w-full aspect-[4/3] transform rotate-x-[10deg] -rotate-y-[8deg] hover:rotate-x-[5deg] hover:-rotate-y-[4deg] transition-transform duration-700 p-6 flex flex-col bg-white">
                  <div className="flex items-center gap-2 border-b border-[#8b3fff]/15 pb-4 mb-4">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="font-space-mono text-[12px] text-[#4A5568] ml-2">LuminaXpert Console</span>
                  </div>
                  
                  <div className="flex-1 flex gap-4">
                    <div className="w-1/2 h-full rounded-xl bg-[#FFFFFF]/50 border border-[#8b3fff]/10 relative overflow-hidden p-4">
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
                        <span className="font-plus-jakarta-sans font-bold text-[#0D0D1F] text-[16px]">+340%</span>
                      </div>
                      <div className="glass-brand p-3 rounded-xl flex items-center justify-between">
                        <span className="font-space-mono text-[11px] text-[#00D9FF]">Speed:</span>
                        <span className="font-plus-jakarta-sans font-bold text-[#0D0D1F] text-[16px]">8× faster</span>
                      </div>
                      <div className="glass-brand p-3 rounded-xl flex items-center justify-between">
                        <span className="font-space-mono text-[11px] text-[#FFD166]">Accuracy:</span>
                        <span className="font-plus-jakarta-sans font-bold text-[#0D0D1F] text-[16px]">99.7%</span>
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
                <h2 className="font-plus-jakarta-sans font-extrabold text-[40px] md:text-[52px] leading-[1.1] mb-8">
                  <span className="text-[#0D0D1F] block">The LuminaXpert</span>
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
                    <div className={`flex gap-5 py-5 ${i !== 3 ? 'border-b border-[rgba(139, 63, 255, 0.15)]' : ''}`}>
                      <div className="mt-1 text-[#E040FB] drop-shadow-[0_0_8px_rgba(224,64,251,0.5)]">
                        <item.icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-plus-jakarta-sans font-bold text-[18px] text-[#0D0D1F] mb-2">{item.title}</h4>
                        <p className="font-inter text-[15px] text-[#4A5568] leading-[1.6]">{item.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: ROI CALCULATOR ────────────────────────── */}
      <section className="relative py-[120px] bg-[#080D1A] overflow-hidden border-t border-[#ffffff10]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,63,255,0.08),transparent_70%)] pointer-events-none"></div>
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center mb-16">
              <div className="font-space-mono text-[11px] text-[#F5C842] tracking-widest uppercase mb-4 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#F5C842]/50"></span>
                Interactive Tools
                <span className="w-8 h-[1px] bg-[#F5C842]/50"></span>
              </div>
              <h2 className="font-plus-jakarta-sans font-extrabold text-[40px] md:text-[52px] leading-[1.1] text-white mb-6">
                Calculate your <span className="text-gradient">AI Return on Investment</span>
              </h2>
              <p className="font-inter text-[17px] text-gray-400 max-w-[600px]">
                Input your process specifications to generate real-time estimates of efficiency gains, break-even timelines, and cost reductions.
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <RoiCalculator />
          </ScrollReveal>
        </div>
      </section>

      {/* ─── SECTION 7: TESTIMONIALS ─────────────────────────── */}
      <section className="relative py-[120px] bg-[#0A0F1E] border-y border-[#ffffff10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8b3fff]/5 to-transparent z-0"></div>
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10">
          
          <ScrollReveal>
            <div className="flex flex-col items-center text-center mb-16">
              <div className="font-space-mono text-[11px] text-[#E040FB] tracking-widest uppercase mb-4">
                WHAT OUR CLIENTS SAY
              </div>
              <h2 className="font-plus-jakarta-sans font-extrabold text-[36px] md:text-[52px] leading-[1.1] text-white">
                Results that speak louder than credentials.
              </h2>
            </div>
          </ScrollReveal>
          
          <div 
            className="max-w-[850px] mx-auto relative animate-fade-in"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Large Decorative Quote Icon */}
            <div className="absolute -top-10 -left-6 text-white/[0.03] select-none pointer-events-none">
              <Quote size={180} className="fill-white/[0.01]" />
            </div>

            {/* Carousel Content */}
            <div className="relative min-h-[350px] md:min-h-[280px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full glass-card !bg-white/[0.02] !border-white/[0.08] p-8 md:p-12 backdrop-blur-xl flex flex-col md:flex-row items-center gap-8 md:gap-12"
                >
                  <div className="flex-1">
                    {/* Star Rating */}
                    <div className="flex gap-1 mb-4 text-[#F5C842]">
                      {Array.from({ length: testimonials[activeTestimonial].stars }).map((_, i) => (
                        <Star key={i} size={16} className="fill-[#F5C842]" />
                      ))}
                    </div>
                    
                    {/* Quote */}
                    <blockquote className="font-inter text-gray-200 text-[16px] md:text-[18px] leading-[1.8] italic mb-6">
                      "{testimonials[activeTestimonial].quote}"
                    </blockquote>
                    
                    {/* Author */}
                    <div>
                      <cite className="font-plus-jakarta-sans font-bold text-white text-[16px] not-italic block">
                        {testimonials[activeTestimonial].name}
                      </cite>
                      <span className="font-space-mono text-gray-400 text-[12px] uppercase tracking-wider block mt-1">
                        {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}
                      </span>
                    </div>
                  </div>
                  
                  {/* Outcome Metric Callout */}
                  <div className="w-full md:w-[220px] bg-gradient-to-br from-[#8b3fff]/10 to-[#FB00DF]/5 border border-white/[0.05] rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                    <span className="font-space-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-2">Verified Outcome</span>
                    <div className="font-plus-jakarta-sans font-black text-[#F5C842] text-[28px] leading-tight">
                      {testimonials[activeTestimonial].metric}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-8 relative z-20">
              {/* Prev Button */}
              <button 
                onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      activeTestimonial === i 
                        ? "bg-[#F5C842] w-6" 
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
              
              {/* Next Button */}
              <button 
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ─── SECTION 8: LATEST INSIGHTS ──────────────────────── */}
      <section className="relative py-[120px] bg-[#FFFFFF]">
        <div className="absolute inset-0 ambient-right z-0 opacity-50"></div>
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10">
          <div>
            <ScrollReveal>
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                  <div className="font-space-mono text-[11px] text-[#00D9FF] tracking-widest uppercase mb-4">LATEST INSIGHTS</div>
                  <h2 className="font-plus-jakarta-sans font-extrabold text-[40px] text-[#0D0D1F]">Featured Intelligence</h2>
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
                  <div className="md:w-[60%] p-8 flex flex-col justify-center bg-[#FFFFFF]/60 backdrop-blur-md">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-[#E040FB]/10 text-[#E040FB] font-space-mono text-[10px] uppercase font-bold border border-[#E040FB]/20">Strategy</span>
                      <span className="text-[#718096] font-space-mono text-[11px]">8 MIN READ</span>
                    </div>
                    <h3 className="font-plus-jakarta-sans font-bold text-[24px] text-[#0D0D1F] group-hover:text-[#E040FB] transition-colors mb-4">The Future of Generative AI in Enterprise</h3>
                    <p className="font-inter text-[#4A5568] text-[15px] line-clamp-2">How autonomous agents are redefining the corporate landscape and what it means for your infrastructure.</p>
                  </div>
                </Link>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <Link href="/blog/ai-infrastructure" className="glass-card flex flex-col md:flex-row overflow-hidden group hover:border-[#00D9FF]/40 transition-all duration-500">
                  <div className="md:w-[40%] h-[240px] md:h-auto overflow-hidden">
                    <img src="/images/blog/prompt2.png" alt="AI Infrastructure" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="md:w-[60%] p-8 flex flex-col justify-center bg-[#FFFFFF]/60 backdrop-blur-md">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-[#00D9FF]/10 text-[#00D9FF] font-space-mono text-[10px] uppercase font-bold border border-[#00D9FF]/20">Engineering</span>
                      <span className="text-[#718096] font-space-mono text-[11px]">12 MIN READ</span>
                    </div>
                    <h3 className="font-plus-jakarta-sans font-bold text-[24px] text-[#0D0D1F] group-hover:text-[#00D9FF] transition-colors mb-4">Scaling AI Infrastructure Globally</h3>
                    <p className="font-inter text-[#4A5568] text-[15px] line-clamp-2">The architecture behind multi-region AI orchestration and autonomous workflow delivery.</p>
                  </div>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 9: PARTNERS & CERTIFICATIONS ────────────── */}
      <section className="relative py-[100px] bg-[#0A0F1E] border-t border-[#ffffff10] overflow-hidden z-10">
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center mb-16">
              <div className="font-space-mono text-[11px] text-[#F5C842] tracking-widest uppercase mb-4">
                BUILT ON THE WORLD'S BEST AI INFRASTRUCTURE
              </div>
              <h2 className="font-plus-jakarta-sans font-extrabold text-[32px] md:text-[44px] text-white">
                Certified expertise across leading platforms.
              </h2>
            </div>
          </ScrollReveal>
          
          <div className="max-w-[800px] mx-auto flex flex-col gap-6">
            {/* Row 1: Cloud */}
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {["AWS Partner", "Microsoft Azure", "Google Cloud"].map((cloud) => (
                  <div key={cloud} className="bg-white/[0.03] border border-white/[0.08] hover:border-[#F5C842]/40 rounded-xl py-5 px-6 flex items-center justify-center font-plus-jakarta-sans font-bold text-white text-[15px] hover:-translate-y-1 transition-all duration-300">
                    {cloud}
                  </div>
                ))}
              </div>
            </ScrollReveal>
            
            {/* Row 2: AI/ML */}
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["OpenAI", "Hugging Face", "Databricks", "Snowflake"].map((ai) => (
                  <div key={ai} className="bg-white/[0.03] border border-white/[0.08] hover:border-[#E040FB]/40 rounded-xl py-5 px-6 flex items-center justify-center font-plus-jakarta-sans font-bold text-white text-[15px] hover:-translate-y-1 transition-all duration-300">
                    {ai}
                  </div>
                ))}
              </div>
            </ScrollReveal>
            
            {/* Row 3: Compliance */}
            <ScrollReveal delay={0.3}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["SOC 2 Type II", "GDPR Ready", "ISO 27001", "EU AI Act Aligned"].map((comp) => (
                  <div key={comp} className="bg-white/[0.03] border border-white/[0.08] hover:border-[#00D9FF]/40 rounded-xl py-5 px-6 flex items-center justify-center font-plus-jakarta-sans font-bold text-white text-[15px] hover:-translate-y-1 transition-all duration-300">
                    {comp}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
          
          <ScrollReveal delay={0.4}>
            <p className="text-[11px] font-space-mono text-gray-500 text-center mt-10">
              * LuminaXpert maintains independent expertise across all platforms. We are not limited to any single vendor.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── SECTION 10: CTA BAND ────────────────────────────── */}
      <section className="relative py-[80px] bg-[#F8F9FA] border-y border-[var(--color-brand-magenta)]/30 overflow-hidden mt-20 z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B6FFF]/10 via-[#8B3FFF]/15 to-[#E040FB]/10 z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(139,63,255,0.15)_0%,transparent_70%)] rounded-full animate-pulse z-0"></div>
        
        <div className="container mx-auto px-5 relative z-10 flex flex-col items-center text-center">
          <ScrollReveal>
            <h2 className="font-plus-jakarta-sans font-black text-[40px] md:text-[56px] text-[#0D0D1F] mb-4">
              Ready to illuminate your potential?
            </h2>
            <p className="font-inter text-[20px] text-[#4A5568] mb-8">
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
            <div className="font-space-mono text-[11px] text-[#718096] flex flex-wrap justify-center gap-4">
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
