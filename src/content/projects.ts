export type Screenshot = {
  /** Path under /public, e.g. "/projects/onlinemocks2026/dashboard.png" */
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  /** Optional second line under the title, e.g. product category. */
  subtitle: string;
  /** One-liner shown on cards and page headers. */
  summary: string;
  role: string;
  year: string;
  stack: string[];
  scope: string[];
  overview: string;
  problem: string;
  approach: string;
  keyFeatures: string[];
  challenges: string;
  outcome: string;
  github: string;
  liveDemo: string;
  screenshots: Screenshot[];
};

/**
 * Editing guide (see README):
 * - Unknown text fields hold a "TODO_*" placeholder — the UI hides them automatically.
 * - liveDemo: replace TODO_LIVE_DEMO_URL with a real URL to unlock the demo button.
 * - screenshots: drop images in /public/projects/<slug>/ and list them here.
 */
export const projects: Project[] = [
  {
    slug: "onlinemocks2026",
    title: "OnlineMocks2026",
    subtitle: "Online Mocks HR Software",
    summary:
      "Full-stack platform managing large-scale mock placement interviews end to end.",
    role: "TODO_ROLE",
    year: "TODO_YEAR",
    stack: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    scope: [
      "Full-stack platform",
      "Role-based dashboards",
      "CRUD workflows",
    ],
    overview:
      "A full-stack platform for running mock placement interviews at scale. It covers the whole flow — resume management, HR allocation, interview tracking and evaluation workflows — with organizer dashboards for the team running it, and responsive, reusable UI components tailored to each user role.",
    problem:
      "Large-scale mock placement interviews involve 900+ students and 180+ HR volunteers, with resumes, allocation, scheduling and evaluation all having to stay in sync.",
    approach:
      "Built on Next.js, Node.js, MongoDB and Tailwind CSS, structured around CRUD workflows for students, HR volunteers, interviews and related data, with responsive, reusable components for each role.",
    keyFeatures: [
      "Resume management",
      "HR volunteer allocation",
      "Interview tracking",
      "Evaluation workflows",
      "Organizer dashboards",
      "Role-specific responsive UI components",
      "Structured CRUD workflows for students, HR volunteers and interviews",
    ],
    challenges: "TODO_CHALLENGES",
    outcome:
      "Running a large-scale mock placement initiative in production — supporting 900+ students and 180+ HR volunteers.",
    github: "https://github.com/THAMIZHSELVAN08/Onlinemocks2026",
    liveDemo: "TODO_LIVE_DEMO_URL",
    screenshots: [],
  },
  {
    slug: "hr-db",
    title: "HR-DB",
    subtitle: "HR Contact Management System",
    summary:
      "Role-based HR contact management platform with secure auth and responsive dashboards.",
    role: "TODO_ROLE",
    year: "TODO_YEAR",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "REST APIs", "Tailwind CSS"],
    scope: ["Role-based access", "Google OAuth", "REST APIs", "Dashboards"],
    overview:
      "A role-based platform for managing HR contact data — secure Google OAuth authentication, structured REST APIs over PostgreSQL, and responsive dashboards built around optimized user flows.",
    problem:
      "Managing structured HR contact data across teams requires secure access, clear roles, and fast, predictable workflows.",
    approach:
      "Secure Google OAuth authentication with role-based workflows, REST APIs for retrieving and managing structured HR data, PostgreSQL for the relational layer, and a responsive dashboard UI designed for efficient user flows.",
    keyFeatures: [
      "Role-based HR contact management",
      "Responsive dashboards",
      "Secure Google OAuth authentication",
      "REST APIs for structured HR data",
      "PostgreSQL relational data layer",
      "Optimized user flows",
    ],
    challenges: "TODO_CHALLENGES",
    outcome:
      "Improved workflow efficiency by 70% through structured UI design and optimized user flows.",
    github: "https://github.com/THAMIZHSELVAN08/hr-database26",
    liveDemo: "TODO_LIVE_DEMO_URL",
    screenshots: [],
  },
  {
    slug: "aegis",
    title: "Aegis",
    subtitle: "Smart-Grid Cybersecurity",
    summary: "ML-driven anomaly detection for smart-grid security.",
    role: "TODO_ROLE",
    year: "TODO_YEAR",
    stack: [],
    scope: ["Machine learning", "Cybersecurity", "Smart grid"],
    overview: "TODO_OVERVIEW",
    problem: "TODO_PROBLEM",
    approach: "TODO_APPROACH",
    keyFeatures: [],
    challenges: "TODO_CHALLENGES",
    outcome: "TODO_OUTCOME",
    github: "https://github.com/THAMIZHSELVAN08/aegis",
    liveDemo: "TODO_LIVE_DEMO_URL",
    screenshots: [],
  },
  {
    slug: "report-generation-system",
    title: "Report Generation System",
    subtitle: "",
    summary: "TODO_SUMMARY",
    role: "TODO_ROLE",
    year: "TODO_YEAR",
    stack: [],
    scope: [],
    overview: "TODO_OVERVIEW",
    problem: "TODO_PROBLEM",
    approach: "TODO_APPROACH",
    keyFeatures: [],
    challenges: "TODO_CHALLENGES",
    outcome: "TODO_OUTCOME",
    github: "https://github.com/THAMIZHSELVAN08/report_generation",
    liveDemo: "TODO_LIVE_DEMO_URL",
    screenshots: [],
  },
];

export type AlsoBuilt = {
  title: string;
  url: string;
  note: string;
};

export const alsoBuilt: AlsoBuilt[] = [
  {
    title: "PULSE’26 AEEE Symposium Website",
    url: "https://pulse26.vercel.app",
    note: "Symposium website",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectIndex(slug: string): number {
  return projects.findIndex((p) => p.slug === slug);
}
