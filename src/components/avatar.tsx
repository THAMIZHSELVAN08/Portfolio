"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Reference-style hero avatar: a large 3D memoji head that floats gently
 * with a soft accent glow behind it. Entrance fades/scales in once; the
 * idle float honors prefers-reduced-motion (static when reduced).
 */
export function Avatar({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("pointer-events-none relative", className)}>
      {/* Soft accent glow behind the head */}
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[52px]"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -11, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={site.avatarPath}
            alt="Illustrated avatar of Thamizh Selvan"
            width={806}
            height={717}
            priority={priority}
            draggable={false}
            className="h-auto w-full select-none"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
