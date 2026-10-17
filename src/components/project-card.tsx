import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { ArrowUpRight, Github } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { cn, hasEntries, isTbd, padIndex } from "@/lib/utils";

/**
 * Reference card pattern:
 *   TITLE                             ↗ View Project
 *   Category / summary
 *   [ big rounded image ]
 *   stack · actions
 */

/** Decorative typographic panel used until a screenshot is provided. */
function Panel({ project, index }: { project: Project; index: number }) {
  const shot = project.screenshots[0];

  if (shot) {
    return (
      <Image
        src={shot.src}
        alt={shot.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
      />
    );
  }

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden bg-surface"
      style={{
        backgroundImage:
          "linear-gradient(rgba(240, 240, 240, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(240, 240, 240, 0.05) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }}
    >
      <span className="absolute right-5 top-3 font-display text-[8rem] font-bold leading-none text-fg/[0.06] md:text-[10rem]">
        {padIndex(index)}
      </span>
      <span className="absolute bottom-5 left-5 flex items-center gap-2.5">
        <span className="h-2 w-2 rounded-full bg-accent" />
        <span className="eyebrow text-fg/50">{project.slug}</span>
      </span>
      <span className="absolute right-5 top-5 h-0.5 w-16 bg-accent" />
    </div>
  );
}

function DemoButton({ project }: { project: Project }) {
  if (isTbd(project.liveDemo)) {
    return (
      <span
        className="btn btn-outline"
        aria-disabled="true"
        title="Demo coming soon"
      >
        Demo coming soon
      </span>
    );
  }

  return (
    <a
      href={project.liveDemo}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-outline"
    >
      Live demo
      <ArrowUpRight width={14} height={14} />
    </a>
  );
}

export function ProjectCard({
  project,
  index,
  className,
  featured = false,
}: {
  project: Project;
  index: number;
  className?: string;
  featured?: boolean;
}) {
  const scope = hasEntries(project.scope);
  const stack = hasEntries(project.stack);
  const hasGithub = !isTbd(project.github);
  const hasSummary = !isTbd(project.summary);
  const category = isTbd(project.subtitle)
    ? scope.slice(0, 2).join(", ")
    : project.subtitle;

  return (
    <Reveal className={cn("h-full", className)}>
      <article className="group flex h-full flex-col">
        {/* Title row: title left, view link right. On narrow screens the
            link wraps below the title instead of forcing the track wider
            than the viewport; min-w-0 + break-words let the long single-
            word titles shrink. */}
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
          <div className="min-w-0">
            <h3
              className={cn(
                "font-display font-bold tracking-tight text-fg-strong break-words",
                featured ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl",
              )}
            >
              <Link
                href={`/work/${project.slug}`}
                className="transition-colors duration-300 group-hover:text-accent"
              >
                {project.title}
              </Link>
            </h3>
            <p className="mt-2 text-[0.95rem] text-fg/60">
              {category || (hasSummary ? project.summary : "")}
            </p>
          </div>

          <Link
            href={`/work/${project.slug}`}
            className="mt-1.5 flex shrink-0 items-center gap-1.5 text-sm text-fg/70 transition-colors duration-300 group-hover:text-accent"
            tabIndex={-1}
            aria-hidden
          >
            <ArrowUpRight
              width={14}
              height={14}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
            View Project
          </Link>
        </div>

        {/* Media */}
        <Link
          href={`/work/${project.slug}`}
          tabIndex={-1}
          aria-hidden
          className={cn(
            "relative mt-5 block overflow-hidden rounded-3xl border border-fg/10",
            featured ? "aspect-[16/9]" : "aspect-[16/10]",
          )}
        >
          <Panel project={project} index={index} />
        </Link>

        {/* Summary (only when the category line didn't show it) */}
        {hasSummary && category && (
          <p className="mt-4 max-w-prose text-[0.95rem] leading-relaxed text-fg/60">
            {project.summary}
          </p>
        )}

        {/* Stack line + actions */}
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-6">
          {stack.length > 0 && (
            <p className="font-display text-xs font-bold uppercase tracking-wider text-fg/60">
              {stack.join(" · ")}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2.5 md:ml-auto">
            <Link href={`/work/${project.slug}`} className="btn btn-solid">
              Case study
              <ArrowUpRight width={14} height={14} />
            </Link>
            <DemoButton project={project} />
            {hasGithub && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub (opens in new tab)`}
                className="grid h-11 w-11 place-items-center rounded-full border border-fg/15 text-fg/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-white"
              >
                <Github width={16} height={16} />
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
