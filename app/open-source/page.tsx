import type { Metadata } from "next"
import { PageHeader } from "@/components/sections/PageHeader"
import { TrackShowcaseSection } from "@/components/sections/TrackShowcaseSection"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Open-Source Photonics",
  description:
    "Open-source photonic design automation tracks, open PDK tooling directories, gdsfactory workflows, and Meep simulation initiatives at Optica Egypt.",
  path: "/open-source",
})

export default function OpenSourcePage() {
  return (
    <>
      <PageHeader
        eyebrow="Open Hardware and PDA"
        title="Open-Source Photonics."
        intro="Accessible photonic design automation workflows, open PDK layouts, FDTD electromagnetic modeling, and multi-project wafer preparation across Egypt."
      />

      <section className="section-space">
        <div className="container-page">
          <ScrollReveal>
            <TrackShowcaseSection
              track="open-pda"
              relatedResourceCategory="software"
              resourceSectionTitle="Free Photonic Design Automation Tools"
            />
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
