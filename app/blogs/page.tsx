import type { Metadata } from "next"
import { DispatchCategorySection } from "@/components/sections/DispatchCategorySection"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Blogs",
  description:
    "Technical articles, photonic layout notes, and simulation tutorials authored by Optica Egypt researchers and committee contributors.",
  path: "/blogs",
})

export default function BlogsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Technical Writing"
        title="Articles and Technical Notes"
        intro="Deep-dive write-ups on silicon photonics, open-source electromagnetic solvers, and optical systems engineering from researchers in Egypt."
      />

      <section className="section-space">
        <div className="container-page">
          <ScrollReveal>
            <DispatchCategorySection
              kind="article"
              emptyMessage="Technical articles and simulation walkthroughs will appear here once published."
              ctaLabel="Propose Article or Talk"
              ctaHref="/join?type=speaker"
            />
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
