"use client"

import { useState } from "react"
import type { Domain } from "@/types/domain"

export function ResearchExplorer({ domains }: { domains: Domain[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const current = domains[activeIndex] || domains[0]
  if (!current) return null

  return (
    <section id="research-explorer" className="section-space bg-[var(--surface)] border-t border-[var(--line)]">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--line)] pb-6">
          <div>
            <p className="eyebrow">Technical Scope</p>
            <h2 className="section-title mt-2">Active Research Areas in Egypt</h2>
          </div>
          <p className="text-sm text-[var(--ink-soft)] max-w-md">
            Select a domain to review focus areas across participating Egyptian university labs.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="flex flex-col gap-2" role="tablist" aria-label="Photonics research domains">
            {domains.map((domain, idx) => {
              const active = idx === activeIndex
              return (
                <button
                  key={domain.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveIndex(idx)}
                  className={`flex min-h-[48px] items-center justify-between gap-4 rounded-sm border px-4 py-3 text-left transition-colors cursor-pointer ${
                    active
                      ? "border-[var(--gold)] bg-[var(--surface-raised)] text-[var(--ink)]"
                      : "border-[var(--line-subtle)] bg-transparent text-[var(--ink-soft)] hover:border-[var(--line)] hover:text-[var(--ink)]"
                  }`}
                >
                  <span className="font-semibold text-sm">{domain.label}</span>
                  <span className="font-mono text-xs text-[var(--gold)]">{domain.code}</span>
                </button>
              )
            })}
          </div>

          <div className="site-card p-7 sm:p-8" role="tabpanel">
            <p className="font-mono text-xs font-bold text-[var(--gold)]">{current.code}</p>
            <h3 className="mt-3 text-2xl font-semibold text-[var(--ink)]">{current.label}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{current.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2 border-t border-[var(--line-subtle)] pt-5">
              {current.terms.map((term) => (
                <span
                  key={term}
                  className="rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] px-3 py-1 font-mono text-xs text-[var(--ink-soft)]"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
