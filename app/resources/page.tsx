import type { Metadata } from "next"
import { Suspense } from "react"
import { PageHeader } from "@/components/sections/PageHeader"
import { ResourcesDirectory } from "@/components/sections/ResourcesDirectory"
import { getAllMembershipTiers } from "@/lib/membership"
import { getAllProjects } from "@/lib/projects"
import { getAllResources } from "@/lib/resources"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Resources and Membership",
  description:
    "Curated free photonics simulation software, Egyptian domestic grants, journals, and Optica membership pathways.",
  path: "/resources",
})

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const rawCat = typeof params.category === "string" ? params.category : "all"

  const resources = getAllResources()
  const membershipTiers = getAllMembershipTiers()
  const projects = getAllProjects()

  const usedInProjectCount: Record<string, number> = {}
  for (const project of projects) {
    for (const rid of project.resourceIds) {
      usedInProjectCount[rid] = (usedInProjectCount[rid] || 0) + 1
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Toolkit and Grants"
        title="Tools, Funding, and Journals."
        intro="Free computational software, national Egyptian graduation and research funding portals, and Optica membership cohorts."
      />

      <section className="section-space">
        <div className="container-page">
          <Suspense fallback={<div className="site-card p-8 text-sm text-[var(--ink-soft)]">Loading resources...</div>}>
            <ResourcesDirectory
              resources={resources}
              membershipTiers={membershipTiers}
              usedInProjectCount={usedInProjectCount}
              initialCategory={rawCat}
            />
          </Suspense>
        </div>
      </section>
    </>
  )
}
