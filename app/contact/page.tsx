"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, Mail, Clock, Globe, ChevronDown, CheckCircle2, Loader2, CalendarDays } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import WorldMap, { type Hub } from "@/components/WorldMap";
import { LinkedInIcon } from "@/components/icons";
import { sendEmail, emailErrorMessage } from "@/lib/email";
import { EMAILJS, FOUNDER_LINKS, SERVICES, SITE } from "@/lib/site";

const TABS = [
  { id: "general", label: "General Inquiry", title: "General Inquiry" },
  { id: "book", label: "Consultation", title: "Consultation Request" },
  { id: "enterprise", label: "Enterprise", title: "Enterprise Engagement" },
] as const;
type TabId = (typeof TABS)[number]["id"];

const OFFICES: Hub[] = [
  { name: "New York", lat: 40.71, lon: -74.0, label: "left", primary: true },
  { name: "London", lat: 51.5, lon: -0.12, label: "up" },
  { name: "Singapore", lat: 1.35, lon: 103.82, label: "down" },
  { name: "Tokyo", lat: 35.68, lon: 139.69, label: "up" },
];
const OFFICE_ROUTES: [number, number][] = [[0, 1], [1, 2], [2, 3], [0, 3]];

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [service, setService] = useState("");

  // Pre-fill from links such as /contact?service=AI%20Consulting or /contact?type=enterprise
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const svc = sp.get("service");
    const type = sp.get("type");
    /* eslint-disable react-hooks/set-state-in-effect -- one-time sync from the URL on mount */
    if (svc && SERVICES.some((x) => x.title === svc)) setService(svc);
    if (type && TABS.some((t) => t.id === type)) setActiveTab(type as TabId);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);
    setError("");

    try {
      const formData = new FormData(formRef.current);
      const tab = TABS.find((t) => t.id === activeTab)!;
      await sendEmail(EMAILJS.contactTemplate, {
        name: formData.get("user_name") as string,
        email: formData.get("user_email") as string,
        title: `${tab.title} — ${formData.get("interest") || "General"}`,
        message: [
          `Inquiry type: ${tab.title}`,
          `Company: ${formData.get("company") || "—"}`,
          `Role: ${formData.get("role") || "—"}`,
          activeTab === "enterprise" ? `Company size: ${formData.get("size") || "—"}` : null,
          activeTab === "book" ? `Preferred timing: ${formData.get("timing") || "—"}` : null,
          "",
          `Message: ${formData.get("message")}`,
        ].filter((l) => l !== null).join("\n"),
        time: new Date().toLocaleString(),
      });

      setSubmitted(true);
      formRef.current?.reset();
      setService("");
    } catch (err) {
      console.error("EmailJS Error:", err);
      setError(emailErrorMessage(err, `Failed to send message. Please try again or email us at ${SITE.email}.`));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative">

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] pt-[160px] pb-[80px] flex items-center bg-transparent">
        <div className="absolute inset-0 ambient-center z-0 opacity-40"></div>
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10 text-center">
          <div className="animate-slide-up-1">
            <div className="font-space-mono text-[11px] text-[#A21CAF] tracking-widest uppercase mb-4">LET&apos;S CONNECT</div>
            <h1 className="font-plus-jakarta-sans font-bold text-[40px] md:text-[72px] leading-[1.05] tracking-tight mb-6">
              <span className="text-[#0D0D1F] block">Your transformation</span>
              <span className="text-gradient block">starts with a conversation.</span>
            </h1>
            <p className="font-inter text-[19px] text-[#4A5568] max-w-[680px] mx-auto leading-[1.8]">
              Tell us what you&apos;re working on. We&apos;ll connect you with the right expert within 24 hours to architect your AI future.
            </p>
          </div>
        </div>
      </section>

      <section className="py-[100px] relative z-10">
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px]">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* LEFT: FORM */}
            <div className="w-full lg:w-[58%]">
              <ScrollReveal delay={0.2}>
                <div className="glass-card p-8 md:p-12 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3b6fff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {submitted ? (
                    <div className="absolute inset-0 bg-[#FFFFFF]/95 backdrop-blur-xl z-20 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
                      <div className="text-[#059669] mb-6 drop-shadow-[0_0_20px_rgba(0,245,160,0.4)]">
                        <CheckCircle2 size={80} strokeWidth={1.5} />
                      </div>
                      <h3 className="font-plus-jakarta-sans font-bold text-[28px] text-[#0D0D1F] mb-4">Message received</h3>
                      <p className="font-inter text-[#4A5568] mb-8 max-w-[400px]">Our specialists have received your inquiry. We'll be in touch within 24 hours to begin your journey.</p>
                      <button onClick={() => setSubmitted(false)} className="btn-ghost px-10">Send Another Message</button>
                    </div>
                  ) : null}

                  <div className="flex bg-[#FFFFFF]/60 border border-[#8b3fff]/10 rounded-full p-1 mb-10 overflow-x-auto no-scrollbar relative z-10">
                    {TABS.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 min-w-max px-5 py-3 rounded-full font-plus-jakarta-sans text-[13px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeTab === tab.id
                          ? "bg-gradient-to-r from-[#050DEB] via-[#8B3FFF] to-[#E040FB] text-white shadow-[0_0_20px_rgba(139,63,255,0.3)]"
                          : "text-[#4A5568] hover:text-[#0D0D1F]"
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <input type="text" name="user_name" placeholder="Full Name *" required className="glass-input w-full h-[56px] px-6" />
                      </div>
                      <div className="flex-1">
                        <input type="email" name="user_email" placeholder="Work Email *" required className="glass-input w-full h-[56px] px-6" />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <input type="text" name="company" placeholder="Company Name" className="glass-input w-full h-[56px] px-6" />
                      </div>
                      <div className="flex-1">
                        <input type="text" name="role" placeholder="Your Role" className="glass-input w-full h-[56px] px-6" />
                      </div>
                    </div>

                    <div className="relative">
                      <label htmlFor="interest" className="sr-only">Service interest</label>
                      <select id="interest" name="interest" value={service} onChange={(e) => setService(e.target.value)} className={`glass-input w-full h-[56px] px-6 appearance-none cursor-pointer ${service ? "text-[#0D0D1F]" : "text-[#718096]"}`} required>
                        <option value="" disabled>Service Interest *</option>
                        {SERVICES.map((svc) => (
                          <option key={svc.id} value={svc.title}>{svc.title}</option>
                        ))}
                        <option value="Not sure yet">Not sure yet — advise me</option>
                      </select>
                      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#4A5568] pointer-events-none" size={18} />
                    </div>

                    {activeTab === "enterprise" && (
                      <div className="relative">
                        <label htmlFor="size" className="sr-only">Company size</label>
                        <select id="size" name="size" defaultValue="" className="glass-input w-full h-[56px] px-6 appearance-none cursor-pointer text-[#0D0D1F]">
                          <option value="" disabled>Company size</option>
                          <option>200–1,000 employees</option>
                          <option>1,000–10,000 employees</option>
                          <option>10,000+ employees</option>
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#4A5568] pointer-events-none" size={18} />
                      </div>
                    )}
                    {activeTab === "book" && (
                      <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                        <input type="text" name="timing" placeholder="Preferred days / times (with time zone)" className="glass-input flex-1 h-[56px] px-6" />
                        <Link href="/booking" className="btn-ghost !h-[56px] whitespace-nowrap gap-2"><CalendarDays size={16} /> Pick a slot instantly</Link>
                      </div>
                    )}

                    <textarea name="message" placeholder="How can we help you? *" required className="glass-input w-full min-h-[160px] resize-none py-5 px-6"></textarea>

                    {error && (
                      <div className="text-red-400 text-[14px] font-medium bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSending}
                      className="btn-primary w-full mt-2 h-[60px] text-[16px] uppercase tracking-widest font-bold disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                      {isSending ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="animate-spin" size={20} />
                          Sending…
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                          Send Message →
                        </span>
                      )}
                    </button>

                    <div className="text-center">
                      <p className="font-space-mono text-[10px] text-[#718096] uppercase tracking-widest">
                        🔒 Private &amp; secure · We reply within 24 hours · <Link href="/legal/privacy" className="underline">Privacy policy</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </ScrollReveal>
            </div>

            {/* RIGHT: INFO */}
            <div className="w-full lg:w-[42%] flex flex-col gap-6">
              <ScrollReveal delay={0.3}>
                <div className="glass-card p-8 flex items-start gap-6 hover:bg-white transition-all group">
                  <div className="w-12 h-12 rounded-full bg-[#E040FB]/10 flex items-center justify-center text-[#E040FB] group-hover:scale-110 transition-transform">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-plus-jakarta-sans font-bold text-[18px] text-[#0D0D1F] mb-2 uppercase tracking-tight">Our Office</h4>
                    <p className="font-inter text-[#4A5568] text-[16px] leading-relaxed mb-3">123 Innovation Drive, Suite 500<br />Tech District, NY 10001</p>
                    <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-[rgba(139,63,255,0.15)]">
                      <div className="flex flex-col">
                        <span className="font-space-mono text-[11px] text-[#0891B2] uppercase tracking-widest font-bold">London</span>
                        <span className="font-inter text-[13px] text-[#718096]">Level 39, One Canada Square, Canary Wharf (GMT)</span>
                        <span className="font-inter text-[13px] text-[#718096]">+44 20 7946 0958</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-space-mono text-[11px] text-[#0891B2] uppercase tracking-widest font-bold">Singapore</span>
                        <span className="font-inter text-[13px] text-[#718096]">8 Marina View, Asia Square Tower 1 (SGT)</span>
                        <span className="font-inter text-[13px] text-[#718096]">+65 6701 5900</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-space-mono text-[11px] text-[#0891B2] uppercase tracking-widest font-bold">Tokyo</span>
                        <span className="font-inter text-[13px] text-[#718096]">Roppongi Hills Mori Tower, Minato City (JST)</span>
                        <span className="font-inter text-[13px] text-[#718096]">+81 3-5159-0000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="glass-card p-8 flex items-start gap-6 hover:bg-white transition-all group">
                  <div className="w-12 h-12 rounded-full bg-[#00D9FF]/10 flex items-center justify-center text-[#0891B2] group-hover:scale-110 transition-transform">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-plus-jakarta-sans font-bold text-[18px] text-[#0D0D1F] mb-3 uppercase tracking-tight">Get in Touch</h4>
                    <a href={`mailto:${SITE.email}`} className="block font-inter text-[20px] text-[#0D0D1F] hover:text-[#0891B2] transition-colors mb-2 break-all">{SITE.email}</a>
                    <p className="font-inter text-[#4A5568] text-[17px] mb-4">{SITE.phone}</p>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00D9FF]/5 border border-[#00D9FF]/10 w-fit">
                      <Clock size={12} className="text-[#0891B2]" />
                      <span className="font-space-mono text-[11px] text-[#0891B2] uppercase tracking-wider">Mon–Fri · 9am–6pm EST</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <div className="glass-brand p-8 flex items-center gap-8 group overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-4 text-[80px] opacity-[0.05] font-plus-jakarta-sans font-bold pointer-events-none group-hover:scale-125 transition-transform duration-700">⚡</div>
                  <div className="relative z-10">
                    <div className="font-plus-jakarta-sans font-bold text-[48px] text-gradient leading-none mb-2 tracking-tighter">&lt; 2h</div>
                    <p className="font-space-mono text-[11px] text-[#E040FB] uppercase tracking-widest font-bold">Average Response Time</p>
                    <p className="font-inter text-[#4A5568] text-[13px] mt-2">Elite precision, lightning delivery.</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.6}>
                <div className="mt-4 p-4">
                  <p className="font-space-mono text-[11px] text-[#718096] mb-6 uppercase tracking-widest">Connect with us</p>
                  <div className="flex gap-4">
                    {[
                      { href: FOUNDER_LINKS.linkedin, label: "LinkedIn", icon: <LinkedInIcon size={20} />, color: "#0A66C2", external: true },
                      { href: FOUNDER_LINKS.portfolio, label: "Founder portfolio", icon: <Globe size={22} />, color: "#8B3FFF", external: true },
                      { href: `mailto:${SITE.email}`, label: "Email", icon: <Mail size={22} />, color: "#E040FB", external: false },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        {...(social.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="w-14 h-14 rounded-full glass-card flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all"
                        style={{ color: social.color }}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* GLOBAL PRESENCE */}
      <section className="pb-[60px] relative z-10">
        <div className="mx-auto px-5 md:px-10 xl:px-20 max-w-[1280px]">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="font-space-mono text-[11px] text-[#0891B2] tracking-widest uppercase mb-3">Global presence</div>
              <h2 className="font-plus-jakarta-sans font-bold text-[30px] md:text-[40px] text-[#0D0D1F]">Four hubs. Every time zone covered.</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="glass-card !bg-white/85 p-4 md:p-10 rounded-[32px] shadow-[0_30px_80px_rgba(13,13,31,0.08)]">
              <WorldMap hubs={OFFICES} routes={OFFICE_ROUTES} id="office-map" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
