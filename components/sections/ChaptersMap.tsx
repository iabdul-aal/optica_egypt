"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, GraduationCap, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Chapter } from "@/lib/chapters"

interface ChaptersMapProps {
  chartered: Chapter[]
  pipeline: Chapter[]
}

export function ChaptersMap({ chartered, pipeline }: ChaptersMapProps) {
  const allChapters = [...chartered, ...pipeline]
  const [selectedId, setSelectedId] = useState<string>(chartered[0]?.id || "")

  const selected = allChapters.find((c) => c.id === selectedId) || chartered[0]

  return (
    <div className="site-card overflow-hidden grid lg:grid-cols-[1.2fr_.8fr]">
      {/* ── Interactive Map Visual ── */}
      <div className="relative p-6 sm:p-10 bg-[var(--surface)] border-b lg:border-b-0 lg:border-r border-[var(--line)] flex flex-col justify-between min-h-[380px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--gold)]">
            <MapPin size={14} className="text-[var(--gold)]" />
            <span>Egypt Campus Geographic Distribution</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] text-[var(--ink-faint)]">
            Nile Basin and Delta Hub
          </span>
        </div>

        {/* Map Diagram Canvas */}
        <div className="relative my-8 h-64 w-full flex items-center justify-center">
          {/* Schematic SVG of Egypt & Delta */}
          <svg
            viewBox="0 0 400 300"
            className="w-full h-full max-h-64 text-[var(--line)]"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            {/* Mediterranean Coastline */}
            <path
              d="M 40,80 Q 150,110 220,90 T 360,70"
              stroke="var(--line)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Nile Delta & River Spine */}
            <path
              d="M 180,95 L 210,135 L 210,280"
              stroke="var(--line)"
              strokeWidth="2"
              opacity="0.4"
            />
            <path
              d="M 230,90 L 210,135"
              stroke="var(--line)"
              strokeWidth="1.5"
              opacity="0.4"
            />
            {/* Delta Regional Label */}
            <text x="70" y="65" fill="var(--ink-faint)" fontSize="10" fontFamily="monospace">
              MEDITERRANEAN SEA
            </text>
            <text x="235" y="270" fill="var(--ink-faint)" fontSize="9" fontFamily="monospace">
              NILE VALLEY
            </text>
          </svg>

          {/* Interactive Campus Node Markers */}
          {allChapters.map((chapter) => {
            const isChartered = chapter.status.toLowerCase().includes("chartered")
            const isSelected = chapter.id === selected?.id

            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => setSelectedId(chapter.id)}
                style={{
                  left: `${chapter.coordinates.x}%`,
                  top: `${chapter.coordinates.y}%`,
                }}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer p-2 transition-transform duration-200 hover:scale-125 focus:outline-none",
                  isSelected && "scale-110 z-20"
                )}
                aria-label={`Select ${chapter.university}`}
              >
                {/* Ping animation for chartered chapter */}
                {isChartered && (
                  <span className="absolute inset-2 rounded-full bg-[var(--gold)] opacity-50 animate-ping" />
                )}

                <div
                  className={cn(
                    "relative flex h-8 w-8 items-center justify-center rounded-full border shadow-md transition-colors",
                    isChartered
                      ? "border-[var(--gold)] bg-[var(--gold)] text-[#09131F]"
                      : "border-[var(--line)] bg-[var(--surface-raised)] text-[var(--ink-soft)] hover:border-[var(--gold)] hover:text-[var(--gold)]",
                    isSelected && "ring-2 ring-[var(--gold)] ring-offset-2 ring-offset-[var(--surface)]"
                  )}
                >
                  <GraduationCap size={15} />
                </div>

                {/* Campus Name Tag */}
                <span
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap rounded-sm px-2 py-0.5 text-[10px] font-mono font-bold transition-all shadow-sm",
                    isSelected
                      ? "bg-[var(--gold)] text-[#09131F] opacity-100"
                      : "bg-[var(--surface-raised)] text-[var(--ink-soft)] border border-[var(--line)] opacity-80 group-hover:opacity-100"
                  )}
                >
                  {chapter.university.replace("The American University in Cairo", "AUC").replace(" University", "")}
                </span>
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[var(--line-subtle)] text-xs font-mono text-[var(--ink-faint)]">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
            <span className="text-[var(--ink)]">Active Chartered Chapter (AUC)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border border-[var(--line)] bg-[var(--surface-raised)]" />
            <span>Chapters in Formation</span>
          </div>
        </div>
      </div>

      {/* ── Selected Chapter Detail Card ── */}
      <div className="p-6 sm:p-8 bg-[var(--surface-raised)] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 border-b border-[var(--line-subtle)] pb-4">
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider",
                selected.status.toLowerCase().includes("chartered")
                  ? "bg-[var(--gold)]/15 border border-[var(--gold)] text-[var(--gold)]"
                  : "bg-[var(--line-subtle)] text-[var(--ink-faint)] border border-[var(--line)]"
              )}
            >
              {selected.status}
            </span>
            <span className="text-xs font-mono text-[var(--ink-faint)]">
              {selected.city}, Egypt
            </span>
          </div>

          <h3 className="mt-4 text-xl font-bold tracking-tight text-[var(--ink)]">
            {selected.name}
          </h3>

          <p className="mt-2 text-xs font-mono text-[var(--gold)]">
            {selected.campus || selected.faculty}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">
            {selected.description}
          </p>

          {selected.facultyAdvisor && (
            <div className="mt-4 pt-3 border-t border-[var(--line-subtle)] text-xs">
              <span className="font-mono text-[10px] uppercase text-[var(--ink-faint)] tracking-wider">
                Faculty Advisor:
              </span>
              <p className="font-semibold text-[var(--ink)] mt-0.5">
                {selected.facultyAdvisor}
              </p>
              {selected.advisorDepartment && (
                <p className="text-[11px] text-[var(--ink-soft)] mt-0.5">
                  {selected.advisorDepartment}
                </p>
              )}
            </div>
          )}

          {selected.focusAreas && (
            <div className="mt-4 pt-3 border-t border-[var(--line-subtle)]">
              <span className="font-mono text-[10px] uppercase text-[var(--ink-faint)] tracking-wider">
                Core Research and Study Areas:
              </span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {selected.focusAreas.slice(0, 3).map((f) => (
                  <span
                    key={f}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[var(--surface)] border border-[var(--line)] text-[var(--ink-soft)]"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-[var(--line-subtle)]">
          {selected.status.toLowerCase().includes("chartered") ? (
            <Link
              href={`/chapters/${selected.id}`}
              className="btn-primary w-full justify-center"
            >
              <span>Explore AUC Chapter Profile</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          ) : (
            <Link
              href="/volunteer"
              className="btn-secondary w-full justify-center"
            >
              <span>Support Campus Formation</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
