"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "motion/react";
import { useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.32, 0.72, 0, 1] as const;

/* ------------------------------------------------------------------ */
/* Scroll reveal                                                       */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Masked word-by-word heading reveal                                  */
/*                                                                     */
/* Supports the reference site's two signature treatments:             */
/*   - Two-tone lines: split text on "\n" — the first line renders in  */
/*     the default color, every following line renders in accent.      */
/*   - Script accent words: wrap a word in *asterisks* and it renders  */
/*     in the hand-written script face, in accent color.               */
/* ------------------------------------------------------------------ */

type Word = {
  text: string;
  accentLine: boolean;
  script: boolean;
  /** First word of a line after the first — rendered with a hard break. */
  breakBefore: boolean;
};

/**
 * Parse multi-line text + *script* markers into styled word tokens.
 * A script span may cover several words (`*always building.*`): split
 * each line on the markers first — even segments plain, odd script —
 * then split those segments into words.
 */
function parseWords(text: string): Word[] {
  const lines = text.split("\n");
  const words: Word[] = [];
  lines.forEach((line, lineIndex) => {
    let firstInLine = true;
    line.split("*").forEach((segment, segmentIndex) => {
      const script = segmentIndex % 2 === 1;
      segment.split(" ").forEach((raw) => {
        if (!raw) return;
        words.push({
          text: raw,
          accentLine: lineIndex > 0,
          script,
          breakBefore: lineIndex > 0 && firstInLine,
        });
        firstInLine = false;
      });
    });
  });
  return words;
}

/** Space between words; hard line break at \n boundaries. */
function separator(words: Word[], i: number): ReactNode {
  const next = words[i + 1];
  if (!next) return null;
  return next.breakBefore ? <br /> : " ";
}

function wordClassName(word: Word): string | undefined {
  if (word.script) return "script text-accent";
  if (word.accentLine) return "text-accent";
  return undefined;
}

const wordHidden = { y: "115%" } as const;
const wordShown = { y: 0 } as const;

export function SplitHeading({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.07,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const words = parseWords(text);

  if (reduce) {
    return (
      <Tag className={className}>
        {words.map((word, i) => (
          <span key={`${word.text}-${i}`} className={wordClassName(word)}>
            {word.text}
            {separator(words, i)}
          </span>
        ))}
      </Tag>
    );
  }

  /*
   * The viewport trigger lives on an in-flow wrapper, never on the masked
   * words themselves: a word translated out of an `overflow: hidden` mask
   * reports an empty intersection rect, so `whileInView` would never fire
   * and the headline would stay invisible. Variants propagate from the
   * wrapper (React context) to the word spans inside the masks.
   */
  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: stagger, delayChildren: delay },
          },
        }}
      >
        {words.map((word, i) => {
          return (
            <span key={`${word.text}-${i}`} className="inline">
              <span className="mask-word">
                <motion.span
                  className={cn("inline-block", wordClassName(word))}
                  variants={{
                    hidden: wordHidden,
                    show: {
                      ...wordShown,
                      transition: { duration: 0.9, ease: EASE },
                    },
                  }}
                >
                  {word.text}
                </motion.span>
              </span>
              {separator(words, i)}
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Stagger container for lists / menus                                 */
/* ------------------------------------------------------------------ */

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export function Stagger({
  children,
  className,
  variants = staggerContainer,
  initial = "hidden",
  animate = "show",
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  initial?: string;
  animate?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial={initial}
      animate={animate}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic hover wrapper                                              */
/* ------------------------------------------------------------------ */

export function Magnetic({
  children,
  className,
  strength = 0.22,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  if (reduce) return <div className={className}>{children}</div>;

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
