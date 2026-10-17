export type ExperienceItem = {
  id: string;
  role: string;
  /** Organisation or initiative name. Empty string hides the line. */
  org: string;
  orgUrl: string;
  period: string;
  current: boolean;
  summary: string;
  highlights: string[];
};

/** Newest first. */
export const experience: ExperienceItem[] = [
  {
    id: "istd-president",
    role: "President",
    org: "ISTD SVCE",
    orgUrl: "",
    period: "Jul 2026 – Present",
    current: true,
    summary:
      "Organizes technical workshops, seminars and skill-development initiatives.",
    highlights: [
      "Coordinates teams, requirements, timelines and execution for technical events.",
    ],
  },
  {
    id: "forese-tech-head",
    role: "Tech Head",
    org: "FORESE",
    orgUrl: "https://forese.co.in",
    period: "Mar 2025 – Mar 2026",
    current: false,
    summary:
      "Led a development team of 6 building technical platforms and web apps.",
    highlights: [
      "Managed project planning and feature implementation.",
      "Owned technical decisions and development workflows.",
    ],
  },
  {
    id: "mock-placements-2025",
    role: "Mock Placements 2025",
    org: "",
    orgUrl: "",
    period: "Mar 2025",
    current: false,
    summary:
      "Organized a large-scale mock placement initiative with 100+ HR professionals and 800+ students.",
    highlights: [
      "Coordinated interview scheduling, evaluation workflows, volunteer management and student allocation.",
    ],
  },
  {
    id: "vcodez-intern",
    role: "Full Stack Developer Intern",
    org: "VCodez",
    orgUrl: "",
    period: "Jan 2025 – Mar 2025",
    current: false,
    summary:
      "Built and maintained React.js UI components integrated with backend APIs.",
    highlights: [
      "Connected frontend workflows with backend services and REST APIs.",
    ],
  },
];

export type Award = {
  kind: "Hackathon" | "Award" | "Certification";
  title: string;
  issuer?: string;
  year?: string;
  url?: string;
};

/**
 * Hackathons / awards / certifications.
 * The section on /experience stays hidden while this list is empty —
 * add entries here and it appears automatically.
 */
export const awards: Award[] = [];
