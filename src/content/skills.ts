export type SkillGroup = {
  id: string;
  label: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    skills: ["HTML5", "CSS3", "React.js", "Next.js", "Tailwind CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    skills: ["Node.js", "Express.js", "RESTful APIs"],
  },
  {
    id: "databases",
    label: "Databases",
    skills: ["PostgreSQL", "MongoDB", "SQL"],
  },
  {
    id: "auth-security",
    label: "Auth & Security",
    skills: [
      "OAuth (Google)",
      "Authentication & Authorization",
      "Nmap",
      "Burp Suite",
    ],
  },
  {
    id: "tooling",
    label: "Tooling",
    skills: [
      "Git",
      "GitHub",
      "Linux",
      "Docker",
      "API integration",
      "Debugging",
      "Responsive design",
    ],
  },
  {
    id: "ai",
    label: "AI",
    skills: ["Claude API / LLM APIs", "RAG pipelines"],
  },
];

/** Flattened list for the home-page skills strip. */
export const allSkills: string[] = skillGroups.flatMap((g) => g.skills);
