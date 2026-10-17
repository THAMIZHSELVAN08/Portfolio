import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-[92rem] flex-col justify-center px-5 py-32 md:px-10 lg:px-16">
      <p className="eyebrow text-fg/50">(404)</p>
      <h1 className="display-xl mt-6 max-w-[14ch] text-balance">
        This page went off-grid.
      </h1>
      <p className="mt-6 max-w-[48ch] text-lg text-fg/70">
        The link is broken or the page moved. The work is still where you
        left it.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-solid">
          Back home
          <ArrowRight width={15} height={15} />
        </Link>
        <Link href="/work" className="btn btn-outline">
          Browse work
        </Link>
      </div>
    </section>
  );
}
