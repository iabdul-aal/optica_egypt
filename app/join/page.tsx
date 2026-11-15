import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { RecruitmentForm } from "@/components/sections/RecruitmentForm"
import { PageHeader } from "@/components/sections/PageHeader"
import { MembershipBenefits } from "@/components/sections/MembershipBenefits"
import { getAllMembershipTiers } from "@/lib/membership"

export const metadata: Metadata = {
  title: "Join and Membership Benefits",
  description: "Join the Optica Egypt Local Section. Explore tailored membership benefits and discounts for students, researchers, faculty, engineers, and corporate partners.",
  alternates: {
    canonical: "/join/",
  },
}

const reasons = [
  "Direct access to peer researchers, university faculty, and industrial photonics engineers across Egypt.",
  "Priority participation in subsidized technical workshops, cleanroom tours, and traveling lecturer symposiums.",
  "Mentorship on international conference fellowships, Optica Foundation grants, and paper submissions.",
]

export default function JoinPage() {
  const tiers = getAllMembershipTiers()

  return (
    <>
      <PageHeader
        eyebrow="Join and Membership"
        title="Your next scientific connection starts here."
        intro="Membership connects you to the global optics and photonics community. Explore tailored benefits, subsidized rates, and direct enrollment pathways designed for your career stage."
      />
      <section className="border-y border-[var(--line)] bg-[var(--surface-raised)] py-8">
        <div className="container-page flex flex-wrap items-center justify-between gap-6">
          <div><p className="eyebrow">Chapter recruitment</p><h2 className="text-xl font-semibold">Find your committee. Build your community.</h2><p className="mt-2 text-sm text-[var(--ink-soft)]">Apply to join the chapter and contribute to optics and photonics in Egypt.</p></div>
          <Link href="/recruitment" className="btn-primary min-h-12">Apply to the chapter <ArrowUpRight size={16} /></Link>
        </div>
      </section>

      {/* ── Audience-Specific Membership Benefits Section ─────────────────── */}
      <section className="section-space">
        <div className="container-page">
          <div className="border-b border-[var(--line)] pb-8 mb-12">
            <p className="eyebrow">Membership Tiers and Value</p>
            <h2 className="section-title mt-3">Tailored benefits for every stage of your career.</h2>
            <p className="lede max-w-2xl mt-4">
              Select your audience category to see specific returns on investment, including travel grants, journal downloads, conference discounts, and chapter leadership rights.
            </p>
          </div>

          <MembershipBenefits tiers={tiers} />
        </div>
      </section>

      {/* ── Local Section Connection and Inquiry ──────────────────────────── */}
      <section id="member-portal" className="section-space bg-[var(--surface-raised)] border-t border-[var(--line)]">
        <div className="container-page grid gap-12 lg:grid-cols-[.82fr_1.18fr]">
          <div>
            <p className="eyebrow">Local Section Integration</p>
            <h2 className="section-title mt-3">Why join the Egypt Local Section?</h2>
            <p className="text-sm leading-relaxed text-[var(--ink-soft)] mt-4">
              Whether you are an official Optica global member or exploring photonics for the first time, our local section brings the ecosystem together without barriers.
            </p>

            <ul className="mt-8 grid gap-0 border-y border-[var(--line)]">
              {reasons.map((reason, index) => (
                <li key={reason} className="flex gap-4 border-b border-[var(--line-subtle)] py-4 text-sm leading-6 text-[var(--ink-soft)] last:border-b-0">
                  <span className="font-mono text-[var(--gold)]">0{index + 1}</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/recruitment" className="btn-primary">
                Apply to the Chapter <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
              <Link href="/volunteer" className="btn-secondary">
                Join a Section Committee <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="site-card p-6 sm:p-8 border-t-4 border-t-[var(--gold)]">
            <RecruitmentForm />
          </div>
        </div>
      </section>
    </>
  )
}
