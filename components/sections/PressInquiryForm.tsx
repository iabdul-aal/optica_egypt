"use client"

import { useState } from "react"
import { CheckCircle2, Copy, Check, Loader2, Newspaper } from "lucide-react"
import { savePressInquiry, type PressInquiryRecord } from "@/lib/db/inquiries"

const TOPICS = [
  "Executive Interview Request (President or Initiator)",
  "Technical Backgrounder on Egyptian Silicon Photonics",
  "Conference Press Credential (EPC 2027)",
  "Fact-Checking and Data Verification",
  "General Media Coverage or Feature Story",
]

export function PressInquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [record, setRecord] = useState<PressInquiryRecord | null>(null)
  const [copied, setCopied] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const fieldClass =
    "border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-3 text-[var(--ink)] outline-none transition-colors focus:border-[var(--gold)] text-base rounded-sm w-full"

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    const form = event.currentTarget
    const formData = new FormData(form)

    const outlet = String(formData.get("outlet") || "")
    const journalistName = String(formData.get("journalistName") || "")
    const email = String(formData.get("email") || "")
    const topic = String(formData.get("topic") || "")
    const deadline = String(formData.get("deadline") || "")
    const message = String(formData.get("message") || "")

    try {
      const result = await savePressInquiry({
        outlet,
        journalistName,
        email,
        topic,
        deadline: deadline || undefined,
        message,
      })
      setRecord(result)
    } catch (err) {
      console.error("Press submission error:", err)
      setErrorMessage("We were unable to record your inquiry. Please try again or email press@optica-egypt.org directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleCopyCode() {
    if (!record) return
    navigator.clipboard.writeText(record.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (record) {
    return (
      <div className="space-y-6" role="status" aria-live="polite">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gold)]/15 border border-[var(--gold)] text-[var(--gold)]">
            <CheckCircle2 size={22} aria-hidden="true" />
          </div>
          <div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--gold)]">
              Media Inquiry Recorded
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
              Thank you for contacting the Press Desk.
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed">
          Your press inquiry representing <strong className="text-[var(--ink)]">{record.outlet}</strong> has been prioritized. Our media team reviews urgent journalist requests within 24 hours.
        </p>

        <div className="rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] p-5 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase text-[var(--ink-faint)]">Press Tracking Identifier</p>
              <p className="font-mono text-sm sm:text-base font-bold text-[var(--gold)]">{record.id}</p>
            </div>
            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 rounded-sm border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--ink)] hover:border-[var(--gold)] transition-colors min-h-[48px]"
            >
              {copied ? <Check size={14} className="text-[var(--gold)]" /> : <Copy size={14} />}
              <span>{copied ? "Copied" : "Copy Code"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[var(--line-subtle)] text-xs">
            <div>
              <span className="text-[var(--ink-faint)]">Media Outlet:</span>
              <p className="font-medium text-[var(--ink)]">{record.outlet}</p>
            </div>
            <div>
              <span className="text-[var(--ink-faint)]">Subject Topic:</span>
              <p className="font-medium text-[var(--ink)]">{record.topic}</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setRecord(null)}
          className="text-xs text-[var(--gold)] hover:underline font-semibold"
        >
          Submit another media inquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMessage && (
        <div className="rounded-sm border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-400">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="press-name" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
            Journalist or Correspondent Name <span className="text-[var(--gold)]">*</span>
          </label>
          <input
            id="press-name"
            name="journalistName"
            type="text"
            required
            placeholder="Your Full Name"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="press-outlet" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
            Media Outlet or Publication <span className="text-[var(--gold)]">*</span>
          </label>
          <input
            id="press-outlet"
            name="outlet"
            type="text"
            required
            placeholder="e.g. Al-Ahram Weekly, Nature Middle East"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="press-email" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
            Press Contact Email <span className="text-[var(--gold)]">*</span>
          </label>
          <input
            id="press-email"
            name="email"
            type="email"
            required
            placeholder="journalist@publication.com"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="press-deadline" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
            Publication Deadline (Optional)
          </label>
          <input
            id="press-deadline"
            name="deadline"
            type="text"
            placeholder="e.g. Tomorrow 5 PM CLT or 30 Oct 2026"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="press-topic" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
          Inquiry Topic or Angle <span className="text-[var(--gold)]">*</span>
        </label>
        <select id="press-topic" name="topic" required className={fieldClass}>
          <option value="">Select subject angle</option>
          {TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="press-message" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
          Specific Questions or Interview Scope <span className="text-[var(--gold)]">*</span>
        </label>
        <textarea
          id="press-message"
          name="message"
          rows={4}
          required
          placeholder="Please outline the specific focus of your story, questions for leadership, or desired audio/video assets."
          className={fieldClass}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full justify-center min-h-[48px] text-sm"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Transmitting to Media Desk...</span>
          </>
        ) : (
          <>
            <Newspaper size={16} />
            <span>Submit Media Inquiry</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-[var(--ink-faint)] text-center">
        For breaking news deadlines, you may also email <span className="text-[var(--gold)] font-mono">press@optica-egypt.org</span> directly.
      </p>
    </form>
  )
}
