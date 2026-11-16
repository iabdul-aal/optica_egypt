export default function Loading() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[90] flex justify-center pt-24"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--surface)]/95 px-4 py-2 shadow-sm">
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[var(--gold)] border-t-transparent" />
        <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[var(--ink-soft)]">
          Loading path
        </span>
      </div>
    </div>
  )
}
