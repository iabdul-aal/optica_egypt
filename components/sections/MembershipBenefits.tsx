"use client"

import { useState } from "react"
import { ArrowUpRight, CheckCircle2, ExternalLink, GraduationCap, Building, Briefcase, Microscope, Sparkles, Tag } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MembershipTier } from "@/lib/membership"

interface MembershipBenefitsProps {
  tiers: MembershipTier[]
  initialTierId?: string
}

export function MembershipBenefits({ tiers, initialTierId }: MembershipBenefitsProps) {
  const [selectedId, setSelectedId] = useState<string>(
    initialTierId && tiers.some((t) => t.id === initialTierId) ? initialTierId : tiers[0]?.id || "students"
  )

  const selectedTier = tiers.find((t) => t.id === selectedId) || tiers[0]

  const categoryIcons: Record<string, typeof GraduationCap> = {
    students: GraduationCap,
    "early-career": Briefcase,
    researchers: Microscope,
    academia: Building,
    industry: Sparkles,
  }

  const IconComponent = categoryIcons[selectedTier.id] || Sparkles

  return (
    <div className="space-y-12">
      {/* ── Audience Selector Tabs ── */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[var(--line)] pb-4">
        {tiers.map((tier) => {
          const isSelected = tier.id === selectedId
          const Icon = categoryIcons[tier.id] || Sparkles

          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => setSelectedId(tier.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-sm px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer",
                isSelected
                  ? "bg-[var(--gold)] text-[#09131F] shadow-sm"
                  : "border border-[var(--line)] text-[var(--ink-soft)] hover:text-[var(--ink)] hover:border-[var(--gold)] bg-[var(--surface-raised)]"
              )}
            >
              <Icon size={14} aria-hidden="true" />
              <span>{tier.cohort}</span>
            </button>
          )
        })}
      </div>

      {/* ── Active Category Membership Spotlight Card ── */}
      <div className="site-card overflow-hidden grid lg:grid-cols-[1.1fr_.9fr] border-l-4 border-l-[var(--gold)]">
        {/* Left Side: Tier Details & Benefits */}
        <div className="p-6 sm:p-10 space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/30 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                {selectedTier.tag}
              </span>
              <span className="font-mono text-xs text-[var(--ink-faint)]">
                Official Optica Membership
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)]">
              {selectedTier.name}
            </h3>

            <p className="text-xs font-mono text-[var(--ink-soft)]">
              Target Profile: <strong className="text-[var(--ink)]">{selectedTier.audience}</strong>
            </p>
          </div>

          {/* Pricing & Value Proposition Box */}
          <div className="rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--gold)]">
              <Tag size={13} />
              <span className="font-bold uppercase tracking-wider">{selectedTier.pricingNote}</span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--ink)] italic">
              &quot;{selectedTier.valueProposition}&quot;
            </p>
          </div>

          {/* Core Benefits Checklist */}
          <div className="space-y-3">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
              Key Membership Privileges and Tangible Returns
            </p>
            <ul className="space-y-3 text-sm text-[var(--ink-soft)]">
              {selectedTier.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 leading-relaxed">
                  <CheckCircle2 size={16} className="text-[var(--gold)] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-[var(--ink)]">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Action Box & Summary */}
        <div className="p-6 sm:p-10 bg-[var(--surface-raised)] border-t lg:border-t-0 lg:border-l border-[var(--line)] flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-[var(--gold)]/10 border border-[var(--gold)]/20 text-[var(--gold)]">
                <IconComponent size={24} aria-hidden="true" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase text-[var(--ink-faint)] tracking-wider">
                  Membership Category
                </p>
                <h4 className="text-lg font-bold text-[var(--ink)] mt-0.5">
                  {selectedTier.cohort}
                </h4>
              </div>
            </div>

            <div className="space-y-3 border-y border-[var(--line-subtle)] py-5 text-xs text-[var(--ink-soft)] leading-relaxed">
              <p>
                • <strong>Global Credibility:</strong> Membership is formally issued and recognized by Optica Worldwide (Washington, D.C.).
              </p>
              <p>
                • <strong>Local Section Integration:</strong> Automatically enrolls you in the Optica Egypt Local Section network for local events, lab visits, and leadership roles.
              </p>
              <p>
                • <strong>Travel and Grant Priority:</strong> Active members receive primary consideration for student travel grants and international traveling lecturer funding.
              </p>
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <a
              href={selectedTier.opticaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center text-sm py-3.5"
            >
              <span>{selectedTier.ctaLabel}</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>

            <p className="text-center text-[11px] font-mono text-[var(--ink-faint)]">
              Redirects to official Optica Worldwide secure enrollment portal
            </p>
          </div>
        </div>
      </div>

      {/* ── Quick Comparison Overview of All 5 Categories ── */}
      <div className="space-y-6 pt-6">
        <div className="border-b border-[var(--line)] pb-4">
          <p className="eyebrow">At a Glance</p>
          <h4 className="text-xl font-bold tracking-tight text-[var(--ink)] mt-1">
            Compare All 5 Membership Categories
          </h4>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => {
            const Icon = categoryIcons[tier.id] || Sparkles
            const isCurrent = tier.id === selectedId

            return (
              <div
                key={tier.id}
                className={cn(
                  "rounded-sm border p-6 flex flex-col justify-between transition-all bg-[var(--surface)]",
                  isCurrent
                    ? "border-[var(--gold)] ring-1 ring-[var(--gold)] shadow-md"
                    : "border-[var(--line)] hover:border-[var(--line-strong)]"
                )}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--gold)] font-bold">
                      {tier.cohort}
                    </span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-[var(--surface-raised)] text-[var(--gold)]">
                      <Icon size={14} />
                    </div>
                  </div>

                  <h5 className="font-bold text-base text-[var(--ink)]">{tier.name}</h5>

                  <p className="text-xs text-[var(--ink-soft)] leading-relaxed line-clamp-2">
                    {tier.valueProposition}
                  </p>

                  <div className="pt-2 border-t border-[var(--line-subtle)] text-[11px] text-[var(--ink-faint)]">
                    {tier.benefits.length} core privileges included
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--line-subtle)] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedId(tier.id)}
                    className="text-link text-xs cursor-pointer"
                  >
                    View details
                  </button>

                  <a
                    href={tier.opticaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[var(--gold)] hover:text-[var(--gold-pale)]"
                  >
                    <span>Join</span>
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
