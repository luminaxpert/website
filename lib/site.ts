// Central place for site-wide constants so links stay consistent everywhere.

export const SITE = {
  name: "LuminaXpert",
  tagline: "Illuminate Your Potential.",
  description:
    "LuminaXpert is an AI consultancy that helps enterprises and startups design, build and govern production-grade AI — from strategy and data foundations to agents, MLOps and responsible AI.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://luminaxpert.netlify.app").replace(/\/$/, ""),
  email: "hello@luminaxpert.com",
  privacyEmail: "privacy@luminaxpert.com",
  careersEmail: "careers@luminaxpert.com",
  phone: "+1 (555) 123-4567",
  hours: "Mon–Fri, 9am–6pm EST",
  calendly: "https://calendly.com/luminaxpert/30min",
} as const;

export const FOUNDER_LINKS = {
  linkedin: "https://www.linkedin.com/in/sibtain-syed",
  portfolio: "https://sibtainsyed.netlify.app/",
  scholar: "https://scholar.google.com/citations?user=H5y_i_sAAAAJ&hl=en",
} as const;

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: FOUNDER_LINKS.linkedin, kind: "linkedin" },
  { label: "Founder portfolio", href: FOUNDER_LINKS.portfolio, kind: "globe" },
  { label: "Email", href: `mailto:${SITE.email}`, kind: "mail" },
] as const;

// EmailJS public credentials (these are publishable keys by design).
export const EMAILJS = {
  serviceId: "service_lodv4s8",
  contactTemplate: "template_om6eji6",
  onboardingTemplate: "template_g1u77q4",
  publicKey: "rJmiQU1kmvt_kTBgf",
} as const;

export const SERVICES = [
  { id: 1, title: "AI Consulting", short: "Strategic readiness & AI roadmap planning" },
  { id: 2, title: "Digital Transformation", short: "Integrate intelligence at your operational core" },
  { id: 3, title: "Data & Analytics", short: "Extract high-precision business insights" },
  { id: 4, title: "AI Development", short: "Build & train custom model frameworks" },
  { id: 5, title: "Strategy & Roadmap", short: "12-month actionable operational blueprints" },
  { id: 6, title: "Training & Enablement", short: "Upskill staff to leverage AI pipelines" },
  { id: 7, title: "AI Agents & Automation", short: "Goal-oriented agentic workflows & LLM RPA" },
  { id: 8, title: "MLOps & Model Governance", short: "Registries, drift alerts & retraining" },
  { id: 9, title: "Responsible & Ethical AI", short: "EU AI Act, bias & transparency audits" },
] as const;
