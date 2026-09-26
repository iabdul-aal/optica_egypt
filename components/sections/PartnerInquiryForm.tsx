"use client"

import { useState } from "react"
import { CheckCircle2, Copy, Check, Loader2, Handshake } from "lucide-react"
import { savePartnerInquiry, type PartnerInquiryRecord } from "@/lib/db/inquiries"

const ORG_TYPES = [
  "Egyptian Public University",
  "Private or National University",
  "Research Center or Institute",
  "Semiconductor or Deep-Tech Enterprise",
  "Government Agency or Funding Council",
  "Non-Governmental Organization",
]

const PARTNERSHIP_TRACKS = [
  "Academic and Curriculum Integration",
  "Industrial Co-Design and Hackathon Sponsorship",
  "National Research Grants and Infrastructure",
  "Student Chapter and Campus Hosting",
  "Visiting Lecturer or Keynote Sponsorship",
]

export function PartnerInquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [record, setRecord] = useState<PartnerInquiryRecord | null>(null)
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

    const organization = String(formData.get("organization") || "")
    const contactName = String(formData.get("contactName") || "")
    const email = String(formData.get("email") || "")
    const organizationType = String(formData.get("organizationType") || "")
    const partnershipTrack = String(formData.get("partnershipTrack") || "")
    const message = String(formData.get("message") || "")

    try {
      const result = await savePartnerInquiry({
        organization,
        contactName,
        email,
        organizationType,
        partnershipTrack,
        message,
      })
      setRecord(result)
    } catch (err) {
      console.error("Partner submission error:", err)
      setErrorMessage("We were unable to record your inquiry. Please try again.")
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
              Partnership Inquiry Recorded
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
              Thank you for connecting with Optica Egypt.
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed">
          Your inquiry for <strong className="text-[var(--ink)]">{record.organization}</strong> has been logged in the Optica Egypt partnership registry. Our executive committee will review your proposal and respond via email within 3 business days.
        </p>

        <div className="rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] p-5 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase text-[var(--ink-faint)]">Tracking Identifier</p>
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
              <span className="text-[var(--ink-faint)]">Organization:</span>
              <p className="font-medium text-[var(--ink)]">{record.organization}</p>
            </div>
            <div>
              <span className="text-[var(--ink-faint)]">Partnership Track:</span>
              <p className="font-medium text-[var(--ink)]">{record.partnershipTrack}</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setRecord(null)}
          className="text-xs text-[var(--gold)] hover:underline font-semibold"
        >
          Submit another partnership inquiry
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
          <label htmlFor="partner-org" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
            Organization or University Name <span className="text-[var(--gold)]">*</span>
          </label>
          <input
            id="partner-org"
            name="organization"
            type="text"
            required
            placeholder="e.g. Ain Shams University or Si-Ware Systems"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="partner-name" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
            Primary Contact Person <span className="text-[var(--gold)]">*</span>
          </label>
          <input
            id="partner-name"
            name="contactName"
            type="text"
            required
            placeholder="Dr. / Eng. Full Name"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="partner-email" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
            Official Work Email <span className="text-[var(--gold)]">*</span>
          </label>
          <input
            id="partner-email"
            name="email"
            type="email"
            required
            placeholder="name@institution.edu.eg"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="partner-type" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
            Organization Type <span className="text-[var(--gold)]">*</span>
          </label>
          <select id="partner-type" name="organizationType" required className={fieldClass}>
            <option value="">Select organization classification</option>
            {ORG_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="partner-track" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
          Intended Partnership Track <span className="text-[var(--gold)]">*</span>
        </label>
        <select id="partner-track" name="partnershipTrack" required className={fieldClass}>
          <option value="">Select partnership collaboration track</option>
          {PARTNERSHIP_TRACKS.map((track) => (
            <option key={track} value={track}>
              {track}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="partner-message" className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
          Collaboration Details and Scope <span className="text-[var(--gold)]">*</span>
        </label>
        <textarea
          id="partner-message"
          name="message"
          rows={4}
          required
          placeholder="Briefly describe your proposed collaboration, target student groups, lab facilities, or sponsorship vision."
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
            <span>Transmitting Alliance Proposal...</span>
          </>
        ) : (
          <>
            <Handshake size={16} />
            <span>Submit Formal Partnership Inquiry</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-[var(--ink-faint)] text-center">
        All proposals are reviewed confidentially by the Optica Egypt Executive Committee.
      </p>
    </form>
  )
}
