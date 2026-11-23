import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, GraduationCap, Globe, Mail } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { LinkedInIcon } from "@/components/icons";
import { FOUNDERS } from "@/lib/team";

export const metadata: Metadata = {
  title: "About Us — Our Story, Mission & Leadership",
  description: "LuminaXpert was founded to make world-class AI expertise accessible to every organization. Meet the founders and learn what drives us.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen relative">

      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] pt-[120px] flex items-center overflow-hidden bg-transparent">
        <div className="absolute inset-0 ambient-center z-0 opacity-40"></div>

        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-3 mb-6 animate-slide-up-1">
            <span className="font-space-mono text-[11px] text-[#A21CAF] tracking-[0.3em] uppercase">OUR STORY</span>
          </div>

          <div className="animate-slide-up-2">
            <h1 className="font-plus-jakarta-sans font-bold text-[36px] md:text-[64px] leading-[1.2] tracking-tight mb-8 max-w-[1000px]">
              <span className="text-[#0D0D1F] block">We believe expertise</span>
              <span className="text-gradient block">should be limitless.</span>
            </h1>
          </div>

          <div className="animate-slide-up-3">
            <p className="font-inter text-[20px] text-[#4A5568] leading-[1.8] max-w-[680px] mb-12">
              LuminaXpert was founded on the belief that the right expertise, amplified by intelligent technology, can transform any organization — regardless of size, sector, or starting point.
            </p>
          </div>

          <div className="animate-slide-up-4">
            <div className="flex flex-wrap justify-center gap-4">
              {["Founded 2020", "500+ Experts", "40+ Countries", "3,000+ Projects"].map((stat, i) => (
                <div key={i} className="glass-brand px-5 py-2 rounded-full font-space-mono text-[12px] text-[#0D0D1F] hover:bg-[#FFFFFF] hover:scale-105 transition-all duration-300 cursor-default">
                  {stat}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ORIGIN STORY */}
      <section className="relative py-[120px] bg-[#F0F4F8]/30 backdrop-blur-[2px]">
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px]">
          <ScrollReveal>
            <h2 className="font-plus-jakarta-sans font-bold text-[32px] md:text-[48px] text-[#0D0D1F] text-center mb-24">The Beginning</h2>
          </ScrollReveal>

          <div className="flex flex-col gap-32 relative">
            <div className="absolute left-[50%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#8b3fff]/0 via-[#8b3fff]/20 to-[#e040fb]/0 hidden md:block"></div>

            <div className="flex flex-col md:flex-row items-center gap-16 relative">
              <ScrollReveal className="md:w-1/2 flex justify-end md:text-right relative">
                <div className="font-plus-jakarta-sans font-bold text-[100px] md:text-[140px] absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none">2020</div>
                <div className="max-w-[520px]">
                  <p className="font-inter text-[17px] text-[#4A5568] leading-[1.85] mb-4 hover:text-[#0D0D1F] transition-colors duration-300">
                    In a world rapidly shifting towards artificial intelligence, access to top-tier expertise remained a bottleneck for most enterprises. We saw brilliant technologies fail not from poor code, but from poor integration and lack of human alignment.
                  </p>
                  <p className="font-inter text-[17px] text-[#4A5568] leading-[1.85] hover:text-[#0D0D1F] transition-colors duration-300">
                    LuminaXpert was built to bridge this gap. We assembled a core team of elite practitioners and created a framework that accelerates transformation without compromising on precision.
                  </p>
                </div>
              </ScrollReveal>
              <div className="hidden md:flex w-6 h-6 rounded-full bg-[#8b3fff] shadow-[0_0_20px_#8b3fff] border-4 border-[#F0F4F8] absolute left-1/2 -translate-x-1/2 z-10"></div>
              <ScrollReveal delay={0.2} className="md:w-1/2">
                <div className="aspect-[4/3] rounded-[24px] glass-card overflow-hidden relative group bg-[#FFFFFF] hover:shadow-[0_0_40px_rgba(139,63,255,0.3)] hover:scale-[1.02] transition-all duration-500">
                  <Image src="/images/aboutus.webp" alt="LuminaXpert origins" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3b6fff]/20 to-transparent group-hover:from-[#3b6fff]/40 transition-colors duration-500"></div>
                </div>
              </ScrollReveal>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-16 relative">
              <ScrollReveal className="md:w-1/2 flex justify-start relative">
                <div className="font-plus-jakarta-sans font-bold text-[100px] md:text-[140px] absolute left-0 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none">Today</div>
                <div className="max-w-[520px]">
                  <p className="font-inter text-[17px] text-[#4A5568] leading-[1.85] mb-4 hover:text-[#0D0D1F] transition-colors duration-300">
                    Today, we are a global network of over 500 vetted specialists, operating across 40 countries. Our proprietary methodologies combine human insight with AI acceleration to deliver solutions that scale infinitely.
                  </p>
                  <p className="font-inter text-[17px] text-[#4A5568] leading-[1.85] hover:text-[#0D0D1F] transition-colors duration-300">
                    From Fortune 500 enterprises to agile startups, we are the invisible engine behind some of the most successful digital evolutions of this decade.
                  </p>
                </div>
              </ScrollReveal>
              <div className="hidden md:flex w-6 h-6 rounded-full bg-[#e040fb] shadow-[0_0_20px_#e040fb] border-4 border-[#F0F4F8] absolute left-1/2 -translate-x-1/2 z-10"></div>
              <ScrollReveal delay={0.2} className="md:w-1/2">
                <div className="aspect-[4/3] rounded-[24px] glass-card overflow-hidden relative group bg-[#FFFFFF] flex items-center justify-center hover:shadow-[0_0_40px_rgba(224,64,251,0.3)] hover:scale-[1.02] transition-all duration-500">
                  <Image src="/images/about-hero.webp" alt="LuminaXpert today" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-tl from-[#e040fb]/20 to-transparent group-hover:from-[#e040fb]/40 transition-colors duration-500"></div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VALUES */}
      <section className="relative py-[120px] bg-transparent">
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px]">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="font-space-mono text-[11px] text-[#0891B2] tracking-widest uppercase mb-4">WHAT DRIVES US</div>
              <h2 className="font-plus-jakarta-sans font-bold text-[32px] md:text-[52px] text-[#0D0D1F]">Mission & Values</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="glass-brand w-full p-10 md:p-16 rounded-[24px] mb-20 text-center hover:bg-[rgba(224,64,251,0.1)] hover:scale-[1.01] transition-all duration-500">
              <h3 className="font-plus-jakarta-sans font-extrabold italic text-[24px] md:text-[36px] text-gradient max-w-[900px] mx-auto leading-[1.4]">
                "To democratize world-class AI expertise and empower every organization to build an intelligent, limitless future."
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "♾", title: "Infinity Mindset", desc: "Continuous growth, never static. We build solutions designed to evolve." },
              { icon: "◎", title: "Precision First", desc: "Quality over velocity, every time. Rigorous standards in all implementations." },
              { icon: "★", title: "Human + AI", desc: "Technology amplifies people. We put human intelligence at the center." },
              { icon: "◇", title: "Radical Transparency", desc: "Clear, honest, accountable. No black boxes in our code or communication." },
              { icon: "⚡", title: "Bold Innovation", desc: "Challenge the status quo. We look beyond conventional boundaries." },
              { icon: "🌍", title: "Global Impact", desc: "Worldwide standards applied with local, contextual understanding." }
            ].map((val, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card p-8 group hover:bg-[#FFFFFF]/80 hover:border-[#00D9FF] hover:scale-105 hover:shadow-[0_0_30px_rgba(0,217,255,0.2)] transition-all duration-300">
                  <div className="text-[28px] text-[#0891B2] mb-4 drop-shadow-[0_0_10px_rgba(0,217,255,0.4)] group-hover:scale-125 group-hover:text-[#0D0D1F] transition-all duration-300">{val.icon}</div>
                  <h4 className="font-plus-jakarta-sans font-bold text-[20px] text-[#0D0D1F] mb-2 group-hover:text-[#0891B2] transition-colors">{val.title}</h4>
                  <p className="font-inter text-[15px] text-[#4A5568] leading-[1.6] group-hover:text-[#0D0D1F] transition-colors">{val.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="relative py-[120px] bg-[#F0F4F8]/60 backdrop-blur-[2px]">
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px]">
          <ScrollReveal>
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="font-space-mono text-[11px] text-[#A21CAF] tracking-widest uppercase mb-4">THE FOUNDERS</div>
                <h2 className="font-plus-jakarta-sans font-bold text-[32px] md:text-[52px] text-[#0D0D1F] leading-[1.2]">The minds behind LuminaXpert</h2>
              </div>
              <Link href="/team" className="btn-ghost self-start md:self-auto">Meet the full team <ArrowRight size={16} className="ml-2" /></Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FOUNDERS.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.1}>
                <div className="glass-card !bg-white/90 p-8 h-full flex flex-col sm:flex-row items-center sm:items-start gap-8 group hover:border-[#E040FB]/50 hover:shadow-[0_24px_60px_rgba(224,64,251,0.15)] transition-all duration-300">
                  <div className="w-[150px] h-[150px] shrink-0 rounded-full p-[3px] bg-gradient-to-tr from-[#3b6fff] via-[#e040fb] to-[#ff2ec4] shadow-[0_0_30px_rgba(139,63,255,0.2)]">
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-[#F0F4F8]">
                      <Image src={member.image} alt={member.name} fill sizes="150px" className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-plus-jakarta-sans font-bold text-[24px] text-[#0D0D1F]">{member.name}</h3>
                    <div className="font-space-mono text-[12px] text-[#0891B2] uppercase tracking-wider my-2">{member.role}</div>
                    <p className="font-inter text-[15px] text-[#4A5568] leading-[1.7] mb-5">{member.bio}</p>
                    <div className="flex justify-center sm:justify-start gap-3">
                      {member.links.linkedin && (
                        <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`} className="w-10 h-10 rounded-full border border-[rgba(139,63,255,0.2)] bg-white flex items-center justify-center text-[#4A5568] hover:text-[#0A66C2] hover:border-[#0A66C2]/40 transition-all">
                          <LinkedInIcon size={16} />
                        </a>
                      )}
                      {member.links.portfolio && (
                        <a href={member.links.portfolio} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} portfolio`} className="w-10 h-10 rounded-full border border-[rgba(139,63,255,0.2)] bg-white flex items-center justify-center text-[#4A5568] hover:text-[#8B3FFF] hover:border-[#8B3FFF]/40 transition-all">
                          <Globe size={17} />
                        </a>
                      )}
                      {member.links.scholar && (
                        <a href={member.links.scholar} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on Google Scholar`} className="w-10 h-10 rounded-full border border-[rgba(139,63,255,0.2)] bg-white flex items-center justify-center text-[#4A5568] hover:text-[#4285F4] hover:border-[#4285F4]/40 transition-all">
                          <GraduationCap size={17} />
                        </a>
                      )}
                      {member.links.email && (
                        <a href={`mailto:${member.links.email}`} aria-label={`Email ${member.name}`} className="w-10 h-10 rounded-full border border-[rgba(139,63,255,0.2)] bg-white flex items-center justify-center text-[#4A5568] hover:text-[#E040FB] hover:border-[#E040FB]/40 transition-all">
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

      {/* CTA */}
      <section className="py-[100px]">
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px]">
          <ScrollReveal>
            <div className="glass-brand p-10 md:p-16 text-center">
              <h2 className="font-plus-jakarta-sans font-bold text-[28px] md:text-[40px] text-[#0D0D1F] mb-4">Let&apos;s build what&apos;s next — together.</h2>
              <p className="font-inter text-[17px] text-[#4A5568] mb-8 max-w-[560px] mx-auto">Whether you&apos;re exploring your first use case or scaling AI across the enterprise, we&apos;d love to hear from you.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/booking" className="btn-primary">Book a consultation</Link>
                <Link href="/careers" className="btn-ghost">Join our team</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
