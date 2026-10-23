"use client"

import { useState } from "react"
import { ArrowUpRight, Check, CheckCircle2, Copy, Loader2, Sparkles } from "lucide-react"
import { saveMemberPortalSubmission, type MemberPortalRecord } from "@/lib/db/inquiries"

const SUBMISSION_TYPES = [
  "Local Section Member Roster Enrollment",
  "EPC 2027 Conference Paper or Abstract Submission",
  "Best Thesis Award or Thesis Fund Application",
  "Software-Defined Photonics Hackathon Registration",
  "Egypt Photonic Chipathon Team Registration",
  "General Section Secretariat Inquiry",
]

const COHORTS = [
  "Undergraduate or Graduate Student",
  "Postdoctoral or Academic Researcher",
  "University Faculty or Principal Investigator",
  "Industry Optical or Photonics Engineer",
  "Deep-Tech Startup Founder or Executive",
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [record, setRecord] = useState<MemberPortalRecord | null>(null)
  const [copied, setCopied] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const fieldClass =
    "border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-3 text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink-faint)] focus:border-[var(--gold)] text-base rounded-sm w-full"

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    const form = event.currentTarget
    const formData = new FormData(form)

    const fullName = String(formData.get("fullName") || "")
    const email = String(formData.get("email") || "")
    const affiliation = String(formData.get("affiliation") || "")
    const cohort = String(formData.get("cohort") || "")
    const opticaMemberId = String(formData.get("opticaMemberId") || "")
    const submissionType = String(formData.get("submissionType") || "")
    const message = String(formData.get("message") || "")

    try {
      const result = await saveMemberPortalSubmission({
        fullName,
        email,
        affiliation,
        cohort,
        opticaMemberId: opticaMemberId || undefined,
        submissionType,
        message,
      })
      setRecord(result)
    } catch (err) {
      console.error("Portal submission error:", err)
      setErrorMessage("We were unable to record your submission. Please try again.")
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
      <div className="space-y-6 py-2" role="status" aria-live="polite">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/15 border border-[var(--gold)] text-[var(--gold)]">
            <CheckCircle2 size={22} aria-hidden="true" />
          </div>
          <div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--gold)]">
              Official Receipt Confirmed
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
              Welcome to the Optica Egypt Registry.
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed">
          Thank you, <strong className="text-[var(--ink)]">{record.fullName}</strong>. Your submission under{" "}
          <strong className="text-[var(--ink)]">{record.submissionType}</strong> has been logged directly in the Optica Egypt Local Section database.
        </p>

        <div className="rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] p-5 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase text-[var(--ink-faint)]">Confirmation Receipt Code</p>
              <p className="font-mono text-base sm:text-lg font-bold text-[var(--gold)]">{record.id}</p>
            </div>
            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 rounded-sm border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2 text-xs font-semibold text-[var(--ink)] hover:border-[var(--gold)] transition-colors min-h-[48px]"
            >
              {copied ? <Check size={14} className="text-[var(--gold)]" /> : <Copy size={14} />}
              <span>{copied ? "Copied" : "Copy Receipt"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[var(--line-subtle)] text-xs">
            <div>
              <span className="text-[var(--ink-faint)]">Institution:</span>
              <p className="font-medium text-[var(--ink)]">{record.affiliation}</p>
            </div>
            <div>
              <span className="text-[var(--ink-faint)]">Cohort:</span>
              <p className="font-medium text-[var(--ink)]">{record.cohort}</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setRecord(null)}
          className="text-xs text-[var(--gold)] hover:underline font-semibold min-h-[48px] inline-flex items-center"
        >
          Submit another enrollment or program entry
        </button>
      </div>
    )
  }

  return (
    <div className="py-1">
      <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
        <Sparkles size={14} aria-hidden="true" />
        <span>In-Page Enrollment and Submission Portal</span>
      </div>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--ink)]">
        Local Section Roster and Program Intake
      </h2>
      <p className="mt-1.5 text-xs text-[var(--ink-soft)] leading-relaxed">
        Enroll in the official Optica Egypt member roster, submit conference abstracts or thesis fund applications, or contact the section secretariat.
      </p>

      {errorMessage && (
        <div className="mt-4 rounded-sm border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-400">
          {errorMessage}
        </div>
      )}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="portal-type" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
            Submission Pathway <span className="text-[var(--gold)]">*</span>
          </label>
          <select id="portal-type" name="submissionType" required className={fieldClass}>
            {SUBMISSION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="portal-name" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
              Full Name <span className="text-[var(--gold)]">*</span>
            </label>
            <input
              id="portal-name"
              name="fullName"
              type="text"
              required
              placeholder="e.g. Dr. / Eng. Full Name"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="portal-email" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
              Academic or Work Email <span className="text-[var(--gold)]">*</span>
            </label>
            <input
              id="portal-email"
              name="email"
              type="email"
              required
              placeholder="name@university.edu.eg"
              className={fieldClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="portal-affiliation" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
              University or Institution <span className="text-[var(--gold)]">*</span>
            </label>
            <input
              id="portal-affiliation"
              name="affiliation"
              type="text"
              required
              placeholder="e.g. Cairo University / Ain Shams / AUC"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="portal-optica-id" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
              Optica Member ID (Optional)
            </label>
            <input
              id="portal-optica-id"
              name="opticaMemberId"
              type="text"
              placeholder="e.g. 2798420 (if already a member)"
              className={fieldClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="portal-cohort" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
            Primary Ecosystem Cohort <span className="text-[var(--gold)]">*</span>
          </label>
          <select id="portal-cohort" name="cohort" required className={fieldClass}>
            <option value="">Select your career or academic stage</option>
            {COHORTS.map((cohort) => (
              <option key={cohort} value={cohort}>
                {cohort}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="portal-message" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
            Research Focus, Abstract Summary, or Inquiry <span className="text-[var(--gold)]">*</span>
          </label>
          <textarea
            id="portal-message"
            name="message"
            required
            rows={4}
            placeholder="Share your optics research area, thesis topic, hackathon interest, or message for the executive board."
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
              <span>Recording in Section Registry...</span>
            </>
          ) : (
            <>
              <span>Complete In-Page Enrollment</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
