import { FOUNDER_LINKS, SITE } from "./site";

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  tags?: string[];
  links: { linkedin?: string; portfolio?: string; scholar?: string; email?: string };
}

export const FOUNDERS: TeamMember[] = [
  {
    name: "Sibtain Syed",
    role: "CEO & Co-founder",
    bio: "Enterprise architect and AI strategist behind LuminaXpert's vision and global expansion. Sibtain specialises in AI strategy, research-driven delivery and human–machine alignment.",
    image: "/images/team/sibtain.webp",
    tags: ["AI Strategy", "Enterprise Architecture", "Research"],
    links: {
      linkedin: FOUNDER_LINKS.linkedin,
      portfolio: FOUNDER_LINKS.portfolio,
      scholar: FOUNDER_LINKS.scholar,
      email: SITE.email,
    },
  },
  {
    name: "Faizan Ahmed",
    role: "CTO & Co-founder",
    bio: "Deep-learning specialist and architect of our AI orchestration engine. Faizan leads engineering — from MLOps platforms to autonomous, agentic workflows in production.",
    image: "/images/team/faizan.webp",
    tags: ["MLOps", "Agentic Systems", "LLM Engineering"],
    links: { email: SITE.email },
  },
];

export const PRACTICE_LEADS = [
  {
    name: "Dr. Sarah Chen",
    title: "Chief AI Officer",
    bio: "15 years building production AI systems at scale, with published work in neural architecture search.",
    initials: "SC",
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    tags: ["LLM Architecture", "Neural Networks", "NLP & CV"],
  },
  {
    name: "Marcus Reid",
    title: "Head of Strategy",
    bio: "Former management consultant who has designed AI roadmaps and operating models for over 30 Fortune 500 companies.",
    initials: "MR",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    tags: ["AI Strategy", "ROI Modeling", "Operating Models"],
  },
  {
    name: "Aisha Patel",
    title: "VP of Engineering",
    bio: "Led machine-learning infrastructure teams at high-growth fintech and data-platform companies; 200+ model deployments.",
    initials: "AP",
    gradient: "from-teal-500 via-cyan-500 to-blue-500",
    tags: ["MLOps Infrastructure", "Data Pipelines", "Model Governance"],
  },
  {
    name: "Thomas Vogel",
    title: "Head of Data Science",
    bio: "PhD in statistical learning; a decade of experience in quantitative finance and risk-engineering AI.",
    initials: "TV",
    gradient: "from-amber-500 via-orange-500 to-yellow-500",
    tags: ["Statistical Learning", "Anomaly Detection", "Risk Analysis"],
  },
];
