"use client"

import { useState } from "react"

const areas = [
  {
    id: "integrated",
    label: "Integrated photonics",
    code: "PIC / 01",
    summary: "Waveguides, resonators, couplers, and chip-scale optical systems.",
    annotation: "SiN waveguide · microring resonator · TE₀ mode",
  },
  {
    id: "quantum",
    label: "Quantum photonics",
    code: "QNT / 02",
    summary: "Optical states, correlation, nonlinearity, and quantum-enabled measurement.",
    annotation: "nonlinear crystal · signal / idler paths",
  },
  {
    id: "communications",
    label: "Optical communications",
    code: "COM / 03",
    summary: "Fiber systems, optical interconnects, sensing, and information carried by light.",
    annotation: "single-mode fiber · wavelength channels",
  },
  {
    id: "bio",
    label: "Biophotonics & imaging",
    code: "BIO / 04",
    summary: "Light–matter interaction, microscopy, spectroscopy, and biomedical sensing.",
    annotation: "focused illumination · sample plane",
  },
  {
    id: "nano",
    label: "Nanophotonics",
    code: "NANO / 05",
    summary: "Metasurfaces, photonic materials, and optical behavior at small scales.",
    annotation: "subwavelength array · phase control",
  },
] as const

type AreaId = (typeof areas)[number]["id"]

function Diagram({ active }: { active: AreaId }) {
  if (active === "quantum") return <svg viewBox="0 0 620 350" className="h-full w-full" fill="none" aria-label="Conceptual quantum photonics schematic"><path d="M65 175H234" stroke="#d1a247" strokeWidth="5" /><path d="M326 175L537 80" stroke="#f3efe7" strokeWidth="4" /><path d="M326 175L537 270" stroke="#d1a247" strokeWidth="4" /><path d="M234 130l92 45-92 45z" fill="#262c2e" stroke="#d1a247" strokeWidth="3" /><circle cx="537" cy="80" r="16" stroke="#f3efe7" strokeWidth="3" /><circle cx="537" cy="270" r="16" stroke="#d1a247" strokeWidth="3" /><text x="64" y="149" fill="#b8b1a4" fontSize="13" fontFamily="monospace">PUMP</text><text x="252" y="238" fill="#d1a247" fontSize="13" fontFamily="monospace">χ²</text><text x="480" y="52" fill="#b8b1a4" fontSize="13" fontFamily="monospace">SIGNAL</text><text x="486" y="310" fill="#b8b1a4" fontSize="13" fontFamily="monospace">IDLER</text></svg>
  if (active === "communications") return <svg viewBox="0 0 620 350" className="h-full w-full" fill="none" aria-label="Conceptual optical communications schematic"><circle cx="167" cy="175" r="92" fill="#202527" stroke="#5b625e" strokeWidth="3" /><circle cx="167" cy="175" r="34" fill="#111416" stroke="#d1a247" strokeWidth="4" /><path d="M167 175H566" stroke="#d1a247" strokeWidth="10" /><path d="M201 146H566" stroke="#f3efe7" strokeWidth="3" /><path d="M201 174H566" stroke="#d1a247" strokeWidth="3" /><path d="M201 202H566" stroke="#a8b1a6" strokeWidth="3" /><text x="100" y="306" fill="#b8b1a4" fontSize="13" fontFamily="monospace">CORE / CLADDING</text><text x="388" y="132" fill="#b8b1a4" fontSize="13" fontFamily="monospace">λ₁ · λ₂ · λ₃</text></svg>
  if (active === "bio") return <svg viewBox="0 0 620 350" className="h-full w-full" fill="none" aria-label="Conceptual biophotonics schematic"><path d="M310 24v132" stroke="#d1a247" strokeWidth="7" /><path d="M225 161h170" stroke="#f3efe7" strokeWidth="8" /><path d="M252 160l58 75 58-75" fill="#252a2c" stroke="#d1a247" strokeWidth="3" /><path d="M180 237H440" stroke="#f3efe7" strokeWidth="3" /><path d="M148 253c68 26 246 26 324 0v61c-78 26-256 26-324 0z" fill="#323433" stroke="#60665f" strokeWidth="2" /><circle cx="243" cy="284" r="9" fill="#d1a247" /><circle cx="314" cy="274" r="7" fill="#b8b1a4" /><circle cx="375" cy="290" r="10" fill="#d1a247" /><text x="349" y="55" fill="#b8b1a4" fontSize="13" fontFamily="monospace">ILLUMINATION</text><text x="386" y="245" fill="#b8b1a4" fontSize="13" fontFamily="monospace">SAMPLE</text></svg>
  if (active === "nano") return <svg viewBox="0 0 620 350" className="h-full w-full" fill="none" aria-label="Conceptual nanophotonics schematic"><path d="M57 77H563" stroke="#d1a247" strokeWidth="4" /><path d="M57 252H563" stroke="#f3efe7" strokeWidth="4" /><path d="M97 250V133M139 250V113M181 250V154M223 250V94M265 250V130M307 250V109M349 250V151M391 250V87M433 250V123M475 250V149M517 250V103" stroke="#d1a247" strokeWidth="13" /><path d="M309 30v220" stroke="#f3efe7" strokeWidth="2" strokeDasharray="5 7" /><text x="68" y="54" fill="#b8b1a4" fontSize="13" fontFamily="monospace">INCIDENT FIELD</text><text x="360" y="292" fill="#b8b1a4" fontSize="13" fontFamily="monospace">SUBWAVELENGTH ELEMENTS</text></svg>
  return <svg viewBox="0 0 620 350" className="h-full w-full" fill="none" aria-label="Conceptual integrated photonics schematic"><path d="M57 104H231c38 0 38 83 79 83h73c38 0 38 72 82 72h101" stroke="#d1a247" strokeWidth="9" /><path d="M57 252H190c38 0 38-83 81-83h61c42 0 42-65 83-65h151" stroke="#f3efe7" strokeWidth="6" /><circle cx="363" cy="187" r="56" stroke="#d1a247" strokeWidth="9" /><circle cx="495" cy="104" r="47" stroke="#d1a247" strokeWidth="9" /><rect x="30" y="70" width="50" height="69" stroke="#f3efe7" strokeWidth="2" /><rect x="540" y="225" width="51" height="69" stroke="#f3efe7" strokeWidth="2" /><text x="31" y="54" fill="#b8b1a4" fontSize="13" fontFamily="monospace">INPUT</text><text x="504" y="322" fill="#b8b1a4" fontSize="13" fontFamily="monospace">OUTPUT</text></svg>
}

export function ResearchExplorer() {
  const [activeId, setActiveId] = useState<AreaId>("integrated")
  const active = areas.find((area) => area.id === activeId) ?? areas[0]

  return (
    <section className="section-space border-y border-white/10 bg-[#0d1011]">
      <div className="container-page">
        <div className="grid gap-10 border-b border-white/15 pb-8 lg:grid-cols-[1fr_.85fr] lg:items-end">
          <div>
            <p className="eyebrow">Research explorer</p>
            <h2 className="section-title mt-3 max-w-xl">A shared language for light-based research.</h2>
          </div>
          <p className="lede max-w-md lg:justify-self-end">Select a field to inspect a conceptual optical system. These schematics describe the science, not a claim about local projects.</p>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[.82fr_1.18fr]">
          <div className="border-y border-white/10">
            {areas.map((area) => {
              const selected = area.id === activeId
              return <button key={area.id} onClick={() => setActiveId(area.id)} aria-pressed={selected} className={`flex w-full items-center justify-between gap-5 border-b border-white/10 px-1 py-5 text-left transition-colors last:border-b-0 ${selected ? "text-[var(--ink)]" : "text-[var(--ink-soft)] hover:text-[var(--ink)]"}`}><span><span className="block text-[0.62rem] font-bold tracking-[0.13em] text-[var(--gold)]">{area.code}</span><span className="mt-1 block text-base font-semibold">{area.label}</span></span><span className={`size-2 border border-[var(--gold)] ${selected ? "bg-[var(--gold)]" : "bg-transparent"}`} /></button>
            })}
          </div>
          <div className="relative min-h-[330px] border border-white/15 bg-[#101416] p-5 sm:p-8">
            <div className="scientific-grid absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="relative flex h-full flex-col">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div><p className="eyebrow">{active.code}</p><h3 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--ink)]">{active.label}</h3></div>
                <span className="border border-white/15 px-2 py-1 font-mono text-[0.62rem] text-[var(--gold)]">CONCEPTUAL MODEL</span>
              </div>
              <div className="relative mt-4 min-h-[190px] flex-1"><Diagram active={active.id} /></div>
              <div className="border-t border-white/10 pt-4"><p className="text-sm leading-6 text-[var(--ink-soft)]">{active.summary}</p><p className="mt-3 font-mono text-[0.68rem] text-[var(--gold)]">{active.annotation}</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
