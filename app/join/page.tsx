import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { ContactForm } from "@/components/sections/ContactForm"
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
      <section className="section-space bg-[var(--surface-raised)] border-t border-[var(--line)]">
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

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href={siteConfig.joinFormUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Local Member Roster Form <ArrowUpRight size={14} />
              </a>
              <a href={`mailto:${siteConfig.email}`} className="btn-secondary">
                Email the Secretariat <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div className="site-card p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
