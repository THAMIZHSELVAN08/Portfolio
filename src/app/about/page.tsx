import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { ArrowRight, ArrowUpRight, MapPin } from "@/components/icons";
import { Reveal, SplitHeading } from "@/components/motion";
import { CopyEmailButton } from "@/components/copy-email";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — ${site.role.toLowerCase()} based in ${site.location}, building full-stack web apps, backend systems and secure, data-driven platforms.`,
};

export default function AboutPage() {
  const [p1, p2, p3] = site.about;

  return (
    <>
      {/* Header */}
      <header className="mx-auto max-w-[92rem] px-5 pb-10 pt-32 md:px-10 md:pb-14 md:pt-44 lg:px-16">
        <Reveal>
          <p className="eyebrow text-fg/50">(About)</p>
          <h1 className="display-xl mt-6 max-w-[13ch] text-balance">
            <SplitHeading text={"Engineer first,\n*always building.*"} />
          </h1>
          <p className="mt-8 flex items-center gap-1.5 text-fg/60">
            <MapPin width={14} height={14} className="text-fg/60" />
            {site.location}
          </p>
        </Reveal>
      </header>

      {/* Portrait / statement band — typographic until an image exists */}
      <div className="mx-auto max-w-[92rem] px-5 md:px-10 lg:px-16">
        <Reveal>
          <blockquote className="relative overflow-hidden rounded-2xl border border-fg/10 bg-surface px-6 py-12 text-fg md:px-14 md:py-20">
            <p
              aria-hidden
              className="absolute -top-6 right-4 font-display text-[8rem] font-bold leading-none text-fg/[0.06] md:text-[12rem]"
            >
              “
            </p>
            <p className="relative max-w-[30ch] font-display text-2xl font-bold leading-snug tracking-tight text-balance md:max-w-[34ch] md:text-4xl">
              I like owning a product end to end — from the database schema
              and API surface to the interface people actually use.
            </p>
            <footer className="relative mt-8 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="eyebrow text-accent-text">{site.name}</span>
              <span className="eyebrow text-fg/50">{site.role}</span>
            </footer>
          </blockquote>
        </Reveal>
      </div>

      {/* Bio */}
      <section aria-label="Biography" className="mx-auto max-w-[92rem] px-5 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="eyebrow text-fg/60 md:sticky md:top-28">
              (01) Bio
            </p>
          </div>
          <div className="space-y-6 md:col-span-9 lg:col-span-7">
            {[p1, p2, p3].map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p
                  className={
                    i === 0
                      ? "text-xl leading-relaxed text-fg/80 md:text-2xl"
                      : "leading-relaxed text-fg/70"
                  }
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interests */}
      <section
        aria-label="Interests"
        className="border-t border-fg/15 py-16 md:py-24"
      >
        <div className="mx-auto grid max-w-[92rem] gap-10 px-5 md:grid-cols-12 md:px-10 lg:px-16">
          <div className="md:col-span-3">
            <p className="eyebrow text-fg/60">(02) Interests</p>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="display-md max-w-[20ch] text-balance">
                What I dig into outside the sprint board.
              </h2>
              <ul className="mt-8 flex flex-wrap gap-3">
                {site.interests.map((interest) => (
                  <li key={interest} className="tag !px-4 !py-2.5 !text-sm">
                    {interest}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section
        aria-label="Leadership"
        className="border-t border-fg/15 py-16 md:py-24"
      >
        <div className="mx-auto grid max-w-[92rem] gap-10 px-5 md:grid-cols-12 md:px-10 lg:px-16">
          <div className="md:col-span-3">
            <p className="eyebrow text-fg/60">(03) Leadership</p>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="display-md max-w-[20ch] text-balance">
                Leading teams and running large events.
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {site.leadership.map((item, i) => (
                <Reveal key={item.org} delay={i * 0.1}>
                  <article className="group h-full rounded-2xl border border-fg/15 bg-surface/40 p-7 transition-colors duration-300 hover:border-fg/30">
                    <p className="eyebrow text-fg/60">{item.period}</p>
                    <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">
                      {item.role}
                      <span className="text-fg/65">, {item.org}</span>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-fg/70">
                      {item.note}
                    </p>
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-sweep mt-5 inline-flex items-center gap-1.5 text-sm text-fg/80"
                      >
                        {item.org}
                        <ArrowUpRight width={13} height={13} />
                      </a>
                    ) : null}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Next steps" className="border-t border-fg/15 bg-surface/60 py-16 md:py-24">
        <div className="mx-auto flex max-w-[92rem] flex-col gap-8 px-5 md:flex-row md:items-center md:justify-between md:px-10 lg:px-16">
          <Reveal>
            <h2 className="display-md max-w-[18ch] text-balance">
              Want the full picture?
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/experience" className="btn btn-solid">
                Experience
                <ArrowRight width={15} height={15} />
              </Link>
              <a href={site.resumePath} download className="btn btn-outline">
                Download resume
              </a>
              <CopyEmailButton variant="ink" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
