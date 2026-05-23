"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ChevronDown, Brain, Cpu, BarChart, Code, Map, GraduationCap, Building2, Rocket, Landmark, Stethoscope, ShoppingBag, Truck, Zap, Shield, Eye, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  if (pathname === "/get-started") return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[76px] flex items-center ${
          scrolled
            ? "bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[rgba(139,63,255,0.15)] shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-5 md:px-20 w-full max-w-[1280px] flex items-center justify-between">
          {/* Logo Assembly */}
          <Link href="/" className="inline-flex items-center gap-2.5 z-50">
            <Image 
              src="/images/FLogo.png" 
              alt="LuminaXpert Logo" 
              width={160} 
              height={36} 
              className="h-9 w-auto object-contain brightness-100" 
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 h-full">
            <Link 
              href="/" 
              className={`font-plus-jakarta-sans font-medium text-[15px] hover:text-[#F5C842] transition-colors duration-150 ${
                pathname === "/" ? "text-[#F5C842]" : "text-[#0D0D1F]"
              }`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`font-plus-jakarta-sans font-medium text-[15px] hover:text-[#F5C842] transition-colors duration-150 ${
                pathname === "/about" ? "text-[#F5C842]" : "text-[#0D0D1F]"
              }`}
            >
              About Us
            </Link>
            
            {/* Services Mega Dropdown Trigger */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/services"
                className={`flex items-center gap-1 font-plus-jakarta-sans font-medium text-[15px] hover:text-[#F5C842] cursor-pointer transition-colors duration-150 ${
                  pathname?.startsWith("/services") ? "text-[#F5C842]" : "text-[#0D0D1F]"
                }`}
              >
                Services <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180 text-[#F5C842]' : ''}`} />
              </Link>
              
              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-[58px] left-1/2 -translate-x-[45%] w-[880px] bg-[#FFFFFF] border border-[rgba(139,63,255,0.15)] shadow-lg rounded-2xl p-8 grid grid-cols-12 gap-8 z-50 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#3b6fff]/5 to-transparent pointer-events-none"></div>

                    {/* Column 1: Core Services */}
                    <div className="col-span-5 border-r border-[rgba(139,63,255,0.1)] pr-6">
                      <div className="font-space-mono text-[10px] text-[#F5C842] uppercase tracking-[0.2em] mb-4 font-bold">Core Capabilities</div>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          { title: "AI Consulting", desc: "Strategic readiness & AI roadmap planning", icon: Brain, href: "/services#service-1" },
                          { title: "Digital Transformation", desc: "Integrate intelligence at your operational core", icon: Cpu, href: "/services#service-2" },
                          { title: "Data & Analytics", desc: "Extract high-precision business insights", icon: BarChart, href: "/services#service-3" },
                          { title: "AI Development", desc: "Build & train custom model frameworks", icon: Code, href: "/services#service-4" },
                          { title: "Strategy & Roadmap", desc: "12-month actionable operational blueprints", icon: Map, href: "/services#service-5" },
                          { title: "Training & Enablement", desc: "Upskill staff to leverage AI pipelines", icon: GraduationCap, href: "/services#service-6" }
                        ].map((item, i) => (
                          <Link key={i} href={item.href} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F0F4F8] transition-colors group">
                            <div className="mt-1 text-[#00D9FF] group-hover:text-[#F5C842] transition-colors"><item.icon size={18} /></div>
                            <div>
                              <div className="font-plus-jakarta-sans font-semibold text-[#0D0D1F] group-hover:text-[#F5C842] text-[14px] transition-colors">{item.title}</div>
                              <div className="font-inter text-[#4A5568] text-[12px] group-hover:text-[#4A5568] transition-colors leading-tight mt-0.5">{item.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: New Services */}
                    <div className="col-span-4 border-r border-[rgba(139,63,255,0.1)] pr-6">
                      <div className="font-space-mono text-[10px] text-[#F5C842] uppercase tracking-[0.2em] mb-4 font-bold">Advanced Solutions</div>
                      <div className="flex flex-col gap-2">
                        {[
                          { title: "AI Agents & Automation", desc: "Deploy goal-oriented workflows & LLM RPA", icon: Zap, href: "/services#service-7", isNew: true },
                          { title: "MLOps & Governance", desc: "Scale registries, drift alerts & retraining", icon: Shield, href: "/services#service-8", isNew: false },
                          { title: "Responsible & Ethical AI", desc: "Audits for EU AI Act, bias & transparency", icon: Eye, href: "/services#service-9", isNew: true }
                        ].map((item, i) => (
                          <Link key={i} href={item.href} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F0F4F8] transition-colors group">
                            <div className="mt-1 text-[#E040FB] group-hover:text-[#F5C842] transition-colors"><item.icon size={18} /></div>
                            <div className="flex-1">
                              <div className="flex items-center gap-1.5 font-plus-jakarta-sans font-semibold text-[#0D0D1F] group-hover:text-[#F5C842] text-[14px] transition-colors">
                                <span>{item.title}</span>
                                {item.isNew && (
                                  <span className="px-1.5 py-0.5 text-[8px] font-space-mono font-bold tracking-widest text-[#0A0F1E] bg-[#F5C842] rounded-md">New</span>
                                )}
                              </div>
                              <div className="font-inter text-[#4A5568] text-[12px] group-hover:text-[#4A5568] transition-colors leading-tight mt-0.5">{item.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-6 pt-4 border-t border-[rgba(139,63,255,0.1)] flex flex-col gap-2">
                        <Link href="/assessment" className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-[#e040fb]/10 to-[#3b6fff]/10 hover:from-[#e040fb]/20 hover:to-[#3b6fff]/20 border border-[rgba(139,63,255,0.1)] transition-all group">
                          <span className="font-plus-jakarta-sans text-[12px] font-bold text-[#0D0D1F] group-hover:text-[#F5C842] transition-colors">AI Maturity Quiz</span>
                          <ArrowRight size={14} className="text-[#4A5568] group-hover:translate-x-1 group-hover:text-[#F5C842] transition-all" />
                        </Link>
                        <Link href="/tools/roi-calculator" className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-[#00d9ff]/10 to-[#3b6fff]/10 hover:from-[#00d9ff]/20 hover:to-[#3b6fff]/20 border border-[rgba(139,63,255,0.1)] transition-all group">
                          <span className="font-plus-jakarta-sans text-[12px] font-bold text-[#0D0D1F] group-hover:text-[#F5C842] transition-colors">Interactive ROI Calculator</span>
                          <ArrowRight size={14} className="text-[#4A5568] group-hover:translate-x-1 group-hover:text-[#F5C842] transition-all" />
                        </Link>
                      </div>
                    </div>

                    {/* Column 3: Featured Insight Card */}
                    <div className="col-span-3 flex flex-col justify-between">
                      <div>
                        <div className="font-space-mono text-[10px] text-[#F5C842] uppercase tracking-[0.2em] mb-4 font-bold">Featured Insight</div>
                        <div className="rounded-xl overflow-hidden bg-[#F0F4F8] border border-[rgba(139,63,255,0.1)] p-4 flex flex-col gap-3 group hover:border-[#F5C842]/40 transition-colors">
                          <div className="text-[10px] font-space-mono text-[#00D9FF] uppercase tracking-wider">Engineering · 8 MIN READ</div>
                          <h4 className="font-plus-jakarta-sans font-bold text-[#0D0D1F] text-[13px] leading-snug group-hover:text-[#F5C842] transition-colors">
                            The Composable AI Enterprise: Building Modular Intelligence
                          </h4>
                          <p className="font-inter text-[11px] text-[#4A5568] line-clamp-2">
                            How modular architecture prevents technical debt as foundation models evolve.
                          </p>
                          <Link href="/blog/composable-ai-enterprise" className="btn-link !text-[12px] mt-1 !gap-1.5 self-start">Read Insight →</Link>
                        </div>
                      </div>
                      <Link href="/services" className="font-space-mono text-[11px] text-[#4A5568] hover:text-[#0D0D1F] transition-colors underline decoration-dotted mt-4">
                        Explore all services menu
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Solutions Dropdown Trigger */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveDropdown('solutions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/solutions"
                className={`flex items-center gap-1 font-plus-jakarta-sans font-medium text-[15px] hover:text-[#F5C842] cursor-pointer transition-colors duration-150 ${
                  pathname?.startsWith("/solutions") ? "text-[#F5C842]" : "text-[#0D0D1F]"
                }`}
              >
                Solutions <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180 text-[#F5C842]' : ''}`} />
              </Link>
              
              <AnimatePresence>
                {activeDropdown === 'solutions' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-[58px] left-1/2 -translate-x-1/2 w-[540px] bg-[#FFFFFF] border border-[rgba(139,63,255,0.15)] shadow-lg rounded-2xl p-6 grid grid-cols-2 gap-6 z-50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#00d9ff]/5 to-transparent pointer-events-none"></div>

                    {/* Column 1: By Organization */}
                    <div className="border-r border-[rgba(139,63,255,0.1)] pr-4 flex flex-col gap-4">
                      <div className="font-space-mono text-[10px] text-[#F5C842] uppercase tracking-[0.2em] font-bold">By Organization</div>
                      <div className="flex flex-col gap-2">
                        <Link href="/solutions#enterprise" className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#F0F4F8] transition-colors group">
                          <div className="mt-1 text-[#E040FB] group-hover:text-[#F5C842] transition-colors"><Building2 size={16} /></div>
                          <div>
                            <div className="font-plus-jakarta-sans font-semibold text-[#0D0D1F] group-hover:text-[#F5C842] text-[13px] transition-colors">Enterprise Scaling</div>
                            <div className="font-inter text-[#4A5568] text-[11px] leading-tight">Scale models, audits & governance</div>
                          </div>
                        </Link>
                        <Link href="/solutions#startups" className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#F0F4F8] transition-colors group">
                          <div className="mt-1 text-[#00D9FF] group-hover:text-[#F5C842] transition-colors"><Rocket size={16} /></div>
                          <div>
                            <div className="font-plus-jakarta-sans font-semibold text-[#0D0D1F] group-hover:text-[#F5C842] text-[13px] transition-colors">Startup Acceleration</div>
                            <div className="font-inter text-[#4A5568] text-[11px] leading-tight">AI native architectures from day one</div>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Column 2: By Industry */}
                    <div className="flex flex-col justify-between">
                      <div className="flex flex-col gap-4">
                        <div className="font-space-mono text-[10px] text-[#F5C842] uppercase tracking-[0.2em] font-bold">By Industry</div>
                        <div className="grid grid-cols-1 gap-2.5 pl-1">
                          {[
                            { title: "Finance & Banking", href: "/solutions#finance", icon: Landmark },
                            { title: "Healthcare", href: "/solutions#healthcare", icon: Stethoscope },
                            { title: "Retail & E-commerce", href: "/solutions#retail", icon: ShoppingBag },
                            { title: "Logistics & Supply", href: "/solutions#logistics", icon: Truck }
                          ].map((industry, index) => (
                            <Link key={index} href={industry.href} className="flex items-center gap-2 text-[13px] text-[#4A5568] hover:text-[#F5C842] font-plus-jakarta-sans transition-colors group">
                              <industry.icon size={14} className="text-[#4A5568] group-hover:text-[#F5C842] transition-colors" />
                              <span>{industry.title}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                      <Link href="/case-studies" className="font-space-mono text-[11px] text-[#00D9FF] hover:text-[#F5C842] hover:translate-x-1 transition-all flex items-center gap-1 self-start mt-4">
                        <span>View case studies & results</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              href="/pricing" 
              className={`font-plus-jakarta-sans font-medium text-[15px] hover:text-[#F5C842] transition-colors duration-150 ${
                pathname === "/pricing" ? "text-[#F5C842]" : "text-[#0D0D1F]"
              }`}
            >
              Pricing
            </Link>
            <Link 
              href="/blog" 
              className={`font-plus-jakarta-sans font-medium text-[15px] hover:text-[#F5C842] transition-colors duration-150 ${
                pathname === "/blog" ? "text-[#F5C842]" : "text-[#0D0D1F]"
              }`}
            >
              Blog
            </Link>
            <Link 
              href="/contact" 
              className={`font-plus-jakarta-sans font-medium text-[15px] hover:text-[#F5C842] transition-colors duration-150 ${
                pathname === "/contact" ? "text-[#F5C842]" : "text-[#0D0D1F]"
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="#" className="btn-ghost !px-5 !py-2.5 !text-[14px] mr-2">Sign In</Link>
            <Link href="/get-started" className="btn-primary !px-5 !py-2.5 !text-[14px]">Get Started →</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden z-50 text-[#0D0D1F] hover:text-[#F5C842] transition-colors cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-[#FFFFFF]/98 backdrop-blur-xl flex flex-col pt-24 pb-8 px-6 text-[#0D0D1F] overflow-y-auto"
          >
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#3B6FFF] to-[#E040FB]"></div>
            <nav className="flex flex-col gap-4 font-plus-jakarta-sans text-[20px] font-bold">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#F5C842] py-1 transition-colors">Home</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#F5C842] py-1 transition-colors">About Us</Link>
              
              {/* Mobile Services Accordion */}
              <div>
                <button 
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center justify-between w-full hover:text-[#F5C842] py-1 text-left cursor-pointer"
                >
                  <span>Services</span>
                  <ChevronDown size={18} className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180 text-[#F5C842]' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-4 flex flex-col gap-2 mt-2"
                    >
                      {[
                        { title: "AI Consulting", href: "/services#service-1" },
                        { title: "Digital Transformation", href: "/services#service-2" },
                        { title: "Data & Analytics", href: "/services#service-3" },
                        { title: "AI Development", href: "/services#service-4" },
                        { title: "Strategy & Roadmap", href: "/services#service-5" },
                        { title: "Training & Enablement", href: "/services#service-6" },
                        { title: "AI Agents & Automation", href: "/services#service-7", isNew: true },
                        { title: "MLOps & Governance", href: "/services#service-8" },
                        { title: "Responsible & Ethical AI", href: "/services#service-9", isNew: true },
                        { title: "AI Maturity Quiz", href: "/assessment" },
                        { title: "ROI Calculator", href: "/tools/roi-calculator" }
                      ].map((s, idx) => (
                        <Link key={idx} href={s.href} onClick={() => setMobileMenuOpen(false)} className="text-[14px] font-medium text-[#4A5568] hover:text-[#F5C842] py-1 transition-colors flex items-center gap-1.5">
                          <span>{s.title}</span>
                          {s.isNew && (
                            <span className="px-1.5 py-0.5 text-[7px] font-space-mono font-bold text-[#0A0F1E] bg-[#F5C842] rounded">New</span>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Solutions Accordion */}
              <div>
                <button 
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                  className="flex items-center justify-between w-full hover:text-[#F5C842] py-1 text-left cursor-pointer"
                >
                  <span>Solutions</span>
                  <ChevronDown size={18} className={`transition-transform duration-200 ${mobileSolutionsOpen ? 'rotate-180 text-[#F5C842]' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileSolutionsOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-4 flex flex-col gap-2 mt-2"
                    >
                      <Link href="/solutions#enterprise" onClick={() => setMobileMenuOpen(false)} className="text-[14px] font-medium text-[#4A5568] hover:text-[#F5C842] py-1 transition-colors">Enterprise Scaling</Link>
                      <Link href="/solutions#startups" onClick={() => setMobileMenuOpen(false)} className="text-[14px] font-medium text-[#4A5568] hover:text-[#F5C842] py-1 transition-colors">Startup Acceleration</Link>
                      <Link href="/solutions#finance" onClick={() => setMobileMenuOpen(false)} className="text-[14px] font-medium text-[#4A5568] hover:text-[#F5C842] py-1 transition-colors">Finance & Banking</Link>
                      <Link href="/solutions#healthcare" onClick={() => setMobileMenuOpen(false)} className="text-[14px] font-medium text-[#4A5568] hover:text-[#F5C842] py-1 transition-colors">Healthcare</Link>
                      <Link href="/solutions#retail" onClick={() => setMobileMenuOpen(false)} className="text-[14px] font-medium text-[#4A5568] hover:text-[#F5C842] py-1 transition-colors">Retail & E-commerce</Link>
                      <Link href="/solutions#logistics" onClick={() => setMobileMenuOpen(false)} className="text-[14px] font-medium text-[#4A5568] hover:text-[#F5C842] py-1 transition-colors">Logistics & Supply</Link>
                      <Link href="/case-studies" onClick={() => setMobileMenuOpen(false)} className="text-[14px] font-medium text-[#00D9FF] hover:text-[#F5C842] py-1 transition-colors">Case Studies</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#F5C842] py-1 transition-colors">Pricing</Link>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#F5C842] py-1 transition-colors">Blog</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#F5C842] py-1 transition-colors">Contact Us</Link>
            </nav>
            <div className="mt-auto flex flex-col gap-4">
              <Link href="#" onClick={() => setMobileMenuOpen(false)} className="btn-ghost w-full justify-center !text-[#0D0D1F] border-[#0D0D1F]/20 hover:border-[#F5C842]">Sign In</Link>
              <Link href="/get-started" onClick={() => setMobileMenuOpen(false)} className="btn-primary w-full justify-center">Get Started →</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
