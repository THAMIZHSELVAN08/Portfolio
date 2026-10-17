import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Editorial section shell: hairline top border, sticky section label on
 * the left (desktop), content column on the right.
 */
export function Section({
  id,
  index,
  label,
  children,
  className,
}: {
  id?: string;
  index: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn("border-t border-fg/12 py-20 md:py-28", className)}
    >
      <div className="mx-auto grid max-w-[92rem] gap-y-10 px-5 md:grid-cols-12 md:gap-x-10 md:px-10 lg:px-16">
        <div className="md:col-span-3">
          <div className="flex items-baseline gap-3 md:sticky md:top-28 md:block">
            <span className="eyebrow text-accent-text">({index})</span>
            <span className="eyebrow text-fg/60 md:mt-2 md:block">
              {label}
            </span>
          </div>
        </div>
        <div className="md:col-span-9">{children}</div>
      </div>
    </section>
  );
}
