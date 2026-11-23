import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, Globe2, GraduationCap, HeartHandshake, MapPin, Rocket, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers — Join the LuminaXpert Specialist Network",
  description: "Build production AI with leading organizations. Explore open roles and join LuminaXpert's global network of AI specialists.",
  alternates: { canonical: "/careers" },
};

const perks = [
  { icon: Rocket, title: "Real production impact", desc: "Ship AI that runs in regulated, high-stakes environments — not slideware." },
  { icon: Globe2, title: "Remote-first, global", desc: "Work from anywhere with collaborators across 40+ countries." },
  { icon: GraduationCap, title: "Continuous learning", desc: "Dedicated learning budget, research time and certification support." },
  { icon: HeartHandshake, title: "Senior, kind teams", desc: "Small squads of experienced practitioners who mentor generously." },
];

const roles = [
  { title: "Senior Machine Learning Engineer", team: "AI Development", type: "Full-time", location: "Remote" },
  { title: "MLOps / Platform Engineer", team: "MLOps & Governance", type: "Full-time", location: "Remote" },
  { title: "AI Strategy Consultant", team: "Consulting", type: "Full-time", location: "Hybrid · London / New York" },
  { title: "Responsible AI & Compliance Specialist", team: "Responsible AI", type: "Contract", location: "Remote (EU time zones)" },
  { title: "Specialist Network — Independent Expert", team: "All practices", type: "Freelance", location: "Anywhere" },
];

function applyHref(role: string) {
  const subject = encodeURIComponent(`Application: ${role}`);
  const body = encodeURIComponent(`Hi LuminaXpert team,\n\nI'd like to apply for the ${role} role.\n\nLinkedIn / portfolio:\nCV: (attached)\n\nA little about me:\n`);
  return `mailto:${SITE.email}?subject=${subject}&body=${body}`;
}

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <section className="relative pt-[160px] pb-[80px]">
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px] text-center flex flex-col items-center">
          <div className="font-space-mono text-[11px] text-[#A21CAF] tracking-[0.3em] uppercase mb-5 flex items-center gap-2 animate-slide-up-1">
            <Sparkles size={14} /> Careers
          </div>
          <h1 className="font-plus-jakarta-sans font-bold text-[44px] md:text-[72px] leading-[1.05] tracking-tight text-[#0D0D1F] mb-6 animate-slide-up-2">
            Do the best work <span className="text-gradient">of your career.</span>
          </h1>
          <p className="font-inter text-[19px] text-[#4A5568] max-w-[640px] mb-10 animate-slide-up-3">
            We&apos;re a team of engineers, researchers and strategists helping organisations put AI into production — responsibly.
          </p>
          <a href="#open-roles" className="btn-primary animate-slide-up-4">View open roles</a>
        </div>
      </section>

      <section className="py-[60px]">
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.08}>
              <div className="glass-card p-7 h-full">
                <div className="w-12 h-12 rounded-xl bg-[#8B3FFF]/10 flex items-center justify-center text-[#6D28D9] mb-5"><p.icon size={22} /></div>
                <h2 className="font-plus-jakarta-sans font-bold text-[18px] text-[#0D0D1F] mb-2">{p.title}</h2>
                <p className="font-inter text-[15px] text-[#4A5568] leading-relaxed">{p.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section id="open-roles" className="py-[80px]">
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1000px]">
          <ScrollReveal>
            <h2 className="font-plus-jakarta-sans font-bold text-[32px] md:text-[44px] text-[#0D0D1F] mb-10">Open roles</h2>
          </ScrollReveal>
          <div className="flex flex-col gap-4">
            {roles.map((r, i) => (
              <ScrollReveal key={r.title} delay={i * 0.05}>
                <a
                  href={applyHref(r.title)}
                  className="glass-card !bg-white/90 p-6 md:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-[#8B3FFF]/40 hover:shadow-[0_20px_50px_rgba(139,63,255,0.12)] transition-all duration-300"
                >
                  <div>
                    <h3 className="font-plus-jakarta-sans font-bold text-[19px] text-[#0D0D1F] group-hover:text-[#6D28D9] transition-colors">{r.title}</h3>
                    <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 font-inter text-[14px] text-[#718096]">
                      <span className="flex items-center gap-1.5"><Briefcase size={14} /> {r.team} · {r.type}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={14} /> {r.location}</span>
                    </div>
                  </div>
                  <span className="flex items-center gap-2 font-plus-jakarta-sans font-semibold text-[14px] text-[#0D0D1F] group-hover:text-[#6D28D9]">
                    Apply <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <p className="font-inter text-[15px] text-[#4A5568] mt-10 text-center">
              Don&apos;t see your role? Send your CV to{" "}
              <a href={applyHref("Open application")} className="text-[#6D28D9] underline underline-offset-4">{SITE.email}</a>{" "}
              or <Link href="/contact" className="text-[#6D28D9] underline underline-offset-4">get in touch</Link>.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
