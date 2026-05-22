"use client";

import Link from "next/link";
import { Globe, MessageSquare, Mail, Share2 } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#F8F9FA] relative mt-20">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FFFFFF] to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10">
        
        {/* Newsletter Row */}
        <div className="glass-brand flex flex-col md:flex-row items-center justify-between p-10 rounded-none border-x-0 border-t border-b border-[#8b3fff]/15 -mx-5 md:-mx-20 px-10 md:px-20">
          <div className="mb-6 md:mb-0">
            <h3 className="font-plus-jakarta-sans font-bold text-[20px] text-[#0D0D1F]">Stay ahead of the AI curve.</h3>
            <p className="font-inter text-[15px] text-[#4A5568] mt-1">Join 12,000+ readers. Insights every week.</p>
          </div>
          <div className="flex flex-col w-full md:w-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="Email address" className="glass-input w-full sm:w-[300px]" />
              <button className="btn-primary !px-6 !py-3">Subscribe</button>
            </div>
            <p className="font-space-mono text-[10px] text-[#718096] mt-2">No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        {/* 5 Columns */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
          <div className="md:col-span-1.5 flex flex-col gap-6">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image src="/images/FLogo.png" alt="LuminaXpert Logo" width={200} height={40} className="h-8 w-auto object-contain" />
            </Link>
            <p className="font-inter italic text-[15px] text-[#4A5568]">Illuminate Your Potential.</p>
            <div className="flex gap-4">
              <a href="https://luminaxpert.netlify.app/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#0D0D1F] hover:text-[#E040FB] transition-colors"><Globe size={18} /></a>
              <a href="https://x.com/luminaxpert" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#0D0D1F] hover:text-[#E040FB] transition-colors"><MessageSquare size={18} /></a>
              <a href="mailto:hello@luminaxpert.com" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#0D0D1F] hover:text-[#E040FB] transition-colors"><Mail size={18} /></a>
              <a href="https://www.linkedin.com/company/luminaxpert" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#0D0D1F] hover:text-[#E040FB] transition-colors"><Share2 size={18} /></a>
            </div>
            <div className="flex gap-2 mt-2">
              <span className="px-3 py-1 rounded-full bg-white/5 text-[11px] font-space-mono text-[#4A5568]">SOC 2 Compliant</span>
              <span className="px-3 py-1 rounded-full bg-white/5 text-[11px] font-space-mono text-[#4A5568]">GDPR Ready</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-space-mono text-[11px] text-[#00D9FF] tracking-[0.12em] uppercase">Company</h4>
            <Link href="/about" className="font-inter text-[#4A5568] hover:text-[#0D0D1F] transition-colors text-[15px]">About Us</Link>
            <Link href="/team" className="font-inter text-[#4A5568] hover:text-[#0D0D1F] transition-colors text-[15px]">Our Team</Link>
            <Link href="/contact" className="font-inter text-[#4A5568] hover:text-[#0D0D1F] transition-colors text-[15px]">Careers</Link>
            <Link href="/contact" className="font-inter text-[#4A5568] hover:text-[#0D0D1F] transition-colors text-[15px]">Press & Media</Link>
            <Link href="/contact" className="font-inter text-[#4A5568] hover:text-[#0D0D1F] transition-colors text-[15px]">Partners</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-space-mono text-[11px] text-[#00D9FF] tracking-[0.12em] uppercase">Services</h4>
            <Link href="/services#service-1" className="font-inter text-[#4A5568] hover:text-[#0D0D1F] transition-colors text-[15px]">AI Consulting</Link>
            <Link href="/services#service-2" className="font-inter text-[#4A5568] hover:text-[#0D0D1F] transition-colors text-[15px]">Digital Transformation</Link>
            <Link href="/services#service-3" className="font-inter text-[#4A5568] hover:text-[#0D0D1F] transition-colors text-[15px]">Data & Analytics</Link>
            <Link href="/services#service-4" className="font-inter text-[#4A5568] hover:text-[#0D0D1F] transition-colors text-[15px]">AI Development</Link>
            <Link href="/services#service-7" className="font-inter text-[#4A5568] hover:text-[#0D0D1F] transition-colors text-[15px] flex items-center gap-1.5">
              <span>AI Agents</span>
              <span className="px-1 py-0.5 text-[8px] font-space-mono font-bold text-[#0A0F1E] bg-[#F5C842] rounded">New</span>
            </Link>
            <Link href="/services#service-8" className="font-inter text-[#4A5568] hover:text-[#0D0D1F] transition-colors text-[15px]">MLOps & Governance</Link>
            <Link href="/services#service-9" className="font-inter text-[#4A5568] hover:text-[#0D0D1F] transition-colors text-[15px] flex items-center gap-1.5">
              <span>Responsible AI</span>
              <span className="px-1 py-0.5 text-[8px] font-space-mono font-bold text-[#0A0F1E] bg-[#F5C842] rounded">New</span>
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-space-mono text-[11px] text-[#00D9FF] tracking-[0.12em] uppercase">Resources</h4>
            <Link href="/blog" className="font-inter text-[#4A5568] hover:text-[#0D0D1F] transition-colors text-[15px]">Blog & Insights</Link>
            <Link href="/case-studies" className="font-inter text-[#4A5568] hover:text-[#0D0D1F] transition-colors text-[15px]">Case Studies</Link>
            <Link href="/assessment" className="font-inter text-[#4A5568] hover:text-[#0D0D1F] transition-colors text-[15px]">Maturity Assessment</Link>
            <Link href="/tools/roi-calculator" className="font-inter text-[#4A5568] hover:text-[#0D0D1F] transition-colors text-[15px]">ROI Calculator</Link>
            <Link href="/pricing" className="font-inter text-[#4A5568] hover:text-[#0D0D1F] transition-colors text-[15px]">Pricing Models</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-space-mono text-[11px] text-[#00D9FF] tracking-[0.12em] uppercase">Contact</h4>
            <p className="font-inter text-[#4A5568] text-[15px]">📍 123 Innovation Drive, Tech District</p>
            <a href="mailto:hello@luminaxpert.com" className="font-inter text-[#E040FB] hover:underline text-[15px]">📧 hello@luminaxpert.com</a>
            <p className="font-inter text-[#4A5568] text-[15px]">📞 +1 (555) 123-4567</p>
            <p className="font-inter text-[#718096] text-[15px]">Mon–Fri, 9am–6pm EST</p>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#8b3fff]/25 to-transparent"></div>

        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="font-space-mono text-[11px] text-[#718096]">© 2026 LuminaXpert. All rights reserved.</p>
          <div className="font-space-mono text-[11px] text-[#718096] flex items-center gap-2">
            <Link href="/legal/privacy" className="hover:text-[#0D0D1F] transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="/legal/privacy" className="hover:text-[#0D0D1F] transition-colors">Terms of Service</Link>
            <span>|</span>
            <Link href="/legal/privacy" className="hover:text-[#0D0D1F] transition-colors">Cookie Policy</Link>
          </div>
          <p className="font-space-mono text-[11px] text-[#718096]">Built with ∞ in the AI era</p>
        </div>

      </div>
    </footer>
  );
}
