import type { Metadata } from "next";
import Link from "next/link";
import { awards, experience } from "@/content/experience";
import { site } from "@/content/site";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { Reveal, SplitHeading } from "@/components/motion";

export const metadata: Metadata = {
  title: "Experience",
  description: `Work and leadership experience of ${site.name} — ISTD SVCE President, FORESE Tech Head, mock placements organiser, and full-stack developer internship.`,
};

export default function ExperiencePage() {
  return (
    <>
      {/* Header */}
      <header className="mx-auto max-w-[92rem] px-5 pb-10 pt-32 md:px-10 md:pb-14 md:pt-44 lg:px-16">
        <Reveal>
          <p className="eyebrow text-fg/50">(Experience)</p>
          <h1 className="display-xl mt-6 max-w-[12ch] text-balance">
            <SplitHeading text={"Roles &\n*leadership*"} />
          </h1>
          <p className="mt-8 max-w-[54ch] text-lg leading-relaxed text-fg/70">
            Newest first — from student leadership to engineering internships,
            with the scope I owned in each role.
          </p>
        </Reveal>
      </header>

      {/* Timeline */}
      <section aria-label="Timeline" className="mx-auto max-w-[92rem] px-5 pb-16 md:px-10 md:pb-24 lg:px-16">
        <ol className="border-t border-fg/15">
          {experience.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <li className="group grid gap-4 border-b border-fg/15 py-9 transition-colors duration-300 hover:bg-surface/50 md:grid-cols-12 md:gap-6 md:px-3">
                {/* Period */}
                <div className="md:col-span-3">
                  <p className="eyebrow flex items-center gap-2 text-fg/50">
                    {item.current && (
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full bg-accent ring-1 ring-fg/30"
                      />
                    )}
                    {item.period}
                  </p>
                  {item.current && (
                    <span className="eyebrow mt-2 block text-fg/60">
                      Present
                    </span>
                  )}
                </div>

                {/* Role */}
                <div className="md:col-span-4">
                  <h2 className="font-display text-2xl font-bold tracking-tight">
                    {item.role}
                  </h2>
                  {item.org ? (
                    item.orgUrl ? (
                      <a
                        href={item.orgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1.5 text-fg/55 transition-colors duration-300 hover:text-fg"
                      >
                        {item.org}
                        <ArrowUpRight width={13} height={13} />
                      </a>
                    ) : (
                      <p className="mt-1 text-fg/55">{item.org}</p>
                    )
                  ) : null}
                </div>

                {/* Detail */}
                <div className="md:col-span-5">
                  <p className="leading-relaxed text-fg/70">
                    {item.summary}
                  </p>
                  {item.highlights.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {item.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex gap-3 text-sm leading-relaxed text-fg/60"
                        >
                          <span
                            aria-hidden
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent ring-1 ring-fg/30"
                          />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Hackathons / awards / certifications — hidden while the list is empty */}
      {awards.length > 0 && (
        <section
          aria-label="Hackathons, awards and certifications"
          className="border-t border-fg/15 py-16 md:py-24"
        >
          <div className="mx-auto grid max-w-[92rem] gap-10 px-5 md:grid-cols-12 md:px-10 lg:px-16">
            <div className="md:col-span-3">
              <p className="eyebrow text-fg/60">(Awards)</p>
            </div>
            <div className="md:col-span-9">
              <h2 className="display-md text-balance">
                Hackathons, awards & certifications
              </h2>
              <ul className="mt-8 border-t border-fg/15">
                {awards.map((award) => (
                  <li
                    key={`${award.kind}-${award.title}`}
                    className="grid gap-1 border-b border-fg/15 py-5 md:grid-cols-12 md:gap-6"
                  >
                    <p className="eyebrow text-fg/60 md:col-span-3">
                      {award.year ?? ""}
                    </p>
                    <div className="md:col-span-6">
                      <p className="font-display text-lg font-bold tracking-tight">
                        {award.title}
                      </p>
                      {award.issuer && (
                        <p className="text-sm text-fg/60">{award.issuer}</p>
                      )}
                    </div>
                    <p className="eyebrow text-fg/50 md:col-span-3 md:text-right">
                      {award.kind}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section aria-label="Next steps" className="border-t border-fg/15 bg-surface/60 py-16 md:py-24">
        <div className="mx-auto max-w-[92rem] px-5 md:px-10 lg:px-16">
          <Reveal>
            <h2 className="display-md max-w-[20ch] text-balance">
              The résumé version, one click away.
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={site.resumePath} download className="btn btn-solid">
                Download resume
              </a>
              <Link href="/contact" className="btn btn-outline">
                Get in touch
                <ArrowRight width={15} height={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
