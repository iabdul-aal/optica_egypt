"use client"

import { useEffect, useState } from "react"
import { RecruitmentForm } from "@/components/sections/RecruitmentForm"
import { UnifiedIntakeForm } from "@/components/sections/UnifiedIntakeForm"
import type { SubmissionIntent } from "@/lib/submissions"

const TYPE_MAP: Record<string, SubmissionIntent> = {
  chapter: "chapter_charter",
  chapter_charter: "chapter_charter",
  partner: "partner_proposal",
  partner_proposal: "partner_proposal",
  speaker: "speaker_proposal",
  speaker_proposal: "speaker_proposal",
  event: "event_rsvp",
  event_rsvp: "event_rsvp",
  press: "press_inquiry",
  press_inquiry: "press_inquiry",
  general: "general_inquiry",
  general_inquiry: "general_inquiry",
}

export function JoinHubPanel() {
  const [mode, setMode] = useState<"recruitment" | "desk">("recruitment")
  const [defaultIntent, setDefaultIntent] = useState<SubmissionIntent>("partner_proposal")
  const [defaultRef, setDefaultRef] = useState("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const typeParam = (params.get("type") || "").toLowerCase()
    const refParam = params.get("ref") || ""
    const mappedIntent = TYPE_MAP[typeParam]
    setDefaultRef(refParam)
    if (mappedIntent) {
      setDefaultIntent(mappedIntent)
      setMode("desk")
    } else if (typeParam === "committee") {
      setMode("recruitment")
    }
  }, [])

  return (
    <div className="space-y-8">
      <div
        role="tablist"
        aria-label="Optica Egypt intake mode"
        className="flex flex-wrap gap-6 border-b border-[var(--line)]"
      >
        <button
          id="tab-recruitment"
          type="button"
          role="tab"
          aria-selected={mode === "recruitment"}
          aria-controls="panel-recruitment"
          onClick={() => setMode("recruitment")}
          className={`min-h-[48px] px-1 py-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 -mb-px transition-colors cursor-pointer ${
            mode === "recruitment"
              ? "border-[var(--gold)] text-[var(--ink)]"
              : "border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]"
          }`}
        >
          Committee Application
        </button>
        <button
          id="tab-desk"
          type="button"
          role="tab"
          aria-selected={mode === "desk"}
          aria-controls="panel-desk"
          onClick={() => setMode("desk")}
          className={`min-h-[48px] px-1 py-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 -mb-px transition-colors cursor-pointer ${
            mode === "desk"
              ? "border-[var(--gold)] text-[var(--ink)]"
              : "border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]"
          }`}
        >
          Chapter, Partner, or Press Desk
        </button>
      </div>

      {mode === "recruitment" ? (
        <div id="panel-recruitment" role="tabpanel" aria-labelledby="tab-recruitment">
          <RecruitmentForm />
        </div>
      ) : (
        <div id="panel-desk" role="tabpanel" aria-labelledby="tab-desk">
          <UnifiedIntakeForm
            key={`${defaultIntent}:${defaultRef}`}
            defaultIntent={defaultIntent}
            defaultRef={defaultRef}
          />
        </div>
      )}
    </div>
  )
}
