"use client"

import { useState } from "react"

const domains = [
  {
    id: "01",
    code: "PIC / SYS",
    name: "Integrated photonics and PICs",
    desc: "Photonic Integrated Circuits replace electronic copper wires with silicon and indium phosphide waveguides, transmitting data at the speed of light with near-zero heat dissipation.",
    highlight: "Silicon photonics prototyping and layout",
    specs: [
      { label: "Core loss", val: "< 0.2 dB/cm" },
      { label: "Foundry PDK", val: "220 nm SOI" },
      { label: "Modulation", val: "> 50 GHz" },
    ],
    diagram: "pic",
  },
  {
    id: "02",
    code: "LASER / CAV",
    name: "Laser physics and ultrafast optics",
    desc: "From femtosecond pulsed lasers to industrial diode systems, we explore beam conditioning, nonlinear harmonic generation, and precision spectroscopy for material processing and biomedical diagnostics.",
    highlight: "Femtosecond spectroscopy and diagnostics",
    specs: [
      { label: "Pulse duration", val: "< 20 fs FWHM" },
      { label: "Peak power", val: "2.5 MW" },
      { label: "Crystal", val: "Ti:Sapphire" },
    ],
    diagram: "laser",
  },
  {
    id: "03",
    code: "FIBER / GRID",
    name: "Fiber communications and sensors",
    desc: "Egypt connects 17+ submarine optical fiber cables bridging East and West. We run advanced workshops on WDM, optical amplifiers, and distributed fiber sensing.",
    highlight: "WDM telecom networks and subsea links",
    specs: [
      { label: "ITU grid", val: "50 GHz C-Band" },
      { label: "Subsea cables", val: "17+ Red Sea" },
      { label: "Fiber core", val: "9/125 µm SMF" },
    ],
    diagram: "fiber",
  },
  {
    id: "04",
    code: "QUANTUM / OPT",
    name: "Quantum optics and photonic computing",
    desc: "Exploiting entangled photon pairs for quantum key distribution and optical tensor processing capable of running deep neural networks at teraflops per watt.",
    highlight: "Optical neural networks and QKD",
    specs: [
      { label: "Bell state", val: "|Ψ+⟩ Singlet" },
      { label: "Fidelity", val: "99.4 %" },
      { label: "Pump source", val: "405 nm diode" },
    ],
    diagram: "quantum",
  },
]

function Schematic({ type }: { type: string }) {
  if (type === "pic") return (
    <svg className="w-full h-48" viewBox="0 0 360 180" fill="none" aria-label="PIC ring resonator schematic">
      <path d="M20 50L120 50Q150 50 150 70L150 110Q150 130 180 130L340 130" stroke="#5CB1A2" strokeWidth="2" />
      <path d="M20 130L120 130Q150 130 150 110L150 70Q150 50 180 50L340 50" stroke="#5CB1A2" strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />
      <circle cx="260" cy="90" r="30" stroke="#d7ae5b" strokeWidth="2" fill="none" />
      <circle cx="260" cy="90" r="2" fill="#d7ae5b" />
      <line x1="260" y1="60" x2="260" y2="120" stroke="rgba(215,174,91,0.3)" strokeDasharray="2 2" />
      <rect x="70" y="38" width="40" height="24" rx="1" fill="#000" stroke="#d7ae5b" strokeWidth="1" />
      <text x="75" y="53" fill="#d7ae5b" fontSize="9" fontFamily="monospace">Δφ (1550)</text>
      <text x="15" y="42" fill="#7f827d" fontSize="8" fontFamily="monospace">P_IN</text>
      <text x="280" y="42" fill="#5CB1A2" fontSize="8" fontFamily="monospace">P_THROUGH</text>
      <text x="235" y="150" fill="#d7ae5b" fontSize="8" fontFamily="monospace">P_DROP</text>
    </svg>
  )
  if (type === "laser") return (
    <svg className="w-full h-48" viewBox="0 0 360 180" fill="none" aria-label="Laser cavity schematic">
      <rect x="25" y="60" width="10" height="60" fill="#333" stroke="#999" />
      <rect x="325" y="60" width="8" height="60" fill="#d7ae5b" opacity="0.8" />
      <line x1="35" y1="90" x2="140" y2="90" stroke="#e55" strokeWidth="2" />
      <line x1="180" y1="90" x2="325" y2="90" stroke="#e55" strokeWidth="2" />
      <polygon points="140,70 180,70 170,110 130,110" fill="#200" stroke="#f87" strokeWidth="1.5" />
      <text x="132" y="125" fill="#f99" fontSize="8" fontFamily="monospace">Ti:Sapphire</text>
      <polygon points="220,120 240,150 200,150" stroke="#5CB1A2" strokeWidth="1" fill="#0a2035" />
      <polygon points="260,120 280,150 240,150" stroke="#5CB1A2" strokeWidth="1" fill="#0a2035" />
      <path d="M333 90 Q340 70 345 90 Q350 110 355 90" stroke="#f87" strokeWidth="2" />
      <text x="25" y="48" fill="#7f827d" fontSize="8" fontFamily="monospace">HR Mirror (99.9%)</text>
      <text x="240" y="48" fill="#d7ae5b" fontSize="8" fontFamily="monospace">OC (T=5%)</text>
    </svg>
  )
  if (type === "fiber") return (
    <svg className="w-full h-48" viewBox="0 0 360 180" fill="none" aria-label="Fiber optic cross-section and WDM spectrum">
      <circle cx="90" cy="90" r="55" stroke="#333" strokeWidth="1.5" fill="#0F172A" />
      <circle cx="90" cy="90" r="18" stroke="#5CB1A2" strokeWidth="2" fill="#0284C7" fillOpacity="0.4" />
      <circle cx="90" cy="90" r="4" fill="#38BDF8" />
      <text x="45" y="160" fill="#7f827d" fontSize="8" fontFamily="monospace">Core 9µm / Clad 125µm</text>
      <g transform="translate(180,40)">
        <line x1="0" y1="80" x2="160" y2="80" stroke="#333" strokeWidth="1" />
        {[["#5CB1A2", 20], ["#5CB1A2", 40], ["#d7ae5b", 60], ["#d7ae5b", 80], ["#d7ae5b", 100], ["#5CB1A2", 120], ["#7e58f5", 140]].map(([col, x], i) => (
          <line key={i} x1={x} y1="80" x2={x} y2={20 + i * 7} stroke={col as string} strokeWidth="2" />
        ))}
        <text x="20" y="95" fill="#7f827d" fontSize="7" fontFamily="monospace">1530 nm (C-Band) 1565 nm</text>
      </g>
    </svg>
  )
  // quantum
  return (
    <svg className="w-full h-48" viewBox="0 0 360 180" fill="none" aria-label="SPDC quantum entanglement schematic">
      <line x1="20" y1="90" x2="120" y2="90" stroke="#a855f7" strokeWidth="2.5" />
      <text x="20" y="75" fill="#c084fc" fontSize="8" fontFamily="monospace">Pump (405 nm)</text>
      <polygon points="120,60 160,75 160,105 120,120" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
      <text x="122" y="140" fill="#a5b4fc" fontSize="8" fontFamily="monospace">BBO Crystal</text>
      <line x1="160" y1="85" x2="310" y2="45" stroke="#d7ae5b" strokeWidth="2" />
      <line x1="160" y1="95" x2="310" y2="135" stroke="#5CB1A2" strokeWidth="2" />
      <rect x="310" y="35" width="30" height="20" fill="#000" stroke="#d7ae5b" />
      <rect x="310" y="125" width="30" height="20" fill="#000" stroke="#5CB1A2" />
      <text x="250" y="30" fill="#d7ae5b" fontSize="8" fontFamily="monospace">|H⟩ Signal</text>
      <text x="250" y="160" fill="#5CB1A2" fontSize="8" fontFamily="monospace">|V⟩ Idler</text>
    </svg>
  )
}

export function DomainsShowcase() {
  const [active, setActive] = useState(0)
  const domain = domains[active]

  return (
    <section className="section-space bg-[var(--canvas)] border-block border-[var(--line)]">
      <div className="container-page">
        {/* Header */}
        <div className="section-split-heading">
          <div>
            <p className="eyebrow">Core scientific domains</p>
            <h2 className="section-title mt-3">The photonic disciplines.</h2>
          </div>
          <p className="lede">
            Bridging fundamental optical physics with industrial photonic engineering
            across Egyptian research universities.
          </p>
        </div>

        {/* Body: left ledger + right workstation */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left: domain selector + description */}
          <div className="space-y-6 lg:col-span-5">
            <div className="divide-y divide-[var(--line-subtle)] border-y border-[var(--line-subtle)]" role="tablist" aria-label="Scientific domains">
              {domains.map((d, i) => {
                const sel = i === active
                return (
                  <button
                    key={d.id}
                    type="button"
                    role="tab"
                    aria-selected={sel}
                    aria-controls={`domain-panel-${d.id}`}
                    id={`domain-tab-${d.id}`}
                    onClick={() => setActive(i)}
                    className={`flex w-full items-start justify-between gap-4 py-4 text-start transition-colors ${sel ? "text-[var(--ink)]" : "text-[var(--ink-faint)] hover:text-[var(--ink-soft)]"}`}
                  >
                    <div className="flex items-start gap-4">
                      <span className={`font-mono text-[0.66rem] font-bold transition-colors ${sel ? "text-[var(--gold)]" : "text-[var(--ink-faint)]"}`}>
                        {d.id}
                      </span>
                      <div>
                        <p className={`text-sm font-semibold tracking-tight transition-colors ${sel ? "text-[var(--ink)]" : ""}`}>
                          {d.name}
                        </p>
                        <p className="mt-0.5 font-mono text-[0.6rem] text-[var(--ink-faint)]">{d.code}</p>
                      </div>
                    </div>
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 transition-colors ${sel ? "bg-[var(--gold)]" : "border border-[var(--line)] bg-transparent"}`} />
                  </button>
                )
              })}
            </div>

            <div className="space-y-4">
              <p className="text-sm leading-7 text-[var(--ink-soft)]">{domain.desc}</p>
              <div className="border-l-2 border-[var(--gold)] bg-white/[0.02] px-4 py-3 font-mono text-xs text-[var(--ink-soft)]">
                {domain.highlight}
              </div>
            </div>
          </div>

          {/* Right: schematic + spec ledger */}
          <div className="border border-[var(--line)] bg-[#0c1011] p-6 lg:col-span-7">
            <div className="mb-4 border-b border-[var(--line-subtle)] pb-3 flex items-center justify-between">
              <span className="font-mono text-[0.65rem] font-bold text-[var(--gold)]">{domain.code}</span>
              <span className="font-mono text-[0.65rem] text-[var(--ink-faint)]">{domain.name.toUpperCase()}</span>
            </div>

            <div className="flex min-h-[200px] items-center justify-center">
              <Schematic type={domain.diagram} />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[var(--line-subtle)] pt-4">
              {domain.specs.map((s) => (
                <div key={s.label} className="border border-[var(--line-subtle)] bg-white/[0.02] p-2.5">
                  <span className="block text-[0.6rem] font-bold uppercase tracking-wider text-[var(--ink-faint)]">{s.label}</span>
                  <span className="mt-0.5 block font-mono text-xs font-bold text-[var(--ink)]">{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}