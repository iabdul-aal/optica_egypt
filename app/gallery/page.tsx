import type { Metadata } from "next"
import { PageHeader } from "@/components/sections/PageHeader"
import { InsightsNav } from "@/components/sections/InsightsNav"
import { GalleryGrid } from "@/components/sections/GalleryGrid"
import { getAllGalleryItems, getGalleryCategories } from "@/lib/gallery"

export const metadata: Metadata = {
  title: "Photo and Activity Gallery",
  description: "A visual archive of Optica Egypt events, workshops, semiconductor cleanroom tours, and youth science outreach.",
  alternates: {
    canonical: "/gallery/",
  },
}

export default function GalleryPage() {
  const items = getAllGalleryItems()
  const categories = getGalleryCategories()

  return (
    <>
      <InsightsNav />
      <PageHeader
        eyebrow="Visual Archive"
        title="Optica Egypt in Action."
        intro="A photographic and activity record documenting technical symposiums, laboratory tours, community meetups, and youth science days across Egypt."
      />

      <section className="section-space">
        <div className="container-page">
          <GalleryGrid items={items} categories={categories} />
        </div>
      </section>
    </>
  )
}
