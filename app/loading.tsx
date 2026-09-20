export default function Loading() {
  return (
    <div
      className="scientific-grid fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[#090c0d]/95 backdrop-blur-md"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative flex flex-col items-center">
        {/* Optical interferometer animation */}
        <div className="relative flex h-28 w-28 items-center justify-center">
          {/* Outer ring */}
          <div className="absolute inset-0 animate-ping rounded-full border border-[var(--gold)]/30 duration-1000" />
          
          {/* Middle rotating reticle ring */}
          <div className="absolute inset-2 animate-spin rounded-full border border-dashed border-[var(--gold)]/50 duration-[4000ms]" />
          
          {/* Inner ring */}
          <div className="absolute inset-6 rounded-full border border-white/20" />
          
          {/* Central Laser Point */}
          <div className="relative h-3 w-3 rounded-full bg-[var(--gold)] shadow-[0_0_16px_rgba(215,174,91,0.9),0_0_4px_#ffffff]">
            <div className="absolute -inset-1 animate-pulse rounded-full bg-[var(--gold)]/40" />
          </div>
        </div>

        {/* Telemetry and status */}
        <div className="mt-8 flex flex-col items-center gap-2 text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[var(--gold)]">
            Resolving Optical Path
          </p>
          <p className="font-mono text-[0.68rem] tracking-wider text-[var(--ink-faint)]">
            OPTICA EGYPT // CALIBRATING
          </p>
        </div>
      </div>
    </div>
  )
}
