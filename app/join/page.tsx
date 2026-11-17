import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { JoinHubPanel } from "@/components/sections/JoinHubPanel"
import { PageHeader } from "@/components/sections/PageHeader"
import { SocialChannelsBand } from "@/components/sections/SocialChannelsBand"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Join and Contact",
  description:
    "Apply to join Optica Egypt working committees, propose chapter charters, submit partner or press inquiries, and connect on official social channels.",
  path: "/join",
})

export default function JoinPage() {
  return (
    <>
      <PageHeader
        eyebrow="Participate"
        title="Join Optica Egypt"
        intro="Apply directly to a working committee or route chapter, university hosting, partnership, and press inquiries to the section desk."
      />

      <section className="section-space">
        <div className="container-page grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
          <div className="space-y-10 lg:sticky lg:top-24">
            <div className="border-t border-[var(--line)] pt-6 space-y-5">
              <p className="eyebrow">Two-Step Structure</p>
              <div>
                <p className="text-sm font-semibold text-[var(--ink)]">
                  Step 1: Global Optica Membership
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--ink-soft)]">
                  Official society membership, dues, and journal downloads are administered on optica.org.
                </p>
                <a
                  href="https://www.optica.org/membership/join/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link inline-flex min-h-[48px] items-center gap-1 mt-1 text-xs"
                >
                  <span>Explore membership tiers on optica.org</span>
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </div>
              <div className="border-t border-[var(--line-subtle)] pt-4">
                <p className="text-sm font-semibold text-[var(--ink)]">
                  Step 2: Local Section Participation
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--ink-soft)]">
                  Submit a committee application or institutional proposal here for review by section coordinators.
                </p>
              </div>
            </div>

            <div className="border-t border-[var(--line)] pt-6">
              <p className="eyebrow mb-3">Quick Links</p>
              <div className="divide-y divide-[var(--line-subtle)] border-b border-[var(--line)]">
                <Link href="/resources?category=membership" className="flex min-h-[48px] items-center justify-between text-sm text-[var(--ink)] hover:text-[var(--gold)]">
                  <span>Compare Optica Tiers</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
                <Link href="/chapters" className="flex min-h-[48px] items-center justify-between text-sm text-[var(--ink)] hover:text-[var(--gold)]">
                  <span>Student Chapter Checklist</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
                <Link href="/admin" className="flex min-h-[48px] items-center justify-between text-sm text-[var(--ink-soft)] hover:text-[var(--gold)]">
                  <span>Officer Review Workspace</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          <JoinHubPanel />
        </div>
      </section>

      <SocialChannelsBand />
    </>
  )
}
