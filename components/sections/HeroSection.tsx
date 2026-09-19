"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { localizedHref, type Dictionary, type Locale } from "@/lib/locales"

const PhotonicsChipScene = dynamic(
  () => import("@/components/3d/PhotonicsChipScene").then((module) => module.PhotonicsChipScene),
  {
    ssr: false,
    loading: () => <div className="viewer-loading" aria-hidden="true"><span>Loading conceptual model</span></div>,
  }
)

type HeroSectionProps = {
  locale: Locale
  dictionary: Dictionary
}

export function HeroSection({ locale, dictionary }: HeroSectionProps) {
  return (
    <section className="hero-shell">
      <div className="hero-copy-wrap container-layout">
        <div className="hero-copy">
          <p className="eyebrow">{dictionary.home.eyebrow}</p>
          <h1 className="display-title">{dictionary.home.title}</h1>
          <p className="lede">{dictionary.home.intro}</p>
          <div className="hero-actions">
            <Link href={localizedHref(locale, "/events")} className="btn-primary">
              {dictionary.home.primaryAction} <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link href={localizedHref(locale, "/community")} className="btn-secondary">
              {dictionary.home.secondaryAction}
            </Link>
          </div>
        </div>
      </div>
      <div className="hero-model-wrap">
        <PhotonicsChipScene locale={locale} dictionary={dictionary} />
      </div>
    </section>
  )
}
