"use client"

import { useId, useState } from "react"
import type { Dictionary, Locale, LocalizedText } from "@/lib/locales"
import { getLocalizedText } from "@/lib/locales"

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
    label: { en: "Integrated photonics", ar: "الضوئيات المتكاملة" },
    summary: { en: "Guiding, shaping, and routing light on a compact platform.", ar: "توجيه الضوء وتشكيله ومساراته على منصة مدمجة." },
    terms: [{ en: "Waveguides", ar: "موجهات موجية" }, { en: "Resonators", ar: "مرنانات" }, { en: "Couplers", ar: "مقرنات" }],
  },
  {
    id: "quantum",
    code: "QNT / 02",
    label: { en: "Quantum photonics", ar: "الضوئيات الكمّية" },
    summary: { en: "Using optical states and correlations for measurement and information.", ar: "استخدام الحالات والارتباطات الضوئية للقياس والمعلومات." },
    terms: [{ en: "States", ar: "حالات" }, { en: "Correlation", ar: "ارتباط" }, { en: "Nonlinearity", ar: "لاخطية" }],
  },
  {
    id: "communications",
    code: "COM / 03",
    label: { en: "Optical communications", ar: "الاتصالات الضوئية" },
    summary: { en: "Carrying information through fibres, interconnects, and optical channels.", ar: "نقل المعلومات عبر الألياف والوصلات والقنوات الضوئية." },
    terms: [{ en: "Fibre", ar: "ألياف" }, { en: "Channels", ar: "قنوات" }, { en: "Sensing", ar: "استشعار" }],
  },
  {
    id: "bio",
    code: "BIO / 04",
    label: { en: "Biophotonics and imaging", ar: "الضوئيات الحيوية والتصوير" },
    summary: { en: "Using light to observe, measure, and understand biological systems.", ar: "استخدام الضوء لرصد الأنظمة الحيوية وقياسها وفهمها." },
    terms: [{ en: "Microscopy", ar: "مجهرية" }, { en: "Spectroscopy", ar: "مطيافية" }, { en: "Sensing", ar: "استشعار" }],
  },
  {
    id: "nano",
    code: "NANO / 05",
    label: { en: "Nanophotonics", ar: "الضوئيات النانوية" },
    summary: { en: "Controlling optical behaviour with structures smaller than a wavelength.", ar: "التحكم بالسلوك الضوئي عبر بنى أصغر من طول موجي." },
    terms: [{ en: "Metasurfaces", ar: "أسطح فائقة" }, { en: "Materials", ar: "مواد" }, { en: "Phase", ar: "طور" }],
  },
]

type ResearchExplorerProps = {
  locale: Locale
  dictionary: Dictionary
}

export function ResearchExplorer({ locale, dictionary }: ResearchExplorerProps) {
  const [activeId, setActiveId] = useState<ResearchArea["id"]>("integrated")
  const active = areas.find((area) => area.id === activeId) ?? areas[0]
  const headingId = useId()

  return (
    <section className="research-explorer section-space" aria-labelledby={headingId}>
      <div className="container-page">
        <div className="section-split-heading">
          <div>
            <p className="eyebrow">{dictionary.home.research.eyebrow}</p>
            <h2 id={headingId} className="section-title">{dictionary.home.research.title}</h2>
          </div>
          <p className="lede">{dictionary.home.research.intro}</p>
        </div>
        <div className="research-layout">
          <div className="research-topic-list" role="tablist" aria-label={dictionary.home.research.title}>
            {areas.map((area) => {
              const selected = area.id === active.id
              return (
                <button
                  key={area.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`research-panel-${area.id}`}
                  id={`research-tab-${area.id}`}
                  className="research-topic"
                  onClick={() => setActiveId(area.id)}
                >
                  <span>{area.code}</span>
                  <strong>{getLocalizedText(area.label, locale)}</strong>
                </button>
              )
            })}
          </div>
          <div
            key={active.id}
            id={`research-panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`research-tab-${active.id}`}
            className="research-stage topic-transition"
            aria-live="polite"
          >
            <div className="research-depth-card" aria-hidden="true">
              <span className="research-axis research-axis-a" />
              <span className="research-axis research-axis-b" />
              <span className="research-axis research-axis-c" />
            </div>
            <div className="research-stage-copy">
              <p className="eyebrow">{active.code} / {dictionary.home.research.model}</p>
              <h3>{getLocalizedText(active.label, locale)}</h3>
              <p>{getLocalizedText(active.summary, locale)}</p>
              <ul aria-label={getLocalizedText(active.label, locale)}>
                {active.terms.map((term) => <li key={term.en}>{getLocalizedText(term, locale)}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
