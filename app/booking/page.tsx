import type { Metadata } from "next";
import Script from "next/script";
import { CalendarDays, Clock, ExternalLink, Video } from "lucide-react";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Free 30-Minute AI Consultation",
  description: "Schedule a free 30-minute discovery call with LuminaXpert's AI specialists. No commitment, proposal within 48 hours.",
  alternates: { canonical: "/booking" },
};

export default function BookingPage() {
  return (
    <div className="pt-32 pb-16 min-h-screen relative overflow-hidden bg-[#F0F4F8]">
      <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10">
        <h1 className="font-plus-jakarta-sans font-bold text-[36px] md:text-[48px] text-[#0D0D1F] mb-6 text-center">
          Book a Consultation
        </h1>
        <p className="text-center text-[#4A5568] mb-8 max-w-2xl mx-auto font-inter text-[18px]">
          Schedule a 30-minute discovery call to discuss how LuminaXpert can help accelerate your AI initiatives.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-10 font-space-mono text-[12px] text-[#4A5568]">
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[rgba(139,63,255,0.15)]"><Clock size={14} /> 30 minutes</span>
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[rgba(139,63,255,0.15)]"><Video size={14} /> Video call</span>
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[rgba(139,63,255,0.15)]"><CalendarDays size={14} /> Proposal within 48h</span>
        </div>
        
        <div className="bg-white rounded-[28px] shadow-xl overflow-hidden border border-[rgba(139,63,255,0.15)] max-w-5xl mx-auto">
          {/* Calendly inline widget begin */}
          <div 
            className="calendly-inline-widget" 
            data-url={`${SITE.calendly}?hide_gdpr_banner=1&primary_color=8b3fff`} 
            style={{ minWidth: '320px', height: '700px' }}
          ></div>
          <Script 
            type="text/javascript" 
            src="https://assets.calendly.com/assets/external/widget.js" 
            strategy="lazyOnload"
          />
          {/* Calendly inline widget end */}
        </div>
        <p className="text-center font-inter text-[14px] text-[#718096] mt-6">
          Calendar not loading?{" "}
          <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="text-[#6D28D9] underline underline-offset-4 inline-flex items-center gap-1">
            Open the booking page <ExternalLink size={12} />
          </a>{" "}
          or email <a href={`mailto:${SITE.email}`} className="text-[#6D28D9] underline underline-offset-4">{SITE.email}</a>.
        </p>
      </div>
    </div>
  );
}
