import NeuralNetwork from "@/components/NeuralNetwork";
import { Share2, ExternalLink, GraduationCap, Globe } from "lucide-react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen relative">

      <div className="fixed inset-0 z-0 pointer-events-none">
        <NeuralNetwork />
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] pt-[120px] flex items-center overflow-hidden bg-transparent">
        <div className="absolute inset-0 ambient-center z-0 opacity-40"></div>

        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10 text-center flex flex-col items-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="font-space-mono text-[11px] text-[#E040FB] tracking-[0.3em] uppercase">OUR STORY</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-syncopate font-bold text-[36px] md:text-[64px] leading-[1.2] tracking-tight mb-8 max-w-[1000px]">
              <span className="text-white block">We believe expertise</span>
              <span className="text-gradient block">should be limitless.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-outfit text-[20px] text-[#9494c0] leading-[1.8] max-w-[680px] mb-12">
              LuminaXpert was founded on the belief that the right expertise, amplified by intelligent technology, can transform any organization — regardless of size, sector, or starting point.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4">
              {["Founded 2020", "500+ Experts", "40+ Countries", "3,000+ Projects"].map((stat, i) => (
                <div key={i} className="glass-brand px-5 py-2 rounded-full font-space-mono text-[12px] text-white hover:bg-[var(--color-bg-elevated)] hover:scale-105 transition-all duration-300 cursor-default">
                  {stat}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ORIGIN STORY */}
      <section className="relative py-[120px] bg-[var(--color-bg-surface)]/30 backdrop-blur-[2px]">
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px]">
          <ScrollReveal>
            <h2 className="font-syncopate font-bold text-[32px] md:text-[48px] text-white text-center mb-24">The Beginning</h2>
          </ScrollReveal>

          <div className="flex flex-col gap-32 relative">
            <div className="absolute left-[50%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#8b3fff]/0 via-[#8b3fff]/20 to-[#e040fb]/0 hidden md:block"></div>

            <div className="flex flex-col md:flex-row items-center gap-16 relative">
              <ScrollReveal className="md:w-1/2 flex justify-end md:text-right relative">
                <div className="font-syncopate font-bold text-[100px] md:text-[140px] absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none">2020</div>
                <div className="max-w-[520px]">
                  <p className="font-outfit text-[17px] text-[#9494c0] leading-[1.85] mb-4 hover:text-white transition-colors duration-300">
                    In a world rapidly shifting towards artificial intelligence, access to top-tier expertise remained a bottleneck for most enterprises. We saw brilliant technologies fail not from poor code, but from poor integration and lack of human alignment.
                  </p>
                  <p className="font-outfit text-[17px] text-[#9494c0] leading-[1.85] hover:text-white transition-colors duration-300">
                    LuminaXpert was built to bridge this gap. We assembled a core team of elite practitioners and created a framework that accelerates transformation without compromising on precision.
                  </p>
                </div>
              </ScrollReveal>
              <div className="hidden md:flex w-6 h-6 rounded-full bg-[#8b3fff] shadow-[0_0_20px_#8b3fff] border-4 border-[var(--color-bg-surface)] absolute left-1/2 -translate-x-1/2 z-10"></div>
              <ScrollReveal delay={0.2} className="md:w-1/2">
                <div className="aspect-[4/3] rounded-[24px] glass-card overflow-hidden relative group bg-[#0d0d1f] hover:shadow-[0_0_40px_rgba(139,63,255,0.3)] hover:scale-[1.02] transition-all duration-500">
                  <img src="/images/aboutus.png" alt="LuminaXpert Origins" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3b6fff]/20 to-transparent group-hover:from-[#3b6fff]/40 transition-colors duration-500"></div>
                </div>
              </ScrollReveal>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-16 relative">
              <ScrollReveal className="md:w-1/2 flex justify-start relative">
                <div className="font-syncopate font-bold text-[100px] md:text-[140px] absolute left-0 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none">Today</div>
                <div className="max-w-[520px]">
                  <p className="font-outfit text-[17px] text-[#9494c0] leading-[1.85] mb-4 hover:text-white transition-colors duration-300">
                    Today, we are a global network of over 500 vetted specialists, operating across 40 countries. Our proprietary methodologies combine human insight with AI acceleration to deliver solutions that scale infinitely.
                  </p>
                  <p className="font-outfit text-[17px] text-[#9494c0] leading-[1.85] hover:text-white transition-colors duration-300">
                    From Fortune 500 enterprises to agile startups, we are the invisible engine behind some of the most successful digital evolutions of this decade.
                  </p>
                </div>
              </ScrollReveal>
              <div className="hidden md:flex w-6 h-6 rounded-full bg-[#e040fb] shadow-[0_0_20px_#e040fb] border-4 border-[var(--color-bg-surface)] absolute left-1/2 -translate-x-1/2 z-10"></div>
              <ScrollReveal delay={0.2} className="md:w-1/2">
                <div className="aspect-[4/3] rounded-[24px] glass-card overflow-hidden relative group bg-[#0d0d1f] flex items-center justify-center hover:shadow-[0_0_40px_rgba(224,64,251,0.3)] hover:scale-[1.02] transition-all duration-500">
                  <img src="/images/about-hero.png" alt="LuminaXpert Today" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
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
              <div className="font-space-mono text-[11px] text-[#00D9FF] tracking-widest uppercase mb-4">WHAT DRIVES US</div>
              <h2 className="font-syncopate font-bold text-[32px] md:text-[52px] text-white">Mission & Values</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="glass-brand w-full p-10 md:p-16 rounded-[24px] mb-20 text-center hover:bg-[rgba(224,64,251,0.1)] hover:scale-[1.01] transition-all duration-500">
              <h3 className="font-syne font-extrabold italic text-[24px] md:text-[36px] text-gradient max-w-[900px] mx-auto leading-[1.4]">
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
                <div className="glass-card p-8 group hover:bg-[var(--color-bg-elevated)]/80 hover:border-[#00D9FF] hover:scale-105 hover:shadow-[0_0_30px_rgba(0,217,255,0.2)] transition-all duration-300">
                  <div className="text-[28px] text-[#00D9FF] mb-4 drop-shadow-[0_0_10px_rgba(0,217,255,0.4)] group-hover:scale-125 group-hover:text-white transition-all duration-300">{val.icon}</div>
                  <h4 className="font-plus-jakarta-sans font-bold text-[20px] text-white mb-2 group-hover:text-[#00D9FF] transition-colors">{val.title}</h4>
                  <p className="font-outfit text-[15px] text-[#9494c0] leading-[1.6] group-hover:text-white transition-colors">{val.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP TEAM */}
      <section className="relative py-[120px] bg-[var(--color-bg-surface)]/30 backdrop-blur-[2px]">
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px]">
          <ScrollReveal>
            <div className="mb-16">
              <div className="font-space-mono text-[11px] text-[#E040FB] tracking-widest uppercase mb-4">THE TEAM</div>
              <h2 className="font-syncopate font-bold text-[32px] md:text-[52px] text-white leading-[1.2]">The minds behind LuminaXpert</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Sibtain Syed",
                role: "CEO & Co-founder",
                desc: "Former Enterprise Architect and visionary behind LuminaXpert's global expansion. Expert in AI strategy and human-machine alignment.",
                img: "/images/team/sibtain.jpg",
                links: [
                  { icon: <ExternalLink size={18} />, url: "https://www.linkedin.com/in/sibtain-syed/" },
                  { icon: <GraduationCap size={18} />, url: "https://scholar.google.com/citations?user=H5y_i_sAAAAJ&hl=en" },
                  { icon: <Globe size={18} />, url: "https://sibtainsyed.netlify.app/#about" }
                ]
              },
              {
                name: "Faizan Ahmed",
                role: "CTO & Co-founder",
                desc: "Deep learning specialist and architect of our proprietary AI orchestration engine. Pioneering autonomous agentic workflows.",
                img: "/images/team/faizan.jpg",
                links: []
              },
              { name: "Sarah Jenkins", role: "Head of Strategy", desc: "Digital transformation expert with 15+ years experience.", img: null, links: [] },
              { name: "Marcus Thorne", role: "VP of Global Delivery", desc: "Ensuring precision and quality across all 40+ countries.", img: null, links: [] }
            ].map((member, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card p-6 flex flex-col items-center text-center group hover:bg-[#1a1a3a]/80 hover:border-[#E040FB] hover:scale-105 hover:shadow-[0_0_30px_rgba(224,64,251,0.2)] transition-all duration-300">
                  <div className="w-[140px] h-[140px] rounded-full p-[3px] bg-gradient-to-tr from-[#3b6fff] via-[#e040fb] to-[#ff2ec4] mb-6 transition-transform duration-700 shadow-[0_0_20px_rgba(139,63,255,0.2)]">
                    <div className="w-full h-full rounded-full bg-[#12122a] flex items-center justify-center group-hover:bg-[#0d0d1f] transition-colors duration-300 overflow-hidden">
                      {member.img ? (
                        <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <span className="text-[#E040FB] font-syncopate font-bold text-3xl group-hover:scale-110 transition-transform duration-300">{member.name.charAt(0)}</span>
                      )}
                    </div>
                  </div>
                  <h4 className="font-plus-jakarta-sans font-bold text-[20px] text-white group-hover:text-[#E040FB] transition-colors">{member.name}</h4>
                  <div className="font-space-mono text-[12px] text-[#00D9FF] uppercase tracking-wider my-2">{member.role}</div>
                  <p className="font-outfit text-[14px] text-[#9494c0] mb-4 group-hover:text-white transition-colors min-h-[60px]">{member.desc}</p>
                  <div className="flex gap-4 mt-auto">
                    {member.links && member.links.length > 0 ? (
                      member.links.map((link, j) => (
                        <a key={j} href={link.url} target="_blank" rel="noopener noreferrer" className="text-[#9494c0] hover:text-[#E040FB] hover:scale-125 transition-all duration-300">
                          {link.icon}
                        </a>
                      ))
                    ) : (
                      <div className="text-[#9494c0] hover:text-[#E040FB] hover:scale-125 cursor-pointer transition-all">
                        <Share2 size={18} />
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
