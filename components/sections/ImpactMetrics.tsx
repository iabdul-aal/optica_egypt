const pathways = [
  ["01", "Learn", "Workshops and practical starting points for curious minds."],
  ["02", "Exchange", "Conversations across labs, campuses, and industry."],
  ["03", "Build", "Connections that carry research toward opportunity."],
] as const

export function ImpactMetrics() {
  return (
    <section className="border-b border-[var(--line-subtle)] bg-[var(--surface-raised)]">
      <div className="container-page grid divide-y divide-[var(--line-subtle)] md:grid-cols-3 md:divide-x md:divide-y-0">
        {pathways.map(([index, title, description]) => (
          <article className="group/metric px-4 py-7 md:px-7 md:py-9 transition-colors duration-200 hover:bg-[var(--line-subtle)]" key={title}>
            <span className="text-[0.65rem] font-bold tracking-[0.16em] text-[var(--gold)] transition-colors duration-200 group-hover/metric:text-[var(--gold-pale)]">{index}</span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--ink)] transition-colors duration-200 group-hover/metric:text-[var(--gold)]">{title}</h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-[var(--ink-soft)]">{description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
