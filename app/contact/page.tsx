"use client";

import { useState, useRef } from "react";
import { MapPin, Mail, Phone, Clock, Globe, MessageSquare, Share2, ChevronDown, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import NeuralNetwork from "@/components/NeuralNetwork";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);
    setError("");

    // EmailJS Configuration
    const SERVICE_ID = "service_lodv4s8";
    const TEMPLATE_ID = "template_om6eji6"; // Replace with your Template ID from EmailJS dashboard
    const PUBLIC_KEY = "rJmiQU1kmvt_kTBgf";

    try {
      // Map form fields to template variables
      // Template variables expected: {{name}}, {{title}}, {{email}}, {{message}}, {{time}}
      const formData = new FormData(formRef.current);
      const templateParams = {
        name: formData.get("user_name"),
        email: formData.get("user_email"),
        title: formData.get("interest") || "General Inquiry",
        message: `Company: ${formData.get("company")}\nRole: ${formData.get("role")}\n\nMessage: ${formData.get("message")}`,
        time: new Date().toLocaleString(),
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      setSubmitted(true);
      formRef.current.reset();
    } catch (err: any) {
      console.error("EmailJS Error:", err);
      setError("Failed to send message. Please try again or email us directly.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative">

      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NeuralNetwork />
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] pt-[160px] pb-[80px] flex items-center bg-transparent">
        <div className="absolute inset-0 ambient-center z-0 opacity-40"></div>
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10 text-center">
          <ScrollReveal>
            <div className="font-space-mono text-[11px] text-[#E040FB] tracking-widest uppercase mb-4">LET'S CONNECT</div>
            <h1 className="font-plus-jakarta-sans font-bold text-[40px] md:text-[72px] leading-[1.05] tracking-tight mb-6">
              <span className="text-[#0D0D1F] block">Your transformation</span>
              <span className="text-gradient block">starts with a conversation.</span>
            </h1>
            <p className="font-inter text-[19px] text-[#4A5568] max-w-[680px] mx-auto leading-[1.8]">
              Tell us what you're working on. We'll connect you with the right expert within 24 hours to architect your AI future.
            </p>
          </ScrollReveal>
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
                      <div className="text-[#00F5A0] mb-6 drop-shadow-[0_0_20px_rgba(0,245,160,0.4)]">
                        <CheckCircle2 size={80} strokeWidth={1.5} />
                      </div>
                      <h3 className="font-plus-jakarta-sans font-bold text-[28px] text-[#0D0D1F] mb-4 uppercase">Transmission Received</h3>
                      <p className="font-inter text-[#4A5568] mb-8 max-w-[400px]">Our specialists have received your inquiry. We'll be in touch within 24 hours to begin your journey.</p>
                      <button onClick={() => setSubmitted(false)} className="btn-ghost px-10">Send Another Message</button>
                    </div>
                  ) : null}

                  <div className="flex bg-[#FFFFFF]/60 border border-[#8b3fff]/10 rounded-full p-1 mb-10 overflow-x-auto no-scrollbar relative z-10">
                    {["general", "book", "enterprise"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 min-w-max px-6 py-3 rounded-full font-plus-jakarta-sans text-[13px] font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === tab
                          ? 'bg-gradient-to-r from-[#3B6FFF] to-[#E040FB] text-[#0D0D1F] shadow-[0_0_20px_rgba(139,63,255,0.3)]'
                          : 'text-[#718096] hover:text-[#4A5568]'
                          }`}
                      >
                        {tab === 'general' ? 'General Inquiry' : tab === 'book' ? 'Consultation' : 'Enterprise'}
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
                      <select name="interest" className="glass-input w-full h-[56px] px-6 appearance-none text-[#4A5568] cursor-pointer" required defaultValue="">
                        <option value="" disabled>Service Interest *</option>
                        <option value="AI Consulting">AI Consulting</option>
                        <option value="Digital Transformation">Digital Transformation</option>
                        <option value="Data & Analytics">Data & Analytics</option>
                        <option value="AI Development">AI Development</option>
                        <option value="Strategy & Roadmap">Strategy & Roadmap</option>
                      </select>
                      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#4A5568] pointer-events-none" size={18} />
                    </div>

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
                          Encrypting & Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                          Send Message →
                        </span>
                      )}
                    </button>

                    <div className="text-center">
                      <p className="font-space-mono text-[10px] text-[#718096] uppercase tracking-widest">
                        🔒 Encrypted Transmission · Private & Secure · 24h Response
                      </p>
                    </div>
                  </form>
                </div>
              </ScrollReveal>
            </div>

            {/* RIGHT: INFO */}
            <div className="w-full lg:w-[42%] flex flex-col gap-6">
              <ScrollReveal delay={0.3}>
                <div className="glass-card p-8 flex items-start gap-6 hover:bg-[#1a1a3a]/40 transition-all group">
                  <div className="w-12 h-12 rounded-full bg-[#E040FB]/10 flex items-center justify-center text-[#E040FB] group-hover:scale-110 transition-transform">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-plus-jakarta-sans font-bold text-[18px] text-[#0D0D1F] mb-2 uppercase tracking-tight">Our Office</h4>
                    <p className="font-inter text-[#4A5568] text-[16px] leading-relaxed mb-3">123 Innovation Drive, Suite 500<br />Tech District, NY 10001</p>
                    <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-[rgba(139,63,255,0.15)]">
                      <div className="flex flex-col">
                        <span className="font-space-mono text-[11px] text-[#00D9FF] uppercase tracking-widest font-bold">London</span>
                        <span className="font-inter text-[13px] text-[#718096]">Level 39, One Canada Square, Canary Wharf (GMT)</span>
                        <span className="font-inter text-[13px] text-[#718096]">+44 20 7946 0958</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-space-mono text-[11px] text-[#00D9FF] uppercase tracking-widest font-bold">Singapore</span>
                        <span className="font-inter text-[13px] text-[#718096]">8 Marina View, Asia Square Tower 1 (SGT)</span>
                        <span className="font-inter text-[13px] text-[#718096]">+65 6701 5900</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-space-mono text-[11px] text-[#00D9FF] uppercase tracking-widest font-bold">Tokyo</span>
                        <span className="font-inter text-[13px] text-[#718096]">Roppongi Hills Mori Tower, Minato City (JST)</span>
                        <span className="font-inter text-[13px] text-[#718096]">+81 3-5159-0000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="glass-card p-8 flex items-start gap-6 hover:bg-[#1a1a3a]/40 transition-all group">
                  <div className="w-12 h-12 rounded-full bg-[#00D9FF]/10 flex items-center justify-center text-[#00D9FF] group-hover:scale-110 transition-transform">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-plus-jakarta-sans font-bold text-[18px] text-[#0D0D1F] mb-3 uppercase tracking-tight">Get in Touch</h4>
                    <a href="mailto:hello@luminaxpert.com" className="block font-inter text-[20px] text-[#0D0D1F] hover:text-[#00D9FF] transition-colors mb-2">hello@luminaxpert.com</a>
                    <p className="font-inter text-[#4A5568] text-[17px] mb-4">+1 (555) 123-4567</p>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00D9FF]/5 border border-[#00D9FF]/10 w-fit">
                      <Clock size={12} className="text-[#00D9FF]" />
                      <span className="font-space-mono text-[11px] text-[#00D9FF] uppercase tracking-wider">Mon–Fri · 9am–6pm EST</span>
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
                  <p className="font-space-mono text-[11px] text-[#718096] mb-6 uppercase tracking-widest">Global Network Connect:</p>
                  <div className="flex gap-5">
                    {[
                      { icon: <Globe size={22} />, color: "#E040FB" },
                      { icon: <MessageSquare size={22} />, color: "#00D9FF" },
                      { icon: <Share2 size={22} />, color: "#FFD166" }
                    ].map((social, i) => (
                      <Link
                        key={i}
                        href="#"
                        className="w-14 h-14 rounded-full glass-card flex items-center justify-center text-[#4A5568] hover:scale-110 transition-all border-[#ffffff08] hover:border-[var(--color-brand-magenta)]/30 group"
                      >
                        <div className="group-hover:text-[#0D0D1F] transition-colors" style={{ color: social.color }}>
                          {social.icon}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
