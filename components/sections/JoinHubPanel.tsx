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
    <div className="space-y-6">
      <div
        role="tablist"
        aria-label="Optica Egypt intake mode"
        className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-sm border border-[var(--line)] bg-[var(--surface)] p-1.5"
      >
        <button
          id="tab-recruitment"
          type="button"
          role="tab"
          aria-selected={mode === "recruitment"}
          aria-controls="panel-recruitment"
          onClick={() => setMode("recruitment")}
          className={`min-h-[48px] rounded-sm px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
            mode === "recruitment"
              ? "bg-[var(--gold)] text-[#15110a]"
              : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
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
          className={`min-h-[48px] rounded-sm px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
            mode === "desk"
              ? "bg-[var(--gold)] text-[#15110a]"
              : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
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
