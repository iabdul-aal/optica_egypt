export function OpticalWaveguideDiagram() {
  return (
    <div
      className="relative flex w-full items-center justify-center border-y border-[var(--line)] bg-[var(--surface)]/45 p-5 sm:p-8"
      role="img"
      aria-label="Architectural diagram of a silicon photonic add-drop microring resonator"
    >
      <svg
        viewBox="0 0 560 360"
        className="figure-bw w-full max-w-[520px] h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="chip-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" stroke="var(--line-subtle)" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="560" height="360" fill="url(#chip-grid)" />
        <rect x="24" y="24" width="512" height="312" rx="4" stroke="var(--line)" strokeWidth="1.2" />

        {/* Grating couplers */}
        {[86, 274].map((y) => (
          <g key={`left-${y}`} stroke="var(--ink-faint)" strokeWidth="2">
            <line x1="56" y1={y - 14} x2="56" y2={y + 14} />
            <line x1="64" y1={y - 12} x2="64" y2={y + 12} />
            <line x1="72" y1={y - 10} x2="72" y2={y + 10} />
            <line x1="80" y1={y - 8} x2="80" y2={y + 8} />
          </g>
        ))}
        {[86, 274].map((y) => (
          <g key={`right-${y}`} stroke="var(--ink-faint)" strokeWidth="2">
            <line x1="480" y1={y - 8} x2="480" y2={y + 8} />
            <line x1="488" y1={y - 10} x2="488" y2={y + 10} />
            <line x1="496" y1={y - 12} x2="496" y2={y + 12} />
            <line x1="504" y1={y - 14} x2="504" y2={y + 14} />
          </g>
        ))}

        {/* Top bus waveguide (Input -> Through) */}
        <path d="M 84 86 L 476 86" stroke="var(--gold)" strokeWidth="4" strokeLinecap="round" />
        {/* Bottom drop waveguide (Add -> Drop) */}
        <path d="M 84 274 L 476 274" stroke="var(--ink-soft)" strokeWidth="3.5" strokeLinecap="round" />

        {/* Microring resonator */}
        <circle
          cx="280"
          cy="180"
          r="82"
          stroke="var(--gold)"
          strokeWidth="4"
          strokeOpacity="0.92"
        />
        <circle
          cx="280"
          cy="180"
          r="62"
          stroke="var(--line)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Coupler resonance nodes */}
        <circle cx="140" cy="86" r="4.5" fill="var(--ink)" />
        <circle cx="420" cy="86" r="4.5" fill="var(--gold)" />
        <circle cx="280" cy="98" r="4" fill="var(--ink)" />
        <circle cx="160" cy="274" r="4" fill="var(--gold)" />

        {/* Clean technical callouts */}
        <text x="52" y="56" fill="var(--ink-faint)" fontSize="11" fontFamily="monospace">
          INPUT / 1550 NM
        </text>
        <text x="412" y="56" fill="var(--ink-faint)" fontSize="11" fontFamily="monospace">
          THROUGH PORT
        </text>
        <text x="52" y="314" fill="var(--ink-faint)" fontSize="11" fontFamily="monospace">
          DROP PORT
        </text>
        <text x="430" y="314" fill="var(--ink-faint)" fontSize="11" fontFamily="monospace">
          ADD PORT
        </text>
        <text
          x="280"
          y="176"
          textAnchor="middle"
          fill="var(--ink)"
          fontSize="12"
          fontWeight="700"
          fontFamily="monospace"
        >
          SI RING RESONATOR
        </text>
        <text
          x="280"
          y="196"
          textAnchor="middle"
          fill="var(--gold)"
          fontSize="11"
          fontFamily="monospace"
        >
          OPEN PDA SCHEMATIC
        </text>
      </svg>
    </div>
  )
}
