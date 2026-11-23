"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  { quote: "LuminaXpert transformed how we approach data. What used to take our team two weeks now takes two hours. The ROI was visible within 60 days.", name: "James Whitmore", role: "CTO", company: "Global Fintech Company", metric: "60-day ROI" },
  { quote: "We went from zero AI capability to a full production deployment in under 3 months. Their team felt like an extension of ours.", name: "Priya Nair", role: "VP Operations", company: "Fortune 500 Healthcare Provider", metric: "3-month deployment" },
  { quote: "The strategy roadmap they delivered became the foundation for our Series C pitch. We closed $45M shortly after.", name: "Alex Torres", role: "CEO", company: "Series B AI Startup", metric: "$45M raised" },
  { quote: "Their training program upskilled 400 of our employees in 6 weeks. The culture shift was remarkable.", name: "Sophie Brennan", role: "CHRO", company: "European Logistics Leader", metric: "400 employees trained" },
  { quote: "Best-in-class security standards and zero compliance incidents since deployment. Exactly what we needed in a regulated environment.", name: "Daniel Osei", role: "Chief Compliance Officer", company: "Tier-1 Investment Bank", metric: "Zero compliance incidents" },
  { quote: "Their predictive models helped us anticipate supply chain disruptions three weeks before they occurred, saving us millions.", name: "Elena Rostova", role: "Head of Global Operations", company: "Leading Electronics Manufacturer", metric: "$12M costs avoided" },
  { quote: "LuminaXpert's custom LLM deployment gave our customer support agents superpowers. Resolution times dropped by 45% in the first month.", name: "Michael Chen", role: "VP Customer Experience", company: "SaaS Unicorn", metric: "45% faster resolution" },
  { quote: "The strategic roadmap was clear, actionable, and instantly got our board's approval. They are true partners in AI transformation.", name: "Sarah Jenkins", role: "Chief Digital Officer", company: "Fortune 100 Retailer", metric: "Board-approved strategy" },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  const t = testimonials[active];
  const go = (d: number) => setActive((p) => (p + d + testimonials.length) % testimonials.length);

  return (
    <div
      className="max-w-[880px] mx-auto relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <div className="absolute -top-10 -left-6 text-[#8B3FFF]/[0.07] select-none pointer-events-none">
        <Quote size={180} />
      </div>

      <div className="relative min-h-[360px] md:min-h-[290px] flex items-center">
        <div key={active} className="w-full glass-card !bg-white/85 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 page-enter" aria-live="polite">
          <div className="flex-1">
            <div className="flex gap-1 mb-4 text-[#F5B400]" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} className="fill-[#F5B400]" />)}
            </div>
            <blockquote className="font-inter text-[#4A5568] text-[16px] md:text-[18px] leading-[1.8] italic mb-6">&ldquo;{t.quote}&rdquo;</blockquote>
            <div>
              <cite className="font-plus-jakarta-sans font-bold text-[#0D0D1F] text-[16px] not-italic block">{t.name}</cite>
              <span className="font-space-mono text-[#718096] text-[12px] uppercase tracking-wider block mt-1">{t.role}, {t.company}</span>
            </div>
          </div>
          <div className="w-full md:w-[220px] bg-gradient-to-br from-[#8b3fff]/10 to-[#FB00DF]/5 border border-[rgba(139,63,255,0.12)] rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <span className="font-space-mono text-[10px] text-[#718096] uppercase tracking-widest block mb-2">Outcome</span>
            <div className="font-plus-jakarta-sans font-black text-gradient text-[26px] leading-tight">{t.metric}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8 relative z-20">
        <button onClick={() => go(-1)} aria-label="Previous testimonial" className="w-11 h-11 rounded-full border border-[rgba(139,63,255,0.25)] bg-white flex items-center justify-center text-[#0D0D1F] hover:border-[#8B3FFF] transition-all cursor-pointer">
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={active === i}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${active === i ? "bg-gradient-to-r from-[#050DEB] to-[#FB00DF] w-7" : "bg-[#CBD5E1] hover:bg-[#94A3B8] w-2.5"}`}
            />
          ))}
        </div>
        <button onClick={() => go(1)} aria-label="Next testimonial" className="w-11 h-11 rounded-full border border-[rgba(139,63,255,0.25)] bg-white flex items-center justify-center text-[#0D0D1F] hover:border-[#8B3FFF] transition-all cursor-pointer">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
