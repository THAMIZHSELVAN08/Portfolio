"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Close, Download, Menu } from "@/components/icons";
import { staggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";

/**
 * Floating glass pill nav (reference style): detached from the top edge,
 * blurred surface, wordmark left, links + Resume right, hamburger on mobile.
 */
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Close the mobile overlay when the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lock body scroll while the overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:pt-6">
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex max-w-[76rem] items-center justify-between",
          "rounded-[32px] px-4 py-2.5 md:px-5",
          "glass-pill",
          open && "bg-canvas/95",
        )}
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label={`${site.name} — home`}
        >
          {/* Reference-style avatar badge: the memoji head in a ringed circle */}
          <span
            aria-hidden
            className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-surface ring-[1.5px] ring-accent transition-transform duration-300 group-hover:scale-105"
          >
            <Image
              src={site.avatarPath}
              alt=""
              width={64}
              height={64}
              className="h-full w-full scale-[1.18] object-cover object-[50%_38%]"
            />
          </span>
          <span className="font-display text-base font-bold tracking-tight text-fg">
            {site.name}
          </span>
          <span
            aria-hidden
            className="hidden h-2 w-2 rounded-full bg-accent sm:block"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {site.nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative text-sm transition-colors duration-300",
                    active ? "text-fg" : "text-fg/60 hover:text-fg",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-0.5 origin-left rounded-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2.5">
          {/* Resume download — standard anchor with download attribute */}
          <a
            href={site.resumePath}
            download
            className="btn btn-solid !rounded-full !px-4 !py-2.5 text-[0.8125rem]"
          >
            <Download width={14} height={14} />
            Resume
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-fg/20 text-fg transition-colors duration-300 hover:border-fg hover:bg-fg hover:text-canvas md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <Close width={18} height={18} />
            ) : (
              <Menu width={18} height={18} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-24 z-40 flex flex-col bg-canvas px-4 md:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          >
            <ul className="flex flex-1 flex-col justify-center gap-1">
              {site.nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  variants={staggerItem}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: 0.06 * i + 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-fg/10 py-5 font-display text-4xl font-bold tracking-tight"
                  >
                    <span className="eyebrow text-accent-text">0{i + 1}</span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="border-t border-fg/10 py-6 text-sm text-fg/60">
              {site.location} ·{" "}
              <a href={`mailto:${site.email}`} className="link-sweep text-fg">
                {site.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
