/* ── Payload types ── */

export interface SkillCategory {
  key: string;
  skills: string[];
}

export interface Project {
  key: string;
  name: string;
  tagline: string;
  highlights: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl: string;
  monogram: string;
  imagePath: string;
}

/* ── Locale metadata ── */
export interface LocaleMeta {
  code: string;
  label: string;
  nativeLabel: string;
  dir: "ltr" | "rtl";
}

export const SUPPORTED_LOCALES: LocaleMeta[] = [
  { code: "en", label: "English", nativeLabel: "English", dir: "ltr" },
  { code: "pt-BR", label: "Portuguese (BR)", nativeLabel: "Português (BR)", dir: "ltr" },
  { code: "es", label: "Spanish", nativeLabel: "Español", dir: "ltr" },
  { code: "fr", label: "French", nativeLabel: "Français", dir: "ltr" },
  { code: "de", label: "German", nativeLabel: "Deutsch", dir: "ltr" },
  { code: "ja", label: "Japanese", nativeLabel: "日本語", dir: "ltr" },
  { code: "zh", label: "Chinese", nativeLabel: "中文", dir: "ltr" },
  { code: "ru", label: "Russian", nativeLabel: "Русский", dir: "ltr" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", dir: "rtl" },
];

/* ── Skill categories ── */

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    key: "languages",
    skills: ["Python", "TypeScript", "JavaScript", "SQL"],
  },
  {
    key: "frontend",
    skills: [
      "React",
      "Next.js 14",
      "Tailwind CSS",
      "Zustand",
      "React Query",
      "next-intl",
    ],
  },
  {
    key: "backend",
    skills: [
      "FastAPI",
      "SQLAlchemy",
      "Alembic",
      "Pydantic",
      "JWT/OAuth2",
      "REST",
    ],
  },
  {
    key: "ai",
    skills: [
      "LangChain",
      "CrewAI",
      "LLM Orchestration",
      "OpenAI API",
    ],
  },
  {
    key: "databases",
    skills: [
      "PostgreSQL",
      "Supabase",
      "Redis",
      "Alembic Migrations",
    ],
  },
  {
    key: "devops",
    skills: [
      "Docker",
      "AWS",
      "Railway",
      "Vercel",
      "Cloudflare",
      "GitHub Actions",
    ],
  },
  {
    key: "monitoring",
    skills: [
      "Sentry",
      "Prometheus",
      "Grafana",
      "PostHog",
    ],
  },
  {
    key: "tools",
    skills: [
      "Git",
      "GitHub",
      "Poetry",
      "Pyright",
      "Celery",
      "RabbitMQ",
      "Resend",
    ],
  },
];

/* ── Skill category icons (heroicon-style names) ── */
export const SKILL_CATEGORY_ICONS: Record<string, string> = {
  languages: "code",
  frontend: "window",
  backend: "server",
  ai: "brain",
  databases: "database",
  devops: "cloud",
  monitoring: "chart",
  tools: "wrench",
};

/* ── Projects ── */

export const PROJECTS: Project[] = [
  {
    key: "psi",
    name: "PaySentinelIQ",
    tagline: "AI-Powered Payment Fraud Detection SaaS",
    highlights: [
      "Multi-stage AI pipeline: OCR → extraction → 7-phase LLM analysis → 5-tier risk score (0–100)",
      "FastAPI + Clean Architecture backend with SQLAlchemy ORM and Alembic",
      "Multi-agent collaboration via CrewAI — Gemini + DeepSeek orchestration",
      "Full CI/CD: GitHub Actions → Railway (API) + Vercel (frontend)",
    ],
    techStack: [
      "Next.js",
      "FastAPI",
      "CrewAI",
      "PostgreSQL",
      "Docker",
      "Railway",
      "Vercel",
    ],
    liveUrl: "https://pay-sentinel-iq.vercel.app",
    githubUrl: "https://github.com/ViChagas07/PaySentinelIQ",
    monogram: "PSI",
    imagePath: "/projects/paysentinel-iq.png",
  },
  {
    key: "pytomatiza",
    name: "Pytomatiza+",
    tagline: "Intelligent Automation Platform with AI Agents",
    highlights: [
      "CrewAI/LangChain agent pipelines for multi-domain workflow automation",
      "Next.js frontend + FastAPI backend with Docker containerisation",
      "Production deployments on Railway + Vercel with env-aware CI/CD",
      "Configurable agent tools enabling non-technical users to compose automations",
    ],
    techStack: [
      "Next.js",
      "FastAPI",
      "LangChain",
      "CrewAI",
      "Docker",
      "Railway",
      "Vercel",
    ],
    liveUrl: "https://pytomatiza.vercel.app",
    githubUrl: "https://github.com/ViChagas07/Pytomatiza",
    monogram: "PY+",
    imagePath: "/projects/pytomatiza.png",
  },
  {
    key: "clark",
    name: "ClarkPlayer",
    tagline: "Superman-Themed Full-Featured Music Player",
    highlights: [
      "Virtualized large track lists with react-window for 60fps performance",
      "Drag-and-drop playlist management via dnd-kit",
      "Redis session management + Resend email auth integration",
      "MusicBrainz, iTunes & Spotify API metadata enrichment",
    ],
    techStack: [
      "Next.js",
      "React",
      "Redis",
      "Resend",
      "dnd-kit",
      "Spotify API",
    ],
    liveUrl: "https://clark-player.vercel.app",
    githubUrl: "https://github.com/ViChagas07/ClarkPlayer",
    monogram: "CP",
    imagePath: "/projects/clarkplayer.png",
  },
  {
    key: "facilit",
    name: "FacilitBot",
    tagline: "WhatsApp AI Customer Service Automation",
    highlights: [
      "CrewAI agents + Z-API for intelligent WhatsApp conversation handling",
      "Flask backend with React Native (Expo) mobile frontend",
      "Built for a real home-appliance business client",
    ],
    techStack: [
      "Flask",
      "React Native",
      "CrewAI",
      "Z-API",
      "Expo",
      "Python",
    ],
    githubUrl: "https://github.com/ViChagas07/Facilit_Bot",
    monogram: "FB",
    imagePath: "/projects/facilitbot.jpg",
  },
];

/* ── Experience timeline ── */

export interface TimelineItem {
  key: string;
  titleKey: string;
  subtitleKey: string;
  periodKey: string;
  descriptionKey?: string;
  side: "left" | "right";
}

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    key: "freelance",
    titleKey: "experience.freelance.title",
    subtitleKey: "experience.freelance.subtitle",
    periodKey: "experience.freelance.period",
    side: "left",
  },
  {
    key: "it_intern",
    titleKey: "experience.it_intern.title",
    subtitleKey: "experience.it_intern.subtitle",
    periodKey: "experience.it_intern.period",
    side: "left",
  },
  {
    key: "bsc",
    titleKey: "experience.bsc.title",
    subtitleKey: "experience.bsc.subtitle",
    periodKey: "experience.bsc.period",
    side: "right",
  },
  {
    key: "technical",
    titleKey: "experience.technical.title",
    subtitleKey: "experience.technical.subtitle",
    periodKey: "experience.technical.period",
    side: "right",
  },
  {
    key: "english",
    titleKey: "experience.english.title",
    subtitleKey: "experience.english.subtitle",
    periodKey: "experience.english.period",
    side: "right",
  },
];

export interface Certification {
  key: string;
  nameKey: string;
  issuerKey: string;
  hoursKey: string;
  yearKey: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    key: "js_ts",
    nameKey: "certifications.js_ts.name",
    issuerKey: "certifications.js_ts.issuer",
    hoursKey: "certifications.js_ts.hours",
    yearKey: "certifications.js_ts.year",
  },
  {
    key: "python",
    nameKey: "certifications.python.name",
    issuerKey: "certifications.python.issuer",
    hoursKey: "certifications.python.hours",
    yearKey: "certifications.python.year",
  },
  {
    key: "git",
    nameKey: "certifications.git.name",
    issuerKey: "certifications.git.issuer",
    hoursKey: "certifications.git.hours",
    yearKey: "certifications.git.year",
  },
  {
    key: "excel",
    nameKey: "certifications.excel.name",
    issuerKey: "certifications.excel.issuer",
    hoursKey: "certifications.excel.hours",
    yearKey: "certifications.excel.year",
  },
];
