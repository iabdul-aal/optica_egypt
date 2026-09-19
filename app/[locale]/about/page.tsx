import { PageHeader } from "@/components/sections/PageHeader"
import { getDictionary, isLocale, type Locale } from "@/lib/locales"

type PageProps = { params: Promise<{ locale: string }> }

export default async function AboutPage({ params }: PageProps) {
  const { locale: requestedLocale } = await params
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : "en"
  const dictionary = getDictionary(locale)
  const pillars = Object.values(dictionary.about.pillars)

  return <>
    <PageHeader eyebrow={dictionary.about.eyebrow} title={dictionary.about.title} intro={dictionary.about.intro} />
    <section className="section-space">
      <div className="container-page grid gap-9 border-b border-white/15 pb-11 lg:grid-cols-[.85fr_1.15fr]">
        <div><p className="eyebrow">{dictionary.about.purposeEyebrow}</p><h2 className="section-title mt-3">{dictionary.about.purposeTitle}</h2></div>
        <p className="lede max-w-2xl lg:pt-8">{dictionary.about.purposeBody}</p>
      </div>
      <div className="container-page mt-12 grid divide-y divide-white/10 border-y border-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
        {pillars.map((pillar) => <article key={pillar.title} className="px-1 py-7 md:px-7"><p className="font-mono text-sm font-bold text-[var(--gold)]">{pillar.number}</p><h3 className="mt-3 text-xl font-semibold text-[var(--ink)]">{pillar.title}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-[var(--ink-soft)]">{pillar.body}</p></article>)}
      </div>
    </section>
  </>
}
