import type { Metadata } from "next"
import { PageHeader } from "@/components/sections/PageHeader"
import { TrackShowcaseSection } from "@/components/sections/TrackShowcaseSection"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Fellowships",
  description:
    "Fellowship guidance, Optica Foundation student grant opportunities, and domestic Egyptian funding directories indexed by Optica Egypt.",
  path: "/fellowships",
})

export default function FellowshipsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Awards and Mobility"
        title="Fellowships and Grants."
        intro="Curated fellowship pathways, conference travel grant advisories, and national research funding programs supporting optical scientists and students across Egypt."
      />

      <section className="section-space">
        <div className="container-page">
          <ScrollReveal>
            <TrackShowcaseSection
              track="fellowships"
              relatedResourceCategory="grants"
              resourceSectionTitle="Grants and Funding Directories"
            />
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
