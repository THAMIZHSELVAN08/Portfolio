import type { Metadata } from "next";
import { alsoBuilt, projects } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";
import { Reveal, SplitHeading } from "@/components/motion";
import { ArrowUpRight } from "@/components/icons";
import { padIndex } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected full-stack projects by Thamizh Selvan — mock placement platforms, role-based dashboards, cybersecurity tooling and more.",
};

export default function WorkPage() {
  return (
    <>
      {/* Header */}
      <header className="mx-auto max-w-[92rem] px-5 pb-4 pt-32 md:px-10 md:pb-8 md:pt-44 lg:px-16">
        <Reveal>
          <p className="eyebrow text-fg/50">
            (Index) {padIndex(projects.length)} projects
          </p>
          <h1 className="display-xl mt-6 max-w-[12ch] text-balance">
            <SplitHeading text={"Selected\nwork."} />
          </h1>
          <p className="mt-8 max-w-[54ch] text-lg leading-relaxed text-fg/70">
            Each case study covers the problem, the approach, the stack and
            the outcome — with source code linked wherever it’s public.
          </p>
        </Reveal>
      </header>

      {/* Grid */}
      <section aria-label="Projects" className="mx-auto max-w-[92rem] px-5 py-14 md:px-10 md:py-20 lg:px-16">
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* Also built */}
      {alsoBuilt.length > 0 && (
        <section
          aria-label="Also built"
          className="border-t border-fg/15 py-16 md:py-24"
        >
          <div className="mx-auto max-w-[92rem] px-5 md:px-10 lg:px-16">
            <Reveal>
              <p className="eyebrow text-fg/60">(Also built)</p>
              <ul className="mt-6 border-t border-fg/15">
                {alsoBuilt.map((item) => (
                  <li key={item.url}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-baseline justify-between gap-6 border-b border-fg/15 py-6 transition-colors duration-300 hover:bg-surface/50 md:px-2"
                    >
                      <span className="flex flex-baseline items-baseline gap-4">
                        <span className="font-display text-xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-1 md:text-2xl">
                          {item.title}
                        </span>
                        <span className="eyebrow hidden text-fg/60 sm:block">
                          {item.note}
                        </span>
                      </span>
                      <ArrowUpRight
                        width={16}
                        height={16}
                        className="shrink-0 text-fg/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-fg"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
