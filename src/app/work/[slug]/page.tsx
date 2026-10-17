import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { ArrowRight, ArrowUpRight, Github } from "@/components/icons";
import { Reveal, SplitHeading } from "@/components/motion";
import { CopyEmailButton } from "@/components/copy-email";
import { cn, hasEntries, isTbd, padIndex } from "@/lib/utils";

/* ---------- static generation for every project slug ---------- */

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  const description = isTbd(project.summary)
    ? `${project.title} — project by ${site.name}.`
    : project.summary;

  return {
    title: `${project.title}`,
    description,
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${site.name}`,
      description,
    },
  };
}

/* ---------- helpers ---------- */

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1 border-b border-fg/10 py-4 md:grid-cols-12 md:gap-6">
      <dt className="eyebrow pt-1 text-fg/60 md:col-span-4">{label}</dt>
      <dd className="md:col-span-8">{children}</dd>
    </div>
  );
}

function Block({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section className="border-t border-fg/15 pt-10">
        <div className="flex items-baseline gap-3">
          <span className="eyebrow text-fg/60">({index})</span>
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            {title}
          </h2>
        </div>
        <div className="mt-5 max-w-[65ch] space-y-4 leading-relaxed text-fg/70">
          {children}
        </div>
      </section>
    </Reveal>
  );
}

/* ---------- page ---------- */

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(currentIndex - 1 + projects.length) % projects.length];
  const next = projects[(currentIndex + 1) % projects.length];

  const scope = hasEntries(project.scope);
  const stack = hasEntries(project.stack);
  const features = hasEntries(project.keyFeatures);
  const screenshots = project.screenshots.filter((s) => !isTbd(s.src));
  const hasGithub = !isTbd(project.github);
  const demoLive = !isTbd(project.liveDemo);
  const metaRows = [
    !isTbd(project.role) && { label: "Role", value: project.role },
    !isTbd(project.year) && { label: "Year", value: project.year },
    stack.length > 0 && { label: "Stack", value: stack.join(" · ") },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      {/* Header */}
      <header className="mx-auto max-w-[92rem] px-5 pb-10 pt-32 md:px-10 md:pb-14 md:pt-44 lg:px-16">
        <Reveal>
          <Link
            href="/work"
            className="group flex w-fit items-center gap-2 text-sm text-fg/50 transition-colors duration-300 hover:text-fg"
          >
            <ArrowRight
              width={14}
              height={14}
              className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1"
            />
            All work
          </Link>

          <p className="eyebrow mt-8 text-fg/50">
            {padIndex(currentIndex)} / {padIndex(projects.length)}
            {isTbd(project.subtitle) ? null : ` — ${project.subtitle}`}
          </p>

          {/* [overflow-wrap:anywhere] so single-word titles (e.g.
              "OnlineMocks2026") can wrap on narrow screens instead of
              forcing horizontal scroll — break-word doesn't affect the
              inline-block mask's intrinsic width, anywhere does. */}
          <h1 className="display-xl mt-5 max-w-[14ch] text-balance [overflow-wrap:anywhere]">
            <SplitHeading text={project.title} />
          </h1>

          {!isTbd(project.summary) && (
            <p className="mt-8 max-w-[56ch] text-xl leading-relaxed text-fg/70 md:text-2xl">
              {project.summary}
            </p>
          )}

          {/* Actions */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {demoLive ? (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-solid"
              >
                Live demo
                <ArrowUpRight width={15} height={15} />
              </a>
            ) : (
              <span
                className="btn btn-outline !text-fg/50"
                aria-disabled="true"
                title="Demo coming soon"
              >
                Demo coming soon
              </span>
            )}
            {hasGithub && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <Github width={15} height={15} />
                Source code
              </a>
            )}
          </div>
        </Reveal>
      </header>

      {/* Hero media — full-bleed screenshot or typographic fallback */}
      <div className="mx-auto max-w-[92rem] px-5 md:px-10 lg:px-16">
        <Reveal>
          <div className="relative aspect-[16/8] overflow-hidden rounded-2xl border border-fg/10 bg-surface">
            {screenshots[0] ? (
              <Image
                src={screenshots[0].src}
                alt={screenshots[0].alt}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1100px"
                className="object-cover"
              />
            ) : (
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(240, 240, 240,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(240, 240, 240,0.055) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              >
                <span className="absolute bottom-6 left-6 flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                  <span className="eyebrow text-fg/50">
                    Screenshots coming soon
                  </span>
                </span>
                <span className="absolute right-6 top-4 font-display text-[7rem] font-bold leading-none text-fg/[0.07] md:text-[11rem]">
                  {padIndex(currentIndex)}
                </span>
              </div>
            )}
          </div>
        </Reveal>
      </div>

      {/* Body: meta sidebar + narrative */}
      <div className="mx-auto max-w-[92rem] px-5 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          {/* Sticky meta */}
          <aside className="md:col-span-4 lg:col-span-3">
            <div className="md:sticky md:top-28">
              <p className="eyebrow text-fg/60">Details</p>
              <dl className="mt-4 border-t border-fg/15">
                {metaRows.length > 0 ? (
                  metaRows.map((row) => (
                    <Row key={row.label} label={row.label}>
                      <span className="text-fg/80">{row.value}</span>
                    </Row>
                  ))
                ) : null}
                {scope.length > 0 && (
                  <Row label="Scope">
                    <ul className="flex flex-wrap gap-2">
                      {scope.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-fg/15 px-2.5 py-1 font-display text-[0.7rem] font-medium uppercase tracking-wider text-fg/60"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </Row>
                )}
                {hasGithub && (
                  <Row label="Source">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-sweep inline-flex items-center gap-1.5 text-fg/80"
                    >
                      GitHub repository
                      <ArrowUpRight width={13} height={13} />
                    </a>
                  </Row>
                )}
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${site.email}`} className="btn btn-solid">
                  Discuss this project
                </a>
                <CopyEmailButton variant="ghost" />
              </div>
            </div>
          </aside>

          {/* Narrative */}
          <div className="space-y-12 md:col-span-8 lg:col-span-8 lg:col-start-5">
            {!isTbd(project.overview) && (
              <Block index="01" title="Overview">
                <p>{project.overview}</p>
              </Block>
            )}

            {!isTbd(project.problem) && (
              <Block index="02" title="Problem">
                <p>{project.problem}</p>
              </Block>
            )}

            {!isTbd(project.approach) && (
              <Block index="03" title="Approach">
                <p>{project.approach}</p>
              </Block>
            )}

            {features.length > 0 && (
              <Block index="04" title="Key features">
                <ul className="space-y-3">
                  {features.map((feature, i) => (
                    <li key={feature} className="flex gap-4">
                      <span className="eyebrow mt-1.5 text-fg/60">
                        {padIndex(i)}
                      </span>
                      <span className="text-fg/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {!isTbd(project.challenges) && (
              <Block index="05" title="Challenges">
                <p>{project.challenges}</p>
              </Block>
            )}

            {!isTbd(project.outcome) && (
              <Block index="06" title="Outcome">
                <p className="text-lg text-fg/80">{project.outcome}</p>
              </Block>
            )}

            {/* Screenshots gallery (hidden until assets are added) */}
            {screenshots.length > 1 && (
              <Reveal>
                <section className="border-t border-fg/15 pt-10">
                  <div className="flex items-baseline gap-3">
                    <span className="eyebrow text-fg/60">(07)</span>
                    <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                      Screenshots
                    </h2>
                  </div>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    {screenshots.slice(1).map((shot) => (
                      <figure
                        key={shot.src}
                        className="overflow-hidden rounded-2xl border border-fg/10"
                      >
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          width={1200}
                          height={750}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="h-auto w-full object-cover"
                        />
                      </figure>
                    ))}
                  </div>
                </section>
              </Reveal>
            )}
          </div>
        </div>
      </div>

      {/* Prev / next */}
      <nav
        aria-label="Project pagination"
        className="border-t border-fg/15"
      >
        <div className="mx-auto grid max-w-[92rem] md:grid-cols-2">
          <Link
            href={`/work/${prev.slug}`}
            className={cn(
              "group flex flex-col gap-2 border-b border-fg/15 px-5 py-10 transition-colors duration-300 hover:bg-surface/60 md:border-b-0 md:border-r md:px-10 md:py-14 lg:px-16",
            )}
          >
            <span className="eyebrow text-fg/60">Previous</span>
            <span className="font-display text-2xl font-bold tracking-tight transition-transform duration-300 group-hover:-translate-x-1 md:text-3xl">
              {prev.title}
            </span>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-col items-start gap-2 px-5 py-10 transition-colors duration-300 hover:bg-surface/60 md:items-end md:px-10 md:py-14 lg:px-16"
          >
            <span className="eyebrow text-fg/60">Next</span>
            <span className="font-display text-2xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-1 md:text-3xl">
              {next.title}
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
}
