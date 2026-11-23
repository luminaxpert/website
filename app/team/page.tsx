import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Globe, Users, Award, GraduationCap, Mail } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import WorldMap, { type Hub } from "@/components/WorldMap";
import { LinkedInIcon } from "@/components/icons";
import { FOUNDERS, PRACTICE_LEADS } from "@/lib/team";

export const metadata: Metadata = {
  title: "Our Team — Founders, Practice Leads & Global Network",
  description: "Meet the LuminaXpert founders and practice leads, and our global network of 500+ vetted AI specialists.",
  alternates: { canonical: "/team" },
};

const networkHubs: Hub[] = [
  { name: "Toronto", lat: 43.65, lon: -79.38, label: "left" },
  { name: "New York", lat: 40.71, lon: -74.0, label: "down" },
  { name: "London", lat: 51.5, lon: -0.12, label: "left", primary: true },
  { name: "Berlin", lat: 52.52, lon: 13.4, label: "up" },
  { name: "Dubai", lat: 25.2, lon: 55.27, label: "down" },
  { name: "Karachi", lat: 24.86, lon: 67.0, label: "up", primary: true },
  { name: "Singapore", lat: 1.35, lon: 103.82, label: "down" },
  { name: "Tokyo", lat: 35.68, lon: 139.69, label: "up" },
  { name: "Sydney", lat: -33.87, lon: 151.21, label: "down" },
];

const routes: [number, number][] = [
  [1, 2], [0, 2], [2, 3], [2, 4], [3, 5], [4, 5], [5, 6], [6, 7], [6, 8], [1, 4], [5, 7],
];

export default function TeamPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-[50vh] pt-[160px] pb-[60px] flex items-center overflow-hidden">
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px] relative z-10 text-center flex flex-col items-center">
          <div className="font-space-mono text-[11px] text-[#B7791F] tracking-widest uppercase mb-4 flex items-center gap-3 animate-slide-up-1">
            <Users size={16} /> OUR LEADERSHIP
          </div>
          <h1 className="font-plus-jakarta-sans font-bold text-[44px] md:text-[72px] leading-[1.08] text-[#0D0D1F] tracking-tight mb-8 animate-slide-up-2">
            The minds behind <span className="text-gradient">the mission.</span>
          </h1>
          <p className="font-inter text-[19px] text-[#4A5568] max-w-[680px] animate-slide-up-3">
            Every LuminaXpert specialist is vetted for technical mastery, regulatory understanding, and real-world deployment experience across 40+ countries.
          </p>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="relative py-12 z-10">
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px]">
          <ScrollReveal>
            <div className="font-space-mono text-[11px] text-[#A21CAF] tracking-widest uppercase mb-6">Founders</div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FOUNDERS.map((m, i) => (
              <ScrollReveal key={m.name} delay={i * 0.1}>
                <div className="glass-card !bg-white/90 p-8 md:p-10 rounded-[28px] h-full hover:border-[#8B3FFF]/40 hover:shadow-[0_30px_80px_rgba(139,63,255,0.14)] hover:-translate-y-1 transition-all duration-500 flex flex-col sm:flex-row items-center sm:items-start gap-8 group">
                  <div className="w-32 h-32 shrink-0 rounded-full p-[3px] bg-gradient-to-tr from-[#3b6fff] via-[#e040fb] to-[#ff2ec4]">
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-[#F0F4F8]">
                      <Image src={m.image} alt={m.name} fill sizes="128px" className="object-cover object-top" />
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="font-plus-jakarta-sans font-bold text-[24px] text-[#0D0D1F] group-hover:text-[#6D28D9] transition-colors">{m.name}</h2>
                    <span className="font-space-mono text-[12px] text-[#0891B2] uppercase tracking-wider block mt-1 mb-3">{m.role}</span>
                    <p className="font-inter text-[15px] text-[#4A5568] leading-relaxed mb-5">{m.bio}</p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-5">
                      {m.tags?.map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-[#F0F4F8] border border-[rgba(139,63,255,0.15)] text-[#4A5568] font-inter text-[12px]">{tag}</span>
                      ))}
                    </div>
                    <div className="flex justify-center sm:justify-start gap-3">
                      {m.links.linkedin && (
                        <a href={m.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`} className="w-10 h-10 rounded-xl bg-white border border-[rgba(139,63,255,0.2)] hover:border-[#0A66C2]/50 flex items-center justify-center text-[#4A5568] hover:text-[#0A66C2] transition-all">
                          <LinkedInIcon size={16} />
                        </a>
                      )}
                      {m.links.portfolio && (
                        <a href={m.links.portfolio} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} portfolio`} className="w-10 h-10 rounded-xl bg-white border border-[rgba(139,63,255,0.2)] hover:border-[#8B3FFF]/50 flex items-center justify-center text-[#4A5568] hover:text-[#8B3FFF] transition-all">
                          <Globe size={17} />
                        </a>
                      )}
                      {m.links.scholar && (
                        <a href={m.links.scholar} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on Google Scholar`} className="w-10 h-10 rounded-xl bg-white border border-[rgba(139,63,255,0.2)] hover:border-[#4285F4]/50 flex items-center justify-center text-[#4A5568] hover:text-[#4285F4] transition-all">
                          <GraduationCap size={17} />
                        </a>
                      )}
                      {m.links.email && (
                        <a href={`mailto:${m.links.email}`} aria-label={`Email ${m.name}`} className="w-10 h-10 rounded-xl bg-white border border-[rgba(139,63,255,0.2)] hover:border-[#E040FB]/50 flex items-center justify-center text-[#4A5568] hover:text-[#E040FB] transition-all">
                          <Mail size={17} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRACTICE LEADS */}
      <section className="relative py-16 z-10">
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px]">
          <ScrollReveal>
            <div className="font-space-mono text-[11px] text-[#A21CAF] tracking-widest uppercase mb-6">Practice leads</div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRACTICE_LEADS.map((l, i) => (
              <ScrollReveal key={l.name} delay={i * 0.08}>
                <div className="glass-card !bg-white/90 p-7 h-full flex flex-col items-center text-center hover:-translate-y-1 hover:border-[#8B3FFF]/40 hover:shadow-[0_24px_60px_rgba(139,63,255,0.12)] transition-all duration-300">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${l.gradient} flex items-center justify-center font-plus-jakarta-sans font-black text-[26px] text-white mb-5 shadow-lg`}>
                    {l.initials}
                  </div>
                  <h3 className="font-plus-jakarta-sans font-bold text-[18px] text-[#0D0D1F]">{l.name}</h3>
                  <span className="font-space-mono text-[11px] text-[#0891B2] uppercase tracking-wider block mt-1 mb-3">{l.title}</span>
                  <p className="font-inter text-[14px] text-[#4A5568] leading-relaxed mb-5">{l.bio}</p>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-auto">
                    {l.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-full bg-[#F0F4F8] border border-[rgba(139,63,255,0.12)] text-[#4A5568] font-inter text-[11px]">{tag}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL NETWORK */}
      <section className="relative py-24 overflow-hidden z-10">
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px]">
          <ScrollReveal>
            <div className="text-center mb-16 max-w-[700px] mx-auto">
              <div className="font-space-mono text-[11px] text-[#0891B2] tracking-widest uppercase mb-4 flex items-center justify-center gap-3">
                <Globe size={16} /> GLOBAL SPECIALIST NETWORK
              </div>
              <h2 className="font-plus-jakarta-sans font-bold text-[36px] md:text-[44px] text-[#0D0D1F] mb-6">500+ specialists, 120 countries.</h2>
              <p className="font-inter text-[#4A5568] text-[17px] leading-relaxed">
                Beyond our core leadership, LuminaXpert operates an on-demand network of verified AI implementation experts, researchers and compliance auditors.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-card !bg-white/85 p-4 md:p-10 rounded-[32px] overflow-hidden shadow-[0_30px_80px_rgba(13,13,31,0.08)] relative">
              <WorldMap hubs={networkHubs} routes={routes} id="team-map" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* JOIN */}
      <section className="py-[100px] relative z-10">
        <div className="mx-auto px-5">
          <ScrollReveal>
            <div className="glass-brand w-full max-w-[900px] mx-auto rounded-[32px] p-12 md:p-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white border border-[rgba(139,63,255,0.2)] flex items-center justify-center text-[#B7791F] mx-auto mb-6">
                <Award size={32} />
              </div>
              <h2 className="font-plus-jakarta-sans font-extrabold text-[32px] md:text-[44px] text-[#0D0D1F] mb-6 leading-tight">Are you an AI expert?</h2>
              <p className="font-inter text-[18px] text-[#4A5568] mb-10 max-w-[520px] mx-auto">
                Join the LuminaXpert network and collaborate on cutting-edge production AI deployments with leading global brands.
              </p>
              <Link href="/careers" className="btn-primary px-8">Apply as a specialist</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
