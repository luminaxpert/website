import Link from "next/link";
import Image from "next/image";
import {
  PlayCircle, Shield, Zap, Globe, Lock, Brain, Cpu, BarChart, Code, Compass, Layers,
  Rocket, Infinity as InfinityIcon, Landmark, Activity, ShoppingCart, Truck, Factory, Radio, ArrowRight, Eye,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import RoiCalculator from "@/components/RoiCalculator";
import CountUp from "@/components/CountUp";
import Testimonials from "@/components/home/Testimonials";
import { SORTED_POSTS } from "@/lib/posts";

const clientLogos = [
  { name: "Apex Finance", icon: Landmark },
  { name: "Helix Health", icon: Activity },
  { name: "Vortex Retail", icon: ShoppingCart },
  { name: "Atlas Logistics", icon: Truck },
  { name: "Quantum Mfg", icon: Factory },
  { name: "Nova Telecom", icon: Radio },
  { name: "Global Insure", icon: Shield },
  { name: "Horizon Travel", icon: Globe },
  { name: "Titan Energy", icon: Zap },
  { name: "Cyber Safe", icon: Lock },
  { name: "Orion Research", icon: Brain },
  { name: "Prime Systems", icon: Cpu },
];

const services = [
  { icon: Brain, title: "AI Consulting", desc: "Strategic advisory for AI adoption and organizational readiness.", link: "/services#service-1" },
  { icon: Cpu, title: "Digital Transformation", desc: "End-to-end modernization with AI at the core of your operations.", link: "/services#service-2" },
  { icon: BarChart, title: "Data & Analytics", desc: "Extract actionable intelligence and insights from your raw data.", link: "/services#service-3" },
  { icon: Code, title: "AI Development", desc: "Custom models and solutions built specifically for your needs.", link: "/services#service-4" },
  { icon: Zap, title: "AI Agents & Automation", desc: "Autonomous, governed agents that execute multi-step workflows.", link: "/services#service-7" },
  { icon: Eye, title: "Responsible & Ethical AI", desc: "EU AI Act, NIST RMF and ISO 42001 alignment you can defend.", link: "/services#service-9" },
];

const steps = [
  { num: "01", title: "Discover", icon: Compass, desc: "We audit your current landscape and pinpoint where AI creates the most impact." },
  { num: "02", title: "Design", icon: Layers, desc: "Our specialists architect a precision strategy tailored to your team and industry." },
  { num: "03", title: "Deploy", icon: Rocket, desc: "We implement AI solutions alongside your team, ensuring smooth integration." },
  { num: "04", title: "Scale", icon: InfinityIcon, desc: "Continuous optimization and scaling — because transformation never stops." },
];

const stats = [
  { value: 500, suffix: "+", label: "Expert Specialists" },
  { value: 98.6, decimals: 1, suffix: "%", label: "Client Satisfaction" },
  { value: 120, suffix: "+", label: "Countries Served" },
  { value: 1.8, decimals: 1, prefix: "$", suffix: "B+", label: "Value Delivered" },
];

function Marquee({ reverse = false }: { reverse?: boolean }) {
  const items = [...clientLogos, ...clientLogos];
  return (
    <div className="flex overflow-hidden relative w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className={`${reverse ? "animate-marquee-rtl" : "animate-marquee-ltr"} flex gap-12 whitespace-nowrap`}>
        {items.map((logo, idx) => (
          <div key={idx} className="flex items-center gap-3 text-[#4A5568] opacity-60 hover:opacity-100 transition-opacity duration-300" aria-hidden={idx >= clientLogos.length}>
            <logo.icon size={20} className={reverse ? "text-[#0891B2]" : "text-[#A21CAF]"} />
            <span className="font-space-mono text-[13px] tracking-wider uppercase">{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const latest = SORTED_POSTS.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] pt-[110px] pb-24 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(45%_38%_at_50%_48%,rgba(255,255,255,0.7),rgba(255,255,255,0.2)_65%,transparent)] pointer-events-none" />
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px] relative z-10 flex flex-col items-center text-center w-full">
          <div className="w-full max-w-[960px] flex flex-col items-center">
            <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[rgba(139,63,255,0.2)] shadow-[0_8px_30px_rgba(139,63,255,0.08)] animate-slide-up-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#FB00DF] opacity-60 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FB00DF]" />
              </span>
              <span className="font-space-mono text-[10px] sm:text-[11px] text-[#4A5568] tracking-[0.2em] uppercase">Enterprise AI<span className="hidden sm:inline"> · Strategy to Production</span></span>
            </div>

            <h1 className="font-plus-jakarta-sans font-extrabold text-[44px] sm:text-[60px] md:text-[84px] leading-[1.02] tracking-[-0.035em] mb-8 text-[#0D0D1F]">
              <span className="block animate-slide-up-2">Build AI that</span>
              <span className="block text-gradient animate-slide-up-3 pb-2">actually works.</span>
            </h1>

            <p className="font-inter text-[18px] md:text-[20px] text-[#4A5568] leading-[1.7] max-w-[680px] mx-auto mb-12 animate-slide-up-3">
              LuminaXpert pairs world-class AI specialists with proven delivery frameworks to take you from strategy to governed, production-grade AI — and measurable ROI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14 animate-slide-up-4">
              <Link href="/get-started" className="btn-primary px-10 h-[58px]">Start Your Journey →</Link>
              <Link href="/booking" className="btn-ghost gap-2 px-10 h-[58px] bg-white/70">
                <PlayCircle size={18} /> Book a Consultation
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-delayed">
              <div className="flex -space-x-3">
                {["#050DEB", "#8B3FFF", "#E040FB", "#0891B2", "#FB00DF"].map((c, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center shadow-sm" style={{ background: `linear-gradient(135deg, ${c}22, ${c}55)` }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  </div>
                ))}
              </div>
              <span className="font-space-mono text-[12px] text-[#4A5568] uppercase tracking-widest">Trusted by 3,200+ organizations worldwide</span>
            </div>
          </div>
        </div>

        <a href="#stats" className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 group" aria-label="Scroll to content">
          <div className="w-[28px] h-[46px] rounded-full border-2 border-[#8b3fff]/30 flex justify-center p-1 group-hover:border-[#E040FB]/60 transition-colors duration-300">
            <div className="w-1.5 h-3 bg-gradient-to-b from-[#3B6FFF] to-[#E040FB] rounded-full animate-bounce mt-1" />
          </div>
          <span className="font-space-mono text-[10px] text-[#718096] uppercase tracking-[0.3em]">Scroll</span>
        </a>
      </section>

      {/* ─── STATS ────────────────────────────────────────── */}
      <section id="stats" className="relative w-full py-[90px] border-y border-[#8b3fff]/15 bg-white/70 backdrop-blur-xl z-10">
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.08} className={`flex flex-col items-center text-center ${i > 0 ? "md:border-l md:border-[#8b3fff]/15" : ""}`}>
                <div className="font-plus-jakarta-sans font-black text-[40px] md:text-[56px] text-gradient leading-tight">
                  <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="font-space-mono text-[11px] md:text-[12px] uppercase tracking-[0.15em] text-[#4A5568] mt-1">{s.label}</div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOGOS ────────────────────────────────────────── */}
      <section className="relative w-full py-12 bg-[#F8F9FA] overflow-hidden border-b border-[rgba(139,63,255,0.12)] marquee-container z-10">
        <div className="text-center mb-6">
          <span className="font-space-mono text-[10px] text-[#718096] tracking-[0.3em] uppercase">Trusted by industry leaders</span>
        </div>
        <div className="mb-4"><Marquee /></div>
        <div className="hidden md:block"><Marquee reverse /></div>
      </section>

      {/* ─── SERVICES ─────────────────────────────────────── */}
      <section className="relative py-[120px] bg-white z-10">
        <div className="absolute inset-0 ambient-left z-0 opacity-50" />
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px] relative z-10">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center mb-16">
              <div className="font-space-mono text-[11px] text-[#0891B2] tracking-widest uppercase mb-4 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#0891B2]/50" /> OUR SERVICES <span className="w-8 h-[1px] bg-[#0891B2]/50" />
              </div>
              <h2 className="font-plus-jakarta-sans font-extrabold text-[38px] md:text-[56px] leading-[1.08] tracking-tight mb-6">
                <span className="text-[#0D0D1F] block">Everything you need to</span>
                <span className="text-gradient block">lead with AI.</span>
              </h2>
              <p className="font-inter text-[18px] text-[#4A5568] max-w-[560px]">From strategy to implementation — nine service lines, one integrated vision.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={(i % 3) * 0.08}>
                <Link href={service.link} className="glass-card p-8 group h-full flex flex-col hover:-translate-y-1.5 hover:border-[#E040FB]/40 hover:shadow-[0_24px_60px_rgba(139,63,255,0.12)] transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8b3fff]/12 to-[#FB00DF]/8 border border-[#8b3fff]/20 flex items-center justify-center text-[#A21CAF] mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon size={28} />
                  </div>
                  <h3 className="font-plus-jakarta-sans font-bold text-[21px] text-[#0D0D1F] mb-3">{service.title}</h3>
                  <p className="font-inter text-[15px] leading-[1.7] text-[#4A5568] mb-6 flex-1">{service.desc}</p>
                  <span className="btn-link">Learn more →</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="flex justify-center mt-12">
              <Link href="/services" className="btn-ghost">View all 9 services →</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── PROCESS ──────────────────────────────────────── */}
      <section className="relative py-[120px] bg-[#F0F4F8] border-y border-[rgba(139,63,255,0.12)] z-10">
        <div className="absolute inset-0 ambient-center z-0 opacity-40" />
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px] relative z-10">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center mb-20">
              <div className="font-space-mono text-[11px] text-[#A21CAF] tracking-widest uppercase mb-4">THE PROCESS</div>
              <h2 className="font-plus-jakarta-sans font-extrabold text-[38px] md:text-[52px] leading-[1.1] tracking-tight">
                <span className="text-[#0D0D1F] block">From challenge to transformation</span>
                <span className="text-gradient block">in four steps.</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 relative gap-10 md:gap-4">
            <div className="hidden md:block absolute top-[68px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[#050DEB]/30 via-[#8B3FFF]/40 to-[#FB00DF]/30 z-0" />
            {steps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.12}>
                <div className="flex flex-col items-center text-center relative z-10 group">
                  <div className="font-space-mono font-bold text-[13px] text-[#718096] tracking-[0.2em] mb-3 group-hover:text-[#0D0D1F] transition-colors">{step.num}</div>
                  <div className="w-[80px] h-[80px] rounded-full bg-white border-[1.5px] border-[#8b3fff]/35 shadow-[0_0_24px_rgba(139,63,255,0.15)] flex items-center justify-center mb-6 group-hover:border-[#E040FB]/60 group-hover:shadow-[0_0_36px_rgba(224,64,251,0.3)] group-hover:-translate-y-1 transition-all duration-300">
                    <step.icon size={34} className="text-[#0891B2] group-hover:text-[#A21CAF] transition-colors" />
                  </div>
                  <h3 className="font-plus-jakarta-sans font-bold text-[20px] text-[#0D0D1F] mb-3">{step.title}</h3>
                  <p className="font-inter text-[14px] leading-[1.7] text-[#4A5568] max-w-[220px]">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-24 flex justify-center">
              <div className="glass-brand py-10 px-8 md:px-16 rounded-[24px] max-w-[900px] text-center">
                <p className="font-plus-jakarta-sans font-extrabold italic text-[26px] md:text-[42px] leading-tight text-gradient">
                  &ldquo;Intelligence without limits. Expertise without boundaries.&rdquo;
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── WHY US ───────────────────────────────────────── */}
      <section className="relative py-[120px] bg-white z-10">
        <div className="absolute inset-0 ambient-right z-0 opacity-50" />
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px] relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-[45%] [perspective:1200px]">
              <ScrollReveal>
                <div className="glass-card !bg-white w-full aspect-[4/3] [transform:rotateX(8deg)_rotateY(-8deg)] hover:[transform:rotateX(3deg)_rotateY(-3deg)] transition-transform duration-700 p-6 flex flex-col shadow-[0_40px_100px_rgba(13,13,31,0.12)]">
                  <div className="flex items-center gap-2 border-b border-[#8b3fff]/15 pb-4 mb-4">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="font-space-mono text-[12px] text-[#4A5568] ml-2">LuminaXpert Console</span>
                  </div>
                  <div className="flex-1 flex gap-4">
                    <div className="w-1/2 h-full rounded-xl bg-[#F8F9FA] border border-[#8b3fff]/10 relative overflow-hidden p-4">
                      <div className="absolute inset-0 flex items-end justify-between px-4 pb-4">
                        {[40, 70, 45, 90, 65, 100].map((h, i) => (
                          <div key={i} className="w-4 bg-gradient-to-t from-[#050DEB]/60 to-[#8B3FFF]/80 rounded-t-sm" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                    <div className="w-1/2 flex flex-col gap-3">
                      {[
                        ["ROI", "+340%", "text-[#059669]"],
                        ["Speed", "8× faster", "text-[#0891B2]"],
                        ["Accuracy", "99.7%", "text-[#D97706]"],
                      ].map(([k, v, c]) => (
                        <div key={k} className="glass-brand !rounded-xl p-3 flex items-center justify-between">
                          <span className={`font-space-mono text-[11px] ${c}`}>{k}:</span>
                          <span className="font-plus-jakarta-sans font-bold text-[#0D0D1F] text-[16px]">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="w-full md:w-[55%]">
              <ScrollReveal>
                <div className="font-space-mono text-[11px] text-[#A21CAF] tracking-widest uppercase mb-4">WHY US</div>
                <h2 className="font-plus-jakarta-sans font-extrabold text-[38px] md:text-[52px] leading-[1.1] tracking-tight mb-8">
                  <span className="text-[#0D0D1F] block">The LuminaXpert</span>
                  <span className="text-gradient block">difference.</span>
                </h2>
              </ScrollReveal>
              <div className="flex flex-col">
                {[
                  { icon: Shield, title: "Verified Experts", desc: "Every specialist is rigorously vetted — credentials checked, track record confirmed." },
                  { icon: Zap, title: "Rapid Deployment", desc: "From brief to first delivery in days, not months." },
                  { icon: Globe, title: "Global Reach, Local Understanding", desc: "Experts across 40+ countries who understand your market." },
                  { icon: Lock, title: "Enterprise-Grade Security", desc: "Security-first delivery, GDPR-ready processes and zero data compromise." },
                ].map((item, i) => (
                  <ScrollReveal key={item.title} delay={i * 0.08}>
                    <div className={`flex gap-5 py-5 ${i !== 3 ? "border-b border-[rgba(139,63,255,0.12)]" : ""}`}>
                      <div className="mt-1 text-[#A21CAF]"><item.icon size={24} /></div>
                      <div>
                        <h3 className="font-plus-jakarta-sans font-bold text-[18px] text-[#0D0D1F] mb-1.5">{item.title}</h3>
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

      {/* ─── ROI CALCULATOR ───────────────────────────────── */}
      <section className="relative py-[120px] bg-white overflow-hidden border-t border-[rgba(139,63,255,0.12)] z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,63,255,0.08),transparent_70%)] pointer-events-none" />
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px] relative z-10">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center mb-16">
              <div className="font-space-mono text-[11px] text-[#B7791F] tracking-widest uppercase mb-4 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#B7791F]/50" /> Interactive Tools <span className="w-8 h-[1px] bg-[#B7791F]/50" />
              </div>
              <h2 className="font-plus-jakarta-sans font-extrabold text-[38px] md:text-[52px] leading-[1.1] tracking-tight text-[#0D0D1F] mb-6">
                Calculate your <span className="text-gradient">AI return on investment</span>
              </h2>
              <p className="font-inter text-[17px] text-[#4A5568] max-w-[600px]">
                Input your process specifications to generate real-time estimates of efficiency gains, break-even timelines, and cost reductions.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <RoiCalculator />
          </ScrollReveal>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────── */}
      <section className="relative py-[120px] bg-[#F0F4F8] border-y border-[rgba(139,63,255,0.12)] overflow-hidden z-10">
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px] relative z-10">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center mb-16">
              <div className="font-space-mono text-[11px] text-[#A21CAF] tracking-widest uppercase mb-4">WHAT OUR CLIENTS SAY</div>
              <h2 className="font-plus-jakarta-sans font-extrabold text-[34px] md:text-[52px] leading-[1.1] tracking-tight text-[#0D0D1F] max-w-[900px]">
                Results that speak louder than credentials.
              </h2>
            </div>
          </ScrollReveal>
          <Testimonials />
        </div>
      </section>

      {/* ─── LATEST INSIGHTS ──────────────────────────────── */}
      <section className="relative py-[120px] bg-white z-10">
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px] relative z-10">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 gap-6">
              <div>
                <div className="font-space-mono text-[11px] text-[#0891B2] tracking-widest uppercase mb-4">LATEST INSIGHTS</div>
                <h2 className="font-plus-jakarta-sans font-extrabold text-[36px] md:text-[44px] tracking-tight text-[#0D0D1F]">Featured intelligence</h2>
              </div>
              <Link href="/blog" className="btn-link">View all insights →</Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latest.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.08}>
                <Link href={`/blog/${post.slug}`} className="glass-card !p-0 h-full flex flex-col overflow-hidden group hover:-translate-y-1.5 hover:border-[#E040FB]/40 hover:shadow-[0_24px_60px_rgba(139,63,255,0.12)] transition-all duration-500">
                  <div className="relative h-[210px] overflow-hidden">
                    <Image src={post.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-[#E040FB]/10 text-[#A21CAF] font-space-mono text-[10px] uppercase font-bold border border-[#E040FB]/20">{post.category}</span>
                      <span className="text-[#718096] font-space-mono text-[11px] uppercase">{post.readTime}</span>
                    </div>
                    <h3 className="font-plus-jakarta-sans font-bold text-[20px] leading-snug text-[#0D0D1F] group-hover:text-[#6D28D9] transition-colors mb-3">{post.title}</h3>
                    <p className="font-inter text-[#4A5568] text-[15px] line-clamp-2 mb-6">{post.excerpt}</p>
                    <span className="mt-auto flex items-center gap-2 font-plus-jakarta-sans font-semibold text-[14px] text-[#0D0D1F] group-hover:text-[#6D28D9] transition-colors">
                      Read article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PLATFORMS ────────────────────────────────────── */}
      <section className="relative py-[100px] bg-[#F8F9FA] border-t border-[rgba(139,63,255,0.12)] overflow-hidden z-10">
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px] relative z-10">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center mb-16">
              <div className="font-space-mono text-[11px] text-[#B7791F] tracking-widest uppercase mb-4">Built on the world&apos;s best AI infrastructure</div>
              <h2 className="font-plus-jakarta-sans font-extrabold text-[30px] md:text-[44px] tracking-tight text-[#0D0D1F]">Expertise across leading platforms.</h2>
            </div>
          </ScrollReveal>
          <div className="max-w-[860px] mx-auto flex flex-col gap-4">
            {[
              ["AWS", "Microsoft Azure", "Google Cloud"],
              ["OpenAI", "Anthropic", "Hugging Face", "Databricks"],
              ["Snowflake", "GDPR Ready", "ISO 27001 Practices", "EU AI Act Aligned"],
            ].map((row, r) => (
              <ScrollReveal key={r} delay={r * 0.08}>
                <div className={`grid grid-cols-2 ${row.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4"} gap-4`}>
                  {row.map((item) => (
                    <div key={item} className="bg-white/90 border border-[rgba(139,63,255,0.15)] shadow-sm hover:border-[#8B3FFF]/40 rounded-xl py-5 px-4 flex items-center justify-center text-center font-plus-jakarta-sans font-bold text-[#0D0D1F] text-[15px] hover:-translate-y-1 transition-all duration-300">
                      {item}
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="text-[11px] font-space-mono text-[#718096] text-center mt-10">
            * LuminaXpert maintains independent, vendor-neutral expertise across all platforms.
          </p>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────── */}
      <section className="relative py-[100px] overflow-hidden z-10">
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px]">
          <ScrollReveal>
            <div className="relative rounded-[32px] overflow-hidden px-8 py-16 md:px-16 md:py-20 text-center bg-[#0D0D1F]">
              <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_20%_0%,rgba(5,13,235,0.55),transparent),radial-gradient(60%_80%_at_80%_100%,rgba(251,0,223,0.45),transparent)]" />
              <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
              <div className="relative">
                <h2 className="font-plus-jakarta-sans font-black text-[36px] md:text-[56px] leading-[1.05] tracking-tight text-white mb-5">Ready to illuminate your potential?</h2>
                <p className="font-inter text-[18px] md:text-[20px] text-white/75 mb-10 max-w-[620px] mx-auto">Talk to a LuminaXpert specialist today. No commitment — just clarity on what AI can do for you.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                  <Link href="/booking" className="btn-primary">Book a Free Consultation</Link>
                  <Link href="/services" className="btn-ghost !text-white !border-white/30 hover:!bg-white/10">Explore Our Services</Link>
                </div>
                <div className="font-space-mono text-[11px] text-white/60 flex flex-wrap justify-center gap-4">
                  <span>✓ No credit card</span><span className="hidden sm:inline">·</span>
                  <span>✓ 30-min discovery call</span><span className="hidden sm:inline">·</span>
                  <span>✓ Proposal within 48h</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
