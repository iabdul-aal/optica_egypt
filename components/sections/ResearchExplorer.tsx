"use client"

import { useCallback, useEffect, useId, useState } from "react"
import type { Domain } from "@/types/domain"

const AUTO_CYCLE_MS = 6200

export function ResearchExplorer({ domains }: { domains: Domain[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [timerKey, setTimerKey] = useState(0)
  const [paused, setPaused] = useState(false)
  const headingId = useId()

  const safeDomains = domains.length > 0 ? domains : []
  const current = safeDomains[activeIndex] || safeDomains[0]

  const advance = useCallback(() => {
    if (safeDomains.length <= 1) return
    setActiveIndex((idx) => (idx + 1) % safeDomains.length)
    setTimerKey((k) => k + 1)
  }, [safeDomains.length])

  useEffect(() => {
    if (paused || safeDomains.length <= 1) return
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }
    const id = setInterval(advance, AUTO_CYCLE_MS)
    return () => clearInterval(id)
  }, [advance, paused, timerKey, safeDomains.length])

  if (!current) return null

  function handleSelect(index: number) {
    setActiveIndex(index)
    setTimerKey((k) => k + 1)
    setPaused(true)
  }

  return (
    <section
      id="research-explorer"
      className="research-explorer section-space"
      aria-labelledby={headingId}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div className="container-page">
        <div className="section-split-heading">
          <div>
            <p className="eyebrow">Research Explorer</p>
            <h2 id={headingId} className="section-title">
              A shared language for light-based research.
            </h2>
          </div>
          <p className="lede">
            Explore active photonics domains connecting Egyptian university labs and working groups.
          </p>
        </div>

        <div className="research-layout">
          <div
            className="research-topic-list"
            role="tablist"
            aria-label="Photonics research domains"
          >
            {safeDomains.map((domain, idx) => {
              const selected = idx === activeIndex
              return (
                <button
                  key={domain.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`research-panel-${domain.id}`}
                  id={`research-tab-${domain.id}`}
                  className="research-topic min-h-[48px]"
                  onClick={() => handleSelect(idx)}
                >
                  <span>{domain.code}</span>
                  <strong>{domain.label}</strong>

                  {selected && (
                    <span
                      key={timerKey}
                      className={`research-topic-progress${paused ? " research-topic-progress--paused" : ""}`}
                      style={{ animationDuration: `${AUTO_CYCLE_MS}ms` }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div
            key={current.id}
            id={`research-panel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`research-tab-${current.id}`}
            className="research-stage topic-transition"
            aria-live="polite"
          >
            <div className="research-depth-card" aria-hidden="true">
              <div className="research-cube">
                <span className="cube-face cube-face--front" />
                <span className="cube-face cube-face--back" />
                <span className="cube-face cube-face--right" />
                <span className="cube-face cube-face--left" />
                <span className="cube-face cube-face--top" />
                <span className="cube-face cube-face--bottom" />
              </div>
            </div>

            <div className="research-stage-copy">
              <p className="eyebrow">{current.code} / TECHNICAL SCOPE</p>
              <h3>{current.label}</h3>
              <p>{current.summary}</p>
              <ul aria-label={current.label}>
                {current.terms.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
