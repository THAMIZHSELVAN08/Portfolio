export const site = {
  name: "Thamizh Selvan",
  initials: "TS",
  role: "Full-Stack Developer · Software Engineer",
  headline: "I build digital experiences.",
  subline:
    "Full-stack web apps, backend systems, and secure, data-driven platforms, built for real users at scale.",
  location: "Chennai, India",
  email: "thamizhselvan326@gmail.com",
  linkedin: "https://linkedin.com/in/thamizhselvan1/",
  github: "https://github.com/THAMIZHSELVAN08",
  forese: "https://forese.co.in",
  resumePath: "/resume/Thamizh_Selvan_Resume.pdf",
  /** Processed 3D avatar (white background removed, transparent webp). */
  avatarPath: "/avatar.webp",

  /**
   * TODO_SITE_URL — production origin used for SEO, sitemap and robots.
   * Replace with your real domain (e.g. "https://thamizhselvan.dev"),
   * or set the NEXT_PUBLIC_SITE_URL environment variable instead.
   */
  siteUrl: "TODO_SITE_URL",

  seoDescription:
    "Portfolio of Thamizh Selvan, Full-Stack Developer & Software Engineer in Chennai, India — full-stack web apps, backend systems, and secure, data-driven platforms.",

  /** Home → about teaser + About page prose. */
  about: [
    "I’m a full-stack developer based in Chennai, India. I build with React, Next.js, Node.js, TypeScript, PostgreSQL and MongoDB, and I like owning a product end to end — from the database schema and API surface to the interface people actually use.",
    "Most of my work sits behind things people rely on: REST APIs, Google OAuth sign-in, role-based dashboards and data-driven platforms. Systems I’ve built have been used by 900+ students and 180+ HR volunteers — including a full-stack platform that runs large-scale mock placement interviews end to end.",
    "I care about the parts that make software durable — databases, security, clean workflows — and I keep pulling in what’s next, from GenAI and LLM integrations like Claude API and RAG pipelines to interactive web experiences. I also lead: President of ISTD SVCE, and previously Tech Head at FORESE, where I ran a development team of 6.",
  ],

  interests: [
    "Full-stack web",
    "Backend systems",
    "Databases",
    "Cybersecurity",
    "GenAI / LLM integrations (Claude API, RAG)",
    "Interactive web experiences",
  ],

  /** Shown on the About page; sourced from the same facts as the experience timeline. */
  leadership: [
    {
      org: "FORESE",
      role: "Tech Head",
      period: "Mar 2025 – Mar 2026",
      note: "Led a development team of 6 building technical platforms and web apps.",
      url: "https://forese.co.in",
    },
    {
      org: "ISTD SVCE",
      role: "President",
      period: "Jul 2026 – Present",
      note: "Organizes technical workshops, seminars and skill-development initiatives.",
      url: "",
    },
  ],

  /** Proof points — every figure comes from the project/experience facts. */
  stats: [
    { value: "900+", label: "students on OnlineMocks2026" },
    { value: "180+", label: "HR volunteers coordinated" },
    { value: "800+", label: "students in Mock Placements 2025" },
    { value: "100+", label: "HR professionals in Mock Placements 2025" },
  ],

  nav: [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Experience", href: "/experience" },
    { label: "Skills", href: "/skills" },
    { label: "Contact", href: "/contact" },
  ],

  footerNote: "© 2026 Thamizh Selvan A",
} as const;

export type Site = typeof site;
