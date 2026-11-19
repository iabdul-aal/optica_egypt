"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { CommunityBubbles } from "@/components/sections/CommunityBubbles"

const ECOSYSTEM_PILLARS = [
  {
    id: "students",
    index: "01",
    title: "Students",
    detail: "Open-source layout tools, graduation project directories, and chapter leadership.",
    href: "/resources",
  },
  {
    id: "researchers",
    index: "02",
    title: "Researchers",
    detail: "Fellowship advisories, domestic funding databases, and working group tracks.",
    href: "/fellowships",
  },
  {
    id: "academia",
    index: "03",
    title: "Academia",
    detail: "Faculty advisory alignment, technical seminars, and Optica Traveling Lecturer hosting.",
    href: "/partners",
  },
  {
    id: "chapters",
    index: "04",
    title: "Student Chapters",
    detail: "AUC chapter reactivation, Zewail City charter formation, and university checklists nationwide.",
    href: "/chapters",
  },
  {
    id: "industry",
    index: "05",
    title: "Industry and Committees",
    detail: "Standing volunteer committees and photonics hardware collaboration frameworks across Egypt.",
    href: "/volunteer",
  },
] as const

export function EcosystemConstellationSection() {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <section className="section-space relative overflow-hidden bg-[var(--surface)] border-t border-[var(--line-subtle)]">
      <div className="scientific-grid absolute inset-0 opacity-45" aria-hidden="true" />
      <div className="container-page relative">
        <div className="grid gap-10 border-b border-[var(--line)] pb-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow">Community Architecture</p>
            <h2 className="section-title mt-3 max-w-xl">
              Knowledge moves when the right people can meet.
            </h2>
          </div>
          <p className="lede max-w-lg lg:justify-self-end">
            Optica Egypt connects universities, laboratories, and student chapters across five operational pathways.
          </p>
        </div>

        <div className="mt-10 grid gap-9 lg:grid-cols-[1fr_1.08fr] lg:items-center">
          <div className="order-2 grid gap-x-7 gap-y-5 sm:grid-cols-2 lg:order-1">
            {ECOSYSTEM_PILLARS.map((node, idx) => {
              const highlighted = activeId === node.id
              const spanFull = idx === ECOSYSTEM_PILLARS.length - 1
              return (
                <Link
                  key={node.id}
                  href={node.href}
                  onMouseEnter={() => setActiveId(node.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onFocus={() => setActiveId(node.id)}
                  onBlur={() => setActiveId(null)}
                  className={`group border-t pt-4 pb-2 transition-colors min-h-[48px] block ${
                    spanFull ? "sm:col-span-2" : ""
                  } ${
                    highlighted ? "border-[var(--gold)]" : "border-[var(--line)] hover:border-[var(--gold)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[0.68rem] font-bold text-[var(--gold)]">
                      {node.index}
                    </span>
                    <ArrowUpRight
                      size={13}
                      aria-hidden="true"
                      className="text-[var(--ink-faint)] group-hover:text-[var(--gold)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </div>
                  <h3
                    className={`mt-2 text-lg font-semibold transition-colors ${
                      highlighted ? "text-[var(--gold)]" : "text-[var(--ink)] group-hover:text-[var(--gold)]"
                    }`}
                  >
                    {node.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--ink-soft)] leading-relaxed">{node.detail}</p>
                </Link>
              )
            })}
          </div>

          <div className="order-1 relative py-2 sm:py-4 lg:order-2">
            <CommunityBubbles activeNodeId={activeId} onNodeSelect={setActiveId} />
          </div>
        </div>

        <Link href="/chapters" className="text-link mt-10 inline-flex min-h-[48px] items-center gap-1.5">
          <span>Explore Egyptian Chapters and Community</span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
