import { site } from "@/content/site";
import { allSkills } from "@/content/skills";

/**
 * Absolute origin for SEO tags, sitemap and robots.
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL env var
 *   2. VERCEL_URL (available automatically on Vercel builds)
 *   3. site.siteUrl, unless it is still a TODO_ placeholder
 * Returns null when no real URL is known — sitemap/robots then omit
 * absolute references instead of shipping fake links.
 */
export function getBaseUrl(): string | null {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env && /^https?:\/\//.test(env)) return env.replace(/\/+$/, "");

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  const raw = site.siteUrl;
  if (/^https?:\/\//.test(raw) && !raw.includes("TODO")) {
    return raw.replace(/\/+$/, "");
  }

  return null;
}

/** schema.org Person — injected once in the root layout. */
export function personJsonLd() {
  const base = getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Full-Stack Developer",
    email: `mailto:${site.email}`,
    ...(base ? { url: base } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressCountry: "IN",
    },
    sameAs: [site.github, site.linkedin, site.forese],
    knowsAbout: [...allSkills, "Cybersecurity", "GenAI / LLM integrations"],
  };
}
