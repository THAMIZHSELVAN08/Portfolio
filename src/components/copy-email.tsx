"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Check, Copy } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * Copy-to-clipboard button for the email address with an aria-live toast.
 * variant: "ink"   → solid accent pill (default, on dark surfaces)
 *          "ghost" → outlined button (on accent-colored surfaces)
 */
export function CopyEmailButton({
  variant = "ink",
  className,
}: {
  variant?: "ink" | "ghost";
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setShowToast(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setShowToast(false);
        setCopied(false);
      }, 2400);
    } catch {
      // Clipboard unavailable (permissions / insecure context):
      // reveal the raw address instead of failing silently.
      window.location.href = `mailto:${site.email}`;
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy email address ${site.email}`}
        className={cn(
          "btn",
          variant === "ink"
            ? "btn-solid"
            : "border border-fg/30 text-fg hover:border-accent hover:text-accent",
          className,
        )}
      >
        {copied ? <Check width={15} height={15} /> : <Copy width={15} height={15} />}
        {copied ? "Copied" : "Copy email"}
      </button>

      <div
        role="status"
        aria-live="polite"
        className={cn(
          "pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2",
          "transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          showToast
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0",
        )}
      >
        <div className="flex items-center gap-2 rounded-full border border-fg/10 bg-surface-2 px-5 py-3 text-sm text-fg shadow-[0_10px_40px_-12px_rgba(234,0,68,0.45)]">
          <Check width={14} height={14} className="text-accent" />
          Email copied to clipboard
        </div>
      </div>
    </>
  );
}
