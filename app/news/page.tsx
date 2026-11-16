import type { Metadata } from "next"
import { DispatchCategorySection } from "@/components/sections/DispatchCategorySection"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "News",
  description:
    "Official announcements, charter milestones, and organizational notices from Optica Egypt.",
  path: "/news",
})

export default function NewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Section Record"
        title="News and Announcements."
        intro="Official milestones, governance notices, and section announcements published by the Optica Egypt Executive Committee."
      />

      <section className="section-space">
        <div className="container-page">
          <ScrollReveal>
            <DispatchCategorySection
              kind="announcement"
              emptyMessage="Published section announcements will appear here as they are issued."
            />
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
