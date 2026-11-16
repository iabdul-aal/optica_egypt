"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Check, CheckCircle2, Copy, Loader2 } from "lucide-react"
import { committees } from "@/lib/recruitment"
import { formatSubmitError, getApiUrl, readJsonResponse } from "@/lib/utils"

const UNAVAILABLE_MESSAGE =
  "We could not save your application on this host. Your details remain in the form; please submit at optica-egypt.com or email info@optica-egypt.com."
const TIMEOUT_MESSAGE =
  "The request timed out. Your details remain in the form; please try again."

export function RecruitmentForm() {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [code, setCode] = useState("")
  const [copied, setCopied] = useState(false)
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])
  const submissionId = useRef<string | null>(null)
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
      const response = await fetch(getApiUrl("/api/recruitment"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(data),
          consent: data.get("consent") === "on",
          submissionId: submissionId.current
        }),
        signal: AbortSignal.timeout(20000)
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
          unavailableMessage: UNAVAILABLE_MESSAGE
        })
      )
    } finally {
      setBusy(false)
    }
  }

  if (code)
    return (
      <div role="status" className="site-card space-y-6 p-7 sm:p-10">
        <CheckCircle2
          size={40}
          className="text-[var(--gold)]"
          aria-hidden="true"
        />
        <p className="eyebrow">Application received</p>
        <h2 className="section-title">Your next chapter starts here.</h2>
        <p className="text-[var(--ink-soft)]">
          Your application is saved with the recruitment team. Keep this receipt
          for any follow-up. The team will contact you using your application
          email.
        </p>
        <div className="rounded-sm border border-[var(--line)] bg-[var(--surface-raised)] p-5">
          <p className="text-xs uppercase tracking-widest text-[var(--ink-faint)]">
            Application reference
          </p>
          <p className="mt-2 break-all font-mono text-lg text-[var(--gold)]">
            {code}
          </p>
          <button
            type="button"
            className="btn-secondary mt-4 min-h-12"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(code)
                setCopied(true)
              } catch {
                setCopied(false)
              }
            }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}{" "}
            {copied ? "Copied" : "Copy reference"}
          </button>
        </div>
        <p className="text-sm text-[var(--ink-faint)]">
          Status: Submitted · Next: Committee review
        </p>
      </div>
    )

  return (
    <form onSubmit={submit} className="site-card space-y-8 p-6 sm:p-9">
      <div>
        <p className="eyebrow">Membership application</p>
        <h2 className="mt-2 text-2xl font-semibold text-[var(--ink)]">
          Tell us about yourself.
        </h2>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          All fields are required unless marked optional.
        </p>
      </div>
      {error && (
        <p
          role="alert"
          className="rounded-sm border border-[var(--danger)] p-4 text-sm text-[var(--danger)]"
        >
          {error}
        </p>
      )}
      <fieldset
        disabled={!ready || busy}
        className="space-y-5 disabled:opacity-70"
      >
        <legend className="mb-5 font-mono text-xs uppercase tracking-widest text-[var(--gold)]">
          01 / Your details
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm">
            Full name
            <input
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={120}
              className={field}
            />
          </label>
          <label className="grid gap-2 text-sm">
            Email address
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              className={field}
            />
          </label>
          <label className="grid gap-2 text-sm">
            University or institution
            <input
              name="university"
              required
              minLength={2}
              maxLength={160}
              autoComplete="organization"
              className={field}
            />
          </label>
          <label className="grid gap-2 text-sm">
            Study level
            <select
              name="studyLevel"
              required
              defaultValue=""
              className={field}
            >
              <option value="" disabled>
                Select your level
              </option>
              {["Undergraduate", "Postgraduate", "Researcher", "Other"].map(
                (v) => (
                  <option key={v}>{v}</option>
                )
              )}
            </select>
          </label>
        </div>
      </fieldset>
      <fieldset
        disabled={!ready || busy}
        className="space-y-5 border-t border-[var(--line)] pt-7 disabled:opacity-70"
      >
        <legend className="mb-2 pr-3 font-mono text-xs uppercase tracking-widest text-[var(--gold)]">
          02 / Your contribution
        </legend>
        <label className="grid gap-2 text-sm">
          Preferred committee
          <select name="committee" required defaultValue="" className={field}>
            <option value="" disabled>
              Choose a committee
            </option>
            {committees.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          Skills and experience (optional)
          <textarea
            name="skills"
            rows={3}
            maxLength={2000}
            className={field}
            placeholder="Technical, creative, organizational, or anything you would like to learn."
          />
        </label>
        <label className="grid gap-2 text-sm">
          Why would you like to join?
          <textarea
            name="motivation"
            required
            minLength={30}
            maxLength={3000}
            rows={4}
            className={field}
            placeholder="Tell us what interests you and how you hope to contribute. At least 30 characters."
          />
        </label>
        <label className="grid gap-2 text-sm">
          Availability
          <input
            name="availability"
            required
            minLength={2}
            maxLength={160}
            className={field}
            placeholder="For example, 3 hours per week, mainly weekends"
          />
        </label>
      </fieldset>
      <div hidden aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="flex min-h-12 items-start gap-3 text-sm leading-6 text-[var(--ink-soft)]">
        <input
          type="checkbox"
          name="consent"
          required
          disabled={!ready || busy}
          className="mt-1 h-5 w-5 shrink-0 accent-[var(--gold)]"
        />
        I agree that the Optica Egypt recruitment team may store and review
        these details and contact me about chapter membership. My application is
        visible only to authorized staff.
      </label>
      <button
        type="submit"
        disabled={!ready || busy}
        className="btn-primary min-h-12 w-full disabled:opacity-60"
      >
        {busy ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <ArrowUpRight size={16} />
        )}{" "}
        {busy ? "Saving application…" : "Submit application"}
      </button>
      <p className="text-center text-xs leading-5 text-[var(--ink-faint)]">
        You will receive a reference after your application has been saved.
      </p>
    </form>
  )
}
