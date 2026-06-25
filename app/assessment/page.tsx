"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { 
  ChevronLeft, Award, CheckCircle2, ShieldAlert, 
  ArrowRight, Lock, Sparkles, Brain, Database, Users, Cpu, FileCheck 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LuminaBackground from "@/components/LuminaBackground";
import ScrollReveal from "@/components/ScrollReveal";
import emailjs from "@emailjs/browser";

const questions = [
  {
    category: "Strategy",
    icon: <Brain className="text-[#00D9FF]" size={24} />,
    question: "Does your organization have a documented AI strategy?",
    options: [
      { text: "No strategy or formal roadmap at all.", value: 1 },
      { text: "Informal discussions or siloed team-level ideas.", value: 2 },
      { text: "Strategy in progress / draft roadmap being compiled.", value: 3 },
      { text: "Fully documented, board-approved, and aligned with core business.", value: 4 }
    ]
  },
  {
    category: "Data",
    icon: <Database className="text-[#00F5A0]" size={24} />,
    question: "How would you describe your data infrastructure?",
    options: [
      { text: "Fragmented, siloed databases, and poor data quality.", value: 1 },
      { text: "Partially centralized data warehouse but with major quality issues.", value: 2 },
      { text: "Centralized data lake with basic ingestion pipelines.", value: 3 },
      { text: "Unified data plane, fully governed, cleaned, and AI-ready.", value: 4 }
    ]
  },
  {
    category: "Talent",
    icon: <Users className="text-[#FFD166]" size={24} />,
    question: "What is your current internal AI capability?",
    options: [
      { text: "No dedicated AI engineers or data scientists.", value: 1 },
      { text: "1–2 data analysts managing basic analytics reports.", value: 2 },
      { text: "Small dedicated machine learning or data science team.", value: 3 },
      { text: "Full engineering team (ML, Data Ops, MLOps) delivering models.", value: 4 }
    ]
  },
  {
    category: "Deployment",
    icon: <Cpu className="text-[#3B6FFF]" size={24} />,
    question: "Have you deployed any AI models in production?",
    options: [
      { text: "None, zero models deployed.", value: 1 },
      { text: "Proof of concept / prototypes built but not productionized.", value: 2 },
      { text: "1–2 production models running but with manual monitoring.", value: 3 },
      { text: "5+ production models deployed with active drift/degradation monitors.", value: 4 }
    ]
  },
  {
    category: "Governance",
    icon: <FileCheck className="text-[#E040FB]" size={24} />,
    question: "How do you handle AI risk and compliance?",
    options: [
      { text: "Not currently addressed or evaluated.", value: 1 },
      { text: "Ad-hoc compliance audits only when issues arise.", value: 2 },
      { text: "Informal guidelines or guidelines limited to specific teams.", value: 3 },
      { text: "Formal AI governance board aligned with EU AI Act/NIST RMF.", value: 4 }
    ]
  }
];

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSelectOption = (value: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentStep] = value;
    setAnswers(updatedAnswers);

    // Auto-advance after a small delay
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowResults(true);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResults(false);
    setFormSubmitted(false);
  };

  const totalScore = answers.reduce((acc, curr) => acc + curr, 0);

  // Result logic
  let badgeTitle = "";
  let badgeColor = "";
  let badgeText = "";
  let recommendations: string[] = [];

  if (totalScore <= 8) {
    badgeTitle = "AI Beginner";
    badgeColor = "text-red-400 border-red-500/20 bg-red-500/5";
    badgeText = "Your organization is at the start of the AI journey. We recommend an AI Readiness Audit to map out your core capability gaps.";
    recommendations = [
      "Conduct a structured AI readiness audit.",
      "Execute basic data inventory mapping.",
      "Educate senior leadership on AI fundamentals."
    ];
  } else if (totalScore <= 13) {
    badgeTitle = "AI Explorer";
    badgeColor = "text-orange-400 border-orange-500/20 bg-orange-500/5";
    badgeText = "You have the foundations. A strategic roadmap will accelerate your progress significantly and help structure your database silos.";
    recommendations = [
      "Establish a centralized 12-month AI roadmap.",
      "Deploy 1–2 Proof of Concept (PoC) models to build momentum.",
      "Define standard security/risk guidelines."
    ];
  } else if (totalScore <= 17) {
    badgeTitle = "AI Practitioner";
    badgeColor = "text-[#3B6FFF] border-[#3B6FFF]/20 bg-[#3B6FFF]/5";
    badgeText = "Strong progress. Focus now on scaling, MLOps model governance, and expanding custom workflows to eliminate manual friction.";
    recommendations = [
      "Implement a centralized Model Registry.",
      "Deploy autonomous AI agents to optimize operations.",
      "Upskill internal analysts on custom model training."
    ];
  } else {
    badgeTitle = "AI Leader";
    badgeColor = "text-[#F5C842] border-[#F5C842]/20 bg-[#F5C842]/5";
    badgeText = "You're ahead of the curve. Our team can help you build advanced custom LLM networks, secure compliance, and maintain competitive advantage.";
    recommendations = [
      "Align models with EU AI Act and ISO 42001.",
      "Orchestrate multi-agent autonomous network workflows.",
      "Design advanced RLHF (Reinforcement Learning) models."
    ];
  }

  const handleReportRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);
    setErrorMsg("");

    // EmailJS keys
    const SERVICE_ID = "service_lodv4s8";
    const TEMPLATE_ID = "template_om6eji6";
    const PUBLIC_KEY = "rJmiQU1kmvt_kTBgf";

    try {
      const formData = new FormData(formRef.current);
      const templateParams = {
        name: formData.get("user_name"),
        email: formData.get("user_email"),
        title: `Maturity Report Request - ${badgeTitle}`,
        message: `Company: ${formData.get("company")}
Role: ${formData.get("role")}
Phone: ${formData.get("phone")}

Assessment Details:
- Maturity Score: ${totalScore}/20
- Level: ${badgeTitle}
- Strategy: Option ${answers[0]}
- Data: Option ${answers[1]}
- Talent: Option ${answers[2]}
- Deployment: Option ${answers[3]}
- Governance: Option ${answers[4]}
- Summary recommendations: ${recommendations.join(", ")}`,
        time: new Date().toLocaleString()
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setFormSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to queue your report. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const progressPercentage = ((currentStep) / questions.length) * 100;
  const radialOffset = 251.2 - (251.2 * (totalScore * 5)) / 100; // Total out of 20 = multiplier 5 for %

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      {/* Background Geometries */}
      <LuminaBackground />

      {/* HEADER */}
      <section className="relative min-h-[40vh] pt-[160px] pb-[40px] flex items-center bg-transparent overflow-hidden">
        <div className="absolute inset-0 ambient-right z-0 opacity-40"></div>
        <div className="container mx-auto px-5 md:px-20 max-w-[1280px] relative z-10 text-center flex flex-col items-center">
          <ScrollReveal>
            <div className="font-space-mono text-[11px] text-[#F5C842] tracking-widest uppercase mb-4 flex items-center gap-3">
              <Award size={16} /> Lead Magnet Tools
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h1 className="font-plus-jakarta-sans font-bold text-[48px] md:text-[64px] leading-[1.1] text-[#0D0D1F] tracking-tight mb-6">
              AI Maturity <span className="text-gradient">Assessment.</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="font-inter text-[18px] text-[#4A5568] max-w-[600px] mb-8">
              Evaluate your strategy, data, talent, deployment capability, and governance policies in 2 minutes. Receive personalized scaling recommendations immediately.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* QUIZ WORKSPACE */}
      <section className="relative py-8 bg-transparent z-10">
        <div className="container mx-auto px-5 md:px-20 max-w-[800px]">
          
          {!showResults ? (
            <div className="glass-card !bg-[#FFFFFF]/90 !border-[rgba(139,63,255,0.15)] p-8 md:p-10 rounded-[32px] shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#3b6fff]/2 to-[#e040fb]/2 pointer-events-none"></div>

              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-space-mono text-[10px] text-[#718096] uppercase tracking-widest">
                    Evaluation Progress
                  </span>
                  <span className="font-space-mono text-[#F5C842] font-bold text-[12px]">
                    Step {currentStep + 1} of {questions.length}
                  </span>
                </div>
                <div className="w-full h-1 bg-[#F0F4F8] rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#3B6FFF] to-[#E040FB]" 
                    animate={{ width: `${progressPercentage + 20}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Back Button */}
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 text-[#718096] hover:text-[#0D0D1F] font-space-mono text-[11px] uppercase tracking-wider mb-6 transition-colors cursor-pointer"
                >
                  <ChevronLeft size={14} /> Back
                </button>
              )}

              {/* Question Screen */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {questions[currentStep].icon}
                    <span className="font-space-mono text-[11px] text-[#F5C842] tracking-widest uppercase font-bold">
                      {questions[currentStep].category}
                    </span>
                  </div>

                  <h3 className="font-plus-jakarta-sans font-bold text-[20px] md:text-[24px] text-[#0D0D1F] mb-8">
                    {questions[currentStep].question}
                  </h3>

                  <div className="space-y-4">
                    {questions[currentStep].options.map((option, idx) => {
                      const letter = ["A", "B", "C", "D"][idx];
                      const isSelected = answers[currentStep] === option.value;
                      
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(option.value)}
                          className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer flex gap-4 items-center ${
                            isSelected 
                              ? "bg-[#E2E8F0] border-[#F5C842] text-[#0D0D1F] shadow-[0_0_15px_rgba(245,200,66,0.1)]" 
                              : "bg-[#F8F9FA] border-[rgba(139,63,255,0.15)] hover:border-[rgba(139,63,255,0.3)] text-[#4A5568] hover:text-[#0D0D1F]"
                          }`}
                        >
                          <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-space-mono text-[13px] font-bold shrink-0 ${
                            isSelected ? "bg-[#F5C842] text-[#0A0F1E]" : "bg-[#F0F4F8] border border-[rgba(139,63,255,0.15)] text-[#718096]"
                          }`}>
                            {letter}
                          </span>
                          <span className="font-inter text-[15px] leading-relaxed">
                            {option.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            /* RESULTS SCREEN */
            <div className="glass-card !bg-[#FFFFFF]/90 !border-[rgba(139,63,255,0.15)] p-8 md:p-12 rounded-[32px] shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(139,63,255,0.06),transparent_70%)] pointer-events-none"></div>

              {formSubmitted ? (
                <div className="text-center py-10 flex flex-col items-center justify-center animate-fade-in">
                  <div className="text-emerald-400 mb-6 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                    <CheckCircle2 size={72} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-plus-jakarta-sans font-bold text-[#0D0D1F] text-[28px] mb-3">Report Queued</h3>
                  <p className="font-inter text-[#4A5568] text-[15px] leading-relaxed max-w-[420px] mb-8">
                    Your detailed AI feasibility study and structured resource recommendations have been scheduled. A PDF copy is heading to your email.
                  </p>
                  
                  <div className="flex gap-4">
                    <Link href="/booking" className="btn-primary">Book Consultation</Link>
                    <button onClick={resetQuiz} className="btn-ghost !text-[#0D0D1F]">Restart Quiz</button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-10 items-stretch">
                  {/* Radial Ring Column */}
                  <div className="w-full md:w-[35%] flex flex-col items-center justify-between text-center border-b md:border-b-0 md:border-r border-[rgba(139,63,255,0.15)] pb-8 md:pb-0 md:pr-8">
                    <div>
                      <span className="font-space-mono text-[10px] text-[#718096] uppercase tracking-widest block mb-4">Your Maturity Score</span>
                      
                      {/* Radial Ring SVG */}
                      <div className="relative w-36 h-36 flex items-center justify-center mb-6">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="72" cy="72" r="40" stroke="rgba(255,255,255,0.03)" strokeWidth="8" fill="transparent" />
                          <motion.circle 
                            cx="72" cy="72" r="40" 
                            stroke="#F5C842" strokeWidth="8" fill="transparent" 
                            strokeDasharray="251.2"
                            initial={{ strokeDashoffset: 251.2 }}
                            animate={{ strokeDashoffset: radialOffset }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="font-plus-jakarta-sans font-black text-[#0D0D1F] text-[32px]">{totalScore}</span>
                          <span className="font-space-mono text-[#718096] text-[10px] uppercase">out of 20</span>
                        </div>
                      </div>

                      <div className={`px-4 py-1.5 rounded-full border font-space-mono text-[11px] font-bold uppercase tracking-wider ${badgeColor} inline-block`}>
                        {badgeTitle}
                      </div>
                    </div>

                    <button
                      onClick={resetQuiz}
                      className="mt-6 md:mt-0 font-space-mono text-[11px] text-[#F5C842] uppercase tracking-wider hover:underline cursor-pointer"
                    >
                      ← Take Quiz Again
                    </button>
                  </div>

                  {/* Recommendations & Form Column */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-plus-jakarta-sans font-bold text-[#0D0D1F] text-[20px] mb-3">Personalized Findings</h4>
                      <p className="font-inter text-[#4A5568] text-[14px] leading-relaxed mb-6">
                        {badgeText}
                      </p>

                      <div className="mb-8">
                        <span className="font-space-mono text-[10px] text-[#718096] uppercase tracking-widest block mb-3">Key Next Steps</span>
                        <ul className="space-y-2">
                          {recommendations.map((rec, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-[13px] font-inter text-[#4A5568]">
                              <span className="text-[#00D9FF] font-bold mt-0.5">✓</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Email Capture CTA */}
                    <div className="bg-[#F8F9FA] border border-[rgba(139,63,255,0.15)] rounded-2xl p-6">
                      <span className="font-plus-jakarta-sans font-bold text-[#0D0D1F] text-[15px] mb-1.5 flex items-center gap-1.5">
                        <Sparkles size={14} className="text-[#F5C842]" /> Get Full PDF Report
                      </span>
                      <p className="font-inter text-[#718096] text-[12px] mb-4">
                        Download your customized 12-page AI Strategy Guide containing detailed technical implementations.
                      </p>

                      <form ref={formRef} onSubmit={handleReportRequest} className="space-y-3">
                        <input
                          type="text"
                          name="user_name"
                          placeholder="Your Name *"
                          required
                          className="glass-input !bg-[#F0F4F8] !text-[#0D0D1F] !border-[rgba(139,63,255,0.15)] w-full h-[52px] px-5 py-3 rounded-xl font-inter text-[13px]"
                        />
                        <input
                          type="email"
                          name="user_email"
                          placeholder="Work Email *"
                          required
                          className="glass-input !bg-[#F0F4F8] !text-[#0D0D1F] !border-[rgba(139,63,255,0.15)] w-full h-[52px] px-5 py-3 rounded-xl font-inter text-[13px]"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            name="company"
                            placeholder="Company *"
                            required
                            className="glass-input !bg-[#F0F4F8] !text-[#0D0D1F] !border-[rgba(139,63,255,0.15)] flex-1 h-[52px] px-5 py-3 rounded-xl font-inter text-[13px]"
                          />
                          <input
                            type="text"
                            name="role"
                            placeholder="Role"
                            className="glass-input !bg-[#F0F4F8] !text-[#0D0D1F] !border-[rgba(139,63,255,0.15)] flex-1 h-[52px] px-5 py-3 rounded-xl font-inter text-[13px]"
                          />
                        </div>

                        {errorMsg && (
                          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 font-inter text-[12px]">
                            <ShieldAlert size={14} />
                            <span>{errorMsg}</span>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isSending}
                          className="btn-primary w-full h-[46px] text-[13px] uppercase tracking-wider font-bold mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                        >
                          {isSending ? "Compiling PDF..." : "Download Full PDF Report"} <ArrowRight size={14} />
                        </button>
                        <p className="text-[9px] font-space-mono text-[#718096] text-center uppercase tracking-wider mt-1.5 flex items-center justify-center gap-1 select-none">
                          <Lock size={10} /> Private & Secure · GDPR Compliant
                        </p>
                      </form>
                    </div>

                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
