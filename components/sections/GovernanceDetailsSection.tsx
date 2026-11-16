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
    <div className="space-y-14">
      <div>
        <p className="eyebrow">{governance.eyebrow}</p>
        <h2 className="section-title mt-2">Optica Local Section Governance Standards</h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--ink-soft)]">{governance.intro}</p>
      </div>

      {/* Integrated Architectural Grid (No Stacked Card Boxes) */}
      <div className="grid border-y border-[var(--line)] divide-y md:divide-y-0 md:grid-cols-2 md:divide-x divide-[var(--line-subtle)]">
        {bylaws.map((item, idx) => (
          <article
            key={item.id}
            className={`py-7 md:px-7 first:md:pl-0 ${idx >= 2 ? "md:border-t md:border-[var(--line-subtle)]" : ""} ${idx % 2 === 0 ? "md:pl-0" : "md:pr-0"}`}
          >
            <span className="font-mono text-xs font-bold text-[var(--gold)]">{item.number}</span>
            <h3 className="mt-2 text-lg font-semibold text-[var(--ink)]">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{item.requirement}</p>
            <p className="mt-4 font-mono text-xs text-[var(--gold)]">
              {item.sectionStatus}
            </p>
          </article>
        ))}
      </div>

      {/* Split Constitutional Ledger */}
      <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[var(--ink)] border-b border-[var(--line)] pb-4">
            Constitutional Executive Seats
          </h3>
          <div className="divide-y divide-[var(--line-subtle)] border-b border-[var(--line)]">
            {seats.map((seat) => (
              <div key={seat.memberId} className="flex flex-wrap items-center justify-between gap-3 py-3.5">
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

        <div className="space-y-5">
          <div className="border-b border-[var(--line)] pb-4">
            <h3 className="text-lg font-semibold text-[var(--ink)]">Annual Reporting Scope</h3>
            <p className="mt-1 text-xs text-[var(--ink-soft)]">
              Prepared annually for the 31 December Optica reporting cycle.
            </p>
          </div>
          <div className="divide-y divide-[var(--line-subtle)] border-b border-[var(--line)]">
            {annualScope.map((item) => (
              <div key={item.id} className="py-3.5">
                <p className="text-sm font-semibold text-[var(--ink)]">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-[var(--ink-soft)]">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="pt-2">
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
