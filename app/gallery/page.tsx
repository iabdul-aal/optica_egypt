import type { Metadata } from "next"
import { DispatchCategorySection } from "@/components/sections/DispatchCategorySection"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Gallery",
  description:
    "Verified photographic documentation from Optica Egypt workshops, chapter assemblies, and photonics outreach events.",
  path: "/gallery",
})

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Visual Archive"
        title="Section Media Gallery."
        intro="Documented photography and visual records from Optica Egypt community events, laboratory demonstrations, and technical sessions."
      />

      <section className="section-space">
        <div className="container-page">
          <ScrollReveal>
            <DispatchCategorySection
              kind="media"
              emptyMessage="Verified post-charter event photographs will appear here as chapter activities take place."
            />
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
