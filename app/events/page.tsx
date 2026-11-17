import type { Metadata } from "next"
import { DispatchCategorySection } from "@/components/sections/DispatchCategorySection"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Events",
  description:
    "Scheduled workshops, technical seminars, photonic chipathons, and Optica Traveling Lecturer sessions hosted by Optica Egypt.",
  path: "/events",
})

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Program Calendar"
        title="Events and Seminars"
        intro="Upcoming workshops, regional technical meetings, and Visiting Lecturer sessions coordinated by Optica Egypt."
      />

      <section className="section-space">
        <div className="container-page">
          <ScrollReveal>
            <DispatchCategorySection
              kind="event"
              emptyMessage="Confirmed seminars, workshops, and Traveling Lecturer sessions will appear here once scheduled."
              ctaLabel="Propose Session"
              ctaHref="/join?type=speaker"
            />
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
