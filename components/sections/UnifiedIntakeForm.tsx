"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Check, CheckCircle2, Copy, Loader2 } from "lucide-react"
import { copyTextSafely } from "@/lib/clipboard"
import { submissionIntentLabels, type SubmissionIntent } from "@/lib/submissions"

interface UnifiedIntakeFormProps {
  defaultIntent?: SubmissionIntent
  defaultRef?: string
}

const TRACK_LABEL: Record<SubmissionIntent, string> = {
  chapter_charter: "Target University / Student Count",
  partner_proposal: "Partnership Scope",
  speaker_proposal: "Proposed Topic / Session Format",
  event_rsvp: "Session Slug or Track",
  press_inquiry: "Coverage Topic",
  general_inquiry: "Subject (optional)",
}

const DATE_LABEL: Record<SubmissionIntent, string> = {
  chapter_charter: "Proposed Faculty Advisor Name",
  partner_proposal: "Target Timeline (optional)",
  speaker_proposal: "Preferred Dates or Format",
  event_rsvp: "Optica Membership Status (optional)",
  press_inquiry: "Publication Deadline",
  general_inquiry: "Reference Link (optional)",
}

export function UnifiedIntakeForm({
  defaultIntent = "partner_proposal",
  defaultRef = "",
}: UnifiedIntakeFormProps) {
  const [intent, setIntent] = useState<SubmissionIntent>(defaultIntent)
  const [targetRef, setTargetRef] = useState(defaultRef)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [code, setCode] = useState("")
  const [copied, setCopied] = useState(false)
  const [ready, setReady] = useState(false)
  const submissionId = useRef<string | null>(null)

  useEffect(() => {
    setIntent(defaultIntent)
  }, [defaultIntent])

  useEffect(() => {
    setTargetRef(defaultRef)
  }, [defaultRef])

  useEffect(() => {
    setReady(true)
  }, [])

  const field =
    "min-h-12 w-full rounded-sm border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-base text-[var(--ink)] outline-none focus:border-[var(--gold)]"

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy) return
    setBusy(true)
    setError("")
    const data = new FormData(event.currentTarget)
    submissionId.current ??= crypto.randomUUID()

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent,
          name: data.get("name"),
          email: data.get("email"),
          affiliation: data.get("affiliation"),
          targetRef: data.get("targetRef"),
          topicOrTrack: data.get("topicOrTrack"),
          deadlineOrDate: data.get("deadlineOrDate"),
          opticaId: data.get("opticaId"),
          details: data.get("details"),
          consent: data.get("consent") === "on",
          website: data.get("website"),
          submissionId: submissionId.current,
        }),
        signal: AbortSignal.timeout(20000),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || "Unable to submit request.")
      }
      setCode(result.code)
    } catch (err) {
      setError(
        err instanceof Error && err.name !== "TimeoutError"
          ? err.message
          : "The request timed out. Your form entries remain preserved; retry or email info@optica-egypt.com."
      )
    } finally {
      setBusy(false)
    }
  }

  if (code) {
    return (
      <div role="status" className="site-card space-y-6 p-7 sm:p-10 border-t-4 border-t-[var(--gold)]">
        <CheckCircle2 size={38} className="text-[var(--gold)]" aria-hidden="true" />
        <p className="eyebrow">Submission confirmed</p>
        <h2 className="section-title">Request logged with the coordination desk.</h2>
        <p className="text-sm text-[var(--ink-soft)]">
          Reference code for {submissionIntentLabels[intent]}:
        </p>
        <div className="rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] p-5">
          <p className="font-mono text-lg text-[var(--gold)] break-all">{code}</p>
          <button
            type="button"
            className="btn-secondary mt-4 min-h-[48px]"
            onClick={async () => {
              const ok = await copyTextSafely(code)
              if (ok) {
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }
            }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? "Copied" : "Copy reference"}</span>
          </button>
        </div>
        <button
          type="button"
          className="text-link min-h-[48px] inline-flex items-center"
          onClick={() => {
            submissionId.current = null
            setCode("")
          }}
        >
          Submit another inquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="site-card space-y-6 p-6 sm:p-9 border-t-4 border-t-[var(--gold)]">
      <div>
        <p className="eyebrow">Direct Section Desk</p>
        <h2 className="mt-2 text-2xl font-semibold text-[var(--ink)]">
          Submit a Verified Section Request
        </h2>
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-semibold text-[var(--ink-soft)] sm:col-span-2">
          <span>Request Type</span>
          <select
            id="intake-intent"
            name="intent"
            value={intent}
            onChange={(e) => {
              submissionId.current = null
              setIntent(e.target.value as SubmissionIntent)
            }}
            disabled={!ready || busy}
            className={field}
          >
            {Object.entries(submissionIntentLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-xs font-semibold text-[var(--ink-soft)]">
          <span>Full Name *</span>
          <input
            id="intake-name"
            name="name"
            required
            minLength={2}
            maxLength={120}
            disabled={!ready || busy}
            placeholder="Dr. Nadia Mansour"
            className={field}
          />
        </label>

        <label className="grid gap-2 text-xs font-semibold text-[var(--ink-soft)]">
          <span>Email Address *</span>
          <input
            id="intake-email"
            type="email"
            name="email"
            required
            maxLength={254}
            disabled={!ready || busy}
            placeholder="name@institution.edu.eg"
            className={field}
          />
        </label>

        <label className="grid gap-2 text-xs font-semibold text-[var(--ink-soft)]">
          <span>University, Lab, or Organization *</span>
          <input
            id="intake-affiliation"
            name="affiliation"
            required
            minLength={2}
            maxLength={160}
            disabled={!ready || busy}
            placeholder="Cairo University / Optica Member"
            className={field}
          />
        </label>

        <label className="grid gap-2 text-xs font-semibold text-[var(--ink-soft)]">
          <span>{TRACK_LABEL[intent]}</span>
          <input
            id="intake-track"
            name="topicOrTrack"
            maxLength={200}
            disabled={!ready || busy}
            className={field}
          />
        </label>

        <label className="grid gap-2 text-xs font-semibold text-[var(--ink-soft)]">
          <span>{DATE_LABEL[intent]}</span>
          <input
            id="intake-date"
            name="deadlineOrDate"
            maxLength={120}
            disabled={!ready || busy}
            className={field}
          />
        </label>

        <label className="grid gap-2 text-xs font-semibold text-[var(--ink-soft)]">
          <span>Optica Member ID (optional)</span>
          <input
            id="intake-optica-id"
            name="opticaId"
            maxLength={40}
            disabled={!ready || busy}
            className={field}
          />
        </label>

        <input type="hidden" name="targetRef" value={targetRef} />

        <label className="grid gap-2 text-xs font-semibold text-[var(--ink-soft)] sm:col-span-2">
          <span>Proposal or Inquiry Details *</span>
          <textarea
            id="intake-details"
            name="details"
            required
            minLength={10}
            maxLength={3000}
            rows={4}
            disabled={!ready || busy}
            placeholder="Share scope, university venue availability, technical topic, or press question."
            className={field}
          />
        </label>
      </div>

      <label className="flex min-h-[48px] cursor-pointer items-center gap-3 text-xs text-[var(--ink-soft)]">
        <input
          type="checkbox"
          name="consent"
          required
          disabled={!ready || busy}
          className="h-5 w-5 shrink-0 accent-[var(--gold)]"
        />
        <span>
          Confirm this request may be reviewed by Optica Egypt Section officers for coordination.
        </span>
      </label>

      {error && (
        <p role="alert" className="rounded-sm border border-[var(--danger)]/40 bg-[var(--danger)]/10 p-4 text-sm text-[var(--danger)]">
          {error}
        </p>
      )}

      <button type="submit" disabled={!ready || busy} className="btn-primary min-h-[48px] w-full sm:w-auto">
        {busy ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <span>Submit Request</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  )
}
