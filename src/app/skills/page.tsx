import type { Metadata } from "next";
import Link from "next/link";
import { skillGroups } from "@/content/skills";
import { site } from "@/content/site";
import { ArrowRight } from "@/components/icons";
import { Reveal, SplitHeading } from "@/components/motion";
import { padIndex } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Skills",
  description: `Tech stack of ${site.name} — React, Next.js, Node.js, PostgreSQL, MongoDB, Tailwind CSS, OAuth, Docker, GenAI/LLM integrations and more.`,
};

export default function SkillsPage() {
  return (
    <>
      {/* Header */}
      <header className="mx-auto max-w-[92rem] px-5 pb-10 pt-32 md:px-10 md:pb-14 md:pt-44 lg:px-16">
        <Reveal>
          <p className="eyebrow text-fg/50">(Skills)</p>
          <h1 className="display-xl mt-6 max-w-[12ch] text-balance">
            <SplitHeading text={"Tools of\nthe trade."} />
          </h1>
          <p className="mt-8 max-w-[54ch] text-lg leading-relaxed text-fg/70">
            Grouped by layer — what I reach for when building, shipping and
            securing full-stack products. No percentage bars; just the stack.
          </p>
        </Reveal>
      </header>

      {/* Groups */}
      <section aria-label="Skill groups" className="mx-auto max-w-[92rem] px-5 pb-16 md:px-10 md:pb-24 lg:px-16">
        <div className="border-t border-fg/15">
          {skillGroups.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.04}>
              <div className="grid gap-4 border-b border-fg/15 py-9 md:grid-cols-12 md:gap-6">
                <div className="md:col-span-3">
                  <p className="eyebrow text-fg/60">{padIndex(i)}</p>
                  <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">
                    {group.label}
                  </h2>
                </div>
                <ul className="flex flex-wrap gap-3 self-center md:col-span-9">
                  {group.skills.map((skill) => (
                    <li key={skill} className="tag !px-4 !py-2.5 !text-sm">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Next steps" className="border-t border-fg/15 bg-surface/60 py-16 md:py-24">
        <div className="mx-auto max-w-[92rem] px-5 md:px-10 lg:px-16">
          <Reveal>
            <h2 className="display-md max-w-[22ch] text-balance">
              Skills are only interesting attached to shipped work.
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/work" className="btn btn-solid">
                See the work
                <ArrowRight width={15} height={15} />
              </Link>
              <a href={`mailto:${site.email}`} className="btn btn-outline">
                Talk stack
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
