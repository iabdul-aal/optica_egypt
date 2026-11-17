type PageHeaderProps = {
  eyebrow: string
  title: string
  intro: string
}

export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <section className="scientific-grid border-b border-[var(--line-subtle)] bg-[var(--surface-raised)] text-[var(--ink)]">
      <div className="container-page grid gap-8 py-16 sm:py-22 lg:grid-cols-12 lg:gap-12 lg:py-26">
        <div className="lg:col-span-3 lg:pt-2">
          <p className="eyebrow m-0">
            {eyebrow}
          </p>
        </div>
        <div className="lg:col-span-9">
          <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,4.6rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-[var(--ink)]">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg sm:leading-8">
            {intro}
          </p>
        </div>
      </div>
    </section>
  )
}
