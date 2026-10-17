"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { ArrowUpRight, Download, Mail } from "@/components/icons";

/**
 * Floating bottom action bar (reference style): a centered glass pill with
 * primary contact actions. Appears after scrolling past the hero and hides
 * on the contact page (redundant there) and near the footer.
 */
export function ActionBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    function onScroll() {
      const nearBottom =
        window.scrollY + window.innerHeight >
        document.documentElement.scrollHeight - 320;
      setVisible(window.scrollY > 480 && !nearBottom);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hidden = pathname === "/contact";

  return (
    <AnimatePresence>
      {visible && !hidden && (
        <motion.div
          className="fixed inset-x-0 bottom-5 z-40 flex justify-center px-4"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="glass-pill flex items-center gap-2 rounded-full p-2">
            <a
              href={`mailto:${site.email}`}
              className="btn btn-solid !rounded-full !px-5 !py-3 text-sm"
            >
              <Mail width={15} height={15} />
              Email me
            </a>
            <a
              href={site.resumePath}
              download
              className="btn btn-outline !rounded-full !border-0 !bg-fg/10 !px-5 !py-3 text-sm !text-fg hover:!bg-fg hover:!text-canvas"
            >
              <Download width={15} height={15} />
              Resume
            </a>
            <Link
              href="/work"
              aria-label="Browse all work"
              className="grid h-11 w-11 place-items-center rounded-full bg-fg/10 text-fg transition-colors duration-300 hover:bg-fg hover:text-canvas"
            >
              <ArrowUpRight width={16} height={16} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
