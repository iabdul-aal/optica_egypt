import type { Metadata } from "next"
import { PageHeader } from "@/components/sections/PageHeader"
import { ProjectsDirectory } from "@/components/sections/ProjectsDirectory"
import { getAllProjects } from "@/lib/projects"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Projects and Initiatives",
  description:
    "Open-source photonics working groups, seasonal training roadmaps, thesis guidance, and student outreach led by the Optica Egypt Local Section.",
  path: "/projects",
})

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <>
      <PageHeader
        eyebrow="Initiatives Index"
        title="Projects, Working Groups, and Open Calls."
        intro="Every technical initiative, training roadmap, and fellowship pathway tracked with its funding status, section lead, and linked tools."
      />

      <section className="section-space">
        <div className="container-page">
          <ProjectsDirectory projects={projects} />
        </div>
      </section>
    </>
  )
}
