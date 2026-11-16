import type { Metadata } from "next"
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

export default function ResourcesPage() {
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
          <ResourcesDirectory
            resources={resources}
            membershipTiers={membershipTiers}
            usedInProjectCount={usedInProjectCount}
          />
        </div>
      </section>
    </>
  )
}
