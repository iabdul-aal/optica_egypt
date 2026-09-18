import type { Metadata } from "next"
import { getActiveMembers } from "@/lib/members"
import { MemberCard } from "@/components/sections/MemberCard"
import { PageHeader } from "@/components/sections/PageHeader"

export const metadata: Metadata = { title: "Leadership", description: "Meet the Optica Egypt Local Section team." }

export default function LeadershipPage() {
  const members = getActiveMembers()
  return <>
    <PageHeader eyebrow="Leadership" title="People building a brighter community." intro="Meet the volunteers and officers helping move Optica Egypt from idea to a welcoming, practical community." />
    <section className="section-space"><div className="container-page"><div className="border-b border-white/15 pb-8"><p className="eyebrow">The team</p><h2 className="section-title mt-3">Our founding leadership</h2></div><div className="mt-10 grid gap-x-9 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{members.map((member) => <MemberCard member={member} key={member.id} />)}</div></div></section>
  </>
}
