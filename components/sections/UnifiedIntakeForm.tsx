"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Check, CheckCircle2, Copy, Loader2 } from "lucide-react"
import { copyTextSafely } from "@/lib/clipboard"
import { submissionIntentLabels, type SubmissionIntent } from "@/lib/submissions"
import { formatSubmitError, getApiUrl, readJsonResponse } from "@/lib/utils"

const UNAVAILABLE_MESSAGE =
  "Online intake is temporarily unavailable on this host. Your form entries remain preserved; please submit at optica-egypt.com or email info@optica-egypt.com."
const TIMEOUT_MESSAGE =
  "The request timed out. Your form entries remain preserved; retry or email info@optica-egypt.com."

interface UnifiedIntakeFormProps {
  defaultIntent?: SubmissionIntent
  defaultRef?: string
}

const AFFILIATION_LABEL: Record<SubmissionIntent, string> = {
  chapter_charter: "University Name *",
  partner_proposal: "Organization Name *",
  speaker_proposal: "Institution or Organization *",
  event_rsvp: "Affiliation *",
  press_inquiry: "Media Outlet *",
  general_inquiry: "Organization Name *",
}

const AFFILIATION_PLACEHOLDER: Record<SubmissionIntent, string> = {
  chapter_charter: "Cairo University",
  partner_proposal: "Alexandria Photonics Lab",
  speaker_proposal: "Zewail City of Science and Technology",
  event_rsvp: "University or research group",
  press_inquiry: "Nature Middle East",
  general_inquiry: "Alexandria Photonics Lab",
}

const DETAILS_META: Record<
  SubmissionIntent,
  { label: string; placeholder: string }
> = {
  chapter_charter: {
    label: "Charter Readiness Notes *",
    placeholder: "Current founding team stage and specific charter support needed.",
  },
  partner_proposal: {
    label: "Proposal Summary *",
    placeholder: "Describe the collaboration objectives and available hosting resources.",
  },
  speaker_proposal: {
    label: "Session Abstract *",
    placeholder: "Summarize the technical topic and intended audience level.",
  },
  event_rsvp: {
    label: "Questions or Accessibility Notes *",
    placeholder: "Topic questions, preparation requests, or campus access notes.",
  },
  press_inquiry: {
    label: "Interview Request *",
    placeholder: "List interview questions or specific brand assets requested.",
  },
  general_inquiry: {
    label: "Message *",
    placeholder: "Write your question or inquiry for section coordinators.",
  },
}

function readString(data: FormData, key: string): string {
  const value = data.get(key)
  return typeof value === "string" ? value : ""
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
    "min-h-12 w-full border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-base text-[var(--ink)] outline-none focus:border-[var(--gold)]"

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy) return
    setBusy(true)
    setError("")
    const data = new FormData(event.currentTarget)
    submissionId.current ??= crypto.randomUUID()

    try {
      const response = await fetch(getApiUrl("/api/submissions"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent,
          name: readString(data, "name"),
          email: readString(data, "email"),
          affiliation: readString(data, "affiliation"),
          targetRef: readString(data, "targetRef"),
          foundingMemberCount: readString(data, "foundingMemberCount"),
          facultyAdvisorName: readString(data, "facultyAdvisorName"),
          partnershipScope: readString(data, "partnershipScope"),
          targetTimeline: readString(data, "targetTimeline"),
          sessionFormat: readString(data, "sessionFormat"),
          sessionTitle: readString(data, "sessionTitle"),
          preferredDate: readString(data, "preferredDate"),
          eventName: readString(data, "eventName"),
          attendanceMode: readString(data, "attendanceMode"),
          coverageSubject: readString(data, "coverageSubject"),
          publicationDeadline: readString(data, "publicationDeadline"),
          inquirySubject: readString(data, "inquirySubject"),
          opticaId: readString(data, "opticaId"),
          details: readString(data, "details"),
          consent: data.get("consent") === "on",
          website: readString(data, "website"),
          submissionId: submissionId.current,
        }),
        signal: AbortSignal.timeout(20000),
      })

      const result = await readJsonResponse<{ code: string; error?: string }>(
        response,
        UNAVAILABLE_MESSAGE
      )
      setCode(result.code)
    } catch (err) {
      setError(
        formatSubmitError(err, {
          timeoutMessage: TIMEOUT_MESSAGE,
          unavailableMessage: UNAVAILABLE_MESSAGE,
        })
      )
    } finally {
      setBusy(false)
    }
  }

  if (code) {
    return (
      <div role="status" className="border-y border-[var(--line)] py-8 space-y-6">
        <CheckCircle2 size={36} className="text-[var(--gold)]" aria-hidden="true" />
        <p className="eyebrow">Submission confirmed</p>
        <h2 className="section-title">Request logged with the coordination desk.</h2>
        <p className="text-sm text-[var(--ink-soft)]">
          Reference code for {submissionIntentLabels[intent]}:
        </p>
        <div className="border border-[var(--line)] bg-[var(--surface-raised)] p-6">
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

  const detailsMeta = DETAILS_META[intent]

  return (
    <form onSubmit={submit} className="border-y border-[var(--line)] py-8 space-y-6">
      <div>
        <p className="eyebrow">Direct Section Desk</p>
        <h2 className="mt-2 text-2xl font-semibold text-[var(--ink)]">
          Submit a Section Inquiry
        </h2>
        {targetRef && (
          <p className="mt-2 font-mono text-xs text-[var(--gold)]">
            Context reference: {targetRef}
          </p>
        )}
      </div>

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

        <label className="grid gap-2 text-xs font-semibold text-[var(--ink-soft)] sm:col-span-2">
          <span>{AFFILIATION_LABEL[intent]}</span>
          <input
            id="intake-affiliation"
            name="affiliation"
            required
            minLength={2}
            maxLength={160}
            disabled={!ready || busy}
            placeholder={AFFILIATION_PLACEHOLDER[intent]}
            className={field}
          />
        </label>

        {/* Atomic per-intent fields so no two controls capture overlapping data */}
        <div key={intent} className="grid gap-5 sm:grid-cols-2 sm:col-span-2">
          {intent === "chapter_charter" && (
            <>
              <label className="grid gap-2 text-xs font-semibold text-[var(--ink-soft)]">
                <span>Prospective Founding Members</span>
                <input
                  id="intake-member-count"
                  name="foundingMemberCount"
                  type="number"
                  min={5}
                  max={500}
                  inputMode="numeric"
                  disabled={!ready || busy}
                  placeholder="Minimum 5 enrolled students"
                  className={field}
                />
              </label>
              <label className="grid gap-2 text-xs font-semibold text-[var(--ink-soft)]">
                <span>Proposed Faculty Advisor</span>
                <input
                  id="intake-advisor"
                  name="facultyAdvisorName"
                  maxLength={120}
                  disabled={!ready || busy}
                  placeholder="Full name of faculty advisor"
                  className={field}
                />
              </label>
              <label className="grid gap-2 text-xs font-semibold text-[var(--ink-soft)] sm:col-span-2">
                <span>Optica Member ID (optional)</span>
                <input
                  id="intake-optica-id"
                  name="opticaId"
                  maxLength={40}
                  disabled={!ready || busy}
                  placeholder="Personal Optica ID if already registered"
                  className={field}
                />
              </label>
            </>
          )}

          {intent === "partner_proposal" && (
            <>
              <label className="grid gap-2 text-xs font-semibold text-[var(--ink-soft)]">
                <span>Collaboration Track</span>
                <select
                  id="intake-partnership-scope"
                  name="partnershipScope"
                  defaultValue=""
                  disabled={!ready || busy}
                  className={field}
                >
                  <option value="">Select a track (optional)</option>
                  <option>Campus Venue Hosting</option>
                  <option>Technical Workshop Co-Host</option>
                  <option>Joint Research Program</option>
                  <option>Student Sponsorship</option>
                  <option>Institutional MOU</option>
                </select>
              </label>
              <label className="grid gap-2 text-xs font-semibold text-[var(--ink-soft)]">
                <span>Target Semester (optional)</span>
                <input
                  id="intake-timeline"
                  name="targetTimeline"
                  maxLength={120}
                  disabled={!ready || busy}
                  placeholder="For example, Spring 2027"
                  className={field}
                />
              </label>
            </>
          )}

          {intent === "speaker_proposal" && (
            <>
              <label className="grid gap-2 text-xs font-semibold text-[var(--ink-soft)]">
                <span>Session Format</span>
                <select
                  id="intake-session-format"
                  name="sessionFormat"
                  defaultValue=""
                  disabled={!ready || busy}
                  className={field}
                >
                  <option value="">Choose format (optional)</option>
                  <option>Research Seminar (45 min)</option>
                  <option>Technical Workshop (2 hours)</option>
                  <option>Colloquium Lecture</option>
                  <option>Panel Discussion</option>
                </select>
              </label>
              <label className="grid gap-2 text-xs font-semibold text-[var(--ink-soft)]">
                <span>Proposed Talk Title</span>
                <input
                  id="intake-session-title"
                  name="sessionTitle"
                  maxLength={200}
                  disabled={!ready || busy}
                  placeholder="Working title of your talk"
                  className={field}
                />
              </label>
              <label className="grid gap-2 text-xs font-semibold text-[var(--ink-soft)]">
                <span>Preferred Month (optional)</span>
                <input
                  id="intake-preferred-date"
                  name="preferredDate"
                  maxLength={120}
                  disabled={!ready || busy}
                  placeholder="For example, March 2027"
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
            </>
          )}

          {intent === "event_rsvp" && (
            <>
              {!targetRef && (
                <label className="grid gap-2 text-xs font-semibold text-[var(--ink-soft)] sm:col-span-2">
                  <span>Event Name</span>
                  <input
                    id="intake-event-name"
                    name="eventName"
                    maxLength={200}
                    disabled={!ready || busy}
                    placeholder="Seminar or workshop title"
                    className={field}
                  />
                </label>
              )}
              <label className="grid gap-2 text-xs font-semibold text-[var(--ink-soft)]">
                <span>Attendance Mode</span>
                <select
                  id="intake-attendance-mode"
                  name="attendanceMode"
                  defaultValue=""
                  disabled={!ready || busy}
                  className={field}
                >
                  <option value="">Choose mode (optional)</option>
                  <option>In-Person</option>
                  <option>Online</option>
                </select>
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
            </>
          )}

          {intent === "press_inquiry" && (
            <>
              <label className="grid gap-2 text-xs font-semibold text-[var(--ink-soft)]">
                <span>Story Subject</span>
                <input
                  id="intake-coverage-subject"
                  name="coverageSubject"
                  maxLength={200}
                  disabled={!ready || busy}
                  placeholder="Announcement, milestone, or officer interview"
                  className={field}
                />
              </label>
              <label className="grid gap-2 text-xs font-semibold text-[var(--ink-soft)]">
                <span>Editorial Deadline (optional)</span>
                <input
                  id="intake-publication-deadline"
                  name="publicationDeadline"
                  type="date"
                  disabled={!ready || busy}
                  className={field}
                />
              </label>
            </>
          )}

          {intent === "general_inquiry" && (
            <label className="grid gap-2 text-xs font-semibold text-[var(--ink-soft)] sm:col-span-2">
              <span>Subject</span>
              <input
                id="intake-subject"
                name="inquirySubject"
                maxLength={200}
                disabled={!ready || busy}
                placeholder="Brief summary of your question"
                className={field}
              />
            </label>
          )}
        </div>

        <input type="hidden" name="targetRef" value={targetRef} />

        <label className="grid gap-2 text-xs font-semibold text-[var(--ink-soft)] sm:col-span-2">
          <span>{detailsMeta.label}</span>
          <textarea
            id="intake-details"
            name="details"
            required
            minLength={10}
            maxLength={3000}
            rows={4}
            disabled={!ready || busy}
            placeholder={detailsMeta.placeholder}
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
        <p role="alert" className="border border-[var(--danger)]/40 bg-[var(--danger)]/10 p-4 text-sm text-[var(--danger)]">
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
