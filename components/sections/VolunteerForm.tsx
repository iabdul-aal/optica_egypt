"use client"

import { useState } from "react"
import { ArrowUpRight, CheckCircle2, Copy, Check, Loader2, Sparkles } from "lucide-react"
import { saveVolunteerApplication, type VolunteerRecord } from "@/lib/db/volunteers"

const VOLUNTEER_TRACKS = [
  { id: "technical", label: "Technical Program and Workshops" },
  { id: "opensource", label: "Open Source Photonics and PDA Tooling" },
  { id: "outreach", label: "Youth Outreach and STEM Education" },
  { id: "editorial", label: "Editorial, Insights and Science Communication" },
  { id: "chapters", label: "University and Student Chapter Mentorship" },
  { id: "general", label: "General Section Operations and Event Support" },
]

export function VolunteerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [record, setRecord] = useState<VolunteerRecord | null>(null)
  const [copied, setCopied] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const fieldClass =
    "border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-3 text-[var(--ink)] outline-none transition-colors focus:border-[var(--gold)] text-base rounded-sm"

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    const form = event.currentTarget
    const formData = new FormData(form)

    const name = String(formData.get("name") || "")
    const email = String(formData.get("email") || "")
    const affiliation = String(formData.get("affiliation") || "")
    const track = String(formData.get("track") || "")
    const experience = String(formData.get("experience") || "")
    const statement = String(formData.get("statement") || "")

    try {
      const result = await saveVolunteerApplication({
        name,
        email,
        affiliation,
        track,
        experience: experience || undefined,
        statement,
      })
      setRecord(result)
    } catch (err) {
      console.error("Volunteer submission error:", err)
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
      <div className="space-y-6" role="status" aria-live="polite">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gold)]/15 border border-[var(--gold)] text-[var(--gold)]">
            <CheckCircle2 size={22} aria-hidden="true" />
          </div>
          <div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--gold)]">
              Application Recorded
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-[var(--ink)]">
              Thank you for volunteering.
            </h3>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
          Your volunteer profile has been submitted directly to the Optica Egypt Local Section committee. A coordinator will review your selected track and connect with you shortly.
        </p>

        <div className="rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--line-subtle)] pb-4">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--ink-faint)]">
                Application Code
              </p>
              <p className="font-mono text-xl font-bold tracking-tight text-[var(--gold)] mt-0.5">
                {record.id}
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider px-3 py-2 border border-[var(--line)] hover:border-[var(--gold)] text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors rounded-sm w-fit"
            >
              {copied ? <Check size={13} className="text-[var(--gold)]" /> : <Copy size={13} />}
              <span>{copied ? "Copied" : "Copy Code"}</span>
            </button>
          </div>

          <div className="grid gap-3 text-sm">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--ink-faint)]">
                Applicant
              </p>
              <p className="font-semibold text-[var(--ink)] mt-0.5">{record.name}</p>
              <p className="text-xs text-[var(--ink-soft)]">{record.email} · {record.affiliation}</p>
            </div>

            <div className="pt-2 border-t border-[var(--line-subtle)]">
              <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--ink-faint)]">
                Selected Track
              </p>
              <p className="font-semibold text-[var(--ink)] mt-0.5">{record.track}</p>
            </div>

            <div className="pt-2 border-t border-[var(--line-subtle)] flex items-center justify-between text-xs font-mono text-[var(--ink-faint)]">
              <span>STATUS: SUBMITTED</span>
              <span>SAVED IN DATABASE</span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setRecord(null)
              setCopied(false)
            }}
            className="btn-secondary"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    )
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <div className="flex items-center gap-2.5 rounded-sm border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-4 py-3 text-xs text-[var(--ink)]">
        <Sparkles size={16} className="shrink-0 text-[var(--gold)]" aria-hidden="true" />
        <span>
          <strong>Volunteer intake active.</strong> Complete the profile below to express interest in joining our section committees, workshops, or programs.
        </span>
      </div>

      {errorMessage && (
        <div className="rounded-sm border border-[var(--danger)] bg-[var(--danger)]/10 p-3 text-sm text-[var(--danger)]">
          {errorMessage}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-[var(--ink)]">
          Full name
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="e.g. Dr. Nouran El-Sayed"
            className={fieldClass}
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-[var(--ink)]">
          Email address
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="e.g. nouran.elsayed@institution.edu.eg"
            className={fieldClass}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-[var(--ink)]">
          University or organisation
          <input
            name="affiliation"
            required
            placeholder="e.g. Ain Shams University / Zewail City"
            className={fieldClass}
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-[var(--ink)]">
          Preferred volunteer track
          <select name="track" required className={fieldClass} defaultValue="">
            <option value="" disabled>Select a track</option>
            {VOLUNTEER_TRACKS.map((t) => (
              <option key={t.id} value={t.label}>{t.label}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="grid gap-2 text-sm font-semibold text-[var(--ink)]">
        Background or technical skills <span className="font-normal text-[var(--ink-soft)]">optional</span>
        <input
          name="experience"
          placeholder="e.g. Fiber optics, Python/gdsfactory, science journalism, student chapter lead"
          className={fieldClass}
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-[var(--ink)]">
        Why would you like to volunteer with Optica Egypt?
        <textarea
          name="statement"
          required
          rows={4}
          placeholder="Tell us about your interests, how much time you might contribute, and what areas excite you most."
          className={fieldClass}
        />
      </label>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full sm:w-fit"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={15} className="animate-spin" aria-hidden="true" />
              <span>Submitting application...</span>
            </>
          ) : (
            <>
              <span>Submit Volunteer Application</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
