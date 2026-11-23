"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Globe, Mail, CheckCircle2, Loader2 } from "lucide-react";
import { SITE, FOUNDER_LINKS, EMAILJS } from "@/lib/site";
import { sendEmail } from "@/lib/email";
import { LinkedInIcon } from "@/components/icons";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "AI Consulting", href: "/services#service-1" },
      { label: "Data & Analytics", href: "/services#service-3" },
      { label: "AI Development", href: "/services#service-4" },
      { label: "AI Agents", href: "/services#service-7", isNew: true },
      { label: "MLOps & Governance", href: "/services#service-8" },
      { label: "Responsible AI", href: "/services#service-9", isNew: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Insights & Blog", href: "/blog" },
      { label: "AI Maturity Assessment", href: "/assessment" },
      { label: "ROI Calculator", href: "/tools/roi-calculator" },
      { label: "Engagement Models", href: "/pricing" },
      { label: "Book a Consultation", href: "/booking" },
    ],
  },
];

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    try {
      await sendEmail(EMAILJS.contactTemplate, {
        name: "Newsletter subscriber",
        email,
        title: "Newsletter Subscription",
        message: `New newsletter subscription request from ${email}`,
        time: new Date().toLocaleString(),
      });
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="flex items-center gap-3 text-[#059669] font-plus-jakarta-sans font-semibold" role="status">
        <CheckCircle2 size={22} /> You&apos;re subscribed — welcome aboard.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col w-full md:w-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Work email address"
          autoComplete="email"
          className="glass-input w-full sm:w-[300px]"
        />
        <button type="submit" disabled={status === "sending"} className="btn-primary !px-6 !py-3 disabled:opacity-70">
          {status === "sending" ? <Loader2 size={18} className="animate-spin" /> : "Subscribe"}
        </button>
      </div>
      <p className={`font-space-mono text-[10px] mt-2 ${status === "error" ? "text-red-600" : "text-[#718096]"}`}>
        {status === "error" ? `Couldn't subscribe right now — email us at ${SITE.email}.` : "No spam. Unsubscribe anytime."}
      </p>
    </form>
  );
}

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/get-started") return null;

  return (
    <footer className="bg-[#F8F9FA] relative mt-20 border-t border-[rgba(139,63,255,0.12)]">
      <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px] relative z-10">
        {/* Newsletter */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-12 border-b border-[rgba(139,63,255,0.12)]">
          <div>
            <h3 className="font-plus-jakarta-sans font-bold text-[22px] text-[#0D0D1F]">Stay ahead of the AI curve.</h3>
            <p className="font-inter text-[15px] text-[#4A5568] mt-1">Field notes on enterprise AI, governance and engineering — delivered monthly.</p>
          </div>
          <Newsletter />
        </div>

        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr] gap-10">
          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="LuminaXpert home">
              <Image src="/images/FLogo.png" alt="LuminaXpert" width={160} height={99} className="h-9 w-auto object-contain" />
            </Link>
            <p className="font-inter text-[15px] text-[#4A5568] max-w-[260px]">
              Enterprise AI strategy, engineering and governance — built to deliver measurable outcomes.
            </p>
            <div className="flex gap-3">
              <a href={FOUNDER_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#0D0D1F] hover:text-[#0A66C2] transition-colors">
                <LinkedInIcon size={17} />
              </a>
              <a href={FOUNDER_LINKS.portfolio} target="_blank" rel="noopener noreferrer" aria-label="Founder portfolio" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#0D0D1F] hover:text-[#8B3FFF] transition-colors">
                <Globe size={18} />
              </a>
              <a href={`mailto:${SITE.email}`} aria-label="Email LuminaXpert" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#0D0D1F] hover:text-[#E040FB] transition-colors">
                <Mail size={18} />
              </a>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-white border border-[rgba(139,63,255,0.12)] text-[11px] font-space-mono text-[#4A5568]">GDPR Ready</span>
              <span className="px-3 py-1 rounded-full bg-white border border-[rgba(139,63,255,0.12)] text-[11px] font-space-mono text-[#4A5568]">EU AI Act Aligned</span>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3.5">
              <h4 className="font-space-mono text-[11px] text-[#0891B2] tracking-[0.12em] uppercase">{col.title}</h4>
              {col.links.map((l) => (
                <Link key={l.label} href={l.href} className="font-inter text-[#4A5568] hover:text-[#0D0D1F] transition-colors text-[15px] flex items-center gap-1.5">
                  <span>{l.label}</span>
                  {"isNew" in l && l.isNew && <span className="px-1 py-0.5 text-[8px] font-space-mono font-bold text-[#0A0F1E] bg-[#F5C842] rounded">NEW</span>}
                </Link>
              ))}
            </div>
          ))}

          <div className="flex flex-col gap-3.5">
            <h4 className="font-space-mono text-[11px] text-[#0891B2] tracking-[0.12em] uppercase">Contact</h4>
            <a href={`mailto:${SITE.email}`} className="font-inter text-[#6D28D9] hover:underline text-[15px] break-all">{SITE.email}</a>
            <p className="font-inter text-[#4A5568] text-[15px]">{SITE.phone}</p>
            <p className="font-inter text-[#718096] text-[14px]">{SITE.hours}</p>
            <Link href="/booking" className="btn-link !text-[14px]">Book a 30-min call →</Link>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#8b3fff]/25 to-transparent" />

        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="font-space-mono text-[11px] text-[#718096]">© {new Date().getFullYear()} LuminaXpert. All rights reserved.</p>
          <div className="font-space-mono text-[11px] text-[#718096] flex flex-wrap justify-center items-center gap-2">
            <Link href="/legal/privacy" className="hover:text-[#0D0D1F] transition-colors">Privacy Policy</Link>
            <span aria-hidden>|</span>
            <Link href="/legal/terms" className="hover:text-[#0D0D1F] transition-colors">Terms of Service</Link>
            <span aria-hidden>|</span>
            <Link href="/legal/cookies" className="hover:text-[#0D0D1F] transition-colors">Cookie Policy</Link>
          </div>
          <p className="font-space-mono text-[11px] text-[#718096]">Built with ∞ in the AI era</p>
        </div>
      </div>
    </footer>
  );
}
