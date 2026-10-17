import Link from "next/link";
import { site } from "@/content/site";
import { ArrowUpRight, Github, Globe, Linkedin, Mail } from "@/components/icons";

const socials = [
  { label: "GitHub", href: site.github, Icon: Github },
  { label: "LinkedIn", href: site.linkedin, Icon: Linkedin },
  { label: "FORESE", href: site.forese, Icon: Globe },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t border-fg/15 bg-canvas">
      <div className="mx-auto max-w-[92rem] px-5 py-14 md:px-10 lg:px-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Name block */}
          <div>
            <p className="font-display text-2xl tracking-tight">
              {site.name}
            </p>
            <p className="mt-1 text-sm text-fg/60">{site.role}</p>
            <p className="mt-4 flex items-center gap-1.5 text-sm text-fg/60">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-accent ring-1 ring-fg/30"
              />
              {site.location}
            </p>
          </div>

          {/* Site links */}
          <nav aria-label="Footer">
            <p className="eyebrow text-fg/60">Sitemap</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-fg/70 transition-colors duration-300 hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={site.resumePath}
                  download
                  className="text-sm text-fg/70 transition-colors duration-300 hover:text-fg"
                >
                  Resume
                </a>
              </li>
            </ul>
          </nav>

          {/* Socials */}
          <div>
            <p className="eyebrow text-fg/60">Elsewhere</p>
            <ul className="mt-4 space-y-2">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center gap-2.5 text-sm text-fg/70 transition-colors duration-300 hover:text-fg"
                  >
                    <Icon width={15} height={15} className="text-fg/50 transition-colors group-hover:text-fg" />
                    {label}
                    <ArrowUpRight
                      width={13}
                      height={13}
                      className="text-fg/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-fg/10 pt-6 text-sm text-fg/50 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.footerNote}</p>
          <a
            href={`mailto:${site.email}`}
            className="link-sweep w-fit text-fg/70 transition-colors hover:text-fg"
          >
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
