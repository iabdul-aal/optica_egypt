"use client"

import { useCallback, useEffect, useId, useState } from "react"
import type { Dictionary, Locale, LocalizedText } from "@/lib/locales"
import { getLocalizedText } from "@/lib/locales"

const INTERVAL = 5000 // ms per topic

type ResearchArea = {
  id: "integrated" | "quantum" | "communications" | "bio" | "nano"
  code: string
  label: LocalizedText
  summary: LocalizedText
  terms: LocalizedText[]
}

const areas: ResearchArea[] = [
  {
    id: "integrated",
    code: "PIC / 01",
    label: { en: "Integrated photonics" },
    summary: { en: "Guiding, shaping, and routing light on a compact platform." },
    terms: [{ en: "Waveguides" }, { en: "Resonators" }, { en: "Couplers" }],
  },
  {
    id: "quantum",
    code: "QNT / 02",
    label: { en: "Quantum photonics" },
    summary: { en: "Using optical states and correlations for measurement and information." },
    terms: [{ en: "States" }, { en: "Correlation" }, { en: "Nonlinearity" }],
  },
  {
    id: "communications",
    code: "COM / 03",
    label: { en: "Optical communications" },
    summary: { en: "Carrying information through fibres, interconnects, and optical channels." },
    terms: [{ en: "Fibre" }, { en: "Channels" }, { en: "Sensing" }],
  },
  {
    id: "bio",
    code: "BIO / 04",
    label: { en: "Biophotonics and imaging" },
    summary: { en: "Using light to observe, measure, and understand biological systems." },
    terms: [{ en: "Microscopy" }, { en: "Spectroscopy" }, { en: "Sensing" }],
  },
  {
    id: "nano",
    code: "NANO / 05",
    label: { en: "Nanophotonics" },
    summary: { en: "Controlling optical behaviour with structures smaller than a wavelength." },
    terms: [{ en: "Metasurfaces" }, { en: "Materials" }, { en: "Phase" }],
  },
]

type ResearchExplorerProps = {
  locale: Locale
  dictionary: Dictionary
}

export function ResearchExplorer({ locale, dictionary }: ResearchExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [timerKey, setTimerKey] = useState(0)
  const [paused, setPaused] = useState(false)
  const headingId = useId()

  const active = areas[activeIndex]

  const advance = useCallback(() => {
    setActiveIndex((i) => (i + 1) % areas.length)
    setTimerKey((k) => k + 1)
  }, [])

  // Auto-cycle, restarts cleanly when unpaused or user manually selects
  useEffect(() => {
    if (paused) return
    const id = setInterval(advance, INTERVAL)
    return () => clearInterval(id)
  }, [advance, paused, timerKey])

  function handleSelect(index: number) {
    setActiveIndex(index)
    setTimerKey((k) => k + 1)
  }

  return (
    <section
      className="research-explorer section-space"
      aria-labelledby={headingId}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-page">
        <div className="section-split-heading">
          <div>
            <p className="eyebrow">{dictionary.home.research.eyebrow}</p>
            <h2 id={headingId} className="section-title">{dictionary.home.research.title}</h2>
          </div>
          <p className="lede">{dictionary.home.research.intro}</p>
        </div>

        <div className="research-layout">
          {/* ── Tab list ─────────────────────────────────────────── */}
          <div className="research-topic-list" role="tablist" aria-label={dictionary.home.research.title}>
            {areas.map((area, index) => {
              const selected = index === activeIndex
              return (
                <button
                  key={area.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`research-panel-${area.id}`}
                  id={`research-tab-${area.id}`}
                  className="research-topic"
                  onClick={() => handleSelect(index)}
                >
                  <span>{area.code}</span>
                  <strong>{getLocalizedText(area.label, locale)}</strong>

                  {/* Auto-timer progress bar, only on active tab */}
                  {selected && (
                    <span
                      key={timerKey}
                      className={`research-topic-progress${paused ? " research-topic-progress--paused" : ""}`}
                      style={{ animationDuration: `${INTERVAL}ms` }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* ── Stage panel ──────────────────────────────────────── */}
          <div
            key={active.id}
            id={`research-panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`research-tab-${active.id}`}
            className="research-stage topic-transition"
            aria-live="polite"
          >
            {/* Decorative 3D wireframe cube */}
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
              <p className="eyebrow">{active.code} / {dictionary.home.research.model}</p>
              <h3>{getLocalizedText(active.label, locale)}</h3>
              <p>{getLocalizedText(active.summary, locale)}</p>
              <ul aria-label={getLocalizedText(active.label, locale)}>
                {active.terms.map((term) => (
                  <li key={term.en}>{getLocalizedText(term, locale)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
