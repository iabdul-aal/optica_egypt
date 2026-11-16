export default function Loading() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[3px] overflow-hidden bg-transparent"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="h-full w-1/3 bg-[var(--gold)] opacity-90" />
      <span className="sr-only">Loading Optica Egypt page</span>
    </div>
  )
}
