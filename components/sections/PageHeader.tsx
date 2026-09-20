type PageHeaderProps = {
  eyebrow: string
  title: string
  intro: string
}

export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <section className="scientific-grid border-b border-white/10 bg-[#0d1011] text-[var(--ink)]">
      <div className="container-page grid gap-8 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="lg:col-span-3">
          <p className="border-l-2 border-[var(--gold)] pl-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
            {eyebrow}
          </p>
        </div>
        <div className="lg:col-span-8">
          <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,4.75rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-[var(--ink)]">
            {title}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg sm:leading-8">
            {intro}
          </p>
        </div>
      </div>
    </section>
  )
}
