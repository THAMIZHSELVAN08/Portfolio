import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { allSkills } from "@/content/skills";
import { Avatar } from "@/components/avatar";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { CopyEmailButton } from "@/components/copy-email";
import { Reveal, SplitHeading } from "@/components/motion";
import { ArrowRight, ArrowUpRight, Download, MapPin } from "@/components/icons";
import { padIndex } from "@/lib/utils";

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.seoDescription,
};

/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Editorial column rules */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mx-auto hidden max-w-[92rem] md:block"
      >
        <div className="grid h-full grid-cols-12 px-10 lg:px-16">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-l border-fg/[0.06] last:border-r" />
          ))}
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[92svh] max-w-[92rem] flex-col justify-end px-5 pb-16 pt-32 md:min-h-[100svh] md:px-10 md:pb-24 md:pt-40 lg:px-16">
        {/* Eyebrow row */}
        <Reveal className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 md:mb-12">
          <span className="eyebrow text-fg/50">{site.role}</span>
          <span className="hidden h-px flex-1 bg-surface/15 md:block" />
          <span className="eyebrow flex items-center gap-1.5 text-fg/50">
            <MapPin width={13} height={13} className="text-fg/60" />
            {site.location}
          </span>
        </Reveal>

        {/* Headline — two-tone: white first line, accent second.
            SplitHeading renders the "\n" as a hard line break, and
            w-fit makes the h1 hug the widest line — so the avatar's
            left-full anchor lands on the real text edge at every width. */}
        <div className="relative inline-block max-w-full self-start">
          <h1 className="display-xl w-fit max-w-full">
            <SplitHeading
              text={"I build\ndigital experiences."}
              stagger={0.09}
            />
          </h1>

          {/* Wrapper carries the positioning; Avatar keeps its own
              relative context for the glow (mixing absolute + relative
              on one element is a Tailwind source-order hazard). */}
          <div className="pointer-events-none absolute -top-[6rem] right-0 z-10 w-[36vw] max-w-[10rem] select-none sm:max-w-[12rem] md:-top-[11rem] md:-ml-24 md:left-full md:right-auto md:w-[24vw] md:max-w-[20rem]">
            <Avatar priority />
          </div>
        </div>

        {/* Sub-line + CTAs */}
        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12">
          <Reveal delay={0.35} className="md:col-span-6 lg:col-span-5">
            <p className="max-w-[46ch] text-lg leading-relaxed text-fg/70 md:text-xl">
              {site.subline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/work" className="btn btn-solid">
                Selected work
                <ArrowRight width={15} height={15} />
              </Link>
              <a href={site.resumePath} download className="btn btn-outline">
                <Download width={15} height={15} />
                Resume
              </a>
            </div>
          </Reveal>

          <Reveal
            delay={0.5}
            className="flex items-end md:col-span-6 md:justify-end lg:col-span-7"
          >
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                { label: "GitHub", href: site.github },
                { label: "LinkedIn", href: site.linkedin },
                { label: "FORESE", href: site.forese },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="eyebrow group flex items-center gap-1.5 text-fg/50 transition-colors duration-300 hover:text-fg"
                  >
                    {l.label}
                    <ArrowUpRight
                      width={12}
                      height={12}
                      className="text-fg/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function StatsStrip() {
  return (
    <section aria-label="Impact at a glance" className="border-y border-fg/15 bg-surface text-fg">
      <div className="mx-auto grid max-w-[92rem] grid-cols-2 md:grid-cols-4">
        {site.stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 0.08}
            className="border-b border-r border-fg/10 px-5 py-8 last:border-r-0 md:border-b-0 md:px-8 md:py-10 [&:nth-child(2n)]:border-r-0 md:[&:nth-child(2n)]:border-r md:last:border-r-0"
          >
            <p className="font-display text-4xl font-bold tracking-tight text-accent md:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm leading-snug text-fg/60">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function SelectedWork() {
  const featured = projects.slice(0, 4);

  return (
    <Section id="work" index="01" label="Selected work">
      <Reveal>
        <h2 className="display-lg max-w-[16ch] text-balance">
          <SplitHeading text={"Work built for\n*real* users."} />
        </h2>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-fg/65">
          Platforms running real interviews, role-based dashboards, and
          security tooling — built end to end with modern web stacks.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
        {featured.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-fg/15 pt-8">
          <Link href="/work" className="group flex items-center gap-3">
            <span className="font-display text-xl tracking-tight transition-colors duration-300 group-hover:text-fg/60">
              All projects
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-fg/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-fg group-hover:bg-fg group-hover:text-canvas">
              <ArrowRight width={15} height={15} />
            </span>
          </Link>
          <p className="eyebrow text-fg/60">
            {padIndex(projects.length)} case studies
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function AboutTeaser() {
  return (
    <Section id="about" index="02" label="About">
      <Reveal>
        <h2 className="display-lg max-w-[18ch] text-balance">
          <SplitHeading
            text={"Full-stack mindset,\n*engineer’s* discipline."}
          />
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {site.about.slice(0, 2).map((paragraph, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <p className="leading-relaxed text-fg/70">{paragraph}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/about" className="btn btn-outline">
            More about me
            <ArrowRight width={15} height={15} />
          </Link>
          <ul className="flex flex-wrap gap-2">
            {site.interests.slice(0, 4).map((interest) => (
              <li key={interest} className="tag">
                {interest}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function ExperienceHighlights() {
  const highlights = experience.slice(0, 3);

  return (
    <Section id="experience" index="03" label="Experience">
      <Reveal>
        <h2 className="display-lg max-w-[16ch] text-balance">
          <SplitHeading text={"Leading teams,\nshipping systems."} />
        </h2>
      </Reveal>

      <ol className="mt-12 border-t border-fg/15">
        {highlights.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.08}>
            <li className="group grid gap-2 border-b border-fg/15 py-7 transition-colors duration-300 hover:bg-surface/50 md:grid-cols-12 md:gap-6 md:px-2">
              <p className="eyebrow pt-1 text-fg/60 md:col-span-3">
                {item.period}
              </p>
              <div className="md:col-span-4">
                <h3 className="font-display text-xl font-bold tracking-tight">
                  {item.role}
                  {item.org ? (
                    <span className="text-fg/65">, {item.org}</span>
                  ) : null}
                </h3>
                {item.current && (
                  <span className="eyebrow mt-1.5 flex w-fit items-center gap-1.5 rounded-full border border-fg/15 px-2 py-0.5 text-fg/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent ring-1 ring-fg/30" />
                    Now
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed text-fg/65 md:col-span-5">
                {item.summary}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={0.1}>
        <div className="mt-8">
          <Link href="/experience" className="group flex w-fit items-center gap-3">
            <span className="font-display text-xl tracking-tight transition-colors duration-300 group-hover:text-fg/60">
              Full timeline
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-fg/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-fg group-hover:bg-fg group-hover:text-canvas">
              <ArrowRight width={15} height={15} />
            </span>
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function SkillsStrip() {
  const items = [...allSkills, ...allSkills];

  return (
    <section
      aria-label="Skills"
      className="border-t border-fg/15 py-16 md:py-20"
    >
      <div className="mx-auto mb-8 flex max-w-[92rem] flex-wrap items-baseline justify-between gap-4 px-5 md:px-10 lg:px-16">
        <p className="eyebrow text-fg/60">(04) Skills</p>
        <Link
          href="/skills"
          className="eyebrow group flex items-center gap-1.5 text-fg/60 transition-colors duration-300 hover:text-fg"
        >
          Full list
          <ArrowUpRight
            width={12}
            height={12}
            className="text-fg/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      <div className="marquee overflow-hidden">
        <div className="marquee-track gap-3 pr-3">
          {items.map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              aria-hidden={i >= allSkills.length}
              className="flex shrink-0 items-center gap-3 rounded-full border border-fg/15 bg-surface/50 px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-fg/70 transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-white"
            >
              {skill}
              <span className="h-1 w-1 rounded-full bg-accent ring-1 ring-fg/30" />
            </span>
          ))}
        </div>
      </div>

      {/* Accessible static fallback for screen readers / reduced motion */}
      <ul className="sr-only">
        {allSkills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function ContactCTA() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="border-t border-fg/15 bg-accent text-fg"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-24 md:px-10 md:py-36 lg:px-16">
        <Reveal>
          <p className="eyebrow text-white/70">(05) Contact</p>
          <h2 className="display-xl mt-6 max-w-[14ch] text-balance text-white">
            <SplitHeading text={"Let’s build\nsomething real."} />
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-lg leading-relaxed text-white/85 md:text-xl">
                Whether it’s a role, a project, or a collaboration — email is
                the fastest way to reach me.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-6 block font-display text-2xl font-bold tracking-tight text-white underline decoration-white/40 underline-offset-8 transition-colors duration-300 hover:decoration-white md:text-4xl"
              >
                {site.email}
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${site.email}`} className="btn btn-on-accent">
                Write an email
                <ArrowUpRight width={15} height={15} />
              </a>
              <CopyEmailButton variant="ghost" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <SelectedWork />
      <AboutTeaser />
      <ExperienceHighlights />
      <SkillsStrip />
      <ContactCTA />
    </>
  );
}
