"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, CheckCircle2, Copy, Check, Calendar, MapPin, Sparkles, Loader2 } from "lucide-react"
import { saveRegistration, type RegistrationRecord } from "@/lib/db/registrations"

type EventRegistrationFormProps = {
  eventId: string
  eventTitle: string
  eventDate: string
  eventLocation?: string
  isEarly?: boolean
  email?: string
}

export function EventRegistrationForm({
  eventId,
  eventTitle,
  eventDate,
  eventLocation,
  isEarly = false,
}: EventRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [record, setRecord] = useState<RegistrationRecord | null>(null)
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
    const attendeeEmail = String(formData.get("email") || "")
    const institution = String(formData.get("institution") || "")
    const role = String(formData.get("role") || "")

    try {
      const result = await saveRegistration({
        eventId,
        eventTitle,
        eventDate,
        name,
        email: attendeeEmail,
        institution,
        role: role || undefined,
        isEarlyBird: isEarly,
      })
      setRecord(result)
    } catch (err) {
      console.error("Registration error:", err)
      setErrorMessage("We were unable to complete the registration. Please try again.")
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

  // ── Success State: Direct Database Confirmation Receipt ──────────────────
  if (record) {
    return (
      <div className="space-y-6" role="status" aria-live="polite">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gold)]/15 border border-[var(--gold)] text-[var(--gold)]">
            <CheckCircle2 size={22} aria-hidden="true" />
          </div>
          <div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--gold)]">
              {record.isEarlyBird ? "Early Bird Registration Confirmed" : "Registration Confirmed"}
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--ink)]">
              You are confirmed.
            </h2>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
          Your attendance has been recorded directly in the Optica Egypt event database. A confirmation record is stored with the section secretariat.
        </p>

        {/* Confirmation Card */}
        <div className="rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--line-subtle)] pb-4">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--ink-faint)]">
                Confirmation Code
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
                Attendee
              </p>
              <p className="font-semibold text-[var(--ink)] mt-0.5">{record.name}</p>
              <p className="text-xs text-[var(--ink-soft)]">{record.email}</p>
              <p className="text-xs text-[var(--ink-soft)]">{record.institution}{record.role ? ` · ${record.role}` : ""}</p>
            </div>

            <div className="pt-2 border-t border-[var(--line-subtle)]">
              <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--ink-faint)]">
                Event
              </p>
              <p className="font-semibold text-[var(--ink)] mt-0.5">{record.eventTitle}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--ink-soft)] mt-1">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={12} className="text-[var(--gold)]" />
                  {record.eventDate}
                </span>
                {eventLocation && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={12} className="text-[var(--gold)]" />
                    {eventLocation}
                  </span>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--line-subtle)] flex items-center justify-between text-xs font-mono text-[var(--ink-faint)]">
              <span>TIER: {record.isEarlyBird ? "EARLY BIRD PRIORITY" : "STANDARD ADMISSION"}</span>
              <span>STATUS: CONFIRMED</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => {
              setRecord(null)
              setCopied(false)
            }}
            className="btn-secondary"
          >
            Register Another Attendee
          </button>
          <Link href="/events" className="text-link">
            Return to events calendar <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    )
  }

  // ── Form State: Direct Submission Form ────────────────────────────────────
  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      {isEarly && (
        <div className="flex items-center gap-2.5 rounded-sm border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-4 py-3 text-xs text-[var(--ink)]">
          <Sparkles size={16} className="shrink-0 text-[var(--gold)]" aria-hidden="true" />
          <span>
            <strong>Early registration open.</strong> Submitting this form reserves your priority seat directly in the event database before the general schedule opens.
          </span>
        </div>
      )}

      <p className="border-l-2 border-[var(--gold)] pl-4 text-sm leading-6 text-[var(--ink-soft)]">
        Fill in your information below. Your registration will be saved directly to the Optica Egypt event database with an instant confirmation code.
      </p>

      {errorMessage && (
        <div className="rounded-sm border border-[var(--danger)] bg-[var(--danger)]/10 p-3 text-sm text-[var(--danger)]">
          {errorMessage}
        </div>
      )}

      <label className="grid gap-2 text-sm font-semibold text-[var(--ink)]">
        Full name
        <input
          name="name"
          required
          autoComplete="name"
          placeholder="e.g. Dr. Ahmed Hassan"
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
          placeholder="e.g. ahmed.hassan@university.edu.eg"
          className={fieldClass}
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-[var(--ink)]">
        Institution or organisation
        <input
          name="institution"
          required
          placeholder="e.g. Cairo University / Telecom Egypt"
          className={fieldClass}
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-[var(--ink)]">
        Role or study level <span className="font-normal text-[var(--ink-soft)]">optional</span>
        <input
          name="role"
          placeholder="e.g. Faculty Member / Graduate Student / Optical Engineer"
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
              <span>Saving to database...</span>
            </>
          ) : (
            <>
              <span>{isEarly ? "Complete Early Registration" : "Complete Registration"}</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
