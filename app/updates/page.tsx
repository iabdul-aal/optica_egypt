import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/sections/PageHeader"
import { UpdatesDirectory } from "@/components/sections/UpdatesDirectory"
import { getAllDispatches, getPublishedDispatchKinds } from "@/lib/dispatches"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Updates and Events",
  description:
    "Verified announcements, upcoming technical sessions, articles, and section dispatches from the Optica Egypt Local Section.",
  path: "/updates",
})

export default function UpdatesPage() {
  const dispatches = getAllDispatches()
  const availableKinds = getPublishedDispatchKinds()

  return (
    <>
      <PageHeader
        eyebrow="Section Record"
        title="Updates and Events."
        intro="Verified announcements, scheduled technical workshops, and published dispatches from the Optica Egypt Local Section."
      />

      <section className="border-b border-[var(--line)] bg-[var(--surface-raised)] py-6">
        <div className="container-page flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-[var(--ink-soft)]">
            Faculty hosts and researchers can propose inaugural seminars, campus talks, or workshops.
          </p>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/join?type=speaker" className="btn-primary min-h-[48px]">
              <span>Propose Session</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
            <Link href="/projects" className="btn-secondary min-h-[48px]">
              <span>View Roadmaps</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page">
          <UpdatesDirectory
            dispatches={dispatches}
            availableKinds={availableKinds}
          />
        </div>
      </section>
    </>
  )
}
