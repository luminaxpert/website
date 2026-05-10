"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ChevronDown, PlayCircle, Brain, Cpu, BarChart, Code, Map, GraduationCap, Building2, Rocket, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname === "/get-started") return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[72px] flex items-center ${
          scrolled
            ? "bg-[#0d0d1f]/90 backdrop-blur-xl border-b border-[#8b3fff]/15 shadow-[0_4px_40px_rgba(8,8,26,0.6)]"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-5 md:px-20 w-full max-w-[1280px] flex items-center justify-between">
          {/* Logo Assembly */}
          <Link href="/" className="inline-flex items-center gap-2.5 z-50">
            <Image src="/images/logo-bg.png" alt="LuminaXpert Logo" width={240} height={48} className="h-11 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="font-plus-jakarta-sans font-medium text-[15px] text-[#9494C0] hover:text-white transition-colors duration-150">Home</Link>
            <Link href="/about" className="font-plus-jakarta-sans font-medium text-[15px] text-[#9494C0] hover:text-white transition-colors duration-150">About Us</Link>
            
            {/* Services Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 font-plus-jakarta-sans font-medium text-[15px] text-[#9494C0] group-hover:text-white transition-colors duration-150">
                Services <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[320px] glass-card p-4 flex flex-col gap-2"
                  >
                    {[
                      { title: "AI Consulting", desc: "Strategic AI advisory", icon: Brain },
                      { title: "Digital Transformation", desc: "End-to-end evolution", icon: Cpu },
                      { title: "Data & Analytics", desc: "Actionable intelligence", icon: BarChart },
                      { title: "AI Development", desc: "Custom model building", icon: Code },
                      { title: "Strategy", desc: "Long-term AI roadmaps", icon: Map },
                      { title: "Training", desc: "Team enablement", icon: GraduationCap }
                    ].map((item, i) => (
                      <Link key={i} href={`/services#service-${i + 1}`} className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
                        <div className="mt-1 text-[#E040FB]"><item.icon size={18} /></div>
                        <div>
                          <div className="font-plus-jakarta-sans font-semibold text-white text-[15px]">{item.title}</div>
                          <div className="font-outfit text-[#9494C0] text-[13px]">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                    <div className="mt-2 pt-2 border-t border-[#8b3fff]/15">
                      <Link href="/services" className="btn-link text-[14px]">View All Services →</Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Solutions Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('solutions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 font-plus-jakarta-sans font-medium text-[15px] text-[#9494C0] group-hover:text-white transition-colors duration-150">
                Solutions <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'solutions' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[320px] glass-card p-4 flex flex-col gap-2"
                  >
                    {[
                      { title: "Enterprise", desc: "Large org transformation", icon: Building2, id: "enterprise" },
                      { title: "Startups", desc: "AI-first from day one", icon: Rocket, id: "startups" },
                      { title: "By Industry", desc: "Sector-specific solutions", icon: Globe, id: "industry" }
                    ].map((item, i) => (
                      <Link key={i} href={`/solutions#${item.id}`} className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
                        <div className="mt-1 text-[#00D9FF]"><item.icon size={18} /></div>
                        <div>
                          <div className="font-plus-jakarta-sans font-semibold text-white text-[15px]">{item.title}</div>
                          <div className="font-outfit text-[#9494C0] text-[13px]">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/blog" className="font-plus-jakarta-sans font-medium text-[15px] text-[#9494C0] hover:text-white transition-colors duration-150">Blog</Link>
            <Link href="/contact" className="font-plus-jakarta-sans font-medium text-[15px] text-[#9494C0] hover:text-white transition-colors duration-150">Contact Us</Link>
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="#" className="btn-ghost !px-5 !py-2.5 !text-[14px]">Sign In</Link>
            <Link href="/get-started" className="btn-primary !px-5 !py-2.5 !text-[14px]">Get Started →</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden z-50 text-white"
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
            className="fixed inset-0 z-40 bg-[#08081a]/95 backdrop-blur-[30px] flex flex-col pt-24 pb-8 px-6"
          >
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--gradient-brand)]"></div>
            <nav className="flex flex-col gap-6">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-plus-jakarta-sans font-semibold text-[24px] text-white">Home</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="font-plus-jakarta-sans font-semibold text-[24px] text-white">About Us</Link>
              <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="font-plus-jakarta-sans font-semibold text-[24px] text-white">Services</Link>
              <Link href="/solutions" onClick={() => setMobileMenuOpen(false)} className="font-plus-jakarta-sans font-semibold text-[24px] text-white">Solutions</Link>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="font-plus-jakarta-sans font-semibold text-[24px] text-white">Blog</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="font-plus-jakarta-sans font-semibold text-[24px] text-white">Contact Us</Link>
            </nav>
            <div className="mt-auto flex flex-col gap-4">
              <Link href="#" className="btn-ghost w-full justify-center">Sign In</Link>
              <Link href="/get-started" className="btn-primary w-full justify-center">Get Started →</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
