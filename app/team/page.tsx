"use client";

import Link from "next/link";
import { Globe, Mail, Users, MapPin, Award } from "lucide-react";

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a-1.998 1.998 0 1 1 0-3.996 1.998 1.998 0 0 1 0 3.996zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
import LuminaBackground from "@/components/LuminaBackground";
import ScrollReveal from "@/components/ScrollReveal";

const leaders = [
  {
    name: "Dr. Sarah Chen",
    title: "Chief AI Officer",
    bio: "Former Google Brain researcher, 15 years building production AI systems at scale. Published author in neural architecture search.",
    initials: "SC",
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    tags: ["LLM Architecture", "Neural Networks", "NLP & CV"],
    linkedin: "https://linkedin.com"
  },
  {
    name: "Marcus Reid",
    title: "Head of Strategy",
    bio: "Ex-McKinsey partner. Designed AI roadmaps and operational frameworks for over 30 Fortune 500 companies.",
    initials: "MR",
    gradient: "from-purple-500 via-pink-500 to-red-500",
    tags: ["Fortune 100 Consulting", "ROI Modeling", "AI Strategy"],
    linkedin: "https://linkedin.com"
  },
  {
    name: "Aisha Patel",
    title: "VP of Engineering",
    bio: "Led machine learning infrastructure teams at Stripe and Databricks. Over 200 model deployments under management.",
    initials: "AP",
    gradient: "from-teal-500 via-cyan-500 to-blue-500",
    tags: ["MLOps Infrastructure", "Data Pipelines", "Model Governance"],
    linkedin: "https://linkedin.com"
  },
  {
    name: "Thomas Vogel",
    title: "Head of Data Science",
    bio: "PhD in Statistical Learning from ETH Zürich. 10 years experience in quantitative finance and risk engineering AI.",
    initials: "TV",
    gradient: "from-amber-500 via-orange-500 to-yellow-500",
    tags: ["Statistical Learning", "Anomaly Detection", "Risk Analysis"],
    linkedin: "https://linkedin.com"
  }
];

const networkHubs = [
  { name: "New York", x: 260, y: 170 },
  { name: "Toronto", x: 240, y: 155 },
  { name: "London", x: 470, y: 130 },
  { name: "Berlin", x: 510, y: 135 },
  { name: "Dubai", x: 620, y: 220 },
  { name: "Singapore", x: 770, y: 310 },
  { name: "Sydney", x: 880, y: 410 }
];

export default function TeamPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      {/* Background Geometries */}
      <LuminaBackground />

      {/* HERO */}
      <section className="relative min-h-[50vh] pt-[160px] pb-[80px] flex items-center bg-transparent overflow-hidden">
        <div className="absolute inset-0 ambient-left z-0 opacity-40"></div>
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10 text-center flex flex-col items-center">
          <ScrollReveal>
            <div className="font-space-mono text-[11px] text-[#F5C842] tracking-widest uppercase mb-4 flex items-center gap-3">
              <Users size={16} /> OUR LEADERSHIP
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-plus-jakarta-sans font-bold text-[48px] md:text-[72px] leading-[1.1] text-white tracking-tight mb-8">
              The Minds Behind <span className="text-gradient">the Mission.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-inter text-[19px] text-gray-300 max-w-[680px] mb-12">
              Every LuminaXpert specialist is rigorously vetted for technical mastery, regulatory understanding, and real-world deployment experience across 40+ countries.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* LEADERSHIP GRID */}
      <section className="relative py-16 bg-transparent z-10">
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leaders.map((leader, i) => (
              <ScrollReveal key={leader.name} delay={i * 0.1}>
                <div className="glass-card !bg-[#050914]/80 !border-white/[0.08] p-8 md:p-10 rounded-[28px] hover:border-[#F5C842]/40 hover:shadow-[0_0_40px_rgba(245,200,66,0.12)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col sm:flex-row items-center sm:items-start gap-8 group">

                  {/* Photo Placeholder */}
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${leader.gradient} flex items-center justify-center font-plus-jakarta-sans font-black text-[32px] text-white shrink-0 shadow-lg shadow-black/40 group-hover:scale-105 transition-transform duration-300`}>
                    {leader.initials}
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-plus-jakarta-sans font-bold text-[24px] text-white group-hover:text-[#F5C842] transition-colors">
                          {leader.name}
                        </h3>
                        <span className="font-space-mono text-[12px] text-gray-400 uppercase tracking-wider block mt-0.5">
                          {leader.title}
                        </span>
                      </div>

                      <Link
                        href={leader.linkedin}
                        target="_blank"
                        className="self-center sm:self-start w-8 h-8 rounded-lg bg-white/5 hover:bg-[#0077b5]/15 border border-white/10 hover:border-[#0077b5]/50 flex items-center justify-center text-gray-400 hover:text-[#0077b5] transition-all"
                      >
                        <LinkedInIcon size={16} />
                      </Link>
                    </div>

                    <p className="font-inter text-[14px] text-gray-300 leading-relaxed mb-6">
                      {leader.bio}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                      {leader.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 font-inter text-[12px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* WORLD MAP SECTION */}
      <section className="relative py-24 bg-transparent overflow-hidden z-10">
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px]">

          <ScrollReveal>
            <div className="text-center mb-16 max-w-[700px] mx-auto">
              <div className="font-space-mono text-[11px] text-[#00D9FF] tracking-widest uppercase mb-4 flex items-center justify-center gap-3">
                <Globe size={16} /> GLOBAL SPECIALIST NETWORK
              </div>
              <h2 className="font-plus-jakarta-sans font-bold text-[36px] text-white mb-6">
                500+ Specialists, 120 Countries.
              </h2>
              <p className="font-inter text-gray-300 text-[17px] leading-relaxed">
                Beyond our core leadership team, LuminaXpert operates a global, on-demand network of verified AI implementation experts, researchers, and compliance auditors.
              </p>
            </div>
          </ScrollReveal>

          {/* Map Representation */}
          <ScrollReveal delay={0.2}>
            <div className="glass-card !bg-[#050914]/65 !border-white/[0.08] p-4 md:p-8 rounded-[32px] overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,111,255,0.04),transparent_60%)] pointer-events-none"></div>

              {/* Stylized Network Connection Map SVG */}
              <svg viewBox="0 0 1000 500" className="w-full h-auto text-gray-800 select-none">
                {/* Stylized dotted grid representing continents */}
                <defs>
                  <pattern id="grid" width="16" height="16" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="rgba(255, 255, 255, 0.05)" />
                  </pattern>
                </defs>
                <rect width="1000" height="500" fill="url(#grid)" />

                {/* Styled connection lines between nodes */}
                <path
                  d="M260,170 Q365,150 470,130 Q490,132 510,135 Q565,177 620,220 Q695,265 770,310 Q825,360 880,410 M240,155 Q355,142 470,130 M620,220 Q750,360 880,410 M260,170 Q440,240 620,220 Q695,177 510,135"
                  fill="none"
                  stroke="rgba(139, 63, 255, 0.15)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Glowing dots at hubs */}
                {networkHubs.map((hub) => (
                  <g key={hub.name} className="group cursor-pointer">
                    {/* Ripple outer circle */}
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r="12"
                      fill="rgba(0, 217, 255, 0.15)"
                      className="animate-ping"
                      style={{ animationDuration: '3s' }}
                    />
                    {/* Inner glow circle */}
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r="6"
                      fill="#00D9FF"
                      className="drop-shadow-[0_0_8px_#00D9FF]"
                    />
                    {/* Tiny center core */}
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r="2"
                      fill="#FFFFFF"
                    />
                    {/* Hub Labels */}
                    <text
                      x={hub.x}
                      y={hub.y - 14}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="10"
                      fontFamily="Space Mono"
                      className="font-bold tracking-wider opacity-60 group-hover:opacity-100 transition-opacity bg-black"
                    >
                      {hub.name.toUpperCase()}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* JOIN NETWORK CTA */}
      <section className="py-[120px] bg-transparent relative z-10">
        <div className="container mx-auto px-5 relative">
          <ScrollReveal>
            <div className="glass-card !bg-[#0A0F1E] !border-white/[0.08] w-full max-w-[900px] mx-auto rounded-[32px] p-12 md:p-16 text-center hover:shadow-[0_0_50px_rgba(139,63,255,0.2)] hover:scale-[1.01] transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#3b6fff]/5 to-[#e040fb]/5 pointer-events-none"></div>

              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F5C842] mx-auto mb-6">
                <Award size={32} />
              </div>

              <h3 className="font-plus-jakarta-sans font-extrabold text-[32px] md:text-[44px] text-white mb-6 leading-tight">
                Are you an AI expert?
              </h3>
              <p className="font-inter text-[18px] text-gray-300 mb-10 max-w-[500px] mx-auto">
                Join the LuminaXpert Network and collaborate on cutting-edge production AI deployments with leading global brands.
              </p>

              <Link href="/get-started" className="btn-primary px-8 py-4 text-[15px] uppercase tracking-wider font-bold">
                Apply as Specialist
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
