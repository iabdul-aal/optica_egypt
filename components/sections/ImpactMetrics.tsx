import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const PATHWAYS = [
  {
    index: "01",
    title: "Learn",
    description: "Open-source photonic design automation workshops and reproducible simulation workflows.",
    href: "/open-source",
  },
  {
    index: "02",
    title: "Exchange",
    description: "Technical seminars, Visiting Lecturer sessions, and faculty dialogue across Egyptian labs.",
    href: "/events",
  },
  {
    index: "03",
    title: "Build",
    description: "Collaborative working groups guiding student teams from photonic layout to verification.",
    href: "/projects",
  },
] as const

export function ImpactMetrics() {
  return (
    <section
      aria-label="Core section pathways"
      className="border-b border-[var(--line-subtle)] bg-[var(--surface-raised)]"
    >
      <div className="container-page grid divide-y divide-[var(--line-subtle)] md:grid-cols-3 md:divide-x md:divide-y-0">
        {PATHWAYS.map(({ index, title, description, href }) => (
          <Link
            key={title}
            href={href}
            className="group/metric relative flex flex-col justify-between px-4 py-7 md:px-7 md:py-9 transition-colors duration-200 hover:bg-[var(--line-subtle)] min-h-[48px]"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[0.68rem] font-bold tracking-[0.16em] text-[var(--gold)] transition-colors duration-200 group-hover/metric:text-[var(--gold-pale)]">
                  {index}
                </span>
                <ArrowUpRight
                  size={14}
                  aria-hidden="true"
                  className="text-[var(--ink-faint)] transition-transform duration-200 group-hover/metric:translate-x-0.5 group-hover/metric:-translate-y-0.5 group-hover/metric:text-[var(--gold)]"
                />
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--ink)] transition-colors duration-200 group-hover/metric:text-[var(--gold)]">
                {title}
              </h2>
              <p className="mt-2.5 max-w-xs text-sm leading-6 text-[var(--ink-soft)]">
                {description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
