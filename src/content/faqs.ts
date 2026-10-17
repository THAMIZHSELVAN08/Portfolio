/**
 * FAQ content — every answer is drawn from verified facts only
 * (stack, location, shipped systems, contact routes). Add or edit
 * freely; the accordion hides nothing.
 */
export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "What do you build?",
    answer:
      "Full-stack web apps, backend systems, and secure, data-driven platforms — from the database schema and API surface to the interface people actually use.",
  },
  {
    question: "What’s your stack?",
    answer:
      "React, Next.js, Node.js, TypeScript, PostgreSQL and MongoDB on the application side, with Tailwind CSS on the front end, REST APIs and Google OAuth underneath, and Docker/Git in the workflow.",
  },
  {
    question: "Has your work been used at scale?",
    answer:
      "Yes — systems I’ve built have been used by 900+ students and 180+ HR volunteers, including a full-stack platform that runs large-scale mock placement interviews end to end.",
  },
  {
    question: "Where are you based?",
    answer:
      "Chennai, India. I work with teams remotely and am open to opportunities there and beyond.",
  },
  {
    question: "Do you have a résumé?",
    answer:
      "Yes — it’s one click away on any page via the Resume button, or from the link in the footer.",
  },
  {
    question: "How do I reach you?",
    answer:
      "Email is the fastest route: thamizhselvan326@gmail.com. There’s a copy button on the contact page, plus links to my GitHub and LinkedIn.",
  },
];
