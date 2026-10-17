"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { faqs } from "@/content/faqs";
import { padIndex } from "@/lib/utils";

/**
 * Numbered accordion (reference style): hairline rows, `01` index,
 * plus/minus indicator, smooth height animation.
 */
export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className="border-t border-fg/12">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.question} className="border-b border-fg/12">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-button-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center gap-5 py-6 text-left transition-colors duration-300 md:gap-8"
              >
                <span className="eyebrow shrink-0 text-accent-text">
                  {padIndex(i)}
                </span>
                <span
                  className={`flex-1 font-display text-lg font-bold tracking-tight transition-colors duration-300 md:text-2xl ${
                    isOpen
                      ? "text-accent-text"
                      : "text-fg-strong group-hover:text-fg/70"
                  }`}
                >
                  {faq.question}
                </span>
                <span
                  aria-hidden
                  className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    isOpen
                      ? "rotate-45 border-accent bg-accent text-white"
                      : "border-fg/20 text-fg group-hover:border-fg group-hover:bg-fg group-hover:text-canvas"
                  }`}
                >
                  <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
                  <span className="absolute h-3.5 w-0.5 rounded-full bg-current" />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  initial={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? { height: "auto", opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[68ch] pb-7 pl-0 text-[0.975rem] leading-relaxed text-fg/65 md:pl-[calc(1.5rem+3.5rem)] md:text-base">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
