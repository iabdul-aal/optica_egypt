import type { Metadata } from "next"
import { MemberCard } from "@/components/sections/MemberCard"
import { PageHeader } from "@/components/sections/PageHeader"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { getDictionary } from "@/lib/locales"
import { getExecutiveMembers, getOperationalMembers, getAdvisoryMembers } from "@/lib/members"

export const metadata: Metadata = {
  title: "Leadership",
  description: "Meet the executive officers, operational chairs, and advisory board of Optica Egypt Local Section.",
  alternates: {
    canonical: "/leadership/",
  },
}

export default function LeadershipPage() {
  const dictionary = getDictionary("en")

  const executiveMembers = getExecutiveMembers()
  const operationalMembers = getOperationalMembers()
  const advisoryMembers = getAdvisoryMembers()

  return (
    <>
      <PageHeader
        eyebrow={dictionary.leadership.eyebrow}
        title={dictionary.leadership.title}
        intro={dictionary.leadership.intro}
      />

      {/* ── 1. Executive Committee (5 Officers) ───────────────────── */}
      <section className="section-space">
        <div className="container-page">
          <ScrollReveal animation="fade-up" delay={30}>
            <div className="section-split-heading">
              <div>
                <p className="eyebrow">{dictionary.leadership.executiveEyebrow}</p>
                <h2 className="section-title">{dictionary.leadership.executiveTitle}</h2>
              </div>
              <p className="lede">{dictionary.leadership.executiveIntro}</p>
            </div>
          </ScrollReveal>
          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {executiveMembers.map((member, index) => (
              <ScrollReveal key={member.id} animation="fade-up" delay={index * 50}>
                <MemberCard member={member} locale="en" dictionary={dictionary} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Operational Committee ──────────────────────────────── */}
      <section className="section-space bg-[var(--surface)] border-t border-[var(--line)]">
        <div className="container-page">
          <ScrollReveal animation="fade-up" delay={30}>
            <div className="section-split-heading">
              <div>
                <p className="eyebrow">{dictionary.leadership.operationalEyebrow}</p>
                <h2 className="section-title">{dictionary.leadership.operationalTitle}</h2>
              </div>
              <p className="lede">{dictionary.leadership.operationalIntro}</p>
            </div>
          </ScrollReveal>
          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {operationalMembers.map((member, index) => (
              <ScrollReveal key={member.id} animation="fade-up" delay={index * 50}>
                <MemberCard member={member} locale="en" dictionary={dictionary} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Senior Faculty Advisory Board ──────────────────────── */}
      <section className="section-space border-t border-[var(--line)]">
        <div className="container-page">
          <ScrollReveal animation="fade-up" delay={30}>
            <div className="section-split-heading">
              <div>
                <p className="eyebrow">{dictionary.leadership.advisoryEyebrow}</p>
                <h2 className="section-title">{dictionary.leadership.advisoryTitle}</h2>
              </div>
              <p className="lede">{dictionary.leadership.advisoryIntro}</p>
            </div>
          </ScrollReveal>
          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {advisoryMembers.map((member, index) => (
              <ScrollReveal key={member.id} animation="fade-up" delay={index * 50}>
                <MemberCard member={member} locale="en" dictionary={dictionary} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
