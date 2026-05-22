"use client";

import React, { useState, useEffect, useRef } from "react";
import { Calculator, X, Sparkles, TrendingUp, Clock, Zap, CheckCircle2, ShieldAlert } from "lucide-react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";

interface AnimatedValueProps {
  value: number;
  formatter: (v: number) => string;
}

function AnimatedValue({ value, formatter }: AnimatedValueProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValue = useRef(value);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const duration = 600; // 0.6s
    const startVal = previousValue.current;
    const endVal = value;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutQuad
      const easedProgress = progress * (2 - progress);
      const current = startVal + (endVal - startVal) * easedProgress;
      setDisplayValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(endVal);
        previousValue.current = endVal;
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [value]);

  return <>{formatter(displayValue)}</>;
}

export default function RoiCalculator() {
  const [companySize, setCompanySize] = useState<string>("250");
  const [monthlySpend, setMonthlySpend] = useState<number>(75000);
  const [useCase, setUseCase] = useState<string>("Customer Support Automation");
  const [maturityLevel, setMaturityLevel] = useState<string>("Exploring");

  // Output States (Calculated)
  const [annualSavings, setAnnualSavings] = useState<number>(0);
  const [roiYear1, setRoiYear1] = useState<number>(0);
  const [roiYear3, setRoiYear3] = useState<number>(0);
  const [breakEven, setBreakEven] = useState<number>(0);
  const [productivityMultiplier, setProductivityMultiplier] = useState<number>(1);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [modalError, setModalError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // 1. Determine use case factor
    let useCaseFactor = 0.35;
    switch (useCase) {
      case "Customer Support Automation": useCaseFactor = 0.45; break;
      case "Data Analysis": useCaseFactor = 0.38; break;
      case "Sales Intelligence": useCaseFactor = 0.30; break;
      case "Operations": useCaseFactor = 0.40; break;
      case "Compliance": useCaseFactor = 0.50; break;
      case "Other": useCaseFactor = 0.25; break;
    }

    // 2. Determine maturity factor
    let maturityFactor = 0.85;
    switch (maturityLevel) {
      case "None": maturityFactor = 0.70; break;
      case "Exploring": maturityFactor = 0.85; break;
      case "Piloting": maturityFactor = 0.98; break;
      case "Scaling": maturityFactor = 1.15; break;
    }

    // 3. Estimate implementation cost based on size
    let baseImplementationCost = 75000;
    switch (companySize) {
      case "50": baseImplementationCost = 30000; break;
      case "250": baseImplementationCost = 75000; break;
      case "1000": baseImplementationCost = 180000; break;
      case "5000+": baseImplementationCost = 450000; break;
    }

    // Adjust cost based on maturity level (Exploring = base, None = +25% data prep, Piloting = -10%, Scaling = -15%)
    let maturityCostModifier = 1.0;
    switch (maturityLevel) {
      case "None": maturityCostModifier = 1.25; break;
      case "Piloting": maturityCostModifier = 0.90; break;
      case "Scaling": maturityCostModifier = 0.85; break;
    }
    const implementationCost = baseImplementationCost * maturityCostModifier;

    // 4. Calculations
    const annualSpend = monthlySpend * 12;
    const savings = annualSpend * useCaseFactor * maturityFactor;
    const y1Roi = Math.max(0, ((savings - implementationCost) / implementationCost) * 100);
    const y3Roi = Math.max(0, (((savings * 3) - implementationCost) / implementationCost) * 100);
    const breakEvenMonths = Math.min(24, Math.max(1, implementationCost / (savings / 12)));
    const prodMultiplier = 1 + (useCaseFactor * maturityFactor * 1.3);

    setAnnualSavings(savings);
    setRoiYear1(y1Roi);
    setRoiYear3(y3Roi);
    setBreakEven(breakEvenMonths);
    setProductivityMultiplier(prodMultiplier);

  }, [companySize, monthlySpend, useCase, maturityLevel]);

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);
    setModalError("");

    // EmailJS keys
    const SERVICE_ID = "service_lodv4s8";
    const TEMPLATE_ID = "template_om6eji6";
    const PUBLIC_KEY = "rJmiQU1kmvt_kTBgf";

    try {
      const formData = new FormData(formRef.current);
      const templateParams = {
        name: formData.get("user_name"),
        email: formData.get("user_email"),
        title: `ROI Report Request - ${useCase}`,
        message: `Company: ${formData.get("company")}
Role: ${formData.get("role")}
Phone: ${formData.get("phone")}

Calculated ROI Report Metrics:
- Company Size: ${companySize} employees
- Current Spend: $${monthlySpend.toLocaleString()}/month
- Use Case: ${useCase}
- AI Maturity: ${maturityLevel}
- Projected Annual Savings: $${Math.round(annualSavings).toLocaleString()}
- Year 1 ROI: ${Math.round(roiYear1)}%
- Year 3 ROI: ${Math.round(roiYear3)}%
- Break-even: ${breakEven.toFixed(1)} months
- Productivity Multiplier: ${productivityMultiplier.toFixed(2)}x`,
        time: new Date().toLocaleString()
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setFormSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setModalError("Unable to submit report request. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const formatCurrency = (val: number) => {
    return "$" + Math.round(val).toLocaleString();
  };

  const formatPercentage = (val: number) => {
    return Math.round(val).toLocaleString() + "%";
  };

  const formatMonths = (val: number) => {
    return val.toFixed(1) + " months";
  };

  const formatMultiplier = (val: number) => {
    return val.toFixed(2) + "x";
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto bg-[#0A0F1E] border border-[#ffffff10] rounded-[24px] overflow-hidden shadow-[0_15px_60px_rgba(0,0,0,0.8)] relative">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#3b6fff]/5 via-transparent to-[#e040fb]/5 pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row">
        {/* INPUTS PANEL */}
        <div className="w-full lg:w-1/2 p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-[#ffffff10]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#F5C842]/10 border border-[#F5C842]/30 flex items-center justify-center text-[#F5C842]">
              <Calculator size={20} />
            </div>
            <div>
              <h3 className="font-plus-jakarta-sans font-bold text-white text-[20px]">Parameters</h3>
              <p className="text-[12px] text-gray-400 font-inter">Input your current metrics below</p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* 1. Company Size */}
            <div>
              <label className="block text-[13px] font-space-mono text-gray-300 uppercase tracking-wider mb-3">Company Size</label>
              <div className="grid grid-cols-4 gap-2 bg-white/5 border border-white/10 rounded-xl p-1">
                {["50", "250", "1000", "5000+"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setCompanySize(size)}
                    className={`py-2 rounded-lg text-[13px] font-plus-jakarta-sans font-semibold transition-all cursor-pointer ${
                      companySize === size
                        ? "bg-gradient-to-r from-[#3B6FFF] to-[#E040FB] text-white shadow-[0_0_15px_rgba(139,63,255,0.3)]"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {size === "5000+" ? "5,000+" : size}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Monthly Spend */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[13px] font-space-mono text-gray-300 uppercase tracking-wider">Monthly Process Spend</label>
                <span className="font-space-mono text-[#F5C842] font-bold text-[14px]">{formatCurrency(monthlySpend)}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="500000"
                step="5000"
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#F5C842]"
              />
              <div className="flex justify-between text-[10px] font-space-mono text-gray-500 mt-2">
                <span>$10,000</span>
                <span>$250,000</span>
                <span>$500,000</span>
              </div>
            </div>

            {/* 3. Primary Use Case */}
            <div>
              <label className="block text-[13px] font-space-mono text-gray-300 uppercase tracking-wider mb-3">Primary Use Case</label>
              <select
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                className="w-full h-[52px] bg-white/5 border border-white/10 rounded-xl px-4 text-white font-plus-jakarta-sans text-[14px] cursor-pointer focus:outline-none focus:border-[#E040FB] transition-colors"
              >
                <option value="Customer Support Automation" className="bg-[#0A0F1E]">Customer Support Automation</option>
                <option value="Data Analysis" className="bg-[#0A0F1E]">Data Analysis</option>
                <option value="Sales Intelligence" className="bg-[#0A0F1E]">Sales Intelligence</option>
                <option value="Operations" className="bg-[#0A0F1E]">Operations & Supply Chain</option>
                <option value="Compliance" className="bg-[#0A0F1E]">Compliance & Risk Audit</option>
                <option value="Other" className="bg-[#0A0F1E]">Other Business Processes</option>
              </select>
            </div>

            {/* 4. AI Maturity Level */}
            <div>
              <label className="block text-[13px] font-space-mono text-gray-300 uppercase tracking-wider mb-3">AI Maturity Level</label>
              <div className="grid grid-cols-4 gap-1.5 bg-white/5 border border-white/10 rounded-xl p-1">
                {["None", "Exploring", "Piloting", "Scaling"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setMaturityLevel(level)}
                    className={`py-2 px-1 rounded-lg text-[12px] font-plus-jakarta-sans font-semibold transition-all cursor-pointer ${
                      maturityLevel === level
                        ? "bg-white/10 border border-white/15 text-white shadow-[0_0_10px_rgba(255,255,255,0.05)]"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS PANEL */}
        <div className="w-full lg:w-1/2 p-8 md:p-10 bg-[#050914] flex flex-col justify-between relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(139,63,255,0.05),transparent_70%)] pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-plus-jakarta-sans font-bold text-white text-[20px] flex items-center gap-2">
                <Sparkles className="text-[#F5C842]" size={18} /> Projected Outcomes
              </h3>
              <span className="px-2.5 py-1 rounded-full bg-[#F5C842]/10 border border-[#F5C842]/20 text-[#F5C842] font-space-mono text-[9px] uppercase tracking-widest font-bold">Live Estimate</span>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Savings Card */}
              <div className="col-span-2 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 hover:border-[#E040FB]/30 transition-all">
                <span className="text-[11px] font-space-mono text-gray-400 uppercase tracking-wider block mb-1">Projected Annual Savings</span>
                <div className="text-[32px] md:text-[38px] font-plus-jakarta-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                  <AnimatedValue value={annualSavings} formatter={formatCurrency} />
                </div>
              </div>

              {/* Year 1 ROI */}
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 flex flex-col justify-between hover:border-[#00D9FF]/30 transition-all">
                <div>
                  <TrendingUp className="text-[#00D9FF] mb-3" size={18} />
                  <span className="text-[11px] font-space-mono text-gray-400 uppercase tracking-wider block">Year 1 ROI</span>
                </div>
                <div className="text-[24px] font-plus-jakarta-sans font-black text-[#00D9FF] mt-2">
                  <AnimatedValue value={roiYear1} formatter={formatPercentage} />
                </div>
              </div>

              {/* Year 3 ROI */}
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 flex flex-col justify-between hover:border-[#E040FB]/30 transition-all">
                <div>
                  <TrendingUp className="text-[#E040FB] mb-3" size={18} />
                  <span className="text-[11px] font-space-mono text-gray-400 uppercase tracking-wider block">Year 3 ROI</span>
                </div>
                <div className="text-[24px] font-plus-jakarta-sans font-black text-[#E040FB] mt-2">
                  <AnimatedValue value={roiYear3} formatter={formatPercentage} />
                </div>
              </div>

              {/* Break Even */}
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 flex flex-col justify-between hover:border-[#F5C842]/30 transition-all">
                <div>
                  <Clock className="text-[#F5C842] mb-3" size={18} />
                  <span className="text-[11px] font-space-mono text-gray-400 uppercase tracking-wider block">Break-Even Time</span>
                </div>
                <div className="text-[24px] font-plus-jakarta-sans font-black text-[#F5C842] mt-2">
                  <AnimatedValue value={breakEven} formatter={formatMonths} />
                </div>
              </div>

              {/* Productivity Multiplier */}
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-400/30 transition-all">
                <div>
                  <Zap className="text-emerald-400 mb-3" size={18} />
                  <span className="text-[11px] font-space-mono text-gray-400 uppercase tracking-wider block">Productivity Multiplier</span>
                </div>
                <div className="text-[24px] font-plus-jakarta-sans font-black text-emerald-400 mt-2">
                  <AnimatedValue value={productivityMultiplier} formatter={formatMultiplier} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary w-full h-[52px] text-[14px] uppercase tracking-wider font-bold"
            >
              Get Custom Analysis Report
            </button>
            <p className="text-[10px] font-inter text-gray-500 text-center mt-3 leading-relaxed">
              * Estimates based on industry benchmarks. Actual results vary.
            </p>
          </div>
        </div>
      </div>

      {/* LEAD CAPTURE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#000000]/80 backdrop-blur-md"
            ></motion.div>

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-[500px] bg-[#0A0F1E] border border-[#ffffff10] rounded-[24px] p-8 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#3b6fff]/5 to-[#e040fb]/5 pointer-events-none"></div>

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>

              {formSubmitted ? (
                <div className="text-center py-6 flex flex-col items-center justify-center animate-fade-in">
                  <div className="text-emerald-400 mb-6 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                    <CheckCircle2 size={72} strokeWidth={1.5} />
                  </div>
                  <h4 className="font-plus-jakarta-sans font-bold text-white text-[24px] mb-3">Analysis Queued</h4>
                  <p className="font-inter text-gray-300 text-[14px] leading-relaxed max-w-[340px] mb-8">
                    We've compiled your inputs. A detailed PDF report is being drafted and will be sent to your inbox within 2 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setFormSubmitted(false);
                    }}
                    className="btn-ghost !text-white px-8"
                  >
                    Return to Calculator
                  </button>
                </div>
              ) : (
                <div>
                  <h4 className="font-plus-jakarta-sans font-bold text-white text-[22px] mb-2 flex items-center gap-2">
                    <Sparkles className="text-[#F5C842]" size={20} /> Personalized Audit
                  </h4>
                  <p className="font-inter text-gray-400 text-[13px] leading-relaxed mb-6">
                    Enter your coordinates below. We will send a full, customized feasibility model and resource plan directly to your inbox.
                  </p>

                  <form ref={formRef} onSubmit={handleModalSubmit} className="flex flex-col gap-4">
                    <input
                      type="text"
                      name="user_name"
                      placeholder="Full Name *"
                      required
                      className="glass-input !bg-white/5 !text-white !border-white/10 w-full h-[50px] px-4 font-inter text-[14px]"
                    />
                    <input
                      type="email"
                      name="user_email"
                      placeholder="Work Email *"
                      required
                      className="glass-input !bg-white/5 !text-white !border-white/10 w-full h-[50px] px-4 font-inter text-[14px]"
                    />
                    <div className="flex gap-4">
                      <input
                        type="text"
                        name="company"
                        placeholder="Company *"
                        required
                        className="glass-input !bg-white/5 !text-white !border-white/10 flex-1 h-[50px] px-4 font-inter text-[14px]"
                      />
                      <input
                        type="text"
                        name="role"
                        placeholder="Role"
                        className="glass-input !bg-white/5 !text-white !border-white/10 flex-1 h-[50px] px-4 font-inter text-[14px]"
                      />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      className="glass-input !bg-white/5 !text-white !border-white/10 w-full h-[50px] px-4 font-inter text-[14px]"
                    />

                    {modalError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 font-inter text-[13px]">
                        <ShieldAlert size={16} />
                        <span>{modalError}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSending}
                      className="btn-primary w-full h-[52px] text-[14px] uppercase tracking-wider font-bold mt-2 disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSending ? "Compiling Analysis..." : "Request Detailed Report →"}
                    </button>
                    <p className="text-[10px] font-space-mono text-gray-500 text-center uppercase tracking-wider mt-2">
                      🔒 Private & Secure · 100% GDPR Compliant
                    </p>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
