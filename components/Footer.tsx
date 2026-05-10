"use client";

import Link from "next/link";
import { Globe, MessageSquare, Mail, Share2 } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg-void)] relative mt-20">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[var(--color-bg-deep)] to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10">
        
        {/* Newsletter Row */}
        <div className="glass-brand flex flex-col md:flex-row items-center justify-between p-10 rounded-none border-x-0 border-t border-b border-[#8b3fff]/15 -mx-5 md:-mx-20 px-10 md:px-20">
          <div className="mb-6 md:mb-0">
            <h3 className="font-plus-jakarta-sans font-bold text-[20px] text-white">Stay ahead of the AI curve.</h3>
            <p className="font-outfit text-[15px] text-[#9494c0] mt-1">Join 12,000+ readers. Insights every week.</p>
          </div>
          <div className="flex flex-col w-full md:w-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="Email address" className="glass-input w-full sm:w-[300px]" />
              <button className="btn-primary !px-6 !py-3">Subscribe</button>
            </div>
            <p className="font-space-mono text-[10px] text-[#4a4a80] mt-2">No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        {/* 5 Columns */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
          <div className="md:col-span-1.5 flex flex-col gap-6">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image src="/images/logo-bg.png" alt="LuminaXpert Logo" width={200} height={40} className="h-8 w-auto object-contain" />
            </Link>
            <p className="font-outfit italic text-[15px] text-[#9494c0]">Illuminate Your Potential.</p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white hover:text-[#E040FB] transition-colors"><Globe size={18} /></Link>
              <Link href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white hover:text-[#E040FB] transition-colors"><MessageSquare size={18} /></Link>
              <Link href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white hover:text-[#E040FB] transition-colors"><Mail size={18} /></Link>
              <Link href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white hover:text-[#E040FB] transition-colors"><Share2 size={18} /></Link>
            </div>
            <div className="flex gap-2 mt-2">
              <span className="px-3 py-1 rounded-full bg-white/5 text-[11px] font-space-mono text-[#9494c0]">SOC 2 Compliant</span>
              <span className="px-3 py-1 rounded-full bg-white/5 text-[11px] font-space-mono text-[#9494c0]">GDPR Ready</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-space-mono text-[11px] text-[#00D9FF] tracking-[0.12em] uppercase">Company</h4>
            <Link href="/about" className="font-outfit text-[#9494c0] hover:text-white transition-colors text-[15px]">About Us</Link>
            <Link href="#" className="font-outfit text-[#9494c0] hover:text-white transition-colors text-[15px]">Our Team</Link>
            <Link href="#" className="font-outfit text-[#9494c0] hover:text-white transition-colors text-[15px]">Careers</Link>
            <Link href="#" className="font-outfit text-[#9494c0] hover:text-white transition-colors text-[15px]">Press & Media</Link>
            <Link href="#" className="font-outfit text-[#9494c0] hover:text-white transition-colors text-[15px]">Partners</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-space-mono text-[11px] text-[#00D9FF] tracking-[0.12em] uppercase">Services</h4>
            <Link href="/services" className="font-outfit text-[#9494c0] hover:text-white transition-colors text-[15px]">AI Consulting</Link>
            <Link href="/services" className="font-outfit text-[#9494c0] hover:text-white transition-colors text-[15px]">Digital Transformation</Link>
            <Link href="/services" className="font-outfit text-[#9494c0] hover:text-white transition-colors text-[15px]">Data & Analytics</Link>
            <Link href="/services" className="font-outfit text-[#9494c0] hover:text-white transition-colors text-[15px]">AI Development</Link>
            <Link href="/services" className="font-outfit text-[#9494c0] hover:text-white transition-colors text-[15px]">Strategy</Link>
            <Link href="/services" className="font-outfit text-[#9494c0] hover:text-white transition-colors text-[15px]">Training</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-space-mono text-[11px] text-[#00D9FF] tracking-[0.12em] uppercase">Resources</h4>
            <Link href="/blog" className="font-outfit text-[#9494c0] hover:text-white transition-colors text-[15px]">Blog & Insights</Link>
            <Link href="#" className="font-outfit text-[#9494c0] hover:text-white transition-colors text-[15px]">Case Studies</Link>
            <Link href="#" className="font-outfit text-[#9494c0] hover:text-white transition-colors text-[15px]">Documentation</Link>
            <Link href="#" className="font-outfit text-[#9494c0] hover:text-white transition-colors text-[15px]">Newsletter</Link>
            <Link href="#" className="font-outfit text-[#9494c0] hover:text-white transition-colors text-[15px]">Events</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-space-mono text-[11px] text-[#00D9FF] tracking-[0.12em] uppercase">Contact</h4>
            <p className="font-outfit text-[#9494c0] text-[15px]">📍 123 Innovation Drive, Tech District</p>
            <a href="mailto:hello@luminaxpert.com" className="font-outfit text-[#E040FB] hover:underline text-[15px]">📧 hello@luminaxpert.com</a>
            <p className="font-outfit text-[#9494c0] text-[15px]">📞 +1 (555) 123-4567</p>
            <p className="font-outfit text-[#4a4a80] text-[15px]">Mon–Fri, 9am–6pm EST</p>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#8b3fff]/25 to-transparent"></div>

        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="font-space-mono text-[11px] text-[#4a4a80]">© 2026 LuminaXpert. All rights reserved.</p>
          <div className="font-space-mono text-[11px] text-[#4a4a80] flex items-center gap-2">
            <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>|</span>
            <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
          <p className="font-space-mono text-[11px] text-[#4a4a80]">Built with ∞ in the AI era</p>
        </div>

      </div>
    </footer>
  );
}
