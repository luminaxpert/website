"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Shield, Zap, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import emailjs from "@emailjs/browser";

export default function GetStartedPage() {
  const [step, setStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    company: "",
    focus: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFocusSelect = (focus: string) => {
    setFormData(prev => ({ ...prev, focus }));
  };

  const handleSubmit = async () => {
    setIsSending(true);
    setError("");

    const SERVICE_ID = "service_lodv4s8";
    const TEMPLATE_ID = "template_g1u77q4";
    const PUBLIC_KEY = "rJmiQU1kmvt_kTBgf";

    try {
      const templateParams = {
        user_name: formData.user_name,
        user_email: formData.user_email,
        company: formData.company,
        focus: formData.focus,
        time: new Date().toLocaleString()
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setStep(3);
    } catch (err: any) {
      console.error("EmailJS Error:", err);
      // More descriptive error for the user
      const errorMsg = err?.text || err?.message || "Connection error. Please check your EmailJS dashboard.";
      setError(`Transmission Error: ${errorMsg}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFFFF]">
      
      {/* COMPACT WIZARD HEADER */}
      <div className="w-full h-[80px] border-b border-[rgba(139, 63, 255, 0.15)] flex items-center justify-between px-5 md:px-10 bg-[#FFFFFF] relative z-[60]">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <Image src="/images/logo-bg.png" alt="LuminaXpert Logo" width={200} height={40} className="h-9 w-auto object-contain" />
        </Link>
        <Link href="/" className="font-inter text-[14px] text-[#4A5568] hover:text-[#0D0D1F] transition-colors flex items-center gap-2">
          <span>Return to Home</span>
          <ChevronRight size={14} />
        </Link>
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* LEFT SIDE: FORM WIZARD */}
        <div className="w-full md:w-[60%] p-5 md:p-20 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-[#8B3FFF]/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="w-full max-w-[500px] relative z-10">
            {/* Progress */}
            <div className="flex items-center justify-between mb-12 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-white/5 z-0"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#3B6FFF] to-[#E040FB] z-0 transition-all duration-500" style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>
              
              {[1, 2, 3].map((s) => (
                <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-plus-jakarta-sans text-[14px] font-bold relative z-10 transition-colors duration-300 ${
                  step >= s ? 'bg-[#F0F4F8] border-2 border-[#E040FB] text-[#0D0D1F] shadow-[0_0_15px_rgba(224,64,251,0.3)]' : 'bg-[#FFFFFF] border-2 border-white/10 text-[#718096]'
                }`}>
                  {s}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="font-plus-jakarta-sans font-bold text-[36px] text-[#0D0D1F] mb-2">Let's build your profile</h2>
                <p className="font-inter text-[#4A5568] mb-8">We'll use this to match you with the right AI specialists.</p>
                
                <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="flex flex-col gap-4 mb-8">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-space-mono text-[11px] text-[#4A5568] uppercase tracking-wider">Full Name *</label>
                    <input 
                      type="text" 
                      name="user_name"
                      required 
                      className="glass-input h-[52px]" 
                      placeholder="Jane Doe" 
                      value={formData.user_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-space-mono text-[11px] text-[#4A5568] uppercase tracking-wider">Work Email *</label>
                    <input 
                      type="email" 
                      name="user_email"
                      required 
                      className="glass-input h-[52px]" 
                      placeholder="jane@company.com" 
                      value={formData.user_email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-space-mono text-[11px] text-[#4A5568] uppercase tracking-wider">Company Name (Optional)</label>
                    <input 
                      type="text" 
                      name="company"
                      className="glass-input h-[52px]" 
                      placeholder="Acme Corp" 
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center h-[56px] text-[16px] mt-4">Continue <ChevronRight size={18} /></button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in">
                <h2 className="font-plus-jakarta-sans font-bold text-[36px] text-[#0D0D1F] mb-2">What's your focus?</h2>
                <p className="font-inter text-[#4A5568] mb-6">Select the primary area where you need AI transformation.</p>
                
                <div className="mb-8 p-5 rounded-2xl bg-[#FFFFFF] border border-[#8b3fff]/20 shadow-sm flex flex-col gap-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-space-mono text-[11px] text-[#718096] uppercase tracking-widest font-bold">Profile Summary</span>
                    <button onClick={() => setStep(1)} className="text-[12px] text-[#00D9FF] font-bold hover:underline">Edit</button>
                  </div>
                  <div className="font-plus-jakarta-sans text-[15px] text-[#0D0D1F] font-bold">{formData.user_name || "Name not provided"}</div>
                  <div className="font-inter text-[14px] text-[#4A5568]">{formData.user_email || "Email not provided"}</div>
                  {formData.company && <div className="font-inter text-[14px] text-[#4A5568]">🏢 {formData.company}</div>}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    "AI Strategy & Consulting",
                    "Custom Model Development",
                    "Data Infrastructure",
                    "Process Automation",
                    "Team Enablement",
                    "Other"
                  ].map((option, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleFocusSelect(option)}
                      className={`glass-card p-4 flex items-center gap-3 cursor-pointer transition-all ${
                        formData.focus === option ? 'border-[#E040FB] bg-[#E040FB]/5 shadow-[0_0_20px_rgba(224,64,251,0.1)]' : 'hover:border-[#00D9FF]/40'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center relative ${
                        formData.focus === option ? 'border-[#E040FB]' : 'border-[#00D9FF]'
                      }`}>
                        {formData.focus === option && <div className="w-2.5 h-2.5 rounded-full bg-[#E040FB]"></div>}
                      </div>
                      <span className="font-plus-jakarta-sans text-[14px] text-[#0D0D1F]">{option}</span>
                    </button>
                  ))}
                </div>
                
                {error && <div className="mb-4 text-red-400 text-sm font-medium">{error}</div>}

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="btn-ghost w-1/3 justify-center h-[56px] text-[16px]">Back</button>
                  <button 
                    onClick={handleSubmit} 
                    disabled={!formData.focus || isSending}
                    className="btn-primary w-2/3 justify-center h-[56px] text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={18} /> Processing...</span>
                    ) : (
                      <span className="flex items-center gap-2">Finalize Setup <ChevronRight size={18} /></span>
                    )}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in text-center py-10">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#3B6FFF] to-[#E040FB] p-[2px] mx-auto mb-6">
                  <div className="w-full h-full rounded-full bg-[#FFFFFF] flex items-center justify-center">
                    <CheckCircle2 className="text-[#00F5A0]" size={32} />
                  </div>
                </div>
                <h2 className="font-plus-jakarta-sans font-bold text-[36px] text-[#0D0D1F] mb-4">Transmission Successful</h2>
                <p className="font-inter text-[#4A5568] mb-8 max-w-[400px] mx-auto">
                  Welcome to the ecosystem, <strong>{formData.user_name.split(' ')[0]}</strong>. 
                  A confirmation has been sent to {formData.user_email}. Our lead strategist will reach out shortly.
                </p>
                
                <Link href="/" className="btn-primary px-12 justify-center h-[56px] text-[16px]">Return to Terminal</Link>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: SOCIAL PROOF / PERKS */}
        <div className="w-full md:w-[40%] bg-[#F8F9FA] border-l border-[rgba(139, 63, 255, 0.15)] p-5 md:p-20 flex flex-col justify-center">
          <div className="font-plus-jakarta-sans font-bold text-[28px] text-[#0D0D1F] mb-8">Join the elite network of AI-driven enterprises.</div>
          
          <div className="flex flex-col gap-6 mb-12">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full glass-brand flex items-center justify-center flex-shrink-0 text-[#00F5A0]"><Shield size={18} /></div>
              <div>
                <h4 className="font-plus-jakarta-sans font-bold text-[16px] text-[#0D0D1F] mb-1">Strict Confidentiality</h4>
                <p className="font-inter text-[#4A5568] text-[14px]">NDAs standard on all initial consultations.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full glass-brand flex items-center justify-center flex-shrink-0 text-[#FFD166]"><Zap size={18} /></div>
              <div>
                <h4 className="font-plus-jakarta-sans font-bold text-[16px] text-[#0D0D1F] mb-1">Rapid Matching</h4>
                <p className="font-inter text-[#4A5568] text-[14px]">Talk to the right expert in 48 hours.</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 border-l-4 border-l-[#E040FB]">
            <p className="font-inter italic text-[#4A5568] text-[15px] mb-4">"LuminaXpert fundamentally changed how we approach predictive models. They didn't just write code; they transformed our business model."</p>
            <div className="font-plus-jakarta-sans font-bold text-[14px] text-[#0D0D1F]">CTO, Global Logistics Firm</div>
          </div>
        </div>

      </div>
    </div>
  );
}
