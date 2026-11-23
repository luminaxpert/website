"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Menu, X, ChevronDown, Brain, Cpu, BarChart, Code, Map, GraduationCap, Building2, Rocket,
  Landmark, Stethoscope, ShoppingBag, Truck, Zap, Shield, Eye, ArrowRight, Factory, Scale,
} from "lucide-react";

const coreServices = [
  { title: "AI Consulting", desc: "Strategic readiness & AI roadmap planning", icon: Brain, href: "/services#service-1" },
  { title: "Digital Transformation", desc: "Integrate intelligence at your operational core", icon: Cpu, href: "/services#service-2" },
  { title: "Data & Analytics", desc: "Extract high-precision business insights", icon: BarChart, href: "/services#service-3" },
  { title: "AI Development", desc: "Build & train custom model frameworks", icon: Code, href: "/services#service-4" },
  { title: "Strategy & Roadmap", desc: "12-month actionable operational blueprints", icon: Map, href: "/services#service-5" },
  { title: "Training & Enablement", desc: "Upskill staff to leverage AI pipelines", icon: GraduationCap, href: "/services#service-6" },
];

const advancedServices = [
  { title: "AI Agents & Automation", desc: "Goal-oriented agentic workflows & LLM RPA", icon: Zap, href: "/services#service-7", isNew: true },
  { title: "MLOps & Governance", desc: "Registries, drift alerts & retraining", icon: Shield, href: "/services#service-8", isNew: false },
  { title: "Responsible & Ethical AI", desc: "EU AI Act, bias & transparency audits", icon: Eye, href: "/services#service-9", isNew: true },
];

const industries = [
  { title: "Finance & Banking", href: "/solutions#finance", icon: Landmark },
  { title: "Healthcare", href: "/solutions#healthcare", icon: Stethoscope },
  { title: "Retail & E-commerce", href: "/solutions#retail", icon: ShoppingBag },
  { title: "Logistics & Supply", href: "/solutions#logistics", icon: Truck },
  { title: "Manufacturing", href: "/solutions#manufacturing", icon: Factory },
  { title: "Legal & Compliance", href: "/solutions#legal", icon: Scale },
];

const ACTIVE = "text-[#6D28D9]";
const LINK = "font-plus-jakarta-sans font-medium text-[15px] transition-colors duration-150 hover:text-[#6D28D9]";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const pathname = usePathname() || "/";
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus whenever the route changes
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }

  // Lock body scroll while the mobile menu is open; close on Escape
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileMenuOpen]);

  if (pathname === "/get-started") return null;

  const open = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(name);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const solid = scrolled || mobileMenuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[76px] flex items-center ${
          solid
            ? "bg-white/85 backdrop-blur-xl border-b border-[rgba(139,63,255,0.12)] shadow-[0_8px_30px_rgba(13,13,31,0.05)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto px-5 md:px-10 xl:px-20 w-full max-w-[1280px] flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2.5 z-50" aria-label="LuminaXpert home">
            <Image src="/images/FLogo.png" alt="LuminaXpert" width={160} height={99} priority className="h-9 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 h-full" aria-label="Main">
            <Link href="/" className={`${LINK} ${isActive("/") ? ACTIVE : "text-[#0D0D1F]"}`}>Home</Link>
            <Link href="/about" className={`${LINK} ${isActive("/about") ? ACTIVE : "text-[#0D0D1F]"}`}>About</Link>

            {/* Services mega menu */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => open("services")}
              onMouseLeave={scheduleClose}
              onFocus={() => open("services")}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose(); }}
            >
              <Link
                href="/services"
                aria-expanded={activeDropdown === "services"}
                className={`flex items-center gap-1 ${LINK} ${isActive("/services") ? ACTIVE : "text-[#0D0D1F]"}`}
              >
                Services
                <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === "services" ? "rotate-180" : ""}`} />
              </Link>

              <div
                data-open={activeDropdown === "services"}
                className="nav-dropdown absolute top-[62px] left-1/2 -translate-x-[45%] w-[880px] bg-white border border-[rgba(139,63,255,0.15)] shadow-[0_30px_80px_rgba(13,13,31,0.12)] rounded-2xl p-8 grid grid-cols-12 gap-8 z-50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#3b6fff]/5 to-transparent pointer-events-none" />
                <div className="col-span-5 border-r border-[rgba(139,63,255,0.1)] pr-6 relative">
                  <div className="font-space-mono text-[10px] text-[#B7791F] uppercase tracking-[0.2em] mb-4 font-bold">Core Capabilities</div>
                  <div className="grid grid-cols-1 gap-1">
                    {coreServices.map((item) => (
                      <Link key={item.title} href={item.href} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F0F4F8] transition-colors group">
                        <div className="mt-1 text-[#0891B2] group-hover:text-[#6D28D9] transition-colors"><item.icon size={18} /></div>
                        <div>
                          <div className="font-plus-jakarta-sans font-semibold text-[#0D0D1F] group-hover:text-[#6D28D9] text-[14px] transition-colors">{item.title}</div>
                          <div className="font-inter text-[#4A5568] text-[12px] leading-tight mt-0.5">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="col-span-4 border-r border-[rgba(139,63,255,0.1)] pr-6 relative">
                  <div className="font-space-mono text-[10px] text-[#B7791F] uppercase tracking-[0.2em] mb-4 font-bold">Advanced Solutions</div>
                  <div className="flex flex-col gap-1">
                    {advancedServices.map((item) => (
                      <Link key={item.title} href={item.href} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F0F4F8] transition-colors group">
                        <div className="mt-1 text-[#E040FB] group-hover:text-[#6D28D9] transition-colors"><item.icon size={18} /></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5 font-plus-jakarta-sans font-semibold text-[#0D0D1F] group-hover:text-[#6D28D9] text-[14px] transition-colors">
                            <span>{item.title}</span>
                            {item.isNew && <span className="px-1.5 py-0.5 text-[8px] font-space-mono font-bold tracking-widest text-[#0A0F1E] bg-[#F5C842] rounded-md">NEW</span>}
                          </div>
                          <div className="font-inter text-[#4A5568] text-[12px] leading-tight mt-0.5">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-[rgba(139,63,255,0.1)] flex flex-col gap-2">
                    <Link href="/assessment" className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-[#e040fb]/10 to-[#3b6fff]/10 hover:from-[#e040fb]/20 hover:to-[#3b6fff]/20 border border-[rgba(139,63,255,0.1)] transition-all group">
                      <span className="font-plus-jakarta-sans text-[12px] font-bold text-[#0D0D1F]">AI Maturity Assessment</span>
                      <ArrowRight size={14} className="text-[#4A5568] group-hover:translate-x-1 group-hover:text-[#6D28D9] transition-all" />
                    </Link>
                    <Link href="/tools/roi-calculator" className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-[#00d9ff]/10 to-[#3b6fff]/10 hover:from-[#00d9ff]/20 hover:to-[#3b6fff]/20 border border-[rgba(139,63,255,0.1)] transition-all group">
                      <span className="font-plus-jakarta-sans text-[12px] font-bold text-[#0D0D1F]">Interactive ROI Calculator</span>
                      <ArrowRight size={14} className="text-[#4A5568] group-hover:translate-x-1 group-hover:text-[#6D28D9] transition-all" />
                    </Link>
                  </div>
                </div>

                <div className="col-span-3 flex flex-col justify-between relative">
                  <div>
                    <div className="font-space-mono text-[10px] text-[#B7791F] uppercase tracking-[0.2em] mb-4 font-bold">Featured Insight</div>
                    <Link href="/blog/composable-ai-enterprise" className="rounded-xl overflow-hidden bg-[#F0F4F8] border border-[rgba(139,63,255,0.1)] p-4 flex flex-col gap-3 group hover:border-[#8B3FFF]/40 transition-colors">
                      <div className="text-[10px] font-space-mono text-[#0891B2] uppercase tracking-wider">Architecture · 8 min read</div>
                      <h4 className="font-plus-jakarta-sans font-bold text-[#0D0D1F] text-[13px] leading-snug group-hover:text-[#6D28D9] transition-colors">
                        The Composable AI Enterprise: Building Modular Intelligence
                      </h4>
                      <p className="font-inter text-[11px] text-[#4A5568] line-clamp-2">How modular architecture prevents technical debt as foundation models evolve.</p>
                      <span className="btn-link !text-[12px] !gap-1.5">Read insight →</span>
                    </Link>
                  </div>
                  <Link href="/services" className="font-space-mono text-[11px] text-[#4A5568] hover:text-[#0D0D1F] transition-colors underline decoration-dotted mt-4">
                    Explore all services
                  </Link>
                </div>
              </div>
            </div>

            {/* Solutions dropdown */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => open("solutions")}
              onMouseLeave={scheduleClose}
              onFocus={() => open("solutions")}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose(); }}
            >
              <Link
                href="/solutions"
                aria-expanded={activeDropdown === "solutions"}
                className={`flex items-center gap-1 ${LINK} ${isActive("/solutions") || isActive("/case-studies") ? ACTIVE : "text-[#0D0D1F]"}`}
              >
                Solutions
                <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === "solutions" ? "rotate-180" : ""}`} />
              </Link>

              <div
                data-open={activeDropdown === "solutions"}
                className="nav-dropdown absolute top-[62px] left-1/2 -translate-x-1/2 w-[560px] bg-white border border-[rgba(139,63,255,0.15)] shadow-[0_30px_80px_rgba(13,13,31,0.12)] rounded-2xl p-6 grid grid-cols-2 gap-6 z-50"
              >
                <div className="border-r border-[rgba(139,63,255,0.1)] pr-4 flex flex-col gap-4">
                  <div className="font-space-mono text-[10px] text-[#B7791F] uppercase tracking-[0.2em] font-bold">By Organization</div>
                  <div className="flex flex-col gap-2">
                    <Link href="/solutions#enterprise" className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#F0F4F8] transition-colors group">
                      <div className="mt-1 text-[#E040FB]"><Building2 size={16} /></div>
                      <div>
                        <div className="font-plus-jakarta-sans font-semibold text-[#0D0D1F] group-hover:text-[#6D28D9] text-[13px] transition-colors">Enterprise Scaling</div>
                        <div className="font-inter text-[#4A5568] text-[11px] leading-tight">Scale models, audits & governance</div>
                      </div>
                    </Link>
                    <Link href="/solutions#startups" className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#F0F4F8] transition-colors group">
                      <div className="mt-1 text-[#0891B2]"><Rocket size={16} /></div>
                      <div>
                        <div className="font-plus-jakarta-sans font-semibold text-[#0D0D1F] group-hover:text-[#6D28D9] text-[13px] transition-colors">Startup Acceleration</div>
                        <div className="font-inter text-[#4A5568] text-[11px] leading-tight">AI-native architectures from day one</div>
                      </div>
                    </Link>
                  </div>
                  <Link href="/case-studies" className="mt-auto font-space-mono text-[11px] text-[#0891B2] hover:text-[#6D28D9] transition-all flex items-center gap-1">
                    <span>View case studies & results</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="font-space-mono text-[10px] text-[#B7791F] uppercase tracking-[0.2em] font-bold">By Industry</div>
                  <div className="grid grid-cols-1 gap-2.5 pl-1">
                    {industries.map((ind) => (
                      <Link key={ind.title} href={ind.href} className="flex items-center gap-2 text-[13px] text-[#4A5568] hover:text-[#6D28D9] font-plus-jakarta-sans transition-colors group">
                        <ind.icon size={14} className="text-[#718096] group-hover:text-[#6D28D9] transition-colors" />
                        <span>{ind.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link href="/pricing" className={`${LINK} ${isActive("/pricing") ? ACTIVE : "text-[#0D0D1F]"}`}>Pricing</Link>
            <Link href="/blog" className={`${LINK} ${isActive("/blog") ? ACTIVE : "text-[#0D0D1F]"}`}>Insights</Link>
            <Link href="/contact" className={`${LINK} ${isActive("/contact") ? ACTIVE : "text-[#0D0D1F]"}`}>Contact</Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/signin" className="btn-ghost !px-5 !py-2.5 !text-[14px]">Sign In</Link>
            <Link href="/get-started" className="btn-primary !px-5 !py-2.5 !text-[14px]">Get Started →</Link>
          </div>

          <button
            className="lg:hidden z-50 w-11 h-11 -mr-2 flex items-center justify-center text-[#0D0D1F] hover:text-[#6D28D9] transition-colors cursor-pointer"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 z-40 bg-white/98 backdrop-blur-xl flex flex-col pt-24 pb-8 px-6 text-[#0D0D1F] overflow-y-auto transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 translate-x-0 visible" : "opacity-0 translate-x-full invisible"
        }`}
      >
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#3B6FFF] to-[#E040FB]" />
        <nav className="flex flex-col gap-3 font-plus-jakarta-sans text-[20px] font-bold" aria-label="Mobile">
          <Link href="/" className="hover:text-[#6D28D9] py-1 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-[#6D28D9] py-1 transition-colors">About</Link>

          {[
            {
              key: "services",
              label: "Services",
              items: [
                ...coreServices.map((s) => ({ title: s.title, href: s.href })),
                ...advancedServices.map((s) => ({ title: s.title, href: s.href })),
                { title: "All services", href: "/services" },
                { title: "AI Maturity Assessment", href: "/assessment" },
                { title: "ROI Calculator", href: "/tools/roi-calculator" },
              ],
            },
            {
              key: "solutions",
              label: "Solutions",
              items: [
                { title: "Enterprise Scaling", href: "/solutions#enterprise" },
                { title: "Startup Acceleration", href: "/solutions#startups" },
                ...industries.map((i) => ({ title: i.title, href: i.href })),
                { title: "Case Studies", href: "/case-studies" },
              ],
            },
          ].map((group) => (
            <div key={group.key}>
              <button
                onClick={() => setMobileSection((s) => (s === group.key ? null : group.key))}
                className="flex items-center justify-between w-full hover:text-[#6D28D9] py-1 text-left cursor-pointer"
                aria-expanded={mobileSection === group.key}
              >
                <span>{group.label}</span>
                <ChevronDown size={18} className={`transition-transform duration-200 ${mobileSection === group.key ? "rotate-180 text-[#6D28D9]" : ""}`} />
              </button>
              <div className={`grid transition-all duration-300 ${mobileSection === group.key ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden pl-4 flex flex-col gap-1.5">
                  <div className="h-2" />
                  {group.items.map((s) => (
                    <Link
                      key={s.title}
                      href={s.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[15px] font-medium text-[#4A5568] hover:text-[#6D28D9] py-1 transition-colors"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <Link href="/pricing" className="hover:text-[#6D28D9] py-1 transition-colors">Pricing</Link>
          <Link href="/blog" className="hover:text-[#6D28D9] py-1 transition-colors">Insights</Link>
          <Link href="/team" className="hover:text-[#6D28D9] py-1 transition-colors">Team</Link>
          <Link href="/contact" className="hover:text-[#6D28D9] py-1 transition-colors">Contact</Link>
        </nav>
        <div className="mt-auto pt-8 flex flex-col gap-3">
          <Link href="/signin" className="btn-ghost w-full justify-center">Sign In</Link>
          <Link href="/get-started" className="btn-primary w-full justify-center">Get Started →</Link>
        </div>
      </div>
    </>
  );
}
