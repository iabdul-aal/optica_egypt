import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import {
  getAnnualReportScope,
  getBylawStandards,
  getExecutiveAlignment,
  getGovernanceOverview,
  getSectionRecognitions,
} from "@/lib/governance"

export function GovernanceDetailsSection() {
  const governance = getGovernanceOverview()
  const bylaws = getBylawStandards()
  const seats = getExecutiveAlignment()
  const annualScope = getAnnualReportScope()
  const recognitions = getSectionRecognitions()

  return (
    <div className="space-y-12">
      <div>
        <p className="eyebrow">{governance.eyebrow}</p>
        <h2 className="section-title mt-2">Optica Local Section Governance Standards</h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--ink-soft)]">{governance.intro}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {bylaws.map((item) => (
          <article key={item.id} className="site-card p-6">
            <span className="font-mono text-xs font-bold text-[var(--gold)]">{item.number}</span>
            <h3 className="mt-2 text-lg font-semibold text-[var(--ink)]">{item.title}</h3>
            <p className="mt-2 text-sm text-[var(--ink-soft)]">{item.requirement}</p>
            <p className="mt-3 border-t border-[var(--line-subtle)] pt-3 font-mono text-xs text-[var(--gold)]">
              {item.sectionStatus}
            </p>
          </article>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
        <div className="site-card p-6">
          <h3 className="text-lg font-semibold text-[var(--ink)]">Constitutional Executive Seats</h3>
          <div className="mt-4 divide-y divide-[var(--line-subtle)]">
            {seats.map((seat) => (
              <div key={seat.memberId} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <p className="font-mono text-xs text-[var(--gold)]">{seat.constitutionalSeat}</p>
                  <Link
                    href={`/leadership/${seat.memberId}`}
                    className="text-sm font-semibold text-[var(--ink)] hover:text-[var(--gold)] inline-flex min-h-[48px] items-center gap-1"
                  >
                    <span>{seat.holderName}</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[var(--ink-soft)]">{seat.institution}</p>
                  <p className="font-mono text-[11px] text-[var(--ink-faint)]">
                    Optica ID {seat.opticaId}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="site-card p-6 space-y-5">
          <div>
            <h3 className="text-lg font-semibold text-[var(--ink)]">Annual Reporting Scope</h3>
            <p className="mt-1 text-xs text-[var(--ink-soft)]">
              Prepared annually for the 31 December Optica reporting cycle.
            </p>
          </div>
          <div className="divide-y divide-[var(--line-subtle)]">
            {annualScope.map((item) => (
              <div key={item.id} className="py-3">
                <p className="text-sm font-semibold text-[var(--ink)]">{item.title}</p>
                <p className="mt-1 text-xs text-[var(--ink-soft)]">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-[var(--line-subtle)] pt-4">
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--ink-faint)]">
              Section Recognitions ({recognitions.length})
            </p>
            <p className="mt-1 text-xs text-[var(--ink-soft)]">
              {recognitions.length === 0
                ? "Confirmed section recognitions will appear here as they are awarded."
                : `${recognitions.length} recorded honors.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
