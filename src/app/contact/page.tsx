import type { Metadata } from "next";
import { site } from "@/content/site";
import { CopyEmailButton } from "@/components/copy-email";
import { FaqAccordion } from "@/components/faq";
import { Reveal, SplitHeading } from "@/components/motion";
import {
  ArrowUpRight,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — ${site.role.toLowerCase()} in ${site.location}. Email, LinkedIn and GitHub.`,
};

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    Icon: Mail,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "thamizhselvan1",
    href: site.linkedin,
    Icon: Linkedin,
    external: true,
  },
  {
    label: "GitHub",
    value: "THAMIZHSELVAN08",
    href: site.github,
    Icon: Github,
    external: true,
  },
  {
    label: "FORESE",
    value: "forese.co.in",
    href: site.forese,
    Icon: Globe,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <header className="mx-auto max-w-[92rem] px-5 pb-10 pt-32 md:px-10 md:pb-14 md:pt-44 lg:px-16">
        <Reveal>
          <p className="eyebrow text-fg/50">(Contact)</p>
          <h1 className="display-xl mt-6 max-w-[12ch] text-balance">
            <SplitHeading text={"Say\n*hello.*"} />
          </h1>
          <p className="mt-8 flex items-center gap-1.5 text-fg/60">
            <MapPin width={14} height={14} className="text-fg/60" />
            {site.location}
          </p>
        </Reveal>
      </header>

      {/* Big email + copy */}
      <section aria-label="Email" className="mx-auto max-w-[92rem] px-5 md:px-10 lg:px-16">
        <Reveal>
          <div className="rounded-2xl border border-fg/15 bg-surface px-6 py-12 text-fg md:px-14 md:py-16">
            <p className="eyebrow text-accent-text">Fastest route</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 block break-all font-display text-2xl font-bold tracking-tight transition-colors duration-300 hover:text-accent sm:text-4xl md:text-5xl"
            >
              {site.email}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${site.email}`} className="btn bg-accent text-fg hover:bg-canvas">
                Compose email
                <ArrowUpRight width={15} height={15} />
              </a>
              <CopyEmailButton variant="ghost" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Channels */}
      <section aria-label="Social links" className="mx-auto max-w-[92rem] px-5 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="eyebrow text-fg/60 md:sticky md:top-28">(Elsewhere)</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 md:col-span-9">
            {channels.map(({ label, value, href, Icon, external }, i) => (
              <Reveal key={label} delay={i * 0.07}>
                <li className="h-full">
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-fg/15 bg-surface/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-fg/40 hover:bg-surface"
                  >
                    <span className="flex min-w-0 items-center gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-fg/15 text-fg/70 transition-colors duration-300 group-hover:border-fg group-hover:bg-fg group-hover:text-accent">
                        <Icon width={17} height={17} />
                      </span>
                      <span className="min-w-0">
                        <span className="eyebrow block text-fg/60">
                          {label}
                        </span>
                        <span className="mt-1 block font-display text-lg font-bold tracking-tight [overflow-wrap:anywhere]">
                          {value}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      width={16}
                      height={16}
                      className="text-fg/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-fg"
                    />
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQs */}
      <section
        aria-label="Frequently asked questions"
        className="border-t border-fg/15 py-16 md:py-24"
      >
        <div className="mx-auto grid max-w-[92rem] gap-8 px-5 md:grid-cols-12 md:px-10 lg:px-16">
          <div className="md:col-span-4 lg:col-span-3">
            <p className="eyebrow text-accent-text">(FAQs)</p>
            <h2 className="mt-3 display-md max-w-[14ch] text-balance">
              <SplitHeading text={"Questions,\nanswered."} />
            </h2>
          </div>
          <div className="md:col-span-8 lg:col-span-9">
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* Closing note */}
      <section aria-label="Note" className="border-t border-fg/15 py-16 md:py-24">
        <div className="mx-auto max-w-[92rem] px-5 md:px-10 lg:px-16">
          <Reveal>
            <p className="display-md max-w-[24ch] text-balance text-fg/80">
              No forms, no funnels — just email, and I’ll get back to you.
            </p>
            <p className="mt-6 text-fg/60">
              Prefer a résumé first?{" "}
              <a href={site.resumePath} download className="link-sweep text-fg">
                Download the resume
              </a>{" "}
              before writing.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
