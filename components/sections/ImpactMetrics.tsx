const pathways = [
  ["01", "Learn", "Workshops and practical starting points for curious minds."],
  ["02", "Exchange", "Conversations across labs, campuses, and industry."],
  ["03", "Build", "Connections that carry research toward opportunity."],
] as const

export function ImpactMetrics() {
  return (
    <section className="border-b border-white/10 bg-[#0d1011]">
      <div className="container-page grid divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
        {pathways.map(([index, title, description]) => (
          <article className="group/metric px-1 py-9 md:px-7 transition-colors duration-200 hover:bg-white/[0.02]" key={title}>
            <span className="text-[0.65rem] font-bold tracking-[0.16em] text-[var(--gold)] transition-colors duration-200 group-hover/metric:text-[var(--gold-pale)]">{index}</span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--ink)] transition-colors duration-200 group-hover/metric:text-white">{title}</h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-[var(--ink-soft)]">{description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
